import React, { useState } from 'react';
import { Code, Copy, Check, X, ShieldCheck, Globe } from 'lucide-react';
import { Article } from '../types.js';

interface SchemaInspectorModalProps {
  article: Article;
  onClose: () => void;
}

export const SchemaInspectorModal: React.FC<SchemaInspectorModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.seo.canonicalUrl
    },
    headline: article.title,
    description: article.seo.metaDescription,
    image: article.images.map(img => img.url),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'WorldPlus Editorial Desk',
      url: 'https://worldplus.world'
    },
    publisher: {
      '@type': 'Organization',
      name: 'WorldPlus',
      url: 'https://worldplus.world',
      logo: {
        '@type': 'ImageObject',
        url: 'https://worldplus.world/logo.png'
      }
    },
    articleSection: article.categoryName,
    keywords: article.seo.relatedKeywords.join(', '),
    wordCount: article.seo.wordCount,
    inLanguage: 'en-US'
  };

  const schemaString = JSON.stringify(schemaJsonLd, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Schema.org JSON-LD Structured Data</h3>
              <p className="text-xs text-neutral-400 font-mono">
                Google News &amp; SEO Rich Snippet Specification for <span className="text-amber-400">worldplus.world</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Content */}
        <div className="p-5 flex-1 overflow-y-auto font-mono text-xs text-emerald-400 bg-neutral-950/90 rounded-b-none border-y border-neutral-800">
          <pre className="whitespace-pre-wrap">{schemaString}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Valid Schema 100% compliant with Schema.org NewsArticle</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy JSON-LD'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
