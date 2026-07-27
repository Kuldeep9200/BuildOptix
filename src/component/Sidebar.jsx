import React, { useState } from 'react';
import '../App.css';

// Navigation Data Configuration
const NAVIGATION_CONFIG = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'ti-layout-dashboard',
    items: [
      { id: 'central', label: 'Central Dashboard', icon: 'ti-layout-grid' },
      { id: 'command', label: 'Command Centre', icon: 'ti-terminal' },
      { id: 'site', label: 'Site — Vikhroli', icon: 'ti-building' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Intelligence',
    icon: 'ti-sparkles',
    items: [
      { id: 'ai-summary', label: 'AI Summary', icon: 'ti-sparkles' },
      { id: 'predictive-risk', label: 'Predictive Risk', icon: 'ti-chart-dots' },
      { id: 'root-cause', label: 'Root Cause', icon: 'ti-git-merge' },
      { id: 'optimisation', label: 'Optimisation', icon: 'ti-bolt' },
      { id: 'ai-timeline', label: 'AI Timeline', icon: 'ti-timeline' },
      { id: 'maintenance', label: 'Maintenance', icon: 'ti-tool' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: 'ti-clipboard-list',
    items: [
      { id: 'energy', label: 'Energy & Utilities', icon: 'ti-bolt' },
      { id: 'assets', label: 'Asset Health', icon: 'ti-tool', badge: { text: '2', type: 'warn' } },
      { id: 'space', label: 'Space Utilisation', icon: 'ti-map' },
    ],
  },
  {
    id: 'maintenanceService',
    label: 'Maintenance & Service',
    icon: 'ti-ticket',
    items: [
      { id: 'servicedesk', label: 'Service Desk', icon: 'ti-headset', badge: { text: '10', type: 'info' } },
      { id: 'complaints', label: 'Complaints & FM', icon: 'ti-message-2', badge: { text: '5', type: 'warn' } },
      { id: 'sla', label: 'SLA Tracker', icon: 'ti-clipboard-check' },
      { id: 'vendor', label: 'Vendor Management', icon: 'ti-briefcase' },
    ],
  },
  {
    id: 'monitoringDiagnostics',
    label: 'Monitoring & Diagnostics',
    icon: 'ti-activity-heartbeat',
    items: [
      { id: 'alerts', label: 'Alerts', icon: 'ti-alert-triangle', badge: { text: '7', type: 'bad' } },
      { id: 'anomalies', label: 'Anomalies', icon: 'ti-scan', badge: { text: '5', type: 'warn' } },
      { id: 'fdd', label: 'Fault Detection', icon: 'ti-scan-eye', badge: { text: '4', type: 'warn' } },
      { id: 'syshealth', label: 'System Health', icon: 'ti-heart-rate-monitor' },
    ],
  },
  {
    id: 'safetyCompliance',
    label: 'Safety & Compliance',
    icon: 'ti-shield-check',
    items: [
      { id: 'health_safety', label: 'Health & Safety', icon: 'ti-shield-heart' },
      { id: 'iaq', label: 'IAQ Monitor', icon: 'ti-air-conditioning', badge: { text: '!', type: 'warn' } },
      { id: 'powerquality', label: 'Power Quality', icon: 'ti-wave-square' },
      { id: 'access_control', label: 'Access Control', icon: 'ti-lock' },
      { id: 'ptw', label: 'Permit to Work', icon: 'ti-file-certificate' },
    ],
  },
  {
    id: 'reportsRecords',
    label: 'Reports & Records',
    icon: 'ti-file-text',
    items: [
      { id: 'reports', label: 'Reports & Bills', icon: 'ti-file-analytics' },
      { id: 'logbooks', label: 'Logbooks', icon: 'ti-notebook' },
    ],
  },
  {
    id: 'digitalTwin',
    label: 'Digital Twin',
    icon: 'ti-3d-cube-sphere',
    items: [
      { id: 'dtbuilding', label: 'Building Twin', icon: 'ti-building-skyscraper' },
      { id: 'dtfloors', label: 'Floor Maps', icon: 'ti-stack-2' },
      { id: 'dtequip', label: 'Equipment Visualization', icon: 'ti-cube-3d-sphere' },
      { id: 'dtsensors', label: 'Live Sensor Overlay', icon: 'ti-broadcast' },
      { id: 'dttwinworkflow', label: 'Twin Workflow', icon: 'ti-timeline-event' },
    ],
  },
  {
    id: 'siteCommissioning',
    label: 'Site Commissioning',
    icon: 'ti-building-community',
    items: [
      { id: 'srmsite', label: 'SRM University-AP', icon: 'ti-building-community' },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    icon: 'ti-settings-cog',
    items: [
      { id: 'adminusers', label: 'Users & Roles', icon: 'ti-users-group' },
      { id: 'adminsite', label: 'Site Configuration', icon: 'ti-adjustments-cog' },
      { id: 'adminbranding', label: 'Application Settings', icon: 'ti-palette' },
      { id: 'adminintegrations', label: 'Integrations', icon: 'ti-plug-connected' },
      { id: 'apimanagement', label: 'API Management', icon: 'ti-api' },
      { id: 'adminsecurity', label: 'Cybersecurity', icon: 'ti-shield-lock' },
      { id: 'designsystem', label: 'Design Guidelines', icon: 'ti-color-swatch' },
      { id: 'mobileapp', label: 'Mobile App', icon: 'ti-device-mobile' },
    ],
  },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  activePage,
  onNavigate,
}) {
  // Accordion open/close state logic locally handled
  const [openGroups, setOpenGroups] = useState({});

  const handleKeyDown = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  // Accordion Logic: Ek khulega to bakki sab close honge
  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => {
      if (prev[groupId]) {
        return {};
      }
      return {
        [groupId]: true,
      };
    });
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .sidebar-scroll { flex: 1; overflow-y: auto; padding: 12px 0; }
          .sidebar-scroll::-webkit-scrollbar { width: 4px; }
          .sidebar-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }

          .sb-group-h {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 12px;
            cursor: pointer;
            border-radius: 8px;
            color: var(--ink-1, #cbd5e1);
            font-size: 12px;
            font-weight: 600;
            user-select: none;
            transition: background .12s;
          }
          .sb-group-h:hover { background-color: var(--bg-hover, rgba(255,255,255,0.05)); }
          .sb-group-h > i:first-child { font-size: 18px; margin-right: 14px; color: #cbd5e1; min-width: 20px; display: inline-flex; justify-content: center; }

          .sb-group-items { max-height: 0; overflow: hidden; transition: max-height 0.25s cubic-bezier(0, 0, 0.2, 1); }
          .sb-group-items.show { max-height: 1000px; }

          .chev { margin-left: auto; transition: transform 0.2s; }
          .chev.open { transform: rotate(180deg); }

          .nav-item {
            display: flex;
            align-items: center;
            padding: 8px 12px 8px 36px;
            cursor: pointer;
            font-size: 12px;
            color: #94a3b8;
            border-radius: 6px;
            transition: all 0.12s;
          }
          .nav-item:hover, .nav-item.active { color: #fff; background-color: var(--bg-hover, rgba(255,255,255,0.05)); }
          .nav-item > i { font-size: 16px; margin-right: 10px; }

          .nav-badge { margin-left: auto; padding: 1px 6px; font-size: 11px; border-radius: 10px; font-weight: bold; display: inline-flex; }
          .nav-badge.bad { background-color: var(--bad, #ef4444); color: #fff; }
          .nav-badge.warn { background-color: var(--warn, #f59e0b); color: #000; }
          .nav-badge.info { background-color: var(--info, #3b82f6); color: #fff; }

          .sidebar.collapsed .nav-tx,
          .sidebar.collapsed .chev,
          .sidebar.collapsed .nav-badge,
          .sidebar.collapsed .sb-section-l,
          .sidebar.collapsed .sb-group-items { display: none !important; }

          .sidebar.collapsed .sb-group-h { justify-content: center; padding: 14px 0; }
          .sidebar.collapsed .sb-group-h > i:first-child { margin-right: 0; }

          .sb-collapse { padding: 16px;  display: flex; justify-content: flex-end; color: #475569; cursor: pointer; transition: color 0.2s; margin-bottom: 20px; }
          .sb-collapse:hover { color: var(--tx-main, #fff); }
          .sidebar.collapsed .sb-collapse { justify-content: center; }
        `,
        }}
      />

      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
        id="sidebar"
        aria-label="Main navigation"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className="sidebar-scroll" role="menu">
          {NAVIGATION_CONFIG.map((group) => {
            const isOpen = !!openGroups[group.id];

            return (
              <div key={group.id} className={`sb-group ${isOpen ? '' : 'collapsed'}`}>
                <div
                  className="sb-group-h"
                  onClick={() => toggleGroup(group.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  aria-label={`${group.label} menu`}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleGroup(group.id))}
                >
                  <i className={`ti ${group.icon}`} aria-hidden="true"></i>
                  <span className="nav-tx">{group.label}</span>
                  <i className={`ti ti-chevron-down chev ${isOpen ? 'open' : ''}`} aria-hidden="true"></i>
                </div>

                <div className={`sb-group-items ${isOpen ? 'show' : ''}`}>
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                      onClick={() => onNavigate(item.id)}
                      tabIndex={0}
                      role="menuitem"
                      aria-label={item.label}
                      onKeyDown={(e) => handleKeyDown(e, () => onNavigate(item.id))}
                    >
                      <i className={`ti ${item.icon}`} aria-hidden="true"></i>
                      <span className="nav-tx">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`nav-badge ${item.badge.type}`}
                          aria-label={`${item.badge.text} notifications`}
                        >
                          {item.badge.text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="sb-collapse"
          onClick={() => setIsCollapsed(!isCollapsed)}
          tabIndex={0}
          role="button"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onKeyDown={(e) => handleKeyDown(e, () => setIsCollapsed(!isCollapsed))}
        >
          <i className={`ti ${isCollapsed ? 'ti-chevrons-right' : 'ti-chevrons-left'}`} aria-hidden="true"></i>
        </div>
      </aside>
    </>
  );
}