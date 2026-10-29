export interface Denomination {
  id: string;
  name: string;
  amount: number;
  price: number;
  bonus?: string;
  isPopular?: boolean;
}

export interface GameItem {
  id: string;
  slug: string;
  name: string;
  publisher: string;
  category: 'mobile' | 'pc' | 'voucher';
  isPopular?: boolean;
  currencyName: string;
  currencyBadge: string;
  image: string;
  idRequirements: {
    needsUserId: boolean;
    needsZoneId: boolean;
    zoneLabel?: string;
    isRiotId?: boolean;
    voucherEmailOnly?: boolean;
    placeholder: string;
    zonePlaceholder?: string;
  };
  denominations: Denomination[];
}

export interface PaymentChannel {
  id: string;
  name: string;
  category: 'qris' | 'ewallet' | 'va';
  fee: number; // admin fee
  icon: string;
}

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  { id: 'qris', name: 'QRIS (All Payment)', category: 'qris', fee: 1000, icon: '⚡' },
  { id: 'gopay', name: 'GoPay', category: 'ewallet', fee: 1500, icon: '🟢' },
  { id: 'dana', name: 'DANA', category: 'ewallet', fee: 1500, icon: '🔵' },
  { id: 'shopeepay', name: 'ShopeePay', category: 'ewallet', fee: 1500, icon: '🟠' },
  { id: 'ovo', name: 'OVO', category: 'ewallet', fee: 1500, icon: '🟣' },
  { id: 'bca', name: 'BCA Virtual Account', category: 'va', fee: 2500, icon: '🏛️' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', category: 'va', fee: 2500, icon: '🏛️' },
  { id: 'bri', name: 'BRI Virtual Account', category: 'va', fee: 2500, icon: '🏛️' },
  { id: 'bni', name: 'BNI Virtual Account', category: 'va', fee: 2500, icon: '🏛️' },
];

