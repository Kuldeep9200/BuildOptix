import React, { useState } from 'react';

// --- INITIAL DATA STRUCTURES ---

const KPI_DATA = [
  {
    label: 'Overall Plant Health',
    value: '87%',
    sub: 'good condition',
    type: 'ok', // Color theme mapping
  },
  {
    label: 'Chiller Efficiency',
    value: '6.18',
    sub: 'avg COP today',
    type: 'cool',
  },
  {
    label: 'Pump Efficiency',
    value: '94%',
    sub: 'vs design flow',
    type: 'info',
  },
  {
    label: 'CT Approach',
    value: '4.2 K',
    sub: 'avg approach ΔT',
    type: 'warn',
  },
  {
    label: 'Energy vs Baseline',
    value: '−3.1%',
    sub: 'below yesterday',
    type: 'ok',
  },
];

const TRENDS_DATA = [
  {
    title: 'COP Trend',
    value: '6.18',
    colorVar: 'var(--ok)',
    gradId: 'phz2mr',
    pathFill: 'M0,28 L30,25 L60,30 L90,22 L120,26 L150,23 L180,20 L200,22 L200,50 L0,50 Z',
    pathStroke: 'M0,28 L30,25 L60,30 L90,22 L120,26 L150,23 L180,20 L200,22',
  },
  {
    title: 'Load Factor',
    value: '62%',
    colorVar: 'var(--info)',
    gradId: 'phptp6',
    pathFill: 'M0,30 L30,32 L60,28 L90,33 L120,30 L150,28 L180,31 L200,29 L200,50 L0,50 Z',
    pathStroke: 'M0,30 L30,32 L60,28 L90,33 L120,30 L150,28 L180,31 L200,29',
  },
  {
    title: 'Energy (kWh)',
    value: '1,562',
    colorVar: 'var(--warn)',
    gradId: 'phidyo',
    pathFill: 'M0,25 L30,28 L60,24 L90,30 L120,26 L150,28 L180,24 L200,26 L200,50 L0,50 Z',
    pathStroke: 'M0,25 L30,28 L60,24 L90,30 L120,26 L150,28 L180,24 L200,26',
  },
  {
    title: 'Chiller Power',
    value: '877 kW',
    colorVar: 'var(--cool)',
    gradId: 'phg7u9',
    pathFill: 'M0,32 L30,29 L60,33 L90,27 L120,30 L150,28 L180,32 L200,30 L200,50 L0,50 Z',
    pathStroke: 'M0,32 L30,29 L60,33 L90,27 L120,30 L150,28 L180,32 L200,30',
  },
  {
    title: 'Pump Flow',
    value: '356 m³/h',
    colorVar: 'var(--info)',
    gradId: 'phhsm6',
    pathFill: 'M0,28 L30,27 L60,29 L90,26 L120,28 L150,27 L180,29 L200,28 L200,50 L0,50 Z',
    pathStroke: 'M0,28 L30,27 L60,29 L90,26 L120,28 L150,27 L180,29 L200,28',
  },
  {
    title: 'CT Approach',
    value: '4.2 K',
    colorVar: 'var(--warn)',
    gradId: 'ph51v0',
    pathFill: 'M0,26 L30,28 L60,25 L90,30 L120,27 L150,29 L180,26 L200,28 L200,50 L0,50 Z',
    pathStroke: 'M0,26 L30,28 L60,25 L90,30 L120,27 L150,29 L180,26 L200,28',
  },
];

const CHILLER_HEALTH = [
  { label: 'CH-1 · Compressor', percent: 92, statusColor: 'var(--ok)', note: 'Above 7.5°C SP' },
  { label: 'CH-1 · Condenser Fan', percent: 96, statusColor: 'var(--ok)' },
  { label: 'CH-1 · Refrigerant', percent: 97, statusColor: 'var(--ok)' },
  { label: 'CH-1 · Control Valve', percent: 78, statusColor: 'var(--info)', note: 'Monitor' },
  { label: 'CH-3 · Compressor', percent: 88, statusColor: 'var(--ok)', note: 'Above 10°C SP' },
  { label: 'CH-3 · Condenser Fan', percent: 91, statusColor: 'var(--ok)' },
  { label: 'CH-2 · Overall (Off)', percent: 0, statusColor: 'var(--ink-4)', note: 'Offline' },
  { label: 'CH-4 · Overall (Off)', percent: 0, statusColor: 'var(--ink-4)', note: 'Offline' },
];

const PUMP_HEALTH = [
  { label: 'PP-1 · Bearing', percent: 88, statusColor: 'var(--ok)' },
  { label: 'PP-1 · Seal', percent: 94, statusColor: 'var(--ok)' },
  { label: 'PP-3 · Bearing', percent: 76, statusColor: 'var(--warn)', note: 'Schedule lube' },
  { label: 'SP-1 · Impeller', percent: 91, statusColor: 'var(--ok)' },
  { label: 'SP-2 · Vibration', percent: 84, statusColor: 'var(--ok)', note: '1.4 mm/s' },
  { label: 'CP-1 · Motor Ins.', percent: 92, statusColor: 'var(--ok)' },
  { label: 'CP-2 · Bearing', percent: 79, statusColor: 'var(--warn)', note: 'Due for check' },
];

