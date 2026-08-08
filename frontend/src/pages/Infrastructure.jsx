import { useState } from 'react';
import { Server, Shield, HardDrive, Network, Key, FolderOpen, Database } from 'lucide-react';
import Drawer from '../components/ui/Drawer';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import styles from './Infrastructure.module.css';

const MOCK_GRAPH = [
  { id: 'aws', name: 'AWS Production', type: 'cloud', icon: Server, status: 'PASS' },
  { id: 'vpc', name: 'vpc-main', type: 'network', icon: Network, status: 'PASS' },
  { id: 'subnet', name: 'subnet-public', type: 'network', icon: Network, status: 'PASS' },
  { id: 'ec2', name: 'i-0a92...', type: 'compute', icon: HardDrive, status: 'PASS' },
  { id: 'sg', name: 'sg-web', type: 'security', icon: Shield, status: 'WARNING' },
  { id: 'iam', name: 'role-web', type: 'identity', icon: Key, status: 'FAIL' },
];

const Infrastructure = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Infrastructure</h1>
          <p className={styles.subtitle}>Everything discovered from your connected environments.</p>
        </div>
      </header>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.activeTab}`}>Overview</button>
        <button className={styles.tab}>Cloud</button>
        <button className={styles.tab}>Repositories</button>
        <button className={styles.tab}>Kubernetes</button>
        <button className={styles.tab}>Resources</button>
        <button className={styles.tab}>Changes</button>
      </div>

      <div className={styles.graphContainer}>
        <div className={styles.graphPath}>
          {MOCK_GRAPH.map((node, idx) => (
            <div key={node.id} className={styles.graphNodeWrapper}>
              <div 
                className={`${styles.graphNode} ${styles[node.status.toLowerCase()]}`}
                onClick={() => setSelectedResource(node)}
              >
                <node.icon size={20} className={styles.nodeIcon} />
                <span className={styles.nodeName}>{node.name}</span>
                <div className={styles.nodeStatusBadge}></div>
              </div>
              {idx < MOCK_GRAPH.length - 1 && (
                <div className={styles.graphEdge}>↓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Drawer
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        title={
          <div className={styles.drawerTitle}>
            <HardDrive size={24} />
            <span>{selectedResource?.name}</span>
          </div>
        }
      >
        {selectedResource && (
          <div className={styles.resourceDetails}>
            <div className={styles.detailSection}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <StatusBadge status={selectedResource.status} />
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Type:</span>
                <span>{selectedResource.type.toUpperCase()}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Account:</span>
                <span>Production</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Region:</span>
                <span>us-east-1</span>
              </div>
            </div>

            <h3 className={styles.sectionTitle}>Compliance Impact</h3>
            <Card className={styles.impactCard}>
              <div className={styles.impactStats}>
                <div className={styles.impactStat}>
                  <div className={styles.statVal}>7</div>
                  <div className={styles.statLabel}>Controls Affected</div>
                </div>
                <div className={styles.impactStat}>
                  <div className={styles.statVal} style={{color: 'var(--accent-green)'}}>5</div>
                  <div className={styles.statLabel}>Passing</div>
                </div>
                <div className={styles.impactStat}>
                  <div className={styles.statVal} style={{color: 'var(--accent-red)'}}>2</div>
                  <div className={styles.statLabel}>Failing</div>
                </div>
              </div>
            </Card>

            <div className={styles.drawerActions}>
              <button className={styles.actionLink}>Related Findings →</button>
              <button className={styles.actionLink}>Related Evidence →</button>
              <button className={styles.actionLink}>Related Controls →</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Infrastructure;
