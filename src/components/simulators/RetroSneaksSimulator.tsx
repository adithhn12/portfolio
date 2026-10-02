import React, { useState } from 'react';
import { ShoppingBag, Trash2, ExternalLink } from 'lucide-react';

interface Shoe {
  id: string;
  name: string;
  price: number;
  color: string;
  colorHex: string;
  size: number;
}

export const RetroSneaksSimulator: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<'retro-red' | 'cyber-cyan' | 'obsidian-black'>('retro-red');
  const [selectedSize, setSelectedSize] = useState<number>(10);
  const [cartItems, setCartItems] = useState<Shoe[]>([]);

  const colorMap = {
    'retro-red': { name: 'Crimson Retro', hex: '#f43f5e', bg: 'from-rose-950 via-slate-900 to-rose-900' },
    'cyber-cyan': { name: 'Cyber Neon', hex: '#06b6d4', bg: 'from-cyan-950 via-slate-900 to-teal-900' },
    'obsidian-black': { name: 'Obsidian Midnight', hex: '#334155', bg: 'from-slate-950 via-gray-900 to-slate-900' }
  };

  const handleAddToCart = () => {
    const newItem: Shoe = {
      id: `SHOE-${Date.now()}`,
      name: `Retro Sneaker High [${colorMap[selectedColor].name}]`,
      price: 149,
      color: selectedColor,
      colorHex: colorMap[selectedColor].hex,
      size: selectedSize
    };
    setCartItems([newItem, ...cartItems]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-5 space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-100 font-heading">
              RetroSneaks E-Commerce Cart & Customizer Sandbox
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Vanilla JavaScript ES6+ • LocalStorage State Sync • Zero Framework Overhead
            </p>
          </div>
        </div>

        <a
          href="https://retrosneaks.site.je"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Launch Live Store
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Customizer Panel */}
        <div className="md:col-span-7 space-y-4">
          {/* Sneaker Visual Box */}
          <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${colorMap[selectedColor].bg} border border-slate-700/80 p-4 flex flex-col justify-between relative overflow-hidden`}>
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span>RETRO-SERIES V1.4</span>
              <span className="text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                IN STOCK • $149
              </span>
            </div>

            <div className="self-center flex flex-col items-center">
              <span className="text-4xl">👟</span>
              <span className="text-xs font-mono text-slate-200 mt-2 font-bold">
                {colorMap[selectedColor].name} (US Size {selectedSize})
              </span>
            </div>

            <div className="text-[10px] font-mono text-slate-400">
              VANILLA JS RENDER ENGINE
            </div>
          </div>

          {/* Color & Size Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block">Colorway:</label>
              <div className="flex gap-2">
                {(['retro-red', 'cyber-cyan', 'obsidian-black'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70'
                    }`}
                    style={{ backgroundColor: colorMap[c].hex }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block">US Size:</label>
              <div className="flex gap-1.5">
                {[8, 9, 10, 11].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 rounded text-xs font-mono border ${
                      selectedSize === sz
                        ? 'bg-rose-500 text-slate-950 font-bold border-rose-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-mono font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> ADD TO CART DRAWER ($149)
          </button>
        </div>

        {/* Live Cart Drawer State */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-rose-400" /> Cart State ({cartItems.length})
              </span>
              {cartItems.length > 0 && (
                <button
                  onClick={() => setCartItems([])}
                  className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="py-8 text-center text-slate-500 font-sans text-xs">
                Cart is currently empty. Click "Add to Cart Drawer" above to test LocalStorage state!
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center text-[11px]">
                    <span className="text-slate-200 truncate max-w-[140px]">{item.name}</span>
                    <span className="text-rose-400 font-bold">${item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-1">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Subtotal:</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Shipping:</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-slate-100 font-bold text-xs pt-1">
              <span>Total Amount:</span>
              <span className="text-rose-400">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
