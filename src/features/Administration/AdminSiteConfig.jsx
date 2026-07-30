import React, { useState } from 'react';
import { showToast } from '../../utils/toast';
const AdminSiteConfig = () => {
  // State for Tabs
  const [activeTab, setActiveTab] = useState(0);

  // State for Collapsible Tree in Tab 1
  const [treeExpanded, setTreeExpanded] = useState({
    site: true,
    towerA: true,
    towerB: true,
    podium: true,
  });

  // State for Collapsible Gateways in Tab 2
  const [openGateways, setOpenGateways] = useState({});

  // Toast / Notification Placeholder
  

  const toggleTreeNode = (key) => {
    setTreeExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGateway = (index) => {
    setOpenGateways((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // States for Range Picker
  const [selectedRange, setSelectedRange] = useState("today"); // 'today', '7d', '30d', 'custom'
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Handler for Range Button Clicks
  const handleRangeChange = (range) => {
    setSelectedRange(range);
    if (range === "custom") {
      setShowCustomPicker((prev) => !prev);
    } else {
      setShowCustomPicker(false);
      // Yahan aap non-custom range change handle kar sakte ho
      console.log("Selected Range:", range);
    }
  };

  const handleApplyCustomRange = () => {
    if (!fromDate || !toDate) {
      showToast("Kripya From aur To dates select karein.");
      return;
    }
    showToast("Custom Range Applied:", { fromDate, toDate });
    setShowCustomPicker(false);
  };

  return (
    <div className="page active" id="pg-adminsite">
      {/* Navigation Tabs Header */}
     <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
      {/* Left Section */}
      <div className="ph-left">
        <div className="live-dot"></div>
        <div>
          <div className="ph-title" id="dash-page-title">
           Site Configuration
          </div>
          <div
            className="ph-sub"
            id="dash-page-sub"
            style={{ fontSize: "10px", color: "var(--ink-3)" }}
          >
           Administration · Profile · Site structure · Gateways & controllers
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ph-tabs" id="dash-tab-bar">
        {["General", "Site Structure", "Gateways & Controllers",].map((tabLabel, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`ph-tab ${activeTab === idx ? "active" : ""}`}
          >
            {tabLabel}
          </div>
        ))}
      </div>

      {/* Range Picker */}
      <div className="range-picker" id="boRangePicker" style={{ position: "relative" }}>
        <span className="rp-label">Range</span>

        <div className="rp-seg">
          <button
            data-range="today"
            className={selectedRange === "today" ? "active" : ""}
            onClick={() => handleRangeChange("today")}
          >
            Today
          </button>

          <button
            data-range="7d"
            className={selectedRange === "7d" ? "active" : ""}
            onClick={() => handleRangeChange("7d")}
          >
            7D
          </button>

          <button
            data-range="30d"
            className={selectedRange === "30d" ? "active" : ""}
            onClick={() => handleRangeChange("30d")}
          >
            30D
          </button>

          <button
            data-range="custom"
            className={selectedRange === "custom" ? "active" : ""}
            onClick={() => handleRangeChange("custom")}
          >
            <i className="ti ti-calendar" style={{ fontSize: "12px", marginRight: "4px" }}></i>
            Custom
          </button>
        </div>

        {/* Custom Date Range Popover */}
        {showCustomPicker && (
          <div
            className="rp-pop"
            id="rpPop"
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "6px",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px",
              background: "#0d1526",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            <label style={{ fontSize: "11px", color: "var(--ink-3)" }}>From</label>
            <input
              type="date"
              id="rpFrom"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />

            <label style={{ fontSize: "11px", color: "var(--ink-3)" }}>To</label>
            <input
              type="date"
              id="rpTo"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />

            <button
              className="rp-apply"
              id="rpApply"
              onClick={handleApplyCustomRange}
              style={{
                marginTop: "4px",
                padding: "6px",
                background: "var(--info, #3b82f6)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Apply range
            </button>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="dash-dl" id="dashDl" style={{ position: "relative" }}>
        <button
          className="dash-dl-btn"
          id="dashDlBtn"
          onClick={() => setShowDownloadMenu(!showDownloadMenu)}
        >
          <i className="ti ti-download"></i>
          Download Reports
          <i
            className="ti ti-chevron-down"
            style={{ fontSize: "12px", opacity: 0.8, marginLeft: "4px" }}
          ></i>
        </button>

        {showDownloadMenu && (
          <div className="dash-dl-menu" style={{ display: "block" }}>
            <div className="dash-dl-h">Quick report downloads</div>

            {/* Energy */}
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
                  if (navTo) navTo("reports");
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
      {/* Tab 0: General Site Configuration */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="adminsite" data-tab="0">
          <div className="adm-cfg-grid">
            {/* Card 1: Site Profile */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i
                      className="ti ti-building"
                      style={{ color: 'var(--info)', marginRight: '6px' }}
                    ></i>
                    Site Profile
                  </div>
                </div>
              </div>
              <div className="cb">
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Site Name</label>
                    <input
                      className="ptw-form-input"
                      defaultValue="Vikhroli Tower — Mumbai"
                    />
                  </div>
                  <div>
                    <label className="ptw-form-label">Site Code</label>
                    <input className="ptw-form-input" defaultValue="BO-VIK-01" />
                  </div>
                </div>
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Address</label>
                    <input
                      className="ptw-form-input"
                      defaultValue="LBS Marg, Vikhroli West, Mumbai 400079"
                    />
                  </div>
                  <div>
                    <label className="ptw-form-label">Building Type</label>
                    <select className="ptw-form-select" defaultValue="Commercial Office">
                      <option>Commercial Office</option>
                      <option>Mixed Use</option>
                      <option>Retail</option>
                      <option>Industrial</option>
                    </select>
                  </div>
                </div>
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Gross Floor Area (m²)</label>
                    <input className="ptw-form-input" defaultValue="84,500" />
                  </div>
                  <div>
                    <label className="ptw-form-label">Floors</label>
                    <input className="ptw-form-input" defaultValue="19 (B2 → Terrace)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Operating Schedule */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i
                      className="ti ti-clock-hour-4"
                      style={{ color: 'var(--ok)', marginRight: '6px' }}
                    ></i>
                    Operating Schedule
                  </div>
                </div>
              </div>
              <div className="cb">
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Weekday Hours</label>
                    <input className="ptw-form-input" defaultValue="08:00 – 20:00" />
                  </div>
                  <div>
                    <label className="ptw-form-label">Saturday</label>
                    <input className="ptw-form-input" defaultValue="09:00 – 14:00" />
                  </div>
                </div>
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Sunday / Holidays</label>
                    <select className="ptw-form-select" defaultValue="Closed (setback mode)">
                      <option>Closed (setback mode)</option>
                      <option>Open</option>
                    </select>
                  </div>
                  <div>
                    <label className="ptw-form-label">Pre-cool Lead Time</label>
                    <input className="ptw-form-input" defaultValue="60 min" />
                  </div>
                </div>
                <label className="ptw-form-label" style={{ marginTop: '6px' }}>
                  Public Holiday Calendar
                </label>
                <select className="ptw-form-select" defaultValue="India — Maharashtra 2026">
                  <option>India — Maharashtra 2026</option>
                  <option>India — National 2026</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            {/* Card 3: Units & Localisation */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i
                      className="ti ti-world"
                      style={{ color: 'var(--cool)', marginRight: '6px' }}
                    ></i>
                    Units &amp; Localisation
                  </div>
                </div>
              </div>
              <div className="cb">
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Unit System</label>
                    <select className="ptw-form-select" defaultValue="Metric (SI)">
                      <option>Metric (SI)</option>
                      <option>Imperial</option>
                    </select>
                  </div>
                  <div>
                    <label className="ptw-form-label">Currency</label>
                    <select className="ptw-form-select" defaultValue="INR — ₹">
                      <option>INR — ₹</option>
                      <option>USD — $</option>
                      <option>EUR — €</option>
                    </select>
                  </div>
                </div>
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Timezone</label>
                    <select className="ptw-form-select" defaultValue="Asia/Kolkata (IST)">
                      <option>Asia/Kolkata (IST)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="ptw-form-label">Language</label>
                    <select className="ptw-form-select" defaultValue="English (India)">
                      <option>English (India)</option>
                      <option>हिन्दी</option>
                      <option>मराठी</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Comfort & Alert Thresholds */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i
                      className="ti ti-adjustments-alt"
                      style={{ color: 'var(--warn)', marginRight: '6px' }}
                    ></i>
                    Comfort &amp; Alert Thresholds
                  </div>
                </div>
              </div>
              <div className="cb">
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Temp Setpoint Band (°C)</label>
                    <input className="ptw-form-input" defaultValue="22 – 25" />
                  </div>
                  <div>
                    <label className="ptw-form-label">CO₂ Alert (ppm)</label>
                    <input className="ptw-form-input" defaultValue="1000" />
                  </div>
                </div>
                <div className="ptw-form-row">
                  <div>
                    <label className="ptw-form-label">Critical Alarm Escalation</label>
                    <input className="ptw-form-input" defaultValue="5 min → FM Manager" />
                  </div>
                  <div>
                    <label className="ptw-form-label">Energy Anomaly Tolerance</label>
                    <input className="ptw-form-input" defaultValue="±15%" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="adm-actionbar">
            <button
              className="btn"
              style={{ padding: '8px 16px' }}
              onClick={() => showToast('Configuration reverted to last saved', 'info')}
            >
              Discard
            </button>
            <button
              className="btn primary"
              style={{ padding: '8px 16px' }}
              onClick={() => showToast('Site configuration saved', 'ok')}
            >
              <i className="ti ti-device-floppy"></i> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Tab 1: Site Structure */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="adminsite" data-tab="1">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            <div className="kpi glow-info">
              <div className="kpi-l">Towers / Wings</div>
              <div className="kpi-v" id="ss-kpi-towers">3</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Total Floors</div>
              <div className="kpi-v" id="ss-kpi-floors">36</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Blocks / Areas</div>
              <div className="kpi-v ok" id="ss-kpi-blocks">70</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Gateways</div>
              <div className="kpi-v ok" id="ss-kpi-gws">6</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Controllers</div>
              <div className="kpi-v" id="ss-kpi-ctrls">11</div>
            </div>
          </div>

          <div className="dt-split">
            <div>
              <div className="card mb-14">
                <div className="ch">
                  <div>
                    <div className="ct">Towers &amp; Wings</div>
                    <div className="cs">Define the physical structure of the site</div>
                  </div>
                  <button
                    className="btn primary"
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                    onClick={() => alert('Add Tower / Wing clicked')}
                  >
                    <i className="ti ti-plus"></i>Add Tower / Wing
                  </button>
                </div>
                <div className="cb">
                  <div id="ss-tower-cards">
                    {/* Tower A */}
                    <div className="ss-tower">
                      <div className="ss-tower-h">
                        <span className="ss-tower-ico"><i className="ti ti-building-skyscraper"></i></span>
                        <span className="ss-tower-name">Tower A</span>
                        <span className="ss-tower-meta">19 floors · 30 blocks</span>
                      </div>
                      <div className="ss-blocks">
                        <span className="ss-bchip"><i className="ti ti-door-enter" style={{ color: '#2A6FDB' }}></i>Lobby <b>1</b></span>
                        <span className="ss-bchip"><i className="ti ti-building" style={{ color: '#1F8A5B' }}></i>Offices <b>14</b></span>
                        <span className="ss-bchip"><i className="ti ti-settings-bolt" style={{ color: '#B8842A' }}></i>Equipment Room <b>4</b></span>
                        <span className="ss-bchip"><i className="ti ti-users" style={{ color: '#9B59B6' }}></i>Common Area <b>8</b></span>
                        <span className="ss-bchip"><i className="ti ti-car" style={{ color: '#0B9EBB' }}></i>Parking <b>3</b></span>
                        <button className="ss-tower-add" onClick={() => alert('Add block to Tower A')}>
                          <i className="ti ti-plus"></i> block
                        </button>
                      </div>
                    </div>

                    {/* Tower B */}
                    <div className="ss-tower">
                      <div className="ss-tower-h">
                        <span className="ss-tower-ico"><i className="ti ti-building-skyscraper"></i></span>
                        <span className="ss-tower-name">Tower B</span>
                        <span className="ss-tower-meta">14 floors · 22 blocks</span>
                      </div>
                      <div className="ss-blocks">
                        <span className="ss-bchip"><i className="ti ti-door-enter" style={{ color: '#2A6FDB' }}></i>Lobby <b>1</b></span>
                        <span className="ss-bchip"><i className="ti ti-building" style={{ color: '#1F8A5B' }}></i>Offices <b>11</b></span>
                        <span className="ss-bchip"><i className="ti ti-settings-bolt" style={{ color: '#B8842A' }}></i>Equipment Room <b>3</b></span>
                        <span className="ss-bchip"><i className="ti ti-users" style={{ color: '#9B59B6' }}></i>Common Area <b>5</b></span>
                        <span className="ss-bchip"><i className="ti ti-car" style={{ color: '#0B9EBB' }}></i>Parking <b>2</b></span>
                        <button className="ss-tower-add" onClick={() => alert('Add block to Tower B')}>
                          <i className="ti ti-plus"></i> block
                        </button>
                      </div>
                    </div>

                    {/* Podium Block */}
                    <div className="ss-tower">
                      <div className="ss-tower-h">
                        <span className="ss-tower-ico"><i className="ti ti-building-skyscraper"></i></span>
                        <span className="ss-tower-name">Podium Block</span>
                        <span className="ss-tower-meta">3 floors · 18 blocks</span>
                      </div>
                      <div className="ss-blocks">
                        <span className="ss-bchip"><i className="ti ti-building-store" style={{ color: '#D1603A' }}></i>Retail <b>12</b></span>
                        <span className="ss-bchip"><i className="ti ti-users" style={{ color: '#9B59B6' }}></i>Common Area <b>4</b></span>
                        <span className="ss-bchip"><i className="ti ti-car" style={{ color: '#0B9EBB' }}></i>Parking <b>2</b></span>
                        <button className="ss-tower-add" onClick={() => alert('Add block to Podium')}>
                          <i className="ti ti-plus"></i> block
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Block / Area Types */}
              <div className="card">
                <div className="ch">
                  <div>
                    <div className="ct">Block / Area Types</div>
                    <div className="cs">Standard space categories used across all floors</div>
                  </div>
                </div>
                <div className="cb">
                  <div className="ss-blocktypes" id="ss-blocktypes">
                    <div className="ss-bt">
                      <span className="ss-bt-ico" style={{ background: 'color-mix(in srgb, #2A6FDB 16%, transparent)', color: '#2A6FDB' }}>
                        <i className="ti ti-door-enter"></i>
                      </span>
                      <div><b>Lobby</b><span>2 across site</span></div>
                    </div>
                    <div className="ss-bt">
                      <span className="ss-bt-ico" style={{ background: 'color-mix(in srgb, #1F8A5B 16%, transparent)', color: '#1F8A5B' }}>
                        <i className="ti ti-building"></i>
                      </span>
                      <div><b>Offices</b><span>25 across site</span></div>
                    </div>
                    <div className="ss-bt">
                      <span className="ss-bt-ico" style={{ background: 'color-mix(in srgb, #B8842A 16%, transparent)', color: '#B8842A' }}>
                        <i className="ti ti-settings-bolt"></i>
                      </span>
                      <div><b>Equipment Room</b><span>7 across site</span></div>
                    </div>
                    <div className="ss-bt">
                      <span className="ss-bt-ico" style={{ background: 'color-mix(in srgb, #9B59B6 16%, transparent)', color: '#9B59B6' }}>
                        <i className="ti ti-users"></i>
                      </span>
                      <div><b>Common Area</b><span>17 across site</span></div>
                    </div>
                    <div className="ss-bt">
                      <span className="ss-bt-ico" style={{ background: 'color-mix(in srgb, #0B9EBB 16%, transparent)', color: '#0B9EBB' }}>
                        <i className="ti ti-car"></i>
                      </span>
                      <div><b>Parking</b><span>7 across site</span></div>
                    </div>
                    <div className="ss-bt">
                      <span className="ss-bt-ico" style={{ background: 'color-mix(in srgb, #D1603A 16%, transparent)', color: '#D1603A' }}>
                        <i className="ti ti-building-store"></i>
                      </span>
                      <div><b>Retail</b><span>12 across site</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree View */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Structure Tree</div>
                  <div className="cs">Site → Tower → Floors → Blocks</div>
                </div>
              </div>
              <div className="cb">
                <div className="ss-tree" id="ss-structure-tree">
                  <div className="ss-tnode">
                    <div className="ss-trow clk" onClick={() => toggleTreeNode('site')}>
                      <i className={`ti ti-chevron-${treeExpanded.site ? 'down' : 'right'} ss-tcaret`}></i>
                      <i className="ti ti-map-pin" style={{ color: 'var(--info)' }}></i>
                      <span className="ss-tlabel"><b>Vikhroli Tower — Mumbai</b></span>
                      <span className="ss-ttag">SITE</span>
                    </div>

                    {treeExpanded.site && (
                      <div className="ss-tchildren">
                        {/* Tower A Node */}
                        <div className="ss-tnode">
                          <div className="ss-trow clk" onClick={() => toggleTreeNode('towerA')}>
                            <i className={`ti ti-chevron-${treeExpanded.towerA ? 'down' : 'right'} ss-tcaret`}></i>
                            <i className="ti ti-building-skyscraper" style={{ color: 'var(--ok)' }}></i>
                            <span className="ss-tlabel"><b>Tower A</b></span>
                            <span className="ss-ttag">19F</span>
                          </div>
                          {treeExpanded.towerA && (
                            <div className="ss-tchildren">
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-stack-2" style={{ color: 'var(--cool)' }}></i><span className="ss-tlabel">19 floors (B → Terrace)</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-door-enter" style={{ color: '#2A6FDB' }}></i><span className="ss-tlabel">Lobby</span><span className="ss-ttag">×1</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-building" style={{ color: '#1F8A5B' }}></i><span className="ss-tlabel">Offices</span><span className="ss-ttag">×14</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-settings-bolt" style={{ color: '#B8842A' }}></i><span className="ss-tlabel">Equipment Room</span><span className="ss-ttag">×4</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-users" style={{ color: '#9B59B6' }}></i><span className="ss-tlabel">Common Area</span><span className="ss-ttag">×8</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-car" style={{ color: '#0B9EBB' }}></i><span className="ss-tlabel">Parking</span><span className="ss-ttag">×3</span></div></div>
                            </div>
                          )}
                        </div>

                        {/* Tower B Node */}
                        <div className="ss-tnode">
                          <div className="ss-trow clk" onClick={() => toggleTreeNode('towerB')}>
                            <i className={`ti ti-chevron-${treeExpanded.towerB ? 'down' : 'right'} ss-tcaret`}></i>
                            <i className="ti ti-building-skyscraper" style={{ color: 'var(--ok)' }}></i>
                            <span className="ss-tlabel"><b>Tower B</b></span>
                            <span className="ss-ttag">14F</span>
                          </div>
                          {treeExpanded.towerB && (
                            <div className="ss-tchildren">
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-stack-2" style={{ color: 'var(--cool)' }}></i><span className="ss-tlabel">14 floors (B → Terrace)</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-door-enter" style={{ color: '#2A6FDB' }}></i><span className="ss-tlabel">Lobby</span><span className="ss-ttag">×1</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-building" style={{ color: '#1F8A5B' }}></i><span className="ss-tlabel">Offices</span><span className="ss-ttag">×11</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-settings-bolt" style={{ color: '#B8842A' }}></i><span className="ss-tlabel">Equipment Room</span><span className="ss-ttag">×3</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-users" style={{ color: '#9B59B6' }}></i><span className="ss-tlabel">Common Area</span><span className="ss-ttag">×5</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-car" style={{ color: '#0B9EBB' }}></i><span className="ss-tlabel">Parking</span><span className="ss-ttag">×2</span></div></div>
                            </div>
                          )}
                        </div>

                        {/* Podium Block Node */}
                        <div className="ss-tnode">
                          <div className="ss-trow clk" onClick={() => toggleTreeNode('podium')}>
                            <i className={`ti ti-chevron-${treeExpanded.podium ? 'down' : 'right'} ss-tcaret`}></i>
                            <i className="ti ti-building-skyscraper" style={{ color: 'var(--ok)' }}></i>
                            <span className="ss-tlabel"><b>Podium Block</b></span>
                            <span className="ss-ttag">3F</span>
                          </div>
                          {treeExpanded.podium && (
                            <div className="ss-tchildren">
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-stack-2" style={{ color: 'var(--cool)' }}></i><span className="ss-tlabel">3 floors (B → Terrace)</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-building-store" style={{ color: '#D1603A' }}></i><span className="ss-tlabel">Retail</span><span className="ss-ttag">×12</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-users" style={{ color: '#9B59B6' }}></i><span className="ss-tlabel">Common Area</span><span className="ss-ttag">×4</span></div></div>
                              <div className="ss-tnode"><div className="ss-trow"><span style={{ width: '13px' }}></span><i className="ti ti-car" style={{ color: '#0B9EBB' }}></i><span className="ss-tlabel">Parking</span><span className="ss-ttag">×2</span></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="api-sync-banner" style={{ marginTop: '14px', marginBottom: 0 }}>
            <i className="ti ti-bulb"></i>
            <div>
              <b>Setup workflow.</b> 1) Define towers/wings &amp; floors → 2) add blocks/areas per floor → 3) go to <b>Gateways &amp; Controllers</b> to place a gateway in each block and map its controllers. New towers, floors or blocks can be added any time — the gateway tree expands automatically for future growth.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gateways & Controllers */}
      {activeTab === 2 && (
        <div className="tab-panel active" data-page="adminsite" data-tab="2">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="kpi glow-ok"><div className="kpi-l">Gateways Online</div><div className="kpi-v ok" id="gw-kpi-online">4</div></div>
            <div className="kpi glow-bad"><div className="kpi-l">Gateways Offline</div><div className="kpi-v bad" id="gw-kpi-offline">1</div></div>
            <div className="kpi glow-info"><div className="kpi-l">Controllers Mapped</div><div className="kpi-v" id="gw-kpi-ctrls">11</div></div>
            <div className="kpi glow-ok"><div className="kpi-l">Data Points</div><div className="kpi-v ok" id="gw-kpi-points">508</div></div>
          </div>

          <div className="gw-toolbar">
            <div className="gw-legend">
              <span><span className="gw-dot" style={{ background: 'var(--ok)' }}></span>Online</span>
              <span><span className="gw-dot" style={{ background: 'var(--warn)' }}></span>Degraded</span>
              <span><span className="gw-dot" style={{ background: 'var(--bad)' }}></span>Offline</span>
            </div>
            <button
              className="btn primary"
              style={{ padding: '7px 13px', fontSize: '11px' }}
              onClick={() => alert('Add Gateway Clicked')}
            >
              <i className="ti ti-router"></i>Add Gateway
            </button>
          </div>

          <div id="gw-tree">
            {/* Tower A Gateways */}
            <div className="gw-tower">
              <div className="gw-tower-h"><i className="ti ti-building-skyscraper"></i>Tower A · 3 gateways</div>

              {/* GW 0 */}
              <div className="gw-card" id="gwc-0">
                <div className="gw-card-h" onClick={() => toggleGateway(0)}>
                  <span className="gw-ico" style={{ color: 'var(--ok)' }}><i className="ti ti-router"></i></span>
                  <span className="gw-tx"><b>GW-A-B2-01</b><span>B2 · Parking · 2 controllers · 142 pts</span></span>
                  <span className="gw-meta">
                    <span className="gw-proto">BACnet/IP</span>
                    <span className="badge badge-green">Online</span>
                    <i className={`ti ti-chevron-${openGateways[0] ? 'up' : 'down'} gw-caret`}></i>
                  </span>
                </div>
                {openGateways[0] && (
                  <div className="gw-ctrls">
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Ventilation DDC</b> <span>CTL-VEN-A-01 · MSTP-12</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Lighting Controller</b> <span>CTL-LTG-A-01 · BACnet-1041</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <button className="gw-addctrl" onClick={() => alert('Map controller to GW-A-B2-01')}><i className="ti ti-plus"></i> Map controller</button>
                  </div>
                )}
              </div>

              {/* GW 1 */}
              <div className="gw-card" id="gwc-1">
                <div className="gw-card-h" onClick={() => toggleGateway(1)}>
                  <span className="gw-ico" style={{ color: 'var(--ok)' }}><i className="ti ti-router"></i></span>
                  <span className="gw-tx"><b>GW-A-GF-01</b><span>Ground · Lobby · 2 controllers · 96 pts</span></span>
                  <span className="gw-meta">
                    <span className="gw-proto">BACnet/IP</span>
                    <span className="badge badge-green">Online</span>
                    <i className={`ti ti-chevron-${openGateways[1] ? 'up' : 'down'} gw-caret`}></i>
                  </span>
                </div>
                {openGateways[1] && (
                  <div className="gw-ctrls">
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>AHU Controller</b> <span>CTL-AHU-A-01 · MSTP-03</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Access Controller</b> <span>CTL-ACC-A-01 · TCP-8002</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <button className="gw-addctrl" onClick={() => alert('Map controller to GW-A-GF-01')}><i className="ti ti-plus"></i> Map controller</button>
                  </div>
                )}
              </div>

              {/* GW 2 */}
              <div className="gw-card" id="gwc-2">
                <div className="gw-card-h" onClick={() => toggleGateway(2)}>
                  <span className="gw-ico" style={{ color: 'var(--warn)' }}><i className="ti ti-router"></i></span>
                  <span className="gw-tx"><b>GW-A-07-01</b><span>Floor 7 · Equipment Rm · 2 controllers · 64 pts</span></span>
                  <span className="gw-meta">
                    <span className="gw-proto">Modbus TCP</span>
                    <span className="badge badge-amber">Degraded</span>
                    <i className={`ti ti-chevron-${openGateways[2] ? 'up' : 'down'} gw-caret`}></i>
                  </span>
                </div>
                {openGateways[2] && (
                  <div className="gw-ctrls">
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>FCU Controller</b> <span>CTL-FCU-A-07 · Modbus-21</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Energy Meter</b> <span>CTL-EM-A-07 · Modbus-22</span></div><span className="badge badge-amber" style={{ fontSize: '9px' }}>Degraded</span></div>
                    <button className="gw-addctrl" onClick={() => alert('Map controller to GW-A-07-01')}><i className="ti ti-plus"></i> Map controller</button>
                  </div>
                )}
              </div>
            </div>

            {/* Tower B Gateways */}
            <div className="gw-tower">
              <div className="gw-tower-h"><i className="ti ti-building-skyscraper"></i>Tower B · 2 gateways</div>

              {/* GW 3 */}
              <div className="gw-card" id="gwc-3">
                <div className="gw-card-h" onClick={() => toggleGateway(3)}>
                  <span className="gw-ico" style={{ color: 'var(--ok)' }}><i className="ti ti-router"></i></span>
                  <span className="gw-tx"><b>GW-B-B1-01</b><span>B1 · Equipment Rm · 2 controllers · 118 pts</span></span>
                  <span className="gw-meta">
                    <span className="gw-proto">BACnet/IP</span>
                    <span className="badge badge-green">Online</span>
                    <i className={`ti ti-chevron-${openGateways[3] ? 'up' : 'down'} gw-caret`}></i>
                  </span>
                </div>
                {openGateways[3] && (
                  <div className="gw-ctrls">
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Chiller Controller</b> <span>CTL-CHL-B-01 · MSTP-05</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Pump VFD</b> <span>CTL-PMP-B-01 · Modbus-31</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <button className="gw-addctrl" onClick={() => alert('Map controller to GW-B-B1-01')}><i className="ti ti-plus"></i> Map controller</button>
                  </div>
                )}
              </div>

              {/* GW 4 */}
              <div className="gw-card" id="gwc-4">
                <div className="gw-card-h" onClick={() => toggleGateway(4)}>
                  <span className="gw-ico" style={{ color: 'var(--bad)' }}><i className="ti ti-router"></i></span>
                  <span className="gw-tx"><b>GW-B-10-01</b><span>Floor 10 · Common · 1 controllers · 0 pts</span></span>
                  <span className="gw-meta">
                    <span className="gw-proto">MQTT</span>
                    <span className="badge badge-red">Offline</span>
                    <i className={`ti ti-chevron-${openGateways[4] ? 'up' : 'down'} gw-caret`}></i>
                  </span>
                </div>
                {openGateways[4] && (
                  <div className="gw-ctrls">
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>IAQ Sensor Hub</b> <span>CTL-IAQ-B-10 · mqtt/b10</span></div><span className="badge badge-red" style={{ fontSize: '9px' }}>Offline</span></div>
                    <button className="gw-addctrl" onClick={() => alert('Map controller to GW-B-10-01')}><i className="ti ti-plus"></i> Map controller</button>
                  </div>
                )}
              </div>
            </div>

            {/* Podium Gateways */}
            <div className="gw-tower">
              <div className="gw-tower-h"><i className="ti ti-building-skyscraper"></i>Podium Block · 1 gateway</div>

              {/* GW 5 */}
              <div className="gw-card" id="gwc-5">
                <div className="gw-card-h" onClick={() => toggleGateway(5)}>
                  <span className="gw-ico" style={{ color: 'var(--ok)' }}><i className="ti ti-router"></i></span>
                  <span className="gw-tx"><b>GW-P-GF-01</b><span>Podium · Retail · 2 controllers · 88 pts</span></span>
                  <span className="gw-meta">
                    <span className="gw-proto">BACnet/IP</span>
                    <span className="badge badge-green">Online</span>
                    <i className={`ti ti-chevron-${openGateways[5] ? 'up' : 'down'} gw-caret`}></i>
                  </span>
                </div>
                {openGateways[5] && (
                  <div className="gw-ctrls">
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>AHU Controller</b> <span>CTL-AHU-P-01 · MSTP-08</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <div className="gw-ctrl"><span className="gw-ctrl-ico"><i className="ti ti-cpu"></i></span><div style={{ flex: 1 }}><b>Lighting Controller</b> <span>CTL-LTG-P-01 · BACnet-1102</span></div><span className="badge badge-green" style={{ fontSize: '9px' }}>Online</span></div>
                    <button className="gw-addctrl" onClick={() => alert('Map controller to GW-P-GF-01')}><i className="ti ti-plus"></i> Map controller</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSiteConfig;