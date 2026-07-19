import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.png";
import '../App.css'
import { useNavigate } from 'react-router-dom';

export default function TopBar({ isNightMode, setIsNightMode }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [timeStr, setTimeStr] = useState('05:38 pm · 11 Jul 2026');
const navigate= useNavigate()
  // लाइव टाइम अपडेट (जैसा इमेज में 12-hour फॉर्मेट और डेट के साथ है)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 को 12 सेट करें
      const strTime = String(hours).padStart(2, '0') + ':' + minutes + ' ' + ampm;

      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const strDate = now.toLocaleDateString('en-GB', options).replace(/ /g, ' ');

      setTimeStr(`${strTime} · ${strDate}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="topbar" style={{
      display: 'flex',
      alignItems: 'center',
      height: '56px',
      borderBottom: '1px solid #111d32',
      padding: '0 16px',
      background: '#060b13',
      color: '#fff',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* 1. BRAND LOGO */}
      <div className="tb-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '16px', borderRight: '1px solid #14223a', height: '100%' }}>
        <img
          src={logo}
          alt=""
          style={{ height: "28px", objectFit: "contain" }}
        />
      </div>

      {/* 2. LOCATION & TOWER SELECTORS */}
      {/* <div style={{ display: 'flex', gap: '8px', paddingLeft: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #1e293b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: '#22c55e', fontWeight: '6px' }}>
          <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
          <span style={{ color: '#22c55e', fontWeight: '600' }}>Vikhroli — Godrej One</span>
          <i className="ti ti-chevron-down" style={{ color: '#64748b', fontSize: '12px' }}></i>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #1e293b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: '#cbd5e1' }}>
          <i className="ti ti-map-pin" style={{ color: '#38bdf8', fontSize: '14px' }}></i>
          <span style={{ fontWeight: '500' }}>All Towers</span>
          <i className="ti ti-chevron-down" style={{ color: '#64748b', fontSize: '12px' }}></i>
        </div>
      </div> */}

      {/* 3. NAVIGATION MODULES */}
      <div className="tb-nav" style={{ display: 'flex', gap: '6px', marginLeft: '20px', alignItems: 'center' }}>
        {/* Dashboard Tab */}
        <div
          onClick={() => setActiveModule('dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s',
            background: activeModule === 'dashboard' ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
            border: activeModule === 'dashboard' ? '1px solid rgba(234, 179, 8, 0.4)' : '1px solid transparent',
            color: activeModule === 'dashboard' ? '#eab308' : '#94a3b8',
            fontWeight: activeModule === 'dashboard' ? '600' : 'normal'
          }}
        >
          <i className="ti ti-layout-dashboard" style={{ fontSize: '15px' }}></i> Dashboard
        </div>

        {/* Equipment Tab */}
        <div
          onClick={() => setActiveModule('equipment')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s',
            background: activeModule === 'equipment' ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
            border: activeModule === 'equipment' ? '1px solid rgba(234, 179, 8, 0.4)' : '1px solid transparent',
            color: activeModule === 'equipment' ? '#eab308' : '#94a3b8',
            fontWeight: activeModule === 'equipment' ? '600' : 'normal'
          }}
        >
          <i className="ti ti-cpu" style={{ fontSize: '15px' }}></i> Equipment
        </div>

        {/* IoT GOC Tab */}
        <div
          onClick={() => setActiveModule('iot')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s',
            background: activeModule === 'iot' ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
            border: activeModule === 'iot' ? '1px solid rgba(234, 179, 8, 0.4)' : '1px solid transparent',
            color: activeModule === 'iot' ? '#eab308' : '#94a3b8',
            fontWeight: activeModule === 'iot' ? '600' : 'normal',
            lineHeight: '1.1'
          }}
        >
          <i className="ti ti-world" style={{ fontSize: '15px' }}></i>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>IoT</span>
            <span style={{ fontSize: '10px', opacity: 0.8 }}>GOC</span>
          </div>
        </div>
      </div>

      {/* RIGHT CONTROLS SECTION */}
      <div className="tb-meta" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* 4. SEARCH BAR */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <i className="ti ti-search" style={{ position: 'absolute', left: '10px', color: '#64748b', fontSize: '14px' }}></i>
          <input
            type="text"
            placeholder="Search modules, equipment..."
            disabled
            style={{
              background: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', padding: '6px 65px 6px 32px', color: '#fff', fontSize: '12px', width: '210px', outline: 'none'
            }}
          />
          <span style={{ position: 'absolute', right: '8px', background: '#1e293b', color: '#64748b', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #334155' }}>Ctrl K</span>
        </div>

        {/* 5. ADMIN DROPDOWN */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #1e293b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: '#cbd5e1' }}
          >
            <i className="ti ti-user-circle" style={{ color: '#38bdf8', fontSize: '16px' }}></i>
            <span style={{ fontWeight: '500' }}>Admin</span>
            <i className="ti ti-chevron-down" style={{ color: '#64748b', fontSize: '11px' }}></i>
          </div>
          {showAdminMenu && (
            <div style={{ position: 'absolute', top: '35px', right: 0, background: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', width: '120px', zIndex: 10, padding: '4px 0' }}>
              <div style={{ padding: '6px 12px', cursor: 'pointer', color: '#cbd5e1' }} onClick={() => setShowAdminMenu(false)}>Profile</div>
              <div
                style={{ padding: '6px 12px', cursor: 'pointer', color: '#ef4444' }}
                onClick={() => {
                  localStorage.removeItem('bo_session_v1'); // Session clear kiya
                  setShowAdminMenu(false);                 // Menu close kiya
                  navigate('/');                           // Home page bhej diya
                  window.location.reload();                // App state fresh karne ke liye refresh (optional)
                }}
              >
                Logout
              </div>           </div>
          )}
        </div>

        {/* 6. THEME SWITCHER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="ti ti-moon" style={{ color: isNightMode ? '#38bdf8' : '#64748b', fontSize: '14px' }}></i>
          <div
            onClick={() => setIsNightMode(!isNightMode)}
            style={{ cursor: 'pointer', width: '28px', height: '15px', background: isNightMode ? '#38bdf8' : '#334155', borderRadius: '10px', position: 'relative' }}
          >
            <div style={{ width: '11px', height: '11px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: isNightMode ? '15px' : '2px', transition: '0.2s' }} />
          </div>
          <i className="ti ti-sun" style={{ color: !isNightMode ? '#eab308' : '#64748b', fontSize: '14px' }}></i>
        </div>

        {/* 7. WEATHER INFO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', fontWeight: '500', fontSize: '12.5px' }}>
          <i className="ti ti-sun"></i>
          <span>26°C</span>
        </div>

        {/* 8. LIVE DATE & TIME */}
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          textAlign: 'right',
          whiteSpace: 'nowrap',
          borderLeft: '1px solid #14223a',
          paddingLeft: '12px',
          lineHeight: '1.3'
        }}>
          {timeStr}
        </div>

      </div>
    </div>
  );
}