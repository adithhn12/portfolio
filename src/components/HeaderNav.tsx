import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { Menu, X } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0b0e]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Identity: Profile Picture + Name */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img
            src={PERSONAL_INFO.avatarUrl}
            alt={PERSONAL_INFO.name}
            className="w-9 h-9 rounded-full border border-slate-700 group-hover:border-[#f3e600] object-cover transition-colors"
          />
          <span className="font-heading font-bold text-base text-slate-100 group-hover:text-[#f3e600] transition-colors tracking-wide uppercase">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Center: Clean Conventional Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-[#f3e600] hover:bg-slate-900/60 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: GitHub Link */}
        <div className="flex items-center gap-2">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-md transition-all group"
            title="View GitHub Profile @adithhn12"
          >
            <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-[#f3e600] transition-colors" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-[#0a0b0e]/98 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-[#f3e600] hover:bg-slate-900/60 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
