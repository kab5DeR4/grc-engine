import { Search } from 'lucide-react';

export default function IntegrationFilterBar({ categories, activeCategory, setActiveCategory, search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs' 
                : 'bg-[var(--surface)] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-72">
        <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Filter integrations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[var(--surface)] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
