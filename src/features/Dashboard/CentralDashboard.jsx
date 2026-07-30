import React, { useState } from 'react';
import "../../App.css"
import { showToast } from '../../utils/toast';
// === 1. छोटे रीयूजेबल कंपोनेंट्स ===

// KPI कार्ड कंपोनेंट (Tab 0 के लिए)
const DashKPI = ({ title, iconClass, iconColor, label, value, unit, detail, trendClass, onClick }) => (
    <div className="dash-kpi clickable" title={title} onClick={onClick}>
        <div className="dash-kpi-i">
            <i className={iconClass} style={{ color: iconColor }}></i>
        </div>
        <div className="dash-kpi-l">{label}</div>
        <div className="dash-kpi-v">
            {value}
            {unit && <span className="dash-kpi-u">{unit}</span>}
        </div>
        <div className={`dash-kpi-d ${trendClass || ''}`}>{detail}</div>
    </div>
);

// ESG KPI कार्ड (Tab 1 के लिए)
const ESGKpi = ({ glowClass, label, value, unit, valueClass, subtext }) => (
    <div className={`kpi ${glowClass}`}>
        <div className="kpi-l">{label}</div>
        <div className={`kpi-v ${valueClass || ''}`}>
            {value}
            {unit && <span className="kpi-u">{unit}</span>}
        </div>
        {subtext && <div className="kpi-s">{subtext}</div>}
    </div>
);

// प्रोग्रेस बार कंपोनेंट
const LoadBar = ({ label, percentage, val, bgColor }) => (
    <div className="i-bar">
        <div className="i-bar-lbl">{label}</div>
        <div className="i-bar-track">
            <div className="i-bar-fill" style={{ width: `${percentage}%`, background: bgColor }}></div>
        </div>
        <div className="i-bar-val">{val}</div>
    </div>
);

