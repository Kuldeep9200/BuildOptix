import React, { useState } from 'react';

// --- DATA DEFINITIONS ---

const SECURITY_KPIS = [
  {
    id: 'score',
    label: 'Security Score',
    value: 'A−',
    sub: '87 / 100',
    type: 'ok',
    glowClass: 'glow-ok',
  },
  {
    id: 'mfa',
    label: 'MFA Coverage',
    value: '92',
    unit: '%',
    type: 'ok',
    glowClass: 'glow-ok',
  },
  {
    id: 'patch',
    label: 'Patch Compliance',
    value: '88',
    unit: '%',
    sub: '4 devices pending',
    type: 'warn',
    glowClass: 'glow-warn',
  },
  {
    id: 'cert',
    label: 'Cert Expiry',
    value: '23',
    unit: 'd',
    sub: 'api.buildoptix.in',
    type: 'warn',
    glowClass: 'glow-warn',
  },
  {
    id: 'vuln',
    label: 'Open Vulnerabilities',
    value: '2',
    sub: '1 high · 1 medium',
    type: 'bad',
    glowClass: 'glow-bad',
  },
];

const CONTROL_POSTURE_DATA = [
  {
    id: 'mfa',
    icon: 'ti-lock-access',
    title: 'Multi-Factor Authentication',
    subtitle: '92% of users enrolled · 4 pending',
    status: 'Review',
    badgeClass: 'badge-amber',
    iconColor: 'var(--warn)',
  },
  {
    id: 'network',
    icon: 'ti-network',
    title: 'Network Segmentation (OT/IT)',
    subtitle: 'BMS/OT on isolated VLAN · firewall enforced',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
  {
    id: 'endpoint',
    icon: 'ti-device-desktop-check',
    title: 'Endpoint Protection',
    subtitle: 'All gateways & servers protected & reporting',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
  {
    id: 'tls',
    icon: 'ti-certificate',
    title: 'TLS Certificates',
    subtitle: 'api.buildoptix.in expires in 23 days — renew',
    status: 'Review',
    badgeClass: 'badge-amber',
    iconColor: 'var(--warn)',
  },
  {
    id: 'patch',
    icon: 'ti-download',
    title: 'Patch Management',
    subtitle: '88% compliant · 4 edge devices pending firmware',
    status: 'Review',
    badgeClass: 'badge-amber',
    iconColor: 'var(--warn)',
  },
  {
    id: 'backups',
    icon: 'ti-database-export',
    title: 'Encrypted Backups',
    subtitle: 'Daily · last verified restore 2 days ago',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
  {
    id: 'audit',
    icon: 'ti-history',
    title: 'Audit Logging',
    subtitle: 'All admin actions logged & immutable (90-day retention)',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
];

const SECURITY_EVENTS_DATA = [
  {
    id: 1,
    time: '09:42',
    event: 'Successful login',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'Sandeep Rao',
    ip: '103.21.x.x',
    action: '—',
  },
  {
    id: 2,
    time: '09:18',
    event: 'MFA challenge passed',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'Rajan Mehta',
    ip: '103.21.x.x',
    action: '—',
  },
  {
    id: 3,
    time: '08:55',
    event: 'Firewall blocked port scan',
    severity: 'Warning',
    badgeClass: 'badge-amber',
    source: 'Perimeter FW',
    ip: '198.51.x.x',
    action: 'Auto-blocked',
  },
  {
    id: 4,
    time: '08:30',
    event: 'Role changed → Senior Engineer',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'admin',
    ip: '—',
    action: 'Audited',
  },
  {
    id: 5,
    time: 'Yesterday',
    event: '3 failed logins (lockout)',
    severity: 'Warning',
    badgeClass: 'badge-amber',
    source: 'unknown',
    ip: '45.13.x.x',
    action: 'Account locked',
  },
  {
    id: 6,
    time: 'Yesterday',
    event: 'New API key issued',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'Sandeep Rao',
    ip: '—',
    action: 'BMS Gateway',
  },
  {
    id: 7,
    time: '2 days',
    event: 'Firmware update applied',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'System',
    ip: '—',
    action: '12 devices',
  },
  {
    id: 8,
    time: '2 days',
    event: 'Vulnerability scan completed',
    severity: 'Warning',
    badgeClass: 'badge-amber',
    source: 'Scanner',
    ip: '—',
    action: '2 findings',
  },
];

// --- MAIN COMPONENT ---

export const AdminSecurity = () => {
  const [activeTab, setActiveTab] = useState(0);
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
      alert("Kripya From aur To dates select karein.");
      return;
    }
    console.log("Custom Range Applied:", { fromDate, toDate });
    setShowCustomPicker(false);
  };
  return (
    <div className="page active" id="pg-adminsecurity">
      {/* Optional Tab Navigation Bar */}
     <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
      {/* Left Section */}
      <div className="ph-left">
        <div className="live-dot"></div>
        <div>
          <div className="ph-title" id="dash-page-title">
            Cybersecurity
          </div>
          <div
            className="ph-sub"
            id="dash-page-sub"
            style={{ fontSize: "10px", color: "var(--ink-3)" }}
          >
            Administration · Security posture · IEC 62443 · Access & threats
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ph-tabs" id="dash-tab-bar">
        {["Security Posture", "Event Log"].map((tabLabel, idx) => (
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
      {/* Tab 0: Security Posture */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="adminsecurity" data-tab="0">
          {/* KPI Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
            {SECURITY_KPIS.map((kpi) => (
              <div key={kpi.id} className={`kpi ${kpi.glowClass}`}>
                <div className="kpi-l">{kpi.label}</div>
                <div className={`kpi-v ${kpi.type}`}>
                  {kpi.value}
                  {kpi.unit && <span className="kpi-u">{kpi.unit}</span>}
                </div>
                {kpi.sub && <div className="kpi-s">{kpi.sub}</div>}
              </div>
            ))}
          </div>

          {/* Control Posture Card */}
          <div className="card mb-14">
            <div className="ch">
              <div>
                <div className="ct">Control Posture</div>
                <div className="cs">IEC 62443 · ISO 27001 aligned</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="adm-sec-controls">
                {CONTROL_POSTURE_DATA.map((row) => (
                  <div key={row.id} className="adm-sec-row">
                    <span
                      className="adm-sec-ico"
                      style={{
                        background: `color-mix(in srgb, ${row.iconColor} 16%, transparent)`,
                        color: row.iconColor,
                      }}
                    >
                      <i className={`ti ${row.icon}`}></i>
                    </span>
                    <span className="adm-sec-tx">
                      <b>{row.title}</b>
                      <span>{row.subtitle}</span>
                    </span>
                    <span className={`badge ${row.badgeClass}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Event Log */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="adminsecurity" data-tab="1">
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Security Event Log</div>
                <div className="cs">Authentication, access and threat events</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="adm-sec-events">
                <table className="adm-tbl">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Event</th>
                      <th>Severity</th>
                      <th>Source</th>
                      <th>IP</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SECURITY_EVENTS_DATA.map((evt) => (
                      <tr key={evt.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>
                          {evt.time}
                        </td>
                        <td>
                          <b>{evt.event}</b>
                        </td>
                        <td>
                          <span className={`badge ${evt.badgeClass}`}>{evt.severity}</span>
                        </td>
                        <td>{evt.source}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>
                          {evt.ip}
                        </td>
                        <td>{evt.action}</td>
                      </tr>
                    ))}
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

export default AdminSecurity;