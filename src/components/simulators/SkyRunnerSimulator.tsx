import React, { useState, useEffect } from 'react';
import { Gamepad2, ExternalLink, Play, Trophy, Smartphone, Laptop, Copy, Check } from 'lucide-react';

export const SkyRunnerSimulator: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [forceLaunchMobile, setForceLaunchMobile] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgentMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const smallScreen = window.innerWidth < 768;
      setIsMobile(userAgentMobile || smallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://adithhn12.github.io/SkyRunner/');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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

      {/* Mobile Device Notice Banner (If user is on phone and hasn't clicked launch anyway) */}
      {isMobile && !forceLaunchMobile ? (
        <div className="bg-slate-950 border-2 border-[#f3e600]/60 p-5 space-y-4 text-xs font-mono shadow-xl">
          <div className="flex items-center gap-2.5 text-[#f3e600] font-bold text-sm border-b border-slate-800 pb-3 uppercase">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <span>DESKTOP RECOMMENDED FOR GAMEPLAY</span>
          </div>

          <p className="text-slate-200 font-sans text-xs leading-relaxed">
            SkyRunner is a 2D platformer engineered in Godot Engine using physical keyboard movement (<strong className="text-[#f3e600]">A / D / Arrow Keys</strong> to run, <strong className="text-[#f3e600]">Spacebar / W</strong> to jump). Mobile touch screens lack physical arrow keys required for full platformer velocity control.
          </p>

          <div className="bg-[#10121a] p-3.5 border border-slate-800 space-y-2 font-sans text-slate-300">
            <span className="font-mono text-[#00f0ff] font-bold block text-xs flex items-center gap-1.5">
              <Laptop className="w-4 h-4" /> SUGGESTED SOLUTIONS:
            </span>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#f3e600] font-bold font-mono">1.</span>
                <span>Open or bookmark <code className="text-[#f3e600] bg-slate-950 px-1 py-0.5">https://adithhn-portfolio.vercel.app</code> on your Desktop / Laptop PC for the full 60FPS keyboard experience.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f3e600] font-bold font-mono">2.</span>
                <span>Copy direct game URL to play later or share:</span>
              </li>
            </ul>

            <div className="flex items-center justify-between bg-slate-950 p-2.5 border border-slate-800 font-mono text-[11px] mt-2">
              <span className="text-slate-300 truncate mr-2">https://adithhn12.github.io/SkyRunner/</span>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1 bg-[#f3e600] text-slate-950 font-bold uppercase shrink-0 transition-all flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Option to launch game viewport anyway */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
            <span className="text-slate-400 text-[11px]">Have a Bluetooth keyboard connected?</span>
            <button
              onClick={() => setForceLaunchMobile(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-[#f3e600]/40 text-[#f3e600] font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> Launch WebGL Viewport Anyway
            </button>
          </div>
        </div>
      ) : (
        /* Playable Embedded Godot Game Frame */
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
      )}
    </div>
  );
};
