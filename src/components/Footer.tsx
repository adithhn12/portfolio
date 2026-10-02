import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0b0e] border-t border-slate-800/80 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          <span className="text-[#f3e600] font-black font-heading tracking-wider uppercase">{PERSONAL_INFO.name}</span>
          <span className="mx-2 text-slate-600">•</span>
          <span>@{PERSONAL_INFO.username}</span>
          <span className="mx-2 text-slate-600">•</span>
          <span className="text-[#00f0ff] font-bold">{PERSONAL_INFO.degree}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f3e600] transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" /> GitHub
          </a>
          <a
            href="#workbench"
            className="hover:text-[#f3e600] transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" /> Workbench
          </a>
        </div>
      </div>
    </footer>
  );
};
