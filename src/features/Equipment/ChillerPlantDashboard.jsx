import React, { useState, useRef } from 'react';
import ChillerSummaryView from './ChillerSummaryView';
import ChillerPumpsDashboard from './ChillerPumpsDashboard';
import CoolingTowerDashboard from './CoolingTowerDashboard';
import PlantHealthDashboard from './PlantHealthDashboard';
import ChillerAlarmsPanel from './ChillerAlarmsPanel';
import PlantChecklist from './PlantChecklist';

// Tab Configuration
const TABS = [
    { id: 'sld', label: 'Site SLD', icon: 'ti-sitemap' },
    { id: 'summary', label: 'Summary', icon: 'ti-table' },
    { id: 'chillers', label: 'Chillers', icon: 'ti-snowflake' },
    { id: 'pumps', label: 'Pumps', icon: 'ti-droplet-half' },
    { id: 'ct', label: 'Cooling Towers', icon: 'ti-building-factory-2' },
    { id: 'health', label: 'Performance Health', icon: 'ti-heart-rate-monitor' },
    { id: 'alarms', label: 'Alarms / Events', icon: 'ti-bell' },
    { id: 'checklist', label: 'Maintenance', icon: 'ti-checklist' },
];

export default function ChillerPlantDashboard() {
    const [activeTab, setActiveTab] = useState('sld');
    const [isEditMode, setIsEditMode] = useState(false);
    const [uploadedSld, setUploadedSld] = useState(null);
    const fileInputRef = useRef(null);

    // File Upload Handlers
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedSld(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setUploadedSld(URL.createObjectURL(file));
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-0, #08111f)', fontFamily: 'sans-serif' }}>

            {/* 1. Header Tab Bar */}
            <div
                className="ch-tabbar"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    userSelect: 'none'
                }}
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <div
                            key={tab.id}
                            className={`ch-tab ${isActive ? 'active' : ''}`}
                            id={`ch-tab-btn-${tab.id}`}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 14px',
                                fontSize: '12px',
                                color: isActive ? 'var(--info, #4ea1ff)' : 'var(--ink-3, #94a3b8)',
                                cursor: 'pointer',
                                borderBottom: isActive ? '2px solid var(--info, #4ea1ff)' : '2px solid transparent',
                                fontWeight: isActive ? 600 : 400,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <i className={`ti ${tab.icon}`} style={{ fontSize: '13px' }}></i>
                            {tab.label}
                        </div>
                    );
                })}

                {/* Right Info Tag */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px' }}>
                    <span
                        className="pill ok"
                        style={{
                            fontSize: '10.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: 'rgba(46, 213, 115, 0.15)',
                            color: '#2ed573',
                            fontWeight: 600
                        }}
                    >
                        <span className="dot ok" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ed573' }}></span>
                        2 Running
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--ink-3, #94a3b8)', fontFamily: 'var(--font-mono, monospace)' }}>
                        WCCH · Vikhroli
                    </span>
                </div>
            </div>

            {/* 2. Main Content Area */}
            {activeTab === 'sld' && (
                <div
                    className="ch-tab-panel active"
                    id="ch-panel-sld"
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        flexDirection: 'column',
                        background: 'var(--bg-0, #08111f)',
                        flex: 1
                    }}
                >
                    {/* Hidden Input for File Pick */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, application/pdf"
                        style={{ display: 'none' }}
                    />

                    {/* Canvas Drag & Drop Area */}
                    <div
                        id="ch-sld-canvas"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ position: 'absolute', inset: 0, cursor: 'default' }}
                    >
                        {uploadedSld ? (
                            <img
                                src={uploadedSld}
                                alt="Site SLD"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', pointerEvents: 'none' }}>
                                <i className="ti ti-cloud-upload" style={{ fontSize: '64px', color: 'var(--info, #4ea1ff)', opacity: 0.35 }}></i>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink-2, #e2e8f0)' }}>
                                    Upload Site SLD
                                </div>
                                <div style={{ fontSize: '11.5px', color: 'var(--ink-4, #64748b)', textAlign: 'center' }}>
                                    PNG · JPG · PDF accepted<br />Drag &amp; drop anywhere or click
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Floating Top-Left Overlay */}
                    <div
                        id="ch-sld-overlay"
                        style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}
                    >
                        <div style={{ background: 'rgba(8,17,31,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 12px', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Site SLD — Chiller Plant</span>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '1px' }}>
                                Upload your site SLD drawing · Image applies to this page only
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={() => setIsEditMode((prev) => !prev)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '6px 12px',
                                    background: isEditMode ? 'rgba(78,161,255,0.35)' : 'rgba(78,161,255,0.18)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(78,161,255,0.5)',
                                    borderRadius: '7px',
                                    color: 'var(--info, #4ea1ff)',
                                    fontSize: '11.5px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                <i className="ti ti-pencil" style={{ fontSize: '12px' }}></i>
                                {isEditMode ? 'Editing...' : 'Edit Mode'}
                            </button>
                        </div>
                    </div>
                </div>

            )}


            {activeTab === 'summary' && (
                <ChillerSummaryView />
            )}

            {activeTab === 'chillers' && (
               <div className="ch-tab-panel active" id="ch-panel-chillers">
      <div className="ch-detail-wrap">
        <div className="ch-list-panel">
          <div className="ch-list-hd">
            <i className="ti ti-snowflake" style={{ fontSize: '12px', color: 'var(--cool)' }}></i> Chiller Units
          </div>
          <div className="ch-list-scroll">
            <div className="ch-list-item active" onClick={() => window.chSelectChiller?.('CH1')}>
              <span className="dot ok" style={{ width: '7px', height: '7px', flexShrink: 0 }}></span>
              <div className="ch-list-item-info">
                <div className="ch-list-item-name">Chiller 1</div>
                <div className="ch-list-item-sub">CH1 · Carrier · 400kVA</div>
              </div>
              <span className="ch-run-on" style={{ fontSize: '10px', padding: '2px 7px' }}>On</span>
            </div>
            <div className="ch-list-item" onClick={() => window.chSelectChiller?.('CH2')}>
              <span className="dot bad" style={{ width: '7px', height: '7px', flexShrink: 0 }}></span>
              <div className="ch-list-item-info">
                <div className="ch-list-item-name">Chiller 2</div>
                <div className="ch-list-item-sub">CH2 · Carrier · 400kVA</div>
              </div>
              <span className="ch-run-off" style={{ fontSize: '10px', padding: '2px 7px' }}>Off</span>
            </div>
            <div className="ch-list-item" onClick={() => window.chSelectChiller?.('CH3')}>
              <span className="dot ok" style={{ width: '7px', height: '7px', flexShrink: 0 }}></span>
              <div className="ch-list-item-info">
                <div className="ch-list-item-name">Chiller 3</div>
                <div className="ch-list-item-sub">CH3 · Trane · 350kVA</div>
              </div>
              <span className="ch-run-on" style={{ fontSize: '10px', padding: '2px 7px' }}>On</span>
            </div>
            <div className="ch-list-item" onClick={() => window.chSelectChiller?.('CH4')}>
              <span className="dot bad" style={{ width: '7px', height: '7px', flexShrink: 0 }}></span>
              <div className="ch-list-item-info">
                <div className="ch-list-item-name">Chiller 4</div>
                <div className="ch-list-item-sub">CH4 · York · 500kVA</div>
              </div>
              <span className="ch-run-off" style={{ fontSize: '10px', padding: '2px 7px' }}>Off</span>
            </div>
          </div>
        </div>

        <div className="ch-detail-panel" id="ch-detail-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink-0)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="dot ok" style={{ width: '9px', height: '9px' }}></span>Water Cooled Chiller 1
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '3px', fontFamily: 'var(--font-mono)' }}>
                CH1 · Carrier 30XAB-400 · 400kVA · 09 May 2026
              </div>
            </div>
            <div style={{ display: 'flex', gap: '7px' }}>
              <button className="btn" style={{ padding: '5px 11px', fontSize: '11px' }} onClick={() => window.aiQuery?.('Full analysis and recommendations for chiller Water Cooled Chiller 1')}>
                <i className="ti ti-brain" style={{ color: 'var(--ai)' }}></i>AI Analyse
              </button>
              <button className="btn primary" style={{ padding: '5px 11px', fontSize: '11px' }} onClick={() => window.openAddSchedule?.('CH1')}>
                <i className="ti ti-calendar-plus"></i>Schedule
              </button>
            </div>
          </div>

          <div className="ch-detail-hero" style={{ marginBottom: '14px' }}>
            <div className="ch-photo-card">
              <div style={{ padding: '9px 13px', borderBottom: '1px solid var(--line-1)', background: 'var(--surface-2)', fontSize: '10px', fontWeight: 600, color: 'var(--info)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><i className="ti ti-photo"></i> Equipment Photo · CH1</span>
              </div>
              <div
                className="ch-sld-upload"
                id="ch-photo-zone-CH1"
                style={{ minHeight: '260px', position: 'relative', cursor: 'pointer' }}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                onDragLeave={(e) => { e.currentTarget.classList.remove('drag-over'); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('drag-over');
                  if (e.dataTransfer.files?.[0]) {
                    window.chHandlePhoto?.(e.dataTransfer.files[0], 'ch:CH1');
                  }
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && window.chHandlePhoto?.(e.target.files[0], 'ch:CH1')}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 3, width: '100%', height: '100%' }}
                />
                <div className="ch-sld-ph">
                  <i className="ti ti-photo-up"></i>
                  <div className="ch-sld-ph-title">Upload Chiller Photo</div>
                  <div className="ch-sld-ph-hint">PNG · JPG accepted<br />Drag &amp; drop or click</div>
                </div>
              </div>
            </div>

            <div className="v1-section">
              <div className="v1-section-title">
                <div className="v1-section-title-l info">
                  <i className="ti ti-activity"></i>Live Parameters
                </div>
                <span style={{ fontSize: '9.5px', color: 'var(--ok)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="dot ok" style={{ width: '6px', height: '6px' }}></span>Live
                </span>
              </div>
              <div className="ch-info-grid">
                <div className="ch-info-cell">
                  <div className="ch-info-k">Evp Leaving Temp</div>
                  <div className="ch-info-v" style={{ color: 'var(--cool)' }}>7.2 °C</div>
                  <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '2px' }}>setpoint 7°C</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Con Entering Temp</div>
                  <div className="ch-info-v" style={{ color: 'var(--hot)' }}>33.4 °C</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Con Leaving Temp</div>
                  <div className="ch-info-v" style={{ color: 'var(--hot)' }}>37.3 °C</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Evp Sat Temp</div>
                  <div className="ch-info-v" style={{ color: 'var(--cool)' }}>16 °C</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Discharge Pr</div>
                  <div className="ch-info-v" style={{ color: 'var(--violet)' }}>524 kPa</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Suction Pr</div>
                  <div className="ch-info-v" style={{ color: 'var(--ink-1)' }}>404 kPa</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Power Draw</div>
                  <div className="ch-info-v" style={{ color: 'var(--warn)' }}>877.8 kW</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">COP</div>
                  <div className="ch-info-v" style={{ color: 'var(--ok)' }}>6.2</div>
                  <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '2px' }}>Above target (6.0)</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Load</div>
                  <div className="ch-info-v" style={{ color: 'var(--ink-1)' }}>62 %</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Voltage L-L</div>
                  <div className="ch-info-v" style={{ color: 'var(--ink-0)' }}>392 V</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Set Point</div>
                  <div className="ch-info-v" style={{ color: 'var(--info)' }}>7 °C</div>
                </div>
                <div className="ch-info-cell">
                  <div className="ch-info-k">Run Hours</div>
                  <div className="ch-info-v" style={{ color: 'var(--ink-1)' }}>2456 h</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ahu-controls-row" style={{ marginBottom: '14px' }}>
            <div className="ahu-ctrl-group">
              <span className="ahu-ctrl-label">Run Command</span>
              <div className="ahu-cmd-wrap cmd-on" id="ch-cmd-CH1">
                <select onChange={(e) => window.chSendCmd?.('CH1', e.target.value, e.target)} defaultValue="ON">
                  <option value="ON">ON</option>
                  <option value="OFF">OFF</option>
                </select>
                <span className="ahu-cmd-arrow">▾</span>
              </div>
            </div>
            <div className="ahu-ctrl-group">
              <span className="ahu-ctrl-label">EVP Set Point</span>
              <div className="ahu-settemp-wrap" id="ch-sp-CH1">
                <input
                  type="number"
                  id="ch-sp-inp-CH1"
                  defaultValue="7"
                  min="4"
                  max="16"
                  step="0.5"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.chSendSP?.('CH1', e.currentTarget.value, e.currentTarget);
                    }
                  }}
                />
                <span className="ahu-settemp-unit">°C</span>
                <span
                  className="ahu-settemp-send"
                  onClick={() => {
                    const inp = document.getElementById('ch-sp-inp-CH1');
                    if (inp) window.chSendSP?.('CH1', inp.value, inp);
                  }}
                >
                  <i className="ti ti-send"></i>
                </span>
              </div>
            </div>
            <div className="ahu-ctrl-group">
              <span className="ahu-ctrl-label">Auto / Manual</span>
              <span className="ahu-badge-auto">Auto</span>
            </div>
            <div className="ahu-ctrl-group">
              <span className="ahu-ctrl-label">Trip Status</span>
              <span className="ahu-badge-normal">Normal</span>
            </div>
            <div className="ahu-ctrl-group">
              <span className="ahu-ctrl-label">Compressor Speed</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-1)' }}>3550 RPM</span>
            </div>
            <div className="ahu-ctrl-group">
              <span className="ahu-ctrl-label">Oil Pressure</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ok)' }}>3.2 bar</span>
            </div>
            <div className="ahu-ctrl-group" style={{ marginLeft: 'auto' }}>
              <span className="ahu-ctrl-label">Run Status</span>
              <span className="ch-run-on">On</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div className="v1-section">
              <div className="v1-section-title">
                <div className="v1-section-title-l cool">
                  <i className="ti ti-temperature"></i>Refrigeration Cycle
                </div>
              </div>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>CHW Loop</div>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-4)' }}>Supply</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cool)' }}>7.2°C</div>
                  </div>
                  <div style={{ width: '1px', background: 'var(--line-1)' }}></div>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-4)' }}>Return</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--hot)' }}>12.7°C</div>
                  </div>
                  <div style={{ width: '1px', background: 'var(--line-1)' }}></div>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-4)' }}>Approach ΔT</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ok)' }}>0.2 K</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '10px 14px' }}>
                <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Condenser Water</div>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-4)' }}>In</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--hot)' }}>33.4°C</div>
                  </div>
                  <div style={{ width: '1px', background: 'var(--line-1)' }}></div>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-4)' }}>Out</div>
                    <div style={{ fontSize: '18px', fontWeight :"700", fontFamily: 'var(--font-mono)', color: 'var(--bad)' }}>37.3°C</div>
                  </div>
                  <div style={{ width: '1px', background: 'var(--line-1)' }}></div>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-4)' }}>Range ΔT</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ok)' }}>3.9 K</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="v1-section">
              <div className="v1-section-title">
                <div className="v1-section-title-l ok">
                  <i className="ti ti-heart-rate-monitor"></i>Component Health
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', width: '150px', flexShrink: 0 }}>Compressor</div>
                <div style={{ flex: 1, height: '5px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: 'var(--ok)', width: '92%', transition: 'width 0.6s ease' }}></div>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ok)', width: '58px', textAlign: 'right' }}>92 %</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', width: '150px', flexShrink: 0 }}>Condenser Fan</div>
                <div style={{ flex: 1, height: '5px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: 'var(--ok)', width: '96%', transition: 'width 0.6s ease' }}></div>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ok)', width: '58px', textAlign: 'right' }}>96 %</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', width: '150px', flexShrink: 0 }}>Evaporator Pump</div>
                <div style={{ flex: 1, height: '5px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: 'var(--ok)', width: '94%', transition: 'width 0.6s ease' }}></div>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ok)', width: '58px', textAlign: 'right' }}>94 %</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', width: '150px', flexShrink: 0 }}>Control Valve</div>
                <div style={{ flex: 1, height: '5px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: 'var(--info)', width: '78%', transition: 'width 0.6s ease' }}></div>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--info)', width: '58px', textAlign: 'right' }}>78 %</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 14px', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', width: '150px', flexShrink: 0 }}>Refrigerant Charge</div>
                <div style={{ flex: 1, height: '5px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: 'var(--ok)', width: '97%', transition: 'width 0.6s ease' }}></div>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ok)', width: '58px', textAlign: 'right' }}>97 %</div>
              </div>
            </div>

            <div className="v1-section">
              <div className="v1-section-title">
                <div className="v1-section-title-l ok">
                  <i className="ti ti-bell"></i>Active Alarms
                </div>
              </div>
              <div style={{ padding: '20px 14px', textAlign: 'center', color: 'var(--ok)', fontSize: '11.5px' }}>
                <i className="ti ti-circle-check" style={{ fontSize: '20px', display: 'block', margin: '0 auto 6px' }}></i>No active alarms
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '14px' }}>
            <div className="ch-sum-kpi warn">
              <div className="ch-sum-kpi-l">Energy Today</div>
              <div className="ch-sum-kpi-v" style={{ color: 'var(--warn)' }}>
                7.5<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--ink-3)', marginLeft: '3px' }}>MWh</span>
              </div>
              <div className="ch-sum-kpi-sub">≈ ₹74 cost</div>
            </div>
            <div className="ch-sum-kpi ok">
              <div className="ch-sum-kpi-l">COP vs Target</div>
              <div className="ch-sum-kpi-v" style={{ color: 'var(--ok)' }}>
                6.2<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--ink-3)', marginLeft: '3px' }}>/ 6.0</span>
              </div>
              <div className="ch-sum-kpi-sub">Above target (6.0)</div>
            </div>
            <div className="ch-sum-kpi ok">
              <div className="ch-sum-kpi-l">Load Factor</div>
              <div className="ch-sum-kpi-v" style={{ color: 'var(--ok)' }}>
                62 %<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--ink-3)', marginLeft: '3px' }}></span>
              </div>
              <div className="ch-sum-kpi-sub">Within normal range</div>
            </div>
            <div className="ch-sum-kpi info">
              <div className="ch-sum-kpi-l">Run Hours (Total)</div>
              <div className="ch-sum-kpi-v" style={{ color: 'var(--ink-1)' }}>
                2456<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--ink-3)', marginLeft: '3px' }}>h</span>
              </div>
              <div className="ch-sum-kpi-sub">since last service</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-1)' }}>
                <i className="ti ti-trending-up" style={{ color: 'var(--info)', marginRight: '6px' }}></i>Trend Analytics — Last 24 Hours
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {['1H', '6H', '24H', '7D', '30D'].map((time, idx) => (
                  <span
                    key={time}
                    style={
                      idx === 0
                        ? { padding: '3px 9px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer', background: 'var(--info-soft)', color: 'var(--info)', fontWeight: 600 }
                        : { padding: '3px 9px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer', background: 'var(--surface-2)', color: 'var(--ink-3)' }
                    }
                    onClick={(e) => {
                      const parent = e.currentTarget.parentNode;
                      if (parent) {
                        parent.querySelectorAll('span').forEach((s) => {
                          s.style.cssText = 'padding:3px 9px;border-radius:5px;font-size:10px;cursor:pointer;background:var(--surface-2);color:var(--ink-3)';
                        });
                      }
                      e.currentTarget.style.cssText = 'padding:3px 9px;border-radius:5px;font-size:10px;cursor:pointer;background:var(--info-soft);color:var(--info);font-weight:600';
                    }}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">CHW Supply Temp</div>
                  <div className="v1-trend-val" style={{ color: '#34D2E6' }}>
                    7.2°C<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>°C</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsCHWSupplyTempCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D2E6" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#34D2E6" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,26 L20,24 L40,28 L60,22 L80,26 L100,22 L120,20 L140,24 L160,22 L180,25 L200,23 L200,55 L0,55 Z" fill="url(#chsCHWSupplyTempCH1)" stroke="none"></path>
                  <path d="M0,26 L20,24 L40,28 L60,22 L80,26 L100,22 L120,20 L140,24 L160,22 L180,25 L200,23" fill="none" stroke="#34D2E6" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#34D2E6"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Evaporator leaving water</div>
              </div>

              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">CHW Return Temp</div>
                  <div className="v1-trend-val" style={{ color: '#FF8A4C' }}>
                    12.7<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>°C</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsCHWReturnTempCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF8A4C" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#FF8A4C" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,18 L20,16 L40,20 L60,18 L80,22 L100,20 L120,18 L140,20 L160,22 L180,20 L200,18 L200,55 L0,55 Z" fill="url(#chsCHWReturnTempCH1)" stroke="none"></path>
                  <path d="M0,18 L20,16 L40,20 L60,18 L80,22 L100,20 L120,18 L140,20 L160,22 L180,20 L200,18" fill="none" stroke="#FF8A4C" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#FF8A4C"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Evaporator entering water</div>
              </div>

              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">Condenser Water In</div>
                  <div className="v1-trend-val" style={{ color: '#F25B5B' }}>
                    33.4°C<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>°C</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsCondenserWaterInCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F25B5B" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#F25B5B" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,20 L20,22 L40,21 L60,24 L80,22 L100,23 L120,21 L140,24 L160,22 L180,23 L200,22 L200,55 L0,55 Z" fill="url(#chsCondenserWaterInCH1)" stroke="none"></path>
                  <path d="M0,20 L20,22 L40,21 L60,24 L80,22 L100,23 L120,21 L140,24 L160,22 L180,23 L200,22" fill="none" stroke="#F25B5B" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#F25B5B"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Cooling tower supply</div>
              </div>

              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">Condenser Water Out</div>
                  <div className="v1-trend-val" style={{ color: '#9B6CFF' }}>
                    37.3°C<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>°C</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsCondenserWaterOutCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9B6CFF" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#9B6CFF" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,28 L20,26 L40,30 L60,27 L80,29 L100,27 L120,30 L140,28 L160,26 L180,28 L200,27 L200,55 L0,55 Z" fill="url(#chsCondenserWaterOutCH1)" stroke="none"></path>
                  <path d="M0,28 L20,26 L40,30 L60,27 L80,29 L100,27 L120,30 L140,28 L160,26 L180,28 L200,27" fill="none" stroke="#9B6CFF" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#9B6CFF"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Cooling tower return</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">Compressor Power</div>
                  <div className="v1-trend-val" style={{ color: '#F5B441' }}>
                    877.8 kW<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>kW</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsCompressorPowerCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5B441" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#F5B441" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,32 L20,30 L40,28 L60,24 L80,26 L100,28 L120,24 L140,22 L160,26 L180,24 L200,22 L200,55 L0,55 Z" fill="url(#chsCompressorPowerCH1)" stroke="none"></path>
                  <path d="M0,32 L20,30 L40,28 L60,24 L80,26 L100,28 L120,24 L140,22 L160,26 L180,24 L200,22" fill="none" stroke="#F5B441" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#F5B441"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Shaft input power</div>
              </div>

              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">COP</div>
                  <div className="v1-trend-val" style={{ color: '#22D67A' }}>
                    6.2<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}></span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsCOPCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D67A" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#22D67A" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,22 L20,20 L40,24 L60,22 L80,18 L100,22 L120,20 L140,22 L160,18 L180,20 L200,22 L200,55 L0,55 Z" fill="url(#chsCOPCH1)" stroke="none"></path>
                  <path d="M0,22 L20,20 L40,24 L60,22 L80,18 L100,22 L120,20 L140,22 L160,18 L180,20 L200,22" fill="none" stroke="#22D67A" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#22D67A"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Coefficient of performance</div>
              </div>

              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">Load Factor</div>
                  <div className="v1-trend-val" style={{ color: '#4EA1FF' }}>
                    62 %<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>%</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsLoadFactorCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4EA1FF" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#4EA1FF" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,24 L20,26 L40,22 L60,28 L80,25 L100,27 L120,24 L140,26 L160,23 L180,25 L200,24 L200,55 L0,55 Z" fill="url(#chsLoadFactorCH1)" stroke="none"></path>
                  <path d="M0,24 L20,26 L40,22 L60,28 L80,25 L100,27 L120,24 L140,26 L160,23 L180,25 L200,24" fill="none" stroke="#4EA1FF" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#4EA1FF"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Percent of rated capacity</div>
              </div>

              <div className="v1-trend-card">
                <div className="v1-trend-hd">
                  <div className="v1-trend-name">Discharge Pressure</div>
                  <div className="v1-trend-val" style={{ color: '#E371C9' }}>
                    524 kPa<span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginLeft: '2px' }}>kPa</span>
                  </div>
                </div>
                <svg width="100%" viewBox="0 0 200 55" preserveAspectRatio="none" style={{ height: '52px' }}>
                  <defs>
                    <linearGradient id="chsDischargePressureCH1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E371C9" stopOpacity="0.22"></stop>
                      <stop offset="100%" stopColor="#E371C9" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,25 L20,28 L40,26 L60,30 L80,27 L100,29 L120,26 L140,28 L160,25 L180,27 L200,26 L200,55 L0,55 Z" fill="url(#chsDischargePressureCH1)" stroke="none"></path>
                  <path d="M0,25 L20,28 L40,26 L60,30 L80,27 L100,29 L120,26 L140,28 L160,25 L180,27 L200,26" fill="none" stroke="#E371C9" strokeWidth="1.7"></path>
                  <circle cx="200" cy="30" r="2.5" fill="#E371C9"></circle>
                </svg>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-4)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>High-side refrigerant pressure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            )}


             {activeTab === 'pumps' && (
                <ChillerPumpsDashboard />
            )}

             {activeTab === 'ct' && (
                <CoolingTowerDashboard />
            )}
             {activeTab === 'health' && (
                <PlantHealthDashboard />
            )}
              {activeTab === 'alarms' && (
                <ChillerAlarmsPanel />
            )}
             {activeTab === 'checklist' && (
                <PlantChecklist />
            )}

        </div>
    );
}