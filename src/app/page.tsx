'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
    image: '/banners/banner_mlbb.jpg?v=2',
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
    image: '/banners/banner_valorant_gold.jpg?v=2',
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
    image: '/banners/banner_freefire.jpg?v=2',
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
    ctaLink: '/order/steam-wallet',
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

  const heroRef = useRef<HTMLElement>(null);
  const wheelAccumRef = useRef(0);
  const lastWheelEventTimeRef = useRef(0);
  const lastTriggerTimeRef = useRef(0);
  const gestureLockedRef = useRef(false);
  const lastDirectionRef = useRef(0);
  const prevAbsDxRef = useRef(0);
  const dragStartXRef = useRef<number | null>(null);
  const didDragSlideRef = useRef(false);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  }, []);

  // Auto-slide effect every 5 seconds unless hovered (resets timer on manual slide change)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // Touchpad two-finger horizontal scroll (and Shift + Wheel) support
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const dx = isHorizontalSwipe ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (dx === 0) return;

      // Prevent browser Back/Forward history swipe while scrolling hero horizontally
      e.preventDefault();

      const now = performance.now();
      const timeSinceLastEvent = now - lastWheelEventTimeRef.current;
      const absDx = Math.abs(dx);
      const dir = Math.sign(dx);

      // Unlock if gesture paused, reversed direction, or user started a fresh flick spike
      if (
        timeSinceLastEvent > 140 ||
        dir !== lastDirectionRef.current ||
        (now - lastTriggerTimeRef.current > 220 && absDx > prevAbsDxRef.current + 8)
      ) {
        if (timeSinceLastEvent > 140 || dir !== lastDirectionRef.current) {
          wheelAccumRef.current = 0;
        }
        gestureLockedRef.current = false;
      }

      lastWheelEventTimeRef.current = now;
      prevAbsDxRef.current = absDx;
      lastDirectionRef.current = dir;

      if (gestureLockedRef.current) return;

      wheelAccumRef.current += dx;

      if (Math.abs(wheelAccumRef.current) >= 30) {
        if (wheelAccumRef.current > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
        wheelAccumRef.current = 0;
        gestureLockedRef.current = true;
        lastTriggerTimeRef.current = now;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [handleNextSlide, handlePrevSlide]);

  // Keyboard ArrowLeft / ArrowRight navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevSlide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

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
    <Navbar>
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-8 pt-8 sm:pt-10 pb-16 flex flex-col gap-8 sm:gap-10 flex-1">
        
        {/* =========================================================================
            HERO COVERFLOW CAROUSEL (Lapakgaming Modern Style)
            - Jarak lega dengan header (pt-8 sm:pt-10) dan konten di bawahnya (gap-8 sm:gap-10)
            - Indikator slider berada tepat di bawah gambar banner agar tidak menghalangi artwork
            - Wrapper max-w-6xl mx-auto px-6 dengan overflow-hidden
            - Slide kiri & kanan: scale-90, opacity-50, brightness-75
            - Slide tengah (aktif): scale-100, opacity-100, border amber-400 tipis
        ========================================================================= */}
        <section 
          ref={heroRef}
          tabIndex={0}
          aria-label="Hero Promo Carousel"
          className="relative w-full overflow-hidden select-none overscroll-x-contain outline-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            dragStartXRef.current = null;
          }}
        >
          {/* Coverflow Stage */}
          <div
            className="relative w-full h-[210px] sm:h-[245px] md:h-[270px] flex items-center justify-center overflow-hidden rounded-2xl touch-pan-y cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => {
              dragStartXRef.current = e.touches[0].clientX;
              didDragSlideRef.current = false;
            }}
            onTouchEnd={(e) => {
              if (dragStartXRef.current === null) return;
              const diffX = dragStartXRef.current - e.changedTouches[0].clientX;
              if (Math.abs(diffX) > 40) {
                didDragSlideRef.current = true;
                if (diffX > 0) handleNextSlide();
                else handlePrevSlide();
              }
              dragStartXRef.current = null;
            }}
            onMouseDown={(e) => {
              dragStartXRef.current = e.clientX;
              didDragSlideRef.current = false;
            }}
            onMouseUp={(e) => {
              if (dragStartXRef.current === null) return;
              const diffX = dragStartXRef.current - e.clientX;
              if (Math.abs(diffX) > 45) {
                didDragSlideRef.current = true;
                if (diffX > 0) handleNextSlide();
                else handlePrevSlide();
              }
              dragStartXRef.current = null;
            }}
          >
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
                    if (didDragSlideRef.current) return;
                    if (isPrev) handlePrevSlide();
                    if (isNext) handleNextSlide();
                  }}
                  className={`absolute top-0 bottom-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-[80%] sm:w-[70%] md:w-[620px] lg:w-[660px] ${
                    isCenter
                      ? 'left-1/2 -translate-x-1/2 z-20 scale-100 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(251,191,36,0.18)]'
                      : isPrev
                      ? 'left-1/2 -translate-x-[calc(50%+28%)] sm:-translate-x-[calc(50%+190px)] md:-translate-x-[calc(50%+220px)] lg:-translate-x-[calc(50%+240px)] z-10 scale-90 opacity-50 brightness-75 hover:opacity-75 cursor-pointer'
                      : 'left-1/2 translate-x-[calc(-50%+28%)] sm:translate-x-[calc(-50%+190px)] md:translate-x-[calc(-50%+220px)] lg:translate-x-[calc(-50%+240px)] z-10 scale-90 opacity-50 brightness-75 hover:opacity-75 cursor-pointer'
                  }`}
                >
                  <div className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 isolate ${
                    isCenter 
                      ? 'border border-amber-400 ring-1 ring-amber-400/20 bg-[#0c0d12]' 
                      : 'border border-zinc-700/80 bg-[#090a0f]'
                  }`}>
                    {/* Background Banner Artwork */}
                    <img
                      src={banner.image}
                      alt={banner.headline}
                      draggable={false}
                      className="w-full h-full object-cover object-center rounded-2xl"
                    />

                    {/* Gradient Overlay for Text Legibility on Left */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-transparent pointer-events-none rounded-2xl" />

                    {/* POJOK ATAS KIRI: Logo Crest Saja (Icon Crest Saja, Tulisannya Gausah) */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-30 bg-black/60 border border-white/15 backdrop-blur-md px-2 py-1 rounded-xl shadow-md flex items-center justify-center">
                      <Image
                        src="/logo-crest.png"
                        alt="VexaStore"
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      />
                    </div>

                    {/* POJOK ATAS KANAN: Publisher / Partner Badge */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3.5 z-30 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFC28A] animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-slate-200 uppercase font-mono">
                        {banner.publisher}
                      </span>
                    </div>

                    {/* Left Overlay Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center pl-3.5 sm:pl-6 md:pl-7 pr-3 max-w-[66%] sm:max-w-[58%]">
                      {/* Tagline / Event Prefix */}
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#DFC28A] tracking-wider uppercase mb-0.5">
                        // {banner.headlinePrefix}
                      </span>

                      {/* Headline Title */}
                      <h3 className="text-xs sm:text-base md:text-lg font-black text-white leading-tight drop-shadow tracking-tight">
                        {banner.headline}
                      </h3>

                      {/* Framed Price Card */}
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

            {/* Prev & Next Floating Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-[#DFC28A] text-white hover:text-black border border-white/20 transition flex items-center justify-center backdrop-blur-md shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-[#DFC28A] text-white hover:text-black border border-white/20 transition flex items-center justify-center backdrop-blur-md shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Minimalist Pill Indicators (Clean Matte Style Di Bawah Gambar Banner) */}
          <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
            {HERO_BANNERS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-6 sm:w-7 bg-[#DFC28A]/85' 
                    : 'w-2 sm:w-2.5 bg-zinc-800 hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            CATEGORY FILTER TABS (Sejajar Rapi dengan Banner & Grid)
        ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat.id
                  ? 'bg-[#DFC28A]/15 text-[#FFF5DE] border-[#DFC28A] shadow-[0_0_15px_rgba(223,194,138,0.2)]'
                  : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-[#DFC28A]/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* =========================================================================
            CATALOG SECTION: HEADING + GAME CARDS GRID
        ========================================================================= */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🔥</span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Lagi Populer
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredGames.map((game, idx) => (
              <Link
                key={game.id}
                href={`/order/${game.slug}`}
                className="group relative rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-[#DFC28A]/50 p-2.5 sm:p-3 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_12px_25px_-5px_rgba(223,194,138,0.2)]"
              >
                {/* Game Artwork Container (1:1 Square - Zero Cropping) */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 mb-2.5 shadow-sm ring-1 ring-white/[0.06]">
                  <img
                    src={game.image}
                    alt={game.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:brightness-110 transition-all duration-300"
                  />
                  {/* Clean Red Discount Badge */}
                  {game.isPopular && (
                    <span className="absolute top-0 right-0 bg-[#E11D48] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-bl-xl rounded-tr-xl shadow-sm">
                      {idx % 3 === 0 ? '-10%' : idx % 3 === 1 ? '-15%' : '-20%'}
                    </span>
                  )}
                </div>

                {/* Game Metadata */}
                <div className="flex-1 flex flex-col justify-start">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider truncate">
                    {game.publisher}
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#DFC28A] transition-colors line-clamp-2 leading-snug mt-0.5">
                    {game.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16 bg-zinc-900/30 rounded-3xl border border-zinc-800/80 mt-4">
              <p className="text-zinc-400 text-sm">Tidak ada game yang cocok dengan kategori ini.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#07080c] py-10 px-6 sm:px-8 text-xs text-zinc-500 mt-auto">
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 pb-6 border-b border-zinc-800/60">
            <Image
              src="/logo.png"
              alt="VexaStore"
              width={592}
              height={158}
              className="h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="flex items-center gap-5 text-zinc-400 text-xs flex-wrap justify-center">
              <span>QRIS Official</span>
              <span>BCA Virtual Account</span>
              <span>Mandiri VA</span>
              <span>GoPay & OVO</span>
              <span>ShopeePay</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-zinc-400">
            <p>© 2026 VexaStore Esports Protocol. All rights reserved.</p>
            <p className="font-mono text-[11px] text-zinc-500">
              HIGH-THROUGHPUT API GATEWAY • 100% LEGAL CURRENCY
            </p>
          </div>
        </div>
      </footer>
    </Navbar>
  );
}
