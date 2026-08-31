import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { BreakingTicker } from './components/BreakingTicker.js';
import { HeroSection } from './components/HeroSection.js';
import { TrendingNowSection } from './components/TrendingNowSection.js';
import { CategorySections } from './components/CategorySections.js';
import { TrendingByCountry } from './components/TrendingByCountry.js';
import { MostPopularSection } from './components/MostPopularSection.js';
import { ArticleView } from './components/ArticleView.js';
import { CategoryPage } from './components/CategoryPage.js';
import { CountryPage } from './components/CountryPage.js';
import { SearchModal } from './components/SearchModal.js';
import { AdminPanel } from './components/AdminPanel.js';
import { AdminLoginModal } from './components/AdminLoginModal.js';
import { PolicyPages, PolicyType } from './components/PolicyPages.js';
import { CookieConsent } from './components/CookieConsent.js';
import { AdSenseBanner } from './components/AdSenseBanner.js';
import { Article, Category, Country, TrendItem } from './types.js';
import { Sparkles, Radio, RefreshCw, Check, ShieldCheck } from 'lucide-react';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_COUNTRIES, INITIAL_TRENDS } from './data/initialData.js';
import { 
  subscribeToFirestoreArticles, 
  fetchArticlesFromFirestore, 
  likeArticleInFirestore, 
  saveArticleToFirestore,
  clearAllArticlesFromFirestore
} from './lib/firestoreClient.js';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [countries, setCountries] = useState<Country[]>(INITIAL_COUNTRIES);
  const [trends, setTrends] = useState<TrendItem[]>(INITIAL_TRENDS);
  
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'category' | 'country' | 'policy' | 'admin'>('home');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('all');
  const [activeCountryCode, setActiveCountryCode] = useState<string>('GLOBAL');
  const [activePolicy, setActivePolicy] = useState<PolicyType>('privacy');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // URL Routing Parser helper
  const syncRouteFromPath = (path: string, currentArticles: Article[], currentCats: Category[], currentCountries: Country[]) => {
    const cleanPath = path.replace(/\/$/, '') || '/';

    // Secret Owner Admin Route: worldplus.world/03265520658/admin/pannel
    if (
      cleanPath === '/03265520658/admin/pannel' || 
      cleanPath === '/03265520658/admin/panel' || 
      cleanPath === '/03265520658/admin' ||
      cleanPath === '/03265520658'
    ) {
      localStorage.setItem('worldplus_admin_authenticated', 'true');
      setIsAdminLoginOpen(false);
      setIsAdminOpen(true);
      setCurrentView('admin');
      return;
    }

    if (cleanPath === '/admin' || cleanPath === '/admin/panel' || cleanPath === '/admin/pannel') {
      const isAuth = localStorage.getItem('worldplus_admin_authenticated') === 'true';
      if (isAuth) {
        setIsAdminOpen(true);
        setCurrentView('admin');
      } else {
        setIsAdminLoginOpen(true);
      }
      return;
    }

    if (cleanPath === '/privacy' || cleanPath === '/terms' || cleanPath === '/editorial' || cleanPath === '/editorial-policy' || cleanPath === '/dmca' || cleanPath === '/contact') {
      const policyKey = cleanPath.replace('/', '').replace('-policy', '') as PolicyType;
      setActivePolicy(policyKey === 'editorial' ? 'editorial' : policyKey);
      setCurrentView('policy');
      return;
    }

    if (cleanPath.startsWith('/article/')) {
      const slug = cleanPath.replace('/article/', '');
      const found = currentArticles.find(a => a.seo?.slug === slug || a.id === slug);
      if (found) {
        setActiveArticle(found);
        setCurrentView('article');
        return;
      }
    }

    if (cleanPath.startsWith('/category/')) {
      const slug = cleanPath.replace('/category/', '');
      setActiveCategorySlug(slug);
      setCurrentView('category');
      return;
    }

    if (cleanPath.startsWith('/country/')) {
      const code = cleanPath.replace('/country/', '').toUpperCase();
      setActiveCountryCode(code);
      setCurrentView('country');
      return;
    }

    // Default Home
    setCurrentView('home');
  };

  // Fetch all initial data with resilience, API backend check, and Firestore synchronization
  const fetchData = async (retryCount = 0) => {
    try {
      const [artRes, catRes, countRes, trendRes] = await Promise.all([
        fetch('/api/articles?status=published').catch(() => null),
        fetch('/api/categories').catch(() => null),
        fetch('/api/countries').catch(() => null),
        fetch('/api/trends').catch(() => null)
      ]);

      const artJson = artRes && artRes.ok ? await artRes.json() : null;
      const catJson = catRes && catRes.ok ? await catRes.json() : null;
      const countJson = countRes && countRes.ok ? await countRes.json() : null;
      const trendJson = trendRes && trendRes.ok ? await trendRes.json() : null;

      let loadedArticles: Article[] = [];
      if (artJson && Array.isArray(artJson) && artJson.length > 0) {
        loadedArticles = artJson;
      }
      
      const firestoreArts = await fetchArticlesFromFirestore();
      if (firestoreArts && Array.isArray(firestoreArts) && firestoreArts.length > 0) {
        const idMap = new Map<string, Article>();
        loadedArticles.forEach(a => idMap.set(a.id, a));
        firestoreArts.forEach(a => idMap.set(a.id, a));
        loadedArticles = Array.from(idMap.values());
      }
      setArticles(loadedArticles);

      if (catJson && Array.isArray(catJson) && catJson.length > 0) setCategories(catJson);
      if (countJson && Array.isArray(countJson) && countJson.length > 0) setCountries(countJson);
      if (trendJson && Array.isArray(trendJson)) setTrends(trendJson);

      // Parse initial route from browser URL
      syncRouteFromPath(
        window.location.pathname, 
        loadedArticles.length > 0 ? loadedArticles : INITIAL_ARTICLES, 
        catJson && catJson.length > 0 ? catJson : INITIAL_CATEGORIES, 
        countJson && countJson.length > 0 ? countJson : INITIAL_COUNTRIES
      );
    } catch (err) {
      if (retryCount < 2) {
        setTimeout(() => fetchData(retryCount + 1), 1000);
      }
    }
  };

  useEffect(() => {
    fetchData();

    // Direct real-time listener to Firestore articles collection
    const unsubscribeFirestore = subscribeToFirestoreArticles((liveArticles) => {
      if (liveArticles && liveArticles.length > 0) {
        setArticles(liveArticles);
      }
    });

    // Listen for browser Back and Forward history buttons
    const handlePopState = () => {
      syncRouteFromPath(window.location.pathname, articles, categories, countries);
    };
    window.addEventListener('popstate', handlePopState);

    // Polling interval to reflect newly auto-published articles safely
    const pollInterval = setInterval(async () => {
      try {
        const r = await fetch('/api/articles?status=published');
        if (!r.ok) return;
        const newArticles = await r.json();
        if (Array.isArray(newArticles) && newArticles.length > 0) {
          setArticles(prev => {
            if (newArticles.length > prev.length) {
              const latest = newArticles[0];
              showToast(`New story published: "${latest.title.slice(0, 45)}..."`);
            }
            return newArticles;
          });
        }
      } catch {
        // Silently skip if network or server is briefly restarting
      }
    }, 15000);

    // Keyboard shortcut for search (⌘K or Ctrl+K) and Admin Portal (Ctrl+Shift+A or ⌘+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        const isAuth = localStorage.getItem('worldplus_admin_authenticated') === 'true';
        if (isAuth) {
          setIsAdminOpen(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribeFirestore();
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(pollInterval);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    setCurrentView('article');
    const newUrl = `/article/${article.seo?.slug || article.id}`;
    window.history.pushState({ articleId: article.id }, '', newUrl);
  };

  const handleSelectCategory = (categorySlug: string) => {
    setActiveCategorySlug(categorySlug);
    setCurrentView('category');
    const newUrl = `/category/${categorySlug}`;
    window.history.pushState({ categorySlug }, '', newUrl);
  };

  const handleSelectCountry = (countryCode: string) => {
    setActiveCountryCode(countryCode);
    if (countryCode === 'GLOBAL') {
      setCurrentView('home');
      window.history.pushState({}, '', '/');
    } else {
      setCurrentView('country');
      window.history.pushState({ countryCode }, '', `/country/${countryCode.toLowerCase()}`);
    }
  };

  const handleOpenPolicy = (policyType: PolicyType) => {
    setActivePolicy(policyType);
    setCurrentView('policy');
    window.history.pushState({ policyType }, '', `/${policyType}`);
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setActiveCategorySlug('all');
    setActiveCountryCode('GLOBAL');
    setActiveArticle(null);
    window.history.pushState({}, '', '/');
  };

  const handleLikeArticle = async (articleId: string) => {
    try {
      likeArticleInFirestore(articleId);
      await fetch(`/api/articles/${articleId}/like`, { method: 'POST' }).catch(() => null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateFromTrend = async (trend: TrendItem) => {
    showToast(`Synthesizing article for "${trend.topic}"...`);
    try {
      const res = await fetch('/api/articles/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: trend.topic,
          categoryId: trend.categoryId,
          countryCode: trend.countryCode,
          isBreaking: false
        })
      });
      const data = await res.json();
      if (data.article) {
        saveArticleToFirestore(data.article);
        setArticles(prev => [data.article, ...prev.filter(a => a.id !== data.article.id)]);
        handleSelectArticle(data.article);
        showToast('Article generated and published live!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeCategory = categories.find(c => c.slug === activeCategorySlug) || categories[0];
  const activeCountry = countries.find(c => c.code === activeCountryCode) || countries[0];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Global Header (Without visible Admin Button) */}
      <Header
        categories={categories}
        countries={countries}
        selectedCategory={activeCategorySlug}
        selectedCountry={activeCountryCode}
        onSelectCategory={handleSelectCategory}
        onSelectCountry={handleSelectCountry}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => {
          const isAuth = localStorage.getItem('worldplus_admin_authenticated') === 'true';
          if (isAuth) {
            setIsAdminOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        onNavigateHome={handleNavigateHome}
        currentView={currentView}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker articles={articles} onSelectArticle={handleSelectArticle} />

      {/* Main App Content Viewport */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="font-mono text-xs text-neutral-400">
              Connecting to WorldPlus trend discovery network...
            </p>
          </div>
        ) : (
          <>
            {/* HOME VIEW */}
            {currentView === 'home' && (
              <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Clean Slate Notification if 0 articles */}
                {articles.length === 0 && (
                  <div className="mb-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center text-white shadow-xl">
                    <div className="max-w-xl mx-auto space-y-4">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>System Reset Complete</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-black">Clean Editorial Desk Ready</h2>
                      <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                        All previous articles and automated publishers have been deleted. You have a clean slate to create, write, or import your new articles.
                      </p>
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setIsAdminLoginOpen(true);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                        >
                          Open Admin Desk to Create Articles
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hero Section */}
                <HeroSection articles={articles} onSelectArticle={handleSelectArticle} />

                {/* Top Google AdSense Leaderboard Slot */}
                <AdSenseBanner slotType="header-leaderboard" adSlotId="1948201948" />

                {/* Trending Now Section */}
                <TrendingNowSection
                  trends={trends}
                  articles={articles}
                  onSelectArticle={handleSelectArticle}
                  onGenerateFromTrend={handleGenerateFromTrend}
                />

                {/* Main Content Layout with Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    {/* Category Intelligence Sections */}
                    <CategorySections
                      categories={categories}
                      articles={articles}
                      onSelectArticle={handleSelectArticle}
                      onSelectCategory={handleSelectCategory}
                    />

                    {/* Regional / Country Intelligence */}
                    <TrendingByCountry
                      countries={countries}
                      articles={articles}
                      onSelectArticle={handleSelectArticle}
                      onSelectCountryPage={(code) => {
                        setActiveCountryCode(code);
                        setCurrentView('country');
                        window.history.pushState({ countryCode: code }, '', `/country/${code.toLowerCase()}`);
                      }}
                    />
                  </div>

                  {/* Sidebar (4 cols) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Most Read worldwide Leaderboard */}
                    <MostPopularSection articles={articles} onSelectArticle={handleSelectArticle} />

                    {/* Sidebar Sticky AdSense Slot */}
                    <AdSenseBanner slotType="sidebar" adSlotId="5839201948" />

                    {/* Mission statement / Editorial Trust Box */}
                    <div className="bg-neutral-900 text-white rounded-xl p-6 border border-neutral-800 space-y-3">
                      <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Editorial Integrity Standard</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-white">Verified Global Reporting</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        WorldPlus adheres to the highest standards of international journalism and rigorous fact-checking. Every report is corroborated against verified primary sources, official government records, and authenticated global wire services.
                      </p>
                      <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>Domain: <strong>worldplus.world</strong></span>
                        <button
                          onClick={() => handleOpenPolicy('editorial')}
                          className="text-amber-400 hover:underline font-bold"
                        >
                          Editorial Standards →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLE DETAIL VIEW */}
            {currentView === 'article' && activeArticle && (
              <ArticleView
                article={activeArticle}
                relatedArticles={articles.filter(a => a.id !== activeArticle.id && a.categoryId === activeArticle.categoryId)}
                onSelectArticle={handleSelectArticle}
                onBack={handleNavigateHome}
                onLikeArticle={handleLikeArticle}
              />
            )}

            {/* CATEGORY PAGE VIEW */}
            {currentView === 'category' && activeCategory && (
              <CategoryPage
                category={activeCategory}
                articles={articles}
                onSelectArticle={handleSelectArticle}
                onBack={handleNavigateHome}
              />
            )}

            {/* COUNTRY PAGE VIEW */}
            {currentView === 'country' && activeCountry && (
              <CountryPage
                country={activeCountry}
                articles={articles}
                onSelectArticle={handleSelectArticle}
                onBack={handleNavigateHome}
              />
            )}

            {/* POLICY & LEGAL PAGES VIEW */}
            {currentView === 'policy' && (
              <PolicyPages
                policyType={activePolicy}
                onBack={handleNavigateHome}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer with Policy Links */}
      <Footer
        categories={categories}
        countries={countries}
        onSelectCategory={handleSelectCategory}
        onSelectCountry={handleSelectCountry}
        onOpenPolicy={handleOpenPolicy}
        onOpenAdmin={() => {
          const isAuth = localStorage.getItem('worldplus_admin_authenticated') === 'true';
          if (isAuth) {
            setIsAdminOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Cookie Consent Banner for AdSense / GDPR / CCPA */}
      <CookieConsent onOpenPrivacy={() => handleOpenPolicy('privacy')} />

      {/* Global Search Modal */}
      {isSearchOpen && (
        <SearchModal
          articles={articles}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {/* Admin Login Modal */}
      {isAdminLoginOpen && (
        <AdminLoginModal
          onSuccess={() => {
            setIsAdminLoginOpen(false);
            setIsAdminOpen(true);
            setCurrentView('admin');
          }}
          onClose={() => {
            setIsAdminLoginOpen(false);
            if (currentView === 'admin') setCurrentView('home');
          }}
        />
      )}

      {/* Admin Panel Modal / Dedicated View */}
      {isAdminOpen && (
        <AdminPanel
          categories={categories}
          countries={countries}
          articles={articles}
          trends={trends}
          onClose={() => {
            setIsAdminOpen(false);
            if (currentView === 'admin') handleNavigateHome();
          }}
          onRefreshData={fetchData}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-xl border border-amber-500/40 shadow-2xl flex items-center space-x-3 text-xs font-mono animate-bounce">
          <div className="p-1 rounded-full bg-amber-500 text-neutral-950">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
