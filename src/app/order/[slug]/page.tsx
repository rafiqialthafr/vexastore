'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ALL_GAMES, PAYMENT_CHANNELS, Denomination, PaymentChannel } from '@/data/games';
import { ArrowLeft, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

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
  
  // Mock Nickname Check
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [verifiedNickname, setVerifiedNickname] = useState<string | null>(null);

  const handleCheckNickname = () => {
    if (!userId) return;
    setCheckingNickname(true);
    setTimeout(() => {
      setCheckingNickname(false);
      setVerifiedNickname(`Player_${userId.slice(-4)}_VIP`);
    }, 700);
  };

  const totalPrice = (selectedNominal?.price || 0) + (selectedPayment?.fee || 0);

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#DFC28A]/25 selection:text-[#FFF5DE]">
      {/* Ambient Lighting Reflections */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(223,194,138,0.08),transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute top-20 right-0 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(226,232,240,0.05),transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none -z-10" />

      <Navbar />

      <div className="md:pl-[80px] pb-24 md:pb-12 flex-1 flex flex-col bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white mb-8 transition group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition duration-200 text-[#DFC28A]" /> 
          KEMBALI KE KATALOG VAULT
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Kolom Kiri: Info Game dengan Glassmorphism Mewah */}
          <div className="lg:col-span-4 bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 sticky top-28 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="flex gap-4 items-center">
              <img src={game.image} alt={game.name} className="w-20 h-24 object-cover rounded-2xl border border-white/[0.1] shadow-md shrink-0" />
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
                    onChange={(e) => { setUserId(e.target.value); setVerifiedNickname(null); }}
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

              {game.idRequirements.needsUserId && (
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCheckNickname}
                    disabled={!userId || checkingNickname}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 text-xs font-semibold disabled:opacity-50 transition"
                  >
                    {checkingNickname ? 'Memeriksa...' : 'Cek Nickname'}
                  </button>
                  {verifiedNickname && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <UserCheck size={15} /> {verifiedNickname}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Pilih Nominal */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">2</div>
                <h2 className="text-base font-bold text-white">Pilih Nominal {game.currencyName}</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {game.denominations.map((denom) => {
                  const isSelected = selectedNominal?.id === denom.id;
                  return (
                    <button
                      key={denom.id}
                      type="button"
                      onClick={() => setSelectedNominal(denom)}
                      className={`p-4 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#DFC28A]/10 border-[#DFC28A] shadow-[0_0_20px_rgba(223,194,138,0.25)]'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">{denom.name}</p>
                        {denom.bonus && <p className="text-[10px] text-orange-400 mt-1 font-mono">{denom.bonus}</p>}
                      </div>
                      <p className="text-xs sm:text-sm font-mono font-bold text-[#DFC28A] mt-4">
                        Rp {denom.price.toLocaleString('id-ID')}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Pilih Pembayaran */}
            <div className="bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFC28A] to-[#C8A762] text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(223,194,138,0.25)]">3</div>
                <h2 className="text-base font-bold text-white">Pilih Metode Pembayaran</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {PAYMENT_CHANNELS.map((channel) => {
                  const isSelected = selectedPayment?.id === channel.id;
                  const itemPrice = selectedNominal ? selectedNominal.price + channel.fee : 0;
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => setSelectedPayment(channel)}
                      className={`p-4 rounded-2xl text-left border transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#DFC28A]/10 border-[#DFC28A] shadow-[0_0_20px_rgba(223,194,138,0.25)]'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                      }`}
                    >
                      <div>
                        <span className="text-2xl">{channel.icon}</span>
                        <p className="text-xs sm:text-sm font-bold text-white mt-2">{channel.name}</p>
                      </div>
                      <p className="text-xs sm:text-sm font-mono font-bold text-slate-300 mt-4">
                        Rp {itemPrice.toLocaleString('id-ID')}
                      </p>
                    </button>
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
      </div>
    </div>
  </div>
  );
}
