import { Article, Category, Country, TrendItem, AutomationJob, AutomationLog, AdminStats } from '../src/types.js';
import { INITIAL_CATEGORIES, INITIAL_COUNTRIES } from '../src/data/initialData.js';

export class WorldPlusDatabase {
  public articles: Article[] = [];
  public categories: Category[] = [];
  public countries: Country[] = [];
  public trends: TrendItem[] = [];
  public jobs: AutomationJob[] = [];
  public logs: AutomationLog[] = [];
  public isAutomationActive: boolean = false;
  public masterPublishingFrequencyMinutes: number = 60;
  public lastPublishTimestamp: number = Date.now();

  constructor() {
    this.seedCategories();
    this.seedCountries();
  }

  private seedCategories() {
    this.categories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
  }

  private seedCountries() {
    this.countries = JSON.parse(JSON.stringify(INITIAL_COUNTRIES));
  }

  public clearAllArticles() {
    const previousCount = this.articles.length;
    this.articles = [];
    this.trends = [];
    this.addLog('System', 'Admin Maintenance', `All ${previousCount} articles and trends cleared from system memory.`, 'warning');
    return { success: true, clearedCount: previousCount };
  }

  public getStats(): AdminStats {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const publishedArticles = this.articles.filter(a => a.status === 'published');
    const articlesToday = publishedArticles.filter(a => new Date(a.publishedAt) >= todayStart).length;
    const articlesThisWeek = publishedArticles.filter(a => new Date(a.publishedAt) >= weekStart).length;
    const pendingReview = this.articles.filter(a => a.status === 'ready_for_review').length;
    const failedJobs = this.jobs.filter(j => j.status === 'failed').length;

    const totalViews = this.articles.reduce((acc, a) => acc + (a.viewCount || 0), 0);
    const avgScore = this.articles.length > 0 
      ? Math.round(this.articles.reduce((acc, a) => acc + (a.opportunityScore || 85), 0) / this.articles.length)
      : 0;

    return {
      totalArticles: this.articles.length,
      articlesToday,
      articlesThisWeek,
      activeCategoriesCount: this.categories.filter(c => c.isAutomated).length,
      countriesMonitoredCount: this.countries.filter(c => c.isEnabled).length,
      automationStatus: this.isAutomationActive ? 'running' : 'paused',
      failedJobsCount: failedJobs,
      pendingReviewCount: pendingReview,
      avgOpportunityScore: avgScore,
      totalViews
    };
  }

  public addLog(category: string, agent: string, action: string, level: 'info' | 'success' | 'warning' | 'error' = 'info', details?: string) {
    const newLog: AutomationLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      category,
      agent,
      action,
      level,
      details
    };
    this.logs.unshift(newLog);
    if (this.logs.length > 100) {
      this.logs.pop();
    }
  }
}

export const db = new WorldPlusDatabase();
