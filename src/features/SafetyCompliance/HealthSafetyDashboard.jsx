import React, { useState } from 'react';

export default function HealthSafetyDashboard() {
    // Tab/Navigation Management State for Health & Safety View
    // (0: Overview, 1: Fire Fighting, 2: Evacuation, 3: Incidents, 4: Compliance)
    const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
    // Safe window-level action callbacks to avoid crashes
    const handleNavTo = (page, tabIndex) => {
        if (typeof window !== 'undefined' && typeof window.navTo === 'function') {
            window.navTo(page, tabIndex);
        } else {
            console.log(`Navigating to page: ${page}, tab: ${tabIndex}`);
            setActiveTab(tabIndex);
        }
    };

    const handleEquipmentSwitch = (equipmentType) => {
        if (typeof window !== 'undefined' && typeof window.switchToEquipment === 'function') {
            window.switchToEquipment(equipmentType);
        } else {
            console.log(`Switching context view to: ${equipmentType}`);
        }
    };

    // Helper method for toast notifications
    const triggerToast = (msg, type) => {
        if (typeof window !== 'undefined' && typeof window.toast === 'function') {
            window.toast(msg, type);
        } else {
            alert(`${type.toUpperCase()}: ${msg}`);
        }
    };



    return (
        <div className="page active" id="pg-health-safety">

            <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            Health & Safety
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Fire · Life Safety · Emergency Systems
                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                        Dashboard
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                        Fire Fighting
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                        Evacuation
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                        Incidents
                    </div>
                    <div
                        onClick={() => setActiveTab(4)}
                        className={`ph-tab ${activeTab === 4 ? "active" : ""}`}
                    >
                        Compliance
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
            <div
                className={`tab-panel ${activeTab === 0 ? 'active' : ''}`}
                data-page="health_safety"
                data-tab="0"
                style={{ display: activeTab === 0 ? 'block' : 'none' }}
            >
                {/* 5-Column Safety KPI Strip */}
                <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
                    <div className="kpi glow-ok clickable" title="Go to Fire Fighting" onClick={() => setActiveTab(1)}>
                        <div className="kpi-l">Fire System Status</div>
                        <div className="kpi-v ok">Normal</div>
                        <div className="kpi-s">All 128 zones clear</div>
                    </div>
                    <div className="kpi glow-ok clickable" title="Go to Fire Fighting" onClick={() => setActiveTab(1)}>
                        <div className="kpi-l">Detectors Online</div>
                        <div className="kpi-v ok">482<span className="kpi-u">/482</span></div>
                        <div className="kpi-s">100% reporting</div>
                    </div>
                    <div className="kpi glow-bad clickable" title="Go to Incidents" onClick={() => setActiveTab(3)}>
                        <div className="kpi-l">Open H&amp;S Incidents</div>
                        <div className="kpi-v bad">2</div>
                        <div className="kpi-s">minor · investigation open</div>
                    </div>
                    <div className="kpi glow-info clickable" title="Go to Evacuation" onClick={() => setActiveTab(2)}>
                        <div className="kpi-l">Last Fire Drill</div>
                        <div className="kpi-v">03 May</div>
                        <div className="kpi-s">17 days ago</div>
                    </div>
                    <div className="kpi glow-ok clickable" title="Go to Compliance" onClick={() => setActiveTab(4)}>
                        <div className="kpi-l">Compliance Score</div>
                        <div className="kpi-v ok">97<span className="kpi-u">%</span></div>
                        <div className="kpi-s">NBC 2016 · Fire NOC ✓</div>
                    </div>
                </div>

                {/* Status Breakdown Section */}
                <div className="g21 mb-12">
                    {/* Life Safety Systems Logs */}
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Life Safety Systems — Status Overview</div>
                                <div className="cs">All building safety systems · Live</div>
                            </div>
                        </div>
                        <div className="cb" style={{ padding: '10px 12px' }}>
                            <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => handleNavTo('health_safety', 1)}>
                                <div className="st-dot g"></div>
                                <div className="st-name">
                                    <i className="ti ti-flame" style={{ fontSize: '13px', color: 'var(--bad)' }}></i>
                                    &nbsp; Fire Detection &amp; Suppression
                                </div>
                                <span className="badge badge-green">All Clear</span>
                            </div>

                            <div className="st-item">
                                <div className="st-dot g"></div>
                                <div className="st-name">
                                    <i className="ti ti-door-exit" style={{ fontSize: '13px', color: 'var(--warn)' }}></i>
                                    &nbsp; Emergency Evacuation Routes
                                </div>
                                <span className="badge badge-green">Unobstructed</span>
                            </div>

                            <div className="st-item">
                                <div className="st-dot g"></div>
                                <div className="st-name">
                                    <i className="ti ti-first-aid-kit" style={{ fontSize: '13px', color: 'var(--ok)' }}></i>
                                    &nbsp; First Aid Stations (14)
                                </div>
                                <span className="badge badge-green">Stocked</span>
                            </div>

                            <div className="st-item">
                                <div className="st-dot g"></div>
                                <div className="st-name">
                                    <i className="ti ti-phone-call" style={{ fontSize: '13px', color: 'var(--info)' }}></i>
                                    &nbsp; PA / Emergency Communication
                                </div>
                                <span className="badge badge-green">Tested</span>
                            </div>

                            <div className="st-item">
                                <div className="st-dot a"></div>
                                <div className="st-name">
                                    <i className="ti ti-stairs" style={{ fontSize: '13px', color: 'var(--warn)' }}></i>
                                    &nbsp; Stairwell Lighting
                                </div>
                                <span className="badge badge-amber">FL4 dim — work order raised</span>
                            </div>

                            <div className="st-item">
                                <div className="st-dot g"></div>
                                <div className="st-name">
                                    <i className="ti ti-camera" style={{ fontSize: '13px', color: 'var(--info)' }}></i>
                                    &nbsp; CCTV Surveillance
                                </div>
                                <span className="badge badge-green">24 / 24 Online</span>
                            </div>

                            <div className="st-item">
                                <div className="st-dot g"></div>
                                <div className="st-name">
                                    <i className="ti ti-building-skyscraper" style={{ fontSize: '13px', color: 'var(--violet)' }}></i>
                                    &nbsp; DG / Emergency Power
                                </div>
                                <span className="badge badge-green">Armed &amp; Ready</span>
                            </div>
                        </div>
                    </div>

                    {/* Compliance Strategy Cards */}
                    <div className="card">
                        <div className="ch"><div className="ct">Compliance Calendar</div></div>
                        <div className="cb">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                                <div style={{ background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ok)' }}>✓ Fire NOC — Renewed</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>Valid until 31 Dec 2026 · MCFD</div>
                                </div>

                                <div style={{ background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ok)' }}>✓ Annual Fire Audit Passed</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>04 Feb 2026 · Next: Feb 2027</div>
                                </div>

                                <div style={{ background: 'var(--warn-soft)', border: '1px solid rgba(245,180,65,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--warn)' }}>⚠ Fire Extinguisher Recharge Due</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>14 of 96 extinguishers — due 31 May 2026</div>
                                </div>

                                <div style={{ background: 'var(--info-soft)', border: '1px solid rgba(78,161,255,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--info)' }}>ℹ Quarterly Fire Drill Planned</div>
                                    <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>Scheduled: 05 Jun 2026 · 10:00 AM</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`tab-panel ${activeTab === 1 ? 'active' : ''}`}
                style={{ display: activeTab === 1 ? 'block' : 'none' }}
            >
                <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Panel Status</div>
                        <div className="kpi-v ok">Normal</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Active Zones</div>
                        <div className="kpi-v ok">128</div>
                        <div className="kpi-s">all healthy</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Smoke Detectors</div>
                        <div className="kpi-v ok">482<span className="kpi-u">/482</span></div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Sprinkler Pressure</div>
                        <div className="kpi-v ok">4.2<span className="kpi-u">bar</span></div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Battery Backup</div>
                        <div className="kpi-v ok">24.4<span className="kpi-u">V</span></div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="g21 mb-12">
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Sprinkler System — Pressure Trend</div>
                                <div className="cs">bar · Last 24 hours · All zones</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span className="pill ok"><span className="dot ok"></span>Pressurised</span>
                                <button
                                    className="btn"
                                    style={{ padding: '4px 10px', fontSize: '10.5px' }}
                                    onClick={() => handleEquipmentSwitch('fire')}
                                >
                                    <i className="ti ti-external-link"></i> Fire Panel
                                </button>
                            </div>
                        </div>
                        <div className="cb">
                            <svg className="chart-svg" viewBox="0 0 480 100">
                                <line x1="0" y1="15" x2="480" y2="15" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="40" x2="480" y2="40" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="65" x2="480" y2="65" stroke="var(--line-1)" strokeWidth="0.5" />
                                <text x="0" y="14" fontSize="7.5" fill="var(--ink-3)">5.0</text>
                                <text x="0" y="39" fontSize="7.5" fill="var(--ink-3)">4.5</text>
                                <text x="0" y="64" fontSize="7.5" fill="var(--ink-3)">4.0</text>

                                <path
                                    d="M15,40 L50,42 L80,38 L110,42 L140,40 L170,38 L200,42 L230,40 L260,38 L290,42 L320,40 L350,38 L380,42 L410,40 L440,38 L470,40"
                                    fill="none"
                                    stroke="var(--cool)"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M15,40 L50,42 L80,38 L110,42 L140,40 L170,38 L200,42 L230,40 L260,38 L290,42 L320,40 L350,38 L380,42 L410,40 L440,38 L470,40 L470,90 L15,90 Z"
                                    fill="rgba(52,210,230,0.06)"
                                />
                                <line x1="0" y1="58" x2="480" y2="58" stroke="var(--bad)" strokeWidth="0.8" strokeDasharray="5 3" />
                                <text x="420" y="55" fontSize="7" fill="var(--bad)">Min 3.5 bar</text>

                                <text x="15" y="92" fontSize="7" fill="var(--ink-3)">00:00</text>
                                <text x="110" y="92" fontSize="7" fill="var(--ink-3)">06:00</text>
                                <text x="200" y="92" fontSize="7" fill="var(--ink-3)">12:00</text>
                                <text x="290" y="92" fontSize="7" fill="var(--ink-3)">18:00</text>
                                <text x="400" y="92" fontSize="7" fill="var(--ink-3)">Now</text>
                            </svg>
                        </div>
                    </div>

                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Fire Detector Events — 30 Days</div>
                                <div className="cs">Alarms · Faults · Test events</div>
                            </div>
                        </div>
                        <div className="cb">
                            <svg className="chart-svg" viewBox="0 0 220 90">
                                <line x1="0" y1="20" x2="220" y2="20" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="50" x2="220" y2="50" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="80" x2="220" y2="80" stroke="var(--line-1)" strokeWidth="0.5" />

                                <path
                                    d="M5,78 L30,78 L30,55 L40,78 L80,78 L80,48 L95,78 L140,78 L140,60 L155,78 L190,78 L190,50 L205,78 L215,78"
                                    fill="none"
                                    stroke="var(--violet)"
                                    strokeWidth="1.5"
                                />
                                <path d="M5,79 L215,79" fill="none" stroke="var(--bad)" strokeWidth="1.5" />
                                <text x="90" y="44" fontSize="7" fill="var(--violet)">Test drill</text>
                                <text x="155" y="56" fontSize="7" fill="var(--violet)">Dirty det.</text>
                                <text x="5" y="88" fontSize="7" fill="var(--ink-3)">01 May</text>
                                <text x="85" y="88" fontSize="7" fill="var(--ink-3)">10 May</text>
                                <text x="165" y="88" fontSize="7" fill="var(--ink-3)">20 May</text>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="g3 mb-12">
                    {/* Battery Voltage Trend */}
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Battery Voltage — Fire Panel</div>
                                <div className="cs">V · 24-hour trend</div>
                            </div>
                        </div>
                        <div className="cb">
                            <svg className="chart-svg" viewBox="0 0 220 80">
                                <line x1="0" y1="20" x2="220" y2="20" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="50" x2="220" y2="50" stroke="var(--line-1)" strokeWidth="0.5" />
                                <text x="0" y="19" fontSize="7" fill="var(--ink-3)">25V</text>
                                <text x="0" y="49" fontSize="7" fill="var(--ink-3)">24V</text>
                                <path
                                    d="M10,32 L40,30 L70,32 L100,30 L130,32 L160,30 L190,32 L210,30"
                                    fill="none"
                                    stroke="var(--ok)"
                                    strokeWidth="1.5"
                                />
                                <text x="10" y="72" fontSize="7" fill="var(--ink-3)">00</text>
                                <text x="100" y="72" fontSize="7" fill="var(--ink-3)">12</text>
                                <text x="185" y="72" fontSize="7" fill="var(--ink-3)">Now</text>
                            </svg>
                        </div>
                    </div>

                    {/* Dynamic 32-Zone Matrix */}
                    <div className="card">
                        <div className="ch">
                            <div><div className="ct">Zone Status Matrix</div></div>
                        </div>
                        <div className="cb">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '4px', marginBottom: '8px' }}>
                                {Array.from({ length: 32 }, (_, i) => {
                                    let statusBg = 'var(--ok)';
                                    if (i === 7) statusBg = 'var(--bad)';      // Zone 8 Fault
                                    if (i === 23) statusBg = 'var(--warn)';    // Zone 24 Maintenance

                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                width: '100%',
                                                aspectRatio: '1',
                                                borderRadius: '3px',
                                                background: statusBg,
                                                opacity: 0.8
                                            }}
                                            title={`Zone ${i + 1}`}
                                        />
                                    );
                                })}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', display: 'flex', gap: '12px' }}>
                                <span><span style={{ color: 'var(--ok)' }}>■</span> 30 Normal</span>
                                <span><span style={{ color: 'var(--bad)' }}>■</span> 1 Fault</span>
                                <span><span style={{ color: 'var(--warn)' }}>■</span> 1 Maint</span>
                            </div>
                        </div>
                    </div>

                    {/* Extinguisher Inventory */}
                    <div className="card">
                        <div className="ch">
                            <div><div className="ct">Extinguisher Inventory</div></div>
                        </div>
                        <div className="cb">
                            <div className="i-bar">
                                <div className="i-bar-lbl">CO₂ (BC class)</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '100%', background: 'var(--ok)' }}></div>
                                </div>
                                <div className="i-bar-val">36 / 36</div>
                            </div>
                            <div className="i-bar">
                                <div className="i-bar-lbl">ABC Dry Powder</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '100%', background: 'var(--ok)' }}></div>
                                </div>
                                <div className="i-bar-val">28 / 28</div>
                            </div>
                            <div className="i-bar">
                                <div className="i-bar-lbl">Water (Class A)</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '85%', background: 'var(--warn)' }}></div>
                                </div>
                                <div className="i-bar-val" style={{ color: 'var(--warn)' }}>17 / 20 ⚠</div>
                            </div>
                            <div className="i-bar">
                                <div className="i-bar-lbl">K-Class (Kitchen)</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '75%', background: 'var(--warn)' }}></div>
                                </div>
                                <div className="i-bar-val" style={{ color: 'var(--warn)' }}>9 / 12 ⚠</div>
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '10px', color: 'var(--warn)' }}>
                                ⚠ 14 extinguishers due recharge by 31 May
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= TAB 2: EVACUATION ROUTES & DRILLS ================= */}
            <div
                className={`tab-panel ${activeTab === 2 ? 'active' : ''}`}
                style={{ display: activeTab === 2 ? 'block' : 'none' }}
            >
                <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Evacuation Routes</div>
                        <div className="kpi-v ok">Clear</div>
                        <div className="kpi-s">all exits unobstructed</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Assembly Points</div>
                        <div className="kpi-v ok">4</div>
                        <div className="kpi-s">marked &amp; accessible</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Last Drill Time</div>
                        <div className="kpi-v ok">8.4<span className="kpi-u">min</span></div>
                        <div className="kpi-s">full building 03 May</div>
                    </div>
                    <div className="kpi glow-info">
                        <div className="kpi-l">Max Occupancy</div>
                        <div className="kpi-v">2,048<span className="kpi-u">pax</span></div>
                        <div className="kpi-s">NBC 2016 limit</div>
                    </div>
                </div>

                <div className="g2 mb-12">
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Evacuation Route Status — Vikhroli</div>
                                <div className="cs">All floors · Exit signage · Emergency lighting</div>
                            </div>
                        </div>
                        <div className="cb" style={{ padding: 0 }}>
                            <table className="dt">
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Route</th>
                                        <th>Exit Width</th>
                                        <th>Emergency Light</th>
                                        <th>Signage</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Stairwell S1 — Tower A</b></td>
                                        <td>All floors → Ground</td>
                                        <td>1.5m</td>
                                        <td style={{ color: 'var(--ok)' }}>Working</td>
                                        <td style={{ color: 'var(--ok)' }}>OK</td>
                                        <td><span className="badge badge-green">Clear</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Stairwell S2 — Tower A</b></td>
                                        <td>All floors → Ground</td>
                                        <td>1.5m</td>
                                        <td style={{ color: 'var(--ok)' }}>Working</td>
                                        <td style={{ color: 'var(--ok)' }}>OK</td>
                                        <td><span className="badge badge-green">Clear</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Fire Escape — East Wing</b></td>
                                        <td>Fl 4–7 → Ground</td>
                                        <td>1.2m</td>
                                        <td style={{ color: 'var(--warn)' }}>FL4 Dim ⚠</td>
                                        <td style={{ color: 'var(--ok)' }}>OK</td>
                                        <td><span className="badge badge-amber">Work Order</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Main Lobby Exit</b></td>
                                        <td>Ground → Assembly A</td>
                                        <td>4.5m</td>
                                        <td style={{ color: 'var(--ok)' }}>Working</td>
                                        <td style={{ color: 'var(--ok)' }}>OK</td>
                                        <td><span className="badge badge-green">Clear</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Basement Exit B1</b></td>
                                        <td>B1 → Open Air</td>
                                        <td>2.4m</td>
                                        <td style={{ color: 'var(--ok)' }}>Working</td>
                                        <td style={{ color: 'var(--ok)' }}>OK</td>
                                        <td><span className="badge badge-green">Clear</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Terrace Access</b></td>
                                        <td>Roof → Helo Evac</td>
                                        <td>0.9m</td>
                                        <td style={{ color: 'var(--ok)' }}>Working</td>
                                        <td style={{ color: 'var(--ok)' }}>OK</td>
                                        <td><span className="badge badge-green">Clear</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <div className="ch">
                            <div className="ct">Drill Performance History</div>
                            <div className="cs">Evacuation time · All staff · Vikhroli</div>
                        </div>
                        <div className="cb">
                            <svg className="chart-svg" viewBox="0 0 240 110">
                                <line x1="0" y1="15" x2="240" y2="15" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="45" x2="240" y2="45" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="75" x2="240" y2="75" stroke="var(--line-1)" strokeWidth="0.5" />
                                <text x="0" y="14" fontSize="7" fill="var(--ink-3)">15m</text>
                                <text x="0" y="44" fontSize="7" fill="var(--ink-3)">10m</text>
                                <text x="0" y="74" fontSize="7" fill="var(--ink-3)">5m</text>

                                <rect x="20" y="35" width="22" height="40" rx="2" fill="var(--bad)" opacity="0.7" />
                                <rect x="55" y="38" width="22" height="37" rx="2" fill="var(--warn)" opacity="0.7" />
                                <rect x="90" y="42" width="22" height="33" rx="2" fill="var(--warn)" opacity="0.7" />
                                <rect x="125" y="45" width="22" height="30" rx="2" fill="var(--info)" opacity="0.7" />
                                <rect x="160" y="50" width="22" height="25" rx="2" fill="var(--ok)" opacity="0.9" />

                                <line x1="0" y1="60" x2="240" y2="60" stroke="var(--warn)" strokeWidth="0.8" strokeDasharray="4 3" />
                                <text x="180" y="57" fontSize="6.5" fill="var(--warn)">NBC limit 10m</text>

                                <text x="31" y="100" fontSize="7" fill="var(--ink-3)" textAnchor="middle">Aug 25</text>
                                <text x="66" y="100" fontSize="7" fill="var(--ink-3)" textAnchor="middle">Nov 25</text>
                                <text x="101" y="100" fontSize="7" fill="var(--ink-3)" textAnchor="middle">Feb 26</text>
                                <text x="136" y="100" fontSize="7" fill="var(--ink-3)" textAnchor="middle">Mar 26</text>
                                <text x="171" y="100" fontSize="7" fill="var(--ok)" textAnchor="middle">May 26 ✓</text>

                                <text x="31" y="92" fontSize="6.5" fill="var(--bad)" textAnchor="middle">12.8m</text>
                                <text x="66" y="92" fontSize="6.5" fill="var(--warn)" textAnchor="middle">11.2m</text>
                                <text x="101" y="92" fontSize="6.5" fill="var(--warn)" textAnchor="middle">10.5m</text>
                                <text x="136" y="92" fontSize="6.5" fill="var(--info)" textAnchor="middle">9.6m</text>
                                <text x="171" y="92" fontSize="6.5" fill="var(--ok)" textAnchor="middle">8.4m</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= TAB 3: INCIDENT REGISTER & SAFETY LOGS ================= */}
            <div
                className={`tab-panel ${activeTab === 3 ? 'active' : ''}`}
                style={{ display: activeTab === 3 ? 'block' : 'none' }}
            >
                <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
                    <div className="kpi glow-bad">
                        <div className="kpi-l">Open Incidents (2026)</div>
                        <div className="kpi-v bad">2</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Closed This Year</div>
                        <div className="kpi-v ok">14</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Days Since Last LTI</div>
                        <div className="kpi-v ok">284</div>
                        <div className="kpi-s">Lost Time Injury</div>
                    </div>
                    <div className="kpi glow-info">
                        <div className="kpi-l">Near Misses</div>
                        <div className="kpi-v">3</div>
                        <div className="kpi-s">reported YTD</div>
                    </div>
                </div>

                {/* Open Incidents */}
                <div className="card mb-12">
                    <div className="ch">
                        <div><div className="ct">Open Incident Register</div></div>
                        <span
                            className="ca"
                            style={{ cursor: 'pointer' }}
                            onClick={() => triggerToast('Raising new incident report...', 'info')}
                        >
                            + New Incident
                        </span>
                    </div>
                    <div className="cb" style={{ padding: 0 }}>
                        <table className="dt">
                            <thead>
                                <tr>
                                    <th>Incident #</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Severity</th>
                                    <th>Injured</th>
                                    <th>Status</th>
                                    <th>Investigator</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>INC-2026-018</td>
                                    <td>Slip on wet floor — Lobby</td>
                                    <td>18 May 2026</td>
                                    <td>Ground Lobby</td>
                                    <td><span className="badge badge-amber">Minor</span></td>
                                    <td>1 (visitor)</td>
                                    <td><span className="badge badge-amber">Investigation</span></td>
                                    <td>Safety Officer</td>
                                </tr>
                                <tr>
                                    <td>INC-2026-015</td>
                                    <td>Near-miss — electrical panel open</td>
                                    <td>12 May 2026</td>
                                    <td>Basement B1</td>
                                    <td><span className="badge badge-red">Moderate</span></td>
                                    <td>0</td>
                                    <td><span className="badge badge-amber">Root Cause Analysis</span></td>
                                    <td>EHS Manager</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Closed Incidents */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Closed Incidents — 2026 YTD</div></div>
                    </div>
                    <div className="cb" style={{ padding: 0 }}>
                        <table className="dt">
                            <thead>
                                <tr>
                                    <th>Incident #</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Severity</th>
                                    <th>Root Cause</th>
                                    <th>Closed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>INC-2026-012</td>
                                    <td>Minor cut — maintenance work</td>
                                    <td>02 May</td>
                                    <td><span className="badge badge-cyan">Minor</span></td>
                                    <td>PPE not worn</td>
                                    <td style={{ color: 'var(--ok)' }}>09 May ✓</td>
                                </tr>
                                <tr>
                                    <td>INC-2026-008</td>
                                    <td>Near-miss — ladder fall risk</td>
                                    <td>14 Apr</td>
                                    <td><span className="badge badge-amber">Moderate</span></td>
                                    <td>Improper ladder use</td>
                                    <td style={{ color: 'var(--ok)' }}>22 Apr ✓</td>
                                </tr>
                                <tr>
                                    <td>INC-2026-003</td>
                                    <td>Smoke detector false alarm</td>
                                    <td>20 Mar</td>
                                    <td><span className="badge badge-cyan">Minor</span></td>
                                    <td>Dusty sensor</td>
                                    <td style={{ color: 'var(--ok)' }}>21 Mar ✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div
                className={`tab-panel ${activeTab === 4 ? 'active' : ''}`}
                style={{ display: activeTab === 4 ? 'block' : 'none' }}
            >      {/* KPI Top Strip */}
                <div
                    className="kpi-strip mb-14"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}
                >
                    <div className="kpi glow-ok">
                        <div className="kpi-l">H&amp;S Compliance Score</div>
                        <div className="kpi-v ok">
                            97<span className="kpi-u">%</span>
                        </div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Valid Certifications</div>
                        <div className="kpi-v ok">
                            12<span className="kpi-u">/12</span>
                        </div>
                    </div>
                    <div className="kpi glow-warn">
                        <div className="kpi-l">Due for Renewal (60d)</div>
                        <div className="kpi-v warn">2</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Staff Trained (2026)</div>
                        <div className="kpi-v ok">
                            98<span className="kpi-u">%</span>
                        </div>
                    </div>
                </div>

                {/* Main Grid: Statutory Register & Training Scores */}
                <div className="g2">
                    {/* Statutory Compliance Table */}
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Statutory Compliance Register</div>
                                <div className="cs">All certifications · Vikhroli site</div>
                            </div>
                        </div>
                        <div className="cb" style={{ padding: 0 }}>
                            <table className="dt">
                                <thead>
                                    <tr>
                                        <th>Certificate</th>
                                        <th>Issuing Authority</th>
                                        <th>Valid Until</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Fire NOC</b></td>
                                        <td>Mumbai CFO / MCFD</td>
                                        <td style={{ color: 'var(--ok)' }}>31 Dec 2026</td>
                                        <td><span className="badge badge-green">Valid</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Occupancy Certificate</b></td>
                                        <td>MCGM</td>
                                        <td style={{ color: 'var(--ok)' }}>Permanent</td>
                                        <td><span className="badge badge-green">Valid</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Lift Inspection Certificate</b></td>
                                        <td>Dept. of Steam Boilers</td>
                                        <td style={{ color: 'var(--warn)' }}>30 Jun 2026</td>
                                        <td><span className="badge badge-amber">Renewal Due</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Electrical Safety Audit</b></td>
                                        <td>MSEDCL / CEA</td>
                                        <td style={{ color: 'var(--ok)' }}>15 Jan 2027</td>
                                        <td><span className="badge badge-green">Valid</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>DG Set Registration</b></td>
                                        <td>Pollution Control Board</td>
                                        <td style={{ color: 'var(--warn)' }}>31 Jul 2026</td>
                                        <td><span className="badge badge-amber">Renewal Due</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>Water Treatment License</b></td>
                                        <td>BMC</td>
                                        <td style={{ color: 'var(--ok)' }}>31 Mar 2027</td>
                                        <td><span className="badge badge-green">Valid</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>LEED Certification</b></td>
                                        <td>IGBC / GBCI</td>
                                        <td style={{ color: 'var(--ok)' }}>Nov 2027</td>
                                        <td><span className="badge badge-green">Gold</span></td>
                                    </tr>
                                    <tr>
                                        <td><b>ISO 45001 — OHS</b></td>
                                        <td>Bureau Veritas</td>
                                        <td style={{ color: 'var(--ok)' }}>Oct 2026</td>
                                        <td><span className="badge badge-green">Certified</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Training Compliance Progress Bars */}
                    <div className="card">
                        <div className="ch">
                            <div className="ct">H&amp;S Training Compliance</div>
                        </div>
                        <div className="cb">
                            <div className="i-bar">
                                <div className="i-bar-lbl">Fire Safety Induction</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '98%', background: 'var(--ok)' }}></div>
                                </div>
                                <div className="i-bar-val" style={{ color: 'var(--ok)' }}>98%</div>
                            </div>

                            <div className="i-bar">
                                <div className="i-bar-lbl">Emergency First Aid</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '88%', background: 'var(--info)' }}></div>
                                </div>
                                <div className="i-bar-val">88%</div>
                            </div>

                            <div className="i-bar">
                                <div className="i-bar-lbl">Evacuation Drill Participation</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '100%', background: 'var(--ok)' }}></div>
                                </div>
                                <div className="i-bar-val" style={{ color: 'var(--ok)' }}>100%</div>
                            </div>

                            <div className="i-bar">
                                <div className="i-bar-lbl">PPE Usage Compliance</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '94%', background: 'var(--ok)' }}></div>
                                </div>
                                <div className="i-bar-val">94%</div>
                            </div>

                            <div className="i-bar">
                                <div className="i-bar-lbl">Hazardous Material Handling</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '85%', background: 'var(--warn)' }}></div>
                                </div>
                                <div className="i-bar-val" style={{ color: 'var(--warn)' }}>85%</div>
                            </div>

                            <div className="i-bar">
                                <div className="i-bar-lbl">Working at Height</div>
                                <div className="i-bar-track">
                                    <div className="i-bar-fill" style={{ width: '92%', background: 'var(--ok)' }}></div>
                                </div>
                                <div className="i-bar-val">92%</div>
                            </div>

                            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--line-1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                    <span style={{ color: 'var(--ink-2)' }}>Overall H&amp;S Training Score</span>
                                    <span style={{ fontWeight: 600, color: 'var(--ok)', fontFamily: 'var(--font-mono)' }}>
                                        93.5%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}