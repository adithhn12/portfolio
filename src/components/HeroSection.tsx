import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { ArrowUpRight, Cpu, MapPin, Code, ExternalLink } from 'lucide-react';

interface HeroSectionProps {
  onScrollToWorkbench: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToWorkbench }) => {
  // Core technologies for the bottom strip
  const coreTech = [
    { name: 'Python / TensorFlow', color: '#f3e600' },
    { name: 'ResNet50V2 & Grad-CAM', color: '#00f0ff' },
    { name: 'LangChain & RAG', color: '#f59e0b' },
    { name: 'Godot Engine 4 (GDScript)', color: '#c084fc' },
    { name: 'React & TypeScript', color: '#38bdf8' },
    { name: 'FAISS Vector Search', color: '#34d399' },
    { name: 'Supabase & REST APIs', color: '#fb7185' },
    { name: 'YOLOv8 & Coffee Vision', color: '#4ade80' },
    { name: 'Random Forest & Fuzzy Logic', color: '#f97316' }
  ];

  return (
    <section id="home" className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-slate-800/80 overflow-hidden font-sans">
      {/* Subtle background: faint cyber grid + restrained ambient glows */}
      <div className="absolute inset-0 bg-cyber-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-[#f3e600]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-8 left-12 w-56 h-56 bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 space-y-5">
            {/* Restrained accent line + Role indicator */}
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-0.5 bg-[#f3e600]" />
              <span className="text-xs font-mono text-[#f3e600] font-semibold tracking-wider uppercase">
                MCA Student · Software & AI
              </span>
            </div>

            {/* Headline with comfortable line wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold tracking-tight text-slate-100 font-heading leading-[1.16] uppercase">
              Exploring AI, Software <br />
              <span className="text-[#f3e600]">& Technology</span> Through Projects.
            </h1>

            {/* Introduction with constrained readable width */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
              MCA student at BMSCE, Bengaluru, exploring AI/ML, software development, computer vision, and creative projects through hands-on work.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onScrollToWorkbench}
                className="px-5 py-2.5 bg-[#f3e600] hover:bg-[#ffe600] text-slate-950 font-bold text-xs sm:text-sm tracking-wide rounded-md transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                View My Projects
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-xs sm:text-sm tracking-wide rounded-md transition-all flex items-center gap-2 group"
              >
                <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-[#f3e600] transition-colors" />
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Right Column: Technical Overview Card (Modernized Telemetry matching current sleek theme) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-md">
              {/* Restrained Ambient Glow behind Card */}
              <div className="absolute -inset-1 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-[#f3e600]/15 via-[#00f0ff]/10 to-transparent" />

              {/* Glassmorphic Card Container */}
              <div className="relative bg-[#10121a]/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
                {/* Top Accent Gradient Line */}
                <div className="h-0.5 w-full bg-gradient-to-r from-[#f3e600] via-[#00f0ff]/40 to-transparent" />

                {/* Card Header Bar: Professional Title */}
                <div className="px-5 py-3.5 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 font-semibold flex items-center gap-2 tracking-wide">
                    <Cpu className="w-4 h-4 text-[#f3e600]" />
                    <span>TECHNICAL OVERVIEW</span>
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-medium bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                    9 PROJECTS · 1 IN PROGRESS
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* 4 Core Stat Boxes */}
                  <div className="grid grid-cols-2 gap-3">
                    {PERSONAL_INFO.stats.map((st, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800/90 hover:border-slate-700 transition-colors"
                      >
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          {st.label}
                        </span>
                        <span className="text-lg font-bold font-heading text-[#f3e600] mt-1 block">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Location & Academic Focus Strip */}
                  <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800/90 text-xs font-mono text-slate-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Location:
                      </span>
                      <span className="text-slate-200 font-semibold">BMSCE, Bengaluru</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-[#f3e600]" /> Focus:
                      </span>
                      <span className="text-[#f3e600] font-bold">AI/ML, Web, Vision & AgriTech</span>
                    </div>
                  </div>

                  {/* Card Quick Actions */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={onScrollToWorkbench}
                      className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      Explore Projects ↓
                    </button>

                    <a
                      href={PERSONAL_INFO.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      @{PERSONAL_INFO.username} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Engineering Stack Ticker Strip */}
        <div className="pt-6 border-t border-slate-800/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold shrink-0">
              Core Engineering Stack:
            </span>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-400">
              {coreTech.map((tech, idx) => (
                <span
                  key={idx}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
