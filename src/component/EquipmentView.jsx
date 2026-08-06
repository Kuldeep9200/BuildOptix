import React, { useState } from 'react';
import TopBar from './TopBar';
import EquipmentRail from '../component/EquipmentSidebar';
import EquipmentTabs from '../component/EquipmentTabs';
import EquipmentSummaryView from '../features/Equipment/EquipmentSummaryView';

// Example Summary Page Component

export default function EquipmentLayout() {
  // --- States ---
  const [isNightMode, setIsNightMode] = useState(true);
  const [activeTab, setActiveTab] = useState('detail'); // 'summary' | 'detail'
  const [selectedScreen, setSelectedScreen] = useState('chiller');

  const handleSelectScreen = (screenId) => {
    setSelectedScreen(screenId);
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
          /* SUMMARY TAB ACTIVE: Sidebar छुप जाएगा और Full Summary Page दिखेगा */
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              background: isNightMode ? '#040911' : '#F0F4FA',
            }}
          >
            {/* यहाँ अपना पूरा Summary View कंपोनेंट रखें */}
            <EquipmentSummaryView isNightMode={isNightMode} />
          </main>
        ) : (
          /* DETAIL TAB ACTIVE: Sidebar (Rail) + Specific Detail View दिखेगा */
          <>
            {/* Left Side: Rail Sidebar */}
            <EquipmentRail onSelectScreen={handleSelectScreen} />

            {/* Right Side: Detail Content Area */}
            <main
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: isNightMode ? '#040911' : '#F0F4FA',
              }}
            >
              {/* यहाँ selectedScreen के हिसाब से Equipment Detail View दिखाएं */}
              <div style={{ color: isNightMode ? '#fff' : '#000' }}>
                <h2>Equipment Detail View ({selectedScreen})</h2>
                {/* <ChillerDetailView selectedScreen={selectedScreen} /> */}
              </div>
            </main>
          </>
        )}

      </div>
    </div>
  );
}