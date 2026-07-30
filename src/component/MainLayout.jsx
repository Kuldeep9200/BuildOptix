import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

// Feature Component Imports
import CentralDashboardMain from '../features/Dashboard/CentralDashboard';
import CommandDashboard from '../features/Dashboard/CommandDashboard';
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
import AdminBrandingConfig from '../features/Administration/AdminBrandingConfig';
import { AdminIntegrations } from '../features/Administration/AdminIntegrations';
import AdminSecurity from '../features/Administration/AdminSecurity';
import AdminSiteConfig from '../features/Administration/AdminSiteConfig';
import AdminUsersRoles from '../features/Administration/AdminUsersRoles';
import DesignSystem from '../features/Administration/DesignSystem';
import MobileAppPreview from '../features/Administration/MobileAppPreview';

// AI Intelligence Component Imports
import AITimelineComp from '../features/Ai_Intelligence/AITimeline';
import AISummaryComp from '../features/Ai_Intelligence/AI_Summary';
import MaintenanceComp from '../features/Ai_Intelligence/Maintenance';
import OptimizationComp from '../features/Ai_Intelligence/Optimisation';
import RootCauseComp from '../features/Ai_Intelligence/RootCause';
import SrmSiteCommissioningDashboard from '../features/Site_Commissioning/SrmSiteCommissioningDashboard';
import '../App.css';
import Energy_Utilities from '../features/Operations/Energy_Utilities';


export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('central');
  const [activeTab, setActiveTab] = useState(0); // Top Header Tab Sync
  const [isNightMode, setIsNightMode] = useState(true);

  const [openGroups, setOpenGroups] = useState({
    dashboard: true,
    operations: false,
    ai: true,
  });

  const toggleGroup = (groupKey) => {
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  // Render active route dynamically
  const renderActiveComponent = () => {
    switch (activePage) {
      // --- Dashboard Routes ---
      case 'central': return <CentralDashboardMain />;
      case 'command': return <CommandDashboard />;
      case 'site': return <SiteDashboard />;

      // --- AI Intelligence Routes ---
      case 'ai-summary': return <AISummaryComp activePage={activePage} />;
      case 'predictive-risk': return <Predictive_Risk activePage={activePage} />;
      case 'root-cause': return <RootCauseComp activePage={activePage} />;
      case 'optimisation': return <OptimizationComp activePage={activePage} />;
      case 'ai-timeline': return <AITimelineComp activePage={activePage} />;
      case 'maintenance': return <MaintenanceComp activePage={activePage} />;

      // --- Operations & Maintenance Routes ---
      case 'assets': return <AssetsHealth />;
      case 'space': return <SpaceUtilisation />;
      case 'complaints': return <ComplaintsDashboard />;
      case 'sla': return <SlaDashboard />;
      case 'vendor': return <VendorDashboard />;
      case 'energy': return <Energy_Utilities />;

      // --- Monitoring Routes ---
      case 'alerts': return <AlertsDashboard />;
      case 'anomalies': return <AnomaliesDashboard />;
      case 'fdd': return <FddDashboard />;
      case 'syshealth': return <SystemHealthDashboard />;

      // --- Safety & Compliance Routes ---
      case 'health_safety': return <HealthSafetyDashboard />;
      case 'iaq': return <IaqDashboard />;
      case 'powerquality': return <PowerQualityDashboard />;
      case 'access_control': return <AccessControlDashboard />;
      case 'ptw': return <PermitToWorkDashboard />;

      // --- Reports & Logbooks ---
      case 'reports': return <ReportsDashboard />;
      case 'logbooks': return <LogbooksPage />;

      // --- Digital Twin Navigation Routes ---
      case 'dtbuilding': return <DigitalTwinBuilding />;
      case 'dtfloors': return <DigitalTwinFloorHeatmap />;
      case 'dtequip': return <DigitalTwinEquipment />;
      case 'dtsensors': return <DigitalTwinSensorOverlay />;
      case 'dttwinworkflow': return <DigitalTwinWorkflow />;

      // --- Administration Routes ---
      case 'adminusers': return <AdminUsersRoles />;
      case 'adminsite': return <AdminSiteConfig />;
      case 'adminbranding': return <AdminBrandingConfig />;
      case 'adminintegrations': return <AdminIntegrations />;
      case 'adminsecurity': return <AdminSecurity />;
      case 'designsystem': return <DesignSystem />;
      case 'mobileapp': return <MobileAppPreview />;
      case 'srmsite': return <SrmSiteCommissioningDashboard />;

      default: return <CentralDashboardMain />;
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
      <TopBar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />

      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 60px)', width: '100%', overflow: 'hidden' }}>

        {/* Sidebar with all required props */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          activePage={activePage}
          onNavigate={(page) => setActivePage(page)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
        />

        {/* Main Content Area */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: isNightMode ? '#040911' : '#F0F4FA', marginBottom: "22px" }}>
          {renderActiveComponent()}
        </main>

      </div>
    </div>
  );
}