import React, { useState } from 'react';
import ChillerControls from './ChillerControls';
import ChillerTrends from './ChillerTrends';

// Optional: Fallback CSS Variable Defaults in JS object format 
// (If these are already defined in your global CSS, you can remove this theme object)
const theme = {
    bg1: 'var(--bg-1, #1e1e2d)',
    bg0: 'var(--bg-0, #151521)',
    surface1: 'var(--surface-1, #212130)',
    surface2: 'var(--surface-2, #2b2b40)',
    surface3: 'var(--surface-3, #363654)',
    line1: 'var(--line-1, rgba(255, 255, 255, 0.08))',
    line2: 'var(--line-2, rgba(255, 255, 255, 0.12))',
    ink0: 'var(--ink-0, #ffffff)',
    ink1: 'var(--ink-1, #e1e1e6)',
    ink2: 'var(--ink-2, #a2a5b5)',
    ink3: 'var(--ink-3, #7a7e9d)',
    ink4: 'var(--ink-4, #565973)',
    ok: 'var(--ok, #22D67A)',
    warn: 'var(--warn, #FF8A4C)',
    cool: 'var(--cool, #34D2E6)',
    info: 'var(--info, #4EA1FF)',
    bad: 'var(--bad, #F25B5B)',
    fontMono: 'var(--font-mono, monospace)',
};

export default function CentrifugalChiller() {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeRange, setActiveRange] = useState('24H');
    const [hoveredCard, setHoveredCard] = useState(null);
