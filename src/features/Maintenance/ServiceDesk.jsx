import React, { useState } from 'react';
import { showToast } from '../../utils/toast';

// Sample Mock Data (इसे आप API या Props से भी पास कर सकते हैं)
const ticketsData = [
  { id: 'TKT-1056', title: 'CH-01 Chiller — High Condenser Pressure', asset: 'CH-01 Chiller', priority: 'Critical', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'Unassigned', status: 'New', slaBreach: '139h 45m', updated: '11:52 AM' },
  { id: 'TKT-1055', title: 'Lift-04 — Door Sensor Fault', asset: 'Lift-04', priority: 'Critical', team: 'Command Centre', teamColor: 'var(--info)', teamIcon: 'ti-broadcast', owner: 'Unassigned', status: 'New', slaBreach: '186h 44m', updated: '12:53 PM' },
  { id: 'TKT-1054', title: 'AHU Zone C — HVAC Temp Breach Floor 7', asset: 'AHU Zone C', priority: 'Critical', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'Unassigned', status: 'New', slaBreach: '186h 44m', updated: '12:53 PM' },
  { id: 'TKT-1044', title: 'IOT-GW07 — Edge Gateway Offline', asset: 'IOT-GW07 Gateway', priority: 'Critical', team: 'Command Centre', teamColor: 'var(--info)', teamIcon: 'ti-broadcast', owner: 'Unassigned', status: 'New', slaBreach: '525h 5m', updated: '10:32 AM' },
  { id: 'TKT-1042', title: 'CH-01 Chiller — High Condenser Pressure', asset: 'CH-01 Chiller', priority: 'Critical', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'Rajesh Sharma · L1', status: 'In Progress', slaBreach: '525h 56m', updated: '10:01 AM' },
  { id: 'TKT-1043', title: 'AHU Zone C — Temperature Breach Floor 7', asset: 'AHU Zone C', priority: 'Critical', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'HVAC Team B · L2', status: 'Acknowledged', slaBreach: '527h 42m', updated: '8:15 AM' },
  { id: 'TKT-1053', title: 'IOT-CT01 — Comms Degraded', asset: 'IOT-CT01 Cooling Tower Node', priority: 'High', team: 'Command Centre', teamColor: 'var(--info)', teamIcon: 'ti-broadcast', owner: 'Unassigned', status: 'New', slaBreach: '520h 54m', updated: '10:43 AM' },
  { id: 'TKT-1049', title: 'CAM-08 Loading Bay — Unauthorized Access', asset: 'CAM-08', priority: 'High', team: 'Site Team', teamColor: 'var(--violet)', teamIcon: 'ti-building', owner: 'Unassigned', status: 'New', slaBreach: '521h 2m', updated: '10:35 AM' },
  { id: 'TKT-1045', title: 'Lift-04 — Door Sensor Fault', asset: 'Lift-04', priority: 'High', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'Vikram Patel', status: 'In Progress', slaBreach: '521h 40m', updated: '10:05 AM' },
  { id: 'TKT-1046', title: 'IOT-MTR03 — Meter Comms Intermittent', asset: 'IOT-MTR03 Meter', priority: 'High', team: 'Command Centre', teamColor: 'var(--info)', teamIcon: 'ti-broadcast', owner: 'Neha Iyer (NOC)', status: 'Acknowledged', slaBreach: '522h 29m', updated: '9:23 AM' },
  { id: 'TKT-1048', title: 'CT-01 — High Entering Water Temp', asset: 'CT-01', priority: 'Medium', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'Amit Deshpande', status: 'Acknowledged', slaBreach: '507h 4m', updated: '8:43 AM' },
  { id: 'TKT-1047', title: 'Tower B Lobby — AC Not Cooling', asset: 'AHU-12 / Lobby', priority: 'Medium', team: 'Site Team', teamColor: 'var(--violet)', teamIcon: 'ti-building', owner: 'Priya Menon', status: 'In Progress', slaBreach: '508h 24m', updated: '7:21 AM' },
  { id: 'TKT-1050', title: 'PMP-01 — High Vibration', asset: 'PMP-01', priority: 'Low', team: 'Engineers', teamColor: 'var(--hot)', teamIcon: 'ti-tools', owner: 'HVAC Team B', status: 'On Hold', slaBreach: '461h 54m', updated: '6:03 AM' },
];
const slaTargets = [
  { priority: 'Critical', respond: '15m', resolve: '4h', path: 'L1 owner → L2 lead → L3 manager / vendor', chipClass: 'chip-crit' },
  { priority: 'High', respond: '30m', resolve: '8h', path: 'L1 owner → L2 lead → L3 manager / vendor', chipClass: 'chip-high' },
  { priority: 'Medium', respond: '2h', resolve: '24h', path: 'L1 owner → L2 lead → L3 manager / vendor', chipClass: 'chip-med' },
  { priority: 'Low', respond: '8h', resolve: '72h', path: 'L1 owner → L2 lead → L3 manager / vendor', chipClass: 'chip-low' },
];

