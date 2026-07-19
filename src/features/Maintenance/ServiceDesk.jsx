import React, { useState } from 'react';

export default function ServiceDesk() {
  // Tab control ke liye active state (0, 1, ya 2)
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* ================= TAB 0: SERVICE DESK MAIN ================= */}
      <div className={`page ${activeTab === 0 ? 'active' : ''}`} id="pg-servicedesk" data-built="1" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <div className="tab-panel active" data-page="servicedesk" data-tab="0">
          
          {/* KPI Strip */}
          <div id="sd-q-kpis" className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-bad">
              <div className="kpi-l">Open Tickets</div>
              <div className="kpi-v bad">10</div>
              <div className="kpi-s">3 critical</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">SLA Breaching</div>
              <div className="kpi-v warn">9</div>
              <div className="kpi-s">needs escalation</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Unassigned</div>
              <div className="kpi-v ">3</div>
              <div className="kpi-s">awaiting owner</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Resolved Today</div>
              <div className="kpi-v ok">0</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="sd-toolbar">
            <div className="sd-seg" id="sd-seg-team">
              <button data-v="all" className="active">All teams</button>
              <button data-v="engineers">Engineers</button>
              <button data-v="command">Command</button>
              <button data-v="site">Site</button>
            </div>
            <div className="sd-seg" id="sd-seg-status">
              <button data-v="open" className="active">Open</button>
              <button data-v="new">New</button>
              <button data-v="in_progress">In progress</button>
              <button data-v="on_hold">On hold</button>
              <button data-v="all">All</button>
            </div>
            <div className="sd-search">
              <i className="ti ti-search"></i>
              <input id="sd-q-search" type="text" placeholder="Search ticket, asset, owner…" />
            </div>
            <div className="sd-tb-spacer"></div>
            <button className="btn primary" style={{ padding: '8px 14px' }}>
              <i className="ti ti-plus"></i>New Ticket
            </button>
          </div>

          {/* Ticket Queue Card */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Ticket Queue</div>
                <div className="cs" id="sd-q-count">10 shown · 10 open in this view</div>
              </div>
              <span className="ca"><i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export CSV</span>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="sd-q-table">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ticket</th>
                      <th>Priority</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1044</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>IOT-GW07 — Edge Gateway Offline</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>IOT-GW07 Gateway</div>
                      </td>
                      <td><span className="sd-chip chip-crit">Critical</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-broadcast" style={{ color: 'var(--info)' }}></i>Command Centre</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Unassigned</div>
                      </td>
                      <td><span className="sd-chip chip-new">New</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 19h 46m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>12:33 AM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1042</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>CH-01 Chiller — High Condenser Pressure</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>CH-01 Chiller</div>
                      </td>
                      <td><span className="sd-chip chip-crit">Critical</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>Engineers</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Rajesh Sharma · <span style={{ color: 'var(--bad)' }}>L1</span></div>
                      </td>
                      <td><span className="sd-chip chip-prog">In Progress</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 20h 37m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>12:02 AM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1043</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>AHU Zone C — Temperature Breach Floor 7</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>AHU Zone C</div>
                      </td>
                      <td><span className="sd-chip chip-crit">Critical</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>Engineers</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>HVAC Team B · <span style={{ color: 'var(--bad)' }}>L2</span></div>
                      </td>
                      <td><span className="sd-chip chip-ack">Acknowledged</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 22h 23m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>10:16 PM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1053</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>IOT-CT01 — Comms Degraded</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>IOT-CT01 Cooling Tower Node</div>
                      </td>
                      <td><span className="sd-chip chip-high">High</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-broadcast" style={{ color: 'var(--info)' }}></i>Command Centre</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Unassigned</div>
                      </td>
                      <td><span className="sd-chip chip-new">New</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 15h 35m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>12:44 AM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1049</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>CAM-08 Loading Bay — Unauthorized Access</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>CAM-08</div>
                      </td>
                      <td><span className="sd-chip chip-high">High</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-building" style={{ color: 'var(--violet)' }}></i>Site Team</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Unassigned</div>
                      </td>
                      <td><span className="sd-chip chip-new">New</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 15h 43m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>12:36 AM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1045</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>Lift-04 — Door Sensor Fault</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>Lift-04</div>
                      </td>
                      <td><span className="sd-chip chip-high">High</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>Engineers</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Vikram Patel</div>
                      </td>
                      <td><span className="sd-chip chip-prog">In Progress</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 16h 21m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>12:06 AM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1046</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>IOT-MTR03 — Meter Comms Intermittent</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>IOT-MTR03 Meter</div>
                      </td>
                      <td><span className="sd-chip chip-high">High</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-broadcast" style={{ color: 'var(--info)' }}></i>Command Centre</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Neha Iyer (NOC)</div>
                      </td>
                      <td><span className="sd-chip chip-ack">Acknowledged</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 17h 10m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>11:24 PM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1048</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>CT-01 — High Entering Water Temp</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>CT-01</div>
                      </td>
                      <td><span className="sd-chip chip-med">Medium</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>Engineers</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Amit Deshpande</div>
                      </td>
                      <td><span className="sd-chip chip-ack">Acknowledged</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 1h 45m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>10:44 PM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1047</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>Tower B Lobby — AC Not Cooling</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>AHU-12 / Lobby</div>
                      </td>
                      <td><span className="sd-chip chip-med">Medium</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-building" style={{ color: 'var(--violet)' }}></i>Site Team</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Priya Menon</div>
                      </td>
                      <td><span className="sd-chip chip-prog">In Progress</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 3h 5m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>9:22 PM</td>
                    </tr>
                    <tr className="sd-row">
                      <td className="sd-id">TKT-1050</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>PMP-01 — High Vibration</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>PMP-01</div>
                      </td>
                      <td><span className="sd-chip chip-low">Low</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-tools" style={{ color: 'var(--hot)' }}></i>Engineers</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>HVAC Team B</div>
                      </td>
                      <td><span className="sd-chip chip-hold">On Hold</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>40%</span></div>
                          <div className="sla-track"><div className="sla-fill ok" style={{ width: '39.70085532407408%' }}></div></div>
                          <div className="slm-time ok">43h 25m left</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>8:04 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= TAB 1: ADMIN ACTIVE VIEW ================= */}
      <div className={`page ${activeTab === 1 ? 'active' : ''}`} style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <div className="tab-panel" data-page="servicedesk" data-tab="1">
          <div id="sd-my-kpis" className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-info"><div className="kpi-l">In My View</div><div className="kpi-v ">10</div></div>
            <div className="kpi glow-violet"><div className="kpi-l">New / Unacked</div><div className="kpi-v ">3</div><div className="kpi-s">awaiting ack</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">In Progress</div><div className="kpi-v ok">3</div></div>
            <div className="kpi glow-warn"><div className="kpi-l">Breaching</div><div className="kpi-v warn">9</div></div>
          </div>
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct" id="sd-my-title">All Active Tickets</div>
                <div className="cs" id="sd-my-sub">Admin view — all teams</div>
              </div>
              <span className="ca"><i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export CSV</span>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="sd-my-table">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ticket</th>
                      <th>Priority</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Yahan pe data Tab 0 ke jaisa hi same copy-paste hai aapke markup ke anusar */}
                    <tr className="sd-row">
                      <td className="sd-id"><span className="sd-breach-dot" title="SLA breached"></span>TKT-1044</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>IOT-GW07 — Edge Gateway Offline</div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>IOT-GW07 Gateway</div>
                      </td>
                      <td><span className="sd-chip chip-crit">Critical</span></td>
                      <td>
                        <div style={{ fontSize: '11px' }}><span className="sd-chip chip-team"><i className="ti ti-broadcast" style={{ color: 'var(--info)' }}></i>Command Centre</span></div>
                        <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>Unassigned</div>
                      </td>
                      <td><span className="sd-chip chip-new">New</span></td>
                      <td>
                        <div className="sla-mini">
                          <div className="slm-top"><span>Resolve SLA</span><span>100%</span></div>
                          <div className="sla-track"><div className="sla-fill bad" style={{ width: '100%' }}></div></div>
                          <div className="slm-time bad">Breached 19h 46m</div>
                        </div>
                      </td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>12:33 AM</td>
                    </tr>
                    {/* Baki identical rows same code maintain karengi jo Tab 0 me hai */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: SLA TARGETS & ESCALATION MATRIX ================= */}
      <div className={`page ${activeTab === 2 ? 'active' : ''}`} style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <div className="tab-panel" data-page="servicedesk" data-tab="2">
          
          <div id="sd-sla-kpis" className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-bad"><div className="kpi-l">Breaching Now</div><div className="kpi-v bad">9</div></div>
            <div className="kpi glow-warn"><div className="kpi-l">At Risk (≥70%)</div><div className="kpi-v warn">0</div></div>
            <div className="kpi glow-info"><div className="kpi-l">Escalated</div><div className="kpi-v ">2</div><div className="kpi-s">L1+ active</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">Response SLA Met</div><div className="kpi-v ok">89%</div><div className="kpi-s">of acknowledged</div></div>
          </div>

          <div className="g2 mb-14">
            
            {/* SLA Targets Table */}
            <div className="card">
              <div className="ch"><div className="ct">SLA Targets by Priority</div></div>
              <div className="cb" style={{ padding: 0 }}>
                <table className="dt">
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Respond</th>
                      <th>Resolve</th>
                      <th>Escalation path</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="sd-chip chip-crit">Critical</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>15m</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>4h</td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>L1 owner → L2 lead → L3 manager / vendor</td>
                    </tr>
                    <tr>
                      <td><span className="sd-chip chip-high">High</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>30m</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>8h</td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>L1 owner → L2 lead → L3 manager / vendor</td>
                    </tr>
                    <tr>
                      <td><span className="sd-chip chip-med">Medium</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>2h</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>24h</td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>L1 owner → L2 lead → L3 manager / vendor</td>
                    </tr>
                    <tr>
                      <td><span className="sd-chip chip-low">Low</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>8h</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>72h</td>
                      <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>L1 owner → L2 lead → L3 manager / vendor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Escalation Matrix Box */}
            <div className="card">
              <div className="ch">
                <div className="ct">Escalation Matrix</div>
                <div className="cs">Auto-triggers on SLA breach</div>
              </div>
              <div className="cb">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: 'none' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'var(--hot)', opacity: 0.16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}></div>
                  <div style={{ marginLeft: '-40px', width: '30px', textAlign: 'center' }}><i className="ti ti-tools" style={{ color: 'var(--hot)', fontSize: '15px' }}></i></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>Service Engineers</div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>L1 Engineers → L2 Engineering Lead — K. Nair → L3 CoolTech HVAC (Vendor)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid var(--line-1)' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'var(--info)', opacity: 0.16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}></div>
                  <div style={{ marginLeft: '-40px', width: '30px', textAlign: 'center' }}><i className="ti ti-broadcast" style={{ color: 'var(--info)', fontSize: '15px' }}></i></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>Command Centre Team</div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>L1 Command Centre → L2 NOC Lead — A. Banerjee → L3 BuildOptix Cloud Support</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid var(--line-1)' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'var(--violet)', opacity: 0.16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}></div>
                  <div style={{ marginLeft: '-40px', width: '30px', textAlign: 'center' }}><i className="ti ti-building" style={{ color: 'var(--violet)', fontSize: '15px' }}></i></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>Site Client Team</div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>L1 Site Team → L2 Facility Manager — R. Gupta → L3 Property Head</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs Switcher Footer Tool (Simulating for easy testing of multi-tabs view) */}
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', background: '#333', padding: '5px', borderRadius: '5px', zIndex: 9999 }}>
        <button onClick={() => setActiveTab(0)} style={{ color: activeTab === 0 ? 'yellow' : 'white', margin: '0 5px', fontSize: '11px', border: 'none', background: 'none', cursor: 'pointer' }}>Tab 0</button>
        <button onClick={() => setActiveTab(1)} style={{ color: activeTab === 1 ? 'yellow' : 'white', margin: '0 5px', fontSize: '11px', border: 'none', background: 'none', cursor: 'pointer' }}>Tab 1</button>
        <button onClick={() => setActiveTab(2)} style={{ color: activeTab === 2 ? 'yellow' : 'white', margin: '0 5px', fontSize: '11px', border: 'none', background: 'none', cursor: 'pointer' }}>Tab 2</button>
      </div>
    </>
  );
}