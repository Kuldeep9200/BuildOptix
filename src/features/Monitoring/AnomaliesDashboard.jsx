import React, { useState } from 'react';

export default function AnomaliesDashboard() {
  // Tab Management State (0: Active, 1: Categories/Metrics, 2: Resolution History, 3: Detection Rules)
  const [activeTab, setActiveTab] = useState(0);

  // External functions ke crash solutions ke liye basic handler wrappers
  const handleEquipmentSwitch = (assetType) => {
    if (typeof window !== 'undefined' && typeof window.switchToEquipment === 'function') {
      window.switchToEquipment(assetType);
    } else {
      console.log(`Switching view context to asset: ${assetType}`);
    }
  };

  const handleAiQuery = (promptText) => {
    if (typeof window !== 'undefined' && typeof window.aiQuery === 'function') {
      window.aiQuery(promptText);
    } else {
      console.log(`AI Query Executed: "${promptText}"`);
    }
  };

  const handleAddRuleToast = () => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast('Adding detection rule...', 'info');
    } else {
      console.log('Action Triggered: Add detection rule configuration modal');
    }
  };

  return (
    <div className="page active" id="pg-anomalies">
      
      {/* ================= TAB 0: ACTIVE ANOMALIES ================= */}
      <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="anomalies" data-tab="0" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad clickable" title="View active anomalies" onClick={() => setActiveTab(0)}>
            <div className="kpi-l">Active Anomalies</div>
            <div className="kpi-v bad">5</div>
            <div className="kpi-s">AI detected</div>
          </div>
          <div className="kpi glow-warn clickable" title="View by category" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Under Review</div>
            <div className="kpi-v warn">3</div>
            <div className="kpi-s">pending ack</div>
          </div>
          <div className="kpi glow-ok clickable" title="View resolution history" onClick={() => setActiveTab(2)}>
            <div className="kpi-l">Resolved (30d)</div>
            <div className="kpi-v ok">42</div>
            <div className="kpi-s">avg resolve 2.1 hrs</div>
          </div>
          <div className="kpi glow-info clickable" title="View detection rules" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Precision Rate</div>
            <div className="kpi-v">94<span className="kpi-u">%</span></div>
            <div className="kpi-s">AI model accuracy</div>
          </div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct">Active Anomalies — AI Detected</div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Anomaly Type</th>
                  <th>Detected</th>
                  <th>Confidence</th>
                  <th>Impact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleEquipmentSwitch('chiller')}>
                    <span className="dot bad" style={{ display: 'inline-block', marginRight: '6px' }}></span>
                    <b>CH-01 Chiller</b>
                  </td>
                  <td>Compressor current spike pattern</td>
                  <td>10:18 AM</td>
                  <td style={{ color: 'var(--ok)' }}>97%</td>
                  <td><span className="badge badge-red">High Energy Loss</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAiQuery('Analyze CH-01 compressor anomaly and recommend action')}>Ask AI</button></td>
                </tr>
                <tr>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleEquipmentSwitch('ct')}>
                    <span className="dot warn" style={{ display: 'inline-block', marginRight: '6px' }}></span>
                    <b>CT-01 Cooling Tower</b>
                  </td>
                  <td>Approach temp drift — bearing wear indicator</td>
                  <td>09:42 AM</td>
                  <td style={{ color: 'var(--warn)' }}>84%</td>
                  <td><span className="badge badge-amber">Predictive Maint.</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAiQuery('Why is CT-01 approach temperature drifting?')}>Ask AI</button></td>
                </tr>
                <tr>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleEquipmentSwitch('pump')}>
                    <span className="dot warn" style={{ display: 'inline-block', marginRight: '6px' }}></span>
                    <b>PMP-01 Pump</b>
                  </td>
                  <td>Vibration signature change — cavitation risk</td>
                  <td>08:55 AM</td>
                  <td style={{ color: 'var(--warn)' }}>79%</td>
                  <td><span className="badge badge-amber">PM Recommended</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAiQuery('PMP-01 vibration anomaly — is this cavitation?')}>Ask AI</button></td>
                </tr>
                <tr>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleEquipmentSwitch('lighting')}>
                    <span className="dot info" style={{ display: 'inline-block', marginRight: '6px', background: 'var(--info)' }}></span>
                    <b>LT-01 Lighting</b>
                  </td>
                  <td>Consumption 18% above floor schedule</td>
                  <td>08:30 AM</td>
                  <td style={{ color: 'var(--info)' }}>88%</td>
                  <td><span className="badge badge-cyan">Energy Waste</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAiQuery('Why is LT-01 consuming above schedule?')}>Ask AI</button></td>
                </tr>
                <tr>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleEquipmentSwitch('solar')}>
                    <span className="dot info" style={{ display: 'inline-block', marginRight: '6px', background: 'var(--info)' }}></span>
                    <b>SLR-01 Solar</b>
                  </td>
                  <td>Panel temp 4°C above ambient model</td>
                  <td>07:55 AM</td>
                  <td style={{ color: 'var(--info)' }}>76%</td>
                  <td><span className="badge badge-cyan">Efficiency Drop</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAiQuery('Why is solar panel temperature elevated?')}>Ask AI</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: METRICS & CATEGORIES ================= */}
      <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="anomalies" data-tab="1" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad"><div className="kpi-l">Energy Anomalies</div><div className="kpi-v bad">2</div></div>
          <div className="kpi glow-warn"><div className="kpi-l">Mechanical</div><div className="kpi-v warn">2</div></div>
          <div className="kpi glow-info"><div className="kpi-l">Environmental</div><div className="kpi-v">1</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Security</div><div className="kpi-v ok">0</div></div>
        </div>
        
        <div className="g3">
          <div className="card">
            <div className="ch"><div className="ct">By System Category</div></div>
            <div className="cb">
              <div className="i-bar"><div className="i-bar-lbl">HVAC / Cooling</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '60%', background: 'var(--bad)' }}></div></div><div className="i-bar-val">3</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Electrical</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '40%', background: 'var(--warn)' }}></div></div><div className="i-bar-val">2</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Plumbing</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '20%', background: 'var(--info)' }}></div></div><div className="i-bar-val">1</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Fire Safety</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '0%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">0</div></div>
            </div>
          </div>
          
          <div className="card">
            <div className="ch"><div className="ct">By Severity</div></div>
            <div className="cb">
              <div className="dnt-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="28" fill="none" stroke="var(--line-2)" strokeWidth="9"></circle>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="var(--bad)" strokeWidth="9" strokeDasharray="53 123" strokeDashoffset="0" transform="rotate(-90 40 40)"></circle>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="var(--warn)" strokeWidth="9" strokeDasharray="53 123" strokeDashoffset="-53" transform="rotate(-90 40 40)"></circle>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="var(--info)" strokeWidth="9" strokeDasharray="17 159" strokeDashoffset="-106" transform="rotate(-90 40 40)"></circle>
                  <text x="40" y="37" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-0)">5</text>
                  <text x="40" y="48" textAnchor="middle" fontSize="7" fill="var(--ink-3)">Active</text>
                </svg>
                <div className="dnt-leg">
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--bad)' }}></div><span className="dnt-lbl">Critical</span><span className="dnt-pct">2</span></div>
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--warn)' }}></div><span className="dnt-lbl">Warning</span><span className="dnt-pct">2</span></div>
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--info)' }}></div><span className="dnt-lbl">Info</span><span className="dnt-pct">1</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="ch"><div className="ct">Avg Detection Lead Time</div></div>
            <div className="cb">
              <div className="i-bar"><div className="i-bar-lbl">Mechanical</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '70%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">4.2 hrs</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Energy</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '50%', background: 'var(--info)' }}></div></div><div className="i-bar-val">2.8 hrs</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Environmental</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '90%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">6.1 hrs</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: RESOLUTION HISTORY ================= */}
      <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="anomalies" data-tab="2" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok"><div className="kpi-l">Resolved (30d)</div><div className="kpi-v ok">42</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Avg Resolve Time</div><div className="kpi-v ok">2.1<span className="kpi-u">hrs</span></div></div>
          <div className="kpi glow-bad"><div className="kpi-l">False Positives</div><div className="kpi-v bad">4</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">AI Accuracy</div><div className="kpi-v ok">94<span className="kpi-u">%</span></div></div>
        </div>
        
        <div className="card">
          <div className="ch"><div><div className="ct">Resolved Anomalies — Last 30 Days</div></div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Anomaly</th>
                  <th>Detected</th>
                  <th>Resolved</th>
                  <th>Duration</th>
                  <th>Resolution</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>CH-01</td><td>Low CHW flow rate</td><td>12 May 10:00</td><td>12 May 12:14</td><td style={{ color: 'var(--ok)' }}>2h 14m</td><td>Pump strainer cleaned</td></tr>
                <tr><td>AHU-02</td><td>High filter ΔP</td><td>10 May 08:30</td><td>11 May 09:00</td><td style={{ color: 'var(--warn)' }}>24h 30m</td><td>Filter replaced</td></tr>
                <tr><td>LT-01</td><td>Zone 3 over-schedule</td><td>08 May 09:00</td><td>08 May 11:20</td><td style={{ color: 'var(--ok)' }}>2h 20m</td><td>Schedule corrected</td></tr>
                <tr><td>PMP-02</td><td>Discharge pressure spike</td><td>05 May 14:00</td><td>05 May 15:45</td><td style={{ color: 'var(--ok)' }}>1h 45m</td><td>PRV adjusted</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 3: DETECTION RULES ================= */}
      <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="anomalies" data-tab="3" style={{ display: activeTab === 3 ? 'block' : 'none' }}>
        <div className="card mb-12">
          <div className="ch">
            <div>
              <div className="ct">AI Detection Rules — Active</div>
              <div className="cs">Configured thresholds · BuildOptix ML engine</div>
            </div>
            <span className="ca" onClick={handleAddRuleToast}>+ Add Rule</span>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>System</th>
                  <th>Condition</th>
                  <th>Sensitivity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>Chiller COP Degradation</b></td><td>Chiller</td><td>COP less than 5.5 for 30 min</td><td><span className="badge badge-amber">Medium</span></td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>AHU Filter Clog Predictor</b></td><td>AHU</td><td>ΔP trend greater than 8 Pa/day</td><td><span className="badge badge-green">Low</span></td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>Pump Vibration Signature</b></td><td>Pumps</td><td>FFT pattern change greater than 15%</td><td><span className="badge badge-red">High</span></td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>Energy Over-Schedule</b></td><td>All</td><td>greater than 20% vs scheduled baseline</td><td><span className="badge badge-amber">Medium</span></td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>Cooling Tower Approach Drift</b></td><td>CT</td><td>Approach temp rise greater than 1°C/7d</td><td><span className="badge badge-amber">Medium</span></td><td><span className="badge badge-green">Active</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}