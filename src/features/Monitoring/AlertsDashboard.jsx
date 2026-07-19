import React, { useState } from 'react';

export default function AlertsDashboard() {
  // Tab Management State (0: Active Feed, 1: Critical Details, 2: Warnings Active, 3: Resolved Today)
  const [activeTab, setActiveTab] = useState(0);

  // Tab 0 Active Feed Feed ke liye Severity Filter State ('all', 'Critical', 'Warning')
  const [severityFilter, setSeverityFilter] = useState('all');

  // Helper placeholder functions jo project ke main dashboard triggers ko handle karengi
  const handleEquipmentClick = (equipmentType) => {
    if (typeof window !== 'undefined' && typeof window.switchToEquipment === 'function') {
      window.switchToEquipment(equipmentType);
    } else {
      console.log(`Switching to equipment view: ${equipmentType}`);
    }
  };

  const handleAckAllWarnings = () => {
    if (typeof window !== 'undefined' && typeof window.alAckAllWarnings === 'function') {
      window.alAckAllWarnings();
    } else {
      alert("Acknowledging all warnings...");
    }
  };

  const handleRaiseTicket = (ticketInfo) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(`Raising ticket for: ${ticketInfo}`, 'info');
    } else {
      console.log(`Raising ticket for: ${ticketInfo}`);
    }
  };

  return (
    <div className="page active" id="pg-alerts">
      
      {/* ================= TAB 0: ACTIVE FEED ================= */}
      <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="alerts" data-tab="0" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        
        {/* Top KPI Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad clickable" title="View all active alerts" onClick={() => setActiveTab(0)}>
            <div className="kpi-l">Active Alerts</div>
            <div className="kpi-v bad" id="al-kpi-active">3</div>
            <div className="kpi-s" id="al-kpi-active-s">3 critical · 0 warning</div>
          </div>
          <div className="kpi glow-ok clickable" title="View critical alerts" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Acknowledged</div>
            <div className="kpi-v ok" id="al-kpi-ack">14</div>
            <div className="kpi-s">today</div>
          </div>
          <div className="kpi glow-ok clickable" title="View resolved alerts" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Resolved (Today)</div>
            <div className="kpi-v ok">9</div>
          </div>
          <div className="kpi glow-info clickable" title="View warnings" onClick={() => setActiveTab(2)}>
            <div className="kpi-l">Avg Response</div>
            <div className="kpi-v">18<span className="kpi-u">min</span></div>
          </div>
        </div>

        {/* Active Alert Table Card */}
        <div className="card">
          <div className="ch">
            <div className="ct">Active Alert Feed</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              
              {/* Filter Chips Layer */}
              <div id="al-chips" style={{ display: 'flex', gap: '6px' }}>
                <div 
                  className="badge badge-cyan" 
                  onClick={() => setSeverityFilter('all')} 
                  style={{ cursor: 'pointer', outline: severityFilter === 'all' ? '1.5px solid var(--info)' : 'none' }}
                >
                  All
                </div>
                <div 
                  className="badge badge-red" 
                  onClick={() => setSeverityFilter('Critical')} 
                  style={{ cursor: 'pointer', outline: severityFilter === 'Critical' ? '1.5px solid var(--bad)' : 'none' }}
                >
                  Critical
                </div>
                <div 
                  className="badge badge-amber" 
                  onClick={() => setSeverityFilter('Warning')} 
                  style={{ cursor: 'pointer', outline: severityFilter === 'Warning' ? '1.5px solid var(--warn)' : 'none' }}
                >
                  Warning
                </div>
              </div>

              <button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={handleAckAllWarnings}>
                <i className="ti ti-checks"></i> Ack all warnings
              </button>
              <div className="cs">Auto-refresh · 30s</div>
            </div>
          </div>

          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Alert</th>
                  <th>System</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Condition Row 1 */}
                {(severityFilter === 'all' || severityFilter === 'Critical') && (
                  <tr className="al-row" data-sev="Critical" data-status="Open" id="al-r0">
                    <td><span className="badge badge-red">Critical</span></td>
                    <td>High Condenser Pressure</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('chiller')}>CH-01 Chiller</td>
                    <td>10:21 AM</td>
                    <td className="al-st"><span className="badge badge-amber">Open</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('High Condenser Pressure - CH-01')}>
                        <i className="ti ti-ticket"></i> Raise Ticket
                      </button>
                    </td>
                  </tr>
                )}
                
                {/* Condition Row 2 */}
                {(severityFilter === 'all' || severityFilter === 'Critical') && (
                  <tr className="al-row" data-sev="Critical" data-status="Escalated" id="al-r1">
                    <td><span className="badge badge-red">Critical</span></td>
                    <td>HVAC Temp Breach Floor 7</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('ahu')}>AHU Zone C</td>
                    <td>08:14 AM</td>
                    <td className="al-st"><span className="badge badge-red">Escalated</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('TKT-1055')}>
                        <i className="ti ti-ticket"></i> TKT-1055
                      </button>
                    </td>
                  </tr>
                )}

                {/* Condition Row 3 */}
                {(severityFilter === 'all' || severityFilter === 'Critical') && (
                  <tr className="al-row" data-sev="Critical" data-status="Open" id="al-r2">
                    <td><span className="badge badge-red">Critical</span></td>
                    <td>Door Sensor Fault</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('lift')}>Lift-04</td>
                    <td>10:18 AM</td>
                    <td className="al-st"><span className="badge badge-amber">Open</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('Door Sensor Fault - Lift-04')}>
                        <i className="ti ti-ticket"></i> Raise Ticket
                      </button>
                    </td>
                  </tr>
                )}

                {/* Condition Row 4 */}
                {(severityFilter === 'all' || severityFilter === 'Warning') && (
                  <tr className="al-row" data-sev="Warning" data-status="Ack'd" id="al-r3">
                    <td><span className="badge badge-amber">Warning</span></td>
                    <td>Low Chilled Water Flow</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('chiller')}>CH-01</td>
                    <td>10:15 AM</td>
                    <td className="al-st"><span className="badge badge-cyan">Ack'd</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('TKT-1054')}>
                        <i className="ti ti-ticket"></i> TKT-1054
                      </button>
                    </td>
                  </tr>
                )}

                {/* Condition Row 5 */}
                {(severityFilter === 'all' || severityFilter === 'Warning') && (
                  <tr className="al-row" data-sev="Warning" data-status="Ack'd" id="al-r4">
                    <td><span className="badge badge-amber">Warning</span></td>
                    <td>High Water Temp</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('ct')}>CT-01</td>
                    <td>10:10 AM</td>
                    <td className="al-st"><span className="badge badge-cyan">Ack'd</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('High Water Temp - CT-01')}>
                        <i className="ti ti-ticket"></i> Raise Ticket
                      </button>
                    </td>
                  </tr>
                )}

                {/* Condition Row 6 */}
                {(severityFilter === 'all' || severityFilter === 'Warning') && (
                  <tr className="al-row" data-sev="Warning" data-status="Ack'd" id="al-r5">
                    <td><span className="badge badge-amber">Warning</span></td>
                    <td>High Vibration Detected</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('pump')}>PMP-01</td>
                    <td>09:55 AM</td>
                    <td className="al-st"><span className="badge badge-cyan">Ack'd</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('High Vibration - PMP-01')}>
                        <i className="ti ti-ticket"></i> Raise Ticket
                      </button>
                    </td>
                  </tr>
                )}

                {/* Condition Row 7 */}
                {(severityFilter === 'all' || severityFilter === 'Warning') && (
                  <tr className="al-row" data-sev="Warning" data-status="Ack'd" id="al-r6">
                    <td><span className="badge badge-amber">Warning</span></td>
                    <td>Unauthorized Access — Loading Bay</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('cctv')}>CAM-08</td>
                    <td>10:22 AM</td>
                    <td className="al-st"><span className="badge badge-cyan">Ack'd</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleRaiseTicket('Unauthorized Access - CAM-08')}>
                        <i className="ti ti-ticket"></i> Raise Ticket
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: CRITICAL DETAILS ================= */}
      <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="alerts" data-tab="1" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          <div className="kpi glow-bad"><div className="kpi-l">Critical Active</div><div className="kpi-v bad">3</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Critical Resolved Today</div><div className="kpi-v ok">2</div></div>
          <div className="kpi glow-warn"><div className="kpi-l">Avg Resolution Time</div><div className="kpi-v warn">2.4<span className="kpi-u">hrs</span></div></div>
        </div>
        
        <div className="card">
          <div className="ch"><div className="ct">Critical Alerts — Detail</div></div>
          <div className="cb">
            <div className="mb-14" style={{ marginBottom: '10px' }}>
              <div className="alert-strip crit">
                <i className="ti ti-alert-triangle" style={{ color: 'var(--bad)' }}></i>
                <div style={{ flex: 1 }}>
                  <b>CH-01 Chiller — High Condenser Pressure</b>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>
                    Condenser pressure at 18.4 bar (limit: 17 bar). Check cooling water flow and condenser tube fouling. Chiller at risk of trip.
                  </div>
                </div>
                <span className="at">10:21 AM</span>
              </div>
            </div>
            
            <div className="mb-14" style={{ marginBottom: '10px' }}>
              <div className="alert-strip crit">
                <i className="ti ti-thermometer" style={{ color: 'var(--bad)' }}></i>
                <div style={{ flex: 1 }}>
                  <b>AHU Zone C — Temperature Breach Floor 7</b>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>
                    Zone C supply air at 22°C (setpoint 14°C). Controller offline since 08:14 AM. Tenant complaints received. Work order #1042 open.
                  </div>
                </div>
                <span className="at">08:14 AM</span>
              </div>
            </div>
            
            <div>
              <div className="alert-strip crit">
                <i className="ti ti-elevator" style={{ color: 'var(--bad)' }}></i>
                <div style={{ flex: 1 }}>
                  <b>Lift-04 — Door Sensor Fault</b>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>
                    Door closure sensor failed. Lift taken out of service at 10:18 AM. LiftPro contractor contacted. ETA: 2–3 hours.
                  </div>
                </div>
                <span className="at">10:18 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: WARNINGS ACTIVE ================= */}
      <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="alerts" data-tab="2" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <div className="card">
          <div className="ch"><div className="ct">Warnings — Active (4)</div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Alert</th>
                  <th>System</th>
                  <th>Value</th>
                  <th>Threshold</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Low Chilled Water Flow</td>
                  <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('chiller')}>CH-01</td>
                  <td style={{ color: 'var(--warn)' }}>118 m³/h</td>
                  <td>130 m³/h min</td>
                  <td>10:15 AM</td>
                  <td><span className="badge badge-cyan">Ack'd — monitoring</span></td>
                </tr>
                <tr>
                  <td>High Entering Water Temp</td>
                  <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('ct')}>CT-01</td>
                  <td style={{ color: 'var(--warn)' }}>36.4°C</td>
                  <td>35°C limit</td>
                  <td>10:10 AM</td>
                  <td><span className="badge badge-amber">Open</span></td>
                </tr>
                <tr>
                  <td>High Vibration</td>
                  <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('pump')}>PMP-01</td>
                  <td style={{ color: 'var(--warn)' }}>2.1 mm/s</td>
                  <td>2.0 mm/s</td>
                  <td>09:55 AM</td>
                  <td><span className="badge badge-cyan">Ack'd — PM booked</span></td>
                </tr>
                <tr>
                  <td>Unauthorized Access</td>
                  <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('cctv')}>CAM-08</td>
                  <td style={{ color: 'var(--bad)' }}>Motion detected</td>
                  <td>Restricted zone</td>
                  <td>10:22 AM</td>
                  <td><span className="badge badge-red">Open — security alerted</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 3: RESOLVED TODAY ================= */}
      <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="alerts" data-tab="3" style={{ display: activeTab === 3 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok"><div className="kpi-l">Resolved Today</div><div className="kpi-v ok">9</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Avg Resolution</div><div className="kpi-v ok">1.6<span className="kpi-u">hrs</span></div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Auto-Resolved</div><div className="kpi-v ok">4</div></div>
          <div className="kpi"><div className="kpi-l">Manual Close</div><div className="kpi-v">5</div></div>
        </div>
        
        <div className="card">
          <div className="ch"><div className="ct">Resolved Alerts — Today</div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Alert</th>
                  <th>System</th>
                  <th>Raised</th>
                  <th>Closed</th>
                  <th>Duration</th>
                  <th>Closed By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>High Filter ΔP</td>
                  <td>AHU-02</td>
                  <td>07:30 AM</td>
                  <td>09:15 AM</td>
                  <td style={{ color: 'var(--ok)' }}>1h 45m</td>
                  <td>HVAC Team B</td>
                </tr>
                <tr>
                  <td>Low Battery — Fire Panel</td>
                  <td>FP-01</td>
                  <td>06:45 AM</td>
                  <td>07:30 AM</td>
                  <td style={{ color: 'var(--ok)' }}>45m</td>
                  <td>Auto-resolved</td>
                </tr>
                <tr>
                  <td>Damper stuck — AHU-03</td>
                  <td>AHU-03</td>
                  <td>Yesterday 23:00</td>
                  <td>08:00 AM</td>
                  <td style={{ color: 'var(--warn)' }}>9h</td>
                  <td>FM Team</td>
                </tr>
                <tr>
                  <td>Power factor low</td>
                  <td>MB-01</td>
                  <td>Yesterday 22:00</td>
                  <td>06:00 AM</td>
                  <td style={{ color: 'var(--warn)' }}>8h</td>
                  <td>Auto-resolved</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}