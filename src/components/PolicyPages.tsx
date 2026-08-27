import React from 'react';
import { Shield, FileText, CheckCircle2, AlertCircle, Mail, MapPin, Globe, ChevronLeft } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'editorial' | 'dmca' | 'contact';

interface PolicyPagesProps {
  policyType: PolicyType;
  onBack: () => void;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({ policyType, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center space-x-2 text-xs font-mono font-medium text-neutral-500 hover:text-amber-500 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to WorldPlus Newsfeed</span>
      </button>

      {/* PRIVACY POLICY */}
      {policyType === 'privacy' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Google AdSense &amp; GDPR Compliant</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Effective Date: January 1, 2026 • Canonical Domain: <strong>worldplus.world</strong>
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. Overview &amp; Commitment</h2>
              <p>
                WorldPlus (operated at <strong>worldplus.world</strong>) is dedicated to safeguarding the privacy and digital rights of our global readers. This Privacy Policy details how we collect, process, and protect your information when accessing our news reporting, trending intelligence, and multimedia feeds.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Google AdSense &amp; Third-Party Cookies</h2>
              <p>
                WorldPlus partners with Google AdSense and third-party advertising vendors to deliver relevant, non-intrusive advertisements. 
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie) to serve ads based on visits to worldplus.world and other websites on the Internet.</li>
                <li>Users may opt out of personalized advertising by visiting Google Ad Settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">google.com/settings/ads</a> or through the Network Advertising Initiative at <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">aboutads.info</a>.</li>
                <li>We adhere strictly to Google Publisher Policies, ensuring ads do not encourage invalid clicks and are clearly marked with "Advertisement" disclosures.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">3. Information We Collect</h2>
              <p>
                We do not sell personal identification data. We collect anonymous aggregate telemetry (browser type, regional edition preferences, pageviews, and session timestamps) purely to optimize load speed and content delivery across our global edge CDN network.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">4. Data Protection Rights (GDPR &amp; CCPA)</h2>
              <p>
                Under the European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), visitors have the right to access, rectify, or request deletion of any stored analytics cookies. Contact our Data Protection Officer at <code className="text-amber-500 font-mono">privacy@worldplus.world</code>.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* TERMS OF SERVICE */}
      {policyType === 'terms' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Publisher Terms</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              Last Updated: January 1, 2026 • Domain: <strong>worldplus.world</strong>
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. Acceptance of Terms</h2>
              <p>
                By accessing <strong>worldplus.world</strong> or our syndicate RSS feeds, you agree to comply with all applicable local, national, and international laws. If you do not accept these terms, please discontinue using this service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Intellectual Property &amp; Original Reporting</h2>
              <p>
                All original news reporting, investigative analysis, structured datasets, and visual presentations authored by WorldPlus are protected under international copyright treaties. Syndication and excerpting are permitted provided explicit canonical attribution is given to <code className="text-amber-500 font-mono">https://worldplus.world</code>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">3. Disclaimers &amp; Editorial Independence</h2>
              <p>
                While WorldPlus implements automated multi-source verification and human editorial oversight, articles are provided for informational and analytical purposes only. We disclaim liability for financial, medical, or legal decisions made on the basis of published reporting.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* EDITORIAL & FACT-CHECKING POLICY */}
      {policyType === 'editorial' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>E-E-A-T Standards</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Editorial &amp; Fact-Checking Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              High-Trust Autonomous Journalism Guidelines
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">1. The 14-Stage Verification Standard</h2>
              <p>
                Every story published on WorldPlus passes through our multi-agent verification pipeline. Before any article is cleared for publication:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li>Primary empirical claims must be corroborated across at least three independent official registries or academic journals.</li>
                <li>Facts are strictly partitioned from subjective projections and expert analysis.</li>
                <li>Plagiarism and duplicate similarity is programmatically audited to ensure 100% original synthesis.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. Corrections Policy</h2>
              <p>
                When an empirical error is identified, WorldPlus issues a transparent update note directly within the article's version history log with timestamped revisions.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* DMCA & COPYRIGHT */}
      {policyType === 'dmca' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
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
                WorldPlus guarantees that all textual articles are 100% original AI-synthesized research publications, created through multi-source factual corroboration without verbatim copying of third-party prose. All imagery utilizes royalty-free, authorized editorial wire licenses or CC0 media with full author and wire credits.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">2. DMCA Takedown Notice Protocol</h2>
              <p>
                If you believe your copyrighted work has been improperly referenced without authorization, please notify our Designated Copyright Agent immediately at <code className="text-amber-500 font-mono">dmca@worldplus.world</code> with the subject line <strong>"DMCA Notice - [Article URL]"</strong>. Valid notices are processed and resolved within 24 business hours.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* CONTACT EDITORIAL BUREAU */}
      {policyType === 'contact' && (
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Global Bureaus</span>
            </div>
            <h1 className="font-serif font-black text-3xl md:text-4xl text-neutral-900 dark:text-white">
              Contact WorldPlus Editorial Board
            </h1>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              International Press &amp; Intelligence Desks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase font-mono">
                <Mail className="w-4 h-4" />
                <span>Editorial &amp; Press Wire</span>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">editorial@worldplus.world</p>
              <p className="text-xs text-neutral-500">For press releases, breaking wire tips, and confidential disclosures.</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs uppercase font-mono">
                <Shield className="w-4 h-4" />
                <span>Legal &amp; Compliance</span>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">legal@worldplus.world</p>
              <p className="text-xs text-neutral-500">For AdSense partnerships, DMCA inquiries, and privacy requests.</p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
