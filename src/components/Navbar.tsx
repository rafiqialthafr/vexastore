'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Home, 
  FileText, 
  Tag, 
  Flame, 
  User, 
  Copy, 
  Sparkles,
  LogIn,
  Check
} from 'lucide-react';
import { ALL_GAMES } from '@/data/games';

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Modals State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);

  // Login Simulated State
  const [userPhone, setUserPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Track Order State
  const [trackInvoice, setTrackInvoice] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<{
    id: string;
    game: string;
    item: string;
    status: 'success' | 'processing';
    time: string;
    target: string;
  } | null>(null);

  // Filtered games based on search query
  const filteredGames = searchQuery.trim() === '' ? [] : ALL_GAMES.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 7);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhone.trim()) return;
    setIsLoggedIn(true);
    setUserName(`Gamer_${userPhone.slice(-4)}`);
    setShowLoginModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#06090E] text-slate-100 font-sans selection:bg-[#DFC28A]/25 selection:text-[#FFF5DE]">
      {/* =========================================================================
          1. KOLOM KIRI: SIDEBAR FULL-HEIGHT DARI ATAS SAMPAI BAWAH LAYAR
             - h-screen sticky top-0 w-20 md:w-24 shrink-0 flex flex-col items-center py-6 border-r border-zinc-800 bg-[#0c0d12]
             - Logo VexaStore di paling atas
             - Menu navigasi menyatu langsung di dalam sidebar (bukan kartu melayang terpisah)
      ========================================================================= */}
      <aside className="h-screen sticky top-0 w-20 md:w-24 shrink-0 hidden md:flex flex-col items-center py-8 border-r border-zinc-800 bg-[#0c0d12] z-40 select-none justify-between">
        {/* Menu Navigasi Menyatu Langsung di Sidebar */}
        <nav className="flex flex-col items-center gap-7 w-full my-auto">
          {/* Menu 1: Home */}
          <Link
            href="/"
            className={`relative flex flex-col items-center gap-1.5 py-1 px-2 text-xs transition group ${
              pathname === '/' 
                ? 'text-[#DFC28A] font-semibold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {pathname === '/' && (
              <span className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#DFC28A] rounded-r-full shadow-[0_0_10px_rgba(223,194,138,0.8)]" />
            )}
            <Home size={22} className={pathname === '/' ? 'text-[#DFC28A]' : 'group-hover:scale-110 transition-transform'} />
            <span className="text-[11px] tracking-tight">Home</span>
          </Link>

          {/* Menu 2: Transaksi */}
          <button
            type="button"
            onClick={() => { setShowTrackModal(true); setTrackedOrder(null); }}
            className="relative flex flex-col items-center gap-1.5 py-1 px-2 text-xs text-zinc-400 hover:text-white transition group"
          >
            <FileText size={22} className="group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform" />
            <span className="text-[11px] tracking-tight">Transaksi</span>
          </button>

          {/* Menu 3: Promo */}
          <Link
            href="/promo"
            className={`relative flex flex-col items-center gap-1.5 py-1 px-2 text-xs transition group ${
              pathname.startsWith('/promo') 
                ? 'text-[#DFC28A] font-semibold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {pathname.startsWith('/promo') && (
              <span className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#DFC28A] rounded-r-full shadow-[0_0_10px_rgba(223,194,138,0.8)]" />
            )}
            <Tag size={22} className={pathname.startsWith('/promo') ? 'text-[#DFC28A]' : 'group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform'} />
            <span className="text-[11px] tracking-tight">Promo</span>
          </Link>

          {/* Menu 4: Artikel */}
          <Link
            href="/artikel"
            className={`relative flex flex-col items-center gap-1.5 py-1 px-2 text-xs transition group ${
              pathname.startsWith('/artikel') 
                ? 'text-[#DFC28A] font-semibold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {pathname.startsWith('/artikel') && (
              <span className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#DFC28A] rounded-r-full shadow-[0_0_10px_rgba(223,194,138,0.8)]" />
            )}
            <Flame size={22} className={pathname.startsWith('/artikel') ? 'text-[#DFC28A]' : 'group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform'} />
            <span className="text-[11px] tracking-tight">Artikel</span>
          </Link>
        </nav>

        {/* Bottom subtle trust mark */}
        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#DFC28A]/70 text-[10px] font-mono font-bold" title="VexaStore Protocol">
          VX
        </div>
      </aside>

      {/* =========================================================================
          2. KOLOM KANAN: MEMBUNGKUS HEADER DAN MAIN CONTENT
             - flex-1 min-w-0 flex flex-col min-h-screen
             - Header HANYA di kolom kanan (tidak menutupi sidebar kiri)
             - Logo VexaStore (ada tulisannya) di header dengan padding sesuai konten card
      ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen pb-16 md:pb-0">
        <header className="sticky top-0 z-30 border-b border-zinc-800/60 bg-[#090a0f]/80 backdrop-blur-md py-3.5">
          <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 flex items-center justify-between gap-4 sm:gap-6">
            
            {/* Logo VexaStore dengan Tulisan (Sesuai Padding Card di Bawahnya) */}
            <Link href="/" className="shrink-0 flex items-center group py-1">
              <Image
                src="/logo.png"
                alt="VexaStore"
                width={145}
                height={36}
                priority
                className="h-7 sm:h-8 w-auto object-contain hover:brightness-110 transition"
              />
            </Link>

            {/* Search Bar Terpusat (Panjang dengan Live Dropdown) */}
            <div ref={searchContainerRef} className="flex-1 max-w-xl mx-auto relative">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Cari Game favoritmu ..."
                  className="w-full pl-5 pr-12 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-700/60 hover:border-[#DFC28A]/60 focus:border-[#DFC28A] text-white text-xs sm:text-sm placeholder-zinc-400 focus:outline-none transition shadow-inner focus:shadow-[0_0_20px_rgba(223,194,138,0.2)]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 flex items-center gap-1.5">
                  <Search size={18} className="text-[#DFC28A]" />
                </div>
              </div>

              {/* Live Instant Search Dropdown List */}
              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0C101A] border border-zinc-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-2 divide-y divide-zinc-800 max-h-96 overflow-y-auto animate-in fade-in duration-150">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <Link
                        key={game.id}
                        href={`/order/${game.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/60 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={game.image} 
                            alt={game.name} 
                            className="w-12 h-12 aspect-square object-contain bg-zinc-950 shrink-0 rounded-xl border border-zinc-800 shadow-sm group-hover:border-[#DFC28A]/50 transition" 
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#DFC28A] transition">
                              {game.name}
                            </h4>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{game.publisher}</p>
                          </div>
                        </div>
                        <span className="text-[11px] px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-[#DFC28A] font-mono font-semibold group-hover:bg-[#DFC28A]/10 group-hover:border-[#DFC28A]/40 transition">
                          Top-Up →
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-zinc-400 font-mono">
                      Game &quot;{searchQuery}&quot; tidak ditemukan dalam katalog resmi.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 1 Tombol Masuk di Kanan */}
            <div className="shrink-0">
              {isLoggedIn ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-zinc-800/80 border border-[#DFC28A]/40 hover:bg-zinc-700/80 transition flex items-center gap-2 shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-[#DFC28A] text-zinc-950 font-black text-[10px] flex items-center justify-center">
                    {userName.charAt(0)}
                  </div>
                  <span className="hidden sm:inline">{userName}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#DFC28A] bg-[#11131a] hover:bg-[#181b24] border border-[#DFC28A]/35 hover:border-[#DFC28A]/65 transition active:scale-95 flex items-center gap-2"
                >
                  <User size={15} />
                  <span>Masuk</span>
                </button>
              )}
            </div>

          </div>
        </header>

        {/* Main Content Rendered in Right Column (Minimalist Symmetrical Winged-Shield Motif Below Navbar) */}
        <div className="relative flex-1 flex flex-col isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-0 inset-x-0 h-[240px] sm:h-[330px] md:h-[420px] overflow-hidden -z-10"
            style={{
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.25) 86%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.25) 86%, rgba(0,0,0,0) 100%)',
            }}
          >
            <div className="max-w-[1440px] mx-auto w-full h-full">
              <svg
                viewBox="0 0 1440 440"
                preserveAspectRatio="xMidYMin slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  {/* Whisper-clean Pearl White Wing Feathers */}
                  <linearGradient id="vx-wing-white-outer" x1="720" y1="0" x2="720" y2="420" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.022" />
                    <stop offset="50%" stopColor="#F8FAFC" stopOpacity="0.014" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="vx-wing-white-inner" x1="720" y1="0" x2="720" y2="420" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.026" />
                    <stop offset="50%" stopColor="#FFFDF9" stopOpacity="0.016" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Minimalist Matte Champagne Gold Wing Shield */}
                  <linearGradient id="vx-wing-gold-outer" x1="720" y1="0" x2="720" y2="420" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#DFC28A" stopOpacity="0.042" />
                    <stop offset="50%" stopColor="#DFC28A" stopOpacity="0.025" />
                    <stop offset="100%" stopColor="#DFC28A" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="vx-wing-gold-inner" x1="720" y1="0" x2="720" y2="420" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E5C88E" stopOpacity="0.055" />
                    <stop offset="50%" stopColor="#DFC28A" stopOpacity="0.032" />
                    <stop offset="100%" stopColor="#DFC28A" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* 4 Concentric Symmetrical Winged-Shield Layers (Exact Lapakgaming Minimalist Silhouette) */}
                <polygon points="50,0 1390,0 1344,172 1157,158 720,766 283,158 96,172" fill="url(#vx-wing-white-outer)" />
                <polygon points="69,0 1371,0 1274,193 1083,158 720,684 357,158 166,193" fill="url(#vx-wing-gold-outer)" />
                <polygon points="88,0 1352,0 1197,213 1007,158 720,603 433,158 243,213" fill="url(#vx-wing-white-inner)" />
                <polygon points="107,0 1333,0 1121,230 931,158 720,522 509,158 319,230" fill="url(#vx-wing-gold-inner)" />
              </svg>
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Khusus Smartphone) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d12] border-t border-zinc-800 flex md:hidden items-center justify-around py-2 px-1 shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
            pathname === '/' ? 'text-[#DFC28A] font-bold' : 'text-zinc-400'
          }`}
        >
          <Home size={19} />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        <button
          onClick={() => { setShowTrackModal(true); setTrackedOrder(null); }}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-zinc-400 hover:text-white"
        >
          <FileText size={19} />
          <span className="text-[10px] mt-0.5">Transaksi</span>
        </button>

        <Link
          href="/promo"
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
            pathname.startsWith('/promo') ? 'text-[#DFC28A] font-bold' : 'text-zinc-400'
          }`}
        >
          <Tag size={19} />
          <span className="text-[10px] mt-0.5">Promo</span>
        </Link>

        <Link
          href="/artikel"
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
            pathname.startsWith('/artikel') ? 'text-[#DFC28A] font-bold' : 'text-zinc-400'
          }`}
        >
          <Flame size={19} />
          <span className="text-[10px] mt-0.5">Artikel</span>
        </Link>
      </nav>

      {/* =========================================================================
          3. INTERACTIVE MODALS
      ========================================================================= */}

      {/* MODAL 1: MASUK / LOGIN */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
                <LogIn size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Masuk ke VexaStore</h3>
                <p className="text-xs text-slate-400">Akses riwayat top-up & klaim reward member</p>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DFC28A] text-slate-950 font-black flex items-center justify-center">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{userName}</p>
                    <p className="text-xs text-emerald-400 font-mono">Member Tier: VIP Protocol</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserPhone('');
                    setShowLoginModal(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/[0.08] text-xs font-bold transition"
                >
                  Keluar dari Akun
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Nomor WhatsApp atau Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 081234567890 atau email@kamu.com"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-[#DFC28A] transition shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EBD5A7] to-[#DFC28A] text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition shadow-[0_0_20px_rgba(223,194,138,0.25)]"
                >
                  Lanjut Masuk
                </button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.08]"></div></div>
                  <span className="relative bg-[#0B0F17] px-3 text-[11px] text-slate-500 uppercase font-mono">atau</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setUserName('Google_Gamer');
                    setShowLoginModal(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <span>Masuk dengan Google</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: TRANSAKSI & LACAK PESANAN */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowTrackModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
                <FileText size={18} />
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
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#DFC28A] transition"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EBD5A7] to-[#DFC28A] text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-[0_0_15px_rgba(223,194,138,0.25)]"
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
                    <span className="font-semibold text-[#DFC28A]">{trackedOrder.item}</span>
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
                Masukkan nomor invoice di atas untuk memantau status injeksi API.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
