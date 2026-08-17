import { Search } from 'lucide-react';

export default function IntegrationFilterBar({ categories, activeCategory, setActiveCategory, search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 hairline-b">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`mono-label text-[10.5px] px-3 py-1.5 cursor-pointer border transition-colors ${
              activeCategory === cat 
                ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]' 
                : 'bg-transparent text-[#1A1917] border-[#1A1917]'
            }`}
          >
            [ {cat} ]
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-64">
        <Search size={14} className="absolute left-3 top-2.5 text-[#6E6A61]" />
        <input
          type="text"
          placeholder="SEARCH INTEGRATIONS..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#DCD7CB] border border-[#1A1917] pl-8 pr-3 py-1.5 text-[11px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418]"
        />
      </div>
    </div>
  );
}
