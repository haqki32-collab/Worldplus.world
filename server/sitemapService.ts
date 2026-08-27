import { db } from './db.js';

const BASE_DOMAIN = 'https://worldplus.world';

export class SitemapService {
  public static getRobotsTxt(): string {
    return `User-agent: *
Allow: /
Sitemap: ${BASE_DOMAIN}/sitemap.xml
Sitemap: ${BASE_DOMAIN}/sitemap-articles.xml
Sitemap: ${BASE_DOMAIN}/sitemap-categories.xml
Sitemap: ${BASE_DOMAIN}/sitemap-countries.xml
Sitemap: ${BASE_DOMAIN}/sitemap-images.xml
Sitemap: ${BASE_DOMAIN}/rss.xml
`;
  }

  public static getIndexSitemap(): string {
    const now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_DOMAIN}/sitemap-articles.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_DOMAIN}/sitemap-categories.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_DOMAIN}/sitemap-countries.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_DOMAIN}/sitemap-images.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
  }

  public static getArticlesSitemap(): string {
    const urls = db.articles
      .filter(a => a.status === 'published')
      .map(a => `  <url>
    <loc>${BASE_DOMAIN}/article/${a.seo.slug}</loc>
    <lastmod>${a.updatedAt || a.publishedAt}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${BASE_DOMAIN}</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
${urls}
</urlset>`;
  }

  public static getCategoriesSitemap(): string {
    const urls = db.categories
      .map(c => `  <url>
    <loc>${BASE_DOMAIN}/category/${c.slug}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  public static getCountriesSitemap(): string {
    const urls = db.countries
      .filter(c => c.isEnabled)
      .map(c => `  <url>
    <loc>${BASE_DOMAIN}/country/${c.code.toLowerCase()}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  public static getImagesSitemap(): string {
    const imageBlocks: string[] = [];

    db.articles.forEach(a => {
      if (a.images && a.images.length > 0) {
        const imgEntries = a.images.map(img => `    <image:image>
      <image:loc>${img.url}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`).join('\n');

        imageBlocks.push(`  <url>
    <loc>${BASE_DOMAIN}/article/${a.seo.slug}</loc>
${imgEntries}
  </url>`);
      }
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageBlocks.join('\n')}
</urlset>`;
  }

  public static getRssFeed(): string {
    const now = new Date().toUTCString();
    const items = db.articles
      .filter(a => a.status === 'published')
      .map(a => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${BASE_DOMAIN}/article/${a.seo.slug}</link>
      <guid isPermaLink="true">${BASE_DOMAIN}/article/${a.seo.slug}</guid>
      <description><![CDATA[${a.shortSummary}]]></description>
      <category>${a.categoryName}</category>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    </item>`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WorldPlus - Global News &amp; Trending Information</title>
    <link>${BASE_DOMAIN}</link>
    <description>Discover verified global trends, breaking technology, business analysis, and international events on worldplus.world.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  }
}
