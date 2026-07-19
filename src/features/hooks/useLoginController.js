import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLES = {
  superadmin: { name: 'Super Admin', icon: 'ti-shield-bolt', av: 'linear-gradient(135deg,#FFB857,#C56E22)' },
  facmgr: { name: 'Facility Manager', icon: 'ti-building-cog', av: 'linear-gradient(135deg,#5AA6FF,#2F6FD6)' },
  operator: { name: 'Operator', icon: 'ti-device-desktop-analytics', av: 'linear-gradient(135deg,#34D2E6,#1796b0)' },
  technician: { name: 'Technician', icon: 'ti-tool', av: 'linear-gradient(135deg,#22D67A,#119a55)' },
  auditor: { name: 'Auditor', icon: 'ti-file-search', av: 'linear-gradient(135deg,#9B6CFF,#6f3fd0)' }
};

const PERMS = {
  superadmin: ['Full platform access', 'User & role management', 'Device fleet control', 'API management', 'Billing & licensing', 'Audit log export'],
  facmgr: ['Site dashboards', 'HVAC & energy control', 'Work orders', 'Service desk', 'Reports', 'Read API keys'],
  operator: ['Live monitoring', 'Acknowledge alarms', 'Raise tickets', 'Run diagnostics', 'View trends', 'No fleet control'],
  technician: ['Assigned work orders', 'Device diagnostics', 'Firmware (with approval)', 'Equipment logs', 'No billing', 'No user mgmt'],
  auditor: ['Read-only dashboards', 'Audit log access', 'Compliance reports', 'Export evidence', 'No control actions', 'No user mgmt']
};

const SKEY = 'bo_session_v1';
const TKEY = 'bo_trusted_devices_v1';
const DKEY = 'bo_device_id';
const TRUST_DAYS = 30;

export function useLoginController(onLoginSuccess, onLogoutAction) {
  const [step, setStep] = useState('signin'); // signin, sso, mfa, forgot, landing
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [remember, setRemember] = useState(true);
  const [trusted, setTrusted] = useState(false);
  const navigate = useNavigate(); // React Router hook

  // --- Device ID & Trust Helpers ---
  const getDeviceId = () => {
    let d = localStorage.getItem(DKEY);
    if (!d) {
      d = 'dev_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36);
      localStorage.setItem(DKEY, d);
      // NOTE: Yahan se navigate() hata diya hai kyunki yeh sahi jagah nahi thi.
    }
    return d;
  };

  const isDeviceTrusted = (email) => {
    try {
      const t = JSON.parse(localStorage.getItem(TKEY) || '{}')[email.toLowerCase()];
      return !!(t && t.dev === getDeviceId() && t.exp > Date.now());
    } catch { return false; }
  };

  const trustDevice = (email) => {
    try {
      const o = JSON.parse(localStorage.getItem(TKEY) || '{}');
      o[email.toLowerCase()] = { dev: getDeviceId(), exp: Date.now() + TRUST_DAYS * 864e5, ts: Date.now() };
      localStorage.setItem(TKEY, JSON.stringify(o));
    } catch { }
  };

  const forgetDevice = (email) => {
    try {
      const o = JSON.parse(localStorage.getItem(TKEY) || '{}');
      delete o[email.toLowerCase()];
      localStorage.setItem(TKEY, JSON.stringify(o));
    } catch { }
  };

  // --- Resolve User Role Logic ---
  const resolveUser = (email) => {
    const e = (email || '').trim().toLowerCase();
    const local = e.split('@')[0] || 'user';
    const dir = {
      'admin@buildoptix.in': { name: 'Aarav Mehta', role: 'superadmin' },
      'facilities@buildoptix.in': { name: 'Priya Nair', role: 'facmgr' },
      'ops@buildoptix.in': { name: 'Rahul Verma', role: 'operator' },
      'tech@buildoptix.in': { name: 'Imran Sheikh', role: 'technician' },
      'audit@buildoptix.in': { name: 'Neha Kapoor', role: 'auditor' }
    };
    if (dir[e]) return { ...dir[e], email: e };

    let role = 'facmgr';
    const name = local.replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'BuildOptix User';
    if (/admin|root/.test(local)) role = 'superadmin';
    else if (/tech|engineer|service/.test(local)) role = 'technician';
    else if (/audit|compliance/.test(local)) role = 'auditor';
    else if (/ops|monitor|noc/.test(local)) role = 'operator';

    return { name, role, email: e || 'you@buildoptix.in' };
  };

  // --- Authentication Actions ---
  const handleEmailSignIn = (email, password) => {
    const resolved = resolveUser(email);
    setUser(resolved);
    if (isDeviceTrusted(resolved.email)) {
      setTrusted(true);
      setStep('landing');
    } else {
      setTrusted(false);
      setStep('mfa');
    }
  };

  const handleSSOSignIn = (prov) => {
    setProvider(prov);
    setStep('sso');
    setTimeout(() => {
      const defaultEmail = prov === 'microsoft' ? 'admin@buildoptix.in' : 'facilities@buildoptix.in';
      const resolved = resolveUser(defaultEmail);
      setUser(resolved);
      if (isDeviceTrusted(resolved.email)) {
        setTrusted(true);
        setStep('landing');
      } else {
        setTrusted(false);
        setStep('mfa');
      }
    }, 1550);
  };

  const handleMFAVerify = (shouldTrustDevice) => {
    if (shouldTrustDevice && user) {
      this.trustDevice(user.email);
    }
    setTrusted(false);
    setStep('landing');
  };

  // 1. Jab user Final Workspace Button par click karega tab dashboard par bhejein
  const enterWorkspace = () => {
    if (remember && user) {
      localStorage.setItem(SKEY, JSON.stringify({ ...user, ts: Date.now() }));
    }
    onLoginSuccess(user, ROLES[user.role]);
    navigate('/dashboard'); // <--- Dashboard Navigation Added
  };

  const logout = () => {
    localStorage.removeItem(SKEY);
    setUser(null);
    setStep('signin');
    if (onLogoutAction) onLogoutAction();
  };

  // 2. Boot Check: Agar user pehle se logged in hai, toh direct dashboard bhejein
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SKEY) || 'null');
      if (saved && saved.email && ROLES[saved.role]) {
        setUser(saved);
        onLoginSuccess(saved, ROLES[saved.role]);
        navigate('/dashboard'); // <--- Dashboard Navigation Added for active session
      }
    } catch { }
  }, []);

  return {
    step, setStep, user, provider, remember, setRemember, trusted, ROLES, PERMS,
    handleEmailSignIn, handleSSOSignIn, handleMFAVerify, enterWorkspace, logout, forgetDevice
  };
}