const alarms = [
    {
      id: 'alarm-1',
      severity: 'Critical',
      code: 'CH-01',
      title: 'High Condenser Pressure',
      time: '10:21',
    },
    {
      id: 'alarm-2',
      severity: 'Warning',
      code: 'CH-01',
      title: 'Low Chilled Water Flow',
      time: '10:15',
    },
    {
      id: 'alarm-3',
      severity: 'Warning',
      code: 'CH-01',
      title: 'High Discharge Temp',
      time: '10:10',
    },
  ];

  // Maintenance Tasks State
  const [tasks, setTasks] = useState([
    {
      id: 'eq_chiller_0',
      title: 'Check oil level & pressure',
      frequency: 'Weekly',
      assignedTo: 'HVAC Team A',
      completed: true,
    },
    {
      id: 'eq_chiller_1',
      title: 'Inspect refrigerant charge',
      frequency: 'Monthly',
      assignedTo: 'HVAC Team A',
      completed: true,
    },
    {
      id: 'eq_chiller_2',
      title: 'Clean condenser tubes',
      frequency: 'Monthly',
      assignedTo: 'HVAC Team B',
      completed: false,
    },
    {
      id: 'eq_chiller_3',
      title: 'Calibrate capacity controls',
      frequency: 'Quarterly',
      assignedTo: 'OEM Engineer',
      completed: false,
    },
    {
      id: 'eq_chiller_4',
      title: 'Log run hours',
      frequency: 'Weekly',
      assignedTo: 'FM Supervisor',
      completed: false,
    },
  ]);

  // Handlers
  const handleAiQuery = (query) => {
    console.log('AI Query:', query);
    // Add custom AI query trigger logic here
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Derived Stats
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedCount / totalTasks) * 100);

  const criticalAlarmsCount = alarms.filter((a) => a.severity === 'Critical').length;
  const warningAlarmsCount = alarms.filter((a) => a.severity === 'Warning').length;
    // Helper for KPI Cards style on hover
    const getKpiStyle = (id) => ({
        background: hoveredCard === id ? theme.surface2 : 'transparent',
        border: '1px solid transparent',
        borderColor: hoveredCard === id ? 'var(--line-3, #444)' : 'transparent',
        borderRadius: '9px',
        padding: '11px 13px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.14s, background 0.15s',
        cursor: 'default',
        transform: hoveredCard === id ? 'translateY(-2px)' : 'none',
        boxShadow: hoveredCard === id ? '0 4px 18px rgba(0,0,0,0.22)' : 'none',
    });

    return (
        <div id="eq-detail" className="eq-detail" style={{ height: '100%', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

                {/* --- HEADER --- */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 18px',
                    borderBottom: `1px solid ${theme.line1}`,
                    flexShrink: 0,
                    background: theme.bg1
                }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(34, 214, 122, 0.13)',
                        border: '1px solid rgba(34, 214, 122, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: theme.ok,
                        flexShrink: 0
                    }}>
                        <i className="ti ti-snowflake"></i>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: theme.ink0, letterSpacing: '-0.3px' }}>
                            CH-01 — Centrifugal Chiller
                        </div>
                        <div style={{ fontSize: '10.5px', color: theme.ink3, marginTop: '2px', fontFamily: theme.fontMono }}>
                            Level 1 · Mechanical Room · System 1
                        </div>
                    </div>

                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '99px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: 'rgba(34, 214, 122, 0.1)',
                        color: theme.ok,
                        border: '1px solid rgba(34, 214, 122, 0.2)'
                    }}>
                        <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: theme.ok,
                            display: 'inline-block',
                            flexShrink: 0
                        }}></span>
                        Running
                    </span>
                </div>

                {/* --- TAB BAR + ACTIONS --- */}
                <div style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: 0,
                    borderBottom: `1px solid ${theme.line1}`,
                    background: theme.bg1,
                    flexShrink: 0,
                    padding: '0 16px',
                    overflowX: 'auto'
                }}>
                    {[
                        { id: 'overview', label: 'Overview', icon: 'ti-layout-dashboard' },
                        { id: 'controls', label: 'Controls', icon: 'ti-settings-2' },
                        { id: 'trends', label: 'Trends', icon: 'ti-trending-up' },
                        { id: 'alarms', label: 'Alarms', icon: 'ti-bell', badge: 3 },
                        { id: 'maintenance', label: 'Maintenance', icon: 'ti-checklist' }
                    ].map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <div
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '10px 16px',
                                    fontSize: '12px',
                                    fontWeight: isActive ? 600 : 400,
                                    cursor: 'pointer',
                                    color: isActive ? theme.info : theme.ink3,
                                    borderBottom: `2px solid ${isActive ? theme.info : 'transparent'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.14s, border-color 0.14s',
                                    userSelect: 'none'
                                }}
                            >
                                <i className={`ti ${tab.icon}`} style={{ fontSize: '13px' }}></i>
                                {tab.label}
                                {tab.badge && (
                                    <span style={{
                                        background: theme.bad,
                                        color: '#fff',
                                        fontSize: '9px',
                                        padding: '1px 5px',
                                        borderRadius: '99px',
                                        fontWeight: 700,
                                        marginLeft: '3px'
                                    }}>
                                        {tab.badge}
                                    </span>
                                )}
                            </div>
                        );
                    })}

                    {/* Action Buttons */}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}>
                        <button className="btn" style={{ padding: '5px 11px', fontSize: '11px', cursor: 'pointer' }}>
                            <i className="ti ti-brain" style={{ color: 'var(--ai, #a855f7)', marginRight: '4px' }}></i>AI Analyse
                        </button>
                        <button className="btn primary" style={{ padding: '5px 11px', fontSize: '11px', cursor: 'pointer' }}>
                            <i className="ti ti-player-play" style={{ marginRight: '4px' }}></i>Start
                        </button>
                        <button className="btn" style={{ padding: '5px 11px', fontSize: '11px', cursor: 'pointer' }}>
                            Stop
                        </button>
                    </div>
                </div>

                {/* --- TAB PANELS --- */}
                {activeTab === 'overview' && (
                    <div style={{ flex: '1 1 0%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>

                            {/* Top Metrics Cards Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '16px' }}>

                                {/* Card 1 */}
                                <div
                                    style={getKpiStyle(1)}
                                    onMouseEnter={() => setHoveredCard(1)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: theme.cool }}></div>
                                    <div style={{ fontSize: '9.5px', color: theme.ink3, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>CHW Supply</div>
                                    <div style={{ fontSize: '22px', fontWeight: 700, color: theme.cool, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                                        7.2<span style={{ fontSize: '12px', color: theme.ink3, fontWeight: 400, marginLeft: '2px' }}>°C</span>
                                    </div>
                                    <div style={{ fontSize: '10px', color: theme.ink4, marginTop: '3px' }}>setpoint 7.0</div>
                                </div>

                                {/* Card 2 */}
                                <div
                                    style={getKpiStyle(2)}
                                    onMouseEnter={() => setHoveredCard(2)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: theme.warn }}></div>
                                    <div style={{ fontSize: '9.5px', color: theme.ink3, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Total Power</div>
                                    <div style={{ fontSize: '22px', fontWeight: 700, color: theme.warn, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                                        168.3<span style={{ fontSize: '12px', color: theme.ink3, fontWeight: 400, marginLeft: '2px' }}>kW</span>
                                    </div>
                                    <div style={{ fontSize: '10px', color: theme.ink4, marginTop: '3px' }}>↗ 4.2 last hr</div>
                                </div>

                                {/* Card 3 */}
                                <div
                                    style={getKpiStyle(3)}
                                    onMouseEnter={() => setHoveredCard(3)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: theme.ok }}></div>
                                    <div style={{ fontSize: '9.5px', color: theme.ink3, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>COP</div>
                                    <div style={{ fontSize: '22px', fontWeight: 700, color: theme.ok, letterSpacing: '-0.5px', lineHeight: 1.1 }}>6.21</div>
                                    <div style={{ fontSize: '10px', color: theme.ink4, marginTop: '3px' }}>target 6.0</div>
                                </div>

                                {/* Card 4 */}
                                <div
                                    style={getKpiStyle(4)}
                                    onMouseEnter={() => setHoveredCard(4)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: theme.ok }}></div>
                                    <div style={{ fontSize: '9.5px', color: theme.ink3, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>CHW Flow</div>
                                    <div style={{ fontSize: '22px', fontWeight: 700, color: theme.ok, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                                        142.5<span style={{ fontSize: '12px', color: theme.ink3, fontWeight: 400, marginLeft: '2px' }}>m³/h</span>
                                    </div>
                                    <div style={{ fontSize: '10px', color: theme.ink4, marginTop: '3px' }}>nominal</div>
                                </div>

                                {/* Card 5 */}
                                <div
                                    style={getKpiStyle(5)}
                                    onMouseEnter={() => setHoveredCard(5)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: theme.ok }}></div>
                                    <div style={{ fontSize: '9.5px', color: theme.ink3, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Run Hours</div>
                                    <div style={{ fontSize: '22px', fontWeight: 700, color: theme.ok, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                                        2456<span style={{ fontSize: '12px', color: theme.ink3, fontWeight: 400, marginLeft: '2px' }}>hrs</span>
                                    </div>
                                    <div style={{ fontSize: '10px', color: theme.ink4, marginTop: '3px' }}>since service</div>
                                </div>
                            </div>

                            {/* Main Section Content Split */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '14px' }}>

                                {/* Left Column */}
                                <div>
                                    {/* Equipment Photo Box */}
                                    <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
                                        <div style={{ padding: '9px 14px', borderBottom: `1px solid ${theme.line1}`, background: theme.surface2, fontSize: '10px', fontWeight: 700, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.info, display: 'flex', alignItems: 'center', gap: '7px' }}>
                                            <i className="ti ti-photo"></i>Equipment Photo &amp; Digital Twin
                                            <span style={{ marginLeft: 'auto', fontSize: '9px', color: theme.ink4, fontWeight: 400 }}>Click to replace</span>
                                        </div>
                                        <div style={{ padding: '12px 14px' }}>
                                            <div style={{
                                                position: 'relative',
                                                borderRadius: '9px',
                                                overflow: 'hidden',
                                                border: `1.5px dashed ${theme.line2}`,
                                                background: theme.surface1,
                                                height: '160px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                cursor: 'pointer',
                                                marginBottom: '12px'
                                            }}>
                                                <input type="file" accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                                                <i className="ti ti-photo-up" style={{ fontSize: '32px', color: theme.info, opacity: 0.4 }}></i>
                                                <div style={{ fontSize: '11.5px', fontWeight: 600, color: theme.ink2 }}>Upload Equipment Photo</div>
                                                <div style={{ fontSize: '10px', color: theme.ink4 }}>PNG · JPG · drag &amp; drop or click</div>
                                            </div>

                                            {/* Readouts Grid */}
                                            <div style={{ background: theme.bg0, border: `1px solid ${theme.line1}`, borderRadius: '8px', padding: '10px 12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                                <ReadoutItem label="Cond. Water In" value="29.1" unit="°C" color={theme.ink0} />
                                                <ReadoutItem label="Cond. Pressure" value="16.4" unit="bar" color={theme.cool} />
                                                <ReadoutItem label="Compressor Power" value="152.6" unit="kW" color={theme.warn} />
                                                <ReadoutItem label="CHW Supply" value="7.2" unit="°C" color={theme.cool} />
                                                <ReadoutItem label="Cond Water Out" value="34.8" unit="°C" color={theme.ink0} />
                                                <ReadoutItem label="Capacity" value="585.0" unit="TR" color={theme.ink0} />
                                                <ReadoutItem label="COP" value="6.21" unit="" color={theme.ok} />
                                                <ReadoutItem label="CHW Return" value="12.5" unit="°C" color={theme.ink0} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trend Analytics */}
                                    <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
                                        <div style={{ padding: '9px 14px', borderBottom: `1px solid ${theme.line1}`, background: theme.surface2, fontSize: '10px', fontWeight: 700, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.info, display: 'flex', alignItems: 'center', gap: '7px' }}>
                                            <i className="ti ti-trending-up"></i>Trend Analytics — Last 24 Hours
                                            <span style={{ marginLeft: 'auto', display: 'flex', gap: '3px' }}>
                                                {['1H', '6H', '24H', '7D', '30D'].map((range) => (
                                                    <span
                                                        key={range}
                                                        onClick={() => setActiveRange(range)}
                                                        style={{
                                                            padding: '2px 7px',
                                                            borderRadius: '4px',
                                                            fontSize: '9px',
                                                            cursor: 'pointer',
                                                            background: activeRange === range ? 'rgba(78, 161, 255, 0.15)' : theme.surface3,
                                                            color: activeRange === range ? theme.info : theme.ink4,
                                                            fontWeight: activeRange === range ? 600 : 400
                                                        }}
                                                    >
                                                        {range}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>

                                        {/* Sparkline Charts Grid */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '12px 14px' }}>
                                            <SparklineCard title="CHWS" unit="°C" color="#34D2E6" pathD="M0,28 L20,30 L40,26 L60,28 L80,24 L100,26 L120,22 L140,25 L160,23 L180,26 L200,24" />
                                            <SparklineCard title="CHWR" unit="°C" color="#FF8A4C" pathD="M0,18 L20,16 L40,20 L60,18 L80,22 L100,20 L120,16 L140,18 L160,20 L180,22 L200,18" />
                                            <SparklineCard title="Comp Power" unit="kW" color="#9B6CFF" pathD="M0,30 L20,28 L40,26 L60,22 L80,18 L100,20 L120,16 L140,18 L160,14 L180,16 L200,12" />
                                            <SparklineCard title="CW Flow" unit="m³/h" color="#22D67A" pathD="M0,22 L20,20 L40,24 L60,22 L80,18 L100,22 L120,20 L140,22 L160,18 L180,20 L200,22" />
                                            <SparklineCard title="COP" unit="·" color="#4EA1FF" pathD="M0,28 L20,26 L40,24 L60,22 L80,20 L100,18 L120,16 L140,18 L160,16 L180,14 L200,16" />
                                        </div>
                                    </div>

                                    {/* Performance Health List */}
                                    <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
                                        <div style={{ padding: '9px 14px', borderBottom: `1px solid ${theme.line1}`, background: theme.surface2, fontSize: '10px', fontWeight: 700, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.ok, display: 'flex', alignItems: 'center', gap: '7px' }}>
                                            <i className="ti ti-heart-rate-monitor"></i>Performance Health
                                        </div>
                                        <HealthRow label="Compressor" percentage={92} color={theme.ok} />
                                        <HealthRow label="Condenser" percentage={88} color={theme.warn} />
                                        <HealthRow label="Evaporator" percentage={94} color={theme.ok} />
                                        <HealthRow label="Control Valve" percentage={78} color={theme.info} />
                                        <HealthRow label="Refrigerant" percentage={97} color={theme.ok} />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Radial Health Widget */}
                                    <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ padding: '9px 14px', borderBottom: `1px solid ${theme.line1}`, background: theme.surface2, fontSize: '10px', fontWeight: 700, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.ok, display: 'flex', alignItems: 'center', gap: '7px' }}>
                                            <i className="ti ti-heart-rate-monitor"></i>System Health
                                        </div>
                                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                                                <svg viewBox="0 0 100 100" style={{ width: '110px', height: '110px', transform: 'rotate(-90deg)' }}>
                                                    <defs>
                                                        <linearGradient id="hgchiller_grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#F25B5B" />
                                                            <stop offset="50%" stopColor="#F5B441" />
                                                            <stop offset="100%" stopColor="#22D67A" />
                                                        </linearGradient>
                                                    </defs>
                                                    <circle cx="50" cy="50" r="40" fill="none" stroke={theme.surface3} strokeWidth="8" />
                                                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#hgchiller_grad)" strokeWidth="8" strokeDasharray="251" strokeDashoffset="20.08" strokeLinecap="round" />
                                                </svg>
                                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div style={{ fontSize: '24px', fontWeight: 700, color: theme.ink0, letterSpacing: '-1px' }}>
                                                        92<small style={{ fontSize: '13px', color: theme.ink3 }}>%</small>
                                                    </div>
                                                    <div style={{ fontSize: '9.5px', color: theme.ink3, fontFamily: theme.fontMono }}>Healthy</div>
                                                </div>
                                            </div>
                                            <div style={{ width: '100%', height: '6px', background: theme.surface3, borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, var(--bad, #F25B5B), var(--warn, #FF8A4C) 50%, var(--ok, #22D67A))', width: '92%', transition: 'width 0.6s ease' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Component Status Widget */}
                                    <div style={{ background: theme.surface1, border: `1px solid ${theme.line2}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
                                        <div style={{ padding: '9px 14px', borderBottom: `1px solid ${theme.line1}`, background: theme.surface2, fontSize: '10px', fontWeight: 700, fontFamily: theme.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.info, display: 'flex', alignItems: 'center', gap: '7px' }}>
                                            <i className="ti ti-list-check"></i>Component Status
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'controls' && (
                    <ChillerControls />
                )}
                  {activeTab === 'trends' && (
                    <ChillerTrends />
                )}

