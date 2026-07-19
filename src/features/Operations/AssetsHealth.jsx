import React, { useState } from 'react';

export default function AssetsHealth() {
  // activeTab state controls which view/tab is currently shown:
  // 0: Overview (General), 1: PM Schedule, 2: Fault Log, 3: Warranty
  const [activeTab, setActiveTab] = useState(0);

  // सिमुलेटेड नेविगेशन फ़ंक्शन
  const handleKpiClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleEquipmentClick = (equipmentId) => {
    console.log(`Navigating to equipment detail: ${equipmentId}`);
    // यहाँ आप अपनी राउटिंग या डिटेल मॉडल खोलने का लॉजिक जोड़ सकते हैं
  };

  const handleExport = () => {
    alert('Exporting schedule...');
  };

  return (
    <div className="page" id="pg-assets">
      {/* ========================================================= */}
      {/* TAB 0: OVERVIEW / GENERAL                                 */}
      {/* ========================================================= */}
      {activeTab === 0 && (
        <div className="tab-panel active">
          {/* KPI Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-ok clickable" title="View full asset register" onClick={() => handleKpiClick(0)}>
              <div className="kpi-l">Total Assets</div>
              <div className="kpi-v">2,148</div>
              <div className="kpi-s">registered</div>
            </div>
            <div className="kpi glow-ok clickable" title="View healthy assets" onClick={() => handleKpiClick(0)}>
              <div className="kpi-l">Healthy</div>
              <div className="kpi-v ok">2,089</div>
              <div className="kpi-s">97.3%</div>
            </div>
            <div className="kpi glow-warn clickable" title="View PM Schedule" onClick={() => handleKpiClick(1)}>
              <div className="kpi-l">PM Due / Overdue</div>
              <div className="kpi-v warn">43</div>
              <div className="kpi-s">this month</div>
            </div>
            <div className="kpi glow-bad clickable" title="View Fault Log" onClick={() => handleKpiClick(2)}>
              <div className="kpi-l">Critical Faults</div>
              <div className="kpi-v bad">2</div>
              <div className="kpi-s">open incidents</div>
            </div>
          </div>

          {/* Critical Assets Quick Jump */}
          <div className="card mb-12">
            <div className="ch">
              <div>
                <div className="ct">Critical Assets — Quick Jump</div>
                <div className="cs">Click to open equipment detail</div>
              </div>
            </div>
            <div className="cb" style={{ padding: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
                {/* Chiller Card */}
                <div 
                  style={{ background: 'var(--surface-2)', border: '1px solid rgba(242,91,91,0.3)', borderRadius: '7px', padding: '10px', cursor: 'pointer' }} 
                  onClick={() => handleEquipmentClick('chiller')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <i className="ti ti-snowflake" style={{ color: 'var(--cool)' }}></i>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>CH-01 Chiller</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--bad)' }}>⚠ High Condenser Pressure</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Health: 92% · Running</div>
                </div>

                {/* Lift Card */}
                <div 
                  style={{ background: 'var(--surface-2)', border: '1px solid rgba(245,180,65,0.3)', borderRadius: '7px', padding: '10px', cursor: 'pointer' }} 
                  onClick={() => handleEquipmentClick('lift')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <i className="ti ti-elevator" style={{ color: 'var(--ok)' }}></i>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>Lift-04</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--warn)' }}>⚠ Door Sensor Fault</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Health: 78% · Alarm</div>
                </div>

                {/* Cooling Tower Card */}
                <div 
                  style={{ background: 'var(--surface-2)', border: '1px solid rgba(78,161,255,0.3)', borderRadius: '7px', padding: '10px', cursor: 'pointer' }} 
                  onClick={() => handleEquipmentClick('ct')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <i className="ti ti-cloud" style={{ color: 'var(--info)' }}></i>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>CT-01 Cooling Tower</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--info)' }}>ℹ PM due in 5 days</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Health: 93% · Running</div>
                </div>

                {/* Solar Card */}
                <div 
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--line-1)', borderRadius: '7px', padding: '10px', cursor: 'pointer' }} 
                  onClick={() => handleEquipmentClick('solar')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <i className="ti ti-solar-panel" style={{ color: 'var(--solar)' }}></i>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>SLR-01 Solar</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--ok)' }}>✓ Generating normally</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Health: 100% · Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* PM Schedule - Summary Table */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">PM Schedule — This Month</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Due Date</th>
                    <th>Assigned</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CH-01 Chiller</td>
                    <td>Quarterly Service</td>
                    <td>22 May</td>
                    <td>HVAC Team A</td>
                    <td><span className="badge badge-cyan">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td>Lift-04 Door Sensor</td>
                    <td>Fault Repair</td>
                    <td>ASAP</td>
                    <td>Lift Contractor</td>
                    <td><span className="badge badge-red">Overdue</span></td>
                  </tr>
                  <tr>
                    <td>AHU-01 Filter</td>
                    <td>Filter Replacement</td>
                    <td>28 May</td>
                    <td>HVAC Team B</td>
                    <td><span className="badge badge-amber">Pending</span></td>
                  </tr>
                  <tr>
                    <td>CT-01 Water Treatment</td>
                    <td>Chemical dosing check</td>
                    <td>25 May</td>
                    <td>Water Team</td>
                    <td><span className="badge badge-cyan">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td>DG-01 Diesel Genset</td>
                    <td>Monthly Run Test</td>
                    <td>20 May</td>
                    <td>Electrical Team</td>
                    <td><span className="badge badge-green">Done</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: PM SCHEDULE DETAIL                                 */}
      {/* ========================================================= */}
      {activeTab === 1 && (
        <div className="tab-panel active">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-warn">
              <div className="kpi-l">PM Due This Month</div>
              <div className="kpi-v warn">43</div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Overdue</div>
              <div className="kpi-v bad">4</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Completed (MTD)</div>
              <div className="kpi-v ok">28</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">PM Completion Rate</div>
              <div className="kpi-v">87<span className="kpi-u">%</span></div>
            </div>
          </div>

          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Full PM Schedule — May & June 2026</div>
              </div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={handleExport}>
                Export →
              </span>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Asset Name</th>
                    <th>PM Type</th>
                    <th>Frequency</th>
                    <th>Due Date</th>
                    <th>Vendor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CH-01</td>
                    <td>Centrifugal Chiller</td>
                    <td>Quarterly Service</td>
                    <td>Q</td>
                    <td style={{ color: 'var(--warn)' }}>22 May</td>
                    <td>CoolTech HVAC</td>
                    <td><span className="badge badge-cyan">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td>LIFT-04</td>
                    <td>Elevator — Tower A</td>
                    <td>Fault Repair + PM</td>
                    <td>ASAP</td>
                    <td style={{ color: 'var(--bad)' }}>ASAP</td>
                    <td>LiftPro India</td>
                    <td><span className="badge badge-red">Overdue</span></td>
                  </tr>
                  <tr>
                    <td>AHU-01</td>
                    <td>Air Handling Unit</td>
                    <td>Filter Replacement</td>
                    <td>M</td>
                    <td>28 May</td>
                    <td>HVAC Team B</td>
                    <td><span className="badge badge-amber">Pending</span></td>
                  </tr>
                  <tr>
                    <td>CT-01</td>
                    <td>Cooling Tower</td>
                    <td>Water Treatment</td>
                    <td>M</td>
                    <td>25 May</td>
                    <td>AquaPure</td>
                    <td><span className="badge badge-cyan">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td>DG-01</td>
                    <td>Diesel Genset</td>
                    <td>Monthly Run Test</td>
                    <td>M</td>
                    <td>20 May</td>
                    <td>In-house</td>
                    <td><span className="badge badge-green">Done</span></td>
                  </tr>
                  <tr>
                    <td>FP-01</td>
                    <td>Fire Panel</td>
                    <td>Quarterly Check</td>
                    <td>Q</td>
                    <td>15 Jun</td>
                    <td>FireGuard</td>
                    <td><span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}>Upcoming</span></td>
                  </tr>
                  <tr>
                    <td>SLR-01</td>
                    <td>Solar Array</td>
                    <td>Panel Cleaning</td>
                    <td>M</td>
                    <td>01 Jun</td>
                    <td>SolarMax</td>
                    <td><span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}>Upcoming</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: FAULT LOG                                          */}
      {/* ========================================================= */}
      {activeTab === 2 && (
        <div className="tab-panel active">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-bad">
              <div className="kpi-l">Active Faults</div>
              <div className="kpi-v bad">2</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Closed (MTD)</div>
              <div className="kpi-v ok">14</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Recurring Faults</div>
              <div className="kpi-v warn">3</div>
              <div className="kpi-s">same asset &gt;2x</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Avg Resolution Time</div>
              <div className="kpi-v">3.8<span className="kpi-u">hrs</span></div>
            </div>
          </div>

          <div className="card">
            <div className="ch">
              <div className="ct">Fault Log — Active & Recent</div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={() => console.log('Opening HVAC Logbook...')}>
                <i className="ti ti-notebook" style={{ fontSize: '11px' }}></i> HVAC Logbook
              </span>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Fault</th>
                    <th>Reported</th>
                    <th>Severity</th>
                    <th>Assignee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('chiller')}>CH-01 Chiller</td>
                    <td>High condenser pressure + low CHW flow</td>
                    <td>10:21 AM</td>
                    <td><span className="badge badge-red">Critical</span></td>
                    <td>HVAC Team B</td>
                    <td><span className="badge badge-amber">In Progress</span></td>
                  </tr>
                  <tr>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('lift')}>Lift-04</td>
                    <td>Door sensor fault — Car out of service</td>
                    <td>10:18 AM</td>
                    <td><span className="badge badge-red">Critical</span></td>
                    <td>LiftPro India</td>
                    <td><span className="badge badge-red">Open</span></td>
                  </tr>
                  <tr>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('ahu')}>AHU-01</td>
                    <td>Filter ΔP high — service due</td>
                    <td>08:45 AM</td>
                    <td><span className="badge badge-amber">Warning</span></td>
                    <td>HVAC Team A</td>
                    <td><span className="badge badge-cyan">Acknowledged</span></td>
                  </tr>
                  <tr>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentClick('ct')}>CT-01</td>
                    <td>High entering water temp</td>
                    <td>10:10 AM</td>
                    <td><span className="badge badge-amber">Warning</span></td>
                    <td>CoolTech HVAC</td>
                    <td><span className="badge badge-amber">Open</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: WARRANTY & AMC                                     */}
      {/* ========================================================= */}
      {activeTab === 3 && (
        <div className="tab-panel active">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-ok">
              <div className="kpi-l">Assets Under Warranty</div>
              <div className="kpi-v ok">12</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Expiring (90d)</div>
              <div className="kpi-v warn">3</div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Expired</div>
              <div className="kpi-v bad">2</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Total AMC Value</div>
              <div className="kpi-v">₹86<span className="kpi-u">L/yr</span></div>
            </div>
          </div>

          <div className="card">
            <div className="ch">
              <div className="ct">Warranty Register</div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Make / Model</th>
                    <th>Install Date</th>
                    <th>Warranty Expiry</th>
                    <th>AMC Status</th>
                    <th>Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CH-01 Chiller</td>
                    <td>Carrier 30XA / 700 TR</td>
                    <td>Jan 2022</td>
                    <td style={{ color: 'var(--ok)' }}>Jan 2027</td>
                    <td><span className="badge badge-green">Active</span></td>
                    <td>CoolTech HVAC</td>
                  </tr>
                  <tr>
                    <td>AHU-01</td>
                    <td>York / 60,000 CFM</td>
                    <td>Mar 2022</td>
                    <td style={{ color: 'var(--ok)' }}>Mar 2026</td>
                    <td><span className="badge badge-green">Active</span></td>
                    <td>HVAC Team</td>
                  </tr>
                  <tr>
                    <td>Lift Group (5 cars)</td>
                    <td>Otis / 13-person</td>
                    <td>Jun 2019</td>
                    <td style={{ color: 'var(--bad)' }}>Jun 2024 (exp)</td>
                    <td><span className="badge badge-red">AMC Only</span></td>
                    <td>LiftPro India</td>
                  </tr>
                  <tr>
                    <td>Solar Array 200 kWp</td>
                    <td>Trina Solar / Fronius</td>
                    <td>Jan 2023</td>
                    <td style={{ color: 'var(--ok)' }}>Jan 2033</td>
                    <td><span className="badge badge-green">10-yr</span></td>
                    <td>SolarMax Energy</td>
                  </tr>
                  <tr>
                    <td>DG-01 (1000 kVA)</td>
                    <td>Cummins KTA50</td>
                    <td>Feb 2020</td>
                    <td style={{ color: 'var(--warn)' }}>Feb 2026 (3m)</td>
                    <td><span className="badge badge-amber">Expiring</span></td>
                    <td>Cummins India</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* सिमुलेशन के लिए टैब स्विचर (यदि आपके हेडर में यह पहले से नहीं है) */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button className={`badge ${activeTab === 0 ? 'badge-cyan' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveTab(0)}>Overview</button>
        <button className={`badge ${activeTab === 1 ? 'badge-cyan' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveTab(1)}>PM Schedule</button>
        <button className={`badge ${activeTab === 2 ? 'badge-cyan' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveTab(2)}>Fault Log</button>
        <button className={`badge ${activeTab === 3 ? 'badge-cyan' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveTab(3)}>Warranty (AMC)</button>
      </div>
    </div>
  );
}