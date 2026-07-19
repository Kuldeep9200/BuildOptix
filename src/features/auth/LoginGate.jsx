import React, { useState, useEffect, useRef } from 'react';
import { useLoginController } from '../hooks/useLoginController';

export default function LoginGate({ onLoginComplete, onLogoutTrigger, globalImages }) {
  const {
    step, setStep, user, provider, remember, setRemember, trusted, ROLES, PERMS,
    handleEmailSignIn, handleSSOSignIn, handleMFAVerify, enterWorkspace, logout, forgetDevice
  } = useLoginController(
    (userData, roleConfig) => {
      setIsGateHidden(true);
      if (onLoginComplete) onLoginComplete(userData, roleConfig);
    },
    () => {
      setIsGateHidden(false);
      if (onLogoutTrigger) onLogoutTrigger();
    }
  );

  // --- Local Component UI States ---
  const [isGateHidden, setIsGateHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpErr, setOtpErr] = useState('');
  const [mfaSecs, setMfaSecs] = useState(28);
  const [trustThisDevice, setTrustThisDevice] = useState(false);
  const [landingCount, setLandingCount] = useState(5);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotSent, setIsForgotSent] = useState(false);

  // --- Live Visual Ops Metrics Simulation ---
  const [metrics, setMetrics] = useState({ sites: '42/42', uptime: '99.97%', energy: '3.18MW' });
  const [sparkBars, setSparkBars] = useState([]);

  const otpRefs = useRef([]);

  useEffect(() => {
    // Initial sparkline array
    let initialBars = [];
    for (let i = 0; i < 16; i++) initialBars.push(30 + Math.round(40 * Math.abs(Math.sin(i * 0.7))));
    setSparkBars(initialBars);

    const interval = setInterval(() => {
      if (isGateHidden) return;
      setSparkBars(prev => {
        const updated = [...prev];
        updated.shift();
        updated.push(28 + Math.round(Math.random() * 52));
        return updated;
      });
      setMetrics({
        sites: '42/42',
        uptime: (99.9 + Math.random() * 0.09).toFixed(2) + '%',
        energy: (3.0 + Math.random() * 0.4).toFixed(2) + 'MW'
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [isGateHidden]);

  // --- MFA Countdown Timer ---
  useEffect(() => {
    if (step !== 'mfa') return;
    const timer = setInterval(() => {
      setMfaSecs(prev => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  // --- Landing Screen Auto-Redirect Timer ---
  useEffect(() => {
    if (step !== 'landing') return;
    setLandingCount(5);
    const timer = setInterval(() => {
      setLandingCount(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          enterWorkspace();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  // --- Helper Helpers ---
  const getInitials = (n) => (n || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const handleOtpChange = (val, index) => {
    const cleanVal = val.replace(/\D/g, '');
    if (!cleanVal) return;

    const newOtp = [...otp];
    newOtp[index] = cleanVal.slice(-1);
    setOtp(newOtp);

    if (index < 5 && cleanVal) {
      otpRefs.current[index + 1].focus();
    }

    if (newOtp.join('').length === 6) {
      triggerMFAVerify(newOtp.join(''));
    }
  };

  const triggerMFAVerify = (code) => {
    if (code === '000000') {
      setOtpErr("That code didn't match. Try the current one.");
      setTimeout(() => { setOtp(Array(6).fill('')); setOtpErr(''); otpRefs.current[0].focus(); }, 1200);
    } else {
      handleMFAVerify(trustThisDevice);
    }
  };

  // Expose global logout safely to window object if required by other parts of monolithic script
  useEffect(() => {
    window.boLogout = logout;
  }, [logout]);

  if (isGateHidden) return null;

  return (
    <div id="boLoginGate" className={isGateHidden ? 'bolg-hidden' : ''} role="dialog" aria-modal="true" aria-label="Sign in to BuildOptix">

      {/* ── LEFT PANEL (Branding & Live Metrics) ── */}
      <div className="bolg-brand">
        <div className="bolg-grid"></div>
        <div className="bolg-logo"><img src={globalImages?.logo || "/path-to-logo.png"} alt="BuildOptix" /></div>
        <div className="bolg-mid">
          <span className="bolg-eyebrow"><span className="lvd"></span>Smart Building Operations</span>
          <h1 className="bolg-h">Run every building like your best one.</h1>
          <p className="bolg-p">Monitor HVAC, energy, equipment and facilities across your whole portfolio — in real time, from one secure console.</p>
          <div className="bolg-trust">
            <span className="bolg-pill"><i className="ti ti-shield-lock"></i>MFA enforced</span>
            <span className="bolg-pill"><i className="ti ti-lock-check"></i>Encrypted in transit</span>
            <span className="bolg-pill"><i className="ti ti-history-toggle"></i>Full audit trail</span>
            <span className="bolg-pill iso"><i className="ti ti-certificate"></i>ISO 27001 · SOC 2</span>
          </div>
          <div className="bolg-ops">
            <div className="bolg-opscard">
              <div className="bolg-opshead">
                <div className="t"><i className="ti ti-building-broadcast-tower"></i>Portfolio — live</div>
                <div className="bolg-opslive"><span className="d"></span>Streaming</div>
              </div>
              <div className="bolg-opsm">
                <div><div className="l">Sites online</div><div className="v ok">{metrics.sites}</div></div>
                <div><div className="l">Uptime</div><div className="v cool">{metrics.uptime}</div></div>
                <div><div className="l">Energy now</div><div className="v gold">{metrics.energy}</div></div>
              </div>
              <div className="bolg-spark" id="bolgSpark">
                {sparkBars.map((h, i) => <span key={i} style={{ height: `${h}%` }}></span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="bolg-bfoot">
          <span>© 2026 BuildOptix</span><span className="sep"></span>
          <span>Region: AP-South (Mumbai)</span><span className="sep"></span>
          <span>v3.22</span>
        </div>
      </div>

      {/* ── RIGHT PANEL (Dynamic Screens Integration) ── */}
      <div className="bolg-form">
        <div className="bolg-ftop">
          <button className="bolg-topbtn" type="button" onClick={() => setIsDarkMode(!isDarkMode)}>
            <i className={`ti ${isDarkMode ? 'ti-sun' : 'ti-moon'}`}></i>
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
          <button className="bolg-topbtn" type="button" onClick={() => alert('Contact your BuildOptix administrator or support@buildoptix.in for access help.')}>
            <i className="ti ti-help-circle"></i>Need help?
          </button>
        </div>

        <div className="bolg-scroll" id="bolgScreen">

          {/* STEP 1: SIGN IN */}
          {step === 'signin' && (
            <div className="bolg-card bolg-fade">
              <h1 className="bolg-cardh">Sign in</h1>
              <p className="bolg-sub">Welcome back. Use your work account to continue.</p>
              <div className="bolg-ssostack">
                {/* Microsoft Button */}
                <button className="bolg-sso" onClick={() => handleSSOSignIn('microsoft')} type="button">
                  <span className="ico">
                    <svg viewBox="0 0 23 23" width="18" height="18">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022"></rect>
                      <rect x="12" y="1" width="10" height="10" fill="#7FBA00"></rect>
                      <rect x="1" y="12" width="10" height="10" fill="#00A4EF"></rect>
                      <rect x="12" y="12" width="10" height="10" fill="#FFB900"></rect>
                    </svg>
                  </span>
                  <span className="lbl">Continue with Microsoft</span>
                </button>

                {/* Google Button */}
                <button className="bolg-sso" onClick={() => handleSSOSignIn('google')} type="button">
                  <span className="ico">
                    <svg viewBox="0 0 48 48" width="18" height="18">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  </span>
                  <span className="lbl">Continue with Google</span>
                </button>
              </div>
              <div className="bolg-divider">or with email</div>
              <div className="bolg-field">
                <div className="bolg-flbl">Work email</div>
                <div className="bolg-fwrap">
                  <i className="ti ti-mail"></i>
                  <input className="bolg-field-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@buildoptix.in" />
                </div>
              </div>
              <div className="bolg-field">
                <div className="bolg-flbl"><span>Password</span><span className="bolg-lnk" onClick={() => setStep('forgot')}>Forgot?</span></div>
                <div className="bolg-fwrap">
                  <i className="ti ti-lock"></i>
                  <input className="bolg-field-input" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" />
                  <button className="bolg-eye" type="button" onClick={() => setShowPassword(!showPassword)}><i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`}></i></button>
                </div>
              </div>
              <button className="bolg-btn" disabled={!email || !password} onClick={() => handleEmailSignIn(email, password)} type="button">Sign in</button>
            </div>
          )}

          {/* STEP 2: SSO REDIRECTING */}
          {step === 'sso' && (
            <div className="bolg-wait bolg-fade">
              <h2>Redirecting to {provider === 'microsoft' ? 'Microsoft' : 'Google'}…</h2>
              <div className="bar"><i></i></div>
            </div>
          )}

          {/* STEP 3: MFA AUTHENTICATION */}
          {step === 'mfa' && (
            <div className="bolg-card bolg-fade">
              <span className="bolg-back" onClick={() => setStep('signin')}><i className="ti ti-arrow-left"></i>Back</span>
              <h1 className="bolg-cardh">Enter your code</h1>
              <div className="bolg-acct">
                <div className="av" style={{ background: ROLES[user?.role]?.av }}>{getInitials(user?.name)}</div>
                <div className="info"><div className="nm">{user?.name}</div><div className="em">{user?.email}</div></div>
              </div>
              <div className="bolg-otprow">
                {otp.map((digit, i) => (
                  <input key={i} ref={el => otpRefs.current[i] = el} className={`bolg-otp ${digit ? 'filled' : ''}`} type="text" maxLength="1" value={digit} onChange={(e) => handleOtpChange(e.target.value, i)} />
                ))}
              </div>
              {otpErr && <div className="bolg-otperr">{otpErr}</div>}
              <div className="bolg-otpmeta">Code refreshes in <b>{mfaSecs}s</b></div>
              <label className="bolg-chk">
                <input type="checkbox" checked={trustThisDevice} onChange={(e) => setTrustThisDevice(e.target.checked)} /> Trust this device for 30 days
              </label>
              <button className="bolg-btn" disabled={otp.join('').length < 6} onClick={() => triggerMFAVerify(otp.join(''))} type="button">Verify &amp; continue</button>
            </div>
          )}

          {/* STEP 4: ACCOUNT RECOVERY (FORGOT PASSWORD) */}
          {step === 'forgot' && (
            <div className="bolg-card bolg-fade">
              <span className="bolg-back" onClick={() => { setStep('signin'); setIsForgotSent(false); }}><i className="ti ti-arrow-left"></i>Back to sign in</span>
              {!isForgotSent ? (
                <>
                  <h1 className="bolg-cardh">Reset your password</h1>
                  <div className="bolg-field">
                    <div className="bolg-fwrap">
                      <input className="bolg-field-input" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="you@buildoptix.in" />
                    </div>
                  </div>
                  <button className="bolg-btn" disabled={!forgotEmail} onClick={() => { forgetDevice(forgotEmail); setIsForgotSent(true); }} type="button">Send reset link</button>
                </>
              ) : (
                <div className="bolg-fade">
                  <h1 className="bolg-cardh">Check your inbox</h1>
                  <p className="bolg-sub">Reset link sent to <b>{forgotEmail}</b></p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: LANDING / REDIRECTING SUCCESFULLY */}
          {step === 'landing' && (
            <div className="bolg-land bolg-fade">
              <h1 className="bolg-landh">{trusted ? 'Welcome back' : "You're verified"}</h1>
              <div className="bolg-landuser">
                <div className="av" style={{ background: ROLES[user?.role]?.av }}>{getInitials(user?.name)}</div>
                <div>
                  <div className="nm">{user?.name}</div>
                  <span className="bolg-rolebadge"><i className={`ti ${ROLES[user?.role]?.icon}`}></i>{ROLES[user?.role]?.name}</span>
                </div>
              </div>
              <div className="bolg-perms">
                {PERMS[user?.role]?.map((p, i) => <div key={i} className="bolg-perm"><i className="ti ti-check"></i>{p}</div>)}
              </div>
              <div className="bolg-redir">Entering workspace in <span>{landingCount}</span>s…</div>
              <button className="bolg-btn" onClick={enterWorkspace} type="button">Enter workspace now</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}