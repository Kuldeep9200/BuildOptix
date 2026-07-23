import React, { useState, useEffect } from 'react';

const DigitalTwinBuilding = ({
  onFloorSelect,
  onZoneSelect,
  onLayerSelect
}) => {
  // --- Active Component States ---
  const [activeFloor, setActiveFloor] = useState('G');
  const [activeLayer, setActiveLayer] = useState('hvac');
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Tooltip State for Isometric SVG Hover
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    floorId: ''
  });

  // --- Static Floor Data Schema ---
  const floorsData = [
    { id: 'TER', name: 'Terrace', dotColor: 'var(--bad)', barWidth: '85%', barBg: 'var(--bad)', meta: '6z · 1⚠' },
    { id: '14', name: 'Floor 14', dotColor: 'var(--ok)', barWidth: '99%', barBg: 'var(--ok)', meta: '14z' },
    { id: '13', name: 'Floor 13', dotColor: 'var(--ok)', barWidth: '95%', barBg: 'var(--ok)', meta: '14z' },
    { id: '12', name: 'Floor 12', dotColor: 'var(--ok)', barWidth: '96%', barBg: 'var(--ok)', meta: '14z' },
    { id: '11', name: 'Floor 11', dotColor: 'var(--ok)', barWidth: '97%', barBg: 'var(--ok)', meta: '14z' },
    { id: '10', name: 'Floor 10', dotColor: 'var(--bad)', barWidth: '92%', barBg: 'var(--bad)', meta: '16z · 1⚠' },
    { id: '09', name: 'Floor 9', dotColor: 'var(--warn)', barWidth: '85%', barBg: 'var(--warn)', meta: '16z' },
    { id: '08', name: 'Floor 8', dotColor: 'var(--ok)', barWidth: '95%', barBg: 'var(--ok)', meta: '16z' },
    { id: '07', name: 'Floor 7', dotColor: 'var(--warn)', barWidth: '84%', barBg: 'var(--warn)', meta: '16z' },
    { id: '06', name: 'Floor 6', dotColor: 'var(--warn)', barWidth: '87%', barBg: 'var(--warn)', meta: '16z' },
    { id: '05', name: 'Floor 5', dotColor: 'var(--ok)', barWidth: '93%', barBg: 'var(--ok)', meta: '16z' },
    { id: '04', name: 'Floor 4', dotColor: 'var(--warn)', barWidth: '83%', barBg: 'var(--warn)', meta: '16z' },
    { id: '03', name: 'Floor 3', dotColor: 'var(--ok)', barWidth: '97%', barBg: 'var(--ok)', meta: '16z' },
    { id: '02', name: 'Floor 2', dotColor: 'var(--ok)', barWidth: '98%', barBg: 'var(--ok)', meta: '16z' },
    { id: '01', name: 'Floor 1', dotColor: 'var(--bad)', barWidth: '82%', barBg: 'var(--bad)', meta: '16z · 1⚠' },
    { id: 'G', name: 'Ground', dotColor: 'var(--warn)', barWidth: '84%', barBg: 'var(--warn)', meta: '16z' },
    { id: 'B1', name: 'Basement 1', dotColor: 'var(--ok)', barWidth: '95%', barBg: 'var(--ok)', meta: '10z' },
    { id: 'B2', name: 'Basement 2', dotColor: 'var(--ok)', barWidth: '90%', barBg: 'var(--ok)', meta: '8z' }
  ];

  // --- Handlers ---
  const handleFloorClick = (floorId) => {
    setActiveFloor(floorId);
    if (onFloorSelect) onFloorSelect(floorId);
  };

  const handleLayerClick = (layerId) => {
    setActiveLayer(layerId);
    if (onLayerSelect) onLayerSelect(layerId);
  };

  const handleZoneClick = (e, zoneId) => {
    e.stopPropagation();
    if (onZoneSelect) onZoneSelect(zoneId);
  };

  const rotateIso = (direction) => {
    setRotationAngle((prev) => prev + direction * 45);
  };

  const toggleOrbit = () => {
    setIsOrbiting(!isOrbiting);
  };

  // Simulated auto-orbit timer effect
  useEffect(() => {
    let interval = null;
    if (isOrbiting) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 5) % 360);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isOrbiting]);

  // Tooltip Handlers
  const handleIsoMouseMove = (e, fid) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top - 10,
      floorId: fid
    });
  };

  const handleIsoMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="page active" id="pg-dtbuilding">
      <div className="tab-panel active" data-page="dtbuilding" data-tab="0">
        {/* KPI Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi glow-info">
            <div className="kpi-l">Floors Modelled</div>
            <div className="kpi-v">19</div>
            <div className="kpi-s">B2 → Terrace</div>
          </div>
          <div className="kpi glow-info">
            <div className="kpi-l">Zones Mapped</div>
            <div className="kpi-v">240</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Live Data Points</div>
            <div className="kpi-v ok">4,820</div>
            <div className="kpi-s">streaming</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Model Sync</div>
            <div className="kpi-v ok">Live</div>
            <div className="kpi-s">&lt; 2s latency</div>
          </div>
          <div className="kpi glow-ok">
            <div className="kpi-l">Twin Health</div>
            <div className="kpi-v ok">
              98<span className="kpi-u">%</span>
            </div>
          </div>
        </div>

        {/* Digital Twin Main Split View */}
        <div className="dt-split">
          {/* Left Column: Floor Stack List */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Floor Stack</div>
                <div className="cs">Click a floor to inspect · colour = status</div>
              </div>
            </div>
            <div className="cb" style={{ padding: '10px' }}>
              <div id="dt-floor-stack">
                {floorsData.map((fl) => (
                  <div
                    key={fl.id}
                    className={`dt-floor ${activeFloor === fl.id ? 'active' : ''}`}
                    onClick={() => handleFloorClick(fl.id)}
                  >
                    <span className="dt-floor-dot" style={{ background: fl.dotColor }}></span>
                    <span className="dt-floor-name">{fl.name}</span>
                    <span className="dt-floor-bar">
                      <i style={{ width: fl.barWidth, background: fl.barBg }}></i>
                    </span>
                    <span className="dt-floor-meta">{fl.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Building Model & Floor Plan Viewer */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Building Model</div>
                <div className="cs" id="dt-bview-sub">Whole-building view</div>
              </div>
            </div>
            <div className="cb">
              {/* Layer Chips */}
              <div className="dt-layer-chips" id="dt-layer-chips">
                {[
                  { id: 'hvac', label: 'HVAC', icon: 'ti-air-conditioning' },
                  { id: 'elec', label: 'Electrical', icon: 'ti-bolt' },
                  { id: 'fire', label: 'Fire & Safety', icon: 'ti-flame' },
                  { id: 'occ', label: 'Occupancy', icon: 'ti-users' },
                  { id: 'light', label: 'Lighting', icon: 'ti-bulb' }
                ].map((lyr) => (
                  <div
                    key={lyr.id}
                    className={`dt-layer-chip ${activeLayer === lyr.id ? 'active' : ''}`}
                    onClick={() => handleLayerClick(lyr.id)}
                  >
                    <i className={`ti ${lyr.icon}`}></i>
                    {lyr.label}
                  </div>
                ))}
              </div>

              {/* Viewport for Isometric 3D SVG & Controls */}
              <div className="dt-viewport" id="dt-building-view" style={{ position: 'relative' }}>
                <div className="dt-iso-wrap">
                  <div className="dt-iso-toolbar">
                    <span className="dt-bview-floor" style={{ margin: 0 }}>Vikhroli Tower</span>
                    <span className="dt-iso-layerbadge">
                      <i className="ti ti-air-conditioning"></i>
                      {activeLayer.toUpperCase()}
                    </span>
                    <span className="sp"></span>
                    <span className="dt-iso-btn" title="Rotate left" onClick={() => rotateIso(-1)}>
                      <i className="ti ti-rotate-2"></i>
                    </span>
                    <span
                      className={`dt-iso-btn ${isOrbiting ? 'active' : ''}`}
                      id="dt-iso-orbit"
                      title="Auto-orbit"
                      onClick={toggleOrbit}
                    >
                      <i className={`ti ${isOrbiting ? 'ti-player-pause' : 'ti-player-play'}`}></i>
                    </span>
                    <span className="dt-iso-btn" title="Rotate right" onClick={() => rotateIso(1)}>
                      <i className="ti ti-rotate-clockwise-2"></i>
                    </span>
                  </div>

                  {/* Isometric Building Projection Stage */}
                  <div className="dt-iso-stage" style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 0.3s ease' }}>
                    <svg className="dt-iso-svg" viewBox="0 0 261 432" xmlns="http://www.w3.org/2000/svg">
                      {/* B2 Floor */}
                      <g className={`dt-iso-floor ${activeFloor === 'B2' ? 'active' : ''}`} onClick={() => handleFloorClick('B2')} onMouseMove={(e) => handleIsoMouseMove(e, 'B2')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,349.0 130.6,414.0 130.6,400.0 243.2,335.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,414.0 18.0,349.0 18.0,335.0 130.6,400.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,270.0 243.2,335.0 130.6,400.0 18.0,335.0" fill="#27c07a" />
                      </g>
                      {/* B1 Floor */}
                      <g className={`dt-iso-floor ${activeFloor === 'B1' ? 'active' : ''}`} onClick={() => handleFloorClick('B1')} onMouseMove={(e) => handleIsoMouseMove(e, 'B1')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,335.0 130.6,400.0 130.6,386.0 243.2,321.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,400.0 18.0,335.0 18.0,321.0 130.6,386.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,256.0 243.2,321.0 130.6,386.0 18.0,321.0" fill="#27c07a" />
                      </g>
                      {/* Ground Floor */}
                      <g className={`dt-iso-floor ${activeFloor === 'G' ? 'active' : ''}`} onClick={() => handleFloorClick('G')} onMouseMove={(e) => handleIsoMouseMove(e, 'G')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,321.0 130.6,386.0 130.6,372.0 243.2,307.0" fill="rgb(135,98,34)" />
                        <polygon className="sideR" points="130.6,386.0 18.0,321.0 18.0,307.0 130.6,372.0" fill="rgb(181,132,45)" />
                        <polygon className="top" points="130.6,242.0 243.2,307.0 130.6,372.0 18.0,307.0" fill="#e8a93a" stroke="#fff" strokeWidth="1.6" />
                        <text x="130.6" y="310.0" textAnchor="middle" fontSize="9" fontWeight="700" fill="#06140d" style={{ pointerEvents: 'none' }}>G</text>
                      </g>
                      {/* Floor 1 */}
                      <g className={`dt-iso-floor ${activeFloor === '01' ? 'active' : ''}`} onClick={() => handleFloorClick('01')} onMouseMove={(e) => handleIsoMouseMove(e, '01')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,307.0 130.6,372.0 130.6,358.0 243.2,293.0" fill="rgb(135,58,52)" />
                        <polygon className="sideR" points="130.6,372.0 18.0,307.0 18.0,293.0 130.6,358.0" fill="rgb(181,78,70)" />
                        <polygon className="top" points="130.6,228.0 243.2,293.0 130.6,358.0 18.0,293.0" fill="#e8645a" />
                      </g>
                      {/* Floor 2 */}
                      <g className={`dt-iso-floor ${activeFloor === '02' ? 'active' : ''}`} onClick={() => handleFloorClick('02')} onMouseMove={(e) => handleIsoMouseMove(e, '02')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,293.0 130.6,358.0 130.6,344.0 243.2,279.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,358.0 18.0,293.0 18.0,279.0 130.6,344.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,214.0 243.2,279.0 130.6,344.0 18.0,279.0" fill="#27c07a" />
                      </g>
                      {/* Floor 3 */}
                      <g className={`dt-iso-floor ${activeFloor === '03' ? 'active' : ''}`} onClick={() => handleFloorClick('03')} onMouseMove={(e) => handleIsoMouseMove(e, '03')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,279.0 130.6,344.0 130.6,330.0 243.2,265.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,344.0 18.0,279.0 18.0,265.0 130.6,330.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,200.0 243.2,265.0 130.6,330.0 18.0,265.0" fill="#27c07a" />
                      </g>
                      {/* Floor 4 */}
                      <g className={`dt-iso-floor ${activeFloor === '04' ? 'active' : ''}`} onClick={() => handleFloorClick('04')} onMouseMove={(e) => handleIsoMouseMove(e, '04')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,265.0 130.6,330.0 130.6,316.0 243.2,251.0" fill="rgb(135,98,34)" />
                        <polygon className="sideR" points="130.6,330.0 18.0,265.0 18.0,251.0 130.6,316.0" fill="rgb(181,132,45)" />
                        <polygon className="top" points="130.6,186.0 243.2,251.0 130.6,316.0 18.0,251.0" fill="#e8a93a" />
                      </g>
                      {/* Floor 5 */}
                      <g className={`dt-iso-floor ${activeFloor === '05' ? 'active' : ''}`} onClick={() => handleFloorClick('05')} onMouseMove={(e) => handleIsoMouseMove(e, '05')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,251.0 130.6,316.0 130.6,302.0 243.2,237.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,316.0 18.0,251.0 18.0,237.0 130.6,302.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,172.0 243.2,237.0 130.6,302.0 18.0,237.0" fill="#27c07a" />
                      </g>
                      {/* Floor 6 */}
                      <g className={`dt-iso-floor ${activeFloor === '06' ? 'active' : ''}`} onClick={() => handleFloorClick('06')} onMouseMove={(e) => handleIsoMouseMove(e, '06')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,237.0 130.6,302.0 130.6,288.0 243.2,223.0" fill="rgb(135,98,34)" />
                        <polygon className="sideR" points="130.6,302.0 18.0,237.0 18.0,223.0 130.6,288.0" fill="rgb(181,132,45)" />
                        <polygon className="top" points="130.6,158.0 243.2,223.0 130.6,288.0 18.0,223.0" fill="#e8a93a" />
                      </g>
                      {/* Floor 7 */}
                      <g className={`dt-iso-floor ${activeFloor === '07' ? 'active' : ''}`} onClick={() => handleFloorClick('07')} onMouseMove={(e) => handleIsoMouseMove(e, '07')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,223.0 130.6,288.0 130.6,274.0 243.2,209.0" fill="rgb(135,98,34)" />
                        <polygon className="sideR" points="130.6,288.0 18.0,223.0 18.0,209.0 130.6,274.0" fill="rgb(181,132,45)" />
                        <polygon className="top" points="130.6,144.0 243.2,209.0 130.6,274.0 18.0,209.0" fill="#e8a93a" />
                      </g>
                      {/* Floor 8 */}
                      <g className={`dt-iso-floor ${activeFloor === '08' ? 'active' : ''}`} onClick={() => handleFloorClick('08')} onMouseMove={(e) => handleIsoMouseMove(e, '08')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,209.0 130.6,274.0 130.6,260.0 243.2,195.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,274.0 18.0,209.0 18.0,195.0 130.6,260.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,130.0 243.2,195.0 130.6,260.0 18.0,195.0" fill="#27c07a" />
                      </g>
                      {/* Floor 9 */}
                      <g className={`dt-iso-floor ${activeFloor === '09' ? 'active' : ''}`} onClick={() => handleFloorClick('09')} onMouseMove={(e) => handleIsoMouseMove(e, '09')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,195.0 130.6,260.0 130.6,246.0 243.2,181.0" fill="rgb(135,98,34)" />
                        <polygon className="sideR" points="130.6,260.0 18.0,195.0 18.0,181.0 130.6,246.0" fill="rgb(181,132,45)" />
                        <polygon className="top" points="130.6,116.0 243.2,181.0 130.6,246.0 18.0,181.0" fill="#e8a93a" />
                      </g>
                      {/* Floor 10 */}
                      <g className={`dt-iso-floor ${activeFloor === '10' ? 'active' : ''}`} onClick={() => handleFloorClick('10')} onMouseMove={(e) => handleIsoMouseMove(e, '10')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,181.0 130.6,246.0 130.6,232.0 243.2,167.0" fill="rgb(135,58,52)" />
                        <polygon className="sideR" points="130.6,246.0 18.0,181.0 18.0,167.0 130.6,232.0" fill="rgb(181,78,70)" />
                        <polygon className="top" points="130.6,102.0 243.2,167.0 130.6,232.0 18.0,167.0" fill="#e8645a" />
                      </g>
                      {/* Floor 11 */}
                      <g className={`dt-iso-floor ${activeFloor === '11' ? 'active' : ''}`} onClick={() => handleFloorClick('11')} onMouseMove={(e) => handleIsoMouseMove(e, '11')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,167.0 130.6,232.0 130.6,218.0 243.2,153.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,232.0 18.0,167.0 18.0,153.0 130.6,218.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,88.0 243.2,153.0 130.6,218.0 18.0,153.0" fill="#27c07a" />
                      </g>
                      {/* Floor 12 */}
                      <g className={`dt-iso-floor ${activeFloor === '12' ? 'active' : ''}`} onClick={() => handleFloorClick('12')} onMouseMove={(e) => handleIsoMouseMove(e, '12')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,153.0 130.6,218.0 130.6,204.0 243.2,139.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,218.0 18.0,153.0 18.0,139.0 130.6,204.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,74.0 243.2,139.0 130.6,204.0 18.0,139.0" fill="#27c07a" />
                      </g>
                      {/* Floor 13 */}
                      <g className={`dt-iso-floor ${activeFloor === '13' ? 'active' : ''}`} onClick={() => handleFloorClick('13')} onMouseMove={(e) => handleIsoMouseMove(e, '13')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,139.0 130.6,204.0 130.6,190.0 243.2,125.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,204.0 18.0,139.0 18.0,125.0 130.6,190.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,60.0 243.2,125.0 130.6,190.0 18.0,125.0" fill="#27c07a" />
                      </g>
                      {/* Floor 14 */}
                      <g className={`dt-iso-floor ${activeFloor === '14' ? 'active' : ''}`} onClick={() => handleFloorClick('14')} onMouseMove={(e) => handleIsoMouseMove(e, '14')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,125.0 130.6,190.0 130.6,176.0 243.2,111.0" fill="rgb(23,111,71)" />
                        <polygon className="sideR" points="130.6,190.0 18.0,125.0 18.0,111.0 130.6,176.0" fill="rgb(30,150,95)" />
                        <polygon className="top" points="130.6,46.0 243.2,111.0 130.6,176.0 18.0,111.0" fill="#27c07a" />
                      </g>
                      {/* Terrace */}
                      <g className={`dt-iso-floor ${activeFloor === 'TER' ? 'active' : ''}`} onClick={() => handleFloorClick('TER')} onMouseMove={(e) => handleIsoMouseMove(e, 'TER')} onMouseLeave={handleIsoMouseLeave}>
                        <polygon className="sideL" points="243.2,111.0 130.6,176.0 130.6,162.0 243.2,97.0" fill="rgb(135,58,52)" />
                        <polygon className="sideR" points="130.6,176.0 18.0,111.0 18.0,97.0 130.6,162.0" fill="rgb(181,78,70)" />
                        <polygon className="top" points="130.6,32.0 243.2,97.0 130.6,162.0 18.0,97.0" fill="#e8645a" />
                      </g>
                    </svg>
                  </div>

                  {/* Caption Info */}
                  <div className="dt-iso-cap">
                    Selected <b>{floorsData.find((f) => f.id === activeFloor)?.name || activeFloor}</b> · 16 zones · 21% occupied · health 84%
                  </div>

                  {/* Dynamic Tooltip */}
                  {tooltip.visible && (
                    <div
                      className="dt-iso-tip"
                      id="dt-iso-tip"
                      style={{
                        display: 'block',
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y}px`,
                        position: 'absolute',
                        pointerEvents: 'none'
                      }}
                    >
                      <b>Floor {tooltip.floorId}</b> <span style={{ color: 'var(--ok)' }}>●</span> Healthy
                      <div className="r"><span>Zones</span><span>16</span></div>
                      <div className="r"><span>Occupancy</span><span>23%</span></div>
                      <div className="r"><span>Health</span><span>98%</span></div>
                      <div className="r"><span>Open alarms</span><span>0</span></div>
                    </div>
                  )}
                </div>

                {/* Floor Plan Viewport */}
                <div style={{ marginTop: '13px' }}>
                  <div className="dt-bview-sub" style={{ marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <i className="ti ti-air-conditioning" style={{ color: 'var(--info)' }}></i>
                    {floorsData.find((f) => f.id === activeFloor)?.name || activeFloor} — {activeLayer.toUpperCase()} — AHUs, duct runs &amp; VAV diffusers
                  </div>
                  <div className="dt-plan-host">
                    <svg className="dt-plan-svg" viewBox="0 0 460 290" xmlns="http://www.w3.org/2000/svg">
                      <rect x="14" y="14" width="432" height="262" rx="7" fill="none" stroke="var(--line-3)" strokeWidth="1.3" />
                      <text className="dt-plan-platelbl" x="440" y="269" textAnchor="end" fontSize="9">
                        {activeFloor.toUpperCase()} · 16 ZONES
                      </text>

                      {/* Zone Grid */}
                      {[
                        { id: '1', x: 17.0, y: 17.0 },
                        { id: '2', x: 89.0, y: 17.0 },
                        { id: '3', x: 161.0, y: 17.0 },
                        { id: '4', x: 233.0, y: 17.0 },
                        { id: '5', x: 305.0, y: 17.0 },
                        { id: '6', x: 377.0, y: 17.0 },
                        { id: '7', x: 377.0, y: 82.5 },
                        { id: '8', x: 377.0, y: 148.0 },
                        { id: '9', x: 377.0, y: 213.5 },
                        { id: '10', x: 305.0, y: 213.5 },
                        { id: '11', x: 233.0, y: 213.5 },
                        { id: '12', x: 161.0, y: 213.5 },
                        { id: '13', x: 89.0, y: 213.5 },
                        { id: '14', x: 17.0, y: 213.5 },
                        { id: '15', x: 17.0, y: 148.0 },
                        { id: '16', x: 17.0, y: 82.5 }
                      ].map((z) => {
                        const zoneKey = `${activeFloor}-Z${z.id}`;
                        return (
                          <g key={z.id} className="dt-plan-zone" onClick={(e) => handleZoneClick(e, zoneKey)}>
                            <title>{zoneKey}</title>
                            <rect className="zr dt-plan-mz" x={z.x} y={z.y} width="66.0" height="59.5" rx="4" />
                            <text className="dt-plan-zlabel" x={z.x + 5} y={z.y + 12} fontSize="8" style={{ fill: 'var(--ink-3)' }}>
                              Z{z.id}
                            </text>
                          </g>
                        );
                      })}

                      {/* Building Core */}
                      <rect className="dt-plan-core" x="89" y="82.5" width="282" height="125" rx="5" />
                      <line x1="230.0" y1="89.5" x2="230.0" y2="200.5" stroke="var(--line-2)" strokeWidth="1" />
                      <text className="dt-plan-corelbl" x="159.5" y="142.0" textAnchor="middle" fontSize="8.5">LIFTS</text>
                      <text className="dt-plan-corelbl" x="159.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">CORE ×4</text>
                      <text className="dt-plan-corelbl" x="300.5" y="142.0" textAnchor="middle" fontSize="8.5">STAIRS</text>
                      <text className="dt-plan-corelbl" x="300.5" y="154.0" textAnchor="middle" fontSize="7.5" opacity="0.7">WC · SHAFT</text>

                      {/* HVAC Lines */}
                      <line x1="99.0" y1="90.5" x2="50.0" y2="46.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="122.0" y2="46.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="194.0" y2="46.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="266.0" y2="46.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="338.0" y2="46.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="410.0" y2="46.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="410.0" y2="112.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="410.0" y2="177.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="410.0" y2="243.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="338.0" y2="243.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="266.0" y2="243.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="194.0" y2="243.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="122.0" y2="243.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="50.0" y2="243.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="99.0" y1="90.5" x2="50.0" y2="177.8" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />
                      <line x1="361.0" y1="90.5" x2="50.0" y2="112.3" stroke="#4EA1FF" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.85" />

                      {/* VAV Box Terminals */}
                      {[
                        { x: 45.0, y: 41.8, ly: 46.75 },
                        { x: 117.0, y: 41.8, ly: 46.75 },
                        { x: 189.0, y: 41.8, ly: 46.75 },
                        { x: 261.0, y: 41.8, ly: 46.75 },
                        { x: 333.0, y: 41.8, ly: 46.75 },
                        { x: 405.0, y: 41.8, ly: 46.75 },
                        { x: 405.0, y: 107.3, ly: 112.25 },
                        { x: 405.0, y: 172.8, ly: 177.75 },
                        { x: 405.0, y: 238.3, ly: 243.25 },
                        { x: 333.0, y: 238.3, ly: 243.25 },
                        { x: 261.0, y: 238.3, ly: 243.25 },
                        { x: 189.0, y: 238.3, ly: 243.25 },
                        { x: 117.0, y: 238.3, ly: 243.25 },
                        { x: 45.0, y: 238.3, ly: 243.25 },
                        { x: 45.0, y: 172.8, ly: 177.75 },
                        { x: 45.0, y: 107.3, ly: 112.25 }
                      ].map((item, idx) => (
                        <React.Fragment key={idx}>
                          <rect x={item.x} y={item.y} width="10" height="10" rx="2" fill="none" stroke="#4EA1FF" strokeWidth="1.3" />
                          <line x1={item.x} y1={item.ly} x2={item.x + 10} y2={item.ly} stroke="#4EA1FF" strokeWidth="1" />
                        </React.Fragment>
                      ))}

                      {/* AHUs */}
                      <rect x="90.0" y="84.5" width="18" height="12" rx="2" fill="#4EA1FF" />
                      <text x="99.0" y="93.7" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#06140d">AHU</text>
                      <rect x="352.0" y="84.5" width="18" height="12" rx="2" fill="#4EA1FF" />
                      <text x="361.0" y="93.7" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#06140d">AHU</text>

                      {/* Active Overlay Tag */}
                      <g>
                        <rect x="14" y="14" width="172" height="20" rx="10" fill="var(--bg-1)" opacity="0.9" />
                        <circle cx="26" cy="24" r="4" fill="#4EA1FF" />
                        <text x="36" y="27.5" fontSize="8.5" style={{ fill: 'var(--ink-2)' }} fontWeight="600">
                          {activeLayer.toUpperCase()} LAYER
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinBuilding;