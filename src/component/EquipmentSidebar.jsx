import React, { useState } from 'react';

// Equipment Data Structure
const EQUIPMENT_DATA = [
  {
    category: 'HVAC · Cooling',
    items: [
      { id: 'chillermgmt', name: 'Chiller Management', state: 'WCCH', stateType: 'cool', icon: 'ti-snowflake' },
      { id: 'chiller', name: 'CH-01 Centrifugal Chiller', state: 'Running', stateType: 'ok', icon: 'ti-snowflake' },
      { id: 'ct', name: 'CT-01 Cooling Tower', state: 'Observe', stateType: 'warn', icon: 'ti-building-factory-2' },
      { id: 'ahuv1', name: 'AHU V1 — Detail List', state: 'New', stateType: 'cool', icon: 'ti-table' },
      { id: 'splitacv1', name: 'Split AC — Detail List', state: 'New', stateType: 'cool', icon: 'ti-air-conditioning' },
      { id: 'vrf', name: 'VRF-01 System', state: 'Running', stateType: '', icon: 'ti-air-conditioning' },
      { id: 'vrfv1', name: 'VRF-01 — Detail List', state: 'New', stateType: 'cool', icon: 'ti-table' },
      { id: 'ef', name: 'EF-01 Exhaust Fan', state: 'Observe', stateType: 'warn', icon: 'ti-rotate' },
      { id: 'coldroom', name: 'CR-01 Cold Room', state: 'Running', stateType: '', icon: 'ti-temperature-snow' },
    ]
  },
  {
    category: 'Water · STP',
    items: [
      { id: 'wms', name: 'Water Management', state: 'WMS', stateType: 'cool', icon: 'ti-droplet-half' },
      { id: 'pump', name: 'PMP-01 Pump', state: 'Running', stateType: '', icon: 'ti-droplet' },
      { id: 'stp', name: 'STP-01 Sewage Treatment', state: 'Running', stateType: 'ok', icon: 'ti-droplet-filled' },
    ]
  },
  {
    category: 'Power · Energy',
    items: [
      { id: 'dg', name: 'DG-01 Diesel Genset', state: 'Standby', stateType: 'idle', icon: 'ti-engine' },
      { id: 'ups', name: 'UPS-01 Server Room', state: 'Online', stateType: 'ok', icon: 'ti-battery-charging' },
      { id: 'panel', name: 'MB-01 Main Breaker', state: 'Running', stateType: '', icon: 'ti-plug' },
      { id: 'meter', name: 'SM-01 Smart Meter', state: 'Active', stateType: '', icon: 'ti-gauge' },
      { id: 'solar', name: 'SLR-01 Solar Array', state: 'Generating', stateType: '', icon: 'ti-solar-panel' },
    ]
  },
  {
    category: 'Life Safety · Vertical',
    items: [
      { id: 'fire', name: 'FP-01 Fire Panel', state: 'Normal', stateType: '', icon: 'ti-flame' },
      { id: 'lift', name: 'Lift-01 Elevator', state: 'Alert', stateType: 'warn', icon: 'ti-elevator' },
    ]
  },
  {
    category: 'Security · Lighting',
    items: [
      { id: 'cctv', name: 'CAM-01 CCTV', state: 'Live', stateType: 'cool', icon: 'ti-video' },
      { id: 'lighting', name: 'LT-01 Lighting', state: 'Auto', stateType: '', icon: 'ti-bulb' },
    ]
  },
  {
    category: 'BMS · Controls',
    items: [
      { id: 'bms', name: 'BMS — Trane SC+', state: '7 Alarms', stateType: 'bad', icon: 'ti-cpu-2' },
    ]
  }
];

export const EquipmentRail = ({ onSelectScreen }) => {
  const [activeScreen, setActiveScreen] = useState('chiller');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (screenId) => {
    setActiveScreen(screenId);
    if (onSelectScreen) {
      onSelectScreen(screenId);
    }
  };

  return (
    <div className="equipment-rail">
      {/* Search Bar */}
      <div className="rail-search">
        <div className="rail-search-inner">
          <i className="ti ti-search"></i>
          <input
            type="text"
            placeholder="Search equipment..."
            id="railSearch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Equipment List */}
      <div className="rail-scroll" id="railScroll">
        {EQUIPMENT_DATA.map((group, groupIdx) => {
          // Filter items based on search input
          const filteredItems = group.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // If no items match in this category, don't display the category header
          if (filteredItems.length === 0) return null;

          return (
            <React.Fragment key={group.category}>
              <div 
                className="rail-group-l" 
                style={groupIdx > 0 ? { marginTop: '8px' } : undefined}
              >
                {group.category}
              </div>

              {filteredItems.map((item) => {
                const isActive = activeScreen === item.id;
                const stateClass = item.stateType ? ` ${item.stateType}` : '';

                return (
                  <div
                    key={item.id}
                    className={`rail-item${isActive ? ' active' : ''}`}
                    data-screen={item.id}
                    onClick={() => handleSelect(item.id)}
                  >
                    <i className={`ti ${item.icon}`}></i>
                    <span className="ri-name">{item.name}</span>
                    <span className={`ri-state${stateClass}`}>{item.state}</span>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentRail;