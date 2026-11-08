import React, { useState } from 'react';
import { Camera, CircleAlert, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

type Profile = 'landscape' | 'blurred' | 'sports-car';

const profiles: Record<Profile, { label: string; category: string; score: number; mos: string; recommendation: string; color: string; evidence: string; note: string }> = {
  landscape: { label: 'Sharp landscape', category: 'Landscape', score: 70.44, mos: '3.4176', recommendation: 'KEEP', color: 'text-emerald-300', evidence: 'Sharp focus · acceptable noise', note: 'The repository diagnostic probe placed this sharp landscape in the KEEP band.' },
  blurred: { label: 'Severely blurred street', category: 'General Photography', score: 20.57, mos: '2.6383', recommendation: 'RETAKE', color: 'text-rose-300', evidence: 'Severe blur · explicit defect rule', note: 'The explicit severe-blur rule lowers the fuzzy decision even with a mid-range MOS estimate.' },
  'sports-car': { label: 'Sharp sports car', category: 'General Photography', score: 71.03, mos: '3.3407', recommendation: 'KEEP', color: 'text-emerald-300', evidence: 'Sharp focus · non-portrait category', note: 'The repository diagnostic probe placed this sharp general-photo example in the KEEP band.' }
};

export const SmartSnapHybridSimulator: React.FC = () => {
  const [profile, setProfile] = useState<Profile>('landscape');
  const current = profiles[profile];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-300"><Camera className="h-4 w-4" /><span className="text-xs font-mono uppercase tracking-wider">SmartSnap · Analysis Preview</span></div>
          <h4 className="mt-2 text-lg font-bold text-slate-100">Explore quality scenarios</h4>
          <p className="mt-1 text-xs text-slate-400">Choose one of the repository’s documented diagnostic probes.</p>
        </div>
        <span className="rounded-full border border-amber-800/50 bg-amber-950/30 px-2.5 py-1 text-[10px] font-mono text-amber-200">Illustrative preview · no model inference</span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Sample image profile">
        {(Object.keys(profiles) as Profile[]).map((key) => (
          <button key={key} onClick={() => setProfile(key)} className={`rounded-lg border px-3 py-2 text-xs transition-colors ${profile === key ? 'border-[#f3e600] bg-[#f3e600] font-semibold text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'}`}>
            {profiles[key].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#10121a] p-5 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-900/70 bg-cyan-950/40"><Sparkles className="h-7 w-7 text-cyan-300" /></div>
          <span className="text-sm font-semibold text-slate-100">{current.label}</span>
          <span className="mt-1 text-xs text-slate-400">Category: {current.category}</span>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500"><RotateCcw className="h-3 w-3" /> Sample profile</span>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-800 bg-[#10121a] p-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div><span className="block text-[10px] font-mono uppercase text-slate-500">Fuzzy quality score</span><span className="text-2xl font-bold text-slate-100">{current.score.toFixed(2)}<span className="text-sm text-slate-500"> / 100</span></span></div>
            <span className={`rounded-lg border border-current/20 bg-current/10 px-3 py-1.5 text-xs font-bold ${current.color}`}>{current.recommendation}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3"><span className="block text-[10px] font-mono uppercase text-slate-500">Random Forest MOS</span><span className="mt-1 block font-mono text-sm text-slate-200">{current.mos} / 5</span></div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3"><span className="block text-[10px] font-mono uppercase text-slate-500">CV evidence</span><span className="mt-1 block text-xs text-slate-200">{current.evidence}</span></div>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs leading-relaxed text-slate-300">
            {current.recommendation === 'RETAKE' ? <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" /> : <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />}
            {current.note}
          </div>
        </div>
      </div>
      <p className="text-[10px] leading-relaxed text-slate-500">Scores and MOS values are the repository’s documented diagnostic probes, not an independently labeled benchmark. This preview displays those saved examples; it does not run model inference.</p>
    </div>
  );
};
