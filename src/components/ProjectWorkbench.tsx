import React, { useState } from 'react';
import type { CategoryType } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import {
  FolderGit2,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';

// Import Simulators (Excludes TextToImage)
import { SatelliteSimulator } from './simulators/SatelliteSimulator';
import { DocuChatSimulator } from './simulators/DocuChatSimulator';
import { AquaSphereSimulator } from './simulators/AquaSphereSimulator';
import { OrderFlowSimulator } from './simulators/OrderFlowSimulator';
import { SkyRunnerSimulator } from './simulators/SkyRunnerSimulator';
import { RetroSneaksSimulator } from './simulators/RetroSneaksSimulator';

interface ProjectWorkbenchProps {
  onOpenCommandPalette: () => void;
}

export const ProjectWorkbench: React.FC<ProjectWorkbenchProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SIMULATOR' | 'CODE'>('OVERVIEW');

  // Filter projects by category
  const filteredProjects = PROJECTS_DATA.filter(
    (p) => selectedCategory === 'ALL' || p.category === selectedCategory
  );

  // Selected project details
  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  // Helper to render matching simulator
  const renderSimulatorComponent = () => {
    switch (activeProject.id) {
      case 'satellite-classification':
        return <SatelliteSimulator />;
      case 'docuchat':
        return <DocuChatSimulator />;
      case 'aquasphere':
        return <AquaSphereSimulator />;
      case 'orderflow':
        return <OrderFlowSimulator />;
      case 'skyrunner':
        return <SkyRunnerSimulator />;
      case 'retrosneaks':
        return <RetroSneaksSimulator />;
      default:
        return <SatelliteSimulator />;
    }
  };

  return (
    <section id="workbench" className="py-12 bg-[#0a0b0e] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#f3e600] mb-1">
              <FolderGit2 className="w-4 h-4" />
              <span>SIGNATURE WORKSPACE</span>
              <span>•</span>
              <span className="text-slate-400">6 AUTHENTIC PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-100 uppercase tracking-wide">
              Interactive Systems Workbench
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Projects (6)' },
              { id: 'AI_CV', label: 'AI & Remote Sensing (2)' },
              { id: 'SMART_SYSTEMS', label: 'Smart Infrastructure & Operations (2)' },
              { id: 'GAMES_WEB', label: 'Games & Web (2)' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#f3e600] text-slate-950 shadow-[0_0_12px_rgba(243,230,0,0.3)]'
                    : 'bg-[#10121a] border border-slate-800 text-slate-400 hover:text-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Index List */}
          <div className="lg:col-span-4 space-y-3">
            <label className="text-xs font-mono text-[#f3e600] uppercase tracking-wider block mb-1 font-bold">
              Select Repository to Inspect:
            </label>

            <div className="space-y-2.5">
              {filteredProjects.map((p) => {
                const isSelected = p.id === activeProject.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setActiveTab('OVERVIEW');
                    }}
                    className={`w-full text-left p-4 border transition-all flex flex-col justify-between space-y-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#10121a] border-[#f3e600] text-slate-100 shadow-[0_0_15px_rgba(243,230,0,0.2)] border-l-4 border-l-[#f3e600]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-[#10121a] hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-heading font-black text-sm text-slate-100 leading-snug">
                        {p.name}
                      </span>
                      {p.liveUrl && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#f3e600] bg-[#f3e600]/10 px-2 py-0.5 border border-[#f3e600]/30 font-bold">
                          LIVE DEMO
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 font-sans">
                      {p.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {p.techStack.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-500">
                          +{p.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Inspector Workspace */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-[#10121a] border border-[#f3e600]/30 p-6 space-y-6 shadow-2xl">
              {/* Workspace Header & Actions */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] mb-1 font-bold">
                    <span>CATEGORY: {activeProject.categoryName.toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-black font-heading text-[#f3e600] uppercase">
                    {activeProject.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-1">
                    {activeProject.tagline}
                  </p>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2.5">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-4 h-4 text-[#f3e600]" /> Repo Code
                  </a>

                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#f3e600] hover:bg-yellow-300 text-slate-950 font-mono text-xs font-black uppercase transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(243,230,0,0.3)]"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('OVERVIEW')}
                  className={`px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'OVERVIEW'
                      ? 'bg-[#f3e600] text-slate-950 font-black uppercase'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Overview & Problem
                </button>
                <button
                  onClick={() => setActiveTab('SIMULATOR')}
                  className={`px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'SIMULATOR'
                      ? 'bg-[#f3e600] text-slate-950 font-black uppercase'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Interactive Simulator
                </button>
                <button
                  onClick={() => setActiveTab('CODE')}
                  className={`px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'CODE'
                      ? 'bg-[#f3e600] text-slate-950 font-black uppercase'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" /> Code & Specs
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'OVERVIEW' && (
                <div className="space-y-6">
                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 border border-slate-800 space-y-2 border-t-2 border-t-rose-500">
                      <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider block">
                        Problem Addressed:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {activeProject.problem}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 border border-slate-800 space-y-2 border-t-2 border-t-[#f3e600]">
                      <span className="text-xs font-mono text-[#f3e600] font-bold uppercase tracking-wider block">
                        Engineering Solution:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {activeProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Built Details List */}
                  <div className="bg-slate-950 p-4 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono text-[#00f0ff] font-bold uppercase tracking-wider block">
                      Key Technical Implementation:
                    </span>
                    <ul className="space-y-2">
                      {activeProject.builtDetails.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#f3e600] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture Input/Output Flow */}
                  <div className="bg-slate-950 p-4 border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider block font-bold">
                      Data Pipeline Flow:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-[#10121a] p-3 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block mb-1">INPUT STAGE</span>
                        <span className="text-slate-200 block leading-tight font-sans">
                          {activeProject.architecture.inputs.join(' • ')}
                        </span>
                      </div>
                      <div className="bg-[#10121a] p-3 border border-slate-800">
                        <span className="text-[10px] text-[#f3e600] block mb-1">CORE ENGINE</span>
                        <span className="text-slate-200 block leading-tight font-sans">
                          {activeProject.architecture.coreEngine}
                        </span>
                      </div>
                      <div className="bg-[#10121a] p-3 border border-slate-800">
                        <span className="text-[10px] text-[#00f0ff] block mb-1">OUTPUT DISPATCH</span>
                        <span className="text-slate-200 block leading-tight font-sans">
                          {activeProject.architecture.outputs.join(' • ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE SIMULATOR */}
              {activeTab === 'SIMULATOR' && (
                <div className="space-y-4">
                  {renderSimulatorComponent()}
                </div>
              )}

              {/* TAB 3: CODE & SPECS */}
              {activeTab === 'CODE' && (
                <div className="space-y-5">
                  {/* Tech Stack Chips */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Technologies & Libraries:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-950 border border-slate-800 text-[#f3e600] font-mono text-xs font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Snippet Box */}
                  {activeProject.codeSnippet ? (
                    <div className="bg-slate-950 border border-slate-800 font-mono text-xs">
                      <div className="bg-[#10121a] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1.5 text-[#00f0ff] font-bold">
                          <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
                          {activeProject.codeSnippet.title}
                        </span>
                        <span>{activeProject.codeSnippet.language.toUpperCase()}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
                        <code>{activeProject.codeSnippet.code}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-6 border border-slate-800 text-center font-mono text-xs text-slate-400">
                      Full repository code available on GitHub: {' '}
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f3e600] underline underline-offset-2 font-bold"
                      >
                        {activeProject.githubUrl}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
