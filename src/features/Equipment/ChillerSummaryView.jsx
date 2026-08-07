import React from 'react';

// Default Color Constants for dark HVAC theme
const THEME = {
  bg0: '#040911',
  bgCard: '#080e18',
  bgCardOff: '#060a12',
  border: 'rgba(255, 255, 255, 0.08)',
  ink1: '#e2e8f0',
  ink3: '#8a9bb0',
  ink4: '#57697e',
  cool: '#38bdf8',
  hot: '#f87171',
  warn: '#fbbf24',
  ok: '#34d399',
  bad: '#f87171',
  info: '#60a5fa',
  violet: '#a78bfa',
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

export default function ChillerSummaryView({
  onSwitchTab = (tab) => console.log('Switch tab:', tab),
  onSelectChiller = (chId) => console.log('Select chiller:', chId)
}) {
  return (
    <div
      className="ch-tab-panel active"
      id="ch-panel-summary"
      style={{
        color: THEME.ink1,
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div className="ch-summary-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ================= 1. KPI TOP BAR ================= */}
        <div
          className="sum-kpi-bar"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
          }}
        >
          {/* Chillers Running KPI */}
          <KpiCard
            icon="ti-snowflake"
            iconBg={`${THEME.cool}22`}
            iconColor={THEME.cool}
            val="2 / 4"
            lbl="Chillers"
            sub="Running"
          />
          {/* CH Power KPI */}
          <KpiCard
            icon="ti-bolt"
            iconBg={`${THEME.warn}22`}
            iconColor={THEME.warn}
            val="1562.9 kW"
            lbl="CH Power"
            sub="Combined load"
          />
          {/* Avg COP KPI */}
          <KpiCard
            icon="ti-chart-line"
            iconBg={`${THEME.ok}22`}
            iconColor={THEME.ok}
            val="6.05"
            lbl="Avg COP"
            sub="Efficiency"
          />
          {/* Pumps Running KPI */}
          <KpiCard
            icon="ti-droplet-half"
            iconBg={`${THEME.info}22`}
            iconColor={THEME.info}
            val="6 / 10"
            lbl="Pumps"
            sub="Running"
          />
          {/* Pump Power KPI */}
          <KpiCard
            icon="ti-bolt"
            iconBg={`${THEME.violet}22`}
            iconColor={THEME.violet}
            val="54.6 kW"
            lbl="Pump Power"
            sub="Combined load"
          />
          {/* Cool Towers KPI */}
          <KpiCard
            icon="ti-building-factory-2"
            iconBg={`${THEME.warn}22`}
            iconColor={THEME.warn}
            val="3 / 4"
            lbl="Cool Towers"
            sub="Running"
          />
          {/* CT Outlet Temp KPI */}
          <KpiCard
            icon="ti-temperature"
            iconBg={`${THEME.cool}22`}
            iconColor={THEME.cool}
            val="28.6°C"
            lbl="CT Outlet"
            sub="Avg outlet temp"
          />
        </div>

        {/* ================= 2. CHILLERS SECTION ================= */}
        <div className="sum-section">
          <SectionHeader
            icon="ti-snowflake"
            title="Chillers"
            count="2 of 4 running"
            color={THEME.cool}
          />
          <div
            className="sum-eq-grid ch-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}
          >
            {/* Chiller 1 - Running */}
            <div
              className="sum-eq-card"
              onClick={() => { onSwitchTab('chillers'); onSelectChiller('CH1'); }}
              style={cardStyle(false)}
            >
              <div style={cardHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <StatusDot color={THEME.ok} size="8px" />
                  Chiller 1
                </div>
                <div style={{ fontSize: '11px', color: THEME.ink3, fontFamily: THEME.fontMono }}>
                  CH1 · Carrier · 400kVA
                </div>
              </div>
              <div style={cardStatusBarStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: THEME.ok, fontSize: '12px', fontWeight: 600 }}>
                  <StatusDot color={THEME.ok} size="5px" /> Running
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <Badge text="Auto" />
                  <Badge text="Normal" />
                </div>
              </div>
              <div style={paramsGridStyle}>
                <ParamRow label="Evp Leaving T" value="7.2 °C" valueColor={THEME.cool} />
                <ParamRow label="Con Entering T" value="33.4 °C" valueColor={THEME.hot} />
                <ParamRow label="Con Leaving T" value="37.3 °C" valueColor={THEME.hot} />
                <ParamRow label="Discharge Pr" value="524 kPa" valueColor={THEME.ink1} />
                <ParamRow label="Power" value="877.8 kW" valueColor={THEME.warn} />
                <ParamRow label="COP" value="6.2" valueColor={THEME.ok} />
                <ParamRow label="Load" value="62 %" valueColor={THEME.ink1} />
                <ParamRow label="Set Point" value="7 °C" valueColor={THEME.info} />
                <ParamRow label="Run Hours" value="2456 h" valueColor={THEME.ink1} />
              </div>
              <div style={cardFooterStyle}>09 May 2026</div>
            </div>

            {/* Chiller 2 - Offline */}
            <div
              className="sum-eq-card sum-eq-card-off"
              onClick={() => { onSwitchTab('chillers'); onSelectChiller('CH2'); }}
              style={cardStyle(true)}
            >
              <div style={cardHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <StatusDot color={THEME.bad} size="8px" />
                  Chiller 2
                </div>
                <div style={{ fontSize: '11px', color: THEME.ink3, fontFamily: THEME.fontMono }}>
                  CH2 · Carrier · 400kVA
                </div>
              </div>
              <div style={cardStatusBarStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: THEME.bad, fontSize: '12px', fontWeight: 600 }}>
                  <StatusDot color={THEME.bad} size="5px" /> Stopped
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <Badge text="Manual" />
                  <Badge text="Normal" />
                </div>
              </div>
              <OfflinePlaceholder />
              <div style={cardFooterStyle}>09 May 2026</div>
            </div>

            {/* Chiller 3 - Running */}
            <div
              className="sum-eq-card"
              onClick={() => { onSwitchTab('chillers'); onSelectChiller('CH3'); }}
              style={cardStyle(false)}
            >
              <div style={cardHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <StatusDot color={THEME.ok} size="8px" />
                  Chiller 3
                </div>
                <div style={{ fontSize: '11px', color: THEME.ink3, fontFamily: THEME.fontMono }}>
                  CH3 · Trane · 350kVA
                </div>
              </div>
              <div style={cardStatusBarStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: THEME.ok, fontSize: '12px', fontWeight: 600 }}>
                  <StatusDot color={THEME.ok} size="5px" /> Running
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <Badge text="Auto" />
                  <Badge text="Normal" />
                </div>
              </div>
              <div style={paramsGridStyle}>
                <ParamRow label="Evp Leaving T" value="16.2 °C" valueColor={THEME.cool} />
                <ParamRow label="Con Entering T" value="30.8 °C" valueColor={THEME.hot} />
                <ParamRow label="Con Leaving T" value="37 °C" valueColor={THEME.hot} />
                <ParamRow label="Discharge Pr" value="643 kPa" valueColor={THEME.ink1} />
                <ParamRow label="Power" value="685.1 kW" valueColor={THEME.warn} />
                <ParamRow label="COP" value="5.9" valueColor={THEME.warn} />
                <ParamRow label="Load" value="78 %" valueColor={THEME.ink1} />
                <ParamRow label="Set Point" value="10 °C" valueColor={THEME.info} />
                <ParamRow label="Run Hours" value="3102 h" valueColor={THEME.ink1} />
              </div>
              <div style={cardFooterStyle}>09 May 2026</div>
            </div>

            {/* Chiller 4 - Offline */}
            <div
              className="sum-eq-card sum-eq-card-off"
              onClick={() => { onSwitchTab('chillers'); onSelectChiller('CH4'); }}
              style={cardStyle(true)}
            >
              <div style={cardHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <StatusDot color={THEME.bad} size="8px" />
                  Chiller 4
                </div>
                <div style={{ fontSize: '11px', color: THEME.ink3, fontFamily: THEME.fontMono }}>
                  CH4 · York · 500kVA
                </div>
              </div>
              <div style={cardStatusBarStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: THEME.bad, fontSize: '12px', fontWeight: 600 }}>
                  <StatusDot color={THEME.bad} size="5px" /> Stopped
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <Badge text="Auto" />
                  <Badge text="Normal" />
                </div>
              </div>
              <OfflinePlaceholder />
              <div style={cardFooterStyle}>09 May 2026</div>
            </div>
          </div>
        </div>

        {/* ================= 3. PUMPS SECTION ================= */}
        <div className="sum-section">
          <SectionHeader
            icon="ti-droplet-half"
            title="Pumps"
            count="6 of 10 running"
            color={THEME.info}
          />

          {/* Primary Pumps */}
          <PumpSubGroup title="Primary Pumps" color={THEME.info}>
            <PumpCard
              name="Primary Pump 1"
              isRunning={true}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'Flow Rate', v: '142.5 m³/h', c: THEME.info },
                { k: 'Dis Pr', v: '6.8 bar', c: THEME.cool },
                { k: 'Current', v: '9.6 A', c: THEME.warn },
                { k: 'Power', v: '8.6 kW', c: THEME.violet },
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Primary Pump 2"
              isRunning={false}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Primary Pump 3"
              isRunning={true}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'Flow Rate', v: '138.2 m³/h', c: THEME.info },
                { k: 'Dis Pr', v: '6.5 bar', c: THEME.cool },
                { k: 'Current', v: '9.2 A', c: THEME.warn },
                { k: 'Power', v: '8.3 kW', c: THEME.violet },
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
          </PumpSubGroup>

          {/* Secondary Pumps */}
          <PumpSubGroup title="Secondary Pumps" color={THEME.cool}>
            <PumpCard
              name="Secondary Pump 1"
              isRunning={true}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'Flow Rate', v: '220.5 m³/h', c: THEME.info },
                { k: 'Dis Pr', v: '8.2 bar', c: THEME.cool },
                { k: 'Current', v: '12.4 A', c: THEME.warn },
                { k: 'Power', v: '11.2 kW', c: THEME.violet },
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Secondary Pump 2"
              isRunning={true}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'Flow Rate', v: '215 m³/h', c: THEME.info },
                { k: 'Dis Pr', v: '8 bar', c: THEME.cool },
                { k: 'Current', v: '12.1 A', c: THEME.warn },
                { k: 'Power', v: '10.9 kW', c: THEME.violet },
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Secondary Pump 3"
              isRunning={false}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Secondary Pump 4"
              isRunning={false}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'A / M', v: 'Manual', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
          </PumpSubGroup>

          {/* Condenser Pumps */}
          <PumpSubGroup title="Condenser Pumps" color={THEME.violet}>
            <PumpCard
              name="Condenser Pump 1"
              isRunning={true}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'Flow Rate', v: '180 m³/h', c: THEME.info },
                { k: 'Dis Pr', v: '5.5 bar', c: THEME.cool },
                { k: 'Current', v: '8.8 A', c: THEME.warn },
                { k: 'Power', v: '7.9 kW', c: THEME.violet },
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Condenser Pump 2"
              isRunning={true}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'Flow Rate', v: '175.5 m³/h', c: THEME.info },
                { k: 'Dis Pr', v: '5.4 bar', c: THEME.cool },
                { k: 'Current', v: '8.6 A', c: THEME.warn },
                { k: 'Power', v: '7.7 kW', c: THEME.violet },
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Condenser Pump 3"
              isRunning={false}
              onClick={() => onSwitchTab('pumps')}
              params={[
                { k: 'A / M', v: 'Auto', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
          </PumpSubGroup>
        </div>

        {/* ================= 4. COOLING TOWERS SECTION ================= */}
        <div className="sum-section">
          <SectionHeader
            icon="ti-building-factory-2"
            title="Cooling Towers"
            count="3 of 4 running"
            color={THEME.warn}
          />
          <div
            className="sum-eq-grid ct-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '12px',
            }}
          >
            <PumpCard
              name="Cooling Tower 1"
              isRunning={true}
              onClick={() => onSwitchTab('ct')}
              params={[
                { k: 'Inlet Temp', v: '32.5 °C', c: THEME.hot },
                { k: 'Outlet Temp', v: '28.2 °C', c: THEME.cool },
                { k: 'Fan Status', v: 'On', isBadge: true },
                { k: 'A / M', v: 'Manual', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Cooling Tower 2"
              isRunning={true}
              onClick={() => onSwitchTab('ct')}
              params={[
                { k: 'Inlet Temp', v: '33.1 °C', c: THEME.hot },
                { k: 'Outlet Temp', v: '29 °C', c: THEME.cool },
                { k: 'Fan Status', v: 'On', isBadge: true },
                { k: 'A / M', v: 'Manual', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Cooling Tower 3"
              isRunning={true}
              onClick={() => onSwitchTab('ct')}
              params={[
                { k: 'Inlet Temp', v: '32.8 °C', c: THEME.hot },
                { k: 'Outlet Temp', v: '28.7 °C', c: THEME.cool },
                { k: 'Fan Status', v: 'On', isBadge: true },
                { k: 'A / M', v: 'Manual', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
            <PumpCard
              name="Cooling Tower 4"
              isRunning={false}
              onClick={() => onSwitchTab('ct')}
              params={[
                { k: 'A / M', v: 'Manual', isBadge: true },
                { k: 'Trip', v: 'Normal', isBadge: true },
              ]}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= HELPER & REUSABLE SUB-COMPONENTS ================= */

function KpiCard({ icon, iconBg, iconColor, val, lbl, sub }) {
  return (
    <div
      style={{
        background: THEME.bgCard,
        border: `1px solid ${THEME.border}`,
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          background: iconBg,
          color: iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}
      >
        <i className={`ti ${icon}`}></i>
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: THEME.ink1 }}>{val}</div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: THEME.ink3 }}>{lbl}</div>
        <div style={{ fontSize: '9.5px', color: THEME.ink4 }}>{sub}</div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, count, color }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 700,
        color: color,
        marginBottom: '12px',
        borderBottom: `1px solid ${THEME.border}`,
        paddingBottom: '6px',
      }}
    >
      <i className={`ti ${icon}`}></i>
      {title}
      <span
        style={{
          marginLeft: 'auto',
          fontSize: '11px',
          fontWeight: 500,
          color: THEME.ink3,
        }}
      >
        {count}
      </span>
    </div>
  );
}

function PumpSubGroup({ title, color, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div
        style={{
          fontSize: '10px',
          fontWeight: 700,
          fontFamily: THEME.fontMono,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: color,
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <i className="ti ti-droplet" style={{ fontSize: '12px' }}></i>
        {title}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '12px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PumpCard({ name, isRunning, onClick, params }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isRunning ? THEME.bgCard : THEME.bgCardOff,
        border: `1px solid ${THEME.border}`,
        borderRadius: '8px',
        padding: '10px 12px',
        cursor: 'pointer',
        opacity: isRunning ? 1 : 0.7,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 600,
          color: THEME.ink1,
          marginBottom: '8px',
        }}
      >
        <StatusDot color={isRunning ? THEME.ok : THEME.bad} size="7px" />
        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
        <span
          style={{
            fontSize: '10.5px',
            color: isRunning ? THEME.ok : THEME.bad,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <StatusDot color={isRunning ? THEME.ok : THEME.bad} size="5px" />
          {isRunning ? 'Running' : 'Stopped'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {!isRunning && params.length <= 2 && (
          <div style={{ padding: '8px 0', textAlign: 'center', color: THEME.ink4, fontSize: '11px' }}>
            Offline
          </div>
        )}
        {params.map((p, idx) => (
          <ParamRow
            key={idx}
            label={p.k}
            value={p.v}
            valueColor={p.c}
            isBadge={p.isBadge}
          />
        ))}
      </div>
    </div>
  );
}

function ParamRow({ label, value, valueColor, isBadge }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
      }}
    >
      <span style={{ color: THEME.ink3 }}>{label}</span>
      {isBadge ? (
        <Badge text={value} />
      ) : (
        <span
          style={{
            fontFamily: THEME.fontMono,
            fontWeight: 600,
            color: valueColor || THEME.ink1,
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

function Badge({ text }) {
  return (
    <span
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${THEME.border}`,
        borderRadius: '4px',
        padding: '1px 5px',
        fontSize: '10px',
        color: THEME.ink3,
      }}
    >
      {text}
    </span>
  );
}

function StatusDot({ color, size }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
}

function OfflinePlaceholder() {
  return (
    <div style={{ padding: '24px 0', textAlign: 'center', color: THEME.ink4, fontSize: '11.5px' }}>
      <i className="ti ti-power" style={{ fontSize: '22px', display: 'block', margin: '0 auto 6px', opacity: 0.25 }}></i>
      Unit Offline
    </div>
  );
}

/* Common Card Styles */
const cardStyle = (isOff) => ({
  background: isOff ? THEME.bgCardOff : THEME.bgCard,
  border: `1px solid ${THEME.border}`,
  borderRadius: '8px',
  padding: '12px',
  cursor: 'pointer',
  opacity: isOff ? 0.75 : 1,
  display: 'flex',
  flexDirection: 'column',
});

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const cardStatusBarStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '8px',
  borderBottom: `1px solid ${THEME.border}`,
  marginBottom: '8px',
};

const paramsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '6px 12px',
  flex: 1,
};

const cardFooterStyle = {
  marginTop: '12px',
  paddingTop: '6px',
  borderTop: `1px solid ${THEME.border}`,
  fontSize: '10px',
  fontFamily: THEME.fontMono,
  fontWeight: 600,
  color: THEME.ink4,
  textAlign: 'right',
};