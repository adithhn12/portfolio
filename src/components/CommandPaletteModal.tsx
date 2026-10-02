import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Search, X, ArrowRight } from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.tagline.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-[#10121a] border border-[#f3e600]/50 rounded-none w-full max-w-2xl shadow-[0_0_30px_rgba(243,230,0,0.2)] overflow-hidden font-sans space-y-0 animate-in fade-in zoom-in-95 duration-200">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#f3e600]" />
          <input
            type="text"
            autoFocus
            placeholder="Search repositories & tech (e.g. ResNet50V2, RAG, Godot, TensorFlow, BWSSB)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 font-mono text-xs focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-[#f3e600] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-2">
          {filteredProjects.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching repositories found for "{query}".
            </div>
          ) : (
            filteredProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProject(p.id);
                  onClose();
                }}
                className="w-full text-left p-3 bg-slate-950 hover:bg-[#f3e600] text-slate-300 hover:text-slate-950 border border-slate-800 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-sm uppercase">
                      {p.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-current font-bold">
                      {p.categoryName}
                    </span>
                  </div>
                  <p className="text-xs line-clamp-1 font-mono opacity-80">
                    {p.tagline}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-[#f3e600]">
          <span>COMMAND PALETTE MATRIX</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
