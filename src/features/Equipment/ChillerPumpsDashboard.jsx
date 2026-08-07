import React, { useState } from 'react';

// --- Sample Data ---
const INITIAL_PUMPS = [
  // Primary Pumps
  {
    id: 'PP1',
    name: 'Primary Pump 1',
    type: 'primary',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Auto',
    tripStatus: 'Normal',
    flowRate: '142.5 m³/h',
    dischargePressure: '6.8 bar',
    current: '9.6 A',
    power: '8.6 kW',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'PP2',
    name: 'Primary Pump 2',
    type: 'primary',
    status: 'Stopped',
    runCommand: 'OFF',
    mode: 'Auto',
    tripStatus: 'Normal',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'PP3',
    name: 'Primary Pump 3',
    type: 'primary',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Auto',
    tripStatus: 'Normal',
    flowRate: '138.2 m³/h',
    dischargePressure: '6.5 bar',
    current: '9.2 A',
    power: '8.3 kW',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  // Secondary Pumps
  {
    id: 'SP1',
    name: 'Secondary Pump 1',
    type: 'secondary',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Auto',
    tripStatus: 'Normal',
    flowRate: '220.5 m³/h',
    dischargePressure: '8.2 bar',
    current: '12.4 A',
    power: '11.2 kW',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'SP2',
    name: 'Secondary Pump 2',
    type: 'secondary',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Auto',
    tripStatus: 'Normal',
    flowRate: '215 m³/h',
    dischargePressure: '8 bar',
    current: '12.1 A',
    power: '10.9 kW',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'SP3',
    name: 'Secondary Pump 3',
    type: 'secondary',
    status: 'Stopped',
    runCommand: 'OFF',
    mode: 'Auto',
    tripStatus: 'Normal',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'SP4',
    name: 'Secondary Pump 4',
    type: 'secondary',
    status: 'Stopped',
    runCommand: 'OFF',
    mode: 'Manual',
    tripStatus: 'Normal',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  // Condenser Pumps
  {
    id: 'CP1',
    name: 'Condenser Pump 1',
    type: 'condenser',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Auto',
    tripStatus: 'Normal',
    flowRate: '180 m³/h',
    dischargePressure: '5.5 bar',
    current: '8.8 A',
    power: '7.9 kW',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'CP2',
    name: 'Condenser Pump 2',
    type: 'condenser',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Auto',
    tripStatus: 'Normal',
    flowRate: '175.5 m³/h',
    dischargePressure: '5.4 bar',
    current: '8.6 A',
    power: '7.7 kW',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'CP3',
    name: 'Condenser Pump 3',
    type: 'condenser',
    status: 'Stopped',
    runCommand: 'OFF',
    mode: 'Auto',
    tripStatus: 'Normal',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
];

export default function ChillerPumpsDashboard() {
  const [pumps, setPumps] = useState(INITIAL_PUMPS);
  const [filter, setFilter] = useState('all');

  // Handle Command Toggle (ON/OFF)
  const handleCommandChange = (id, newCmd) => {
    setPumps((prev) =>
      prev.map((pump) =>
        pump.id === id
          ? {
              ...pump,
              runCommand: newCmd,
              status: newCmd === 'ON' ? 'Running' : 'Stopped',
            }
          : pump
      )
    );
  };

  // Handle Photo Upload
  const handlePhotoUpload = (id, file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPumps((prev) =>
      prev.map((p) => (p.id === id ? { ...p, photo: imageUrl } : p))
    );
  };

  // Helper stats for headers
  const getStats = (type) => {
    const sectionPumps = pumps.filter((p) => p.type === type);
    const running = sectionPumps.filter((p) => p.status === 'Running').length;
    return `${running}/${sectionPumps.length}`;
  };

  const sections = [
    { key: 'primary', title: 'Primary Pumps', icon: 'ti-droplet', colorVar: 'var(--info)' },
    { key: 'secondary', title: 'Secondary Pumps', icon: 'ti-droplet-half', colorVar: 'var(--cool)' },
    { key: 'condenser', title: 'Condenser Pumps', icon: 'ti-droplet-filled', colorVar: 'var(--violet)' },
  ];

  const filteredSections = sections.filter(
    (sec) => filter === 'all' || filter === sec.key
  );

  return (
    <div className="ch-tab-panel active" id="ch-panel-pumps">
      <div className="ch-pumps-body" id="ch-pumps-body">
        
        {/* --- Top Filter Bar --- */}
        <div className="ch-pump-filter">
          <div
            className={`ch-pump-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Pumps
          </div>

          <div
            className={`ch-pump-chip ${filter === 'primary' ? 'active' : ''}`}
            onClick={() => setFilter('primary')}
          >
            <i className="ti ti-droplet" style={{ fontSize: '11px' }}></i>
            Primary Pumps
            <span className="chip-badge">{getStats('primary')}</span>
          </div>

          <div
            className={`ch-pump-chip ${filter === 'secondary' ? 'active' : ''}`}
            onClick={() => setFilter('secondary')}
          >
            <i className="ti ti-droplet-half" style={{ fontSize: '11px' }}></i>
            Secondary Pumps
            <span className="chip-badge">{getStats('secondary')}</span>
          </div>

          <div
            className={`ch-pump-chip ${filter === 'condenser' ? 'active' : ''}`}
            onClick={() => setFilter('condenser')}
          >
            <i className="ti ti-droplet-filled" style={{ fontSize: '11px' }}></i>
            Condenser Pumps
            <span className="chip-badge">{getStats('condenser')}</span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '7px' }}>
            <button
              className="btn primary"
              style={{ padding: '5px 11px', fontSize: '11px' }}
              onClick={() => console.log('Switch to summary view')}
            >
              <i className="ti ti-table"></i> Summary View
            </button>
          </div>
        </div>

        {/* --- Pump Sections --- */}
        {filteredSections.map((sec) => {
          const sectionPumps = pumps.filter((p) => p.type === sec.key);
          return (
            <div key={sec.key} style={{ marginBottom: '18px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: sec.colorVar,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <i className={`ti ${sec.icon}`}></i> {sec.title}
              </div>

              <div className="ch-pump-grid">
                {sectionPumps.map((pump) => (
                  <PumpCard
                    key={pump.id}
                    pump={pump}
                    onCmdChange={handleCommandChange}
                    onPhotoUpload={handlePhotoUpload}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Individual Pump Card Component ---
function PumpCard({ pump, onCmdChange, onPhotoUpload }) {
  const isRunning = pump.status === 'Running';

  return (
    <div
      className="ch-pump-card"
      style={{ cursor: 'pointer' }}
      onClick={() => console.log('Open drawer for:', pump.id)}
    >
      {/* Photo Header Section */}
      <div
        className="ch-pump-photo"
        id={`chp-photo-${pump.id}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: pump.photo ? `url(${pump.photo})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            zIndex: 2,
          }}
          onChange={(e) => onPhotoUpload(pump.id, e.target.files[0])}
        />
        {!pump.photo && (
          <div className="ch-pump-photo-upload" style={{ pointerEvents: 'none' }}>
            <i
              className="ti ti-photo-up"
              style={{ fontSize: '28px', color: 'var(--ink-4)', opacity: 0.4 }}
            ></i>
            <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '4px' }}>
              Upload photo
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', top: '8px', left: '10px', zIndex: 3 }}>
          <span
            className={isRunning ? 'ch-run-on' : 'ch-run-off'}
            style={{ fontSize: '10px', padding: '2px 8px', backdropFilter: 'blur(6px)' }}
          >
            {pump.status}
          </span>
        </div>
      </div>

      {/* Body Section */}
      <div className="ch-pump-body">
        <div className="ch-pump-name">{pump.name}</div>

        {/* Dynamic Controls */}
        <div className="ch-pump-controls" onClick={(e) => e.stopPropagation()}>
          <div className="ch-pump-run-toggle">
            <span className="ch-pump-run-lbl">Run Command</span>
            <div className={`ahu-cmd-wrap ${isRunning ? 'cmd-on' : 'cmd-off'}`}>
              <select
                value={pump.runCommand}
                onChange={(e) => onCmdChange(pump.id, e.target.value)}
              >
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
              <span className="ahu-cmd-arrow">▾</span>
            </div>
          </div>
          <button
            className="ch-pump-schedule-btn"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Open schedule for:', pump.id);
            }}
          >
            <i className="ti ti-calendar"></i> Schedule
          </button>
        </div>

        {/* Key Parameters Display */}
        <div className="ch-pump-params">
          <div className="ch-pump-param">
            <span className="ch-pump-pk">dt</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ink-1)' }}>
              {pump.updatedAt}
            </span>
          </div>
          <div className="ch-pump-param">
            <span className="ch-pump-pk">Run Status</span>
            <span
              className="ch-pump-pv"
              style={{ color: isRunning ? 'var(--ok)' : 'var(--bad)' }}
            >
              {isRunning ? 'On' : 'Off'}
            </span>
          </div>
          <div className="ch-pump-param">
            <span className="ch-pump-pk">Auto/Man</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ink-1)' }}>
              {pump.mode}
            </span>
          </div>
          <div className="ch-pump-param">
            <span className="ch-pump-pk">Trip St</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ok)' }}>
              {pump.tripStatus}
            </span>
          </div>

          {/* Conditional parameters when running */}
          {pump.flowRate && (
            <div className="ch-pump-param">
              <span className="ch-pump-pk">Flow Rate</span>
              <span className="ch-pump-pv" style={{ color: 'var(--info)' }}>
                {pump.flowRate}
              </span>
            </div>
          )}
          {pump.dischargePressure && (
            <div className="ch-pump-param">
              <span className="ch-pump-pk">Discharge Pr</span>
              <span className="ch-pump-pv" style={{ color: 'var(--cool)' }}>
                {pump.dischargePressure}
              </span>
            </div>
          )}
          {pump.current && (
            <div className="ch-pump-param">
              <span className="ch-pump-pk">Current</span>
              <span className="ch-pump-pv" style={{ color: 'var(--warn)' }}>
                {pump.current}
              </span>
            </div>
          )}
          {pump.power && (
            <div className="ch-pump-param">
              <span className="ch-pump-pk">Power</span>
              <span className="ch-pump-pv" style={{ color: 'var(--violet)' }}>
                {pump.power}
              </span>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div
          style={{
            padding: '8px 14px',
            borderTop: '1px solid var(--line-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(78,161,255,0.04)',
          }}
        >
          <span
            style={{
              fontSize: '10.5px',
              color: 'var(--info)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <i className="ti ti-chart-bar" style={{ fontSize: '12px' }}></i> Trends
            · Health · Alarms
          </span>
          <span
            style={{
              fontSize: '10px',
              color: 'var(--info)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}