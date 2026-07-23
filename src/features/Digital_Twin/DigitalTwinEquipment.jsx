import React, { useState } from 'react';

const DigitalTwinEquipment = ({ onEquipmentSelect }) => {
  // State for active / highlighted equipment
  const [activeEquipId, setActiveEquipId] = useState(null);

  // Equipment Master Data Schema
  const equipmentData = [
    {
      id: 0,
      code: 'AHU-G1',
      name: 'Air Handling Unit',
      zone: 'G-Z1',
      status: 'Running',
      badgeClass: 'badge-green',
      icon: 'ti-air-conditioning',
      colorVar: 'var(--ok)',
      left: '18%',
      top: '24%',
      alert: false
    },
    {
      id: 1,
      code: 'AHU-G2',
      name: 'Air Handling Unit',
      zone: 'G-Z5',
      status: 'Running',
      badgeClass: 'badge-green',
      icon: 'ti-air-conditioning',
      colorVar: 'var(--ok)',
      left: '74%',
      top: '20%',
      alert: false
    },
    {
      id: 2,
      code: 'CH-02',
      name: 'Chiller',
      zone: 'G-Z13',
      status: 'Fault',
      badgeClass: 'badge-red',
      icon: 'ti-snowflake',
      colorVar: 'var(--bad)',
      left: '30%',
      top: '70%',
      alert: true
    },
    {
      id: 3,
      code: 'CH-01',
      name: 'Chiller',
      zone: 'G-Z12',
      status: 'Running',
      badgeClass: 'badge-green',
      icon: 'ti-snowflake',
      colorVar: 'var(--ok)',
      left: '46%',
      top: '66%',
      alert: false
    },
    {
      id: 4,
      code: 'PMP-02',
      name: 'Pump',
      zone: 'G-Z11',
      status: 'Maint due',
      badgeClass: 'badge-amber',
      icon: 'ti-pump',
      colorVar: 'var(--warn)',
      left: '60%',
      top: '78%',
      alert: false
    },
    {
      id: 5,
      code: 'DG-01',
      name: 'Diesel Generator',
      zone: 'G-Z8',
      status: 'Standby',
      badgeClass: 'badge-cyan',
      icon: 'ti-engine',
      colorVar: 'var(--ink-3)',
      left: '85%',
      top: '72%',
      alert: false
    },
    {
      id: 6,
      code: 'LIFT-3',
      name: 'Elevator',
      zone: 'G-Z3',
      status: 'Running',
      badgeClass: 'badge-green',
      icon: 'ti-elevator',
      colorVar: 'var(--ok)',
      left: '50%',
      top: '44%',
      alert: false
    },
    {
      id: 7,
      code: 'FACP',
      name: 'Fire Panel',
      zone: 'G-Z15',
      status: 'Running',
      badgeClass: 'badge-green',
      icon: 'ti-flame',
      colorVar: 'var(--ok)',
      left: '12%',
      top: '54%',
      alert: false
    },
    {
      id: 8,
      code: 'UPS-1',
      name: 'UPS',
      zone: 'G-Z7',
      status: 'Running',
      badgeClass: 'badge-green',
      icon: 'ti-battery-3',
      colorVar: 'var(--ok)',
      left: '88%',
      top: '40%',
      alert: false
    }
  ];

  // Helper handler when an item or marker is clicked
  const handleEquipClick = (id) => {
    setActiveEquipId(id);
    if (onEquipmentSelect) {
      const selectedItem = equipmentData.find((item) => item.id === id);
      onEquipmentSelect(selectedItem);
    }
  };

  return (
    <div className="page active" id="pg-dtequip">
      <div className="tab-panel active" data-page="dtequip" data-tab="0">
        {/* KPI Header Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="kpi glow-info">
            <div className="kpi-l">Equipment Mapped</div>
            <div className="kpi-v">86</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Running</div>
            <div className="kpi-v ok">79</div>
          </div>
          <div className="kpi glow-bad">
            <div className="kpi-l">Faults</div>
            <div className="kpi-v bad">3</div>
          </div>
          <div className="kpi glow-warn">
            <div className="kpi-l">Maintenance Due</div>
            <div className="kpi-v warn">4</div>
          </div>
        </div>

        {/* Digital Twin Split View */}
        <div className="dt-split">
          {/* Spatial Map Column */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Spatial Map</div>
                <div className="cs">Equipment positioned on the twin · colour = status</div>
              </div>
            </div>
            <div className="cb">
              <div className="dt-viewport dt-equip-host" id="dt-equip-map" style={{ position: 'relative' }}>
                <svg
                  className="dt-equip-plate"
                  viewBox="0 0 460 290"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="14" y="14" width="432" height="262" rx="7" fill="none" stroke="var(--line-3)" strokeWidth="1.3" />
                  <text className="dt-plan-platelbl" x="440" y="269" textAnchor="end" fontSize="9">
                    GROUND · 16 ZONES
                  </text>

                  {/* Floor Zones Grid */}
                  {[
                    { id: 'Z1', x: 17.0, y: 17.0 },
                    { id: 'Z2', x: 89.0, y: 17.0 },
                    { id: 'Z3', x: 161.0, y: 17.0 },
                    { id: 'Z4', x: 233.0, y: 17.0 },
                    { id: 'Z5', x: 305.0, y: 17.0 },
                    { id: 'Z6', x: 377.0, y: 17.0 },
                    { id: 'Z7', x: 377.0, y: 82.5 },
                    { id: 'Z8', x: 377.0, y: 148.0 },
                    { id: 'Z9', x: 377.0, y: 213.5 },
                    { id: 'Z10', x: 305.0, y: 213.5 },
                    { id: 'Z11', x: 233.0, y: 213.5 },
                    { id: 'Z12', x: 161.0, y: 213.5 },
                    { id: 'Z13', x: 89.0, y: 213.5 },
                    { id: 'Z14', x: 17.0, y: 213.5 },
                    { id: 'Z15', x: 17.0, y: 148.0 },
                    { id: 'Z16', x: 17.0, y: 82.5 }
                  ].map((zone) => (
                    <React.Fragment key={zone.id}>
                      <rect className="dt-plan-mz" x={zone.x} y={zone.y} width="66.0" height="59.5" rx="4" />
                      <text className="dt-plan-zlabel" x={zone.x + 5} y={zone.y + 12} fontSize="8" style={{ fill: 'var(--ink-4)' }}>
                        {zone.id}
                      </text>
                    </React.Fragment>
                  ))}

                  {/* Building Core */}
                  <rect className="dt-plan-core" x="89" y="82.5" width="282" height="125" rx="5" />
                  <line x1="230.0" y1="89.5" x2="230.0" y2="200.5" stroke="var(--line-2)" strokeWidth="1" />
                  <text className="dt-plan-corelbl" x="159.5" y="142.0" textAnchor="middle" fontSize="8.5">
                    LIFTS
                  </text>
                  <text className="dt-plan-corelbl" x="159.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">
                    CORE ×4
                  </text>
                  <text className="dt-plan-corelbl" x="300.5" y="142.0" textAnchor="middle" fontSize="8.5">
                    STAIRS
                  </text>
                  <text className="dt-plan-corelbl" x="300.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">
                    WC · SHAFT
                  </text>
                </svg>

                {/* Spatial Map Markers */}
                {equipmentData.map((item) => (
                  <div
                    key={item.id}
                    className={`dt-emarker ${item.alert ? 'dt-emarker-alert' : ''} ${activeEquipId === item.id ? 'active' : ''}`}
                    style={{
                      left: item.left,
                      top: item.top,
                      background: item.colorVar
                    }}
                    title={`${item.code} — ${item.status} · near ${item.zone}`}
                    onClick={() => handleEquipClick(item.id)}
                  >
                    <i className={`ti ${item.icon}`}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Equipment List Column */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Equipment</div>
                <div className="cs">Click to locate</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="dt-equip-list">
                {equipmentData.map((item) => (
                  <div
                    key={item.id}
                    className={`dt-lrow ${activeEquipId === item.id ? 'active' : ''}`}
                    id={`dt-erow-${item.id}`}
                    onClick={() => handleEquipClick(item.id)}
                  >
                    <span
                      className="dt-lrow-ico"
                      style={{
                        background: `color-mix(in srgb, ${item.colorVar} 18%, transparent)`,
                        color: item.colorVar
                      }}
                    >
                      <i className={`ti ${item.icon}`}></i>
                    </span>
                    <span className="dt-lrow-tx">
                      <b>{item.code}</b>
                      <span>
                        {item.name} · <i className="ti ti-map-pin" style={{ fontSize: '10px' }}></i> {item.zone}
                      </span>
                    </span>
                    <span className={`badge ${item.badgeClass}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinEquipment;