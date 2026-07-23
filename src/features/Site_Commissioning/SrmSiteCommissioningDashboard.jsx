import React, { useState } from 'react';

const SrmSiteCommissioningDashboard = () => {
  // Modal state for "Commission Unit" button
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new unit commissioning modal
  const [unitForm, setUnitForm] = useState({
    block: 'Academic Block',
    category: 'AHU',
    floor: 'Ground',
    equipmentTag: '',
    wiring: false,
    sensors: false,
    dpSwitch: false,
    notes: ''
  });

  // Data: Phase Progress Table
  const phaseProgressData = [
    {
      phase: 'Phase 1',
      blocks: 'Academic Block (Vikram Sarabhai, Homji Baba), Dining, Girls Hostel, Utility',
      totalUnits: 51,
      wiringDone: 35,
      upsDone: 21,
      sensorsDone: 124,
      dpDone: 62,
      pctWiring: '68.6%',
      status: 'On Track',
      badgeClass: 'badge-green'
    },
    {
      phase: 'Phase 2',
      blocks: 'SR Block, Ganga Block, X-Lab',
      totalUnits: 111,
      wiringDone: 47,
      upsDone: 0,
      sensorsDone: 88,
      dpDone: 72,
      pctWiring: '42.5%',
      status: 'In Progress',
      badgeClass: 'badge-amber'
    },
    {
      phase: 'Phase 3',
      blocks: 'CV Raman, JC Bose, Vedavathi',
      totalUnits: 122,
      wiringDone: 59,
      upsDone: 0,
      sensorsDone: 0,
      dpDone: 0,
      pctWiring: '48.4%',
      status: 'In Progress',
      badgeClass: 'badge-amber'
    }
  ];

  // Data: Facilities Team Support Scope Table
  const facilitiesScopeData = [
    {
      phaseGroup: 'Phase 1',
      rows: [
        { block: 'Academic Block', internet: 13, bms: 3, thermowell: 31, pfc: 31, heldUp: 34, total: 34 },
        { block: 'Dining Block', internet: 1, bms: 0, thermowell: 4, pfc: 4, heldUp: 6, total: 6 },
        { block: "Girl's Hostel Block", internet: 5, bms: 5, thermowell: 5, pfc: 0, heldUp: 5, total: 5 },
        { block: 'Utility Block', internet: 2, bms: 1, thermowell: 0, pfc: 0, heldUp: 5, total: 5 }
      ]
    },
    {
      phaseGroup: 'Phase 2',
      rows: [
        { block: 'SR Block', internet: 17, bms: 10, thermowell: 22, pfc: 22, heldUp: 32, total: 32 },
        { block: 'Ganga Block', internet: 14, bms: 32, thermowell: 25, pfc: 3, heldUp: 54, total: 54 },
        { block: 'X-Lab', internet: 2, bms: 1, thermowell: 14, pfc: 14, heldUp: 19, total: 19 }
      ]
    },
    {
      phaseGroup: 'Phase 3',
      rows: [
        { block: 'CV Raman', internet: 22, bms: 21, thermowell: 44, pfc: 44, heldUp: 62, total: 62 },
        { block: 'JC Bose', internet: 7, bms: 16, thermowell: 7, pfc: 7, heldUp: 21, total: 21 },
        { block: 'Vedavathi', internet: 11, bms: 34, thermowell: 14, pfc: 9, heldUp: 39, total: 39 }
      ]
    }
  ];

  // Data: Equipment Register Sample
  const sampleEquipmentData = [
    { block: 'Academic Block', subBlock: 'Vikram Sarabhai Block', category: 'AHU', floor: 'First', tag: 'AHU1-1', wiring: true, sensors: true, dp: true, status: 'Pending — clamping & UPS power supply' },
    { block: 'Academic Block', subBlock: 'Vikram Sarabhai Block', category: 'Exhaust', floor: 'Terrace', tag: 'Toilet Exhaust', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'Dining Block', subBlock: 'Annapurna Mess', category: 'Fresh Air', floor: 'Second', tag: 'Kitchen Fresh Air', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'Girl\'s Hostel Block', subBlock: 'First Tower', category: 'Hot Water System', floor: 'Terrace', tag: 'HW Panel', wiring: false, sensors: false, dp: 'NA', status: 'Pending — wiring' },
    { block: 'SR Block', subBlock: 'SR Block', category: 'AHU', floor: 'First', tag: 'AHU1-1', wiring: true, sensors: false, dp: false, status: 'Pending — DP & fan switch wiring' },
    { block: 'SR Block', subBlock: 'SR Block', category: 'Electrical Room', floor: 'Second', tag: '—', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'Ganga Block', subBlock: 'Ganga Block', category: 'CSU', floor: 'Second', tag: 'CSU2-1', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'Ganga Block', subBlock: 'Ganga Block', category: 'Cassette AC', floor: 'Terrace', tag: '—', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'CV Raman', subBlock: 'CV Raman', category: 'CSU', floor: 'Basement', tag: 'Near Water Tank', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'CV Raman', subBlock: 'CV Raman', category: 'AHU', floor: '1F', tag: 'AHU1-1 (near Canteen)', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'CV Raman', subBlock: 'CV Raman', category: 'Lift Ventilation Fan', floor: 'Terrace LMR', tag: 'LVF 1', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' },
    { block: 'Vedavathi', subBlock: 'Vedavathi', category: 'Main LT', floor: 'Basement', tag: '—', wiring: false, sensors: false, dp: false, status: 'Pending — wiring' }
  ];

  // Helper renderer for boolean badges
  const renderBadge = (val) => {
    if (val === true) return <span className="badge badge-green">Yes</span>;
    if (val === false) return <span className="badge badge-red">No</span>;
    return <span className="badge badge-cyan">{val}</span>;
  };

  const handleCommissionSubmit = (e) => {
    e.preventDefault();
    alert(`Unit ${unitForm.equipmentTag || 'New Unit'} scheduled for commissioning.`);
    setIsModalOpen(false);
  };

  return (
    <div className="page active" id="pg-srmsite">
      <div className="tab-panel active" data-page="srmsite" data-tab="0">
        
        {/* Header Hero Banner */}
        <div className="card mb-12" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderColor: 'rgba(238,154,58,.3)' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '10px',
              background: 'linear-gradient(140deg,var(--brand-bright),var(--brand-deep))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '18px',
              color: '#fff',
              flexShrink: 0
            }}
          >
            SR
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink-0)' }}>
              SRM University-AP — Campus Command Center
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '2px' }}>
              Neerukonda, Amaravati · Installation Partner: i-BUS · New site — wiring &amp; sensor commissioning in progress
            </div>
          </div>
          <span className="badge badge-amber">Phase 1–3 · In Progress</span>
          <button className="btn" style={{ padding: '7px 14px', fontSize: '11.5px' }} onClick={() => setIsModalOpen(true)}>
            <i className="ti ti-plus"></i> Commission Unit
          </button>
        </div>

        {/* Top KPI Metrics Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-l">Total Units</div>
            <div className="kpi-v">284</div>
            <div className="kpi-s">across 10 blocks · 3 phases</div>
          </div>
          <div className="kpi glow-info">
            <div className="kpi-l">Wiring Done</div>
            <div className="kpi-v" style={{ color: 'var(--info)' }}>141</div>
            <div className="kpi-s">49.6% complete</div>
          </div>
          <div className="kpi glow-bad">
            <div className="kpi-l">UPS Supply Done</div>
            <div className="kpi-v" style={{ color: 'var(--bad)' }}>21</div>
            <div className="kpi-s">7.4% — major blocker</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Sensors Fitted</div>
            <div className="kpi-v" style={{ color: 'var(--ok)' }}>212</div>
            <div className="kpi-s">74.6% complete</div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">DP Switches Done</div>
            <div className="kpi-v" style={{ color: 'var(--warn)' }}>134</div>
            <div className="kpi-s">47.2% complete</div>
          </div>
          <div className="kpi glow-cool">
            <div className="kpi-l">Module Installed / Live</div>
            <div className="kpi-v" style={{ color: 'var(--cool)' }}>0</div>
            <div className="kpi-s">not yet started</div>
          </div>
        </div>

        {/* Phase Progress Card Table */}
        <div className="card mb-12">
          <div className="ch">
            <div>
              <div className="ct">Phase Progress</div>
              <div className="cs">Blocks covered · wiring completion · status</div>
            </div>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Blocks Covered</th>
                  <th>Total Units</th>
                  <th>Wiring Done</th>
                  <th>UPS Done</th>
                  <th>Sensors Done</th>
                  <th>DP Done</th>
                  <th>% Wiring</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {phaseProgressData.map((row, idx) => (
                  <tr key={idx}>
                    <td><b>{row.phase}</b></td>
                    <td>{row.blocks}</td>
                    <td>{row.totalUnits}</td>
                    <td>{row.wiringDone}</td>
                    <td>{row.upsDone}</td>
                    <td>{row.sensorsDone}</td>
                    <td>{row.dpDone}</td>
                    <td>{row.pctWiring}</td>
                    <td>
                      <span className={`badge ${row.badgeClass}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <td><b>Total</b></td>
                  <td>All Phases</td>
                  <td><b>284</b></td>
                  <td><b>141</b></td>
                  <td><b>21</b></td>
                  <td><b>212</b></td>
                  <td><b>134</b></td>
                  <td><b>41.5%</b></td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SRM Scope Issues Table */}
        <div className="card mb-12" style={{ borderColor: 'rgba(255,92,92,.28)' }}>
          <div className="ch">
            <div>
              <div className="ct">SRM Scope — Items Awaiting Facilities Team Support</div>
              <div className="cs">Blocking installation &amp; commissioning · kindly requesting priority closure</div>
            </div>
            <span className="badge badge-red">277 of 284 units held up</span>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Block</th>
                  <th>Internet Provision</th>
                  <th>BMS Integration</th>
                  <th>Thermowell</th>
                  <th>PFC Duct Damper</th>
                  <th>Units Held Up</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {facilitiesScopeData.map((group, groupIdx) => (
                  <React.Fragment key={groupIdx}>
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9.5px',
                          color: 'var(--ink-3)',
                          textTransform: 'uppercase',
                          letterSpacing: '.06em',
                          background: 'var(--surface-2)'
                        }}
                      >
                        {group.phaseGroup}
                      </td>
                    </tr>
                    {group.rows.map((r, rIdx) => (
                      <tr key={rIdx}>
                        <td>{r.block}</td>
                        <td>{r.internet}</td>
                        <td>{r.bms}</td>
                        <td>{r.thermowell}</td>
                        <td>{r.pfc}</td>
                        <td>{r.heldUp}</td>
                        <td>{r.total}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <td><b>Total</b></td>
                  <td><b>94</b></td>
                  <td><b>123</b></td>
                  <td><b>166</b></td>
                  <td><b>134</b></td>
                  <td><b>277</b></td>
                  <td><b>277</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-Column Split Details */}
        <div className="g2 mb-12">
          {/* Facilities Action Items */}
          <div className="card">
            <div className="ch">
              <div className="ct">Support Requested from SRM Facilities Team</div>
            </div>
            <div className="cb" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '10px 12px', background: 'var(--surface-1)', border: '1px solid var(--line-1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-0)' }}>UPS Supply</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>
                  Provide stable UPS / raw power point at each unit location so IoT modules can be powered and commissioned.
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--surface-1)', border: '1px solid var(--line-1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-0)' }}>Internet Provision</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>
                  Provide internet / LAN connectivity at each block for data upload to the cloud dashboard.
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--surface-1)', border: '1px solid var(--line-1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-0)' }}>Thermowell</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>
                  Arrange thermowell installation on chilled / hot water lines (plumbing scope) so water temperature sensors can be fitted.
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--surface-1)', border: '1px solid var(--line-1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-0)' }}>PFC Return Duct Damper</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>
                  Confirm / rectify return duct damper status so airflow readings and control logic are valid.
                </div>
              </div>
            </div>
          </div>

          {/* Site-Wide Commissioning Pipeline */}
          <div className="card">
            <div className="ch">
              <div className="ct">Commissioning Pipeline</div>
              <div className="cs">Site-wide, all phases</div>
            </div>
            <div className="cb" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="sla-mini" style={{ minWidth: 0 }}>
                <div className="slm-top">
                  <span>Wiring</span>
                  <span>141 / 284</span>
                </div>
                <div className="sla-track">
                  <div className="sla-fill warn" style={{ width: '49.6%' }}></div>
                </div>
              </div>
              <div className="sla-mini" style={{ minWidth: 0 }}>
                <div className="slm-top">
                  <span>UPS Supply</span>
                  <span>21 / 284</span>
                </div>
                <div className="sla-track">
                  <div className="sla-fill bad" style={{ width: '7.4%' }}></div>
                </div>
              </div>
              <div className="sla-mini" style={{ minWidth: 0 }}>
                <div className="slm-top">
                  <span>Sensors</span>
                  <span>212 / 284</span>
                </div>
                <div className="sla-track">
                  <div className="sla-fill ok" style={{ width: '74.6%' }}></div>
                </div>
              </div>
              <div className="sla-mini" style={{ minWidth: 0 }}>
                <div className="slm-top">
                  <span>DP Switches</span>
                  <span>134 / 284</span>
                </div>
                <div className="sla-track">
                  <div className="sla-fill warn" style={{ width: '47.2%' }}></div>
                </div>
              </div>
              <div className="sla-mini" style={{ minWidth: 0 }}>
                <div className="slm-top">
                  <span>Module Installed &amp; Tested</span>
                  <span>0 / 284</span>
                </div>
                <div className="sla-track">
                  <div className="sla-fill bad" style={{ width: '1%' }}></div>
                </div>
              </div>
              <div className="sla-mini" style={{ minWidth: 0 }}>
                <div className="slm-top">
                  <span>Dashboard Live</span>
                  <span>0 / 284</span>
                </div>
                <div className="sla-track">
                  <div className="sla-fill bad" style={{ width: '1%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Register Sample */}
        <div className="card">
          <div className="ch">
            <div>
              <div className="ct">Equipment Register — Sample</div>
              <div className="cs">12 of 284 units shown · full register in the source tracker</div>
            </div>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Block</th>
                  <th>Sub-Block</th>
                  <th>Category</th>
                  <th>Floor</th>
                  <th>Equipment Tag</th>
                  <th>Wiring</th>
                  <th>Sensors</th>
                  <th>DP Switch</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleEquipmentData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.block}</td>
                    <td>{item.subBlock}</td>
                    <td>{item.category}</td>
                    <td>{item.floor}</td>
                    <td>{item.tag}</td>
                    <td>{renderBadge(item.wiring)}</td>
                    <td>{renderBadge(item.sensors)}</td>
                    <td>{renderBadge(item.dp)}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Unit Modal Component */}
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div
              className="card"
              style={{
                width: '420px',
                maxWidth: '90%',
                background: 'var(--surface-1, #1e293b)',
                border: '1px solid var(--line-2, #334155)',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--ink-0)' }}>Commission Unit</h3>
                <button
                  className="btn"
                  style={{ padding: '2px 8px', fontSize: '12px' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCommissionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--ink-3)', display: 'block', marginBottom: '4px' }}>Block</label>
                  <select
                    style={{ width: '100%', padding: '6px', borderRadius: '6px', background: 'var(--surface-2)', color: 'var(--ink-0)', border: '1px solid var(--line-1)' }}
                    value={unitForm.block}
                    onChange={(e) => setUnitForm({ ...unitForm, block: e.target.value })}
                  >
                    <option>Academic Block</option>
                    <option>Dining Block</option>
                    <option>Girl's Hostel Block</option>
                    <option>SR Block</option>
                    <option>Ganga Block</option>
                    <option>CV Raman</option>
                    <option>Vedavathi</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: 'var(--ink-3)', display: 'block', marginBottom: '4px' }}>Equipment Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. AHU1-2"
                    required
                    style={{ width: '100%', padding: '6px', borderRadius: '6px', background: 'var(--surface-2)', color: 'var(--ink-0)', border: '1px solid var(--line-1)' }}
                    value={unitForm.equipmentTag}
                    onChange={(e) => setUnitForm({ ...unitForm, equipmentTag: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--ink-0)' }}>
                    <input
                      type="checkbox"
                      checked={unitForm.wiring}
                      onChange={(e) => setUnitForm({ ...unitForm, wiring: e.target.checked })}
                    />
                    Wiring
                  </label>
                  <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--ink-0)' }}>
                    <input
                      type="checkbox"
                      checked={unitForm.sensors}
                      onChange={(e) => setUnitForm({ ...unitForm, sensors: e.target.checked })}
                    />
                    Sensors
                  </label>
                  <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--ink-0)' }}>
                    <input
                      type="checkbox"
                      checked={unitForm.dpSwitch}
                      onChange={(e) => setUnitForm({ ...unitForm, dpSwitch: e.target.checked })}
                    />
                    DP Switch
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                  <button type="button" className="btn" style={{ padding: '6px 12px', fontSize: '11.5px' }} onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn" style={{ padding: '6px 12px', fontSize: '11.5px', background: 'var(--brand-bright)', color: '#fff' }}>
                    Save Unit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SrmSiteCommissioningDashboard;