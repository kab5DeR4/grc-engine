import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import HeroSection from '../components/landing/HeroSection';
import CoreWorkflowSection from '../components/landing/CoreWorkflowSection';
import CoreCapabilitiesSection from '../components/landing/CoreCapabilitiesSection';
import ProblemComparison from '../components/landing/ProblemComparison';
import ProductShowcaseSection from '../components/landing/ProductShowcaseSection';
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
        {/* 01 — HERO */}
        <HeroSection />

        {/* 02 — SYSTEM WORKFLOW */}
        <CoreWorkflowSection />

        {/* 03 — CORE CAPABILITIES */}
        <CoreCapabilitiesSection />

        {/* 04 — THE GAP / PROBLEM */}
        <ProblemComparison />

        {/* 05 — EVIDENCE-DRIVEN VERIFICATION */}
        <ProductShowcaseSection />

        {/* 06 — SECURITY ARCHITECTURE */}
        <SecurityPrinciplesSection />

        {/* 07 — INTEGRATIONS */}
        <IntegrationsSection />

        {/* 08 — ARCHITECTURE & PIPELINE */}
        <ArchitectureSection />

        {/* 09 — OPEN SOURCE */}
        <OpenSourceSection />

        {/* 10 — FINAL CTA */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <StudioFooter />
    </div>
  );
}
