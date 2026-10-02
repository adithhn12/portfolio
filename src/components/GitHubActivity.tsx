import React, { useState } from 'react';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import { Copy, Check, ExternalLink } from 'lucide-react';

export const GitHubActivity: React.FC = () => {
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  const handleCopyClone = (repoUrl: string) => {
    const cloneCmd = `git clone ${repoUrl}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopiedRepo(repoUrl);
    setTimeout(() => {
      setCopiedRepo(null);
    }, 2000);
  };

  return (
    <section id="github" className="py-12 bg-[#0a0b0e] border-t border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#f3e600] mb-1 font-bold">
              <GithubIcon className="w-4 h-4 text-[#f3e600]" />
              <span>GITHUB TELEMETRY & REPOSITORY SPECTRUM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-100 uppercase tracking-wide">
              Verified Code Repositories (@{PERSONAL_INFO.username})
            </h2>
          </div>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#10121a] hover:bg-slate-900 border border-[#f3e600]/40 text-slate-200 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4 text-[#f3e600]" /> View GitHub Profile
          </a>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS_DATA.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#10121a] border border-slate-800 hover:border-[#f3e600]/60 p-5 space-y-4 flex flex-col justify-between transition-all hover:shadow-[0_0_20px_rgba(243,230,0,0.15)] group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-base text-slate-100 group-hover:text-[#f3e600] transition-colors uppercase">
                    {repo.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#00f0ff] bg-slate-950 px-2 py-0.5 border border-[#00f0ff]/30 font-bold">
                    {repo.categoryName.split(' ')[0]}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                  {repo.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {repo.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Git Clone */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => handleCopyClone(repo.githubUrl)}
                    className="text-[11px] text-slate-400 hover:text-[#f3e600] flex items-center gap-1 bg-slate-950 px-2.5 py-1 border border-slate-800 transition-all cursor-pointer font-bold"
                  >
                    {copiedRepo === repo.githubUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#f3e600]" /> Copied Git Clone!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy `git clone`
                      </>
                    )}
                  </button>

                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f3e600] hover:underline flex items-center gap-1 text-[11px] font-bold"
                  >
                    Repository <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
