import React, { useState, useEffect } from 'react';
import logoDark from '../assets/logo.png'; import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ isNightMode, setIsNightMode, openMobileSidebar, toggleWeather,
  startTour,
  openSettings,
  toggleNotifs,
  toggleAI }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [timeStr, setTimeStr] = useState('05:38 pm · 11 Jul 2026');
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null); // 'site', 'bldg', 'role', 'user'


  // Dropdown Toggle Handler
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
  };
const handleLogout = () => {
    localStorage.clear(); 
   
    navigate('/');
  };
  // Exact same Theme toggle Handler
  const toggleNight = () => {
    const nextMode = !isNightMode;
    setIsNightMode(nextMode);

    // Body tag par 'light' class add/remove karein
    if (!nextMode) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  };

  // Sync initial body class with isNightMode prop
  useEffect(() => {
    if (!isNightMode) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [isNightMode]);

  // Live Time Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = String(hours).padStart(2, '0') + ':' + minutes + ' ' + ampm;

      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const strDate = now.toLocaleDateString('en-GB', options).replace(/ /g, ' ');

      setTimeStr(`${strTime} · ${strDate}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Theme Colors Variables for Dynamic Styles
  const bgMain = isNightMode ? '#060b13' : '#ffffff';
  const bgElement = isNightMode ? '#0f172a' : '#f1f5f9';
  const borderCol = isNightMode ? '#111d32' : '#e2e8f0';
  const textColor = isNightMode ? '#ffffff' : '#0f172a';
  const subTextColor = isNightMode ? '#94a3b8' : '#64748b';


  return (
    <div className="topbar">
      {/* Mobile Menu Button */}
      <div
        className="mobile-menu-btn"
        id="mobileMenuBtn"
        onClick={openMobileSidebar}
        role="button"
        tabIndex={0}
        aria-label="Open menu"
      >
        <i className="ti ti-menu-2"></i>
      </div>

      {/* Brand Logo */}
      <div className="tb-brand" style={{ width: "auto", padding: "0 16px 0 12px", minWidth: 0 }}>
        <img
          id="logo-dark"
          src={logoDark}
          alt="BuildOptix"
          style={{ height: "32px", width: "auto", display: "block" }}
        />
      </div>

      {/* 1. Site Switch Dropdown */}
      <div
        className={`bo-role ${openDropdown === 'site' ? 'active' : ''}`}
        id="siteSwitch"
        title="Switch site"
        tabIndex={0}
        role="button"
        onClick={() => toggleDropdown('site')}
        aria-haspopup="true"
        aria-expanded={openDropdown === 'site'}
        style={{ margin: "0 4px 0 8px", position: "relative" }}
      >
        <span className="dot ok" style={{ marginRight: "2px" }}></span>
        <span id="siteSwitchLabel" style={{ color: "var(--ok)", fontWeight: 700 }}>Vikhroli — Godrej One</span>
        <i className="ti ti-chevron-down" style={{ fontSize: "12px", opacity: 0.6 }} aria-hidden="true"></i>

        {openDropdown === 'site' && (
          <div className="bo-role-menu show" id="siteSwitchMenu" style={{ display: "block" }}>
            <div className="bo-role-opt active" data-site="vikhroli">
              <div className="ro-ic" style={{ background: "var(--ok)", opacity: 0.16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="dot ok"></span>
              </div>
              <div>
                <div className="ro-tx">Vikhroli</div>
                <div className="ro-sub">Vikhroli — Godrej One</div>
              </div>
              <i className="ti ti-check"></i>
            </div>
            <div className="bo-role-opt" data-site="delhi">
              <div className="ro-ic" style={{ background: "var(--ok)", opacity: 0.16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="dot ok"></span>
              </div>
              <div>
                <div className="ro-tx">Delhi</div>
                <div className="ro-sub">Delhi — Sector 62</div>
              </div>
              <i className="ti ti-check"></i>
            </div>
            <div className="bo-role-opt" data-site="bengaluru">
              <div className="ro-ic" style={{ background: "var(--ok)", opacity: 0.16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="dot ok"></span>
              </div>
              <div>
                <div className="ro-tx">Bengaluru</div>
                <div className="ro-sub">Bengaluru — Whitefield</div>
              </div>
              <i className="ti ti-check"></i>
            </div>
            <div className="bo-role-opt" data-site="srm">
              <div className="ro-ic" style={{ background: "var(--warn)", opacity: 0.16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="dot warn"></span>
              </div>
              <div>
                <div className="ro-tx">SRM Campus</div>
                <div className="ro-sub">SRM University-AP — Amaravati</div>
              </div>
              <i className="ti ti-check"></i>
            </div>
          </div>
        )}
      </div>

      {/* 2. Building Switch Dropdown */}
      <div
        className={`bo-role ${openDropdown === 'bldg' ? 'active' : ''}`}
        id="bldgSwitch"
        title="Switch building / block"
        tabIndex={0}
        role="button"
        onClick={() => toggleDropdown('bldg')}
        aria-haspopup="true"
        aria-expanded={openDropdown === 'bldg'}
        style={{ margin: "0 4px 0 0", position: "relative" }}
      >
        <i className="ti ti-map-pin" aria-hidden="true"></i>
        <span id="bldgSwitchLabel">All Towers</span>
        <i className="ti ti-chevron-down" style={{ fontSize: "12px", opacity: 0.6 }} aria-hidden="true"></i>

        {openDropdown === 'bldg' && (
          <div className="bo-role-menu show" id="bldgSwitchMenu" style={{ width: "280px", display: "block" }}>
            <div className="bo-role-opt active" data-bldg="All Towers">
              <div className="ro-ic" style={{ background: "var(--info-soft)" }}>
                <i className="ti ti-map-pin" style={{ fontSize: "12px", color: "var(--info)" }}></i>
              </div>
              <div><div className="ro-tx">All Towers</div></div>
              <i className="ti ti-check"></i>
            </div>
            <div className="bo-role-opt" data-bldg="Tower A">
              <div className="ro-ic" style={{ background: "var(--info-soft)" }}>
                <i className="ti ti-map-pin" style={{ fontSize: "12px", color: "var(--info)" }}></i>
              </div>
              <div><div className="ro-tx">Tower A</div></div>
              <i className="ti ti-check"></i>
            </div>
            <div className="bo-role-opt" data-bldg="Tower B">
              <div className="ro-ic" style={{ background: "var(--info-soft)" }}>
                <i className="ti ti-map-pin" style={{ fontSize: "12px", color: "var(--info)" }}></i>
              </div>
              <div><div className="ro-tx">Tower B</div></div>
              <i className="ti ti-check"></i>
            </div>
            <div className="bo-role-opt" data-bldg="Podium">
              <div className="ro-ic" style={{ background: "var(--info-soft)" }}>
                <i className="ti ti-map-pin" style={{ fontSize: "12px", color: "var(--info)" }}></i>
              </div>
              <div><div className="ro-tx">Podium</div></div>
              <i className="ti ti-check"></i>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Modules */}
      <div className="tb-nav">
        <div
          className={`tb-nav-item ${activeModule === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => { setActiveModule('dashboard'); switchModule && switchModule('dashboard', e.currentTarget); }}
          tabIndex={0}
          role="button"
          aria-label="Dashboard"
        >
          <i className="ti ti-layout-dashboard"></i>Dashboard
        </div>
        <div
          className={`tb-nav-item ${activeModule === 'equipment' ? 'active' : ''}`}
          onClick={(e) => { setActiveModule('equipment'); switchModule && switchModule('equipment', e.currentTarget); }}
          tabIndex={0}
          role="button"
          aria-label="Equipment"
        >
          <i className="ti ti-cpu"></i>Equipment
        </div>
        <div
          className={`tb-nav-item ${activeModule === 'goc' ? 'active' : ''}`}
          onClick={(e) => { setActiveModule('goc'); switchModule && switchModule('goc', e.currentTarget); }}
          tabIndex={0}
          role="button"
          aria-label="IoT GOC — Global Operations Center"
        >
          <i className="ti ti-world-bolt"></i>IoT GOC
        </div>
      </div>

      {/* Meta Controls */}
      <div className="tb-meta">
        {/* Search */}
        <div className="tb-search" id="tbSearch">
          <div className="tb-search-box">
            <i className="ti ti-search" aria-hidden="true"></i>
            <input id="tbSearchInput" type="text" placeholder="Search modules, equipment…" autoComplete="off" aria-label="Global search" role="combobox" aria-expanded="false" aria-controls="tbSearchResults" />
            <span className="tb-kbd" id="tbSearchKbd">Ctrl K</span>
          </div>
          <div className="tb-search-results" id="tbSearchResults" role="listbox"></div>
        </div>

        {/* 3. Role Switch Dropdown */}
        <div
          className={`bo-role ${openDropdown === 'role' ? 'active' : ''}`}
          id="boRole"
          title="Switch role view"
          tabIndex={0}
          role="button"
          onClick={() => toggleDropdown('role')}
          aria-haspopup="true"
          aria-expanded={openDropdown === 'role'}
          style={{ position: "relative" }}
        >
          <i className="ti ti-user-shield" id="boRoleIcon" aria-hidden="true"></i>
          <span id="boRoleLabel">Admin</span>
          <i className="ti ti-chevron-down" style={{ fontSize: "12px", opacity: 0.6 }} aria-hidden="true"></i>

          {openDropdown === 'role' && (
            <div className="bo-role-menu show" id="boRoleMenu" style={{ display: "block" }}>
              <div className="bo-role-opt active" data-role="admin">
                <div className="ro-ic" style={{ background: "var(--info)", opacity: 0.16 }}></div>
                <div style={{ marginLeft: "-40px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-user-shield" style={{ color: "var(--info)", fontSize: "15px" }}></i>
                </div>
                <div><div className="ro-tx">Admin / Ops Head</div><div className="ro-sub">Full access · all teams</div></div>
                <i className="ti ti-check"></i>
              </div>
              <div className="bo-role-opt" data-role="engineer">
                <div className="ro-ic" style={{ background: "var(--hot)", opacity: 0.16 }}></div>
                <div style={{ marginLeft: "-40px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-tools" style={{ color: "var(--hot)", fontSize: "15px" }}></i>
                </div>
                <div><div className="ro-tx">Service Engineer</div><div className="ro-sub">Field equipment tickets</div></div>
                <i className="ti ti-check"></i>
              </div>
              <div className="bo-role-opt" data-role="command">
                <div className="ro-ic" style={{ background: "var(--info)", opacity: 0.16 }}></div>
                <div style={{ marginLeft: "-40px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-broadcast" style={{ color: "var(--info)", fontSize: "15px" }}></i>
                </div>
                <div><div className="ro-tx">Command Centre</div><div className="ro-sub">IoT, devices &amp; connectivity</div></div>
                <i className="ti ti-check"></i>
              </div>
              <div className="bo-role-opt" data-role="site">
                <div className="ro-ic" style={{ background: "var(--violet)", opacity: 0.16 }}></div>
                <div style={{ marginLeft: "-40px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-building" style={{ color: "var(--violet)", fontSize: "15px" }}></i>
                </div>
                <div><div className="ro-tx">Site Client</div><div className="ro-sub">Track &amp; raise site tickets</div></div>
                <i className="ti ti-check"></i>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Light/Dark Toggle */}
        <div
          className="theme-toggle-bar"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8' }}
        >
          <i
            id="theme-icon"
            className={`ti ${isNightMode ? 'ti-moon' : 'ti-sun'}`}
            style={{ fontSize: '14px', color: isNightMode ? '#38bdf8' : '#eab308' }}
            aria-hidden="true"
          ></i>

          <div
            id="nightToggle"
            className={`toggle ${!isNightMode ? 'off' : ''}`}
            onClick={toggleNight}
            title="Toggle light/dark theme"
            tabIndex={0}
            role="switch"
            aria-checked={isNightMode}
            aria-label="Toggle light/dark theme"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleNight();
              }
            }}
            style={{
              cursor: 'pointer',
              width: '28px',
              height: '15px',
              background: isNightMode ? '#38bdf8' : '#334155',
              borderRadius: '10px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '11px',
                height: '11px',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: isNightMode ? '15px' : '2px',
                transition: '0.2s'
              }}
            />
          </div>
        </div>

        {/* Weather */}
        <span
          style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--solar)", cursor: "pointer" }}
          onClick={toggleWeather}
          title="Weather for current site"
          tabIndex={0}
          role="button"
          aria-label="Show weather panel"
          onKeyDown={(e) => { if (e.key === 'Enter') toggleWeather && toggleWeather(); }}
        >
          <i className="ti ti-sun" aria-hidden="true"></i>
          <span id="tb-weather-temp">26°C</span>
        </span>

        {/* Live Clock Time */}
        <span className="tb-time" id="clock" aria-live="off">
          {timeStr || '05:26 pm · 25 Jul 2026'}
        </span>

        {/* 4. User Profile Dropdown */}
        <div
          className="bolg-userchip"
          id="bolgUserChip"
          tabIndex={0}
          role="button"
          onClick={() => toggleDropdown('user')}
          aria-haspopup="true"
          aria-expanded={openDropdown === 'user'}
          title="Account"
          style={{ position: "relative" }}
        >
          <span className="av" id="bolgChipAv" style={{ background: "linear-gradient(135deg, rgb(255, 184, 87), rgb(197, 110, 34))" }}>AM</span>
          <span id="bolgChipName">Aarav</span>
          <i className="ti ti-chevron-down chev" aria-hidden="true"></i>

          {openDropdown === 'user' && (
            <div className="bolg-usermenu show" id="bolgUserMenu" style={{ display: "block" }}>
              <div className="bolg-umhead">
                <span className="av" style={{ background: "linear-gradient(135deg, #FFB857, #C56E22)" }}>AM</span>
                <div>
                  <div className="nm">Aarav Mehta</div>
                  <div className="em">admin@buildoptix.in</div>
                  <span className="bolg-umrole"><i className="ti ti-shield-bolt"></i>Super Admin</span>
                </div>
              </div>
              <button className="bolg-umopt" type="button" data-um="settings"><i className="ti ti-user-cog"></i>Profile &amp; settings</button>
              <button className="bolg-umopt" type="button" data-um="role"><i className="ti ti-user-shield"></i>Switch role view</button>
              <div style={{ height: "1px", background: "var(--line-1)", margin: "6px 2px" }}></div>
              <div className="bolg-umopt" style={{ cursor: "default", color: "var(--ink-3)" }}><i className="ti ti-shield-lock" style={{ color: "var(--ink-3)" }}></i>MFA required on this device</div>
              <div style={{ height: "1px", background: "var(--line-1)", margin: "6px 2px" }}></div>
              <button className="bolg-umopt" type="button" data-um="logout" onClick={handleLogout}><i className="ti ti-logout" ></i>Sign out</button>
              <button className="bolg-umopt danger" type="button" data-um="logoutall"><i className="ti ti-shield-x"></i>Sign out of all devices</button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="tb-icon-btn" id="tourBtn" onClick={startTour} tabIndex={0} role="button" aria-label="Guided tour — how it works" title="Guided tour — how it works" onKeyDown={(e) => { if (e.key === 'Enter') startTour && startTour(); }}>
          <i className="ti ti-help-circle" aria-hidden="true"></i>
        </div>

        <div className="tb-icon-btn" onClick={openSettings} tabIndex={0} role="button" aria-label="Settings" onKeyDown={(e) => { if (e.key === 'Enter') openSettings && openSettings(); }}>
          <i className="ti ti-settings" aria-hidden="true"></i>
        </div>

        <div className="tb-icon-btn" id="notifBtn" onClick={(e) => toggleNotifs && toggleNotifs(e)} tabIndex={0} role="button" aria-label="Notifications — 7 unread" aria-haspopup="true" aria-expanded="false" onKeyDown={(e) => { if (e.key === 'Enter') toggleNotifs && toggleNotifs(e); }}>
          <i className="ti ti-bell" aria-hidden="true"></i>
          <span className="badge-n" id="notifBadge" aria-hidden="true" style={{ display: "flex" }}>7</span>
        </div>

        {/* AI Assistant Button */}
        <div className="ai-toggle-btn" id="aiToggleBtn" onClick={toggleAI} title="Toggle AI Assistant" tabIndex={0} role="button" aria-label="Toggle AI Assistant" aria-expanded="false" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleAI && toggleAI(); }}>
          <svg className="bo-robot-svg" style={{ width: "18px", height: "18px", flexShrink: 0 }} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
            <line x1="32" y1="4" x2="32" y2="12" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round"></line>
            <circle className="robot-antenna-dot" cx="32" cy="3.5" r="2.5" fill="#A78BFA"></circle>
            <g className="robot-head-group">
              <rect x="18" y="12" width="28" height="22" rx="7" fill="#1C2E4A" stroke="#A78BFA" strokeWidth="1.5"></rect>
              <rect x="21" y="15" width="22" height="13" rx="4" fill="#0C1828" stroke="#A78BFA" strokeWidth="1" opacity="0.9"></rect>
              <circle className="robot-eye-l" cx="27" cy="21.5" r="3.2" fill="#A78BFA"></circle>
              <circle cx="28" cy="20.6" r="0.9" fill="white" opacity="0.85"></circle>
              <circle className="robot-eye-r" cx="37" cy="21.5" r="3.2" fill="#A78BFA"></circle>
              <circle cx="38" cy="20.6" r="0.9" fill="white" opacity="0.85"></circle>
              <path d="M27.5 26.5 Q32 28.8 36.5 26.5" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round"></path>
              <circle className="robot-ear-l" cx="17" cy="22" r="2.8" fill="#F5B441" opacity="0.9"></circle>
              <circle className="robot-ear-r" cx="47" cy="22" r="2.8" fill="#22D67A" opacity="0.9"></circle>
            </g>
            <rect x="29" y="34" width="6" height="4" rx="2" fill="#243757"></rect>
            <rect x="16" y="38" width="32" height="20" rx="6" fill="#1C2E4A" stroke="#A78BFA" strokeWidth="1.2"></rect>
            <circle className="robot-chest-glow" cx="32" cy="47" r="4" fill="#A78BFA" opacity="0.85"></circle>
            <rect className="robot-arm-l" x="9" y="39" width="6" height="14" rx="3" fill="#1C2E4A" stroke="#A78BFA" strokeWidth="1"></rect>
            <rect className="robot-arm-r" x="49" y="39" width="6" height="14" rx="3" fill="#1C2E4A" stroke="#A78BFA" strokeWidth="1"></rect>
          </svg>
          <span style={{ fontWeight: 700, letterSpacing: "0.01em" }}>AI</span>
        </div>
      </div>
    </div>
  );

}