const escalationMatrix = [
  {
    title: 'Service Engineers',
    path: 'L1 Engineers → L2 Engineering Lead — K. Nair → L3 CoolTech HVAC (Vendor)',
    bgColor: 'var(--hot)',
    iconClass: 'ti-tools',
  },
  {
    title: 'Command Centre Team',
    path: 'L1 Command Centre → L2 NOC Lead — A. Banerjee → L3 BuildOptix Cloud Support',
    bgColor: 'var(--info)',
    iconClass: 'ti-broadcast',
  },
  {
    title: 'Site Client Team',
    path: 'L1 Site Team → L2 Facility Manager — R. Gupta → L3 Property Head',
    bgColor: 'var(--violet)',
    iconClass: 'ti-building',
  },
];

const breachingTickets = [
  { id: 'TKT-1056', title: 'CH-01 Chiller — High Condenser Pressure', asset: 'CH-01 Chiller', priority: 'Critical', chipClass: 'chip-crit', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'Unassigned', status: 'New', statusClass: 'chip-new', breachTime: '139h 53m', updated: '11:52 AM' },
  { id: 'TKT-1055', title: 'Lift-04 — Door Sensor Fault', asset: 'Lift-04', priority: 'Critical', chipClass: 'chip-crit', team: 'Command Centre', icon: 'ti-broadcast', color: 'var(--info)', owner: 'Unassigned', status: 'New', statusClass: 'chip-new', breachTime: '186h 52m', updated: '12:53 PM' },
  { id: 'TKT-1054', title: 'AHU Zone C — HVAC Temp Breach Floor 7', asset: 'AHU Zone C', priority: 'Critical', chipClass: 'chip-crit', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'Unassigned', status: 'New', statusClass: 'chip-new', breachTime: '186h 52m', updated: '12:53 PM' },
  { id: 'TKT-1044', title: 'IOT-GW07 — Edge Gateway Offline', asset: 'IOT-GW07 Gateway', priority: 'Critical', chipClass: 'chip-crit', team: 'Command Centre', icon: 'ti-broadcast', color: 'var(--info)', owner: 'Unassigned', status: 'New', statusClass: 'chip-new', breachTime: '525h 13m', updated: '10:32 AM' },
  { id: 'TKT-1042', title: 'CH-01 Chiller — High Condenser Pressure', asset: 'CH-01 Chiller', priority: 'Critical', chipClass: 'chip-crit', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'Rajesh Sharma · L1', ownerColor: 'var(--bad)', status: 'In Progress', statusClass: 'chip-prog', breachTime: '526h 4m', updated: '10:01 AM' },
  { id: 'TKT-1043', title: 'AHU Zone C — Temperature Breach Floor 7', asset: 'AHU Zone C', priority: 'Critical', chipClass: 'chip-crit', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'HVAC Team B · L2', ownerColor: 'var(--bad)', status: 'Acknowledged', statusClass: 'chip-ack', breachTime: '527h 50m', updated: '8:15 AM' },
  { id: 'TKT-1053', title: 'IOT-CT01 — Comms Degraded', asset: 'IOT-CT01 Cooling Tower Node', priority: 'High', chipClass: 'chip-high', team: 'Command Centre', icon: 'ti-broadcast', color: 'var(--info)', owner: 'Unassigned', status: 'New', statusClass: 'chip-new', breachTime: '521h 2m', updated: '10:43 AM' },
  { id: 'TKT-1049', title: 'CAM-08 Loading Bay — Unauthorized Access', asset: 'CAM-08', priority: 'High', chipClass: 'chip-high', team: 'Site Team', icon: 'ti-building', color: 'var(--violet)', owner: 'Unassigned', status: 'New', statusClass: 'chip-new', breachTime: '521h 10m', updated: '10:35 AM' },
  { id: 'TKT-1045', title: 'Lift-04 — Door Sensor Fault', asset: 'Lift-04', priority: 'High', chipClass: 'chip-high', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'Vikram Patel', status: 'In Progress', statusClass: 'chip-prog', breachTime: '521h 48m', updated: '10:05 AM' },
  { id: 'TKT-1046', title: 'IOT-MTR03 — Meter Comms Intermittent', asset: 'IOT-MTR03 Meter', priority: 'High', chipClass: 'chip-high', team: 'Command Centre', icon: 'ti-broadcast', color: 'var(--info)', owner: 'Neha Iyer (NOC)', status: 'Acknowledged', statusClass: 'chip-ack', breachTime: '522h 37m', updated: '9:23 AM' },
  { id: 'TKT-1048', title: 'CT-01 — High Entering Water Temp', asset: 'CT-01', priority: 'Medium', chipClass: 'chip-med', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'Amit Deshpande', status: 'Acknowledged', statusClass: 'chip-ack', breachTime: '507h 12m', updated: '8:43 AM' },
  { id: 'TKT-1047', title: 'Tower B Lobby — AC Not Cooling', asset: 'AHU-12 / Lobby', priority: 'Medium', chipClass: 'chip-med', team: 'Site Team', icon: 'ti-building', color: 'var(--violet)', owner: 'Priya Menon', status: 'In Progress', statusClass: 'chip-prog', breachTime: '508h 32m', updated: '7:21 AM' },
  { id: 'TKT-1050', title: 'PMP-01 — High Vibration', asset: 'PMP-01', priority: 'Low', chipClass: 'chip-low', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'HVAC Team B', status: 'On Hold', statusClass: 'chip-hold', breachTime: '462h 2m', updated: '6:03 AM' },
];

