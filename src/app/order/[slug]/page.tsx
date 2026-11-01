'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ALL_GAMES, Denomination } from '@/data/games';
import { PAYMENT_CATEGORIES, PAYMENT_CHANNELS, PaymentChannel } from '@/data/paymentMethods';
import { getNominalIcon } from '@/lib/getNominalIcon';
import { ArrowLeft, CheckCircle2, ShieldCheck, ChevronDown } from 'lucide-react';

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
  const totalPrice = (selectedNominal?.price || 0) + (selectedPayment?.fee || 0);

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
          {/* Kolom Kiri: Info Game dengan Glassmorphism Mewah */}
          <div className="lg:col-span-4 bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 sticky top-28 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
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
                <CheckCircle2 size={16} className="text-[#DFC28A] shrink-0" /> Pengiriman Otomatis & Instan 24/7
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" /> Layanan Resmi, Legal & Terverifikasi
              </div>
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
                  className={`w-full relative p-4 sm:p-5 rounded-2xl text-left border transition-all duration-200 overflow-hidden cursor-pointer ${
                    selectedPayment?.id === 'qris'
                      ? 'bg-[#353c48] border-[#DFC28A] shadow-[0_0_24px_rgba(223,194,138,0.25)] ring-1 ring-[#DFC28A]'
                      : 'bg-[#313742] border-[#444c5b] hover:bg-[#38404d] hover:border-zinc-500'
                  }`}
                >
                  {/* Diagonal BEST PRICE Ribbon */}
                  <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none">
                    <div className="absolute transform rotate-45 bg-[#968366] text-white text-[9px] font-black uppercase py-0.5 right-[-32px] top-[18px] w-[120px] text-center shadow tracking-wider">
                      BEST PRICE
                    </div>
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
                          ? `Rp ${(selectedNominal.price + qrisFeatured.fee).toLocaleString('id-ID')}`
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
                            const itemPrice = selectedNominal ? selectedNominal.price + channel.fee : 0;
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
                                  <span className="absolute top-2.5 right-2.5 text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 pointer-events-none">
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

            {/* Step 4: Kontak & Checkout */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">4</div>
                <h2 className="text-base font-bold text-white">Nomor WhatsApp & Konfirmasi Beli</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">No. WhatsApp (Untuk Bukti & Status Pembayaran)</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-[#DFC28A] transition"
                  />
                </div>

                <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Total Pembayaran</p>
                    <p className="text-2xl font-black text-[#DFC28A] font-mono mt-0.5">
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Simulasi Transaksi Berhasil!\n\nGame: ${game.name}\nItem: ${selectedNominal?.name}\nTujuan ID: ${userId}\nMetode: ${selectedPayment?.name}\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}`)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EBD5A7] to-[#DFC28A] hover:brightness-110 text-slate-950 font-bold text-sm transition shadow-[0_0_25px_rgba(223,194,138,0.3)] active:scale-95"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Navbar>
  );
}