const CT_HEALTH = [
  { label: 'CT-1 · Fill Pack', percent: 88, statusColor: 'var(--ok)' },
  { label: 'CT-1 · Fan Motor', percent: 91, statusColor: 'var(--ok)' },
  { label: 'CT-2 · Fill Pack', percent: 72, statusColor: 'var(--warn)', note: 'Inspect soon' },
  { label: 'CT-3 · Basin Clean', percent: 78, statusColor: 'var(--warn)', note: 'Schedule clean' },
  { label: 'CT-4 · Overall (Off)', percent: 0, statusColor: 'var(--ink-4)', note: 'Offline' },
];

// --- MAIN COMPONENT ---

export default function PlantHealthDashboard() {
  return (
    <div className="ch-tab-panel active" id="ch-panel-health">
      <div className="ch-pumps-body">
        
        {/* --- Top KPIs Summary Grid --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          {KPI_DATA.map((kpi, index) => (
            <div
              key={index}
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--line-2)',
                borderRadius: '9px',
                padding: '12px 14px',
              }}
            >
              <div
                style={{
                  fontSize: '9.5px',
                  color: 'var(--ink-3)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '5px',
                }}
              >
                {kpi.label}
              </div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: `var(--${kpi.type})`,
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                }}
              >
                {kpi.value}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--ink-4)', marginTop: '3px' }}>
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>

        {/* --- Performance Trends Section --- */}
        <div
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--line-2)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '14px',
          }}
        >
          <SectionHeader
            iconClass="ti ti-trending-up"
            title="Performance Trends — Last 24 Hours"
            colorVar="var(--violet)"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              padding: '14px',
            }}
          >
            {TRENDS_DATA.map((trend, idx) => (
              <TrendCard key={idx} {...trend} />
            ))}
          </div>
        </div>

        {/* --- Chillers Component Health --- */}
        <HealthGroupSection
          iconClass="ti ti-snowflake"
          title="Chillers — Component Health"
          colorVar="var(--cool)"
          items={CHILLER_HEALTH}
        />

        {/* --- Pumps Health Indicators --- */}
        <HealthGroupSection
          iconClass="ti ti-droplet-half"
          title="Pumps — Health Indicators"
          colorVar="var(--info)"
          items={PUMP_HEALTH}
        />

        {/* --- Cooling Towers Health Indicators --- */}
        <HealthGroupSection
          iconClass="ti ti-building-factory-2"
          title="Cooling Towers — Health Indicators"
          colorVar="var(--warn)"
          items={CT_HEALTH}
        />

      </div>
    </div>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function SectionHeader({ iconClass, title, colorVar }) {
  return (
    <div
      style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--line-1)',
        background: 'var(--surface-2)',
        fontSize: '10px',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: colorVar,
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
      }}
    >
      <i className={iconClass}></i>
      {title}
    </div>
  );
}

function TrendCard({ title, value, colorVar, gradId, pathFill, pathStroke }) {
  return (
    <div
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--line-1)',
        borderRadius: '8px',
        padding: '10px 12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '6px',
        }}
      >
        <span style={{ fontSize: '10.5px', color: 'var(--ink-2)' }}>{title}</span>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: colorVar,
          }}
        >
          {value}
        </span>
      </div>
      <svg
        width="100%"
        viewBox="0 0 200 50"
        preserveAspectRatio="none"
        style={{ height: '40px', display: 'block' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorVar} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colorVar} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={pathFill} fill={`url(#${gradId})`} stroke="none" />
        <path d={pathStroke} fill="none" stroke={colorVar} strokeWidth="1.8" />
        <circle cx="200" cy="28" r="3" fill={colorVar} />
      </svg>
    </div>
  );
}

function HealthGroupSection({ iconClass, title, colorVar, items }) {
  return (
    <div
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--line-2)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '14px',
      }}
    >
      <SectionHeader iconClass={iconClass} title={title} colorVar={colorVar} />
      {items.map((item, index) => (
        <HealthProgressRow key={index} {...item} />
      ))}
    </div>
  );
}

function HealthProgressRow({ label, percent, statusColor, note }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        borderBottom: '1px solid var(--line-1)',
      }}
    >
      <div style={{ fontSize: '11.5px', color: 'var(--ink-1)', width: '200px', flexShrink: 0 }}>
        {label}
      </div>
      <div style={{ flex: 1, height: '6px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: '3px',
            background: statusColor,
            width: `${percent}%`,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      <div
        style={{
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          color: statusColor,
          width: '42px',
          textAlign: 'right',
        }}
      >
        {percent}%
      </div>
      {note ? (
        <div
          style={{
            fontSize: '9.5px',
            color: 'var(--ink-4)',
            width: '100px',
            textAlign: 'right',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {note}
        </div>
      ) : (
        <div style={{ width: '100px' }} />
      )}
    </div>
  );
}