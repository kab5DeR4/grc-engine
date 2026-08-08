import { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import { Filter, Download, Search, FileCode } from 'lucide-react';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import Drawer from '../components/ui/Drawer';
import Card from '../components/ui/Card';
import styles from './Evidence.module.css';

const Evidence = () => {
  const { evidence } = useDemoStore();
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Evidence</h1>
          <p className={styles.subtitle}>Machine-collected evidence supporting compliance decisions.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline"><Filter size={16}/> Filter</Button>
          <Button variant="outline"><Download size={16}/> Export</Button>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Evidence ID</th>
              <th>Source</th>
              <th>Control</th>
              <th>Collected</th>
              <th>Hash</th>
              <th>Integrity</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map(item => (
              <tr key={item.id} onClick={() => setSelectedEvidence(item)}>
                <td className={styles.monoText}>{item.id}</td>
                <td>{item.source}</td>
                <td>{item.controlId}</td>
                <td>{item.collectedAt}</td>
                <td className={styles.monoText}>{item.hash}</td>
                <td><StatusBadge status={item.integrity} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        width="600px"
        title={
          <div className={styles.drawerTitle}>
            <FileCode size={24} className={styles.drawerIcon} />
            <div className={styles.drawerTitleText}>
              <span className={styles.mono}>{selectedEvidence?.id}</span>
              <span>Evidence Detail</span>
            </div>
          </div>
        }
      >
        {selectedEvidence && (
          <div className={styles.evidenceDetails}>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Source</span>
                <span className={styles.value}>{selectedEvidence.source}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Control</span>
                <span className={styles.value}>{selectedEvidence.controlId}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Collected At</span>
                <span className={styles.value}>{selectedEvidence.collectedAt}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Method</span>
                <span className={styles.value}>{selectedEvidence.method}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Integrity</span>
                <StatusBadge status={selectedEvidence.integrity} />
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>SHA-256 Hash</span>
                <span className={`${styles.value} ${styles.mono}`}>{selectedEvidence.hash}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>OBSERVED CONFIGURATION</h3>
              <Card className={styles.codeCard}>
                <pre className={styles.codeBlock}>
                  {selectedEvidence.configuration}
                </pre>
              </Card>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Evidence;
