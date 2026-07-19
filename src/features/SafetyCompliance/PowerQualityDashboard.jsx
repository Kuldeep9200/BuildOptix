import React, { useState } from 'react';

export default function PowerQualityDashboard() {
  // Incomer Sub-tab State Management (0: Incomer 1, 1: Incomer 2, 2: Solar Feed-in)
  // Initialized to 2 as per the explicit "active" class marker in your source markup
  const [selectedIncomer, setSelectedIncomer] = useState(2);

  // Safe callback execution handler for global actions to prevent execution crashes
  const handleToastAction = (message, type) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(message, type);
    } else {
      console.log(`[Toast Action] Type: ${type} | Message: ${message}`);
    }
  };

  return (
    <div className="page active" id="pg-powerquality">
      <div className="tab-panel active" data-page="powerquality" data-tab="0">
        
        {/* 5-Column Power Quality KPI Metrics Bar */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
          <div className="kpi glow-warn">
            <div className="kpi-l">Power Factor (Incomer 1)</div>
            <div className="kpi-v warn">0.82</div>
            <div className="kpi-s">Below 0.85 — PF penalty</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Voltage THD</div>
            <div className="kpi-v ok">3.1<span className="kpi-u">%</span></div>
            <div className="kpi-s">IEEE 519: less than 5% ✓</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Voltage Unbalance</div>
            <div className="kpi-v ok">0.6<span className="kpi-u">%</span></div>
            <div className="kpi-s">Limit 2% ✓</div>
          </div>
          <div className="kpi glow-info">
            <div className="kpi-l">Capacitor Bank</div>
            <div className="kpi-v">180<span class="kpi-u">kVAr</span></div>
            <div className="kpi-s">3 / 4 steps ON</div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Est. PF Penalty (MTD)</div>
            <div className="kpi-v warn">₹18,400</div>
            <div className="kpi-s">MSEDCL tariff clause</div>
          </div>
        </div>

        {/* Dynamic Incomer Source Selection Header Bar */}
        <div className="pq-incomer-tabs card" style={{ padding: 0, borderRadius: '10px 10px 0 0', marginBottom: 0 }}>
          <div 
            className={`pq-incomer-tab ${selectedIncomer === 0 ? 'active' : ''}`} 
            onClick={() => setSelectedIncomer(0)}
          >
            Incomer 1 — Main LT (1000 kVA)
          </div>
          <div 
            className={`pq-incomer-tab ${selectedIncomer === 1 ? 'active' : ''}`} 
            onClick={() => setSelectedIncomer(1)}
          >
            Incomer 2 — Emergency (500 kVA)
          </div>
          <div 
            className={`pq-incomer-tab ${selectedIncomer === 2 ? 'active' : ''}`} 
            onClick={() => setSelectedIncomer(2)}
          >
            Solar Feed-in (200 kWp)
          </div>
        </div>

        {/* Main Parameters Split Grid Frame */}
        <div className="g21 mb-14" style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
          
          {/* Section A: Live 3-Phase Voltage & PF Vector Parameters */}
          <div className="card" style={{ borderRadius: '0 0 0 10px' }}>
            <div className="ch">
              <div>
                <div className="ct">3-Phase Power Parameters — Live</div>
                <div className="cs">Incomer 1 · 415V L-L · 10:24 AM</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div style={{ display: 'flex', gap: '16px', padding: '14px', alignItems: 'center' }}>
                
                {/* Embedded SVG Power Factor Circular Progress Gauge */}
                <div className="pq-gauge-ring">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="var(--surface-3)" strokeWidth="10"></circle>
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="48" 
                      fill="none" 
                      stroke="var(--warn)" 
                      strokeWidth="10" 
                      strokeDasharray="246 55" 
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="pq-gauge-center">
                    <span className="pq-gauge-val" style={{ color: 'var(--warn)' }}>0.82</span>
                    <span className="pq-gauge-lbl">Pwr Factor</span>
                  </div>
                </div>

                {/* Phase-wise Structural Realtime Vector Readings */}
                <div style={{ flex: 1 }}>
                  <div className="pq-phase-grid" style={{ border: '1px solid var(--line-2)', borderRadius: '8px', overflow: 'hidden' }}>
                    
                    {/* Red Phase Vector Column */}
                    <div className="pq-phase-col">
                      <div className="pq-phase-hd" style={{ color: 'var(--bad)' }}>R Phase</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>V (R-N)</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ok)' }}>229 V</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>Current</span><span style={{ fontFamily: 'var(--font-mono)' }}>818 A</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>kW</span><span style={{ fontFamily: 'var(--font-mono)' }}>188 kW</span></div>
                      </div>
                    </div>

                    {/* Yellow Phase Vector Column */}
                    <div className="pq-phase-col">
                      <div className="pq-phase-hd" style={{ color: 'var(--warn)' }}>Y Phase</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>V (Y-N)</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ok)' }}>230 V</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>Current</span><span style={{ fontFamily: 'var(--font-mono)' }}>815 A</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>kW</span><span style={{ fontFamily: 'var(--font-mono)' }}>188 kW</span></div>
                      </div>
                    </div>

                    {/* Blue Phase Vector Column */}
                    <div className="pq-phase-col">
                      <div className="pq-phase-hd" style={{ color: 'var(--info)' }}>B Phase</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>V (B-N)</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ok)' }}>231 V</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>Current</span><span style={{ fontFamily: 'var(--font-mono)' }}>812 A</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}><span style={{ color: 'var(--ink-3)' }}>kW</span><span style={{ fontFamily: 'var(--font-mono)' }}>187 kW</span></div>
                      </div>
                    </div>

                  </div>

                  {/* Aggregated Power Quality System Summaries */}
                  <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line-1)', borderRadius: '7px', padding: '8px 10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: 'var(--ink-3)' }}>Total kW</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--ink-0)' }}>563</div>
                    </div>
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line-1)', borderRadius: '7px', padding: '8px 10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: 'var(--ink-3)' }}>kVA</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--ink-0)' }}>686</div>
                    </div>
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line-1)', borderRadius: '7px', padding: '8px 10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: 'var(--ink-3)' }}>Frequency</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--ok)' }}>49.98 Hz</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Section B: Voltage Total Harmonic Distortion Spectrum Column */}
          <div className="card" style={{ borderRadius: '0 0 10px 0' }}>
            <div className="ch">
              <div>
                <div className="ct">Harmonics Spectrum — Voltage THD</div>
                <div className="cs">IEEE 519 limit: 5% total</div>
              </div>
            </div>
            <div className="cb">
              <div style={{ position: 'relative', padding: '0 14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '90px', paddingBottom: '4px' }}>
                  <div className="pq-harm-col"><div className="pq-harm-bar" style={{ height: '52px', background: 'var(--info)' }}></div><div className="pq-harm-lbl">3rd</div><div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>2.8%</div></div>
                  <div className="pq-harm-col"><div className="pq-harm-bar" style={{ height: '16px', background: 'var(--ok)' }}></div><div className="pq-harm-lbl">5th</div><div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>0.9%</div></div>
                  <div className="pq-harm-col"><div className="pq-harm-bar" style={{ height: '10px', background: 'var(--ok)' }}></div><div className="pq-harm-lbl">7th</div><div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>0.5%</div></div>
                  <div className="pq-harm-col"><div className="pq-harm-bar" style={{ height: '6px', background: 'var(--ok)' }}></div><div className="pq-harm-lbl">9th</div><div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>0.3%</div></div>
                  <div className="pq-harm-col"><div className="pq-harm-bar" style={{ height: '4px', background: 'var(--ok)' }}></div><div className="pq-harm-lbl">11th</div><div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>0.2%</div></div>
                  <div className="pq-harm-col"><div className="pq-harm-bar" style={{ height: '3px', background: 'var(--ok)' }}></div><div className="pq-harm-lbl">13th</div><div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>0.1%</div></div>
                </div>
                {/* IEEE Strict Violation Safety Guideline Line */}
                <div style={{ position: 'absolute', top: '6px', left: '14px', right: '14px', borderTop: '1.5px dashed var(--bad)', display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '9px', color: 'var(--bad)', background: 'var(--surface-1)', padding: '0 4px', marginTop: '-8px' }}>IEEE 519: 5%</span>
                </div>
              </div>
              <div style={{ padding: '10px 14px', marginTop: '4px', background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.2)', borderRadius: '6px', fontSize: '11px', color: 'var(--ok)' }}>
                ✓ Total THD 3.1% — within IEEE 519 limit. No harmonic filter required currently.
              </div>
            </div>
          </div>

        </div>

        {/* Section C: APFC Capacitor Bank Multiphase Steps */}
        <div className="card mb-14">
          <div className="ch">
            <div>
              <div className="ct">Capacitor Bank — Reactive Power Compensation</div>
              <div className="cs">Auto APFC · Target PF 0.95</div>
            </div>
            <span className="ca" onClick={() => handleToastAction('Switching to manual APFC mode...', 'info')}>Manual Override</span>
          </div>
          <div className="cb">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '14px' }}>
              <div className="pq-cap-step on"><div className="pq-cap-step-num">Step 1</div><div className="pq-cap-step-val">60 kVAr</div><div style={{ fontSize: '9.5px', color: 'var(--ok)', marginTop: '2px' }}>ON</div></div>
              <div className="pq-cap-step on"><div className="pq-cap-step-num">Step 2</div><div className="pq-cap-step-val">60 kVAr</div><div style={{ fontSize: '9.5px', color: 'var(--ok)', marginTop: '2px' }}>ON</div></div>
              <div className="pq-cap-step on"><div className="pq-cap-step-num">Step 3</div><div className="pq-cap-step-val">60 kVAr</div><div style={{ fontSize: '9.5px', color: 'var(--ok)', marginTop: '2px' }}>ON</div></div>
              <div className="pq-cap-step off"><div className="pq-cap-step-num">Step 4</div><div className="pq-cap-step-val">60 kVAr</div><div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '2px' }}>OFF</div></div>
            </div>
            <div style={{ padding: '9px 12px', background: 'var(--warn-soft)', border: '1px solid rgba(245,180,65,0.25)', borderRadius: '7px', fontSize: '11.5px', color: 'var(--warn)' }}>
              ⚠ PF currently 0.82 — below MSEDCL target of 0.85. Estimated monthly penalty: <b>₹18,400</b>. Recommend switching Step 4 ON and reviewing load mix.
            </div>
          </div>
        </div>

        {/* Section D: Historical Vector Power Factor Line Curve Metric Graph */}
        <div className="card">
          <div className="ch"><div><div className="ct">Power Factor Trend — Last 7 Days</div></div></div>
          <div className="cb">
            <svg className="chart-svg" viewBox="0 0 480 110">
              <line x1="0" y1="15" x2="480" y2="15" stroke="var(--line-1)" strokeWidth="0.5"></line>
              <line x1="0" y1="45" x2="480" y2="45" stroke="var(--line-1)" strokeWidth="0.5"></line>
              <line x1="0" y1="75" x2="480" y2="75" stroke="var(--line-1)" strokeWidth="0.5"></line>
              <line x1="0" y1="52" x2="480" y2="52" stroke="var(--warn)" strokeWidth="1" strokeDasharray="5 3"></line>
              
              <text x="2" y="14" fontSize="8" fill="var(--ink-3)">0.95</text>
              <text x="2" y="44" fontSize="8" fill="var(--ink-3)">0.90</text>
              <text x="2" y="74" fontSize="8" fill="var(--ink-3)">0.85</text>
              <text x="380" y="50" fontSize="8" fill="var(--warn)">0.85 target</text>
              
              <path d="M40,68 L100,62 L160,55 L220,60 L280,72 L340,78 L400,72 L440,68" fill="none" stroke="var(--info)" strokeWidth="2.5"></path>
              
              <circle cx="40" cy="68" r="3.5" fill="var(--info)"></circle>
              <circle cx="100" cy="62" r="3.5" fill="var(--info)"></circle>
              <circle cx="160" cy="55" r="3.5" fill="var(--ok)"></circle>
              <circle cx="220" cy="60" r="3.5" fill="var(--ok)"></circle>
              <circle cx="280" cy="72" r="3.5" fill="var(--warn)"></circle>
              <circle cx="340" cy="78" r="3.5" fill="var(--bad)"></circle>
              <circle cx="400" cy="72" r="3.5" fill="var(--warn)"></circle>
              <circle cx="440" cy="68" r="3.5" fill="var(--warn)"></circle>
              
              <text x="40" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Mon</text>
              <text x="100" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Tue</text>
              <text x="160" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Wed</text>
              <text x="220" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Thu</text>
              <text x="280" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Fri</text>
              <text x="340" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Sat</text>
              <text x="400" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Sun</text>
              <text x="440" y="108" fontSize="8.5" fill="var(--ink-3)" textAnchor="middle">Today</text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}