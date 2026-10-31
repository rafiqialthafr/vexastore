'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  ARTICLES_DATA, 
  ARTICLE_CATEGORIES, 
  ArticleItem 
} from '@/data/articles';
import { 
  Newspaper, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  Share2, 
  Bookmark, 
  Eye, 
  Check, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  X,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function ArtikelPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Artikel');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Featured article is either the flagged one or first in list
  const featuredArticle = useMemo(() => {
    return ARTICLES_DATA.find(a => a.featured) || ARTICLES_DATA[0];
  }, []);

  // Filtered list
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchCategory = 
        selectedCategory === 'Semua Artikel' || article.category === selectedCategory;
      const matchSearch = 
        searchKeyword.trim() === '' ||
        article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        article.tags.some(t => t.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        article.author.name.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchKeyword]);

  const handleCopyLink = (slug: string) => {
    const url = typeof window !== 'undefined' 
      ? `${window.location.origin}/artikel/${slug}`
      : `/artikel/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const toggleBookmark = (slug: string) => {
    setBookmarkedSlugs(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setEmailSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setEmailSubscribed(false), 5000);
  };

  return (
    <Navbar>
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-8 pt-10 sm:pt-14 pb-20 flex flex-col gap-10 flex-1">
        
        {/* =========================================================================
            1. EDITORIAL CORPORATE HERO HEADER
        ========================================================================= */}
        <section className="flex flex-col gap-4 border-b border-zinc-800/80 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC28A]/10 border border-[#DFC28A]/30 text-[#DFC28A] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFC28A] animate-pulse" />
              VEXASTORE INSIGHTS & EDITORIAL
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" /> Verifikasi Resmi Moonton, Riot & Valve
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Diperbarui Real-Time Tiap Pekan</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Intelijen Meta, Riset Industri & Panduan Gaming
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Eksplorasi strategi turnamen esports, optimalisasi pengeluaran mikro-transaksi, dan standardisasi keamanan gateway legal langsung dari divisi analis VexaStore.
              </p>
            </div>

            {/* Quick Live Search Bar */}
            <div className="w-full md:w-80 relative shrink-0">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Cari topik, hero, atau game..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 focus:border-[#DFC28A] text-white text-xs placeholder-zinc-500 focus:outline-none transition shadow-sm"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. FEATURED ARTICLE SPOTLIGHT (Hero Card Split Layout)
        ========================================================================= */}
        {featuredArticle && selectedCategory === 'Semua Artikel' && !searchKeyword && (
          <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 to-zinc-950 border border-zinc-800/90 hover:border-[#DFC28A]/50 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Visual Banner Artwork */}
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#DFC28A] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles size={12} /> FEATURED STORY
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              {/* Editorial Description Content */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={13} className="text-[#DFC28A]" /> {featuredArticle.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={13} className="text-[#DFC28A]" /> {featuredArticle.readTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye size={13} /> {featuredArticle.views}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#DFC28A] transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#DFC28A]/40"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{featuredArticle.author.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">{featuredArticle.author.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] hover:brightness-110 text-slate-950 font-black text-xs transition shadow-md group/btn shrink-0"
                  >
                    <span>Baca Lengkap</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            3. CATEGORY PILL FILTER NAVIGATION
        ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start">
          {ARTICLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? 'bg-[#DFC28A]/15 text-[#FFF5DE] border-[#DFC28A] shadow-[0_0_15px_rgba(223,194,138,0.2)]'
                  : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-[#DFC28A]/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* =========================================================================
            4. ARTICLES LIST / GRID
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group rounded-3xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-[#DFC28A]/50 p-4 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(223,194,138,0.2)]"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[#DFC28A] text-[10px] font-mono font-bold uppercase tracking-wider">
                    {article.category}
                  </span>

                  <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                    <Eye size={12} /> {article.views}
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-2">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Article Headline */}
                <h3 className="text-base font-bold text-white group-hover:text-[#DFC28A] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] text-zinc-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Author & CTA */}
              <div className="pt-4 mt-5 border-t border-zinc-800/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-zinc-700"
                  />
                  <span className="text-xs text-zinc-300 font-medium truncate">
                    {article.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyLink(article.slug)}
                    title="Salin Link Artikel"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition"
                  >
                    {copiedSlug === article.slug ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
                  </button>
                  <button
                    onClick={() => toggleBookmark(article.slug)}
                    title="Simpan Bacaan"
                    className={`p-1.5 rounded-lg transition ${
                      bookmarkedSlugs.includes(article.slug) 
                        ? 'text-[#DFC28A] bg-[#DFC28A]/10' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <Bookmark size={15} />
                  </button>
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex items-center gap-1 pl-2 text-xs font-bold text-[#DFC28A] hover:underline"
                  >
                    <span>Baca</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/30 rounded-3xl border border-zinc-800/80">
            <Newspaper size={36} className="mx-auto text-zinc-600 mb-3" />
            <h3 className="text-base font-bold text-white">Tidak ada artikel yang cocok</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Coba kata kunci pencarian lain atau pilih kategori artikel yang berbeda.
            </p>
            <button
              onClick={() => { setSearchKeyword(''); setSelectedCategory('Semua Artikel'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-zinc-200"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* =========================================================================
            5. CORPORATE DISPATCH & NEWSLETTER BRIEFING
        ========================================================================= */}
        <section className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-[#DFC28A]/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold text-[#DFC28A] tracking-widest uppercase">
              // VEXASTORE WEEKLY INTELLIGENCE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Dapatkan Briefing Meta & Promo Langsung ke Email
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Bergabunglah dengan lebih dari 45.000 gamer & squad kompetitif. Kami mengirimkan ringkasan patch turnamen, analisis harga diskon diamond, dan voucher eksklusif tanpa spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5 shrink-0">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Masukkan alamat email kamu..."
              required
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-[#DFC28A] min-w-[260px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm transition shadow-md whitespace-nowrap"
            >
              Langganan Gratis
            </button>
          </form>

          {emailSubscribed && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Check size={18} />
                <span>Terima kasih! Kamu telah terdaftar dalam VexaStore Weekly Intelligence.</span>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* =========================================================================
          6. INTERACTIVE FULL ARTICLE READING DRAWER / MODAL
      ========================================================================= */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#090b10] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            
            {/* Close Button Sticky Top Right */}
            <button
              onClick={() => setActiveArticle(null)}
              className="sticky top-0 float-right -mr-2 -mt-2 p-2 rounded-xl bg-black/60 backdrop-blur-md text-zinc-400 hover:text-white border border-white/[0.1] transition z-20"
              aria-label="Tutup Artikel"
            >
              <X size={18} />
            </button>

            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-[#DFC28A]">{activeArticle.category}</span>
              <span>/</span>
              <span className="truncate max-w-[200px] text-zinc-500">{activeArticle.title}</span>
            </div>

            {/* Article Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              {activeArticle.title}
            </h2>

            {/* Author Byline & Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-5 border-y border-zinc-800/80 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#DFC28A]/40"
                />
                <div>
                  <p className="font-bold text-white font-sans text-sm">{activeArticle.author.name}</p>
                  <p className="text-[11px] text-[#DFC28A]">{activeArticle.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Calendar size={13} /> {activeArticle.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {activeArticle.readTime}</span>
              </div>
            </div>

            {/* Hero Key Art */}
            <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden mb-7 bg-zinc-950">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Lead Paragraph */}
            <p className="text-sm sm:text-base font-semibold text-zinc-200 leading-relaxed bg-[#DFC28A]/5 border-l-2 border-[#DFC28A] pl-4 py-2 mb-8 rounded-r-xl">
              {activeArticle.content.lead}
            </p>

            {/* Article Sections */}
            <div className="space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {activeArticle.content.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFC28A]" />
                    {section.heading}
                  </h3>

                  {section.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-zinc-300">
                      {p}
                    </p>
                  ))}

                  {/* Optional Stats Highlights */}
                  {section.stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                      {section.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-center">
                          <p className="text-lg sm:text-xl font-black text-[#DFC28A] font-mono">{stat.value}</p>
                          <p className="text-[11px] font-bold text-white mt-0.5">{stat.label}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">{stat.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Highlight Box */}
                  {section.highlightBox && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#DFC28A]/10 to-transparent border border-[#DFC28A]/30 space-y-1">
                      <p className="text-xs font-mono font-bold text-[#DFC28A] uppercase tracking-wider">
                        ★ {section.highlightBox.title}
                      </p>
                      <p className="text-xs text-zinc-300">
                        {section.highlightBox.text}
                      </p>
                    </div>
                  )}

                  {/* Optional Quote Block */}
                  {section.quote && (
                    <blockquote className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 italic text-zinc-200 space-y-2">
                      <p>"{section.quote.text}"</p>
                      <cite className="block text-right text-[11px] font-mono text-[#DFC28A] not-italic">
                        — {section.quote.speaker}
                      </cite>
                    </blockquote>
                  )}
                </section>
              ))}

              {/* Conclusion Section */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] mt-8">
                <h4 className="text-sm font-bold text-white mb-2">Kesimpulan Analis</h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  {activeArticle.content.conclusion}
                </p>
              </div>
            </div>

            {/* Related Game Quick Action Bar (Direct Revenue Funnel) */}
            {activeArticle.relatedGame && (
              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#DFC28A]/20 to-transparent border border-[#DFC28A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DFC28A]/20 border border-[#DFC28A]/40 flex items-center justify-center text-[#DFC28A]">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-[#DFC28A] uppercase tracking-wider font-bold">REKOMENDASI TOP UP RESMI</p>
                    <h5 className="text-sm font-bold text-white">{activeArticle.relatedGame.name}</h5>
                    <p className="text-xs text-zinc-300">Mulai dari <span className="font-mono text-[#DFC28A] font-bold">{activeArticle.relatedGame.priceStarting}</span></p>
                  </div>
                </div>

                <Link
                  href={`/order/${activeArticle.relatedGame.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFC28A] via-[#EED9B3] to-[#DFC28A] hover:brightness-110 text-slate-950 font-black text-xs transition shadow-md whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>{activeArticle.relatedGame.actionLabel}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            )}

            {/* Bottom Actions Share & Bookmark */}
            <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(activeArticle.slug)}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-zinc-300 flex items-center gap-2 transition"
                >
                  {copiedSlug === activeArticle.slug ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  <span>{copiedSlug === activeArticle.slug ? 'Link Tersalin!' : 'Bagikan Artikel'}</span>
                </button>

                <button
                  onClick={() => toggleBookmark(activeArticle.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    bookmarkedSlugs.includes(activeArticle.slug)
                      ? 'bg-[#DFC28A]/15 text-[#DFC28A] border border-[#DFC28A]/40'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300'
                  }`}
                >
                  <Bookmark size={14} />
                  <span>{bookmarkedSlugs.includes(activeArticle.slug) ? 'Tersimpan' : 'Simpan'}</span>
                </button>

                <Link
                  href={`/artikel/${activeArticle.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-[#DFC28A]/10 hover:border-[#DFC28A]/40 border border-transparent text-xs font-semibold text-zinc-300 hover:text-[#DFC28A] flex items-center gap-1.5 transition"
                >
                  <ArrowUpRight size={14} />
                  <span className="hidden sm:inline">Halaman Penuh</span>
                </Link>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-zinc-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
}

