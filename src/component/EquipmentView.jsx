import React, { useState } from 'react';
import TopBar from './TopBar';
import EquipmentRail from '../component/EquipmentSidebar';
import EquipmentTabs from '../component/EquipmentTabs';
import EquipmentSummaryView from '../features/Equipment/EquipmentSummaryView';
import ChillerPlantDashboard from '../features/Equipment/ChillerPlantDashboard';
import CentrifugalChiller from '../features/Equipment/CentrifugalChiller';
import AhuDashboardInline from '../features/Equipment/AhuDashboardInline';

// Detail Components Import karein

export default function EquipmentLayout() {
  const [isNightMode, setIsNightMode] = useState(true);
  const [activeTab, setActiveTab] = useState('detail'); // 'summary' | 'detail'
  const [selectedScreen, setSelectedScreen] = useState('chiller');

  const handleSelectScreen = (screenId) => {
    setSelectedScreen(screenId);
  };

  // 🎯 Dynamic Component Renderer (ID ke aadhar par component decide karega)
  const renderDetailComponent = () => {
    switch (selectedScreen) {

      case 'chillermgmt': return < ChillerPlantDashboard />;
      case 'chiller': return < CentrifugalChiller />;
      case 'ahuv1': return < AhuDashboardInline />;


      // Aap baaki IDs ke liye cases jod sakte hain:
      // case 'dg': return <DGSetDetail />;
      // case 'ups': return <UPSDetail />;
      // case 'cctv': return <CCTVDetail />;
    }
  };

  return (
    <div
      className={`app-container ${isNightMode ? 'dark-theme' : 'light-theme'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: isNightMode ? '#03070c' : '#f8fafc',
      }}
    >
      {/* 1. Global TopBar */}
      <TopBar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />

      {/* 2. Equipment Header Tabs */}
      <div
        style={{
          borderBottom: isNightMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
          background: isNightMode ? '#080e18' : '#ffffff',
        }}
      >
        <EquipmentTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 3. Main Workspace Area */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 120px)', width: '100%', overflow: 'hidden' }}>

        {activeTab === 'summary' ? (
          /* SUMMARY TAB ACTIVE */
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              background: isNightMode ? '#040911' : '#F0F4FA',
            }}
          >
            <EquipmentSummaryView isNightMode={isNightMode} />
          </main>
        ) : (
          /* DETAIL TAB ACTIVE */
          <>
            {/* Left Side: Rail Sidebar */}
            <EquipmentRail onSelectScreen={handleSelectScreen} />

            {/* Right Side: Detail Content Area */}
            <main
              style={{
                flex: 1,
                overflowY: 'auto',
                background: isNightMode ? '#040911' : '#F0F4FA',
              }}
            >
              {/* 🎯 dynamic view yahan render hoga */}
              {renderDetailComponent()}
            </main>
          </>
        )}

      </div>
    </div>
  );
}