import React, { Component } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App runtime error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center space-y-6 shadow-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                An unexpected interface error occurred
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The audit runtime caught an unhandled exception. State remains cryptographically safe in the ledger.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-left font-mono text-[11px] text-red-600 dark:text-red-400 overflow-x-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors no-underline"
              >
                <Home size={14} />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
