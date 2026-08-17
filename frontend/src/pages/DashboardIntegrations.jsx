import { useState } from 'react';
import { integrationsData } from '../data/demo/integrations';
import IntegrationHeader from '../components/integrations/IntegrationHeader';
import IntegrationFilterBar from '../components/integrations/IntegrationFilterBar';
import IntegrationList from '../components/integrations/IntegrationList';
import IntegrationDetails from '../components/integrations/IntegrationDetails';

export default function DashboardIntegrations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedIntegration, setSelectedIntegration] = useState(integrationsData[0]);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [configState, setConfigState] = useState(() => integrationsData.reduce((acc, curr) => {
    acc[curr.id] = { ...curr.config };
    return acc;
  }, {}));

  const categories = ['ALL', 'CLOUD', 'CI/CD', 'WORKFLOW'];

  const filteredIntegrations = integrationsData.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.type.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: `Connection to ${selectedIntegration.name} OK (18ms).`
      });
    }, 1000);
  };

  const handleConfigChange = (key, value) => {
    setConfigState(prev => ({
      ...prev,
      [selectedIntegration.id]: {
        ...prev[selectedIntegration.id],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    alert('Config saved successfully!');
  };

  const currentConfig = configState[selectedIntegration.id];

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      <main className="py-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        <IntegrationHeader />

        <IntegrationFilterBar 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          search={search}
          setSearch={setSearch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <IntegrationList 
            filteredIntegrations={filteredIntegrations}
            selectedIntegration={selectedIntegration}
            setSelectedIntegration={setSelectedIntegration}
            setTestResult={setTestResult}
          />
          <IntegrationDetails 
            selectedIntegration={selectedIntegration}
            isTesting={isTesting}
            testResult={testResult}
            handleTestConnection={handleTestConnection}
            currentConfig={currentConfig}
            handleConfigChange={handleConfigChange}
            handleSave={handleSave}
          />
        </div>
      </main>
    </div>
  );
}
