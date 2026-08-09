import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import SplitHero from '../components/studio/SplitHero';
import SectionDrawing from '../components/studio/SectionDrawing';
import PinnedStudy from '../components/studio/PinnedStudy';
import MaterialPractice from '../components/studio/MaterialPractice';
import WorkTable from '../components/studio/WorkTable';
import CloseSection from '../components/studio/CloseSection';

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono">
      <StudioNav />
      <main>
        <SplitHero />
        <div id="platform">
          <SectionDrawing />
        </div>
        <div id="capabilities">
          <MaterialPractice />
        </div>
        <PinnedStudy />
        <div id="integrations">
          <WorkTable />
        </div>
        <CloseSection />
      </main>
      <StudioFooter />
    </div>
  );
}
