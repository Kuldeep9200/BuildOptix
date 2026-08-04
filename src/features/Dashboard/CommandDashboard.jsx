import React, { useState } from 'react';
import "../../App.css"
import { useNavigate } from 'react-router-dom';

export default function CommandDashboard({ onNavigate, setActivePage }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // मॉक फंक्शन्स
  const navigate = useNavigate();

  // ✅ 2. Generic Navigation Handler
  const handleNavigate = (pageId, tabIndex = 0) => {
    if (typeof onNavigate === 'function') {
      onNavigate(pageId, tabIndex);
    } else if (typeof setActivePage === 'function') {
      setActivePage(pageId);
    } else {
      navigate(`/${pageId}`, { state: { tabIndex } });
    }
  };

  // ✅ 3. In teeno functions ko update karein
  const kpiNav = (target, index, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    handleNavigate(target, index);
  };

  const navTo = (target, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    handleNavigate(target, 0);
  };

  const switchToEquipment = (equip) => {
    // Equipment switch logic ya navigation
    handleNavigate('dtequip', 0);
  };

  return (
    <div className="page" id="pg-command">
      {/* Tab Navigation Menu */}

      <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
        <div className="ph-left">
          <div className="live-dot"></div>

          <div>
            <div className="ph-title" id="dash-page-title">
              Command Centre
            </div>

            <div
              id="dash-page-sub"
              style={{ fontSize: "10px", color: "var(--ink-3)" }}
            >
              Portfolio Overview — All Sites
            </div>
          </div>
        </div>

        <div className="ph-tabs" id="dash-tab-bar">
          <div
            onClick={() => setActiveTab(0)}
            className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
          >
            Overview
          </div>

          <div
            onClick={() => setActiveTab(1)}
            className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
          >
            Incidents
          </div>

          <div
            onClick={() => setActiveTab(2)}
            className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
          >
            Work Orders
          </div>

          <div
            onClick={() => setActiveTab(3)}
            className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
          >
            Reports
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




      {/* ================= TAB 0: OVERVIEW ================= */}
      {activeTab === 0 && (
        <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="command" data-tab="0">
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px', padding: '9px 13px', background: 'var(--surface-1)', borderRadius: '7px', border: '1px solid var(--line-1)', flexWrap: 'wrap' }}>
            <span className="pill bad"><span className="dot bad"></span>3 critical open</span>
            <span className="pill ok"><span className="dot ok"></span>9 resolved today</span>
            <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--ink-3)' }}>Last updated: 09 May 2026, 09:00 AM</span>
          </div>

          <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>

            <div
              className="kpi glow-warn clickable"
              title="Go to System Health"
              onClick={(e) => kpiNav('syshealth', 0, e)}
            >
              <div className="kpi-l">Overall Score</div>
              <div className="kpi-v warn">92.4</div>
              <div className="kpi-s">↑ 2.1% vs last month</div>
            </div>

            <div
              className="kpi glow-info clickable"
              title="Go to Complaints & FM"
              onClick={(e) => kpiNav('complaints', 0, e)}
            >
              <div className="kpi-l">Open Tickets</div>
              <div className="kpi-v">47</div>
              <div className="kpi-s">↓ 12 since yesterday</div>
            </div>

            <div
              className="kpi glow-bad clickable"
              title="Go to Alerts — Critical"
              onClick={(e) => kpiNav('alerts', 1, e)}
            >
              <div className="kpi-l">Critical Alerts</div>
              <div className="kpi-v bad">3</div>
              <div className="kpi-s">— unchanged</div>
            </div>

            <div
              className="kpi glow-ok clickable"
              title="Go to SLA Tracker"
              onClick={(e) => kpiNav('sla', 0, e)}
            >
              <div className="kpi-l">SLA Compliance</div>
              <div className="kpi-v ok">96.8<span className="kpi-u">%</span></div>
              <div className="kpi-s">↑ 0.4% this week</div>
            </div>

          </div>
          <div className="mb-14">
            <div className="alert-strip crit">
              <i className="ti ti-alert-triangle" style={{ color: 'var(--bad)' }}></i>
              <span><b>HVAC Unit B3</b> — Temperature threshold breach · Floor 7, Wing C</span>
              <span className="at">08:14 AM</span>
            </div>
            <div className="alert-strip warn">
              <i className="ti ti-clock" style={{ color: 'var(--warn)' }}></i>
              <span>Lift No. 4 (Tower A) preventive maintenance overdue by 3 days</span>
              <span className="at">Yesterday</span>
            </div>
            <div className="alert-strip info">
              <i className="ti ti-info-circle" style={{ color: 'var(--info)' }}></i>
              <span>Planned power shutdown: Basement G2 — Sunday 11 May, 01:00–05:00 AM</span>
              <span className="at">Planned</span>
            </div>
          </div>

          <div className="g21" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Energy Consumption Trend</div>
                  <div className="cs">kWh · Last 7 days vs prior week</div>
                </div>
              </div>
              <div className="cb">
                <svg width="100%" viewBox="0 0 480 120" className="chart-svg">
                  <line x1="0" y1="20" x2="480" y2="20" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="480" y2="50" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="480" y2="80" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="110" x2="480" y2="110" stroke="var(--line-1)" strokeWidth="0.5" />
                  <text x="2" y="18" fontSize="9" fill="var(--ink-3)">1400</text>
                  <text x="2" y="48" fontSize="9" fill="var(--ink-3)">1200</text>
                  <text x="2" y="78" fontSize="9" fill="var(--ink-3)">1000</text>
                  <text x="2" y="108" fontSize="9" fill="var(--ink-3)">800</text>
                  <path d="M30,75 L100,62 L170,80 L240,55 L310,70 L380,48 L450,60" fill="none" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M30,60 L100,45 L170,68 L240,38 L310,52 L380,30 L450,42" fill="none" stroke="var(--info)" strokeWidth="2" />
                  {[
                    { cx: 30, cy: 60 }, { cx: 100, cy: 45 }, { cx: 170, cy: 68 },
                    { cx: 240, cy: 38 }, { cx: 310, cy: 52 }, { cx: 380, cy: 30 }, { cx: 450, cy: 42 }
                  ].map((circle, i) => (
                    <circle key={i} cx={circle.cx} cy={circle.cy} r="3" fill="var(--info)" />
                  ))}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <text key={day} x={30 + i * 70} y="125" fontSize="9" fill="var(--ink-3)" textAnchor="middle">{day}</text>
                  ))}
                </svg>
              </div>
            </div>

            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">System Health</div>
                  <div className="cs">Live status · 14 systems</div>
                </div>
              </div>
              <div className="cb" style={{ padding: '10px 12px' }}>
                <div className="st-item"><div className="st-dot g"></div><div className="st-name">HVAC — Zones A, B, D</div><span className="badge badge-green">OK</span></div>
                <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => switchToEquipment('ahu')}><div className="st-dot r"></div><div className="st-name">HVAC — Zone C, Fl. 7</div><span className="badge badge-red">Alert</span></div>
                <div className="st-item"><div className="st-dot g"></div><div className="st-name">Fire Safety</div><span className="badge badge-green">OK</span></div>
                <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => switchToEquipment('lift')}><div className="st-dot a"></div><div className="st-name">Lift No. 4 (Tower A)</div><span className="badge badge-amber">PM Due</span></div>
                <div className="st-item"><div className="st-dot g"></div><div className="st-name">Security & Access</div><span className="badge badge-green">OK</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 1: INCIDENTS ================= */}
      {activeTab === 1 && (
        <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="command" data-tab="1">
          <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-bad"><div className="kpi-l">Open Incidents</div><div className="kpi-v bad">3</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">Resolved Today</div><div className="kpi-v ok">9</div></div>
            <div className="kpi glow-warn"><div className="kpi-l">Avg Age (Open)</div><div className="kpi-v warn">2.4<span className="kpi-u">hrs</span></div></div>
            <div className="kpi glow-info"><div className="kpi-l">P1 Incidents (MTD)</div><div className="kpi-v">5</div></div>
          </div>
          <div className="card">
            <div className="ch"><div className="ct">Live Incident Queue</div><div className="cs">Real-time · Vikhroli Campus</div></div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr><th>ID</th><th>Description</th><th>System</th><th>Priority</th><th>Age</th><th>Assigned</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#INC-042</td>
                    <td>HVAC Zone C — Temp Breach</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => switchToEquipment('ahu')}>AHU Zone C</td>
                    <td><span className="badge badge-red">P1</span></td>
                    <td style={{ color: 'var(--bad)' }}>2h 10m</td>
                    <td>HVAC Team A</td>
                    <td><span className="badge badge-amber">In Progress</span></td>
                  </tr>
                  <tr>
                    <td>#INC-041</td>
                    <td>Lift-04 Door Sensor Fault</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => switchToEquipment('lift')}>Lift-04</td>
                    <td><span className="badge badge-red">P1</span></td>
                    <td style={{ color: 'var(--bad)' }}>2h 6m</td>
                    <td>LiftPro Contractor</td>
                    <td><span className="badge badge-red">Open</span></td>
                  </tr>
                  <tr>
                    <td>#INC-040</td>
                    <td>High Condenser Pressure — Chiller</td>
                    <td style={{ cursor: 'pointer', color: 'var(--info)' }} onClick={() => switchToEquipment('chiller')}>CH-01</td>
                    <td><span className="badge badge-red">P1</span></td>
                    <td>39m</td>
                    <td>HVAC Team B</td>
                    <td><span className="badge badge-cyan">Assigned</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: WORK ORDERS ================= */}
      {activeTab === 2 && (
        <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="command" data-tab="2">
          <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-info"><div className="kpi-l">Open Work Orders</div><div className="kpi-v">47</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">Completed Today</div><div className="kpi-v ok">9</div></div>
            <div className="kpi glow-warn"><div className="kpi-l">Overdue</div><div className="kpi-v warn">4</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">Avg Completion Time</div><div className="kpi-v ok">1.6<span className="kpi-u">hrs</span></div></div>
          </div>
          <div className="card">
            <div className="ch"><div className="ct">Work Order Queue</div></div>
            <span className="ca" style={{ cursor: 'pointer' }} onClick={() => toast('Creating new work order...', 'info')}>+ New WO</span>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr><th>WO #</th><th>Description</th><th>Location</th><th>Priority</th><th>Trade</th><th>Due By</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>#WO-1042</td><td>AC not cooling — Room 704</td><td>Floor 7</td><td><span className="badge badge-red">High</span></td><td>HVAC</td><td style={{ color: 'var(--bad)' }}>11:30 AM</td><td><span className="badge badge-amber">In Progress</span></td></tr>
                  <tr><td>#WO-1041</td><td>Water leakage — Lobby ceiling</td><td>Ground</td><td><span className="badge badge-red">Critical</span></td><td>Plumbing</td><td style={{ color: 'var(--bad)' }}>OVERDUE</td><td><span className="badge badge-red">Open</span></td></tr>
                  <tr><td>#WO-1040</td><td>Lift-04 Door Sensor</td><td>Tower A</td><td><span className="badge badge-red">Critical</span></td><td>Lift</td><td style={{ color: 'var(--warn)' }}>12:00 PM</td><td><span className="badge badge-cyan">Contractor Called</span></td></tr>
                  <tr><td>#WO-1038</td><td>Parking gate arm — jammed</td><td>Basement B1</td><td><span className="badge badge-amber">Medium</span></td><td>Civil</td><td>01:00 PM</td><td><span className="badge badge-amber">Assigned</span></td></tr>
                  <tr><td>#WO-1036</td><td>Lights flickering — Floor 3 pantry</td><td>Floor 3</td><td><span className="badge badge-cyan">Low</span></td><td>Electrical</td><td>03:00 PM</td><td><span className="badge badge-cyan">Scheduled</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: REPORTS ================= */}
      {activeTab === 3 && (
        <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="command" data-tab="3">
          <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-ok"><div className="kpi-l">Daily Ops Score</div><div className="kpi-v ok">92.4</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">SLA Compliance</div><div className="kpi-v ok">96.8<span className="kpi-u">%</span></div></div>
            <div className="kpi glow-info"><div className="kpi-l">Tickets Resolved (MTD)</div><div className="kpi-v">248</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">Avg Response Time</div><div className="kpi-v ok">18<span className="kpi-u">min</span></div></div>
          </div>
          <div className="g2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="card">
              <div className="ch"><div className="ct">Daily Ops Score Trend</div><div className="cs">Last 7 days</div></div>
              <div className="cb">
                <svg className="chart-svg" viewBox="0 0 300 80">
                  <path d="M20,50 L60,45 L100,55 L140,40 L180,35 L220,30 L270,28" fill="none" stroke="var(--ok)" strokeWidth="2" />
                  <circle cx="20" cy="50" r="3" fill="var(--ok)" />
                  <circle cx="60" cy="45" r="3" fill="var(--ok)" />
                  <circle cx="100" cy="55" r="3" fill="var(--warn)" />
                  <circle cx="140" cy="40" r="3" fill="var(--ok)" />
                  <circle cx="180" cy="35" r="3" fill="var(--ok)" />
                  <circle cx="220" cy="30" r="3" fill="var(--ok)" />
                  <circle cx="270" cy="28" r="3" fill="var(--ok)" />
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'].map((day, i) => (
                    <text key={day} x={20 + (i * 41.6)} y="68" fontSize="7.5" fill="var(--ink-3)" textAnchor="middle">{day}</text>
                  ))}
                </svg>
              </div>
            </div>
            <div className="card">
              <div className="ch"><div className="ct">Quick Links</div></div>
              <div className="cb">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button className="btn" style={{ padding: '10px', fontSize: '11px' }} onClick={(e) => navTo('complaints', e.currentTarget)}><i className="ti ti-message-2"></i> View All Tickets</button>
                  <button className="btn" style={{ padding: '10px', fontSize: '11px' }} onClick={(e) => navTo('alerts', e.currentTarget)}><i className="ti ti-bell"></i> Active Alerts</button>
                  <button className="btn" style={{ padding: '10px', fontSize: '11px' }} onClick={(e) => navTo('sla', e.currentTarget)}><i className="ti ti-clipboard-check"></i> SLA Tracker</button>
                  <button className="btn" style={{ padding: '10px', fontSize: '11px' }} onClick={(e) => navTo('reports', e.currentTarget)}><i className="ti ti-file-analytics"></i> Reports</button>
                  <button className="btn" style={{ padding: '10px', fontSize: '11px' }} onClick={(e) => navTo('logbooks', e.currentTarget)}><i className="ti ti-notebook"></i> Logbooks</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}