import React from 'react';

export default function IaqDashboard() {
  return (
    <div className="tab-panel active" data-page="iaq" data-tab="0">
      
      {/* 5-Column IAQ Metric Overview Strip */}
      <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
        <div className="kpi glow-ok">
          <div className="kpi-l">Zones Normal (CO₂)</div>
          <div className="kpi-v ok">14<span className="kpi-u">/18</span></div>
          <div className="kpi-s">less than 800 ppm</div>
        </div>
        <div className="kpi glow-warn">
          <div className="kpi-l">Zones Elevated</div>
          <div className="kpi-v warn">3</div>
          <div className="kpi-s">800–1000 ppm</div>
        </div>
        <div className="kpi glow-bad">
          <div className="kpi-l">Zones Critical</div>
          <div className="kpi-v bad">1</div>
          <div className="kpi-s">greater than 1000 ppm — Floor 5</div>
        </div>
        <div className="kpi glow-ok">
          <div className="kpi-l">Avg PM2.5</div>
          <div className="kpi-v ok">14.2<span className="kpi-u">µg/m³</span></div>
          <div className="kpi-s">WHO 24h: less than 15 ✓</div>
        </div>
        <div className="kpi glow-info">
          <div className="kpi-l">Avg Humidity</div>
          <div className="kpi-v">54<span className="kpi-u">%</span></div>
          <div className="kpi-s">ASHRAE 55 range ✓</div>
        </div>
      </div>

      {/* Grid Headers and Legend Definitions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginbottom: '10px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-1)' }}>Zone-by-Zone IAQ Status — Vikhroli</div>
        <div className="iaq-legend">
          <span><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.4)', display: 'inline-block' }}></span> less than 800 ppm Good</span>
          <span><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--warn-soft)', border: '1px solid rgba(245,180,65,0.4)', display: 'inline-block' }}></span> 800–1000 Elevated</span>
          <span><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--bad-soft)', border: '1px solid rgba(242,91,91,0.4)', display: 'inline-block' }}></span> greater than 1000 Critical</span>
        </div>
      </div>

      {/* IAQ Parameters Monitoring Zone Cards Grid */}
      <div className="iaq-zone-grid">
        
        {/* Floor 5 — Zone A (Critical Alert Card) */}
        <div className="iaq-zone-card alert-bad" id="iaq-zone-f5a">
          <div className="iaq-zone-hd"><span className="iaq-zone-name">Floor 5 — Zone A</span><span className="badge badge-red">Critical</span></div>
          <div className="iaq-zone-body">
            <div className="iaq-param-row"><span className="iaq-param-label">CO₂</span><span className="iaq-param-val" style={{ color: 'var(--bad)' }}>1,148 ppm</span></div>
            <div className="iaq-gauge-bar"><div className="iaq-gauge-fill" style={{ width: '96%', background: 'var(--bad)' }}></div></div>
            <div className="iaq-param-row" style={{ marginTop: '6px' }}><span className="iaq-param-label">PM2.5</span><span className="iaq-param-val" style={{ color: 'var(--warn)' }}>18.4 µg/m³</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">TVOC</span><span className="iaq-param-val">280 ppb</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Humidity</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>57%</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Temp</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>23.4 °C</span></div>
            <div style={{ marginTop: '8px', padding: '6px 8px', background: 'var(--bad-soft)', border: '1px solid rgba(242,91,91,0.25)', borderRadius: '6px', fontSize: '10.5px', color: 'var(--bad)' }}>
              ⚠ DCV triggered — fresh air damper 100%
            </div>
          </div>
        </div>

        {/* Floor 4 — Conference (Warning Alert Card) */}
        <div className="iaq-zone-card alert-warn">
          <div className="iaq-zone-hd"><span className="iaq-zone-name">Floor 4 — Conference</span><span className="badge badge-amber">Elevated</span></div>
          <div className="iaq-zone-body">
            <div className="iaq-param-row"><span className="iaq-param-label">CO₂</span><span className="iaq-param-val" style={{ color: 'var(--warn)' }}>924 ppm</span></div>
            <div className="iaq-gauge-bar"><div className="iaq-gauge-fill" style={{ width: '77%', background: 'var(--warn)' }}></div></div>
            <div className="iaq-param-row" style={{ marginTop: '6px' }}><span className="iaq-param-label">PM2.5</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>11.2 µg/m³</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">TVOC</span><span className="iaq-param-val">180 ppb</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Humidity</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>52%</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Temp</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>22.8 °C</span></div>
          </div>
        </div>

        {/* Floor 6 — Open Office B (Warning Alert Card) */}
        <div className="iaq-zone-card alert-warn">
          <div className="iaq-zone-hd"><span className="iaq-zone-name">Floor 6 — Open Office B</span><span className="badge badge-amber">Elevated</span></div>
          <div className="iaq-zone-body">
            <div className="iaq-param-row"><span className="iaq-param-label">CO₂</span><span className="iaq-param-val" style={{ color: 'var(--warn)' }}>870 ppm</span></div>
            <div className="iaq-gauge-bar"><div className="iaq-gauge-fill" style={{ width: '72%', background: 'var(--warn)' }}></div></div>
            <div className="iaq-param-row" style={{ marginTop: '6px' }}><span className="iaq-param-label">PM2.5</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>9.8 µg/m³</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">TVOC</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>142 ppb</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Humidity</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>49%</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Temp</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>23.1 °C</span></div>
          </div>
        </div>

        {/* Floor 3 — Open Office A (Normal Card) */}
        <div className="iaq-zone-card">
          <div className="iaq-zone-hd"><span className="iaq-zone-name">Floor 3 — Open Office A</span><span className="badge badge-green">Good</span></div>
          <div className="iaq-zone-body">
            <div className="iaq-param-row"><span className="iaq-param-label">CO₂</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>648 ppm</span></div>
            <div className="iaq-gauge-bar"><div className="iaq-gauge-fill" style={{ width: '54%', background: 'var(--ok)' }}></div></div>
            <div className="iaq-param-row" style={{ marginTop: '6px' }}><span className="iaq-param-label">PM2.5</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>8.1 µg/m³</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">TVOC</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>110 ppb</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Humidity</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>51%</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Temp</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>22.6 °C</span></div>
          </div>
        </div>

        {/* Ground — Lobby / Reception (Normal Card) */}
        <div className="iaq-zone-card">
          <div className="iaq-zone-hd"><span className="iaq-zone-name">Ground — Lobby / Reception</span><span className="badge badge-green">Good</span></div>
          <div className="iaq-zone-body">
            <div className="iaq-param-row"><span className="iaq-param-label">CO₂</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>512 ppm</span></div>
            <div className="iaq-gauge-bar"><div className="iaq-gauge-fill" style={{ width: '42%', background: 'var(--ok)' }}></div></div>
            <div className="iaq-param-row" style={{ marginTop: '6px' }}><span className="iaq-param-label">PM2.5</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>12.4 µg/m³</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">TVOC</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>98 ppb</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Humidity</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>55%</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Temp</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>24.0 °C</span></div>
          </div>
        </div>

        {/* Basement B1 — Parking Carbon Monoxide Metrics Card */}
        <div className="iaq-zone-card">
          <div className="iaq-zone-hd"><span className="iaq-zone-name">Basement B1 — Parking</span><span className="badge badge-green">Good</span></div>
          <div className="iaq-zone-body">
            <div className="iaq-param-row"><span className="iaq-param-label">CO (carbon monoxide)</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>4.2 ppm</span></div>
            <div className="iaq-gauge-bar"><div className="iaq-gauge-fill" style={{ width: '8%', background: 'var(--ok)' }}></div></div>
            <div className="iaq-param-row" style={{ marginTop: '6px' }}><span className="iaq-param-label">CO Threshold</span><span className="iaq-param-val" style={{ color: 'var(--ink-3)' }}>Alarm: 50 ppm</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">CO₂</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>490 ppm</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">NOₓ</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>0.04 ppm</span></div>
            <div className="iaq-param-row"><span className="iaq-param-label">Ventilation</span><span className="iaq-param-val" style={{ color: 'var(--ok)' }}>Auto — OK</span></div>
          </div>
        </div>

      </div>

      {/* CO₂ Matrix Heatmap Layout Row-by-Row Array */}
      <div className="iaq-heatmap-wrap">
        <div className="iaq-heatmap-title">CO₂ Floor Heatmap — Live (ppm) · ASHRAE 62.1 Thresholds</div>
        <div style={{ display: 'grid', gridTemplateRows: 'auto', gap: '6px' }}>
          
          {/* Floor 7 Cells Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)' }}>Floor 7</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              <div className="iaq-cell co2-ok">624</div>
              <div className="iaq-cell co2-ok">611</div>
              <div className="iaq-cell co2-ok">648</div>
              <div className="iaq-cell co2-ok">635</div>
              <div className="iaq-cell co2-ok">618</div>
              <div className="iaq-cell co2-ok">602</div>
            </div>
          </div>

          {/* Floor 6 Cells Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)' }}>Floor 6</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              <div className="iaq-cell co2-ok">712</div>
              <div className="iaq-cell co2-warn">845</div>
              <div className="iaq-cell co2-warn">870</div>
              <div className="iaq-cell co2-warn">858</div>
              <div className="iaq-cell co2-ok">780</div>
              <div className="iaq-cell co2-ok">721</div>
            </div>
          </div>

          {/* Floor 5 Cells Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)' }}>Floor 5</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              <div className="iaq-cell co2-bad">1148</div>
              <div className="iaq-cell co2-bad">1092</div>
              <div className="iaq-cell co2-warn">944</div>
              <div className="iaq-cell co2-warn">910</div>
              <div className="iaq-cell co2-ok">782</div>
              <div className="iaq-cell co2-ok">748</div>
            </div>
          </div>

          {/* Floor 4 Cells Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)' }}>Floor 4</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              <div className="iaq-cell co2-ok">688</div>
              <div className="iaq-cell co2-warn">924</div>
              <div className="iaq-cell co2-warn">912</div>
              <div className="iaq-cell co2-ok">788</div>
              <div className="iaq-cell co2-ok">742</div>
              <div className="iaq-cell co2-ok">698</div>
            </div>
          </div>

          {/* Floors 1-3 Collective Cells Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--ink-3)' }}>Floors 1–3</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              <div className="iaq-cell co2-ok">648</div>
              <div className="iaq-cell co2-ok">612</div>
              <div className="iaq-cell co2-ok">620</div>
              <div className="iaq-cell co2-ok">598</div>
              <div className="iaq-cell co2-ok">604</div>
              <div className="iaq-cell co2-ok">618</div>
            </div>
          </div>

        </div>

        {/* Heatmap Custom Legend Footnote */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '10px', color: 'var(--ink-3)' }}>
          <span><span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(34,214,122,0.2)', border: '1px solid var(--ok)', verticalAlign: 'middle', marginRight: '4px' }}></span> less than 800 Good</span>
          <span><span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(245,180,65,0.25)', border: '1px solid var(--warn)', verticalAlign: 'middle', marginRight: '4px' }}></span> 800–1000 Elevated (DCV activates)</span>
          <span><span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(242,91,91,0.25)', border: '1px solid var(--bad)', verticalAlign: 'middle', marginRight: '4px' }}></span> greater than 1000 Critical (alarm + DCV max)</span>
        </div>
      </div>

    </div>
  );
}