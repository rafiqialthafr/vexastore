export interface ArticleSection {
  heading: string;
  body: string[];
  highlightBox?: {
    title: string;
    text: string;
    type?: 'gold' | 'info' | 'alert';
  };
  quote?: {
    text: string;
    speaker: string;
  };
  stats?: {
    label: string;
    value: string;
    desc: string;
  }[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Meta & Patch' | 'Esports & Turnamen' | 'Panduan & Tips' | 'Keamanan & Finansial' | 'Tren Industri' | 'Event Resmi';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  views: string;
  image: string;
  featured?: boolean;
  tags: string[];
  relatedGame?: {
    name: string;
    slug: string;
    actionLabel: string;
    priceStarting: string;
  };
  content: {
    lead: string;
    sections: ArticleSection[];
    conclusion: string;
  };
}

export const ARTICLE_CATEGORIES = [
  'Semua Artikel',
  'Meta & Patch',
  'Esports & Turnamen',
  'Panduan & Tips',
  'Keamanan & Finansial',
  'Tren Industri',
] as const;

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'analisis-meta-mlbb-season-terbaru-assassin-jungler',
    title: 'Analisis Meta MLBB 2026: Dominasi Assassin Jungler & Optimalisasi Weekly Diamond Pass',
    excerpt: 'Eksplorasi mendalam pergeseran tempo permainan pasca-patch turnamen internasional, prioritas objektif Lord 12 menit, serta kalkulasi penghematan Weekly Diamond Pass untuk efisiensi roster.',
    category: 'Meta & Patch',
    author: {
      name: 'Rian "Tactics" Pratama',
      role: 'Principal Esports Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    publishedAt: '31 Oktober 2026',
    readTime: '5 menit baca',
    views: '14.8K',
    image: '/banners/banner_mlbb.jpg',
    featured: true,
    tags: ['Mobile Legends', 'Meta Patch', 'Weekly Diamond Pass', 'Esports Strategy'],
    relatedGame: {
      name: 'Mobile Legends: Bang Bang',
      slug: 'mobile-legends',
      actionLabel: 'Top Up WDP Hemat',
      priceStarting: 'Rp 27.500',
    },
    content: {
      lead: 'Perubahan mekanisme retribution dan scaling damage monster hutan pada pembaruan kompetitif terbaru telah mengembalikan era keemasan hero assassin dengan mobilitas tinggi. Bagi player publik maupun squad turnamen, pemahaman micro-macro ini krusial untuk mengamankan win-rate di rank Mythical Immortal.',
      sections: [
        {
          heading: '1. Pergeseran Ritme Permainan: Dari Tank Slower ke High-Burst Invade',
          body: [
            'Jika pada musim sebelumnya jungle didominasi hero tank dengan durabilitas tinggi yang bermain aman hingga late game, patch terkini memangkas base HP monster hutan minor sebesar 8%. Hal ini memberikan ruang eksplosif bagi hero seperti Ling, Hayabusa, dan Fanny untuk membersihkan camp dalam waktu di bawah 45 detik.',
            'Kecepatan farming ini memungkinkan jungler melakukan rotasi ganking ke lane gold sebelum turtle pertama muncul pada menit ke-2. Squad yang memenangkan duel pertama ini tercatat memiliki probabilitas kemenangan pertandingan hingga 78.4% menurut telemetri internal turnamen.',
          ],
          stats: [
            { label: 'Win Rate Early Turtle', value: '78.4%', desc: 'Tim pemenang duel pertama' },
            { label: 'Jungle Clear Speed', value: '42.5s', desc: 'Rata-rata assassin tier-S' },
            { label: 'Efisiensi WDP', value: '3.8x', desc: 'Nilai per rupiah vs top up satuan' },
          ],
        },
        {
          heading: '2. Ekonomi Akun: Mengapa Weekly Diamond Pass Wajib Dimiliki Setiap Musim',
          body: [
            'Banyak gamer kasual yang menghabiskan ratusan ribu rupiah secara mendadak saat event kolaborasi tiba. Padahal, manajemen budget bulanan dengan Weekly Diamond Pass (WDP) memberikan total 210 Diamond plus 70 Crystal of Aurora dan bundle reward harian hanya dengan modal di bawah Rp 30 ribu.',
            'Dengan mengaktifkan WDP secara berkala di VexaStore, Anda mengumpulkan cadangan diamond dengan harga per unit paling murah di pasar resmi Indonesia tanpa risiko banned atau pemotongan akun.',
          ],
          highlightBox: {
            title: 'Rekomendasi Strategi Finansial VexaStore',
            text: 'Aktifkan maksimal 10 minggu akumulasi WDP untuk mengamankan kuota Starlight bulanan dan tabungan skin The Aspirants tanpa perlu melakukan top up satuan bernilai tinggi.',
            type: 'gold',
          },
          quote: {
            text: 'Konsistensi akumulasi mikro-resource selalu mengalahkan impulsive buying. Pemain profesional mengelola diamond sama disiplinnya dengan mereka mengelola gold ingame.',
            speaker: 'Coach Kenshiro — Pelatih Divisi Pro Vexa Gaming',
          },
        },
      ],
      conclusion: 'Menguasai meta tidak hanya soal mekanik jari, tetapi juga kecerdasan memanfaatkan momentum ekonomi ingame. Pastikan selalu mengisi saldo melalui gateway legal resmi untuk menjaga reputasi dan keamanan akun kebanggaan Anda.',
    },
  },
  {
    id: 'art-2',
    slug: 'protokol-keamanan-api-vexastore-zero-risk-banned',
    title: 'Arsitektur Gateway VexaStore 2026: Mengapa Top-Up Direct API 100% Bebas Risiko Banned',
    excerpt: 'Penjelasan arsitektur integrasi direct-to-publisher via secure encrypted webhook yang menjamin legalitas penuh diamond & voucher tanpa pihak ketiga ilegal.',
    category: 'Keamanan & Finansial',
    author: {
      name: 'Alexander Wicaksana',
      role: 'VP of Engineering & Security',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    publishedAt: '30 Oktober 2026',
    readTime: '4 menit baca',
    views: '19.2K',
    image: '/banners/banner_valorant_gold.jpg',
    featured: false,
    tags: ['Security', 'API Gateway', 'Fintech', 'Legal Top Up'],
    relatedGame: {
      name: 'Valorant Riot Games',
      slug: 'valorant',
      actionLabel: 'Isi VP Resmi Riot',
      priceStarting: 'Rp 135.000',
    },
    content: {
      lead: 'Fenomena diamond minus dan suspend akun permanen sering kali menimpa gamer yang tergiur harga di luar batas wajar. Di balik harga murah tersebut sering tersimpan praktik carding, refund abuse, atau exploit gateway yang secara tegas diperangi seluruh publisher global.',
      sections: [
        {
          heading: '1. Direct-to-Publisher Protocol (Zero Intermediary)',
          body: [
            'Setiap transaksi di VexaStore tidak melalui login akun pihak ketiga atau sharing password. Gateway kami berkomunikasi langsung dengan server publisher (Moonton, Riot Games, Garena, Krafton, Valve) via endpoint terakreditasi menggunakan otentikasi User ID publik.',
            'Hal ini membuat proses penambahan diamond bersifat server-side authorization yang sah, tercatat dalam ledger resmi publisher dengan ID transaksi bank berlisensi Bank Indonesia.',
          ],
          highlightBox: {
            title: 'SLA Kecepatan API Gateway VexaStore',
            text: '99.98% transaksi diselesaikan dalam waktu kurang dari 400 milidetik setelah QRIS atau Virtual Account terkonfirmasi oleh jaringan switching.',
            type: 'info',
          },
        },
        {
          heading: '2. Verifikasi ID Otomatis Sebelum Checkout',
          body: [
            'Untuk mencegah salah transfer atau typo nomor ID, engine validasi kami langsung menarik nickname resmi game dalam waktu 0.2 detik sebelum user menekan tombol beli. Dengan proteksi real-time ini, kesalahan input user terpangkas hingga 99.4%.',
          ],
        },
      ],
      conclusion: 'Investasi akun game Anda bernilai jutaan rupiah hingga tahun-tahun kerja keras. Jangan pertaruhkan akun tercinta dengan jalur ilegal saat gateway resmi VexaStore menawarkan transparansi penuh dan perlindungan hukum.',
    },
  },
  {
    id: 'art-3',
    slug: 'valorant-vct-pacific-meta-analysis-chamber-neon',
    title: 'VCT Pacific 2026: Mengapa Chamber & Neon Kembali Jadi Pick Prioritas di Map Luas?',
    excerpt: 'Bedah taktik map pool kompetitif terkini, setup crossfire di Haven dan Sunset, serta efisiensi bundle skin Radiant Protocol terkini.',
    category: 'Esports & Turnamen',
    author: {
      name: 'Dimas "Spectre" Suryo',
      role: 'Head of Tactical Content',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    publishedAt: '28 Oktober 2026',
    readTime: '6 menit baca',
    views: '11.4K',
    image: '/banners/banner_valorant_gold.jpg',
    featured: false,
    tags: ['VALORANT', 'VCT Pacific', 'Riot Games', 'Tactical FPS'],
    relatedGame: {
      name: 'Valorant Riot Games',
      slug: 'valorant',
      actionLabel: 'Ambil Bonus VP',
      priceStarting: 'Rp 135.000',
    },
    content: {
      lead: 'Dominasi duelist standar mulai tergantikan oleh komposisi agresif berbasis mobility slide Neon dan sniper hold Chamber. Panggung VCT Pacific menunjukkan bahwa rotasi cepat 3 detik mampu meruntuhkan retake site terkoordinasi sekalipun.',
      sections: [
        {
          heading: '1. Kontrol Long Angles dengan Headhunter yang Lebih Akurat',
          body: [
            'Penyesuaian cooldown teleport Rendezvous membuat Chamber kembali fleksibel sebagai anchor solo di site B Haven. Pemain tidak lagi terpaku di satu posisi statis melainkan dapat melakukan first-blood pick lalu menghilang tanpa jejak.',
            'Kunci dari gaya main ini adalah kestabilan crosshair placement dan disiplin membuang utility musuh sebelum mereka berhasil memasuki area choking point.',
          ],
        },
        {
          heading: '2. Visual Feedback: Pengaruh Audio Cue Skin Senjata terhadap Mentalitas Pemain',
          body: [
            'Riset performa psikologis atlet esports menunjukkan bahwa finisher skin dengan sound feedback yang renyah (crisp audio hitmarker) mampu meningkatkan kepuasan konfirmasi kill hingga 14%. Ini menjelaskan popularitas bundle skin eksklusif di turnamen tier-1.',
          ],
        },
      ],
      conclusion: 'Perkembangan scene kompetitif Valorant bergerak dinamis. Mengasah skill aim dan melengkapi koleksi senjata favorit adalah kombinasi terbaik menuju rank Radiant.',
    },
  },
  {
    id: 'art-4',
    slug: 'panduan-efisiensi-topup-genshin-impact-welkin-vs-crystals',
    title: 'Panduan Cerdas Top Up Genshin Impact: Welkin Moon vs Genesis Crystals untuk Banner Karakter',
    excerpt: 'Matriks kalkulasi Pity System, akumulasi Primogems bulanan, dan perbandingan Return of Investment (ROI) antara langganan harian dan top-up instan.',
    category: 'Panduan & Tips',
    author: {
      name: 'Clara Anindita',
      role: 'Gacha Economics Researcher',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    publishedAt: '26 Oktober 2026',
    readTime: '5 menit baca',
    views: '16.7K',
    image: '/banners/banner_apex.jpg',
    featured: false,
    tags: ['Genshin Impact', 'Welkin Moon', 'HoYoverse', 'Gacha Guide'],
    relatedGame: {
      name: 'Genshin Impact & Honkai',
      slug: 'genshin-impact',
      actionLabel: 'Beli Welkin Moon',
      priceStarting: 'Rp 74.000',
    },
    content: {
      lead: 'Gacha karakter impian bintang 5 sering kali membutuhkan hingga 180 pulls untuk skenario hard pity terburuk (kehilangan 50:50). Mengetahui cara paling hemat mengamankan primogems adalah kunci bermain cerdas tanpa menguras dompet.',
      sections: [
        {
          heading: '1. Komparasi ROI: 3.000 Primogems seharga 70 Ribuan Rupiah',
          body: [
            'Blessing of the Welkin Moon memberikan 300 Genesis Crystals instan ditambah 90 Primogems harian selama 30 hari (total 3.000 Primogems setara ~18.75 Intertwined Fates).',
            'Jika Anda membeli 3.000 Genesis Crystals secara instan tanpa bonus double, Anda harus mengeluarkan lebih dari Rp 600.000. Artinya, Welkin Moon menawarkan nilai penghematan hingga 850% lebih tinggi bagi gamer yang disiplin login setiap hari.',
          ],
        },
        {
          heading: '2. Cara Aman Membeli Blessing of the Welkin Moon Tanpa Login ID',
          body: [
            'Di VexaStore, pengisian Welkin Moon dan Crystals hanya membutuhkan UID dan Server. Kami tidak pernah meminta email apalagi kata sandi akun HoYoverse Anda, sehingga akun tetap 100% berada di bawah kendali penuh Anda.',
          ],
        },
      ],
      conclusion: 'Rencanakan banner gacha Anda 1-2 versi sebelumnya. Dengan menabung Welkin Moon dari VexaStore secara bertahap, karakter bintang 5 signature Anda dipastikan pulang ke rumah.',
    },
  },
  {
    id: 'art-5',
    slug: 'free-fire-booyah-pass-season-guide-leveling-cepat',
    title: 'Free Fire Booyah Pass Musim Ini: Item Eksklusif & Trik Menaikkan Level Kilat',
    excerpt: 'Daftar lengkap milestone hadiah Booyah Pass, breakdown misi mingguan tercepat, serta strategi push rank Grandmaster di mode Clash Squad.',
    category: 'Event Resmi',
    author: {
      name: 'Fauzan "Booyah" Hakim',
      role: 'Battle Royale Specialist',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    },
    publishedAt: '24 Oktober 2026',
    readTime: '4 menit baca',
    views: '8.9K',
    image: '/banners/banner_freefire.jpg',
    featured: false,
    tags: ['Free Fire', 'Booyah Pass', 'Garena', 'Battle Royale'],
    relatedGame: {
      name: 'Free Fire Max Garena',
      slug: 'free-fire',
      actionLabel: 'Beli Diamond Kilat',
      priceStarting: 'Rp 93.000',
    },
    content: {
      lead: 'Setiap musim Booyah Pass menghadirkan bundle karakter bertema futuristik dan skin senjata berefek eliminasi unik. Memaksimalkan badge harian tanpa perlu membeli level mahal adalah trik yang sering dipakai para pro player.',
      sections: [
        {
          heading: '1. Pola Misi Harian: Kerjakan di Mode Clash Squad Non-Ranked',
          body: [
            'Misi seperti akumulasi damage shotgun atau revive teman squad dapat diselesaikan 3x lebih cepat di mode Clash Squad dibandingkan Classic Battle Royale karena frekuensi kontak musuh yang padat di setiap ronde.',
          ],
        },
      ],
      conclusion: 'Lengkapi keseruan bermain dengan skin terkeren. Top-up diamond Free Fire di VexaStore langsung masuk ke akun dalam hitungan detik.',
    },
  },
  {
    id: 'art-6',
    slug: 'transformasi-gaming-indonesia-qris-realtime-settlement',
    title: 'Transformasi Finansial Gaming Indonesia: Lonjakan 140% Transaksi QRIS Real-Time',
    excerpt: 'Laporan riset pasar kuartal keempat mengenai kebiasaan pembayaran mikro-transaksi gamers tanah air dan standardisasi API open-banking.',
    category: 'Tren Industri',
    author: {
      name: 'Nathania Siregar',
      role: 'Fintech Research Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    publishedAt: '22 Oktober 2026',
    readTime: '7 menit baca',
    views: '13.1K',
    image: '/banners/banner_pubg.jpg',
    featured: false,
    tags: ['Fintech', 'QRIS', 'Digital Economy', 'Gaming Industry'],
    content: {
      lead: 'Integrasi sistem pembayaran instan QRIS dan Virtual Account terotomatisasi telah mengubah lanskap voucher game di Indonesia. Kemudahan verifikasi tanpa upload bukti transfer manual menjadi standar baru pengalaman pengguna modern.',
      sections: [
        {
          heading: '1. Punahnya Konfirmasi Manual dan Era Otomatisasi Penuh',
          body: [
            'Jika lima tahun lalu gamer harus mengirimkan bukti transfer transfer bank via WhatsApp lalu menunggu operator melakukan verifikasi, kini gateway modern seperti VexaStore menggunakan sistem webhook perbankan terenkripsi yang memvalidasi transfer secara instan dalam 300ms.',
            'Efisiensi operasional ini memangkas biaya admin dan memungkinkan kami memberikan harga item game yang jauh lebih terjangkau bagi komunitas.',
          ],
        },
      ],
      conclusion: 'Kemudahan transaksi adalah hak setiap gamer. VexaStore berkomitmen menghadirkan infrastruktur finansial terbaik untuk ekosistem gaming tanah air.',
    },
  },
];

