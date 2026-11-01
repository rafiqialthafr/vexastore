'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ALL_GAMES, Denomination } from '@/data/games';
import { PAYMENT_CATEGORIES, PAYMENT_CHANNELS, PaymentChannel } from '@/data/paymentMethods';
import { getNominalIcon } from '@/lib/getNominalIcon';
import { ArrowLeft, CheckCircle2, ShieldCheck, ChevronDown, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function OrderPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const game = ALL_GAMES.find((g) => g.slug === resolvedParams.slug);

  if (!game) {
    notFound();
  }

  // State Form
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedNominal, setSelectedNominal] = useState<Denomination | null>(game.denominations[0] || null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentChannel | null>(PAYMENT_CHANNELS[0]);
  const [whatsapp, setWhatsapp] = useState('');
  const [quantity, setQuantity] = useState<number>(1);

  // Kategori Pembayaran Collapsible (Matching reference UI)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    qris: false,
    va: false,
    retail: false,
  });

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const qrisFeatured = PAYMENT_CHANNELS.find((p) => p.id === 'qris') || PAYMENT_CHANNELS[0];
  const subtotal = (selectedNominal?.price || 0) * quantity;
  const paymentFee = selectedPayment?.fee || 0;
  const totalPrice = subtotal + paymentFee;

  const handleCheckout = () => {
    if (!userId.trim()) {
      alert('Mohon masukkan User ID Game Anda terlebih dahulu.');
      return;
    }
    if (game.idRequirements.needsZoneId && !zoneId.trim()) {
      alert(`Mohon masukkan ${game.idRequirements.zoneLabel || 'Server / Zone ID'} Anda.`);
      return;
    }
    if (!selectedNominal) {
      alert('Mohon pilih nominal terlebih dahulu.');
      return;
    }
    if (!selectedPayment) {
      alert('Mohon pilih metode pembayaran terlebih dahulu.');
      return;
    }
    if (!whatsapp.trim()) {
      alert('Mohon masukkan nomor WhatsApp untuk bukti transaksi.');
      return;
    }

    alert(
      `Pesanan Berhasil Disiapkan!\n\n` +
      `Game: ${game.name}\n` +
      `Item: ${selectedNominal.name} (x${quantity})\n` +
      `Tujuan ID: ${userId}${zoneId ? ` (${zoneId})` : ''}\n` +
      `Metode: ${selectedPayment.name}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Total Pembayaran: Rp ${totalPrice.toLocaleString('id-ID')}`
    );
  };

  return (
    <Navbar>
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-8 pt-10 sm:pt-12 md:pt-14 pb-16 flex flex-col gap-6 sm:gap-7 flex-1">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition group w-fit"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition duration-200 text-[#DFC28A]" /> 
          KEMBALI KE KATALOG VAULT
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Kolom Kiri: Info Game & Detail Pembayaran (Sesuai Referensi UI) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* 1. Info Game / Aplikasi */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="flex gap-4 items-center">
                <img src={game.image} alt={game.name} className="w-20 h-20 sm:w-24 sm:h-24 aspect-square object-contain bg-zinc-950 rounded-2xl border border-white/[0.1] shadow-md shrink-0" />
                <div>
                  <p className="text-[11px] font-mono font-bold text-[#DFC28A] uppercase tracking-wider">{game.publisher}</p>
                  <h1 className="text-xl font-black text-white mt-1 leading-snug">{game.name}</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Top-up {game.currencyName} Resmi</p>
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-white/[0.07] space-y-3.5 text-xs text-slate-400">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 size={16} className="text-[#DFC28A] shrink-0" /> Pengiriman Otomatis &amp; Instan 24/7
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" /> Layanan Resmi, Legal &amp; Terverifikasi
                </div>
              </div>
            </div>

            {/* 2. Detail Pembayaran Card (Ditaruh tepat di bawah kolom nama aplikasi) */}
            <div className="bg-[#24272c] border border-zinc-700/60 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4">
              {/* Header: Game Icon, Name, and Selected Nominal */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-zinc-700/60">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-12 h-12 rounded-xl object-contain bg-zinc-950 border border-white/10 shrink-0 shadow"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
                  <p className="text-xs text-zinc-300 font-medium truncate mt-0.5">
                    {selectedNominal ? selectedNominal.name : 'Pilih Nominal'}
                  </p>
                </div>
              </div>

              {/* Rows: Metode, Harga, Jumlah, Biaya */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-zinc-400 shrink-0">Metode Pembayaran</span>
                  <span className="text-zinc-100 font-semibold text-right text-[11px] sm:text-xs">
                    {selectedPayment ? selectedPayment.name : 'QRIS (All Payment)'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">Harga</span>
                  <span className="text-zinc-100 font-bold font-mono">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">Jumlah Pembelian</span>
                  <span className="text-zinc-100 font-semibold font-mono">
                    {quantity}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">Biaya</span>
                  <span className="text-zinc-100 font-semibold font-mono">
                    Rp {paymentFee.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Divider & Total */}
              <div className="pt-3.5 border-t border-zinc-700/70 flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-white">Total Pembayaran</span>
                <span className="text-base sm:text-lg font-black font-mono text-[#DFC28A]">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Tombol Pesan Sekarang! */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full mt-2 py-3.5 rounded-xl bg-[#9a7e58] hover:bg-[#a88a62] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
              >
                <ShoppingBag size={18} />
                <span>Pesan Sekarang!</span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan: 4 Tahapan Form Pemesanan dengan Spacing Lega */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Data Akun */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">1</div>
                <h2 className="text-base font-bold text-white">Masukkan Data Akun</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">User ID Game</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={game.idRequirements.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-[#DFC28A] transition"
                  />
                </div>

                {game.idRequirements.needsZoneId && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">{game.idRequirements.zoneLabel || 'Server ID'}</label>
                    <input
                      type="text"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      placeholder={game.idRequirements.zonePlaceholder || 'Zone ID'}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-[#DFC28A] transition"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Pilih Nominal */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">2</div>
                <div>
                  <h2 className="text-base font-bold text-white">Pilih Nominal {game.currencyName}</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Pilih paket denominasi resmi dengan jaminan pengiriman instan</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {game.denominations.map((denom) => {
                  const isSelected = selectedNominal?.id === denom.id;
                  const iconSrc = getNominalIcon(game.slug, denom.name, denom.icon_url || game.currency_icon_url);
                  return (
                    <button
                      key={denom.id}
                      type="button"
                      onClick={() => setSelectedNominal(denom)}
                      className={`relative min-h-[95px] p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#DFC28A]/10 border-[#DFC28A] shadow-[0_0_20px_rgba(223,194,138,0.25)]'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                      }`}
                    >
                      {/* Badge Promo / Diskon */}
                      {denom.bonus && (
                        <span className="absolute top-2.5 right-2.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#DFC28A]/15 border border-[#DFC28A]/30 text-[#DFC28A] pointer-events-none">
                          {denom.bonus}
                        </span>
                      )}

                      {/* Nama Item (Tidak Terpotong) */}
                      <div className={`w-full ${denom.bonus ? 'pr-16 sm:pr-20' : ''}`}>
                        <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {denom.name}
                        </p>
                      </div>

                      {/* Tampilan Footer Card (Baris Harga) */}
                      <div className="flex items-center gap-2 mt-3">
                        {iconSrc && (
                          <Image
                            src={iconSrc}
                            alt="Currency"
                            width={24}
                            height={24}
                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                          />
                        )}
                        <p className="text-xs sm:text-sm font-mono font-bold text-[#DFC28A]">
                          Rp {denom.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Jumlah Pembelian (Kuantitas dengan tombol - dan + sesuai referensi) */}
              <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Jumlah Pembelian</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Tentukan kuantitas item yang ingin dipesan</p>
                </div>
                <div className="flex items-center gap-2 bg-[#1e232d] border border-zinc-700/70 p-1.5 rounded-2xl w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-xl bg-[#2a303c] hover:bg-[#343b4a] text-white font-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95 cursor-pointer"
                    aria-label="Kurang kuantitas"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1) setQuantity(val);
                    }}
                    className="w-12 text-center text-base font-black font-mono text-white bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-9 h-9 rounded-xl bg-[#2a303c] hover:bg-[#343b4a] text-white font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label="Tambah kuantitas"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Pilih Pembayaran */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">3</div>
                <div>
                  <h2 className="text-base font-bold text-white">Pilih Metode Pembayaran</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Semua channel pembayaran terverifikasi otomatis &amp; instan</p>
                </div>
              </div>

              {/* Top Featured QRIS Card matching Reference UI */}
              {qrisFeatured && (
                <button
                  type="button"
                  onClick={() => setSelectedPayment(qrisFeatured)}
                  className={`w-full relative p-4 sm:p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                    selectedPayment?.id === 'qris' || selectedPayment?.id === qrisFeatured?.id
                      ? 'bg-[#353c48] border-[#DFC28A] shadow-[0_0_24px_rgba(223,194,138,0.25)] ring-1 ring-[#DFC28A]'
                      : 'bg-[#313742] border-[#444c5b] hover:bg-[#38404d] hover:border-zinc-500'
                  }`}
                >
                  {/* 3D Corner Wrap BEST PRICE Ribbon (Matches Reference UI) */}
                  <div className="absolute -top-2.5 -right-2.5 w-28 h-28 pointer-events-none select-none z-10">
                    <svg viewBox="0 0 110 110" className="w-full h-full overflow-visible">
                      <defs>
                        <filter id="ribbon-3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="-2" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.45" />
                        </filter>
                      </defs>

                      {/* Top fold ear (wrapped behind card top edge) */}
                      <path d="M 22 10 L 12 0 Q 9 2 9 10 L 22 10 Z" fill="#6f5a42" />

                      {/* Right fold ear (wrapped behind card right edge) */}
                      <path d="M 100 88 L 110 98 Q 108 101 100 101 L 100 88 Z" fill="#6f5a42" />

                      {/* Main 3D Ribbon Body */}
                      <path 
                        d="M 12 0 L 52 0 L 110 58 L 110 98 Z" 
                        fill="#A58C6F" 
                        filter="url(#ribbon-3d-shadow)"
                      />

                      {/* Specular highlight on top ribbon edge */}
                      <line x1="12" y1="0" x2="110" y2="98" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                      {/* BEST PRICE Text centered and rotated 45deg */}
                      <g transform="translate(71, 39) rotate(45)">
                        <text 
                          x="0" 
                          y="0" 
                          textAnchor="middle" 
                          dominantBaseline="central" 
                          fill="#FFFFFF" 
                          fontSize="10" 
                          fontWeight="900" 
                          letterSpacing="1px"
                          style={{
                            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            textShadow: "0 1px 2px rgba(0,0,0,0.35)"
                          }}
                        >
                          BEST PRICE
                        </text>
                      </g>
                    </svg>
                  </div>

                  <div className="flex flex-col justify-between gap-3 sm:gap-4">
                    {/* Top Row: Title */}
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 tracking-wide uppercase pr-16">
                      QRIS ALL PAYMENT
                    </span>

                    {/* Bottom Row: Banner on left, Price on right */}
                    <div className="flex items-end justify-between gap-3">
                      <img 
                        src="/payments/qris-banner.png" 
                        alt="QRIS Satu QR Code untuk semua Payment"
                        className="h-7 sm:h-8 w-auto max-w-[200px] sm:max-w-[240px] object-contain rounded-sm"
                      />

                      <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-100 font-mono tracking-tight shrink-0">
                        {selectedNominal
                          ? `Rp ${((selectedNominal.price * quantity) + qrisFeatured.fee).toLocaleString('id-ID')}`
                          : 'Min. 1.000,00'}
                      </span>
                    </div>
                  </div>
                </button>
              )}

              {/* Grouped Accordions matching Reference UI */}
              <div className="space-y-3 sm:space-y-3.5">
                {PAYMENT_CATEGORIES.map((group) => {
                  const isOpen = !!openCategories[group.id];
                  return (
                    <div
                      key={group.id}
                      className="border border-[#444c5b] rounded-xl sm:rounded-2xl overflow-hidden bg-[#262c37] shadow-sm transition"
                    >
                      {/* Top Header of Category Accordion */}
                      <button
                        type="button"
                        onClick={() => toggleCategory(group.id)}
                        className="w-full flex items-center justify-between px-4 py-3 sm:py-3.5 bg-[#2c333f] hover:bg-[#343b48] transition text-left cursor-pointer"
                      >
                        <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                          {group.name}
                        </span>
                        <ChevronDown
                          size={19}
                          className={`text-zinc-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#DFC28A]' : ''
                          }`}
                        />
                      </button>

                      {/* Preview Bar with Mini Logos Strip (Always visible like in reference UI) */}
                      <div className="bg-[#444c5b] px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-end overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 border-t border-[#4f5869]">
                        <div className="flex items-center justify-end gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                          {group.previewLogos.map((logo) => (
                            <img
                              key={logo.name}
                              src={logo.url}
                              alt={logo.name}
                              title={logo.name}
                              className="h-3.5 sm:h-4 max-h-[17px] w-auto object-contain shrink-0 rounded-[3px] shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Expanded Content: Cards for this Category */}
                      {isOpen && (
                        <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-zinc-800/80 bg-[#161a22]">
                          {group.channels.map((channel) => {
                            const isSelected = selectedPayment?.id === channel.id;
                            const itemPrice = selectedNominal ? (selectedNominal.price * quantity) + channel.fee : 0;
                            return (
                              <button
                                key={channel.id}
                                type="button"
                                onClick={() => setSelectedPayment(channel)}
                                className={`relative p-3.5 sm:p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between min-h-[88px] sm:min-h-[94px] overflow-hidden ${
                                  isSelected
                                    ? 'bg-[#DFC28A]/10 border-[#DFC28A] shadow-[0_0_20px_rgba(223,194,138,0.22)] ring-1 ring-[#DFC28A]/50'
                                    : 'bg-[#1e232d]/90 border-zinc-700/60 hover:bg-[#262c39] hover:border-zinc-500'
                                }`}
                              >
                                {channel.badge && (
                                  <span 
                                    className="absolute top-2 right-2 text-[8px] sm:text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider text-white bg-gradient-to-b from-[#F7E19C] via-[#CA9E3C] to-[#7B5313] border-t border-amber-200/90 border-b border-amber-950/80 shadow-[0_3px_8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.5)] pointer-events-none"
                                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
                                  >
                                    {channel.badge}
                                  </span>
                                )}

                                <div className="flex items-center min-h-[32px] pt-0.5">
                                  <img
                                    src={channel.logoUrl}
                                    alt={channel.name}
                                    className="h-6 sm:h-7 max-h-[30px] w-auto max-w-[130px] object-contain rounded shadow-sm"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>

                                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                                  <span className="text-[10px] text-zinc-500 font-mono">
                                    Fee: Rp {channel.fee.toLocaleString('id-ID')}
                                  </span>
                                  <p className="text-xs sm:text-sm font-mono font-bold text-[#DFC28A]">
                                    Rp {itemPrice.toLocaleString('id-ID')}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Nomor WhatsApp */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">4</div>
                <div>
                  <h2 className="text-base font-bold text-white">Nomor WhatsApp</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Bukti dan status pesanan akan dikirimkan otomatis ke nomor ini</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">No. WhatsApp</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-[#DFC28A] transition"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Navbar>
  );
}
