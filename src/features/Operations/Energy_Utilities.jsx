import React, { useState } from 'react';

// Inline CSS Utilities helper for custom variables
const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 14px',
  borderBottom: '1px solid var(--line-1)',
};

const Energy_Utilities = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [chartView, setChartView] = useState('day');
  const [fromDate, setFromDate] = useState('2026-05-20');
  const [toDate, setToDate] = useState('2026-05-20');
  const [selectedSite, setSelectedSite] = useState('Vikhroli — Thane');

  const utilityTabs = [
    { id: 0, label: '⚡ Electricity', title: 'Electricity' },
    { id: 1, label: '⛽ Fuel', title: 'Fuel' },
    { id: 2, label: '💧 Water', title: 'Water' },
    { id: 3, label: '🔥 Gas', title: 'Gas' },
  ];

  const handleToast = (msg) => {
    console.log(`[Toast]: ${msg}`);
  };

  const handleDrilldown = (title, period) => {
    console.log(`Drilldown into ${title} for ${period}`);
  };

  const handleDrillDay = (day, value) => {
    console.log(`Drilling into Day ${day} with value ${value} kWh`);
  };

  const handleCategoryDrill = (category) => {
    console.log(`Drilling category: ${category}`);
  };

  return (
    <div className="tab-panel active" data-page="energy" data-tab="0">
      {/* ── TOP CONTROL BAR ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '16px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--line-1)',
        }}
      >
        {/* Utility tabs */}
        <div
          style={{
            display: 'flex',
            background: 'var(--surface-2)',
            borderRadius: '8px',
            padding: '3px',
            gap: '2px',
          }}
        >
          {utilityTabs.map((tab) => (
            <div
              key={tab.id}
              className={`eu-pill ${activeTab === tab.id ? 'active' : ''}`}
              id={`eu-p-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.title}
              style={{ cursor: 'pointer' }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Site Selector */}
        <select
          className="eu-sel"
          id="eu-site-sel"
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          <option>Vikhroli — Thane</option>
          <option>Delhi — Sector 62</option>
          <option>Bengaluru — B1 Prestige</option>
          <option>Hyderabad — Madhapur</option>
        </select>

        {/* Date Controls */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="date"
            className="eu-sel"
            id="eu-from"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>→</span>
          <input
            type="date"
            className="eu-sel"
            id="eu-to"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            className="eu-btn primary"
            onClick={() => handleToast('Refreshing...')}
          >
            View
          </button>
          <button className="eu-btn">MTD</button>
          <button className="eu-btn">YTD</button>
          <button className="eu-btn">Yesterday</button>
        </div>

        {/* Live Status Indicator */}
        <div
          style={{
            marginLeft: 'auto',
            textAlign: 'right',
            fontSize: '10px',
            color: 'var(--ink-3)',
            lineHeight: '1.6',
          }}
        >
          <div
            style={{
              color: 'var(--ok)',
              fontSize: '9.5px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            ● LIVE
          </div>
          Updated: 20 May 2026 · 10:24 AM
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div id="eu-elec-main">
        {/* ── HERO KPI STRIP ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            marginBottom: '16px',
          }}
          id="eu-kpi-strip"
        >
          {/* KPI 1 */}
          <div
            className="eu-kpi eu-kpi-electric"
            onClick={() => handleDrilldown('Total Consumption', 'today')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="eu-kpi-icon" style={{ background: 'rgba(155, 108, 255, 0.15)' }}>
                <i className="ti ti-bolt" style={{ color: '#9B6CFF' }}></i>
              </div>
              <span className="eu-kpi-badge eu-kpi-badge-up">↓ 3.1%</span>
            </div>
            <div className="eu-kpi-v" id="eu-kpi-elec-total">6,553 kWh</div>
            <div className="eu-kpi-l">Today's Consumption</div>
            <div className="eu-kpi-sub">EB: 6,553 · DG: 0</div>
            <div className="eu-kpi-spark">
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path d="M0,18 L10,16 L20,14 L30,12 L40,10 L50,8 L60,7 L70,5 L80,4" fill="none" stroke="#9B6CFF" strokeWidth="1.5" opacity="0.7"></path>
              </svg>
            </div>
          </div>

          {/* KPI 2 */}
          <div
            className="eu-kpi eu-kpi-cost"
            onClick={() => handleDrilldown('Energy Cost', 'today')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="eu-kpi-icon" style={{ background: 'rgba(245, 180, 65, 0.15)' }}>
                <i className="ti ti-currency-rupee" style={{ color: 'var(--warn)' }}></i>
              </div>
              <span className="eu-kpi-badge eu-kpi-badge-up">₹18K saved</span>
            </div>
            <div className="eu-kpi-v" style={{ color: 'var(--warn)' }} id="eu-kpi-elec-cost">₹64,875</div>
            <div className="eu-kpi-l">Today's Energy Cost</div>
            <div className="eu-kpi-sub">₹9.90/kWh · Peak tariff</div>
            <div className="eu-kpi-spark">
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path d="M0,18 L10,17 L20,15 L30,13 L40,11 L50,9 L60,8 L70,6 L80,5" fill="none" stroke="var(--warn)" strokeWidth="1.5" opacity="0.7"></path>
              </svg>
            </div>
          </div>

          {/* KPI 3 */}
          <div
            className="eu-kpi eu-kpi-solar"
            onClick={() => handleDrilldown('Solar Generation', 'today')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="eu-kpi-icon" style={{ background: 'rgba(255, 214, 107, 0.15)' }}>
                <i className="ti ti-solar-panel" style={{ color: 'var(--solar)' }}></i>
              </div>
              <span className="eu-kpi-badge eu-kpi-badge-up">↑ 12%</span>
            </div>
            <div className="eu-kpi-v" style={{ color: 'var(--solar)' }} id="eu-kpi-elec-solar">1,240 kWh</div>
            <div className="eu-kpi-l">Solar Generation</div>
            <div className="eu-kpi-sub">88% capacity · ₹12,276 saved</div>
            <div className="eu-kpi-spark">
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path d="M0,22 L10,22 L20,18 L30,12 L40,8 L50,6 L60,8 L70,12 L80,18" fill="none" stroke="var(--solar)" strokeWidth="1.5" opacity="0.7"></path>
              </svg>
            </div>
          </div>

          {/* KPI 4 */}
          <div
            className="eu-kpi eu-kpi-epi"
            onClick={() => handleDrilldown('EPI Score', 'today')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="eu-kpi-icon" style={{ background: 'rgba(34, 214, 122, 0.15)' }}>
                <i className="ti ti-leaf" style={{ color: 'var(--ok)' }}></i>
              </div>
              <span className="eu-kpi-badge" style={{ background: 'rgba(34, 214, 122, 0.15)', color: 'var(--ok)' }}>Grade B+</span>
            </div>
            <div className="eu-kpi-v" style={{ color: 'var(--ok)' }} id="eu-kpi-elec-epi">87/100</div>
            <div className="eu-kpi-l">EPI Score</div>
            <div className="eu-kpi-sub">Target: 90 · Gap: 3 pts</div>
            <div className="eu-kpi-spark">
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path d="M0,20 L20,18 L40,16 L60,14 L80,12" fill="none" stroke="var(--ok)" strokeWidth="1.5" opacity="0.7"></path>
              </svg>
            </div>
          </div>

          {/* KPI 5 */}
          <div
            className="eu-kpi eu-kpi-carbon"
            onClick={() => handleDrilldown('CO₂ Footprint', 'today')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="eu-kpi-icon" style={{ background: 'rgba(52, 210, 230, 0.15)' }}>
                <i className="ti ti-cloud" style={{ color: 'var(--cool)' }}></i>
              </div>
              <span className="eu-kpi-badge eu-kpi-badge-up">−28.6t solar</span>
            </div>
            <div className="eu-kpi-v" style={{ color: 'var(--cool)' }} id="eu-kpi-elec-carbon">3.14 tCO₂</div>
            <div className="eu-kpi-l">Today's Carbon</div>
            <div className="eu-kpi-sub">Net: 0.48 kgCO₂/kWh</div>
            <div className="eu-kpi-spark">
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path d="M0,14 L20,12 L40,10 L60,9 L80,8" fill="none" stroke="var(--cool)" strokeWidth="1.5" opacity="0.7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* ── MAIN CHARTS ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
          
          {/* LEFT: Main consumption chart */}
          <div className="eu-card">
            <div className="eu-card-hd" style={cardHeaderStyle}>
              <div>
                <div className="eu-card-title">Daily Consumption — May 2026</div>
                <div className="eu-card-sub">kWh · Click any bar to drill down by hour</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ display: 'flex', background: 'var(--surface-3)', borderRadius: '6px', padding: '2px', gap: '2px' }}>
                  <div
                    className={`eu-chart-toggle ${chartView === 'day' ? 'active' : ''}`}
                    id="eu-ct-day"
                    onClick={() => setChartView('day')}
                  >
                    Daily
                  </div>
                  <div
                    className={`eu-chart-toggle ${chartView === 'month' ? 'active' : ''}`}
                    id="eu-ct-month"
                    onClick={() => setChartView('month')}
                  >
                    Monthly
                  </div>
                </div>
                <div className="eu-icon-act" onClick={() => handleDrilldown('Daily Consumption', 'may')} title="Full screen view">
                  <i className="ti ti-maximize"></i>
                </div>
                <div className="eu-icon-act" title="Download CSV">
                  <i className="ti ti-download"></i>
                </div>
              </div>
            </div>

            <div className="eu-card-body" style={{ padding: '12px 14px 0' }}>
              {/* Legend */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', fontSize: '10.5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-2)' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#9B6CFF', display: 'inline-block' }}></span>
                  Grid
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-2)' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--solar)', display: 'inline-block' }}></span>
                  Solar
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-2)' }}>
                  <span style={{ width: '10px', height: '2px', background: 'var(--warn)', display: 'inline-block', margin: '4px 0' }}></span>
                  Budget
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--ink-3)' }}>Click a bar → hourly breakdown</span>
              </div>

              {/* Chart SVG */}
              <div id="eu-main-chart" style={{ position: 'relative' }}>
                <svg id="eu-daily-svg" width="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet" style={{ cursor: 'pointer' }}>
                  {/* Grid lines */}
                  <line x1="30" y1="10" x2="710" y2="10" stroke="var(--line-1)" strokeWidth="0.5"></line>
                  <line x1="30" y1="40" x2="710" y2="40" stroke="var(--line-1)" strokeWidth="0.5"></line>
                  <line x1="30" y1="70" x2="710" y2="70" stroke="var(--line-1)" strokeWidth="0.5"></line>
                  <line x1="30" y1="100" x2="710" y2="100" stroke="var(--line-1)" strokeWidth="0.5"></line>
                  <line x1="30" y1="130" x2="710" y2="130" stroke="var(--line-1)" strokeWidth="0.5"></line>
                  <text x="2" y="14" fontSize="7.5" fill="var(--ink-3)">12K</text>
                  <text x="2" y="44" fontSize="7.5" fill="var(--ink-3)">9K</text>
                  <text x="2" y="74" fontSize="7.5" fill="var(--ink-3)">6K</text>
                  <text x="2" y="104" fontSize="7.5" fill="var(--ink-3)">3K</text>
                  <text x="2" y="134" fontSize="7.5" fill="var(--ink-3)">0</text>
                  
                  {/* Budget line */}
                  <line x1="30" y1="55" x2="710" y2="55" stroke="var(--warn)" strokeWidth="1" strokeDasharray="5 3"></line>
                  <text x="685" y="52" fontSize="7" fill="var(--warn)">Budget</text>

                  {/* Stacked Bars */}
                  <g id="eu-bar-group">
                    {/* Day 1 */}
                    <g className="eu-bar-day" data-day="1" data-val="5181" onClick={() => handleDrillDay(1, 5181)}>
                      <rect x="36" y="79" width="14" height="51" rx="1" fill="#9B6CFF" opacity="0.85"></rect>
                      <rect x="36" y="73" width="14" height="6" rx="1" fill="var(--solar)" opacity="0.8"></rect>
                      <text x="43" y="143" fontSize="6.5" fill="var(--ink-3)" textAnchor="middle">1</text>
                    </g>
                    {/* Day 2 */}
                    <g className="eu-bar-day" data-day="2" data-val="5757" onClick={() => handleDrillDay(2, 5757)}>
                      <rect x="58" y="74" width="14" height="56" rx="1" fill="#9B6CFF" opacity="0.85"></rect>
                      <rect x="58" y="68" width="14" height="6" rx="1" fill="var(--solar)" opacity="0.8"></rect>
                      <text x="65" y="143" fontSize="6.5" fill="var(--ink-3)" textAnchor="middle">2</text>
                    </g>
                    {/* Day 3 */}
                    <g className="eu-bar-day" data-day="3" data-val="6868" onClick={() => handleDrillDay(3, 6868)}>
                      <rect x="80" y="63" width="14" height="67" rx="1" fill="#9B6CFF" opacity="0.85"></rect>
                      <rect x="80" y="56" width="14" height="7" rx="1" fill="var(--solar)" opacity="0.8"></rect>
                      <text x="87" y="143" fontSize="6.5" fill="var(--ink-3)" textAnchor="middle">3</text>
                    </g>
                    {/* Day 13 Peak */}
                    <g className="eu-bar-day" data-day="13" data-val="10668" onClick={() => handleDrillDay(13, 10668)}>
                      <rect x="300" y="24" width="14" height="106" rx="1" fill="#F25B5B" opacity="0.9"></rect>
                      <rect x="300" y="17" width="14" height="7" rx="1" fill="var(--solar)" opacity="0.8"></rect>
                      <text x="307" y="143" fontSize="6" fill="var(--bad)" textAnchor="middle" fontWeight="700">13↑</text>
                    </g>
                    {/* Day 20 Today */}
                    <g className="eu-bar-day" data-day="20" data-val="6553" onClick={() => handleDrillDay(20, 6553)}>
                      <rect x="454" y="69" width="14" height="61" rx="1" fill="#4EA1FF" opacity="0.95"></rect>
                      <rect x="454" y="62" width="14" height="7" rx="1" fill="var(--solar)" opacity="0.9"></rect>
                      <text x="461" y="143" fontSize="6" fill="var(--info)" textAnchor="middle" fontWeight="700">20●</text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* MTD Summary Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--line-1)', background: 'var(--surface-2)' }}>
              <div style={{ padding: '8px 14px', borderRight: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>MTD Total</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-0)', marginTop: '2px' }}>1,42,<span style={{ fontSize: '11px' }}>000</span> kWh</div>
              </div>
              <div style={{ padding: '8px 14px', borderRight: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Avg Daily</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-0)', marginTop: '2px' }}>6,290 kWh</div>
              </div>
              <div style={{ padding: '8px 14px', borderRight: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Peak Day</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--bad)', marginTop: '2px' }}>10,668 kWh</div>
              </div>
              <div style={{ padding: '8px 14px' }}>
                <div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>vs Budget</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ok)', marginTop: '2px' }}>↓ ₹2.1L saved</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Donut + Cost breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Donut Card */}
            <div className="eu-card" style={{ flex: 1 }}>
              <div className="eu-card-hd" style={cardHeaderStyle}>
                <div className="eu-card-title">Consumption Split</div>
                <div className="eu-icon-act" onClick={() => handleDrilldown('Consumption Split', 'today')}><i className="ti ti-maximize"></i></div>
              </div>
              <div className="eu-card-body" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <svg width="110" height="110" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="#9B6CFF" strokeWidth="12" strokeDasharray="110 162" strokeDashoffset="0" transform="rotate(-90 55 55)"></circle>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="var(--solar)" strokeWidth="12" strokeDasharray="25 247" strokeDashoffset="-110" transform="rotate(-90 55 55)"></circle>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="var(--ok)" strokeWidth="12" strokeDasharray="45 227" strokeDashoffset="-135" transform="rotate(-90 55 55)"></circle>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="var(--cool)" strokeWidth="12" strokeDasharray="10 262" strokeDashoffset="-180" transform="rotate(-90 55 55)"></circle>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="var(--surface-3)" strokeWidth="12" strokeDasharray="62 210" strokeDashoffset="-190" transform="rotate(-90 55 55)"></circle>
                  <text x="55" y="51" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink-0)">6,553</text>
                  <text x="55" y="63" textAnchor="middle" fontSize="8" fill="var(--ink-3)">kWh today</text>
                </svg>

                <div style={{ flex: 1, fontSize: '11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', cursor: 'pointer' }} onClick={() => handleCategoryDrill('HVAC')}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#9B6CFF', display: 'inline-block' }}></span>
                      <span style={{ color: 'var(--ink-1)' }}>HVAC</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>
                      2,865<span style={{ fontSize: '9px', color: 'var(--ink-3)', fontWeight: 400 }}> 43.7%</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', cursor: 'pointer' }} onClick={() => handleCategoryDrill('Kitchen')}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--ok)', display: 'inline-block' }}></span>
                      <span style={{ color: 'var(--ink-1)' }}>Kitchen</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>
                      1,180<span style={{ fontSize: '9px', color: 'var(--ink-3)', fontWeight: 400 }}> 18%</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', cursor: 'pointer' }} onClick={() => handleCategoryDrill('Lighting')}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--solar)', display: 'inline-block' }}></span>
                      <span style={{ color: 'var(--ink-1)' }}>Lighting</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>
                      655<span style={{ fontSize: '9px', color: 'var(--ink-3)', fontWeight: 400 }}> 10%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Card */}
            <div className="eu-card">
              <div className="eu-card-hd" style={cardHeaderStyle}>
                <div className="eu-card-title">Cost Breakdown</div>
                <div className="eu-icon-act" onClick={() => handleDrilldown('Cost Breakdown', 'today')}><i className="ti ti-maximize"></i></div>
              </div>
              <div className="eu-card-body" style={{ padding: '8px 14px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-2)' }}>Energy charges</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>₹47,818</span>
                </div>
                <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: '8px', overflow: 'hidden' }}>
                  <div style={{ width: '74%', height: '100%', background: '#9B6CFF', borderRadius: '2px' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-2)' }}>Demand charges</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>₹29,400</span>
                </div>
                <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: '8px', overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: 'var(--warn)', borderRadius: '2px' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="ti ti-solar-panel" style={{ fontSize: '11px', color: 'var(--solar)' }}></i>Solar savings
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ok)' }}>−₹12,276</span>
                </div>
                <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '19%', height: '100%', background: 'var(--ok)', borderRadius: '2px' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingTop: '8px', borderTop: '1px solid var(--line-1)' }}>
                  <span style={{ color: 'var(--ink-1)', fontWeight: 600 }}>Net Cost Today</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--warn)', fontSize: '13px' }}>₹64,942</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM ROW: LT Panel Distribution ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div className="eu-card">
            <div className="eu-card-hd" style={cardHeaderStyle}>
              <div>
                <div className="eu-card-title">LT Panel Distribution</div>
                <div className="eu-card-sub">kWh · Click panel bar to drill down</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <select className="eu-sel" style={{ padding: '3px 8px', fontSize: '10.5px' }}>
                  <option>SUB LT Panel</option>
                  <option>Main LT Panel</option>
                </select>
                <div className="eu-icon-act" onClick={() => handleDrilldown('LT Panel', 'all')}><i className="ti ti-maximize"></i></div>
              </div>
            </div>
            <div style={{ overflowX: 'auto', padding: '4px 14px 10px' }}>
              <svg width="900" height="120" viewBox="0 0 900 120" style={{ cursor: 'pointer' }}>
                <line x1="0" y1="15" x2="900" y2="15" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <line x1="0" y1="45" x2="900" y2="45" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <line x1="0" y1="75" x2="900" y2="75" stroke="var(--line-1)" strokeWidth="0.5"></line>
                <text x="0" y="14" fontSize="7" fill="var(--ink-3)">400</text>
                <text x="0" y="44" fontSize="7" fill="var(--ink-3)">200</text>
                <text x="0" y="74" fontSize="7" fill="var(--ink-3)">0</text>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Energy_Utilities;