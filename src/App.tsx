import { useState } from 'react';
import type { ViewMode } from './types';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { ProjectWorkbench } from './components/ProjectWorkbench';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { GitHubActivity } from './components/GitHubActivity';
import { ContactConsole } from './components/ContactConsole';
import { Footer } from './components/Footer';
import { PROJECTS_DATA } from './data/portfolioData';
import { GithubIcon } from './components/GithubIcon';
import { ExternalLink } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('DOSSIER');

  const scrollToWorkbench = () => {
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-100 flex flex-col justify-between selection:bg-[#f3e600] selection:text-black">
      <div>
        {/* Navigation Bar */}
        <HeaderNav
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Hero Banner */}
        <HeroSection onScrollToWorkbench={scrollToWorkbench} />

        {/* Primary Dynamic View Content */}
        {viewMode === 'DOSSIER' && (
          <ProjectWorkbench />
        )}

        {viewMode === 'MATRIX' && (
          <section id="matrix-view" className="py-12 bg-[#0a0b0e] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold font-heading">Matrix Grid Overview</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Spatial Repo Card Grid for Quick Scanning
                </p>
              </div>
              <button
                onClick={() => setViewMode('DOSSIER')}
                className="px-3 py-1.5 bg-[#f3e600] text-slate-950 font-mono font-bold text-xs cursor-pointer"
              >
                Switch to Interactive Dossier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id} className="bg-[#10121a] border border-slate-800 p-5 space-y-4 flex flex-col justify-between">
                  {p.imageUrl && (
                    <div className="relative aspect-video overflow-hidden border-b border-slate-800 -mx-5 -mt-5 mb-1 group">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent opacity-60" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#00f0ff] bg-slate-950 px-2 py-0.5 border border-[#00f0ff]/30 font-bold">
                      {p.categoryName}
                    </span>
                    <h3 className="font-heading font-black text-lg text-slate-100">{p.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{p.problem}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="flex flex-wrap gap-1">
                      {p.techStack.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono pt-2">
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#f3e600] flex items-center gap-1 font-bold">
                        <GithubIcon className="w-3.5 h-3.5" /> Code
                      </a>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#f3e600] font-bold flex items-center gap-1">
                          Live App <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {viewMode === 'ARCHITECT' && <ArchitectureMatrix />}

        {/* GitHub Repos Telemetry */}
        <GitHubActivity />

        {/* Contact Console */}
        <ContactConsole />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
