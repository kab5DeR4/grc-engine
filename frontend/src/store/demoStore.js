import { create } from 'zustand';
import { initialOrganization } from '../data/demo/organization';
import { initialInfrastructure } from '../data/demo/infrastructure';
import { initialControls } from '../data/demo/controls';
import { initialFindings } from '../data/demo/findings';
import { initialEvidence } from '../data/demo/evidence';
import { initialFrameworks } from '../data/demo/frameworks';

export const useDemoStore = create((set) => ({
  isDemoMode: true,
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
  }
}));
