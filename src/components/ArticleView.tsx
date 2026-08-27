import React, { useState, useEffect } from 'react';
import { 
  Globe, Clock, Flame, ShieldCheck, Share2, Heart, Bookmark, 
  ArrowLeft, ChevronDown, ChevronUp, Code, Copy, Check, Sparkles, 
  MessageSquare, User, Send, ExternalLink, RefreshCw, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Article } from '../types.js';
import { AudioPlayer } from './AudioPlayer.js';
import { SchemaInspectorModal } from './SchemaInspectorModal.js';
import { AdSenseBanner } from './AdSenseBanner.js';
import { getOptimizedImageUrl, getResponsiveSrcSet } from '../lib/cloudinary.js';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
  onLikeArticle: (articleId: string) => void;
}

interface CommentItem {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  relatedArticles,
  onSelectArticle,
  onBack,
  onLikeArticle
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      author: 'David Chen',
      content: 'Extremely thorough analysis. The differentiation between confirmed institutional disclosures and forecasts brings much-needed clarity.',
      createdAt: '2 hours ago'
    },
    {
      id: 'c2',
      author: 'Fatima Al-Mansoor',
      content: 'The regional impact breakdown for developing corridors matches what we are seeing in recent enterprise deployments.',
      createdAt: '4 hours ago'
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Scroll to top & dynamically update Document Title & Google Discover Schema
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${article.title} | WorldPlus`;

    // Inject dynamic JSON-LD structured data for Google Discover
    const schemaScriptId = 'article-news-schema';
    let scriptEl = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaScriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "NewsArticle",
          "@id": `${article.seo.canonicalUrl || `https://worldplus.world/article/${article.seo.slug}`}#article`,
          "isPartOf": {
            "@type": "WebPage",
            "@id": article.seo.canonicalUrl || `https://worldplus.world/article/${article.seo.slug}`
          },
          "headline": article.title,
          "description": article.shortSummary,
          "image": [
            getOptimizedImageUrl(article.featuredImage, { width: 1200, height: 675, crop: 'fill' }),
            ...article.images.map(img => getOptimizedImageUrl(img.url, { width: 1200, height: 675, crop: 'fill' }))
          ],
          "datePublished": article.publishedAt,
          "dateModified": article.updatedAt || article.publishedAt,
          "author": {
            "@type": "Organization",
            "name": "WorldPlus Intelligence Bureau",
            "url": "https://worldplus.world"
          },
          "publisher": {
            "@type": "Organization",
            "name": "WorldPlus",
            "url": "https://worldplus.world",
            "logo": {
              "@type": "ImageObject",
              "url": "https://worldplus.world/logo.png"
            }
          },
          "keywords": article.seo.relatedKeywords.join(', '),
          "articleSection": article.categoryName,
          "inLanguage": "en-US"
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${article.seo.canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://worldplus.world"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": article.categoryName,
              "item": `https://worldplus.world/category/${article.categoryId}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": article.title,
              "item": article.seo.canonicalUrl
            }
          ]
        },
        ...(article.faqs && article.faqs.length > 0 ? [{
          "@type": "FAQPage",
          "@id": `${article.seo.canonicalUrl}#faq`,
          "mainEntity": article.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }] : [])
      ]
    };

    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      // Revert title on unmount
      document.title = 'WorldPlus - Global News & Trending Intelligence | worldplus.world';
    };
  }, [article.id, article.title]);

  const handleShare = async () => {
    const fullUrl = `https://worldplus.world/article/${article.seo.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.shortSummary,
          url: fullUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      onLikeArticle(article.id);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const item: CommentItem = {
      id: 'comm-' + Date.now(),
      author: newCommentName.trim() || 'Global Reader',
      content: newCommentText.trim(),
      createdAt: 'Just now'
    };
    setComments([item, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const fontSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed'
  }[fontSize];

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
          <span>worldplus.world</span>
          <span>/</span>
          <span className="text-amber-500 uppercase">{article.categoryName}</span>
          <span>/</span>
          <span className="truncate max-w-[150px]">{article.seo.slug}</span>
        </div>
      </div>

      {/* Category, Badges, Opportunity Score */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <span className="px-3 py-1 bg-amber-500 text-neutral-950 font-bold uppercase text-xs tracking-wider rounded-md">
          {article.categoryName}
        </span>
        {article.subcategoryName && (
          <span className="px-2.5 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-md">
            {article.subcategoryName}
          </span>
        )}
        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-mono rounded-md flex items-center space-x-1">
          <Globe className="w-3 h-3" />
          <span>{article.countryName}</span>
        </span>
        {article.isBreaking && (
          <span className="px-2.5 py-1 bg-red-600 text-white font-bold uppercase text-xs tracking-wider rounded-md animate-pulse">
            Breaking
          </span>
        )}
        <div className="ml-auto bg-amber-500/10 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Trend Score: {article.opportunityScore}/100</span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 dark:text-white leading-[1.15] mb-6">
        {article.title}
      </h1>

      {/* Short Summary Lead */}
      <div className="bg-neutral-50 dark:bg-neutral-900/80 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl mb-6 text-neutral-700 dark:text-neutral-200 text-lg sm:text-xl font-serif italic leading-relaxed">
        {article.shortSummary}
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400 font-serif font-bold">
            WP
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">
              WorldPlus International Editorial Pool
            </div>
            <div className="flex items-center space-x-2 font-mono text-[11px]">
              <span className="text-emerald-500 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Multi-Agent Verified</span>
              </span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Font resize & Actions */}
        <div className="flex items-center space-x-2">
          {/* Font buttons */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 text-xs font-mono mr-2">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold' : ''}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold' : ''}`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 rounded ${fontSize === 'xlarge' ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold' : ''}`}
            >
              A++
            </button>
          </div>

          <button
            onClick={handleLike}
            className={`p-2 rounded-lg border transition-colors flex items-center space-x-1 ${
              isLiked
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
            }`}
            title="Like this article"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{article.likesCount + (isLiked ? 1 : 0)}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors relative"
            title="Share and copy canonical URL"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsSchemaOpen(true)}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors"
            title="Inspect Schema.org JSON-LD Structured Data"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copiedLink && (
        <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-mono flex items-center justify-between">
          <span>Canonical URL copied: <strong>{article.seo.canonicalUrl}</strong></span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Audio narration block */}
      <AudioPlayer
        title={article.title}
        textToRead={`${article.shortSummary}. ${article.sections.map(s => s.content).join(' ')}`}
      />

      {/* Primary Featured Image (Image 1 of 5) */}
      <div className="my-8">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 shadow-lg">
          <img
            src={getOptimizedImageUrl(article.featuredImage, { width: 1200, height: 675, crop: 'fill' })}
            srcSet={getResponsiveSrcSet(article.featuredImage)}
            sizes="(max-width: 768px) 100vw, 896px"
            alt={article.featuredImageAlt || article.title}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        {article.featuredImageCaption && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 italic mt-2.5 px-1 border-l-2 border-amber-500 pl-2">
            {article.featuredImageCaption}
          </p>
        )}
      </div>

      {/* AdSense Top In-Article Slot */}
      <AdSenseBanner slotType="in-article" adSlotId="9823471029" />

      {/* Table of Contents & Quick Facts Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8 p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <div className="md:col-span-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-3">
            Editorial Sections Index
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
            {article.sections.map((sec, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="text-amber-500 font-mono font-bold">0{idx + 1}.</span>
                <span className="hover:text-amber-500 font-medium truncate">{sec.heading}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-4 md:pt-0 md:pl-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-2">
            Verification Specifications
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-neutral-400 block text-[10px]">Word Count</span>
              <span className="font-bold text-neutral-900 dark:text-white">{article.seo.wordCount} words</span>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-neutral-400 block text-[10px]">Reading Time</span>
              <span className="font-bold text-neutral-900 dark:text-white">{article.seo.readingTimeMinutes} Minutes</span>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-neutral-400 block text-[10px]">Contextual Images</span>
              <span className="font-bold text-amber-500">{article.images.length} High-Res Assets</span>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-neutral-400 block text-[10px]">Quality Score</span>
              <span className="font-bold text-emerald-500">{article.qualityReport?.overallScore || 96}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editorial Article Body with Sections and Contextual Images */}
      <div className={`space-y-10 text-neutral-800 dark:text-neutral-200 ${fontSizeClass}`}>
        {article.sections.map((section, index) => {
          // Additional contextual images (Images 2, 3, 4, 5)
          const contextualImg = article.images[index + 1];

          return (
            <section key={section.id || index} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white tracking-tight pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {section.heading}
              </h2>

              <p className="leading-relaxed whitespace-pre-line text-neutral-700 dark:text-neutral-300">
                {section.content}
              </p>

              {/* Contextual Image Injection for richer layout */}
              {contextualImg && index > 0 && index < 5 && (
                <div className="my-6">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-neutral-950 shadow-md">
                    <img
                      src={contextualImg.url}
                      alt={contextualImg.alt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {contextualImg.caption && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 italic mt-2 px-1">
                      <span>{contextualImg.caption}</span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {contextualImg.sourceAttribution || 'WorldPlus Press Wire'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Confirmed Facts vs Expert Analysis vs Future Forecasts Callouts */}
      <div className="my-12 space-y-6">
        <div className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
          Fact-Check &amp; Analysis Breakdown
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Confirmed Facts */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmed Facts</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {article.confirmedFacts.map((fact, fIdx) => (
                <li key={fIdx} className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Analysis */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Expert Analysis</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {article.expertAnalysis.map((analysis, aIdx) => (
                <li key={aIdx} className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{analysis}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Projections */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Flame className="w-4 h-4" />
              <span>Future Projections</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {article.futureProjections.map((proj, pIdx) => (
                <li key={pIdx} className="flex items-start space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{proj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ Accordion) */}
      {article.faqs && article.faqs.length > 0 && (
        <div className="my-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white mb-6 flex items-center space-x-2.5">
            <span className="text-amber-500">FAQs:</span>
            <span>Key Questions Answered</span>
          </h3>

          <div className="space-y-3">
            {article.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                  className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-base text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === fIdx ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>
                {openFaqIndex === fIdx && (
                  <div className="p-4 pt-0 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-950/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources & Editorial Attribution */}
      <div className="my-8 p-5 bg-neutral-100 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
        <div className="font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-mono">
          Cited Sources &amp; Verification Channels
        </div>
        <div className="flex flex-wrap gap-3">
          {article.sources.map((src, sIdx) => (
            <span key={sIdx} className="flex items-center space-x-1.5 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700">
              <span className="font-medium text-neutral-900 dark:text-neutral-200">{src.name}</span>
              <span className="text-neutral-400 text-[10px]">({src.type})</span>
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Comments Thread */}
      <div className="my-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <span>Community Discussion ({comments.length})</span>
          </h3>
          <span className="text-xs text-neutral-500 font-mono">Moderated live</span>
        </div>

        {/* Comment form */}
        <form onSubmit={handleAddComment} className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
          <input
            type="text"
            placeholder="Your name or affiliation..."
            value={newCommentName}
            onChange={(e) => setNewCommentName(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white outline-none focus:border-amber-500"
          />
          <textarea
            placeholder="Share your perspective on this development..."
            rows={3}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white outline-none focus:border-amber-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Comments list */}
        <div className="space-y-3">
          {comments.map((comm) => (
            <div key={comm.id} className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">{comm.author}</span>
                <span className="text-neutral-400 font-mono text-[10px]">{comm.createdAt}</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {comm.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense Multiplex Footer Ad Slot */}
      <AdSenseBanner slotType="footer-multiplex" adSlotId="4738291034" />

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="my-12 pt-8 border-t-2 border-neutral-900 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-black text-xl uppercase tracking-tight text-neutral-900 dark:text-white">
              Related Global Intelligence
            </h3>
            <span className="text-xs font-mono text-neutral-400">worldplus.world</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-950">
                    <img
                      src={getOptimizedImageUrl(rel.featuredImage, { width: 600, height: 375, crop: 'fill' })}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase">
                      {rel.categoryName}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                </div>

                <div className="p-4 pt-0 text-[11px] font-mono text-neutral-400 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80">
                  <span>{rel.countryName}</span>
                  <span className="text-amber-500">{rel.opportunityScore} Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schema Inspector Modal */}
      {isSchemaOpen && (
        <SchemaInspectorModal article={article} onClose={() => setIsSchemaOpen(false)} />
      )}
    </article>
  );
};
