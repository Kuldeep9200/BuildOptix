import React, { useState } from 'react';
import { showToast } from '../../utils/toast';
const SITES_DATA = [
    { id: 'vikhroli', name: 'Mumbai — Vikhroli', brand: 'BuildOptix brand', type: 'BuildOptix', active: true, color: '#EE9A3A' },
    { id: 'delhi', name: 'Delhi — Sector 62', brand: 'Apex Integrators · Cyberhub Estates', type: 'Co-branded', active: false, color: '#4EA1FF' },
    { id: 'bengaluru', name: 'Bengaluru — Whitefield', brand: 'BuildOptix brand', type: 'BuildOptix', active: false, color: '#34D2E6' },
    { id: 'hyderabad', name: 'Hyderabad — Madhapur', brand: 'Vertex Facilities · Madhapur Tech Park', type: 'Co-branded', active: false, color: '#22D67A' },
    { id: 'kolkata', name: 'Kolkata — Salt Lake', brand: 'BuildOptix brand', type: 'BuildOptix', active: false, color: '#EE9A3A' },
    { id: 'chennai', name: 'Chennai — OMR', brand: 'BuildOptix brand', type: 'BuildOptix', active: false, color: '#EE9A3A' }
];
const AdminBrandingConfig = () => {
    // Navigation Active Tab State
    const [activeTab, setActiveTab] = useState(0);

    // Form & Preference States
    const [environment, setEnvironment] = useState('Production');
    const [region, setRegion] = useState('AP-South (Mumbai)');
    const [idleTimeout, setIdleTimeout] = useState('30');
    const [themeMode, setThemeMode] = useState('dark');
    const [defaultTeam, setDefaultTeam] = useState('hvac');
    const [brandingMode, setBrandingMode] = useState('buildoptix');

    // Policy Toggles State
    const [toggles1, setToggles1] = useState({
        autoAssign: true,
        customLoginPages: true,
        roleBranding: false
    });

    // const handleToggle = (key) => {
    //     setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    // };
    // Toggle Switches State
    const [toggles, setToggles] = useState({
        reauth: false,
        sessionPersist: true,
        themePersist: true,
        rememberTeam: true,
        allowSwitch: true,
        showTeamHeader: true,
    });

    // Handler for Toggle Switches
    const handleToggle = (key) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Logout Handlers
    const handleLogout = () => {
        showToast('Signing out...');
    };

    const handleLogoutAll = () => {
        showToast('Signing out of all devices...');
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
            showToast("Selected Range:", range);
        }
    };

    const handleApplyCustomRange = () => {
        if (!fromDate || !toDate) {
            // alert("Kripya From aur To dates select karein.");
            return;
        }
        showToast("Custom Range Applied:", { fromDate, toDate });
        setShowCustomPicker(false);
    };

    const [selectedSite, setSelectedSite] = useState('vikhroli');

    // Sites List State
    const [sites, setSites] = useState([
        { id: 'vikhroli', name: 'Mumbai — Vikhroli', desc: 'BuildOptix brand', mode: 'BuildOptix', isActive: true, dotColor: '#EE9A3A' },
        { id: 'delhi', name: 'Delhi — Sector 62', desc: 'Apex Integrators · Cyberhub Estates', mode: 'Co-branded', isActive: false, dotColor: '#4EA1FF' },
        { id: 'bengaluru', name: 'Bengaluru — Whitefield', desc: 'BuildOptix brand', mode: 'BuildOptix', isActive: false, dotColor: '#34D2E6' },
        { id: 'hyderabad', name: 'Hyderabad — Madhapur', desc: 'Vertex Facilities · Madhapur Tech Park', mode: 'Co-branded', isActive: false, dotColor: '#22D67A' },
        { id: 'kolkata', name: 'Kolkata — Salt Lake', desc: 'BuildOptix brand', mode: 'BuildOptix', isActive: false, dotColor: '#EE9A3A' },
        { id: 'chennai', name: 'Chennai — OMR', desc: 'BuildOptix brand', mode: 'BuildOptix', isActive: false, dotColor: '#EE9A3A' },
    ]);

    // Branding mode state ('buildoptix' | 'cobrand')
    // const [selectedSite, setSelectedSite] = useState("delhi");

    // Active site ID state (default: 'vikhroli' as per active tag)
    const [activeSiteId, setActiveSiteId] = useState("vikhroli");
    // Policy Toggles State
    const [toggles2, setToggles2] = useState({
        autoAssign: true,
        customLoginPages: true,
        roleBranding: false,
    });

    // Handler for active site change
    const handleSetActiveSite = (id, e) => {
        if (e) e.stopPropagation();
        setSites(prevSites =>
            prevSites.map(site => ({
                ...site,
                isActive: site.id === id,
            }))
        );
    };

    // Toggle switch handler
    // const handleToggle = (key) => {
    //     setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    // };

    // Action handlers
    const handleReset = () => {
        setBrandingMode('buildoptix');
        showToast('Settings reset to default!');
    };

    const handleSave = () => {
        showToast('Settings saved & applied successfully!');
    };
    const sitesList = [
        {
            id: "vikhroli",
            name: "Mumbai — Vikhroli",
            desc: "BuildOptix brand",
            brandType: "BuildOptix",
            bgDot: "#EE9A3A",
        },
        {
            id: "delhi",
            name: "Delhi — Sector 62",
            desc: "Apex Integrators · Cyberhub Estates",
            brandType: "Co-branded",
            bgDot: "#4EA1FF",
        },
        {
            id: "bengaluru",
            name: "Bengaluru — Whitefield",
            desc: "BuildOptix brand",
            brandType: "BuildOptix",
            bgDot: "#34D2E6",
        },
        {
            id: "hyderabad",
            name: "Hyderabad — Madhapur",
            desc: "Vertex Facilities · Madhapur Tech Park",
            brandType: "Co-branded",
            bgDot: "#22D67A",
        },
        {
            id: "kolkata",
            name: "Kolkata — Salt Lake",
            desc: "BuildOptix brand",
            brandType: "BuildOptix",
            bgDot: "#EE9A3A",
        },
        {
            id: "chennai",
            name: "Chennai — OMR",
            desc: "BuildOptix brand",
            brandType: "BuildOptix",
            bgDot: "#EE9A3A",
        },
    ];
