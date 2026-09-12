import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import HeroSection from '../components/landing/HeroSection';
import ProblemComparison from '../components/landing/ProblemComparison';
import ProductFlowSection from '../components/landing/ProductFlowSection';
import MidPageCtaSection from '../components/landing/MidPageCtaSection';
import FrameworkMappingSection from '../components/landing/FrameworkMappingSection';
import EvidenceIntegritySection from '../components/landing/EvidenceIntegritySection';
import SecurityPrinciplesSection from '../components/landing/SecurityPrinciplesSection';
import DemoExperienceSection from '../components/landing/DemoExperienceSection';
import EngineeringCredibilitySection from '../components/landing/EngineeringCredibilitySection';
import FinalCtaSection from '../components/landing/FinalCtaSection';

/**
 * GRC Engine Redesigned Landing Page
 * Hierarchy: High-Utility Command Hero -> Single Comprehensive Comparison Matrix ->
 *            Product Flow & Inspector -> Strategic Mid CTA -> Framework Mapping ->
 *            Evidence Verification -> Security Commitments -> Sandbox -> Tech Stack -> Final CTA
 */
export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-[var(--ink)] font-sans transition-colors duration-150 selection:bg-sky-500/20 selection:text-sky-900 dark:selection:text-sky-200 overflow-x-hidden">
      {/* 01 — Top Navigation */}
      <StudioNav />

      <main>
        {/* 02 — Hero: Command Center UI Cockpit */}
        <HeroSection />

        {/* 03 — Consolidated Comparison Matrix: Traditional GRC vs Infrastructure-Native */}
        <ProblemComparison />

        {/* 04 — Unified Product Flow: Live Rule Evaluation Sandbox */}
        <ProductFlowSection />

        {/* 05 — Strategic Mid-Page Contextual CTA */}
        <MidPageCtaSection />

        {/* 06 — Frameworks: Recognizable badges & 1-to-many mapping */}
        <FrameworkMappingSection />

        {/* 07 — Evidence Integrity: Cryptographic SHA-256 fingerprinting */}
        <EvidenceIntegritySection />

        {/* 08 — Enterprise Security Commitments */}
        <SecurityPrinciplesSection />

        {/* 09 — Interactive Demo Sandbox */}
        <DemoExperienceSection />

        {/* 10 — Built-with Tech Stack & Open Source */}
        <EngineeringCredibilitySection />

        {/* 11 — Final CTA */}
        <FinalCtaSection />
      </main>

      {/* Engineering Footer */}
      <StudioFooter />
    </div>
  );
}
