'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { 
  Search, 
  Receipt, 
  History, 
  Copy, 
  Check, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  RefreshCw, 
  LogOut, 
  User, 
  Sparkles, 
  Zap, 
  SearchX, 
  CreditCard,
  Gamepad2,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

// =============================================================================
// TYPES & DATA CONTRACTS
// =============================================================================

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS';

export interface TrackerStepInfo {
  step: 1 | 2 | 3;
  label: string;
  subtitle: string;
  timestamp?: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface TransactionRecord {
  invoiceId: string;
  gameName: string;
  gameSlug: string;
  gameIcon: string;
  productName: string;
  userId: string;
  zoneId?: string;
  server?: string;
  accountNickname?: string;
  paymentMethod: string;
  paymentCategory: 'qris' | 'va' | 'ewallet';
  paymentLogo?: string;
  price: number;
  fee: number;
  totalAmount: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  paymentExpiry?: string;
  vaNumber?: string;
  stepTimestamps: {
    orderCreated: string;
    paymentReceived?: string;
    itemDelivered?: string;
  };
}

// =============================================================================
// REALISTIC MOCK DATA (MLBB, Honkai: Star Rail, Free Fire covering 3 statuses)
// =============================================================================

const MOCK_TRANSACTIONS: TransactionRecord[] = [
  {
    invoiceId: 'VEXA-20261101-089',
    gameName: 'Mobile Legends: Bang Bang',
    gameSlug: 'mobile-legends',
    gameIcon: '/games/mobile-legends.png',
    productName: 'Weekly Diamond Pass (WDP) + 50 Diamonds',
    userId: '849201948',
    zoneId: '2104',
    accountNickname: 'VexaSlayer99',
    paymentMethod: 'QRIS ALL PAYMENT (Instant)',
    paymentCategory: 'qris',
    paymentLogo: '/payments/qris.png',
    price: 27500,
    fee: 0,
    totalAmount: 27500,
    status: 'SUCCESS',
    createdAt: '01 Nov 2026, 18:45:10 WIB',
    updatedAt: '01 Nov 2026, 18:45:14 WIB',
    notes: 'Injeksi API Moonton Direct Server 100% Berhasil.',
    stepTimestamps: {
      orderCreated: '18:45:10 WIB',
      paymentReceived: '18:45:12 WIB',
      itemDelivered: '18:45:14 WIB (Sub-5 Detik)',
    },
  },
  {
    invoiceId: 'VEXA-20261101-142',
    gameName: 'Honkai: Star Rail',
    gameSlug: 'honkai-star-rail',
    gameIcon: '/games/honkai-star-rail.png',
    productName: 'Express Supply Pass 30 Hari + 300 Oneiric Shards',
    userId: '802941582',
    server: 'Asia',
    accountNickname: 'StelleTrailblazer',
    paymentMethod: 'BCA Virtual Account',
    paymentCategory: 'va',
    paymentLogo: '/payments/bca.png',
    price: 79000,
    fee: 1000,
    totalAmount: 80000,
    status: 'PROCESSING',
    createdAt: '01 Nov 2026, 19:30:44 WIB',
    updatedAt: '01 Nov 2026, 19:31:02 WIB',
    notes: 'Pembayaran diterima. Gateway VexaStore sedang menginjeksi paket ke server HoYoverse.',
    stepTimestamps: {
      orderCreated: '19:30:44 WIB',
      paymentReceived: '19:31:02 WIB',
    },
  },
  {
    invoiceId: 'VEXA-20261101-205',
    gameName: 'Free Fire Max Garena',
    gameSlug: 'free-fire',
    gameIcon: '/games/free-fire.png',
    productName: '720 + 72 Bonus Diamonds (Flash Vault)',
    userId: '198273645',
    accountNickname: 'BooyahHunter',
    paymentMethod: 'Mandiri Virtual Account',
    paymentCategory: 'va',
    paymentLogo: '/payments/mandiri.png',
    price: 93000,
    fee: 1500,
    totalAmount: 94500,
    status: 'PENDING',
    createdAt: '01 Nov 2026, 19:50:18 WIB',
    updatedAt: '01 Nov 2026, 19:50:18 WIB',
    notes: 'Menunggu transfer pembayaran ke nomor Virtual Account sebelum batas waktu berakhir.',
    paymentExpiry: '01 Nov 2026, 21:50 WIB (2 Jam)',
    vaNumber: '887088198273645',
    stepTimestamps: {
      orderCreated: '19:50:18 WIB',
    },
  },
];

// Helper format IDR
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TransaksiPage() {
  // Navigation Tabs: 'invoice' | 'history'
  const [activeTab, setActiveTab] = useState<'invoice' | 'history'>('invoice');

  // Tab 1: Invoice Search State
  const [searchInput, setSearchInput] = useState<string>('VEXA-20261101-089');
  const [searchedId, setSearchedId] = useState<string>('VEXA-20261101-089');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  // Tab 2: Simulated Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    phone: string;
    tier: string;
  }>({
    name: 'VexaCommander',
    phone: '0812-3849-8899',
    tier: 'Gold Tier Member',
  });
  const [historySearch, setHistorySearch] = useState<string>('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<'ALL' | TransactionStatus>('ALL');

  // Copy Feedback State
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active searched transaction
  const foundTransaction = useMemo(() => {
    if (!searchedId.trim()) return null;
    const cleanQuery = searchedId.trim().toUpperCase();
    return (
      MOCK_TRANSACTIONS.find(
        (t) =>
          t.invoiceId.toUpperCase() === cleanQuery ||
          t.invoiceId.toUpperCase().includes(cleanQuery)
      ) || null
    );
  }, [searchedId]);

  // Copy to clipboard helper
  const handleCopy = (text: string, key: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // Submit invoice search
  const handleInvoiceSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchInput.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Realistic micro-delay
    setTimeout(() => {
      setSearchedId(searchInput.trim());
      setIsSearching(false);
    }, 350);
  };

  // Switch to specific invoice
  const handleSelectSampleInvoice = (invId: string) => {
    setSearchInput(invId);
    setSearchedId(invId);
    setHasSearched(true);
    setActiveTab('invoice');
  };

  // Filtered History list
  const filteredHistory = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((trx) => {
      const matchStatus =
        historyStatusFilter === 'ALL' || trx.status === historyStatusFilter;
      const matchQuery =
        historySearch.trim() === '' ||
        trx.invoiceId.toLowerCase().includes(historySearch.toLowerCase()) ||
        trx.gameName.toLowerCase().includes(historySearch.toLowerCase()) ||
        trx.productName.toLowerCase().includes(historySearch.toLowerCase()) ||
        trx.userId.includes(historySearch.trim());
      return matchStatus && matchQuery;
    });
  }, [historySearch, historyStatusFilter]);

  // Compute 3-Step Tracker logic based on status
  const getTrackerSteps = (status: TransactionStatus, timestamps: TransactionRecord['stepTimestamps']): TrackerStepInfo[] => {
    if (status === 'PENDING') {
      return [
        {
          step: 1,
          label: 'Menunggu Pembayaran',
          subtitle: 'Selesaikan transfer tagihan',
          timestamp: timestamps.orderCreated,
          isComplete: false,
          isActive: true,
        },
        {
          step: 2,
          label: 'Sedang Diproses',
          subtitle: 'Gateway antrean API',
          isComplete: false,
          isActive: false,
        },
        {
          step: 3,
          label: 'Selesai Terkirim',
          subtitle: 'Item masuk akun game',
          isComplete: false,
          isActive: false,
        },
      ];
    }

    if (status === 'PROCESSING') {
      return [
        {
          step: 1,
          label: 'Menunggu Pembayaran',
          subtitle: 'Pembayaran berhasil diverifikasi',
          timestamp: timestamps.orderCreated,
          isComplete: true,
          isActive: false,
        },
        {
          step: 2,
          label: 'Sedang Diproses',
          subtitle: 'Injeksi API server aktif',
          timestamp: timestamps.paymentReceived,
          isComplete: false,
          isActive: true,
        },
        {
          step: 3,
          label: 'Selesai Terkirim',
          subtitle: 'Menunggu konfirmasi server game',
          isComplete: false,
          isActive: false,
        },
      ];
    }

    // SUCCESS
    return [
      {
        step: 1,
        label: 'Menunggu Pembayaran',
        subtitle: 'Pembayaran telah lunas',
        timestamp: timestamps.orderCreated,
        isComplete: true,
        isActive: false,
      },
      {
        step: 2,
        label: 'Sedang Diproses',
        subtitle: 'Diproses otomatis via API',
        timestamp: timestamps.paymentReceived,
        isComplete: true,
        isActive: false,
      },
      {
        step: 3,
        label: 'Selesai Terkirim',
        subtitle: 'Item berhasil diinjeksi',
        timestamp: timestamps.itemDelivered,
        isComplete: true,
        isActive: true,
      },
    ];
  };

  return (
    <Navbar>
      <main className="max-w-6xl mx-auto w-full px-3.5 sm:px-6 md:px-8 pt-6 sm:pt-10 md:pt-12 pb-24 flex flex-col gap-6 sm:gap-8 flex-1">
        
        {/* =====================================================================
            1. HEADER BANNER SECTION (VexaStore Obsidian Design System)
        ===================================================================== */}
        <section className="flex flex-col gap-3 sm:gap-4 border-b border-zinc-800/80 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC28A]/10 border border-[#DFC28A]/30 text-[#DFC28A] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFC28A] animate-pulse" />
              VEXASTORE REALTIME GATEWAY // STATUS TRANSAKSI
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-zinc-400">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck size={14} /> Otomatisasi API sub-5 Detik
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
                <Zap size={13} className="text-[#DFC28A]" /> 100% Legal & Bergaransi
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                Pusat Pelacakan & Riwayat Transaksi
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Cek status faktur nomor invoice secara publik tanpa registrasi, atau masuk ke akun VexaStore kamu untuk mengakses seluruh arsip histori transaksi.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. TWO-TAB NAVIGATION SWITCHER
        ===================================================================== */}
        <section className="w-full">
          <div className="bg-[#0B0F17]/95 border border-white/10 rounded-2xl p-1.5 flex items-center gap-1 sm:gap-2 shadow-lg backdrop-blur-md max-w-xl">
            {/* Tab 1: Cek No. Invoice */}
            <button
              type="button"
              onClick={() => setActiveTab('invoice')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'invoice'
                  ? 'bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] text-slate-950 shadow-md font-black scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Receipt size={16} />
              <span>Cek No. Invoice</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full uppercase tracking-tight bg-black/10 border border-black/15 hidden xs:inline-block">
                Publik
              </span>
            </button>

            {/* Tab 2: Riwayat Transaksi */}
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] text-slate-950 shadow-md font-black scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <History size={16} />
              <span>Riwayat Transaksi</span>
              {isLoggedIn ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Akun Terhubung" />
              ) : (
                <Lock size={12} className="opacity-70" />
              )}
            </button>
          </div>
        </section>

        {/* =====================================================================
            3. TAB CONTENT 1: CEK NO. INVOICE (PUBLIC)
        ===================================================================== */}
        {activeTab === 'invoice' && (
          <div className="flex flex-col gap-6 sm:gap-8 animate-in fade-in duration-200">
            
            {/* Search Input Box */}
            <div className="rounded-3xl bg-[#0B0F17]/85 border border-white/10 p-4 sm:p-6 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <form onSubmit={handleInvoiceSearch} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <Search size={18} className="text-[#DFC28A]" />
                    </div>
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Masukkan No. Invoice (Contoh: VEXA-20261101-089)"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/50 border border-zinc-700/80 hover:border-[#DFC28A]/50 focus:border-[#DFC28A] text-white text-xs sm:text-sm font-mono placeholder-zinc-500 focus:outline-none transition shadow-inner focus:shadow-[0_0_20px_rgba(223,194,138,0.2)] uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-60"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Memeriksa Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        <span>Cari Pesanan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Sample Invoices for Easy Testing */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-500">Coba Demo Invoice:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSampleInvoice('VEXA-20261101-089')}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-[#DFC28A]/10 border border-white/10 hover:border-[#DFC28A]/40 text-emerald-400 font-mono transition text-[11px] cursor-pointer"
                  >
                    ✓ VEXA-20261101-089 (Sukses)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSampleInvoice('VEXA-20261101-142')}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-[#DFC28A]/10 border border-white/10 hover:border-[#DFC28A]/40 text-cyan-400 font-mono transition text-[11px] cursor-pointer"
                  >
                    ⚡ VEXA-20261101-142 (Diproses)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSampleInvoice('VEXA-20261101-205')}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-[#DFC28A]/10 border border-white/10 hover:border-[#DFC28A]/40 text-amber-400 font-mono transition text-[11px] cursor-pointer"
                  >
                    ⏳ VEXA-20261101-205 (Pending)
                  </button>
                </div>
              </form>
            </div>

            {/* Found Invoice Result Card */}
            {hasSearched && foundTransaction && (
              <div className="rounded-3xl bg-[#0B0F17]/90 border border-[#DFC28A]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 sm:p-8 backdrop-blur-xl relative overflow-hidden isolate">
                
                {/* Ambient Top Glow */}
                <div className="absolute top-0 left-1/4 right-1/4 h-24 bg-[#DFC28A]/10 blur-3xl -z-10 pointer-events-none" />

                {/* Card Header: Invoice ID + Copy Button + Dynamic Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      No. Invoice:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-black text-white tracking-tight">
                      {foundTransaction.invoiceId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(foundTransaction.invoiceId, 'invoiceId')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-[#DFC28A]/15 border border-white/10 hover:border-[#DFC28A]/40 text-xs font-mono text-[#DFC28A] transition cursor-pointer"
                      title="Salin No. Invoice"
                    >
                      {copiedKey === 'invoiceId' ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Dynamic Status Badge */}
                  <div>
                    {foundTransaction.status === 'SUCCESS' && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono tracking-tight shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 size={15} />
                        SELESAI TERKIRIM
                      </span>
                    )}
                    {foundTransaction.status === 'PROCESSING' && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono tracking-tight shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                        <Loader2 size={15} className="animate-spin text-cyan-400" />
                        SEDANG DIPROSES
                      </span>
                    )}
                    {foundTransaction.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono tracking-tight shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                        <Clock size={15} className="animate-pulse text-amber-400" />
                        MENUNGGU PEMBAYARAN
                      </span>
                    )}
                  </div>
                </div>

                {/* ===============================================================
                    HORIZONTAL 3-STEP VISUAL TRACKER
                    1. Menunggu Pembayaran -> 2. Sedang Diproses -> 3. Selesai Terkirim
                =============================================================== */}
                <div className="py-6 sm:py-8 border-b border-white/[0.08]">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Sparkles size={14} className="text-[#DFC28A]" />
                    Status Rantai Distribusi Gateway
                  </h3>

                  <div className="relative">
                    {/* Background Track Line */}
                    <div className="absolute top-5 left-8 right-8 h-1 bg-zinc-800 -z-0 hidden sm:block" />

                    {/* Progress Highlight Line */}
                    <div
                      className={`absolute top-5 left-8 h-1 transition-all duration-700 hidden sm:block -z-0 ${
                        foundTransaction.status === 'SUCCESS'
                          ? 'w-[calc(100%-4rem)] bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                          : foundTransaction.status === 'PROCESSING'
                          ? 'w-[calc(50%-2rem)] bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                          : 'w-0 bg-transparent'
                      }`}
                    />

                    {/* Step Nodes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 relative z-10">
                      {getTrackerSteps(foundTransaction.status, foundTransaction.stepTimestamps).map((stepItem) => {
                        return (
                          <div
                            key={stepItem.step}
                            className={`flex sm:flex-col items-center sm:text-center gap-3.5 sm:gap-2.5 p-3 sm:p-2 rounded-2xl transition ${
                              stepItem.isActive
                                ? 'bg-white/[0.02] border border-white/10 sm:border-transparent'
                                : ''
                            }`}
                          >
                            {/* Step Indicator Icon Bubble */}
                            <div
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-black text-xs shrink-0 transition-all duration-300 ${
                                stepItem.isComplete
                                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_18px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/30'
                                  : stepItem.isActive
                                  ? foundTransaction.status === 'PENDING'
                                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/40 animate-pulse'
                                    : 'bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/40 animate-pulse'
                                  : 'bg-zinc-900 border border-zinc-700 text-zinc-500'
                              }`}
                            >
                              {stepItem.isComplete ? (
                                <Check size={18} strokeWidth={3} />
                              ) : stepItem.isActive ? (
                                foundTransaction.status === 'PROCESSING' ? (
                                  <Loader2 size={18} className="animate-spin" />
                                ) : (
                                  stepItem.step
                                )
                              ) : (
                                stepItem.step
                              )}
                            </div>

                            {/* Label & Description */}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                                  stepItem.isComplete
                                    ? 'text-emerald-400'
                                    : stepItem.isActive
                                    ? foundTransaction.status === 'PENDING'
                                      ? 'text-amber-400'
                                      : 'text-cyan-300'
                                    : 'text-zinc-500'
                                }`}
                              >
                                {stepItem.step}. {stepItem.label}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                                {stepItem.subtitle}
                              </p>
                              {stepItem.timestamp && (
                                <p className="text-[10px] font-mono text-[#DFC28A] mt-1 font-bold">
                                  {stepItem.timestamp}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Helper Notes */}
                  {foundTransaction.status === 'PENDING' && (
                    <div className="mt-5 p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
                      <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-300">Menunggu Pelunasan Tagihan</p>
                        <p className="text-[11px] text-amber-200/80 mt-0.5">
                          Segera lakukan pembayaran sebelum batas waktu berakhir ({foundTransaction.paymentExpiry}). Sistem akan otomatis memproses pesanan setelah transfer diterima.
                        </p>
                        {foundTransaction.vaNumber && (
                          <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/40 font-mono text-xs text-white">
                            <span>No. Virtual Account: <strong>{foundTransaction.vaNumber}</strong></span>
                            <button
                              type="button"
                              onClick={() => handleCopy(foundTransaction.vaNumber!, 'vaNumber')}
                              className="text-amber-400 hover:text-white transition cursor-pointer text-[11px]"
                            >
                              {copiedKey === 'vaNumber' ? '✓ Tersalin' : 'Salin'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {foundTransaction.status === 'PROCESSING' && (
                    <div className="mt-5 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-200">
                      <Loader2 size={16} className="animate-spin text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-cyan-300">Injeksi Sistem Sedang Berlangsung</p>
                        <p className="text-[11px] text-cyan-200/80 mt-0.5">
                          Pembayaran Anda terverifikasi. API VexaStore sedang memasukkan item langsung ke akun game kamu dalam beberapa detik.
                        </p>
                      </div>
                    </div>
                  )}

                  {foundTransaction.status === 'SUCCESS' && (
                    <div className="mt-5 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-emerald-300">Transaksi Telah Selesai</p>
                        <p className="text-[11px] text-emerald-200/80 mt-0.5">
                          Item sudah berhasil masuk ke akun game Anda. Silakan buka aplikasi game dan periksa saldo/in-game mail kamu.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ===============================================================
                    DETAILS GRID SECTION
                    Game name, product, User ID, payment channel, timestamp, total
                =============================================================== */}
                <div className="pt-6 sm:pt-8">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Gamepad2 size={14} className="text-[#DFC28A]" />
                    Rincian Pesanan
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Item & Target Column */}
                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-5 flex flex-col justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 relative shadow-sm">
                          <img
                            src={foundTransaction.gameIcon}
                            alt={foundTransaction.gameName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            {foundTransaction.gameName}
                          </p>
                          <h4 className="text-sm sm:text-base font-black text-white truncate mt-0.5">
                            {foundTransaction.productName}
                          </h4>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Target User ID:</span>
                          <span className="font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
                            {foundTransaction.userId}
                            {foundTransaction.zoneId && ` (${foundTransaction.zoneId})`}
                            {foundTransaction.server && ` [${foundTransaction.server}]`}
                          </span>
                        </div>

                        {foundTransaction.accountNickname && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Nama Karakter / Akun:</span>
                            <span className="font-semibold text-slate-200">
                              {foundTransaction.accountNickname}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Waktu Pemesanan:</span>
                          <span className="font-mono text-slate-300">
                            {foundTransaction.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment & Amount Column */}
                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-5 flex flex-col justify-between gap-3">
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                          <span className="text-slate-400">Metode Pembayaran:</span>
                          <div className="flex items-center gap-2">
                            {foundTransaction.paymentLogo && (
                              <img
                                src={foundTransaction.paymentLogo}
                                alt={foundTransaction.paymentMethod}
                                className="h-4 w-auto object-contain"
                              />
                            )}
                            <span className="font-bold text-slate-200">
                              {foundTransaction.paymentMethod}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Harga Item:</span>
                          <span className="font-mono text-slate-200">
                            {formatRupiah(foundTransaction.price)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Biaya Layanan:</span>
                          <span className="font-mono text-slate-200">
                            {foundTransaction.fee === 0 ? 'Gratis (Rp 0)' : formatRupiah(foundTransaction.fee)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-baseline justify-between">
                        <span className="text-xs font-bold text-slate-300">Total Pembayaran:</span>
                        <span className="text-lg sm:text-xl font-black text-[#DFC28A] font-mono drop-shadow">
                          {formatRupiah(foundTransaction.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                    <Link
                      href={`/order/${foundTransaction.gameSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#DFC28A] hover:underline font-bold"
                    >
                      <span>Beli Lagi di {foundTransaction.gameName}</span>
                      <ArrowRight size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleCopy(window?.location?.href || foundTransaction.invoiceId, 'share')}
                      className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedKey === 'share' ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400">Tautan Tersalin</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink size={14} />
                          <span>Bagikan Bukti Pesanan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Error / Not Found State */}
            {hasSearched && !foundTransaction && (
              <div className="rounded-3xl bg-[#0B0F17]/85 border border-red-500/30 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-md animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-3xl bg-red-950/40 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
                  <SearchX size={30} />
                </div>
                <h3 className="text-lg font-black text-white">Nomor Invoice Tidak Ditemukan</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  Faktur dengan nomor <strong className="text-white font-mono">{searchedId}</strong> tidak terdaftar di database gateway kami. Pastikan nomor invoice yang Anda ketik benar dan lengkap sesuai format (Contoh: <span className="text-[#DFC28A] font-mono">VEXA-YYYYMMDD-XXX</span>).
                </p>

                <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col items-center gap-2.5">
                  <span className="text-xs text-slate-400 font-semibold">Coba salah satu sample invoice resmi:</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectSampleInvoice('VEXA-20261101-089')}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#DFC28A]/15 border border-white/10 hover:border-[#DFC28A]/40 text-xs font-mono text-[#DFC28A] transition cursor-pointer"
                    >
                      VEXA-20261101-089
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectSampleInvoice('VEXA-20261101-142')}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#DFC28A]/15 border border-white/10 hover:border-[#DFC28A]/40 text-xs font-mono text-cyan-400 transition cursor-pointer"
                    >
                      VEXA-20261101-142
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectSampleInvoice('VEXA-20261101-205')}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#DFC28A]/15 border border-white/10 hover:border-[#DFC28A]/40 text-xs font-mono text-amber-400 transition cursor-pointer"
                    >
                      VEXA-20261101-205
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =====================================================================
            4. TAB CONTENT 2: RIWAYAT TRANSAKSI (PROTECTED BY isLoggedIn)
        ===================================================================== */}
        {activeTab === 'history' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            
            {/* Case A: User Not Logged In (Locked State) */}
            {!isLoggedIn ? (
              <div className="rounded-3xl bg-[#0B0F17]/90 border border-white/10 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-xl relative overflow-hidden isolate">
                
                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-1/3 right-1/3 h-28 bg-[#DFC28A]/10 blur-3xl -z-10 pointer-events-none" />

                {/* Glowing Lock Icon */}
                <div className="w-16 h-16 rounded-3xl bg-[#DFC28A]/10 border border-[#DFC28A]/35 text-[#DFC28A] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(223,194,138,0.25)]">
                  <Lock size={30} />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Riwayat Transaksi Terkunci
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  Akses riwayat pesanan lengkap kamu, status bukti faktur, dan klaim reward loyalty point dengan masuk ke akun VexaStore kamu.
                </p>

                {/* Login Button Action */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLoggedIn(true)}
                    className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Unlock size={16} />
                    <span>Masuk Akun (Simulasi Login)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('invoice')}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Lacak No. Invoice Saja</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] text-slate-500 text-xs flex items-center justify-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Enkripsi Privasi TLS 1.3 Terjamin Aman</span>
                </div>
              </div>
            ) : (
              /* Case B: User Logged In (Show History List & Filters) */
              <div className="flex flex-col gap-6">
                
                {/* Logged In User Profile Bar */}
                <div className="rounded-3xl bg-[#0B0F17]/90 border border-white/10 p-4 sm:p-6 backdrop-blur-md shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DFC28A] to-[#8C7449] text-slate-950 flex items-center justify-center font-black text-lg shadow-md shrink-0">
                      <User size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">{userProfile.name}</h3>
                        <span className="bg-[#DFC28A]/20 text-[#DFC28A] border border-[#DFC28A]/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tight font-mono">
                          {userProfile.tier}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">{userProfile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsLoggedIn(false)}
                      className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0B0F17]/70 border border-white/10 p-3 sm:p-4 rounded-2xl">
                  {/* Keyword Search */}
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Filter invoice ID, game, atau item..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-[#DFC28A] text-white text-xs font-mono placeholder-zinc-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Status Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    {(['ALL', 'SUCCESS', 'PROCESSING', 'PENDING'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setHistoryStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                          historyStatusFilter === st
                            ? 'bg-[#DFC28A] text-slate-950 shadow-sm'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
                        }`}
                      >
                        {st === 'ALL' && 'Semua'}
                        {st === 'SUCCESS' && '✓ Sukses'}
                        {st === 'PROCESSING' && '⚡ Diproses'}
                        {st === 'PENDING' && '⏳ Pending'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* History Transactions List */}
                <div className="flex flex-col gap-4">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((trx) => (
                      <div
                        key={trx.invoiceId}
                        className="rounded-3xl bg-[#0B0F17]/85 border border-white/10 hover:border-[#DFC28A]/40 p-4 sm:p-6 backdrop-blur-md shadow-md transition-all duration-300 flex flex-col gap-4 group"
                      >
                        {/* Top Row: Date, ID, Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                            <Clock size={13} />
                            <span>{trx.createdAt}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-white font-bold">{trx.invoiceId}</span>
                          </div>

                          <div>
                            {trx.status === 'SUCCESS' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold font-mono">
                                <CheckCircle2 size={12} /> Sukses
                              </span>
                            )}
                            {trx.status === 'PROCESSING' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold font-mono">
                                <Loader2 size={12} className="animate-spin text-cyan-400" /> Diproses
                              </span>
                            )}
                            {trx.status === 'PENDING' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/40 text-[11px] font-bold font-mono">
                                <Clock size={12} /> Pending
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Middle Row: Game Icon, Item Info, Target ID, Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                              <img
                                src={trx.gameIcon}
                                alt={trx.gameName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                                {trx.gameName}
                              </p>
                              <h4 className="text-sm sm:text-base font-black text-white">
                                {trx.productName}
                              </h4>
                              <p className="text-xs font-mono text-slate-400 mt-0.5">
                                User ID: <strong className="text-slate-200">{trx.userId}</strong>
                                {trx.zoneId && ` (${trx.zoneId})`}
                                {trx.accountNickname && ` • ${trx.accountNickname}`}
                              </p>
                            </div>
                          </div>

                          <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.04]">
                            <span className="text-[11px] text-slate-400">{trx.paymentMethod}</span>
                            <span className="text-base sm:text-lg font-black text-[#DFC28A] font-mono">
                              {formatRupiah(trx.totalAmount)}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Row: Quick Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                          <button
                            type="button"
                            onClick={() => handleSelectSampleInvoice(trx.invoiceId)}
                            className="inline-flex items-center gap-1 text-xs text-[#DFC28A] font-bold hover:underline cursor-pointer"
                          >
                            <span>Lacak Visual Tracker</span>
                            <ChevronRight size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(trx.invoiceId, trx.invoiceId)}
                            className="text-[11px] font-mono text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === trx.invoiceId ? (
                              <span className="text-emerald-400 font-bold">✓ Tersalin</span>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Salin ID</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-3xl bg-[#0B0F17]/60 border border-white/10 p-12 text-center text-slate-400">
                      <p className="font-semibold text-white">Tidak ada transaksi yang cocok.</p>
                      <p className="text-xs text-slate-500 mt-1">Coba ganti filter status atau kata kunci pencarian kamu.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </main>
    </Navbar>
  );
}

