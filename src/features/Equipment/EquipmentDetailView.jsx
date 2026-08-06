import React, { useState, useMemo } from 'react';

// Mock Data Structure
const INITIAL_UNITS = Array.from({ length: 18 }, (_, index) => {
  const unitNum = String(index + 1).padStart(2, '0');
  const isOff = index >= 15; // Last 3 units are OFF
  const hasFault = index === 5 || index === 14; // Sample faults

  return {
    id: index,
    code: `AHU-V1-${unitNum}`,
    name: `AHU-V1-${unitNum}`,
    location: 'Vikhroli Campus',
    category: 'AHU-V1',
    status: isOff ? 'OFF' : 'ON',
    runningStatus: isOff ? 'Stopped' : 'Running',
    supplyAirTemp: '13.0 °C',
    vfdSpeed: '40 %',
    damperPos: '30 %',
    filterStatus: index === 0 ? 'Replace' : 'Clean',
    fault: hasFault ? 'Fault' : 'Normal',
    runtimeHours: '800 h',
  };
});

export default function EquipmentDetailView({
  categoryName = 'AHU-V1',
  onShowSummary,
  onOpenCategory,
}) {
  // --- States ---
  const [units, setUnits] = useState(INITIAL_UNITS);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'on' | 'off' | 'fault'
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('detail'); // 'detail' | 'graphics' | 'view'

  // --- Filtered Units List ---
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      // Search filter
      const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Chip filter
      let matchesFilter = true;
      if (filterMode === 'on') matchesFilter = unit.status === 'ON';
      if (filterMode === 'off') matchesFilter = unit.status === 'OFF';
      if (filterMode === 'fault') matchesFilter = unit.fault === 'Fault';

      return matchesSearch && matchesFilter;
    });
  }, [units, filterMode, searchTerm]);

  // Selected Unit Data
  const currentUnit = units[selectedUnitIndex] || units[0];

  // --- Handlers ---
  const handleTogglePower = (targetStatus) => {
    setUnits((prev) =>
      prev.map((u, i) =>
        i === selectedUnitIndex
          ? {
              ...u,
              status: targetStatus,
              runningStatus: targetStatus === 'ON' ? 'Running' : 'Stopped',
            }
          : u
      )
    );
  };

  return (
    <div className="eqs-wrap" id="eqSummaryView" style={{ display: 'flex' }}>
      {/* 1. Header with Breadcrumb & View Toggle */}
      <div className="eqs-head">
        <div className="eqs-bc" id="eqBreadcrumb">
          <span className="crumb" onClick={onShowSummary} style={{ cursor: 'pointer' }}>
            <i className="ti ti-cpu" /> Equipment
          </span>
          <span className="sep">›</span>
          <span
            className="crumb"
            onClick={() => onOpenCategory && onOpenCategory('ahuv1', 'detail')}
            style={{ cursor: 'pointer' }}
          >
            {categoryName}
          </span>
          <span className="sep">›</span>
          <span className="cur">Equipment Detail</span>
        </div>

        <div className="eqs-grow" />

        <div id="eqViewToggle">
          <div className="eqs-toggle">
            <button
              className={viewMode === 'detail' ? 'sel' : ''}
              onClick={() => setViewMode('detail')}
            >
              <i className="ti ti-clipboard-data" /> Equipment Detail
            </button>
            <button
              className={viewMode === 'graphics' ? 'sel' : ''}
              onClick={() => setViewMode('graphics')}
            >
              <i className="ti ti-photo" /> Graphics
            </button>
            <button
              className={viewMode === 'view' ? 'sel' : ''}
              onClick={() => setViewMode('view')}
            >
              <i className="ti ti-list" /> View
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Body */}
      <div className="eqs-body" id="eqSumContent">
        {/* Filter Bar */}
        <div className="eqs-fbar">
          <div className="eqs-chips">
            <button
              className={`eqs-chip ${filterMode === 'all' ? 'sel' : ''}`}
              onClick={() => setFilterMode('all')}
            >
              All<span className="ct">{units.length}</span>
            </button>
            <button
              className={`eqs-chip ${filterMode === 'on' ? 'sel' : ''}`}
              onClick={() => setFilterMode('on')}
            >
              Running<span className="ct">{units.filter((u) => u.status === 'ON').length}</span>
            </button>
            <button
              className={`eqs-chip ${filterMode === 'off' ? 'sel' : ''}`}
              onClick={() => setFilterMode('off')}
            >
              Stopped<span className="ct">{units.filter((u) => u.status === 'OFF').length}</span>
            </button>
            <button
              className={`eqs-chip ${filterMode === 'fault' ? 'sel' : ''}`}
              onClick={() => setFilterMode('fault')}
            >
              Fault<span className="ct">{units.filter((u) => u.fault === 'Fault').length}</span>
            </button>
          </div>

          <div className="eqs-search">
            <i className="ti ti-search" />
            <input
              placeholder={`Search ${categoryName}…`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Workspace Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          {/* Left Side: Units List Sidebar */}
          <div>
            <div className="eqs-units">
              {filteredUnits.map((unit) => (
                <button
                  key={unit.id}
                  className={`eqs-unitbtn ${selectedUnitIndex === unit.id ? 'sel' : ''}`}
                  onClick={() => setSelectedUnitIndex(unit.id)}
                >
                  <i
                    className={
                      unit.status === 'ON' ? 'ti ti-player-play-filled' : 'ti ti-player-stop-filled'
                    }
                  />
                  <span className="un">{unit.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.8 }}>
                    {unit.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Unit Details & Control View */}
          {currentUnit && (
            <div>
              {/* Top Banner */}
              <div className="eqs-dbanner">
                <span className="ic">
                  <i className="ti ti-air-conditioning" />
                </span>
                <div>
                  <div className="nm">{currentUnit.name}</div>
                  <div className="sub">
                    {currentUnit.category} · {currentUnit.name} · {currentUnit.location}
                  </div>
                </div>

                <div className="eqs-ctlrow">
                  <span
                    className={`eqs-cbtn ${currentUnit.status === 'ON' ? 'on' : ''}`}
                    onClick={() => handleTogglePower('ON')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti ti-power" /> ON
                  </span>
                  <span
                    className={`eqs-cbtn ${currentUnit.status === 'OFF' ? 'on' : ''}`}
                    onClick={() => handleTogglePower('OFF')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti ti-player-stop" /> Turn OFF
                  </span>
                  <span className="eqs-cbtn" style={{ cursor: 'pointer' }}>
                    <i className="ti ti-adjustments" /> Auto
                  </span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="eqs-keys">
                <div className="eqs-key">
                  <div className="l">Running Status</div>
                  <div className="v">{currentUnit.runningStatus}</div>
                </div>
                <div className="eqs-key">
                  <div className="l">ON / OFF</div>
                  <div className="v">{currentUnit.status}</div>
                </div>
                <div className="eqs-key">
                  <div className="l">Supply Air Temp</div>
                  <div className="v">{currentUnit.supplyAirTemp}</div>
                </div>
                <div className="eqs-key">
                  <div className="l">VFD Speed</div>
                  <div className="v">{currentUnit.vfdSpeed}</div>
                </div>
              </div>

              {/* All Parameters Grid */}
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--ink-3)',
                  margin: '0 2px 8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '.05em',
                }}
              >
                All Parameters
              </div>

              <div className="eqs-pgrid">
                <div className="eqs-prow">
                  <span className="k">Running Status</span>
                  <span className="v">{currentUnit.runningStatus}</span>
                </div>
                <div className="eqs-prow">
                  <span className="k">ON / OFF</span>
                  <span className="v">{currentUnit.status}</span>
                </div>
                <div className="eqs-prow">
                  <span className="k">Supply Air Temp</span>
                  <span className="v">{currentUnit.supplyAirTemp}</span>
                </div>
                <div className="eqs-prow">
                  <span className="k">VFD Speed</span>
                  <span className="v">{currentUnit.vfdSpeed}</span>
                </div>
                <div className="eqs-prow">
                  <span className="k">Damper Position</span>
                  <span className="v">{currentUnit.damperPos}</span>
                </div>
                <div className="eqs-prow">
                  <span className="k">Filter Status</span>
                  <span
                    className="v"
                    style={{
                      color: currentUnit.filterStatus === 'Replace' ? 'var(--bad)' : 'inherit',
                    }}
                  >
                    {currentUnit.filterStatus}
                  </span>
                </div>
                <div className="eqs-prow">
                  <span className="k">Fault / Alarm</span>
                  <span
                    className="v"
                    style={{
                      color: currentUnit.fault === 'Fault' ? 'var(--bad)' : 'inherit',
                    }}
                  >
                    {currentUnit.fault}
                  </span>
                </div>
                <div className="eqs-prow">
                  <span className="k">Runtime Hours</span>
                  <span className="v">{currentUnit.runtimeHours}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}