import React, { useState } from 'react';
const SITES_DATA = [
    { id: 'vikhroli', name: 'Mumbai — Vikhroli', brand: 'BuildOptix brand', type: 'BuildOptix', active: true, color: '#EE9A3A' },
    { id: 'delhi', name: 'Delhi — Sector 62', brand: 'Apex Integrators · Cyberhub Estates', type: 'Co-branded', active: false, color: '#4EA1FF' },
    { id: 'bengaluru', name: 'Bengaluru — Whitefield', brand: 'BuildOptix brand', type: 'BuildOptix', active: false, color: '#34D2E6' },
    { id: 'hyderabad', name: 'Hyderabad — Madhapur', brand: 'Vertex Facilities · Madhapur Tech Park', type: 'Co-branded', active: false, color: '#22D67A' },
    { id: 'kolkata', name: 'Kolkata — Salt Lake', brand: 'BuildOptix brand', type: 'BuildOptix', active: false, color: '#EE9A3A' },
    { id: 'chennai', name: 'Chennai — OMR', brand: 'BuildOptix brand', type: 'BuildOptix', active: false, color: '#EE9A3A' }
];
const AdminBrandingConfig = () => {
    // Navigation Active Tab State
    const [activeTab, setActiveTab] = useState(0);

    // Form & Preference States
    const [environment, setEnvironment] = useState('Production');
    const [region, setRegion] = useState('AP-South (Mumbai)');
    const [idleTimeout, setIdleTimeout] = useState('30');
    const [themeMode, setThemeMode] = useState('dark');
    const [defaultTeam, setDefaultTeam] = useState('hvac');
    const [selectedSite, setSelectedSite] = useState('vikhroli');
    const [brandingMode, setBrandingMode] = useState('buildoptix');

    // Policy Toggles State
    const [toggles1, setToggles1] = useState({
        autoAssign: true,
        customLoginPages: true,
        roleBranding: false
    });

    const handleToggle = (key) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    // Toggle Switches State
    const [toggles, setToggles] = useState({
        reauth: false,
        sessionPersist: true,
        themePersist: true,
        rememberTeam: true,
        allowSwitch: true,
        showTeamHeader: true,
    });

    // Handler for Toggle Switches
    const handleToggle = (key) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Logout Handlers
    const handleLogout = () => {
        alert('Signing out...');
    };

    const handleLogoutAll = () => {
        alert('Signing out of all devices...');
    };

    return (
        <div className="page active" id="pg-adminbranding">
            {/* Tab Navigation Header */}
            <div className="tab-headers mb-14" style={{ display: 'flex', gap: '10px' }}>
                <button
                    className={`btn ${activeTab === 0 ? 'primary' : ''}`}
                    onClick={() => setActiveTab(0)}
                >
                    General &amp; Preferences
                </button>
                <button
                    className={`btn ${activeTab === 1 ? 'primary' : ''}`}
                    onClick={() => setActiveTab(1)}
                >
                    Teams &amp; Defaults
                </button>
            </div>

            {/* Tab Panel 0: General & Preferences */}
            {activeTab === 0 && (
                <div className="tab-panel active" data-page="adminbranding" data-tab="0">
                    <div id="ab-general" className="ab-cfg">
                        <div className="adm-cfg-grid">
                            {/* Card 1: Platform Info */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-settings"
                                                style={{ color: 'var(--info)', marginRight: '6px' }}
                                            ></i>
                                            Platform
                                        </div>
                                        <div className="cs">BuildOptix smart building operations</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-row2">
                                        <div className="ab-field">
                                            <label>Application name</label>
                                            <input
                                                className="ptw-form-input"
                                                value="BuildOptix Platform"
                                                readOnly
                                            />
                                        </div>
                                        <div className="ab-field">
                                            <label>Version</label>
                                            <input
                                                className="ptw-form-input"
                                                value="v3.22.1 · Build 2026.05"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="ab-row2">
                                        <div className="ab-field">
                                            <label>Environment</label>
                                            <select
                                                className="ptw-form-select"
                                                value={environment}
                                                onChange={(e) => setEnvironment(e.target.value)}
                                            >
                                                <option value="Production">Production</option>
                                                <option value="Staging">Staging</option>
                                                <option value="Sandbox">Sandbox</option>
                                            </select>
                                        </div>
                                        <div className="ab-field">
                                            <label>Region</label>
                                            <select
                                                className="ptw-form-select"
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value)}
                                            >
                                                <option value="AP-South (Mumbai)">AP-South (Mumbai)</option>
                                                <option value="AP-South-2 (Hyderabad)">AP-South-2 (Hyderabad)</option>
                                                <option value="EU-West (Dublin)">EU-West (Dublin)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Logout Configuration */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-logout"
                                                style={{ color: 'var(--warn)', marginRight: '6px' }}
                                            ></i>
                                            Logout Configuration
                                        </div>
                                        <div className="cs">Session lifetime &amp; re-authentication</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-field">
                                        <label>Idle session timeout</label>
                                        <select
                                            className="ptw-form-select"
                                            value={idleTimeout}
                                            onChange={(e) => setIdleTimeout(e.target.value)}
                                        >
                                            <option value="15">15 minutes</option>
                                            <option value="30">30 minutes</option>
                                            <option value="60">60 minutes</option>
                                            <option value="never">Never (not recommended)</option>
                                        </select>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-lock-check"
                                                style={{ color: 'var(--brand-bright)' }}
                                            ></i>
                                            Require re-authentication
                                            <span>For sensitive actions (control commands, user changes)</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.reauth ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.reauth}
                                            tabIndex={0}
                                            onClick={() => handleToggle('reauth')}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-device-floppy"
                                                style={{ color: 'var(--cool)' }}
                                            ></i>
                                            "Keep me signed in" by default
                                            <span>Pre-checks the persistent-session option on the login screen</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.sessionPersist ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.sessionPersist}
                                            tabIndex={0}
                                            onClick={() => handleToggle('sessionPersist')}
                                        ></div>
                                    </div>

                                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn"
                                            style={{ padding: '8px 14px' }}
                                            onClick={handleLogout}
                                        >
                                            <i className="ti ti-logout"></i>Sign out
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ padding: '8px 14px' }}
                                            onClick={handleLogoutAll}
                                        >
                                            <i className="ti ti-shield-x"></i>Sign out of all devices
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: User Preferences */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-palette"
                                                style={{ color: 'var(--brand-bright)', marginRight: '6px' }}
                                            ></i>
                                            User Preferences
                                        </div>
                                        <div className="cs">Appearance &amp; persistence</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-field">
                                        <label>Theme mode</label>
                                        <div className="ab-seg">
                                            <button
                                                className={themeMode === 'dark' ? 'sel' : ''}
                                                onClick={() => setThemeMode('dark')}
                                            >
                                                <i className="ti ti-moon"></i>Dark
                                            </button>
                                            <button
                                                className={themeMode === 'light' ? 'sel' : ''}
                                                onClick={() => setThemeMode('light')}
                                            >
                                                <i className="ti ti-sun"></i>Light
                                            </button>
                                        </div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-history"
                                                style={{ color: 'var(--info)' }}
                                            ></i>
                                            Remember theme across sessions
                                            <span>Persists Dark / Light choice on this device</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.themePersist ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.themePersist}
                                            tabIndex={0}
                                            onClick={() => handleToggle('themePersist')}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Panel 1: Teams & Defaults */}
            {activeTab === 1 && (
                <div className="tab-panel active" data-page="adminbranding" data-tab="1">
                    <div id="ab-teams" className="ab-cfg">
                        <div className="adm-cfg-grid">
                            {/* Card 1: Team Selection Defaults */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-users-group"
                                                style={{ color: 'var(--info)', marginRight: '6px' }}
                                            ></i>
                                            Team Selection
                                        </div>
                                        <div className="cs">Defaults applied at sign-in</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div className="ab-field">
                                        <label>Default team</label>
                                        <select
                                            className="ptw-form-select"
                                            value={defaultTeam}
                                            onChange={(e) => setDefaultTeam(e.target.value)}
                                        >
                                            <option value="north">North Region</option>
                                            <option value="south">South Region</option>
                                            <option value="hvac">HVAC Operations</option>
                                            <option value="energy">Energy &amp; Metering</option>
                                            <option value="towerA">Tower A · Facilities</option>
                                            <option value="campus">Bandra Campus</option>
                                        </select>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-history-toggle"
                                                style={{ color: 'var(--cool)' }}
                                            ></i>
                                            Remember last selected team
                                            <span>Return users to the team they used last</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.rememberTeam ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.rememberTeam}
                                            tabIndex={0}
                                            onClick={() => handleToggle('rememberTeam')}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-arrows-exchange"
                                                style={{ color: 'var(--info)' }}
                                            ></i>
                                            Allow team switching
                                            <span>Users can change team from the in-app menu</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.allowSwitch ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.allowSwitch}
                                            tabIndex={0}
                                            onClick={() => handleToggle('allowSwitch')}
                                        ></div>
                                    </div>

                                    <div className="set-row">
                                        <div className="set-row-tx">
                                            <i
                                                className="ti ti-layout-navbar"
                                                style={{ color: 'var(--brand-bright)' }}
                                            ></i>
                                            Show team in header
                                            <span>Display the active team in the top bar</span>
                                        </div>
                                        <div
                                            className={`toggle ${toggles.showTeamHeader ? 'on' : 'off'}`}
                                            role="switch"
                                            aria-checked={toggles.showTeamHeader}
                                            tabIndex={0}
                                            onClick={() => handleToggle('showTeamHeader')}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Teams List View */}
                            <div className="card">
                                <div className="ch">
                                    <div>
                                        <div className="ct">
                                            <i
                                                className="ti ti-list-details"
                                                style={{ color: 'var(--brand-bright)', marginRight: '6px' }}
                                            ></i>
                                            Teams
                                        </div>
                                        <div className="cs">Membership is managed in Users &amp; Roles</div>
                                    </div>
                                </div>
                                <div className="cb">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                North Region
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                South Region
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                HVAC Operations
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '9px',
                                                    fontWeight: 700,
                                                    color: 'var(--ok)',
                                                    border: '1px solid var(--ok)',
                                                    borderRadius: '99px',
                                                    padding: '2px 7px',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                Default
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                Energy &amp; Metering
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                Tower A · Facilities
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '9px 11px',
                                                border: '1px solid var(--line-1)',
                                                borderRadius: '9px',
                                                background: 'var(--surface-1)',
                                            }}
                                        >
                                            <i
                                                className="ti ti-users"
                                                style={{ color: 'var(--brand-bright)', fontSize: '16px' }}
                                            ></i>
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: '12.5px',
                                                    fontWeight: 600,
                                                    color: 'var(--ink-1)',
                                                }}
                                            >
                                                Bandra Campus
                                            </span>
                                        </div>
                                    </div>

                                    <div className="ab-hint">
                                        <i className="ti ti-info-circle"></i>
                                        Default team, last-used recall and switching controls feed directly into the sign-in flow and the in-app account menu.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 2 && (
                <div data-page="adminbranding" data-tab="2">
                    <div id="ab-branding">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2px' }}>
                            <div style={{ minWidth: '240px', flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--ink-2)', marginBottom: '5px' }}>
                                    Configure site
                                </label>
                                <select
                                    value={selectedSite}
                                    onChange={(e) => setSelectedSite(e.target.value)}
                                >
                                    {SITES_DATA.map((site) => (
                                        <option key={site.id} value={site.id}>
                                            {site.name} {site.active ? ' · active' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ alignSelf: 'flex-end', fontSize: '11px', color: 'var(--ink-3)' }}>
                                <span style={{ color: 'var(--ok)', fontWeight: 600 }}>
                                    <i className="ti ti-circle-check-filled"></i> Active site
                                </span>
                            </div>
                        </div>

                        <div>
                            <div>
                                {/* Branding Mode Selection */}
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <i className="ti ti-versions" style={{ color: 'var(--info)', marginRight: '6px' }}></i>
                                                Branding Mode
                                            </div>
                                            <div>BuildOptix or Co-Branded for this site</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            <div
                                                style={{ alignItems: 'flex-start', padding: '13px', cursor: 'pointer' }}
                                                onClick={() => setBrandingMode('buildoptix')}
                                            >
                                                <span style={{ marginTop: '2px' }}></span>
                                                <span>
                                                    BuildOptix Branding
                                                    <small>BuildOptix logo throughout — direct &amp; platform-brand sites</small>
                                                </span>
                                            </div>
                                            <div
                                                style={{ alignItems: 'flex-start', padding: '13px', cursor: 'pointer' }}
                                                onClick={() => setBrandingMode('cobrand')}
                                            >
                                                <span style={{ marginTop: '2px' }}></span>
                                                <span>
                                                    Co-Branded
                                                    <small>BuildOptix + Partner (SI / consultant); customer logo where appropriate</small>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Platform Preview Card */}
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <i className="ti ti-building" style={{ color: 'var(--info)', marginRight: '6px' }}></i>
                                                BuildOptix Branding
                                            </div>
                                            <div>Platform-brand site</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 2px' }}>
                                            <img alt="Brand Logo" style={{ height: '22px', maxWidth: '160px', objectFit: 'contain', display: 'block' }} />
                                        </div>
                                    </div>
                                    <div>Run every building like your best one.</div>
                                </div>

                                <div>
                                    <div style={{ width: '60%' }}></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <i className="ti ti-info-circle"></i>
                            BuildOptix is primary across login, header, dashboard, reports and email. In co-branded sites the partner logo sits alongside; the customer logo appears in a secondary position.
                        </div>
                    </div>

                    <div style={{ marginTop: 0 }}>
                        <span id="ab-saved-flag"></span>
                        <div style={{ flex: 1 }}></div>
                        <button style={{ padding: '8px 16px' }} onClick={() => console.log('Reset clicked')}>
                            <i className="ti ti-restore"></i>Reset
                        </button>
                        <button style={{ padding: '8px 16px' }} onClick={() => console.log('Save clicked')}>
                            <i className="ti ti-device-floppy"></i>Save &amp; apply
                        </button>
                    </div>
                </div>
            )}

            {/* Tab Panel Enterprise Options - Tab 3 */}
            {activeTab === 3 && (
                <div data-page="adminbranding" data-tab="3">
                    <div id="ab-enterprise">
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <i className="ti ti-buildings" style={{ color: 'var(--info)', marginRight: '6px' }}></i>
                                        Sites
                                    </div>
                                    <div>Per-site branding — select to configure, or add a new site</div>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                    <button style={{ padding: '7px 13px', fontSize: '11px' }}>
                                        <i className="ti ti-plus"></i>Add Site
                                    </button>
                                </div>

                                {/* Site List */}
                                <div>
                                    {SITES_DATA.map((site) => (
                                        <div
                                            key={site.id}
                                            onClick={() => setSelectedSite(site.id)}
                                        >
                                            <span style={{ background: site.color }}>
                                                <i className="ti ti-building" style={{ color: '#0b1422', fontSize: '16px' }}></i>
                                            </span>
                                            <div style={{ minWidth: 0, flex: 1 }}>
                                                <div>{site.name}</div>
                                                <div>{site.brand}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {site.type === 'BuildOptix' ? (
                                                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--info)', border: '1px solid rgba(78,161,255,.4)', background: 'var(--info-soft)', borderRadius: '99px', padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                                                        BuildOptix
                                                    </span>
                                                ) : (
                                                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--brand-bright)', border: '1px solid var(--brand-line)', background: 'var(--brand-soft)', borderRadius: '99px', padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                                                        Co-branded
                                                    </span>
                                                )}
                                                {site.active ? (
                                                    <span>Active</span>
                                                ) : (
                                                    <button
                                                        style={{ padding: '4px 9px', fontSize: '10px' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log(`Setting ${site.id} as active`);
                                                        }}
                                                    >
                                                        Set active
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommended Logo Placement & Policy Options Grid */}
                        <div style={{ marginTop: '14px' }}>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <i className="ti ti-layout-align-middle" style={{ color: 'var(--brand-bright)', marginRight: '6px' }}></i>
                                            Recommended Logo Placement
                                        </div>
                                        <div>How co-branding is composed across the platform</div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                        <PlacementItem
                                            icon="ti-login"
                                            title="Login page"
                                            description="BuildOptix & Partner logos displayed prominently. Customer logo shown below in a secondary position."
                                        />
                                        <PlacementItem
                                            icon="ti-layout-navbar"
                                            title="Application header"
                                            description="BuildOptix as the primary platform brand, with the Partner logo alongside it."
                                        />
                                        <PlacementItem
                                            icon="ti-layout-dashboard"
                                            title="Dashboard"
                                            description="Branding shown cleanly in the header — no impact on usability or screen space."
                                        />
                                        <PlacementItem
                                            icon="ti-file-type-pdf"
                                            title="Reports & PDF exports"
                                            description="BuildOptix, Partner and Customer logos (if configured) in the report header."
                                        />
                                        <PlacementItem
                                            icon="ti-mail"
                                            title="Email notifications"
                                            description="Branding applied per the site configuration."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <i className="ti ti-shield-lock" style={{ color: 'var(--cool)', marginRight: '6px' }}></i>
                                            Branding Policy &amp; Access
                                        </div>
                                        <div>Multi-site governance</div>
                                    </div>
                                </div>
                                <div>
                                    <PolicyRow
                                        icon="ti-wand"
                                        iconColor="var(--brand-bright)"
                                        title="Automatic branding by site"
                                        subtitle="Apply the active site's brand automatically on entry"
                                        active={toggles.autoAssign}
                                        onToggle={() => handleToggle('autoAssign')}
                                    />
                                    <PolicyRow
                                        icon="ti-browser"
                                        iconColor="var(--info)"
                                        title="Site-specific login pages"
                                        subtitle="Serve each site its branded login"
                                        active={toggles.customLoginPages}
                                        onToggle={() => handleToggle('customLoginPages')}
                                    />
                                    <PolicyRow
                                        icon="ti-shield-cog"
                                        iconColor="var(--violet)"
                                        title="Role-based branding control"
                                        subtitle="Restrict who can edit branding"
                                        active={toggles.roleBranding}
                                        onToggle={() => handleToggle('roleBranding')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RBAC Table */}
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <i className="ti ti-lock-access" style={{ color: 'var(--violet)', marginRight: '6px' }}></i>
                                        Role-Based Branding &amp; Access Control
                                    </div>
                                    <div>Who can view and manage site branding</div>
                                </div>
                            </div>
                            <div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Role</th>
                                                <th>Manage branding</th>
                                                <th>View white-label</th>
                                                <th>Custom domains</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <RBACRow role="Super Admin" manage="Full" view="Full" domains="Full" />
                                            <RBACRow role="Facility Manager" manage="Site" view="View" domains="Edit" />
                                            <RBACRow role="Operator" manage="—" view="View" domains="—" />
                                            <RBACRow role="Technician" manage="—" view="View" domains="—" />
                                            <RBACRow role="Auditor" manage="—" view="View" domains="—" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
};

export default AdminBrandingConfig;



const PolicyRow = ({ icon, iconColor, title, subtitle, active, onToggle }) => (
    <div>
        <div>
            <i className={`ti ${icon}`} style={{ color: iconColor }}></i>
            {title}
            <span>{subtitle}</span>
        </div>
        <div
            role="switch"
            aria-checked={active}
            tabIndex={0}
            onClick={onToggle}
        ></div>
    </div>
);

const RBACRow = ({ role, manage, view, domains }) => (
    <tr>
        <td style={{ fontWeight: 600, color: 'var(--ink-1)' }}>{role}</td>
        <td><span>{manage}</span></td>
        <td><span>{view}</span></td>
        <td><span>{domains}</span></td>
    </tr>
);