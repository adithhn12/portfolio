import React from 'react';
import type { ViewMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { LayoutGrid, Layers, Cpu } from 'lucide-react';

interface HeaderNavProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  viewMode,
  setViewMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0b0e]/95 backdrop-blur-md border-b border-[#f3e600]/30 shadow-[0_4px_20px_rgba(243,230,0,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left Telemetry Identity */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
          >
            <img
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              className="w-8 h-8 rounded-none border border-[#f3e600] object-cover group-hover:scale-105 transition-all shadow-[0_0_10px_rgba(243,230,0,0.3)]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-base text-[#f3e600] group-hover:text-amber-300 transition-all tracking-wider uppercase">
                  {PERSONAL_INFO.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 border border-[#00f0ff]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                  SYS_READY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {PERSONAL_INFO.degree} • @{PERSONAL_INFO.username}
              </p>
            </div>
          </a>
        </div>

        {/* Center View Mode Switcher */}
        <div className="flex items-center bg-[#10121a] border border-slate-800 p-1 rounded-none shadow-inner">
          <button
            onClick={() => setViewMode('DOSSIER')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'DOSSIER'
                ? 'bg-[#f3e600] text-slate-950 shadow-[0_0_10px_rgba(243,230,0,0.4)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Interactive Dossier
          </button>
          <button
            onClick={() => setViewMode('MATRIX')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'MATRIX'
                ? 'bg-[#f3e600] text-slate-950 shadow-[0_0_10px_rgba(243,230,0,0.4)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Matrix View
          </button>
          <button
            onClick={() => setViewMode('ARCHITECT')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'ARCHITECT'
                ? 'bg-[#f3e600] text-slate-950 shadow-[0_0_10px_rgba(243,230,0,0.4)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Architecture Specs
          </button>
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          {/* GitHub Profile Link */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#10121a] hover:bg-[#f3e600] border border-[#f3e600]/40 text-slate-200 hover:text-slate-950 transition-all"
            title="View GitHub Profile @adithhn12"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
