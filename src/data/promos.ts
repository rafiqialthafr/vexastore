export interface PromoItem {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'Diskon Langsung' | 'Cashback' | 'Flash Sale' | 'Khusus Member Baru';
  discountType: 'fixed' | 'percent' | 'cashback' | 'admin_free';
  discountValue: string;
  minSpendText: string;
  validUntil: string;
  quotaPercent: number; // e.g. 85 (% used)
  quotaRemaining: number;
  isHot?: boolean;
  isFlashSale?: boolean;
  targetGameNames: string[];
  primaryGameSlug?: string;
  terms: string[];
}

export const PROMO_CATEGORIES = [
  'Semua Promo',
  'Flash Sale',
  'Diskon Langsung',
  'Cashback',
  'Khusus Member Baru'
] as const;

export const PROMOS_DATA: PromoItem[] = [
  {
    id: 'promo-1',
    code: 'VEXATOPUP',
    title: 'Diskon Spesial Rp 20.000 All-Vault',
    description: 'Potongan harga langsung tanpa minimal transaksi untuk seluruh game vault tanpa batas jam operasional.',
    category: 'Diskon Langsung',
    discountType: 'fixed',
    discountValue: 'Rp 20.000',
    minSpendText: 'Tanpa Min. Belanja',
    validUntil: '31 Des 2026',
    quotaPercent: 82,
    quotaRemaining: 98,
    isHot: true,
    targetGameNames: ['Mobile Legends', 'Valorant', 'Free Fire', 'Genshin Impact'],
    primaryGameSlug: 'mobile-legends',
    terms: [
      'Berlaku untuk semua metode pembayaran (QRIS, E-Wallet, Virtual Account).',
      'Satu pengguna hanya dapat mengklaim 1x per hari.',
      'Potongan otomatis teraplikasi saat memasukkan kode di kolom checkout.'
    ]
  },
  {
    id: 'promo-2',
    code: 'FLASHWEEKEND',
    title: 'Flash Sale Weekend Rush 30% OFF',
    description: 'Promo kilat akhir pekan eksklusif untuk game kompetitif terpopuler dengan pengiriman kilat sub-15 detik.',
    category: 'Flash Sale',
    discountType: 'percent',
    discountValue: '30% OFF',
    minSpendText: 'Min. Belanja Rp 50.000',
    validUntil: 'Berakhir Hari Ini (23:59 WIB)',
    quotaPercent: 94,
    quotaRemaining: 24,
    isHot: true,
    isFlashSale: true,
    targetGameNames: ['Mobile Legends', 'Free Fire'],
    primaryGameSlug: 'mobile-legends',
    terms: [
      'Hanya berlaku pada hari Sabtu dan Minggu hingga pukul 23:59 WIB.',
      'Maksimal potongan harga Rp 35.000.',
      'Kuota kupon terbatas dan diperbarui setiap akhir pekan.'
    ]
  },
  {
    id: 'promo-3',
    code: 'VEXANEW',
    title: 'Welcome VIP Cashback 15%',
    description: 'Spesial transaksi perdana di VexaStore! Dapatkan saldo cashback instan ke akun atau saldo e-wallet.',
    category: 'Khusus Member Baru',
    discountType: 'cashback',
    discountValue: 'Cashback 15%',
    minSpendText: 'Min. Belanja Rp 25.000',
    validUntil: '31 Des 2026',
    quotaPercent: 65,
    quotaRemaining: 175,
    isHot: true,
    targetGameNames: ['Semua Game Vault'],
    primaryGameSlug: 'valorant',
    terms: [
      'Berlaku khusus untuk akun baru yang belum pernah menyelesaikan pesanan.',
      'Maksimal cashback senilai Rp 50.000.',
      'Cashback otomatis dikreditkan dalam waktu maksimal 5 menit setelah pembayaran terverifikasi.'
    ]
  },
  {
    id: 'promo-4',
    code: 'VCTCHAMPION',
    title: 'Valorant Radiant Pass Bundle Rp 35.000 OFF',
    description: 'Rayakan musim VCT dengan diskon langsung untuk denominasi Riot Points & Valorant Points nominal besar.',
    category: 'Diskon Langsung',
    discountType: 'fixed',
    discountValue: 'Rp 35.000',
    minSpendText: 'Min. Belanja Rp 100.000',
    validUntil: '15 Nov 2026',
    quotaPercent: 74,
    quotaRemaining: 52,
    targetGameNames: ['Valorant'],
    primaryGameSlug: 'valorant',
    terms: [
      'Khusus top-up Riot Points (Valorant) server Indonesia & APAC.',
      'Bisa digabungkan dengan metode pembayaran QRIS tanpa biaya tambahan.',
      'Berlaku untuk paket 1,650 Points ke atas.'
    ]
  },
  {
    id: 'promo-5',
    code: 'WELKINGENSHIN',
    title: 'Blessing of the Welkin Moon Subsidized',
    description: 'Subsidi resmi bulanan Genshin Impact! Dapatkan 300 Genesis Crystals & 90 Primogems harian lebih murah.',
    category: 'Diskon Langsung',
    discountType: 'fixed',
    discountValue: 'Rp 15.000',
    minSpendText: 'Khusus Paket Welkin',
    validUntil: '20 Nov 2026',
    quotaPercent: 88,
    quotaRemaining: 36,
    isHot: true,
    targetGameNames: ['Genshin Impact'],
    primaryGameSlug: 'genshin-impact',
    terms: [
      'Khusus pembelian Blessing of the Welkin Moon di VexaStore.',
      'Langsung masuk via UID resmi Hoyoverse tanpa perlu password.',
      'Batas klaim 1x per UID Hoyoverse per periode promo.'
    ]
  },
  {
    id: 'promo-6',
    code: 'HONKAIWARP',
    title: 'Starlight Express Pass 20% Cashback',
    description: 'Cashback 20% untuk pembelian Express Supply Pass & Oneiric Shard Honkai: Star Rail.',
    category: 'Cashback',
    discountType: 'cashback',
    discountValue: 'Cashback 20%',
    minSpendText: 'Min. Belanja Rp 60.000',
    validUntil: '25 Nov 2026',
    quotaPercent: 55,
    quotaRemaining: 90,
    targetGameNames: ['Honkai: Star Rail'],
    primaryGameSlug: 'honkai-star-rail',
    terms: [
      'Khusus transaksi UID Honkai: Star Rail server Asia / Global.',
      'Cashback dapat langsung dipakai untuk transaksi top-up berikutnya.',
      'Tidak dapat dipindahtangankan ke akun UID lain.'
    ]
  },
  {
    id: 'promo-7',
    code: 'ZEROFEEQRIS',
    title: 'Bebas Biaya Admin 100% via QRIS',
    description: 'Scan bebas biaya gateway admin hingga Rp 0 untuk seluruh bank (BCA, Mandiri, BRI, BNI) & E-Wallet (GoPay, OVO, Dana).',
    category: 'Diskon Langsung',
    discountType: 'admin_free',
    discountValue: 'Gratis Admin',
    minSpendText: 'Tanpa Min. Belanja',
    validUntil: 'Permanen 2026',
    quotaPercent: 40,
    quotaRemaining: 999,
    targetGameNames: ['Semua Game Vault'],
    terms: [
      'Otomatis terpotong saat memilih QRIS sebagai channel pembayaran.',
      'Berlaku untuk seluruh nominal top up tanpa batas kuota harian.',
      'Realtime settlement 24/7 otomatis dari bank Indonesia.'
    ]
  },
  {
    id: 'promo-8',
    code: 'BOOYAHPRO',
    title: 'Free Fire Booyah Pass Booster Rp 12.000 OFF',
    description: 'Dapatkan diskon khusus untuk pembelian diamond paket Booyah Pass Season terbaru.',
    category: 'Diskon Langsung',
    discountType: 'fixed',
    discountValue: 'Rp 12.000',
    minSpendText: 'Min. Belanja Rp 40.000',
    validUntil: '30 Nov 2026',
    quotaPercent: 79,
    quotaRemaining: 63,
    targetGameNames: ['Free Fire'],
    primaryGameSlug: 'free-fire',
    terms: [
      'Khusus top up Free Fire server Indonesia via User ID.',
      'Garansi pengiriman instan 5 detik resmi Garena.',
      'Bisa diklaim hingga 2 kali per minggu.'
    ]
  }
];
