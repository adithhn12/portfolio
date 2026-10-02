import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { Terminal, Send, CheckCircle2, Mail, Copy, Check, Inbox, Trash2 } from 'lucide-react';
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
  const [messagesLog, setMessagesLog] = useState<LoggedMessage[]>([]);
  const [showLogDrawer, setShowLogDrawer] = useState<boolean>(false);

  // Load saved messages from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_inquiries');
      if (saved) {
        setMessagesLog(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

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

      // Trigger Cyberpunk high-voltage confetti
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#f3e600', '#00f0ff', '#ff0055']
      });

      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  const handleClearLog = () => {
    setMessagesLog([]);
    localStorage.removeItem('portfolio_inquiries');
  };

  const handleCopyEmail = () => {
    const directEmail = `adith.hn.official@gmail.com`;
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-12 bg-[#0a0b0e] border-t border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#f3e600] mb-1 font-bold">
              <Terminal className="w-4 h-4" />
              <span>DIRECT INQUIRY & COMMUNICATIONS CONSOLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-100 uppercase tracking-wide">
              Initiate Contact & Technical Collaborations
            </h2>
          </div>

          {/* Button to toggle submitted messages log */}
          <button
            onClick={() => setShowLogDrawer(!showLogDrawer)}
            className="px-3.5 py-2 bg-[#10121a] hover:bg-slate-900 border border-[#f3e600]/40 text-[#f3e600] text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer"
          >
            <Inbox className="w-4 h-4 text-[#f3e600]" />
            <span>Inquiry Inbox ({messagesLog.length})</span>
          </button>
        </div>

        {/* Local Submitted Messages Inspector Drawer */}
        {showLogDrawer && (
          <div className="bg-[#10121a] border border-[#f3e600]/40 p-5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
              <span className="text-[#f3e600] font-bold flex items-center gap-2">
                <Inbox className="w-4 h-4" /> RECEIVED MESSAGE PAYLOADS ({messagesLog.length})
              </span>
              {messagesLog.length > 0 && (
                <button
                  onClick={handleClearLog}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 text-xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All Inbox Logs
                </button>
              )}
            </div>

            {messagesLog.length === 0 ? (
              <div className="py-6 text-center text-slate-500 font-mono text-xs">
                No inquiry payloads logged yet. Fill out the form below to send a message!
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {messagesLog.map((msg) => (
                  <div key={msg.id} className="bg-slate-950 p-4 border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex flex-wrap items-center justify-between text-[#00f0ff] font-bold text-[11px]">
                      <span>{msg.id} • {msg.name} ({msg.email})</span>
                      <span className="text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs bg-[#10121a] p-2.5 border border-slate-800/80 leading-relaxed">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Console */}
          <div className="lg:col-span-7 bg-[#10121a] border border-[#f3e600]/30 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
              <span className="text-slate-400">DISPATCH MESSAGE PAYLOAD</span>
              <span className="text-[#00f0ff] font-bold">SYS_READY</span>
            </div>

            {submitted ? (
              <div className="py-8 bg-slate-950 border border-[#f3e600] p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#f3e600] mx-auto" />
                <h4 className="font-heading font-black text-lg text-slate-100 uppercase">
                  Payload Dispatched & Saved!
                </h4>
                <p className="text-xs text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
                  Your message payload has been logged! You can view it anytime in the <strong className="text-[#f3e600]">Inquiry Inbox</strong> tab above.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 hover:bg-slate-700 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={() => setShowLogDrawer(true)}
                    className="px-4 py-2 bg-[#f3e600] text-slate-950 font-black text-xs font-mono uppercase cursor-pointer"
                  >
                    View Inbox ({messagesLog.length})
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[#f3e600] block font-bold">Your Name / Organization:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Technical Recruiter / Engineering Lead"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-[#f3e600] focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[#f3e600] block font-bold">Contact Email:</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-[#f3e600] focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[#f3e600] block font-bold">Message Inquiry Payload:</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, role, or collaboration opportunities..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-[#f3e600] focus:outline-none transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#f3e600] hover:bg-yellow-300 text-slate-950 font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(243,230,0,0.3)] flex items-center justify-center gap-2 cursor-pointer cyber-cut-sm"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Dispatching...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> DISPATCH INQUIRY PAYLOAD
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#10121a] border border-[#f3e600]/30 p-6 space-y-5 shadow-2xl border-l-4 border-l-[#f3e600]">
            <h3 className="text-base font-black font-heading text-slate-100 uppercase">
              Developer Coordinates
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-950 p-3.5 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-[#f3e600]" />
                  <span>Direct Email</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-[#f3e600] hover:underline flex items-center gap-1 text-[11px] cursor-pointer font-bold"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? 'Copied' : 'Copy Email'}
                </button>
              </div>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 p-3.5 border border-slate-800 flex items-center justify-between text-slate-300 hover:border-[#f3e600]/60 transition-all block"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#00f0ff]" />
                  <span>github.com/{PERSONAL_INFO.username}</span>
                </div>
                <span className="text-[#f3e600] text-[11px] font-bold">6 REPOS</span>
              </a>
            </div>

            <div className="bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs font-sans text-slate-400">
              <span className="font-mono text-[#f3e600] font-bold block">Academic & Professional Status:</span>
              <p>
                Currently pursuing Master of Computer Applications (MCA, Sem 3) in Bengaluru, India. Open to software engineering roles, satellite & AI system development, and technical collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
