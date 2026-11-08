import React, { useState } from 'react';
import { Sprout, CircleHelp, Leaf, RotateCcw } from 'lucide-react';

type HarvestProfile = 'mixed' | 'ripe' | 'early';
const profiles: Record<HarvestProfile, { label: string; counts: { name: string; count: number; color: string }[]; recommendation: string; processing: string }> = {
  mixed: { label: 'Mixed maturity', counts: [{ name: 'Red · prime ripe', count: 18, color: 'bg-rose-400' }, { name: 'Yellow · semi-ripe', count: 12, color: 'bg-amber-300' }, { name: 'Green · unripe', count: 10, color: 'bg-emerald-400' }, { name: 'Dark brown · overripe', count: 4, color: 'bg-orange-700' }, { name: 'Low visibility · excluded', count: 3, color: 'bg-slate-500' }], recommendation: 'Selective picking', processing: 'Separate ripe cherries; review the lot before choosing a processing route.' },
  ripe: { label: 'Mostly ripe', counts: [{ name: 'Red · prime ripe', count: 28, color: 'bg-rose-400' }, { name: 'Yellow · semi-ripe', count: 7, color: 'bg-amber-300' }, { name: 'Green · unripe', count: 3, color: 'bg-emerald-400' }, { name: 'Dark brown · overripe', count: 2, color: 'bg-orange-700' }, { name: 'Low visibility · excluded', count: 2, color: 'bg-slate-500' }], recommendation: 'Harvest ripe clusters', processing: 'The ripe share is high in this sample; assess lot condition and desired washed or natural processing.' },
  early: { label: 'Mostly unripe', counts: [{ name: 'Red · prime ripe', count: 5, color: 'bg-rose-400' }, { name: 'Yellow · semi-ripe', count: 9, color: 'bg-amber-300' }, { name: 'Green · unripe', count: 25, color: 'bg-emerald-400' }, { name: 'Dark brown · overripe', count: 1, color: 'bg-orange-700' }, { name: 'Low visibility · excluded', count: 4, color: 'bg-slate-500' }], recommendation: 'Wait before broad picking', processing: 'Most visible cherries are still green; revisit the section as fruit matures.' }
};

export const CoffeeEstateAISimulator: React.FC = () => {
  const [profile, setProfile] = useState<HarvestProfile>('mixed');
  const current = profiles[profile];
  const evaluable = current.counts.slice(0, 4).reduce((sum, item) => sum + item.count, 0);
  const ripeShare = Math.round(((current.counts[0].count + current.counts[1].count) / evaluable) * 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-300"><Sprout className="h-4 w-4" /><span className="text-xs font-mono uppercase tracking-wider">CoffeeEstate-AI · Field Preview</span></div>
          <h4 className="mt-2 text-lg font-bold text-slate-100">Coffee cherry ripeness review</h4>
          <p className="mt-1 text-xs text-slate-400">Explore how detections can be summarized for harvest planning.</p>
        </div>
        <span className="rounded-full border border-amber-800/50 bg-amber-950/30 px-2.5 py-1 text-[10px] font-mono text-amber-200">In Progress</span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Sample harvest profile">
        {(Object.keys(profiles) as HarvestProfile[]).map((key) => <button key={key} onClick={() => setProfile(key)} className={`rounded-lg border px-3 py-2 text-xs transition-colors ${profile === key ? 'border-emerald-400 bg-emerald-400 font-semibold text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'}`}>{profiles[key].label}</button>)}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#10121a] p-5 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-900/70 bg-emerald-950/40"><Leaf className="h-7 w-7 text-emerald-300" /></div>
          <span className="text-sm font-semibold text-slate-100">{current.label}</span>
          <span className="mt-1 text-xs text-slate-400">Sample branch analysis</span>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500"><RotateCcw className="h-3 w-3" /> Demo data · no image inference</span>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-800 bg-[#10121a] p-4">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-800 pb-3">
            <div><span className="block text-[10px] font-mono uppercase text-slate-500">Evaluable cherries</span><span className="text-2xl font-bold text-slate-100">{evaluable}</span></div>
            <div className="text-right"><span className="block text-[10px] font-mono uppercase text-slate-500">Red + yellow share</span><span className="text-xl font-bold text-amber-200">{ripeShare}%</span></div>
          </div>
          <div className="space-y-2.5">
            {current.counts.map((item) => <div key={item.name}>
              <div className="mb-1 flex justify-between gap-2 text-[11px]"><span className="text-slate-300">{item.name}</span><span className="font-mono text-slate-400">{item.count}</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.max(5, item.count / Math.max(...current.counts.map((entry) => entry.count)) * 100)}%` }} /></div>
            </div>)}
          </div>
          <div className="rounded-lg border border-emerald-900/60 bg-emerald-950/20 p-3">
            <span className="block text-[10px] font-mono uppercase text-emerald-300">Sample guidance · {current.recommendation}</span>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">{current.processing}</p>
          </div>
          <div className="flex items-start gap-2 text-[10px] leading-relaxed text-slate-500"><CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0" />Low-visibility detections are displayed separately and excluded from the ripeness denominator.</div>
        </div>
      </div>
      <p className="text-[10px] leading-relaxed text-slate-500">Illustrative counts and guidance for the portfolio preview. The in-progress repository uses YOLOv8 for actual image inference and includes analysis history and model diagnostics.</p>
    </div>
  );
};
