import React, { useState } from 'react';
import { Factory, RefreshCw, Cpu } from 'lucide-react';

interface ProductionOrder {
  id: string;
  item: string;
  quantity: number;
  materialNeeded: string;
  stockAvailable: number;
  status: 'OPTIMAL' | 'BOTTLENECK' | 'QUEUED';
}

const INITIAL_ORDERS: ProductionOrder[] = [
  { id: 'PO-8821', item: 'Aluminum Chassis Enclosure', quantity: 250, materialNeeded: 'Alloy 6061 Bar Stock', stockAvailable: 300, status: 'OPTIMAL' },
  { id: 'PO-8822', item: 'Precision CNC Spindle Gear', quantity: 500, materialNeeded: 'High-Carbon Steel', stockAvailable: 120, status: 'BOTTLENECK' },
  { id: 'PO-8823', item: 'PCB Heat-Sink Bracket', quantity: 1000, materialNeeded: 'Copper Sheet 2mm', stockAvailable: 1200, status: 'OPTIMAL' }
];

export const OrderFlowSimulator: React.FC = () => {
  const [orders] = useState<ProductionOrder[]>(INITIAL_ORDERS);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const handleRunAiAudit = () => {
    setAnalyzing(true);
    setAiReport(null);
    setTimeout(() => {
      setAnalyzing(false);
      setAiReport(
        "Gemini AI Bottleneck Analysis: PO-8822 (Precision Spindle Gear) has a 380-unit steel deficit. Recommending auto-reorder of 400kg High-Carbon Steel and rerouting Machine #3 capacity to PO-8823."
      );
    }, 600);
  };

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              OrderFlow AI Manufacturing & Bottleneck Simulator
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Gemini API Operations Routing • Supabase Relational Order Store
            </p>
          </div>
        </div>

        <a
          href="https://whisper-ops.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md"
        >
          Launch Live Lovable Demo
        </a>
      </div>

      {/* Production Order Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Active Production Work Orders:</span>
          <button
            onClick={handleRunAiAudit}
            disabled={analyzing}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {analyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Cpu className="w-3.5 h-3.5 text-amber-400" />}
            Run Gemini AI Inventory Audit
          </button>
        </div>

        <div className="space-y-2">
          {orders.map((po) => (
            <div
              key={po.id}
              className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold">{po.id}</span>
                <span className="text-slate-200 font-sans font-medium">{po.item}</span>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <span>Qty: {po.quantity}</span>
                <span>Stock: {po.stockAvailable}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    po.status === 'BOTTLENECK'
                      ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                      : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {po.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Output Report */}
      {aiReport && (
        <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 leading-relaxed font-sans space-y-1">
          <span className="font-mono text-amber-400 font-bold block">
            ⚡ GEMINI AI RECOMMENDATION DISPATCH:
          </span>
          <p>{aiReport}</p>
        </div>
      )}
    </div>
  );
};
