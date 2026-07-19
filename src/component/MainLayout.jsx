import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CentralDashboardMain from '../features/Dashboard/CentralDashboard';
import CommandDashboard from '../features/Dashboard/CommandDashboard';
import '../App.css'
import SiteDashboard from '../features/Dashboard/SiteDashboard';
import Predictive_Risk from '../features/Ai_Intelligence/Predictive_Risk';
import AssetsHealth from '../features/Operations/AssetsHealth';
import SpaceUtilisation from '../features/Operations/SpaceUtilisation';
// डमी कंपोनेंट्स (यहाँ आपके पेजेस आएंगे)
const CentralDashboard = () => <> <CentralDashboardMain /></>;
const CommandCentre = () => <> <CommandDashboard /> </>;
const SideCenter = () => <> <SiteDashboard /> </>;
const Predictive = () => <> <Predictive_Risk /></>
const AssetsHealt = () => <>  <AssetsHealth /></>
const Space = () => <> <SpaceUtilisation /></>
const EnergyUtilities = () => <div style={{ color: '#fff', padding: '20px' }}><h2>🔋 Energy & Utilities Analytics</h2><p>पावर कंजम्पशन और रिसोर्स MANAGEMENT ग्रिड।</p></div>;

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('central');
  const [isNightMode, setIsNightMode] = useState(true);

  const [openGroups, setOpenGroups] = useState({
    dashboard: true,
    operations: false,
  });

  const toggleGroup = (groupKey) => {
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const renderActiveComponent = () => {
    switch (activePage) {
      case 'central': return <CentralDashboard />;
      case 'command': return <CommandCentre />;
      case 'energy': return <EnergyUtilities />;
      case 'Site': return <SideCenter />
      case 'predictive-risk': return <Predictive />
      case 'assets': return <AssetsHealt />
      case 'space':return <Space/>
      default: return <CentralDashboard />;
    }
  };

  return (
    <div
      className={`app-container ${isNightMode ? 'dark-theme' : 'light-theme'}`}
      style={{
        display: 'flex',
        flexDirection: 'column', // सबसे पहले ऊपर से नीचे का फ्लो (TopBar फिर Bottom Area)
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: isNightMode ? '#03070c' : '#f8fafc'
      }}
    >
      {/* 1. TOPBAR: अब यह सबसे ऊपर है और पूरी 100% चौड़ाई लेगा */}
      <TopBar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />

      {/* 2. BOTTOM BODY AREA: टॉपबार के नीचे का हिस्सा जो साइडबार और कंटेंट को अगल-बगल रखेगा */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 60px)', width: '100%', overflow: 'hidden' }}>

        {/* बाएं तरफ साइडबार (अब इसकी ऊंचाई टॉपबार के नीचे से शुरू होगी) */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          activePage={activePage}
          onNavigate={(page) => setActivePage(page)}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
        />

        {/* दाएं तरफ का मुख्य कंटेंट एरिया */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: isNightMode ? '#040911' : '#ffffff' }}>
          {renderActiveComponent()}
        </main>

      </div>
    </div>
  );
}