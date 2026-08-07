import React, { useState } from 'react';

// Theme variable fallbacks (if global CSS vars are not defined)
const theme = {
  bg1: 'var(--bg-1, #1e1e2d)',
  surface1: 'var(--surface-1, #212130)',
  surface2: 'var(--surface-2, #2b2b40)',
  line1: 'var(--line-1, rgba(255, 255, 255, 0.08))',
  line2: 'var(--line-2, rgba(255, 255, 255, 0.12))',
  ink1: 'var(--ink-1, #e1e1e6)',
  ink2: 'var(--ink-2, #a2a5b5)',
  ink3: 'var(--ink-3, #7a7e9d)',
  ink4: 'var(--ink-4, #565973)',
  info: 'var(--info, #4ea1ff)',
  warn: 'var(--warn, #ff8a4c)',
  gold: 'var(--gold, #f5b441)',
  fontMono: 'var(--font-mono, monospace)',
};

export default function ChillerControls({ onToast, onAiQuery }) {
  // --- CONTROL STATES ---
  const [runCommand, setRunCommand] = useState('Auto');
  const [chwSupplySetpoint, setChwSupplySetpoint] = useState(7);
  const [capacityLimit, setCapacityLimit] = useState(100);
  const [controlMode, setControlMode] = useState('Auto');
  const [condenserWaterFlow, setCondenserWaterFlow] = useState('Auto');
  const [hotGasBypass, setHotGasBypass] = useState(false);
  const [demandLimitEnable, setDemandLimitEnable] = useState(true);
  const [remoteBmsOverride, setRemoteBmsOverride] = useState(true);

  // Helper Toast Trigger
  const triggerToast = (message, type = 'ok') => {
    if (onToast) {
      onToast(message, type);
    } else {
      console.log(`[Toast ${type.toUpperCase()}]: ${message}`);
    }
  };

  return (
    <div id="eq-tabpanel-chiller-controls" style={{ flex: '1 1 0%', overflowY: 'auto', display: 'block' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', padding: '16px' }}>
        
        {/* LEFT COLUMN: CHILLER CONTROLS */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            fontFamily: theme.fontMono,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: theme.info,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <i className="ti ti-settings-2"></i>Chiller Controls
          </div>

          <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden' }}>
            
            {/* 1. Run Command */}
            <ButtonGroupRow
              label="Run Command"
              options={['Start', 'Stop', 'Auto']}
              activeValue={runCommand}
              onChange={(val) => {
                setRunCommand(val);
                triggerToast(`Command: Run Command → ${val}`, 'ok');
              }}
            />

            {/* 2. CHW Supply Setpoint Slider */}
            <RangeControlRow
              label="CHW Supply Setpoint"
              min={5}
              max={12}
              step={0.5}
              value={chwSupplySetpoint}
              unit="°C"
              onChange={setChwSupplySetpoint}
              onSet={() => triggerToast('Setpoint sent: CHW Supply Setpoint', 'ok')}
            />

            {/* 3. Capacity Limit Slider */}
            <RangeControlRow
              label="Capacity Limit"
              min={25}
              max={100}
              step={5}
              value={capacityLimit}
              unit="%"
              onChange={setCapacityLimit}
              onSet={() => triggerToast('Setpoint sent: Capacity Limit', 'ok')}
            />

            {/* 4. Control Mode */}
            <ButtonGroupRow
              label="Control Mode"
              options={['Auto', 'Manual', 'Standby']}
              activeValue={controlMode}
              onChange={(val) => {
                setControlMode(val);
                triggerToast(`Mode: Control Mode → ${val}`, 'ok');
              }}
            />

            {/* 5. Condenser Water Flow */}
            <ButtonGroupRow
              label="Condenser Water Flow"
              options={['Auto', 'Manual']}
              activeValue={condenserWaterFlow}
              onChange={(val) => {
                setCondenserWaterFlow(val);
                triggerToast(`Mode: Condenser Water Flow → ${val}`, 'ok');
              }}
            />

            {/* 6. Hot Gas Bypass Toggle */}
            <ToggleControlRow
              label="Hot Gas Bypass"
              enabled={hotGasBypass}
              onToggle={() => {
                const nextState = !hotGasBypass;
                setHotGasBypass(nextState);
                triggerToast(`Hot Gas Bypass: ${nextState ? 'Enabled' : 'Disabled'}`, 'info');
              }}
            />

            {/* 7. Demand Limit Enable Toggle */}
            <ToggleControlRow
              label="Demand Limit Enable"
              enabled={demandLimitEnable}
              onToggle={() => {
                const nextState = !demandLimitEnable;
                setDemandLimitEnable(nextState);
                triggerToast(`Demand Limit Enable: ${nextState ? 'Enabled' : 'Disabled'}`, 'info');
              }}
            />

            {/* 8. Remote BMS Override Toggle */}
            <ToggleControlRow
              label="Remote BMS Override"
              enabled={remoteBmsOverride}
              onToggle={() => {
                const nextState = !remoteBmsOverride;
                setRemoteBmsOverride(nextState);
                triggerToast(`Remote BMS Override: ${nextState ? 'Enabled' : 'Disabled'}`, 'info');
              }}
            />
          </div>

          {/* Supervisor Warning Notice */}
          <div style={{
            marginTop: '10px',
            padding: '10px 14px',
            background: 'rgba(245, 180, 65, 0.08)',
            border: '1px solid rgba(245, 180, 65, 0.2)',
            borderRadius: '8px',
            fontSize: '10.5px',
            color: theme.warn,
            display: 'flex',
            alignItems: 'center',
            gap: '7px'
          }}>
            <i className="ti ti-alert-triangle"></i>
            Changes require FM Supervisor approval · All commands are logged
          </div>
        </div>

        {/* RIGHT COLUMN: SETPOINTS & LIMITS */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            fontFamily: theme.fontMono,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: theme.gold,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <i className="ti ti-adjustments"></i>Setpoints &amp; Limits
          </div>

          <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden' }}>
            <SetpointRow
              label="CHW Supply Setpoint"
              value="7.0 °C"
              onEdit={() => triggerToast('Edit setpoint: CHW Supply Setpoint', 'info')}
            />
            <SetpointRow
              label="CHW Supply Reset High"
              value="9.5 °C"
              onEdit={() => triggerToast('Edit setpoint: CHW Supply Reset High', 'info')}
            />
            <SetpointRow
              label="Condenser Entering High Alarm"
              value="35.0 °C"
              onEdit={() => triggerToast('Edit setpoint: Condenser Entering High Alarm', 'info')}
            />
            <SetpointRow
              label="Compressor High Discharge Trip"
              value="650 kPa"
              isFixed
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button
              className="btn primary"
              style={{ padding: '7px 16px', fontSize: '11.5px', width: '100%', cursor: 'pointer' }}
              onClick={() => {
                const query = 'Suggest optimal setpoints for CH-01 — Centrifugal Chiller based on current operating conditions';
                if (onAiQuery) {
                  onAiQuery(query);
                } else {
                  console.log(`[AI Query]: ${query}`);
                }
              }}
            >
              <i className="ti ti-brain" style={{ color: '#fff', marginRight: '5px' }}></i> AI Optimise Setpoints
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- REUSABLE CONTROL SUB-COMPONENTS ---

function RowContainer({ label, children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 14px',
      borderBottom: '1px solid var(--line-1, rgba(255, 255, 255, 0.08))',
      gap: '12px'
    }}>
      <span style={{ fontSize: '12px', color: 'var(--ink-2, #a2a5b5)', minWidth: '200px', flexShrink: 0 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function ButtonGroupRow({ label, options, activeValue, onChange }) {
  return (
    <RowContainer label={label}>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {options.map((option) => {
          const isActive = activeValue === option;
          return (
            <button
              key={option}
              className={`btn ${isActive ? 'primary' : ''}`}
              style={{ padding: '4px 12px', fontSize: '10.5px', cursor: 'pointer' }}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </RowContainer>
  );
}

function RangeControlRow({ label, min, max, step, value, unit, onChange, onSet }) {
  return (
    <RowContainer label={label}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--info, #4ea1ff)' }}
        />
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--info, #4ea1ff)',
          minWidth: '52px',
          textAlign: 'right'
        }}>
          {value}{unit}
        </span>
        <button
          className="btn primary"
          style={{ padding: '4px 12px', fontSize: '10.5px', cursor: 'pointer' }}
          onClick={onSet}
        >
          Set
        </button>
      </div>
    </RowContainer>
  );
}

function ToggleControlRow({ label, enabled, onToggle }) {
  return (
    <RowContainer label={label}>
      <div className="ahu-toggle-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          className={`ahu-toggle ${enabled ? 'on' : 'off'}`}
          onClick={onToggle}
          style={{ cursor: 'pointer' }}
        ></div>
        <span style={{ fontSize: '11px', color: 'var(--ink-2, #a2a5b5)' }}>
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    </RowContainer>
  );
}

function SetpointRow({ label, value, isFixed = false, onEdit }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 14px',
      borderBottom: '1px solid var(--line-1, rgba(255, 255, 255, 0.08))',
      fontSize: '11.5px'
    }}>
      <span style={{ color: 'var(--ink-3, #7a7e9d)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: 'var(--ink-1, #e1e1e6)' }}>
          {value}
        </span>
        {isFixed ? (
          <span style={{ fontSize: '9px', color: 'var(--ink-4, #565973)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--line-2, rgba(255,255,255,0.12))' }}>
            fixed
          </span>
        ) : (
          <button
            className="btn"
            style={{ padding: '2px 8px', fontSize: '10px', cursor: 'pointer' }}
            onClick={onEdit}
          >
            <i className="ti ti-pencil" style={{ fontSize: '10px' }}></i>
          </button>
        )}
      </div>
    </div>
  );
}