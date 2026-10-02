import React, { useState } from 'react';
import { Droplet, AlertTriangle, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

export const AquaSphereSimulator: React.FC = () => {
  const [ph, setPh] = useState<number>(7.2);
  const [turbidity, setTurbidity] = useState<number>(2.4);
  const [tds, setTds] = useState<number>(210);
  const [dispatched, setDispatched] = useState<boolean>(false);

  // Anomaly status calculation
  const isPhAnomaly = ph < 6.5 || ph > 8.5;
  const isTurbidityAnomaly = turbidity > 5;
  const isTdsAnomaly = tds > 500;
  const hasAnomaly = isPhAnomaly || isTurbidityAnomaly || isTdsAnomaly;

  const severity = ph < 5.5 || ph > 9.5 || turbidity > 15 ? 'CRITICAL' : hasAnomaly ? 'WARNING' : 'OPTIMAL';

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
    }, 3000);
  };

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-6 font-sans">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              AquaSphere Telemetry & Hazard Dispatch Simulator
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Real-Time Sensor Monitoring • Gemini AI Incident Triage Engine
            </p>
          </div>
        </div>

        <a
          href="https://aquasphereai.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md"
        >
          Launch Live Vercel App
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Sensor Sliders */}
        <div className="md:col-span-6 space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Adjust Sensor Parameters:
          </span>

          {/* pH Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">pH Level (Acidity/Alkalinity)</span>
              <span className={`font-bold ${isPhAnomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
                {ph.toFixed(1)} {isPhAnomaly ? '(Out of bounds)' : ''}
              </span>
            </div>
            <input
              type="range"
              min="4.0"
              max="11.0"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded cursor-pointer"
            />
          </div>

          {/* Turbidity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Turbidity (Clarity NTU)</span>
              <span className={`font-bold ${isTurbidityAnomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
                {turbidity.toFixed(1)} NTU {isTurbidityAnomaly ? '(High sediment)' : ''}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20.0"
              step="0.5"
              value={turbidity}
              onChange={(e) => setTurbidity(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded cursor-pointer"
            />
          </div>

          {/* TDS Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Total Dissolved Solids (TDS)</span>
              <span className={`font-bold ${isTdsAnomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
                {tds} ppm {isTdsAnomaly ? '(High mineral)' : ''}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="800"
              step="10"
              value={tds}
              onChange={(e) => setTds(parseInt(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* AI Triage & Worker Dispatch Panel */}
        <div className="md:col-span-6 space-y-4">
          <div
            className={`p-4 rounded-xl border transition-all ${
              severity === 'CRITICAL'
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                : severity === 'WARNING'
                ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
              <span className="flex items-center gap-1.5">
                {severity === 'OPTIMAL' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                GEMINI AI STATUS: {severity}
              </span>
              <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded border border-white/10">
                DISTRICT #04 NODE
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              {severity === 'OPTIMAL'
                ? 'Water parameters strictly comply with WHO potable drinking water standards. Zero distribution risk.'
                : severity === 'WARNING'
                ? 'Minor parameter drift detected. Gemini AI recommends automated technician inspection within 4 hours.'
                : 'CRITICAL HAZARD: Parameter anomaly detected! Immediate field worker dispatch & regional boiling warning recommended.'}
            </p>

            <button
              onClick={handleDispatch}
              disabled={dispatched}
              className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                dispatched
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
              }`}
            >
              {dispatched ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" /> Field Worker Task Dispatched!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Dispatch Emergency Technician
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
