import { memo } from 'react';
import InteractiveWavesBackground from '../ui/InteractiveWavesBackground';

// Full bleed interactive Perlin noise waves background
const HeroEvidenceBackground = memo(function HeroEvidenceBackground() {
  return (
    <div 
      aria-hidden="true" 
      className="absolute -top-24 -bottom-24 -left-24 -right-24 overflow-hidden select-none z-0 pointer-events-auto"
    >
      {/* Interactive Perlin Noise Waves - Full Bleed Edge-to-Edge */}
      <div className="absolute inset-0">
        <InteractiveWavesBackground
          lineColor="rgba(0, 0, 0, 0.45)"
          waveSpeedX={0.0125}
          waveSpeedY={0.005}
          waveAmpX={32}
          waveAmpY={16}
          xGap={10}
          yGap={32}
          friction={0.925}
          tension={0.006}
          maxCursorMove={110}
          className="dark:hidden"
        />
        <InteractiveWavesBackground
          lineColor="rgba(255, 255, 255, 0.35)"
          waveSpeedX={0.0125}
          waveSpeedY={0.005}
          waveAmpX={32}
          waveAmpY={16}
          xGap={10}
          yGap={32}
          friction={0.925}
          tension={0.006}
          maxCursorMove={110}
          className="hidden dark:block"
        />
      </div>
    </div>
  );
});

HeroEvidenceBackground.displayName = 'HeroEvidenceBackground';
export default HeroEvidenceBackground;
