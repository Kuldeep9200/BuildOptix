import React from 'react';
import '../App.css';

export default function Sidebar({ isCollapsed, setIsCollapsed, activePage, onNavigate, openGroups, toggleGroup }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .sidebar-scroll { flex: 1; overflow-y: auto; padding: 12px 0; }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }

        .sb-group-h { display: flex; align-items: center; padding: 14px 20px; cursor: pointer; color: var(--tx-main); font-size: 14px; font-weight: 600; transition: background 0.2s; }
        .sb-group-h:hover { background-color: var(--bg-hover); }
        .sb-group-h > i:first-child { font-size: 18px; margin-right: 14px; color: #cbd5e1; min-width: 20px; display: inline-flex; justify-content: center; }

        .sb-group-items { max-height: 0; overflow: hidden; transition: max-height 0.25s cubic-bezier(0, 0, 0.2, 1); background-color: #03070c; }
        .sb-group-items.show { max-height: 1000px; } /* Increased to fit longer groups */

        .nav-badge { margin-left: auto; padding: 1px 6px; font-size: 11px; border-radius: 10px; font-weight: bold; }
        .nav-badge.bad { background-color: var(--bad); color: #fff; }
        .nav-badge.warn { background-color: var(--warn); color: #000; }

        .sidebar.collapsed .nav-tx,
        .sidebar.collapsed .chev,
        .sidebar.collapsed .nav-badge,
        .sidebar.collapsed .sb-section-l,
        .sidebar.collapsed .sb-group-items { display: none !important; }

        .sidebar.collapsed .sb-group-h { justify-content: center; padding: 14px 0; }
        .sidebar.collapsed .sb-group-h > i:first-child { margin-right: 0; }

        .sb-collapse { padding: 16px; border-top: 1px solid #111d32; display: flex; justify-content: flex-end; color: #475569; cursor: pointer; transition: color 0.2s; }
        .sb-collapse:hover { color: var(--tx-main); }
        .sidebar.collapsed .sb-collapse { justify-content: center; }
      `}} />

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar" aria-label="Main navigation" style={{ display: 'flex' }}>
        <div className="sidebar-scroll">
          
          {/* ════ DASHBOARD MODULE ════ */}
          <div className={`sb-group ${openGroups.dashboard ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('dashboard')} 
              tabIndex={0} 
              role="button" 
              aria-label="Dashboard menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('dashboard'); }}
            >
              <i className="ti ti-layout-dashboard" aria-hidden="true"></i>
              <span className="nav-tx">Dashboard</span>
              <i className={`ti ti-chevron-down chev ${openGroups.dashboard ? 'open' : ''}`} aria-hidden="true"></i>
            </div>
            <div className={`sb-group-items ${openGroups.dashboard ? 'show' : ''}`}>
              <div 
                className={`nav-item ${activePage === 'central' ? 'active' : ''}`} 
                onClick={() => onNavigate('central')} 
                tabIndex={0} 
                role="menuitem" 
                aria-label="Central Dashboard"
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('central'); }}
              >
                <i className="ti ti-layout-grid" aria-hidden="true"></i>
                <span className="nav-tx">Central Dashboard</span>
              </div>
              <div 
                className={`nav-item ${activePage === 'command' ? 'active' : ''}`} 
                onClick={() => onNavigate('command')} 
                tabIndex={0} 
                role="menuitem" 
                aria-label="Command Centre"
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('command'); }}
              >
                <i className="ti ti-terminal" aria-hidden="true"></i>
                <span className="nav-tx">Command Centre</span>
              </div>
              <div 
                className={`nav-item ${activePage === 'site' ? 'active' : ''}`} 
                onClick={() => onNavigate('site')} 
                tabIndex={0} 
                role="menuitem" 
                aria-label="Site — Vikhroli"
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('site'); }}
              >
                <i className="ti ti-building" aria-hidden="true"></i>
                <span className="nav-tx">Site — Vikhroli</span>
              </div>
            </div>
          </div>

          {/* ── GOC module (hidden by default as per original inline style) ── */}
          <div className={`nav-item ${activePage === 'goc-watch' ? 'active' : ''}`} data-module="goc" data-page="goc" onClick={() => onNavigate('goc-watch')} tabIndex={0} role="menuitem" aria-label="Watch Floor" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('goc-watch'); }} style={{ display: 'none' }}><i className="ti ti-layout-dashboard" aria-hidden="true"></i><span className="nav-tx">Watch Floor</span><span className="nav-badge" style={{ background: 'var(--bad)', color: '#fff' }} aria-label="3 sites need attention">3</span></div>
          <div className={`nav-item ${activePage === 'goc-mon' ? 'active' : ''}`} data-module="goc" data-page="goc" onClick={() => onNavigate('goc-mon')} tabIndex={0} role="menuitem" aria-label="Site Monitoring" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('goc-mon'); }} style={{ display: 'none' }}><i className="ti ti-building-broadcast-tower" aria-hidden="true"></i><span className="nav-tx">Site Monitoring</span></div>
          <div className={`nav-item ${activePage === 'goc-net' ? 'active' : ''}`} data-module="goc" data-page="goc" onClick={() => onNavigate('goc-net')} tabIndex={0} role="menuitem" aria-label="Network &amp; Devices" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('goc-net'); }} style={{ display: 'none' }}><i className="ti ti-affiliate" aria-hidden="true"></i><span className="nav-tx">Network &amp; Devices</span></div>
          <div className={`nav-item ${activePage === 'goc-alarms' ? 'active' : ''}`} data-module="goc" data-page="goc" onClick={() => onNavigate('goc-alarms')} tabIndex={0} role="menuitem" aria-label="Alarms &amp; Events" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('goc-alarms'); }} style={{ display: 'none' }}><i className="ti ti-bell" aria-hidden="true"></i><span className="nav-tx">Alarms &amp; Events</span></div>
          <div className={`nav-item ${activePage === 'goc-sla' ? 'active' : ''}`} data-module="goc" data-page="goc" onClick={() => onNavigate('goc-sla')} tabIndex={0} role="menuitem" aria-label="Incidents &amp; SLA" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('goc-sla'); }} style={{ display: 'none' }}><i className="ti ti-clipboard-check" aria-hidden="true"></i><span className="nav-tx">Incidents &amp; SLA</span></div>
          <div className={`nav-item ${activePage === 'goc-analytics' ? 'active' : ''}`} data-module="goc" data-page="goc" onClick={() => onNavigate('goc-analytics')} tabIndex={0} role="menuitem" aria-label="Analytics" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('goc-analytics'); }} style={{ display: 'none' }}><i className="ti ti-chart-line" aria-hidden="true"></i><span className="nav-tx">Analytics</span></div>
          <div className={`nav-item ${activePage === 'remoteops' ? 'active' : ''}`} data-module="goc" data-page="remoteops" onClick={() => onNavigate('remoteops')} tabIndex={0} role="menuitem" aria-label="Remote Console" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('remoteops'); }} style={{ display: 'none' }}><i className="ti ti-device-desktop-analytics" aria-hidden="true"></i><span className="nav-tx">Remote Console</span></div>
          <div className={`nav-item ${activePage === 'devices' ? 'active' : ''}`} data-module="goc" data-page="devices" onClick={() => onNavigate('devices')} tabIndex={0} role="menuitem" aria-label="Device Fleet" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('devices'); }} style={{ display: 'none' }}><i className="ti ti-router" aria-hidden="true"></i><span className="nav-tx">Device Fleet</span><span className="nav-badge" id="nav-devices-badge" style={{ background: 'var(--bad)', color: 'rgb(255, 255, 255)', display: 'inline-flex' }}>3</span></div>

          {/* ── AI Intelligence ── */}
          <div className={`sb-group ${openGroups.ai ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('ai')} 
              tabIndex={0} 
              role="button" 
              aria-label="AI Intelligence menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('ai'); }}
            >
              <i className="ti ti-sparkles" aria-hidden="true"></i>
              <span className="nav-tx">AI Intelligence</span>
              <i className={`ti ti-chevron-down chev ${openGroups.ai ? 'open' : ''}`} aria-hidden="true"></i>
            </div>
            <div className={`sb-group-items ${openGroups.ai ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'ai-summary' ? 'active' : ''}`} onClick={() => onNavigate('ai-summary')} tabIndex={0} role="menuitem" aria-label="AI Summary" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('ai-summary'); }}><i className="ti ti-sparkles" aria-hidden="true"></i><span className="nav-tx">AI Summary</span></div>
              <div className={`nav-item ${activePage === 'predictive-risk' ? 'active' : ''}`} onClick={() => onNavigate('predictive-risk')} tabIndex={0} role="menuitem" aria-label="Predictive Risk" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('predictive-risk'); }}><i className="ti ti-chart-dots" aria-hidden="true"></i><span className="nav-tx">Predictive Risk</span></div>
              <div className={`nav-item ${activePage === 'root-cause' ? 'active' : ''}`} onClick={() => onNavigate('root-cause')} tabIndex={0} role="menuitem" aria-label="Root Cause" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('root-cause'); }}><i className="ti ti-git-merge" aria-hidden="true"></i><span className="nav-tx">Root Cause</span></div>
              <div className={`nav-item ${activePage === 'optimisation' ? 'active' : ''}`} onClick={() => onNavigate('optimisation')} tabIndex={0} role="menuitem" aria-label="Optimisation" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('optimisation'); }}><i className="ti ti-bolt" aria-hidden="true"></i><span className="nav-tx">Optimisation</span></div>
              <div className={`nav-item ${activePage === 'ai-timeline' ? 'active' : ''}`} onClick={() => onNavigate('ai-timeline')} tabIndex={0} role="menuitem" aria-label="AI Timeline" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('ai-timeline'); }}><i className="ti ti-timeline" aria-hidden="true"></i><span className="nav-tx">AI Timeline</span></div>
              <div className={`nav-item ${activePage === 'maintenance' ? 'active' : ''}`} onClick={() => onNavigate('maintenance')} tabIndex={0} role="menuitem" aria-label="Maintenance Recommendations" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('maintenance'); }}><i className="ti ti-tool" aria-hidden="true"></i><span className="nav-tx">Maintenance</span></div>
            </div>
          </div>

          {/* ── OPERATIONS group ── */}
          <div className={`sb-group ${openGroups.operations ? 'rail-active' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('operations')} 
              tabIndex={0} 
              role="button" 
              aria-label="Operations menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('operations'); }}
            >
              <i className="ti ti-clipboard-list" aria-hidden="true"></i>
              <span className="nav-tx">Operations</span>
              <i className={`ti ti-chevron-down chev ${openGroups.operations ? 'open' : ''}`} aria-hidden="true"></i>
              <span className="rail-dot"></span>
            </div>
            <div className={`sb-group-items ${openGroups.operations ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'energy' ? 'active' : ''}`} onClick={() => onNavigate('energy')} tabIndex={0} role="menuitem" aria-label="Energy &amp; Utilities" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('energy'); }}><i className="ti ti-bolt" aria-hidden="true"></i><span className="nav-tx">Energy &amp; Utilities</span></div>
              <div className={`nav-item ${activePage === 'assets' ? 'active' : ''}`} onClick={() => onNavigate('assets')} tabIndex={0} role="menuitem" aria-label="Asset Health" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('assets'); }}><i className="ti ti-tool" aria-hidden="true"></i><span className="nav-tx">Asset Health</span><span className="nav-badge" aria-label="2 alerts">2</span></div>
              <div className={`nav-item ${activePage === 'space' ? 'active' : ''}`} onClick={() => onNavigate('space')} tabIndex={0} role="menuitem" aria-label="Space Utilisation" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('space'); }}><i className="ti ti-map" aria-hidden="true"></i><span className="nav-tx">Space Utilisation</span></div>
            </div>
          </div>

          {/* ── MAINTENANCE & SERVICE group ── */}
          <div className={`sb-group ${openGroups.maintenanceService ? 'rail-active' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('maintenanceService')} 
              tabIndex={0} 
              role="button" 
              aria-label="Maintenance &amp; Service menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('maintenanceService'); }}
            >
              <i className="ti ti-ticket" aria-hidden="true"></i>
              <span className="nav-tx">Maintenance &amp; Service</span>
              <i className={`ti ti-chevron-down chev ${openGroups.maintenanceService ? 'open' : ''}`} aria-hidden="true"></i>
              <span className="rail-dot"></span>
            </div>
            <div className={`sb-group-items ${openGroups.maintenanceService ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'servicedesk' ? 'active' : ''}`} onClick={() => onNavigate('servicedesk')} tabIndex={0} role="menuitem" aria-label="Service Desk" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('servicedesk'); }}><i className="ti ti-headset" aria-hidden="true"></i><span className="nav-tx">Service Desk</span><span className="nav-badge" id="nav-sd-badge" style={{ background: 'var(--info)', color: 'rgb(255, 255, 255)', display: 'inline-flex' }}>10</span></div>
              <div className={`nav-item ${activePage === 'complaints' ? 'active' : ''}`} onClick={() => onNavigate('complaints')} tabIndex={0} role="menuitem" aria-label="Complaints &amp; FM" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('complaints'); }}><i className="ti ti-message-2" aria-hidden="true"></i><span className="nav-tx">Complaints &amp; FM</span><span className="nav-badge" aria-label="5 open">5</span></div>
              <div className={`nav-item ${activePage === 'sla' ? 'active' : ''}`} onClick={() => onNavigate('sla')} tabIndex={0} role="menuitem" aria-label="SLA Tracker" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('sla'); }}><i className="ti ti-clipboard-check" aria-hidden="true"></i><span className="nav-tx">SLA Tracker</span></div>
              <div className={`nav-item ${activePage === 'vendor' ? 'active' : ''}`} onClick={() => onNavigate('vendor')} tabIndex={0} role="menuitem" aria-label="Vendor Management" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('vendor'); }}><i className="ti ti-briefcase" aria-hidden="true"></i><span className="nav-tx">Vendor Management</span></div>
            </div>
          </div>

          {/* ── MONITORING & DIAGNOSTICS group ── */}
          <div className={`sb-group ${openGroups.monitoringDiagnostics ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('monitoringDiagnostics')} 
              tabIndex={0} 
              role="button" 
              aria-label="Monitoring &amp; Diagnostics menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('monitoringDiagnostics'); }}
            >
              <i className="ti ti-activity-heartbeat" aria-hidden="true"></i>
              <span className="nav-tx">Monitoring &amp; Diagnostics</span>
              <i className={`ti ti-chevron-down chev ${openGroups.monitoringDiagnostics ? 'open' : ''}`} aria-hidden="true"></i>
              <span className="rail-dot"></span>
            </div>
            <div className={`sb-group-items ${openGroups.monitoringDiagnostics ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'alerts' ? 'active' : ''}`} onClick={() => onNavigate('alerts')} tabIndex={0} role="menuitem" aria-label="Alerts" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('alerts'); }}><i className="ti ti-alert-triangle" aria-hidden="true"></i><span className="nav-tx">Alerts</span><span className="nav-badge" style={{ background: 'var(--bad)', color: '#fff' }} aria-label="7 active">7</span></div>
              <div className={`nav-item ${activePage === 'anomalies' ? 'active' : ''}`} onClick={() => onNavigate('anomalies')} tabIndex={0} role="menuitem" aria-label="Anomalies" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('anomalies'); }}><i className="ti ti-scan" aria-hidden="true"></i><span className="nav-tx">Anomalies</span><span className="nav-badge" style={{ background: 'var(--warn)', color: '#000' }} aria-label="5 detected">5</span></div>
              <div className={`nav-item ${activePage === 'fdd' ? 'active' : ''}`} onClick={() => onNavigate('fdd')} tabIndex={0} role="menuitem" aria-label="Fault Detection" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('fdd'); }}><i className="ti ti-scan-eye" aria-hidden="true"></i><span className="nav-tx">Fault Detection</span><span className="nav-badge" style={{ background: 'var(--warn)', color: '#000' }} aria-label="4 faults">4</span></div>
              <div className={`nav-item ${activePage === 'syshealth' ? 'active' : ''}`} onClick={() => onNavigate('syshealth')} tabIndex={0} role="menuitem" aria-label="System Health" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('syshealth'); }}><i className="ti ti-heart-rate-monitor" aria-hidden="true"></i><span className="nav-tx">System Health</span></div>
            </div>
          </div>

          {/* ── SAFETY & COMPLIANCE group ── */}
          <div className={`sb-group ${openGroups.safetyCompliance ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('safetyCompliance')} 
              tabIndex={0} 
              role="button" 
              aria-label="Safety &amp; Compliance menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('safetyCompliance'); }}
            >
              <i className="ti ti-shield-check" aria-hidden="true"></i>
              <span className="nav-tx">Safety &amp; Compliance</span>
              <i className={`ti ti-chevron-down chev ${openGroups.safetyCompliance ? 'open' : ''}`} aria-hidden="true"></i>
              <span className="rail-dot"></span>
            </div>
            <div className={`sb-group-items ${openGroups.safetyCompliance ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'health_safety' ? 'active' : ''}`} onClick={() => onNavigate('health_safety')} tabIndex={0} role="menuitem" aria-label="Health &amp; Safety" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('health_safety'); }}><i className="ti ti-shield-heart" aria-hidden="true"></i><span className="nav-tx">Health &amp; Safety</span></div>
              <div className={`nav-item ${activePage === 'iaq' ? 'active' : ''}`} onClick={() => onNavigate('iaq')} tabIndex={0} role="menuitem" aria-label="IAQ Monitor" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('iaq'); }}><i className="ti ti-air-conditioning" aria-hidden="true"></i><span className="nav-tx">IAQ Monitor</span><span className="nav-badge" style={{ background: 'var(--warn)', color: '#000' }} aria-label="attention needed">!</span></div>
              <div className={`nav-item ${activePage === 'powerquality' ? 'active' : ''}`} onClick={() => onNavigate('powerquality')} tabIndex={0} role="menuitem" aria-label="Power Quality" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('powerquality'); }}><i className="ti ti-wave-square" aria-hidden="true"></i><span className="nav-tx">Power Quality</span></div>
              <div className={`nav-item ${activePage === 'access_control' ? 'active' : ''}`} onClick={() => onNavigate('access_control')} tabIndex={0} role="menuitem" aria-label="Access Control" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('access_control'); }}><i className="ti ti-lock" aria-hidden="true"></i><span className="nav-tx">Access Control</span></div>
              <div className={`nav-item ${activePage === 'ptw' ? 'active' : ''}`} onClick={() => onNavigate('ptw')} tabIndex={0} role="menuitem" aria-label="Permit to Work" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('ptw'); }}><i className="ti ti-file-certificate" aria-hidden="true"></i><span className="nav-tx">Permit to Work</span></div>
            </div>
          </div>

          {/* ── REPORTS & RECORDS group ── */}
          <div className={`sb-group ${openGroups.reportsRecords ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('reportsRecords')} 
              tabIndex={0} 
              role="button" 
              aria-label="Reports &amp; Records menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('reportsRecords'); }}
            >
              <i className="ti ti-file-text" aria-hidden="true"></i>
              <span className="nav-tx">Reports &amp; Records</span>
              <i className={`ti ti-chevron-down chev ${openGroups.reportsRecords ? 'open' : ''}`} aria-hidden="true"></i>
            </div>
            <div className={`sb-group-items ${openGroups.reportsRecords ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'reports' ? 'active' : ''}`} onClick={() => onNavigate('reports')} tabIndex={0} role="menuitem" aria-label="Reports &amp; Bills" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('reports'); }}><i className="ti ti-file-analytics" aria-hidden="true"></i><span className="nav-tx">Reports &amp; Bills</span></div>
              <div className={`nav-item ${activePage === 'logbooks' ? 'active' : ''}`} onClick={() => onNavigate('logbooks')} tabIndex={0} role="menuitem" aria-label="Logbooks" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('logbooks'); }}><i className="ti ti-notebook" aria-hidden="true"></i><span className="nav-tx">Logbooks</span></div>
            </div>
          </div>

          {/* ── DIGITAL TWIN group ── */}
          <div className={`sb-group ${openGroups.digitalTwin ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('digitalTwin')} 
              tabIndex={0} 
              role="button" 
              aria-label="Digital Twin menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('digitalTwin'); }}
            >
              <i className="ti ti-3d-cube-sphere" aria-hidden="true"></i>
              <span className="nav-tx">Digital Twin</span>
              <i className={`ti ti-chevron-down chev ${openGroups.digitalTwin ? 'open' : ''}`} aria-hidden="true"></i>
            </div>
            <div className={`sb-group-items ${openGroups.digitalTwin ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'dtbuilding' ? 'active' : ''}`} onClick={() => onNavigate('dtbuilding')} tabIndex={0} role="menuitem" aria-label="Building Twin" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('dtbuilding'); }}><i className="ti ti-building-skyscraper" aria-hidden="true"></i><span className="nav-tx">Building Twin</span></div>
              <div className={`nav-item ${activePage === 'dtfloors' ? 'active' : ''}`} onClick={() => onNavigate('dtfloors')} tabIndex={0} role="menuitem" aria-label="Floor Maps" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('dtfloors'); }}><i className="ti ti-stack-2" aria-hidden="true"></i><span className="nav-tx">Floor Maps</span></div>
              <div className={`nav-item ${activePage === 'dtequip' ? 'active' : ''}`} onClick={() => onNavigate('dtequip')} tabIndex={0} role="menuitem" aria-label="Equipment Visualization" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('dtequip'); }}><i className="ti ti-cube-3d-sphere" aria-hidden="true"></i><span className="nav-tx">Equipment Visualization</span></div>
              <div className={`nav-item ${activePage === 'dtsensors' ? 'active' : ''}`} onClick={() => onNavigate('dtsensors')} tabIndex={0} role="menuitem" aria-label="Live Sensor Overlay" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('dtsensors'); }}><i className="ti ti-broadcast" aria-hidden="true"></i><span className="nav-tx">Live Sensor Overlay</span></div>
              <div className={`nav-item ${activePage === 'dttwinworkflow' ? 'active' : ''}`} onClick={() => onNavigate('dttwinworkflow')} tabIndex={0} role="menuitem" aria-label="Twin Workflow" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('dttwinworkflow'); }}><i className="ti ti-timeline-event" aria-hidden="true"></i><span className="nav-tx">Twin Workflow</span></div>
            </div>
          </div>

          {/* ── SITE COMMISSIONING group ── */}
          <div className={`sb-group ${openGroups.siteCommissioning ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('siteCommissioning')} 
              tabIndex={0} 
              role="button" 
              aria-label="Site Commissioning menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('siteCommissioning'); }}
            >
              <i className="ti ti-building-community" aria-hidden="true"></i>
              <span className="nav-tx">Site Commissioning</span>
              <i className={`ti ti-chevron-down chev ${openGroups.siteCommissioning ? 'open' : ''}`} aria-hidden="true"></i>
            </div>
            <div className={`sb-group-items ${openGroups.siteCommissioning ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'srmsite' ? 'active' : ''}`} onClick={() => onNavigate('srmsite')} tabIndex={0} role="menuitem" aria-label="SRM University-AP" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('srmsite'); }}><i className="ti ti-building-community" aria-hidden="true"></i><span className="nav-tx">SRM University-AP</span></div>
            </div>
          </div>

          {/* ── ADMINISTRATION group ── */}
          <div className={`sb-group ${openGroups.administration ? '' : 'collapsed'}`} data-module="dashboard">
            <div 
              className="sb-group-h" 
              onClick={() => toggleGroup('administration')} 
              tabIndex={0} 
              role="button" 
              aria-label="Administration menu"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleGroup('administration'); }}
            >
              <i className="ti ti-settings-cog" aria-hidden="true"></i>
              <span className="nav-tx">Administration</span>
              <i className={`ti ti-chevron-down chev ${openGroups.administration ? 'open' : ''}`} aria-hidden="true"></i>
            </div>
            <div className={`sb-group-items ${openGroups.administration ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'adminusers' ? 'active' : ''}`} onClick={() => onNavigate('adminusers')} tabIndex={0} role="menuitem" aria-label="Users &amp; Roles" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('adminusers'); }}><i className="ti ti-users-group" aria-hidden="true"></i><span className="nav-tx">Users &amp; Roles</span></div>
              <div className={`nav-item ${activePage === 'adminsite' ? 'active' : ''}`} onClick={() => onNavigate('adminsite')} tabIndex={0} role="menuitem" aria-label="Site Configuration" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('adminsite'); }}><i className="ti ti-adjustments-cog" aria-hidden="true"></i><span className="nav-tx">Site Configuration</span></div>
              <div className={`nav-item ${activePage === 'adminbranding' ? 'active' : ''}`} onClick={() => onNavigate('adminbranding')} tabIndex={0} role="menuitem" aria-label="Application Settings" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('adminbranding'); }}><i className="ti ti-palette" aria-hidden="true"></i><span className="nav-tx">Application Settings</span></div>
              <div className={`nav-item ${activePage === 'adminintegrations' ? 'active' : ''}`} onClick={() => onNavigate('adminintegrations')} tabIndex={0} role="menuitem" aria-label="Integrations" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('adminintegrations'); }}><i className="ti ti-plug-connected" aria-hidden="true"></i><span className="nav-tx">Integrations</span></div>
              <div className={`nav-item ${activePage === 'apimanagement' ? 'active' : ''}`} onClick={() => onNavigate('apimanagement')} tabIndex={0} role="menuitem" aria-label="API Management" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('apimanagement'); }}><i className="ti ti-api" aria-hidden="true"></i><span className="nav-tx">API Management</span></div>
              <div className={`nav-item ${activePage === 'adminsecurity' ? 'active' : ''}`} onClick={() => onNavigate('adminsecurity')} tabIndex={0} role="menuitem" aria-label="Cybersecurity" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('adminsecurity'); }}><i className="ti ti-shield-lock" aria-hidden="true"></i><span className="nav-tx">Cybersecurity</span></div>
              <div className={`nav-item ${activePage === 'designsystem' ? 'active' : ''}`} onClick={() => onNavigate('designsystem')} tabIndex={0} role="menuitem" aria-label="Design Guidelines" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('designsystem'); }}><i className="ti ti-color-swatch" aria-hidden="true"></i><span className="nav-tx">Design Guidelines</span></div>
              <div className={`nav-item ${activePage === 'mobileapp' ? 'active' : ''}`} onClick={() => onNavigate('mobileapp')} tabIndex={0} role="menuitem" aria-label="Mobile App" onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('mobileapp'); }}><i className="ti ti-device-mobile" aria-hidden="true"></i><span className="nav-tx">Mobile App</span></div>
            </div>
          </div>

        </div>

        <div 
          className="sb-collapse" 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          tabIndex={0} 
          role="button" 
          aria-label="Collapse sidebar"
          onKeyDown={(e) => { if (e.key === 'Enter') setIsCollapsed(!isCollapsed); }}
        >
          <i className={`ti ${isCollapsed ? 'ti-chevrons-right' : 'ti-chevrons-left'}`} aria-hidden="true"></i>
        </div>
      </aside>
    </>
  );
}