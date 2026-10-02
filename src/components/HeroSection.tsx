import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { Terminal, ArrowUpRight, Code, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onScrollToWorkbench: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToWorkbench }) => {
  return (
    <section className="relative pt-8 pb-10 border-b border-slate-800/80 bg-cyber-glow bg-cyber-grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Core Engineering Manifesto */}
          <div className="lg:col-span-8 space-y-5">
            {/* Top Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121a] border border-[#f3e600]/50 text-xs font-mono text-[#f3e600]">
              <span className="w-2 h-2 rounded-full bg-[#f3e600] animate-pulse" />
              <span>SOFTWARE & AI SYSTEMS ENGINEER</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#00f0ff] font-semibold">{PERSONAL_INFO.degree}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 font-heading leading-tight uppercase">
              Engineering Intelligence Across <br />
              <span className="text-[#f3e600] underline decoration-[#00f0ff] decoration-4 underline-offset-8">
                Satellites, AI Models & Systems.
              </span>
            </h1>

            {/* Bio */}
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              I am <strong className="text-[#f3e600] font-bold">{PERSONAL_INFO.name}</strong> (@{PERSONAL_INFO.username}), a Master of Computer Applications student in Bengaluru building end-to-end multi-spectral satellite deep learning pipelines, RAG query platforms, real-time water & manufacturing operations platforms, and 2D Godot game engines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToWorkbench}
                className="px-6 py-3.5 bg-[#f3e600] hover:bg-yellow-300 text-slate-950 font-heading font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(243,230,0,0.3)] flex items-center gap-2 group cursor-pointer cyber-cut-sm"
              >
                Explore Interactive Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#10121a] hover:bg-slate-900 border border-slate-700 text-slate-200 font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 cyber-cut-sm"
              >
                <GithubIcon className="w-4 h-4 text-[#f3e600]" /> GitHub Profile
              </a>
            </div>
          </div>

          {/* Right Column: High-Density Telemetry Card */}
          <div className="lg:col-span-4 bg-[#10121a] border border-[#f3e600]/30 p-5 space-y-4 shadow-[0_0_25px_rgba(0,0,0,0.8)] border-l-4 border-l-[#f3e600]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#f3e600]" /> SYSTEM TELEMETRY
              </span>
              <span className="text-[#00f0ff] font-bold">VERIFIED REPOS</span>
            </div>

            {/* 4 Core Stat Boxes */}
            <div className="grid grid-cols-2 gap-3">
              {PERSONAL_INFO.stats.map((st, idx) => (
                <div key={idx} className="bg-slate-950 p-3 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {st.label}
                  </span>
                  <span className="text-lg font-black font-heading text-[#f3e600] mt-1 block">
                    {st.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Location & Academic Status */}
            <div className="bg-slate-950 p-3 border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" /> Location:
                </span>
                <span className="text-slate-200 font-semibold">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-[#f3e600]" /> Focus:
                </span>
                <span className="text-[#f3e600] font-bold">AI, Remote Sensing, Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
