import React, { useState, useMemo } from 'react';

// --- DATA DEFINITIONS ---
const TYPOGRAPHY_SAMPLES = [
  {
    label: 'Page title',
    spec: '24px · 700 · -.4px',
    sample: 'Building Operations',
    style: { fontSize: '24px', fontWeight: 700, letterSpacing: '-.4px' },
  },
  {
    label: 'Section title',
    spec: '15px · 700',
    sample: 'Live Parameters',
    style: { fontSize: '15px', fontWeight: 700 },
  },
  {
    label: 'Card title (.ct)',
    spec: '13px · 600',
    sample: 'Control Posture',
    style: { fontSize: '13px', fontWeight: 600 },
  },
  {
    label: 'Body',
    spec: '12.5px · 400',
    sample: 'The quick brown fox jumps over the lazy dog.',
    style: { fontSize: '12.5px' },
  },
  {
    label: 'Label / caption',
    spec: '10px · 600 · upper',
    sample: 'SITE ACCESS',
    style: {
      fontSize: '10px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      color: 'var(--ink-3)',
    },
  },
  {
    label: 'Data — mono',
    spec: '12px · 500',
    sample: 'SAC-203 · 24.2°C · 01:45',
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      fontWeight: 500,
      color: 'var(--cool)',
    },
  },
];

const COLOR_GROUPS = [
  {
    title: 'Brand',
    description: 'Copper-amber — navigation, emphasis & primary actions',
    swatches: [
      { name: '--brand', val: '#EE9A3A', label: 'Brand' },
      { name: '--brand-bright', val: '#FFB857', label: 'Brand bright' },
      { name: '--brand-deep', val: '#C56E22', label: 'Brand deep' },
      { name: '--gold', val: '#EE9A3A', label: 'Gold' },
    ],
  },
  {
    title: 'Status',
    description: 'Carry meaning — OK · warning · fault · information',
    swatches: [
      { name: '--ok', val: '#27DD83', label: 'Success / On' },
      { name: '--warn', val: '#FFB23E', label: 'Warning' },
      { name: '--bad', val: '#FF5C5C', label: 'Fault / Off' },
      { name: '--info', val: '#5AA6FF', label: 'Information' },
    ],
  },
  {
    title: 'Accents',
    description: 'Categorical & data-viz accents',
    swatches: [
      { name: '--cool', val: '#34D2E6', label: 'Cool' },
      { name: '--hot', val: '#FF8A4C', label: 'Hot' },
      { name: '--violet', val: '#9B6CFF', label: 'Violet' },
      { name: '--solar', val: '#FFD66B', label: 'Solar' },
      { name: '--magenta', val: '#E371C9', label: 'Magenta' },
      { name: '--green', val: '#5DBB63', label: 'Green' },
      { name: '--ai', val: '#A78BFA', label: 'AI' },
    ],
  },
  {
    title: 'Text — Ink',
    description: 'Foreground scale, ink-0 (strongest) → ink-4 (faintest)',
    swatches: [
      { name: '--ink-0', val: '#F5F9FF', label: 'Primary' },
      { name: '--ink-1', val: '#DEE6F2', label: 'Secondary' },
      { name: '--ink-2', val: '#98A6BE', label: 'Muted' },
      { name: '--ink-3', val: '#6C7C95', label: 'Subtle' },
      { name: '--ink-4', val: '#4E5C75', label: 'Faint' },
    ],
  },
  {
    title: 'Surfaces & Background',
    description: 'Canvas and elevated surfaces',
    swatches: [
      { name: '--bg-0', val: '#070D18', label: 'Canvas' },
      { name: '--bg-1', val: '#0A1320', label: 'Base' },
      { name: '--bg-2', val: '#0E1A2A', label: 'Raised' },
      { name: '--surface-1', val: '#16243C', label: 'Surface 1' },
      { name: '--surface-2', val: '#1C2E4A', label: 'Surface 2' },
      { name: '--surface-3', val: '#243757', label: 'Surface 3' },
    ],
  },
  {
    title: 'Lines',
    description: 'Hairline borders & dividers',
    swatches: [
      { name: '--line-1', val: 'rgba(255,255,255,0.06)', label: 'Line 1' },
      { name: '--line-2', val: 'rgba(255,255,255,0.10)', label: 'Line 2' },
      { name: '--line-3', val: 'rgba(255,255,255,0.16)', label: 'Line 3' },
    ],
  },
];
const DESIGN_PRINCIPLES = [
  {
    id: 'dark-first',
    icon: 'ti-moon',
    color: 'var(--info)',
    title: 'Dark-first console',
    description: (
      <>
        Deep cool canvas (<code>--bg-0</code> → <code>--bg-2</code>) with surfaces that lift off the page. A light theme mirrors every token.
      </>
    ),
  },
  {
    id: 'status-color',
    icon: 'ti-traffic-lights',
    color: 'var(--ok)',
    title: 'Status-driven colour',
    description: (
      <>
        Colour carries meaning — green/amber/red for OK·warn·fault. Brand copper-amber is reserved for navigation &amp; emphasis.
      </>
    ),
  },
  {
    id: 'calm-geometry',
    icon: 'ti-square-rounded',
    color: 'var(--brand)',
    title: 'Calm geometry',
    description: (
      <>
        8px base radius (<code>--radius</code>), 10px for cards. Hairline borders, soft inner highlights, restrained shadows.
      </>
    ),
  },
  {
    id: 'mono-data',
    icon: 'ti-decimal',
    color: 'var(--cool)',
    title: 'Mono for data',
    description:
      'JetBrains Mono for every number, ID, timestamp and code value — so tabular data lines up and reads precisely.',
  },
];

