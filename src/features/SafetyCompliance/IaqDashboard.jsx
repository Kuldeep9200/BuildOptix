import React, { useState } from 'react';

const IaqDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  return (
    <div className="page active" id="pg-iaq">
      {/* Navigation / Tab Controls */}

      <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
        <div className="ph-left">
          <div className="live-dot"></div>

          <div>
            <div className="ph-title" id="dash-page-title">
              IAQ Monitor
            </div>

            <div
              id="dash-page-sub"
              style={{ fontSize: "10px", color: "var(--ink-3)" }}
            >
              Indoor Air Quality · ASHRAE 62.1 · WELL v2 · NBC Part 8                        </div>
          </div>
        </div>

        <div className="ph-tabs" id="dash-tab-bar">
          <div
            onClick={() => setActiveTab(0)}
            className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
          >
            Zone Overview
          </div>

          <div
            onClick={() => setActiveTab(1)}
            className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
          >
            Compliance Log
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


      {/* Tab 0: Zone Overview */}
      {activeTab === 0 && (
        <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="iaq" data-tab="0">
          <div className="kpi-strip mb-14 grid grid-cols-5 gap-3">
            <div className="kpi glow-ok">
              <div className="kpi-l">Zones Normal (CO₂)</div>
              <div className="kpi-v ok">
                14<span className="kpi-u">/18</span>
              </div>
              <div className="kpi-s">&lt;800 ppm</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Zones Elevated</div>
              <div className="kpi-v warn">3</div>
              <div className="kpi-s">800–1000 ppm</div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Zones Critical</div>
              <div className="kpi-v bad">1</div>
              <div className="kpi-s">&gt;1000 ppm — Floor 5</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Avg PM2.5</div>
              <div className="kpi-v ok">
                14.2<span className="kpi-u">µg/m³</span>
              </div>
              <div className="kpi-s">WHO 24h: &lt;15 ✓</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Avg Humidity</div>
              <div className="kpi-v">
                54<span className="kpi-u">%</span>
              </div>
              <div className="kpi-s">ASHRAE 55 range ✓</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="text-[11.5px] font-semibold text-[var(--ink-1)]">
              Zone-by-Zone IAQ Status — Vikhroli
            </div>
            <div className="iaq-legend flex gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--ok-soft)] border border-[rgba(34,214,122,0.4)] inline-block"></span>
                &lt;800 ppm Good
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--warn-soft)] border border-[rgba(245,180,65,0.4)] inline-block"></span>
                800–1000 Elevated
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--bad-soft)] border border-[rgba(242,91,91,0.4)] inline-block"></span>
                &gt;1000 Critical
              </span>
            </div>
          </div>

          <div className="iaq-zone-grid">
            {/* Zone Cards */}
            <div className="iaq-zone-card alert-bad" id="iaq-zone-f5a">
              <div className="iaq-zone-hd">
                <span className="iaq-zone-name">Floor 5 — Zone A</span>
                <span className="badge badge-red">Critical</span>
              </div>
              <div className="iaq-zone-body">
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO₂</span>
                  <span className="iaq-param-val text-[var(--bad)]">1,148 ppm</span>
                </div>
                <div className="iaq-gauge-bar">
                  <div className="iaq-gauge-fill w-[96%] bg-[var(--bad)]"></div>
                </div>
                <div className="iaq-param-row mt-1.5">
                  <span className="iaq-param-label">PM2.5</span>
                  <span className="iaq-param-val text-[var(--warn)]">18.4 µg/m³</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">TVOC</span>
                  <span className="iaq-param-val">280 ppb</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Humidity</span>
                  <span className="iaq-param-val text-[var(--ok)]">57%</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Temp</span>
                  <span className="iaq-param-val text-[var(--ok)]">23.4 °C</span>
                </div>
                <div className="mt-2 p-1.5 bg-[var(--bad-soft)] border border-[rgba(242,91,91,0.25)] rounded-md text-[10.5px] text-[var(--bad)]">
                  ⚠ DCV triggered — fresh air damper 100%
                </div>
              </div>
            </div>

            <div className="iaq-zone-card alert-warn">
              <div className="iaq-zone-hd">
                <span className="iaq-zone-name">Floor 4 — Conference</span>
                <span className="badge badge-amber">Elevated</span>
              </div>
              <div className="iaq-zone-body">
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO₂</span>
                  <span className="iaq-param-val text-[var(--warn)]">924 ppm</span>
                </div>
                <div className="iaq-gauge-bar">
                  <div className="iaq-gauge-fill w-[77%] bg-[var(--warn)]"></div>
                </div>
                <div className="iaq-param-row mt-1.5">
                  <span className="iaq-param-label">PM2.5</span>
                  <span className="iaq-param-val text-[var(--ok)]">11.2 µg/m³</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">TVOC</span>
                  <span className="iaq-param-val">180 ppb</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Humidity</span>
                  <span className="iaq-param-val text-[var(--ok)]">52%</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Temp</span>
                  <span className="iaq-param-val text-[var(--ok)]">22.8 °C</span>
                </div>
              </div>
            </div>

            <div className="iaq-zone-card alert-warn">
              <div className="iaq-zone-hd">
                <span className="iaq-zone-name">Floor 6 — Open Office B</span>
                <span className="badge badge-amber">Elevated</span>
              </div>
              <div className="iaq-zone-body">
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO₂</span>
                  <span className="iaq-param-val text-[var(--warn)]">870 ppm</span>
                </div>
                <div className="iaq-gauge-bar">
                  <div className="iaq-gauge-fill w-[72%] bg-[var(--warn)]"></div>
                </div>
                <div className="iaq-param-row mt-1.5">
                  <span className="iaq-param-label">PM2.5</span>
                  <span className="iaq-param-val text-[var(--ok)]">9.8 µg/m³</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">TVOC</span>
                  <span className="iaq-param-val text-[var(--ok)]">142 ppb</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Humidity</span>
                  <span className="iaq-param-val text-[var(--ok)]">49%</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Temp</span>
                  <span className="iaq-param-val text-[var(--ok)]">23.1 °C</span>
                </div>
              </div>
            </div>

            <div className="iaq-zone-card">
              <div className="iaq-zone-hd">
                <span className="iaq-zone-name">Floor 3 — Open Office A</span>
                <span className="badge badge-green">Good</span>
              </div>
              <div className="iaq-zone-body">
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO₂</span>
                  <span className="iaq-param-val text-[var(--ok)]">648 ppm</span>
                </div>
                <div className="iaq-gauge-bar">
                  <div className="iaq-gauge-fill w-[54%] bg-[var(--ok)]"></div>
                </div>
                <div className="iaq-param-row mt-1.5">
                  <span className="iaq-param-label">PM2.5</span>
                  <span className="iaq-param-val text-[var(--ok)]">8.1 µg/m³</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">TVOC</span>
                  <span className="iaq-param-val text-[var(--ok)]">110 ppb</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Humidity</span>
                  <span className="iaq-param-val text-[var(--ok)]">51%</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Temp</span>
                  <span className="iaq-param-val text-[var(--ok)]">22.6 °C</span>
                </div>
              </div>
            </div>

            <div className="iaq-zone-card">
              <div className="iaq-zone-hd">
                <span className="iaq-zone-name">Ground — Lobby / Reception</span>
                <span className="badge badge-green">Good</span>
              </div>
              <div className="iaq-zone-body">
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO₂</span>
                  <span className="iaq-param-val text-[var(--ok)]">512 ppm</span>
                </div>
                <div className="iaq-gauge-bar">
                  <div className="iaq-gauge-fill w-[42%] bg-[var(--ok)]"></div>
                </div>
                <div className="iaq-param-row mt-1.5">
                  <span className="iaq-param-label">PM2.5</span>
                  <span className="iaq-param-val text-[var(--ok)]">12.4 µg/m³</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">TVOC</span>
                  <span className="iaq-param-val text-[var(--ok)]">98 ppb</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Humidity</span>
                  <span className="iaq-param-val text-[var(--ok)]">55%</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Temp</span>
                  <span className="iaq-param-val text-[var(--ok)]">24.0 °C</span>
                </div>
              </div>
            </div>

            <div className="iaq-zone-card">
              <div className="iaq-zone-hd">
                <span className="iaq-zone-name">Basement B1 — Parking</span>
                <span className="badge badge-green">Good</span>
              </div>
              <div className="iaq-zone-body">
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO (carbon monoxide)</span>
                  <span className="iaq-param-val text-[var(--ok)]">4.2 ppm</span>
                </div>
                <div className="iaq-gauge-bar">
                  <div className="iaq-gauge-fill w-[8%] bg-[var(--ok)]"></div>
                </div>
                <div className="iaq-param-row mt-1.5">
                  <span className="iaq-param-label">CO Threshold</span>
                  <span className="iaq-param-val text-[var(--ink-3)]">Alarm: 50 ppm</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">CO₂</span>
                  <span className="iaq-param-val text-[var(--ok)]">490 ppm</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">NOₓ</span>
                  <span className="iaq-param-val text-[var(--ok)]">0.04 ppm</span>
                </div>
                <div className="iaq-param-row">
                  <span className="iaq-param-label">Ventilation</span>
                  <span className="iaq-param-val text-[var(--ok)]">Auto — OK</span>
                </div>
              </div>
            </div>
          </div>

          {/* CO₂ Heatmap */}
          <div className="iaq-heatmap-wrap">
            <div className="iaq-heatmap-title">CO₂ Floor Heatmap — Live (ppm) · ASHRAE 62.1 Thresholds</div>
            <div className="grid grid-rows-none gap-1.5">
              <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                <div className="font-mono text-[9.5px] text-[var(--ink-3)]">Floor 7</div>
                <div className="grid grid-cols-6 gap-1">
                  <div className="iaq-cell co2-ok">624</div>
                  <div className="iaq-cell co2-ok">611</div>
                  <div className="iaq-cell co2-ok">648</div>
                  <div className="iaq-cell co2-ok">635</div>
                  <div className="iaq-cell co2-ok">618</div>
                  <div className="iaq-cell co2-ok">602</div>
                </div>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                <div className="font-mono text-[9.5px] text-[var(--ink-3)]">Floor 6</div>
                <div className="grid grid-cols-6 gap-1">
                  <div className="iaq-cell co2-ok">712</div>
                  <div className="iaq-cell co2-warn">845</div>
                  <div className="iaq-cell co2-warn">870</div>
                  <div className="iaq-cell co2-warn">858</div>
                  <div className="iaq-cell co2-ok">780</div>
                  <div className="iaq-cell co2-ok">721</div>
                </div>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                <div className="font-mono text-[9.5px] text-[var(--ink-3)]">Floor 5</div>
                <div className="grid grid-cols-6 gap-1">
                  <div className="iaq-cell co2-bad">1148</div>
                  <div className="iaq-cell co2-bad">1092</div>
                  <div className="iaq-cell co2-warn">944</div>
                  <div className="iaq-cell co2-warn">910</div>
                  <div className="iaq-cell co2-ok">782</div>
                  <div className="iaq-cell co2-ok">748</div>
                </div>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                <div className="font-mono text-[9.5px] text-[var(--ink-3)]">Floor 4</div>
                <div className="grid grid-cols-6 gap-1">
                  <div className="iaq-cell co2-ok">688</div>
                  <div className="iaq-cell co2-warn">924</div>
                  <div className="iaq-cell co2-warn">912</div>
                  <div className="iaq-cell co2-ok">788</div>
                  <div className="iaq-cell co2-ok">742</div>
                  <div className="iaq-cell co2-ok">698</div>
                </div>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                <div className="font-mono text-[9.5px] text-[var(--ink-3)]">Floors 1–3</div>
                <div className="grid grid-cols-6 gap-1">
                  <div className="iaq-cell co2-ok">648</div>
                  <div className="iaq-cell co2-ok">612</div>
                  <div className="iaq-cell co2-ok">620</div>
                  <div className="iaq-cell co2-ok">598</div>
                  <div className="iaq-cell co2-ok">604</div>
                  <div className="iaq-cell co2-ok">618</div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-2.5 text-[10px] text-[var(--ink-3)]">
              <span>
                <span className="inline-block w-3 h-3 rounded-[2px] bg-[rgba(34,214,122,0.2)] border border-[var(--ok)] align-middle mr-1"></span>
                &lt;800 Good
              </span>
              <span>
                <span className="inline-block w-3 h-3 rounded-[2px] bg-[rgba(245,180,65,0.25)] border border-[var(--warn)] align-middle mr-1"></span>
                800–1000 Elevated (DCV activates)
              </span>
              <span>
                <span className="inline-block w-3 h-3 rounded-[2px] bg-[rgba(242,91,91,0.25)] border border-[var(--bad)] align-middle mr-1"></span>
                &gt;1000 Critical (alarm + DCV max)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Compliance Log */}
      {activeTab === 1 && (
        <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="iaq" data-tab="1">          <div className="kpi-strip mb-14 grid grid-cols-4 gap-3">
          <div className="kpi glow-ok">
            <div className="kpi-l">ASHRAE 62.1 Compliance</div>
            <div className="kpi-v ok">
              94<span className="kpi-u">%</span>
            </div>
            <div className="kpi-s">zones in compliance</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">WELL Std v2 — IAQ</div>
            <div className="kpi-v ok">Pass</div>
            <div className="kpi-s">Preconditions met</div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">NBC Part 8 Log</div>
            <div className="kpi-v warn">
              21<span className="kpi-u">days</span>
            </div>
            <div className="kpi-s">of 30d data logged</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">LEED EQ Credit</div>
            <div className="kpi-v ok">
              6<span className="kpi-u">/8 pts</span>
            </div>
            <div className="kpi-s">IAQ management plan</div>
          </div>
        </div>

          <div className="card mb-3">
            <div className="ch flex justify-between items-center p-3 border-b border-gray-700">
              <div>
                <div className="ct font-semibold">
                  IAQ Parameter — ASHRAE 62.1 / WELL v2 Compliance Check
                </div>
              </div>
              <button
                className="ca cursor-pointer flex items-center gap-1 text-xs"
                onClick={() => alert('Downloading compliance report...')}
              >
                <i className="ti ti-download text-[11px]"></i> Export PDF
              </button>
            </div>
            <div className="cb p-0">
              <table className="dt w-full text-left">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>ASHRAE 62.1 Limit</th>
                    <th>WELL v2 Limit</th>
                    <th>Current Avg</th>
                    <th>Worst Zone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>CO₂</b></td>
                    <td>1000 ppm (max)</td>
                    <td>1000 ppm</td>
                    <td className="text-[var(--ok)]">712 ppm</td>
                    <td className="text-[var(--bad)]">1148 ppm (F5A)</td>
                    <td><span className="badge badge-amber">1 Zone Breach</span></td>
                  </tr>
                  <tr>
                    <td><b>PM2.5</b></td>
                    <td>15 µg/m³ (24h)</td>
                    <td>15 µg/m³</td>
                    <td className="text-[var(--ok)]">14.2 µg/m³</td>
                    <td className="text-[var(--warn)]">18.4 µg/m³ (F5A)</td>
                    <td><span className="badge badge-green">Pass (avg)</span></td>
                  </tr>
                  <tr>
                    <td><b>TVOC</b></td>
                    <td>500 ppb</td>
                    <td>500 ppb</td>
                    <td className="text-[var(--ok)]">168 ppb</td>
                    <td className="text-[var(--ok)]">280 ppb</td>
                    <td><span className="badge badge-green">Pass</span></td>
                  </tr>
                  <tr>
                    <td><b>Relative Humidity</b></td>
                    <td>30–60%</td>
                    <td>30–60%</td>
                    <td className="text-[var(--ok)]">54%</td>
                    <td className="text-[var(--ok)]">57%</td>
                    <td><span className="badge badge-green">Pass</span></td>
                  </tr>
                  <tr>
                    <td><b>Temperature</b></td>
                    <td>20–26°C (ASHRAE 55)</td>
                    <td>18–27°C</td>
                    <td className="text-[var(--ok)]">23.2°C</td>
                    <td className="text-[var(--ok)]">24.0°C</td>
                    <td><span className="badge badge-green">Pass</span></td>
                  </tr>
                  <tr>
                    <td><b>CO (Parking)</b></td>
                    <td>25 ppm TWA</td>
                    <td>9 ppm</td>
                    <td className="text-[var(--ok)]">4.2 ppm</td>
                    <td className="text-[var(--ok)]">4.2 ppm</td>
                    <td><span className="badge badge-green">Pass</span></td>
                  </tr>
                  <tr>
                    <td><b>HCHO (Formaldehyde)</b></td>
                    <td>0.1 ppm</td>
                    <td>0.06 ppm</td>
                    <td className="text-[var(--ok)]">0.02 ppm</td>
                    <td className="text-[var(--ok)]">0.03 ppm</td>
                    <td><span className="badge badge-green">Pass</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="g2 grid grid-cols-2 gap-3">
            <div className="card">
              <div className="ch p-3 border-b border-gray-700">
                <div>
                  <div className="ct font-semibold">CO₂ Trend — Floor 5A (Critical Zone)</div>
                  <div className="cs text-xs text-gray-400">Last 12 hours</div>
                </div>
              </div>
              <div className="cb p-3">
                <svg className="chart-svg" viewBox="0 0 420 110">
                  <line x1="0" y1="20" x2="420" y2="20" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="420" y2="50" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="420" y2="80" stroke="var(--line-1)" strokeWidth="0.5" />
                  <line x1="0" y1="55" x2="420" y2="55" stroke="var(--warn)" strokeWidth="1" strokeDasharray="5 3" />
                  <line x1="0" y1="30" x2="420" y2="30" stroke="var(--bad)" strokeWidth="1" strokeDasharray="5 3" />
                  <text x="2" y="19" fontSize="8" fill="var(--ink-3)">1200</text>
                  <text x="2" y="49" fontSize="8" fill="var(--ink-3)">900</text>
                  <text x="2" y="79" fontSize="8" fill="var(--ink-3)">600</text>
                  <text x="350" y="28" fontSize="8" fill="var(--bad)">1000 alarm</text>
                  <text x="350" y="53" fontSize="8" fill="var(--warn)">800 DCV</text>
                  <path d="M30,80 L65,78 L100,72 L135,60 L170,45 L205,38 L240,28 L275,25 L310,27 L345,30 L380,28" fill="none" stroke="var(--bad)" strokeWidth="2.5" />
                  <path d="M30,80 L65,78 L100,72 L135,60 L170,45 L205,38 L240,28 L275,25 L310,27 L345,30 L380,28 L380,110 L30,110 Z" fill="rgba(242,91,91,0.06)" />
                  <text x="30" y="108" fontSize="8" fill="var(--ink-3)">08:00</text>
                  <text x="135" y="108" fontSize="8" fill="var(--ink-3)">10:00</text>
                  <text x="240" y="108" fontSize="8" fill="var(--ink-3)">12:00</text>
                  <text x="345" y="108" fontSize="8" fill="var(--ink-3)">14:00</text>
                </svg>
              </div>
            </div>

            <div className="card">
              <div className="ch p-3 border-b border-gray-700">
                <div>
                  <div className="ct font-semibold">NBC Part 8 Monthly IAQ Log</div>
                  <div className="cs text-xs text-gray-400">Auto-generated · May 2026</div>
                </div>
              </div>
              <div className="cb p-0">
                <table className="dt w-full text-left">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Avg CO₂</th>
                      <th>Avg PM2.5</th>
                      <th>Worst Zone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>27 May</td>
                      <td className="text-[var(--ok)]">712 ppm</td>
                      <td className="text-[var(--warn)]">14.2 µg/m³</td>
                      <td className="text-[var(--bad)]">F5A — 1148</td>
                      <td><span className="badge badge-red">DCV Active</span></td>
                    </tr>
                    <tr>
                      <td>26 May</td>
                      <td className="text-[var(--ok)]">688 ppm</td>
                      <td className="text-[var(--ok)]">11.8 µg/m³</td>
                      <td className="text-[var(--ok)]">F4 — 842</td>
                      <td><span className="badge badge-green">Normal</span></td>
                    </tr>
                    <tr>
                      <td>25 May</td>
                      <td className="text-[var(--ok)]">704 ppm</td>
                      <td className="text-[var(--ok)]">12.1 µg/m³</td>
                      <td className="text-[var(--ok)]">F6 — 888</td>
                      <td><span className="badge badge-green">Normal</span></td>
                    </tr>
                    <tr>
                      <td>24 May</td>
                      <td className="text-[var(--ok)]">664 ppm</td>
                      <td className="text-[var(--ok)]">10.4 µg/m³</td>
                      <td className="text-[var(--ok)]">F4 — 814</td>
                      <td><span className="badge badge-green">Normal</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IaqDashboard;