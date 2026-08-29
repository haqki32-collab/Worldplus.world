import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';
import { aiService } from './server/aiService.js';
import { rssService } from './server/rssService.js';
import { SitemapService } from './server/sitemapService.js';
import { persistArticleToFirestore } from './server/firebaseSync.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // SEO & Sitemap Routes
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(SitemapService.getRobotsTxt());
  });

  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(SitemapService.getIndexSitemap());
  });

  app.get('/sitemap-articles.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(SitemapService.getArticlesSitemap());
  });

  app.get('/sitemap-categories.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(SitemapService.getCategoriesSitemap());
  });

  app.get('/sitemap-countries.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(SitemapService.getCountriesSitemap());
  });

  app.get('/sitemap-images.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(SitemapService.getImagesSitemap());
  });

  app.get(['/rss.xml', '/feed.xml'], (req, res) => {
    res.setHeader('Content-Type', 'application/rss+xml');
    res.send(SitemapService.getRssFeed());
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', domain: 'worldplus.world', time: new Date().toISOString() });
  });

  app.get('/api/stats', (req, res) => {
    res.json(db.getStats());
  });

  app.get('/api/logs', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 50;
    const category = req.query.category as string;
    let filteredLogs = db.logs;
    if (category) {
      filteredLogs = filteredLogs.filter(l => l.category.toLowerCase() === category.toLowerCase());
    }
    res.json(filteredLogs.slice(0, limit));
  });

  // Article APIs
  app.get('/api/articles', (req, res) => {
    const { category, country, query, status = 'published', limit, sort = 'latest' } = req.query;
    let results = [...db.articles];

    if (status !== 'all') {
      results = results.filter(a => a.status === status);
    }

    if (category && category !== 'all') {
      results = results.filter(a => a.categoryId.toLowerCase() === (category as string).toLowerCase());
    }

    if (country && country !== 'all' && country !== 'GLOBAL') {
      results = results.filter(a => a.countryCode.toUpperCase() === (country as string).toUpperCase() || a.countryCode === 'GLOBAL');
    }

    if (query) {
      const q = (query as string).toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.shortSummary.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q) ||
        a.seo.relatedKeywords.some(k => k.toLowerCase().includes(q))
      );
    }

    if (sort === 'popular') {
      results.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sort === 'trending') {
      results.sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0));
    } else {
      results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    if (limit) {
      results = results.slice(0, parseInt(limit as string));
    }

    res.json(results);
  });

  app.get('/api/articles/:idOrSlug', (req, res) => {
    const { idOrSlug } = req.params;
    const article = db.articles.find(a => a.id === idOrSlug || a.seo.slug === idOrSlug);
    if (!article) {
      return res.status(404).json({ error: 'Article not found on worldplus.world' });
    }
    article.viewCount = (article.viewCount || 0) + 1;
    res.json(article);
  });

  app.post('/api/articles', (req, res) => {
    const newArt = req.body;
    if (!newArt.title || !newArt.categoryId) {
      return res.status(400).json({ error: 'Missing required article fields' });
    }
    db.articles.unshift(newArt);
    persistArticleToFirestore(newArt);
    db.addLog(newArt.categoryName || 'General', 'Admin Publishing', `Manually created article: "${newArt.title}"`, 'success');
    res.json(newArt);
  });

  app.put('/api/articles/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.articles.findIndex(a => a.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    db.articles[idx] = { ...db.articles[idx], ...req.body, updatedAt: new Date().toISOString() };
    db.addLog(db.articles[idx].categoryName, 'Editorial Desk', `Updated article "${db.articles[idx].title}"`, 'info');
    res.json(db.articles[idx]);
  });

  app.delete('/api/articles/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.articles.findIndex(a => a.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const removed = db.articles.splice(idx, 1)[0];
    db.addLog(removed.categoryName, 'Admin Desk', `Deleted article: "${removed.title}"`, 'warning');
    res.json({ success: true, removedId: id });
  });

  app.post('/api/articles/:id/like', (req, res) => {
    const { id } = req.params;
    const article = db.articles.find(a => a.id === id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    article.likesCount = (article.likesCount || 0) + 1;
    res.json({ likesCount: article.likesCount });
  });

  app.post('/api/articles/:id/publish', (req, res) => {
    const { id } = req.params;
    const article = db.articles.find(a => a.id === id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    article.status = 'published';
    article.publishedAt = new Date().toISOString();
    db.addLog(article.categoryName, 'Publishing Agent', `Approved and published article: "${article.title}"`, 'success');
    res.json(article);
  });

  app.post('/api/articles/:id/unpublish', (req, res) => {
    const { id } = req.params;
    const article = db.articles.find(a => a.id === id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    article.status = 'draft';
    db.addLog(article.categoryName, 'Publishing Agent', `Moved article to draft: "${article.title}"`, 'warning');
    res.json(article);
  });

  app.post('/api/articles/generate-ai', async (req, res) => {
    try {
      const { topic, categoryId, countryCode, isBreaking } = req.body;
      if (!topic) {
        return res.status(400).json({ error: 'Topic is required for AI generation' });
      }
      db.addLog('AI Engine', 'Multi-Agent Pipeline', `Started on-demand article generation for "${topic}"`, 'info');
      const article = await aiService.generateFullArticle(topic, categoryId || 'technology', countryCode || 'GLOBAL', isBreaking || false);
      db.articles.unshift(article);
      persistArticleToFirestore(article);
      db.addLog(article.categoryName, 'Publishing Agent', `Successfully generated & published: "${article.title}"`, 'success');
      res.json({ success: true, article });
    } catch (err: any) {
      console.error('AI generation error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate article' });
    }
  });

  // Category APIs
  app.get('/api/categories', (req, res) => {
    res.json(db.categories);
  });

  app.post('/api/categories', (req, res) => {
    const newCat = req.body;
    db.categories.push(newCat);
    db.addLog('System', 'Category Manager', `Added new category: "${newCat.name}"`, 'info');
    res.json(newCat);
  });

  app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Category not found' });
    db.categories[idx] = { ...db.categories[idx], ...req.body };
    db.addLog(db.categories[idx].name, 'Category Manager', `Updated category settings for "${db.categories[idx].name}"`, 'info');
    res.json(db.categories[idx]);
  });

  app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Category not found' });
    const removed = db.categories.splice(idx, 1)[0];
    db.addLog('System', 'Category Manager', `Deleted category: "${removed.name}"`, 'warning');
    res.json({ success: true, removedId: id });
  });

  // Country APIs
  app.get('/api/countries', (req, res) => {
    res.json(db.countries);
  });

  app.put('/api/countries/:code', (req, res) => {
    const { code } = req.params;
    const country = db.countries.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!country) return res.status(404).json({ error: 'Country not found' });
    Object.assign(country, req.body);
    db.addLog('System', 'Country Manager', `Updated settings for ${country.name}`, 'info');
    res.json(country);
  });

  // Trend APIs
  app.get('/api/trends', (req, res) => {
    const { country, category } = req.query;
    let list = [...db.trends];
    if (country && country !== 'all') {
      list = list.filter(t => t.countryCode.toUpperCase() === (country as string).toUpperCase() || t.countryCode === 'GLOBAL');
    }
    if (category && category !== 'all') {
      list = list.filter(t => t.categoryId.toLowerCase() === (category as string).toLowerCase());
    }
    res.json(list);
  });

  app.post('/api/trends/discover', async (req, res) => {
    try {
      const { categorySlug, countryCode } = req.body;
      const discovered = await aiService.discoverTrends(categorySlug, countryCode);
      // Append discovered trends
      discovered.forEach((item: any) => {
        const newTrend = {
          id: 'trend-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          ...item,
          discoveredAt: new Date().toISOString(),
          status: 'discovered'
        };
        db.trends.unshift(newTrend);
      });
      db.addLog(categorySlug || 'Trends', 'Trend Discovery Agent', `Discovered ${discovered.length} trending items for ${countryCode || 'Global'}`, 'success');
      res.json({ success: true, trends: db.trends });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Live RSS Real News Wire APIs (BBC World, Dawn, Google News, Reuters)
  app.get('/api/rss/latest', async (req, res) => {
    try {
      const items = await rssService.fetchAllGlobalFeeds();
      res.json({ count: items.length, items });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/rss/sync', async (req, res) => {
    try {
      const limit = req.body?.limit ? parseInt(req.body.limit) : 8;
      const result = await rssService.syncRealNewsToDatabase(limit);
      res.json({ success: true, ...result, totalArticles: db.articles.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Automation Engine APIs
  app.get('/api/automation/status', (req, res) => {
    res.json({
      isActive: db.isAutomationActive,
      masterFrequencyMinutes: db.masterPublishingFrequencyMinutes,
      lastPublishTimestamp: db.lastPublishTimestamp,
      nextEstimatedPublishTimestamp: db.lastPublishTimestamp + (db.masterPublishingFrequencyMinutes * 60 * 1000),
      totalCategories: db.categories.length,
      activeCategories: db.categories.filter(c => c.isAutomated !== false).length,
      totalArticles: db.articles.length
    });
  });

  app.post('/api/automation/toggle', (req, res) => {
    db.isAutomationActive = !db.isAutomationActive;
    db.addLog('System', 'Automation Controller', `Master 1-minute automation engine ${db.isAutomationActive ? 'RESUMED' : 'PAUSED'}`, db.isAutomationActive ? 'success' : 'warning');
    res.json({ isActive: db.isAutomationActive });
  });

  app.post('/api/automation/run-cycle', async (req, res) => {
    try {
      const { categoryId } = req.body;
      const result = await aiService.runAutomatedPublishingCycle(categoryId);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/automation/run-all-categories', async (req, res) => {
    try {
      const result = await aiService.runAllCategoriesPublishingCycle();
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/automation/update-frequency', (req, res) => {
    const { minutes } = req.body;
    if (minutes && minutes >= 1) {
      db.masterPublishingFrequencyMinutes = minutes;
      db.addLog('System', 'Automation Controller', `Updated global publishing schedule to every ${minutes} minute(s)`, 'info');
    }
    res.json({ masterFrequencyMinutes: db.masterPublishingFrequencyMinutes });
  });

  // Auto-sync real RSS feeds on startup in the background
  setTimeout(() => {
    rssService.syncRealNewsToDatabase(10).catch(e => console.warn('[Startup RSS Sync Note]:', e));
  }, 2000);

  // Background automated interval timer: Runs every 1 minute (60 seconds) publishing across all categories
  setInterval(async () => {
    if (db.isAutomationActive) {
      console.log('[WorldPlus 1-Min Auto-Publisher] Executing scheduled 1-minute all-categories publishing blast...');
      try {
        await aiService.runAllCategoriesPublishingCycle();
      } catch (err) {
        console.error('[WorldPlus 1-Min Auto-Publisher] Error during background cycle:', err);
      }
    }
  }, 60 * 1000);

  // Periodic Real News Wire Sync: every 5 minutes pulls fresh breaking BBC & Dawn RSS wire
  setInterval(() => {
    rssService.syncRealNewsToDatabase(4).catch(e => console.warn('[Periodic RSS Wire Sync Note]:', e));
  }, 5 * 60 * 1000);

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WorldPlus server running on http://0.0.0.0:${PORT} (Domain: worldplus.world)`);
  });
}

startServer();
