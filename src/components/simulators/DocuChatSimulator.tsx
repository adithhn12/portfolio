import React, { useState } from 'react';
import { Database, Cpu, Zap, FileText } from 'lucide-react';

interface PresetQuery {
  question: string;
  chunkMatched: string;
  similarity: number;
  llamaAnswer: string;
  citation: string;
  latencyMs: number;
}

const PRESET_QUERIES: PresetQuery[] = [
  {
    question: "How does Llama 3.2 perform context augmentation with vector embeddings?",
    chunkMatched: "...[Chunk #4]: DocuChat segments ingested documents into 1000-char overlapping blocks. HuggingFace all-MiniLM-L6-v2 maps text chunks into 384-dimensional vector embeddings, indexed in a FAISS vector store...",
    similarity: 0.942,
    llamaAnswer: "Llama 3.2 receives context-bound chunks retrieved via FAISS vector similarity search (cosine distance score 0.942). By injecting only top-K matching text blocks directly into the prompt system context, the model synthesizes precise, hallucination-free answers with sub-second Groq LPU latency.",
    citation: "Document_Architecture_Section_3.pdf (Page 4, Lines 12-19)",
    latencyMs: 34
  },
  {
    question: "What vector database and embedding model does DocuChat use for fast search?",
    chunkMatched: "...[Chunk #2]: Fast in-memory search relies on FAISS vector store indexing HuggingFace sentence transformer embeddings (all-MiniLM-L6-v2), achieving sub-50ms similarity query lookup times...",
    similarity: 0.968,
    llamaAnswer: "DocuChat utilizes HuggingFace's 'all-MiniLM-L6-v2' model for generating 384-dimensional dense embeddings paired with an in-memory FAISS (Facebook AI Similarity Search) index for sub-50ms retrieval speed.",
    citation: "System_Tech_Stack.md (Line 42)",
    latencyMs: 28
  },
  {
    question: "How does DocuChat prevent AI hallucination in document answers?",
    chunkMatched: "...[Chunk #7]: Strict prompt boundary engineering forces the LLM to restrict answers exclusively to retrieved FAISS vector chunks. If the document does not contain context, the model explicitly responds 'Information not present in provided document'...",
    similarity: 0.915,
    llamaAnswer: "Hallucinations are prevented by constraining Groq's Llama 3.2 model to operate within a strict context-bound system prompt. If the cosine distance threshold falls below relevance parameters, the system triggers a fallback message.",
    citation: "Security_Context_Policy.pdf (Page 2)",
    latencyMs: 41
  }
];

export const DocuChatSimulator: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const activeQuery = PRESET_QUERIES[selectedIdx];

  const handleSimulate = (idx: number) => {
    setIsProcessing(true);
    setSelectedIdx(idx);
    setTimeout(() => {
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-6 font-sans">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              RAG Pipeline Query Simulator
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              FAISS Vector Distance • HuggingFace Embeddings • Groq Llama 3.2 Engine
            </p>
          </div>
        </div>

        <a
          href="https://adith-docuchat.streamlit.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md"
        >
          <Zap className="w-3.5 h-3.5 fill-slate-950" /> Launch Live Streamlit App
        </a>
      </div>

      {/* Preset Query Chips */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
          Select Test Query Prompt:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSimulate(idx)}
              className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-cyan-950/40 border-cyan-500/60 text-slate-100 shadow-md'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/40'
              }`}
            >
              <span className="font-medium text-slate-200 line-clamp-2">{q.question}</span>
              <span className="text-[10px] font-mono text-cyan-400 mt-2 font-semibold">
                FAISS Dist: {q.similarity} • {q.latencyMs}ms
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive RAG Pipeline Visualization */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
        {/* Pipeline Steps Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono border-b border-slate-800 pb-3">
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-cyan-400">
            1. Query Tokenization
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-cyan-400">
            2. Vector Embedding
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-cyan-400">
            3. FAISS Retrieval
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-emerald-400">
            4. Groq Synthesis
          </div>
        </div>

        {isProcessing ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-slate-400">Performing Vector Search & Inference...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Step 3 Matched Vector Chunk */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-cyan-400" /> Retrieved Context Block (Top-1 Match)
                </span>
                <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Cosine Distance: {activeQuery.similarity}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 leading-relaxed">
                {activeQuery.chunkMatched}
              </p>
            </div>

            {/* Step 4 Groq Llama 3.2 Output */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Groq Llama 3.2 Grounded Response
                </span>
                <span className="text-slate-400">Latency: {activeQuery.latencyMs}ms</span>
              </div>
              <p className="text-xs text-slate-100 leading-relaxed font-sans">
                {activeQuery.llamaAnswer}
              </p>
              <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3 text-cyan-400" /> Source Citation:
                </span>
                <span className="text-cyan-300 underline underline-offset-2">{activeQuery.citation}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
