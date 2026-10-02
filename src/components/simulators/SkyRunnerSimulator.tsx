import React from 'react';
import { Gamepad2, ExternalLink, Play, Trophy } from 'lucide-react';

export const SkyRunnerSimulator: React.FC = () => {
  return (
    <div className="bg-[#10121a] border border-[#f3e600]/40 p-5 space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#f3e600]/10 border border-[#f3e600]/30 text-[#f3e600]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-100 font-heading uppercase tracking-wider flex items-center gap-2">
              SkyRunner Godot WebGL Arcade <span className="text-xs text-[#00f0ff] font-mono font-bold bg-[#00f0ff]/10 px-2 py-0.5 border border-[#00f0ff]/30">LIVE GAME</span>
            </h4>
            <p className="text-xs text-[#f3e600] font-mono">
              Godot Engine 4.x • GDScript (player.gd, coin.gd, high_scores.gd) • WebGL Export
            </p>
          </div>
        </div>

        <a
          href="https://adithhn12.github.io/SkyRunner/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#f3e600] hover:bg-yellow-300 text-slate-950 font-black text-xs font-mono uppercase transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(243,230,0,0.3)] cyber-cut-sm"
        >
          <ExternalLink className="w-4 h-4" /> Open Fullscreen Tab
        </a>
      </div>

      {/* Playable Embedded Godot Game Frame */}
      <div className="space-y-3">
        <div className="relative w-full aspect-video max-h-[500px] bg-slate-950 border-2 border-[#f3e600]/50 shadow-[0_0_25px_rgba(243,230,0,0.15)] mx-auto overflow-hidden">
          <iframe
            src="https://adithhn12.github.io/SkyRunner/"
            title="Play SkyRunner Godot WebGL Game"
            className="w-full h-full border-0 block"
            allow="autoplay; fullscreen; focus-without-user-activation"
          />
        </div>

        {/* Game Info & Controls Footer Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-950 p-3.5 border border-slate-800 space-y-1 text-xs font-mono">
            <span className="text-[#f3e600] font-bold flex items-center gap-1.5 uppercase">
              <Trophy className="w-3.5 h-3.5 text-[#f3e600]" /> GAME OBJECTIVE:
            </span>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Collect 10 coins in the fastest time! Your completion time will be recorded and saved directly to the local High Score table (<code className="text-[#00f0ff]">high_scores.gd</code>).
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 border border-slate-800 space-y-1 text-xs font-mono">
            <span className="text-[#00f0ff] font-bold flex items-center gap-1.5 uppercase">
              <Play className="w-3.5 h-3.5 text-[#00f0ff] fill-[#00f0ff]" /> CONTROLS & TIPS:
            </span>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Click inside the game window to focus. Use <strong className="text-[#f3e600]">A / D</strong> or <strong className="text-[#f3e600]">Arrow Keys</strong> to move & run, and <strong className="text-[#f3e600]">W / Spacebar</strong> to jump!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
