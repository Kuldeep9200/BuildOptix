import React, { useState } from 'react';

export default function SystemHealthDashboard() {
  // Tab Management State (0: Live Status, 1: Heatmap, 2: PM Schedule, 3: Fault Log)
  const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  // Uptime Heatmap Raw Dataset
  const daysData = [
    99.9, 99.8, 100, 99.9, 99.7, 100, 100, 99.8, 99.9, 100,
    99.9, 99.8, 100, 99.7, 99.9, 100, 99.6, 99.5, 99.9, 100,
    98.1, 99.8, 99.9, 99.8, 100, 99.9, 99.7, 99.8, 100, 99.9, 100
  ];

  // Helper method to get cell background color based on uptime metrics
  const getHeatmapColor = (uptime) => {
    if (uptime >= 99.9) return 'var(--ok)';
    if (uptime >= 99.5) return 'var(--info)';
    if (uptime >= 99.0) return 'var(--warn)';
    return 'var(--bad)';
  };

  // Safe window actions navigation callbacks
  const handleEquipmentSwitch = (equipmentType) => {
    if (typeof window !== 'undefined' && typeof window.switchToEquipment === 'function') {
      window.switchToEquipment(equipmentType);
    } else {
      console.log(`Switching context view to: ${equipmentType}`);
    }
  };

  return (
    <div className="page active" id="pg-syshealth">


<div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                          System Health 
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                           Live Status — All Systems

                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                      Live Status
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                     Uptime
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                       PM Schedule
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                       Faults
                    </div>
                </div>

                {/* Range Picker */}
                <div className="range-picker" id="boRangePicker">
                    <span className="rp-label">Range</span>

                    <div className="rp-seg">
                        <button data-range="today" className="active">
                            Today
                        </button>

                        <button data-range="7d">7D</button>

                        <button data-range="30d">30D</button>

                        <button data-range="custom">
                            <i className="ti ti-calendar" style={{ fontSize: "12px" }}></i>
                            Custom
                        </button>
                    </div>

                    <div className="rp-pop" id="rpPop">
                        <label>From</label>
                        <input type="date" id="rpFrom" />

                        <label>To</label>
                        <input type="date" id="rpTo" />

                        <button className="rp-apply" id="rpApply">
                            Apply range
                        </button>
                    </div>
                </div>

                {/* Download */}
                <div className="dash-dl" id="dashDl">
                    <button
                        className="dash-dl-btn"
                        id="dashDlBtn"
                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                    >
                        <i className="ti ti-download"></i>
                        Download Reports
                        <i
                            className="ti ti-chevron-down"
                            style={{ fontSize: "12px", opacity: 0.8 }}
                        ></i>
                    </button>
                    {showDownloadMenu && (
                        <div className="dash-dl-menu" style={{ display: showDownloadMenu ? "block" : "none" }}>

                            {/* Energy */}
                            
                            <div className="dash-dl-h">Quick report downloads</div>

                            <div className="dash-dl-opt" data-i="0">
                                <div
                                    className="di"
                                    style={{ background: "var(--info)", opacity: 0.16 }}
                                ></div>

                                <div
                                    style={{
                                        marginLeft: "-38px",
                                        width: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i
                                        className="ti ti-bolt"
                                        style={{ color: "var(--info)", fontSize: "14px" }}
                                    ></i>
                                </div>

                                <div>
                                    <div className="dt2">Energy &amp; Utilities</div>
                                    <div className="ds">Floor-wise · cost · EPI</div>
                                </div>

                                <span className="dx">CSV</span>
                            </div>

                            {/* CO2 */}
                            <div className="dash-dl-opt" data-i="1">
                                <div
                                    className="di"
                                    style={{ background: "var(--ok)", opacity: 0.16 }}
                                ></div>

                                <div
                                    style={{
                                        marginLeft: "-38px",
                                        width: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i
                                        className="ti ti-leaf"
                                        style={{ color: "var(--ok)", fontSize: "14px" }}
                                    ></i>
                                </div>

                                <div>
                                    <div className="dt2">CO₂ &amp; ESG Summary</div>
                                    <div className="ds">Scope 1/2/3 · offsets</div>
                                </div>

                                <span className="dx">CSV</span>
                            </div>

                            {/* SLA */}
                            <div className="dash-dl-opt" data-i="2">
                                <div
                                    className="di"
                                    style={{ background: "var(--warn)", opacity: 0.16 }}
                                ></div>

                                <div
                                    style={{
                                        marginLeft: "-38px",
                                        width: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i
                                        className="ti ti-clipboard-check"
                                        style={{ color: "var(--warn)", fontSize: "14px" }}
                                    ></i>
                                </div>

                                <div>
                                    <div className="dt2">SLA &amp; Tickets</div>
                                    <div className="ds">Live ticket + SLA export</div>
                                </div>

                                <span className="dx">CSV</span>
                            </div>

                            {/* Asset */}
                            <div className="dash-dl-opt" data-i="3">
                                <div
                                    className="di"
                                    style={{ background: "var(--violet)", opacity: 0.16 }}
                                ></div>

                                <div
                                    style={{
                                        marginLeft: "-38px",
                                        width: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i
                                        className="ti ti-tool"
                                        style={{ color: "var(--violet)", fontSize: "14px" }}
                                    ></i>
                                </div>

                                <div>
                                    <div className="dt2">Asset PM</div>
                                    <div className="ds">PM status · health</div>
                                </div>

                                <span className="dx">CSV</span>
                            </div>

                            {/* Solar */}
                            <div className="dash-dl-opt" data-i="4">
                                <div
                                    className="di"
                                    style={{ background: "var(--solar)", opacity: 0.16 }}
                                ></div>

                                <div
                                    style={{
                                        marginLeft: "-38px",
                                        width: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i
                                        className="ti ti-solar-panel"
                                        style={{ color: "var(--solar)", fontSize: "14px" }}
                                    ></i>
                                </div>

                                <div>
                                    <div className="dt2">Solar &amp; ROI</div>
                                    <div className="ds">Generation · savings</div>
                                </div>

                                <span className="dx">CSV</span>
                            </div>

                            {/* Device */}
                            <div className="dash-dl-opt" data-i="5">
                                <div
                                    className="di"
                                    style={{ background: "var(--cool)", opacity: 0.16 }}
                                ></div>

                                <div
                                    style={{
                                        marginLeft: "-38px",
                                        width: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <i
                                        className="ti ti-router"
                                        style={{ color: "var(--cool)", fontSize: "14px" }}
                                    ></i>
                                </div>

                                <div>
                                    <div className="dt2">Device Fleet</div>
                                    <div className="ds">IoT health · connectivity</div>
                                </div>

                                <span className="dx">CSV</span>
                            </div>

                            <div
                                style={{
                                    borderTop: "1px solid var(--line-1)",
                                    marginTop: "5px",
                                    paddingTop: "6px",
                                }}
                            >
                                <div className="dash-dl-opt" id="dashDlAll">
                                    <div
                                        className="di"
                                        style={{ background: "var(--info)", opacity: 0.16 }}
                                    ></div>

                                    <div
                                        style={{
                                            marginLeft: "-38px",
                                            width: "28px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <i
                                            className="ti ti-package"
                                            style={{ color: "var(--info)", fontSize: "14px" }}
                                        ></i>
                                    </div>

                                    <div>
                                        <div className="dt2">All reports</div>
                                        <div className="ds">Download every report (CSV)</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: "7px 9px 3px" }}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navTo("reports");
                                    }}
                                    style={{
                                        fontSize: "10.5px",
                                        color: "var(--info)",
                                        cursor: "pointer",
                                    }}
                                >
                                    Open full Reports &amp; Bills library →
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>


      
      {/* ================= TAB 0: LIVE STATUS & OVERVIEW ================= */}
      <div 
        className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} 
        data-page="syshealth" 
        data-tab="0"
        style={{ display: activeTab === 0 ? 'block' : 'none' }}
      >
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok clickable" title="View uptime heatmap" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">System Uptime</div>
            <div className="kpi-v ok">99.8<span className="kpi-u">%</span></div>
            <div className="kpi-s">30-day average</div>
          </div>
          <div className="kpi glow-bad clickable" title="View fault log" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Active Faults</div>
            <div className="kpi-v bad">2</div>
            <div className="kpi-s">critical systems</div>
          </div>
          <div className="kpi glow-info clickable" title="View live status" onClick={() => setActiveTab(0)}>
            <div className="kpi-l">Sensors Online</div>
            <div className="kpi-v">2,148</div>
            <div className="kpi-s">of 2,156 total</div>
          </div>
          <div className="kpi glow-warn clickable" title="View fault log" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Offline Sensors</div>
            <div className="kpi-v warn">8</div>
            <div className="kpi-s">network timeout</div>
          </div>
        </div>

        <div className="g2">
          <div className="card">
            <div className="ch"><div className="ct">System Live Status</div></div>
            <div className="cb" style={{ padding: '10px 12px' }}>
              <div className="st-item"><div className="st-dot g"></div><div className="st-name">BMS Core Platform</div><span className="badge badge-green">Online</span></div>
              <div className="st-item"><div className="st-dot g"></div><div className="st-name">IoT Sensor Network</div><span className="badge badge-green">99.6% active</span></div>
              <div className="st-item"><div className="st-dot r"></div><div className="st-name">HVAC Controller Zone C</div><span className="badge badge-red">Fault</span></div>
              <div className="st-item"><div className="st-dot a"></div><div className="st-name">Lift Control Group</div><span className="badge badge-amber">Degraded</span></div>
              <div className="st-item"><div className="st-dot g"></div><div className="st-name">Fire Panel Network</div><span className="badge badge-green">Normal</span></div>
              <div className="st-item"><div className="st-dot g"></div><div className="st-name">CCTV NVR</div><span className="badge badge-green">Recording</span></div>
            </div>
          </div>

          <div className="card">
            <div className="ch"><div className="ct">30-Day Uptime by System</div></div>
            <div className="cb">
              <div className="prog"><div className="prog-hd"><span class="prog-lbl">HVAC</span><span className="prog-val">99.2%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: '99.2%', background: 'var(--ok)' }}></div></div></div>
              <div className="prog"><div className="prog-hd"><span class="prog-lbl">Fire Safety</span><span className="prog-val">100%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: '100%', background: 'var(--ok)' }}></div></div></div>
              <div className="prog"><div className="prog-hd"><span class="prog-lbl">Electrical</span><span className="prog-val">99.8%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: '99.8%', background: 'var(--ok)' }}></div></div></div>
              <div className="prog"><div className="prog-hd"><span class="prog-lbl">Lifts</span><span className="prog-val">98.1%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: '98.1%', background: 'var(--warn)' }}></div></div></div>
              <div className="prog"><div className="prog-hd"><span class="prog-lbl">CCTV</span><span className="prog-val">100%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: '100%', background: 'var(--ok)' }}></div></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: UPTIME HEATMAP ================= */}
      <div 
        className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} 
        data-page="syshealth" 
        data-tab="1"
        style={{ display: activeTab === 1 ? 'block' : 'none' }}
      >
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok"><div className="kpi-l">Overall Uptime (30d)</div><div className="kpi-v ok">99.8<span className="kpi-u">%</span></div></div>
          <div className="kpi glow-ok"><div className="kpi-l">MTBF</div><div className="kpi-v ok">2,240<span className="kpi-u">hrs</span></div></div>
          <div className="kpi glow-info"><div className="kpi-l">MTTR</div><div className="kpi-v">1.8<span className="kpi-u">hrs</span></div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Availability SLA</div><div className="kpi-v ok">99.5<span className="kpi-u">%</span></div><div className="kpi-s">target met ✓</div></div>
        </div>

        <div className="card">
          <div className="ch">
            <div>
              <div className="ct">Monthly Uptime Heatmap</div>
              <div className="cs">Each cell = 1 day · colour = availability · May 2026</div>
            </div>
          </div>
          <div className="cb">
            <div className="hm-wrap" style={{ gridTemplateColumns: 'repeat(31,1fr)' }}>
              {daysData.map((val, index) => (
                <div 
                  key={index}
                  className="hm-cell" 
                  style={{ background: getHeatmapColor(val), opacity: 0.7 }} 
                  title={`Day ${index + 1}: ${val}%`}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', fontSize: '10px', color: 'var(--ink-3)' }}>
              <span><span style={{ color: 'var(--ok)' }}>■</span> ≥99.9%</span>
              <span><span style={{ color: 'var(--info)' }}>■</span> ≥99.5%</span>
              <span><span style={{ color: 'var(--warn)' }}>■</span> ≥99%</span>
              <span><span style={{ color: 'var(--bad)' }}>■</span> less than 99%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: PREVENTIVE MAINTENANCE SCHEDULE ================= */}
      <div 
        className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} 
        data-page="syshealth" 
        data-tab="2"
        style={{ display: activeTab === 2 ? 'block' : 'none' }}
      >
        <div className="card">
          <div className="ch"><div><div className="ct">Upcoming PM Schedule — All Systems</div></div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>System</th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Frequency</th>
                  <th>Technician</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>CH-01 Chiller</td><td>Quarterly service + water treatment</td><td style={{ color: 'var(--warn)' }}>22 May 2026</td><td>Quarterly</td><td>HVAC Team A</td><td><span className="badge badge-cyan">Scheduled</span></td></tr>
                <tr><td>BMS Controllers</td><td>Firmware update + calibration</td><td>25 May 2026</td><td>Half-yearly</td><td>BMS Engineer</td><td><span className="badge badge-cyan">Scheduled</span></td></tr>
                <tr><td>IoT Gateways (×8)</td><td>Network health check + reboot</td><td>28 May 2026</td><td>Monthly</td><td>IT / BMS</td><td><span class="badge badge-cyan">Scheduled</span></td></tr>
                <tr><td>SCADA Server</td><td>DB backup + OS patches</td><td>31 May 2026</td><td>Monthly</td><td>IT Team</td><td><span className="badge badge-cyan">Scheduled</span></td></tr>
                <tr><td>UPS — Server Room</td><td>Battery test + load transfer test</td><td>05 Jun 2026</td><td>Quarterly</td><td>Electrical Team</td><td><span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}>Pending</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 3: ACTIVE FAULT LOG ================= */}
      <div 
        className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} 
        data-page="syshealth" 
        data-tab="3"
        style={{ display: activeTab === 3 ? 'block' : 'none' }}
      >
        <div className="card">
          <div className="ch"><div><div className="ct">Active Fault Log</div></div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>System</th>
                  <th>Fault Description</th>
                  <th>Since</th>
                  <th>Impact</th>
                  <th>Assignee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentSwitch('ahu')}>
                    <b>HVAC Zone C</b>
                  </td>
                  <td>Temperature controller offline — Floor 7</td>
                  <td>08:14 AM</td>
                  <td><span className="badge badge-red">High</span></td>
                  <td>HVAC Team A</td>
                  <td><span className="badge badge-amber">In Progress</span></td>
                </tr>
                <tr>
                  <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => handleEquipmentSwitch('lift')}>
                    <b>Lift-04</b>
                  </td>
                  <td>Door sensor fault — communication error</td>
                  <td>10:18 AM</td>
                  <td><span className="badge badge-red">High</span></td>
                  <td>LiftPro Contractor</td>
                  <td><span className="badge badge-red">Open</span></td>
                </tr>
                <tr>
                  <td><b>IoT Gateway G-07</b></td>
                  <td>Network timeout — 8 sensors unreachable</td>
                  <td>Yesterday</td>
                  <td><span className="badge badge-amber">Medium</span></td>
                  <td>IT Team</td>
                  <td><span className="badge badge-amber">Investigating</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}