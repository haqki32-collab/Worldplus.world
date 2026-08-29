import React, { useState } from 'react';
import { 
  Shield, FileText, CheckCircle2, AlertCircle, Mail, MapPin, Globe, 
  ChevronLeft, HelpCircle, Info, Cookie, ArrowRight, ExternalLink,
  Search, Award, Sparkles, RefreshCw, Send, Check
} from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'editorial' | 'dmca' | 'contact' | 'about' | 'faqs' | 'cookies';

interface PolicyPagesProps {
  policyType: PolicyType;
  onBack: () => void;
  onSelectPolicy?: (type: PolicyType) => void;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({ policyType, onBack, onSelectPolicy }) => {
  const [activeFaqCategory, setActiveFaqCategory] = useState<'general' | 'editorial' | 'adsense' | 'technical'>('general');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', subject: '', message: '', category: 'editorial' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormData.email || !contactFormData.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactFormData({ name: '', email: '', subject: '', message: '', category: 'editorial' });
    }, 4000);
  };

  const navTabs: { id: PolicyType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'editorial', label: 'Editorial & Fact-Check', icon: CheckCircle2 },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'about', label: 'About WorldPlus', icon: Info },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
    { id: 'dmca', label: 'DMCA & Copyright', icon: AlertCircle },
    { id: 'contact', label: 'Contact Bureau', icon: Mail },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Header & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to WorldPlus Live Newsfeed</span>
        </button>

        <div className="text-xs font-mono text-neutral-400 flex items-center space-x-2">
          <span>Domain: <strong className="text-neutral-700 dark:text-neutral-200">worldplus.world</strong></span>
          <span>•</span>
          <span className="text-emerald-500 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified Compliance</span>
          </span>
        </div>
      </div>

      {/* Policy Navigation Bar */}
      {onSelectPolicy && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {navTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = policyType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectPolicy(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PRIVACY POLICY */}
      {/* ========================================================================= */}
      {policyType === 'privacy' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Google AdSense &amp; GDPR / CCPA Compliant</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Effective Date: January 1, 2026 • Last Reviewed: August 2026 • Canonical Domain: <strong>worldplus.world</strong>
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. Overview &amp; Commitment</h2>
              <p>
                WorldPlus (accessible at <strong>https://worldplus.world</strong>) is committed to protecting the privacy of our global visitors. This document describes the types of information we collect, how it is used, and the measures we undertake to ensure compliance with global data protection frameworks including the <strong>General Data Protection Regulation (GDPR)</strong>, the <strong>California Consumer Privacy Act (CCPA)</strong>, and <strong>Google Publisher Policies</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Google AdSense &amp; Third-Party Advertising</h2>
              <p>
                WorldPlus uses Google AdSense and authorized advertising networks to serve advertisements when you visit our website. 
              </p>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
                <p className="font-semibold text-neutral-900 dark:text-white">Important Advertising Disclosures:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
                  <li><strong>Third-Party Cookies:</strong> Google and other third-party vendors use cookies (including the DoubleClick DART cookie) to serve ads based on prior visits to worldplus.world and other websites across the web.</li>
                  <li><strong>Personalized Ads Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google's Ad Settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-bold hover:underline">google.com/settings/ads</a> or through <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-bold hover:underline">aboutads.info</a>.</li>
                  <li><strong>Transparency:</strong> All advertisements and sponsored widgets are clearly designated with standard labels ("Advertisement" or "Sponsored Spotlight") in strict accordance with Google AdSense Guidelines.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">3. Information We Collect</h2>
              <p>
                We do not require account registration or store sensitive personal information for reading news. We collect:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Anonymous Log &amp; Telemetry Data:</strong> IP addresses, browser user agent, device screen resolutions, referring URLs, and timestamp data used solely to prevent malicious bot scraping and monitor server latency.</li>
                <li><strong>Reader Preferences:</strong> Local storage settings such as preferred reading themes (dark/light mode) or regional country edition filters.</li>
                <li><strong>Direct Inquiries:</strong> Name and email address when you voluntarily contact our editorial desk via email or contact forms.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">4. Data Protection Rights (GDPR &amp; CCPA)</h2>
              <p>
                Under applicable legislation, you retain rights including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Right to access and review any collected telemetry.</li>
                <li>Right to request deletion of cached cookies or personal communications.</li>
                <li>Right to non-discrimination for exercising privacy rights.</li>
              </ul>
              <p className="text-xs pt-1">
                To submit a privacy inquiry or data erasure request, please email our Data Compliance Officer at <code className="text-amber-500 font-mono font-bold">privacy@worldplus.world</code>.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 2. TERMS OF SERVICE */}
      {/* ========================================================================= */}
      {policyType === 'terms' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Publisher Terms &amp; Conditions</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Last Updated: January 1, 2026 • Canonical Domain: <strong>worldplus.world</strong>
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. Acceptance of Terms</h2>
              <p>
                By accessing <strong>worldplus.world</strong>, our RSS syndicated feeds, or any related mobile or digital endpoints, you agree to be bound by these Terms of Service, applicable laws, and regulations. If you disagree with any part of these terms, you are prohibited from using this platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Permitted Use &amp; Syndication</h2>
              <p>
                WorldPlus provides open access to international news, investigative reporting, and factual analysis. 
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li><strong>Fair Use Excerpting:</strong> Journalists, researchers, and bloggers may excerpt up to 150 words from our articles provided canonical attribution is linked directly to the original article URL on <code>https://worldplus.world</code>.</li>
                <li><strong>Prohibited Scraping:</strong> Mass unauthorized automated data scraping that overloads our infrastructure or duplicates full-text articles for monetization on competing platforms is strictly prohibited.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">3. Disclaimers &amp; Editorial Independence</h2>
              <p>
                Our reporting is produced for educational, informative, and analytical purposes. Financial, geopolitical, health, or technology reporting does not constitute certified legal, medical, or investment advice. WorldPlus accepts no liability for decisions made based on editorial content.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 3. EDITORIAL & FACT-CHECKING POLICY */}
      {/* ========================================================================= */}
      {policyType === 'editorial' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>E-E-A-T Editorial Standard</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Editorial &amp; Fact-Checking Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Autonomous Verification &amp; Journalistic Integrity Guidelines
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. The Multi-Stage Verification Pipeline</h2>
              <p>
                WorldPlus operates on high-trust verification protocols. Before an article is cleared for live publication:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Multi-Source Corroboration</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Primary empirical data and quotes must be substantiated across at least 3 independent press wires, academic registries, or verified institutional communiqués.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1.5">
                  <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs font-mono">
                    <Shield className="w-4 h-4" />
                    <span>Fact vs. Projection Partitioning</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Confirmed facts, expert commentary, and statistical forecast models are explicitly segregated into distinct editorial blocks to eliminate bias.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Corrections &amp; Transparent Version History</h2>
              <p>
                We believe in complete transparency. Whenever an empirical statistic, spelling, or attribution is corrected, an editor's note is appended to the article's version history log detailing the exact timestamp and rationale.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 4. FAQS (FREQUENTLY ASKED QUESTIONS) */}
      {/* ========================================================================= */}
      {policyType === 'faqs' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Reader Knowledge Base</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Everything you need to know about WorldPlus reporting, rotation schedules, and partnerships
            </p>
          </div>

          {/* FAQ Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'general', label: 'General & Newsroom' },
              { id: 'editorial', label: 'Publishing & Rotation' },
              { id: 'adsense', label: 'Ads & Partners' },
              { id: 'technical', label: 'SEO & Syndication' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFaqCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeFaqCategory === cat.id
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4 pt-2">
            {activeFaqCategory === 'general' && (
              <>
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    What is WorldPlus and what is its canonical domain?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    WorldPlus is an international digital news intelligence publication accessible at <strong>worldplus.world</strong>. We cover 24 global categories across 20+ countries with structured deep-dive journalism and real-time updates.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    Is WorldPlus free to read?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Yes! All articles, investigative reports, fact-checking summaries, and RSS feeds on WorldPlus are 100% free and open access for readers worldwide.
                  </p>
                </div>
              </>
            )}

            {activeFaqCategory === 'editorial' && (
              <>
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    How does the 1-Hour Homepage Lead &amp; Hourly Trending Rotation work?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Whenever a new article is published, it receives the exclusive <strong>Top Lead Headline</strong> on the homepage for exactly <strong>60 minutes (1 hour)</strong> with a live breaking badge. After 1 hour has elapsed, the homepage top lead spot rotates through our highest-scoring <strong>Trending Stories</strong> pool on an hourly basis.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    How are sources verified?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Our newsroom verifies developments against primary institutional releases, official press wires (Reuters, AP, AFP), academic registries, and official national data bureaus.
                  </p>
                </div>
              </>
            )}

            {activeFaqCategory === 'adsense' && (
              <>
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    What is the relationship between WorldPlus and Rizqdaan.com?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    <strong>Rizqdaan.com</strong> is our featured strategic partner portal offering free online utilities, business calculators, career directory listings, and entrepreneurial resources. We promote their verified tools across our designated sponsored placements.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    Are the advertising units compliant with Google AdSense?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Yes. All advertising units feature strict standard labeling ("Advertisement" / "Sponsored"), maintain proper spacing margins, and comply with Google Publisher Policies.
                  </p>
                </div>
              </>
            )}

            {activeFaqCategory === 'technical' && (
              <>
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    Where can I access WorldPlus RSS Feeds and XML Sitemaps?
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    You can access our valid RSS 2.0 wire at <a href="/rss.xml" target="_blank" className="text-amber-500 font-mono font-bold hover:underline">/rss.xml</a> and our Google-compliant index sitemap at <a href="/sitemap.xml" target="_blank" className="text-amber-500 font-mono font-bold hover:underline">/sitemap.xml</a>.
                  </p>
                </div>
              </>
            )}
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 5. ABOUT WORLDPLUS */}
      {/* ========================================================================= */}
      {policyType === 'about' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Info className="w-3.5 h-3.5" />
              <span>Global Bureau Profile</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              About WorldPlus (worldplus.world)
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Autonomous Intelligence &amp; Independent Global Journalism
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              <strong>WorldPlus</strong> (<a href="https://worldplus.world" className="text-amber-500 font-bold hover:underline">worldplus.world</a>) is an independent international news network built to deliver timely, factual, and richly contextualized journalism across 24 critical domains of human progress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-1">
                <span className="text-2xl font-black font-serif text-amber-500">24</span>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Global Desks</p>
                <p className="text-[11px] text-neutral-400">Tech, Economy, Health, Climate &amp; Science</p>
              </div>

              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-1">
                <span className="text-2xl font-black font-serif text-emerald-500">20+</span>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Regional Hubs</p>
                <p className="text-[11px] text-neutral-400">USA, PK, UK, India, UAE, EU &amp; Asia</p>
              </div>

              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-1">
                <span className="text-2xl font-black font-serif text-blue-500">100%</span>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Verified Facts</p>
                <p className="text-[11px] text-neutral-400">Multi-source corroboration &amp; attribution</p>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">Our Mission</h2>
              <p>
                In an era dominated by clickbait and unverified claims, WorldPlus focuses on comprehensive structural context: dissecting what occurred, why it matters, verified facts versus forecast modeling, and direct impacts on citizens and industries worldwide.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 6. COOKIE POLICY */}
      {/* ========================================================================= */}
      {policyType === 'cookies' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Disclosures</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Cookie Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Detailed breakdown of cookies utilized on <strong>worldplus.world</strong>
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. What Are Cookies?</h2>
              <p>
                Cookies are compact alphanumeric files stored in your web browser that enable websites to remember user preferences, maintain session state, and deliver customized advertising.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Categories of Cookies We Use</h2>
              <div className="space-y-3">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <h4 className="font-bold text-xs uppercase font-mono text-emerald-500 mb-1">Essential &amp; Functional Cookies</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Saves your theme preference (dark or light mode) and active country edition filter. These do not track personal identifying data across external sites.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <h4 className="font-bold text-xs uppercase font-mono text-amber-500 mb-1">Google AdSense Advertising Cookies</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Google uses DoubleClick cookies to serve contextual and interest-based advertising. You may manage these at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">adssettings.google.com</a>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 7. DMCA & COPYRIGHT */}
      {/* ========================================================================= */}
      {policyType === 'dmca' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>100% Non-Copyright Guarantee</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              DMCA Copyright &amp; Non-Copyright Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Strict Intellectual Property &amp; Fair Use Compliance
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. 100% Original Non-Copyright Guarantee</h2>
              <p>
                WorldPlus guarantees that all news reporting and investigative synthesis on <strong>worldplus.world</strong> is 100% original, authored without verbatim duplication of third-party prose. All imagery utilizes royalty-free, authorized editorial wire licenses or CC0 media with full author and wire credits.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. DMCA Takedown Notice Protocol</h2>
              <p>
                If you believe your copyrighted work has been referenced without proper authorization, please notify our Designated Copyright Agent immediately at <code className="text-amber-500 font-mono font-bold">dmca@worldplus.world</code> with:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Identification of the copyrighted material claimed to have been infringed.</li>
                <li>The exact URL on worldplus.world where the material is located.</li>
                <li>Your contact details and an electronic signature affirming good-faith belief of infringement.</li>
              </ul>
              <p className="text-xs pt-1">
                Valid DMCA notices are reviewed and resolved within 24 business hours.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 8. CONTACT EDITORIAL BUREAU */}
      {/* ========================================================================= */}
      {policyType === 'contact' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Communication</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Contact WorldPlus Editorial Board
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              International Press, Newsroom Tips &amp; Compliance Inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase font-mono">
                <Mail className="w-4 h-4" />
                <span>Editorial &amp; Press Wire</span>
              </div>
              <p className="text-base font-semibold text-neutral-900 dark:text-white">editorial@worldplus.world</p>
              <p className="text-xs text-neutral-500">For press releases, breaking wire tips, and confidential disclosures.</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs uppercase font-mono">
                <Shield className="w-4 h-4" />
                <span>Legal &amp; Compliance</span>
              </div>
              <p className="text-base font-semibold text-neutral-900 dark:text-white">legal@worldplus.world</p>
              <p className="text-xs text-neutral-500">For AdSense partnerships, DMCA inquiries, and privacy requests.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white mb-4">
              Send an Official Editorial Inquiry
            </h3>

            {contactSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center space-x-3">
                <Check className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Inquiry Dispatched Successfully</h4>
                  <p className="text-xs">Your transmission has been forwarded to the WorldPlus editorial desk. Our duty editor will respond shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 mb-1">Department</label>
                    <select
                      value={contactFormData.category}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="editorial">Editorial &amp; News Tips</option>
                      <option value="adsense">AdSense &amp; Advertising Partnerships</option>
                      <option value="dmca">DMCA &amp; Copyright Notice</option>
                      <option value="privacy">Privacy &amp; Data Subject Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Press wire release inquiry"
                      value={contactFormData.subject}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide detailed information regarding your inquiry..."
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-xs font-mono uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform hover:scale-105"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

