import React from 'react';

// activeTab ki default value 'summary' set kar di hai
const EquipmentTabs = ({ 
  activeTab = 'summary', 
  onTabChange, 
  onShowSummary, 
  onNavigateDashboard 
}) => {
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="eqtabs" id="eqTopTabs">
      <button
        id="eqtab-summary"
        className={`eqtab ${activeTab === 'summary' ? 'sel' : ''}`}
        onClick={() => handleTabClick('summary')}
      >
        <i className="ti ti-layout-grid" />
        Equipment Summary
      </button>

      <button
        id="eqtab-detail"
        className={`eqtab ${activeTab === 'detail' ? 'sel' : ''}`}
        onClick={() => handleTabClick('detail')}
      >
        <i className="ti ti-list-details" />
        Equipment Detail
      </button>
    </div>
  );
};

export default EquipmentTabs;