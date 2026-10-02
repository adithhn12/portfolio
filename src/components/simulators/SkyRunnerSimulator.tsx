import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, ExternalLink } from 'lucide-react';

export const SkyRunnerSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);

  // Character state physics telemetry
  const [posY, setPosY] = useState<number>(140);
  const [velY, setVelY] = useState<number>(0);
  const [isGrounded, setIsGrounded] = useState<boolean>(true);
  const [doubleJumpAvailable, setDoubleJumpAvailable] = useState<boolean>(true);

  const jump = () => {
    if (isGrounded) {
      setVelY(-9.5);
      setIsGrounded(false);
    } else if (doubleJumpAvailable) {
      setVelY(-8.5);
      setDoubleJumpAvailable(false);
    }
  };

  useEffect(() => {
    let animId: number;
    let groundY = 140;
    let gravity = 0.45;
    let localY = posY;
    let localVy = velY;
    let localGrounded = isGrounded;
    let localDoubleJump = doubleJumpAvailable;
    let currentScore = score;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let obstacleX = 350;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(80, 20, 2, 2);
      ctx.fillRect(220, 40, 3, 3);
      ctx.fillRect(310, 15, 2, 2);

      // Draw Ground TileMap
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 160, canvas.width, 40);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(0, 160, canvas.width, 4);

      // Physics update
      if (!localGrounded) {
        localVy += gravity;
        localY += localVy;
        if (localY >= groundY) {
          localY = groundY;
          localVy = 0;
          localGrounded = true;
          localDoubleJump = true;
        }
      }

      // Move obstacle
      obstacleX -= 2.5;
      if (obstacleX < -20) {
        obstacleX = 360;
        currentScore += 10;
        setScore(currentScore);
      }

      // Draw Obstacle (Red Spikes)
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(obstacleX, 160);
      ctx.lineTo(obstacleX + 10, 140);
      ctx.lineTo(obstacleX + 20, 160);
      ctx.fill();

      // Draw Player Character Sprite (Godot Cyan Cube/Runner)
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(50, localY, 20, 20);
      // Eye
      ctx.fillStyle = '#090d16';
      ctx.fillRect(62, localY + 4, 4, 4);

      // Collision check
      if (obstacleX > 40 && obstacleX < 70 && localY > 125) {
        // Reset position on hit
        obstacleX = 360;
      }

      // Update state for telemetry display
      setPosY(Math.round(localY));
      setVelY(parseFloat(localVy.toFixed(1)));
      setIsGrounded(localGrounded);
      setDoubleJumpAvailable(localDoubleJump);

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              SkyRunner Godot 2D Engine Arcade Playground
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              GDScript Kinematic Physics • HTML5 WebGL Export
            </p>
          </div>
        </div>

        <a
          href="https://adithhn12.github.io/SkyRunner/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Full WebGL Game (GitHub Pages)
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Playable Canvas */}
        <div className="md:col-span-8 space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col items-center">
            <canvas ref={canvasRef} width={360} height={200} className="w-full h-auto cursor-pointer" onClick={jump} />
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-amber-400 border border-amber-500/30">
              SCORE: {score} PTS
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
              CLICK CANVAS / SPACE TO JUMP
            </div>
          </div>

          <button
            onClick={jump}
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" /> JUMP / DOUBLE JUMP (SPACEBAR)
          </button>
        </div>

        {/* Telemetry Debugger */}
        <div className="md:col-span-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
          <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-bold">
            Kinematic Body Physics Telemetry:
          </span>

          <div className="space-y-2">
            <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400">Position Y:</span>
              <span className="text-cyan-400 font-bold">{posY}px</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400">Velocity Y:</span>
              <span className="text-amber-400 font-bold">{velY} px/f</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400">is_on_floor():</span>
              <span className={isGrounded ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isGrounded ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400">Double Jump:</span>
              <span className={doubleJumpAvailable ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                {doubleJumpAvailable ? 'AVAILABLE' : 'USED'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-800 leading-relaxed">
            Built using Godot Engine's KinematicBody2D physics API with delta time frame rate smoothing.
          </p>
        </div>
      </div>
    </div>
  );
};