const [brandingMode1, setBrandingMode1] = useState("cobrand");

  // 3. Text Fields State
  const [partnerName, setPartnerName] = useState("Apex Integrators");
  const [customerName, setCustomerName] = useState("Cyberhub Estates");
  const [welcomeMessage, setWelcomeMessage] = useState("Run every building like your best one.");
  const [tagline, setTagline] = useState(
    "Monitor HVAC, energy, equipment and facilities across your whole portfolio — in real time, from one secure console."
  );

  // 4. Logo Order & Placement States
  const [logoOrder, setLogoOrder] = useState("bo-first"); // 'bo-first' | 'partner-first'
  const [custPlacement, setCustPlacement] = useState("secondary"); // 'secondary' | 'hidden'

  // 5. Theme & Swatches State
  const [accentColor, setAccentColor] = useState("blue"); // copper, blue, teal, emerald, violet
  const [loginBg, setLoginBg] = useState("aurora"); // aurora, grid, gradient, solid

  // 6. Application Areas Toggles State
  const [areas, setAreas] = useState({
    login: true,
    header: true,
    dashboard: true,
    reports: true,
    email: false,
  });

  // 7. Preview Stage Tab State
  const [pvTab, setPvTab] = useState("report"); // login, header, dashboard, report, email

  // Handlers
  const handleToggleArea = (key) => {
    setAreas((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSetActive = () => {
    showToast(`${selectedSite.toUpperCase()} is now set as the active site!`);
  };

  const handleReset1 = () => {
    setBrandingMode("cobrand");
    setPartnerName("Apex Integrators");
    setCustomerName("Cyberhub Estates");
    setLogoOrder("bo-first");
    setCustPlacement("secondary");
    setAccentColor("blue");
    setLoginBg("aurora");
    showToast("Form reset to defaults!");
  };

  const handleSave1 = () => {
    showToast("Branding settings saved & applied!");
  };

  const handlePickUpload = (type) => {
    showToast(`Upload trigger for: ${type} logo`);
  };


    return (
        <div className="page active" id="pg-adminbranding">
            {/* Tab Navigation Header */}

            <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                {/* Left Section */}
                <div className="ph-left">
                    <div className="live-dot"></div>
                    <div>
                        <div className="ph-title" id="dash-page-title">
                            Application Settings          </div>
                        <div
                            className="ph-sub"
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Administration · Branding & Security · Preferences · White-label
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="ph-tabs" id="dash-tab-bar">
                    {["General", "Users & Teams", "Branding & White-Label", "Multi-Tenant & Enterprise"].map((tabLabel, idx) => (
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




            {/* Tab Panel 0: General & Preferences */}
            {activeTab === 0 && (
                <div className="tab-panel active" data-page="adminbranding" data-tab="0">
                    <div id="ab-general" className="ab-cfg">
                        <div className="adm-cfg-grid">
                            {/* Card 1: Platform Info */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-settings"
                                                style={{ color: 'var(--info)', marginRight: '6px' }}
                                            ></i>
                                            Platform
                                        </div>
                                        <div className="cs">BuildOptix smart building operations</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-row2">
                                        <div className="ab-field">
                                            <label>Application name</label>
                                            <input
                                                className="ptw-form-input"
                                                value="BuildOptix Platform"
                                                readOnly
                                            />
                                        </div>
                                        <div className="ab-field">
                                            <label>Version</label>
                                            <input
                                                className="ptw-form-input"
                                                value="v3.22.1 · Build 2026.05"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="ab-row2">
                                        <div className="ab-field">
                                            <label>Environment</label>
                                            <select
                                                className="ptw-form-select"
                                                value={environment}
                                                onChange={(e) => setEnvironment(e.target.value)}
                                            >
                                                <option value="Production">Production</option>
                                                <option value="Staging">Staging</option>
                                                <option value="Sandbox">Sandbox</option>
                                            </select>
                                        </div>
                                        <div className="ab-field">
                                            <label>Region</label>
                                            <select
                                                className="ptw-form-select"
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value)}
                                            >
                                                <option value="AP-South (Mumbai)">AP-South (Mumbai)</option>
                                                <option value="AP-South-2 (Hyderabad)">AP-South-2 (Hyderabad)</option>
                                                <option value="EU-West (Dublin)">EU-West (Dublin)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Logout Configuration */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-logout"
                                                style={{ color: 'var(--warn)', marginRight: '6px' }}
                                            ></i>
                                            Logout Configuration
                                        </div>
                                        <div className="cs">Session lifetime &amp; re-authentication</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-field">
                                        <label>Idle session timeout</label>
                                        <select
                                            className="ptw-form-select"
                                            value={idleTimeout}
                                            onChange={(e) => setIdleTimeout(e.target.value)}
                                        >
                                            <option value="15">15 minutes</option>
                                            <option value="30">30 minutes</option>
                                            <option value="60">60 minutes</option>
                                            <option value="never">Never (not recommended)</option>
                                        </select>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-lock-check"
                                                style={{ color: 'var(--brand-bright)' }}
                                            ></i>
                                            Require re-authentication
                                            <span>For sensitive actions (control commands, user changes)</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.reauth ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.reauth}
                                            tabIndex={0}
                                            onClick={() => handleToggle('reauth')}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-device-floppy"
                                                style={{ color: 'var(--cool)' }}
                                            ></i>
                                            "Keep me signed in" by default
                                            <span>Pre-checks the persistent-session option on the login screen</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.sessionPersist ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.sessionPersist}
                                            tabIndex={0}
                                            onClick={() => handleToggle('sessionPersist')}
                                        ></div>
                                    </div>

                                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn"
                                            style={{ padding: '8px 14px' }}
                                            onClick={handleLogout}
                                        >
                                            <i className="ti ti-logout"></i>Sign out
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ padding: '8px 14px' }}
                                            onClick={handleLogoutAll}
                                        >
                                            <i className="ti ti-shield-x"></i>Sign out of all devices
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: User Preferences */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-palette"
                                                style={{ color: 'var(--brand-bright)', marginRight: '6px' }}
                                            ></i>
                                            User Preferences
                                        </div>
                                        <div className="cs">Appearance &amp; persistence</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-field">
                                        <label>Theme mode</label>
                                        <div className="ab-seg">
                                            <button
                                                className={themeMode === 'dark' ? 'sel' : ''}
                                                onClick={() => setThemeMode('dark')}
                                            >
                                                <i className="ti ti-moon"></i>Dark
                                            </button>
                                            <button
                                                className={themeMode === 'light' ? 'sel' : ''}
                                                onClick={() => setThemeMode('light')}
                                            >
                                                <i className="ti ti-sun"></i>Light
                                            </button>
                                        </div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-history"
                                                style={{ color: 'var(--info)' }}
                                            ></i>
                                            Remember theme across sessions
                                            <span>Persists Dark / Light choice on this device</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.themePersist ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.themePersist}
                                            tabIndex={0}
                                            onClick={() => handleToggle('themePersist')}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Panel 1: Teams & Defaults */}
            {activeTab === 1 && (
                <div className="tab-panel active" data-page="adminbranding" data-tab="1">
                    <div id="ab-teams" className="ab-cfg">
                        <div className="adm-cfg-grid">
                            {/* Card 1: Team Selection Defaults */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-users-group"
                                                style={{ color: 'var(--info)', marginRight: '6px' }}
                                            ></i>
                                            Team Selection
                                        </div>
                                        <div className="cs">Defaults applied at sign-in</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-field">
                                        <label>Default team</label>
                                        <select
                                            className="ptw-form-select"
                                            value={defaultTeam}
                                            onChange={(e) => setDefaultTeam(e.target.value)}
                                        >
                                            <option value="north">North Region</option>
                                            <option value="south">South Region</option>
                                            <option value="hvac">HVAC Operations</option>
                                            <option value="energy">Energy &amp; Metering</option>
                                            <option value="towerA">Tower A · Facilities</option>
                                            <option value="campus">Bandra Campus</option>
                                        </select>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-history-toggle"
                                                style={{ color: 'var(--cool)' }}
                                            ></i>
                                            Remember last selected team
                                            <span>Return users to the team they used last</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.rememberTeam ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.rememberTeam}
                                            tabIndex={0}
                                            onClick={() => handleToggle('rememberTeam')}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-arrows-exchange"
                                                style={{ color: 'var(--info)' }}
                                            ></i>
                                            Allow team switching
                                            <span>Users can change team from the in-app menu</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.allowSwitch ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.allowSwitch}
                                            tabIndex={0}
                                            onClick={() => handleToggle('allowSwitch')}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-layout-navbar"
                                                style={{ color: 'var(--brand-bright)' }}
                                            ></i>
                                            Show team in header
                                            <span>Display the active team in the top bar</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.showTeamHeader ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.showTeamHeader}
                                            tabIndex={0}
                                            onClick={() => handleToggle('showTeamHeader')}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Teams List View */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-list-details"
                                                style={{ color: 'var(--brand-bright)', marginRight: '6px' }}
                                            ></i>
                                            Teams
                                        </div>
                                        <div className="cs">Membership is managed in Users &amp; Roles</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                North Region
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                South Region
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                HVAC Operations
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '9px',
                                                    fontWeight: 700,
                                                    color: 'var(--ok)',
                                                    border: '1px solid var(--ok)',
                                                    borderRadius: '99px',
                                                    padding: '2px 7px',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                Default
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                Energy &amp; Metering
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                Tower A · Facilities
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                Bandra Campus
                                            </span>
                                        </div>
                                    </div>

                                    <div className="ab-hint">
                                        <i className="ti ti-info-circle"></i>
                                        Default team, last-used recall and switching controls feed directly into the sign-in flow and the in-app account menu.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 2 && (
            <div className="tab-panel active" data-page="adminbranding" data-tab="2">
      <div id="ab-branding" className="ab-cfg">
        
        {/* Site Header Selection */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "2px" }}>
          <div style={{ minWidth: "240px", flex: 1 }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--ink-2)", marginBottom: "5px" }}>
              Configure site
            </label>
            <select
              className="ptw-form-select"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option value="vikhroli">Mumbai — Vikhroli · active</option>
              <option value="delhi">Delhi — Sector 62</option>
              <option value="bengaluru">Bengaluru — Whitefield</option>
              <option value="hyderabad">Hyderabad — Madhapur</option>
              <option value="kolkata">Kolkata — Salt Lake</option>
              <option value="chennai">Chennai — OMR</option>
            </select>
          </div>
          <div style={{ alignSelf: "flex-end", fontSize: "11px", color: "var(--ink-3)" }}>
            Editing — not the active site
          </div>
        </div>

        {/* Two Column Section */}
        <div className="ab-two">
          
          {/* Left Controls Configuration */}
          <div className="ab-cfg">
            
            {/* Card 1: Branding Mode */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i className="ti ti-versions" style={{ color: "var(--info)", marginRight: "6px" }}></i>
                    Branding Mode
                  </div>
                  <div className="cs">BuildOptix or Co-Branded for this site</div>
                </div>
              </div>
              <div className="cb">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div
                    className={`ab-lm ${brandingMode === "buildoptix" ? "sel" : ""}`}
                    style={{ alignItems: "flex-start", padding: "13px" }}
                    onClick={() => setBrandingMode("buildoptix")}
                  >
                    <span className="rd" style={{ marginTop: "2px" }}></span>
                    <span className="tx">
                      BuildOptix Branding
                      <small>BuildOptix logo throughout — direct &amp; platform-brand sites</small>
                    </span>
                  </div>

                  <div
                    className={`ab-lm ${brandingMode === "cobrand" ? "sel" : ""}`}
                    style={{ alignItems: "flex-start", padding: "13px" }}
                    onClick={() => setBrandingMode("cobrand")}
                  >
                    <span className="rd" style={{ marginTop: "2px" }}></span>
                    <span className="tx">
                      Co-Branded
                      <small>BuildOptix + Partner (SI / consultant); customer logo where appropriate</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Partner & Customer Logos */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i className="ti ti-photo" style={{ color: "var(--brand-bright)", marginRight: "6px" }}></i>
                    Partner &amp; Customer Logos
                  </div>
                  <div className="cs">
                    Co-branding is with your partners / system integrators — customers are the organizations using the platform
                  </div>
                </div>
              </div>
              <div className="cb">
                <div className="ab-row2">
                  <div className="ab-field">
                    <label>
                      Partner name <span className="mut">· SI / consultant</span>
                    </label>
                    <input
                      className="ptw-form-input"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="e.g. Apex Integrators"
                    />
                  </div>
                  <div className="ab-field">
                    <label>
                      Customer name <span className="mut">· building owner</span>
                    </label>
                    <input
                      className="ptw-form-input"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Cyberhub Estates"
                    />
                  </div>
                </div>

                {/* Upload Buttons */}
                <div className="ab-uploads">
                  <div className="ab-upz" onClick={() => handlePickUpload("partner")}>
                    <i className="ti ti-cloud-upload ic"></i>
                    <span className="t">Partner logo</span>
                    <span className="s">PNG · SVG · transparent</span>
                  </div>
                  <div className="ab-upz" onClick={() => handlePickUpload("customer")}>
                    <i className="ti ti-cloud-upload ic"></i>
                    <span className="t">Customer logo</span>
                    <span className="s">PNG · SVG · transparent</span>
                  </div>
                </div>

                {/* Segment Controls */}
                <div className="ab-row2" style={{ marginTop: "12px" }}>
                  <div className="ab-field">
                    <label>Logo display order</label>
                    <div className="ab-seg">
                      <button
                        className={logoOrder === "bo-first" ? "sel" : ""}
                        onClick={() => setLogoOrder("bo-first")}
                      >
                        BuildOptix · Partner
                      </button>
                      <button
                        className={logoOrder === "partner-first" ? "sel" : ""}
                        onClick={() => setLogoOrder("partner-first")}
                      >
                        Partner · BuildOptix
                      </button>
                    </div>
                  </div>

                  <div className="ab-field">
                    <label>Customer logo placement</label>
                    <div className="ab-seg">
                      <button
                        className={custPlacement === "secondary" ? "sel" : ""}
                        onClick={() => setCustPlacement("secondary")}
                      >
                        Secondary
                      </button>
                      <button
                        className={custPlacement === "hidden" ? "sel" : ""}
                        onClick={() => setCustPlacement("hidden")}
                      >
                        Hidden
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ab-hint">
                  <i className="ti ti-info-circle"></i>
                  BuildOptix stays the primary platform brand everywhere. The partner logo appears alongside it; the customer logo shows in a secondary position (login footer &amp; report headers).
                </div>
              </div>
            </div>

            {/* Card 3: Theme & Messaging */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i className="ti ti-color-swatch" style={{ color: "var(--cool)", marginRight: "6px" }}></i>
                    Theme &amp; Messaging
                  </div>
                  <div className="cs">Accent, login background &amp; welcome copy</div>
                </div>
              </div>
              <div className="cb">
                {/* Swatches */}
                <div className="ab-field">
                  <label>Accent color</label>
                  <div className="ab-swatches">
                    <div
                      className={`ab-sw ${accentColor === "copper" ? "sel" : ""}`}
                      style={{ background: "#EE9A3A", color: "#EE9A3A" }}
                      title="copper"
                      onClick={() => setAccentColor("copper")}
                    ></div>
                    <div
                      className={`ab-sw ${accentColor === "blue" ? "sel" : ""}`}
                      style={{ background: "#4EA1FF", color: "#4EA1FF" }}
                      title="blue"
                      onClick={() => setAccentColor("blue")}
                    ></div>
                    <div
                      className={`ab-sw ${accentColor === "teal" ? "sel" : ""}`}
                      style={{ background: "#34D2E6", color: "#34D2E6" }}
                      title="teal"
                      onClick={() => setAccentColor("teal")}
                    ></div>
                    <div
                      className={`ab-sw ${accentColor === "emerald" ? "sel" : ""}`}
                      style={{ background: "#22D67A", color: "#22D67A" }}
                      title="emerald"
                      onClick={() => setAccentColor("emerald")}
                    ></div>
                    <div
                      className={`ab-sw ${accentColor === "violet" ? "sel" : ""}`}
                      style={{ background: "#9B6CFF", color: "#9B6CFF" }}
                      title="violet"
                      onClick={() => setAccentColor("violet")}
                    ></div>
                  </div>
                </div>

                {/* Login Background Chips */}
                <div className="ab-field">
                  <label>Login background</label>
                  <div className="ab-bgchips">
                    <div
                      className={`ab-bgchip ${loginBg === "aurora" ? "sel" : ""}`}
                      style={{
                        background:
                          "radial-gradient(1100px 700px at 18% -10%, rgba(78,161,255,0.16), transparent 60%),radial-gradient(900px 600px at 90% 110%, rgba(52,210,230,0.12), transparent 55%),linear-gradient(160deg,#06101F 0%,#0A1626 48%,#0C1A2D 100%)",
                      }}
                      onClick={() => setLoginBg("aurora")}
                    >
                      <span className="lab">aurora</span>
                    </div>

                    <div
                      className={`ab-bgchip ${loginBg === "grid" ? "sel" : ""}`}
                      style={{ background: "linear-gradient(160deg,#06101F 0%,#0A1626 100%)" }}
                      onClick={() => setLoginBg("grid")}
                    >
                      <span className="lab">grid</span>
                    </div>

                    <div
                      className={`ab-bgchip ${loginBg === "gradient" ? "sel" : ""}`}
                      style={{ background: "linear-gradient(150deg, #2F6FD6 0%, #0A1626 70%)" }}
                      onClick={() => setLoginBg("gradient")}
                    >
                      <span className="lab">gradient</span>
                    </div>

                    <div
                      className={`ab-bgchip ${loginBg === "solid" ? "sel" : ""}`}
                      style={{ background: "#0A1626" }}
                      onClick={() => setLoginBg("solid")}
                    >
                      <span className="lab">solid</span>
                    </div>
                  </div>
                </div>

                {/* Inputs */}
                <div className="ab-field">
                  <label>Welcome message</label>
                  <input
                    className="ptw-form-input"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                  />
                </div>

                <div className="ab-field">
                  <label>
                    Tagline <span className="mut">· login sub-text</span>
                  </label>
                  <input
                    className="ptw-form-input"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Branding Application Areas */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i className="ti ti-stack-2" style={{ color: "var(--brand-bright)", marginRight: "6px" }}></i>
                    Branding Application Areas
                  </div>
                  <div className="cs">Where this site's branding appears</div>
                </div>
              </div>
              <div className="cb">
                <div className="ab-areas">
                  <div className="ab-area">
                    <i className="ti ti-login"></i>
                    <span className="nm">Login page</span>
                    <div
                      className={`toggle ${!areas.login ? "off" : ""}`}
                      role="switch"
                      aria-checked={areas.login}
                      tabIndex={0}
                      onClick={() => handleToggleArea("login")}
                    ></div>
                  </div>

                  <div className="ab-area">
                    <i className="ti ti-layout-navbar"></i>
                    <span className="nm">Application header</span>
                    <div
                      className={`toggle ${!areas.header ? "off" : ""}`}
                      role="switch"
                      aria-checked={areas.header}
                      tabIndex={0}
                      onClick={() => handleToggleArea("header")}
                    ></div>
                  </div>

                  <div className="ab-area">
                    <i className="ti ti-layout-dashboard"></i>
                    <span className="nm">Dashboard</span>
                    <div
                      className={`toggle ${!areas.dashboard ? "off" : ""}`}
                      role="switch"
                      aria-checked={areas.dashboard}
                      tabIndex={0}
                      onClick={() => handleToggleArea("dashboard")}
                    ></div>
                  </div>

                  <div className="ab-area">
                    <i className="ti ti-report"></i>
                    <span className="nm">Reports &amp; PDF</span>
                    <div
                      className={`toggle ${!areas.reports ? "off" : ""}`}
                      role="switch"
                      aria-checked={areas.reports}
                      tabIndex={0}
                      onClick={() => handleToggleArea("reports")}
                    ></div>
                  </div>

                  <div className="ab-area">
                    <i className="ti ti-mail"></i>
                    <span className="nm">Email notifications</span>
                    <div
                      className={`toggle ${!areas.email ? "off" : ""}`}
                      role="switch"
                      aria-checked={areas.email}
                      tabIndex={0}
                      onClick={() => handleToggleArea("email")}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Live Preview Column */}
          <div className="ab-cfg">
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">
                    <i className="ti ti-eye" style={{ color: "var(--brand-bright)", marginRight: "6px" }}></i>
                    Live preview
                  </div>
                  <div className="cs">Recommended placement per area</div>
                </div>
              </div>
              <div className="cb">
                <div style={{ marginBottom: "12px" }}>
                  <div className="ab-seg">
                    <button
                      className={pvTab === "login" ? "sel" : ""}
                      onClick={() => setPvTab("login")}
                    >
                      <i className="ti ti-login"></i>Login
                    </button>
                    <button
                      className={pvTab === "header" ? "sel" : ""}
                      onClick={() => setPvTab("header")}
                    >
                      <i className="ti ti-layout-navbar"></i>Header
                    </button>
                    <button
                      className={pvTab === "dashboard" ? "sel" : ""}
                      onClick={() => setPvTab("dashboard")}
                    >
                      <i className="ti ti-layout-dashboard"></i>Dashboard
                    </button>
                    <button
                      className={pvTab === "report" ? "sel" : ""}
                      onClick={() => setPvTab("report")}
                    >
                      <i className="ti ti-file-type-pdf"></i>Report / PDF
                    </button>
                    <button
                      className={pvTab === "email" ? "sel" : ""}
                      onClick={() => setPvTab("email")}
                    >
                      <i className="ti ti-mail"></i>Email
                    </button>
                  </div>
                </div>

                {/* Stage Canvas */}
                <div id="ab-pvstage">
                  <div
                    style={{
                      "--brand": "#4EA1FF",
                      "--brand-bright": "#6FB6FF",
                      "--brand-deep": "#2F6FD6",
                      "--brand-soft": "rgba(78,161,255,0.14)",
                      "--brand-line": "rgba(78,161,255,0.42)",
                      "--brand-glow": "rgba(78,161,255,0.5)",
                      border: "1px solid var(--line-2)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#fff",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "2px solid var(--brand)",
                        paddingBottom: "11px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "13px", flexWrap: "wrap" }}>
                          <img
                            alt=""
                            style={{ height: "18px", maxWidth: "160px", objectFit: "contain", display: "block" }}
                          />
                          <span style={{ width: "1px", height: "12px", background: "rgba(0,0,0,.15)", flexShrink: 0 }}></span>
                          <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "-.2px", color: "#1E2D42" }}>
                            {partnerName || "Partner Name"}
                          </span>
                        </div>
                        <span style={{ width: "1px", height: "18px", background: "rgba(0,0,0,.15)", flexShrink: 0 }}></span>
                        <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "-.2px", color: "#1E2D42" }}>
                          {customerName || "Customer Name"}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#1E2D42" }}>Energy Report</div>
                        <div style={{ fontSize: "8.5px", color: "#8794a8", fontFamily: "var(--font-mono)" }}>
                          Q2 2026 · Delhi — Sector 62
                        </div>
                      </div>
                    </div>

                    <div style={{ margin: "14px 0" }}>
                      <div style={{ height: "8px", borderRadius: "5px", background: "#eef2f8", marginBottom: "8px", width: "96%" }}></div>
                      <div style={{ height: "8px", borderRadius: "5px", background: "#eef2f8", marginBottom: "8px", width: "86%" }}></div>
                      <div style={{ height: "8px", borderRadius: "5px", background: "#eef2f8", marginBottom: "8px", width: "77%" }}></div>
                      <div style={{ height: "8px", borderRadius: "5px", background: "#eef2f8", marginBottom: "8px", width: "68%" }}></div>
                      <div style={{ height: "8px", borderRadius: "5px", background: "#eef2f8", marginBottom: "8px", width: "60%" }}></div>
                    </div>

                    <div
                      style={{
                        fontSize: "8.5px",
                        color: "#94a2b6",
                        borderTop: "1px solid #eef2f8",
                        paddingTop: "9px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--brand)" }}></span>
                      Generated by {partnerName || "Partner"} on BuildOptix · Confidential
                    </div>
                  </div>
                </div>

                <div className="ab-hint">
                  <i className="ti ti-info-circle"></i>
                  BuildOptix is primary across login, header, dashboard, reports and email. In co-branded sites the partner logo sits alongside; the customer logo appears in a secondary position.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Bar Footer */}
        <div className="adm-actionbar" style={{ marginTop: 0 }}>
          <span id="ab-saved-flag"></span>
          <div style={{ flex: 1 }}></div>
          <button className="btn" style={{ padding: "8px 16px" }} onClick={handleSetActive}>
            <i className="ti ti-star"></i>Set as active site
          </button>
          <button className="btn" style={{ padding: "8px 16px" }} onClick={handleReset}>
            <i className="ti ti-restore"></i>Reset
          </button>
          <button className="btn primary" style={{ padding: "8px 16px" }} onClick={handleSave}>
            <i className="ti ti-device-floppy"></i>Save &amp; apply
          </button>
        </div>

      </div>
    </div>
            )}

            {/* Tab Panel Enterprise Options - Tab 3 */}
            {activeTab === 3 && (
                <div className="tab-panel active" data-page="adminbranding" data-tab="3">
                    <div id="ab-enterprise" className="ab-cfg">

                        {/* Sites Card */}
                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">
                                        <i className="ti ti-buildings" style={{ color: "var(--info)", marginRight: "6px" }}></i>
                                        Sites
                                    </div>
                                    <div className="cs">Per-site branding — select to configure, or add a new site</div>
                                </div>
                            </div>
                            <div className="cb">
                                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                                    <button className="btn primary" style={{ padding: "7px 13px", fontSize: "11px" }}>
                                        <i className="ti ti-plus"></i>Add Site
                                    </button>
                                </div>

                                <div className="ab-orgs">
                                    {sitesList.map((site) => {
                                        const isSelected = selectedSite === site.id;
                                        const isActive = activeSiteId === site.id;

                                        return (
                                            <div
                                                key={site.id}
                                                className={`ab-org ${isSelected ? "sel" : ""}`}
                                                onClick={() => setSelectedSite(site.id)}
                                            >
                                                <span className="dot" style={{ background: site.bgDot }}>
                                                    <i className="ti ti-building" style={{ color: "#0b1422", fontSize: "16px" }}></i>
                                                </span>
                                                <div style={{ minWidth: 0, flex: 1 }}>
                                                    <div className="nm">{site.name}</div>
                                                    <div className="dm">{site.desc}</div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    {site.brandType === "BuildOptix" ? (
                                                        <span
                                                            style={{
                                                                fontSize: "9px",
                                                                fontWeight: 700,
                                                                color: "var(--info)",
                                                                border: "1px solid rgba(78,161,255,.4)",
                                                                background: "var(--info-soft)",
                                                                borderRadius: "99px",
                                                                padding: "2px 8px",
                                                                textTransform: "uppercase",
                                                                letterSpacing: ".04em",
                                                            }}
                                                        >
                                                            BuildOptix
                                                        </span>
                                                    ) : (
                                                        <span
                                                            style={{
                                                                fontSize: "9px",
                                                                fontWeight: 700,
                                                                color: "var(--brand-bright)",
                                                                border: "1px solid var(--brand-line)",
                                                                background: "var(--brand-soft)",
                                                                borderRadius: "99px",
                                                                padding: "2px 8px",
                                                                textTransform: "uppercase",
                                                                letterSpacing: ".04em",
                                                            }}
                                                        >
                                                            Co-branded
                                                        </span>
                                                    )}

                                                    {isActive ? (
                                                        <span className="act">Active</span>
                                                    ) : (
                                                        <button
                                                            className="btn"
                                                            style={{ padding: "4px 9px", fontSize: "10px" }}
                                                            onClick={(e) => handleSetActive(e, site.id)}
                                                        >
                                                            Set active
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Configurations Grid */}
                        <div className="adm-cfg-grid" style={{ marginTop: "14px" }}>

                            {/* Logo Placement Guidelines Card */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i className="ti ti-layout-align-middle" style={{ color: "var(--brand-bright)", marginRight: "6px" }}></i>
                                            Recommended Logo Placement
                                        </div>
                                        <div className="cs">How co-branding is composed across the platform</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>

                                        <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", padding: "10px 11px", border: "1px solid var(--line-1)", borderRadius: "9px", background: "var(--surface-1)" }}>
                                            <i className="ti ti-login" style={{ color: "var(--brand-bright)", fontSize: "17px", marginTop: "1px", flexShrink: 0 }}></i>
                                            <div>
                                                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink-0)" }}>Login page</div>
                                                <div style={{ fontSize: "11.5px", color: "var(--ink-2)", lineHeight: 1.5, marginTop: "2px" }}>
                                                    BuildOptix &amp; Partner logos displayed prominently. Customer logo shown below in a secondary position.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", padding: "10px 11px", border: "1px solid var(--line-1)", borderRadius: "9px", background: "var(--surface-1)" }}>
                                            <i className="ti ti-layout-navbar" style={{ color: "var(--brand-bright)", fontSize: "17px", marginTop: "1px", flexShrink: 0 }}></i>
                                            <div>
                                                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink-0)" }}>Application header</div>
                                                <div style={{ fontSize: "11.5px", color: "var(--ink-2)", lineHeight: 1.5, marginTop: "2px" }}>
                                                    BuildOptix as the primary platform brand, with the Partner logo alongside it.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", padding: "10px 11px", border: "1px solid var(--line-1)", borderRadius: "9px", background: "var(--surface-1)" }}>
                                            <i className="ti ti-layout-dashboard" style={{ color: "var(--brand-bright)", fontSize: "17px", marginTop: "1px", flexShrink: 0 }}></i>
                                            <div>
                                                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink-0)" }}>Dashboard</div>
                                                <div style={{ fontSize: "11.5px", color: "var(--ink-2)", lineHeight: 1.5, marginTop: "2px" }}>
                                                    Branding shown cleanly in the header — no impact on usability or screen space.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", padding: "10px 11px", border: "1px solid var(--line-1)", borderRadius: "9px", background: "var(--surface-1)" }}>
                                            <i className="ti ti-file-type-pdf" style={{ color: "var(--brand-bright)", fontSize: "17px", marginTop: "1px", flexShrink: 0 }}></i>
                                            <div>
                                                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink-0)" }}>Reports &amp; PDF exports</div>
                                                <div style={{ fontSize: "11.5px", color: "var(--ink-2)", lineHeight: 1.5, marginTop: "2px" }}>
                                                    BuildOptix, Partner and Customer logos (if configured) in the report header.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", padding: "10px 11px", border: "1px solid var(--line-1)", borderRadius: "9px", background: "var(--surface-1)" }}>
                                            <i className="ti ti-mail" style={{ color: "var(--brand-bright)", fontSize: "17px", marginTop: "1px", flexShrink: 0 }}></i>
                                            <div>
                                                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink-0)" }}>Email notifications</div>
                                                <div style={{ fontSize: "11.5px", color: "var(--ink-2)", lineHeight: 1.5, marginTop: "2px" }}>
                                                    Branding applied per the site configuration.
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Branding Policy Toggles Card */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i className="ti ti-shield-lock" style={{ color: "var(--cool)", marginRight: "6px" }}></i>
                                            Branding Policy &amp; Access
                                        </div>
                                        <div className="cs">Multi-site governance</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i className="ti ti-wand" style={{ color: "var(--brand-bright)" }}></i>
                                            Automatic branding by site
                                            <span>Apply the active site's brand automatically on entry</span>
                                        </div>
                                        <div
                                            className={`toggle ${!toggles.autoAssign ? "off" : ""}`}
                                            role="switch"
                                            aria-checked={toggles.autoAssign}
                                            tabIndex={0}
                                            onClick={() => handleToggle("autoAssign")}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i className="ti ti-browser" style={{ color: "var(--info)" }}></i>
                                            Site-specific login pages
                                            <span>Serve each site its branded login</span>
                                        </div>
                                        <div
                                            className={`toggle ${!toggles.customLoginPages ? "off" : ""}`}
                                            role="switch"
                                            aria-checked={toggles.customLoginPages}
                                            tabIndex={0}
                                            onClick={() => handleToggle("customLoginPages")}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i className="ti ti-shield-cog" style={{ color: "var(--violet)" }}></i>
                                            Role-based branding control
                                            <span>Restrict who can edit branding</span>
                                        </div>
                                        <div
                                            className={`toggle ${!toggles.roleBranding ? "off" : ""}`}
                                            role="switch"
                                            aria-checked={toggles.roleBranding}
                                            tabIndex={0}
                                            onClick={() => handleToggle("roleBranding")}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RBAC Table Card */}
                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">
                                        <i className="ti ti-lock-access" style={{ color: "var(--violet)", marginRight: "6px" }}></i>
                                        Role-Based Branding &amp; Access Control
                                    </div>
                                    <div className="cs">Who can view and manage site branding</div>
                                </div>
                            </div>
                            <div className="cb">
                                <div style={{ overflowX: "auto" }}>
                                    <table className="ab-rbac">
                                        <thead>
                                            <tr>
                                                <th>Role</th>
                                                <th className="c">Manage branding</th>
                                                <th className="c">View white-label</th>
                                                <th className="c">Custom domains</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 600, color: "var(--ink-1)" }}>Super Admin</td>
                                                <td className="c"><span className="yes">Full</span></td>
                                                <td className="c"><span className="yes">Full</span></td>
                                                <td className="c"><span className="yes">Full</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600, color: "var(--ink-1)" }}>Facility Manager</td>
                                                <td className="c"><span className="yes">Site</span></td>
                                                <td className="c"><span className="yes">View</span></td>
                                                <td className="c"><span className="yes">Edit</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600, color: "var(--ink-1)" }}>Operator</td>
                                                <td className="c"><span className="no">—</span></td>
                                                <td className="c"><span className="yes">View</span></td>
                                                <td className="c"><span className="no">—</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600, color: "var(--ink-1)" }}>Technician</td>
                                                <td className="c"><span className="no">—</span></td>
                                                <td className="c"><span className="yes">View</span></td>
                                                <td className="c"><span className="no">—</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600, color: "var(--ink-1)" }}>Auditor</td>
                                                <td className="c"><span className="no">—</span></td>
                                                <td className="c"><span className="yes">View</span></td>
                                                <td className="c"><span className="no">—</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}




        </div>
    );
};

export default AdminBrandingConfig;



const PolicyRow = ({ icon, iconColor, title, subtitle, active, onToggle }) => (
    <div>
        <div>
            <i className={`ti ${icon}`} style={{ color: iconColor }}></i>
            {title}
            <span>{subtitle}</span>
        </div>
        <div
            role="switch"
            aria-checked={active}
            tabIndex={0}
            onClick={onToggle}
        ></div>
    </div>
);

const RBACRow = ({ role, manage, view, domains }) => (
    <tr>
        <td style={{ fontWeight: 600, color: 'var(--ink-1)' }}>{role}</td>
        <td><span>{manage}</span></td>
        <td><span>{view}</span></td>
        <td><span>{domains}</span></td>
    </tr>
);