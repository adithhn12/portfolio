import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';

interface StylePreset {
  id: string;
  name: string;
  tokens: string;
  gradient: string;
}

const STYLE_PRESETS: StylePreset[] = [
  { id: 'cyberpunk', name: 'Cyberpunk Neon', tokens: 'neon glow, volumetric lighting, futuristic city, 8k render, octane render', gradient: 'from-purple-900 via-pink-900 to-cyan-900' },
  { id: 'photographic', name: 'Photorealistic', tokens: '35mm lens, depth of field, photorealistic, natural lighting, highly detailed', gradient: 'from-amber-950 via-slate-900 to-stone-900' },
  { id: 'anime', name: 'Anime Concept Art', tokens: 'makoto shinkai style, vibrant colors, detailed anime background, atmospheric', gradient: 'from-blue-900 via-teal-900 to-indigo-950' },
  { id: 'cinematic', name: 'Cinematic 3D', tokens: 'unreal engine 5, raytracing, dramatic shadows, movie STILL, masterpiece', gradient: 'from-emerald-950 via-slate-900 to-teal-950' }
];

export const TextToImageSimulator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Futuristic satellite orbital station above earth atmosphere');
  const [activePreset, setActivePreset] = useState<StylePreset>(STYLE_PRESETS[0]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [generatedCount, setGeneratedCount] = useState<number>(1);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedCount((prev) => prev + 1);
    }, 500);
  };

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              AI Text-to-Image Prompt & Style Matrix
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              HuggingFace Inference API • Stable Diffusion Latent Space
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Controls */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 block">Prompt Input:</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-sans text-slate-200 focus:border-purple-500/60 focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 block">Select Style Preset Token Injector:</label>
            <div className="grid grid-cols-2 gap-2">
              {STYLE_PRESETS.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActivePreset(st)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-all ${
                    activePreset.id === st.id
                      ? 'bg-purple-950/60 border-purple-500/60 text-purple-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Diffusion Latents...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> GENERATE IMAGE WITH HUGGINGFACE API
              </>
            )}
          </button>
        </div>

        {/* Render Canvas Preview */}
        <div className="md:col-span-6">
          <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${activePreset.gradient} border border-purple-500/30 p-4 flex flex-col justify-between relative overflow-hidden shadow-2xl`}>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
              <span className="text-purple-400">DIFFUSION SEED #{generatedCount * 14298}</span>
              <span>1024 x 1024 PX</span>
            </div>

            <div className="self-center text-center my-auto px-4">
              <span className="text-xs font-mono text-slate-200 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-purple-500/30 inline-block max-w-full truncate">
                "{prompt}"
              </span>
              <span className="text-[10px] font-mono text-purple-300 block mt-2 opacity-80">
                + {activePreset.tokens}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded">
              <span>HUGGINGFACE STABLE DIFFUSION API</span>
              <span className="text-emerald-400">READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
