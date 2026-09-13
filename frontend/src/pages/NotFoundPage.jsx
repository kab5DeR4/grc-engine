import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ShieldAlert, FileText, LayoutDashboard } from 'lucide-react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <StudioNav />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 mb-2">
            <ShieldAlert size={32} />
          </div>

          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-600 dark:text-orange-400 font-semibold">
              Error 404 — Page Not Found
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Lost in the Evidence Ledger
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The compliance route or record you are requesting does not exist, has been moved, or is restricted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-xs"
            >
              <ArrowLeft size={14} />
              <span>Go Back</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs no-underline"
            >
              <Home size={14} />
              <span>Return Home</span>
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 transition-colors no-underline"
            >
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-500 dark:text-zinc-500">
            Need assistance? Read the{' '}
            <Link to="/docs" className="text-orange-600 dark:text-orange-400 hover:underline">
              documentation
            </Link>{' '}
            or contact security engineering.
          </div>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
