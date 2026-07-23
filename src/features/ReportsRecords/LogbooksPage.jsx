import React, { useState } from 'react';

const LogbooksPage = ({
  activeTab = 0,
  navTo = () => {},
  openLogbook = () => {},
  downloadLogbook = () => {},
  renderLogEntries = () => {},
  openLogEntry = () => {},
  quickSignOff = () => {},
  LB_ACTIVE = 'dg'
}) => {
  const [ActiveTab, setActiveTab] = useState(0);
  const [activeLogChip, setActiveLogChip] = useState('dg');
  const [quickRemarks, setQuickRemarks] = useState({});
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const handleRemarkChange = (id, value) => {
    setQuickRemarks((prev) => ({ ...prev, [id]: value }));
  };

  const handleQuickSignOff = (logType, id) => {
    const remark = quickRemarks[id] || '';
    quickSignOff(logType, id, remark);
  };

  return (
    <div className="page active" id="pg-logbooks">

 <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                           Logbooks
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Digital Logbooks · Readings · Sign-off · Audit Trail
                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${ActiveTab === 0 ? "active" : ""}`}
                    >
                        All Logbooks
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${ActiveTab === 1 ? "active" : ""}`}
                    >
                        Entries & History
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                       Sign-off Queue
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                        Audit Trail
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



      {/* Tab 0: All Logbooks */}
      {ActiveTab === 0 && (
        <div className="tab-panel active" data-page="logbooks" data-tab="0">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="kpi glow-info">
              <div className="kpi-l">Active Logbooks</div>
              <div className="kpi-v">6</div>
              <div className="kpi-s">digital · all sites</div>
            </div>
            <div
              className="kpi glow-ok clickable"
              title="View entries"
              onClick={() => navTo('logbooks', 1)}
            >
              <div className="kpi-l">Entries Today</div>
              <div className="kpi-v ok">214</div>
              <div className="kpi-s">across all logbooks</div>
            </div>
            <div
              className="kpi glow-warn clickable"
              title="Go to sign-off queue"
              onClick={() => navTo('logbooks', 2)}
            >
              <div className="kpi-l">Pending Sign-off</div>
              <div className="kpi-v warn">7</div>
              <div className="kpi-s">CE / Property Head</div>
            </div>
            <div
              className="kpi glow-info clickable"
              title="View audit trail"
              onClick={() => navTo('logbooks', 3)}
            >
              <div className="kpi-l">Audit Events (30d)</div>
              <div className="kpi-v">1,482</div>
              <div className="kpi-s">immutable log</div>
            </div>
          </div>

          <div className="lb-grid">
            {/* DG Set Card */}
            <div className="lb-card" onClick={() => openLogbook('dg')}>
              <div className="lb-card-top">
                <div className="lb-ic" style={{ background: 'var(--info-soft)', color: 'var(--info)' }}>
                  <i className="ti ti-engine"></i>
                </div>
                <div>
                  <div className="lb-card-name">DG Set Log</div>
                  <div className="lb-card-freq">Hourly · per genset</div>
                </div>
              </div>
              <div className="lb-card-stats">
                <div><div className="lb-stat-k">Last Entry</div><div className="lb-stat-v">Today 14:00</div></div>
                <div><div className="lb-stat-k">Recorded By</div><div className="lb-stat-v">R. Sharma</div></div>
                <div><div className="lb-stat-k">Entries (May)</div><div className="lb-stat-v">186</div></div>
                <div><div className="lb-stat-k">Sign-off</div><div className="lb-stat-v warn">2 pending</div></div>
              </div>
              <div className="lb-card-actions">
                <button
                  className="btn primary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '11px' }}
                  onClick={(e) => { e.stopPropagation(); openLogbook('dg'); }}
                >
                  <i className="ti ti-list-details"></i>View Entries
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 11px', fontSize: '11px' }}
                  title="Download logbook"
                  onClick={(e) => { e.stopPropagation(); downloadLogbook('dg'); }}
                >
                  <i className="ti ti-download"></i>
                </button>
              </div>
            </div>

            {/* Energy Log Card */}
            <div className="lb-card" onClick={() => openLogbook('energy')}>
              <div className="lb-card-top">
                <div className="lb-ic" style={{ background: 'rgba(255,214,107,0.13)', color: 'var(--solar)' }}>
                  <i className="ti ti-gauge"></i>
                </div>
                <div>
                  <div className="lb-card-name">Energy / Meter Readings Log</div>
                  <div className="lb-card-freq">Daily 06:00 · all meters</div>
                </div>
              </div>
              <div className="lb-card-stats">
                <div><div className="lb-stat-k">Last Entry</div><div className="lb-stat-v">Today 06:00</div></div>
                <div><div className="lb-stat-k">Recorded By</div><div className="lb-stat-v">A. Khan</div></div>
                <div><div className="lb-stat-k">Entries (May)</div><div className="lb-stat-v">31</div></div>
                <div><div className="lb-stat-k">Sign-off</div><div className="lb-stat-v ok">Up to date</div></div>
              </div>
              <div className="lb-card-actions">
                <button
                  className="btn primary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '11px' }}
                  onClick={(e) => { e.stopPropagation(); openLogbook('energy'); }}
                >
                  <i className="ti ti-list-details"></i>View Entries
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 11px', fontSize: '11px' }}
                  title="Download logbook"
                  onClick={(e) => { e.stopPropagation(); downloadLogbook('energy'); }}
                >
                  <i className="ti ti-download"></i>
                </button>
              </div>
            </div>

            {/* HVAC Log Card */}
            <div className="lb-card" onClick={() => openLogbook('hvac')}>
              <div className="lb-card-top">
                <div className="lb-ic" style={{ background: 'var(--info-soft)', color: 'var(--info)' }}>
                  <i className="ti ti-snowflake"></i>
                </div>
                <div>
                  <div className="lb-card-name">HVAC &amp; Chiller Plant Log</div>
                  <div className="lb-card-freq">2-hourly · plant room</div>
                </div>
              </div>
              <div className="lb-card-stats">
                <div><div className="lb-stat-k">Last Entry</div><div className="lb-stat-v">Today 14:00</div></div>
                <div><div className="lb-stat-k">Recorded By</div><div className="lb-stat-v">S. Patil</div></div>
                <div><div className="lb-stat-k">Entries (May)</div><div className="lb-stat-v">124</div></div>
                <div><div className="lb-stat-k">Sign-off</div><div className="lb-stat-v warn">3 pending</div></div>
              </div>
              <div className="lb-card-actions">
                <button
                  className="btn primary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '11px' }}
                  onClick={(e) => { e.stopPropagation(); openLogbook('hvac'); }}
                >
                  <i className="ti ti-list-details"></i>View Entries
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 11px', fontSize: '11px' }}
                  title="Download logbook"
                  onClick={(e) => { e.stopPropagation(); downloadLogbook('hvac'); }}
                >
                  <i className="ti ti-download"></i>
                </button>
              </div>
            </div>

            {/* Water / STP Log Card */}
            <div className="lb-card" onClick={() => openLogbook('water')}>
              <div className="lb-card-top">
                <div className="lb-ic" style={{ background: 'rgba(52,210,230,0.13)', color: 'var(--cool, #34D2E6)' }}>
                  <i className="ti ti-droplet"></i>
                </div>
                <div>
                  <div className="lb-card-name">Water Treatment / STP / WTP Log</div>
                  <div className="lb-card-freq">Shift-wise · 3× daily</div>
                </div>
              </div>
              <div className="lb-card-stats">
                <div><div className="lb-stat-k">Last Entry</div><div className="lb-stat-v">Today 13:30</div></div>
                <div><div className="lb-stat-k">Recorded By</div><div className="lb-stat-v">M. Rao</div></div>
                <div><div className="lb-stat-k">Entries (May)</div><div className="lb-stat-v">93</div></div>
                <div><div className="lb-stat-k">Sign-off</div><div className="lb-stat-v ok">Up to date</div></div>
              </div>
              <div className="lb-card-actions">
                <button
                  className="btn primary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '11px' }}
                  onClick={(e) => { e.stopPropagation(); openLogbook('water'); }}
                >
                  <i className="ti ti-list-details"></i>View Entries
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 11px', fontSize: '11px' }}
                  title="Download logbook"
                  onClick={(e) => { e.stopPropagation(); downloadLogbook('water'); }}
                >
                  <i className="ti ti-download"></i>
                </button>
              </div>
            </div>

            {/* Fire Log Card */}
            <div className="lb-card" onClick={() => openLogbook('fire')}>
              <div className="lb-card-top">
                <div className="lb-ic" style={{ background: 'var(--bad-soft, rgba(255,90,90,0.13))', color: 'var(--bad)' }}>
                  <i className="ti ti-fire-extinguisher"></i>
                </div>
                <div>
                  <div className="lb-card-name">Fire Pump &amp; Life-Safety Log</div>
                  <div className="lb-card-freq">Daily + weekly test</div>
                </div>
              </div>
              <div className="lb-card-stats">
                <div><div className="lb-stat-k">Last Entry</div><div className="lb-stat-v">Today 08:00</div></div>
                <div><div className="lb-stat-k">Recorded By</div><div className="lb-stat-v">D. Verma</div></div>
                <div><div className="lb-stat-k">Entries (May)</div><div className="lb-stat-v">38</div></div>
                <div><div className="lb-stat-k">Sign-off</div><div className="lb-stat-v warn">2 pending</div></div>
              </div>
              <div className="lb-card-actions">
                <button
                  className="btn primary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '11px' }}
                  onClick={(e) => { e.stopPropagation(); openLogbook('fire'); }}
                >
                  <i className="ti ti-list-details"></i>View Entries
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 11px', fontSize: '11px' }}
                  title="Download logbook"
                  onClick={(e) => { e.stopPropagation(); downloadLogbook('fire'); }}
                >
                  <i className="ti ti-download"></i>
                </button>
              </div>
            </div>

            {/* Lift Log Card */}
            <div className="lb-card" onClick={() => openLogbook('lift')}>
              <div className="lb-card-top">
                <div className="lb-ic" style={{ background: 'var(--violet-soft)', color: 'var(--violet)' }}>
                  <i className="ti ti-elevator"></i>
                </div>
                <div>
                  <div className="lb-card-name">Lift / Elevator Log</div>
                  <div className="lb-card-freq">Daily · per car</div>
                </div>
              </div>
              <div className="lb-card-stats">
                <div><div className="lb-stat-k">Last Entry</div><div className="lb-stat-v">Today 09:15</div></div>
                <div><div className="lb-stat-k">Recorded By</div><div className="lb-stat-v">LiftPro AMC</div></div>
                <div><div className="lb-stat-k">Entries (May)</div><div className="lb-stat-v">62</div></div>
                <div><div className="lb-stat-k">Sign-off</div><div className="lb-stat-v ok">Up to date</div></div>
              </div>
              <div className="lb-card-actions">
                <button
                  className="btn primary"
                  style={{ flex: 1, padding: '6px 0', fontSize: '11px' }}
                  onClick={(e) => { e.stopPropagation(); openLogbook('lift'); }}
                >
                  <i className="ti ti-list-details"></i>View Entries
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 11px', fontSize: '11px' }}
                  title="Download logbook"
                  onClick={(e) => { e.stopPropagation(); downloadLogbook('lift'); }}
                >
                  <i className="ti ti-download"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Entries & History */}
      {ActiveTab === 1 && (
        <div className="tab-panel active" data-page="logbooks" data-tab="1">
          <div className="filter-bar" id="lb-chip-bar" style={{ marginBottom: '12px' }}>
            {[
              { id: 'dg', label: 'DG Set' },
              { id: 'energy', label: 'Energy / Meters' },
              { id: 'hvac', label: 'HVAC & Chiller' },
              { id: 'water', label: 'Water / STP' },
              { id: 'fire', label: 'Fire Pump' },
              { id: 'lift', label: 'Lift' }
            ].map((chip) => (
              <span
                key={chip.id}
                className={`filter-chip ${activeLogChip === chip.id ? 'active' : ''}`}
                data-lb={chip.id}
                onClick={(e) => {
                  setActiveLogChip(chip.id);
                  renderLogEntries(chip.id, e.currentTarget);
                }}
              >
                {chip.label}
              </span>
            ))}
          </div>
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct" id="lb-entries-title">DG Set Log — Entries &amp; History</div>
                <div className="cs" id="lb-entries-sub">Historical records · readings · remarks · sign-off</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="filter-bar" style={{ marginBottom: 0 }}>
                  <span className="filter-chip">7 days</span>
                  <span className="filter-chip active">30 days</span>
                  <span className="filter-chip">Custom</span>
                </div>
                <span className="ca" onClick={() => downloadLogbook(LB_ACTIVE)}>
                  <i className="ti ti-download" style={{ fontSize: '12px' }}></i> Download
                </span>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Date / Time</th>
                    <th>Shift</th>
                    <th>Key Readings</th>
                    <th>Recorded By</th>
                    <th>Remarks</th>
                    <th>Sign-off</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="lb-entries-tbody">
                  <tr>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-1)' }}>Today 14:00</td>
                    <td>B</td>
                    <td style={{ color: 'var(--ink-2)', fontSize: '11px' }}>DG-01 standby · fuel 86% · 0 kW</td>
                    <td>R. Sharma</td>
                    <td style={{ color: 'var(--ink-3)', fontSize: '11px' }}>Routine check — genset on auto-standby, no abn…</td>
                    <td><span className="badge pill-pending">Pending</span></td>
                    <td>
                      <button className="btn" style={{ padding: '3px 11px', fontSize: '10.5px' }} onClick={() => openLogEntry('dg', 'DG-260514')}>
                        <i className="ti ti-eye"></i>View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-1)' }}>Today 12:00</td>
                    <td>B</td>
                    <td style={{ color: 'var(--ink-2)', fontSize: '11px' }}>DG-02 standby · fuel 78%</td>
                    <td>R. Sharma</td>
                    <td style={{ color: 'var(--ink-3)', fontSize: '11px' }}>—</td>
                    <td><span className="badge pill-pending">Pending</span></td>
                    <td>
                      <button className="btn" style={{ padding: '3px 11px', fontSize: '10.5px' }} onClick={() => openLogEntry('dg', 'DG-260512')}>
                        <i className="ti ti-eye"></i>View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-1)' }}>Today 08:00</td>
                    <td>A</td>
                    <td style={{ color: 'var(--ink-2)', fontSize: '11px' }}>DG-01 standby · fuel 87%</td>
                    <td>V. Nair</td>
                    <td style={{ color: 'var(--ink-3)', fontSize: '11px' }}>Morning check OK.</td>
                    <td><span className="badge pill-signed">Signed</span></td>
                    <td>
                      <button className="btn" style={{ padding: '3px 11px', fontSize: '10.5px' }} onClick={() => openLogEntry('dg', 'DG-260508')}>
                        <i className="ti ti-eye"></i>View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-1)' }}>Yesterday 11:00</td>
                    <td>A</td>
                    <td style={{ color: 'var(--ink-2)', fontSize: '11px' }}>Weekly load test — 30 min @ 75% load OK</td>
                    <td>R. Sharma</td>
                    <td style={{ color: 'var(--ink-3)', fontSize: '11px' }}>Weekly on-load test completed, parameters with…</td>
                    <td><span className="badge pill-signed">Signed</span></td>
                    <td>
                      <button className="btn" style={{ padding: '3px 11px', fontSize: '10.5px' }} onClick={() => openLogEntry('dg', 'DG-260422')}>
                        <i className="ti ti-eye"></i>View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sign-off Queue */}
      {ActiveTab === 2 && (
        <div className="tab-panel active" data-page="logbooks" data-tab="2">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="kpi glow-warn">
              <div className="kpi-l">Awaiting Sign-off</div>
              <div className="kpi-v warn">7</div>
              <div className="kpi-s">CE / Property Head</div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Overdue (&gt;24h)</div>
              <div className="kpi-v bad">2</div>
              <div className="kpi-s">escalate</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Signed Today</div>
              <div className="kpi-v ok">19</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Avg Sign-off Time</div>
              <div className="kpi-v">3.4<span className="kpi-u">h</span></div>
            </div>
          </div>
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Sign-off Queue</div>
                <div className="cs">Add a remark and sign-off — recorded to the audit trail</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Entry</th>
                    <th>Logbook</th>
                    <th>Recorded By</th>
                    <th>Logged</th>
                    <th>Waiting</th>
                    <th>Add Remark &amp; Sign-off</th>
                  </tr>
                </thead>
                <tbody id="lb-signoff-tbody">
                  {[
                    { id: 'DG-260514', type: 'dg', logbook: 'DG Set Log', user: 'R. Sharma', time: 'Today 14:00', wait: '2h 10m' },
                    { id: 'DG-260512', type: 'dg', logbook: 'DG Set Log', user: 'R. Sharma', time: 'Today 12:00', wait: '4h 10m' },
                    { id: 'HV-260514', type: 'hvac', logbook: 'HVAC & Chiller Plant Log', user: 'S. Patil', time: 'Today 14:00', wait: '2h' },
                    { id: 'HV-260512', type: 'hvac', logbook: 'HVAC & Chiller Plant Log', user: 'S. Patil', time: 'Today 12:00', wait: '4h' },
                    { id: 'HV-260510', type: 'hvac', logbook: 'HVAC & Chiller Plant Log', user: 'K. Iyer', time: 'Today 10:00', wait: '6h' },
                    { id: 'FP-260508', type: 'fire', logbook: 'Fire Pump & Life-Safety Log', user: 'D. Verma', time: 'Today 08:00', wait: '8h' },
                    { id: 'FP-260507', type: 'fire', logbook: 'Fire Pump & Life-Safety Log', user: 'D. Verma', time: 'Yesterday 08:00', wait: '1d' }
                  ].map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-1)' }}>{row.id}</td>
                      <td>{row.logbook}</td>
                      <td>{row.user}</td>
                      <td style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{row.time}</td>
                      <td><span className="badge pill-pending">{row.wait}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <input
                            id={`q-${row.id}`}
                            placeholder="Remark…"
                            value={quickRemarks[row.id] || ''}
                            onChange={(e) => handleRemarkChange(row.id, e.target.value)}
                            style={{
                              flex: 1,
                              minWidth: '110px',
                              background: 'var(--surface-2)',
                              border: '1px solid var(--line-2)',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              color: 'var(--ink-0)',
                              fontSize: '11px',
                              outline: 'none'
                            }}
                          />
                          <button
                            className="btn primary"
                            style={{ padding: '4px 11px', fontSize: '10.5px' }}
                            onClick={() => handleQuickSignOff(row.type, row.id)}
                          >
                            <i className="ti ti-signature"></i>Sign
                          </button>
                          <button
                            className="btn"
                            style={{ padding: '4px 9px', fontSize: '10.5px' }}
                            onClick={() => openLogEntry(row.type, row.id)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Audit Trail */}
      {ActiveTab === 3 && (
        <div className="tab-panel active" data-page="logbooks" data-tab="3">
          <div className="card mb-12">
            <div className="ch">
              <div>
                <div className="ct">Audit Trail</div>
                <div className="cs">Immutable, time-stamped record of every logbook action — who, what, when</div>
              </div>
              <span className="ca" onClick={() => downloadLogbook('audit')}>
                <i className="ti ti-download" style={{ fontSize: '12px' }}></i> Export Audit Log
              </span>
            </div>
            <div className="cb">
              <div className="filter-bar">
                <span className="filter-chip active">All events</span>
                <span className="filter-chip">Created</span>
                <span className="filter-chip">Signed-off</span>
                <span className="filter-chip">Edited</span>
                <span className="filter-chip">Exported</span>
              </div>
              <div className="audit-tl" id="lb-audit-tl">
                {[
                  { type: 'create', act: 'Entry created', target: 'DG Set Log · DG-260514', meta: 'R. Sharma · Technician · Today 14:02', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'create', act: 'Entry created', target: 'DG Set Log · DG-260512', meta: 'R. Sharma · Technician · Today 12:01', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'create', act: 'Entry created', target: 'DG Set Log · DG-260508', meta: 'V. Nair · Technician · Today 08:05', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'DG Set Log · DG-260508', meta: 'A. Deshmukh · Chief Engineer · Today 09:40', detail: 'Remark: Verified, fuel adequate. Approved.' },
                  { type: 'create', act: 'Entry created', target: 'DG Set Log · DG-260422', meta: 'R. Sharma · Technician · Yesterday 11:35', detail: 'Weekly load test record' },
                  { type: 'sign', act: 'Entry signed off', target: 'DG Set Log · DG-260422', meta: 'A. Deshmukh · Chief Engineer · Yesterday 12:30', detail: 'Load test approved' },
                  { type: 'create', act: 'Entry created', target: 'HVAC & Chiller Plant Log · HV-260514', meta: 'S. Patil · Technician · Today 14:05', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'create', act: 'Entry created', target: 'HVAC & Chiller Plant Log · HV-260512', meta: 'S. Patil · Technician · Today 12:08', detail: 'Linked to WO #4821' },
                  { type: 'create', act: 'Entry created', target: 'HVAC & Chiller Plant Log · HV-260510', meta: 'K. Iyer · Technician · Today 10:12', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'create', act: 'Entry created', target: 'HVAC & Chiller Plant Log · HV-260508', meta: 'K. Iyer · Technician · Today 08:04', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'HVAC & Chiller Plant Log · HV-260508', meta: 'A. Deshmukh · Chief Engineer · Today 09:50', detail: 'Approved' },
                  { type: 'create', act: 'Entry created', target: 'Fire Pump & Life-Safety Log · FP-260508', meta: 'D. Verma · Safety Officer · Today 08:10', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'create', act: 'Entry created', target: 'Fire Pump & Life-Safety Log · FP-260507', meta: 'D. Verma · Safety Officer · Yesterday 08:25', detail: 'Weekly test record' },
                  { type: 'create', act: 'Entry created', target: 'Fire Pump & Life-Safety Log · FP-260506', meta: 'D. Verma · Safety Officer · 2 days ago 08:08', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Fire Pump & Life-Safety Log · FP-260506', meta: 'N. Joshi · Property Head · 2 days ago 11:00', detail: 'Reviewed and approved' },
                  { type: 'create', act: 'Entry created', target: 'Energy / Meter Readings Log · EN-260506', meta: 'A. Khan · Technician · Today 06:05', detail: '142 meters auto-captured' },
                  { type: 'sign', act: 'Entry signed off', target: 'Energy / Meter Readings Log · EN-260506', meta: 'A. Deshmukh · Chief Engineer · Today 07:10', detail: 'Verified — feeds DMR' },
                  { type: 'create', act: 'Entry created', target: 'Energy / Meter Readings Log · EN-260505', meta: 'A. Khan · Technician · Yesterday 06:04', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Energy / Meter Readings Log · EN-260505', meta: 'A. Deshmukh · Chief Engineer · Yesterday 07:05', detail: 'Verified' },
                  { type: 'create', act: 'Entry created', target: 'Energy / Meter Readings Log · EN-260504', meta: 'A. Khan · Technician · 2 days ago 06:06', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Energy / Meter Readings Log · EN-260504', meta: 'A. Deshmukh · Chief Engineer · 2 days ago 07:00', detail: 'Verified' },
                  { type: 'create', act: 'Entry created', target: 'Water Treatment / STP / WTP Log · WT-260513', meta: 'M. Rao · STP Operator · Today 13:35', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Water Treatment / STP / WTP Log · WT-260513', meta: 'A. Deshmukh · Chief Engineer · Today 15:00', detail: 'Compliant — MPCB norms' },
                  { type: 'create', act: 'Entry created', target: 'Water Treatment / STP / WTP Log · WT-260509', meta: 'M. Rao · STP Operator · Today 09:06', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Water Treatment / STP / WTP Log · WT-260509', meta: 'A. Deshmukh · Chief Engineer · Today 10:30', detail: 'Approved' },
                  { type: 'create', act: 'Entry created', target: 'Water Treatment / STP / WTP Log · WT-260422', meta: 'M. Rao · STP Operator · Yesterday 13:34', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Water Treatment / STP / WTP Log · WT-260422', meta: 'N. Joshi · Property Head · Yesterday 16:00', detail: 'Reviewed' },
                  { type: 'create', act: 'Entry created', target: 'Lift / Elevator Log · LF-260509', meta: 'LiftPro AMC · AMC Vendor · Today 09:20', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Lift / Elevator Log · LF-260509', meta: 'A. Deshmukh · Chief Engineer · Today 11:20', detail: 'Approved' },
                  { type: 'create', act: 'Entry created', target: 'Lift / Elevator Log · LF-260508', meta: 'LiftPro AMC · AMC Vendor · Yesterday 09:18', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Lift / Elevator Log · LF-260508', meta: 'A. Deshmukh · Chief Engineer · Yesterday 10:40', detail: 'Approved' },
                  { type: 'create', act: 'Entry created', target: 'Lift / Elevator Log · LF-260507', meta: 'LiftPro AMC · AMC Vendor · 2 days ago 09:25', detail: 'Readings logged via mobile app · geotag Vikhroli' },
                  { type: 'sign', act: 'Entry signed off', target: 'Lift / Elevator Log · LF-260507', meta: 'N. Joshi · Property Head · 2 days ago 12:00', detail: 'Reviewed' }
                ].map((item, index) => (
                  <div key={index} className={`audit-item ${item.type}`}>
                    <div className="audit-act">
                      {item.act}{' '}
                      <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>
                        · {item.target}
                      </span>
                    </div>
                    <div className="audit-meta">{item.meta}</div>
                    <div className="audit-detail">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogbooksPage;