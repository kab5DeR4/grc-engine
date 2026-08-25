import { create } from 'zustand';
import { initialOrganization } from '../data/demo/organization';
import { initialInfrastructure } from '../data/demo/infrastructure';
import { initialControls } from '../data/demo/controls';
import { initialFindings } from '../data/demo/findings';
import { initialEvidence } from '../data/demo/evidence';
import { initialFrameworks } from '../data/demo/frameworks';

// Recuperar el tema guardado en almacenamiento local o utilizar 'bone' por defecto en la primera carga
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'bone';
  const stored = localStorage.getItem('grc_theme');
  if (stored && ['bone', 'obsidian', 'blueprint', 'auditor'].includes(stored)) {
    return stored;
  }
  if (stored === 'dark') return 'obsidian';
  if (stored === 'light') return 'bone';
  return 'bone';
};

// Recuperar la densidad visual guardada para mantener las preferencias del usuario persistentes
const getInitialDensity = () => {
  if (typeof window === 'undefined') return 'editorial';
  const stored = localStorage.getItem('grc_density');
  if (stored && ['editorial', 'compact'].includes(stored)) {
    return stored;
  }
  return 'editorial';
};

export const useDemoStore = create((set) => ({
  isDemoMode: true,
  theme: getInitialTheme(),
  density: getInitialDensity(),
  isDarkMode: ['obsidian', 'blueprint'].includes(getInitialTheme()),

  // Establecer un tema específico y sincronizarlo con localStorage para persistencia
  setTheme: (val) => {
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_theme', val);
    }
    const isDark = ['obsidian', 'blueprint'].includes(val);
    set({ theme: val, isDarkMode: isDark });
  },

  // Ajustar la densidad del layout para adaptar el espacio a monitoreo masivo o lectura amplia
  setDensity: (val) => {
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_density', val);
    }
    set({ density: val });
  },

  toggleDensity: () => set((state) => {
    const nextDensity = state.density === 'compact' ? 'editorial' : 'compact';
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_density', nextDensity);
    }
    return { density: nextDensity };
  }),

  // Alternar el tema rápido entre luz y oscuridad manteniendo compatibilidad de botones existentes
  toggleDarkMode: () => set((state) => {
    const nextTheme = state.theme === 'bone' ? 'obsidian' : 'bone';
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_theme', nextTheme);
    }
    const isDark = ['obsidian', 'blueprint'].includes(nextTheme);
    return { theme: nextTheme, isDarkMode: isDark };
  }),

  setDarkMode: (val) => {
    const nextTheme = val ? 'obsidian' : 'bone';
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_theme', nextTheme);
    }
    set({ theme: nextTheme, isDarkMode: val });
  },
  setDemoMode: (val) => set({ isDemoMode: val }),
  toggleDemoMode: () => set({ isDemoMode: true }),
  organization: initialOrganization,
  infrastructure: initialInfrastructure,
  controls: initialControls,
  findings: initialFindings,
  evidence: initialEvidence,
  frameworks: initialFrameworks,
  lastScan: '8 minutes ago',
  scanRunning: false,
  overallCompliance: 84,
  
  runScan: () => {
    set({ scanRunning: true });
    // Simulate scan process
    setTimeout(() => {
      set({ 
        scanRunning: false, 
        lastScan: 'Just now',
      });
    }, 5000);
  },

  simulateRemediation: (findingId, controlId) => {
    set((state) => {
      // Find and resolve the finding
      const updatedFindings = state.findings.map(f => 
        f.id === findingId ? { ...f, status: 'Resolved' } : f
      );
      
      // Update control status
      const updatedControls = state.controls.map(c => 
        c.id === controlId ? { ...c, status: 'PASS' } : c
      );

      // Recalculate compliance slightly
      const newCompliance = state.overallCompliance < 100 ? state.overallCompliance + 1 : 100;

      return {
        findings: updatedFindings,
        controls: updatedControls,
        overallCompliance: newCompliance
      };
    });
  },

  // quick state store reset and helper functions
  resetDemo: () => {
    set({
      organization: initialOrganization,
      infrastructure: initialInfrastructure,
      controls: initialControls,
      findings: initialFindings,
      evidence: initialEvidence,
      frameworks: initialFrameworks,
      overallCompliance: 84,
      lastScan: '8 minutes ago'
    });
  },

  // reset all filters to default real quick
  resetFilters: () => set({ scanRunning: false }),
}));
