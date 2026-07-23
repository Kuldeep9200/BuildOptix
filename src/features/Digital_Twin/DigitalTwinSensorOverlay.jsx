import React, { useState, useEffect } from 'react';

const DigitalTwinSensorOverlay = ({ onZoneClick, onSensorClick }) => {
  // --- States ---
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    zoneData: null
  });

  // --- Dynamic Zones Data Schema ---
  const [zones, setZones] = useState([
    { id: 'G-Z1', label: 'Z1', temp: 21.5, occ: 16, co2: 973, alarm: 0, fill: 'rgb(11,110,138)', x: 17.0, y: 17.0 },
    { id: 'G-Z2', label: 'Z2', temp: 23.5, occ: 78, co2: 552, alarm: 0, fill: 'rgb(20,122,117)', x: 89.0, y: 17.0 },
    { id: 'G-Z3', label: 'Z3', temp: 24.6, occ: 61, co2: 759, alarm: 0, fill: 'rgb(130,125,72)', x: 161.0, y: 17.0 },
    { id: 'G-Z4', label: 'Z4', temp: 23.3, occ: 6, co2: 611, alarm: 0, fill: 'rgb(19,121,119)', x: 233.0, y: 17.0 },
    { id: 'G-Z5', label: 'Z5', temp: 23.7, occ: 9, co2: 937, alarm: 0, fill: 'rgb(21,124,115)', x: 305.0, y: 17.0 },
    { id: 'G-Z6', label: 'Z6', temp: 21.8, occ: 2, co2: 526, alarm: 0, fill: 'rgb(12,112,135)', x: 377.0, y: 17.0 },
    { id: 'G-Z7', label: 'Z7', temp: 25.9, occ: 22, co2: 773, alarm: 0, fill: 'rgb(180,132,44)', x: 377.0, y: 82.5 },
    { id: 'G-Z8', label: 'Z8', temp: 23.7, occ: 44, co2: 1194, alarm: 0, fill: 'rgb(21,124,115)', x: 377.0, y: 148.0 },
    { id: 'G-Z9', label: 'Z9', temp: 25.7, occ: 48, co2: 1154, alarm: 0, fill: 'rgb(172,131,48)', x: 377.0, y: 213.5 },
    { id: 'G-Z10', label: 'Z10', temp: 23.5, occ: 5, co2: 688, alarm: 0, fill: 'rgb(20,122,117)', x: 305.0, y: 213.5 },
    { id: 'G-Z11', label: 'Z11', temp: 22.3, occ: 82, co2: 815, alarm: 0, fill: 'rgb(15,115,130)', x: 233.0, y: 213.5 },
    { id: 'G-Z12', label: 'Z12', temp: 25.9, occ: 32, co2: 570, alarm: 0, fill: 'rgb(180,132,44)', x: 161.0, y: 213.5 },
    { id: 'G-Z13', label: 'Z13', temp: 22.4, occ: 6, co2: 1077, alarm: 0, fill: 'rgb(15,116,129)', x: 89.0, y: 213.5 },
    { id: 'G-Z14', label: 'Z14', temp: 25.5, occ: 56, co2: 781, alarm: 0, fill: 'rgb(165,130,53)', x: 17.0, y: 213.5 },
    { id: 'G-Z15', label: 'Z15', temp: 24.3, occ: 20, co2: 672, alarm: 0, fill: 'rgb(119,124,78)', x: 17.0, y: 148.0 },
    { id: 'G-Z16', label: 'Z16', temp: 25.3, occ: 78, co2: 638, alarm: 0, fill: 'rgb(157,129,57)', x: 17.0, y: 82.5 }
  ]);

  // --- Live Sensor List Schema ---
  const [sensorReadings, setSensorReadings] = useState([
    { id: 1, name: 'Temp · Lobby', zone: 'G-Z1', value: '35.4', unit: '°C', icon: 'ti-temperature', color: 'var(--warn)' },
    { id: 2, name: 'CO₂ · Open Office 7', zone: '07-Z3', value: '757', unit: 'ppm', icon: 'ti-air-conditioning', color: 'var(--info)' },
    { id: 3, name: 'Humidity · Server Rm', zone: 'B1-Z2', value: '45', unit: '%', icon: 'ti-droplet', color: 'var(--info)' },
    { id: 4, name: 'Power · Main LT', zone: 'B2-Z1', value: '673', unit: 'kW', icon: 'ti-bolt', color: 'var(--info)' },
    { id: 5, name: 'Temp · Floor 12', zone: '12-Z4', value: '23.3', unit: '°C', icon: 'ti-temperature', color: 'var(--info)' },
    { id: 6, name: 'Occupancy · Atrium', zone: 'G-Z4', value: '9', unit: 'ppl', icon: 'ti-users', color: 'var(--info)' },
    { id: 7, name: 'PM2.5 · Intake', zone: 'TER-Z1', value: '31', unit: 'µg', icon: 'ti-wind', color: 'var(--info)' },
    { id: 8, name: 'Water · Tank Level', zone: 'TER-Z2', value: '78', unit: '%', icon: 'ti-droplet-half', color: 'var(--info)' }
  ]);

  // --- 5-Second Polling Simulation Effect ---
  useEffect(() => {
    const secondTimer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    const pollingTimer = setInterval(() => {
      setSecondsAgo(0);
      
      // Simulate slight dynamic variation on sensor readings
      setSensorReadings((prevList) =>
        prevList.map((sensor) => {
          if (sensor.unit === '°C' && sensor.value !== '35.4') {
            const newVal = (parseFloat(sensor.value) + (Math.random() * 0.4 - 0.2)).toFixed(1);
            return { ...sensor, value: newVal };
          }
          return sensor;
        })
      );
    }, 5000);

    return () => {
      clearInterval(secondTimer);
      clearInterval(pollingTimer);
    };
  }, []);

  // --- Tooltip Event Handlers ---
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

  // Format "Last Update" text dynamically
  const formatLastUpdated = () => {
    if (secondsAgo < 2) return 'just now';
    return `${secondsAgo}s ago`;
  };

  return (
    <div className="page active" id="pg-dtsensors">
      <div className="tab-panel active" data-page="dtsensors" data-tab="0">
        {/* KPI Header Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="kpi glow-ok">
            <div className="kpi-l">Sensors Online</div>
            <div className="kpi-v ok">
              312<span className="kpi-u">/318</span>
            </div>
          </div>
          <div className="kpi glow-info">
            <div className="kpi-l">Polling Rate</div>
            <div className="kpi-v">
              5<span className="kpi-u">s</span>
            </div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Threshold Alerts</div>
            <div className="kpi-v warn" id="dt-sn-alerts">
              1
            </div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Last Update</div>
            <div className="kpi-v ok" id="dt-sn-updated" style={{ fontSize: '15px' }}>
              {formatLastUpdated()}
            </div>
          </div>
        </div>

        {/* Digital Twin Split Area */}
        <div className="dt-split">
          {/* Spatial Sensor Map Overlay */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Sensor Overlay</div>
                <div className="cs">Live readings mapped to zones</div>
              </div>
              <span className="dt-live-dot">
                <span></span>LIVE
              </span>
            </div>
            <div className="cb">
              <div className="dt-plan-host" id="dt-sensor-grid" style={{ position: 'relative' }}>
                <svg className="dt-plan-svg" viewBox="0 0 460 290" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Boundary */}
                  <rect x="14" y="14" width="432" height="262" rx="7" fill="none" stroke="var(--line-3)" strokeWidth="1.3" />
                  <text className="dt-plan-platelbl" x="440" y="269" textAnchor="end" fontSize="9">
                    GROUND · 16 ZONES
                  </text>

                  {/* Building Core */}
                  <rect className="dt-plan-core" x="89" y="82.5" width="282" height="125" rx="5" />
                  <line x1="230.0" y1="89.5" x2="230.0" y2="200.5" stroke="var(--line-2)" strokeWidth="1" />
                  <text className="dt-plan-corelbl" x="159.5" y="142.0" textAnchor="middle" fontSize="8.5">
                    LIFTS
                  </text>
                  <text className="dt-plan-corelbl" x="159.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">
                    CORE ×4
                  </text>
                  <text className="dt-plan-corelbl" x="300.5" y="142.0" textAnchor="middle" fontSize="8.5">
                    STAIRS
                  </text>
                  <text className="dt-plan-corelbl" x="300.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">
                    WC · SHAFT
                  </text>

                  {/* Zone Map Loop */}
                  {zones.map((z) => (
                    <g
                      key={z.id}
                      className="dt-plan-zone"
                      data-id={z.id}
                      data-temp={z.temp}
                      data-occ={z.occ}
                      data-co2={z.co2}
                      data-alarm={z.alarm}
                      onClick={(e) => onZoneClick && onZoneClick(e, z.id)}
                      onMouseMove={(e) => handleMouseMove(e, z)}
                      onMouseLeave={handleMouseLeave}
                      style={{ cursor: 'pointer' }}
                    >
                      <title>{z.id}</title>
                      <rect className="zr" x={z.x} y={z.y} width="66.0" height="59.5" rx="4" style={{ fill: z.fill }} />
                      <text className="dt-plan-zlabel" x={z.x + 5} y={z.y + 13} fontSize="8.5">
                        {z.label}
                      </text>
                      <text className="dt-plan-zval" x={z.x + 5} y={z.y + 52.5} fontSize="11">
                        {z.temp}
                        <tspan className="u"> °C</tspan>
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Interactive Floorplan Tooltip */}
                {tooltip.visible && tooltip.zoneData && (
                  <div
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
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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

          {/* Live Sensor Readings List */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Live Readings</div>
                <div className="cs">Updating every 5s</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="dt-sensor-list">
                {sensorReadings.map((sensor) => (
                  <div
                    key={sensor.id}
                    className="dt-lrow"
                    onClick={() => onSensorClick && onSensorClick(sensor)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="dt-lrow-ico" style={{ background: 'var(--surface-3)', color: sensor.color }}>
                      <i className={`ti ${sensor.icon}`}></i>
                    </span>
                    <span className="dt-lrow-tx">
                      <b>{sensor.name}</b>
                      <span>{sensor.zone}</span>
                    </span>
                    <span className="dt-lrow-val" style={{ color: sensor.color === 'var(--warn)' ? 'var(--warn)' : 'var(--ink-1)' }}>
                      {sensor.value} <span style={{ fontSize: '9px', color: 'var(--ink-3)' }}>{sensor.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinSensorOverlay;