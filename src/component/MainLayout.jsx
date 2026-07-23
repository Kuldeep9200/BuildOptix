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
import ComplaintsDashboard from '../features/Maintenance/ComplaintsDashboard';
import SlaDashboard from '../features/Maintenance/SlaDashboard';
import VendorDashboard from '../features/Maintenance/VendorDashboard';
import AlertsDashboard from '../features/Monitoring/AlertsDashboard';
import AnomaliesDashboard from '../features/Monitoring/AnomaliesDashboard';
import FddDashboard from '../features/Monitoring/FddDashboard';
import SystemHealthDashboard from '../features/Monitoring/SystemHealthDashboard';
import AccessControlDashboard from '../features/SafetyCompliance/AccessControlDashboard';
import HealthSafetyDashboard from '../features/SafetyCompliance/HealthSafetyDashboard';
import IaqDashboard from '../features/SafetyCompliance/IaqDashboard';
import PermitToWorkDashboard from '../features/SafetyCompliance/PermitToWorkDashboard';
import PowerQualityDashboard from '../features/SafetyCompliance/PowerQualityDashboard';
import ReportsDashboard from '../features/ReportsRecords/ReportsDashboard';
import LogbooksPage from '../features/ReportsRecords/LogbooksPage';
import DigitalTwinBuilding from '../features/Digital_Twin/DigitalTwinBuilding';
import DigitalTwinEquipment from '../features/Digital_Twin/DigitalTwinEquipment';
import DigitalTwinFloorHeatmap from '../features/Digital_Twin/DigitalTwinFloorHeatmap';
import DigitalTwinSensorOverlay from '../features/Digital_Twin/DigitalTwinSensorOverlay';
import DigitalTwinWorkflow from '../features/Digital_Twin/DigitalTwinWorkflow';
// डमी कंपोनेंट्स (यहाँ आपके पेजेस आएंगे)
const CentralDashboard = () => <> <CentralDashboardMain /></>;
const CommandCentre = () => <> <CommandDashboard /> </>;
const SideCenter = () => <> <SiteDashboard /> </>;
const Predictive = () => <> <Predictive_Risk /></>
const AssetsHealt = () => <>  <AssetsHealth /></>
const Space = () => <> <SpaceUtilisation /></>
const Complaints = () => <> <ComplaintsDashboard /></>
const Sla = () => <> <SlaDashboard /></>
const Vendor = () => <> <VendorDashboard /></>
const Alert = () => <> <AlertsDashboard /></>
const Anomalies = () => <> <AnomaliesDashboard /></>
const Fdd = () => <> <FddDashboard /></>
const System = () => <> <SystemHealthDashboard /></>
const Access = () => <> <AccessControlDashboard /></>
const Health = () => <> <HealthSafetyDashboard /></>
const Iaq = () => <> <IaqDashboard /></>
const Permit = () => <> <PermitToWorkDashboard /></>
const PowerQuality = () => <> <PowerQualityDashboard /></>
const Reports = () => <> <ReportsDashboard /></>
const Logbook = () => <> <LogbooksPage /></>
const Building = () => <> <DigitalTwinBuilding /></>
const Equipment = () => <> <DigitalTwinEquipment /></>
const Heatmap = () => <> <DigitalTwinFloorHeatmap /></>
const Overlay = () => <> <DigitalTwinSensorOverlay /></>
const Workflow = () => <> <DigitalTwinWorkflow /></>












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
      case 'space': return <Space />
      case 'complaints': return <Complaints />
      case 'sla': return <Sla />
      case 'vendor': return <Vendor />
      case 'alerts': return <Alert />
      case 'anomalies': return <Anomalies />
      case 'fdd': return <Fdd />
      case 'syshealth': return <System />
      case 'health_safety': return <Health />
      case 'iaq': return <Iaq />
      case 'powerquality': return <PowerQuality />
      case 'access_control': return <Access />
      case 'ptw': return <Permit />
      case 'reports': return <Reports />
      case 'logbooks': return <Logbook />
      // --- Digital Twin Navigation Routes ---
      case 'dtbuilding':
        return <DigitalTwinBuilding />;

      case 'dtfloors':
        return <DigitalTwinFloorHeatmap />;

      case 'dtequip':
        return <DigitalTwinEquipment />;

      case 'dtsensors':
        return <DigitalTwinSensorOverlay />;

      case 'dttwinworkflow':
        return <DigitalTwinWorkflow />;


      default: return <CentralDashboard />;
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
        background: isNightMode ? '#03070c' : '#f8fafc'
      }}
    >
      <TopBar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />

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
