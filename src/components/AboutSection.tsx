import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Brain, Globe, Database, Gamepad2, GraduationCap, MapPin, Code, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#0a0b0e] font-sans border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="border-b border-slate-800 pb-5">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-100 tracking-tight">
            About Me
          </h2>
          <p className="text-sm text-slate-400 mt-1.5 font-sans max-w-2xl">
            Education, engineering background, and core technical skills.
          </p>
        </div>

        {/* Top Story & Background Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Biography & Approach */}
          <div className="lg:col-span-7 bg-[#10121a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
            <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/30 inline-block">
              Background & Profile
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100">
              Building practical software with deep technical curiosity.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              I am a Master of Computer Applications (MCA) student at BMS College of Engineering (BMSCE), Bengaluru. My work centers on building end-to-end software solutions—from machine learning pipelines and computer vision models to full-stack web applications and interactive 2D games.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              I believe in learning through execution: training satellite classification neural nets with test-time augmentation, building retrieval-augmented generation (RAG) tools, implementing water distribution operations dashboards, and shipping playable games on Godot 4.
            </p>
          </div>

          {/* Education & Academic Highlights */}
          <div className="lg:col-span-5 bg-[#10121a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-medium text-[#f3e600] bg-yellow-950/30 px-2.5 py-0.5 rounded-full border border-yellow-700/30 inline-block">
                Academic Background
              </span>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-[#f3e600] shrink-0 mt-0.5 border border-slate-800">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-100 text-sm sm:text-base">
                      {PERSONAL_INFO.degree}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans">
                      BMS College of Engineering (BMSCE) · {PERSONAL_INFO.semester}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-cyan-400 shrink-0 mt-0.5 border border-slate-800">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-100 text-sm sm:text-base">
                      Bengaluru, Karnataka, India
                    </h4>
                    <p className="text-xs text-slate-400 font-sans">
                      Active tech hub & academic campus
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-emerald-400 shrink-0 mt-0.5 border border-slate-800">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-100 text-sm sm:text-base">
                      Core Domains
                    </h4>
                    <p className="text-xs text-slate-400 font-sans">
                      AI & Computer Vision • Full-Stack Web • Game Engineering
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>GitHub: @{PERSONAL_INFO.username}</span>
              <span className="text-slate-300 font-medium">BMSCE, Bengaluru</span>
            </div>
          </div>
        </div>

        {/* Technical Skills & Toolchain Matrix */}
        <div className="space-y-6 pt-4">
          <div>
            <h3 className="text-xl font-bold font-heading text-slate-100 tracking-tight">
              Technical Skills & Toolchain
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Technologies and tools categorized by practical application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. AI & Computer Vision */}
            <div className="bg-[#10121a] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition-colors">
              <div className="flex items-center gap-2.5 text-[#f3e600] font-heading font-bold text-sm border-b border-slate-800/80 pb-3">
                <Brain className="w-4 h-4" />
                <span>AI & Remote Sensing</span>
              </div>
              <ul className="space-y-2">
                {PERSONAL_INFO.skills.ai_ml.map((s, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/70 px-2.5 py-1.5 rounded-md border border-slate-800/80">
                    <span>{s}</span>
                    <Check className="w-3.5 h-3.5 text-[#f3e600]" />
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Web Systems & Frontend */}
            <div className="bg-[#10121a] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition-colors">
              <div className="flex items-center gap-2.5 text-cyan-400 font-heading font-bold text-sm border-b border-slate-800/80 pb-3">
                <Globe className="w-4 h-4" />
                <span>Web Systems & Frontend</span>
              </div>
              <ul className="space-y-2">
                {PERSONAL_INFO.skills.web_systems.map((s, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/70 px-2.5 py-1.5 rounded-md border border-slate-800/80">
                    <span>{s}</span>
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Backend & Cloud */}
            <div className="bg-[#10121a] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition-colors">
              <div className="flex items-center gap-2.5 text-amber-400 font-heading font-bold text-sm border-b border-slate-800/80 pb-3">
                <Database className="w-4 h-4" />
                <span>Backend & Cloud</span>
              </div>
              <ul className="space-y-2">
                {PERSONAL_INFO.skills.backend_cloud.map((s, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/70 px-2.5 py-1.5 rounded-md border border-slate-800/80">
                    <span>{s}</span>
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Interactive & Game Engine */}
            <div className="bg-[#10121a] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition-colors">
              <div className="flex items-center gap-2.5 text-purple-400 font-heading font-bold text-sm border-b border-slate-800/80 pb-3">
                <Gamepad2 className="w-4 h-4" />
                <span>Game Engine & WebGL</span>
              </div>
              <ul className="space-y-2">
                {PERSONAL_INFO.skills.interactive_game.map((s, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/70 px-2.5 py-1.5 rounded-md border border-slate-800/80">
                    <span>{s}</span>
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
