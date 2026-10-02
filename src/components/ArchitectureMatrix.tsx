import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Cpu, Brain, Globe, Database, Gamepad2, CheckCircle } from 'lucide-react';

export const ArchitectureMatrix: React.FC = () => {
  return (
    <section id="architecture" className="py-12 bg-[#0a0b0e] border-t border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] mb-1 font-bold">
            <Cpu className="w-4 h-4" />
            <span>SYSTEM ARCHITECTURE & TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-100 uppercase tracking-wide">
            Core Engineering Toolchain
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Categorized by practical implementation depth across active domains.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. AI & Computer Vision */}
          <div className="bg-[#10121a] border border-[#f3e600]/30 p-5 space-y-4 border-t-4 border-t-[#f3e600]">
            <div className="flex items-center gap-2.5 text-[#f3e600] font-heading font-black text-sm border-b border-slate-800 pb-3 uppercase">
              <Brain className="w-4 h-4" />
              <span>AI & Remote Sensing</span>
            </div>
            <ul className="space-y-2">
              {PERSONAL_INFO.skills.ai_ml.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950 p-2 border border-slate-800">
                  <span>{s}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#f3e600]" />
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Web Systems & Frameworks */}
          <div className="bg-[#10121a] border border-[#00f0ff]/30 p-5 space-y-4 border-t-4 border-t-[#00f0ff]">
            <div className="flex items-center gap-2.5 text-[#00f0ff] font-heading font-black text-sm border-b border-slate-800 pb-3 uppercase">
              <Globe className="w-4 h-4" />
              <span>Web Systems & Frontend</span>
            </div>
            <ul className="space-y-2">
              {PERSONAL_INFO.skills.web_systems.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950 p-2 border border-slate-800">
                  <span>{s}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#00f0ff]" />
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Backend & Cloud */}
          <div className="bg-[#10121a] border border-amber-500/30 p-5 space-y-4 border-t-4 border-t-amber-400">
            <div className="flex items-center gap-2.5 text-amber-400 font-heading font-black text-sm border-b border-slate-800 pb-3 uppercase">
              <Database className="w-4 h-4" />
              <span>Backend & Operations</span>
            </div>
            <ul className="space-y-2">
              {PERSONAL_INFO.skills.backend_cloud.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950 p-2 border border-slate-800">
                  <span>{s}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Interactive & Game Engine */}
          <div className="bg-[#10121a] border border-purple-500/30 p-5 space-y-4 border-t-4 border-t-purple-400">
            <div className="flex items-center gap-2.5 text-purple-400 font-heading font-black text-sm border-b border-slate-800 pb-3 uppercase">
              <Gamepad2 className="w-4 h-4" />
              <span>Game Engine & WebGL</span>
            </div>
            <ul className="space-y-2">
              {PERSONAL_INFO.skills.interactive_game.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950 p-2 border border-slate-800">
                  <span>{s}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
