import React, { useState } from 'react';

export default function AccessControlDashboard() {
  // Navigation active tab index (0: Door Status Map & Logs, 1: Lockdown Controls)
  const [activeTab, setActiveTab] = useState(0);

  // Safe global toast integration to prevent unexpected runtime execution failures
  const triggerToastAlert = (message, status) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(message, status);
    } else {
      console.log(`[Access Control Alert] [${status.toUpperCase()}] ${message}`);
    }
  };

  // Safe global lockdown integration
  const triggerLockdownAction = (mode) => {
    if (typeof window !== 'undefined' && typeof window.ptwLockdown === 'function') {
      window.ptwLockdown(mode);
    } else {
      console.log(`[Emergency Action Triggered] Mode: ${mode}`);
    }
  };

  return (
    <div className="page active" id="pg-access_control">
      
      {/* Sub-Tab Navigation Header Panels */}
      <div className="pq-incomer-tabs card" style={{ padding: 0, borderRadius: '10px 10px 0 0', marginBottom: '14px', display: 'flex' }}>
        <div 
          className={`pq-incomer-tab ${activeTab === 0 ? 'active' : ''}`} 
          onClick={() => setActiveTab(0)}
          style={{ cursor: 'pointer', flex: 1, textAlign: 'center' }}
        >
          Door Status & Monitoring
        </div>
        <div 
          className={`pq-incomer-tab ${activeTab === 1 ? 'active' : ''}`} 
          onClick={() => setActiveTab(1)}
          style={{ cursor: 'pointer', flex: 1, textAlign: 'center' }}
        >
          Lockdown & Safety Control Panel
        </div>
      </div>

      {/* ==================== TAB 0: MONITORING PANEL ==================== */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="access_control" data-tab="0">
          
          {/* 5-Column Access Control KPI Metric Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
            <div className="kpi glow-ok">
              <div className="kpi-l">Doors Online</div>
              <div className="kpi-v ok">42<span className="kpi-u">/44</span></div>
              <div className="kpi-s">2 offline — maintenance</div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Forced Open</div>
              <div className="kpi-v bad">1</div>
              <div className="kpi-s">B1 — Stairwell door</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Occupancy Now</div>
              <div className="kpi-v ok">1,840</div>
              <div className="kpi-s">of 2,048 max</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Access Granted (Today)</div>
              <div className="kpi-v ok">4,218</div>
            </div>
            <div className="kpi glow-bad">
              <div className="kpi-l">Access Denied (Today)</div>
              <div className="kpi-v bad">14</div>
              <div className="kpi-s">3 anti-passback, 11 invalid</div>
            </div>
          </div>

          {/* Door Status Map Grid Section */}
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-1)', marginBottom: '10px' }}>
            Door Status Map — All Access Points
          </div>
          
          <div className="acs-door-grid mb-14">
            
            {/* Door 1: Forced Open Alert Status */}
            <div className="acs-door-card forced">
              <div className="acs-door-hd">
                <div className="acs-door-icon" style={{ background: 'var(--bad-soft)', color: 'var(--bad)' }}><i className="ti ti-door-exit"></i></div>
                <div>
                  <div className="acs-door-name">Stairwell S1 — B1</div>
                  <div className="acs-door-loc">Basement Level 1</div>
                </div>
              </div>
              <div className="acs-door-status"><span className="badge badge-red">FORCED OPEN</span><span style={{ fontSize: '9.5px', color: 'var(--bad)', fontFamily: 'var(--font-mono)' }}>09:48 AM</span></div>
              <div style={{ marginTop: '8px', fontSize: '10.5px', color: 'var(--bad)', background: 'var(--bad-soft)', padding: '5px 8px', borderRadius: '5px' }}>
                ⚠ Alert sent to security desk
              </div>
            </div>

            {/* Door 2: Main Lobby Entrance Status */}
            <div className="acs-door-card open">
              <div className="acs-door-hd">
                <div className="acs-door-icon" style={{ background: 'var(--ok-soft)', color: 'var(--ok)' }}><i className="ti ti-door"></i></div>
                <div>
                  <div className="acs-door-name">Main Lobby — Entrance</div>
                  <div className="acs-door-loc">Ground Floor</div>
                </div>
              </div>
              <div className="acs-door-status"><span className="badge badge-green">OPEN</span><span style={{ fontSize: '9.5px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Business Hours</span></div>
            </div>

            {/* Door 3: Restricted Access Server Room Status */}
            <div className="acs-door-card">
              <div className="acs-door-hd">
                <div className="acs-door-icon" style={{ background: 'var(--surface-3)', color: 'var(--ink-2)' }}><i className="ti ti-door"></i></div>
                <div>
                  <div className="acs-door-name">Floor 5 — Server Room</div>
                  <div className="acs-door-loc">Floor 5 · Restricted</div>
                </div>
              </div>
              <div className="acs-door-status"><span className="badge badge-cyan">SECURED</span><span style={{ fontSize: '9.5px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Card + PIN</span></div>
            </div>

            {/* Door 4: Rooftop Security Status */}
            <div className="acs-door-card">
              <div className="acs-door-hd">
                <div className="acs-door-icon" style={{ background: 'var(--surface-3)', color: 'var(--ink-2)' }}><i className="ti ti-door"></i></div>
                <div>
                  <div className="acs-door-name">Rooftop Access</div>
                  <div className="acs-door-loc">Roof Level</div>
                </div>
              </div>
              <div className="acs-door-status"><span className="badge badge-cyan">SECURED</span><span style={{ fontSize: '9.5px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Card only</span></div>
            </div>

            {/* Door 5: Warning Alert Held Open Door Status */}
            <div className="acs-door-card held">
              <div className="acs-door-hd">
                <div className="acs-door-icon" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}><i className="ti ti-door"></i></div>
                <div>
                  <div className="acs-door-name">Car Park Exit Gate</div>
                  <div className="acs-door-loc">Basement Entry</div>
                </div>
              </div>
              <div className="acs-door-status">
                <span className="badge badge-amber">HELD OPEN</span>
                <span style={{ fontSize: '9.5px', color: 'var(--warn)', fontFamily: 'var(--font-mono)' }}>greater than 10 min</span>
              </div>
            </div>

            {/* Door 6: Loading Bay Windows Status */}
            <div className="acs-door-card">
              <div className="acs-door-hd">
                <div className="acs-door-icon" style={{ background: 'var(--ok-soft)', color: 'var(--ok)' }}><i className="ti ti-door"></i></div>
                <div>
                  <div className="acs-door-name">Ground — Loading Bay</div>
                  <div className="acs-door-loc">Ground Floor Rear</div>
                </div>
              </div>
              <div className="acs-door-status"><span className="badge badge-green">OPEN</span><span style={{ fontSize: '9.5px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Delivery window</span></div>
            </div>

          </div>

          {/* Real-time Section: Zone Occupancy Vector Metrics */}
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-1)', marginBottom: '10px' }}>
            Zone Occupancy Count
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '14px' }}>
            <div className="acs-zone-occ"><div style={{ fontSize: '20px', color: 'var(--info)' }}><i className="ti ti-building"></i></div><div><div className="acs-zone-count" style={{ color: 'var(--info)' }}>842</div><div style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Tower A — All Floors</div></div></div>
            <div className="acs-zone-occ"><div style={{ fontSize: '20px', color: 'var(--ok)' }}><i className="ti ti-building"></i></div><div><div className="acs-zone-count" style={{ color: 'var(--ok)' }}>624</div><div style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Tower B — All Floors</div></div></div>
            <div className="acs-zone-occ"><div style={{ fontSize: '20px', color: 'var(--violet)' }}><i className="ti ti-car"></i></div><div><div className="acs-zone-count" style={{ color: 'var(--violet)' }}>248</div><div style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Basement Parking</div></div></div>
            <div className="acs-zone-occ"><div style={{ fontSize: '20px', color: 'var(--gold)' }}><i className="ti ti-users"></i></div><div><div className="acs-zone-count" style={{ color: 'var(--gold)' }}>126</div><div style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Common Areas</div></div></div>
          </div>

          {/* Real-time Section: Live Log Activity Stream Table */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Live Access Log</div>
                <div className="cs">Real-time entry / exit events</div>
              </div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={() => triggerToastAlert('Downloading access log CSV...', 'info')}>
                <i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export
              </span>
            </div>
            <div className="cb" style={{ padding: 0, maxHeight: '260px', overflowY: 'auto' }}>
              <table className="acs-event-table">
                <thead>
                  <tr><th>Time</th><th>Card Holder</th><th>Door / Reader</th><th>Zone</th><th>Direction</th><th>Result</th></tr>
                </thead>
                <tbody>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:24:12</td><td>Rajesh Kumar</td><td>Floor 5 — Server Room</td><td>Restricted</td><td>IN</td><td><span className="acs-granted">GRANTED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:22:48</td><td style={{ color: 'var(--bad)' }}>Unknown Card</td><td>Rooftop Access</td><td>Roof</td><td>IN</td><td><span className="acs-denied">DENIED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:21:05</td><td>Priya Sharma</td><td>Main Lobby</td><td>Ground</td><td>IN</td><td><span className="acs-granted">GRANTED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:19:44</td><td>Delivery Personnel</td><td>Loading Bay</td><td>Ground</td><td>IN</td><td><span className="acs-granted">GRANTED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:17:33</td><td>Amit Verma</td><td>Car Park Exit</td><td>B1</td><td>OUT</td><td><span className="acs-granted">GRANTED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:15:22</td><td style={{ color: 'var(--bad)' }}>Anti-Passback</td><td>Floor 3 — Lift Lobby</td><td>Tower A</td><td>IN</td><td><span className="acs-denied">DENIED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:12:08</td><td>Suman Bose</td><td>Main Lobby</td><td>Ground</td><td>IN</td><td><span className="acs-granted">GRANTED</span></td></tr>
                  <tr><td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>10:09:55</td><td>Security Guard A</td><td>Control Room</td><td>Ground</td><td>IN</td><td><span className="acs-granted">GRANTED</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 1: LOCKDOWN PANEL ==================== */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="access_control" data-tab="1">
          
          {/* Emergency Protocols Status Overview Strip */}
          <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <div className="kpi">
              <div className="kpi-l">Lockdown Status</div>
              <div className="kpi-v ok">NORMAL</div>
              <div className="kpi-s">No active lockdown</div>
            </div>
            <div className="kpi">
              <div className="kpi-l">Emergency Exits</div>
              <div className="kpi-v ok">All Unlocked</div>
              <div className="kpi-s">Fire-safe mode</div>
            </div>
            <div className="kpi">
              <div className="kpi-l">Last Lockdown Test</div>
              <div className="kpi-v">15 Apr 2026</div>
              <div className="kpi-s">Full drill</div>
            </div>
          </div>

          <div className="g2">
            
            {/* System Controls Interface Card */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Lockdown Control</div>
                  <div className="cs">ISO/IEC 60839-11 · NBC 2016</div>
                </div>
              </div>
              <div className="cb">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <button 
                    className="btn" 
                    style={{ padding: '14px', fontSize: '13px', background: 'var(--bad-soft)', border: '1px solid rgba(242,91,91,0.4)', color: 'var(--bad)', borderRadius: '8px', cursor: 'pointer' }} 
                    onClick={() => triggerLockdownAction('FULL')}
                  >
                    <i className="ti ti-lock" style={{ fontSize: '18px', display: 'block', margin: '0 auto 6px' }}></i>
                    <b>Full Lockdown</b>
                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginTop: '2px' }}>Lock all internal access points</div>
                  </button>
                  <button 
                    className="btn" 
                    style={{ padding: '14px', fontSize: '13px', background: 'var(--warn-soft)', border: '1px solid rgba(245,180,65,0.4)', color: 'var(--warn)', borderRadius: '8px', cursor: 'pointer' }} 
                    onClick={() => triggerLockdownAction('ZONE')}
                  >
                    <i className="ti ti-lock-access" style={{ fontSize: '18px', display: 'block', margin: '0 auto 6px' }}></i>
                    <b>Zone Lockdown</b>
                    <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: 400, marginTop: '2px' }}>Secure specific floors/zones</div>
                  </button>
                </div>
                <div style={{ padding: '10px 12px', background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.2)', borderRadius: '7px', fontSize: '11.5px', color: 'var(--ok)' }}>
                  ✓ Emergency exits remain unlocked during any lockdown event (NFPA 101 / NBC Part 4 compliance)
                </div>
              </div>
            </div>

            {/* Access Matrix Rule Definitions Summary Table */}
            <div className="card">
              <div className="ch">
                <div>
                  <div className="ct">Access Group Summary</div>
                </div>
              </div>
              <div className="cb" style={{ padding: 0 }}>
                <table className="dt">
                  <thead>
                    <tr><th>Group</th><th>Zones Allowed</th><th>Active Users</th><th>Time Restriction</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><b>Full Access</b></td><td>All zones</td><td style={{ color: 'var(--ok)' }}>12</td><td>24×7</td></tr>
                    <tr><td><b>Employees</b></td><td>Floors 1–7, Parking</td><td style={{ color: 'var(--info)' }}>1,420</td><td>06:00–22:00</td></tr>
                    <tr><td><b>Contractors</b></td><td>Basement, Mechanical</td><td style={{ color: 'var(--warn)' }}>48</td><td>08:00–18:00</td></tr>
                    <tr><td><b>IT Admin</b></td><td>Server Room (F5), Control</td><td>6</td><td>24×7 + OTP</td></tr>
                    <tr><td><b>Visitors</b></td><td>Lobby, Meeting Rooms</td><td style={{ color: 'var(--ink-3)' }}>84</td><td>09:00–19:00</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}