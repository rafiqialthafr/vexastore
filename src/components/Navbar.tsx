'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';
import { ALL_GAMES } from '@/data/games';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackInvoice, setTrackInvoice] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<{
    id: string;
    game: string;
    item: string;
    status: 'success' | 'processing';
    time: string;
    target: string;
  } | null>(null);

  const filtered = searchQuery.trim() === '' ? [] : ALL_GAMES.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInvoice.trim()) return;
    setTrackedOrder({
      id: trackInvoice.toUpperCase(),
      game: 'Mobile Legends: Bang Bang',
      item: '257 + 15 Diamonds',
      status: 'success',
      time: '1 menit lalu',
      target: '89123812 (2024)',
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#06080D]/75 backdrop-blur-xl border-b border-white/[0.07] transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-20 flex items-center justify-between gap-6">
          {/* Logo Brand with AAA Esports Mark */}
          <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-[#0B0F17] border border-cyan-400/40 flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(0,229,255,0.2)] group-hover:shadow-[0_0_28px_rgba(0,229,255,0.4)] group-hover:border-cyan-400 transition-all">
              <span className="text-cyan-metallic font-black">V</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#06080D] shadow-sm"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider leading-none text-white">
                VEXA<span className="text-[#00E5FF]">STORE</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-[0.22em] mt-1 uppercase">
                AAA Gaming Currency Protocol
              </span>
            </div>
          </Link>

          {/* Live Protocol Status Pill */}
          <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">GATEWAY:</span>
            <span className="text-emerald-400 font-semibold">99.98% OPERATIONAL</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-semibold">~12ms</span>
          </div>

          {/* Quick Search Trigger (Frosted Glass Pill) */}
          <div className="flex-1 max-w-md hidden sm:block">
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-slate-400 hover:border-[#00E5FF]/40 hover:text-slate-200 hover:bg-white/[0.04] transition-all text-xs tracking-wide shadow-inner group"
            >
              <span className="flex items-center gap-2.5">
                <Search size={15} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                Cari game favoritmu (MLBB, FF, Valorant)...
              </span>
              <kbd className="px-2 py-0.5 text-[10px] bg-white/[0.04] rounded border border-white/[0.08] text-slate-400 font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Luxury Actions */}
          <div className="flex items-center gap-3.5 shrink-0">
            <button 
              onClick={() => { setShowTrackModal(true); setTrackedOrder(null); }}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition flex items-center gap-2"
            >
              <Activity size={14} className="text-[#D4AF37]" />
              <span className="hidden md:inline">Lacak Pesanan</span>
            </button>
            <Link
              href="/#catalog"
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_28px_rgba(0,229,255,0.45)] active:scale-95 flex items-center gap-1.5"
            >
              <Zap size={14} className="fill-slate-950" />
              <span>Katalog Vault</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Omnibar Search Modal (High-End Dark Glass) */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center pt-20 px-6 sm:px-8">
          <div className="w-full max-w-2xl bg-[#0B0F17]/95 border border-white/[0.1] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 bg-white/[0.02]">
              <Search className="text-[#00E5FF] ml-2" size={19} />
              <input
                autoFocus
                type="text"
                placeholder="Ketik judul game favoritmu (misal: Valorant, MLBB, Steam)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-500"
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-3 divide-y divide-white/[0.04]">
              {filtered.length > 0 ? (
                filtered.map((game) => (
                  <Link
                    key={game.id}
                    href={`/order/${game.slug}`}
                    onClick={() => setShowSearchModal(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/[0.04] transition group"
                  >
                    <div className="flex items-center gap-3.5">
                      <img src={game.image} alt={game.name} className="w-12 h-14 object-cover rounded-xl border border-white/[0.08] shadow-sm group-hover:border-[#00E5FF]/40 transition" />
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition">{game.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{game.publisher}</p>
                      </div>
                    </div>
                    <span className="text-xs px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#00E5FF] font-mono font-semibold group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/40 transition">
                      Top-Up →
                    </span>
                  </Link>
                ))
              ) : searchQuery.trim() !== '' ? (
                <div className="p-8 text-center text-slate-400 text-sm">Game tidak ditemukan dalam katalog resmi.</div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">Mulai ketik untuk mencari game yang ingin kamu top-up.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Live Order Tracking Modal (Telemetry Dashboard) */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
            <button 
              onClick={() => setShowTrackModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-[#D4AF37]">
                <Activity size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Lacak Telemetri Pesanan</h3>
                <p className="text-xs text-slate-400 font-mono">Realtime Automated Gateway Checker</p>
              </div>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-3 mb-5">
              <label className="block text-xs font-semibold text-slate-400">Nomor Invoice atau ID Transaksi</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: VX-89421"
                  value={trackInvoice}
                  onChange={(e) => setTrackInvoice(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#00E5FF] transition"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-slate-950 font-bold text-xs hover:bg-cyan-300 transition shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                >
                  Cek Status
                </button>
              </div>
            </form>

            {trackedOrder ? (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-400">{trackedOrder.id}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-700/50">
                    <CheckCircle2 size={13} /> SUKSES TERKIRIM
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Game:</span>
                    <span className="font-semibold text-white">{trackedOrder.game}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Item:</span>
                    <span className="font-semibold text-cyan-400">{trackedOrder.item}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tujuan Akun:</span>
                    <span className="font-mono text-slate-300">{trackedOrder.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Waktu Injeksi:</span>
                    <span className="text-slate-400">{trackedOrder.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/[0.015] border border-white/[0.05] text-center text-xs text-slate-500 font-mono">
                Masukkan nomor transaksi di atas untuk memantau status injeksi API.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
