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
    <section id="github" className="py-16 sm:py-20 bg-[#0a0b0e] border-b border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-100 tracking-tight">
              Code Repositories
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              Project repositories on GitHub (@{PERSONAL_INFO.username}), including current in-progress work.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <GithubIcon className="w-4 h-4 text-slate-300" />
            <span>GitHub Profile</span>
          </a>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#10121a] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all hover:shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-heading font-bold text-base text-slate-100 group-hover:text-[#f3e600] transition-colors">
                    {repo.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30 font-medium">
                    {repo.categoryName.split(' ')[0]}
                  </span>
                </div>

                {repo.repositoryVisibility === 'private' && <span className="inline-block rounded border border-amber-800/40 bg-amber-950/30 px-2 py-0.5 text-[10px] font-mono text-amber-200">Private repository · in progress</span>}

                <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                  {repo.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {repo.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Git Clone */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleCopyClone(repo.githubUrl)}
                    className="text-[11px] font-mono text-slate-400 hover:text-[#f3e600] flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedRepo === repo.githubUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#f3e600]" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> git clone
                      </>
                    )}
                  </button>

                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#f3e600] flex items-center gap-1 text-[11px] font-medium transition-colors"
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
