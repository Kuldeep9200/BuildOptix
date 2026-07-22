import React, { useState } from 'react';

export default function SpaceUtilisation() {
  // एक्टिव टैब को मैनेज करने के लिए स्टेट
  const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // आपके ओरिजिनल onclick toast को हैंडल करने के लिए फंक्शन
  const toast = (message, status) => {
    alert(`${message} [Status: ${status}]`);
  };

  return (
    <div className="page" id="pg-space">

      <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
        <div className="ph-left">
          <div className="live-dot"></div>

          <div>
            <div className="ph-title" id="dash-page-title">Space Utilisation
            </div>

            <div
              id="dash-page-sub"
              style={{ fontSize: "10px", color: "var(--ink-3)" }}
            >
             Vikhroli · Floor-wise Occupancy

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
            Floor Plans
          </div>

          <div
            onClick={() => setActiveTab(2)}
            className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
          >
            Footfall
          </div>

          <div
            onClick={() => setActiveTab(3)}
            className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
          >
            Leasing
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


      {/* Tab 0: Overview */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="space" data-tab="0">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-ok">
              <div className="kpi-l">Portfolio Occupancy</div>
              <div className="kpi-v ok">90<span className="kpi-u">%</span></div>
              <div className="kpi-s">3.8L / 4.2L sqft occupied</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Today Footfall</div>
              <div className="kpi-v">1,840</div>
              <div className="kpi-s">↑ 6% WoW</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Available for Lease</div>
              <div className="kpi-v warn">22,800<span className="kpi-u">sqft</span></div>
              <div className="kpi-s">Floor 7 — Tower A</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Meeting Room Utilisation</div>
              <div className="kpi-v">68<span className="kpi-u">%</span></div>
              <div className="kpi-s">peak 10–11 AM</div>
            </div>
          </div>
          <div className="g2 mb-12">
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Floor-wise Occupancy</div>
                  <div className="cs">Vikhroli · All towers · Live</div>
                </div>
              </div>
              <div className="cb" style={{ padding: 0 }}>
                <table className="dt">
                  <thead>
                    <tr>
                      <th>Floor</th>
                      <th>Total sqft</th>
                      <th>Occupied</th>
                      <th>Available</th>
                      <th>Tenant</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>Basement B1</b></td>
                      <td>18,000</td>
                      <td>18,000</td>
                      <td>—</td>
                      <td>Parking / MEP</td>
                      <td><span className="badge badge-cyan">Services</span></td>
                    </tr>
                    <tr>
                      <td><b>Ground</b></td>
                      <td>24,000</td>
                      <td>20,000</td>
                      <td>4,000</td>
                      <td>Common + Retail</td>
                      <td><span className="badge badge-green">Active</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 1</b></td>
                      <td>38,000</td>
                      <td>38,000</td>
                      <td>—</td>
                      <td>Godrej Corporate</td>
                      <td><span className="badge" style={{ background: 'var(--info-soft)', color: 'var(--info)' }}>Owned</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 2</b></td>
                      <td>38,000</td>
                      <td>34,960</td>
                      <td>3,040</td>
                      <td>Mixed Tenants</td>
                      <td><span className="badge badge-green">92% Full</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 3</b></td>
                      <td>38,000</td>
                      <td>38,000</td>
                      <td>—</td>
                      <td>Single Tenant</td>
                      <td><span className="badge badge-green">100% Full</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 4</b></td>
                      <td>38,000</td>
                      <td>31,160</td>
                      <td>6,840</td>
                      <td>Mixed Tenants</td>
                      <td><span className="badge badge-amber">82% Full</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 5</b></td>
                      <td>38,000</td>
                      <td>38,000</td>
                      <td>—</td>
                      <td>Single Tenant</td>
                      <td><span className="badge badge-green">100% Full</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 6</b></td>
                      <td>38,000</td>
                      <td>38,000</td>
                      <td>—</td>
                      <td>Godrej Corporate</td>
                      <td><span className="badge" style={{ background: 'var(--info-soft)', color: 'var(--info)' }}>Owned</span></td>
                    </tr>
                    <tr>
                      <td><b>Floor 7</b></td>
                      <td>38,000</td>
                      <td>15,200</td>
                      <td style={{ color: 'var(--warn)', fontWeight: 600 }}>22,800</td>
                      <td>Partial / Available</td>
                      <td><span className="badge badge-amber">Leasing</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card">
              <div className="ch">
                <div className="ct">Space Utilisation Breakdown</div>
              </div>
              <div className="cb">
                <div className="epi-block mb-12" style={{ marginBottom: '14px' }}>
                  <div className="epi-ring">
                    <svg viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--line-2)" strokeWidth="8" />
                      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--ok)" strokeWidth="8" strokeDasharray="170 189" strokeDashoffset="47" strokeLinecap="round" transform="rotate(-90 40 40)" />
                    </svg>
                    <div className="epi-ring-val">
                      <div className="epi-ring-num" style={{ color: 'var(--ok)' }}>90%</div>
                      <div className="epi-ring-lbl">Occupied</div>
                    </div>
                  </div>
                  <div className="epi-info">
                    <div className="epi-title">Portfolio Occupancy</div>
                    <div className="epi-sub">
                      3.8L of 4.2L sqft in use<br />22,800 sqft available (Floor 7)
                    </div>
                  </div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Office Space</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '90%', background: 'var(--ok)' }}></div>
                  </div>
                  <div className="i-bar-val">90.5%</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Meeting Rooms</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '68%', background: 'var(--gold)' }}></div>
                  </div>
                  <div className="i-bar-val">68%</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Cafeteria (peak)</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '85%', background: 'var(--info)' }}></div>
                  </div>
                  <div className="i-bar-val">85%</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Parking</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '78%', background: 'var(--violet)' }}></div>
                  </div>
                  <div className="i-bar-val">78%</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Server Room</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '100%', background: 'var(--bad)' }}></div>
                  </div>
                  <div className="i-bar-val">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Floor Plans */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="space" data-tab="1">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi">
              <div className="kpi-l">Total Built-up Area</div>
              <div className="kpi-v">4.2L<span className="kpi-u">sqft</span></div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Office Space</div>
              <div className="kpi-v ok">3.60L<span className="kpi-u">sqft</span></div>
              <div className="kpi-s">85.7% of total</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Common Areas</div>
              <div className="kpi-v">0.42L<span className="kpi-u">sqft</span></div>
              <div className="kpi-s">10% of total</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Available for Lease</div>
              <div className="kpi-v warn">22,800<span className="kpi-u">sqft</span></div>
              <div className="kpi-s">Floor 7</div>
            </div>
          </div>
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Floor 7 — Available Space Layout</div>
                <div className="cs">Tower A · 22,800 sqft · Shell & Core</div>
              </div>
              <span className="ca" onClick={() => toast('Opening floor plan PDF...', 'ok')}>Download PDF →</span>
            </div>
            <div className="cb">
              <svg width="100%" viewBox="0 0 600 200" style={{ display: 'block', marginBottom: '12px' }}>
                <rect x="10" y="10" width="580" height="180" rx="6" fill="var(--surface-2)" stroke="var(--line-2)" strokeWidth="1" />
                <rect x="20" y="20" width="270" height="160" rx="4" fill="rgba(245,180,65,0.1)" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="6 3" />
                <text x="155" y="95" textAnchor="middle" fontSize="12" fill="var(--warn)" fontWeight="600">West Wing</text>
                <text x="155" y="112" textAnchor="middle" fontSize="10" fill="var(--ink-3)">~11,400 sqft · Available</text>
                <rect x="310" y="20" width="270" height="160" rx="4" fill="rgba(245,180,65,0.1)" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="6 3" />
                <text x="445" y="95" textAnchor="middle" fontSize="12" fill="var(--warn)" fontWeight="600">East Wing</text>
                <text x="445" y="112" textAnchor="middle" fontSize="10" fill="var(--ink-3)">~11,400 sqft · Available</text>
                <rect x="282" y="60" width="36" height="80" rx="3" fill="var(--surface-3)" stroke="var(--line-3)" strokeWidth="1" />
                <text x="300" y="103" textAnchor="middle" fontSize="8" fill="var(--ink-3)" transform="rotate(-90,300,103)">CORE</text>
                <rect x="285" y="25" width="14" height="18" rx="2" fill="var(--info-soft)" stroke="var(--info)" strokeWidth="0.5" />
                <rect x="301" y="25" width="14" height="18" rx="2" fill="var(--info-soft)" stroke="var(--info)" strokeWidth="0.5" />
                <text x="300" y="55" textAnchor="middle" fontSize="8" fill="var(--info)">Lifts</text>
              </svg>
              <div className="g3" style={{ gap: '8px' }}>
                <div className="m-row">
                  <div className="m-icon gold"><i className="ti ti-building" style={{ fontSize: '13px', color: 'var(--gold)' }}></i></div>
                  <span className="m-lbl">Floor Condition</span>
                  <span className="m-val">Shell &amp; Core</span>
                </div>
                <div className="m-row">
                  <div className="m-icon cyan"><i className="ti ti-wind" style={{ fontSize: '13px', color: 'var(--info)' }}></i></div>
                  <span className="m-lbl">HVAC Capacity</span>
                  <span className="m-val">300 TR available</span>
                </div>
                <div className="m-row">
                  <div className="m-icon green"><i className="ti ti-bolt" style={{ fontSize: '13px', color: 'var(--ok)' }}></i></div>
                  <span className="m-lbl">Power Provision</span>
                  <span className="m-val">160 kW LT supply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Footfall */}
      {activeTab === 2 && (
        <div className="tab-panel active" data-page="space" data-tab="2">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-gold" style={{ borderColor: 'rgba(245,166,35,0.28)' }}>
              <div className="kpi-l">Today Footfall</div>
              <div className="kpi-v" style={{ color: 'var(--gold)' }}>1,840</div>
              <div className="kpi-s">↑ 6% WoW</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Peak Hour</div>
              <div className="kpi-v">10–11 AM</div>
              <div className="kpi-s">busiest period</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Avg MTD Footfall</div>
              <div className="kpi-v ok">1,720</div>
              <div className="kpi-s">↑ vs 1,640 last month</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Weekend Avg</div>
              <div className="kpi-v">420</div>
              <div className="kpi-s">23% of weekday</div>
            </div>
          </div>
          <div className="g2">
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Hourly Footfall — Today</div>
                  <div className="cs">Entry gate count · 20 May</div>
                </div>
              </div>
              <div className="cb">
                <svg className="chart-svg" viewBox="0 0 480 120">
                  <line x1="0" y1="15" x2="480" y2="15" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="45" x2="480" y2="45" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="480" y2="75" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="105" x2="480" y2="105" stroke="var(--line-1)" strokeWidth="0.5" />
                  <text x="2" y="13" fontSize="8" fill="var(--ink-3)">400</text>
                  <text x="2" y="43" fontSize="8" fill="var(--ink-3)">280</text>
                  <text x="2" y="73" fontSize="8" fill="var(--ink-3)">160</text>
                  <text x="2" y="103" fontSize="8" fill="var(--ink-3)">40</text>
                  <rect x="18" y="100" width="22" height="5" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="52" y="80" width="22" height="25" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="86" y="30" width="22" height="75" rx="1" fill="var(--info)" opacity="0.8" />
                  <rect x="120" y="20" width="22" height="85" rx="1" fill="var(--gold)" opacity="0.9" />
                  <rect x="154" y="38" width="22" height="67" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="188" y="55" width="22" height="50" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="222" y="70" width="22" height="35" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="256" y="40" width="22" height="65" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="290" y="65" width="22" height="40" rx="1" fill="var(--info)" opacity="0.7" />
                  <rect x="324" y="80" width="22" height="25" rx="1" fill="var(--info)" opacity="0.7" />
                  <text x="29" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">07</text>
                  <text x="63" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">08</text>
                  <text x="97" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">09</text>
                  <text x="131" y="108" fontSize="7" fill="var(--gold)" textAnchor="middle">10 ★</text>
                  <text x="165" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">11</text>
                  <text x="199" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">12</text>
                  <text x="233" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">13</text>
                  <text x="267" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">14</text>
                  <text x="301" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">15</text>
                  <text x="335" y="108" fontSize="7" fill="var(--ink-3)" textAnchor="middle">16</text>
                </svg>
              </div>
            </div>
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Footfall by Floor — Peak Hour</div>
                  <div className="cs">10–11 AM today</div>
                </div>
              </div>
              <div className="cb">
                <div className="i-bar">
                  <div className="i-bar-lbl">Ground + Café</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '90%', background: 'var(--gold)' }}></div>
                  </div>
                  <div className="i-bar-val">360</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Floor 1</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '100%', background: 'var(--info)' }}></div>
                  </div>
                  <div className="i-bar-val">400</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Floor 3</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '88%', background: 'var(--info)' }}></div>
                  </div>
                  <div className="i-bar-val">350</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Floor 5</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '83%', background: 'var(--info)' }}></div>
                  </div>
                  <div className="i-bar-val">330</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Floor 6</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '75%', background: 'var(--cool)' }}></div>
                  </div>
                  <div className="i-bar-val">300</div>
                </div>
                <div className="i-bar">
                  <div className="i-bar-lbl">Floor 7</div>
                  <div className="i-bar-track">
                    <div className="i-bar-fill" style={{ width: '25%', background: 'var(--ink-3)' }}></div>
                  </div>
                  <div className="i-bar-val">100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Leasing */}
      {activeTab === 3 && (
        <div className="tab-panel active" data-page="space" data-tab="3">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-info">
              <div className="kpi-l">Available for Lease</div>
              <div className="kpi-v cool">22,800<span className="kpi-u">sqft</span></div>
              <div className="kpi-s">Floor 7 — Tower A</div>
            </div>
            <div className="kpi glow-warn" style={{ borderColor: 'rgba(245,166,35,0.28)' }}>
              <div className="kpi-l">Asking Rent</div>
              <div className="kpi-v" style={{ color: 'var(--gold)' }}>₹140<span className="kpi-u">/sqft/mo</span></div>
              <div className="kpi-s">Market: ₹135–150</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Active Prospects</div>
              <div className="kpi-v ok">4</div>
              <div className="kpi-s">2 in due diligence</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Potential Revenue</div>
              <div className="kpi-v ok">₹3.19Cr<span className="kpi-u">/yr</span></div>
              <div className="kpi-s">if fully leased</div>
            </div>
          </div>
          <div className="g21">
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Active Leasing Prospects</div>
                  <div className="cs">Pipeline tracker</div>
                </div>
                <span className="ca" onClick={() => toast('Opening CRM export...', 'ok')}>Export →</span>
              </div>
              <div className="cb" style={{ padding: 0 }}>
                <table className="dt">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Area Needed</th>
                      <th>Stage</th>
                      <th>Broker</th>
                      <th>Expected Close</th>
                      <th>Revenue/yr</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>Prospect A (IT Firm)</b></td>
                      <td>15,000 sqft</td>
                      <td><span className="badge badge-green">Due Diligence</span></td>
                      <td>JLL</td>
                      <td style={{ color: 'var(--ok)' }}>Jun 2026</td>
                      <td style={{ color: 'var(--ok)' }}>₹2.52Cr</td>
                    </tr>
                    <tr>
                      <td><b>Prospect B (BFSI)</b></td>
                      <td>22,800 sqft</td>
                      <td><span className="badge badge-amber">LOI Issued</span></td>
                      <td>Direct</td>
                      <td>Jul 2026</td>
                      <td>₹3.83Cr</td>
                    </tr>
                    <tr>
                      <td><b>Prospect C (Pharma)</b></td>
                      <td>11,400 sqft</td>
                      <td><span className="badge badge-cyan">Site Visit</span></td>
                      <td>CBRE</td>
                      <td>Aug 2026</td>
                      <td>₹1.92Cr</td>
                    </tr>
                    <tr>
                      <td><b>Prospect D (MNC)</b></td>
                      <td>8,000 sqft</td>
                      <td><span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}>Initial Contact</span></td>
                      <td>Cushman</td>
                      <td>Sep 2026</td>
                      <td>₹1.34Cr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card">
              <div className="ch">
                <div className="ct">Space Specs — Floor 7</div>
              </div>
              <div className="cb">
                <div className="m-row">
                  <div className="m-icon gold"><i className="ti ti-building" style={{ fontSize: '13px', color: 'var(--gold)' }}></i></div>
                  <span className="m-lbl">Total Available</span>
                  <span className="m-val" style={{ color: 'var(--warn)' }}>22,800 sqft</span>
                </div>
                <div className="m-row">
                  <div className="m-icon cyan"><i className="ti ti-wind" style={{ fontSize: '13px', color: 'var(--info)' }}></i></div>
                  <span className="m-lbl">HVAC Capacity</span>
                  <span className="m-val">300 TR</span>
                </div>
                <div className="m-row">
                  <div className="m-icon green"><i className="ti ti-bolt" style={{ fontSize: '13px', color: 'var(--ok)' }}></i></div>
                  <span className="m-lbl">Power Provision</span>
                  <span className="m-val">160 kW LT</span>
                </div>
                <div className="m-row">
                  <div className="m-icon purple"><i className="ti ti-car" style={{ fontSize: '13px', color: 'var(--violet)' }}></i></div>
                  <span className="m-lbl">Parking Slots</span>
                  <span className="m-val">38 slots (2-level)</span>
                </div>
                <div className="m-row">
                  <div className="m-icon amber"><i className="ti ti-clock" style={{ fontSize: '13px', color: 'var(--warn)' }}></i></div>
                  <span className="m-lbl">Min Lock-in</span>
                  <span className="m-val">3 years</span>
                </div>
                <div className="m-row">
                  <div className="m-icon cyan"><i className="ti ti-currency-rupee" style={{ fontSize: '13px', color: 'var(--info)' }}></i></div>
                  <span className="m-lbl">Monthly Potential</span>
                  <span className="m-val" style={{ color: 'var(--ok)' }}>₹31.9L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}