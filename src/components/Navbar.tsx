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
  Gift, 
  BadgeDollarSign, 
  User, 
  Copy, 
  Sparkles,
  LogIn,
  Check
} from 'lucide-react';
import { ALL_GAMES } from '@/data/games';

export default function Navbar() {
  const pathname = usePathname();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Modals State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);

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

  // Voucher Copy State
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Daily Reward Claimed State
  const [hasClaimedReward, setHasClaimedReward] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(1250);

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

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleClaimReward = () => {
    if (hasClaimedReward) return;
    setHasClaimedReward(true);
    setRewardPoints(prev => prev + 100);
  };

  return (
    <>
      {/* =========================================================================
          1. TOP NAVBAR (HANYA: LOGO + SEARCH BAR PANJANG + 1 TOMBOL MASUK)
      ========================================================================= */}
      {/* =========================================================================
          1. TOP NAVBAR (HANYA: LOGO + SEARCH BAR PANJANG + 1 TOMBOL MASUK)
          - Full width bar spanning across the top
          - Solid deep obsidian background with clear bottom dividing line & shadow
      ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#0C101A] border-b border-white/[0.14] shadow-[0_4px_30px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-4">
          
          {/* Logo Brand VexaStore (Kiri) */}
          <Link href="/" className="shrink-0 flex items-center group py-1">
            <Image
              src="/logo.png"
              alt="VexaStore"
              width={592}
              height={158}
              priority
              className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(223,194,138,0.4)]"
            />
          </Link>

          {/* Search Bar Panjang (Gaya Lapakgaming) dengan Live Dropdown */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl md:max-w-2xl lg:max-w-3xl relative mx-2 sm:mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Cari Game favoritmu (MLBB, Free Fire, Valorant, Genshin)..."
                className="w-full pl-5 pr-12 py-2.5 sm:py-3 rounded-full bg-white/[0.045] border border-white/[0.15] hover:border-[#DFC28A]/60 focus:border-[#DFC28A] text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_20px_rgba(223,194,138,0.2)]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center gap-1.5">
                <Search size={18} className="text-[#DFC28A]" />
              </div>
            </div>

            {/* Live Instant Search Dropdown List */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0C101A] border border-white/[0.15] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-2 divide-y divide-white/[0.06] max-h-96 overflow-y-auto animate-in fade-in duration-150">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <Link
                      key={game.id}
                      href={`/order/${game.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] transition group"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={game.image} 
                          alt={game.name} 
                          className="w-11 h-13 object-cover rounded-xl border border-white/[0.1] shadow-sm group-hover:border-[#DFC28A]/50 transition" 
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#DFC28A] transition">
                            {game.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{game.publisher}</p>
                        </div>
                      </div>
                      <span className="text-[11px] px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#DFC28A] font-mono font-semibold group-hover:bg-[#DFC28A]/10 group-hover:border-[#DFC28A]/40 transition">
                        Top-Up →
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 font-mono">
                    Game &quot;{searchQuery}&quot; tidak ditemukan dalam katalog resmi.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Satu Tombol Masuk (Right Edge) */}
          <div className="shrink-0">
            {isLoggedIn ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold text-white bg-white/[0.06] border border-[#DFC28A]/50 hover:bg-white/[0.1] transition flex items-center gap-2 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#DFC28A] text-slate-950 font-black text-[10px] flex items-center justify-center">
                  {userName.charAt(0)}
                </div>
                <span className="hidden sm:inline">{userName}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#DFC28A] via-[#EBD5A7] to-[#DFC28A] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(223,194,138,0.3)] hover:shadow-[0_0_30px_rgba(223,194,138,0.5)] active:scale-95 flex items-center gap-2"
              >
                <User size={15} className="fill-slate-950" />
                <span>Masuk</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. SIDEBAR MENU (PERSIS SEPERTI WEB LAPAKGAMING)
          Desktop: Fixed vertical sidebar di sebelah kiri dengan garis pemisah jelas
          Mobile: Docked bottom navigation bar yang rapi
      ========================================================================= */}
      
      {/* DESKTOP SIDEBAR (Kiri - Berdiri Sendiri dengan Border Kanan & Shadow) */}
      <aside className="fixed left-0 top-[74px] bottom-0 w-[80px] z-40 bg-[#090D15] border-r border-white/[0.14] shadow-[4px_0_30px_rgba(0,0,0,0.7)] hidden md:flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-3.5 w-full px-2.5">
          
          {/* Menu 1: Home */}
          <Link
            href="/"
            className={`w-full py-3 px-1 rounded-xl flex flex-col items-center justify-center transition-all group ${
              pathname === '/' 
                ? 'bg-[#DFC28A]/15 text-[#DFC28A] border border-[#DFC28A]/40 shadow-[0_0_15px_rgba(223,194,138,0.2)] font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Home size={20} className={pathname === '/' ? 'text-[#DFC28A]' : 'group-hover:scale-110 transition-transform'} />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">Home</span>
          </Link>

          {/* Menu 2: Transaksi */}
          <button
            type="button"
            onClick={() => { setShowTrackModal(true); setTrackedOrder(null); }}
            className="w-full py-3 px-1 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group"
          >
            <FileText size={20} className="group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform" />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">Transaksi</span>
          </button>

          {/* Menu 3: Promo */}
          <button
            type="button"
            onClick={() => setShowPromoModal(true)}
            className="w-full py-3 px-1 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group"
          >
            <Tag size={20} className="group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform" />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">Promo</span>
          </button>

          {/* Menu 4: Hadiahku */}
          <button
            type="button"
            onClick={() => setShowRewardModal(true)}
            className="w-full py-3 px-1 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group relative"
          >
            <Gift size={20} className="group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform" />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">Hadiahku</span>
            {!hasClaimedReward && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DFC28A] animate-pulse shadow-[0_0_8px_rgba(223,194,138,0.8)]" />
            )}
          </button>

          {/* Menu 5: Affiliate */}
          <button
            type="button"
            onClick={() => setShowAffiliateModal(true)}
            className="w-full py-3 px-1 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group"
          >
            <BadgeDollarSign size={20} className="group-hover:scale-110 group-hover:text-[#DFC28A] transition-transform" />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">Affiliate</span>
          </button>

        </div>

        {/* Bottom subtle trust mark */}
        <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-500 text-[10px] font-mono" title="VexaStore Protocol">
          VX
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR (Khusus Smartphone) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090D15] border-t border-white/[0.14] flex md:hidden items-center justify-around py-2 px-1 shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
            pathname === '/' ? 'text-[#DFC28A] font-bold' : 'text-slate-400'
          }`}
        >
          <Home size={19} />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        <button
          onClick={() => { setShowTrackModal(true); setTrackedOrder(null); }}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-white"
        >
          <FileText size={19} />
          <span className="text-[10px] mt-0.5">Transaksi</span>
        </button>

        <button
          onClick={() => setShowPromoModal(true)}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-white"
        >
          <Tag size={19} />
          <span className="text-[10px] mt-0.5">Promo</span>
        </button>

        <button
          onClick={() => setShowRewardModal(true)}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-white relative"
        >
          <Gift size={19} />
          <span className="text-[10px] mt-0.5">Hadiahku</span>
          {!hasClaimedReward && (
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#DFC28A] animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setShowAffiliateModal(true)}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-white"
        >
          <BadgeDollarSign size={19} />
          <span className="text-[10px] mt-0.5">Affiliate</span>
        </button>
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

      {/* MODAL 3: PROMO & VOUCHER */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowPromoModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
                <Tag size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Promo & Kupon Eksklusif</h3>
                <p className="text-xs text-slate-400">Salin kode voucher dan gunakan saat checkout</p>
              </div>
            </div>

            <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
              {/* Voucher 1 */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#DFC28A]/40 transition flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-[#DFC28A]">VEXATOPUP</span>
                    <span className="text-[10px] bg-[#DFC28A]/15 text-[#DFC28A] px-2 py-0.5 rounded-md font-semibold">Diskon s/d 20k</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Potongan harga langsung tanpa batas minimal untuk seluruh judul game.</p>
                </div>
                <button
                  onClick={() => copyVoucher('VEXATOPUP')}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-[#DFC28A] hover:text-slate-950 text-xs font-mono font-bold text-slate-300 transition shrink-0 flex items-center gap-1.5"
                >
                  {copiedCode === 'VEXATOPUP' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode === 'VEXATOPUP' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              {/* Voucher 2 */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#DFC28A]/40 transition flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-[#DFC28A]">VEXANEW</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-md font-semibold">Cashback 15%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Khusus transaksi pertama pengguna baru akun VexaStore.</p>
                </div>
                <button
                  onClick={() => copyVoucher('VEXANEW')}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-[#DFC28A] hover:text-slate-950 text-xs font-mono font-bold text-slate-300 transition shrink-0 flex items-center gap-1.5"
                >
                  {copiedCode === 'VEXANEW' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode === 'VEXANEW' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              {/* Voucher 3 */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#DFC28A]/40 transition flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-[#DFC28A]">FLASHWEEKEND</span>
                    <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-md font-semibold">Special Flash</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Ekstra 50 diamonds gratis untuk pembelian paket mingguan game populer.</p>
                </div>
                <button
                  onClick={() => copyVoucher('FLASHWEEKEND')}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-[#DFC28A] hover:text-slate-950 text-xs font-mono font-bold text-slate-300 transition shrink-0 flex items-center gap-1.5"
                >
                  {copiedCode === 'FLASHWEEKEND' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode === 'FLASHWEEKEND' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: HADIAHKU & REWARDS VAULT */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowRewardModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
                <Gift size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hadiahku & Vault Reward</h3>
                <p className="text-xs text-slate-400">Kumpulkan poin transaksi dan tukar dengan diskon gratis</p>
              </div>
            </div>

            {/* Poin Counter */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-[#DFC28A]/10 border border-[#DFC28A]/30 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Saldo Poin Kamu</p>
                <p className="text-3xl font-black text-[#DFC28A] font-mono mt-0.5">
                  {rewardPoints.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-sans">Pts</span>
                </p>
              </div>
              <Sparkles size={28} className="text-[#DFC28A] animate-pulse" />
            </div>

            {/* Daily Check-in Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Daily Check-in Hadiah</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">+100 Poin Gratis Setiap Hari</p>
                </div>
                <button
                  onClick={handleClaimReward}
                  disabled={hasClaimedReward}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    hasClaimedReward
                      ? 'bg-white/[0.05] text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#DFC28A] via-[#EBD5A7] to-[#DFC28A] text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(223,194,138,0.25)]'
                  }`}
                >
                  {hasClaimedReward ? '✓ Sudah Diklaim' : 'Klaim 100 Pts'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: AFFILIATE & CREATORS SQUAD */}
      {showAffiliateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowAffiliateModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
                <BadgeDollarSign size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Creators & Affiliate Squad</h3>
                <p className="text-xs text-slate-400">Program Kemitraan Komisi Top-Up Terbesar</p>
              </div>
            </div>

            {/* Banner Lapakgaming-style Commission Highlight */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#DFC28A]/20 to-transparent border border-[#DFC28A]/40 mb-5">
              <span className="text-[10px] font-mono font-black text-[#DFC28A] uppercase tracking-wider">KOMISI HINGGA 10%</span>
              <h4 className="text-lg font-black text-white mt-1 leading-snug">
                Main Game Jadi Cuan Jutaan Tiap Bulan!
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Gabung squad affiliate VexaStore dan bagikan link referral tokomu ke teman & komunitas. Tarik penghasilan langsung ke rekening bank atau e-wallet tanpa minimum payout rumit.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Dashboard telemetri klik & komisi realtime 24/7</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Materi promosi banner & media kit resmi siap pakai</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Pendaftaran Affiliate Berhasil Disimpan!\nTim VexaStore akan menghubungi kontak WhatsApp kamu dalam waktu 1x24 jam.');
                setShowAffiliateModal(false);
              }}
              className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EBD5A7] to-[#DFC28A] text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-[0_0_20px_rgba(223,194,138,0.25)]"
            >
              Daftar Squad Sekarang (Gratis)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
