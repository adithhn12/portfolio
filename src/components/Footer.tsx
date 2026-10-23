import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0b0e] border-t border-slate-800/80 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-100 font-bold font-heading">{PERSONAL_INFO.name}</span>
          <span className="text-slate-600">•</span>
          <span>{PERSONAL_INFO.degree}</span>
          <span className="text-slate-600">•</span>
          <span>BMSCE, Bengaluru</span>
        </div>

        <div className="flex items-center gap-5">
          <a href="#home" className="hover:text-[#f3e600] transition-colors">Home</a>
          <a href="#projects" className="hover:text-[#f3e600] transition-colors">Projects</a>
          <a href="#about" className="hover:text-[#f3e600] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#f3e600] transition-colors">Contact</a>
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f3e600] transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