{activeTab === 'alarms' && (
        <div id="eq-tabpanel-chiller-alarms" style={{ flex: '1 1 0%', overflowY: 'auto' }}>
          <div style={{ padding: '16px' }}>
            {/* Alarm Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
              <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line-2)', borderRadius: '9px', padding: '12px', textAlign: 'center', borderTop: '3px solid var(--bad)' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--bad)' }}>{criticalAlarmsCount}</div>
                <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Critical</div>
              </div>
              <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line-2)', borderRadius: '9px', padding: '12px', textAlign: 'center', borderTop: '3px solid var(--warn)' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warn)' }}>{warningAlarmsCount}</div>
                <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Warning</div>
              </div>
              <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line-2)', borderRadius: '9px', padding: '12px', textAlign: 'center', borderTop: '3px solid var(--info)' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--info)' }}>0</div>
                <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Info</div>
              </div>
            </div>

            {/* Active Alarms Card */}
            <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line-2)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '9px 14px', borderBottom: '1px solid var(--line-1)', background: 'var(--surface-2)', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--bad)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <i className="ti ti-bell"></i>Active Alarms &amp; Events — CH-01 — Centrifugal Chiller
              </div>

              {/* Alarm Items List */}
              {alarms.map((alarm) => {
                const isCritical = alarm.severity === 'Critical';
                const statusColor = isCritical ? 'var(--bad)' : 'var(--warn)';

                return (
                  <div
                    key={alarm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--line-1)',
                      transition: 'background 0.1s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = '')}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: statusColor,
                        flexShrink: 0,
                        marginTop: '4px',
                        animation: isCritical ? 'blink 1.5s infinite' : 'none',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 7px', borderRadius: '99px', background: `${statusColor}22`, color: statusColor }}>
                          {alarm.severity}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--info)' }}>{alarm.code}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-1)' }}>{alarm.title}</div>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {alarm.time}
                    </div>
                    <button
                      className="btn"
                      style={{ padding: '3px 10px', fontSize: '10px', flexShrink: 0 }}
                      onClick={() => handleAiQuery(`Analyse and recommend action for: ${alarm.title} on ${alarm.code} — Centrifugal Chiller`)}
                    >
                      <i className="ti ti-brain" style={{ color: 'var(--ai)', fontSize: '11px' }}></i> AI
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- MAINTENANCE PANEL --- */}
      {activeTab === 'maintenance' && (
        <div id="eq-tabpanel-chiller-maintenance" style={{ flex: '1 1 0%', overflowY: 'auto' }}>
          <div style={{ padding: '16px' }}>
            <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line-2)', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
              {/* Progress Bar */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-1)', background: 'var(--surface-2)' }}>
                <div style={{ background: 'var(--surface-3)', borderRadius: '99px', height: '8px', overflow: 'hidden', marginBottom: '4px' }}>
                  <div style={{ height: '100%', borderRadius: '99px', background: 'var(--bad)', width: `${completionPercentage}%`, transition: 'width 0.6s ease' }} />
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>
                  {completedCount} / {totalTasks} tasks complete · {completionPercentage}%
                </div>
              </div>

              {/* Maintenance Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line-1)' }}>
                    <th style={{ padding: '8px 14px', textAlign: 'left', fontSize: '9px', fontWeight: 600, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', background: 'var(--surface-2)', width: '32px' }}></th>
                    <th style={{ padding: '8px 8px', textAlign: 'left', fontSize: '9px', fontWeight: 600, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', background: 'var(--surface-2)' }}>Task</th>
                    <th style={{ padding: '8px 8px', textAlign: 'left', fontSize: '9px', fontWeight: 600, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', background: 'var(--surface-2)' }}>Frequency</th>
                    <th style={{ padding: '8px 8px', textAlign: 'left', fontSize: '9px', fontWeight: 600, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', background: 'var(--surface-2)' }}>Assigned To</th>
                    <th style={{ padding: '8px 14px', textAlign: 'left', fontSize: '9px', fontWeight: 600, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', background: 'var(--surface-2)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{ borderBottom: '1px solid var(--line-1)', cursor: 'pointer', transition: 'background 0.1s' }}
                      onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                      onMouseOut={(e) => (e.currentTarget.style.background = '')}
                    >
                      {/* Checkbox Icon */}
                      <td style={{ padding: '9px 14px', width: '32px' }}>
                        <div
                          style={{
                            width: '17px',
                            height: '17px',
                            borderRadius: '4px',
                            border: task.completed ? '1.5px solid var(--ok)' : '1.5px solid var(--line-3)',
                            background: task.completed ? 'var(--ok)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            color: '#fff',
                            transition: 'all 0.15s',
                          }}
                        >
                          {task.completed && <i className="ti ti-check"></i>}
                        </div>
                      </td>

                      {/* Title */}
                      <td
                        style={{
                          padding: '9px 8px',
                          fontSize: '11.5px',
                          color: task.completed ? 'var(--ink-4)' : 'var(--ink-1)',
                          textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                      >
                        {task.title}
                      </td>

                      {/* Frequency */}
                      <td style={{ padding: '9px 8px' }}>
                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600, background: 'var(--info-soft)', color: 'var(--info)' }}>
                          {task.frequency}
                        </span>
                      </td>

                      {/* Assigned To */}
                      <td style={{ padding: '9px 8px', fontSize: '10.5px', color: 'var(--ink-3)' }}>
                        {task.assignedTo}
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '9px 14px' }}>
                        {task.completed ? (
                          <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '99px', fontWeight: 600, background: 'var(--ok-soft)', color: 'var(--ok)' }}>
                            Done
                          </span>
                        ) : (
                          <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '99px', fontWeight: 600, background: 'var(--surface-3)', color: 'var(--ink-4)' }}>
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Review Button */}
            <button
              className="btn"
              style={{ padding: '7px 16px', fontSize: '11.5px' }}
              onClick={() => handleAiQuery('Review maintenance schedule for CH-01 — Centrifugal Chiller and suggest any improvements or overdue items')}
            >
              <i className="ti ti-brain" style={{ color: 'var(--ai)' }}></i> AI Review Maintenance Schedule
            </button>
          </div>
        </div>
      )}

            </div>
        </div>
    );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function ReadoutItem({ label, value, unit, color }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: 'var(--ink-4, #565973)', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>
                {label}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', color }}>
                {value}
                {unit && <span style={{ fontSize: '10px', color: 'var(--ink-3, #7a7e9d)', fontWeight: 400, marginLeft: '1px' }}>{unit}</span>}
            </div>
        </div>
    );
}

function HealthRow({ label, percentage, color }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', borderBottom: '1px solid var(--line-1, rgba(255,255,255,0.08))' }}>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-1, #e1e1e6)', width: '180px', flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, height: '5px', background: 'var(--surface-3, #363654)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '3px', background: color, width: `${percentage}%`, transition: 'width 0.6s ease' }}></div>
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', color, width: '40px', textAlign: 'right' }}>
                {percentage}%
            </div>
        </div>
    );
}

function SparklineCard({ title, unit, color, pathD }) {
    const gradientId = `grad_${title.replace(/\s+/g, '_')}`;
    return (
        <div style={{ background: 'var(--surface-1, #212130)', border: '1px solid var(--line-2, rgba(255,255,255,0.12))', borderRadius: '9px', padding: '11px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--ink-2, #a2a5b5)' }}>{title}</span>
                <span style={{ fontSize: '9.5px', fontFamily: 'var(--font-mono, monospace)', color }}>{unit}</span>
            </div>
            <svg width="100%" viewBox="0 0 200 50" preserveAspectRatio="none" style={{ height: '40px', display: 'block' }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={`${pathD} L200,50 L0,50 Z`} fill={`url(#${gradientId})`} stroke="none" />
                <path d={pathD} fill="none" stroke={color} strokeWidth="1.8" />
                <circle cx="200" cy="28" r="3" fill={color} />
            </svg>
        </div>
    );
}