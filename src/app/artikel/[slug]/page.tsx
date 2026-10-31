'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ARTICLES_DATA, ArticleItem, ArticleSection } from '@/data/articles';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  Eye, 
  Check, 
  Sparkles, 
  Zap, 
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Info
} from 'lucide-react';

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const article = ARTICLES_DATA.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Other related articles (exclude current)
  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <Navbar>
      <main className="max-w-4xl mx-auto w-full px-6 sm:px-8 pt-10 sm:pt-14 pb-24 flex flex-col gap-10 flex-1">
        
        {/* =========================================================================
            1. BREADCRUMBS & NAVIGATION
        ========================================================================= */}
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition duration-200 text-[#DFC28A]" />
            KEMBALI KE SEMUA ARTIKEL
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition">Vault</Link>
            <ChevronRight size={12} />
            <Link href="/artikel" className="hover:text-zinc-300 transition">Artikel</Link>
            <ChevronRight size={12} />
            <span className="text-[#DFC28A] truncate max-w-[160px] sm:max-w-[240px]">{article.title}</span>
          </div>
        </nav>

        {/* =========================================================================
            2. ARTICLE HEADER & TITLE
        ========================================================================= */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#DFC28A]/15 border border-[#DFC28A]/40 text-[#FFF5DE] text-xs font-mono font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Calendar size={13} /> {article.publishedAt}
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Clock size={13} /> {article.readTime}
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Eye size={13} /> {article.views} dibaca
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light border-l-2 border-[#DFC28A] pl-4 italic">
            {article.excerpt}
          </p>

          {/* Author & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#DFC28A]/40 shadow-md"
              />
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  {article.author.name}
                </p>
                <p className="text-xs text-zinc-400 font-mono">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#DFC28A]/40 text-xs font-mono text-zinc-300 hover:text-white transition"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} />
                    <span>Bagikan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-xl border transition ${
                  bookmarked
                    ? 'bg-[#DFC28A]/15 border-[#DFC28A] text-[#DFC28A]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
                title="Simpan artikel"
              >
                <Bookmark size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================================
            3. HERO IMAGE
        ========================================================================= */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Lead Summary Callout */}
        {article.content.lead && (
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-sm sm:text-base text-zinc-200 leading-relaxed">
            <span className="font-bold text-[#DFC28A] font-mono mr-2 uppercase text-xs tracking-wider block sm:inline">
              Executive Summary:
            </span>
            {article.content.lead}
          </div>
        )}

        {/* =========================================================================
            4. ARTICLE BODY SECTIONS
        ========================================================================= */}
        <article className="flex flex-col gap-10">
          {article.content.sections.map((sec, idx) => (
            <section key={idx} className="flex flex-col gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 rounded-full bg-[#DFC28A] shrink-0" />
                <span>{sec.heading}</span>
              </h2>

              <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                {sec.body.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats within this section */}
              {sec.stats && sec.stats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-2">
                  {sec.stats.map((st, sIdx) => (
                    <div 
                      key={sIdx}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#DFC28A]/[0.08] via-zinc-900/60 to-zinc-950 border border-[#DFC28A]/25 relative overflow-hidden"
                    >
                      <span className="text-2xl font-black text-[#FFF5DE] tracking-tight block">
                        {st.value}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#DFC28A] font-bold block mt-0.5">
                        {st.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-1 block">
                        {st.desc}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight Box if present */}
              {sec.highlightBox && (
                <div className={`p-4 rounded-2xl border my-2 ${
                  sec.highlightBox.type === 'alert'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : sec.highlightBox.type === 'info'
                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-200'
                    : 'bg-[#DFC28A]/10 border-[#DFC28A]/30 text-[#FFF5DE]'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    {sec.highlightBox.type === 'alert' ? (
                      <AlertCircle size={16} className="text-rose-400" />
                    ) : sec.highlightBox.type === 'info' ? (
                      <Info size={16} className="text-sky-400" />
                    ) : (
                      <Sparkles size={16} className="text-[#DFC28A]" />
                    )}
                    <span>{sec.highlightBox.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {sec.highlightBox.text}
                  </p>
                </div>
              )}

              {/* Quote if present */}
              {sec.quote && (
                <blockquote className="my-2 p-5 rounded-2xl bg-zinc-900/70 border-l-4 border-[#DFC28A] relative overflow-hidden">
                  <p className="text-sm sm:text-base italic text-[#FFF5DE] font-serif leading-relaxed">
                    "{sec.quote.text}"
                  </p>
                  <footer className="mt-2 text-xs font-mono uppercase tracking-wider text-[#DFC28A] text-right">
                    — {sec.quote.speaker}
                  </footer>
                </blockquote>
              )}
            </section>
          ))}

          {/* Conclusion Section */}
          {article.content.conclusion && (
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] mt-4">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                <span>Kesimpulan Analis</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {article.content.conclusion}
              </p>
            </div>
          )}

          {/* Direct Game Top-Up Action Banner */}
          {article.relatedGame && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-[#DFC28A]/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DFC28A]/10 border border-[#DFC28A]/30 flex items-center justify-center shrink-0">
                  <Zap className="text-[#DFC28A]" size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#DFC28A] font-bold">
                    REKOMENDASI TOP UP RESMI
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {article.relatedGame.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Mulai dari <span className="font-mono text-[#DFC28A] font-bold">{article.relatedGame.priceStarting}</span> • Garansi API Resmi Instan
                  </p>
                </div>
              </div>

              <Link
                href={`/order/${article.relatedGame.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFC28A] to-[#B39352] text-black text-sm font-bold shadow-lg shadow-[#DFC28A]/20 hover:scale-[1.02] active:scale-[0.98] transition shrink-0"
              >
                <span>{article.relatedGame.actionLabel}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-zinc-800/80">
            <span className="text-xs font-mono text-zinc-400 mr-2">Topik Terkait:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Box */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-14 h-14 rounded-2xl object-cover ring-1 ring-zinc-700"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{article.author.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                  Verified Editor
                </span>
              </div>
              <p className="text-xs font-mono text-[#DFC28A] mt-0.5">{article.author.role}</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Spesialis riset analitik game dan ekosistem fintech gaming di VexaStore. Berkomitmen menghadirkan data akurat, strategi transparan, dan kenyamanan tanpa kompromi bagi komunitas gamers Indonesia.
              </p>
            </div>
          </div>
        </article>

        {/* =========================================================================
            5. RELATED ARTICLES
        ========================================================================= */}
        <section className="flex flex-col gap-5 pt-10 border-t border-zinc-800/80">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-[#DFC28A]" />
              <span>Artikel Lainnya yang Mungkin Anda Suka</span>
            </h3>
            <Link
              href="/artikel"
              className="text-xs font-mono text-[#DFC28A] hover:underline flex items-center gap-1"
            >
              Lihat Semua
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/artikel/${rel.slug}`}
                className="group rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-[#DFC28A]/40 p-4 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 mb-3">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#DFC28A] font-bold uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#DFC28A] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-3 mt-3 border-t border-zinc-800/50">
                  <span>{rel.readTime}</span>
                  <span className="group-hover:translate-x-1 transition-transform text-[#DFC28A] font-bold">
                    Baca &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </Navbar>
  );
}