export const ALL_GAMES: GameItem[] = [
  // 1. Mobile Legends: Bang Bang
  {
    id: 'mlbb',
    slug: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    category: 'mobile',
    isPopular: true,
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/mobile-legends.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server ID',
      placeholder: 'Contoh: 12345678',
      zonePlaceholder: 'Contoh: 2024'
    },
    denominations: [
      { id: 'ml-86', name: '86 Diamonds', amount: 86, price: 21500, isPopular: true },
      { id: 'ml-172', name: '172 Diamonds', amount: 172, price: 43000 },
      { id: 'ml-257', name: '257 Diamonds', amount: 257, price: 64500, bonus: '+15 Bonus' },
      { id: 'ml-344', name: '344 Diamonds', amount: 344, price: 86000 },
      { id: 'ml-wp', name: 'Weekly Diamond Pass', amount: 1, price: 28500, bonus: 'Best Deal', isPopular: true },
      { id: 'ml-starlight', name: 'Starlight Pass', amount: 1, price: 145000 },
    ]
  },

  // 2. Free Fire
  {
    id: 'ff',
    slug: 'free-fire',
    name: 'Free Fire',
    publisher: 'Garena',
    category: 'mobile',
    isPopular: true,
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/free-fire.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan Player ID Free Fire'
    },
    denominations: [
      { id: 'ff-70', name: '70 Diamonds', amount: 70, price: 9500 },
      { id: 'ff-140', name: '140 Diamonds', amount: 140, price: 19000 },
      { id: 'ff-355', name: '355 Diamonds', amount: 355, price: 47500, isPopular: true },
      { id: 'ff-720', name: '720 Diamonds', amount: 720, price: 95000, bonus: '+30 Bonus' },
      { id: 'ff-member-w', name: 'Membership Mingguan', amount: 1, price: 29000 },
      { id: 'ff-member-m', name: 'Membership Bulanan', amount: 1, price: 89000 },
    ]
  },

  // 3. Valorant
  {
    id: 'val',
    slug: 'valorant',
    name: 'Valorant',
    publisher: 'Riot Games',
    category: 'pc',
    isPopular: true,
    currencyName: 'Valorant Points',
    currencyBadge: 'Top Up VP',
    image: '/games/valorant.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      isRiotId: true,
      placeholder: 'Username#TAG (contoh: Vexa#IDN)'
    },
    denominations: [
      { id: 'val-475', name: '475 Points', amount: 475, price: 54000 },
      { id: 'val-1000', name: '1,000 Points', amount: 1000, price: 108000, isPopular: true },
      { id: 'val-2050', name: '2,050 Points', amount: 2050, price: 215000 },
      { id: 'val-3650', name: '3,650 Points', amount: 3650, price: 375000, bonus: 'Hemat 5%' },
    ]
  },

  // 4. Genshin Impact
  {
    id: 'genshin',
    slug: 'genshin-impact',
    name: 'Genshin Impact',
    publisher: 'Hoyoverse',
    category: 'mobile',
    isPopular: true,
    currencyName: 'Genesis Crystals',
    currencyBadge: 'Top Up Crystals',
    image: '/games/genshin-impact.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Contoh: 812345678',
      zonePlaceholder: 'Asia / America / Europe'
    },
    denominations: [
      { id: 'gi-welkin', name: 'Blessing of the Welkin Moon', amount: 1, price: 79000, isPopular: true },
      { id: 'gi-60', name: '60 Genesis Crystals', amount: 60, price: 16000 },
      { id: 'gi-330', name: '300+30 Crystals', amount: 330, price: 79000 },
      { id: 'gi-1090', name: '980+110 Crystals', amount: 1090, price: 245000 },
    ]
  },

  // 5. PUBG Mobile
  {
    id: 'pubgm',
    slug: 'pubg-mobile',
    name: 'PUBG Mobile',
    publisher: 'Level Infinite',
    category: 'mobile',
    isPopular: true,
    currencyName: 'Unknown Cash (UC)',
    currencyBadge: 'Top Up UC',
    image: '/games/pubg-mobile.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan UID PUBG Mobile'
    },
    denominations: [
      { id: 'pubg-60', name: '60 UC', amount: 60, price: 14500 },
      { id: 'pubg-325', name: '300 + 25 UC', amount: 325, price: 72000, isPopular: true },
      { id: 'pubg-660', name: '600 + 60 UC', amount: 660, price: 145000 },
    ]
  },

  // 6. Roblox
  {
    id: 'roblox',
    slug: 'roblox',
    name: 'Roblox (Robux)',
    publisher: 'Roblox Corp',
    category: 'pc',
    isPopular: true,
    currencyName: 'Robux',
    currencyBadge: 'Top Up Robux',
    image: '/games/roblox.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Username Akun Roblox'
    },
    denominations: [
      { id: 'rbx-80', name: '80 Robux', amount: 80, price: 16500 },
      { id: 'rbx-400', name: '400 Robux', amount: 400, price: 78000, isPopular: true },
      { id: 'rbx-800', name: '800 Robux', amount: 800, price: 155000 },
    ]
  },

  // 7. Steam Wallet Code IDR
  {
    id: 'steam',
    slug: 'steam-wallet',
    name: 'Steam Wallet Code IDR',
    publisher: 'Valve',
    category: 'voucher',
    isPopular: true,
    currencyName: 'IDR Wallet',
    currencyBadge: 'Voucher Kode',
    image: '/games/steam-wallet.jpg',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Kode'
    },
    denominations: [
      { id: 'stm-12', name: 'Steam Wallet Rp 12.000', amount: 12000, price: 14500 },
      { id: 'stm-45', name: 'Steam Wallet Rp 45.000', amount: 45000, price: 52000, isPopular: true },
      { id: 'stm-90', name: 'Steam Wallet Rp 90.000', amount: 90000, price: 104000 },
      { id: 'stm-250', name: 'Steam Wallet Rp 250.000', amount: 250000, price: 285000 },
    ]
  },

  // 8. Point Blank
  {
    id: 'pointblank',
    slug: 'point-blank',
    name: 'Point Blank',
    publisher: 'Zepetto',
    category: 'pc',
    currencyName: 'PB Cash',
    currencyBadge: 'Top Up Cash',
    image: '/games/point-blank.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan ID User PB'
    },
    denominations: [
      { id: 'pb-1200', name: '1,200 PB Cash', amount: 1200, price: 11000 },
      { id: 'pb-6000', name: '6,000 PB Cash', amount: 6000, price: 53000 },
      { id: 'pb-12000', name: '12,000 PB Cash', amount: 12000, price: 105000 },
    ]
  },

  // 9. EA SPORTS FC Mobile
  {
    id: 'fcmobile',
    slug: 'fc-mobile',
    name: 'EA SPORTS FC Mobile',
    publisher: 'Electronic Arts',
    category: 'mobile',
    currencyName: 'FC Points',
    currencyBadge: 'Top Up Points',
    image: '/games/fc-mobile.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan UID FC Mobile'
    },
    denominations: [
      { id: 'fc-100', name: '100 FC Points', amount: 100, price: 16000 },
      { id: 'fc-500', name: '500 FC Points', amount: 500, price: 79000 },
      { id: 'fc-1000', name: '1,050 FC Points', amount: 1050, price: 159000 },
    ]
  },

  // 10. eFootball 2025 Mobile
  {
    id: 'efootball',
    slug: 'efootball-mobile',
    name: 'eFootball 2025 Mobile',
    publisher: 'Konami',
    category: 'mobile',
    currencyName: 'eFootball Coins',
    currencyBadge: 'Top Up Coins',
    image: '/games/efootball-mobile.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan Konami ID / UID'
    },
    denominations: [
      { id: 'ef-130', name: '130 Coins', amount: 130, price: 16500 },
      { id: 'ef-550', name: '550 Coins', amount: 550, price: 69000 },
      { id: 'ef-1050', name: '1,050 Coins', amount: 1050, price: 135000 },
    ]
  },

  // 11. Honor of Kings
  {
    id: 'hok',
    slug: 'honor-of-kings',
    name: 'Honor of Kings',
    publisher: 'Level Infinite',
    category: 'mobile',
    isPopular: true,
    currencyName: 'Tokens',
    currencyBadge: 'Top Up Tokens',
    image: '/games/honor-of-kings.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan Player UID'
    },
    denominations: [
      { id: 'hok-80', name: '80 Tokens', amount: 80, price: 15000 },
      { id: 'hok-240', name: '240 Tokens', amount: 240, price: 45000 },
      { id: 'hok-800', name: '800 Tokens', amount: 800, price: 149000 },
    ]
  },

  // 12. Call of Duty: Mobile
  {
    id: 'codm',
    slug: 'call-of-duty-mobile',
    name: 'Call of Duty: Mobile',
    publisher: 'Garena',
    category: 'mobile',
    currencyName: 'CP (COD Points)',
    currencyBadge: 'Top Up CP',
    image: '/games/call-of-duty-mobile.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Masukkan OpenID CODM'
    },
    denominations: [
      { id: 'cod-53', name: '53 CP', amount: 53, price: 10000 },
      { id: 'cod-265', name: '265 CP', amount: 265, price: 50000 },
      { id: 'cod-530', name: '530 CP', amount: 530, price: 100000 },
    ]
  },

  // 13. Google Play Gift Card IDR
  {
    id: 'googleplay',
    slug: 'google-play-code',
    name: 'Google Play Gift Card IDR',
    publisher: 'Google',
    category: 'voucher',
    isPopular: true,
    currencyName: 'Saldo Play Store',
    currencyBadge: 'Voucher Kode',
    image: '/games/google-play-code.jpg',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Kode'
    },
    denominations: [
      { id: 'gp-20', name: 'Voucher Rp 20.000', amount: 20000, price: 21500 },
      { id: 'gp-50', name: 'Voucher Rp 50.000', amount: 50000, price: 53000 },
      { id: 'gp-100', name: 'Voucher Rp 100.000', amount: 100000, price: 105000 },
    ]
  },

  // 14. Honkai: Star Rail
  {
    id: 'hsr',
    slug: 'honkai-star-rail',
    name: 'Honkai: Star Rail',
    publisher: 'Hoyoverse',
    category: 'mobile',
    currencyName: 'Oneiric Shards',
    currencyBadge: 'Top Up Shards',
    image: '/games/honkai-star-rail.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'UID Akun HSR',
      zonePlaceholder: 'Asia / America / Europe'
    },
    denominations: [
      { id: 'hsr-pass', name: 'Express Supply Pass', amount: 1, price: 79000, isPopular: true },
      { id: 'hsr-60', name: '60 Oneiric Shards', amount: 60, price: 16000 },
      { id: 'hsr-330', name: '300+30 Shards', amount: 330, price: 79000 },
      { id: 'hsr-1090', name: '980+110 Shards', amount: 1090, price: 245000 },
    ]
  },

  // 15. Zenless Zone Zero
  {
    id: 'zzz',
    slug: 'zenless-zone-zero',
    name: 'Zenless Zone Zero',
    publisher: 'Hoyoverse',
    category: 'mobile',
    currencyName: 'Monochromes',
    currencyBadge: 'Top Up Monochromes',
    image: '/games/zenless-zone-zero.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'UID Akun ZZZ',
      zonePlaceholder: 'Asia / America / Europe'
    },
    denominations: [
      { id: 'zzz-pass', name: 'Inter-Knot Membership', amount: 1, price: 79000, isPopular: true },
      { id: 'zzz-60', name: '60 Monochromes', amount: 60, price: 16000 },
      { id: 'zzz-300', name: '300+30 Monochromes', amount: 330, price: 79000 },
      { id: 'zzz-980', name: '980+110 Monochromes', amount: 1090, price: 245000 },
    ]
  },

  // 16. Wuthering Waves
  {
    id: 'wuwa',
    slug: 'wuthering-waves',
    name: 'Wuthering Waves',
    publisher: 'Kuro Games',
    category: 'mobile',
    currencyName: 'Lunite',
    currencyBadge: 'Top Up Lunite',
    image: '/games/wuthering-waves.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'UID Akun Kuro',
      zonePlaceholder: 'Asia / SEA'
    },
    denominations: [
      { id: 'ww-pass', name: 'Lunite Subscription', amount: 1, price: 79000, isPopular: true },
      { id: 'ww-60', name: '60 Lunite', amount: 60, price: 16000 },
      { id: 'ww-300', name: '300+30 Lunite', amount: 330, price: 79000 },
      { id: 'ww-980', name: '980+110 Lunite', amount: 1090, price: 245000 },
    ]
  },

  // 17. Solo Leveling: Arise
  {
    id: 'sla',
    slug: 'solo-leveling-arise',
    name: 'Solo Leveling: Arise',
    publisher: 'Netmarble',
    category: 'mobile',
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/solo-leveling-arise.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Member Code / Account ID'
    },
    denominations: [
      { id: 'sla-pass', name: 'Hunter Pass', amount: 1, price: 145000, isPopular: true },
      { id: 'sla-50', name: '50 Diamonds', amount: 50, price: 15000 },
      { id: 'sla-250', name: '250 Diamonds', amount: 250, price: 75000 },
      { id: 'sla-500', name: '500 Diamonds', amount: 500, price: 149000 },
    ]
  },

  // 18. Eggy Party
  {
    id: 'eggy',
    slug: 'eggy-party',
    name: 'Eggy Party',
    publisher: 'NetEase Games',
    category: 'mobile',
    currencyName: 'Shiny Coins',
    currencyBadge: 'Top Up Coins',
    image: '/games/eggy-party.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'User ID Eggy'
    },
    denominations: [
      { id: 'eggy-60', name: '60 Shiny Coins', amount: 60, price: 15000 },
      { id: 'eggy-300', name: '300 Shiny Coins', amount: 300, price: 75000, isPopular: true },
      { id: 'eggy-680', name: '680 Shiny Coins', amount: 680, price: 149000 },
    ]
  },

  // 19. Brawl Stars
  {
    id: 'bs',
    slug: 'brawl-stars',
    name: 'Brawl Stars',
    publisher: 'Supercell',
    category: 'mobile',
    currencyName: 'Gems',
    currencyBadge: 'Top Up Gems',
    image: '/games/brawl-stars.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player Tag (#TAG)'
    },
    denominations: [
      { id: 'bs-30', name: '30 Gems', amount: 30, price: 32000 },
      { id: 'bs-80', name: '80 Gems', amount: 80, price: 79000, isPopular: true },
      { id: 'bs-170', name: '170 Gems', amount: 170, price: 159000 },
    ]
  },

  // 20. Clash of Clans
  {
    id: 'coc',
    slug: 'clash-of-clans',
    name: 'Clash of Clans',
    publisher: 'Supercell',
    category: 'mobile',
    currencyName: 'Gems',
    currencyBadge: 'Top Up Gems',
    image: '/games/clash-of-clans.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player Tag (#TAG)'
    },
    denominations: [
      { id: 'coc-80', name: '80 Gems', amount: 80, price: 16000 },
      { id: 'coc-500', name: '500 Gems', amount: 500, price: 79000, isPopular: true },
      { id: 'coc-1200', name: '1,200 Gems', amount: 1200, price: 159000 },
    ]
  },

  // 21. Clash Royale
  {
    id: 'cr',
    slug: 'clash-royale',
    name: 'Clash Royale',
    publisher: 'Supercell',
    category: 'mobile',
    currencyName: 'Gems',
    currencyBadge: 'Top Up Gems',
    image: '/games/clash-royale.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player Tag (#TAG)'
    },
    denominations: [
      { id: 'cr-80', name: '80 Gems', amount: 80, price: 16000 },
      { id: 'cr-500', name: '500 Gems', amount: 500, price: 79000, isPopular: true },
      { id: 'cr-1200', name: '1,200 Gems', amount: 1200, price: 159000 },
    ]
  },

  // 22. Ragnarok Origin
  {
    id: 'ro-origin',
    slug: 'ragnarok-origin',
    name: 'Ragnarok Origin',
    publisher: 'Gravity',
    category: 'mobile',
    currencyName: 'Nyan Berry',
    currencyBadge: 'Top Up Nyan Berry',
    image: '/games/ragnarok-origin.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Secret Code / UID',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'ro-60', name: '60 Nyan Berry', amount: 60, price: 16000 },
      { id: 'ro-300', name: '300 Nyan Berry', amount: 300, price: 79000, isPopular: true },
      { id: 'ro-600', name: '600 Nyan Berry', amount: 600, price: 159000 },
    ]
  },

  // 23. Ragnarok M: Eternal Love
  {
    id: 'ro-m',
    slug: 'ragnarok-m-eternal-love',
    name: 'Ragnarok M: Eternal Love',
    publisher: 'Gravity',
    category: 'mobile',
    currencyName: 'Big Cat Coins (BCC)',
    currencyBadge: 'Top Up BCC',
    image: '/games/ragnarok-m-eternal-love.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Character ID',
      zonePlaceholder: 'Eternal Love / Midnight Party'
    },
    denominations: [
      { id: 'rom-30', name: '30 BCC', amount: 30, price: 49000 },
      { id: 'rom-60', name: '60 BCC', amount: 60, price: 99000, isPopular: true },
      { id: 'rom-120', name: '120 BCC', amount: 120, price: 195000 },
    ]
  },

  // 24. Arena of Valor (AOV)
  {
    id: 'aov',
    slug: 'arena-of-valor',
    name: 'Arena of Valor (AOV)',
    publisher: 'Garena',
    category: 'mobile',
    currencyName: 'Vouchers',
    currencyBadge: 'Top Up Vouchers',
    image: '/games/arena-of-valor-aov-.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'OpenID AOV'
    },
    denominations: [
      { id: 'aov-40', name: '40 Vouchers', amount: 40, price: 10000 },
      { id: 'aov-200', name: '200 Vouchers', amount: 200, price: 50000, isPopular: true },
      { id: 'aov-400', name: '400 Vouchers', amount: 400, price: 100000 },
    ]
  },

  // 25. Higgs Domino Island
  {
    id: 'hdi',
    slug: 'higgs-domino-island',
    name: 'Higgs Domino Island',
    publisher: 'Higgs Games',
    category: 'mobile',
    currencyName: 'Koin Emas',
    currencyBadge: 'Top Up Koin',
    image: '/games/higgs-domino-island.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'User ID Akun'
    },
    denominations: [
      { id: 'hdi-30m', name: '30M Koin Emas', amount: 30, price: 5000 },
      { id: 'hdi-200m', name: '200M Koin Emas', amount: 200, price: 30000, isPopular: true },
      { id: 'hdi-1b', name: '1B (1 Miliar) Koin Emas', amount: 1000, price: 65000 },
    ]
  },

  // 26. League of Legends: Wild Rift
  {
    id: 'wildrift',
    slug: 'wild-rift',
    name: 'League of Legends: Wild Rift',
    publisher: 'Riot Games',
    category: 'mobile',
    currencyName: 'Wild Cores',
    currencyBadge: 'Top Up Wild Cores',
    image: '/games/league-of-legends-wild-rift.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      isRiotId: true,
      placeholder: 'Riot ID (contoh: Summoner#IDN)'
    },
    denominations: [
      { id: 'wr-425', name: '425 Wild Cores', amount: 425, price: 54000 },
      { id: 'wr-1000', name: '1,000 Wild Cores', amount: 1000, price: 108000, isPopular: true },
      { id: 'wr-2050', name: '2,050 Wild Cores', amount: 2050, price: 215000 },
    ]
  },

  // 27. Apex Legends
  {
    id: 'apex',
    slug: 'apex-legends',
    name: 'Apex Legends',
    publisher: 'Electronic Arts',
    category: 'pc',
    currencyName: 'Apex Coins',
    currencyBadge: 'Top Up Apex Coins',
    image: '/games/apex-legends-pc.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'EA Account ID / GamerTag'
    },
    denominations: [
      { id: 'apx-1000', name: '1,000 Apex Coins', amount: 1000, price: 155000, isPopular: true },
      { id: 'apx-2150', name: '2,150 Apex Coins', amount: 2150, price: 310000 },
      { id: 'apx-4350', name: '4,350 Apex Coins', amount: 4350, price: 590000 },
    ]
  },

  // 28. Metal Slug: Awakening
  {
    id: 'metalslug',
    slug: 'metal-slug-awakening',
    name: 'Metal Slug: Awakening',
    publisher: 'VNGGames',
    category: 'mobile',
    currencyName: 'Ruby',
    currencyBadge: 'Top Up Ruby',
    image: '/games/metal-slug-awakening.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Karakter ID',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'ms-60', name: '60 Ruby', amount: 60, price: 15000 },
      { id: 'ms-300', name: '300 Ruby', amount: 300, price: 75000, isPopular: true },
      { id: 'ms-680', name: '680 Ruby', amount: 680, price: 149000 },
    ]
  },

  // 29. Goddess of Victory: Nikke
  {
    id: 'nikke',
    slug: 'goddess-of-victory-nikke',
    name: 'Goddess of Victory: Nikke',
    publisher: 'Level Infinite',
    category: 'mobile',
    currencyName: 'Gems',
    currencyBadge: 'Top Up Gems',
    image: '/games/goddess-of-victory-nikke.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'UID Komandan',
      zonePlaceholder: 'Global / SEA'
    },
    denominations: [
      { id: 'nk-pass', name: '30-Day Monthly Pass', amount: 1, price: 79000, isPopular: true },
      { id: 'nk-320', name: '320 Gems', amount: 320, price: 75000 },
      { id: 'nk-720', name: '720 Gems', amount: 720, price: 159000 },
    ]
  },

  // 30. Black Clover M
  {
    id: 'bcm',
    slug: 'black-clover-m',
    name: 'Black Clover M',
    publisher: 'Garena',
    category: 'mobile',
    currencyName: 'Black Crystals',
    currencyBadge: 'Top Up Crystals',
    image: '/games/black-clover-m.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'UID Penyihir'
    },
    denominations: [
      { id: 'bcm-60', name: '60 Black Crystals', amount: 60, price: 16000 },
      { id: 'bcm-300', name: '300 Black Crystals', amount: 300, price: 79000, isPopular: true },
      { id: 'bcm-600', name: '600 Black Crystals', amount: 600, price: 159000 },
    ]
  },

  // 31. Identity V
  {
    id: 'idv',
    slug: 'identity-v',
    name: 'Identity V',
    publisher: 'NetEase Games',
    category: 'mobile',
    currencyName: 'Echoes',
    currencyBadge: 'Top Up Echoes',
    image: '/games/identity-v.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'User ID',
      zonePlaceholder: 'Asia / NA-EU'
    },
    denominations: [
      { id: 'idv-60', name: '60 Echoes', amount: 60, price: 15000 },
      { id: 'idv-300', name: '300 Echoes', amount: 300, price: 75000, isPopular: true },
      { id: 'idv-680', name: '680 Echoes', amount: 680, price: 149000 },
    ]
  },

  // 32. Undawn
  {
    id: 'undawn',
    slug: 'undawn',
    name: 'Undawn',
    publisher: 'Garena',
    category: 'mobile',
    currencyName: 'RC',
    currencyBadge: 'Top Up RC',
    image: '/games/undawn.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player ID Undawn'
    },
    denominations: [
      { id: 'un-60', name: '60 RC', amount: 60, price: 15000 },
      { id: 'un-300', name: '300 RC', amount: 300, price: 75000, isPopular: true },
      { id: 'un-680', name: '680 RC', amount: 680, price: 149000 },
    ]
  },

  // 33. LifeAfter
  {
    id: 'lifeafter',
    slug: 'lifeafter',
    name: 'LifeAfter',
    publisher: 'NetEase Games',
    category: 'mobile',
    currencyName: 'Fed Credits',
    currencyBadge: 'Top Up Credits',
    image: '/games/lifeafter.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Account ID',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'la-65', name: '65 Fed Credits', amount: 65, price: 16000 },
      { id: 'la-330', name: '330 Fed Credits', amount: 330, price: 79000, isPopular: true },
      { id: 'la-680', name: '680 Fed Credits', amount: 680, price: 159000 },
    ]
  },

  // 34. Dragon Raja
  {
    id: 'draja',
    slug: 'dragon-raja',
    name: 'Dragon Raja',
    publisher: 'Archosaur Games',
    category: 'mobile',
    currencyName: 'Coupons',
    currencyBadge: 'Top Up Coupons',
    image: '/games/dragon-raja.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Character ID'
    },
    denominations: [
      { id: 'dr-60', name: '60 Coupons', amount: 60, price: 15000 },
      { id: 'dr-300', name: '300 Coupons', amount: 300, price: 75000, isPopular: true },
      { id: 'dr-600', name: '600 Coupons', amount: 600, price: 149000 },
    ]
  },

  // 35. Sausage Man
  {
    id: 'sausageman',
    slug: 'sausage-man',
    name: 'Sausage Man',
    publisher: 'XD Entertainment',
    category: 'mobile',
    currencyName: 'Candies',
    currencyBadge: 'Top Up Candies',
    image: '/games/sausage-man.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Character ID'
    },
    denominations: [
      { id: 'sm-60', name: '60 Candies', amount: 60, price: 15000 },
      { id: 'sm-300', name: '300 Candies', amount: 300, price: 75000, isPopular: true },
      { id: 'sm-680', name: '680 Candies', amount: 680, price: 149000 },
    ]
  },

  // 36. Mobile Legends: Adventure
  {
    id: 'mla',
    slug: 'mobile-legends-adventure',
    name: 'Mobile Legends: Adventure',
    publisher: 'Moonton',
    category: 'mobile',
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/mobile-legends-adventure.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server ID',
      placeholder: 'User ID',
      zonePlaceholder: 'Server ID'
    },
    denominations: [
      { id: 'mla-50', name: '50 Diamonds', amount: 50, price: 15000 },
      { id: 'mla-250', name: '250 Diamonds', amount: 250, price: 75000, isPopular: true },
      { id: 'mla-500', name: '500 Diamonds', amount: 500, price: 149000 },
    ]
  },

  // 37. Lords Mobile
  {
    id: 'lordsmobile',
    slug: 'lords-mobile',
    name: 'Lords Mobile',
    publisher: 'IGG',
    category: 'mobile',
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/lord-mobile.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'IGG ID'
    },
    denominations: [
      { id: 'lm-60', name: '60 Diamonds', amount: 60, price: 15000 },
      { id: 'lm-300', name: '300 Diamonds', amount: 300, price: 75000, isPopular: true },
      { id: 'lm-600', name: '600 Diamonds', amount: 600, price: 149000 },
    ]
  },

  // 38. State of Survival
  {
    id: 'sos',
    slug: 'state-of-survival',
    name: 'State of Survival',
    publisher: 'FunPlus',
    category: 'mobile',
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/state-of-survival.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'State ID / Player ID'
    },
    denominations: [
      { id: 'sos-60', name: '60 Diamonds', amount: 60, price: 15000 },
      { id: 'sos-300', name: '300 Diamonds', amount: 300, price: 75000, isPopular: true },
      { id: 'sos-600', name: '600 Diamonds', amount: 600, price: 149000 },
    ]
  },

  // 39. League of Legends (PC)
  {
    id: 'lol-pc',
    slug: 'league-of-legends',
    name: 'League of Legends (PC)',
    publisher: 'Riot Games',
    category: 'pc',
    currencyName: 'Riot Points (RP)',
    currencyBadge: 'Top Up RP',
    image: '/games/league-of-legends-pc.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      isRiotId: true,
      placeholder: 'Riot ID (Summoner#TAG)'
    },
    denominations: [
      { id: 'lol-575', name: '575 RP', amount: 575, price: 54000 },
      { id: 'lol-1350', name: '1,350 RP', amount: 1350, price: 120000, isPopular: true },
      { id: 'lol-2800', name: '2,800 RP', amount: 2800, price: 245000 },
    ]
  },

  // 40. Overwatch 2
  {
    id: 'ow2',
    slug: 'overwatch-2',
    name: 'Overwatch 2',
    publisher: 'Blizzard',
    category: 'pc',
    currencyName: 'Overwatch Coins',
    currencyBadge: 'Top Up Coins',
    image: '/games/overwatch-2.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'BattleTag#1234'
    },
    denominations: [
      { id: 'ow-500', name: '500 Coins', amount: 500, price: 79000 },
      { id: 'ow-1000', name: '1,000 Coins', amount: 1000, price: 155000, isPopular: true },
      { id: 'ow-2200', name: '2,200 Coins', amount: 2200, price: 310000 },
    ]
  },

  // 41. Black Desert Online
  {
    id: 'bdo',
    slug: 'black-desert-online',
    name: 'Black Desert Online',
    publisher: 'Pearl Abyss',
    category: 'pc',
    currencyName: 'Acoin',
    currencyBadge: 'Top Up Acoin',
    image: '/games/black-desert-online.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Pearl Abyss ID'
    },
    denominations: [
      { id: 'bdo-100', name: '100 Acoin', amount: 100, price: 30000 },
      { id: 'bdo-320', name: '320 Acoin', amount: 320, price: 95000, isPopular: true },
      { id: 'bdo-640', name: '640 Acoin', amount: 640, price: 190000 },
    ]
  },

  // 42. Rainbow Six Siege
  {
    id: 'r6',
    slug: 'rainbow-six-siege',
    name: 'Rainbow Six Siege',
    publisher: 'Ubisoft',
    category: 'pc',
    currencyName: 'R6 Credits',
    currencyBadge: 'Top Up R6 Credits',
    image: '/games/rainbow-six-siege.jpg',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Ubisoft Connect Username'
    },
    denominations: [
      { id: 'r6-600', name: '600 Credits', amount: 600, price: 79000 },
      { id: 'r6-1200', name: '1,200 Credits', amount: 1200, price: 155000, isPopular: true },
      { id: 'r6-2670', name: '2,670 Credits', amount: 2670, price: 310000 },
    ]
  },

  // 43. Tarisland
  {
    id: 'tarisland',
    slug: 'tarisland',
    name: 'Tarisland',
    publisher: 'Tencent Games',
    category: 'pc',
    currencyName: 'Crystals',
    currencyBadge: 'Top Up Crystals',
    image: '/games/tarisland.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Role ID',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'tar-60', name: '60 Crystals', amount: 60, price: 15000 },
      { id: 'tar-300', name: '300 Crystals', amount: 300, price: 75000, isPopular: true },
      { id: 'tar-600', name: '600 Crystals', amount: 600, price: 149000 },
    ]
  },

  // 44. PlayStation Store Gift Card
  {
    id: 'psn',
    slug: 'playstation-network',
    name: 'PlayStation Store Gift Card',
    publisher: 'Sony Interactive Entertainment',
    category: 'voucher',
    isPopular: true,
    currencyName: 'Saldo Wallet PSN',
    currencyBadge: 'Voucher Kode',
    image: '/games/playstation-network-card-psn-.jpg',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Voucher'
    },
    denominations: [
      { id: 'psn-100', name: 'PSN IDR 100.000', amount: 100000, price: 105000 },
      { id: 'psn-400', name: 'PSN IDR 400.000', amount: 400000, price: 415000, isPopular: true },
      { id: 'psn-600', name: 'PSN IDR 600.000', amount: 600000, price: 620000 },
    ]
  },

  // 45. Nintendo eShop Card
  {
    id: 'eshop',
    slug: 'nintendo-eshop',
    name: 'Nintendo eShop Card',
    publisher: 'Nintendo',
    category: 'voucher',
    currencyName: 'eShop Funds',
    currencyBadge: 'Voucher Kode',
    image: '/games/nintendo-eshop-card.jpg',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Voucher'
    },
    denominations: [
      { id: 'nes-10', name: 'eShop $10 USD', amount: 10, price: 165000 },
      { id: 'nes-20', name: 'eShop $20 USD', amount: 20, price: 325000, isPopular: true },
      { id: 'nes-35', name: 'eShop $35 USD', amount: 35, price: 565000 },
    ]
  },

  // 46. Xbox Game Pass
  {
    id: 'xbox',
    slug: 'xbox-game-pass',
    name: 'Xbox Game Pass / Gift Card',
    publisher: 'Microsoft',
    category: 'voucher',
    currencyName: 'Xbox Saldo / Sub',
    currencyBadge: 'Voucher Kode',
    image: '/games/xbox-game-pass-gift-card.jpg',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Voucher'
    },
    denominations: [
      { id: 'xb-pass', name: 'PC Game Pass 1 Bulan', amount: 1, price: 65000, isPopular: true },
      { id: 'xb-ult', name: 'Xbox Ultimate 1 Bulan', amount: 1, price: 155000 },
      { id: 'xb-15', name: 'Xbox $15 USD Card', amount: 15, price: 245000 },
    ]
  },

  // 47. UniPin Voucher
  {
    id: 'unipin',
    slug: 'unipin-voucher',
    name: 'UniPin Voucher',
    publisher: 'UniPin',
    category: 'voucher',
    currencyName: 'UniPin Credits',
    currencyBadge: 'Voucher Kode',
    image: '/games/unipin-voucher.png',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Kode'
    },
    denominations: [
      { id: 'uni-10', name: 'UniPin 10.000 UniPass', amount: 10000, price: 11000 },
      { id: 'uni-50', name: 'UniPin 50.000 UniPass', amount: 50000, price: 53000, isPopular: true },
      { id: 'uni-100', name: 'UniPin 100.000 UniPass', amount: 100000, price: 105000 },
    ]
  },

  // 48. Razer Gold IDR
  {
    id: 'razer',
    slug: 'razer-gold',
    name: 'Razer Gold IDR',
    publisher: 'Razer',
    category: 'voucher',
    currencyName: 'Razer Gold PIN',
    currencyBadge: 'Voucher Kode',
    image: '/games/razer-gold-idr.png',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman PIN'
    },
    denominations: [
      { id: 'rz-20', name: 'Razer Gold Rp 20.000', amount: 20000, price: 21500 },
      { id: 'rz-50', name: 'Razer Gold Rp 50.000', amount: 50000, price: 53000, isPopular: true },
      { id: 'rz-100', name: 'Razer Gold Rp 100.000', amount: 100000, price: 105000 },
    ]
  },

  // 49. Discord Nitro
  {
    id: 'discord',
    slug: 'discord-nitro',
    name: 'Discord Nitro Gift',
    publisher: 'Discord',
    category: 'voucher',
    currencyName: 'Subscription',
    currencyBadge: 'Voucher Kode',
    image: '/games/discord-nitro-gift.png',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Gift Link'
    },
    denominations: [
      { id: 'disc-basic', name: 'Nitro Basic 1 Bulan', amount: 1, price: 42000 },
      { id: 'disc-boost', name: 'Nitro Full 2 Server Boosts (1 Bulan)', amount: 1, price: 115000, isPopular: true },
    ]
  },

  // 50. Spotify Premium
  {
    id: 'spotify',
    slug: 'spotify-premium',
    name: 'Spotify Premium Voucher',
    publisher: 'Spotify',
    category: 'voucher',
    currencyName: 'Subscription',
    currencyBadge: 'Voucher Kode',
    image: '/games/spotify-premium-voucher.png',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Voucher'
    },
    denominations: [
      { id: 'spt-1m', name: 'Individual 1 Bulan', amount: 1, price: 55000, isPopular: true },
      { id: 'spt-3m', name: 'Individual 3 Bulan', amount: 3, price: 165000 },
    ]
  },

  // 51. Vidio Premier Platinum
  {
    id: 'vidio',
    slug: 'vidio-premier',
    name: 'Vidio Premier Platinum',
    publisher: 'Vidio',
    category: 'voucher',
    currencyName: 'Langganan',
    currencyBadge: 'Voucher Kode',
    image: '/games/vidio-premier-platinum.png',
    idRequirements: {
      needsUserId: false,
      needsZoneId: false,
      voucherEmailOnly: true,
      placeholder: 'Masukkan Email Pengiriman Kode'
    },
    denominations: [
      { id: 'vid-30d', name: 'Platinum 30 Hari', amount: 1, price: 39000, isPopular: true },
      { id: 'vid-f1', name: 'Platinum + F1 30 Hari', amount: 1, price: 59000 },
    ]
  },

  // 52. Blood Strike
  {
    id: 'bloodstrike',
    slug: 'blood-strike',
    name: 'Blood Strike',
    publisher: 'NetEase Games',
    category: 'mobile',
    currencyName: 'Gold',
    currencyBadge: 'Top Up Gold',
    image: '/games/blood-strike.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'User ID Blood Strike'
    },
    denominations: [
      { id: 'bsk-100', name: '100 Gold', amount: 100, price: 16000 },
      { id: 'bsk-500', name: '500 Gold', amount: 500, price: 79000, isPopular: true },
      { id: 'bsk-1000', name: '1,000 Gold', amount: 1000, price: 155000 },
    ]
  },

  // 53. Arena Breakout
  {
    id: 'abrk',
    slug: 'arena-breakout',
    name: 'Arena Breakout',
    publisher: 'MoreFun Studios',
    category: 'mobile',
    currencyName: 'Bonds',
    currencyBadge: 'Top Up Bonds',
    image: '/games/arena-breakout.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player ID Arena Breakout'
    },
    denominations: [
      { id: 'ab-60', name: '60 Bonds', amount: 60, price: 15000 },
      { id: 'ab-310', name: '310 Bonds', amount: 310, price: 75000, isPopular: true },
      { id: 'ab-630', name: '630 Bonds', amount: 630, price: 149000 },
    ]
  },

  // 54. Farlight 84
  {
    id: 'fl84',
    slug: 'farlight-84',
    name: 'Farlight 84',
    publisher: 'Farlight Games',
    category: 'mobile',
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/farlight-84.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player ID Farlight 84'
    },
    denominations: [
      { id: 'fl-60', name: '60 Diamonds', amount: 60, price: 15000 },
      { id: 'fl-300', name: '300 Diamonds', amount: 300, price: 75000, isPopular: true },
      { id: 'fl-600', name: '600 Diamonds', amount: 600, price: 149000 },
    ]
  },

  // 55. Tower of Fantasy
  {
    id: 'tof',
    slug: 'tower-of-fantasy',
    name: 'Tower of Fantasy',
    publisher: 'Level Infinite',
    category: 'mobile',
    currencyName: 'Tanium',
    currencyBadge: 'Top Up Tanium',
    image: '/games/tower-of-fantasy.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'UID Karakter',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'tof-pass', name: 'Monthly Pass', amount: 1, price: 79000, isPopular: true },
      { id: 'tof-60', name: '60 Tanium', amount: 60, price: 16000 },
      { id: 'tof-300', name: '300 Tanium', amount: 300, price: 79000 },
    ]
  },

  // 56. Ragnarok X: Next Generation
  {
    id: 'rox',
    slug: 'ragnarok-x',
    name: 'Ragnarok X: Next Generation',
    publisher: 'Gravity',
    category: 'mobile',
    currencyName: 'Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/ragnarok-x-next-generation.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Role ID',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'rox-32', name: '3,200 Diamonds', amount: 3200, price: 16000 },
      { id: 'rox-160', name: '16,000 Diamonds', amount: 16000, price: 79000, isPopular: true },
      { id: 'rox-320', name: '32,000 Diamonds', amount: 32000, price: 159000 },
    ]
  },

  // 57. Pokémon GO
  {
    id: 'pokego',
    slug: 'pokemon-go',
    name: 'Pokémon GO',
    publisher: 'Niantic',
    category: 'mobile',
    currencyName: 'PokéCoins',
    currencyBadge: 'Top Up PokéCoins',
    image: '/games/pokemon-go.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Trainer Code / Email Akun'
    },
    denominations: [
      { id: 'pgo-100', name: '100 PokéCoins', amount: 100, price: 15000 },
      { id: 'pgo-550', name: '550 PokéCoins', amount: 550, price: 75000, isPopular: true },
      { id: 'pgo-1200', name: '1,200 PokéCoins', amount: 1200, price: 155000 },
    ]
  },

  // 58. Pokémon UNITE
  {
    id: 'pokeunite',
    slug: 'pokemon-unite',
    name: 'Pokémon UNITE',
    publisher: 'The Pokémon Company',
    category: 'mobile',
    currencyName: 'Aeos Gems',
    currencyBadge: 'Top Up Gems',
    image: '/games/pokemon-unite.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player Support ID'
    },
    denominations: [
      { id: 'pu-60', name: '60 Aeos Gems', amount: 60, price: 15000 },
      { id: 'pu-245', name: '245 Aeos Gems', amount: 245, price: 59000, isPopular: true },
      { id: 'pu-490', name: '490 Aeos Gems', amount: 490, price: 119000 },
    ]
  },

  // 59. MARVEL SNAP
  {
    id: 'msnap',
    slug: 'marvel-snap',
    name: 'MARVEL SNAP',
    publisher: 'Nuverse',
    category: 'mobile',
    currencyName: 'Gold',
    currencyBadge: 'Top Up Gold',
    image: '/games/marvel-snap.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Snap ID'
    },
    denominations: [
      { id: 'ms-300', name: '300 Gold', amount: 300, price: 75000 },
      { id: 'ms-700', name: '700 Gold', amount: 700, price: 155000, isPopular: true },
      { id: 'ms-1450', name: '1,450 Gold', amount: 1450, price: 310000 },
    ]
  },

  // 60. TFT: Teamfight Tactics
  {
    id: 'tft',
    slug: 'teamfight-tactics',
    name: 'TFT: Teamfight Tactics',
    publisher: 'Riot Games',
    category: 'mobile',
    currencyName: 'TFT Coins',
    currencyBadge: 'Top Up Coins',
    image: '/games/tft-teamfight-tactics.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      isRiotId: true,
      placeholder: 'Riot ID (contoh: Tactician#IDN)'
    },
    denominations: [
      { id: 'tft-575', name: '575 TFT Coins', amount: 575, price: 54000 },
      { id: 'tft-1350', name: '1,350 TFT Coins', amount: 1350, price: 120000, isPopular: true },
    ]
  },

  // 61. ONE PIECE Bounty Rush
  {
    id: 'opbr',
    slug: 'one-piece-bounty-rush',
    name: 'ONE PIECE Bounty Rush',
    publisher: 'Bandai Namco',
    category: 'mobile',
    currencyName: 'Rainbow Diamonds',
    currencyBadge: 'Top Up Diamonds',
    image: '/games/one-piece-bounty-rush.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player ID Akun'
    },
    denominations: [
      { id: 'op-10', name: '10 Rainbow Diamonds', amount: 10, price: 32000 },
      { id: 'op-50', name: '50 Rainbow Diamonds', amount: 50, price: 149000, isPopular: true },
    ]
  },

  // 62. DRAGON BALL Z DOKKAN BATTLE
  {
    id: 'dbz',
    slug: 'dragon-ball-z',
    name: 'DRAGON BALL Z DOKKAN BATTLE',
    publisher: 'Bandai Namco',
    category: 'mobile',
    currencyName: 'Dragon Stones',
    currencyBadge: 'Top Up Stones',
    image: '/games/dragon-ball-z-dokkan-battle.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'User ID Dokkan'
    },
    denominations: [
      { id: 'dbz-12', name: '12 Dragon Stones', amount: 12, price: 49000 },
      { id: 'dbz-32', name: '32 Dragon Stones', amount: 32, price: 125000, isPopular: true },
    ]
  },

  // 63. Minecraft
  {
    id: 'mc',
    slug: 'minecraft',
    name: 'Minecraft (Minecoins)',
    publisher: 'Mojang Studios',
    category: 'mobile',
    currencyName: 'Minecoins',
    currencyBadge: 'Top Up Minecoins',
    image: '/games/minecraft.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Microsoft GamerTag / Akun'
    },
    denominations: [
      { id: 'mc-320', name: '320 Minecoins', amount: 320, price: 35000 },
      { id: 'mc-1020', name: '1,020 Minecoins', amount: 1020, price: 99000, isPopular: true },
      { id: 'mc-1720', name: '1,720 Minecoins', amount: 1720, price: 165000 },
    ]
  },

  // 64. PUBG: NEW STATE
  {
    id: 'pubg-ns',
    slug: 'pubg-new-state',
    name: 'PUBG: NEW STATE',
    publisher: 'KRAFTON',
    category: 'mobile',
    currencyName: 'NC',
    currencyBadge: 'Top Up NC',
    image: '/games/pubg-new-state.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Account ID'
    },
    denominations: [
      { id: 'pns-60', name: '60 NC', amount: 60, price: 15000 },
      { id: 'pns-300', name: '300 NC', amount: 300, price: 75000, isPopular: true },
      { id: 'pns-600', name: '600 NC', amount: 600, price: 149000 },
    ]
  },

  // 65. Asphalt Legends Unite
  {
    id: 'asphalt',
    slug: 'asphalt-legends-unite',
    name: 'Asphalt Legends Unite',
    publisher: 'Gameloft',
    category: 'mobile',
    currencyName: 'Tokens',
    currencyBadge: 'Top Up Tokens',
    image: '/games/asphalt-legends-unite.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: false,
      placeholder: 'Player ID'
    },
    denominations: [
      { id: 'asp-100', name: '100 Tokens', amount: 100, price: 29000 },
      { id: 'asp-500', name: '500 Tokens', amount: 500, price: 145000, isPopular: true },
    ]
  },

  // 66. Saint Seiya Awakening
  {
    id: 'seiya',
    slug: 'saint-seiya-awakening',
    name: 'Saint Seiya Awakening',
    publisher: 'YOOZOO Games',
    category: 'mobile',
    currencyName: 'Coupons',
    currencyBadge: 'Top Up Coupons',
    image: '/games/saint-seiya-awakening.png',
    idRequirements: {
      needsUserId: true,
      needsZoneId: true,
      zoneLabel: 'Server',
      placeholder: 'Role ID',
      zonePlaceholder: 'Pilih Server'
    },
    denominations: [
      { id: 'ssa-60', name: '60 Coupons', amount: 60, price: 16000 },
      { id: 'ssa-300', name: '300 Coupons', amount: 300, price: 79000, isPopular: true },
    ]
  }
];
