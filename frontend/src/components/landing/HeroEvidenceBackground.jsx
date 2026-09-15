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
          lineColor="rgba(0, 0, 0, 0.32)"
          waveSpeedX={0.0095}
          waveSpeedY={0.0038}
          waveAmpX={24}
          waveAmpY={12}
          xGap={12}
          yGap={32}
          friction={0.925}
          tension={0.006}
          maxCursorMove={85}
          className="dark:hidden"
        />
        <InteractiveWavesBackground
          lineColor="rgba(255, 255, 255, 0.25)"
          waveSpeedX={0.0095}
          waveSpeedY={0.0038}
          waveAmpX={24}
          waveAmpY={12}
          xGap={12}
          yGap={32}
          friction={0.925}
          tension={0.006}
          maxCursorMove={85}
          className="hidden dark:block"
        />
      </div>
    </div>
  );
});

HeroEvidenceBackground.displayName = 'HeroEvidenceBackground';
export default HeroEvidenceBackground;
