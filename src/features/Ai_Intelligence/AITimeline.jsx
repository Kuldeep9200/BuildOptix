
import React, { useState } from 'react';

export default function AITimeline() {
   const [activeTab, setActiveTab] = useState(4);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // --- Static Data Mockups ---
  const kpiSummary = [
    { label: "Predicted Failures (7d)", value: "3", detail: "1 critical · 2 warning", color: "#ff4d4f" },
    { label: "Optimisation Opportunities", value: "5", detail: "₹2.4L/mo recoverable", color: "#7c36ed" },
    { label: "Anomalies Detected", value: "5", detail: "live · auto-prioritised", color: "#f5b441" },
    { label: "Model Confidence", value: "94%", detail: "avg across insights", color: "#22d67a" }
  ];

  const riskRegister = [
    { equip: "AHU-07", type: "Air Handling · Zone 3", score: 92, ttf: "~5 days", impact: "High", badgeClass: "badge-red", trend: "↑ rising" },
    { equip: "PMP-03", type: "Cond. Pump · Plant", score: 81, ttf: "~12 days", impact: "High", badgeClass: "badge-red", trend: "↑ rising" },
    { equip: "CHWP-02", type: "CHW Pump · Plant", score: 68, ttf: "~16 days", impact: "Medium", badgeClass: "badge-amber", trend: "→ stable" },
    { equip: "Lift-04", type: "Door Actuator · Tower B", score: 64, ttf: "~18 days", impact: "High", badgeClass: "badge-amber", trend: "↑ rising" },
    { equip: "CT-01", type: "Cooling Tower · Roof", score: 52, ttf: "~24 days", impact: "Medium", badgeClass: "badge-amber", trend: "→ stable" }
  ];

  const optimizationOptions = [
    { title: "HVAC Scheduling Optimisation", subtitle: "Chilled-water reset & pre-cool", text: "Shift CHWS to 7.8 °C off-peak and pre-cool Zones 1–2 before the 14:00 demand peak. Comfort bands stay within ±0.5 °C.", impacts: ["Energy −38 kWh/d", "Savings ₹34k/mo", "Comfort Neutral"], iconBg: "rgba(52,210,230,.14)", iconColor: "#34d2e6" },
    { title: "Tariff Optimisation", subtitle: "Peak-shaving & load shift", text: "Shift 220 kWh of deferrable load out of the 18:00–22:00 peak-tariff window using thermal storage and lift scheduling.", impacts: ["Peak cut −180 kW", "Savings ₹88k/mo", "CO₂ −1.2 t/mo"], iconBg: "rgba(245,180,65,.16)", iconColor: "#f5b441" },
    { title: "Load Balancing", subtitle: "Chiller sequencing", text: "Rebalance CH-01/CH-02 staging to hold both nearer peak COP instead of running CH-01 at low part-load.", impacts: ["COP +0.4", "Savings ₹26k/mo", "Runtime Balanced"], iconBg: "rgba(78,161,255,.14)", iconColor: "#4ea1ff" },
    { title: "Occupancy-Based Control", subtitle: "Floors 4–6 · AHU & lighting", text: "Tie AHU airflow and lighting to live occupancy on Floors 4–6, which run 40% vacant before 10:00 and after 19:00.", impacts: ["Energy −61 kWh/d", "Savings ₹52k/mo", "Comfort Neutral"], iconBg: "rgba(34,214,122,.14)", iconColor: "#22d67a" }
  ];

  const timelineEvents = [
    { time: "10:22 IST", title: "Root cause identified — condenser flow restriction", desc: "Correlated 12 alarms to PMP-03; recommended priority dispatch.", color: "#ff4d4f" },
    { time: "10:05 IST", title: "Anomaly — chiller COP dropped 0.6", desc: "Flagged as mechanical (flow), not load-driven. Tracking energy impact.", color: "#f5b441" },
    { time: "08:40 IST", title: "Optimisation applied — chiller staging rebalanced", desc: "COP improved +0.3 after CH-02 lead swap. Holding above target.", color: "#7c36ed" },
    { time: "07:15 IST", title: "Predicted failure — AHU-07 filter (~5 days)", desc: "Filter ΔP trend extrapolated to alarm threshold; recommended service.", color: "#4ea1ff" },
    { time: "06:00 IST", title: "Daily operational summary generated", desc: "93% health · 3 predicted failures · ₹2.4L/mo optimisation headroom.", color: "#22d67a" }
  ];

  const maintenanceRecommendations = [
    { title: "Replace AHU filter", details: "ΔP trending to alarm — airflow loss in Zone 3", equip: "AHU-07", priority: "Urgent", badge: "badge-red", window: "within 5 days", conf: "96%", actionText: "Create WO", actionType: "go" },
    { title: "Motor vibration trend abnormal — inspect bearing", details: "Vibration RMS +22% over 14 days", equip: "PMP-03", priority: "Urgent", badge: "badge-red", window: "within 7 days", conf: "88%", actionText: "Create WO", actionType: "go" },
    { title: "Lubricate & cycle-test door actuator", details: "Cycle count above service interval", equip: "Lift-04", priority: "Soon", badge: "badge-amber", window: "within 18 days", conf: "84%", actionText: "Schedule", actionType: "" },
    { title: "Clean condenser tubes — approach temp rising", details: "Fouling reduces heat transfer", equip: "CT-01", priority: "Soon", badge: "badge-amber", window: "within 24 days", conf: "82%", actionText: "Schedule", actionType: "" },
    { title: "Recalibrate CHW flow sensor", details: "Drift detected vs energy balance", equip: "CHWP-02", priority: "Planned", badge: "badge-green", window: "next PM cycle", conf: "79%", actionText: "Plan", actionType: "" }
  ];

  // --- Helper Event Triggers ---
  const handleAction = (message, type = 'info') => {
    alert(`[${type.toUpperCase()}]: ${message}`);
  };

  return (
    <div className="page" id="pg-ai">
      
      {/* Tab Navigation Controls (Optional UI wrapper for switching views) */}
        <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            AI Intelligence
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Predictive · Diagnostic · Optimisation — BuildOptix AI
                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                       AI Summary
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                       Risk Matrix
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                       Root Cause
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                       Optimization
                    </div>
                     <div
                        onClick={() => setActiveTab(4)}
                        className={`ph-tab ${activeTab === 4 ? "active" : ""}`}
                    >
                       Timeline
                    </div>
                     <div
                        onClick={() => setActiveTab(5)}
                        className={`ph-tab ${activeTab === 5 ? "active" : ""}`}
                    >
                       Maintenance
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

      {/* Tab 0: AI Summary */}
   {activeTab === 0 && (
  <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`}>
          <div className="aip-hero">
            <div className="aip-hero-top">
              <span className="aip-hero-badge">
                <i className="ti ti-sparkles" style={{ fontSize: '10px' }}></i> BuildOptix Reasoning
              </span>
              <span style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                Generated 06:00 IST · 31 May 2026
              </span>
            </div>
            <h3 style={{ marginBottom: '7px' }}>Daily Operational Summary</h3>
            <p>Vikhroli campus is operating at <b>93% overall health</b>. Cooling demand is tracking 4% above the seasonal baseline; the AI advanced <b>CH-02</b> ahead of CH-01 to hold COP above target. <b>3 equipment failures are predicted</b> within 7 days — most urgent is <b>AHU-07</b> (filter ΔP trending to alarm in ~5 days). Five optimisation opportunities are open, with an estimated <b>₹2.4L/month</b> recoverable, led by chilled-water reset and peak-tariff load shifting. No SLA breaches occurred overnight; 2 remain at risk today.</p>
          </div>

          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)', display: 'grid', gap: '12px' }}>
            {kpiSummary.map((kpi, idx) => (
              <div className="kpi" key={idx}>
                <div className="kpi-l">{kpi.label}</div>
                <div className="kpi-v" style={{ color: kpi.color }}>{kpi.value}</div>
                <div className="kpi-d">{kpi.detail}</div>
              </div>
            ))}
          </div>

          <div className="card mb-12">
            <div className="ch">
              <div>
                <div className="ct">Top AI Recommendations</div>
                <div className="cs">Ranked by impact &amp; confidence</div>
              </div>
            </div>
            <div className="cb">
              <div className="aip-rec">
                <div className="ic" style={{ background: 'rgba(255,77,79,.14)', color: 'var(--bad)' }}><i className="ti ti-alert-hexagon"></i></div>
                <div className="aip-rec-bd">
                  <div className="t">Service AHU-07 supply filter before 5 Jun</div>
                  <div className="d">Filter ΔP rising 6 Pa/day — projected to cross the 250 Pa alarm in ~5 days, cutting airflow to Zone 3.</div>
                  <div className="aip-rec-meta">
                    <span className="aip-conf">Confidence 96%</span>
                    <button className="aip-btn go" onClick={() => handleAction('Work order drafted for AHU-07', 'ok')}>Create work order</button>
                    <button className="aip-btn" onClick={() => setActiveTab(5)}>View detail</button>
                  </div>
                </div>
              </div>
              <div className="aip-rec">
                <div className="ic" style={{ background: 'rgba(124,58,237,.14)', color: 'var(--ai)' }}><i className="ti ti-bolt"></i></div>
                <div className="aip-rec-bd">
                  <div className="t">Reset chilled-water setpoint 7.0 → 7.8 °C off-peak</div>
                  <div className="d">Outdoor wet-bulb allows a higher CHWS without comfort loss — saves an estimated 38 kWh/day on chiller power.</div>
                  <div className="aip-rec-meta">
                    <span className="aip-conf">Confidence 91%</span>
                    <button className="aip-btn go" onClick={() => handleAction('Simulating CHWS reset…', 'info')}>Simulate</button>
                    <button className="aip-btn" onClick={() => setActiveTab(3)}>Optimisation</button>
                  </div>
                </div>
              </div>
              <div className="aip-rec">
                <div className="ic" style={{ background: 'rgba(245,180,65,.16)', color: 'var(--warn)' }}><i className="ti ti-activity-heartbeat"></i></div>
                <div className="aip-rec-bd">
                  <div className="t">Inspect PMP-03 — abnormal vibration trend</div>
                  <div className="d">Vibration RMS up 22% over 14 days with rising bearing temperature — early signature of bearing wear.</div>
                  <div className="aip-rec-meta">
                    <span className="aip-conf">Confidence 88%</span>
                    <button className="aip-btn" onClick={() => setActiveTab(2)}>Root cause</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="g21" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="card">
              <div className="ch">
                <div><div className="ct">Predicted Failures</div></div>
                <span className="ca" onClick={() => setActiveTab(1)} style={{ cursor: 'pointer' }}>Risk matrix →</span>
              </div>
              <div className="cb">
                <div className="aip-mini"><div className="l">AHU-07 Supply Filter<span>Zone 3 · Airflow loss</span></div><span className="badge badge-red">~5 days</span></div>
                <div className="aip-mini"><div className="l">PMP-03 Bearing<span>Condenser loop · Vibration</span></div><span className="badge badge-amber">~12 days</span></div>
                <div className="aip-mini"><div className="l">Lift-04 Door Actuator<span>Tower B · Cycle count</span></div><span className="badge badge-amber">~18 days</span></div>
              </div>
            </div>
            <div className="card">
              <div className="ch">
                <div><div className="ct">Optimisation Opportunities</div></div>
                <span className="ca" onClick={() => setActiveTab(3)} style={{ cursor: 'pointer' }}>All →</span>
              </div>
              <div className="cb">
                <div className="aip-mini"><div className="l">Chilled-water reset<span>HVAC scheduling</span></div><span style={{ color: 'var(--ok)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>₹34k/mo</span></div>
                <div className="aip-mini"><div className="l">Peak-tariff load shift<span>Tariff optimisation</span></div><span style={{ color: 'var(--ok)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>₹88k/mo</span></div>
                <div className="aip-mini"><div className="l">Occupancy-based AHU<span>Floors 4–6</span></div><span style={{ color: 'var(--ok)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>₹52k/mo</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Predictive Risk Matrix */}
    {activeTab === 1 && (
  <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`}>
          <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
            <div className="kpi"><div className="kpi-l">Assets at Risk</div><div className="kpi-v" style={{ color: 'var(--warn)' }}>7</div><div className="kpi-d">of 2,148 monitored</div></div>
            <div className="kpi"><div className="kpi-l">High Severity</div><div className="kpi-v" style={{ color: 'var(--bad)' }}>2</div><div className="kpi-d">immediate attention</div></div>
            <div className="kpi"><div className="kpi-l">Avg Time-to-Failure</div><div className="kpi-v">11<span className="kpi-u">days</span></div><div className="kpi-d">across flagged assets</div></div>
            <div className="kpi"><div className="kpi-l">Model Confidence</div><div className="kpi-v" style={{ color: 'var(--ok)' }}>94<span className="kpi-u">%</span></div><div className="kpi-d">prognostics engine</div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '12px' }}>
            <div className="card">
              <div className="ch">
                <div><div className="ct">Risk Matrix</div><div className="cs">Impact × Likelihood</div></div>
              </div>
              <div className="cb">
                <div className="aip-matrix" style={{ display: 'grid', gridTemplateColumns: 'auto repeat(3, 1fr)', gap: '4px' }}>
                  <div></div>
                  <div className="aip-mx-h">Low</div><div className="aip-mx-h">Medium</div><div className="aip-mx-h">High</div>
                  
                  <div className="aip-mx-yl">High<br />impact</div>
                  <div className="aip-cell" style={{ background: 'rgba(245,180,65,.14)' }}><span className="n" style={{ color: 'var(--warn)' }}>1</span><span className="x">Lift-04</span></div>
                  <div className="aip-cell" style={{ background: 'rgba(255,77,79,.14)' }}><span className="n" style={{ color: 'var(--bad)' }}>1</span><span className="x">PMP-03</span></div>
                  <div className="aip-cell" style={{ background: 'rgba(255,77,79,.22)' }}><span className="n" style={{ color: 'var(--bad)' }}>1</span><span className="x">AHU-07</span></div>
                  
                  <div className="aip-mx-yl">Med<br />impact</div>
                  <div className="aip-cell"><span className="n" style={{ color: 'var(--ink-3)' }}>0</span></div>
                  <div className="aip-cell" style={{ background: 'rgba(245,180,65,.12)' }}><span className="n" style={{ color: 'var(--warn)' }}>2</span><span className="x">CT-01, EF-03</span></div>
                  <div className="aip-cell" style={{ background: 'rgba(245,180,65,.14)' }}><span className="n" style={{ color: 'var(--warn)' }}>1</span><span className="x">CHWP-02</span></div>
                  
                  <div className="aip-mx-yl">Low<br />impact</div>
                  <div className="aip-cell" style={{ background: 'rgba(34,214,122,.1)' }}><span className="n" style={{ color: 'var(--ok)' }}>0</span></div>
                  <div className="aip-cell"><span className="n" style={{ color: 'var(--ink-3)' }}>1</span><span className="x">VAV-12</span></div>
                  <div className="aip-cell"><span className="n" style={{ color: 'var(--ink-3)' }}>0</span></div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="ch">
                <div><div className="ct">Equipment Risk Register</div><div className="cs">Prognostic scores · time-to-failure · severity</div></div>
              </div>
              <div className="cb" style={{ padding: 0 }}>
                <table className="dt">
                  <thead>
                    <tr><th>Equipment</th><th>Risk Score</th><th>Time-to-Failure</th><th>Impact</th><th>Trend</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {riskRegister.map((row, idx) => (
                      <tr key={idx}>
                        <td><b>{row.equip}</b><div style={{ fontSize: '10px', color: 'var(--ink-3)' }}>{row.type}</div></td>
                        <td><b style={{ color: 'var(--bad)', fontFamily: 'var(--font-mono)' }}>{row.score}</b></td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{row.ttf}</td>
                        <td><span className={`badge ${row.badgeClass}`}>{row.impact}</span></td>
                        <td style={{ color: row.trend.includes('rising') ? 'var(--bad)' : 'var(--ink-3)' }}>{row.trend}</td>
                        <td>
                          <button 
                            className={`aip-btn ${row.equip === 'AHU-07' ? 'go' : ''}`} 
                            onClick={() => handleAction(`Action triggered for ${row.equip}`, 'info')}
                          >
                            {row.equip === 'AHU-07' ? 'Act' : row.equip === 'PMP-03' ? 'Root cause' : 'Schedule'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI Root Cause Engine */}
    {activeTab === 2 && (
  <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`}>
          <div className="card mb-12">
            <div className="ch">
              <div><div className="ct">Alarm Correlation</div><div className="cs">12 raw alarms grouped into 1 root cause</div></div>
              <span className="badge badge-red">Active</span>
            </div>
            <div className="cb">
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '11px' }}>
                <i className="ti ti-git-merge" style={{ fontSize: '18px', color: 'var(--ai)' }}></i>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-0)' }}>Probable root cause — Condenser water flow restriction</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-2)' }}>Confidence 89% · Plant cooling loop</div>
                </div>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '11px' }}>
                A cluster of 12 alarms across CH-01, CT-01 and PMP-03 over the last 40 minutes correlates to a single upstream condenser-water flow restriction. Treating the root cause clears the dependent alarms.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                <div className="aip-mini" style={{ border: '1px solid var(--line-1)', borderRadius: '8px', padding: '9px 11px' }}><div className="l">CH-01 High Cond. Pressure<span>10:21 · downstream</span></div></div>
                <div className="aip-mini" style={{ border: '1px solid var(--line-1)', borderRadius: '8px', padding: '9px 11px' }}><div className="l">PMP-03 Low Flow<span>10:18 · root</span></div></div>
                <div className="aip-mini" style={{ border: '1px solid var(--line-1)', borderRadius: '8px', padding: '9px 11px' }}><div className="l">CT-01 High Water Temp<span>10:22 · downstream</span></div></div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="card">
              <div className="ch"><div><div className="ct">Operational Anomaly Explanation</div></div></div>
              <div className="cb">
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '5px' }}>Chiller COP dropped 0.6 at 10:05</div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  The drop coincides with reduced condenser-water flow (PMP-03) rather than load change — efficiency loss is mechanical, not demand-driven. Expected recovery once flow is restored. Energy impact so far: <b style={{ color: 'var(--warn)' }}>+42 kWh</b>.
                </div>
              </div>
            </div>
            <div className="card">
              <div className="ch"><div><div className="ct">Equipment Dependency Map</div><div className="cs">Affected chain</div></div></div>
              <div className="cb">
                <div className="aip-dep" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="aip-node" style={{ borderColor: 'var(--bad)' }}>PMP-03<small style={{ display: 'block', fontSize: '9px' }}>Cond. Pump</small></div>
                  <span className="aip-arrow"><i className="ti ti-arrow-right"></i></span>
                  <div className="aip-node">CH-01<small style={{ display: 'block', fontSize: '9px' }}>Chiller</small></div>
                  <span className="aip-arrow"><i className="ti ti-arrow-right"></i></span>
                  <div className="aip-node">CHW Loop<small style={{ display: 'block', fontSize: '9px' }}>Distribution</small></div>
                  <span className="aip-arrow"><i className="ti ti-arrow-right"></i></span>
                  <div className="aip-node">AHU Zone 3<small style={{ display: 'block', fontSize: '9px' }}>Comfort</small></div>
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '11px' }}>Failure at the root node propagates downstream — prioritise PMP-03 to protect comfort in Zone 3.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: AI Optimization Suggestions */}
      {activeTab === 3 && (
  <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {optimizationOptions.map((opt, idx) => (
              <div className="aip-opt" key={idx}>
                <div className="aip-opt-h" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div className="aip-opt-ic" style={{ background: opt.iconBg, color: opt.iconColor, padding: '8px', borderRadius: '6px' }}>
                    <i className={idx === 0 ? "ti ti-snowflake" : idx === 1 ? "ti ti-cash" : idx === 2 ? "ti ti-scale" : "ti ti-users"}></i>
                  </div>
                  <div>
                    <div className="t" style={{ fontWeight: 600 }}>{opt.title}</div>
                    <div className="s" style={{ fontSize: '11px', color: 'var(--ink-2)' }}>{opt.subtitle}</div>
                  </div>
                </div>
                <p style={{ margin: '10px 0', fontSize: '12px', lineHeight: 1.5 }}>{opt.text}</p>
                <div className="aip-opt-impact" style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-1)', padding: '8px', borderRadius: '6px', marginBottom: '10px', fontSize: '11px' }}>
                  {opt.impacts.map((imp, i) => <div key={i}>{imp}</div>)}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="aip-btn go" onClick={() => handleAction(`Simulating ${opt.title}...`, 'info')}>Simulate</button>
                  <button className="aip-btn" onClick={() => handleAction(`Applied ${opt.title}`, 'ok')}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: AI Timeline */}
    {activeTab === 4 && (
  <div className="tab-panel active" data-page="ai" data-tab="4">
      <div className="card">
        <div className="ch">
          <div>
            <div className="ct">AI Operational Timeline</div>
            <div className="cs">Chronological AI insights &amp; actions · today</div>
          </div>
        </div>
        <div className="cb">
          <div className="aip-tl">
            {timelineEvents.map((item, index) => (
              <div key={index} className="aip-tl-item">
                <div className="aip-tl-dot" style={{ background: item.color }}></div>
                <div className="aip-tl-time">{item.time}</div>
                <div className="aip-tl-t">{item.title}</div>
                <div className="aip-tl-d">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      )}

      {/* Tab 5: AI Maintenance Recommendations */}
   {activeTab === 5 && (
  <div className={`tab-panel ${activeTab === 5 ? 'active' : ''}`}>
          <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
            <div className="kpi"><div className="kpi-l">Open Recommendations</div><div className="kpi-v">6</div><div className="kpi-d">AI-generated</div></div>
            <div className="kpi"><div className="kpi-l">Urgent (≤7d)</div><div className="kpi-v" style={{ color: 'var(--bad)' }}>2</div><div className="kpi-d">act this week</div></div>
            <div className="kpi"><div className="kpi-l">Auto-drafted WOs</div><div className="kpi-v" style={{ color: 'var(--info)' }}>3</div><div className="kpi-d">pending approval</div></div>
            <div className="kpi"><div className="kpi-l">Avg Confidence</div><div className="kpi-v" style={{ color: 'var(--ok)' }}>90<span className="kpi-u">%</span></div><div className="kpi-d">across recs</div></div>
          </div>
          <div className="card">
            <div className="ch">
              <div><div className="ct">AI Maintenance Recommendations</div><div className="cs">Predictive · prioritised by urgency &amp; impact</div></div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr><th>Recommendation</th><th>Equipment</th><th>Priority</th><th>Window</th><th>Confidence</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {maintenanceRecommendations.map((rec, idx) => (
                    <tr key={idx}>
                      <td><b>{rec.title}</b><div style={{ fontSize: '10px', color: 'var(--ink-3)' }}>{rec.details}</div></td>
                      <td>{rec.equip}</td>
                      <td><span className={`badge ${rec.badge}`}>{rec.priority}</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{rec.window}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--ok)' }}>{rec.conf}</td>
                      <td>
                        <button 
                          className={`aip-btn ${rec.actionType === 'go' ? 'go' : ''}`} 
                          onClick={() => handleAction(`${rec.actionText} executed for ${rec.equip}`, 'ok')}
                        >
                          {rec.actionText}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}