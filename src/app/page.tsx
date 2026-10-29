'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ALL_GAMES } from '@/data/games';
import { 
  Flame, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Ticket, 
  Search, 
  Zap, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

// 5 Hero Promotional Banner Slides
interface HeroBanner {
  id: number;
  image: string;
  badge: string;
  badgeType: 'promo' | 'riot' | 'krafton' | 'ea' | 'valve';
  titlePrimary: string;
  titleSecondary: string;
  subtitle: string;
  hasBakedText?: boolean;
  voucherCode?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  tagline: string;
}

const HERO_BANNERS: HeroBanner[] = [
  {
    id: 1,
    image: '/banners/promo_banner.jpg',
    badge: 'PROMO BULAN INI // EXCLUSIVE DISKON',
    badgeType: 'promo',
    hasBakedText: true,
    titlePrimary: 'PROMO SPESIAL',
    titleSecondary: 'DISKON UP TO 20K',
    subtitle: 'Klaim kupon voucher VEXATOPUP dan nikmati potongan instan tanpa syarat minimum pembelian untuk seluruh judul game.',
    voucherCode: 'VEXATOPUP',
    primaryCtaText: 'Gunakan Kupon Sekarang →',
    primaryCtaLink: '#catalog',
    secondaryCtaText: 'Buka Katalog Vault',
    secondaryCtaLink: '#catalog',
    tagline: 'ALL GAMES • INSTANT DELIVERY',
  },
  {
    id: 2,
    image: '/banners/banner_valorant.jpg',
    badge: 'RIOT GAMES OFFICIAL PARTNER',
    badgeType: 'riot',
    hasBakedText: true,
    titlePrimary: 'VALORANT RADIANT',
    titleSecondary: 'POINTS INSTANT PACK',
    subtitle: 'Injeksi VP resmi Riot Games dengan kecepatan kilat sub-5 detik. Buka skin Kuronami, Champions, dan Battle Pass sekarang.',
    primaryCtaText: 'Top-Up Valorant Points →',
    primaryCtaLink: '/order/valorant',
    secondaryCtaText: 'Lihat Denominasi',
    secondaryCtaLink: '/order/valorant',
    tagline: 'OFFICIAL RIOT API • ZERO LATENCY',
  },
  {
    id: 3,
    image: '/banners/banner_pubg.jpg',
    badge: 'KRAFTON AUTHORIZED PROTOCOL',
    badgeType: 'krafton',
    hasBakedText: false,
    titlePrimary: 'PUBG MOBILE',
    titleSecondary: 'UNKNOWN CASH (UC)',
    subtitle: 'Top-up UC tercepat dan termurah se-Indonesia. 100% legal, aman, dan langsung masuk ke akun PUBG kamu otomatis.',
    primaryCtaText: 'Beli PUBG UC Sekarang →',
    primaryCtaLink: '/order/pubg-mobile',
    secondaryCtaText: 'Cek Paket UC',
    secondaryCtaLink: '/order/pubg-mobile',
    tagline: 'INSTANT DELIVERY • 100% OFFICIAL',
  },
  {
    id: 4,
    image: '/banners/banner_apex.jpg',
    badge: 'ELECTRONIC ARTS GLOBAL RESELLER',
    badgeType: 'ea',
    hasBakedText: false,
    titlePrimary: 'APEX LEGENDS',
    titleSecondary: 'COINS & SEASON PASS',
    subtitle: 'Dapatkan Apex Coins instan untuk membuka Battle Pass & Heirloom pack tanpa antre. Pengiriman 24 jam nonstop.',
    primaryCtaText: 'Top-Up Apex Coins →',
    primaryCtaLink: '/order/apex-legends-pc',
    secondaryCtaText: 'Katalog Game PC',
    secondaryCtaLink: '#catalog',
    tagline: 'EA APP & STEAM VERIFIED • 24/7',
  },
  {
    id: 5,
    image: '/banners/banner_cs2.jpg',
    badge: 'VALVE STEAM WALLET IDR',
    badgeType: 'valve',
    hasBakedText: false,
    titlePrimary: 'STEAM WALLET CODE',
    titleSecondary: 'IDR INSTANT VOUCHER',
    subtitle: 'Voucher Steam Wallet resmi Rupiah otomatis masuk detik ini juga. Beli game terbaru, buka case CS2, dan upgrade item.',
    primaryCtaText: 'Beli Steam Wallet IDR →',
    primaryCtaLink: '/order/steam-wallet-code-idr',
    secondaryCtaText: 'Lihat Semua Voucher',
    secondaryCtaLink: '#catalog',
    tagline: 'AUTOMATED CODE DISPATCH • 24/7',
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'popular' | 'mobile' | 'pc' | 'voucher'>('all');
  const [search, setSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showGuaranteeModal, setShowGuaranteeModal] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  // Auto-slide effect every 5.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const handleCopyVoucher = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedVoucher(true);
      setTimeout(() => setCopiedVoucher(false), 2500);
    }
  };

  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter((game) => {
      const matchSearch = game.name.toLowerCase().includes(search.toLowerCase()) || 
                          game.publisher.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;

      if (selectedCategory === 'popular') return game.isPopular;
      if (selectedCategory === 'mobile') return game.category === 'mobile';
      if (selectedCategory === 'pc') return game.category === 'pc';
      if (selectedCategory === 'voucher') return game.category === 'voucher';
      return true;
    });
  }, [selectedCategory, search]);

  const activeBanner = HERO_BANNERS[currentSlide];

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Ambient Lighting Elements (Void Obsidian + Deep Cyan & Muted Gold Reflections) */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[750px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.075),transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-12 right-0 w-[650px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.045),transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-[800px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.035),transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute inset-0 cyber-grid opacity-[0.035] pointer-events-none -z-10" />

      <Navbar />

      {/* 5-Slide Interactive Hero Banner Slider Section */}
      <section 
        className="relative px-6 sm:px-10 lg:px-12 xl:px-14 pt-6 sm:pt-8 pb-8 max-w-7xl mx-auto w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#070A12] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
          
          {/* Main Visual Carousel Area */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[21/8] overflow-hidden">
            {HERO_BANNERS.map((banner, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-[opacity,visibility] duration-500 ease-in-out ${
                    isActive 
                      ? 'opacity-100 z-10 visible' 
                      : 'opacity-0 z-0 pointer-events-none invisible'
                  }`}
                >
                  {/* Background Artwork */}
                  <img
                    src={banner.image}
                    alt={`${banner.titlePrimary} ${banner.titleSecondary}`}
                    className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 group-hover:scale-[1.01]"
                  />

                  {/* If the banner has baked text, keep artwork clean with subtle bottom action dock */}
                  {banner.hasBakedText ? (
                    <>
                      {/* Subtle Vignette & Gradient for integration */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/90 via-transparent to-[#06080D]/40 pointer-events-none" />

                      {/* Floating Bottom Action Dock */}
                      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 flex flex-wrap items-center justify-between gap-4 z-20">
                        <div className="flex items-center gap-3">
                          {banner.voucherCode && (
                            <button
                              type="button"
                              onClick={() => handleCopyVoucher(banner.voucherCode!)}
                              className="px-4 py-2.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-cyan-400/50 backdrop-blur-xl text-white text-xs font-mono font-bold flex items-center gap-2.5 shadow-cyan-glow transition-all active:scale-95"
                            >
                              <Ticket size={15} className="text-[#00E5FF]" />
                              <span>KODE: <strong className="text-[#00E5FF]">{banner.voucherCode}</strong></span>
                              <span className={`text-[10px] font-sans px-2 py-0.5 rounded-md ${copiedVoucher ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-cyan-500/20 text-cyan-300'}`}>
                                {copiedVoucher ? '✓ TERSALIN' : 'SALIN'}
                              </span>
                            </button>
                          )}
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-white/[0.08] backdrop-blur-md text-[11px] font-mono text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {banner.tagline}
                          </span>
                        </div>

                        <Link
                          href={banner.primaryCtaLink}
                          className="px-6 sm:px-7 py-3 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-cyan-glow hover:shadow-[0_0_30px_rgba(0,229,255,0.45)] active:scale-95 flex items-center gap-2"
                        >
                          <Zap size={15} className="fill-slate-950" />
                          <span>{banner.primaryCtaText}</span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Dual Dark Luxury Gradient Overlays for High-Contrast Readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#06080D]/95 via-[#06080D]/75 to-transparent/20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-[#06080D]/30 to-transparent/60" />

                      {/* Asymmetric Typography & Content Overlay (Left Aligned) */}
                      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl lg:max-w-3xl z-20">
                        {/* Status Chip */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md w-fit mb-3 sm:mb-4 shadow-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-300 uppercase font-bold">
                            {banner.badge}
                          </span>
                        </div>

                        {/* Display Title */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.06]">
                          <span className="text-white block">{banner.titlePrimary}</span>
                          <span className="text-cyan-metallic block">{banner.titleSecondary}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2.5 sm:mt-3 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-3">
                          {banner.subtitle}
                        </p>

                        {/* Action Group */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
                          <Link
                            href={banner.primaryCtaLink}
                            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase transition-all shadow-cyan-glow hover:shadow-[0_0_30px_rgba(0,229,255,0.45)] active:scale-95 flex items-center gap-2"
                          >
                            <Zap size={15} className="fill-slate-950" />
                            <span>{banner.primaryCtaText}</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setShowGuaranteeModal(true)}
                            className="hidden md:inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-bold transition"
                          >
                            <ShieldCheck size={14} className="text-[#D4AF37]" />
                            <span>Garansi Resmi</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating Navigation Controls (Left & Right Arrows) */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#06080D]/75 hover:bg-slate-900 border border-white/[0.1] hover:border-[#00E5FF]/60 text-white hover:text-[#00E5FF] backdrop-blur-xl flex items-center justify-center transition-all shadow-2xl active:scale-95"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>

          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#06080D]/75 hover:bg-slate-900 border border-white/[0.1] hover:border-[#00E5FF]/60 text-white hover:text-[#00E5FF] backdrop-blur-xl flex items-center justify-center transition-all shadow-2xl active:scale-95"
          >
            <ChevronRight size={20} />
          </button>

          {/* 5 Interactive Progress Pills / Tabs Bar Underneath */}
          <div className="px-4 sm:px-8 py-3.5 bg-white/[0.02] border-t border-white/[0.06] backdrop-blur-xl flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            {HERO_BANNERS.map((banner, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-1 min-w-[120px] sm:min-w-[140px] text-left p-2.5 rounded-xl border transition-all ${
                    isActive 
                      ? 'bg-white/[0.06] border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                      : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isActive ? 'text-[#00E5FF] font-bold' : 'text-slate-500'}>
                      0{index + 1}. PROMO
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                    )}
                  </div>
                  <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {banner.titlePrimary}
                  </p>
                  
                  {/* Animated Progress Bar on Active Tab */}
                  <div className="w-full h-1 bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-cyan-400 to-[#00E5FF] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Telemetry Trust Strip Directly Below Hero Slider */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white font-mono">&lt; 15 Detik</p>
              <p className="text-[10px] text-slate-400">Proses Injeksi Otomatis</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white font-mono">100% Legal</p>
              <p className="text-[10px] text-slate-400">Distributor Resmi Publisher</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white font-mono">99.98%</p>
              <p className="text-[10px] text-slate-400">Uptime Gateway 24/7</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white font-mono">{ALL_GAMES.length}+ Game</p>
              <p className="text-[10px] text-slate-400">Pilihan Terlengkap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard & Catalog Section (Generous Negative Space, Ultra-Clean Grid) */}
      <main id="catalog" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-14 py-12 w-full flex-1">
        
        {/* Section Header with Asymmetric Composition */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/[0.06]">
          <div className="space-y-1.5">
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
              // VERIFIED GAME VAULT
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Katalog Game Resmi
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Pilih game favoritmu dan top-up langsung ke server resmi dengan mata uang 100% legal dan garansi instan.
            </p>
          </div>

          {/* Quick Search Input (Frosted Glass with Crisp Border) */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Cari judul game di vault..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.025] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF] transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Luxury Category Filter Tabs with Micro-Interactions */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'all'
                ? 'bg-white/[0.08] text-white border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            Semua Game ({ALL_GAMES.length})
          </button>
          
          <button
            onClick={() => setSelectedCategory('popular')}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'popular'
                ? 'bg-white/[0.08] text-white border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <Flame size={15} className="text-orange-400" /> Populer Esports
          </button>

          <button
            onClick={() => setSelectedCategory('mobile')}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'mobile'
                ? 'bg-white/[0.08] text-white border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <Smartphone size={15} /> Mobile Arena
          </button>

          <button
            onClick={() => setSelectedCategory('pc')}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'pc'
                ? 'bg-white/[0.08] text-white border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <Monitor size={15} /> PC Masterpieces
          </button>

          <button
            onClick={() => setSelectedCategory('voucher')}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'voucher'
                ? 'bg-white/[0.08] text-white border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <Ticket size={15} /> Gift Card & Voucher
          </button>
        </div>

        {/* Clean AAA Game Grid with Zero Clutter Badges (Strictly Poster + Publisher + Title) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              href={`/order/${game.slug}`}
              className="group relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.06] hover:border-[#00E5FF]/45 p-3 sm:p-3.5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-5px_rgba(0,229,255,0.14)]"
            >
              {/* Aspect 3:4 Poster Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900 mb-2.5 shadow-sm">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Game Metadata (Clean Typography Hierarchy, Zero Badge Clutter) */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                  {game.publisher}
                </p>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors line-clamp-1 leading-snug mt-0.5">
                  {game.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20 bg-white/[0.015] rounded-3xl border border-white/[0.06]">
            <p className="text-slate-400 text-sm">Tidak ada game yang cocok dengan pencarianmu.</p>
          </div>
        )}
      </main>

      {/* Official Guarantee Modal (Brushed Gold & Obsidian Glass) */}
      {showGuaranteeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowGuaranteeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-[#D4AF37] mb-5">
              <ShieldCheck size={24} />
            </div>

            <h3 className="text-xl font-black text-white mb-2">Garansi Resmi & Keamanan Akun</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              VexaStore bekerja sama secara resmi dengan distributor dan publisher game resmi. 
              Semua mata uang game yang kamu beli diproses langsung melalui jalur API terverifikasi.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">100% Legal & Anti-Banned</p>
                  <p className="text-slate-400 mt-0.5">Saldo game bersumber dari invoice resmi tanpa risiko penalti akun.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Garansi Uang Kembali 100%</p>
                  <p className="text-slate-400 mt-0.5">Jika pesanan gagal terkirim oleh sistem otomatis kami dalam 10 menit, saldo akan kami kembalikan penuh.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Layanan Pelanggan 24 Jam Nonstop</p>
                  <p className="text-slate-400 mt-0.5">Tim support siap membantu setiap kendala transaksi kamu kapan pun.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowGuaranteeModal(false)}
              className="w-full mt-6 py-3 rounded-xl bg-[#00E5FF] text-slate-950 font-bold text-xs hover:bg-cyan-300 transition shadow-cyan-glow"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Luxury Obsidian Esports Footer */}
      <footer className="border-t border-white/[0.06] bg-[#040609] py-14 px-6 sm:px-10 lg:px-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 to-[#0B0F17] border border-cyan-400/40 flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <span className="text-cyan-metallic">V</span>
              </div>
              <span className="font-black text-base text-white tracking-wider">
                VEXA<span className="text-[#00E5FF]">STORE</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-slate-400 text-xs">
              <span>QRIS Official</span>
              <span>BCA Virtual Account</span>
              <span>Mandiri VA</span>
              <span>GoPay & OVO</span>
              <span>ShopeePay</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-slate-400 font-medium">
              © 2026 VexaStore Esports Protocol. All rights reserved.
            </p>
            <p className="text-slate-500 font-mono text-[11px]">
              ENGINEERED FOR COMPETITIVE GAMERS • HIGH-THROUGHPUT API GATEWAY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
