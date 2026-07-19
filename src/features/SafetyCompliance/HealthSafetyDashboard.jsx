import React, { useState } from 'react';

export default function HealthSafetyDashboard() {
  // Tab/Navigation Management State for Health & Safety View
  // (0: Overview, 1: Fire Fighting, 2: Evacuation, 3: Incidents, 4: Compliance)
  const [activeTab, setActiveTab] = useState(0);

  // Safe window-level action callbacks to avoid crashes
  const handleNavTo = (page, tabIndex) => {
    if (typeof window !== 'undefined' && typeof window.navTo === 'function') {
      window.navTo(page, tabIndex);
    } else {
      console.log(`Navigating to page: ${page}, tab: ${tabIndex}`);
      setActiveTab(tabIndex);
    }
  };

  return (
    <div className="page active" id="pg-health-safety">
      
      {/* ================= TAB 0: OVERVIEW ================= */}
      <div 
        className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} 
        data-page="health_safety" 
        data-tab="0"
        style={{ display: activeTab === 0 ? 'block' : 'none' }}
      >
        {/* 5-Column Safety KPI Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
          <div className="kpi glow-ok clickable" title="Go to Fire Fighting" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Fire System Status</div>
            <div className="kpi-v ok">Normal</div>
            <div className="kpi-s">All 128 zones clear</div>
          </div>
          <div className="kpi glow-ok clickable" title="Go to Fire Fighting" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Detectors Online</div>
            <div className="kpi-v ok">482<span className="kpi-u">/482</span></div>
            <div className="kpi-s">100% reporting</div>
          </div>
          <div className="kpi glow-bad clickable" title="Go to Incidents" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Open H&amp;S Incidents</div>
            <div className="kpi-v bad">2</div>
            <div className="kpi-s">minor · investigation open</div>
          </div>
          <div className="kpi glow-info clickable" title="Go to Evacuation" onClick={() => setActiveTab(2)}>
            <div className="kpi-l">Last Fire Drill</div>
            <div className="kpi-v">03 May</div>
            <div className="kpi-s">17 days ago</div>
          </div>
          <div className="kpi glow-ok clickable" title="Go to Compliance" onClick={() => setActiveTab(4)}>
            <div className="kpi-l">Compliance Score</div>
            <div className="kpi-v ok">97<span className="kpi-u">%</span></div>
            <div className="kpi-s">NBC 2016 · Fire NOC ✓</div>
          </div>
        </div>

        {/* Status Breakdown Section */}
        <div className="g21 mb-12">
          {/* Life Safety Systems Logs */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Life Safety Systems — Status Overview</div>
                <div className="cs">All building safety systems · Live</div>
              </div>
            </div>
            <div className="cb" style={{ padding: '10px 12px' }}>
              <div className="st-item" style={{ cursor: 'pointer' }} onClick={() => handleNavTo('health_safety', 1)}>
                <div className="st-dot g"></div>
                <div className="st-name">
                  <i className="ti ti-flame" style={{ fontSize: '13px', color: 'var(--bad)' }}></i>
                  &nbsp; Fire Detection &amp; Suppression
                </div>
                <span className="badge badge-green">All Clear</span>
              </div>
              
              <div className="st-item">
                <div className="st-dot g"></div>
                <div className="st-name">
                  <i className="ti ti-door-exit" style={{ fontSize: '13px', color: 'var(--warn)' }}></i>
                  &nbsp; Emergency Evacuation Routes
                </div>
                <span className="badge badge-green">Unobstructed</span>
              </div>
              
              <div className="st-item">
                <div className="st-dot g"></div>
                <div className="st-name">
                  <i className="ti ti-first-aid-kit" style={{ fontSize: '13px', color: 'var(--ok)' }}></i>
                  &nbsp; First Aid Stations (14)
                </div>
                <span className="badge badge-green">Stocked</span>
              </div>
              
              <div className="st-item">
                <div className="st-dot g"></div>
                <div className="st-name">
                  <i className="ti ti-phone-call" style={{ fontSize: '13px', color: 'var(--info)' }}></i>
                  &nbsp; PA / Emergency Communication
                </div>
                <span className="badge badge-green">Tested</span>
              </div>
              
              <div className="st-item">
                <div className="st-dot a"></div>
                <div className="st-name">
                  <i className="ti ti-stairs" style={{ fontSize: '13px', color: 'var(--warn)' }}></i>
                  &nbsp; Stairwell Lighting
                </div>
                <span className="badge badge-amber">FL4 dim — work order raised</span>
              </div>
              
              <div className="st-item">
                <div className="st-dot g"></div>
                <div className="st-name">
                  <i className="ti ti-camera" style={{ fontSize: '13px', color: 'var(--info)' }}></i>
                  &nbsp; CCTV Surveillance
                </div>
                <span className="badge badge-green">24 / 24 Online</span>
              </div>
              
              <div className="st-item">
                <div className="st-dot g"></div>
                <div className="st-name">
                  <i className="ti ti-building-skyscraper" style={{ fontSize: '13px', color: 'var(--violet)' }}></i>
                  &nbsp; DG / Emergency Power
                </div>
                <span className="badge badge-green">Armed &amp; Ready</span>
              </div>
            </div>
          </div>

          {/* Compliance Strategy Cards */}
          <div className="card">
            <div className="ch"><div className="ct">Compliance Calendar</div></div>
            <div className="cb">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                
                <div style={{ background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ok)' }}>✓ Fire NOC — Renewed</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>Valid until 31 Dec 2026 · MCFD</div>
                </div>
                
                <div style={{ background: 'var(--ok-soft)', border: '1px solid rgba(34,214,122,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ok)' }}>✓ Annual Fire Audit Passed</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>04 Feb 2026 · Next: Feb 2027</div>
                </div>
                
                <div style={{ background: 'var(--warn-soft)', border: '1px solid rgba(245,180,65,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--warn)' }}>⚠ Fire Extinguisher Recharge Due</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>14 of 96 extinguishers — due 31 May 2026</div>
                </div>
                
                <div style={{ background: 'var(--info-soft)', border: '1px solid rgba(78,161,255,0.2)', borderRadius: '7px', padding: '9px 12px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--info)' }}>ℹ Quarterly Fire Drill Planned</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '2px' }}>Scheduled: 05 Jun 2026 · 10:00 AM</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}