const FOUNDATIONS = [
  { key: 'Primary type', val: 'Inter' },
  { key: 'Data / mono type', val: 'JetBrains Mono' },
  { key: 'Base radius', val: '8px' },
  { key: 'Card radius', val: '10px' },
  {
    key: 'Brand accent',
    val: (
      <>
        <span
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '4px',
            background: 'var(--brand)',
            display: 'inline-block',
            border: '1px solid var(--line-2)',
            marginRight: '6px',
            verticalAlign: 'middle',
          }}
        ></span>
        Copper-amber
      </>
    ),
  },
  { key: 'Sidebar width', val: '220px' },
  { key: 'Icon set', val: 'Tabler Icons 3.22.0' },
];

const ICON_GROUPS = [
  {
    category: 'Navigation & Modules',
    icons: [
      'ti-layout-dashboard',
      'ti-building-skyscraper',
      'ti-stack-2',
      'ti-cube-3d-sphere',
      'ti-broadcast',
      'ti-bolt',
      'ti-air-conditioning',
      'ti-temperature',
      'ti-droplet',
      'ti-wave-square',
      'ti-shield-lock',
      'ti-users-group',
      'ti-api',
      'ti-color-swatch',
      'ti-settings-cog',
      'ti-adjustments-cog',
      'ti-plug-connected',
      'ti-file-certificate',
      'ti-clipboard-list',
      'ti-calendar',
      'ti-report',
      'ti-building-store',
      'ti-map-pin',
    ],
  },
  {
    category: 'Status & Alerts',
    icons: [
      'ti-circle-check',
      'ti-alert-triangle',
      'ti-alert-circle',
      'ti-info-circle',
      'ti-bell',
      'ti-shield-check',
      'ti-shield-off',
      'ti-player-play',
      'ti-player-stop',
      'ti-activity',
      'ti-trending-up',
      'ti-trending-down',
      'ti-traffic-lights',
      'ti-progress',
      'ti-clock',
      'ti-history',
    ],
  },
  {
    category: 'Equipment & Sensors',
    icons: [
      'ti-snowflake',
      'ti-wind',
      'ti-flame',
      'ti-engine',
      'ti-gauge',
      'ti-battery',
      'ti-cpu',
      'ti-filter',
      'ti-device-desktop-analytics',
      'ti-windmill',
      'ti-droplet-half-2',
      'ti-thermometer',
      'ti-meter-square',
      'ti-propeller',
    ],
  },
  {
    category: 'Actions',
    icons: [
      'ti-plus',
      'ti-edit',
      'ti-trash',
      'ti-eye',
      'ti-key',
      'ti-download',
      'ti-upload',
      'ti-refresh',
      'ti-search',
      'ti-send',
      'ti-x',
      'ti-check',
      'ti-arrow-left',
      'ti-arrow-right',
      'ti-chevron-right',
      'ti-chevron-down',
      'ti-dots-vertical',
      'ti-filter-cog',
      'ti-external-link',
      'ti-copy',
    ],
  },
  {
    category: 'Users, Devices & Security',
    icons: [
      'ti-user',
      'ti-user-plus',
      'ti-user-check',
      'ti-user-off',
      'ti-user-cog',
      'ti-devices',
      'ti-device-laptop',
      'ti-device-mobile',
      'ti-device-desktop',
      'ti-device-mobile-check',
      'ti-lock',
      'ti-lock-open',
      'ti-fingerprint',
      'ti-world',
      'ti-login-2',
      'ti-logout-2',
      'ti-mail',
      'ti-id-badge',
    ],
  },
];

// --- MAIN COMPONENT ---

export const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState(null);
const [toggleOn, setToggleOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copiedToken, setCopiedToken] = useState(null);

  // Copy CSS variable handler
  const handleCopyColor = (tokenVar) => {
    const copyText = `var(${tokenVar})`;
    navigator.clipboard.writeText(copyText);
    setCopiedToken(copyText);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Theme toggle handler
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    if (window.toggleTheme) {
      window.toggleTheme();
    } else {
      document.body.classList.toggle('light');
    }
  };
  // Copy icon class handler
  const handleCopyIcon = (iconClass) => {
    navigator.clipboard.writeText(iconClass);
    setCopiedIcon(iconClass);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  // Search filter for icons
  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return ICON_GROUPS;
    const query = searchTerm.toLowerCase();

    return ICON_GROUPS.map((group) => {
      const filteredIcons = group.icons.filter((icon) =>
        icon.toLowerCase().includes(query)
      );
      return { ...group, icons: filteredIcons };
    }).filter((group) => group.icons.length > 0);
  }, [searchTerm]);

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
    <div >
      {/* Tab Navigation Controls */}
     <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
      {/* Left Section */}
      <div className="ph-left">
        <div className="live-dot"></div>
        <div>
          <div className="ph-title" id="dash-page-title">
            Design Guidelines
          </div>
          <div
            className="ph-sub"
            id="dash-page-sub"
            style={{ fontSize: "10px", color: "var(--ink-3)" }}
          >
            Administration · Brand, UI components, icons & colour tokens used across BuildOptix
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ph-tabs" id="dash-tab-bar">
        {["Guidelines", "Icon Library", "Styles", "Colours"].map((tabLabel, idx) => (
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

      {/* Copy Notification Toast */}
      {copiedIcon && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'var(--brand, #d97706)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          Copied <code>{copiedIcon}</code> to clipboard!
        </div>
      )}

      {/* TAB 0: Foundations & Principles */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="designsystem" data-tab="0">
          {/* Hero Banner */}
          <div className="ds-hero">
            <div className="ds-hero-mark">
              <i className="ti ti-color-swatch"></i>
            </div>
            <div>
              <div className="ds-hero-t">BuildOptix Design System</div>
              <div className="ds-hero-s">
                A dark-first operations console. Every screen is built from the same tokens, type scale, icon set and components documented here — so the platform stays consistent as new modules ship.
              </div>
              <div className="ds-hero-meta">
                <span>
                  <i className="ti ti-versions"></i> Tokens v1 · live from <code>:root</code>
                </span>
                <span>
                  <i className="ti ti-typography"></i> Inter + JetBrains Mono
                </span>
                <span>
                  <i className="ti ti-icons"></i> Tabler Icons 3.22.0
                </span>
              </div>
            </div>
          </div>

          {/* Principles Grid */}
          <div className="ds-princ-grid">
            {DESIGN_PRINCIPLES.map((p) => (
              <div key={p.id} className="ds-princ">
                <i className={`ti ${p.icon}`} style={{ color: p.color }}></i>
                <div className="t">{p.title}</div>
                <div className="d">{p.description}</div>
              </div>
            ))}
          </div>

          {/* Foundations and Do & Don't */}
          <div className="ds-two">
            {/* Foundations Card */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Foundations at a glance</div>
                  <div className="cs">The constants every screen inherits</div>
                </div>
              </div>
              <div className="cb" id="ds-foundations">
                {FOUNDATIONS.map((f, idx) => (
                  <div key={idx} className="ds-found-row">
                    <span className="k">{f.key}</span>
                    <span className="v">{f.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Do & Don't Card */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Do &amp; Don't</div>
                  <div className="cs">Keeping new work on-system</div>
                </div>
              </div>
              <div className="cb">
                <div className="ds-dd ok">
                  <i className="ti ti-check"></i>
                  <div>
                    <b>Use the tokens.</b> Reference <code>var(--info)</code>, never a raw hex. Tokens flip correctly between dark &amp; light.
                  </div>
                </div>
                <div className="ds-dd ok">
                  <i className="ti ti-check"></i>
                  <div>
                    <b>Reuse components.</b> <code>.card</code>, <code>.kpi</code>, <code>.badge</code>, <code>.btn</code> and <code>.pill</code> cover most layouts.
                  </div>
                </div>
                <div className="ds-dd ok">
                  <i className="ti ti-check"></i>
                  <div>
                    <b>Mono the data.</b> Apply <code>--font-mono</code> to numbers, IDs and timestamps.
                  </div>
                </div>
                <div className="ds-dd bad">
                  <i className="ti ti-x"></i>
                  <div>
                    <b>Don't invent colours</b> or pull in icon sets beyond Tabler.
                  </div>
                </div>
                <div className="ds-dd bad">
                  <i className="ti ti-x"></i>
                  <div>
                    <b>Don't hard-code spacing</b> with arbitrary pixels where a component already defines it.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Icon Library */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="designsystem" data-tab="1">
          {/* Toolbar Search */}
          <div className="api-toolbar">
            <div className="api-search">
              <i className="ti ti-search"></i>
              <input
                id="ds-icon-search"
                type="text"
                placeholder="Search icons used in BuildOptix…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
              Tabler Icons 3.22.0 · click any icon to copy its{' '}
              <code style={{ color: 'var(--brand)' }}>ti ti-*</code> class
            </span>
          </div>

          {/* Icon Groups */}
          <div id="ds-icon-groups">
            {filteredGroups.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--ink-3)', fontSize: '13px' }}>
                No icons found matching "{searchTerm}"
              </div>
            ) : (
              filteredGroups.map((group, idx) => (
                <div key={idx} className="ds-igroup">
                  <div className="ds-igroup-h">
                    {group.category}
                    <span className="ct-line"></span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 400,
                        textTransform: 'none',
                      }}
                    >
                      {group.icons.length}
                    </span>
                  </div>
                  <div className="ds-icon-grid">
                    {group.icons.map((iconName) => (
                      <div
                        key={iconName}
                        className="ds-icon"
                        onClick={() => handleCopyIcon(iconName)}
                        title={`Click to copy ${iconName}`}
                      >
                        <i className={`ti ${iconName}`}></i>
                        <span className="nm">{iconName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}




      {activeTab === 2 && (
        <div className="tab-panel active" data-page="designsystem" data-tab="2">
          {/* Typography Spec */}
          <div className="card mb-14">
            <div className="ch">
              <div>
                <div className="ct">Typography</div>
                <div className="cs">Inter for UI · JetBrains Mono for data</div>
              </div>
            </div>
            <div className="cb" id="ds-type">
              {TYPOGRAPHY_SAMPLES.map((row, idx) => (
                <div key={idx} className="ds-type-row">
                  <div className="spec">
                    <b
                      style={{
                        color: 'var(--ink-1)',
                        display: 'block',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                      }}
                    >
                      {row.label}
                    </b>
                    {row.spec}
                  </div>
                  <div className="sample" style={row.style}>
                    {row.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons, Badges & Pills */}
          <div className="ds-two">
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Buttons</div>
                  <div className="cs">
                    <code>.btn</code> · <code>.btn.primary</code>
                  </div>
                </div>
              </div>
              <div className="cb">
                <div className="ds-spec-row">
                  <button className="btn primary">
                    <i className="ti ti-plus"></i>Primary
                  </button>
                  <button className="btn">
                    <i className="ti ti-download"></i>Secondary
                  </button>
                  <button className="btn" style={{ color: 'var(--bad)' }}>
                    <i className="ti ti-trash"></i>Danger
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Badges &amp; Pills</div>
                  <div className="cs">Status &amp; state</div>
                </div>
              </div>
              <div className="cb">
                <div className="ds-spec-row">
                  <span className="badge badge-green">Active</span>
                  <span className="badge badge-amber">Pending</span>
                  <span className="badge badge-red">Inactive</span>
                </div>
                <div className="ds-spec-row" style={{ marginTop: '10px' }}>
                  <span className="pill ok">On</span>
                  <span className="pill bad">Off</span>
                  <span className="au-global">
                    <i className="ti ti-world" style={{ fontSize: '11px' }}></i>Global
                  </span>
                  <span className="au-local">
                    <i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Tiles */}
          <div className="card mb-14" style={{ marginTop: '14px' }}>
            <div className="ch">
              <div>
                <div className="ct">KPI Tiles</div>
                <div className="cs">
                  <code>.kpi</code> with <code>.glow-*</code> status rail
                </div>
              </div>
            </div>
            <div className="cb">
              <div className="kpi-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="kpi glow-info">
                  <div className="kpi-l">Total Assets</div>
                  <div className="kpi-v">1,248</div>
                  <div className="kpi-s">across 4 sites</div>
                </div>
                <div className="kpi glow-ok">
                  <div className="kpi-l">Uptime</div>
                  <div className="kpi-v ok">
                    99.4<span className="kpi-u">%</span>
                  </div>
                </div>
                <div className="kpi glow-warn">
                  <div className="kpi-l">Open Faults</div>
                  <div className="kpi-v warn">12</div>
                </div>
                <div className="kpi glow-bad">
                  <div className="kpi-l">Critical</div>
                  <div className="kpi-v bad">2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards & Forms */}
          <div className="ds-two">
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Card</div>
                  <div className="cs">
                    Header (<code>.ch</code>) + body (<code>.cb</code>)
                  </div>
                </div>
                <span className="ca">Action →</span>
              </div>
              <div className="cb">
                <div style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                  The container for nearly everything — title via <code>.ct</code>, subtitle via <code>.cs</code>, optional action link via <code>.ca</code>, content in <code>.cb</code>.
                </div>
              </div>
            </div>

            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Form Controls</div>
                  <div className="cs">Inputs &amp; selects</div>
                </div>
              </div>
              <div className="cb">
                <div className="ds-spec-col">
                  <input
                    className="au-input"
                    type="text"
                    placeholder="Text input"
                    style={{ maxWidth: '280px' }}
                  />
                  <select className="au-sel" style={{ maxWidth: '280px', height: '36px' }}>
                    <option>Dropdown select</option>
                    <option>Option two</option>
                  </select>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div
                      className={`au-sw ${toggleOn ? 'on' : ''}`}
                      onClick={() => setToggleOn(!toggleOn)}
                      style={{ cursor: 'pointer' }}
                    ></div>
                    <span style={{ fontSize: '11.5px', color: 'var(--ink-2)' }}>
                      Toggle switch ({toggleOn ? 'On' : 'Off'})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Color Tokens */}
      {activeTab === 3 && (
        <div className="tab-panel active" data-page="designsystem" data-tab="3">
          {/* Toolbar & Theme Switcher */}
          <div className="api-toolbar">
            <span style={{ fontSize: '11.5px', color: 'var(--ink-2)' }}>
              Live token values for the{' '}
              <b id="ds-theme-name">{isDarkMode ? 'dark' : 'light'}</b> theme · click any swatch to copy its{' '}
              <code style={{ color: 'var(--brand)' }}>var(--token)</code>
            </span>
            <button
              className="btn"
              style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '11px' }}
              onClick={handleToggleTheme}
            >
              <i className="ti ti-contrast"></i>Toggle theme
            </button>
          </div>

          {/* Color Groups Grid */}
          <div id="ds-color-groups">
            {COLOR_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="ds-cgroup">
                <div className="ds-cgroup-h">{group.title}</div>
                <div className="ds-cgroup-d">{group.description}</div>
                <div className="ds-sw-grid">
                  {group.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="ds-sw"
                      onClick={() => handleCopyColor(swatch.name)}
                      title={`Click to copy var(${swatch.name})`}
                    >
                      <div className="ds-sw-chip">
                        <div className="fill" style={{ background: `var(${swatch.name})` }}></div>
                        <span className="cp">copy</span>
                      </div>
                      <div className="ds-sw-meta">
                        <div className="ds-sw-name">{swatch.name}</div>
                        <div className="ds-sw-val">{swatch.val}</div>
                        <div className="ds-sw-lbl">{swatch.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignSystem;