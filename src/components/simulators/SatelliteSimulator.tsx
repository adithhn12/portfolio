import React, { useState } from 'react';
import { Layers, Eye, Activity, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface LandClass {
  id: string;
  name: string;
  color: string;
  confidence: number;
  description: string;
  rgbGradient: string;
  nirGradient: string;
  bands: { b2: number; b3: number; b4: number; b8: number };
}

const LAND_CLASSES: LandClass[] = [
  {
    id: 'forest',
    name: 'Forest Canopy',
    color: '#10b981',
    confidence: 98.6,
    description: 'Dense broadleaf & coniferous forest cover detected via high NIR reflectance.',
    rgbGradient: 'from-emerald-900 via-green-800 to-emerald-950',
    nirGradient: 'from-red-600 via-rose-500 to-pink-700',
    bands: { b2: 0.12, b3: 0.28, b4: 0.18, b8: 0.85 }
  },
  {
    id: 'urban',
    name: 'Residential / Urban',
    color: '#3b82f6',
    confidence: 96.2,
    description: 'Built-up structures, paved roads, and concrete roofing materials detected.',
    rgbGradient: 'from-slate-700 via-slate-600 to-gray-800',
    nirGradient: 'from-cyan-800 via-blue-900 to-slate-900',
    bands: { b2: 0.45, b3: 0.48, b4: 0.52, b8: 0.38 }
  },
  {
    id: 'river',
    name: 'River & Inland Water',
    color: '#06b6d4',
    confidence: 99.1,
    description: 'Freshwater stream absorbing near-infrared light with low spectral turbidity.',
    rgbGradient: 'from-cyan-950 via-blue-900 to-teal-950',
    nirGradient: 'from-slate-950 via-gray-900 to-black',
    bands: { b2: 0.65, b3: 0.42, b4: 0.22, b8: 0.04 }
  },
  {
    id: 'highway',
    name: 'Highway Infrastructure',
    color: '#f59e0b',
    confidence: 94.8,
    description: 'Asphalt transport corridor intersecting surrounding agricultural land.',
    rgbGradient: 'from-amber-950 via-stone-800 to-gray-900',
    nirGradient: 'from-amber-700 via-orange-800 to-stone-900',
    bands: { b2: 0.38, b3: 0.39, b4: 0.44, b8: 0.41 }
  },
  {
    id: 'crop',
    name: 'Annual Crop Land',
    color: '#84cc16',
    confidence: 97.4,
    description: 'Seasonal agricultural fields displaying active photosynthesis spectral signature.',
    rgbGradient: 'from-lime-900 via-emerald-800 to-yellow-950',
    nirGradient: 'from-rose-600 via-red-500 to-rose-800',
    bands: { b2: 0.18, b3: 0.32, b4: 0.22, b8: 0.78 }
  }
];

export const SatelliteSimulator: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<LandClass>(LAND_CLASSES[0]);
  const [spectralMode, setSpectralMode] = useState<'RGB' | 'NIR'>('RGB');

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-6 font-sans">
      {/* Header telemetry info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              EuroSAT Sentinel-2 Multi-Spectral Classifier
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              ResNet-50 Model Telemetry • 10-Class Classification Engine
            </p>
          </div>
        </div>

        {/* Spectral Band Mode Toggle */}
        <div className="flex items-center bg-slate-900/90 border border-slate-700/80 p-1 rounded-lg">
          <button
            onClick={() => setSpectralMode('RGB')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
              spectralMode === 'RGB'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 inline mr-1" /> Natural RGB
          </button>
          <button
            onClick={() => setSpectralMode('NIR')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
              spectralMode === 'NIR'
                ? 'bg-rose-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1" /> False-Color NIR (Band 8)
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Class Selection Buttons */}
        <div className="md:col-span-4 space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Select Sample Satellite Tile:
          </label>
          {LAND_CLASSES.map((item) => {
            const isSelected = selectedClass.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedClass(item)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg text-slate-100'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Satellite Canvas Viewport */}
        <div className="md:col-span-8 space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl group">
            {/* Visual Simulated Satellite Canvas */}
            <div
              className={`w-full h-48 sm:h-56 bg-gradient-to-br ${
                spectralMode === 'RGB' ? selectedClass.rgbGradient : selectedClass.nirGradient
              } relative p-4 flex flex-col justify-between transition-all duration-500`}
            >
              {/* Telemetry Overlay scanlines */}
              <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

              {/* Satellite Frame Watermark */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300/80 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 w-fit">
                <span className="text-emerald-400 mr-2">● SENTINEL-2A TILE</span>
                <span>LAT: 12.9716° N • LON: 77.5946° E</span>
              </div>

              {/* Center Target Telemetry */}
              <div className="self-center my-auto flex flex-col items-center">
                <div className="w-16 h-16 border border-emerald-400/40 rounded-full flex items-center justify-center relative animate-pulse">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-emerald-300 mt-2 bg-slate-950/70 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  CLASSIFIED: {selectedClass.name.toUpperCase()}
                </span>
              </div>

              {/* Bottom Confidence Bar */}
              <div className="flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-xs font-mono">
                <span className="text-slate-300">ResNet Confidence Score:</span>
                <span className="text-emerald-400 font-bold">{selectedClass.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Spectral Channel Band Telemetry */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" /> Multispectral Band Reflectance Histogram
              </span>
              <span className="text-slate-500">B2(Blue) • B3(Green) • B4(Red) • B8(NIR)</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { label: 'B2 (Blue)', val: selectedClass.bands.b2, color: 'bg-blue-500' },
                { label: 'B3 (Green)', val: selectedClass.bands.b3, color: 'bg-emerald-500' },
                { label: 'B4 (Red)', val: selectedClass.bands.b4, color: 'bg-rose-500' },
                { label: 'B8 (NIR)', val: selectedClass.bands.b8, color: 'bg-purple-500' }
              ].map((b) => (
                <div key={b.label} className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">{b.label}</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className={`${b.color} h-full transition-all duration-500`} style={{ width: `${b.val * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-200 mt-1 block font-bold">
                    {(b.val * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-300 pt-1 leading-relaxed border-t border-slate-800/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
              {selectedClass.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
