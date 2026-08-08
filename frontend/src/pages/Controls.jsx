import { useState } from 'react';
import { Filter, ChevronDown, Download, ShieldAlert } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import Drawer from '../components/ui/Drawer';
import Card from '../components/ui/Card';
import styles from './Controls.module.css';

const Controls = () => {
  const { controls } = useDemoStore();
  const [selectedControl, setSelectedControl] = useState(null);
  const [filterText, setFilterText] = useState('');

  const filteredControls = controls.filter(c => 
    c.id.toLowerCase().includes(filterText.toLowerCase()) || 
    c.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Controls</h1>
          <p className={styles.subtitle}>Vendor-neutral security controls evaluated against real infrastructure.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" className={styles.actionBtn}><Filter size={16}/> Filter</Button>
          <Button variant="outline" className={styles.actionBtn}><Download size={16}/> Export</Button>
        </div>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search controls..." 
            className={styles.searchInput}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className={styles.filterDropdowns}>
          <button className={styles.dropdown}>Framework <ChevronDown size={14}/></button>
          <button className={styles.dropdown}>Status <ChevronDown size={14}/></button>
          <button className={styles.dropdown}>Domain <ChevronDown size={14}/></button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Control</th>
              <th>Domain</th>
              <th>Status</th>
              <th>Frameworks</th>
              <th>Evidence</th>
              <th>Affected Resources</th>
              <th>Last Evaluated</th>
            </tr>
          </thead>
          <tbody>
            {filteredControls.map(control => (
              <tr key={control.id} onClick={() => setSelectedControl(control)}>
                <td>
                  <div className={styles.controlNameWrapper}>
                    <span className={styles.controlId}>{control.id}</span>
                    <span className={styles.controlName}>{control.name}</span>
                  </div>
                </td>
                <td>{control.domain}</td>
                <td><StatusBadge status={control.status} /></td>
                <td>
                  <div className={styles.frameworksList}>
                    {control.frameworks.slice(0,2).map(fw => (
                      <span key={fw} className={styles.frameworkTag}>{fw}</span>
                    ))}
                    {control.frameworks.length > 2 && (
                      <span className={styles.frameworkTag}>+{control.frameworks.length - 2}</span>
                    )}
                  </div>
                </td>
                <td>{control.evidenceCount} items</td>
                <td>{control.resourcesCount} resources</td>
                <td className={styles.monoText}>{control.lastEvaluated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        isOpen={!!selectedControl}
        onClose={() => setSelectedControl(null)}
        width="600px"
        title={
          <div className={styles.drawerTitle}>
            <ShieldAlert size={24} className={styles.drawerIcon} />
            <div className={styles.drawerTitleText}>
              <span className={styles.drawerId}>{selectedControl?.id}</span>
              <span>{selectedControl?.name}</span>
            </div>
          </div>
        }
      >
        {selectedControl && (
          <div className={styles.controlDetails}>
            <div className={styles.statusBanner}>
              <span className={styles.bannerLabel}>Status:</span>
              <StatusBadge status={selectedControl.status} />
              <span className={styles.bannerLabel} style={{marginLeft: '1rem'}}>Severity:</span>
              <span style={{color: 'var(--accent-red)', fontWeight: 600}}>Critical</span>
            </div>

            <p className={styles.description}>{selectedControl.description}</p>

            {selectedControl.evaluationLogic && (
              <div className={styles.evaluationSection}>
                <h3 className={styles.sectionTitle}>EVALUATION</h3>
                
                <div className={styles.evalFlow}>
                  <Card className={styles.evalCard}>
                    <div className={styles.evalLabel}>EXPECTED</div>
                    <div className={styles.evalValue}>{selectedControl.evaluationLogic.expected}</div>
                  </Card>
                  <div className={styles.evalArrow}>↓</div>
                  <Card className={styles.evalCard}>
                    <div className={styles.evalLabel}>OBSERVED</div>
                    <div className={styles.evalValue}>{selectedControl.evaluationLogic.observed}</div>
                  </Card>
                  <div className={styles.evalArrow}>↓</div>
                  <Card className={`${styles.evalCard} ${styles.evalResult}`}>
                    <div className={styles.evalLabel}>RESULT</div>
                    <div className={styles.evalValue} style={{color: selectedControl.evaluationLogic.result === 'PASS' ? 'var(--accent-green)' : 'var(--accent-red)'}}>
                      {selectedControl.evaluationLogic.result}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            <div className={styles.evidenceSection}>
              <h3 className={styles.sectionTitle}>EVIDENCE</h3>
              <div className={styles.evidenceStats}>
                <span>Evidence collected: <strong>{selectedControl.evidenceCount} items</strong></span>
                <span>Latest evidence: <strong>4 minutes ago</strong></span>
              </div>
              <div className={styles.evidenceList}>
                <div className={styles.evidenceItem}>IAM configuration</div>
                <div className={styles.evidenceItem}>CloudTrail configuration</div>
                <div className={styles.evidenceItem}>Terraform resource</div>
              </div>
            </div>
            
            <div className={styles.drawerActions}>
              <Button>View Full Evidence →</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Controls;
