import React, { useState } from 'react';

export default function FddDashboard() {
  // Tab Management State (0: Active Faults, 1: Anomaly Detection)
  const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  // Accordion Expand/Collapse State (Karta hai track ki kaunsi fault card open hai)
  const [expandedCards, setExpandedCards] = useState({
    ahuB3: true,      // Default open jaisa original markup me tha
    ch02: false,
    pmp02: false,
    ahuF2e: false
  });

  const toggleCard = (cardKey) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  // Safe window-level action wrappers taaki application crash na ho
  const handleToast = (message, status) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(message, status);
    } else {
      console.log(`[Toast Triggered]: ${message} (${status})`);
    }
  };

  const handleAiQuery = (queryText) => {
    if (typeof window !== 'undefined' && typeof window.aiQuery === 'function') {
      window.aiQuery(queryText);
    } else {
      console.log(`[AI Query Executed]: "${queryText}"`);
    }
  };

  return (
    <div className="page active" id="pg-fdd">
      
  <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">Fault Detection & Diagnostics
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
ASHRAE Guideline 36 · ISO 13379 · ML Anomaly Detection
                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                      Active Faults
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                       Anomaly Detection
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








      {/* ================= TAB 0: ACTIVE FAULTS ================= */}
      <div 
        className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} 
        data-page="fdd" 
        data-tab="0" 
        style={{ display: activeTab === 0 ? 'block' : 'none' }}
      >
        {/* Top 5-Column KPI Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
          <div className="kpi glow-bad" onClick={() => setActiveTab(0)} style={{ cursor: 'pointer' }}>
            <div className="kpi-l">Active Faults</div>
            <div className="kpi-v bad">4</div>
            <div className="kpi-s">1 critical · 2 high · 1 medium</div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Energy Waste (Today)</div>
            <div className="kpi-v warn">184<span className="kpi-u">kWh</span></div>
            <div className="kpi-s">from active faults</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Faults Resolved (7d)</div>
            <div className="kpi-v ok">11</div>
          </div>
          <div className="kpi glow-ok" onClick={() => setActiveTab(1)} style={{ cursor: 'pointer' }}>
            <div className="kpi-l">FDD Rules Active</div>
            <div className="kpi-v ok">48</div>
            <div className="kpi-s">across all systems</div>
          </div>
          <div className="kpi glow-info" onClick={() => setActiveTab(1)} style={{ cursor: 'pointer' }}>
            <div className="kpi-l">ML Anomalies Detected</div>
            <div className="kpi-v">3</div>
            <div className="kpi-s">this week</div>
          </div>
        </div>

        {/* Fault Card 1: AHU Supply Temp (Critical) */}
        <div className="fdd-fault-card sev-critical">
          <div className="fdd-fault-hd" onClick={() => toggleCard('ahuB3')} style={{ cursor: 'pointer' }}>
            <div className="fdd-fault-icon" style={{ background: 'var(--bad-soft)', color: 'var(--bad)' }}>
              <i className="ti ti-temperature-plus"></i>
            </div>
            <div style={{ flex: 1 }}>
              <div className="fdd-fault-title">AHU Supply Temp &gt; Mixed Air Temp — Possible Cooling Failure</div>
              <div className="fdd-fault-asset">AHU-B3 · Floor 7 Wing C · Rule: FDD-HVAC-001</div>
            </div>
            <span className="badge badge-red" style={{ flexShrink: 0 }}>Critical</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)', marginLeft: '8px', flexShrink: 0 }}>
              08:14 AM
            </span>
            <i 
              className="ti ti-chevron-down" 
              style={{ color: 'var(--ink-3)', marginLeft: '8px', transition: 'transform 0.2s', transform: expandedCards.ahuB3 ? 'rotate(180deg)' : 'rotate(0deg)' }}
            ></i>
          </div>
          <div className={`fdd-fault-body ${expandedCards.ahuB3 ? 'open' : ''}`} style={{ display: expandedCards.ahuB3 ? 'block' : 'none' }}>
            <div className="fdd-rule-desc">
              Rule: Supply Air Temp &gt; Mixed Air Temp for &gt;15 min indicates economizer fault, stuck cooling valve, or chilled water supply failure to AHU coil. Detected at 07:59 AM · Duration: 75 min.
            </div>
            <div className="fdd-fault-detail-row">
              <div className="fdd-detail-chip"><span>Supply Air Temp</span> <b style={{ color: 'var(--bad)' }}>18.4°C</b></div>
              <div className="fdd-detail-chip"><span>Mixed Air Temp</span> <b style={{ color: 'var(--ok)' }}>14.2°C</b></div>
              <div className="fdd-detail-chip"><span>ΔT</span> <b style={{ color: 'var(--bad)' }}>+4.2°C (fault)</b></div>
              <div className="fdd-detail-chip"><span>CHW Supply</span> <b style={{ color: 'var(--warn)' }}>8.8°C (high)</b></div>
              <div className="fdd-detail-chip"><span>Est. Waste</span> <b style={{ color: 'var(--bad)' }}>94 kWh</b></div>
            </div>
            <div className="fdd-action-row">
              <button className="btn primary" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleToast('Work order WO-2026-0482 created for AHU-B3 inspection', 'ok')}>
                <i className="ti ti-clipboard-plus"></i>Create Work Order
              </button>
              <button className="btn" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleAiQuery('Diagnose AHU-B3 fault: supply temp 18.4°C above mixed air 14.2°C')}>
                <i className="ti ti-brain" style={{ color: 'var(--ai)' }}></i>AI Diagnose
              </button>
              <button className="btn" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleToast('Fault acknowledged by current user', 'info')}>
                <i className="ti ti-check"></i>Acknowledge
              </button>
            </div>
          </div>
        </div>

        {/* Fault Card 2: Chiller COP (High) */}
        <div className="fdd-fault-card sev-high">
          <div className="fdd-fault-hd" onClick={() => toggleCard('ch02')} style={{ cursor: 'pointer' }}>
            <div className="fdd-fault-icon" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}>
              <i className="ti ti-snowflake"></i>
            </div>
            <div style={{ flex: 1 }}>
              <div className="fdd-fault-title">Chiller COP Below Design Threshold — Possible Condenser Fouling</div>
              <div className="fdd-fault-asset">CH-02 · Chiller Plant · Rule: FDD-CHW-003</div>
            </div>
            <span className="badge badge-amber" style={{ flexShrink: 0 }}>High</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)', marginLeft: '8px', flexShrink: 0 }}>
              Yesterday
            </span>
            <i 
              className="ti ti-chevron-down" 
              style={{ color: 'var(--ink-3)', marginLeft: '8px', transition: 'transform 0.2s', transform: expandedCards.ch02 ? 'rotate(180deg)' : 'rotate(0deg)' }}
            ></i>
          </div>
          <div className={`fdd-fault-body ${expandedCards.ch02 ? 'open' : ''}`} style={{ display: expandedCards.ch02 ? 'block' : 'none' }}>
            <div className="fdd-rule-desc">
              Rule: Chiller COP below 4.2 (design 5.8) for &gt;3 hours at &gt;70% load indicates fouled condenser tubes, refrigerant undercharge, or condenser water temp issue. Detected trend over 3 days.
            </div>
            <div className="fdd-fault-detail-row">
              <div className="fdd-detail-chip"><span>Current COP</span> <b style={{ color: 'var(--warn)' }}>3.9</b></div>
              <div className="fdd-detail-chip"><span>Design COP</span> <b>5.8 at full load</b></div>
              <div className="fdd-detail-chip"><span>Load</span> <b>74%</b></div>
              <div className="fdd-detail-chip"><span>Condenser ΔT</span> <b style={{ color: 'var(--bad)' }}>6.8°C (high)</b></div>
              <div className="fdd-detail-chip"><span>Est. Waste</span> <b style={{ color: 'var(--warn)' }}>68 kWh/day</b></div>
            </div>
            <div className="fdd-action-row">
              <button className="btn primary" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleToast('WO raised for CH-02 condenser tube cleaning', 'ok')}>
                <i className="ti ti-clipboard-plus"></i>Create Work Order
              </button>
              <button className="btn" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleAiQuery('CH-02 COP 3.9 vs design 5.8 at 74% load — root cause and corrective action')}>
                <i className="ti ti-brain" style={{ color: 'var(--ai)' }}></i>AI Diagnose
              </button>
            </div>
          </div>
        </div>

        {/* Fault Card 3: Pump Power Deviation (High) */}
        <div className="fdd-fault-card sev-high">
          <div className="fdd-fault-hd" onClick={() => toggleCard('pmp02')} style={{ cursor: 'pointer' }}>
            <div className="fdd-fault-icon" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}>
              <i className="ti ti-bolt"></i>
            </div>
            <div style={{ flex: 1 }}>
              <div className="fdd-fault-title">Motor Power Deviation +22% Above Baseline — PMP-02 Pump</div>
              <div className="fdd-fault-asset">PMP-02 · Domestic Water · Rule: FDD-ELEC-007</div>
            </div>
            <span className="badge badge-amber" style={{ flexShrink: 0 }}>High</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)', marginLeft: '8px', flexShrink: 0 }}>
              2 days
            </span>
            <i 
              className="ti ti-chevron-down" 
              style={{ color: 'var(--ink-3)', marginLeft: '8px', transition: 'transform 0.2s', transform: expandedCards.pmp02 ? 'rotate(180deg)' : 'rotate(0deg)' }}
            ></i>
          </div>
          <div className={`fdd-fault-body ${expandedCards.pmp02 ? 'open' : ''}`} style={{ display: expandedCards.pmp02 ? 'block' : 'none' }}>
            <div className="fdd-rule-desc">
              Rule: Motor power &gt;15% above ML baseline (at same flow rate) for &gt;48h indicates worn impeller, partially blocked strainer, or impending bearing failure. Anomaly score: 2.4σ
            </div>
            <div className="fdd-fault-detail-row">
              <div className="fdd-detail-chip"><span>Current Power</span> <b style={{ color: 'var(--warn)' }}>18.3 kW</b></div>
              <div className="fdd-detail-chip"><span>ML Baseline</span> <b>15.0 kW</b></div>
              <div className="fdd-detail-chip"><span>Flow Rate</span> <b>unchanged 42 m³/h</b></div>
              <div className="fdd-detail-chip"><span>Anomaly σ</span> <b style={{ color: 'var(--warn)' }}>2.4σ</b></div>
            </div>
            <div className="fdd-action-row">
              <button className="btn primary" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleToast('WO raised for PMP-02 strainer clean + bearing check', 'ok')}>
                <i className="ti ti-clipboard-plus"></i>Create Work Order
              </button>
              <button className="btn" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleAiQuery('PMP-02 power 22% above baseline at same flow — diagnosis and next steps')}>
                <i className="ti ti-brain" style={{ color: 'var(--ai)' }}></i>AI Diagnose
              </button>
            </div>
          </div>
        </div>

        {/* Fault Card 4: HVAC Outside Hours (Medium) */}
        <div className="fdd-fault-card sev-medium">
          <div className="fdd-fault-hd" onClick={() => toggleCard('ahuF2e')} style={{ cursor: 'pointer' }}>
            <div className="fdd-fault-icon" style={{ background: 'var(--info-soft)', color: 'var(--info)' }}>
              <i className="ti ti-sun"></i>
            </div>
            <div style={{ flex: 1 }}>
              <div className="fdd-fault-title">HVAC Running Outside Occupied Hours — Floor 2 East AHU</div>
              <div className="fdd-fault-asset">AHU-F2E · Floor 2 · Rule: FDD-SCH-011</div>
            </div>
            <span className="badge badge-cyan" style={{ flexShrink: 0 }}>Medium</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)', marginLeft: '8px', flexShrink: 0 }}>
              3 days
            </span>
            <i 
              className="ti ti-chevron-down" 
              style={{ color: 'var(--ink-3)', marginLeft: '8px', transition: 'transform 0.2s', transform: expandedCards.ahuF2e ? 'rotate(180deg)' : 'rotate(0deg)' }}
            ></i>
          </div>
          <div className={`fdd-fault-body ${expandedCards.ahuF2e ? 'open' : ''}`} style={{ display: expandedCards.ahuF2e ? 'block' : 'none' }}>
            <div className="fdd-rule-desc">
              Rule: AHU running at 100% capacity beyond 20:00 when occupancy sensor shows zero occupancy for that zone. Est. wasted energy: 22 kWh/day × 3 days = 66 kWh. Check schedule configuration.
            </div>
            <div className="fdd-fault-detail-row">
              <div className="fdd-detail-chip"><span>Running Since</span> <b>3 consecutive days after 20:00</b></div>
              <div className="fdd-detail-chip"><span>Occupancy</span> <b style={{ color: 'var(--ok)' }}>Zero after 19:30</b></div>
              <div className="fdd-detail-chip"><span>Est. Waste</span> <b style={{ color: 'var(--info)' }}>66 kWh total</b></div>
            </div>
            <div className="fdd-action-row">
              <button className="btn primary" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleToast('Schedule corrected for AHU-F2E — off at 20:00 on weekdays', 'ok')}>
                <i className="ti ti-calendar"></i>Fix Schedule
              </button>
              <button className="btn" style={{ padding: '5px 12px', fontSize: '11px' }} onClick={() => handleToast('Fault acknowledged by current user', 'info')}>
                <i className="ti ti-check"></i>Acknowledge
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: ANOMALY DETECTION ================= */}
      <div 
        className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} 
        data-page="fdd" 
        data-tab="1" 
        style={{ display: activeTab === 1 ? 'block' : 'none' }}
      >
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-info">
            <div className="kpi-l">ML Models Active</div>
            <div className="kpi-v ok">24</div>
            <div className="kpi-s">one per major asset</div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Anomalies This Week</div>
            <div className="kpi-v warn">3</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">False Positives (30d)</div>
            <div className="kpi-v ok">4<span className="kpi-u">%</span></div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Mean Time to Detect</div>
            <div className="kpi-v ok">2.4<span className="kpi-u">hrs</span></div>
          </div>
        </div>

        <div className="card">
          <div className="ch">
            <div>
              <div className="ct">ML Anomaly Detection — Asset Power Signatures</div>
              <div className="cs">Baseline vs actual · 2σ threshold</div>
            </div>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <div className="fdd-anomaly-row">
              <span className="fdd-anomaly-asset">PMP-02 Pump</span>
              <span className="fdd-anomaly-desc">Power 22% above ML baseline at same flow — impeller/bearing issue probable</span>
              <span className="fdd-anomaly-delta" style={{ color: 'var(--warn)' }}>+22% ⚠</span>
              <span className="badge badge-amber" style={{ marginLeft: '8px' }}>2.4σ</span>
            </div>
            <div className="fdd-anomaly-row">
              <span className="fdd-anomaly-asset">CH-02 Chiller</span>
              <span className="fdd-anomaly-desc">COP trending down 3.1% per day for last 5 days — condenser fouling suspected</span>
              <span className="fdd-anomaly-delta" style={{ color: 'var(--warn)' }}>−15.5% COP</span>
              <span className="badge badge-amber" style={{ marginLeft: '8px' }}>1.9σ</span>
            </div>
            <div className="fdd-anomaly-row">
              <span className="fdd-anomaly-asset">CT-01 Cooling Tower</span>
              <span className="fdd-anomaly-desc">Approach temperature rising 0.4°C/day — fill pack fouling or water distribution issue</span>
              <span className="fdd-anomaly-delta" style={{ color: 'var(--info)' }}>+1.8°C</span>
              <span className="badge badge-cyan" style={{ marginLeft: '8px' }}>1.6σ</span>
            </div>
            <div className="fdd-anomaly-row">
              <span className="fdd-anomaly-asset">AHU-B3</span>
              <span className="fdd-anomaly-desc">Supply–return temp differential collapsed — cooling coil bypass or valve fault</span>
              <span className="fdd-anomaly-delta" style={{ color: 'var(--bad)' }}>ΔT 4.2°C</span>
              <span className="badge badge-red" style={{ marginLeft: '8px' }}>3.1σ</span>
            </div>
            <div className="fdd-anomaly-row">
              <span className="fdd-anomaly-asset">SM-01 Smart Meter</span>
              <span className="fdd-anomaly-desc">Weekend consumption 8% above same-weekend baseline — phantom load investigation needed</span>
              <span className="fdd-anomaly-delta" style={{ color: 'var(--info)' }}>+8%</span>
              <span className="badge badge-cyan" style={{ marginLeft: '8px' }}>1.4σ</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}