// मैप व्यू के नीचे दिखने वाले छोटे कार्ड्स
const MiniSiteCard = ({ name, statusDot, load, epi, alarms, degraded, onClick }) => (
    <div className="card" style={{ cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
        <div className="ch">
            <div className="ct" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={`dot ${statusDot}`}></span>
                {name}
            </div>
        </div>
        <div className="cb">
            <div className="lp-row"><span className="lp-k">Live Load</span><span class="lp-v">{load}</span></div>
            <div className="lp-row"><span className="lp-k">EPI</span><span className="lp-v ok">{epi}</span></div>
            {alarms !== undefined && <div className="lp-row"><span className="lp-k">Alarms</span><span className="lp-v bad">{alarms}</span></div>}
            {degraded && <div className="lp-row"><span className="lp-k">Status</span><span className="lp-v bad">Degraded</span></div>}
        </div>
    </div>
);


// === 2. मुख्य डैशबोर्ड कंपोनेंट ===

export default function CentralDashboardMain() {
    // एक्टिव टैब को मैनेज करने के लिए स्टेट (0: Central, 1: CO2, 2: Map, 3: Energy)
    const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
    // डमी नेविगेशन और टोस्ट फंक्शन्स (आपके पुराने प्रोजेक्ट लॉजिक के हिसाब से बदलने के लिए)
    const kpiNav = (target, tabIndex) => {
        console.log(`Navigating to ${target}, tab: ${tabIndex}`);
        // अगर आप इसी पेज के टैब बदलना चाहते हैं:
        if (target === 'site' || target === 'syshealth' || target === 'energy') {
            // लॉजिक के अनुसार टैब इंडेक्स सेट करें
        }
    };

    const navTo = (page, index) => console.log(`NavTo page: ${page}, index: ${index}`);
    const toast = (msg, type) => alert(`${type.toUpperCase()}: ${msg}`);

    return (
        <div className="page active" id="pg-central">

            {/* टैब बदलने के लिए कंट्रोल्स (अगर आपके HTML में बाहर हैं, तो इसे कस्टमाइज़ कर सकते हैं) */}
            <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            Central Dashboard
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Portfolio Overview — All Sites
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
                        CO₂ & ESG
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                        Map View
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                        Energy Trends
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

            {/* --- TAB 0: CENTRAL OVERVIEW --- */}
            {activeTab === 0 && (
                <div className="tab-panel active">
                    {/* KPI रो */}
                    <div className="dash-kpi-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                        <DashKPI title="Go to Energy & Utilities" iconClass="ti ti-bolt" iconColor="var(--solar)" label="Portfolio Energy (MTD)" value="4.82" unit="MWh" detail="↘ 3.1% vs last month" trendClass="up" onClick={() => kpiNav('energy', 0)} />
                        <DashKPI title="Go to Alerts" iconClass="ti ti-bell" iconColor="var(--bad)" label="Active Alarms" value="7" detail="3 critical · 4 warning" onClick={() => kpiNav('alerts', 0)} />
                        <DashKPI title="Go to System Health" iconClass="ti ti-building" iconColor="var(--info)" label="Sites Online" value="5 / 6" detail="1 degraded — Chennai" onClick={() => kpiNav('syshealth', 0)} />
                        <DashKPI title="Go to System Health" iconClass="ti ti-heart-rate-monitor" iconColor="var(--ok)" label="Avg System Health" value="93" unit="%" detail="↑ 2% vs last week" trendClass="up" onClick={() => kpiNav('syshealth', 0)} />
                        <DashKPI title="Go to Site Dashboard CO₂" iconClass="ti ti-leaf" iconColor="var(--ok)" label="CO₂ Saved Today" value="1,932" unit="kg" detail="via solar generation" onClick={() => kpiNav('site', 1)} />
                        <DashKPI title="Go to Logbooks — sign-off queue" iconClass="ti ti-notebook" iconColor="var(--gold)" label="Logbooks · Pending Sign-off" value="7" detail="CE / Property Head" onClick={() => navTo('logbooks', 2)} />
                    </div>

                    {/* मिडिल सेक्शन: लोड डिस्ट्रीब्यूशन और डोनट चार्ट */}
                    <div className="g21 mb-14" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                        {/* लाइव लोड बार चार्ट */}
                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">Portfolio Load Distribution — Live</div>
                                    <div className="cs">kW consumption by site · 10:24 AM</div>
                                </div>
                            </div>
                            <div className="cb">
                                <LoadBar label="Mumbai — Vikhroli" percentage={100} val="680 kW" bgColor="var(--info)" />
                                <LoadBar label="Delhi — Sector 62" percentage={76} val="520 kW" bgColor="var(--ok)" />
                                <LoadBar label="Hyderabad" percentage={71} val="480 kW" bgColor="var(--cool)" />
                                <LoadBar label="Bengaluru" percentage={65} val="440 kW" bgColor="var(--gold)" />
                                <LoadBar label="Pune" percentage={57} val="390 kW" bgColor="var(--violet)" />
                                <LoadBar label="Kolkata" percentage={46} val="310 kW" bgColor="var(--warn)" />
                            </div>
                        </div>

                        {/* डोनट चार्ट कार्ड */}
                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">Site Energy Share</div>
                                    <div className="cs">% of portfolio · May 2026</div>
                                </div>
                            </div>
                            <div className="cb">
                                <div className="dnt-wrap">
                                    <svg width="90" height="90" viewBox="0 0 90 90">
                                        <circle cx="45" cy="45" r="32" fill="none" stroke="var(--line-2)" strokeWidth="10" />
                                        <circle cx="45" cy="45" r="32" fill="none" stroke="var(--info)" strokeWidth="10" strokeDasharray="60 141" strokeDashoffset="0" transform="rotate(-90 45 45)" />
                                        <circle cx="45" cy="45" r="32" fill="none" stroke="var(--ok)" strokeWidth="10" strokeDasharray="45 156" strokeDashoffset="-60" transform="rotate(-90 45 45)" />
                                        <circle cx="45" cy="45" r="32" fill="none" stroke="var(--gold)" strokeWidth="10" strokeDasharray="38 163" strokeDashoffset="-105" transform="rotate(-90 45 45)" />
                                        <circle cx="45" cy="45" r="32" fill="none" stroke="var(--violet)" strokeWidth="10" strokeDasharray="33 168" strokeDashoffset="-143" transform="rotate(-90 45 45)" />
                                        <circle cx="45" cy="45" r="32" fill="none" stroke="var(--warn)" strokeWidth="10" strokeDasharray="25 176" strokeDashoffset="-176" transform="rotate(-90 45 45)" />
                                        <text x="45" y="41" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink-0)">4.82</text>
                                        <text x="45" y="52" textAnchor="middle" fontSize="8" fill="var(--ink-3)">MWh</text>
                                    </svg>
                                    <div className="dnt-leg">
                                        <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--info)' }}></div><span className="dnt-lbl">Mumbai</span><span className="dnt-pct">30%</span></div>
                                        <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--ok)' }}></div><span className="dnt-lbl">Delhi</span><span className="dnt-pct">23%</span></div>
                                        <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--gold)' }}></div><span className="dnt-lbl">Hyderabad</span><span className="dnt-pct">20%</span></div>
                                        <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--violet)' }}></div><span className="dnt-lbl">Bengaluru</span><span className="dnt-pct">17%</span></div>
                                        <div className="dnt-item"><div className="dnt-dot" style={{ background: 'var(--warn)' }}></div><span className="dnt-lbl">Others</span><span className="dnt-pct">10%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* नीचे की परफॉरमेंस टेबल */}
                    <div className="card mb-12">
                        <div className="ch">
                            <div><div className="ct">Site-wise Energy Performance — May 2026</div></div>
                            <span className="ca" style={{ cursor: 'pointer' }} onClick={() => showToast('Exporting XLSX...', 'ok')}>Export XLSX →</span>
                        </div>
                        <div className="cb" style={{ padding: 0 }}>
                            <table className="dt">
                                <thead>
                                    <tr>
                                        <th>Site</th><th>Consumption</th><th>Cost</th><th>₹/kWh</th><th>EPI Score</th><th>Grade</th><th>vs Budget</th><th>Power Factor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td><b>Mumbai — Vikhroli</b></td><td>1,42,000 kWh</td><td>₹14.06L</td><td>9.90</td><td style={{ fontWeight: 700, color: 'var(--info)' }}>87</td><td><span className="badge badge-cyan">B+</span></td><td style={{ color: 'var(--ok)' }}>₹18,400 saved</td><td style={{ color: 'var(--ok)' }}>0.94</td></tr>
                                    <tr><td><b>Delhi — Sector 62</b></td><td>1,08,000 kWh</td><td>₹10.69L</td><td>9.90</td><td style={{ fontWeight: 700, color: 'var(--ok)' }}>91</td><td><span className="badge badge-green">A</span></td><td style={{ color: 'var(--ok)' }}>₹24,800 saved</td><td style={{ color: 'var(--ok)' }}>0.96</td></tr>
                                    <tr><td><b>Bengaluru</b></td><td>91,000 kWh</td><td>₹9.01L</td><td>9.90</td><td style={{ fontWeight: 700, color: 'var(--ok)' }}>94</td><td><span className="badge badge-green">A+</span></td><td style={{ color: 'var(--ok)' }}>₹31,200 saved</td><td style={{ color: 'var(--ok)' }}>0.97</td></tr>
                                    <tr><td><b>Hyderabad</b></td><td>1,24,000 kWh</td><td>₹12.28L</td><td>9.90</td><td style={{ fontWeight: 700, color: 'var(--info)' }}>89</td><td><span className="badge badge-cyan">B+</span></td><td style={{ color: 'var(--ok)' }}>₹12,600 saved</td><td style={{ color: 'var(--info)' }}>0.92</td></tr>
                                    <tr><td><b>Pune</b></td><td>98,000 kWh</td><td>₹9.70L</td><td>9.90</td><td style={{ fontWeight: 700, color: 'var(--warn)' }}>82</td><td><span className="badge badge-amber">B</span></td><td style={{ color: 'var(--bad)' }}>₹4,800 over</td><td style={{ color: 'var(--warn)' }}>0.88</td></tr>
                                    <tr><td><b>Kolkata</b></td><td>59,000 kWh</td><td>₹5.84L</td><td>9.90</td><td style={{ fontWeight: 700, color: 'var(--info)' }}>88</td><td><span className="badge badge-cyan">B+</span></td><td style={{ color: 'var(--ok)' }}>₹8,200 saved</td><td style={{ color: 'var(--ok)' }}>0.93</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 1: CO₂ & ESG --- */}
            {activeTab === 1 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        <ESGKpi glowClass="glow-warn" label="Portfolio CO₂ (MTD)" value="842" unit="tCO₂e" valueClass="warn" subtext="Scope 1+2 combined" />
                        <ESGKpi glowClass="glow-ok" label="Solar Offset (MTD)" value="−148" unit="tCO₂e" valueClass="ok" />
                        <ESGKpi glowClass="glow-info" label="Net Carbon Intensity" value="0.48" unit="kgCO₂/kWh" />
                        <ESGKpi glowClass="glow-ok" label="ESG Score" value="78" unit="/100" valueClass="ok" subtext="GRESB benchmark" />
                    </div>

                    <div className="g2 mb-12" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* SVG बार चार्ट */}
                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">Monthly CO₂ Emissions — Portfolio</div>
                                    <div className="cs">tCO₂e · Jan–May 2026</div>
                                </div>
                            </div>
                            <div className="cb">
                                <svg className="chart-svg" viewBox="0 0 420 100">
                                    <line x1="0" y1="10" x2="420" y2="10" stroke="var(--line-1)" strokeWidth="0.5" />
                                    <line x1="0" y1="40" x2="420" y2="40" stroke="var(--line-1)" strokeWidth="0.5" />
                                    <line x1="0" y1="70" x2="420" y2="70" stroke="var(--line-1)" strokeWidth="0.5" />
                                    <text x="0" y="9" fontSize="7" fill="var(--ink-3)">1000</text>
                                    <text x="0" y="39" fontSize="7" fill="var(--ink-3)">800</text>
                                    <text x="0" y="69" fontSize="7" fill="var(--ink-3)">600</text>
                                    <rect x="20" y="18" width="40" height="62" rx="2" fill="var(--warn)" opacity="0.7" />
                                    <rect x="100" y="22" width="40" height="58" rx="2" fill="var(--warn)" opacity="0.7" />
                                    <rect x="180" y="25" width="40" height="55" rx="2" fill="var(--warn)" opacity="0.7" />
                                    <rect x="260" y="28" width="40" height="52" rx="2" fill="var(--info)" opacity="0.7" />
                                    <rect x="340" y="30" width="40" height="50" rx="2" fill="var(--ok)" opacity="0.8" />
                                    <text x="40" y="92" fontSize="7.5" fill="var(--ink-3)" textAnchor="middle">Jan</text>
                                    <text x="120" y="92" fontSize="7.5" fill="var(--ink-3)" textAnchor="middle">Feb</text>
                                    <text x="200" y="92" fontSize="7.5" fill="var(--ink-3)" textAnchor="middle">Mar</text>
                                    <text x="280" y="92" fontSize="7.5" fill="var(--ink-3)" textAnchor="middle">Apr</text>
                                    <text x="360" y="92" fontSize="7.5" fill="var(--ok)" textAnchor="middle">May ↓</text>
                                </svg>
                            </div>
                        </div>

                        {/* KPI लिस्ट */}
                        <div className="card">
                            <div className="ch"><div><div className="ct">ESG KPIs — Portfolio</div></div></div>
                            <div className="cb">
                                <div className="lp-row"><span className="lp-k">Total CO₂ (YTD)</span><span className="lp-v warn">3,840 tCO₂e</span></div>
                                <div className="lp-row"><span className="lp-k">Solar Offset (YTD)</span><span className="lp-v ok">−620 tCO₂e</span></div>
                                <div className="lp-row"><span className="lp-k">Renewable Share</span><span className="lp-v ok">18.4%</span></div>
                                <div className="lp-row"><span className="lp-k">Water Consumption</span><span className="lp-v">1,240 kL/mo</span></div>
                                <div className="lp-row"><span className="lp-k">Waste Recycled</span><span className="lp-v ok">62%</span></div>
                                <div className="lp-row"><span className="lp-k">LEED Status</span><span className="lp-v ok">Gold — Vikhroli</span></div>
                                <div className="lp-row"><span className="lp-k">IGBC Rating</span><span className="lp-v ok">4★ Certified</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 2: MAP VIEW --- */}
            {activeTab === 2 && (
                <div className="tab-panel active">
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', color: 'var(--ink-2)' }}>Portfolio Map — 6 Sites</span>
                        <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                            <div className="filter-chip active">All Sites</div>
                            <div className="filter-chip">Online Only</div>
                            <div className="filter-chip">Alarms</div>
                        </div>
                    </div>

                    {/* भारत का SVG नक्शा */}
                    <div className="card mb-12">
                        <div className="cb" style={{ padding: 0, position: 'relative', minHeight: '360px', background: 'linear-gradient(135deg,var(--bg-2),var(--surface-1))', borderRadius: 'var(--radius-lg)' }}>
                            <svg width="100%" viewBox="0 0 700 380" style={{ display: 'block' }}>
                                <path d="M120,20 L240,10 L360,20 L440,50 L500,80 L540,140 L560,200 L540,280 L500,320 L440,360 L380,370 L340,350 L300,340 L260,320 L220,300 L180,260 L140,220 L100,180 L80,140 L90,80 Z" fill="rgba(78,161,255,0.05)" stroke="var(--line-2)" strokeWidth="1.5" strokeLinejoin="round" />

                                {/* Mumbai Pin */}
                                <circle cx="195" cy="240" r="16" fill="var(--info)" opacity="0.2" />
                                <circle cx="195" cy="240" r="8" fill="var(--info)" />
                                <circle cx="195" cy="240" r="3" fill="white" />
                                <text x="195" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--info)">Mumbai</text>
                                <text x="195" y="273" textAnchor="middle" fontSize="8" fill="var(--ink-3)">680 kW · 2 alarms</text>

                                {/* Delhi Pin */}
                                <circle cx="290" cy="100" r="16" fill="var(--ok)" opacity="0.2" />
                                <circle cx="290" cy="100" r="8" fill="var(--ok)" />
                                <circle cx="290" cy="100" r="3" fill="white" />
                                <text x="290" y="122" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--ok)">Delhi</text>
                                <text x="290" y="133" textAnchor="middle" fontSize="8" fill="var(--ink-3)">520 kW · 0 alarms</text>

                                {/* Bengaluru Pin */}
                                <circle cx="270" cy="290" r="16" fill="var(--ok)" opacity="0.2" />
                                <circle cx="270" cy="290" r="8" fill="var(--ok)" />
                                <circle cx="270" cy="290" r="3" fill="white" />
                                <text x="270" y="312" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--ok)">Bengaluru</text>

                                {/* Hyderabad Pin */}
                                <circle cx="320" cy="220" r="16" fill="var(--info)" opacity="0.2" />
                                <circle cx="320" cy="220" r="8" fill="var(--info)" />
                                <circle cx="320" cy="220" r="3" fill="white" />
                                <text x="320" y="242" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--info)">Hyderabad</text>

                                {/* Pune Pin */}
                                <circle cx="220" cy="220" r="16" fill="var(--warn)" opacity="0.2" />
                                <circle cx="220" cy="220" r="8" fill="var(--warn)" />
                                <circle cx="220" cy="220" r="3" fill="white" />
                                <text x="220" y="242" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warn)">Pune</text>

                                {/* Kolkata Pin */}
                                <circle cx="430" cy="160" r="12" fill="var(--bad)" opacity="0.2" />
                                <circle cx="430" cy="160" r="7" fill="var(--bad)" />
                                <circle cx="430" cy="160" r="2.5" fill="white" />
                                <text x="430" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--bad)">Kolkata</text>
                                <text x="430" y="191" textAnchor="middle" fontSize="8" fill="var(--bad)">Degraded</text>

                                {/* Legend */}
                                <circle cx="520" cy="40" r="6" fill="var(--ok)" /><text x="530" y="44" fontSize="9" fill="var(--ink-2)">Online</text>
                                <circle cx="520" cy="58" r="6" fill="var(--warn)" /><text x="530" y="62" fontSize="9" fill="var(--ink-2)">Warning</text>
                                <circle cx="520" cy="76" r="6" fill="var(--bad)" /><text x="530" y="80" fontSize="9" fill="var(--ink-2)">Degraded</text>
                            </svg>
                        </div>
                    </div>

                    {/* नक्शे के नीचे की ग्रिड */}
                    <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                        <MiniSiteCard name="Mumbai — Vikhroli" statusDot="ok" load="680 kW" epi="87" alarms={2} onClick={() => navTo('site', this)} />
                        <MiniSiteCard name="Delhi — Sector 62" statusDot="ok" load="520 kW" epi="91" alarms={0} />
                        <MiniSiteCard name="Kolkata" statusDot="bad" load="310 kW" epi="88" degraded={true} />
                    </div>
                </div>
            )}

            {/* --- TAB 3: ENERGY TRENDS --- */}
            {activeTab === 3 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        <ESGKpi glowClass="glow-cool" label="Portfolio Consumption (MTD)" value="4.82" unit="MWh" valueClass="cool" subtext="↓ 3.1% vs last month" />
                        <ESGKpi glowClass="glow-warn" label="Total Energy Cost (MTD)" value="₹34.2" unit="L" subtext={<span style={{ color: 'var(--ok)' }}>₹2.1L savings</span>} />
                        <ESGKpi glowClass="glow-ok" label="Solar Generation" value="340" unit="kWh/d avg" valueClass="ok" />
                        <ESGKpi glowClass="glow-info" label="Avg Tariff" value="₹9.90" unit="/kWh" />
                    </div>

                    {/* वेव/लाइन चार्ट */}
                    <div className="card mb-12">
                        <div className="ch">
                            <div>
                                <div className="ct">Monthly Energy Trend — All Sites</div>
                                <div className="cs">kWh · Jan–May 2026</div>
                            </div>
                            <span className="ca" style={{ cursor: 'pointer' }} onClick={() => navTo('energy', this)}>Full Energy Page →</span>
                        </div>
                        <div className="cb">
                            <svg className="chart-svg" viewBox="0 0 520 110">
                                <line x1="40" y1="10" x2="520" y2="10" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="40" y1="40" x2="520" y2="40" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="40" y1="70" x2="520" y2="70" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="40" y1="100" x2="520" y2="100" stroke="var(--line-1)" strokeWidth="0.5" />
                                <text x="2" y="13" fontSize="9" fill="var(--ink-3)">5.2M</text>
                                <text x="2" y="43" fontSize="9" fill="var(--ink-3)">4.8M</text>
                                <text x="2" y="73" fontSize="9" fill="var(--ink-3)">4.4M</text>
                                <text x="2" y="103" fontSize="9" fill="var(--ink-3)">4.0M</text>
                                <path d="M70,85 L165,72 L260,68 L355,60 L450,55 L450,100 L70,100 Z" fill="rgba(78,161,255,0.06)" />
                                <path d="M70,85 L165,72 L260,68 L355,60 L450,55" fill="none" stroke="var(--info)" strokeWidth="2.5" />
                                <line x1="40" y1="65" x2="520" y2="65" stroke="var(--warn)" strokeWidth="1" strokeDasharray="5 3" />
                                <circle cx="70" cy="85" r="4" fill="var(--info)" />
                                <circle cx="165" cy="72" r="4" fill="var(--info)" />
                                <circle cx="260" cy="68" r="4" fill="var(--info)" />
                                <circle cx="355" cy="60" r="4" fill="var(--info)" />
                                <circle cx="450" cy="55" r="4" fill="var(--ok)" />
                                <text x="70" y="115" fontSize="9" fill="var(--ink-3)" textAnchor="middle">Jan</text>
                                <text x="165" y="115" fontSize="9" fill="var(--ink-3)" textAnchor="middle">Feb</text>
                                <text x="260" y="115" fontSize="9" fill="var(--ink-3)" textAnchor="middle">Mar</text>
                                <text x="355" y="115" fontSize="9" fill="var(--ink-3)" textAnchor="middle">Apr</text>
                                <text x="450" y="115" fontSize="9" fill="var(--ok)" textAnchor="middle">May ↓</text>
                            </svg>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}