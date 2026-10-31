'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { PROMOS_DATA, PROMO_CATEGORIES, PromoItem } from '@/data/promos';
import { 
  Tag, 
  Copy, 
  Check, 
  Clock, 
  Flame, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Gift, 
  X,
  Search
} from 'lucide-react';

export default function PromoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Promo');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedPromoDetail, setSelectedPromoDetail] = useState<PromoItem | null>(null);

  // Countdown timer for Flash Sale (simulated live clock)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  // Filtered promos
  const filteredPromos = useMemo(() => {
    return PROMOS_DATA.filter((promo) => {
      const matchCategory =
        selectedCategory === 'Semua Promo' || promo.category === selectedCategory;
      const matchSearch =
        searchKeyword.trim() === '' ||
        promo.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        promo.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        promo.targetGameNames.some(g => g.toLowerCase().includes(searchKeyword.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchKeyword]);

  const flashSalePromo = useMemo(() => {
    return PROMOS_DATA.find(p => p.isFlashSale) || PROMOS_DATA[1];
  }, []);

  return (
    <Navbar>
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-8 pt-10 sm:pt-14 pb-24 flex flex-col gap-10 flex-1">
        
        {/* =========================================================================
            1. CORPORATE PROMO HERO HEADER
        ========================================================================= */}
        <section className="flex flex-col gap-4 border-b border-zinc-800/80 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC28A]/10 border border-[#DFC28A]/30 text-[#DFC28A] text-xs font-mono font-bold tracking-wider uppercase">
              <Flame size={14} className="text-[#DFC28A] animate-pulse" />
              PUSAT PROMO & VOUCHER KILAT
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" /> Kupon Resmi Terverifikasi Sistem
              </span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="hidden sm:inline text-zinc-400">
                Update Otomatis 24/7
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Klaim Kupon Diskon & Cashback Diamond.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Nikmati potongan harga langsung, cashback saldo, serta promo bundling game tanpa ribet. Salin kodenya dan gunakan saat checkout.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
                <span className="text-lg font-black text-[#FFF5DE] block font-mono">{PROMOS_DATA.length}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Promo Aktif</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
                <span className="text-lg font-black text-emerald-400 block font-mono">100%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Garansi Valid</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
                <span className="text-lg font-black text-[#DFC28A] block font-mono">s/d 30%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Hemat Top-Up</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. FLASH SALE RUSH SPOTLIGHT BANNER
        ========================================================================= */}
        {flashSalePromo && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#DFC28A]/15 to-zinc-950 border border-[#DFC28A]/40 p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFC28A]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                    <Flame size={13} className="text-rose-400" /> FLASH DEAL TERBATAS
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">• {flashSalePromo.minSpendText}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {flashSalePromo.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {flashSalePromo.description}
                </p>

                {/* Quota Progress */}
                <div className="space-y-1.5 pt-1 max-w-md">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#DFC28A] font-bold">Tersisa {flashSalePromo.quotaRemaining} Kupon</span>
                    <span className="text-zinc-400">{flashSalePromo.quotaPercent}% Terpakai</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#DFC28A] to-amber-500 rounded-full"
                      style={{ width: `${flashSalePromo.quotaPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Countdown Ticker & Action */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-4 w-full lg:w-auto shrink-0">
                {/* Live Countdown Clock */}
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 self-start lg:self-end">
                  <Clock size={16} className="text-[#DFC28A] animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mr-1">Berakhir:</span>
                  <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
                    <span className="px-2 py-0.5 bg-zinc-800 rounded-md text-[#DFC28A]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span>:</span>
                    <span className="px-2 py-0.5 bg-zinc-800 rounded-md text-[#DFC28A]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span>:</span>
                    <span className="px-2 py-0.5 bg-zinc-800 rounded-md text-[#DFC28A]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleCopyCode(flashSalePromo.code)}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-zinc-900 border border-[#DFC28A]/50 hover:bg-[#DFC28A]/20 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
                  >
                    {copiedCode === flashSalePromo.code ? (
                      <>
                        <Check size={16} className="text-emerald-400" />
                        <span className="text-emerald-400">KODE TERSALIN</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="text-[#DFC28A]" />
                        <span>KODE: {flashSalePromo.code}</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/order/${flashSalePromo.primaryGameSlug || 'mobile-legends'}`}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFC28A] to-[#B39352] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#DFC28A]/20 hover:scale-[1.02] active:scale-[0.98] transition whitespace-nowrap"
                  >
                    <span>Pakai Sekarang</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            3. FILTER TABS & SEARCH BAR
        ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start">
            {PROMO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-[#DFC28A]/15 text-[#FFF5DE] border-[#DFC28A] shadow-[0_0_15px_rgba(223,194,138,0.2)]'
                    : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-[#DFC28A]/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari kupon / nama game..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#DFC28A] transition"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            4. VOUCHER CARDS GRID (TICKET DESIGN)
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPromos.map((promo) => (
            <div
              key={promo.id}
              className="group relative rounded-3xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-[#DFC28A]/50 p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_20px_40px_-15px_rgba(223,194,138,0.15)]"
            >
              {/* Top Row: Category Tag & Value */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DFC28A]/10 border border-[#DFC28A]/30 text-[#DFC28A] text-[10px] font-mono font-bold uppercase tracking-wider">
                      {promo.category}
                    </span>
                    {promo.isHot && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-bold flex items-center gap-1">
                        <Flame size={10} className="text-rose-400" /> HOT
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Clock size={12} /> s/d {promo.validUntil}
                  </span>
                </div>

                {/* Promo Value Display */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FFF5DE] tracking-tight">
                    {promo.discountValue}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ({promo.minSpendText})
                  </span>
                </div>

                {/* Headline & Description */}
                <h3 className="text-base font-bold text-white mt-2 leading-snug">
                  {promo.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {promo.description}
                </p>

                {/* Target Game Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {promo.targetGameNames.map((gn) => (
                    <span
                      key={gn}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-zinc-300"
                    >
                      {gn}
                    </span>
                  ))}
                </div>
              </div>

              {/* Perforated Ticket Divider */}
              <div className="relative my-5">
                <div className="border-t border-dashed border-zinc-800 group-hover:border-zinc-700 transition" />
              </div>

              {/* Bottom Row: Voucher Code & Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Code copy badge */}
                <div className="flex items-center justify-between sm:justify-start gap-2 bg-black/60 border border-zinc-800 rounded-xl px-3 py-2">
                  <span className="font-mono text-xs font-black text-[#DFC28A] tracking-wider">
                    {promo.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    title="Salin Kode Voucher"
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition"
                  >
                    {copiedCode === promo.code ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPromoDetail(promo)}
                    className="text-xs text-zinc-400 hover:text-white underline font-mono px-2 py-1"
                  >
                    S&K
                  </button>

                  <Link
                    href={`/order/${promo.primaryGameSlug || 'mobile-legends'}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#DFC28A] hover:bg-[#EBD5A7] text-black font-bold text-xs transition"
                  >
                    <span>Gunakan</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPromos.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/30 rounded-3xl border border-zinc-800/80">
            <Tag size={36} className="mx-auto text-zinc-600 mb-3" />
            <h3 className="text-base font-bold text-white">Tidak ada promo yang cocok</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Coba kata kunci pencarian lain atau pilih kategori voucher yang berbeda.
            </p>
            <button
              onClick={() => { setSelectedCategory('Semua Promo'); setSearchKeyword(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-[#DFC28A] transition"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* =========================================================================
            5. HOW TO REDEEM TUTORIAL CARDS
        ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Cara Menggunakan Kupon Promo di VexaStore
              </h3>
              <p className="text-xs text-zinc-400">
                Langkah mudah klaim diskon instan sebelum menyelesaikan pembayaran
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#DFC28A]/20 text-[#DFC28A] font-mono text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white">Salin Kode Kupon</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pilih kupon promo di atas yang sesuai dengan game yang ingin kamu beli, lalu klik tombol <b>Salin Kode</b>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#DFC28A]/20 text-[#DFC28A] font-mono text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white">Isi Data & Nominal</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Masuk ke halaman game, masukkan User ID akunmu, dan pilih nominal diamond atau currency yang diinginkan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#DFC28A]/20 text-[#DFC28A] font-mono text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white">Tempel Saat Checkout</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Masukkan kode di kolom voucher pembayaran. Total tagihan akan langsung otomatis terpotong secara instan.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================================
          TERMS & CONDITIONS MODAL
      ========================================================================= */}
      {selectedPromoDetail && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0B0F17] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedPromoDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center text-[#DFC28A]">
                <Tag size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#DFC28A] font-bold uppercase tracking-wider">
                  SYARAT & KETENTUAN VOUCHER
                </span>
                <h3 className="text-base font-bold text-white">
                  {selectedPromoDetail.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-400">Kode Kupon:</span>
                <span className="font-mono font-black text-sm text-[#DFC28A]">{selectedPromoDetail.code}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-400">Masa Berlaku:</span>
                <span className="font-mono text-xs text-white">Hingga {selectedPromoDetail.validUntil}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-400">Sisa Kuota:</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">{selectedPromoDetail.quotaRemaining} kupon tersedia</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Ketentuan Penggunaan:
              </h4>
              <ul className="space-y-2">
                {selectedPromoDetail.terms.map((t, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#DFC28A] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  handleCopyCode(selectedPromoDetail.code);
                  setSelectedPromoDetail(null);
                }}
                className="flex-1 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono font-bold text-zinc-200 transition"
              >
                Salin & Tutup
              </button>

              <Link
                href={`/order/${selectedPromoDetail.primaryGameSlug || 'mobile-legends'}`}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#DFC28A] to-[#B39352] text-black font-bold text-xs text-center shadow-lg shadow-[#DFC28A]/20 transition"
              >
                Beli Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}

    </Navbar>
  );
}
