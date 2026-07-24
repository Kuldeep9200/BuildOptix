import React, { useState } from 'react';

// --- DATA DEFINITIONS ---

const SECURITY_KPIS = [
  {
    id: 'score',
    label: 'Security Score',
    value: 'A−',
    sub: '87 / 100',
    type: 'ok',
    glowClass: 'glow-ok',
  },
  {
    id: 'mfa',
    label: 'MFA Coverage',
    value: '92',
    unit: '%',
    type: 'ok',
    glowClass: 'glow-ok',
  },
  {
    id: 'patch',
    label: 'Patch Compliance',
    value: '88',
    unit: '%',
    sub: '4 devices pending',
    type: 'warn',
    glowClass: 'glow-warn',
  },
  {
    id: 'cert',
    label: 'Cert Expiry',
    value: '23',
    unit: 'd',
    sub: 'api.buildoptix.in',
    type: 'warn',
    glowClass: 'glow-warn',
  },
  {
    id: 'vuln',
    label: 'Open Vulnerabilities',
    value: '2',
    sub: '1 high · 1 medium',
    type: 'bad',
    glowClass: 'glow-bad',
  },
];

const CONTROL_POSTURE_DATA = [
  {
    id: 'mfa',
    icon: 'ti-lock-access',
    title: 'Multi-Factor Authentication',
    subtitle: '92% of users enrolled · 4 pending',
    status: 'Review',
    badgeClass: 'badge-amber',
    iconColor: 'var(--warn)',
  },
  {
    id: 'network',
    icon: 'ti-network',
    title: 'Network Segmentation (OT/IT)',
    subtitle: 'BMS/OT on isolated VLAN · firewall enforced',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
  {
    id: 'endpoint',
    icon: 'ti-device-desktop-check',
    title: 'Endpoint Protection',
    subtitle: 'All gateways & servers protected & reporting',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
  {
    id: 'tls',
    icon: 'ti-certificate',
    title: 'TLS Certificates',
    subtitle: 'api.buildoptix.in expires in 23 days — renew',
    status: 'Review',
    badgeClass: 'badge-amber',
    iconColor: 'var(--warn)',
  },
  {
    id: 'patch',
    icon: 'ti-download',
    title: 'Patch Management',
    subtitle: '88% compliant · 4 edge devices pending firmware',
    status: 'Review',
    badgeClass: 'badge-amber',
    iconColor: 'var(--warn)',
  },
  {
    id: 'backups',
    icon: 'ti-database-export',
    title: 'Encrypted Backups',
    subtitle: 'Daily · last verified restore 2 days ago',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
  {
    id: 'audit',
    icon: 'ti-history',
    title: 'Audit Logging',
    subtitle: 'All admin actions logged & immutable (90-day retention)',
    status: 'Pass',
    badgeClass: 'badge-green',
    iconColor: 'var(--ok)',
  },
];

const SECURITY_EVENTS_DATA = [
  {
    id: 1,
    time: '09:42',
    event: 'Successful login',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'Sandeep Rao',
    ip: '103.21.x.x',
    action: '—',
  },
  {
    id: 2,
    time: '09:18',
    event: 'MFA challenge passed',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'Rajan Mehta',
    ip: '103.21.x.x',
    action: '—',
  },
  {
    id: 3,
    time: '08:55',
    event: 'Firewall blocked port scan',
    severity: 'Warning',
    badgeClass: 'badge-amber',
    source: 'Perimeter FW',
    ip: '198.51.x.x',
    action: 'Auto-blocked',
  },
  {
    id: 4,
    time: '08:30',
    event: 'Role changed → Senior Engineer',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'admin',
    ip: '—',
    action: 'Audited',
  },
  {
    id: 5,
    time: 'Yesterday',
    event: '3 failed logins (lockout)',
    severity: 'Warning',
    badgeClass: 'badge-amber',
    source: 'unknown',
    ip: '45.13.x.x',
    action: 'Account locked',
  },
  {
    id: 6,
    time: 'Yesterday',
    event: 'New API key issued',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'Sandeep Rao',
    ip: '—',
    action: 'BMS Gateway',
  },
  {
    id: 7,
    time: '2 days',
    event: 'Firmware update applied',
    severity: 'Info',
    badgeClass: 'badge-cyan',
    source: 'System',
    ip: '—',
    action: '12 devices',
  },
  {
    id: 8,
    time: '2 days',
    event: 'Vulnerability scan completed',
    severity: 'Warning',
    badgeClass: 'badge-amber',
    source: 'Scanner',
    ip: '—',
    action: '2 findings',
  },
];

// --- MAIN COMPONENT ---

export const AdminSecurity = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page active" id="pg-adminsecurity">
      {/* Optional Tab Navigation Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--line-1, #e0e0e0)', paddingBottom: '8px' }}>
        <button
          onClick={() => setActiveTab(0)}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === 0 ? 'var(--info, #007bff)' : 'transparent',
            color: activeTab === 0 ? '#fff' : 'var(--ink-1, #333)',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Security Posture
        </button>
        <button
          onClick={() => setActiveTab(1)}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === 1 ? 'var(--info, #007bff)' : 'transparent',
            color: activeTab === 1 ? '#fff' : 'var(--ink-1, #333)',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Event Log
        </button>
      </div>

      {/* Tab 0: Security Posture */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="adminsecurity" data-tab="0">
          {/* KPI Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
            {SECURITY_KPIS.map((kpi) => (
              <div key={kpi.id} className={`kpi ${kpi.glowClass}`}>
                <div className="kpi-l">{kpi.label}</div>
                <div className={`kpi-v ${kpi.type}`}>
                  {kpi.value}
                  {kpi.unit && <span className="kpi-u">{kpi.unit}</span>}
                </div>
                {kpi.sub && <div className="kpi-s">{kpi.sub}</div>}
              </div>
            ))}
          </div>

          {/* Control Posture Card */}
          <div className="card mb-14">
            <div className="ch">
              <div>
                <div className="ct">Control Posture</div>
                <div className="cs">IEC 62443 · ISO 27001 aligned</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="adm-sec-controls">
                {CONTROL_POSTURE_DATA.map((row) => (
                  <div key={row.id} className="adm-sec-row">
                    <span
                      className="adm-sec-ico"
                      style={{
                        background: `color-mix(in srgb, ${row.iconColor} 16%, transparent)`,
                        color: row.iconColor,
                      }}
                    >
                      <i className={`ti ${row.icon}`}></i>
                    </span>
                    <span className="adm-sec-tx">
                      <b>{row.title}</b>
                      <span>{row.subtitle}</span>
                    </span>
                    <span className={`badge ${row.badgeClass}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Event Log */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="adminsecurity" data-tab="1">
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Security Event Log</div>
                <div className="cs">Authentication, access and threat events</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="adm-sec-events">
                <table className="adm-tbl">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Event</th>
                      <th>Severity</th>
                      <th>Source</th>
                      <th>IP</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SECURITY_EVENTS_DATA.map((evt) => (
                      <tr key={evt.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>
                          {evt.time}
                        </td>
                        <td>
                          <b>{evt.event}</b>
                        </td>
                        <td>
                          <span className={`badge ${evt.badgeClass}`}>{evt.severity}</span>
                        </td>
                        <td>{evt.source}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>
                          {evt.ip}
                        </td>
                        <td>{evt.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSecurity;