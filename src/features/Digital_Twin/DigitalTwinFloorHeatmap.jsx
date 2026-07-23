import React, { useState, useEffect } from 'react';

const DigitalTwinFloorHeatmap = ({
  onZoneClick = () => {},
  onFloorChange = () => {},
  onMetricChange = () => {}
}) => {
  // --- States ---
  const [activeFloor, setActiveFloor] = useState('G');
  const [activeMetric, setActiveMetric] = useState('temp');
  const [scrubValue, setScrubValue] = useState(-1); // -1 means Live
  const [isPlaying, setIsPlaying] = useState(false);

  // Tooltip state for SVG floorplan
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    zoneData: null
  });

  // --- Static Floor List Data ---
  const floors = [
    { id: 'B2', label: 'Basement 2' },
    { id: 'B1', label: 'Basement 1' },
    { id: 'G', label: 'Ground' },
    { id: '01', label: 'F1' },
    { id: '02', label: 'F2' },
    { id: '03', label: 'F3' },
    { id: '04', label: 'F4' },
    { id: '05', label: 'F5' },
    { id: '06', label: 'F6' },
    { id: '07', label: 'F7' },
    { id: '08', label: 'F8' },
    { id: '09', label: 'F9' },
    { id: '10', label: 'F10' },
    { id: '11', label: 'F11' },
    { id: '12', label: 'F12' },
    { id: '13', label: 'F13' },
    { id: '14', label: 'F14' },
    { id: 'TER', label: 'Terrace' }
  ];

  // --- Zone Data Schema ---
  const zonesData = [
    { id: 'G-Z1', label: 'Z1', x: 17.0, y: 17.0, temp: '21.6', occ: 16, co2: 973, alarm: 0, fillColor: 'rgb(11,111,137)' },
    { id: 'G-Z2', label: 'Z2', x: 89.0, y: 17.0, temp: '23.5', occ: 78, co2: 552, alarm: 0, fillColor: 'rgb(20,122,117)' },
    { id: 'G-Z3', label: 'Z3', x: 161.0, y: 17.0, temp: '24.6', occ: 61, co2: 759, alarm: 0, fillColor: 'rgb(130,125,72)' },
    { id: 'G-Z4', label: 'Z4', x: 233.0, y: 17.0, temp: '23.3', occ: 6, co2: 611, alarm: 0, fillColor: 'rgb(19,121,119)' },
    { id: 'G-Z5', label: 'Z5', x: 305.0, y: 17.0, temp: '23.6', occ: 9, co2: 937, alarm: 0, fillColor: 'rgb(20,123,116)' },
    { id: 'G-Z6', label: 'Z6', x: 377.0, y: 17.0, temp: '21.9', occ: 2, co2: 526, alarm: 0, fillColor: 'rgb(13,112,134)' },
    { id: 'G-Z7', label: 'Z7', x: 377.0, y: 82.5, temp: '26', occ: 22, co2: 773, alarm: 0, fillColor: 'rgb(184,132,42)' },
    { id: 'G-Z8', label: 'Z8', x: 377.0, y: 148.0, temp: '23.6', occ: 44, co2: 1194, alarm: 0, fillColor: 'rgb(20,123,116)' },
    { id: 'G-Z9', label: 'Z9', x: 377.0, y: 213.5, temp: '25.6', occ: 48, co2: 1154, alarm: 0, fillColor: 'rgb(169,130,51)' },
    { id: 'G-Z10', label: 'Z10', x: 305.0, y: 213.5, temp: '23.5', occ: 5, co2: 688, alarm: 0, fillColor: 'rgb(20,122,117)' },
    { id: 'G-Z11', label: 'Z11', x: 233.0, y: 213.5, temp: '22.3', occ: 82, co2: 815, alarm: 0, fillColor: 'rgb(15,115,130)' },
    { id: 'G-Z12', label: 'Z12', x: 161.0, y: 213.5, temp: '25.9', occ: 32, co2: 570, alarm: 0, fillColor: 'rgb(180,132,44)' },
    { id: 'G-Z13', label: 'Z13', x: 89.0, y: 213.5, temp: '22.5', occ: 6, co2: 1077, alarm: 0, fillColor: 'rgb(15,116,128)' },
    { id: 'G-Z14', label: 'Z14', x: 17.0, y: 213.5, temp: '25.4', occ: 56, co2: 781, alarm: 0, fillColor: 'rgb(161,129,55)' },
    { id: 'G-Z15', label: 'Z15', x: 17.0, y: 148.0, temp: '24.4', occ: 20, co2: 672, alarm: 0, fillColor: 'rgb(122,124,76)' },
    { id: 'G-Z16', label: 'Z16', x: 17.0, y: 82.5, temp: '25.4', occ: 78, co2: 638, alarm: 0, fillColor: 'rgb(161,129,55)' }
  ];

  // --- Handlers ---
  const handleFloorSelect = (fid) => {
    setActiveFloor(fid);
    onFloorChange(fid);
  };

  const handleMetricSelect = (m) => {
    setActiveMetric(m);
    onMetricChange(m);
  };

  const handleScrubChange = (val) => {
    setScrubValue(parseInt(val, 10));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Playback timer effect
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setScrubValue((prev) => (prev >= 23 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Tooltip Mouse Handlers
  const handleMouseMove = (e, zone) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10,
      zoneData: zone
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // Display value for zone based on current selected metric
  const getZoneDisplayValue = (zone) => {
    switch (activeMetric) {
      case 'occ':
        return `${zone.occ}%`;
      case 'co2':
        return `${zone.co2} ppm`;
      case 'alarm':
        return `${zone.alarm}`;
      case 'temp':
      default:
        return `${zone.temp} °C`;
    }
  };

  return (
    <div className="page active" id="pg-dtfloors">
      <div className="tab-panel active" data-page="dtfloors" data-tab="0">
        {/* KPI Header Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi glow-info">
            <div className="kpi-l">Active Floor</div>
            <div className="kpi-v" id="dt-fm-active">
              {floors.find((f) => f.id === activeFloor)?.label || 'Ground'}
            </div>
          </div>
          <div className="kpi glow-info">
            <div className="kpi-l">Zones on Floor</div>
            <div className="kpi-v" id="dt-fm-zones">16</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Avg Temp</div>
            <div className="kpi-v ok" id="dt-fm-temp">
              23.9<span className="kpi-u">°C</span>
            </div>
          </div>
          <div className="kpi glow-info">
            <div className="kpi-l">Occupancy</div>
            <div className="kpi-v" id="dt-fm-occ">
              35<span className="kpi-u">%</span>
            </div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Open Alarms</div>
            <div className="kpi-v warn" id="dt-fm-alarms">0</div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="dt-controls">
          {/* Floor Selection Chips */}
          <div className="dt-floor-picker" id="dt-fm-floors">
            {floors.map((f) => (
              <div
                key={f.id}
                className={`dt-fchip ${activeFloor === f.id ? 'active' : ''}`}
                onClick={() => handleFloorSelect(f.id)}
              >
                {f.label}
              </div>
            ))}
          </div>

          {/* Metric Selection Chips */}
          <div className="dt-metric-chips" id="dt-fm-metrics">
            {[
              { id: 'temp', label: 'Temperature' },
              { id: 'occ', label: 'Occupancy' },
              { id: 'co2', label: 'CO₂' },
              { id: 'alarm', label: 'Alarms' }
            ].map((m) => (
              <div
                key={m.id}
                className={`dt-fchip ${activeMetric === m.id ? 'active' : ''}`}
                onClick={() => handleMetricSelect(m.id)}
              >
                {m.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Heatmap Card */}
        <div className="card">
          <div className="ch">
            <div>
              <div className="ct" id="dt-fm-title">
                {floors.find((f) => f.id === activeFloor)?.label || 'Ground'} Floor — {activeMetric.toUpperCase()}
              </div>
              <div className="cs">Zone heatmap · live</div>
            </div>
            <div className="dt-legend" id="dt-fm-legend">
              <span>Low</span>
              <span className="dt-legend-grad" style={{ background: 'linear-gradient(90deg,#0b6e8a,#1f8a5b,#b8842a)' }}></span>
              <span>High</span>
            </div>
          </div>

          <div className="cb">
            {/* Timeline Scrub Controls */}
            <div className="dt-scrub">
              <button
                className={`dt-iso-btn ${isPlaying ? 'active' : ''}`}
                id="dt-scrub-play"
                title="Play 24h"
                onClick={togglePlay}
              >
                <i className={`ti ${isPlaying ? 'ti-player-pause' : 'ti-player-play'}`}></i>
              </button>
              <input
                type="range"
                min="-1"
                max="23"
                value={scrubValue}
                step="1"
                id="dt-scrub-range"
                className="dt-scrub-range"
                onChange={(e) => handleScrubChange(e.target.value)}
                aria-label="Hour of day"
              />
              <span className={`dt-scrub-time ${scrubValue === -1 ? 'live' : ''}`} id="dt-scrub-time">
                {scrubValue === -1 ? 'Live' : `${scrubValue.toString().padStart(2, '0')}:00`}
              </span>
              <button
                className="dt-iso-btn"
                id="dt-scrub-live"
                title="Back to live"
                onClick={() => handleScrubChange(-1)}
              >
                <i className="ti ti-bolt"></i>
              </button>
            </div>

            {/* Floorplan Heatmap Container */}
            <div className="dt-plan-host" id="dt-floor-heatmap" style={{ position: 'relative' }}>
              <svg className="dt-plan-svg" viewBox="0 0 460 290" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="14" width="432" height="262" rx="7" fill="none" stroke="var(--line-3)" strokeWidth="1.3" />
                <text className="dt-plan-platelbl" x="440" y="269" textAnchor="end" fontSize="9">
                  {activeFloor.toUpperCase()} · 16 ZONES
                </text>

                {/* Building Core */}
                <rect className="dt-plan-core" x="89" y="82.5" width="282" height="125" rx="5" />
                <line x1="230.0" y1="89.5" x2="230.0" y2="200.5" stroke="var(--line-2)" strokeWidth="1" />
                <text className="dt-plan-corelbl" x="159.5" y="142.0" textAnchor="middle" fontSize="8.5">LIFTS</text>
                <text className="dt-plan-corelbl" x="159.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">CORE ×4</text>
                <text className="dt-plan-corelbl" x="300.5" y="142.0" textAnchor="middle" fontSize="8.5">STAIRS</text>
                <text className="dt-plan-corelbl" x="300.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">WC · SHAFT</text>

                {/* Zone Map Loop */}
                {zonesData.map((z) => (
                  <g
                    key={z.id}
                    className="dt-plan-zone"
                    data-id={z.id}
                    data-temp={z.temp}
                    data-occ={z.occ}
                    data-co2={z.co2}
                    data-alarm={z.alarm}
                    onClick={(e) => onZoneClick(e, z.id)}
                    onMouseMove={(e) => handleMouseMove(e, z)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <title>{z.id}</title>
                    <rect
                      className="zr"
                      x={z.x}
                      y={z.y}
                      width="66.0"
                      height="59.5"
                      rx="4"
                      style={{ fill: z.fillColor }}
                    />
                    <text className="dt-plan-zlabel" x={z.x + 5} y={z.y + 13} fontSize="8.5">
                      {z.label}
                    </text>
                    <text className="dt-plan-zval" x={z.x + 5} y={z.y + 52.5} fontSize="11">
                      {getZoneDisplayValue(z)}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Hover Tooltip */}
              {tooltip.visible && tooltip.zoneData && (
                <div
                  className="dt-plan-tip"
                  style={{
                    position: 'absolute',
                    left: `${tooltip.x}px`,
                    top: `${tooltip.y}px`,
                    pointerEvents: 'none',
                    background: 'var(--surface-1, #1e293b)',
                    border: '1px solid var(--line-2, #334155)',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '11px',
                    zIndex: 10
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>{tooltip.zoneData.id}</div>
                  <div>Temp: {tooltip.zoneData.temp} °C</div>
                  <div>Occupancy: {tooltip.zoneData.occ}%</div>
                  <div>CO₂: {tooltip.zoneData.co2} ppm</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinFloorHeatmap;