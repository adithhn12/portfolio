import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { Send, CheckCircle2, Mail, Copy, Check, Inbox, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoggedMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export const ContactConsole: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Submitted message payloads state (stored in localStorage)
  const [messagesLog, setMessagesLog] = useState<LoggedMessage[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [showLogDrawer, setShowLogDrawer] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    const newMessage: LoggedMessage = {
      id: `MSG-${Date.now().toString().slice(-6)}`,
      name,
      email,
      message,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    };

    setTimeout(() => {
      // Save to state & LocalStorage
      const updatedLog = [newMessage, ...messagesLog];
      setMessagesLog(updatedLog);
      localStorage.setItem('portfolio_inquiries', JSON.stringify(updatedLog));

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger high-voltage confetti celebration
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#f3e600', '#00f0ff', '#f59e0b']
      });

      setName('');
      setEmail('');
      setMessage('');
    }, 500);
  };

  const handleClearLog = () => {
    setMessagesLog([]);
    localStorage.removeItem('portfolio_inquiries');
  };

  const handleCopyEmail = () => {
    const directEmail = PERSONAL_INFO.email || `adithhn12@gmail.com`;
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#0a0b0e] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-100 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              Have a question or project inquiry? Feel free to reach out.
            </p>
          </div>

          {/* Button to toggle submitted messages log */}
          <button
            onClick={() => setShowLogDrawer(!showLogDrawer)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Inbox className="w-4 h-4 text-[#f3e600]" />
            <span>Message Inbox ({messagesLog.length})</span>
          </button>
        </div>

        {/* Local Submitted Messages Inspector Drawer */}
        {showLogDrawer && (
          <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <span className="text-slate-200 font-semibold flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#f3e600]" /> Saved Inquiries ({messagesLog.length})
              </span>
              {messagesLog.length > 0 && (
                <button
                  onClick={handleClearLog}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 text-xs cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Inbox
                </button>
              )}
            </div>

            {messagesLog.length === 0 ? (
              <div className="py-6 text-center text-slate-500 font-sans text-xs">
                No messages logged yet. Use the form below to send an inquiry!
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {messagesLog.map((msg) => (
                  <div key={msg.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between text-cyan-400 font-medium text-[11px]">
                      <span>{msg.name} ({msg.email})</span>
                      <span className="text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs bg-[#10121a] p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#10121a] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-base font-bold font-heading text-slate-100 border-b border-slate-800/80 pb-3">
              Send a Direct Message
            </h3>

            {submitted ? (
              <div className="py-8 bg-slate-950/80 rounded-xl border border-[#f3e600]/40 p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#f3e600] mx-auto" />
                <h4 className="font-heading font-bold text-lg text-slate-100">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been saved in the inbox drawer above.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={() => setShowLogDrawer(true)}
                    className="px-4 py-2 bg-[#f3e600] hover:bg-[#ffe600] text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    View Inbox ({messagesLog.length})
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 block font-medium">Your Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adith / Technical Recruiter"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-[#f3e600] focus:outline-none transition-colors font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block font-medium">Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-[#f3e600] focus:outline-none transition-colors font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 block font-medium">Message:</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, role, or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-[#f3e600] focus:outline-none transition-colors font-sans text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#f3e600] hover:bg-[#ffe600] text-slate-950 font-bold text-sm rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#10121a] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-base font-bold font-heading text-slate-100 border-b border-slate-800/80 pb-3">
              Direct Contact
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 bg-slate-900 rounded-lg text-[#f3e600] border border-slate-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Direct Email</span>
                    <span className="font-mono text-slate-200 text-xs">{PERSONAL_INFO.email || 'adithhn12@gmail.com'}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-slate-300 hover:text-[#f3e600] flex items-center gap-1.5 text-xs cursor-pointer font-medium transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300 hover:border-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-cyan-400 border border-slate-800">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">GitHub Profile</span>
                    <span className="font-mono text-slate-200 text-xs group-hover:text-[#f3e600] transition-colors">
                      github.com/{PERSONAL_INFO.username}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#f3e600] font-medium">Visit ↗</span>
              </a>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-sans text-slate-400">
              <span className="text-slate-200 font-semibold block">Academic & Professional Track:</span>
              <p className="leading-relaxed">
                Currently pursuing Master of Computer Applications (MCA, Sem 3) at BMSCE, Bengaluru, specializing in software engineering, satellite remote sensing, and computer vision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
