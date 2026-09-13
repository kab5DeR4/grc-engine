import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import HeroSection from '../components/landing/HeroSection';
import CoreWorkflowSection from '../components/landing/CoreWorkflowSection';
import ProductShowcaseSection from '../components/landing/ProductShowcaseSection';
import ProblemComparison from '../components/landing/ProblemComparison';
import EvidenceModelSection from '../components/landing/EvidenceModelSection';
import RealEvidenceRecordSection from '../components/landing/RealEvidenceRecordSection';
import SecurityPrinciplesSection from '../components/landing/SecurityPrinciplesSection';
import IntegrationsSection from '../components/landing/IntegrationsSection';
import ArchitectureSection from '../components/landing/ArchitectureSection';
import OpenSourceSection from '../components/landing/OpenSourceSection';
import FinalCtaSection from '../components/landing/FinalCtaSection';

/**
 * GRC Engine Redesigned Landing Page
 * Coherent Third Design:
 * - Clean, calm, modern light interface foundation
 * - Precise technical security-engineering character with restrained orange accent
 * - Clear narrative: "Compliance, grounded in verifiable evidence."
 */
export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 dark:selection:text-orange-200 overflow-x-hidden">
      {/* 01 — Top Navigation */}
      <StudioNav />

      <main>
        {/* 02 — Hero with Conceptual Loop & Product Verification Centerpiece */}
        <HeroSection />

        {/* 03 — Core Product Story: 01 Control to 05 Report */}
        <CoreWorkflowSection />

        {/* 04 — Product UI Showcase: What the system can actually verify */}
        <ProductShowcaseSection />

        {/* 05 — Problem & Solution: Compliance shouldn't depend on screenshots */}
        <ProblemComparison />

        {/* 06 — Evidence Model: 1 Evidence layer to Multiple Frameworks */}
        <EvidenceModelSection />

        {/* 07 — Real Concrete Evidence Record Example */}
        <RealEvidenceRecordSection />

        {/* 08 — Security: Built for sensitive infrastructure (4 key principles) */}
        <SecurityPrinciplesSection />

        {/* 09 — Integrations: Connect the systems you already use */}
        <IntegrationsSection />

        {/* 10 — Compact Technical Architecture */}
        <ArchitectureSection />

        {/* 11 — Open Source Identity */}
        <OpenSourceSection />

        {/* 12 — Final CTA */}
        <FinalCtaSection />
      </main>

      {/* 13 — Minimal Professional Footer */}
      <StudioFooter />
    </div>
  );
}
