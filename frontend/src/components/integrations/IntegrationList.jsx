import { Settings } from 'lucide-react';

export default function IntegrationList({ filteredIntegrations, selectedIntegration, setSelectedIntegration, setTestResult }) {
  if (filteredIntegrations.length === 0) {
    return (
      <div className="p-8 text-center bg-[#DCD7CB]/50 hairline-all mono-label text-[11px] text-[#6E6A61]">
        NO INTEGRATIONS FOUND
      </div>
    );
  }

  return (
    <div className="lg:col-span-6 xl:col-span-5 space-y-4">
      {filteredIntegrations.map((item) => {
        const isSelected = selectedIntegration.id === item.id;
        const ItemIcon = item.icon || Settings;
        return (
          <div
            key={item.id}
            onClick={() => {
              setSelectedIntegration(item);
              setTestResult(null);
            }}
            className={`p-4 cursor-pointer hairline-all transition-colors flex items-center gap-4 ${
              isSelected ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/50'
            }`}
          >
            <div className={`p-2 hairline-all ${isSelected ? 'bg-[#9B3418] text-[#E7E3DA]' : 'bg-[#F2F0EB] text-[#1A1917]'}`}>
              <ItemIcon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="serif-heading text-[18px] font-semibold text-[#1A1917]">{item.name}</h3>
                <span className={`px-2 py-0.5 mono-label text-[9px] ${
                  item.status === 'CONNECTED' ? 'bg-[#1A1917] text-[#E7E3DA]' : 'border border-[#9B3418] text-[#9B3418]'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="mono-label text-[10px] text-[#6E6A61]">
                {item.type}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