const resolvedTickets = [
  { id: 'TKT-1051', title: 'AHU-02 — High Filter ΔP', asset: 'AHU-02', priority: 'Medium', chipClass: 'chip-med', team: 'Engineers', icon: 'ti-tools', color: 'var(--hot)', owner: 'HVAC Team B', status: 'Closed', statusClass: 'chip-closed', slaPercent: '7%', slaWidth: '7.29%', updated: '12:43 PM' },
  { id: 'TKT-1052', title: 'IOT-CTRL05 — Firmware Watchdog Reboot', asset: 'IOT-CTRL05', priority: 'Low', chipClass: 'chip-low', team: 'Command Centre', icon: 'ti-broadcast', color: 'var(--info)', owner: 'Suresh Rao', status: 'Closed', statusClass: 'chip-closed', slaPercent: '2%', slaWidth: '2.08%', updated: '12:23 PM' },
];

// Tab Management (Default Active: Tab 2)






export default function ServiceDesk({ onNavigate, setActivePage }) {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState(0); // 0: Ticket Queue, 1: My View
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Row Click Handler (sdOpen replacement)
  const handleTicketClick = (ticketId) => {
    console.log(`Opening ticket details for: ${ticketId}`);
    if (typeof onNavigate === 'function') {
      onNavigate('ticket-details', ticketId);
    } else if (typeof setActivePage === 'function') {
      setActivePage('ticket-details');
    }
  };

  const handleOpenTicket = (ticketId) => {
    console.log(`Opening ticket details: ${ticketId}`);
    if (typeof onNavigate === 'function') {
      onNavigate('ticket-details', ticketId);
    } else if (typeof setActivePage === 'function') {
      setActivePage('ticket-details');
    }
  };

  const handleExport = (type) => {
    showToast(`Exporting ${type} CSV...`);
  };


  // Helper function for Priority Badge CSS Class
  const getPriorityChipClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'chip-crit';
      case 'high': return 'chip-high';
      case 'medium': return 'chip-med';
      case 'low': return 'chip-low';
      default: return '';
    }
  };

  // Helper function for Status Badge CSS Class
  const getStatusChipClass = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'chip-new';
      case 'in progress': return 'chip-prog';
      case 'acknowledged': return 'chip-ack';
      case 'on hold': return 'chip-hold';
      default: return '';
    }
  };



  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    asset: '',
    priority: 'medium',
    team: 'engineers',
    owner: '',
  });

  // Open & Close Handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submit Handler (sdCreate logic)
  const handleCreateTicket = (e) => {
    e.preventDefault();
    console.log('Ticket Data Submitted:', formData);

    // Yahan Apne Submit API Call Add Karein
    showToast(`Ticket "${formData.title || 'New Ticket'}" successfully created!`);

    // Reset Form & Close Modal
    setFormData({
      title: '',
      description: '',
      asset: '',
      priority: 'medium',
      team: 'engineers',
      owner: '',
    });
    handleCloseModal();
  };




  // Export Handler
  // const handleExport = (type) => {
  //   alert(`Exporting ${type} CSV...`);
  // };

  return (
    <div className="page active" id="pg-servicedesk">

      <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
        <div className="ph-left">
          <div className="live-dot"></div>

          <div>
            <div className="ph-title" id="dash-page-title">
              Service Desk
            </div>

            <div
              id="dash-page-sub"
              style={{ fontSize: "10px", color: "var(--ink-3)" }}
            >
              Tickets · Assignment · SLA · Escalation
            </div>
          </div>
        </div>

        <div className="ph-tabs" id="dash-tab-bar">
          <div
            onClick={() => setActiveTab(0)}
            className={`ph-tab ${activeTab === 0 ? "active" : ""}`}
          >
            Queue
          </div>

          <div
            onClick={() => setActiveTab(1)}
            className={`ph-tab ${activeTab === 1 ? "active" : ""}`}
          >
            My Tickets
          </div>

          <div
            onClick={() => setActiveTab(2)}
            className={`ph-tab ${activeTab === 2 ? "active" : ""}`}
          >
            SLA & Escalation
          </div>

          <div
            onClick={() => setActiveTab(3)}
            className={`ph-tab ${activeTab === 3 ? "active" : ""}`}
          >
            Resolved & History
          </div>
        </div>

        {/* Range Picker */}
        <div className="range-picker" id="boRangePicker">
          <span className="rp-label">Range</span>

          <div className="rp-seg">
            <button data-range="today" className="active">
              Today
            </button>

            <button data-range="7d">7D</button>

            <button data-range="30d">30D</button>

            <button data-range="custom">
              <i className="ti ti-calendar" style={{ fontSize: "12px" }}></i>
              Custom
            </button>
          </div>

          <div className="rp-pop" id="rpPop">
            <label>From</label>
            <input type="date" id="rpFrom" />

            <label>To</label>
            <input type="date" id="rpTo" />

            <button className="rp-apply" id="rpApply">
              Apply range
            </button>
          </div>
        </div>

        {/* Download */}
        <div className="dash-dl" id="dashDl">
          <button
            className="dash-dl-btn"
            id="dashDlBtn"
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
          >
            <i className="ti ti-download"></i>
            Download Reports
            <i
              className="ti ti-chevron-down"
              style={{ fontSize: "12px", opacity: 0.8 }}
            ></i>
          </button>
          {showDownloadMenu && (
            <div className="dash-dl-menu" style={{ display: showDownloadMenu ? "block" : "none" }}>

              {/* Energy */}

              <div className="dash-dl-h">Quick report downloads</div>

              <div className="dash-dl-opt" data-i="0">
                <div
                  className="di"
                  style={{ background: "var(--info)", opacity: 0.16 }}
                ></div>

                <div
                  style={{
                    marginLeft: "-38px",
                    width: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-bolt"
                    style={{ color: "var(--info)", fontSize: "14px" }}
                  ></i>
                </div>

                <div>
                  <div className="dt2">Energy &amp; Utilities</div>
                  <div className="ds">Floor-wise · cost · EPI</div>
                </div>

                <span className="dx">CSV</span>
              </div>

              {/* CO2 */}
              <div className="dash-dl-opt" data-i="1">
                <div
                  className="di"
                  style={{ background: "var(--ok)", opacity: 0.16 }}
                ></div>

                <div
                  style={{
                    marginLeft: "-38px",
                    width: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-leaf"
                    style={{ color: "var(--ok)", fontSize: "14px" }}
                  ></i>
                </div>

                <div>
                  <div className="dt2">CO₂ &amp; ESG Summary</div>
                  <div className="ds">Scope 1/2/3 · offsets</div>
                </div>

                <span className="dx">CSV</span>
              </div>

              {/* SLA */}
              <div className="dash-dl-opt" data-i="2">
                <div
                  className="di"
                  style={{ background: "var(--warn)", opacity: 0.16 }}
                ></div>

                <div
                  style={{
                    marginLeft: "-38px",
                    width: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-clipboard-check"
                    style={{ color: "var(--warn)", fontSize: "14px" }}
                  ></i>
                </div>

                <div>
                  <div className="dt2">SLA &amp; Tickets</div>
                  <div className="ds">Live ticket + SLA export</div>
                </div>

                <span className="dx">CSV</span>
              </div>

              {/* Asset */}
              <div className="dash-dl-opt" data-i="3">
                <div
                  className="di"
                  style={{ background: "var(--violet)", opacity: 0.16 }}
                ></div>

                <div
                  style={{
                    marginLeft: "-38px",
                    width: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-tool"
                    style={{ color: "var(--violet)", fontSize: "14px" }}
                  ></i>
                </div>

                <div>
                  <div className="dt2">Asset PM</div>
                  <div className="ds">PM status · health</div>
                </div>

                <span className="dx">CSV</span>
              </div>

              {/* Solar */}
              <div className="dash-dl-opt" data-i="4">
                <div
                  className="di"
                  style={{ background: "var(--solar)", opacity: 0.16 }}
                ></div>

                <div
                  style={{
                    marginLeft: "-38px",
                    width: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-solar-panel"
                    style={{ color: "var(--solar)", fontSize: "14px" }}
                  ></i>
                </div>

                <div>
                  <div className="dt2">Solar &amp; ROI</div>
                  <div className="ds">Generation · savings</div>
                </div>

                <span className="dx">CSV</span>
              </div>

              {/* Device */}
              <div className="dash-dl-opt" data-i="5">
                <div
                  className="di"
                  style={{ background: "var(--cool)", opacity: 0.16 }}
                ></div>

                <div
                  style={{
                    marginLeft: "-38px",
                    width: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-router"
                    style={{ color: "var(--cool)", fontSize: "14px" }}
                  ></i>
                </div>

                <div>
                  <div className="dt2">Device Fleet</div>
                  <div className="ds">IoT health · connectivity</div>
                </div>

                <span className="dx">CSV</span>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--line-1)",
                  marginTop: "5px",
                  paddingTop: "6px",
                }}
              >
                <div className="dash-dl-opt" id="dashDlAll">
                  <div
                    className="di"
                    style={{ background: "var(--info)", opacity: 0.16 }}
                  ></div>

                  <div
                    style={{
                      marginLeft: "-38px",
                      width: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="ti ti-package"
                      style={{ color: "var(--info)", fontSize: "14px" }}
                    ></i>
                  </div>

                  <div>
                    <div className="dt2">All reports</div>
                    <div className="ds">Download every report (CSV)</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "7px 9px 3px" }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navTo("reports");
                  }}
                  style={{
                    fontSize: "10.5px",
                    color: "var(--info)",
                    cursor: "pointer",
                  }}
                >
                  Open full Reports &amp; Bills library →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>




      {/* ================= TAB 0: TICKET QUEUE ================= */}
      {activeTab === 0 && (
        <div className="tab-panel active" data-page="servicedesk" data-tab="0">

          {/* KPI Strip */}
          <div id="sd-q-kpis" className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-bad">
              <div className="kpi-l">Open Tickets</div>
              <div className="kpi-v bad">13</div>
              <div className="kpi-s">6 critical</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">SLA Breaching</div>
              <div className="kpi-v warn">13</div>
              <div className="kpi-s">needs escalation</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Unassigned</div>
              <div className="kpi-v">6</div>
              <div className="kpi-s">awaiting owner</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Resolved Today</div>
              <div className="kpi-v ok">0</div>
            </div>
          </div>

          {/* Toolbar & Filters */}
          <div className="sd-toolbar mb-14" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

            {/* Team Filter */}
            <div className="sd-seg" id="sd-seg-team">
              {['all', 'engineers', 'command', 'site'].map((team) => (
                <button
                  key={team}
                  className={selectedTeam === team ? 'active' : ''}
                  onClick={() => setSelectedTeam(team)}
                >
                  {team === 'all' ? 'All teams' : team.charAt(0).toUpperCase() + team.slice(1)}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="sd-seg" id="sd-seg-status">
              {[
                { label: 'Open', val: 'open' },
                { label: 'New', val: 'new' },
                { label: 'In progress', val: 'in_progress' },
                { label: 'On hold', val: 'on_hold' },
                { label: 'All', val: 'all' },
              ].map((st) => (
                <button
                  key={st.val}
                  className={selectedStatus === st.val ? 'active' : ''}
                  onClick={() => setSelectedStatus(st.val)}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="sd-search" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <i className="ti ti-search" style={{ position: 'absolute', left: '10px' }}></i>
              <input
                id="sd-q-search"
                type="text"
                placeholder="Search ticket, asset, owner…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '30px' }}
              />
            </div>

            <div className="sd-tb-spacer" style={{ marginLeft: 'auto' }}></div>

            <button
              className="btn primary"
              style={{ padding: '8px 14px' }}
              onClick={handleOpenModal}
            >
              <i className="ti ti-plus"></i> New Ticket
            </button>
          </div>

          {/* Ticket Table Card */}
          <div className="card">
            <div className="ch" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
              <div>
                <div className="ct">Ticket Queue</div>
                <div className="cs" id="sd-q-count">13 shown · 13 open in this view</div>
              </div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={() => handleExport('queue')}>
                <i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export CSV
              </span>
            </div>

            <div className="cb" style={{ padding: 0 }}>
              <div id="sd-q-table">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ticket</th>
                      <th>Priority</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketsData.map((ticket) => (
                      <tr key={ticket.id} className="sd-row" style={{ cursor: 'pointer' }} onClick={() => handleTicketClick(ticket.id)}>
                        <td className="sd-id">
                          <span className="sd-breach-dot" title="SLA breached"></span>
                          {ticket.id}
                        </td>
                        <td>
                          <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>{ticket.title}</div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>{ticket.asset}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${getPriorityChipClass(ticket.priority)}`}>{ticket.priority}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: '11px' }}>
                            <span className="sd-chip chip-team">
                              <i className={`ti ${ticket.teamIcon}`} style={{ color: ticket.teamColor }}></i>
                              {ticket.team}
                            </span>
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>{ticket.owner}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${getStatusChipClass(ticket.status)}`}>{ticket.status}</span>
                        </td>
                        <td>
                          <div className="sla-mini">
                            <div className="slm-top">
                              <span>Resolve SLA</span>
                              <span>100%</span>
                            </div>
                            <div className="sla-track">
                              <div className="sla-fill bad" style={{ width: '100%' }}></div>
                            </div>
                            <div className="slm-time bad">Breached {ticket.slaBreach}</div>
                          </div>
                        </td>
                        <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>{ticket.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 1: MY VIEW / ADMIN ================= */}
      {activeTab === 1 && (
        <div className="tab-panel active" data-page="servicedesk" data-tab="1">

          {/* KPI Strip */}
          <div id="sd-my-kpis" className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-info">
              <div className="kpi-l">In My View</div>
              <div className="kpi-v">13</div>
            </div>
            <div className="kpi glow-violet">
              <div className="kpi-l">New / Unacked</div>
              <div className="kpi-v">6</div>
              <div className="kpi-s">awaiting ack</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">In Progress</div>
              <div className="kpi-v ok">3</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">Breaching</div>
              <div className="kpi-v warn">13</div>
            </div>
          </div>

          {/* Table Card */}
          <div className="card">
            <div className="ch" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
              <div>
                <div className="ct" id="sd-my-title">All Active Tickets</div>
                <div className="cs" id="sd-my-sub">Admin view — all teams</div>
              </div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={() => handleExport('my')}>
                <i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export CSV
              </span>
            </div>

            <div className="cb" style={{ padding: 0 }}>
              <div id="sd-my-table">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ticket</th>
                      <th>Priority</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketsData.map((ticket) => (
                      <tr key={ticket.id} className="sd-row" style={{ cursor: 'pointer' }} onClick={() => handleTicketClick(ticket.id)}>
                        <td className="sd-id">
                          <span className="sd-breach-dot" title="SLA breached"></span>
                          {ticket.id}
                        </td>
                        <td>
                          <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>{ticket.title}</div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>{ticket.asset}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${getPriorityChipClass(ticket.priority)}`}>{ticket.priority}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: '11px' }}>
                            <span className="sd-chip chip-team">
                              <i className={`ti ${ticket.teamIcon}`} style={{ color: ticket.teamColor }}></i>
                              {ticket.team}
                            </span>
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>{ticket.owner}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${getStatusChipClass(ticket.status)}`}>{ticket.status}</span>
                        </td>
                        <td>
                          <div className="sla-mini">
                            <div className="slm-top">
                              <span>Resolve SLA</span>
                              <span>100%</span>
                            </div>
                            <div className="sla-track">
                              <div className="sla-fill bad" style={{ width: '100%' }}></div>
                            </div>
                            <div className="slm-time bad">Breached {ticket.slaBreach}</div>
                          </div>
                        </td>
                        <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>{ticket.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="tab-panel active" data-page="servicedesk" data-tab="2">

          {/* SLA KPIs */}
          <div id="sd-sla-kpis" className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-bad">
              <div className="kpi-l">Breaching Now</div>
              <div className="kpi-v bad">13</div>
            </div>
            <div className="kpi glow-warn">
              <div className="kpi-l">At Risk (≥70%)</div>
              <div className="kpi-v warn">0</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Escalated</div>
              <div className="kpi-v">2</div>
              <div className="kpi-s">L1+ active</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Response SLA Met</div>
              <div className="kpi-v ok">89%</div>
              <div className="kpi-s">of acknowledged</div>
            </div>
          </div>

          {/* Grid Layout: SLA Targets & Escalation Matrix */}
          <div className="g2 mb-14" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

            {/* SLA Targets Table */}
            <div className="card">
              <div className="ch">
                <div className="ct">SLA Targets by Priority</div>
              </div>
              <div className="cb" style={{ padding: 0 }}>
                <table className="dt">
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Respond</th>
                      <th>Resolve</th>
                      <th>Escalation path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slaTargets.map((item, idx) => (
                      <tr key={idx}>
                        <td><span className={`sd-chip ${item.chipClass}`}>{item.priority}</span></td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.respond}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.resolve}</td>
                        <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>{item.path}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Escalation Matrix */}
            <div className="card">
              <div className="ch">
                <div className="ct">Escalation Matrix</div>
                <div className="cs">Auto-triggers on SLA breach</div>
              </div>
              <div className="cb" style={{ padding: '0 16px' }}>
                {escalationMatrix.map((matrix, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 0',
                      borderBottom: idx === escalationMatrix.length - 1 ? 'none' : '1px solid var(--line-1)'
                    }}
                  >
                    <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: matrix.bgColor, opacity: 0.16, flexShrink: 0 }}></div>
                    <div style={{ marginLeft: '-40px', width: '30px', textAlign: 'center' }}>
                      <i className={`ti ${matrix.iconClass}`} style={{ color: matrix.bgColor, fontSize: '15px' }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-0)' }}>{matrix.title}</div>
                      <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>{matrix.path}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Breaching Tickets Table */}
          <div className="card">
            <div className="ch">
              <div>
                <div className="ct">Breaching &amp; At-Risk Tickets</div>
                <div className="cs">Resolution SLA ≥ 70% elapsed</div>
              </div>
            </div>
            <div className="cb" style={{ padding: 0 }}>
              <div id="sd-breach-table">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ticket</th>
                      <th>Priority</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breachingTickets.map((row) => (
                      <tr key={row.id} className="sd-row" style={{ cursor: 'pointer' }} onClick={() => handleOpenTicket(row.id)}>
                        <td className="sd-id">
                          <span className="sd-breach-dot" title="SLA breached"></span>
                          {row.id}
                        </td>
                        <td>
                          <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>{row.title}</div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>{row.asset}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${row.chipClass}`}>{row.priority}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: '11px' }}>
                            <span className="sd-chip chip-team">
                              <i className={`ti ${row.icon}`} style={{ color: row.color }}></i>
                              {row.team}
                            </span>
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>
                            {row.owner} {row.ownerColor && <span style={{ color: row.ownerColor }}>· L1</span>}
                          </div>
                        </td>
                        <td>
                          <span className={`sd-chip ${row.statusClass}`}>{row.status}</span>
                        </td>
                        <td>
                          <div className="sla-mini">
                            <div className="slm-top">
                              <span>Resolve SLA</span>
                              <span>100%</span>
                            </div>
                            <div className="sla-track">
                              <div className="sla-fill bad" style={{ width: '100%' }}></div>
                            </div>
                            <div className="slm-time bad">Breached {row.breachTime}</div>
                          </div>
                        </td>
                        <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>{row.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
      {activeTab === 3 && (
        <div className="tab-panel active" data-page="servicedesk" data-tab="3">

          {/* Resolved KPIs */}
          <div id="sd-res-kpis" className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div className="kpi glow-ok">
              <div className="kpi-l">Resolved / Closed</div>
              <div className="kpi-v ok">2</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Closed</div>
              <div className="kpi-v ok">2</div>
              <div className="kpi-s">with remarks</div>
            </div>
            <div className="kpi glow-info">
              <div className="kpi-l">Avg Resolution</div>
              <div className="kpi-v">1h 38m</div>
            </div>
            <div className="kpi glow-ok">
              <div className="kpi-l">Resolution SLA Met</div>
              <div className="kpi-v ok">100%</div>
            </div>
          </div>

          {/* Resolved Table Card */}
          <div className="card">
            <div className="ch" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
              <div>
                <div className="ct">Resolved &amp; Closed Tickets</div>
                <div className="cs">Full audit history retained per ticket</div>
              </div>
              <span className="ca" style={{ cursor: 'pointer' }} onClick={() => handleExport('resolved')}>
                <i className="ti ti-download" style={{ fontSize: '11px' }}></i> Export CSV
              </span>
            </div>

            <div className="cb" style={{ padding: 0 }}>
              <div id="sd-res-table">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ticket</th>
                      <th>Priority</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resolvedTickets.map((row) => (
                      <tr key={row.id} className="sd-row" style={{ cursor: 'pointer' }} onClick={() => handleOpenTicket(row.id)}>
                        <td className="sd-id">{row.id}</td>
                        <td>
                          <div style={{ fontWeight: 500, color: 'var(--ink-0)' }}>{row.title}</div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '1px' }}>{row.asset}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${row.chipClass}`}>{row.priority}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: '11px' }}>
                            <span className="sd-chip chip-team">
                              <i className={`ti ${row.icon}`} style={{ color: row.color }}></i>
                              {row.team}
                            </span>
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '2px' }}>{row.owner}</div>
                        </td>
                        <td>
                          <span className={`sd-chip ${row.statusClass}`}>{row.status}</span>
                        </td>
                        <td>
                          <div className="sla-mini">
                            <div className="slm-top">
                              <span>Resolve SLA</span>
                              <span>{row.slaPercent}</span>
                            </div>
                            <div className="sla-track">
                              <div className="sla-fill done" style={{ width: row.slaWidth }}></div>
                            </div>
                            <div className="slm-time done">Met</div>
                          </div>
                        </td>
                        <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>{row.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
      {isModalOpen && (
        <div className="sd-modal-backdrop open" id="sdModal">
          <div className="sd-modal">

            {/* Modal Header */}
            <div className="sd-modal-head">
              <div className="sd-modal-title">
                <i className="ti ti-ticket" style={{ color: 'var(--info)' }}></i> Raise a Ticket
              </div>
              <button className="sd-dr-close" onClick={handleCloseModal} type="button">
                <i className="ti ti-x"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="sd-modal-body">
              <div>
                <label className="sd-f-lab" htmlFor="title">Title</label>
                <input
                  className="sd-input"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AHU-04 not maintaining setpoint"
                />
              </div>

              <div>
                <label className="sd-f-lab" htmlFor="description">Description</label>
                <textarea
                  className="sd-textarea"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What is happening? Symptoms, readings, location…"
                />
              </div>

              <div className="sd-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="sd-f-lab" htmlFor="asset">Asset / System</label>
                  <input
                    className="sd-input"
                    id="asset"
                    value={formData.asset}
                    onChange={handleChange}
                    placeholder="e.g. CH-01"
                  />
                </div>
                <div>
                  <label className="sd-f-lab" htmlFor="priority">Priority</label>
                  <select
                    className="sd-input"
                    id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="sd-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="sd-f-lab" htmlFor="team">Assign to team</label>
                  <select
                    className="sd-input"
                    id="team"
                    value={formData.team}
                    onChange={handleChange}
                  >
                    <option value="engineers">Service Engineers</option>
                    <option value="command">Command Centre Team</option>
                    <option value="site">Site Client Team</option>
                  </select>
                </div>
                <div>
                  <label className="sd-f-lab" htmlFor="owner">Owner (optional)</label>
                  <select
                    className="sd-input"
                    id="owner"
                    value={formData.owner}
                    onChange={handleChange}
                  >
                    <option value="">— Unassigned —</option>
                    <option value="Rajesh Sharma">Rajesh Sharma</option>
                    <option value="Vikram Patel">Vikram Patel</option>
                    <option value="HVAC Team B">HVAC Team B</option>
                    <option value="Amit Deshpande">Amit Deshpande</option>
                  </select>
                </div>
              </div>

              <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '8px' }}>
                <i className="ti ti-info-circle"></i> SLA timers start automatically based on priority. Equipment → Engineers · IoT/connectivity → Command Centre · Tenant/facility → Site Team.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sd-modal-foot">
              <button className="btn" onClick={handleCloseModal} type="button">
                Cancel
              </button>
              <button className="btn primary" onClick={handleCreateTicket} type="button">
                <i className="ti ti-check"></i> Create ticket
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}