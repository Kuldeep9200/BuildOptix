import React, { useState } from 'react';

export default function SlaDashboard() {
  // Tab control management (0: Overview, 1: Breach Log, 2: Trends, 3: Benchmarks)
  const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  return (
    <div className="page active" id="pg-sla">
      
 <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            SLA Tracker
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                           Overview · Breach Log · Trends
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
                        Breach Log
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                        Trends
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                        Benchmarks
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
      <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="sla" data-tab="0" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok clickable" title="View SLA trends" onClick={() => setActiveTab(2)}>
            <div className="kpi-l">SLA Compliance (May)</div>
            <div className="kpi-v ok">96.8<span className="kpi-u">%</span></div>
            <div className="kpi-s">target 95% ✓</div>
          </div>
          <div className="kpi glow-bad clickable" title="View breach log" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Breaches (May)</div>
            <div className="kpi-v bad">3</div>
            <div className="kpi-s">2 HVAC · 1 FM</div>
          </div>
          <div className="kpi glow-warn clickable" title="View near-breach tickets">
            <div className="kpi-l">Near-breach Today</div>
            <div className="kpi-v warn">2</div>
            <div className="kpi-s">tickets at risk</div>
          </div>
          <div className="kpi glow-info clickable" title="View SLA benchmarks" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Avg Close Time</div>
            <div className="kpi-v">1.4<span className="kpi-u">hrs</span></div>
            <div className="kpi-s">target 2 hrs ✓</div>
          </div>
        </div>

        <div className="g21 mb-12">
          {/* SLA Compliance Trend Chart */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">SLA Compliance Trend</div>
                <div className="cs">Monthly · Jan–May 2026</div>
              </div>
            </div>
            <div className="cb">
              <svg className="chart-svg" viewBox="0 0 480 110">
                <line x1="0" y1="10" x2="480" y2="10" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <line x1="0" y1="35" x2="480" y2="35" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <line x1="0" y1="60" x2="480" y2="60" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <line x1="0" y1="85" x2="480" y2="85" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <text x="2" y="9" fontSize="8" fill="var(--ink-3)">100%</text>
                <text x="2" y="34" fontSize="8" fill="var(--ink-3)">98%</text>
                <text x="2" y="59" fontSize="8" fill="var(--ink-3)">96%</text>
                <text x="2" y="84" fontSize="8" fill="var(--ink-3)">94%</text>
                
                {/* 95% target line */}
                <line x1="0" y1="47" x2="480" y2="47" stroke="var(--warn)" strokeWidth="1" strokeDasharray="5 3"></line>
                <text x="450" y="44" fontSize="8" fill="var(--warn)">Target 95%</text>
                
                {/* bars */}
                <rect x="40" y="38" width="50" height="47" rx="3" fill="var(--ok)" opacity="0.7"></rect>
                <rect x="120" y="22" width="50" height="63" rx="3" fill="var(--ok)" opacity="0.7"></rect>
                <rect x="200" y="30" width="50" height="55" rx="3" fill="var(--ok)" opacity="0.7"></rect>
                <rect x="280" y="55" width="50" height="30" rx="3" fill="var(--warn)" opacity="0.8"></rect>
                <rect x="360" y="28" width="50" height="57" rx="3" fill="var(--ok)" opacity="0.9"></rect>
                
                <text x="65" y="100" fontSize="8" fill="var(--ink-3)" textAnchor="middle">Jan 97.2%</text>
                <text x="145" y="100" fontSize="8" fill="var(--ink-3)" textAnchor="middle">Feb 98.4%</text>
                <text x="225" y="100" fontSize="8" fill="var(--ink-3)" textAnchor="middle">Mar 97.8%</text>
                <text x="305" y="100" fontSize="8" fill="var(--warn)" textAnchor="middle">Apr 94.1%</text>
                <text x="385" y="100" fontSize="8" fill="var(--ok)" textAnchor="middle">May 96.8%</text>
              </svg>
            </div>
          </div>

          {/* Compliance by Category */}
          <div className="card">
            <div className="ch"><div><div class="ct">Compliance by Category</div></div></div>
            <div className="cb">
              <div className="i-bar"><div className="i-bar-lbl">Critical (P1)</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '94%', background: 'var(--warn)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--warn)' }}>94%</div></div>
              <div className="i-bar"><div className="i-bar-lbl">High (P2)</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '97%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>97%</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Medium (P3)</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '98%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>98%</div></div>
              <div className="i-bar"><div className="i-bar-lbl">Low (P4)</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '99%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>99%</div></div>
              <div className="i-bar"><div className="i-bar-lbl">HVAC Tickets</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '91%', background: 'var(--warn)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--warn)' }}>91%</div></div>
              <div className="i-bar"><div className="i-bar-lbl">FM / Housekeeping</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '96%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">96%</div></div>
            </div>
          </div>
        </div>

        {/* Near Breach Tickets */}
        <div className="card">
          <div className="ch">
            <div>
              <div className="ct">Near-Breach Tickets — Action Required</div>
              <div className="cs">Tickets at risk of SLA breach today</div>
            </div>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Ticket #</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>SLA Target</th>
                  <th>Time Open</th>
                  <th>Remaining</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1041</td>
                  <td>Water leakage — Main Lobby</td>
                  <td><span className="badge badge-red">Critical P1</span></td>
                  <td>4 hrs</td>
                  <td style={{ color: 'var(--bad)' }}>5 hrs 12 min</td>
                  <td style={{ color: 'var(--bad)' }}>BREACHED</td>
                  <td>FM Team — pending contractor</td>
                </tr>
                <tr>
                  <td>#1042</td>
                  <td>AC not cooling — Room 704</td>
                  <td><span className="badge badge-amber">High P2</span></td>
                  <td>8 hrs</td>
                  <td style={{ color: 'var(--warn)' }}>3 hrs 20 min</td>
                  <td style={{ color: 'var(--warn)' }}>4 hrs 40 min</td>
                  <td>HVAC Team A — in progress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: BREACH LOG ================= */}
      <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="sla" data-tab="1" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad"><div className="kpi-l">Total Breaches (May)</div><div className="kpi-v bad">3</div></div>
          <div className="kpi glow-warn"><div className="kpi-l">Penalty Applicable</div><div className="kpi-v warn">1</div><div className="kpi-s">contractual clause</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Root Cause Closed</div><div className="kpi-v ok">2</div></div>
          <div className="kpi glow-info"><div className="kpi-l">Avg Overrun</div><div className="kpi-v">1.2<span className="kpi-u">hrs</span></div></div>
        </div>
        <div className="card">
          <div className="ch"><div><div className="ct">SLA Breach Log — May 2026</div></div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Ticket #</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>SLA</th>
                  <th>Actual Close</th>
                  <th>Overrun</th>
                  <th>Root Cause</th>
                  <th>Resolution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1041</td>
                  <td>Water leakage — Lobby</td>
                  <td><span className="badge badge-red">P1</span></td>
                  <td>4 hrs</td>
                  <td style={{ color: 'var(--bad)' }}>5 hrs 12 min</td>
                  <td style={{ color: 'var(--bad)' }}>+72 min</td>
                  <td>Contractor unavailable</td>
                  <td><span className="badge badge-amber">Pending</span></td>
                </tr>
                <tr>
                  <td>#1029</td>
                  <td>HVAC total failure — Floor 4</td>
                  <td><span className="badge badge-red">P1</span></td>
                  <td>4 hrs</td>
                  <td>5 hrs 48 min</td>
                  <td style={{ color: 'var(--bad)' }}>+108 min</td>
                  <td>Part unavailable</td>
                  <td><span className="badge badge-green">Closed</span></td>
                </tr>
                <tr>
                  <td>#1017</td>
                  <td>Lift stuck — Tower B</td>
                  <td><span className="badge badge-amber">P2</span></td>
                  <td>8 hrs</td>
                  <td>9 hrs 20 min</td>
                  <td style={{ color: 'var(--warn)' }}>+80 min</td>
                  <td>Technician delay</td>
                  <td><span className="badge badge-green">Closed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: TRENDS ================= */}
      <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="sla" data-tab="2" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <div className="g2">
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Response Time Trend</div>
                <div className="cs">Average by priority · Jan–May 2026</div>
              </div>
            </div>
            <div className="cb">
              <div className="i-bar" style={{ marginBottom: '12px' }}><div className="i-bar-lbl">P1 Avg Response</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '70%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">42 min</div></div>
              <div className="i-bar" style={{ marginBottom: '12px' }}><div className="i-bar-lbl">P2 Avg Response</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '55%', background: 'var(--info)' }}></div></div><div className="i-bar-val">1.8 hrs</div></div>
              <div className="i-bar" style={{ marginBottom: '12px' }}><div className="i-bar-lbl">P3 Avg Response</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '40%', background: 'var(--info)' }}></div></div><div className="i-bar-val">3.2 hrs</div></div>
              <div className="i-bar"><div className="i-bar-lbl">P4 Avg Response</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '60%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">6.1 hrs</div></div>
            </div>
          </div>

          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Breaches by Category</div>
                <div className="cs">Jan–May 2026</div>
              </div>
            </div>
            <div className="cb">
              <div className="dnt-wrap">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="32" fill="none" stroke="var(--line-2)" strokeWidth="10"></circle>
                  <circle cx="45" cy="45" r="32" fill="none" stroke="var(--bad)" strokeWidth="10" strokeDasharray="60 141" strokeDashoffset="0" transform="rotate(-90 45 45)"></circle>
                  <circle cx="45" cy="45" r="32" fill="none" stroke="var(--warn)" strokeWidth="10" strokeDasharray="44 157" strokeDashoffset="-60" transform="rotate(-90 45 45)"></circle>
                  <circle cx="45" cy="45" r="32" fill="none" stroke="var(--info)" strokeWidth="10" strokeDasharray="37 164" strokeDashoffset="-104" transform="rotate(-90 45 45)"></circle>
                  <text x="45" y="41" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-0)">14</text>
                  <text x="45" y="53" textAnchor="middle" fontSize="8" fill="var(--ink-3)">Total</text>
                </svg>
                <div className="dnt-leg">
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--bad)' }}></div><span className="dnt-lbl">HVAC</span><span className="dnt-pct">6</span></div>
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--warn)' }}></div><span className="dnt-lbl">FM / Housekeeping</span><span className="dnt-pct">4</span></div>
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--info)' }}></div><span className="dnt-lbl">Electrical</span><span className="dnt-pct">3</span></div>
                  <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--ok)' }}></div><span className="dnt-lbl">Others</span><span className="dnt-pct">1</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 3: BENCHMARKS ================= */}
      <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="sla" data-tab="3" style={{ display: activeTab === 3 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok"><div className="kpi-l">Our Compliance</div><div className="kpi-v ok">96.8<span className="kpi-u">%</span></div></div>
          <div className="kpi glow-info"><div className="kpi-l">Industry Average</div><div className="kpi-v">94.2<span className="kpi-u">%</span></div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Top Quartile</div><div className="kpi-v">98.1<span className="kpi-u">%</span></div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Our Rank</div><div className="kpi-v ok">2nd<span className="kpi-u"> Quartile</span></div></div>
        </div>
        <div className="card">
          <div className="ch"><div><div className="ct">SLA Benchmarks — Commercial Real Estate India 2026</div></div></div>
          <div className="cb">
            <div className="i-bar" style={{ marginBottom: '10px' }}><div className="i-bar-lbl">Top Quartile</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '98.1%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>98.1%</div></div>
            <div className="i-bar" style={{ marginBottom: '10px' }}><div className="i-bar-lbl">BuildOptix (Us)</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '96.8%', background: 'var(--info)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--info)' }}>96.8%</div></div>
            <div className="i-bar" style={{ marginBottom: '10px' }}><div className="i-bar-lbl">Industry Avg</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '94.2%', background: 'var(--warn)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--warn)' }}>94.2%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">Bottom Quartile</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '88%', background: 'var(--bad)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--bad)' }}>88.0%</div></div>
          </div>
        </div>
      </div>

    </div>
  );
}