import React, { useState } from 'react';

const ReportsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState('dmr'); // 'hlp' or 'dmr'

  // Mock handler functions (Toast / Action replacement)
  const handleToast = (message, type = 'info') => {
    alert(`[${type.toUpperCase()}]: ${message}`);
  };

  const handleDownload = (type, format) => {
    handleToast(`Downloading ${type.toUpperCase()} report as ${format}...`, 'ok');
  };

  const handleEmail = (type) => {
    handleToast(`Sending ${type.toUpperCase()} report via email...`, 'info');
  };
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  // Filter States for Custom Report Builder
  const [dateRange, setDateRange] = useState('Today');
  const [site, setSite] = useState('All Sites');
  const [outputFormat, setOutputFormat] = useState('PDF');

  // Dummy scheduled reports state to handle toggle
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: 'Daily HLP Report', freq: 'Daily', time: '07:00 AM', format: 'PDF + XLSX', recipients: 'CE, Property Head', cc: '/ GM, Ops Head', retry: '3× / 30 min', lastSent: 'Today 07:00', status: 'Active' },
    { id: 2, name: 'Daily DMR Report', freq: 'Daily', time: '07:00 AM', format: 'PDF + XLSX', recipients: 'CE, Property Head', cc: '/ Energy Mgr', retry: '3× / 30 min', lastSent: 'Today 07:00', status: 'Active' },
    { id: 3, name: 'Daily Ops Summary', freq: 'Daily', time: '07:00 AM', format: 'PDF', recipients: 'FM, GM, Property Head', cc: '', retry: 'On', lastSent: 'Today 07:00', status: 'Active' },
    { id: 4, name: 'Weekly Energy Report', freq: 'Every Monday', time: '08:00 AM', format: 'XLSX + PDF', recipients: 'Energy Mgr, CFO', cc: '', retry: 'On', lastSent: '05 May', status: 'Active' },
    { id: 5, name: 'Monthly CO₂ & ESG', freq: '1st of month', time: '09:00 AM', format: 'PDF', recipients: 'Sustainability Head, Board', cc: '', retry: 'On', lastSent: '01 May', status: 'Active' },
    { id: 6, name: 'SLA Compliance Report', freq: '1st of month', time: '09:00 AM', format: 'XLSX + PDF', recipients: 'FM, Ops Head', cc: '', retry: 'On', lastSent: '01 May', status: 'Active' },
    { id: 7, name: 'Asset PM Schedule', freq: 'Weekly · Mon', time: '07:00 AM', format: 'XLSX', recipients: 'FM, Maintenance Team', cc: '', retry: 'On', lastSent: '05 May', status: 'Active' },
    { id: 8, name: 'Anomaly Digest', freq: 'Weekly · Fri', time: '18:00', format: 'PDF', recipients: 'FM, Engineering Head', cc: '', retry: 'On', lastSent: '02 May', status: 'Failed 09 May' },
  ]);

  // Toast Handler Helper
  const showToast = (message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  // Toggle Status Handler
  const handleToggleStatus = (id) => {
    setScheduledReports((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Paused' : 'Active' }
          : item
      )
    );
  };

  // Retry Handler for Failed Delivery
  const handleRetry = (id) => {
    showToast('Retrying delivery…');
    setTimeout(() => {
      showToast('✓ Anomaly Digest delivered');
      setScheduledReports((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'Active' } : item
        )
      );
    }, 1400);
  };




  return (
    <div className="page active" id="pg-reports">

      {toastMessage && (
        <div className="toast-banner" style={{ padding: '8px 16px', background: '#333', color: '#fff', position: 'fixed', bottom: '20px', right: '20px', borderRadius: '4px', zIndex: 1000 }}>
          {toastMessage}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
        <div className="ph-left">
          <div className="live-dot"></div>

          <div>
            <div className="ph-title" id="dash-page-title">
              Reports & Bills
            </div>

            <div
              id="dash-page-sub"
              style={{ fontSize: "10px", color: "var(--ink-3)" }}
            >
              Daily HLP / DMR · Scheduled · Downloads
            </div>
          </div>
        </div>

        <div className="ph-tabs" id="dash-tab-bar">
          <div
            onClick={() => setActiveTab(0)}
            className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
          >
            Daily Reports
          </div>

          <div
            onClick={() => setActiveTab(1)}
            className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
          >
            Library
          </div>

          <div
            onClick={() => setActiveTab(2)}
            className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
          >
            Scheduled
          </div>

          <div
            onClick={() => setActiveTab(3)}
            className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
          >
            Bills
          </div>
          <div
            onClick={() => setActiveTab(4)}
            className={`ph-tab ${activeTab === 4 ? "active" : ""}`}
          >
            Custom
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




      {/* Tab 0: Daily Reports (HLP / DMR) */}
      {activeTab === 0 && (
        <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="reports" data-tab="0">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div
              className="kpi glow-info clickable"
              title="Open today's DMR"
              onClick={() => viewDailyReport && viewDailyReport('dmr')}
            >
              <div className="kpi-l">Today's DMR</div>
              <div className="kpi-v">Ready</div>
              <div className="kpi-s">auto-built 06:00</div>
            </div>
            <div
              className="kpi glow-ok clickable"
              title="Open today's HLP"
              onClick={() => viewDailyReport && viewDailyReport('hlp')}
            >
              <div className="kpi-l">Today's HLP</div>
              <div className="kpi-v ok">Ready</div>
              <div className="kpi-s">auto-built 06:00</div>
            </div>
            <div
              className="kpi glow-ok clickable"
              title="View scheduled deliveries"
              onClick={() => navTo && navTo('reports', 2)}
            >
              <div className="kpi-l">Email Delivery</div>
              <div className="kpi-v ok">On time</div>
              <div className="kpi-s">last sent 07:00</div>
            </div>
            <div
              className="kpi glow-info clickable"
              title="View scheduled deliveries"
              onClick={() => navTo && navTo('reports', 2)}
            >
              <div className="kpi-l">Next Auto-Email</div>
              <div className="kpi-v">
                Tomorrow<span className="kpi-u" style={{ fontSize: '10px' }}> 07:00</span>
              </div>
              <div className="kpi-s">to CE + Property Head</div>
            </div>
          </div>

          {/* HLP / DMR hero cards */}
          <div className="rep-hero">
            {/* HLP Hero Card */}
            <div className="rep-hero-card">
              <div className="rep-hero-top">
                <div className="rep-hero-ic"><i className="ti ti-clipboard-data"></i></div>
                <div>
                  <div className="rep-hero-name">Daily HLP Report</div>
                  <div className="rep-hero-tag">High-Level Performance · Daily</div>
                </div>
              </div>
              <div className="rep-hero-desc">
                Consolidated daily snapshot for the Chief Engineer &amp; Property Head — energy summary, DG &amp; HVAC load, water &amp; diesel, ambient conditions. Section totals roll up across the month.
              </div>
              <div className="rep-meta-row">
                <div><div className="rep-meta-k">Site</div><div className="rep-meta-v">Godrej One, Vikhroli</div></div>
                <div><div className="rep-meta-k">Period</div><div className="rep-meta-v">01–31 May 2026</div></div>
                <div><div className="rep-meta-k">Generated</div><div className="rep-meta-v">Today · 06:00</div></div>
              </div>
              <div className="rep-hero-actions">
                <button
                  className="btn primary"
                  style={{ padding: '6px 14px', fontSize: '11px' }}
                  onClick={() => viewDailyReport && viewDailyReport('hlp')}
                >
                  <i className="ti ti-eye"></i>View
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport('hlp', 'PDF')}
                >
                  <i className="ti ti-download"></i>PDF
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport('hlp', 'XLSX')}
                >
                  <i className="ti ti-file-spreadsheet"></i>XLSX
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => emailReportNow && emailReportNow('hlp')}
                >
                  <i className="ti ti-mail-fast"></i>Email Now
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => openReportSchedule && openReportSchedule('hlp')}
                >
                  <i className="ti ti-calendar-clock"></i>Schedule
                </button>
              </div>
            </div>

            {/* DMR Hero Card */}
            <div className="rep-hero-card dmr">
              <div className="rep-hero-top">
                <div className="rep-hero-ic"><i className="ti ti-gauge"></i></div>
                <div>
                  <div className="rep-hero-name">Daily DMR Report</div>
                  <div className="rep-hero-tag">Daily Meter Reading · Meter-level</div>
                </div>
              </div>
              <div className="rep-hero-desc">
                Full meter-level consumption — Incomer, DG, HVAC, Main, Common Area, Tenant, Water, Diesel/HSD, Gas &amp; Temperature. One column per day with per-section totals, exactly as circulated to ops.
              </div>
              <div className="rep-meta-row">
                <div><div className="rep-meta-k">Site</div><div className="rep-meta-v">Godrej One, Vikhroli</div></div>
                <div><div className="rep-meta-k">Period</div><div className="rep-meta-v">01–31 May 2026</div></div>
                <div><div className="rep-meta-k">Meters</div><div className="rep-meta-v">142 across 11 groups</div></div>
              </div>
              <div className="rep-hero-actions">
                <button
                  className="btn primary"
                  style={{ padding: '6px 14px', fontSize: '11px' }}
                  onClick={() => viewDailyReport && viewDailyReport('dmr')}
                >
                  <i className="ti ti-eye"></i>View
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport('dmr', 'PDF')}
                >
                  <i className="ti ti-download"></i>PDF
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport('dmr', 'XLSX')}
                >
                  <i className="ti ti-file-spreadsheet"></i>XLSX
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => emailReportNow && emailReportNow('dmr')}
                >
                  <i className="ti ti-mail-fast"></i>Email Now
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => openReportSchedule && openReportSchedule('dmr')}
                >
                  <i className="ti ti-calendar-clock"></i>Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Branded sectioned report viewer */}
          <div className="rep-viewer" id="rep-viewer">
            <div className="rep-doc-hd">
              <div className="rep-doc-brand">
                <div className="rep-doc-logo">BO</div>
                <div>
                  <div className="rep-doc-t" id="rep-doc-title">
                    {reportType === 'hlp' ? 'Daily High-Level Performance Report — HLP' : 'Daily Meter Reading Report — DMR'}
                  </div>
                  <div className="rep-doc-s" id="rep-doc-sub">Godrej One, Vikhroli · 01–05 May 2026 · BuildOptix IBOS</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div className="filter-bar" style={{ marginBottom: 0 }}>
                  <span
                    className={`filter-chip ${reportType === 'hlp' ? 'active' : ''}`}
                    id="repchip-hlp"
                    onClick={() => renderReport && renderReport('hlp')}
                  >
                    HLP
                  </span>
                  <span
                    className={`filter-chip ${reportType === 'dmr' ? 'active' : ''}`}
                    id="repchip-dmr"
                    onClick={() => renderReport && renderReport('dmr')}
                  >
                    DMR
                  </span>
                </div>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport(REP_ACTIVE, 'PDF')}
                >
                  <i className="ti ti-download"></i>PDF
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport(REP_ACTIVE, 'XLSX')}
                >
                  <i className="ti ti-file-spreadsheet"></i>XLSX
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => downloadReport && downloadReport(REP_ACTIVE, 'CSV')}
                >
                  <i className="ti ti-file-text"></i>CSV
                </button>
                <button
                  className="btn primary"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => emailReportNow && emailReportNow(REP_ACTIVE)}
                >
                  <i className="ti ti-mail-fast"></i>Email
                </button>
              </div>
            </div>

            <div className="rep-doc-body">
              <table className="rep-tbl" id="rep-tbl">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Meter Name</th>
                    <th>01 May</th>
                    <th>02 May</th>
                    <th>03 May</th>
                    <th>04 May</th>
                    <th>05 May</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Incomer Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Incomer Electricity Meter Consumption<span className="rep-sec-unit">kWh</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>TSSEB</td>
                    <td className="rep-num">8,912</td>
                    <td className="rep-num">9,432</td>
                    <td className="rep-num">9,880</td>
                    <td className="rep-num">9,210</td>
                    <td className="rep-num">9,560</td>
                  </tr>
                  <tr className="rep-total-row">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">8,912</td>
                    <td className="rep-num">9,432</td>
                    <td className="rep-num">9,880</td>
                    <td className="rep-num">9,210</td>
                    <td className="rep-num">9,560</td>
                  </tr>

                  {/* Power Generators Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Power Generators Meter Consumption<span className="rep-sec-unit">kWh</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>DG 1</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</td>
                    <td>DG 2</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>
                  <tr className="rep-total-row">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>

                  {/* HVAC Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>HVAC Meters Consumption<span className="rep-sec-unit">kWh</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>AC Panel - 1</td>
                    <td className="rep-num">968.40</td>
                    <td className="rep-num">1,056</td>
                    <td className="rep-num">1,116.30</td>
                    <td className="rep-num">1,042</td>
                    <td className="rep-num">1,190</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</td>
                    <td>AHU 1 Panel-1</td>
                    <td className="rep-num">105.15</td>
                    <td className="rep-num">109.27</td>
                    <td className="rep-num">155.19</td>
                    <td className="rep-num">131</td>
                    <td className="rep-num">142</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>3</td>
                    <td>AHU-2 Panel 2</td>
                    <td className="rep-num">43.18</td>
                    <td className="rep-num">52.63</td>
                    <td className="rep-num">83.53</td>
                    <td className="rep-num">61</td>
                    <td className="rep-num">77</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>4</td>
                    <td>AHU-3 Panel 2</td>
                    <td className="rep-num">131.92</td>
                    <td className="rep-num">144.47</td>
                    <td className="rep-num">170.03</td>
                    <td className="rep-num">150</td>
                    <td className="rep-num">166</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>5</td>
                    <td>Chiller 1</td>
                    <td className="rep-num">1,464.40</td>
                    <td className="rep-num">1,720.70</td>
                    <td className="rep-num">1,791.50</td>
                    <td className="rep-num">1,655</td>
                    <td className="rep-num">1,820</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>6</td>
                    <td>Chiller 3</td>
                    <td className="rep-num">3.06</td>
                    <td className="rep-num">3.13</td>
                    <td className="rep-num">3.06</td>
                    <td className="rep-num">3.10</td>
                    <td className="rep-num">3.20</td>
                  </tr>
                  <tr className="rep-total-row">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">2,716.11</td>
                    <td className="rep-num">3,086.20</td>
                    <td className="rep-num">3,319.61</td>
                    <td className="rep-num">3,042.20</td>
                    <td className="rep-num">3,398.40</td>
                  </tr>

                  {/* Main Meters Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Main Meters Consumption<span className="rep-sec-unit">kWh</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>Corporate Office</td>
                    <td className="rep-num">305.81</td>
                    <td className="rep-num">203.69</td>
                    <td className="rep-num">291.44</td>
                    <td className="rep-num">260</td>
                    <td className="rep-num">288</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</td>
                    <td>Elevator</td>
                    <td className="rep-num">30.91</td>
                    <td className="rep-num">35.68</td>
                    <td className="rep-num">34.43</td>
                    <td className="rep-num">33</td>
                    <td className="rep-num">36</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>3</td>
                    <td>Fire Emergency</td>
                    <td className="rep-num">1,211.10</td>
                    <td className="rep-num">1,241.30</td>
                    <td className="rep-num">1,214.80</td>
                    <td className="rep-num">1,228</td>
                    <td className="rep-num">1,240</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>4</td>
                    <td>Laundry Main Panel</td>
                    <td className="rep-num">481.11</td>
                    <td className="rep-num">460.97</td>
                    <td className="rep-num">428.17</td>
                    <td className="rep-num">455</td>
                    <td className="rep-num">470</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>5</td>
                    <td>MLPP-1</td>
                    <td className="rep-num">981.38</td>
                    <td className="rep-num">1,065.81</td>
                    <td className="rep-num">1,150.94</td>
                    <td className="rep-num">1,080</td>
                    <td className="rep-num">1,190</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>6</td>
                    <td>MLTP-2</td>
                    <td className="rep-num">2,483.70</td>
                    <td className="rep-num">2,651.50</td>
                    <td className="rep-num">2,548</td>
                    <td className="rep-num">2,600</td>
                    <td className="rep-num">2,700</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>7</td>
                    <td>NLPP-1</td>
                    <td className="rep-num">273.69</td>
                    <td className="rep-num">445.75</td>
                    <td className="rep-num">820.06</td>
                    <td className="rep-num">560</td>
                    <td className="rep-num">610</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>8</td>
                    <td>NLPP-2</td>
                    <td className="rep-num">753.63</td>
                    <td className="rep-num">784.22</td>
                    <td className="rep-num">787.40</td>
                    <td className="rep-num">775</td>
                    <td className="rep-num">800</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>9</td>
                    <td>Terrace Panel</td>
                    <td className="rep-num">46.71</td>
                    <td className="rep-num">47.42</td>
                    <td className="rep-num">48.77</td>
                    <td className="rep-num">47</td>
                    <td className="rep-num">49</td>
                  </tr>
                  <tr className="rep-total-row">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">7,816.69</td>
                    <td className="rep-num">8,298.71</td>
                    <td className="rep-num">8,849.06</td>
                    <td className="rep-num">8,245</td>
                    <td className="rep-num">8,650</td>
                  </tr>

                  {/* Water Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Water Consumption<span className="rep-sec-unit">KL</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>Hot Water Meter</td>
                    <td className="rep-num">425.60</td>
                    <td className="rep-num">419.50</td>
                    <td className="rep-num">363.90</td>
                    <td className="rep-num">400</td>
                    <td className="rep-num">410</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</td>
                    <td>Laundry Water Meter</td>
                    <td className="rep-num">23.80</td>
                    <td className="rep-num">19.40</td>
                    <td className="rep-num">17.50</td>
                    <td className="rep-num">21</td>
                    <td className="rep-num">20</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>3</td>
                    <td>STP Water Meter</td>
                    <td className="rep-num">83.60</td>
                    <td className="rep-num">44.80</td>
                    <td className="rep-num">113.90</td>
                    <td className="rep-num">90</td>
                    <td className="rep-num">100</td>
                  </tr>
                  <tr className="rep-total-row">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">533</td>
                    <td className="rep-num">586.70</td>
                    <td className="rep-num">495.30</td>
                    <td className="rep-num">540</td>
                    <td className="rep-num">560</td>
                  </tr>

                  {/* Diesel Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Diesel / HSD<span className="rep-sec-unit">Litres</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>HSD Tank Level</td>
                    <td className="rep-num">4,800</td>
                    <td className="rep-num">4,760</td>
                    <td className="rep-num">4,700</td>
                    <td className="rep-num">4,650</td>
                    <td className="rep-num">4,600</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</td>
                    <td>DG-1 Consumption</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>3</td>
                    <td>DG-2 Consumption</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>

                  {/* Gas Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Gas Consumption<span className="rep-sec-unit">SCM</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>Main Kitchen</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>
                  <tr className="rep-total-row">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>

                  {/* Temperature & Humidity Section */}
                  <tr className="rep-sec-row">
                    <td colSpan={7}>Temperature &amp; Humidity<span className="rep-sec-unit">°C / %</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</td>
                    <td>Ambient (°C)</td>
                    <td className="rep-num">32.78</td>
                    <td className="rep-num">34.98</td>
                    <td className="rep-num">32.72</td>
                    <td className="rep-num">33.50</td>
                    <td className="rep-num">34</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</td>
                    <td>RH (%)</td>
                    <td className="rep-num">30.95</td>
                    <td className="rep-num">35.15</td>
                    <td className="rep-num">43.83</td>
                    <td className="rep-num">38</td>
                    <td className="rep-num">40</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rep-doc-ft">
              <span id="rep-ft-left">BuildOptix IBOS · Generated 20 May 2026 06:00 IST · Confidential</span>
              <span>Page 1 of 1 · Auto-emailed daily 07:00 to CE &amp; Property Head</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Library */}
      {activeTab === 1 && (
        <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="reports" data-tab="1">
          {/* KPI Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div
              className="kpi glow-info clickable"
              title="View report library"
              onClick={(e) => handleKpiNav('reports', 1, e)}
            >
              <div className="kpi-l">Total Reports (May)</div>
              <div className="kpi-v">42</div>
              <div className="kpi-s">scheduled + custom</div>
            </div>
            <div
              className="kpi glow-ok clickable"
              title="View scheduled reports"
              onClick={(e) => handleKpiNav('reports', 2, e)}
            >
              <div className="kpi-l">Delivered On Time</div>
              <div className="kpi-v ok">40</div>
              <div className="kpi-s">95.2% on-time rate</div>
            </div>
            <div
              className="kpi glow-info clickable"
              title="View scheduled reports"
              onClick={(e) => handleKpiNav('reports', 2, e)}
            >
              <div className="kpi-l">Next Scheduled</div>
              <div className="kpi-v">
                10 May<span className="kpi-u" style={{ fontSize: '10px' }}> 07:00</span>
              </div>
              <div className="kpi-s">Daily Ops Summary</div>
            </div>
            <div
              className="kpi glow-warn clickable"
              title="View failed deliveries"
              onClick={(e) => handleKpiNav('reports', 2, e)}
            >
              <div className="kpi-l">Failed Delivery</div>
              <div className="kpi-v warn">2</div>
              <div className="kpi-s">email bounce</div>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>

            {/* Energy & Utilities Report */}
            <div
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleToast('Opening Energy report...', 'ok')}
            >
              <div className="ch" style={{ border: 'none', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--info-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-bolt" style={{ fontSize: '16px', color: 'var(--info)' }}></i>
                  </div>
                  <span className="badge badge-green">Ready</span>
                </div>
              </div>
              <div className="cb" style={{ paddingTop: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '4px' }}>
                  Energy &amp; Utilities Report
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  Floor-wise consumption, cost, EPI score, peak demand, tariff analysis.
                </div>
                <div className="g2" style={{ gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Period</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>May 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Generated</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>20 May · 06:00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn primary" style={{ flex: 1, fontSize: '11px', padding: '6px 0' }} onClick={(e) => { e.stopPropagation(); handleToast('Downloading...', 'ok'); }}>
                    <i className="ti ti-download"></i>Download
                  </button>
                  <button className="btn" style={{ fontSize: '11px', padding: '6px 0', width: '80px' }} onClick={(e) => e.stopPropagation()}>
                    <i className="ti ti-eye"></i>Preview
                  </button>
                </div>
              </div>
            </div>

            {/* CO₂ & ESG Summary */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div className="ch" style={{ border: 'none', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--ok-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-leaf" style={{ fontSize: '16px', color: 'var(--ok)' }}></i>
                  </div>
                  <span className="badge badge-green">Ready</span>
                </div>
              </div>
              <div className="cb" style={{ paddingTop: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '4px' }}>
                  CO₂ &amp; ESG Summary
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  Scope 1/2/3 emissions, solar offset, green certifications, ESG targets.
                </div>
                <div className="g2" style={{ gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Period</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>April 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Generated</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>01 May · 09:00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn primary" style={{ flex: 1, fontSize: '11px', padding: '6px 0' }} onClick={(e) => { e.stopPropagation(); handleToast('Downloading...', 'ok'); }}>
                    <i className="ti ti-download"></i>Download
                  </button>
                  <button className="btn" style={{ fontSize: '11px', padding: '6px 0', width: '80px' }} onClick={(e) => e.stopPropagation()}>
                    <i className="ti ti-eye"></i>Preview
                  </button>
                </div>
              </div>
            </div>

            {/* SLA Compliance Report */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div className="ch" style={{ border: 'none', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--warn-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-clipboard-check" style={{ fontSize: '16px', color: 'var(--warn)' }}></i>
                  </div>
                  <span className="badge badge-green">Ready</span>
                </div>
              </div>
              <div className="cb" style={{ paddingTop: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '4px' }}>
                  SLA Compliance Report
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  Ticket resolution rates, breach log, response time by category, vendor SLA.
                </div>
                <div className="g2" style={{ gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Period</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>April 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Generated</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>01 May · 09:00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn primary" style={{ flex: 1, fontSize: '11px', padding: '6px 0' }} onClick={(e) => { e.stopPropagation(); handleToast('Downloading...', 'ok'); }}>
                    <i className="ti ti-download"></i>Download
                  </button>
                  <button className="btn" style={{ fontSize: '11px', padding: '6px 0', width: '80px' }} onClick={(e) => e.stopPropagation()}>
                    <i className="ti ti-eye"></i>Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Asset PM Report */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div className="ch" style={{ border: 'none', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--violet-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-tool" style={{ fontSize: '16px', color: 'var(--violet)' }}></i>
                  </div>
                  <span className="badge badge-green">Ready</span>
                </div>
              </div>
              <div className="cb" style={{ paddingTop: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '4px' }}>
                  Asset PM Report
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  PM completion rate, overdue maintenance, asset health trend, upcoming schedule.
                </div>
                <div className="g2" style={{ gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Period</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>May 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Generated</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>05 May · 07:00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn primary" style={{ flex: 1, fontSize: '11px', padding: '6px 0' }} onClick={(e) => { e.stopPropagation(); handleToast('Downloading...', 'ok'); }}>
                    <i className="ti ti-download"></i>Download
                  </button>
                  <button className="btn" style={{ fontSize: '11px', padding: '6px 0', width: '80px' }} onClick={(e) => e.stopPropagation()}>
                    <i className="ti ti-eye"></i>Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Solar Generation & ROI */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div className="ch" style={{ border: 'none', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'rgba(255,214,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-solar-panel" style={{ fontSize: '16px', color: 'var(--solar)' }}></i>
                  </div>
                  <span className="badge badge-green">Ready</span>
                </div>
              </div>
              <div className="cb" style={{ paddingTop: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '4px' }}>
                  Solar Generation &amp; ROI
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  kWh generated, grid savings, CO₂ offset, lifetime ROI vs CAPEX.
                </div>
                <div className="g2" style={{ gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Period</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>May 2026</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Generated</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>20 May · 06:00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn primary" style={{ flex: 1, fontSize: '11px', padding: '6px 0' }} onClick={(e) => { e.stopPropagation(); handleToast('Downloading...', 'ok'); }}>
                    <i className="ti ti-download"></i>Download
                  </button>
                  <button className="btn" style={{ fontSize: '11px', padding: '6px 0', width: '80px' }} onClick={(e) => e.stopPropagation()}>
                    <i className="ti ti-eye"></i>Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Compliance Audit Trail */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div className="ch" style={{ border: 'none', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--info-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-shield-check" style={{ fontSize: '16px', color: 'var(--info)' }}></i>
                  </div>
                  <span className="badge badge-cyan">Scheduled</span>
                </div>
              </div>
              <div className="cb" style={{ paddingTop: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0)', marginBottom: '4px' }}>
                  Compliance Audit Trail
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  User actions, RBAC logs, data exports, system config changes. SOC 2 ready.
                </div>
                <div className="g2" style={{ gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Period</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>Monthly</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Scheduled</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-1)' }}>01 Jun · 00:00</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn" style={{ flex: 1, fontSize: '11px', padding: '6px 0' }} onClick={(e) => { e.stopPropagation(); handleToast('Rescheduling...', 'info'); }}>
                    <i className="ti ti-calendar"></i>Reschedule
                  </button>
                  <button className="btn" style={{ fontSize: '11px', padding: '6px 0', width: '80px' }} onClick={(e) => { e.stopPropagation(); handleToast('Skipped', 'warn'); }}>
                    Skip
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Bills */}
      {activeTab === 3 && (
        <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="reports" data-tab="3">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="kpi glow-bad">
              <div className="kpi-l">Utility Bills (May)</div>
              <div className="kpi-v bad">
                ₹34.2<span className="kpi-u">L</span>
              </div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">vs Budget</div>
              <div className="kpi-v ok">
                ₹2.1L<span className="kpi-u"> saved</span>
              </div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Pending Payment</div>
              <div className="kpi-v warn">
                ₹9.7<span className="kpi-u">L</span>
              </div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Paid This Month</div>
              <div className="kpi-v ok">
                ₹24.5<span className="kpi-u">L</span>
              </div>
            </div>
          </div>

          <div className="card border border-gray-700 rounded-lg">
            <div className="ch flex justify-between p-3 border-b border-gray-700">
              <div className="font-semibold">Utility Bills — May 2026</div>
              <span className="ca text-blue-400 cursor-pointer text-xs" onClick={() => handleDownload('bills', 'XLSX')}>
                Export XLSX →
              </span>
            </div>
            <div className="cb p-0">
              <table className="dt w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2">Bill Type</th>
                    <th className="p-2">Period</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Due Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-2"><b>Electricity — MSEDCL</b></td>
                    <td className="p-2">Apr 2026</td>
                    <td className="p-2 font-semibold">₹14.06L</td>
                    <td className="p-2">25 May</td>
                    <td className="p-2"><span className="badge badge-green text-green-300 bg-green-900 px-2 py-0.5 rounded text-xs">Paid</span></td>
                    <td className="p-2"><span className="text-blue-400 cursor-pointer text-xs" onClick={() => handleToast('Downloading bill...', 'ok')}>↓ Download</span></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-2"><b>Electricity — DG Fuel (HSD)</b></td>
                    <td className="p-2">Apr 2026</td>
                    <td className="p-2">₹2.80L</td>
                    <td className="p-2">20 May</td>
                    <td className="p-2"><span className="badge badge-green text-green-300 bg-green-900 px-2 py-0.5 rounded text-xs">Paid</span></td>
                    <td className="p-2"><span className="text-blue-400 cursor-pointer text-xs" onClick={() => handleToast('Downloading bill...', 'ok')}>↓ Download</span></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-2"><b>Water — MCGM</b></td>
                    <td className="p-2">Apr 2026</td>
                    <td className="p-2">₹1.20L</td>
                    <td className="p-2">28 May</td>
                    <td className="p-2"><span className="badge badge-green text-green-300 bg-green-900 px-2 py-0.5 rounded text-xs">Paid</span></td>
                    <td className="p-2"><span className="text-blue-400 cursor-pointer text-xs" onClick={() => handleToast('Downloading receipt...', 'ok')}>↓ Receipt</span></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-2"><b>HVAC Maintenance AMC</b></td>
                    <td className="p-2">May 2026</td>
                    <td className="p-2">₹1.50L</td>
                    <td className="p-2">31 May</td>
                    <td className="p-2"><span className="badge badge-green text-green-300 bg-green-900 px-2 py-0.5 rounded text-xs">Paid</span></td>
                    <td className="p-2"><span className="text-blue-400 cursor-pointer text-xs" onClick={() => handleToast('Downloading receipt...', 'ok')}>↓ Receipt</span></td>
                  </tr>
                  <tr>
                    <td className="p-2"><b>Elevator AMC</b></td>
                    <td className="p-2">May 2026</td>
                    <td className="p-2">₹0.80L</td>
                    <td className="p-2">15 Jun</td>
                    <td className="p-2"><span className="badge badge-cyan text-cyan-300 bg-cyan-900 px-2 py-0.5 rounded text-xs">Upcoming</span></td>
                    <td className="p-2"><span className="text-gray-500 text-xs">—</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 2 && (
        <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="reports" data-tab="2">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="kpi glow-info">
              <div className="kpi-l">Scheduled Reports</div>
              <div className="kpi-v">18</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Sent On Time (May)</div>
              <div className="kpi-v ok">
                16<span className="kpi-u text-[10px]">/18</span>
              </div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Failed Deliveries</div>
              <div className="kpi-v bad">2</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Next Run</div>
              <div className="kpi-v">
                10 May<span className="kpi-u text-[10px]"> 07:00</span>
              </div>
            </div>
          </div>

          <div className="card border border-gray-700 rounded-lg">
            <div className="ch flex justify-between items-center p-3 border-b border-gray-800">
              <div>
                <div className="ct font-semibold text-sm">Scheduled Report Configuration</div>
                <div className="cs text-xs text-gray-400">
                  Automated email delivery · frequency · recipients · CC · retry-on-fail
                </div>
              </div>
              <span
                className="ca text-xs text-blue-400 cursor-pointer hover:underline"
                onClick={() => showToast('Open Report Schedule Modal')}
              >
                + Add Schedule
              </span>
            </div>
            <div className="cb p-0 overflow-x-auto">
              <table className="dt w-full text-left text-xs">
                <thead className="bg-gray-800 text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="p-2">Report</th>
                    <th className="p-2">Frequency</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Format</th>
                    <th className="p-2">Recipients (To / CC)</th>
                    <th className="p-2">Retry on Fail</th>
                    <th className="p-2">Last Sent</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {scheduledReports.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-800/50">
                      <td className="p-2 font-medium">{row.name}</td>
                      <td className="p-2">{row.freq}</td>
                      <td className="p-2">{row.time}</td>
                      <td className="p-2">{row.format}</td>
                      <td className="p-2">
                        {row.recipients}{' '}
                        {row.cc && <span style={{ color: 'var(--ink-4, #888)' }}>{row.cc}</span>}
                      </td>
                      <td className="p-2">
                        <span className="badge badge-green bg-green-900/50 text-green-300 px-1.5 py-0.5 rounded text-[10px]">
                          {row.retry}
                        </span>
                      </td>
                      <td className="p-2">{row.lastSent}</td>
                      <td className="p-2">
                        {row.status.includes('Failed') ? (
                          <span className="badge badge-red bg-red-900/50 text-red-300 px-1.5 py-0.5 rounded text-[10px]">
                            {row.status}
                          </span>
                        ) : (
                          <span
                            className={`badge text-[10px] px-1.5 py-0.5 rounded cursor-pointer ${row.status === 'Active'
                              ? 'badge-green bg-green-900/50 text-green-300'
                              : 'badge-warn bg-amber-900/50 text-amber-300'
                              }`}
                            title="Click to pause/resume"
                            onClick={() => handleToggleStatus(row.id)}
                          >
                            {row.status}
                          </span>
                        )}
                      </td>
                      <td className="p-2">
                        {row.status.includes('Failed') ? (
                          <span
                            className="text-amber-400 cursor-pointer text-[11px] hover:underline"
                            onClick={() => handleRetry(row.id)}
                          >
                            Retry
                          </span>
                        ) : (
                          <span
                            className="text-blue-400 cursor-pointer text-[11px] hover:underline"
                            onClick={() => showToast(`Edit ${row.name}`)}
                          >
                            Edit
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4 */}
      {activeTab === 4 && (
        <div className={`tab-panel ${activeTab === 4 ? 'active' : ''}`} data-page="reports" data-tab="4">
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

            <div
              className="kpi glow-violet border border-purple-500/30"
              style={{ borderColor: 'rgba(155,108,255,0.28)' }}
            >
              <div className="kpi-l">Custom Reports (May)</div>
              <div className="kpi-v text-purple-400" style={{ color: 'var(--violet, #a855f7)' }}>
                24
              </div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Avg Build Time</div>
              <div className="kpi-v ok">
                3.2<span className="kpi-u text-[10px]">sec</span>
              </div>
              <div className="kpi-s">AI-powered</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Most Requested</div>
              <div className="kpi-v text-sm" style={{ fontSize: '14px' }}>
                Energy
              </div>
              <div className="kpi-s">by floor · 9 of 24</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Exports (May)</div>
              <div className="kpi-v ok">142</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Custom Report Builder Card */}
            <div className="card col-span-2 border border-gray-700 rounded-lg p-3">
              <div className="ch pb-2 border-b border-gray-800 mb-3">
                <div className="ct font-semibold text-sm">Build a Custom Report</div>
                <div className="cs text-xs text-gray-400">Select parameters and generate instantly</div>
              </div>
              <div className="cb">
                <div className="flex flex-col gap-3">
                  {/* Report Type Filter */}
                  <div>
                    <div className="text-[10.5px] text-gray-400 mb-1 font-medium">Report Type</div>
                    <div className="filter-bar flex flex-wrap gap-1">
                      {['Energy', 'CO₂ / ESG', 'SLA', 'Assets', 'Complaints', 'Vendor'].map((item) => (
                        <span
                          key={item}
                          className={`filter-chip text-xs px-2.5 py-1 rounded cursor-pointer border ${reportType === item
                            ? 'active bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                            }`}
                          onClick={() => setReportType(item)}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <div className="text-[10.5px] text-gray-400 mb-1 font-medium">Date Range</div>
                    <div className="filter-bar flex flex-wrap gap-1">
                      {['Today', 'This Week', 'This Month', 'Last Month', 'Custom'].map((item) => (
                        <span
                          key={item}
                          className={`filter-chip text-xs px-2.5 py-1 rounded cursor-pointer border ${dateRange === item
                            ? 'active bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                            }`}
                          onClick={() => setDateRange(item)}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sites Filter */}
                  <div>
                    <div className="text-[10.5px] text-gray-400 mb-1 font-medium">Sites</div>
                    <div className="filter-bar flex flex-wrap gap-1">
                      {['All Sites', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad'].map((item) => (
                        <span
                          key={item}
                          className={`filter-chip text-xs px-2.5 py-1 rounded cursor-pointer border ${site === item
                            ? 'active bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                            }`}
                          onClick={() => setSite(item)}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Output Format Filter */}
                  <div>
                    <div className="text-[10.5px] text-gray-400 mb-1 font-medium">Output Format</div>
                    <div className="filter-bar flex flex-wrap gap-1">
                      {['PDF', 'XLSX', 'CSV'].map((item) => (
                        <span
                          key={item}
                          className={`filter-chip text-xs px-2.5 py-1 rounded cursor-pointer border ${outputFormat === item
                            ? 'active bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                            }`}
                          onClick={() => setOutputFormat(item)}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn primary self-start text-xs px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center gap-1 mt-1"
                    onClick={() => showToast('⚡ Generating report... Ready in 3.2 seconds', 3500)}
                  >
                    <i className="ti ti-bolt"></i> Generate Report Now
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Custom Reports Table */}
            <div className="card col-span-1 border border-gray-700 rounded-lg p-0 overflow-hidden">
              <div className="ch p-3 border-b border-gray-800">
                <div className="ct font-semibold text-sm">Recent Custom Reports</div>
              </div>
              <div className="cb p-0 overflow-x-auto">
                <table className="dt w-full text-left text-xs">
                  <thead className="bg-gray-800 text-gray-400 border-b border-gray-700">
                    <tr>
                      <th className="p-2">Report</th>
                      <th className="p-2">Generated</th>
                      <th className="p-2">By</th>
                      <th className="p-2">Format</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="hover:bg-gray-800/50">
                      <td className="p-2 font-medium">Energy by Floor — May</td>
                      <td className="p-2">Today 08:45</td>
                      <td className="p-2">Rajesh S.</td>
                      <td className="p-2">XLSX</td>
                      <td className="p-2">
                        <span
                          className="text-blue-400 cursor-pointer text-[11px] hover:underline"
                          onClick={() => handleDownload('energy-floor-may', 'XLSX')}
                        >
                          ↓ Download
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/50">
                      <td className="p-2 font-medium">SLA Report — Apr–May</td>
                      <td className="p-2">09 May 07:00</td>
                      <td className="p-2">System</td>
                      <td className="p-2">PDF</td>
                      <td className="p-2">
                        <span
                          className="text-blue-400 cursor-pointer text-[11px] hover:underline"
                          onClick={() => handleDownload('sla-apr-may', 'PDF')}
                        >
                          ↓ Download
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/50">
                      <td className="p-2 font-medium">CO₂ Comparison Q1</td>
                      <td className="p-2">08 May 15:30</td>
                      <td className="p-2">Priya M.</td>
                      <td className="p-2">PDF</td>
                      <td className="p-2">
                        <span
                          className="text-blue-400 cursor-pointer text-[11px] hover:underline"
                          onClick={() => handleDownload('co2-q1', 'PDF')}
                        >
                          ↓ Download
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/50">
                      <td className="p-2 font-medium">Vendor Scorecard Q1</td>
                      <td className="p-2">07 May 11:00</td>
                      <td className="p-2">Arun K.</td>
                      <td className="p-2">XLSX</td>
                      <td className="p-2">
                        <span
                          className="text-blue-400 cursor-pointer text-[11px] hover:underline"
                          onClick={() => handleDownload('vendor-q1', 'XLSX')}
                        >
                          ↓ Download
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-800/50">
                      <td className="p-2 font-medium">Asset PM Summary</td>
                      <td className="p-2">06 May 09:00</td>
                      <td className="p-2">System</td>
                      <td className="p-2">XLSX</td>
                      <td className="p-2">
                        <span
                          className="text-blue-400 cursor-pointer text-[11px] hover:underline"
                          onClick={() => handleDownload('asset-pm', 'XLSX')}
                        >
                          ↓ Download
                        </span>
                      </td>
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

export default ReportsDashboard;