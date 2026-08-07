import React, { useState } from 'react';

// Initial Cooling Tower Units Data
const INITIAL_UNITS = [
  {
    id: 'CT1',
    name: 'Cooling Tower 1',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Manual',
    tripStatus: 'Normal',
    inletTemp: 32.5,
    outletTemp: 28.2,
    fanStatus: 'On',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'CT2',
    name: 'Cooling Tower 2',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Manual',
    tripStatus: 'Normal',
    inletTemp: 33.1,
    outletTemp: 29.0,
    fanStatus: 'On',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'CT3',
    name: 'Cooling Tower 3',
    status: 'Running',
    runCommand: 'ON',
    mode: 'Manual',
    tripStatus: 'Normal',
    inletTemp: 32.8,
    outletTemp: 28.7,
    fanStatus: 'On',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
  {
    id: 'CT4',
    name: 'Cooling Tower 4',
    status: 'Stopped',
    runCommand: 'OFF',
    mode: 'Manual',
    tripStatus: 'Normal',
    inletTemp: null,
    outletTemp: null,
    fanStatus: 'Off',
    updatedAt: '24 May 2026, 01:45',
    photo: null,
  },
];

export default function CoolingTowerDashboard({ openEqDrawer, openAddSchedule }) {
  const [units, setUnits] = useState(INITIAL_UNITS);

  // Toggle Run Command (ON/OFF)
  const handleCommandChange = (id, newCmd) => {
    setUnits((prev) =>
      prev.map((unit) => {
        if (unit.id === id) {
          const isRunning = newCmd === 'ON';
          return {
            ...unit,
            runCommand: newCmd,
            status: isRunning ? 'Running' : 'Stopped',
            fanStatus: isRunning ? 'On' : 'Off',
            // Default placeholder temps when turning back ON
            inletTemp: isRunning ? unit.inletTemp || 32.5 : null,
            outletTemp: isRunning ? unit.outletTemp || 28.5 : null,
          };
        }
        return unit;
      })
    );
  };

  // Handle Photo Upload
  const handlePhotoUpload = (id, file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setUnits((prev) =>
      prev.map((unit) => (unit.id === id ? { ...unit, photo: imageUrl } : unit))
    );
  };

  // Dynamic KPI Computations
  const totalUnits = units.length;
  const runningUnits = units.filter((u) => u.status === 'Running').length;
  const standbyUnits = totalUnits - runningUnits;

  const runningOutletTemps = units
    .filter((u) => u.status === 'Running' && u.outletTemp !== null)
    .map((u) => u.outletTemp);

  const avgOutletTemp = runningOutletTemps.length
    ? (
        runningOutletTemps.reduce((acc, curr) => acc + curr, 0) /
        runningOutletTemps.length
      ).toFixed(1)
    : 'N/A';

  return (
    <div className="ch-tab-panel active" id="ch-panel-ct">
      <div className="ch-pumps-body" id="ch-ct-body">
        
        {/* --- Top KPI Summary Row --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          <div className="ch-sum-kpi info">
            <div className="ch-sum-kpi-l">Total Units</div>
            <div className="ch-sum-kpi-v">{totalUnits}</div>
            <div className="ch-sum-kpi-sub">installed</div>
          </div>
          <div className="ch-sum-kpi ok">
            <div className="ch-sum-kpi-l">Running</div>
            <div className="ch-sum-kpi-v">{runningUnits}</div>
            <div className="ch-sum-kpi-sub">active now</div>
          </div>
          <div className="ch-sum-kpi warn">
            <div className="ch-sum-kpi-l">Standby</div>
            <div className="ch-sum-kpi-v">{standbyUnits}</div>
            <div className="ch-sum-kpi-sub">available</div>
          </div>
          <div className="ch-sum-kpi cool">
            <div className="ch-sum-kpi-l">Avg Outlet Temp</div>
            <div className="ch-sum-kpi-v">{avgOutletTemp}°C</div>
            <div className="ch-sum-kpi-sub">condenser return</div>
          </div>
        </div>

        {/* --- Cooling Tower Cards Grid --- */}
        <div className="ch-pump-grid">
          {units.map((unit) => (
            <CoolingTowerCard
              key={unit.id}
              unit={unit}
              onCmdChange={handleCommandChange}
              onPhotoUpload={handlePhotoUpload}
              openEqDrawer={openEqDrawer}
              openAddSchedule={openAddSchedule}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// --- Individual Cooling Tower Unit Card ---
function CoolingTowerCard({
  unit,
  onCmdChange,
  onPhotoUpload,
  openEqDrawer,
  openAddSchedule,
}) {
  const isRunning = unit.status === 'Running';

  return (
    <div
      className="ch-pump-card"
      onClick={() => openEqDrawer && openEqDrawer('ct', unit.id, 'ct')}
      style={{ cursor: 'pointer' }}
    >
      {/* Photo Header */}
      <div
        className="ch-pump-photo"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: unit.photo ? `url(${unit.photo})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
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
          onChange={(e) => onPhotoUpload(unit.id, e.target.files[0])}
        />
        
        {!unit.photo && (
          <div className="ch-pump-photo-upload" style={{ pointerEvents: 'none' }}>
            <i
              className="ti ti-building-factory-2"
              style={{ fontSize: '32px', color: 'var(--ink-4)', opacity: 0.35 }}
            ></i>
            <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '6px' }}>
              Upload photo
            </div>
          </div>
        )}

        <div style={{ position: 'absolute', top: '8px', left: '10px', zIndex: 3 }}>
          <span
            className={isRunning ? 'ch-run-on' : 'ch-run-off'}
            style={{ fontSize: '10px', padding: '2px 8px', backdropFilter: 'blur(6px)' }}
          >
            {unit.status}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="ch-pump-body">
        <div className="ch-pump-name">{unit.name}</div>

        {/* Controls Row */}
        <div className="ch-pump-controls" onClick={(e) => e.stopPropagation()}>
          <div className="ch-pump-run-toggle">
            <span className="ch-pump-run-lbl">Run Command</span>
            <div
              className={`ahu-cmd-wrap ${isRunning ? 'cmd-on' : 'cmd-off'}`}
              id={`chct-cmd-${unit.id}`}
            >
              <select
                value={unit.runCommand}
                onChange={(e) => onCmdChange(unit.id, e.target.value)}
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
              openAddSchedule && openAddSchedule(unit.id);
            }}
          >
            <i className="ti ti-calendar"></i> Schedule
          </button>
        </div>

        {/* Parameters Grid */}
        <div className="ch-pump-params">
          <div className="ch-pump-param">
            <span className="ch-pump-pk">dt</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ink-1)' }}>
              {unit.updatedAt}
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
            <span className="ch-pump-pk">Run Cmd</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ink-1)' }}>
              {unit.runCommand}
            </span>
          </div>
          <div className="ch-pump-param">
            <span className="ch-pump-pk">A/M Status</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ink-1)' }}>
              {unit.mode}
            </span>
          </div>
          <div className="ch-pump-param">
            <span className="ch-pump-pk">Trip St</span>
            <span className="ch-pump-pv" style={{ color: 'var(--ok)' }}>
              {unit.tripStatus}
            </span>
          </div>

          {/* Conditional parameters when running */}
          {isRunning && (
            <>
              <div className="ch-pump-param">
                <span className="ch-pump-pk">Inlet Temp</span>
                <span className="ch-pump-pv" style={{ color: 'var(--hot)' }}>
                  {unit.inletTemp}°C
                </span>
              </div>
              <div className="ch-pump-param">
                <span className="ch-pump-pk">Outlet Temp</span>
                <span className="ch-pump-pv" style={{ color: 'var(--cool)' }}>
                  {unit.outletTemp}°C
                </span>
              </div>
            </>
          )}

          <div className="ch-pump-param">
            <span className="ch-pump-pk">Fan Status</span>
            <span
              className="ch-pump-pv"
              style={{ color: isRunning ? 'var(--ok)' : 'var(--ink-3)' }}
            >
              {unit.fanStatus}
            </span>
          </div>
        </div>

        {/* Card Footer Link */}
        <div
          style={{
            padding: '8px 14px',
            borderTop: '1px solid var(--line-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(245, 180, 65, 0.04)',
          }}
        >
          <span
            style={{
              fontSize: '10.5px',
              color: 'var(--warn)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <i className="ti ti-chart-bar" style={{ fontSize: '12px' }}></i>
            Trends · Health · Alarms
          </span>
          <span
            style={{
              fontSize: '10px',
              color: 'var(--warn)',
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