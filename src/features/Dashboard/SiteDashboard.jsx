import React, { useState } from 'react';

export default function SiteDashboard() {
    // एक्टिव टैब को मैनेज करने के लिए State (0 से 4 तक)
    const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

    // इक्विपमेंट स्विच करने के लिए फंक्शन
    const switchToEquipment = (type) => {
        console.log(`Switching to equipment: ${type}`);
    };

    return (
        <div className="page" id="pg-site">
            {/* टैब नेविगेशन बटन */}

            <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            Site Dashboard — Vikhroli

                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                            Mumbai · Godrej One · Live Monitoring

                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                        Summary
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                        CO₂
                    </div>

                    <div
                        onClick={() => setActiveTab(2)}
                        className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
                    >
                        Energy
                    </div>

                    <div
                        onClick={() => setActiveTab(3)}
                        className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
                    >
                        EPI
                    </div>
                    <div
                        onClick={() => setActiveTab(4)}
                        className={`ph-tab ${activeTab === 4 ? "active" : ""}`}
                    >
                        Peak Demand
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








            {/* --- TAB 0: SITE OVERVIEW --- */}
            {activeTab === 0 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                        <div className="kpi glow-cool">
                            <div className="kpi-l">Live Consumption</div>
                            <div className="kpi-v cool">4,820<span className="kpi-u">kW</span></div>
                            <div className="kpi-s">76% of 6.3 MW capacity</div>
                        </div>
                        <div className="kpi glow-ok">
                            <div className="kpi-l">EPI Score</div>
                            <div className="kpi-v ok">87</div>
                            <div className="kpi-s">Grade B+ · target 90</div>
                        </div>
                        <div className="kpi glow-info">
                            <div className="kpi-l">Occupancy Today</div>
                            <div className="kpi-v">1,840<span className="kpi-u">pax</span></div>
                        </div>
                        <div className="kpi glow-warn">
                            <div className="kpi-l">Active Alarms</div>
                            <div className="kpi-v warn">2</div>
                        </div>
                        <div className="kpi glow-ok">
                            <div className="kpi-l">Solar Now</div>
                            <div className="kpi-v ok">168<span className="kpi-u">kW</span></div>
                        </div>
                    </div>

                    <div className="g21 mb-12">
                        <div className="card">
                            <div className="ch"><div className="ct">Floor-wise Energy — Today</div></div>
                            <div className="cb">
                                <div className="i-bar"><div className="i-bar-lbl">Basement B1</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '60%', background: 'var(--info)' }}></div></div><div className="i-bar-val">480 kW</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Ground + Lobby</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '45%', background: 'var(--info)' }}></div></div><div className="i-bar-val">360 kW</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Floors 1–3</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '100%', background: 'var(--cool)' }}></div></div><div className="i-bar-val">800 kW</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Floors 4–6</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '88%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">700 kW</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Floor 7 (partial)</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '35%', background: 'var(--warn)' }}></div></div><div className="i-bar-val">280 kW</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Mechanical Floor</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '78%', background: 'var(--violet)' }}></div></div><div className="i-bar-val">620 kW</div></div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="ch"><div className="ct">System Availability</div></div>
                            <div className="cb" style={{ padding: '10px 12px' }}>
                                <div className="st-item"><div className="st-dot g"></div><div className="st-name">HVAC Zones A/B/D</div><span className="badge badge-green">OK</span></div>
                                <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => switchToEquipment('ahu')}><div className="st-dot r"></div><div className="st-name">HVAC Zone C — Floor 7</div><span className="badge badge-red">Alert</span></div>
                                <div className="st-item"><div className="st-dot g"></div><div className="st-name">Fire Safety</div><span className="badge badge-green">Normal</span></div>
                                <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => switchToEquipment('lift')}><div className="st-dot a"></div><div className="st-name">Lift-04 — Tower A</div><span className="badge badge-amber">Fault</span></div>
                                <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => switchToEquipment('solar')}><div className="st-dot g"></div><div className="st-name">Solar Array</div><span className="badge badge-green">Generating</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 1: SUSTAINABILITY / CARBON --- */}
            {activeTab === 1 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="kpi glow-ok"><div className="kpi-l">Scope 1 (Direct)</div><div className="kpi-v ok">42.6<span className="kpi-u">tCO₂e</span></div></div>
                        <div className="kpi glow-warn"><div className="kpi-l">Scope 2 (Electricity)</div><div className="kpi-v warn">128.4<span className="kpi-u">tCO₂e</span></div></div>
                        <div className="kpi glow-ok"><div className="kpi-l">Solar Offset</div><div className="kpi-v ok">−28.6<span className="kpi-u">tCO₂e</span></div></div>
                        <div className="kpi glow-info"><div className="kpi-l">Net Carbon Intensity</div><div className="kpi-v">0.48<span className="kpi-u">kgCO₂/kWh</span></div></div>
                    </div>

                    <div className="g3">
                        <div className="card">
                            <div className="ch"><div className="ct">Scope 1 — Direct Emissions</div></div>
                            <div className="cb">
                                <div className="lp-row"><span className="lp-k">DG Fuel (HSD)</span><span className="lp-v warn">38.4 tCO₂e</span></div>
                                <div className="lp-row"><span className="lp-k">Refrigerant Leakage</span><span className="lp-v">4.2 tCO₂e</span></div>
                                <div className="lp-row"><span className="lp-k">Total Scope 1</span><span className="lp-v warn">42.6 tCO₂e</span></div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="ch"><div className="ct">Scope 2 — Grid Electricity</div></div>
                            <div className="cb">
                                <div className="lp-row"><span className="lp-k">Grid Import (MTD)</span><span className="lp-v warn">1,42,000 kWh</span></div>
                                <div className="lp-row"><span className="lp-k">Emission Factor</span><span className="lp-v">0.82 kgCO₂/kWh</span></div>
                                <div className="lp-row"><span className="lp-k">Total Scope 2</span><span className="lp-v warn">128.4 tCO₂e</span></div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="ch"><div className="ct">Solar Renewable Offset</div></div>
                            <div className="cb">
                                <div className="lp-row"><span className="lp-k">Generation (MTD)</span><span className="lp-v ok">42,000 kWh</span></div>
                                <div className="lp-row"><span className="lp-k">Offset Factor</span><span className="lp-v">0.68 kgCO₂/kWh</span></div>
                                <div className="lp-row"><span className="lp-k">Total Offset</span><span className="lp-v ok">−28.6 tCO₂e</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 2: TARIFF & ENERGY --- */}
            {activeTab === 2 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="kpi glow-cool"><div className="kpi-l">Consumption MTD</div><div className="kpi-v cool">1.42L<span className="kpi-u">kWh</span></div></div>
                        <div className="kpi glow-warn"><div className="kpi-l">Cost MTD</div><div className="kpi-v warn">₹14.06<span className="kpi-u">L</span></div></div>
                        <div className="kpi glow-ok"><div className="kpi-l">Solar MTD</div><div className="kpi-v ok">42,000<span className="kpi-u">kWh</span></div></div>
                        <div className="kpi glow-info"><div className="kpi-l">Power Factor</div><div className="kpi-v">0.94</div></div>
                    </div>

                    <div className="g2">
                        <div className="card">
                            <div className="ch"><div className="ct">Energy by System</div></div>
                            <div className="cb">
                                <div className="i-bar"><div className="i-bar-lbl">Chiller Plant</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '52%', background: 'var(--cool)' }}></div></div><div className="i-bar-val">743 kWh</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">AHU System</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '18%', background: 'var(--info)' }}></div></div><div className="i-bar-val">257 kWh</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Lighting</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '20%', background: 'var(--solar)' }}></div></div><div className="i-bar-val">285 kWh</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Lifts</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '5%', background: 'var(--violet)' }}></div></div><div className="i-bar-val">72 kWh</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">IT / Misc</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '5%', background: 'var(--ink-3)' }}></div></div><div className="i-bar-val">71 kWh</div></div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="ch"><div className="ct">Tariff & Savings</div></div>
                            <div className="cb">
                                <div className="lp-row"><span className="lp-k">TOD Peak Rate</span><span className="lp-v warn">₹9.90/kWh</span></div>
                                <div className="lp-row"><span className="lp-k">TOD Off-peak</span><span className="lp-v ok">₹6.20/kWh</span></div>
                                <div className="lp-row"><span className="lp-k">Demand Charge</span><span className="lp-v">₹280/kVA</span></div>
                                <div className="lp-row"><span className="lp-k">Solar Savings MTD</span><span className="lp-v ok">₹12,276</span></div>
                                <div className="lp-row"><span className="lp-k">Total vs Budget</span><span className="lp-v ok">₹18,400 saved</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 3: EPI SCORE & IMPROVEMENTS --- */}
            {activeTab === 3 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="kpi glow-ok"><div className="kpi-l">EPI Score</div><div className="kpi-v ok">87</div><div className="kpi-s">Grade B+</div></div>
                        <div className="kpi glow-info"><div className="kpi-l">Target</div><div className="kpi-v">90</div><div className="kpi-s">Grade A threshold</div></div>
                        <div className="kpi glow-warn"><div className="kpi-l">Gap</div><div className="kpi-v warn">3 pts</div></div>
                        <div className="kpi glow-ok"><div className="kpi-l">Star Rating</div><div className="kpi-v ok">4★</div></div>
                    </div>

                    <div className="g2">
                        <div className="card">
                            <div className="ch"><div className="ct">EPI Components</div></div>
                            <div className="cb">
                                <div className="i-bar"><div className="i-bar-lbl">HVAC Efficiency</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '85%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">85/100</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Lighting Controls</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '90%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">90/100</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Building Envelope</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '82%', background: 'var(--info)' }}></div></div><div className="i-bar-val">82/100</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Renewables</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '88%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">88/100</div></div>
                                <div className="i-bar"><div className="i-bar-lbl">Metering & Controls</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '92%', background: 'var(--ok)' }}></div></div><div className="i-bar-val">92/100</div></div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="ch"><div className="ct">Improvement Actions</div></div>
                            <div className="cb">
                                <div style={{ background: 'var(--surface-2)', borderLeft: '3px solid var(--ok)', borderRadius: '0 7px 7px 0', padding: '10px 12px', marginBottom: '8px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-0)' }}>Chiller Setpoint +0.5°C</div>
                                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>+1.5 EPI pts · ₹4,200/day saving</div>
                                </div>
                                <div style={{ background: 'var(--surface-2)', borderLeft: '3px solid var(--info)', borderRadius: '0 7px 7px 0', padding: '10px 12px', marginBottom: '8px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-0)' }}>LED Upgrade Floor 4</div>
                                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>+0.8 EPI pts · ROI 18 months</div>
                                </div>
                                <div style={{ background: 'var(--surface-2)', borderLeft: '3px solid var(--violet)', borderRadius: '0 7px 7px 0', padding: '10px 12px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-0)' }}>Solar Expansion 100 kWp</div>
                                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>+0.7 EPI pts · ₹18L/yr</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 4: DEMAND ANALYSIS (CHART) --- */}
            {activeTab === 4 && (
                <div className="tab-panel active">
                    <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="kpi glow-warn"><div className="kpi-l">Today Peak</div><div className="kpi-v warn">4,820<span className="kpi-u">kW</span></div><div className="kpi-s">at 11:00 AM</div></div>
                        <div className="kpi glow-ok"><div className="kpi-l">Sanctioned Demand</div><div className="kpi-v">6,300<span className="kpi-u">kW</span></div><div className="kpi-s">76.5% utilised</div></div>
                        <div className="kpi glow-bad"><div className="kpi-l">TOD Peak Rate</div><div className="kpi-v bad">₹9.90<span className="kpi-u">/kWh</span></div></div>
                        <div className="kpi glow-ok"><div className="kpi-l">Demand Response Saving</div><div className="kpi-v ok">₹42,000<span className="kpi-u">/mo</span></div></div>
                    </div>

                    <div className="card">
                        <div className="ch"><div><div className="ct">15-Min Interval Demand — Today</div></div></div>
                        <div className="cb">
                            <svg className="chart-svg" viewBox="0 0 500 100">
                                <line x1="0" y1="10" x2="500" y2="10" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="40" x2="500" y2="40" stroke="var(--line-1)" strokeWidth="0.5" />
                                <line x1="0" y1="70" x2="500" y2="70" stroke="var(--line-1)" strokeWidth="0.5" />
                                <text x="2" y="9" fontSize="8" fill="var(--ink-3)">5000</text>
                                <text x="2" y="39" fontSize="8" fill="var(--ink-3)">4000</text>
                                <text x="2" y="69" fontSize="8" fill="var(--ink-3)">3000</text>
                                <path d="M25,85 L55,70 L85,50 L115,40 L145,25 L175,15 L205,17 L235,30 L265,45 L295,55 L325,60 L355,57 L385,53 L415,50 L445,47" fill="none" stroke="var(--info)" strokeWidth="2" />
                                <path d="M25,85 L55,70 L85,50 L115,40 L145,25 L175,15 L205,17 L235,30 L265,45 L295,55 L325,60 L355,57 L385,53 L415,50 L445,47 L445,90 L25,90 Z" fill="rgba(78,161,255,0.06)" />
                                <circle cx="175" cy="15" r="4" fill="var(--warn)" stroke="var(--bg-1)" strokeWidth="1.5" />
                                <text x="183" y="26" fontSize="8" fill="var(--warn)">Peak 4,820 kW · 11:00</text>
                                <text x="25" y="100" fontSize="7" fill="var(--ink-3)">06:00</text>
                                <text x="115" y="100" fontSize="7" fill="var(--ink-3)">08:00</text>
                                <text x="205" y="100" fontSize="7" fill="var(--warn)">10:00</text>
                                <text x="295" y="100" fontSize="7" fill="var(--ink-3)">12:00</text>
                                <text x="385" y="100" fontSize="7" fill="var(--ink-3)">14:00</text>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}