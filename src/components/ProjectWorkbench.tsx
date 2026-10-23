import React, { useState } from 'react';
import type { CategoryType } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';
import {
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  Terminal,
  LayoutGrid,
  Maximize2
} from 'lucide-react';

// Import Simulators
import { SatelliteSimulator } from './simulators/SatelliteSimulator';
import { DocuChatSimulator } from './simulators/DocuChatSimulator';
import { AquaSphereSimulator } from './simulators/AquaSphereSimulator';
import { OrderFlowSimulator } from './simulators/OrderFlowSimulator';
import { TalesOfEverwoodSimulator } from './simulators/TalesOfEverwoodSimulator';
import { SkyRunnerSimulator } from './simulators/SkyRunnerSimulator';
import { RetroSneaksSimulator } from './simulators/RetroSneaksSimulator';

interface ProjectWorkbenchProps {
  externalProjectId?: string;
}

export const ProjectWorkbench: React.FC<ProjectWorkbenchProps> = ({ externalProjectId }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(externalProjectId || PROJECTS_DATA[0].id);
  const [prevExternalId, setPrevExternalId] = useState<string | undefined>(externalProjectId);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SIMULATOR' | 'CODE'>('OVERVIEW');
  const [viewFormat, setViewFormat] = useState<'WORKBENCH' | 'GRID'>('WORKBENCH');

  if (externalProjectId && externalProjectId !== prevExternalId) {
    setPrevExternalId(externalProjectId);
    setSelectedProjectId(externalProjectId);
    setViewFormat('WORKBENCH');
    setActiveTab('OVERVIEW');
  }

  // Filter projects by category (preserving project order: Tales of Everwood above SkyRunner)
  const filteredProjects = PROJECTS_DATA.filter(
    (p) => selectedCategory === 'ALL' || p.category === selectedCategory
  );

  // Selected project details
  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  // Helper to render matching simulator
  const renderSimulatorComponent = () => {
    switch (activeProject.id) {
      case 'tales-of-everwood':
        return <TalesOfEverwoodSimulator />;
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
        return <TalesOfEverwoodSimulator />;
    }
  };

  return (
    <section id="projects" className="pt-10 pb-16 sm:pt-12 sm:pb-20 bg-[#0a0b0e] font-sans border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 font-sans max-w-2xl">
              Interactive demonstrations, game engines, computer vision models, and full-stack software systems.
            </p>
          </div>

          {/* Controls: View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setViewFormat('WORKBENCH')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewFormat === 'WORKBENCH'
                    ? 'bg-[#f3e600] text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Detailed View
              </button>
              <button
                onClick={() => setViewFormat('GRID')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewFormat === 'GRID'
                    ? 'bg-[#f3e600] text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid View
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Simple and less box-heavy) */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: `All Projects (${PROJECTS_DATA.length})` },
            { id: 'AI_CV', label: `AI & Remote Sensing (${PROJECTS_DATA.filter((p) => p.category === 'AI_CV').length})` },
            { id: 'SMART_SYSTEMS', label: `Smart Infrastructure (${PROJECTS_DATA.filter((p) => p.category === 'SMART_SYSTEMS').length})` },
            { id: 'GAMES_WEB', label: `Games & Web (${PROJECTS_DATA.filter((p) => p.category === 'GAMES_WEB').length})` }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryType)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#f3e600] text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* VIEW 1: WORKBENCH (Master-Detail with Interactive Demos) */}
        {viewFormat === 'WORKBENCH' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Index List of Project Cards */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-3">
              <div className="space-y-3">
                {filteredProjects.map((p) => {
                  const isSelected = p.id === activeProject.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setActiveTab('OVERVIEW');
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#141724] border-[#f3e600] shadow-sm ring-1 ring-[#f3e600]/30'
                          : 'bg-[#10121a] border-slate-800/80 text-slate-400 hover:border-slate-700 hover:bg-[#121522]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`font-heading font-bold text-sm sm:text-base leading-snug ${
                          isSelected ? 'text-[#f3e600]' : 'text-slate-100'
                        }`}>
                          {p.name}
                        </span>
                        {p.liveUrl && (
                          <span className="shrink-0 text-[10px] font-mono font-medium text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                            {p.id === 'tales-of-everwood' ? 'itch.io' : 'Demo'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 font-sans leading-relaxed">
                        {p.tagline}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {p.techStack.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
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
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Project Detail Inspector */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
                {/* Header & Primary Action Links */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div className="space-y-1.5">
                    <span className="inline-block text-[11px] font-mono font-medium text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/30">
                      {activeProject.categoryName}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-slate-100">
                      {activeProject.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-1 sm:pt-0">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <GithubIcon className="w-4 h-4 text-slate-300" /> Source Code
                    </a>

                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-[#f3e600] hover:bg-[#ffe600] text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {activeProject.id === 'tales-of-everwood' ? 'Play on itch.io' : 'Live Demo'}
                      </a>
                    )}
                  </div>
                </div>

                {/* Clean Tab Switcher */}
                <div className="flex items-center gap-1 border-b border-slate-800 pb-3">
                  <button
                    onClick={() => setActiveTab('OVERVIEW')}
                    className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'OVERVIEW'
                        ? 'bg-[#f3e600] text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Overview & Highlights
                  </button>
                  <button
                    onClick={() => setActiveTab('SIMULATOR')}
                    className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'SIMULATOR'
                        ? 'bg-[#f3e600] text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> {
                      activeProject.id === 'tales-of-everwood'
                        ? 'Play Everwood (itch.io)'
                        : activeProject.id === 'skyrunner'
                        ? 'Play SkyRunner (WebGL)'
                        : 'Interactive Demo'
                    }
                  </button>
                  <button
                    onClick={() => setActiveTab('CODE')}
                    className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'CODE'
                        ? 'bg-[#f3e600] text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" /> Code & Architecture
                  </button>
                </div>

                {/* TAB 1: OVERVIEW */}
                {activeTab === 'OVERVIEW' && (
                  <div className="space-y-6">
                    {/* Cover Art Banner if available */}
                    {activeProject.imageUrl && (
                      <div className="relative w-full h-48 sm:h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group">
                        <img
                          src={activeProject.imageUrl}
                          alt={activeProject.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                          <span className="text-slate-200 font-medium bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
                            {activeProject.name}
                          </span>
                          {activeProject.liveUrl && (
                            <a
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#f3e600] font-medium bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm hover:underline"
                            >
                              Launch Demo ↗
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Problem & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                        <span className="text-xs font-semibold text-rose-400 tracking-wide block uppercase">
                          Problem Context:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {activeProject.problem}
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                        <span className="text-xs font-semibold text-[#f3e600] tracking-wide block uppercase">
                          Technical Solution:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {activeProject.solution}
                        </p>
                      </div>
                    </div>

                    {/* Built Details List */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                      <span className="text-xs font-semibold text-cyan-400 tracking-wide block uppercase">
                        Key Implementation Highlights:
                      </span>
                      <ul className="space-y-2">
                        {activeProject.builtDetails.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-[#f3e600] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architecture Flow */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                      <span className="text-xs font-semibold text-slate-400 tracking-wide block uppercase">
                        Data Pipeline Flow:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="bg-[#10121a] p-3 rounded-lg border border-slate-800/90">
                          <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Input Stage</span>
                          <span className="text-slate-200 block leading-tight font-sans">
                            {activeProject.architecture.inputs.join(' • ')}
                          </span>
                        </div>
                        <div className="bg-[#10121a] p-3 rounded-lg border border-slate-800/90">
                          <span className="text-[10px] text-[#f3e600] block mb-1 font-mono uppercase">Core Engine</span>
                          <span className="text-slate-200 block leading-tight font-sans">
                            {activeProject.architecture.coreEngine}
                          </span>
                        </div>
                        <div className="bg-[#10121a] p-3 rounded-lg border border-slate-800/90">
                          <span className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase">Output Delivery</span>
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
                      <span className="text-xs font-medium text-slate-400 block uppercase">
                        Technologies & Libraries:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-950 rounded-md border border-slate-800 text-[#f3e600] font-mono text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    {activeProject.codeSnippet ? (
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
                        <div className="bg-[#10121a] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                            {activeProject.codeSnippet.title}
                          </span>
                          <span className="text-slate-500">{activeProject.codeSnippet.language.toUpperCase()}</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
                          <code>{activeProject.codeSnippet.code}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center font-mono text-xs text-slate-400">
                        Full repository code available on GitHub:{' '}
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f3e600] hover:underline font-medium"
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
        )}

        {/* VIEW 2: CARD GRID (Fast Scanning Card Grid) */}
        {viewFormat === 'GRID' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-[#10121a] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden p-5 space-y-4 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                {p.imageUrl && (
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-800/80 -mx-1 -mt-1 mb-1">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30 font-medium inline-block">
                    {p.categoryName}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-100 group-hover:text-[#f3e600] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {p.problem}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {p.techStack.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500 self-center">
                        +{p.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium pt-2">
                    <div className="flex items-center gap-3">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#f3e600] flex items-center gap-1 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Code
                      </a>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f3e600] hover:underline flex items-center gap-1"
                        >
                          Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setViewFormat('WORKBENCH');
                        setActiveTab('OVERVIEW');
                      }}
                      className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                      title="Open in Interactive Workbench"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
