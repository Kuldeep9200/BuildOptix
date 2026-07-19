import React, { useState } from 'react';

export default function Energy_Utilities() {
  // --- States ---
  const [activeTab, setActiveTab] = useState(0); // 0: Electricity, 1: Fuel, 2: Water, 3: Gas
  const [site, setSite] = useState('Vikhroli — Thane');
  const [fromDate, setFromDate] = useState('2026-05-20');
  const [toDate, setToDate] = useState('2026-05-20');
  const [chartView, setChartView] = useState('day'); // 'day' or 'month'

  // --- Mock Functions / Click Handlers ---
  const handleRefresh = () => {
    console.log("Refreshing dashboard data...");
  };

  const handleRangeSet = (rangeType) => {
    console.log(`Setting range to: ${rangeType}`);
    // Example logic to update dates based on selection
  };

  const handleDrilldown = (metric, timeframe) => {
    console.log(`Opening drilldown for ${metric} during ${timeframe}`);
  };

  const handleCategoryDrilldown = (category) => {
    console.log(`Drilling down into category: ${category}`);
  };

  // --- Dynamic Chart Data (Days 1 to 25) ---
  const dailyChartData = [
    { day: 1, val: 5181, gridH: 51, solarH: 6 },
    { day: 2, val: 5757, gridH: 56, solarH: 6 },
    { day: 3, val: 6868, gridH: 67, solarH: 7 },
    { day: 4, val: 5931, gridH: 53, solarH: 6 },
    { day: 5, val: 5855, gridH: 52, solarH: 6 },
    { day: 6, val: 6209, gridH: 58, solarH: 6 },
    { day: 7, val: 7295, gridH: 71, solarH: 7 },
    { day: 8, val: 7324, gridH: 71, solarH: 7 },
    { day: 9, val: 6946, gridH: 67, solarH: 7 },
    { day: 10, val: 7414, gridH: 72, solarH: 7 },
    { day: 11, val: 6402, gridH: 59, solarH: 7 },
    { day: 12, val: 2143, gridH: 24, solarH: 3, opacity: 0.6 },
    { day: 13, val: 10668, gridH: 106, solarH: 7, isPeak: true },
    { day: 14, val: 6753, gridH: 65, solarH: 7 },
    { day: 15, val: 7309, gridH: 70, solarH: 7 },
    { day: 16, val: 6340, gridH: 59, solarH: 7 },
    { day: 17, val: 6719, gridH: 65, solarH: 7 },
    { day: 18, val: 6464, gridH: 61, solarH: 7 },
    { day: 19, val: 6172, gridH: 57, solarH: 7 },
    { day: 20, val: 6553, gridH: 61, solarH: 7, isToday: true },
    // Future/Faded days
    { day: 21, val: 6651, gridH: 60, solarH: 0, isFuture: true },
    { day: 22, val: 6764, gridH: 62, solarH: 0, isFuture: true },
    { day: 23, val: 6727, gridH: 62, solarH: 0, isFuture: true },
    { day: 24, val: 6434, gridH: 59, solarH: 0, isFuture: true },
    { day: 25, val: 863, gridH: 9, solarH: 0, isFuture: true },
  ];

  return (
    <div className="page" id="pg-energy">
      <div className="tab-panel active" data-page="energy" data-tab="0">
        
        {/* ── TOP CONTROLS ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--line-1)' }}>
          
          {/* Utility tabs */}
          <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: '8px', padding: '3px', gap: '2px' }}>
            {[
              { label: '⚡ Electricity', index: 0 },
              { label: '⛽ Fuel', index: 1 },
              { label: '💧 Water', index: 2 },
              { label: '🔥 Gas', index: 3 }
            ].map((pill) => (
              <div
                key={pill.index}
                className={`eu-pill ${activeTab === pill.index ? 'active' : ''}`}
                onClick={() => setActiveTab(pill.index)}
                title={pill.label.split(' ')[1]}
                style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '6px' }}
              >
                {pill.label}
              </div>
            ))}
          </div>

          {/* Site Selector */}
          <select className="eu-sel" id="eu-site-sel" value={site} onChange={(e) => setSite(e.target.value)}>
            <option>Vikhroli — Thane</option>
            <option>Delhi — Sector 62</option>
            <option>Bengaluru — B1 Prestige</option>
            <option>Hyderabad — Madhapur</option>
          </select>

          {/* Date Range Inputs */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input type="date" className="eu-sel" id="eu-from" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>→</span>
            <input type="date" className="eu-sel" id="eu-to" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          {/* Quick Filter Buttons */}
          <div style={{ display: 'flex', gap: '5px' }}>
            <button className="eu-btn primary" onClick={handleRefresh}>View</button>
            <button className="eu-btn" onClick={() => handleRangeSet('mtd')}>MTD</button>
            <button className="eu-btn" onClick={() => handleRangeSet('ytd')}>YTD</button>
            <button className="eu-btn" onClick={() => handleRangeSet('yesterday')}>Yesterday</button>
          </div>

          {/* Live Status indicator */}
          <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: '10px', color: 'var(--ink-3)', lineHeight: '1.6' }}>
            <div style={{ color: 'var(--ok)', fontSize: '9.5px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>● LIVE</div>
            Updated: 20 May 2026 · 10:24 AM
          </div>
        </div>

        {/* ── ELECTRICITY MAIN CONTENT PANEL ── */}
        <div id="eu-elec-main">

          {/* ── HERO KPI STRIP ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '16px' }} id="eu-kpi-strip">
            
            {/* KPI 1: Total Consumption */}
            <div className="eu-kpi eu-kpi-electric" onClick={() => handleDrilldown('Total Consumption', 'today')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="eu-kpi-icon" style={{ background: 'rgba(155,108,255,0.15)' }}><i className="ti ti-bolt" style={{ color: '#9B6CFF' }}></i></div>
                <span className="eu-kpi-badge eu-kpi-badge-up">↓ 3.1%</span>
              </div>
              <div className="eu-kpi-v" id="eu-kpi-elec-total">6,553 kWh</div>
              <div className="eu-kpi-l">Today's Consumption</div>
              <div className="eu-kpi-sub">EB: 6,553 · DG: 0</div>
              <div className="eu-kpi-spark">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none"><path d="M0,18 L10,16 L20,14 L30,12 L40,10 L50,8 L60,7 L70,5 L80,4" fill="none" stroke="#9B6CFF" strokeWidth="1.5" opacity="0.7"/></svg>
              </div>
            </div>

            {/* KPI 2: Energy Cost */}
            <div className="eu-kpi eu-kpi-cost" onClick={() => handleDrilldown('Energy Cost', 'today')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="eu-kpi-icon" style={{ background: 'rgba(245,180,65,0.15)' }}><i className="ti ti-currency-rupee" style={{ color: 'var(--warn)' }}></i></div>
                <span className="eu-kpi-badge eu-kpi-badge-up">₹18K saved</span>
              </div>
              <div className="eu-kpi-v" style={{ color: 'var(--warn)' }} id="eu-kpi-elec-cost">₹64,875</div>
              <div className="eu-kpi-l">Today's Energy Cost</div>
              <div className="eu-kpi-sub">₹9.90/kWh · Peak tariff</div>
              <div className="eu-kpi-spark">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none"><path d="M0,18 L10,17 L20,15 L30,13 L40,11 L50,9 L60,8 L70,6 L80,5" fill="none" stroke="var(--warn)" strokeWidth="1.5" opacity="0.7"/></svg>
              </div>
            </div>

            {/* KPI 3: Solar Generation */}
            <div className="eu-kpi eu-kpi-solar" onClick={() => handleDrilldown('Solar Generation', 'today')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="eu-kpi-icon" style={{ background: 'rgba(255,214,107,0.15)' }}><i className="ti ti-solar-panel" style={{ color: 'var(--solar)' }}></i></div>
                <span className="eu-kpi-badge eu-kpi-badge-up">↑ 12%</span>
              </div>
              <div className="eu-kpi-v" style={{ color: 'var(--solar)' }} id="eu-kpi-elec-solar">1,240 kWh</div>
              <div className="eu-kpi-l">Solar Generation</div>
              <div className="eu-kpi-sub">88% capacity · ₹12,276 saved</div>
              <div className="eu-kpi-spark">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none"><path d="M0,22 L10,22 L20,18 L30,12 L40,8 L50,6 L60,8 L70,12 L80,18" fill="none" stroke="var(--solar)" strokeWidth="1.5" opacity="0.7"/></svg>
              </div>
            </div>

            {/* KPI 4: EPI Score */}
            <div className="eu-kpi eu-kpi-epi" onClick={() => handleDrilldown('EPI Score', 'today')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="eu-kpi-icon" style={{ background: 'rgba(34,214,122,0.15)' }}><i className="ti ti-leaf" style={{ color: 'var(--ok)' }}></i></div>
                <span className="eu-kpi-badge" style={{ background: 'rgba(34,214,122,0.15)', color: 'var(--ok)' }}>Grade B+</span>
              </div>
              <div className="eu-kpi-v" style={{ color: 'var(--ok)' }} id="eu-kpi-elec-epi">87/100</div>
              <div className="eu-kpi-l">EPI Score</div>
              <div className="eu-kpi-sub">Target: 90 · Gap: 3 pts</div>
              <div className="eu-kpi-spark">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none"><path d="M0,20 L20,18 L40,16 L60,14 L80,12" fill="none" stroke="var(--ok)" strokeWidth="1.5" opacity="0.7"/></svg>
              </div>
            </div>

            {/* KPI 5: Carbon Footprint */}
            <div className="eu-kpi eu-kpi-carbon" onClick={() => handleDrilldown('CO₂ Footprint', 'today')} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="eu-kpi-icon" style={{ background: 'rgba(52,210,230,0.15)' }}><i className="ti ti-cloud" style={{ color: 'var(--cool)' }}></i></div>
                <span className="eu-kpi-badge eu-kpi-badge-up">−28.6t solar</span>
              </div>
              <div className="eu-kpi-v" style={{ color: 'var(--cool)' }} id="eu-kpi-elec-carbon">3.14 tCO₂</div>
              <div className="eu-kpi-l">Today's Carbon</div>
              <div className="eu-kpi-sub">Net: 0.48 kgCO₂/kWh</div>
              <div className="eu-kpi-spark">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none"><path d="M0,14 L20,12 L40,10 L60,9 L80,8" fill="none" stroke="var(--cool)" strokeWidth="1.5" opacity="0.7"/></svg>
              </div>
            </div>
          </div>

          {/* ── MAIN CHARTS ROW ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>

            {/* LEFT CARD: Main Daily Consumption Bar Chart */}
            <div className="eu-card">
              <div className="eu-card-hd">
                <div>
                  <div className="eu-card-title">Daily Consumption — May 2026</div>
                  <div className="eu-card-sub">kWh · Click any bar to drill down by hour</div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', background: 'var(--surface-3)', borderRadius: '6px', padding: '2px', gap: '2px' }}>
                    <div className={`eu-chart-toggle ${chartView === 'day' ? 'active' : ''}`} onClick={() => setChartView('day')} style={{ cursor: 'pointer' }}>Daily</div>
                    <div className={`eu-chart-toggle ${chartView === 'month' ? 'active' : ''}`} onClick={() => setChartView('month')} style={{ cursor: 'pointer' }}>Monthly</div>
                  </div>
                  <div className="eu-icon-act" onClick={() => handleDrilldown('Daily Consumption', 'may')} title="Full screen view" style={{ cursor: 'pointer' }}><i className="ti ti-maximize"></i></div>
                  <div className="eu-icon-act" title="Download CSV" style={{ cursor: 'pointer' }}><i className="ti ti-download"></i></div>
                </div>
              </div>

              <div className="eu-card-body" style={{ padding: '12px 14px 0' }}>
                {/* Chart Legends */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', fontSize: '10.5px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-2)' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#9B6CFF', display: 'inline-block' }}></span>Grid</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-2)' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--solar)', display: 'inline-block' }}></span>Solar</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-2)' }}><span style={{ width: '10px', height: '2px', background: 'var(--warn)', display: 'inline-block', margin: '4px 0' }}></span>Budget</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--ink-3)' }}>Click a bar → hourly breakdown</span>
                </div>

                {/* SVG Stacked Bar Chart renders dynamically from array */}
                <div id="eu-main-chart" style={{ position: 'relative' }}>
                  <svg id="eu-daily-svg" width="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet" style={{ cursor: 'pointer' }}>
                    {/* Grid Background Lines */}
                    <line x1="30" y1="10" x2="710" y2="10" stroke="var(--line-1)" strokeWidth="0.5"/>
                    <line x1="30" y1="40" x2="710" y2="40" stroke="var(--line-1)" strokeWidth="0.5"/>
                    <line x1="30" y1="70" x2="710" y2="70" stroke="var(--line-1)" strokeWidth="0.5"/>
                    <line x1="30" y1="100" x2="710" y2="100" stroke="var(--line-1)" strokeWidth="0.5"/>
                    <line x1="30" y1="130" x2="710" y2="130" stroke="var(--line-1)" strokeWidth="0.5"/>
                    <text x="2" y="14" fontSize="7.5" fill="var(--ink-3)">12K</text>
                    <text x="2" y="44" fontSize="7.5" fill="var(--ink-3)">9K</text>
                    <text x="2" y="74" fontSize="7.5" fill="var(--ink-3)">6K</text>
                    <text x="2" y="104" fontSize="7.5" fill="var(--ink-3)">3K</text>
                    <text x="2" y="134" fontSize="7.5" fill="var(--ink-3)">0</text>
                    
                    {/* Dotted Target Budget Line */}
                    <line x1="30" y1="55" x2="710" y2="55" stroke="var(--warn)" strokeWidth="1" strokeDasharray="5 3"/>
                    <text x="685" y="52" fontSize="7" fill="var(--warn)">Budget</text>
                    
                    {/* Map & Render Bars */}
                    <g id="eu-bar-group">
                      {dailyChartData.map((item, idx) => {
                        const xOffset = 36 + idx * 22;
                        
                        // Set color variables matching conditions
                        let barFill = '#9B6CFF';
                        if (item.isPeak) barFill = '#F25B5B';
                        if (item.isToday) barFill = '#4EA1FF';

                        let barOpacity = item.opacity || 0.85;
                        if (item.isFuture) barOpacity = 0.45;
                        if (item.isToday) barOpacity = 0.95;

                        // Calculate Y positioning dynamically for stacked items
                        const gridY = 130 - item.gridH;
                        const solarY = gridY - item.solarH;

                        return (
                          <g 
                            key={item.day} 
                            className="eu-bar-day" 
                            data-day={item.day} 
                            data-val={item.val} 
                            onClick={() => handleDrilldown(`Day ${item.day}`, 'hourly')}
                          >
                            {/* Grid Bar */}
                            <rect x={xOffset} y={gridY} width="14" height={item.gridH} rx="1" fill={barFill} opacity={barOpacity}/>
                            
                            {/* Solar Bar Overlay */}
                            {item.solarH > 0 && (
                              <rect x={xOffset} y={solarY} width="14" height={item.solarH} rx="1" fill="var(--solar)" opacity={item.isToday ? 0.9 : 0.8}/>
                            )}
                            
                            {/* Bottom Label Text */}
                            <text 
                              x={xOffset + 7} 
                              y="143" 
                              fontSize={item.isPeak || item.isToday ? "6" : "6.5"} 
                              fill={item.isPeak ? "var(--bad)" : item.isToday ? "var(--info)" : item.isFuture ? "var(--ink-4)" : "var(--ink-3)"} 
                              textAnchor="middle" 
                              fontWeight={item.isPeak || item.isToday ? "700" : "400"}
                            >
                              {item.day}{item.isPeak ? '↑' : item.isToday ? '●' : ''}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>
              </div>

              {/* MTD Metrics Footer Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--line-1)', background: 'var(--surface-2)' }}>
                <div style={{ padding: '8px 14px', borderRight: '1px solid var(--line-1)' }}><div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>MTD Total</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink-0)', marginTop: '2px' }}>1,42,<span style={{ fontSize: '11px' }}>000</span> kWh</div></div>
                <div style={{ padding: '8px 14px', borderRight: '1px solid var(--line-1)' }}><div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Avg Daily</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink-0)', marginTop: '2px' }}>6,290 kWh</div></div>
                <div style={{ padding: '8px 14px', borderRight: '1px solid var(--line-1)' }}><div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Peak Day</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--bad)', marginTop: '2px' }}>10,668 kWh</div></div>
                <div style={{ padding: '8px 14px' }}><div style={{ fontSize: '9px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>vs Budget</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ok)', marginTop: '2px' }}>↓ ₹2.1L saved</div></div>
              </div>
            </div>

            {/* RIGHT COLUMN: Donut and Cost breakdown side panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

              {/* Consumption Split Donut Card */}
              <div className="eu-card" style={{ flex: 1 }}>
                <div className="eu-card-hd">
                  <div className="eu-card-title">Consumption Split</div>
                  <div className="eu-icon-act" onClick={() => handleDrilldown('Consumption Split', 'today')} style={{ cursor: 'pointer' }}><i className="ti ti-maximize"></i></div>
                </div>
                <div className="eu-card-body" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  
                  {/* Inline CSS-based SVG Donut Chart */}
                  <svg width="110" height="110" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#9B6CFF" strokeWidth="12" strokeDasharray="110 162" strokeDashoffset="0" transform="rotate(-90 55 55)"/>
                    <circle cx="55" cy="55" r="40" fill="none" stroke="var(--solar)" strokeWidth="12" strokeDasharray="25 247" strokeDashoffset="-110" transform="rotate(-90 55 55)"/>
                    <circle cx="55" cy="55" r="40" fill="none" stroke="var(--ok)" strokeWidth="12" strokeDasharray="45 227" strokeDashoffset="-135" transform="rotate(-90 55 55)"/>
                    <circle cx="55" cy="55" r="40" fill="none" stroke="var(--cool)" strokeWidth="12" strokeDasharray="10 262" strokeDashoffset="-180" transform="rotate(-90 55 55)"/>
                    <circle cx="55" cy="55" r="40" fill="none" stroke="var(--surface-3)" strokeWidth="12" strokeDasharray="62 210" strokeDashoffset="-190" transform="rotate(-90 55 55)"/>
                    <text x="55" y="51" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink-0)">6,553</text>
                    <text x="55" y="63" textAnchor="middle" fontSize="8" fill="var(--ink-3)">kWh today</text>
                  </svg>
                  
                  {/* Category details mapper */}
                  <div style={{ flex: 1, fontSize: '11px' }}>
                    {[
                      { name: 'HVAC', value: '2,865', percent: '43.7%', color: '#9B6CFF' },
                      { name: 'Kitchen', value: '1,180', percent: '18%', color: 'var(--ok)' },
                      { name: 'Lighting', value: '655', percent: '10%', color: 'var(--solar)' },
                      { name: 'Lifts', value: '262', percent: '4%', color: 'var(--cool)' },
                      { name: 'Others', value: '1,591', percent: '24.3%', color: 'var(--ink-4)' },
                    ].map((cat) => (
                      <div 
                        key={cat.name} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', cursor: 'pointer' }}
                        onClick={() => handleCategoryDrilldown(cat.name)}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color, display: 'inline-block' }}></span>
                          <span style={{ color: 'var(--ink-1)' }}>{cat.name}</span>
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>
                          {cat.value}
                          <span style={{ fontSize: '9px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '4px' }}>{cat.percent}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cost Breakdown Mini Card */}
              <div className="eu-card">
                <div className="eu-card-hd">
                  <div className="eu-card-title">Cost Breakdown</div>
                  <div className="eu-icon-act" onClick={() => handleDrilldown('Cost Breakdown', 'today')} style={{ cursor: 'pointer' }}><i className="ti ti-maximize"></i></div>
                </div>
                <div className="eu-card-body" style={{ padding: '8px 14px 12px' }}>
                  
                  {/* row 1 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}><span style={{ color: 'var(--ink-2)' }}>Energy charges</span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>₹47,818</span></div>
                  <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: '8px', overflow: 'hidden' }}><div style={{ width: '74%', height: '100%', background: '#9B6CFF', borderRadius: '2px' }}></div></div>
                  
                  {/* row 2 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}><span style={{ color: 'var(--ink-2)' }}>Demand charges</span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink-0)' }}>₹29,400</span></div>
                  <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: '8px', overflow: 'hidden' }}><div style={{ width: '45%', height: '100%', background: 'var(--warn)', borderRadius: '2px' }}></div></div>
                  
                  {/* row 3 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}><span style={{ color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: '4px' }}><i className="ti ti-solar-panel" style={{ fontSize: '11px', color: 'var(--solar)' }}></i>Solar savings</span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ok)' }}>−₹12,276</span></div>
                  <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' }}><div style={{ width: '19%', height: '100%', background: 'var(--ok)', borderRadius: '2px' }}></div></div>
                  
                  {/* Net sum total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingTop: '8px', borderTop: '1px solid var(--line-1)' }}>
                    <span style={{ color: 'var(--ink-1)', fontWeight: 600 }}>Net Cost Today</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--warn)', fontSize: '13px' }}>₹64,942</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}