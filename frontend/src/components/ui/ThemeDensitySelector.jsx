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
      id: 'auditor',
      name: 'Clean White',
      sub: 'Light • WCAG AAA',
      swatch: '#FFFFFF',
      accent: '#0F172A',
    },
    {
      id: 'blueprint',
      name: 'Blueprint SecOps',
      sub: 'Dark • High Contrast',
      swatch: '#0B132B',
      accent: '#38BDF8',
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
    <div className="relative inline-block text-left font-mono" ref={dropdownRef}>
      {/* Botón de activación minimalista con alto contraste */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors flex items-center gap-2 cursor-pointer text-xs font-semibold"
        title="Theme & Layout Settings"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette size={13} className="text-slate-900 dark:text-sky-400" />
        <span className="hidden sm:inline-block">{currentTheme.name}</span>
        <span
          className="w-3 h-3 rounded-full border border-slate-400 dark:border-slate-500 inline-block shrink-0 shadow-xs"
          style={{ backgroundColor: currentTheme.swatch }}
        />
      </button>

      {/* Menú de personalización ultra limpio y profesional */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 p-3 shadow-2xl z-50 animate-fade-down font-mono">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-800 mb-2.5">
            <span className="text-[10px] text-slate-900 dark:text-sky-400 font-bold uppercase tracking-wider">ENTERPRISE THEME</span>
            <span className="text-[9.5px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{density}</span>
          </div>

          {/* Cuadrícula de temas 1x2 */}
          <div className="space-y-2 mb-3">
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-900 dark:border-sky-400 shadow-xs'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 inline-block shrink-0 shadow-xs"
                      style={{ backgroundColor: t.swatch }}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.sub}</div>
                    </div>
                  </div>
                  {isSelected && <Check size={14} className="text-slate-900 dark:text-sky-400" />}
                </button>
              );
            })}
          </div>

          {/* Selector de densidad compacto */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => setDensity('editorial')}
              className={`flex-1 py-1.5 px-2 text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 rounded-lg border transition-all cursor-pointer ${
                density === 'editorial'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <Maximize2 size={11} /> SPACIOUS
            </button>
            <button
              onClick={() => setDensity('compact')}
              className={`flex-1 py-1.5 px-2 text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 rounded-lg border transition-all cursor-pointer ${
                density === 'compact'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <Minimize2 size={11} /> COMPACT
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ThemeDensitySelector.displayName = 'ThemeDensitySelector';

export default ThemeDensitySelector;
