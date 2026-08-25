import { useState, useRef, useEffect, memo } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { Palette, Check, Maximize2, Minimize2 } from 'lucide-react';

// Selector de apariencia simplificado y compacto para máxima legibilidad y rapidez de uso
const ThemeDensitySelector = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, setTheme, density, setDensity } = useDemoStore();

  const themes = [
    {
      id: 'bone',
      name: 'Warm Bone',
      sub: 'Light',
      swatch: '#E7E3DA',
      accent: '#9B3418',
    },
    {
      id: 'obsidian',
      name: 'Obsidian',
      sub: 'Dark',
      swatch: '#121110',
      accent: '#FF6B4A',
    },
    {
      id: 'blueprint',
      name: 'Blueprint',
      sub: 'SecOps',
      swatch: '#0B132B',
      accent: '#38BDF8',
    },
    {
      id: 'auditor',
      name: 'Clean White',
      sub: 'WCAG AAA',
      swatch: '#FFFFFF',
      accent: '#C2410C',
    },
  ];

  // Cerrar el popup al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón de activación minimalista */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="studio-btn py-1 px-2.5 flex items-center gap-1.5 transition-colors cursor-pointer text-[10.5px] uppercase font-mono"
        title="Appearance Settings"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette size={12} className="text-[#9B3418]" />
        <span className="hidden sm:inline-block font-semibold">{currentTheme.name}</span>
        <span
          className="w-2.5 h-2.5 border border-black/20 dark:border-white/20 inline-block shrink-0"
          style={{ backgroundColor: currentTheme.swatch }}
        />
      </button>

      {/* Menú de personalización ultra simplificado */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[260px] bg-[#E7E3DA] dark:bg-[#1A1917] hairline-all p-3 shadow-2xl z-50 animate-fade-down font-mono">
          <div className="flex justify-between items-center pb-2 hairline-b mb-2.5">
            <span className="mono-label text-[9px] text-[#9B3418] font-bold">THEME</span>
            <span className="text-[9px] mono-label text-[#6E6A61] uppercase">{density}</span>
          </div>

          {/* Cuadrícula de temas 2x2 */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-2 hairline-all text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]'
                      : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 border border-black/20 dark:border-white/20 inline-block"
                        style={{ backgroundColor: t.swatch }}
                      />
                      <span
                        className="w-1.5 h-3 inline-block"
                        style={{ backgroundColor: t.accent }}
                      />
                    </div>
                    {isSelected && <Check size={12} className="text-[#9B3418]" />}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#1A1917] leading-tight">{t.name}</div>
                    <div className="text-[8.5px] text-[#6E6A61] uppercase">{t.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selector de densidad compacto */}
          <div className="pt-2 hairline-t flex gap-1">
            <button
              onClick={() => setDensity('editorial')}
              className={`flex-1 py-1.5 px-2 text-[9.5px] font-mono font-bold flex items-center justify-center gap-1 hairline-all cursor-pointer ${
                density === 'editorial'
                  ? 'bg-[#1A1917] text-[#E7E3DA]'
                  : 'bg-[#DCD7CB] text-[#1A1917] hover:bg-[#DCD7CB]/70'
              }`}
            >
              <Maximize2 size={10} /> SPACIOUS
            </button>
            <button
              onClick={() => setDensity('compact')}
              className={`flex-1 py-1.5 px-2 text-[9.5px] font-mono font-bold flex items-center justify-center gap-1 hairline-all cursor-pointer ${
                density === 'compact'
                  ? 'bg-[#1A1917] text-[#E7E3DA]'
                  : 'bg-[#DCD7CB] text-[#1A1917] hover:bg-[#DCD7CB]/70'
              }`}
            >
              <Minimize2 size={10} /> COMPACT
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ThemeDensitySelector.displayName = 'ThemeDensitySelector';

export default ThemeDensitySelector;
