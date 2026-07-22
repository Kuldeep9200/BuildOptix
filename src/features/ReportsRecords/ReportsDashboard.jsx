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

  return (
    <div className="page active" id="pg-reports">
      {/* Navigation Tabs */}
      <div className="tab-nav mb-4 flex gap-2 border-b border-gray-700 pb-2">
        <button
          className={`px-4 py-1.5 rounded text-xs font-semibold ${
            activeTab === 0 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab(0)}
        >
          Daily Reports (HLP / DMR)
        </button>
        <button
          className={`px-4 py-1.5 rounded text-xs font-semibold ${
            activeTab === 1 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Report Library
        </button>
        <button
          className={`px-4 py-1.5 rounded text-xs font-semibold ${
            activeTab === 3 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab(3)}
        >
          Bills & Utilities
        </button>
      </div>

      {/* Tab 0: Daily Reports (HLP / DMR) */}
      {activeTab === 0 && (
        <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="reports" data-tab="0">
          <div className="kpi-strip mb-14 grid grid-cols-4 gap-3">
            <div
              className="kpi glow-info clickable cursor-pointer"
              title="Open today's DMR"
              onClick={() => setReportType('dmr')}
            >
              <div className="kpi-l">Today's DMR</div>
              <div className="kpi-v">Ready</div>
              <div className="kpi-s">auto-built 06:00</div>
            </div>
            <div
              className="kpi glow-ok clickable cursor-pointer"
              title="Open today's HLP"
              onClick={() => setReportType('hlp')}
            >
              <div className="kpi-l">Today's HLP</div>
              <div className="kpi-v ok">Ready</div>
              <div className="kpi-s">auto-built 06:00</div>
            </div>
            <div
              className="kpi glow-ok clickable cursor-pointer"
              title="View scheduled deliveries"
              onClick={() => setActiveTab(1)}
            >
              <div className="kpi-l">Email Delivery</div>
              <div className="kpi-v ok">On time</div>
              <div className="kpi-s">last sent 07:00</div>
            </div>
            <div
              className="kpi glow-info clickable cursor-pointer"
              title="View scheduled deliveries"
              onClick={() => setActiveTab(1)}
            >
              <div className="kpi-l">Next Auto-Email</div>
              <div className="kpi-v">
                Tomorrow<span className="kpi-u text-[10px]"> 07:00</span>
              </div>
              <div className="kpi-s">to CE + Property Head</div>
            </div>
          </div>

          {/* HLP / DMR hero cards */}
          <div className="rep-hero grid grid-cols-2 gap-4 mb-4">
            {/* HLP Hero Card */}
            <div className="rep-hero-card">
              <div className="rep-hero-top flex gap-3 mb-2">
                <div className="rep-hero-ic">
                  <i className="ti ti-clipboard-data"></i>
                </div>
                <div>
                  <div className="rep-hero-name font-semibold">Daily HLP Report</div>
                  <div className="rep-hero-tag text-xs text-gray-400">High-Level Performance · Daily</div>
                </div>
              </div>
              <div className="rep-hero-desc text-xs mb-3 text-gray-300">
                Consolidated daily snapshot for the Chief Engineer & Property Head — energy summary, DG & HVAC load, water & diesel, ambient conditions. Section totals roll up across the month.
              </div>
              <div className="rep-meta-row flex gap-4 text-xs mb-3">
                <div>
                  <div className="rep-meta-k text-gray-400">Site</div>
                  <div className="rep-meta-v font-medium">Godrej One, Vikhroli</div>
                </div>
                <div>
                  <div className="rep-meta-k text-gray-400">Period</div>
                  <div className="rep-meta-v font-medium">01–31 May 2026</div>
                </div>
                <div>
                  <div className="rep-meta-k text-gray-400">Generated</div>
                  <div className="rep-meta-v font-medium">Today · 06:00</div>
                </div>
              </div>
              <div className="rep-hero-actions flex gap-2">
                <button className="btn primary px-3 py-1 text-xs" onClick={() => setReportType('hlp')}>
                  <i className="ti ti-eye"></i> View
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload('hlp', 'PDF')}>
                  <i className="ti ti-download"></i> PDF
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload('hlp', 'XLSX')}>
                  <i className="ti ti-file-spreadsheet"></i> XLSX
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleEmail('hlp')}>
                  <i className="ti ti-mail-fast"></i> Email Now
                </button>
              </div>
            </div>

            {/* DMR Hero Card */}
            <div className="rep-hero-card dmr">
              <div className="rep-hero-top flex gap-3 mb-2">
                <div className="rep-hero-ic">
                  <i className="ti ti-gauge"></i>
                </div>
                <div>
                  <div className="rep-hero-name font-semibold">Daily DMR Report</div>
                  <div className="rep-hero-tag text-xs text-gray-400">Daily Meter Reading · Meter-level</div>
                </div>
              </div>
              <div className="rep-hero-desc text-xs mb-3 text-gray-300">
                Full meter-level consumption — Incomer, DG, HVAC, Main, Common Area, Tenant, Water, Diesel/HSD, Gas & Temperature. One column per day with per-section totals.
              </div>
              <div className="rep-meta-row flex gap-4 text-xs mb-3">
                <div>
                  <div className="rep-meta-k text-gray-400">Site</div>
                  <div className="rep-meta-v font-medium">Godrej One, Vikhroli</div>
                </div>
                <div>
                  <div className="rep-meta-k text-gray-400">Period</div>
                  <div className="rep-meta-v font-medium">01–31 May 2026</div>
                </div>
                <div>
                  <div className="rep-meta-k text-gray-400">Meters</div>
                  <div className="rep-meta-v font-medium">142 across 11 groups</div>
                </div>
              </div>
              <div className="rep-hero-actions flex gap-2">
                <button className="btn primary px-3 py-1 text-xs" onClick={() => setReportType('dmr')}>
                  <i className="ti ti-eye"></i> View
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload('dmr', 'PDF')}>
                  <i className="ti ti-download"></i> PDF
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload('dmr', 'XLSX')}>
                  <i className="ti ti-file-spreadsheet"></i> XLSX
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleEmail('dmr')}>
                  <i className="ti ti-mail-fast"></i> Email Now
                </button>
              </div>
            </div>
          </div>

          {/* Branded sectioned report viewer */}
          <div className="rep-viewer" id="rep-viewer">
            <div className="rep-doc-hd flex justify-between items-center mb-3">
              <div className="rep-doc-brand flex items-center gap-3">
                <div className="rep-doc-logo font-bold text-lg bg-blue-600 text-white p-2 rounded">BO</div>
                <div>
                  <div className="rep-doc-t font-bold text-base" id="rep-doc-title">
                    {reportType === 'hlp' ? 'Daily High-Level Performance Report — HLP' : 'Daily Meter Reading Report — DMR'}
                  </div>
                  <div className="rep-doc-s text-xs text-gray-400" id="rep-doc-sub">
                    Godrej One, Vikhroli · 01–05 May 2026 · BuildOptix IBOS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="filter-bar flex gap-1 bg-gray-800 p-1 rounded">
                  <span
                    className={`filter-chip cursor-pointer px-3 py-1 text-xs rounded ${
                      reportType === 'hlp' ? 'active bg-blue-600 text-white' : 'text-gray-400'
                    }`}
                    onClick={() => setReportType('hlp')}
                  >
                    HLP
                  </span>
                  <span
                    className={`filter-chip cursor-pointer px-3 py-1 text-xs rounded ${
                      reportType === 'dmr' ? 'active bg-blue-600 text-white' : 'text-gray-400'
                    }`}
                    onClick={() => setReportType('dmr')}
                  >
                    DMR
                  </span>
                </div>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload(reportType, 'PDF')}>
                  <i className="ti ti-download"></i> PDF
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload(reportType, 'XLSX')}>
                  <i className="ti ti-file-spreadsheet"></i> XLSX
                </button>
                <button className="btn px-3 py-1 text-xs" onClick={() => handleDownload(reportType, 'CSV')}>
                  <i className="ti ti-file-text"></i> CSV
                </button>
                <button className="btn primary px-3 py-1 text-xs" onClick={() => handleEmail(reportType)}>
                  <i className="ti ti-mail-fast"></i> Email
                </button>
              </div>
            </div>

            {/* Table Viewer */}
            <div className="rep-doc-body overflow-x-auto">
              <table className="rep-tbl w-full text-left border-collapse" id="rep-tbl">
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
                  {/* Section 1 */}
                  <tr className="rep-sec-row bg-gray-800 font-semibold">
                    <td colSpan={7}>
                      Incomer Electricity Meter Consumption <span className="rep-sec-unit font-normal text-xs text-gray-400">(kWh)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">1</td>
                    <td>TSSEB</td>
                    <td className="rep-num">8,912</td>
                    <td className="rep-num">9,432</td>
                    <td className="rep-num">9,880</td>
                    <td className="rep-num">9,210</td>
                    <td className="rep-num">9,560</td>
                  </tr>
                  <tr className="rep-total-row font-bold">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">8,912</td>
                    <td className="rep-num">9,432</td>
                    <td className="rep-num">9,880</td>
                    <td className="rep-num">9,210</td>
                    <td className="rep-num">9,560</td>
                  </tr>

                  {/* Section 2 */}
                  <tr className="rep-sec-row bg-gray-800 font-semibold">
                    <td colSpan={7}>
                      Power Generators Meter Consumption <span className="rep-sec-unit font-normal text-xs text-gray-400">(kWh)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">1</td>
                    <td>DG 1</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">2</td>
                    <td>DG 2</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>
                  <tr className="rep-total-row font-bold">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                    <td className="rep-num zero">0</td>
                  </tr>

                  {/* Section 3 */}
                  <tr className="rep-sec-row bg-gray-800 font-semibold">
                    <td colSpan={7}>
                      HVAC Meters Consumption <span className="rep-sec-unit font-normal text-xs text-gray-400">(kWh)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">1</td>
                    <td>AC Panel - 1</td>
                    <td className="rep-num">968.40</td>
                    <td className="rep-num">1,056</td>
                    <td className="rep-num">1,116.30</td>
                    <td className="rep-num">1,042</td>
                    <td className="rep-num">1,190</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">2</td>
                    <td>AHU 1 Panel-1</td>
                    <td className="rep-num">105.15</td>
                    <td className="rep-num">109.27</td>
                    <td className="rep-num">155.19</td>
                    <td className="rep-num">131</td>
                    <td className="rep-num">142</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">3</td>
                    <td>AHU-2 Panel 2</td>
                    <td className="rep-num">43.18</td>
                    <td className="rep-num">52.63</td>
                    <td className="rep-num">83.53</td>
                    <td className="rep-num">61</td>
                    <td className="rep-num">77</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">4</td>
                    <td>AHU-3 Panel 2</td>
                    <td className="rep-num">131.92</td>
                    <td className="rep-num">144.47</td>
                    <td className="rep-num">170.03</td>
                    <td className="rep-num">150</td>
                    <td className="rep-num">166</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">5</td>
                    <td>Chiller 1</td>
                    <td className="rep-num">1,464.40</td>
                    <td className="rep-num">1,720.70</td>
                    <td className="rep-num">1,791.50</td>
                    <td className="rep-num">1,655</td>
                    <td className="rep-num">1,820</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">6</td>
                    <td>Chiller 3</td>
                    <td className="rep-num">3.06</td>
                    <td className="rep-num">3.13</td>
                    <td className="rep-num">3.06</td>
                    <td className="rep-num">3.10</td>
                    <td className="rep-num">3.20</td>
                  </tr>
                  <tr className="rep-total-row font-bold">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">2,716.11</td>
                    <td className="rep-num">3,086.20</td>
                    <td className="rep-num">3,319.61</td>
                    <td className="rep-num">3,042.20</td>
                    <td className="rep-num">3,398.40</td>
                  </tr>

                  {/* Section 4 */}
                  <tr className="rep-sec-row bg-gray-800 font-semibold">
                    <td colSpan={7}>
                      Water Consumption <span className="rep-sec-unit font-normal text-xs text-gray-400">(KL)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">1</td>
                    <td>Hot Water Meter</td>
                    <td className="rep-num">425.60</td>
                    <td className="rep-num">419.50</td>
                    <td className="rep-num">363.90</td>
                    <td className="rep-num">400</td>
                    <td className="rep-num">410</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">2</td>
                    <td>Laundry Water Meter</td>
                    <td className="rep-num">23.80</td>
                    <td className="rep-num">19.40</td>
                    <td className="rep-num">17.50</td>
                    <td className="rep-num">21</td>
                    <td className="rep-num">20</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">3</td>
                    <td>STP Water Meter</td>
                    <td className="rep-num">83.60</td>
                    <td className="rep-num">44.80</td>
                    <td className="rep-num">113.90</td>
                    <td className="rep-num">90</td>
                    <td className="rep-num">100</td>
                  </tr>
                  <tr className="rep-total-row font-bold">
                    <td></td>
                    <td>Total</td>
                    <td className="rep-num">533</td>
                    <td className="rep-num">586.70</td>
                    <td className="rep-num">495.30</td>
                    <td className="rep-num">540</td>
                    <td className="rep-num">560</td>
                  </tr>

                  {/* Section 5 */}
                  <tr className="rep-sec-row bg-gray-800 font-semibold">
                    <td colSpan={7}>
                      Temperature & Humidity <span className="rep-sec-unit font-normal text-xs text-gray-400">(°C / %)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">1</td>
                    <td>Ambient (°C)</td>
                    <td className="rep-num">32.78</td>
                    <td className="rep-num">34.98</td>
                    <td className="rep-num">32.72</td>
                    <td className="rep-num">33.50</td>
                    <td className="rep-num">34</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--ink-4)] font-mono text-[10px]">2</td>
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

            <div className="rep-doc-ft flex justify-between text-xs text-gray-400 mt-4 border-t border-gray-700 pt-2">
              <span id="rep-ft-left">BuildOptix IBOS · Generated 20 May 2026 06:00 IST · Confidential</span>
              <span>Page 1 of 1 · Auto-emailed daily 07:00 to CE & Property Head</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Library */}
      {activeTab === 1 && (
        <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="reports" data-tab="1">
          <div className="kpi-strip mb-14 grid grid-cols-4 gap-3">
            <div className="kpi glow-info">
              <div className="kpi-l">Total Reports (May)</div>
              <div className="kpi-v">42</div>
              <div className="kpi-s">scheduled + custom</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Delivered On Time</div>
              <div className="kpi-v ok">40</div>
              <div className="kpi-s">95.2% on-time rate</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Next Scheduled</div>
              <div className="kpi-v">
                10 May<span className="kpi-u text-[10px]"> 07:00</span>
              </div>
              <div className="kpi-s">Daily Ops Summary</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Failed Delivery</div>
              <div className="kpi-v warn">2</div>
              <div className="kpi-s">email bounce</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Energy Report Card */}
            <div className="card cursor-pointer p-3 border border-gray-700 rounded-lg">
              <div className="ch border-none pb-1 flex justify-between items-center">
                <div className="w-8 h-8 rounded bg-blue-900 flex items-center justify-center">
                  <i className="ti ti-bolt text-blue-400"></i>
                </div>
                <span className="badge badge-green text-xs px-2 py-0.5 rounded bg-green-900 text-green-300">Ready</span>
              </div>
              <div className="cb pt-1">
                <div className="font-semibold text-sm mb-1">Energy & Utilities Report</div>
                <div className="text-xs text-gray-400 mb-2">Floor-wise consumption, cost, EPI score, peak demand.</div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Period</div>
                    <div>May 2026</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Generated</div>
                    <div>20 May · 06:00</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn primary flex-1 text-xs py-1" onClick={() => handleDownload('energy', 'PDF')}>
                    <i className="ti ti-download"></i> Download
                  </button>
                  <button className="btn w-20 text-xs py-1">Preview</button>
                </div>
              </div>
            </div>

            {/* ESG Card */}
            <div className="card cursor-pointer p-3 border border-gray-700 rounded-lg">
              <div className="ch border-none pb-1 flex justify-between items-center">
                <div className="w-8 h-8 rounded bg-green-900 flex items-center justify-center">
                  <i className="ti ti-leaf text-green-400"></i>
                </div>
                <span className="badge badge-green text-xs px-2 py-0.5 rounded bg-green-900 text-green-300">Ready</span>
              </div>
              <div className="cb pt-1">
                <div className="font-semibold text-sm mb-1">CO₂ & ESG Summary</div>
                <div className="text-xs text-gray-400 mb-2">Scope 1/2/3 emissions, solar offset, ESG targets.</div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Period</div>
                    <div>April 2026</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Generated</div>
                    <div>01 May · 09:00</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn primary flex-1 text-xs py-1" onClick={() => handleDownload('esg', 'PDF')}>
                    <i className="ti ti-download"></i> Download
                  </button>
                  <button className="btn w-20 text-xs py-1">Preview</button>
                </div>
              </div>
            </div>

            {/* SLA Compliance Card */}
            <div className="card cursor-pointer p-3 border border-gray-700 rounded-lg">
              <div className="ch border-none pb-1 flex justify-between items-center">
                <div className="w-8 h-8 rounded bg-amber-900 flex items-center justify-center">
                  <i className="ti ti-clipboard-check text-amber-400"></i>
                </div>
                <span className="badge badge-green text-xs px-2 py-0.5 rounded bg-green-900 text-green-300">Ready</span>
              </div>
              <div className="cb pt-1">
                <div className="font-semibold text-sm mb-1">SLA Compliance Report</div>
                <div className="text-xs text-gray-400 mb-2">Ticket resolution rates, breach log, vendor SLA.</div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Period</div>
                    <div>April 2026</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Generated</div>
                    <div>01 May · 09:00</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn primary flex-1 text-xs py-1" onClick={() => handleDownload('sla', 'PDF')}>
                    <i className="ti ti-download"></i> Download
                  </button>
                  <button className="btn w-20 text-xs py-1">Preview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bills */}
      {activeTab === 3 && (
        <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="reports" data-tab="3">
          <div className="kpi-strip mb-14 grid grid-cols-4 gap-3">
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
    </div>
  );
};

export default ReportsDashboard;