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
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

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
      <main className="max-w-6xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-10 pb-52 lg:pb-16 flex flex-col gap-3.5 sm:gap-6 flex-1">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition group w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition duration-200 text-[#DFC28A]" /> 
          KEMBALI KE KATALOG VAULT
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* Kolom Kiri: Info Game & Detail Pembayaran (Sesuai Referensi UI) */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5 lg:sticky lg:top-24">
            {/* 1. Info Game / Aplikasi */}
            <div className="bg-[#1f242d] border border-[#444c5b] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-sm">
              <div className="flex gap-3 sm:gap-4 items-center">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-14 h-14 sm:w-20 sm:h-20 aspect-square object-contain bg-zinc-950 rounded-xl border border-white/10 shadow-sm shrink-0" 
                />
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-mono font-bold text-[#DFC28A] uppercase tracking-wider truncate">{game.publisher}</p>
                  <h1 className="text-base sm:text-xl font-black text-white mt-0.5 leading-snug truncate">{game.name}</h1>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Top-up {game.currencyName} Resmi</p>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-white/[0.07] space-y-2 text-[11px] sm:text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={14} className="text-[#DFC28A] shrink-0" /> Pengiriman Otomatis &amp; Instan 24/7
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" /> Layanan Resmi, Legal &amp; Terverifikasi
                </div>
              </div>
            </div>

            {/* 2. Detail Pembayaran Card (Khusus Desktop: Ditaruh tepat di bawah kolom nama aplikasi) */}
            <div className="hidden lg:block bg-[#1f242d] border border-[#444c5b] rounded-2xl p-5 shadow-sm space-y-4">
              {/* Header: Game Icon, Name, and Selected Nominal */}
              <div className="flex items-center gap-3 pb-3.5 border-b border-zinc-700/60">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-11 h-11 rounded-xl object-contain bg-zinc-950 border border-white/10 shrink-0 shadow"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
                  <p className="text-xs text-zinc-300 font-medium truncate mt-0.5">
                    {selectedNominal ? selectedNominal.name : 'Pilih Nominal'}
                  </p>
                </div>
              </div>

              {/* Rows: Metode, Harga, Jumlah, Biaya */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-zinc-400 shrink-0">Metode Pembayaran</span>
                  <span className="text-zinc-100 font-semibold text-right text-[11px] sm:text-xs truncate max-w-[60%]">
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
              <div className="pt-3 border-t border-zinc-700/70 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white">Total Pembayaran</span>
                <span className="text-base font-black font-mono text-[#DFC28A]">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Tombol Pesan Sekarang! */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full mt-2 py-3 rounded-xl bg-[#9a7e58] hover:bg-[#a88a62] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <ShoppingBag size={17} />
                <span>Pesan Sekarang!</span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan: 5 Tahapan Form Pemesanan */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-5">
            {/* Step 1: Data Akun */}
            <div className="border border-[#444c5b] rounded-xl sm:rounded-2xl overflow-hidden bg-[#262c37] shadow-sm">
              <div className="flex items-stretch h-9 sm:h-10 bg-[#2c333f] border-b border-[#3b4352]">
                <div className="w-9 sm:w-11 bg-[#9a7e58] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="flex-1 px-3 sm:px-4 flex items-center">
                  <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Masukkan Data Akun
                  </h2>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-[#212630]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-zinc-400 mb-1.5">User ID Game</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder={game.idRequirements.placeholder}
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#363e4c] border border-white/5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#9a7e58] focus:ring-1 focus:ring-[#9a7e58] transition"
                    />
                  </div>

                  {game.idRequirements.needsZoneId && (
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-zinc-400 mb-1.5">{game.idRequirements.zoneLabel || 'Server ID'}</label>
                      <input
                        type="text"
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                        placeholder={game.idRequirements.zonePlaceholder || 'Zone ID'}
                        className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#363e4c] border border-white/5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#9a7e58] focus:ring-1 focus:ring-[#9a7e58] transition"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Pilih Nominal */}
            <div className="border border-[#444c5b] rounded-xl sm:rounded-2xl overflow-hidden bg-[#262c37] shadow-sm">
              <div className="flex items-stretch h-9 sm:h-10 bg-[#2c333f] border-b border-[#3b4352]">
                <div className="w-9 sm:w-11 bg-[#9a7e58] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1 px-3 sm:px-4 flex items-center">
                  <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Pilih Nominal {game.currencyName}
                  </h2>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-[#212630]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {game.denominations.map((denom) => {
                    const isSelected = selectedNominal?.id === denom.id;
                    const iconSrc = getNominalIcon(game.slug, denom.name, denom.icon_url || game.currency_icon_url);
                    return (
                      <button
                        key={denom.id}
                        type="button"
                        onClick={() => setSelectedNominal(denom)}
                        className={`relative min-h-[76px] sm:min-h-[86px] p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-left border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#9a7e58]/15 border-[#9a7e58] shadow-[0_0_15px_rgba(154,126,88,0.25)] ring-1 ring-[#9a7e58]'
                            : 'bg-[#2b313c] border-zinc-700/60 hover:bg-[#343b48] hover:border-zinc-500'
                        }`}
                      >
                        {/* Badge Promo / Diskon */}
                        {denom.bonus && (
                          <span className="absolute top-1.5 right-1.5 text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#9a7e58]/20 border border-[#9a7e58]/40 text-[#DFC28A] pointer-events-none">
                            {denom.bonus}
                          </span>
                        )}

                        {/* Nama Item (Tidak Terpotong) */}
                        <div className={`w-full ${denom.bonus ? 'pr-12' : ''}`}>
                          <p className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                            {denom.name}
                          </p>
                        </div>

                        {/* Tampilan Footer Card (Baris Harga) */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
                          {iconSrc && (
                            <Image
                              src={iconSrc}
                              alt="Currency"
                              width={20}
                              height={20}
                              className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0"
                            />
                          )}
                          <p className="text-[11px] sm:text-xs md:text-sm font-mono font-bold text-[#DFC28A]">
                            Rp {denom.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Masukkan Jumlah Pembelian (Sesuai Referensi Gambar) */}
            <div className="border border-[#444c5b] rounded-xl sm:rounded-2xl overflow-hidden bg-[#262c37] shadow-sm">
              <div className="flex items-stretch h-9 sm:h-10 bg-[#2c333f] border-b border-[#3b4352]">
                <div className="w-9 sm:w-11 bg-[#9a7e58] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="flex-1 px-3 sm:px-4 flex items-center">
                  <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Masukkan Jumlah Pembelian
                  </h2>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 bg-[#212630]">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1) setQuantity(val);
                    }}
                    className="flex-1 h-9 sm:h-10 px-3 rounded-lg bg-[#363e4c] border border-white/5 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-[#9a7e58] focus:ring-1 focus:ring-[#9a7e58] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#9a7e58] hover:bg-[#a88a62] active:scale-95 text-white font-bold flex items-center justify-center transition shrink-0 cursor-pointer shadow-sm"
                    aria-label="Tambah kuantitas"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#645645] hover:bg-[#726350] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 text-white font-bold flex items-center justify-center transition shrink-0 cursor-pointer shadow-sm"
                    aria-label="Kurang kuantitas"
                  >
                    <Minus size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Pilih Metode Pembayaran */}
            <div className="border border-[#444c5b] rounded-xl sm:rounded-2xl overflow-hidden bg-[#262c37] shadow-sm">
              <div className="flex items-stretch h-9 sm:h-10 bg-[#2c333f] border-b border-[#3b4352]">
                <div className="w-9 sm:w-11 bg-[#9a7e58] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                  4
                </div>
                <div className="flex-1 px-3 sm:px-4 flex items-center">
                  <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Pilih Metode Pembayaran
                  </h2>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-[#212630] space-y-3">
                {/* Top Featured QRIS Card */}
                {qrisFeatured && (
                  <button
                    type="button"
                    onClick={() => setSelectedPayment(qrisFeatured)}
                    className={`w-full relative p-3 sm:p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer overflow-hidden ${
                      selectedPayment?.id === 'qris' || selectedPayment?.id === qrisFeatured?.id
                        ? 'bg-[#353c48] border-[#DFC28A] shadow-[0_0_20px_rgba(223,194,138,0.22)] ring-1 ring-[#DFC28A]'
                        : 'bg-[#313742] border-[#444c5b] hover:bg-[#38404d] hover:border-zinc-500'
                    }`}
                  >
                    {/* 3D Corner Wrap BEST PRICE Ribbon (Skala proporsional di mobile & tidak menutupi harga) */}
                    <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-18 h-18 sm:w-24 sm:h-24 pointer-events-none select-none z-10">
                      <svg viewBox="0 0 110 110" className="w-full h-full overflow-visible">
                        <defs>
                          <filter id="ribbon-3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="-2" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.45" />
                          </filter>
                        </defs>

                        {/* Top fold ear */}
                        <path d="M 22 10 L 12 0 Q 9 2 9 10 L 22 10 Z" fill="#6f5a42" />

                        {/* Right fold ear */}
                        <path d="M 100 88 L 110 98 Q 108 101 100 101 L 100 88 Z" fill="#6f5a42" />

                        {/* Main 3D Ribbon Body */}
                        <path 
                          d="M 12 0 L 52 0 L 110 58 L 110 98 Z" 
                          fill="#A58C6F" 
                          filter="url(#ribbon-3d-shadow)"
                        />

                        {/* Specular highlight */}
                        <line x1="12" y1="0" x2="110" y2="98" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                        {/* BEST PRICE Text centered */}
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

                    <div className="flex flex-col justify-between gap-2.5 sm:gap-3">
                      {/* Top Row: Title dengan right padding agar tidak tertabrak ribbon */}
                      <span className="text-[11px] sm:text-xs font-bold text-zinc-200 tracking-wide uppercase pr-14 sm:pr-20">
                        QRIS ALL PAYMENT
                      </span>

                      {/* Bottom Row: Banner on left, Price on right dengan safe right margin */}
                      <div className="flex items-end justify-between gap-2 pr-12 sm:pr-18">
                        <img 
                          src="/payments/qris-banner.png" 
                          alt="QRIS Satu QR Code untuk semua Payment"
                          className="h-5 sm:h-7 w-auto max-w-[130px] sm:max-w-[210px] object-contain rounded-sm"
                        />

                        <span className="text-xs sm:text-sm md:text-base font-bold text-zinc-100 font-mono tracking-tight shrink-0">
                          {selectedNominal
                            ? `Rp ${((selectedNominal.price * quantity) + qrisFeatured.fee).toLocaleString('id-ID')}`
                            : 'Min. 1.000,00'}
                        </span>
                      </div>
                    </div>
                  </button>
                )}

                {/* Grouped Accordions */}
                <div className="space-y-2.5 sm:space-y-3">
                  {PAYMENT_CATEGORIES.map((group) => {
                    const isOpen = !!openCategories[group.id];
                    return (
                      <div
                        key={group.id}
                        className="border border-[#444c5b] rounded-xl overflow-hidden bg-[#262c37] shadow-sm transition"
                      >
                        {/* Top Header of Category Accordion */}
                        <button
                          type="button"
                          onClick={() => toggleCategory(group.id)}
                          className="w-full flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 bg-[#2c333f] hover:bg-[#343b48] transition text-left cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                            {group.name}
                          </span>
                          <ChevronDown
                            size={17}
                            className={`text-zinc-400 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#DFC28A]' : ''
                            }`}
                          />
                        </button>

                        {/* Preview Bar with Mini Logos Strip (tanpa default scrollbar) */}
                        <div className="bg-[#444c5b] px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center overflow-x-auto no-scrollbar border-t border-[#4f5869]">
                          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
                            {group.previewLogos.map((logo) => (
                              <img
                                key={logo.name}
                                src={logo.url}
                                alt={logo.name}
                                title={logo.name}
                                className="h-2 sm:h-2.5 max-h-[10px] sm:max-h-[12px] w-auto object-contain shrink-0 rounded-[2px]"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Expanded Content: 2 Kolom di Mobile, 3 di Desktop */}
                        {isOpen && (
                          <div className="p-2.5 sm:p-3.5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 border-t border-zinc-800/80 bg-[#161a22]">
                            {group.channels.map((channel) => {
                              const isSelected = selectedPayment?.id === channel.id;
                              const itemPrice = selectedNominal ? (selectedNominal.price * quantity) + channel.fee : 0;
                              return (
                                <button
                                  key={channel.id}
                                  type="button"
                                  onClick={() => setSelectedPayment(channel)}
                                  className={`relative p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-left border transition-all duration-200 flex flex-col justify-between min-h-[72px] sm:min-h-[84px] overflow-hidden ${
                                    isSelected
                                      ? 'bg-[#DFC28A]/10 border-[#DFC28A] shadow-[0_0_15px_rgba(223,194,138,0.22)] ring-1 ring-[#DFC28A]/50'
                                      : 'bg-[#1e232d]/90 border-zinc-700/60 hover:bg-[#262c39] hover:border-zinc-500'
                                  }`}
                                >
                                  {channel.badge && (
                                    <span 
                                      className="absolute top-1.5 right-1.5 text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider text-white bg-gradient-to-b from-[#F7E19C] via-[#CA9E3C] to-[#7B5313] border-t border-amber-200/90 shadow pointer-events-none"
                                    >
                                      {channel.badge}
                                    </span>
                                  )}

                                  <div className="flex items-center min-h-[26px]">
                                    <img
                                      src={channel.logoUrl}
                                      alt={channel.name}
                                      className="h-4.5 sm:h-6 max-h-[24px] w-auto max-w-[85px] sm:max-w-[120px] object-contain rounded"
                                      onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                      }}
                                    />
                                  </div>

                                  <div className="mt-2 pt-1.5 border-t border-white/[0.06] flex items-center justify-between gap-1">
                                    <span className="text-[9px] text-zinc-500 font-mono">
                                      Fee: {channel.fee.toLocaleString('id-ID')}
                                    </span>
                                    <p className="text-[11px] sm:text-xs font-mono font-bold text-[#DFC28A]">
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
            </div>

            {/* Step 5: Nomor WhatsApp */}
            <div className="border border-[#444c5b] rounded-xl sm:rounded-2xl overflow-hidden bg-[#262c37] shadow-sm">
              <div className="flex items-stretch h-9 sm:h-10 bg-[#2c333f] border-b border-[#3b4352]">
                <div className="w-9 sm:w-11 bg-[#9a7e58] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                  5
                </div>
                <div className="flex-1 px-3 sm:px-4 flex items-center">
                  <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Nomor WhatsApp
                  </h2>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-[#212630]">
                <label className="block text-[11px] sm:text-xs font-semibold text-zinc-400 mb-1.5">No. WhatsApp</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#363e4c] border border-white/5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#9a7e58] focus:ring-1 focus:ring-[#9a7e58] transition"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          MOBILE FLOATING CHECKOUT BAR (Khusus Smartphone, Di Atas Bottom Nav)
          - Posisi: fixed bottom-[56px] left-0 right-0 z-30 lg:hidden
          - Sesuai Gambar Referensi:
            1. Single cohesive card:
               - Baris atas: [Icon App] [Nama App] / [Nominal] [Chevron ^ / v]
               - Ketika di-expand:
                 Harga             Rp 12,152
                 Jumlah Pembelian  1
                 Biaya             Rp 0
                 ----------------------------
                 Total Pembayaran  Rp 12,152
            2. Tombol di bawah card: [ 🛍️ Pesan Sekarang! ]
            3. Ukuran kompak dan proporsional
      ========================================================================= */}
      <div className="fixed bottom-[56px] left-0 right-0 z-30 lg:hidden px-3.5 py-2 bg-[#0e1015]/95 backdrop-blur-xl border-t border-zinc-800 shadow-[0_-8px_25px_rgba(0,0,0,0.85)]">
        {/* Single Unified Card (Header + Expandable Detail) */}
        <div className="rounded-xl bg-[#181a20] border border-zinc-700/60 p-2.5 shadow-md">
          {/* Card Header (Bisa diklik untuk buka/tutup accordion) */}
          <button
            type="button"
            onClick={() => setIsMobileDetailOpen(!isMobileDetailOpen)}
            className="w-full flex items-center justify-between text-left cursor-pointer select-none"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={game.image} 
                alt={game.name} 
                className="w-8 h-8 rounded-lg object-contain bg-zinc-950 border border-white/10 shrink-0 shadow"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate leading-tight">{game.name}</h4>
                <p className="text-[11px] text-zinc-300 font-medium truncate mt-0.5">
                  {selectedNominal ? selectedNominal.name : 'Pilih Nominal'}
                </p>
              </div>
            </div>

            <ChevronDown
              size={17}
              className={`text-zinc-400 transition-transform duration-200 shrink-0 ml-2 ${
                isMobileDetailOpen ? 'rotate-180 text-[#DFC28A]' : ''
              }`}
            />
          </button>

          {/* Expanded Detail Rows (Persis Gambar Referensi) */}
          {isMobileDetailOpen && (
            <div className="mt-3 pt-2.5 border-t border-zinc-700/40 space-y-2 text-xs animate-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between gap-2">
                <span className="text-zinc-400 text-[11px] sm:text-xs">Harga</span>
                <span className="text-zinc-100 font-medium font-mono text-[11px] sm:text-xs">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-zinc-400 text-[11px] sm:text-xs">Jumlah Pembelian</span>
                <span className="text-zinc-100 font-medium font-mono text-[11px] sm:text-xs">
                  {quantity}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-zinc-400 text-[11px] sm:text-xs">Biaya</span>
                <span className="text-zinc-100 font-medium font-mono text-[11px] sm:text-xs">
                  Rp {paymentFee.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-700/50 flex items-center justify-between gap-2">
                <span className="font-bold text-white text-xs sm:text-sm">Total Pembayaran</span>
                <span className="font-bold font-mono text-[#DFC28A] text-xs sm:text-sm">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tombol Pesan Sekarang! */}
        <button
          type="button"
          onClick={handleCheckout}
          className="w-full mt-2 py-2.5 rounded-xl bg-[#9a7e58] hover:bg-[#a88a62] active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md cursor-pointer"
        >
          <ShoppingBag size={15} />
          <span>Pesan Sekarang!</span>
        </button>
      </div>
    </Navbar>
  );
}
