import { useState } from 'react';
import { integrationsData } from '../data/demo/integrations';
import { useDemoStore } from '../store/demoStore';
import { api } from '../services/api';
import IntegrationHeader from '../components/integrations/IntegrationHeader';
import IntegrationFilterBar from '../components/integrations/IntegrationFilterBar';
import IntegrationList from '../components/integrations/IntegrationList';
import IntegrationDetails from '../components/integrations/IntegrationDetails';

export default function DashboardIntegrations() {
  const { isLiveMode, connectLiveGitHub, appendAuditLog } = useDemoStore();
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

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    if (isLiveMode && selectedIntegration.id === 'github') {
      try {
        const token = configState.github?.personal_access_token || '';
        const res = await api.testGitHubConnection({
          integration_type: 'GITHUB',
          credentials: { personal_access_token: token },
          is_mock: !token,
        });
        setTestResult({
          success: res.connected,
          message: `${res.message} (Scope: ${res.account_name || 'Sandbox'})`,
        });
      } catch (err) {
        setTestResult({
          success: false,
          message: `Connection failed: ${err.message}`,
        });
      } finally {
        setIsTesting(false);
      }
      return;
    }

    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: `Connection to ${selectedIntegration.name} verified OK (18ms latency).`,
      });
    }, 800);
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

  const handleSave = async () => {
    if (isLiveMode && selectedIntegration.id === 'github') {
      try {
        const token = configState.github?.personal_access_token;
        await connectLiveGitHub(token, !token);
        alert('GitHub integration synced & registered with FastAPI backend!');
      } catch (err) {
        alert(`Failed to save integration: ${err.message}`);
      }
      return;
    }

    appendAuditLog(
      'INTEGRATION_CONFIG_UPDATED',
      selectedIntegration.name,
      'INFO',
      `Updated configuration parameters for ${selectedIntegration.name}`
    );
    alert('Configuration profile saved successfully!');
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
