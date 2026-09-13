import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  LayoutDashboard, 
  GitBranch, 
  ShieldCheck, 
  Archive, 
  FileText, 
  Settings, 
  Sun, 
  Moon, 
  FolderGit2,
  X,
  Sparkles,
  Command
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setDemoMode, toggleDarkMode, isDarkMode } = useDemoStore();

  const commands = [
    {
      id: 'dashboard',
      title: 'Compliance Dashboard',
      subtitle: 'Overview of posture and findings',
      icon: LayoutDashboard,
      action: () => {
        setDemoMode(true);
        navigate('/dashboard');
      },
      section: 'Navigation',
    },
    {
      id: 'integrations',
      title: 'GitHub & Cloud Integrations',
      subtitle: 'Connect repositories and inspect live status',
      icon: GitBranch,
      action: () => {
        setDemoMode(true);
        navigate('/dashboard/integrations');
      },
      section: 'Navigation',
    },
    {
      id: 'controls',
      title: 'Compliance Controls Matrix',
      subtitle: 'SOC 2, ISO 27001, and NIST CSF controls',
      icon: ShieldCheck,
      action: () => {
        setDemoMode(true);
        navigate('/controls');
      },
      section: 'Navigation',
    },
    {
      id: 'evidence',
      title: 'Tamper-Evident Evidence Vault',
      subtitle: 'Inspect SHA-256 cryptographic records',
      icon: Archive,
      action: () => {
        setDemoMode(true);
        navigate('/archive');
      },
      section: 'Navigation',
    },
    {
      id: 'scans',
      title: 'Automated Compliance Scans',
      subtitle: 'Trigger background scan jobs and telemetry',
      icon: FolderGit2,
      action: () => {
        setDemoMode(true);
        navigate('/scans');
      },
      section: 'Navigation',
    },
    {
      id: 'reports',
      title: 'Audit Reports & Attestation',
      subtitle: 'Export executive and technical reports',
      icon: FileText,
      action: () => {
        setDemoMode(true);
        navigate('/reports');
      },
      section: 'Navigation',
    },
    {
      id: 'docs',
      title: 'System Documentation',
      subtitle: 'Read API specs and architecture guides',
      icon: FileText,
      action: () => navigate('/docs'),
      section: 'Navigation',
    },
    {
      id: 'settings',
      title: 'Workspace Settings',
      subtitle: 'Manage members, RBAC, and API keys',
      icon: Settings,
      action: () => {
        setDemoMode(true);
        navigate('/settings');
      },
      section: 'Navigation',
    },
    {
      id: 'theme',
      title: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle interface visual theme',
      icon: isDarkMode ? Sun : Moon,
      action: () => toggleDarkMode(),
      section: 'Preferences',
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = (cmd) => {
    setIsOpen(false);
    cmd.action();
  };

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-zinc-950/60 backdrop-blur-xs font-sans animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNavigation}
            placeholder="Type a command or search pages... (e.g. GitHub, Controls, Vault)"
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none border-none font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-400">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer border-none ${
                    isSelected 
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-100' 
                      : 'bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-600 dark:text-orange-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    {cmd.section}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
          </div>
          <span>GRC Engine Command Palette</span>
        </div>
      </div>
    </div>
  );
}
