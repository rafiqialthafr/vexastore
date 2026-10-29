'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { ALL_GAMES } from '@/data/games';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  Zap 
} from 'lucide-react';

interface HeroBanner {
  id: number;
  image: string;
  gameTitle: string;
  publisher: string;
  headlinePrefix: string;
  headline: string;
  highlightLabel: string;
  highlightBadge: string;
  highlightPrice: string;
  highlightOriginal: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_BANNERS: HeroBanner[] = [
  {
    id: 1,
    image: '/banners/banner_mlbb.jpg',
    gameTitle: 'Mobile Legends: Bang Bang',
    publisher: 'MOONTON',
    headlinePrefix: 'Event Resmi Moonton',
    headline: 'Promo Spesial Aspirants & Starlight!',
    highlightLabel: 'Weekly Diamond Pass (WDP)',
    highlightBadge: 'PALING HEMAT!',
    highlightPrice: 'Rp 27.500',
    highlightOriginal: 'Rp 35.000',
    ctaText: 'Beli Sekarang!',
    ctaLink: '/order/mobile-legends',
  },
  {
    id: 2,
    image: '/banners/banner_valorant_gold.jpg',
    gameTitle: 'Valorant Riot Games',
    publisher: 'RIOT GAMES',
    headlinePrefix: 'Tactical Vault 2026',
    headline: 'Radiant Protocol Exclusive Bonus VP!',
    highlightLabel: '1.125 + 150 Bonus VP',
    highlightBadge: 'PALING MURAH!',
    highlightPrice: 'Rp 135.000',
    highlightOriginal: 'Rp 150.000',
    ctaText: 'Beli Sekarang!',
    ctaLink: '/order/valorant',
  },
  {
    id: 3,
    image: '/banners/banner_freefire.jpg',
    gameTitle: 'Free Fire Max Garena',
    publisher: 'GARENA',
    headlinePrefix: 'Booyah Pass Season',
    headline: 'Flash Diamond Vault & Booyah Pass!',
    highlightLabel: '720 + 72 Bonus Diamonds',
    highlightBadge: 'KILAT & LEGAL!',
    highlightPrice: 'Rp 93.000',
    highlightOriginal: 'Rp 115.000',
    ctaText: 'Beli Sekarang!',
    ctaLink: '/order/free-fire',
  },
  {
    id: 4,
    image: '/banners/banner_pubg.jpg',
    gameTitle: 'PUBG Mobile',
    publisher: 'KRAFTON',
    headlinePrefix: 'Battle Royale Special',
    headline: 'Royale Pass & Unknown Cash Pack!',
    highlightLabel: '660 UC (Full Royale Pass)',
    highlightBadge: 'DISKON 20%!',
    highlightPrice: 'Rp 130.000',
    highlightOriginal: 'Rp 150.000',
    ctaText: 'Beli Sekarang!',
    ctaLink: '/order/pubg-mobile',
  },
  {
    id: 5,
    image: '/banners/banner_apex.jpg',
    gameTitle: 'Genshin Impact & Honkai',
    publisher: 'HOYOVERSE',
    headlinePrefix: 'Teyvat Blessing',
    headline: 'Blessing of the Welkin Moon & Crystals!',
    highlightLabel: 'Welkin Moon 30 Hari + 300 GC',
    highlightBadge: 'RESMI DIRECT!',
    highlightPrice: 'Rp 74.000',
    highlightOriginal: 'Rp 85.000',
    ctaText: 'Beli Sekarang!',
    ctaLink: '/order/genshin-impact',
  },
  {
    id: 6,
    image: '/banners/banner_cs2.jpg',
    gameTitle: 'Steam Wallet Code IDR',
    publisher: 'VALVE',
    headlinePrefix: 'Steam Global Discount',
    headline: 'Steam Wallet Code IDR Musim Spesial!',
    highlightLabel: 'Voucher IDR 250.000',
    highlightBadge: 'INSTAN REDEEM!',
    highlightPrice: 'Rp 255.000',
    highlightOriginal: 'Rp 275.000',
    ctaText: 'Beli Sekarang!',
    ctaLink: '/order/steam-wallet-code-idr',
  },
];

const CATEGORIES = [
  { id: 'all', label: '🔥 Lagi Populer' },
  { id: 'rbl', label: 'RBL Games' },
  { id: 'direct', label: 'Top Up Langsung' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'new', label: '🌟 Baru Rilis' },
  { id: 'voucher', label: 'Voucher' },
  { id: 'login', label: 'Top Up Login' },
  { id: 'pulsa', label: 'Pulsa' },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const filteredGames = useMemo(() => {
    if (selectedCategory === 'all' || selectedCategory === 'direct') {
      return ALL_GAMES;
    }
    if (selectedCategory === 'rbl') {
      const rbl = ALL_GAMES.filter(g => g.name.toLowerCase().includes('roblox') || g.publisher.toLowerCase().includes('roblox'));
      return rbl.length > 0 ? rbl : ALL_GAMES.slice(0, 8);
    }
    if (selectedCategory === 'entertainment') {
      const ent = ALL_GAMES.filter(g => g.category === 'voucher' || g.name.toLowerCase().includes('steam') || g.name.toLowerCase().includes('play'));
      return ent.length > 0 ? ent : ALL_GAMES.slice(0, 8);
    }
    if (selectedCategory === 'new') {
      return ALL_GAMES.slice(-8);
    }
    if (selectedCategory === 'voucher' || selectedCategory === 'pulsa') {
      const vouchers = ALL_GAMES.filter(g => g.category === 'voucher');
      return vouchers.length > 0 ? vouchers : ALL_GAMES.slice(0, 8);
    }
    if (selectedCategory === 'login') {
      return ALL_GAMES.filter(g => g.idRequirements.needsUserId);
    }
    return ALL_GAMES;
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#06090E] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#DFC28A]/25 selection:text-[#FFF5DE]">
      
      {/* =========================================================================
          WARNA EMAS SAMAR: LUMINOUS GOLD DIAGONAL WINGS & AMBIENT AURA
          (Persis sayap diagonal biru samar yang membingkai hero slider Lapakgaming)
      ========================================================================= */}
      <div className="absolute top-[74px] left-0 md:left-[80px] right-0 h-[520px] pointer-events-none overflow-hidden -z-10 select-none">
        {/* Luminous Center Gold Ambient Halo */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[950px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(223,194,138,0.28),rgba(223,194,138,0.10)_48%,transparent_75%)] blur-3xl" />

        {/* SVG Geometric Facets (Persis Sayap Diagonal Lapakgaming) */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 520" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Left Gold Wing Gradient */}
            <linearGradient id="goldWingLeft" x1="0%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#DFC28A" stopOpacity="0.25" />
              <stop offset="45%" stopColor="#DFC28A" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#DFC28A" stopOpacity="0" />
            </linearGradient>

            {/* Secondary Left Gold Accent Facet */}
            <linearGradient id="goldFacetLeft2" x1="15%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#F5E5C9" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#DFC28A" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#DFC28A" stopOpacity="0" />
            </linearGradient>

            {/* Primary Right Gold Wing Gradient */}
            <linearGradient id="goldWingRight" x1="100%" y1="0%" x2="30%" y2="100%">
              <stop offset="0%" stopColor="#DFC28A" stopOpacity="0.25" />
              <stop offset="45%" stopColor="#DFC28A" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#DFC28A" stopOpacity="0" />
            </linearGradient>

            {/* Secondary Right Gold Accent Facet */}
            <linearGradient id="goldFacetRight2" x1="85%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#F5E5C9" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#DFC28A" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#DFC28A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Outer Wing Polygon */}
          <polygon points="0,0 520,0 280,520 0,520" fill="url(#goldWingLeft)" />
          {/* Left Inner Slanted Stripe */}
          <polygon points="260,0 480,0 320,520 200,520" fill="url(#goldFacetLeft2)" opacity="0.85" />

          {/* Right Outer Wing Polygon */}
          <polygon points="1440,0 920,0 1160,520 1440,520" fill="url(#goldWingRight)" />
          {/* Right Inner Slanted Stripe */}
          <polygon points="1180,0 960,0 1120,520 1240,520" fill="url(#goldFacetRight2)" opacity="0.85" />

          {/* Sleek Dashed Lines Accents */}
          <line x1="520" y1="0" x2="280" y2="520" stroke="#DFC28A" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="920" y1="0" x2="1160" y2="520" stroke="#DFC28A" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>

        {/* Soft Bottom Ambient Blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06090E] via-[#06090E]/80 to-transparent" />
      </div>

      {/* Fixed Header Navbar */}
      <Navbar />

      {/* Main Content Area (Offset for Fixed Header 74px and Sidebar 80px) */}
      <div className="pt-[74px] md:pl-[80px] pb-16 flex-1 flex flex-col bg-transparent min-h-screen">
        
        {/* =========================================================================
            HERO SLIDER (3D COVERFLOW FLUID - TIDAK KAKU - PERSIS PROPORSI LAPAKGAMING)
        ========================================================================= */}
        <section 
          className="relative w-full max-w-7xl mx-auto px-1 sm:px-3 pt-3 sm:pt-4 pb-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Coverflow Stage Container */}
          <div className="relative w-full flex items-center justify-center h-[185px] sm:h-[215px] md:h-[235px] overflow-hidden select-none">
            {HERO_BANNERS.map((banner, index) => {
              const count = HERO_BANNERS.length;
              const diff = (index - currentSlide + count) % count;
              const isCenter = diff === 0;
              const isPrev = diff === count - 1;
              const isNext = diff === 1;

              // Only render center, prev, and next slides for optimal performance and crisp coverflow
              if (!isCenter && !isPrev && !isNext) return null;

              return (
                <div
                  key={banner.id}
                  onClick={() => {
                    if (isPrev) handlePrevSlide();
                    if (isNext) handleNextSlide();
                  }}
                  className={`absolute top-0 bottom-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center w-[90%] sm:w-[560px] md:w-[640px] lg:w-[680px] ${
                    isCenter
                      ? 'left-1/2 -translate-x-1/2 z-20 scale-100 opacity-100 shadow-[0_22px_55px_rgba(0,0,0,0.95),0_0_40px_rgba(223,194,138,0.22)] cursor-default'
                      : isPrev
                      ? 'left-1/2 -translate-x-[calc(50%+76%)] sm:-translate-x-[calc(50%+450px)] md:-translate-x-[calc(50%+510px)] lg:-translate-x-[calc(50%+550px)] z-10 scale-[0.93] opacity-80 hover:opacity-100 cursor-pointer blur-[0.2px]'
                      : 'left-1/2 translate-x-[calc(-50%+76%)] sm:translate-x-[calc(-50%+450px)] md:translate-x-[calc(-50%+510px)] lg:translate-x-[calc(-50%+550px)] z-10 scale-[0.93] opacity-80 hover:opacity-100 cursor-pointer blur-[0.2px]'
                  }`}
                >
                  <div className={`relative w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden border transition-all duration-300 ${
                    isCenter 
                      ? 'border-[#DFC28A]/45 ring-1 ring-[#DFC28A]/25 bg-[#0B0E17]' 
                      : 'border-white/[0.14] bg-[#0A0D15]'
                  }`}>
                    {/* Background Banner Artwork */}
                    <img
                      src={banner.image}
                      alt={banner.headline}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700"
                    />

                    {/* Gradient Overlay for Text Legibility on Left */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-transparent pointer-events-none" />

                    {/* POJOK ATAS KIRI: Logo VexaStore (HANYA LOGO Crest Saja, Tulisannya Gausah) */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-30 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md flex items-center justify-center">
                      <Image
                        src="/logo-crest.png"
                        alt="VexaStore"
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      />
                    </div>

                    {/* POJOK ATAS KANAN: Publisher / Partner Badge */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3.5 z-30 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFC28A] animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-slate-200 uppercase font-mono">
                        {banner.publisher}
                      </span>
                    </div>

                    {/* Left Overlay Content (Framed Box & Minimalist Composition Persis Lapakgaming) */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center pl-3.5 sm:pl-6 md:pl-7 pr-3 max-w-[65%] sm:max-w-[58%]">
                      {/* Tagline / Event Prefix */}
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#DFC28A] tracking-wider uppercase mb-0.5">
                        // {banner.headlinePrefix}
                      </span>

                      {/* Headline Title */}
                      <h3 className="text-xs sm:text-base md:text-lg font-black text-white leading-tight drop-shadow tracking-tight">
                        {banner.headline}
                      </h3>

                      {/* Framed Price Card (Gaya Frame Glowing Neon Lapakgaming) */}
                      <div className="mt-1.5 sm:mt-2 bg-slate-950/85 border border-[#DFC28A]/45 rounded-xl p-1.5 sm:px-2.5 sm:py-1.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] w-fit max-w-full">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] sm:text-[11px] font-bold text-slate-200 truncate">
                            {banner.highlightLabel}
                          </span>
                          <span className="bg-[#DFC28A]/20 text-[#DFC28A] border border-[#DFC28A]/40 text-[7px] sm:text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tight shrink-0">
                            {banner.highlightBadge}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xs sm:text-base md:text-lg font-black text-[#DFC28A] font-mono drop-shadow">
                            {banner.highlightPrice}
                          </span>
                          <span className="text-[8px] sm:text-[10px] text-red-400 line-through font-mono">
                            {banner.highlightOriginal}
                          </span>
                        </div>
                      </div>

                      {/* CTA Action Pill Button */}
                      <div className="mt-2 sm:mt-2.5">
                        <Link
                          href={banner.ctaLink}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] hover:brightness-110 text-slate-950 font-black text-[9px] sm:text-[11px] shadow-md transition-all active:scale-95"
                        >
                          <span>{banner.ctaText}</span>
                          <span className="bg-[#E11D48] text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tight shadow-sm">
                            HARGA FINAL
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 6 Minimalist Pill Indicators (Persis Screenshot Lapakgaming) */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-3.5 mb-4 sm:mb-5">
            {HERO_BANNERS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 sm:w-10 bg-[#DFC28A] shadow-[0_0_12px_rgba(223,194,138,0.7)]' 
                    : 'w-4 sm:w-5 bg-slate-600/40 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Category Filter Tabs (Pill Buttons Persis Lapakgaming) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat.id
                    ? 'bg-[#DFC28A]/15 text-[#FFF5DE] border-[#DFC28A] shadow-[0_0_15px_rgba(223,194,138,0.2)]'
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:border-[#DFC28A]/40 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Section Heading "🔥 Lagi Populer" (Persis Screenshot Lapakgaming) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-5 mb-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🔥</span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Lagi Populer
            </h2>
          </div>
        </div>

        {/* Game Cards Grid (Clean & Modern dengan Red Discount Badges) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredGames.map((game, idx) => (
              <Link
                key={game.id}
                href={`/order/${game.slug}`}
                className="group relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.08] hover:border-[#DFC28A]/50 p-2.5 sm:p-3 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_12px_25px_-5px_rgba(223,194,138,0.2)]"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900 mb-2 shadow-sm">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Clean Red Discount Badge (Lapakgaming style) */}
                  {game.isPopular && (
                    <span className="absolute top-0 right-0 bg-[#E11D48] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-bl-xl rounded-tr-xl shadow-sm">
                      {idx % 3 === 0 ? '-10%' : idx % 3 === 1 ? '-15%' : '-20%'}
                    </span>
                  )}
                </div>

                {/* Game Metadata */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                    {game.publisher}
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#DFC28A] transition-colors truncate mt-0.5">
                    {game.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16 bg-white/[0.015] rounded-3xl border border-white/[0.06] mt-4">
              <p className="text-slate-400 text-sm">Tidak ada game yang cocok dengan kategori ini.</p>
            </div>
          )}
        </main>

        {/* Minimalist Esports Footer */}
        <footer className="border-t border-white/[0.06] bg-[#040609] py-10 px-6 mt-12 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 pb-6 border-b border-white/[0.06]">
              <Image
                src="/logo.png"
                alt="VexaStore"
                width={592}
                height={158}
                className="h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="flex items-center gap-5 text-slate-400 text-xs flex-wrap justify-center">
                <span>QRIS Official</span>
                <span>BCA Virtual Account</span>
                <span>Mandiri VA</span>
                <span>GoPay & OVO</span>
                <span>ShopeePay</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-slate-400">
              <p>© 2026 VexaStore Esports Protocol. All rights reserved.</p>
              <p className="font-mono text-[11px] text-slate-500">
                HIGH-THROUGHPUT API GATEWAY • 100% LEGAL CURRENCY
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
