export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string;
  sectionType: 'intro' | 'background' | 'developments' | 'analysis' | 'impact' | 'next_steps' | 'conclusion' | 'facts_vs_forecast';
  imageUrl?: string;
  imageCaption?: string;
  imageAlt?: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleImage {
  id: string;
  url: string;
  title: string;
  alt: string;
  caption: string;
  positionIndex: number; // 1 to 6
  placementSection: string;
  sourceAttribution: string;
  licenseType: 'Editorial' | 'Public Domain' | 'Authorized Press Wire' | 'AI Illustrated Concept';
}

export interface SEOData {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl?: string; // e.g. https://worldplus.world/article/slug
  primaryKeyword: string;
  relatedKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary_large_image' | 'summary';
  readingTimeMinutes: number;
  wordCount: number;
}

export interface QualityCheckReport {
  overallScore: number; // 0-100
  passed: boolean;
  duplicateSimilarityScore: number; // 0-100 (lower is better)
  sectionCompleteness: boolean;
  imageCount: number;
  unsupportedClaimsDetected: number;
  excessiveRepetitionScore: number;
  readabilityGrade: string;
  notes: string[];
}

export interface Article {
  id: string;
  title: string;
  shortSummary: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  countryCode: string; // e.g., 'US', 'PK', 'IN', 'GB', 'GLOBAL'
  countryName: string;
  region: string;
  featuredImage: string;
  featuredImageCaption?: string;
  featuredImageAlt?: string;
  images: ArticleImage[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  confirmedFacts: string[];
  expertAnalysis: string[];
  futureProjections: string[];
  keyTakeaways?: string[];
  seo: SEOData;
  publishedAt: string; // ISO String
  updatedAt: string;   // ISO String
  status: 'draft' | 'researching' | 'generating' | 'seo_processing' | 'ready_for_review' | 'scheduled' | 'published' | 'failed';
  viewCount: number;
  likesCount: number;
  sharesCount: number;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  opportunityScore: number;
  sources: { name: string; url: string; type: string }[];
  qualityReport?: QualityCheckReport;
  versionHistory?: { updatedAt: string; changeSummary: string; editor: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  subcategories: { id: string; name: string; slug: string }[];
  publishingFrequency: '1m' | '5m' | '10m' | '20m' | '30m' | '1h' | '3h' | '6h' | '12h' | 'daily' | 'manual';
  isAutomated: boolean;
  articleCount: number;
  order: number;
}

export interface Country {
  code: string;
  name: string;
  region: string;
  flagEmoji: string;
  isEnabled: boolean;
  priorityScore: number;
  trendingTopicsCount: number;
  articleCount: number;
}

export interface TrendItem {
  id: string;
  topic: string;
  countryCode: string;
  countryName: string;
  region: string;
  categoryId: string;
  categoryName: string;
  trendGrowth: number; // percentage growth e.g. 145%
  searchInterest: number; // 0-100
  opportunityScore: number; // 0-100
  freshnessScore: number;
  duplicateRisk: number;
  relatedKeywords: string[];
  discoveredAt: string;
  status: 'discovered' | 'in_pipeline' | 'published' | 'dismissed';
  sampleHeadline?: string;
}

export interface AutomationJob {
  id: string;
  categoryId: string;
  categoryName: string;
  topic: string;
  stage: 'idle' | 'trend_discovery' | 'country_analysis' | 'classification' | 'scoring' | 'duplicate_check' | 'research' | 'fact_check' | 'generation' | 'seo' | 'images' | 'quality_check' | 'published' | 'failed';
  progressPercent: number;
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'failed' | 'waiting' | 'paused';
  errorDetails?: string;
  generatedArticleId?: string;
}

export interface AutomationLog {
  id: string;
  timestamp: string;
  category: string;
  agent: string;
  action: string;
  level: 'info' | 'success' | 'warning' | 'error';
  details?: string;
}

export interface AdminStats {
  totalArticles: number;
  articlesToday: number;
  articlesThisWeek: number;
  activeCategoriesCount: number;
  countriesMonitoredCount: number;
  automationStatus: 'running' | 'paused' | 'degraded';
  failedJobsCount: number;
  pendingReviewCount: number;
  avgOpportunityScore: number;
  totalViews: number;
}
