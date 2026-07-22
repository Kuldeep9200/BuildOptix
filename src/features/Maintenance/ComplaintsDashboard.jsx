import React, { useState } from 'react';

export default function ComplaintsDashboard() {
  // Tab control ke liye state (0: Open, 1: Closed, 2: SLA Breach, 3: Analytics)
  const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // JavaScript triggers ke liye mock toast helper
  const handleAction = (message) => {
    console.log(message);
    // Agar aapke main framework me global toast() window par available hai toh ye chalega:
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(message, 'info');
    } else {
      alert(message);
    }
  };

  return (
    <div className="page active" id="pg-complaints">
      

<div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            Complaints & FM
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Live Queue · SLA Tracking
                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                        Live Queue
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                       Closed
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                        SLA Breach
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                        Analytics
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



      {/* ================= TAB 0: LIVE COMPLAINT QUEUE ================= */}
      <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="complaints" data-tab="0" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad clickable" title="View live ticket queue" onClick={() => setActiveTab(0)}>
            <div className="kpi-l">Open Tickets</div>
            <div className="kpi-v bad">47</div>
            <div className="kpi-s">3 critical SLA breach</div>
          </div>
          <div className="kpi glow-ok clickable" title="View closed tickets" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Resolved Today</div>
            <div className="kpi-v ok">9</div>
            <div className="kpi-s">avg close 1.4 hrs</div>
          </div>
          <div className="kpi glow-warn clickable" title="View SLA breach tickets" onClick={() => setActiveTab(2)}>
            <div className="kpi-l">SLA Compliance</div>
            <div className="kpi-v warn">94.2<span className="kpi-u">%</span></div>
            <div className="kpi-s">target 95%</div>
          </div>
          <div className="kpi glow-info clickable" title="View analytics" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Avg Response Time</div>
            <div className="kpi-v">18<span className="kpi-u">min</span></div>
            <div className="kpi-s">SLA target 30 min</div>
          </div>
        </div>
        
        <div className="card">
          <div className="ch">
            <div><div className="ct">Live Complaint Queue</div></div>
            <span className="ca" onClick={() => handleAction('Creating new ticket...')}>+ New Ticket</span>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Floor</th>
                  <th>Raised By</th>
                  <th>Priority</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1042</td>
                  <td>AC not cooling — Room 704</td>
                  <td>Floor 7</td>
                  <td>Tenant A</td>
                  <td><span className="badge badge-red">High</span></td>
                  <td style={{ color: 'var(--bad)' }}>3h 20m</td>
                  <td><span className="badge badge-amber">In Progress</span></td>
                  <td><button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleAction('Opening ticket #1042...')}>View</button></td>
                </tr>
                <tr>
                  <td>#1041</td>
                  <td>Water leakage — Lobby</td>
                  <td>Ground</td>
                  <td>Security</td>
                  <td><span className="badge badge-red">Critical</span></td>
                  <td style={{ color: 'var(--bad)' }}>5h</td>
                  <td><span className="badge badge-red">Open</span></td>
                  <td><button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleAction('Escalating #1041...')}>Escalate</button></td>
                </tr>
                <tr>
                  <td>#1040</td>
                  <td>Lift-04 stuck alarm</td>
                  <td>All</td>
                  <td>FM Team</td>
                  <td><span className="badge badge-red">Critical</span></td>
                  <td>2h</td>
                  <td><span className="badge badge-cyan">Escalated</span></td>
                  <td><button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }}>Equipment</button></td>
                </tr>
                <tr>
                  <td>#1038</td>
                  <td>Parking gate malfunction</td>
                  <td>Basement</td>
                  <td>Guard</td>
                  <td><span className="badge badge-amber">Medium</span></td>
                  <td>1h</td>
                  <td><span className="badge badge-amber">In Progress</span></td>
                  <td><button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleAction('Opening ticket...')}>View</button></td>
                </tr>
                <tr>
                  <td>#1036</td>
                  <td>Lights flickering — L3 pantry</td>
                  <td>Floor 3</td>
                  <td>HR Team</td>
                  <td><span className="badge badge-cyan">Low</span></td>
                  <td>4h</td>
                  <td><span className="badge badge-cyan">Assigned</span></td>
                  <td><button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleAction('Opening ticket...')}>View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: CLOSED TICKETS ================= */}
      <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="complaints" data-tab="1" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok" onClick={() => setActiveTab(1)} style={{ cursor: 'pointer' }}><div className="kpi-l">Closed Today</div><div className="kpi-v ok">9</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Closed This Week</div><div className="kpi-v ok">42</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Avg Satisfaction</div><div className="kpi-v ok">4.2<span className="kpi-u">/5</span></div></div>
          <div className="kpi glow-info"><div className="kpi-l">MTD Closed</div><div className="kpi-v">248</div></div>
        </div>
        <div className="card">
          <div className="ch"><div className="ct">Recently Closed Tickets</div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Raised</th>
                  <th>Closed</th>
                  <th>Duration</th>
                  <th>Closed By</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1035</td>
                  <td>AC filter choked — Floor 5</td>
                  <td>Yesterday 09:00</td>
                  <td>Yesterday 11:30</td>
                  <td style={{ color: 'var(--ok)' }}>2h 30m</td>
                  <td>HVAC Team A</td>
                  <td style={{ color: 'var(--ok)' }}>⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td>#1034</td>
                  <td>Tap leaking — 3rd floor restroom</td>
                  <td>Yesterday 08:00</td>
                  <td>Yesterday 10:15</td>
                  <td style={{ color: 'var(--ok)' }}>2h 15m</td>
                  <td>Plumbing Team</td>
                  <td style={{ color: 'var(--ok)' }}>⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td>#1033</td>
                  <td>Broken chair — Conference Room A</td>
                  <td>18 May 14:00</td>
                  <td>18 May 16:00</td>
                  <td style={{ color: 'var(--ok)' }}>2h</td>
                  <td>FM Team</td>
                  <td style={{ color: 'var(--ok)' }}>⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td>#1032</td>
                  <td>Visitor access card — expired</td>
                  <td>18 May 11:00</td>
                  <td>18 May 11:45</td>
                  <td style={{ color: 'var(--ok)' }}>45m</td>
                  <td>Security</td>
                  <td style={{ color: 'var(--ok)' }}>⭐⭐⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: SLA BREACH ================= */}
      <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="complaints" data-tab="2" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad"><div className="kpi-l">Breaches (May)</div><div className="kpi-v bad">3</div></div>
          <div className="kpi glow-warn"><div className="kpi-l">Near-Breach Now</div><div className="kpi-v warn">2</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Compliance</div><div className="kpi-v warn">94.2<span className="kpi-u">%</span></div><div className="kpi-s">target 95%</div></div>
          <div className="kpi glow-info"><div className="kpi-l">P1 SLA Limit</div><div className="kpi-v">4<span class="kpi-u">hrs</span></div></div>
        </div>
        <div className="card">
          <div className="ch"><div><div className="ct">At-Risk Tickets — SLA Breach Imminent</div></div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>SLA Limit</th>
                  <th>Open Since</th>
                  <th>Time Remaining</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1041</td>
                  <td>Water leakage — Lobby</td>
                  <td><span className="badge badge-red">P1 Critical</span></td>
                  <td>4 hrs</td>
                  <td style={{ color: 'var(--bad)' }}>5h ago</td>
                  <td style={{ color: 'var(--bad)', fontWeight: 600 }}>BREACHED</td>
                  <td><button className="btn" style={{ padding: '3px 8px', fontSize: '10px' }} onClick={() => handleAction('Escalating with penalty flag...')}>Escalate</button></td>
                </tr>
                <tr>
                  <td>#1042</td>
                  <td>AC not cooling — Room 704</td>
                  <td><span className="badge badge-amber">P2 High</span></td>
                  <td>8 hrs</td>
                  <td style={{ color: 'var(--warn)' }}>3h 20m ago</td>
                  <td style={{ color: 'var(--warn)' }}>4h 40m left</td>
                  <td><button className="btn" style={{ padding: '3px 8px', fontSize: '10px' }} onClick={() => handleAction('Sending reminder to assignee...')}>Remind</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 3: ANALYTICS ================= */}
      <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="complaints" data-tab="3" style={{ display: activeTab === 3 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-info"><div className="kpi-l">MTD Tickets</div><div className="kpi-v">304</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">vs Last Month</div><div className="kpi-v ok">↓ 12%</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">CSAT Score</div><div className="kpi-v ok">4.2<span className="kpi-u">/5</span></div></div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Top Category</div>
            <div className="kpi-v" style={{ fontSize: '14px' }}>HVAC</div>
            <div className="kpi-s">38% of all tickets</div>
          </div>
        </div>
        <div className="g2">
          <div className="card">
            <div className="ch"><div><div className="ct">Tickets by Category — May MTD</div></div></div>
            <div className="cb">
              <div className="i-bar"><div className="i-bar-lbl">HVAC / Cooling</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '100%', background: 'var(--info)' }}></div></div><div className="i-bar-val">116 (38%)</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Electrical</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '62%', background: 'var(--warn)' }}></div></div><div className="i-bar-val">74 (24%)</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Plumbing</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '42%', background: 'var(--cool)' }}></div></div><div className="i-bar-val">52 (17%)</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Civil / General</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '28%', background: 'var(--violet)' }}></div></div><div className="i-bar-val">34 (11%)</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Security</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '20%', background: 'var(--bad)' }}></div></div><div className="i-bar-val">28 (10%)</div></div>
            </div>
          </div>
          <div className="card">
            <div className="ch"><div><div className="ct">Resolution Time Distribution</div></div></div>
            <div className="cb">
              <div className="i-bar"><div className="i-bar-lbl">&lt; 1 hour</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '35%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">107</div></div>
              <div className="i-bar"><div className="i-bar-lbl">1–4 hours</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '55%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">167</div></div>
              <div className="i-bar"><div className="i-bar-lbl">4–8 hours</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '12%', background: 'var(--warn)' }}></div></div><div className="i-bar-val">37</div></div>
              <div className="i-bar"><div className="i-bar-lbl">&gt; 8 hours</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '5%', background: 'var(--bad)' }}></div></div><div className="i-bar-val">15</div></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}