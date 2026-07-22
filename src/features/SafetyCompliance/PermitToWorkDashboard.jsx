import React, { useState } from 'react';

export default function PermitToWorkDashboard() {
  // Main Panel Navigation Tabs State (0: Active & Pending, 1: Compliance Register)
  const [activeTab, setActiveTab] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  // Accordion Toggle States for Card Details (True = Expanded, False = Collapsed)
  const [isCard42Open, setIsCard42Open] = useState(true); // Default active card open
  const [isCard41Open, setIsCard41Open] = useState(false); // Default active card closed

  // Interactive Checklist Checkbox State Management for Card PTW-2026-042
  const [isFmVerified, setIsFmVerified] = useState(false);

  // Safe global callback context fallbacks to prevent runtime dashboard crashes
  const executeGlobalToast = (message, variant) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(message, variant);
    } else {
      console.log(`[PTW Alert] Variant: ${variant} | Message: ${message}`);
    }
  };

  const executeOpenPermitModal = () => {
    if (typeof window !== 'undefined' && typeof window.openPTWModal === 'function') {
      window.openPTWModal();
    } else {
      console.log('[Modal Action] Opening New Permit to Work Creation Wizard...');
    }
  };

  return (
    <div className="page active" id="pg-ptw">
      
      {/* Sub-Tab Module Level Navigation Links */}
       <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
                <div className="ph-left">
                    <div className="live-dot"></div>

                    <div>
                        <div className="ph-title" id="dash-page-title">
                            Permit to Work
                        </div>

                        <div
                            id="dash-page-sub"
                            style={{ fontSize: "10px", color: "var(--ink-3)" }}
                        >
                          ISO 45001 · LOTO · Hot Work · Confined Space · Height
                        </div>
                    </div>
                </div>

                <div className="ph-tabs" id="dash-tab-bar">
                    <div
                        onClick={() => setActiveTab(0)}
                        className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
                    >
                      Active Permits
                    </div>

                    <div
                        onClick={() => setActiveTab(1)}
                        className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
                    >
                     Permit Register
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

      {/* ==================== TAB 0: ACTIVE &amp; PENDING MODULE ==================== */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="ptw" data-tab="0">
          
          {/* 5-Column Safety & operational KPI Metrics Overview Bar */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
            <div className="kpi glow-ok">
              <div className="kpi-l">Active Permits</div>
              <div className="kpi-v ok">3</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Pending Approval</div>
              <div className="kpi-v warn">2</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Closed Today</div>
              <div className="kpi-v ok">4</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Contractors On-Site</div>
              <div className="kpi-v">12</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Zero LTI Streak</div>
              <div className="kpi-v ok">284<span className="kpi-u">days</span></div>
            </div>
          </div>

          {/* Action Trigger Controls Header Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-1)' }}>Active &amp; Pending Permits</div>
            <button className="btn primary" style={{ padding: '6px 14px', fontSize: '11.5px', cursor: 'pointer' }} onClick={executeOpenPermitModal}>
              <i className="ti ti-plus"></i> New Permit
            </button>
          </div>

          {/* Permit Card 1: PTW-2026-042 (LOTO Isolation Panel) */}
          <div className="ptw-card ptw-active">
            <div 
              className="ptw-card-hd" 
              onClick={() => setIsCard42Open(!isCard42Open)}
              style={{ cursor: 'pointer' }}
            >
              <span className="ptw-permit-id">PTW-2026-042</span>
              <span className="ptw-type-badge ptw-type-loto">LOTO — Electrical</span>
              <span className="ptw-permit-title" style={{ marginLeft: '8px' }}>Isolation of LT Panel — MCC-B2 for Cable Replacement</span>
              <span className="badge badge-green">Active</span>
            </div>
            
            <div className="ptw-permit-body" style={{ display: isCard42Open ? 'block' : 'none' }}>
              <div className="ptw-permit-grid">
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Location</div><div className="ptw-permit-field-val">Basement B2 — MCC Room</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Contractor</div><div className="ptw-permit-field-val">Voltex Electricals Pvt Ltd</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Authorized By</div><div className="ptw-permit-field-val">Rajan Mehta (FM Manager)</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Valid From</div><div className="ptw-permit-field-val">27 May, 08:00 AM</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Valid Until</div><div className="ptw-permit-field-val">27 May, 05:00 PM</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Workers On-site</div><div className="ptw-permit-field-val" style={{ color: 'var(--ok)' }}>4 workers</div></div>
              </div>

              {/* LOTO Checklist Segments */}
              <div style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '8px', letterSpacing: '0.06em' }}>
                LOTO Isolation Checklist
              </div>
              
              <div className="ptw-checklist-row"><div className="ptw-check-box checked"><i className="ti ti-check" style={{ fontSize: '9px' }}></i></div><span class="ptw-check-lbl">Main incomer CB tripped and locked</span><span style={{ fontSize: '9.5px', color: 'var(--ok)', fontFamily: 'var(--font-mono)' }}>✓ 08:12</span></div>
              <div className="ptw-checklist-row"><div className="ptw-check-box checked"><i class="ti ti-check" style={{ fontSize: '9px' }}></i></div><span class="ptw-check-lbl">Voltage tested — confirmed dead (multimeter)</span><span style={{ fontSize: '9.5px', color: 'var(--ok)', fontFamily: 'var(--font-mono)' }}>✓ 08:18</span></div>
              <div className="ptw-checklist-row"><div className="ptw-check-box checked"><i class="ti ti-check" style={{ fontSize: '9px' }}></i></div><span class="ptw-check-lbl">Earthing leads applied to all phases</span><span style={{ fontSize: '9.5px', color: 'var(--ok)', fontFamily: 'var(--font-mono)' }}>✓ 08:22</span></div>
              <div className="ptw-checklist-row"><div className="ptw-check-box checked"><i class="ti ti-check" style={{ fontSize: '9px' }}></i></div><span class="ptw-check-lbl">Safety sign "Do Not Energize" posted</span><span style={{ fontSize: '9.5px', color: 'var(--ok)', fontFamily: 'var(--font-mono)' }}>✓ 08:25</span></div>
              <div className="ptw-checklist-row"><div className="ptw-check-box checked"><i class="ti ti-check" style={{ fontSize: '9px' }}></i></div><span class="ptw-check-lbl">PPE verified: Class E gloves, arc flash suit</span><span style={{ fontSize: '9.5px', color: 'var(--ok)', fontFamily: 'var(--font-mono)' }}>✓ 08:28</span></div>
              
              {/* Dynamic Interactive Verification Row */}
              <div className="ptw-checklist-row">
                <div 
                  className={`ptw-check-box ${isFmVerified ? 'checked' : ''}`} 
                  onClick={() => setIsFmVerified(!isFmVerified)}
                  style={{ cursor: 'pointer' }}
                >
                  {isFmVerified && <i className="ti ti-check" style={{ fontSize: '9px' }}></i>}
                </div>
                <span className="ptw-check-lbl">Work completion verification by FM Supervisor</span>
                <span style={{ fontSize: '9.5px', color: isFmVerified ? 'var(--ok)' : 'var(--warn)', fontFamily: 'var(--font-mono)' }}>
                  {isFmVerified ? '✓ Verified' : 'Pending'}
                </span>
              </div>

              {/* Action Buttons Row Context */}
              <div className="fdd-action-row" style={{ marginTop: '12px' }}>
                <button 
                  className="btn" 
                  style={{ padding: '5px 12px', fontSize: '11px', background: 'var(--bad-soft)', color: 'var(--bad)', border: '1px solid rgba(242,91,91,0.3)', cursor: 'pointer' }} 
                  onClick={() => executeGlobalToast('Permit PTW-2026-042 closed. LOTO removed. System re-energized.', 'ok')}
                >
                  <i className="ti ti-lock-open"></i>Close Permit &amp; Re-energize
                </button>
                <button 
                  className="btn" 
                  style={{ padding: '5px 12px', fontSize: '11px', cursor: 'pointer' }} 
                  onClick={() => executeGlobalToast('Permit extended to 07:00 PM — FM Manager approved', 'info')}
                >
                  <i className="ti ti-clock"></i>Extend Time
                </button>
              </div>
            </div>
          </div>

          {/* Permit Card 2: PTW-2026-041 (Hot Work Operations) */}
          <div className="ptw-card ptw-active">
            <div 
              className="ptw-card-hd" 
              onClick={() => setIsCard41Open(!isCard41Open)}
              style={{ cursor: 'pointer' }}
            >
              <span className="ptw-permit-id">PTW-2026-041</span>
              <span className="ptw-type-badge ptw-type-hot">HOT WORK</span>
              <span className="ptw-permit-title" style={{ marginLeft: '8px' }}>Welding — Condenser Water Pipe on Mechanical Floor</span>
              <span className="badge badge-green">Active</span>
            </div>
            
            <div className="ptw-permit-body" style={{ display: isCard41Open ? 'block' : 'none' }}>
              <div className="ptw-permit-grid">
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Location</div><div className="ptw-permit-field-val">Mechanical Floor — Pipe Deck</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Contractor</div><div className="ptw-permit-field-val">IndoWeld Services</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Authorized By</div><div className="ptw-permit-field-val">Rajan Mehta (FM Manager)</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Valid Until</div><div className="ptw-permit-field-val">27 May, 04:00 PM</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">Fire Watch Required</div><div className="ptw-permit-field-val" style={{ color: 'var(--ok)' }}>Yes — assigned</div></div>
                <div className="ptw-permit-field"><div className="ptw-permit-field-label">FACP Zone Isolated</div><div className="ptw-permit-field-val" style={{ color: 'var(--warn)' }}>Zone 8 temporarily isolated</div></div>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--warn-soft)', border: '1px solid rgba(245,180,65,0.25)', borderRadius: '7px', fontSize: '11px', color: 'var(--warn)' }}>
                ⚠ Smoke detector Zone 8 isolated during hot work. Fire watch warden stationed. Re-enable within 60 min of work completion.
              </div>
            </div>
          </div>

          {/* Pending Approval Permits Stack */}
          <div className="ptw-card ptw-pending">
            <div className="ptw-card-hd">
              <span className="ptw-permit-id">PTW-2026-043</span>
              <span className="ptw-type-badge ptw-type-confined">CONFINED SPACE</span>
              <span className="ptw-permit-title" style={{ marginLeft: '8px' }}>STP Underground Tank Inspection — Tank T-3</span>
              <span className="badge badge-amber">Pending Approval</span>
            </div>
          </div>

          <div className="ptw-card ptw-pending">
            <div className="ptw-card-hd">
              <span className="ptw-permit-id">PTW-2026-044</span>
              <span className="ptw-type-badge ptw-type-height">WORK AT HEIGHT</span>
              <span className="ptw-permit-title" style={{ marginLeft: '8px' }}>Rooftop Solar Panel Cleaning — Array Section C</span>
              <span className="badge badge-amber">Pending Approval</span>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 1: COMPLIANCE REGISTER MODULE ==================== */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="ptw" data-tab="1">
          
          {/* 4-Column Historical Audit Parameters Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="kpi glow-ok">
              <div className="kpi-l">PTW Compliance Rate</div>
              <div className="kpi-v ok">100<span className="kpi-u">%</span></div>
              <div className="kpi-s">all work under permit</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Permits Issued (2026)</div>
              <div className="kpi-v ok">186</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Violations (2026)</div>
              <div className="kpi-v ok">0</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Avg Permit Duration</div>
              <div className="kpi-v">4.8<span className="kpi-u">hrs</span></div>
            </div>
          </div>

          {/* Permit Log Registry Historical Table Struct */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Permit Register — May 2026</div>
              </div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={() => executeGlobalToast('Exporting PTW register to Excel...', 'info')}>
                <i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export
              </span>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr><th>Permit #</th><th>Type</th><th>Work Description</th><th>Contractor</th><th>Issued</th><th>Closed</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>PTW-2026-042</td><td><span className="ptw-type-badge ptw-type-loto" style={{ fontSize: '8.5px', padding: '2px 6px' }}>LOTO</span></td><td>MCC-B2 Cable Replacement</td><td>Voltex Electricals</td><td>27 May 08:00</td><td>—</td><td><span className="badge badge-green">Active</span></td></tr>
                  <tr><td>PTW-2026-041</td><td><span className="ptw-type-badge ptw-type-hot" style={{ fontSize: '8.5px', padding: '2px 6px' }}>Hot Work</span></td><td>Condenser Pipe Welding</td><td>IndoWeld Services</td><td>27 May 07:30</td><td>—</td><td><span className="badge badge-green">Active</span></td></tr>
                  <tr><td>PTW-2026-040</td><td><span className="ptw-type-badge ptw-type-cold" style={{ fontSize: '8.5px', padding: '2px 6px' }}>Cold Work</span></td><td>AHU Filter Replacement — B3</td><td>CoolAir Maint</td><td>26 May 09:00</td><td>26 May 13:30</td><td><span className="badge badge-cyan">Closed</span></td></tr>
                  <tr><td>PTW-2026-039</td><td><span className="ptw-type-badge ptw-type-height" style={{ fontSize: '8.5px', padding: '2px 6px' }}>Height</span></td><td>False Ceiling — Floor 4</td><td>BuildFix India</td><td>25 May 08:00</td><td>25 May 17:00</td><td><span className="badge badge-cyan">Closed</span></td></tr>
                  <tr><td>PTW-2026-038</td><td><span className="ptw-type-badge ptw-type-confined" style={{ fontSize: '8.5px', padding: '2px 6px' }}>Confined</span></td><td>Underground Tank Cleaning</td><td>CleanPro Services</td><td>23 May 07:00</td><td>23 May 15:00</td><td><span className="badge badge-cyan">Closed</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}