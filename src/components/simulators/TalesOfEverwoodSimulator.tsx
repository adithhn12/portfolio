import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  ExternalLink,
  Play,
  Trophy,
  Smartphone,
  Laptop,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const TalesOfEverwoodSimulator: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [forceLaunchMobile, setForceLaunchMobile] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'COVER' | 'GAMEPLAY' | 'MENU' | 'EMBED'>('COVER');

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
    navigator.clipboard.writeText('https://renrun12.itch.io/tales-of-everwood');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const mediaAssets = {
    COVER: {
      url: '/tales-of-everwood-cover.png',
      alt: 'Tales of Everwood Official Title & Cover Art',
      label: 'Title Cover Art',
      tag: 'PIXEL ART 16-BIT'
    },
    GAMEPLAY: {
      url: '/tales-of-everwood-gameplay.png',
      alt: 'Tales of Everwood Real-time Combat & Health System',
      label: 'Gameplay Combat',
      tag: 'HP BAR & DIRECTION COMBAT'
    },
    MENU: {
      url: '/tales-of-everwood-menu.png',
      alt: 'Tales of Everwood Main Menu & Systems',
      label: 'Game Menu',
      tag: 'MENU & REPLAY SYSTEMS'
    }
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
              Tales of Everwood Godot WebGL Arcade{' '}
              <span className="text-xs text-[#00f0ff] font-mono font-bold bg-[#00f0ff]/10 px-2 py-0.5 border border-[#00f0ff]/30">
                LIVE GAME
              </span>
            </h4>
            <p className="text-xs text-[#f3e600] font-mono">
              Godot Engine 4.x • GDScript (player.gd, Enemy AI, XP System) • itch.io Release
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://renrun12.itch.io/tales-of-everwood"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#f3e600] hover:bg-yellow-300 text-slate-950 font-black text-xs font-mono uppercase transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(243,230,0,0.3)] cyber-cut-sm"
          >
            <ExternalLink className="w-4 h-4" /> Play on itch.io
          </a>
          <a
            href="https://renrun12.itch.io/tales-of-everwood"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs font-mono uppercase border border-slate-700 transition-all flex items-center gap-1.5"
            title="Download Windows Build (50MB)"
          >
            <Download className="w-4 h-4 text-[#00f0ff]" /> Windows .zip
          </a>
        </div>
      </div>

      {/* Mobile Device Notice Banner (If user is on mobile screen and hasn't forced launch) */}
      {isMobile && !forceLaunchMobile ? (
        <div className="bg-slate-950 border-2 border-[#f3e600]/60 p-5 space-y-4 text-xs font-mono shadow-xl">
          <div className="flex items-center gap-2.5 text-[#f3e600] font-bold text-sm border-b border-slate-800 pb-3 uppercase">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <span>DESKTOP RECOMMENDED FOR COMBAT GAMEPLAY</span>
          </div>

          <p className="text-slate-200 font-sans text-xs leading-relaxed">
            Tales of Everwood is an action fantasy RPG engineered in Godot Engine 4 using physical
            keyboard movement (<strong className="text-[#f3e600]">W / A / S / D / Arrow Keys</strong> to explore,{' '}
            <strong className="text-[#f3e600]">Spacebar</strong> for direction-based sword combat). Mobile touch
            screens lack physical keys required for responsive melee timing and enemy avoidance.
          </p>

          <div className="bg-[#10121a] p-3.5 border border-slate-800 space-y-2 font-sans text-slate-300">
            <span className="font-mono text-[#00f0ff] font-bold block text-xs flex items-center gap-1.5">
              <Laptop className="w-4 h-4" /> SUGGESTED ACCESS MODES:
            </span>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#f3e600] font-bold font-mono">1.</span>
                <span>
                  Open on your Desktop / Laptop PC via{' '}
                  <code className="text-[#f3e600] bg-slate-950 px-1 py-0.5">
                    https://adithhn-portfolio.vercel.app
                  </code>{' '}
                  for full 60FPS keyboard combat.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f3e600] font-bold font-mono">2.</span>
                <span>Copy direct itch.io game URL to play online or bookmark:</span>
              </li>
            </ul>

            <div className="flex items-center justify-between bg-slate-950 p-2.5 border border-slate-800 font-mono text-[11px] mt-2">
              <span className="text-slate-300 truncate mr-2">https://renrun12.itch.io/tales-of-everwood</span>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1 bg-[#f3e600] text-slate-950 font-bold uppercase shrink-0 transition-all flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Option to launch game anyway */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
            <span className="text-slate-400 text-[11px]">Have an external keyboard or want to view graphics?</span>
            <button
              onClick={() => setForceLaunchMobile(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-[#f3e600]/40 text-[#f3e600] font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> Launch Showcase Viewport Anyway
            </button>
          </div>
        </div>
      ) : (
        /* Main Showcase & Viewport Panel */
        <div className="space-y-3">
          {/* Viewport Frame */}
          <div className="relative w-full aspect-video max-h-[500px] bg-slate-950 border-2 border-[#f3e600]/50 shadow-[0_0_25px_rgba(243,230,0,0.15)] mx-auto overflow-hidden group">
            {activeMediaTab === 'EMBED' ? (
              <iframe
                src="https://html-classic.itch.zone/html/19882958/index.html?v=1792438712"
                title="Play Tales of Everwood Godot WebGL Game"
                className="w-full h-full border-0 block"
                allow="autoplay; fullscreen; focus-without-user-activation"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                <img
                  src={mediaAssets[activeMediaTab].url}
                  alt={mediaAssets[activeMediaTab].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Cyber HUD Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-slate-950/90 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-[10px] font-bold px-2 py-0.5 tracking-wider">
                    {mediaAssets[activeMediaTab].tag}
                  </span>
                  <span className="bg-slate-950/90 border border-[#f3e600]/40 text-[#f3e600] font-mono text-[10px] font-bold px-2 py-0.5">
                    GODOT 4 • GDSCRIPT
                  </span>
                </div>

                {/* Central Action Card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-slate-950/85 border border-[#f3e600]/50 p-4 sm:p-6 backdrop-blur-sm shadow-2xl max-w-md space-y-3.5">
                    <span className="text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest block font-bold">
                      Interactive Prototype Showcase
                    </span>
                    <h5 className="text-xl sm:text-2xl font-heading font-black text-slate-100 uppercase tracking-wide">
                      Tales of Everwood
                    </h5>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Explore the world, battle AI enemies with directional combat, gain experience, and upgrade attack speed.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                      <button
                        onClick={() => setActiveMediaTab('EMBED')}
                        className="px-4 py-2 bg-[#f3e600] hover:bg-yellow-300 text-slate-950 font-mono font-black text-xs uppercase transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(243,230,0,0.4)] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Run WebGL Player
                      </button>

                      <a
                        href="https://renrun12.itch.io/tales-of-everwood"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono font-bold text-xs uppercase transition-all flex items-center gap-1.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#f3e600]" /> itch.io Tab
                      </a>

                      <a
                        href="https://renrun12.itch.io/tales-of-everwood"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono font-semibold text-xs flex items-center gap-1.5"
                        title="Download 50 MB Windows build"
                      >
                        <Download className="w-3.5 h-3.5 text-[#00f0ff]" /> Windows
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Media / Showcase View Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2 border border-slate-800">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-slate-500 text-[10px] uppercase font-bold mr-1 hidden sm:inline">
                VIEW:
              </span>
              <button
                onClick={() => setActiveMediaTab('COVER')}
                className={`px-3 py-1 text-xs transition-all flex items-center gap-1 cursor-pointer font-bold ${
                  activeMediaTab === 'COVER'
                    ? 'bg-[#f3e600] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3 h-3" /> Title Cover
              </button>
              <button
                onClick={() => setActiveMediaTab('GAMEPLAY')}
                className={`px-3 py-1 text-xs transition-all flex items-center gap-1 cursor-pointer font-bold ${
                  activeMediaTab === 'GAMEPLAY'
                    ? 'bg-[#f3e600] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" /> Gameplay & HP
              </button>
              <button
                onClick={() => setActiveMediaTab('MENU')}
                className={`px-3 py-1 text-xs transition-all flex items-center gap-1 cursor-pointer font-bold ${
                  activeMediaTab === 'MENU'
                    ? 'bg-[#f3e600] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Gamepad2 className="w-3 h-3" /> Main Menu
              </button>
              <button
                onClick={() => setActiveMediaTab('EMBED')}
                className={`px-3 py-1 text-xs transition-all flex items-center gap-1 cursor-pointer font-bold ${
                  activeMediaTab === 'EMBED'
                    ? 'bg-[#00f0ff] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-[#00f0ff]'
                }`}
              >
                <Play className="w-3 h-3 fill-current" /> Live WebGL Player
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span>Host:</span>
              <span className="text-[#f3e600] font-bold">itch.io + GitHub</span>
            </div>
          </div>

          {/* Game Info & Controls Footer Panel (2-column grid matching SkyRunner) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950 p-3.5 border border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-[#f3e600] font-bold flex items-center gap-1.5 uppercase">
                <Trophy className="w-3.5 h-3.5 text-[#f3e600]" /> GAMEPLAY & OBJECTIVE:
              </span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Explore the pixel-art fantasy world of Everwood, battle enemies in direction-based combat, gain experience,
                and survive to level up your attack speed and claim victory!
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 border border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-[#00f0ff] font-bold flex items-center gap-1.5 uppercase">
                <Play className="w-3.5 h-3.5 text-[#00f0ff] fill-[#00f0ff]" /> CONTROLS & UPGRADES:
              </span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Move in 8 directions using <strong className="text-[#f3e600]">W / A / S / D</strong> or{' '}
                <strong className="text-[#f3e600]">Arrow Keys</strong>. Attack with{' '}
                <strong className="text-[#f3e600]">Spacebar</strong>. Defeat enemies to earn XP and level up. Press{' '}
                <strong className="text-[#00f0ff]">ESC</strong> to pause.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
