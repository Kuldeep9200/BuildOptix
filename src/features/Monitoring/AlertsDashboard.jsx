import React, { useState } from 'react';
import { showToast } from '../../utils/toast';

export default function AlertsDashboard() {
  // Tab Management State (0: Active Feed, 1: Critical Details, 2: Warnings Active, 3: Resolved Today)
  const [activeTab, setActiveTab] = useState(0);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Tab 0 Active Feed Feed ke liye Severity Filter State ('all', 'Critical', 'Warning')
  // const [severityFilter, setSeverityFilter] = useState('all');

  // Helper placeholder functions jo project ke main dashboard triggers ko handle karengi
  // const handleEquipmentClick = (equipmentType) => {
  //   if (typeof window !== 'undefined' && typeof window.switchToEquipment === 'function') {
  //     window.switchToEquipment(equipmentType);
  //   } else {
  //     console.log(`Switching to equipment view: ${equipmentType}`);
  //   }
  // };

  const handleAckAllWarnings = () => {
    if (typeof window !== 'undefined' && typeof window.alAckAllWarnings === 'function') {
      window.alAckAllWarnings();
    } else {
      showToast("Acknowledging all warnings...");
    }
  };

  const handleRaiseTicket = (ticketInfo) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      showToast(`Raising ticket for: ${ticketInfo}`, 'info');
    } else {
      console.log(`Raising ticket for: ${ticketInfo}`);
    }
  };



  const [severityFilter, setSeverityFilter] = useState('all');

  // === Drawer Control & Ticket Data State ===
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    id: 'TKT-1054',
    source: 'From alert',
    title: 'CH-01 Chiller — High Condenser Pressure',
    priority: 'Critical',
    priorityChipClass: 'chip-crit',
    status: 'Acknowledged',
    statusChipClass: 'chip-ack',
    team: 'engineers', // 'engineers' | 'command' | 'site'
    asset: 'CH-01 Chiller',
    site: 'Vikhroli — Godrej One',
    raised: 'Today · 12:12 PM',
    category: 'equipment',
    assignee: '',
    noteInput: '',
    activityHistory: [
      { id: 1, type: 'ok', title: 'Acknowledged — response SLA met', meta: 'Ops Head · Today · 12:13 PM' },
      { id: 2, type: 'mut', title: 'Ticket raised from alert', meta: 'Ops Head · Today · 12:12 PM' }
    ]
  });

  // Handlers for Table Actions
  const handleEquipmentClick = (equipmentId) => {
    console.log(`Navigate to equipment: ${equipmentId}`);
  };

  const handleOpenTicketDetails = (ticketIdOrTitle) => {
    if (ticketIdOrTitle.startsWith('TKT-')) {
      // Existing Ticket View
      setTicketData((prev) => ({
        ...prev,
        id: ticketIdOrTitle,
        title: ticketIdOrTitle === 'TKT-1055'
          ? 'AHU Zone C — HVAC Temp Breach Floor 7'
          : 'CH-01 Chiller — High Condenser Pressure',
        asset: ticketIdOrTitle === 'TKT-1055' ? 'AHU Zone C' : 'CH-01 Chiller'
      }));
    } else {
      // New / Generated Ticket View from Alert
      const randomId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketData((prev) => ({
        ...prev,
        id: randomId,
        source: 'From active alert',
        title: ticketIdOrTitle,
        asset: ticketIdOrTitle.split(' - ')[1] || 'Unknown System'
      }));
    }
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Reassign Team Handler
  const handleReassignTeam = (teamKey) => {
    setTicketData((prev) => ({ ...prev, team: teamKey }));
  };

  // Set Assignee Handler
  const handleSetAssignee = (e) => {
    setTicketData((prev) => ({ ...prev, assignee: e.target.value }));
  };

  // Post Note / Remark Handler
  const handlePostNote = () => {
    if (!ticketData.noteInput.trim()) return;

    const newHistory = [
      {
        id: Date.now(),
        type: 'mut',
        title: `Note added: "${ticketData.noteInput}"`,
        meta: `Current User · Today · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      },
      ...ticketData.activityHistory
    ];

    setTicketData((prev) => ({
      ...prev,
      activityHistory: newHistory,
      noteInput: ''
    }));
  };

  // Action Buttons
  const handleStartWork = () => {
    showToast(`Work started for ticket ${ticketData.id}`);
    setTicketData((prev) => ({
      ...prev,
      status: 'In Progress',
      statusChipClass: 'chip-prog'
    }));
  };

  const handleEscalate = () => {
    showToast(`Ticket ${ticketData.id} escalated to Level 2!`);
    setTicketData((prev) => ({
      ...prev,
      status: 'Escalated',
      statusChipClass: 'chip-crit'
    }));
  };







  return (
    <div className="page active" id="pg-alerts">


      <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
        <div className="ph-left">
          <div className="live-dot"></div>

          <div>
            <div className="ph-title" id="dash-page-title">
              Alerts
            </div>

            <div
              id="dash-page-sub"
              style={{ fontSize: "10px", color: "var(--ink-3)" }}
            >
              Real-time feed · Auto-refresh 30s
            </div>
          </div>
        </div>

        <div className="ph-tabs" id="dash-tab-bar">
          <div
            onClick={() => setActiveTab(0)}
            className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
          >
            All (7)
          </div>

          <div
            onClick={() => setActiveTab(1)}
            className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
          >
            Critical (3)
          </div>

          <div
            onClick={() => setActiveTab(2)}
            className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
          >
            Warnings (4)
          </div>

          <div
            onClick={() => setActiveTab(3)}
            className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
          >
            Resolved
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
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('High Condenser Pressure - CH-01')}>
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
                      <button className="btn" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('TKT-1055')}>
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
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('Door Sensor Fault - Lift-04')}>
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
                      <button className="btn" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('TKT-1054')}>
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
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('High Water Temp - CT-01')}>
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
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('High Vibration - PMP-01')}>
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
                      <button className="btn primary" style={{ padding: '3px 9px', fontSize: '10px' }} onClick={() => handleOpenTicketDetails('Unauthorized Access - CAM-08')}>
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


      {isDrawerOpen && (
        <>
          <div className="sd-drawer-backdrop open" id="sdBackdrop"></div>

          <div className="sd-drawer open" id="sdDrawer" role="dialog" aria-modal="true">

            {/* Drawer Header */}
            <div className="sd-dr-head">
              <div className="sd-dr-top">
                <div>
                  <div className="sd-dr-id">{ticketData.id} · {ticketData.source}</div>
                  <div className="sd-dr-title">{ticketData.title}</div>
                </div>
                <button className="sd-dr-close" onClick={handleCloseDrawer} aria-label="Close" type="button">
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <div className="sd-dr-chips">
                <span className={`sd-chip ${ticketData.priorityChipClass}`}>{ticketData.priority}</span>
                <span className={`sd-chip ${ticketData.statusChipClass}`}>{ticketData.status}</span>
                <span className="sd-chip chip-team">
                  <i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>
                  {ticketData.team === 'engineers' ? 'Engineers' : ticketData.team === 'command' ? 'Command Centre' : 'Site Team'}
                </span>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="sd-dr-body">

              {/* Description */}
              <div className="sd-sec">
                <div className="sd-sec-l"><i className="ti ti-file-description"></i>Description</div>
                <div className="sd-desc">Raised from active alert on {ticketData.asset}. {ticketData.title}.</div>
              </div>

              {/* Asset Fields Grid */}
              <div className="sd-sec">
                <div className="sd-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="sd-field">
                    <div className="fl">Asset / System</div>
                    <div className="fv link" onClick={() => handleEquipmentClick(ticketData.asset)}>
                      {ticketData.asset}
                    </div>
                  </div>
                  <div className="sd-field">
                    <div className="fl">Site</div>
                    <div className="fv">{ticketData.site}</div>
                  </div>
                  <div className="sd-field">
                    <div className="fl">Raised</div>
                    <div className="fv">{ticketData.raised}</div>
                  </div>
                  <div className="sd-field">
                    <div className="fl">Category</div>
                    <div className="fv" style={{ textTransform: 'capitalize' }}>{ticketData.category}</div>
                  </div>
                </div>
              </div>

              {/* SLA Tracking */}
              <div className="sd-sec">
                <div className="sd-sec-l"><i className="ti ti-clock-hour-4"></i>SLA Tracking</div>
                <div className="sd-sla-card">
                  <div className="sd-sla-row">
                    <span className="sd-sla-lab">Response · target 15m</span>
                    <span className="sd-sla-val ok">Met in 1m</span>
                  </div>
                  <div className="sla-track" style={{ marginBottom: '11px' }}>
                    <div className="sla-fill ok" style={{ width: '4.13%' }}></div>
                  </div>
                  <div className="sd-sla-row">
                    <span className="sd-sla-lab">Resolution · target 4h</span>
                    <span className="sd-sla-val ok">3h 59m left</span>
                  </div>
                  <div className="sla-track">
                    <div className="sla-fill ok" style={{ width: '0.25%' }}></div>
                  </div>
                </div>
              </div>

              {/* Ownership & Assignment */}
              <div className="sd-sec">
                <div className="sd-sec-l"><i className="ti ti-users"></i>Ownership &amp; Assignment</div>
                <div className="sd-assign">
                  <div className="sd-team-opts" style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <div
                      className={`sd-team-opt ${ticketData.team === 'engineers' ? 'active' : ''}`}
                      onClick={() => handleReassignTeam('engineers')}
                    >
                      <i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>
                      <div className="tt">Engineers</div>
                    </div>
                    <div
                      className={`sd-team-opt ${ticketData.team === 'command' ? 'active' : ''}`}
                      onClick={() => handleReassignTeam('command')}
                    >
                      <i className="ti ti-broadcast" style={{ color: 'var(--info)' }}></i>
                      <div className="tt">Command Centre</div>
                    </div>
                    <div
                      className={`sd-team-opt ${ticketData.team === 'site' ? 'active' : ''}`}
                      onClick={() => handleReassignTeam('site')}
                    >
                      <i className="ti ti-building" style={{ color: 'var(--violet)' }}></i>
                      <div className="tt">Site Team</div>
                    </div>
                  </div>

                  <select className="sd-sel" value={ticketData.assignee} onChange={handleSetAssignee}>
                    <option value="">— Unassigned —</option>
                    <option value="Rajesh Sharma">Rajesh Sharma</option>
                    <option value="Vikram Patel">Vikram Patel</option>
                    <option value="HVAC Team B">HVAC Team B</option>
                    <option value="Amit Deshpande">Amit Deshpande</option>
                  </select>
                </div>
              </div>

              {/* Add Note / Remark */}
              <div className="sd-sec">
                <div className="sd-sec-l"><i className="ti ti-message-plus"></i>Add Note / Remark</div>
                <textarea
                  className="sd-textarea"
                  value={ticketData.noteInput}
                  onChange={(e) => setTicketData((prev) => ({ ...prev, noteInput: e.target.value }))}
                  placeholder="Add an update, diagnosis or remark…"
                />
                <button
                  className="btn"
                  style={{ marginTop: '8px', padding: '7px 14px' }}
                  onClick={handlePostNote}
                  type="button"
                >
                  <i className="ti ti-send"></i> Post note
                </button>
              </div>

              {/* Activity History */}
              <div className="sd-sec">
                <div className="sd-sec-l">
                  <i className="ti ti-history"></i>Activity History ({ticketData.activityHistory.length})
                </div>
                <div className="sd-tl">
                  {ticketData.activityHistory.map((item) => (
                    <div className="sd-tl-item" key={item.id}>
                      <div className={`sd-tl-dot ${item.type}`}></div>
                      <div className="sd-tl-act">{item.title}</div>
                      <div className="sd-tl-meta">{item.meta}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="sd-dr-foot">
              <button className="btn primary wide" onClick={handleStartWork} type="button">
                <i className="ti ti-progress"></i> Start Work
              </button>
              <button className="btn danger" onClick={handleEscalate} type="button">
                <i className="ti ti-arrow-up-circle"></i> Escalate
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}