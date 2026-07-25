import React, { useState } from 'react';

const AdminUsersRoles = () => {
    // Tab State: 0 = Users, 1 = Roles & Permissions
    const [activeTab, setActiveTab] = useState(1);
    const [selectedRole, setSelectedRole] = useState('Vendor (Read-only)');

    // Filter States for Users tab
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Dummy Handler Functions
    const auOpenUserModal = (userId) => console.log('Open user modal:', userId);
    const auOpenUser = (userId) => console.log('View user profile:', userId);
    const auResetPwd = (userId) => console.log('Reset password:', userId);
    const auToggleActive = (userId) => console.log('Toggle user active status:', userId);
    const admOpenRoleModal = (role) => console.log('Open role modal:', role);
    const [actFilter, setActFilter] = useState('all');

    // Sample Toast simulation helper
    const showToast = (message) => {
        alert(message); // Standard handler replace with your UI toast/notification system
    };

    const handleRemoveDevice = (userId, deviceId) => {
        console.log(`Removing device ${deviceId} for user ${userId}`);
    };

    const handleReRegisterDevice = (userId, deviceId) => {
        console.log(`Re-registering device ${deviceId} for user ${userId}`);
    };

    const handleTogglePolicy = (policyKey) => {
        console.log(`Toggling policy: ${policyKey}`);
    };
    return (
        <div className="page active" id='pg-adminusers'>
            {/* TAB 0: USERS MANAGEMENT */}

            
            <div
                className={`tab-panel ${activeTab === 0 ? 'active' : ''}`}
                data-page="adminusers"
                data-tab="0"
                style={{ display: activeTab === 0 ? 'block' : 'none' }}
            >
                <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
                    <div className="kpi glow-info">
                        <div className="kpi-l">Total Users</div>
                        <div className="kpi-v" id="au-kpi-total">9</div>
                    </div>
                    <div className="kpi glow-ok">
                        <div className="kpi-l">Active</div>
                        <div className="kpi-v ok" id="au-kpi-active">7</div>
                    </div>
                    <div className="kpi glow-info">
                        <div className="kpi-l">Administrators</div>
                        <div className="kpi-v" id="au-kpi-admins">1</div>
                    </div>
                    <div className="kpi glow-warn">
                        <div className="kpi-l">Pending Invites</div>
                        <div className="kpi-v warn" id="au-kpi-pending">1</div>
                    </div>
                    <div className="kpi glow-info">
                        <div className="kpi-l">Global Users</div>
                        <div className="kpi-v" id="au-kpi-global" style={{ color: 'var(--violet)' }}>2</div>
                    </div>
                </div>

                <div className="api-toolbar">
                    <div className="api-search">
                        <i className="ti ti-search"></i>
                        <input
                            id="adm-user-search"
                            type="text"
                            placeholder="Search users by name, email or role…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="au-sel"
                        id="au-filter-role"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All roles</option>
                        <option>Administrator</option>
                        <option>FM Manager</option>
                        <option>Senior Engineer</option>
                        <option>Operator</option>
                        <option>EHS Officer</option>
                        <option>Vendor (Read-only)</option>
                    </select>
                    <select
                        className="au-sel"
                        id="au-filter-status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button
                        className="btn primary"
                        style={{ padding: '8px 14px' }}
                        onClick={() => auOpenUserModal()}
                    >
                        <i className="ti ti-user-plus"></i>Add User
                    </button>
                </div>

                <div className="card">
                    <div className="cb" style={{ padding: 0, overflowX: 'auto' }}>
                        <div id="adm-user-table">
                            <table className="adm-tbl">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Role</th>
                                        <th>Site Access</th>
                                        <th style={{ textAlign: 'center' }}>MFA</th>
                                        <th>Status</th>
                                        <th>Last Active</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1001')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#2A6FDB' }}>SR</span>
                                            <b>Sandeep Rao</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>sandeep.rao@buildoptix.in</div>
                                        </td>
                                        <td>Administrator</td>
                                        <td>
                                            <i className="ti ti-lock" style={{ fontSize: '11px', color: 'var(--info)' }} title="Device-locked"></i>{' '}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-global"><i className="ti ti-world" style={{ fontSize: '11px' }}></i>Global</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                                <span className="au-site-chip">BKC Tower</span>
                                                <span className="au-site-chip">Powai Campus</span>
                                                <span className="au-site-chip">Pune SEZ</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>just now</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1001'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1001'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1001'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1001'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1002')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#1F8A5B' }}>RM</span>
                                            <b>Rajan Mehta</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>rajan.mehta@buildoptix.in</div>
                                        </td>
                                        <td>FM Manager</td>
                                        <td>
                                            <i className="ti ti-lock" style={{ fontSize: '11px', color: 'var(--info)' }} title="Device-locked"></i>{' '}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                                <span className="au-site-chip">BKC Tower</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>2 min ago</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1002'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1002'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1002'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1002'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1003')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#B8842A' }}>AD</span>
                                            <b>Anil Desai</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>anil.desai@buildoptix.in</div>
                                        </td>
                                        <td>Senior Engineer</td>
                                        <td>
                                            <i className="ti ti-lock" style={{ fontSize: '11px', color: 'var(--info)' }} title="Device-locked"></i>{' '}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>14 min ago</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1003'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1003'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1003'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1003'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1004')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#9B59B6' }}>PN</span>
                                            <b>Pooja Nair</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>pooja.nair@buildoptix.in</div>
                                        </td>
                                        <td>EHS Officer</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                                <span className="au-site-chip">Powai Campus</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>1 hr ago</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1004'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1004'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1004'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1004'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1005')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#0B9EBB' }}>MI</span>
                                            <b>Meera Iyer</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>meera.iyer@buildoptix.in</div>
                                        </td>
                                        <td>Operator</td>
                                        <td>
                                            <i className="ti ti-lock" style={{ fontSize: '11px', color: 'var(--info)' }} title="Device-locked"></i>{' '}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-off au-mfa-off" title="MFA not enrolled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>3 hr ago</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1005'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1005'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1005'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1005'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1006')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#D1603A' }}>VS</span>
                                            <b>Vikram Shah</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>vikram.shah@cooltech.com</div>
                                        </td>
                                        <td>Vendor (Read-only)</td>
                                        <td>
                                            <i className="ti ti-lock" style={{ fontSize: '11px', color: 'var(--info)' }} title="Device-locked"></i>{' '}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>Yesterday</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1006'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1006'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1006'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1006'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1007')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#5B7CFA' }}>NK</span>
                                            <b>Neha Kulkarni</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>neha.k@buildoptix.in</div>
                                        </td>
                                        <td>Operator</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">BKC Tower</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-off au-mfa-off" title="MFA not enrolled"></i></td>
                                        <td><span className="badge badge-amber">Pending</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1007'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1007'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1007'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1007'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1008')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#2FA39A' }}>AP</span>
                                            <b>Arjun Pillai</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>arjun.pillai@buildoptix.in</div>
                                        </td>
                                        <td>Senior Engineer</td>
                                        <td>
                                            <i className="ti ti-lock" style={{ fontSize: '11px', color: 'var(--info)' }} title="Device-locked"></i>{' '}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-local"><i className="ti ti-device-desktop" style={{ fontSize: '11px' }}></i>Local</span>
                                                <span className="au-site-chip">Pune SEZ</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-red">Inactive</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>12 days ago</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1008'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1008'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1008'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib good" title="Activate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1008'); }}><i className="ti ti-user-check"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => auOpenUser('U-1009')}>
                                        <td>
                                            <span className="adm-avatar" style={{ background: '#2A6FDB' }}>KM</span>
                                            <b>Karthik Menon</b>
                                            <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: '34px' }}>karthik.menon@buildoptix.in</div>
                                        </td>
                                        <td>FM Manager</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                                                <span className="au-global"><i className="ti ti-world" style={{ fontSize: '11px' }}></i>Global</span>
                                                <span className="au-site-chip">Vikhroli</span>
                                                <span className="au-site-chip">BKC Tower</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}><i className="ti ti-shield-check au-mfa-on" title="MFA enabled"></i></td>
                                        <td><span className="badge badge-green">Active</span></td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>30 min ago</td>
                                        <td>
                                            <div className="au-act-btns">
                                                <span className="au-ib info" title="View profile" onClick={(e) => { e.stopPropagation(); auOpenUser('U-1009'); }}><i className="ti ti-eye"></i></span>
                                                <span className="au-ib" title="Edit user" onClick={(e) => { e.stopPropagation(); auOpenUserModal('U-1009'); }}><i className="ti ti-edit"></i></span>
                                                <span className="au-ib" title="Reset password" onClick={(e) => { e.stopPropagation(); auResetPwd('U-1009'); }}><i className="ti ti-key"></i></span>
                                                <span className="au-ib danger" title="Deactivate user" onClick={(e) => { e.stopPropagation(); auToggleActive('U-1009'); }}><i className="ti ti-user-off"></i></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* TAB 1: ROLES & PERMISSIONS */}
            <div
                className={`tab-panel ${activeTab === 1 ? 'active' : ''}`}
                data-page="adminusers"
                data-tab="1"
                style={{ display: activeTab === 1 ? 'block' : 'none' }}
            >
                <div className="adm-role-toolbar">
                    <span className="hint">Define roles and tune per-module access. Changes apply across the platform.</span>
                    <button className="btn primary" style={{ padding: '8px 14px', marginLeft: 'auto' }} onClick={() => admOpenRoleModal()}>
                        <i className="ti ti-plus"></i>Add Role
                    </button>
                </div>

                <div className="adm-role-grid" id="adm-role-cards">
                    {/* Administrator */}
                    <div
                        className={`adm-role-card ${selectedRole === 'Administrator' ? 'sel' : ''}`}
                        onClick={() => setSelectedRole('Administrator')}
                        tabIndex={0}
                        role="button"
                        aria-label="View permissions for Administrator"
                    >
                        <span className="adm-role-edit" title="Edit role" onClick={(e) => { e.stopPropagation(); admOpenRoleModal('Administrator'); }}>
                            <i className="ti ti-edit"></i>
                        </span>
                        <div className="adm-role-h"><i className="ti ti-shield-star" style={{ color: 'var(--bad)' }}></i>Administrator</div>
                        <p>Full platform control incl. users, config &amp; security.</p>
                        <span className="adm-role-count">5 users</span>
                        <div className="adm-role-view"><i className="ti ti-key"></i>View permissions <i className="ti ti-arrow-right" style={{ fontSize: '12px' }}></i></div>
                    </div>

                    {/* FM Manager */}
                    <div
                        className={`adm-role-card ${selectedRole === 'FM Manager' ? 'sel' : ''}`}
                        onClick={() => setSelectedRole('FM Manager')}
                        tabIndex={0}
                        role="button"
                        aria-label="View permissions for FM Manager"
                    >
                        <span className="adm-role-edit" title="Edit role" onClick={(e) => { e.stopPropagation(); admOpenRoleModal('FM Manager'); }}>
                            <i className="ti ti-edit"></i>
                        </span>
                        <div className="adm-role-h"><i className="ti ti-user-cog" style={{ color: 'var(--info)' }}></i>FM Manager</div>
                        <p>Operations, approvals, reports across the site.</p>
                        <span className="adm-role-count">3 users</span>
                        <div className="adm-role-view"><i className="ti ti-key"></i>View permissions <i className="ti ti-arrow-right" style={{ fontSize: '12px' }}></i></div>
                    </div>

                    {/* Senior Engineer */}
                    <div
                        className={`adm-role-card ${selectedRole === 'Senior Engineer' ? 'sel' : ''}`}
                        onClick={() => setSelectedRole('Senior Engineer')}
                        tabIndex={0}
                        role="button"
                        aria-label="View permissions for Senior Engineer"
                    >
                        <span className="adm-role-edit" title="Edit role" onClick={(e) => { e.stopPropagation(); admOpenRoleModal('Senior Engineer'); }}>
                            <i className="ti ti-edit"></i>
                        </span>
                        <div className="adm-role-h"><i className="ti ti-tool" style={{ color: 'var(--violet)' }}></i>Senior Engineer</div>
                        <p>Equipment control, work orders, diagnostics.</p>
                        <span className="adm-role-count">9 users</span>
                        <div className="adm-role-view"><i className="ti ti-key"></i>View permissions <i className="ti ti-arrow-right" style={{ fontSize: '12px' }}></i></div>
                    </div>

                    {/* Operator */}
                    <div
                        className={`adm-role-card ${selectedRole === 'Operator' ? 'sel' : ''}`}
                        onClick={() => setSelectedRole('Operator')}
                        tabIndex={0}
                        role="button"
                        aria-label="View permissions for Operator"
                    >
                        <span className="adm-role-edit" title="Edit role" onClick={(e) => { e.stopPropagation(); admOpenRoleModal('Operator'); }}>
                            <i className="ti ti-edit"></i>
                        </span>
                        <div className="adm-role-h"><i className="ti ti-user" style={{ color: 'var(--ok)' }}></i>Operator</div>
                        <p>Monitor dashboards, acknowledge alarms, log entries.</p>
                        <span className="adm-role-count">24 users</span>
                        <div className="adm-role-view"><i className="ti ti-key"></i>View permissions <i className="ti ti-arrow-right" style={{ fontSize: '12px' }}></i></div>
                    </div>

                    {/* EHS Officer */}
                    <div
                        className={`adm-role-card ${selectedRole === 'EHS Officer' ? 'sel' : ''}`}
                        onClick={() => setSelectedRole('EHS Officer')}
                        tabIndex={0}
                        role="button"
                        aria-label="View permissions for EHS Officer"
                    >
                        <span className="adm-role-edit" title="Edit role" onClick={(e) => { e.stopPropagation(); admOpenRoleModal('EHS Officer'); }}>
                            <i className="ti ti-edit"></i>
                        </span>
                        <div className="adm-role-h"><i className="ti ti-shield-heart" style={{ color: 'var(--warn)' }}></i>EHS Officer</div>
                        <p>Safety, permits, compliance &amp; incident records.</p>
                        <span className="adm-role-count">4 users</span>
                        <div className="adm-role-view"><i className="ti ti-key"></i>View permissions <i className="ti ti-arrow-right" style={{ fontSize: '12px' }}></i></div>
                    </div>

                    {/* Vendor (Read-only) */}
                    <div
                        className={`adm-role-card ${selectedRole === 'Vendor (Read-only)' ? 'sel' : ''}`}
                        onClick={() => setSelectedRole('Vendor (Read-only)')}
                        tabIndex={0}
                        role="button"
                        aria-label="View permissions for Vendor (Read-only)"
                    >
                        <span className="adm-role-edit" title="Edit role" onClick={(e) => { e.stopPropagation(); admOpenRoleModal('Vendor (Read-only)'); }}>
                            <i className="ti ti-edit"></i>
                        </span>
                        <div className="adm-role-h"><i className="ti ti-eye" style={{ color: 'var(--cool)' }}></i>Vendor (Read-only)</div>
                        <p>Scoped read access to assigned assets only.</p>
                        <span className="adm-role-count">3 users</span>
                        <div className="adm-role-view"><i className="ti ti-key"></i>View permissions <i className="ti ti-arrow-right" style={{ fontSize: '12px' }}></i></div>
                    </div>
                </div>

                {/* ROLE DETAILS */}
                <div id="adm-role-detail">
                    <div className="adm-rd">
                        <div className="adm-rd-head">
                            <span className="adm-rd-ic" style={{ background: 'color-mix(in srgb,var(--cool) 16%,transparent)', color: 'var(--cool)' }}>
                                <i className="ti ti-eye"></i>
                            </span>
                            <div>
                                <div className="adm-rd-ti">Vendor (Read-only)</div>
                                <div className="adm-rd-ds">Scoped read access to assigned assets only.</div>
                            </div>
                            <div className="adm-rd-sum">
                                <span className="adm-rd-chip" style={{ color: 'var(--ok)' }}><i className="ti ti-circle-check"></i><span className="n">5</span> Allowed</span>
                                <span className="adm-rd-chip" style={{ color: 'var(--warn)' }}><i className="ti ti-eye"></i><span className="n">15</span> View only</span>
                                <span className="adm-rd-chip" style={{ color: 'var(--ink-3)' }}><i className="ti ti-ban"></i><span className="n">34</span> Denied</span>
                            </div>
                            <button className="btn primary adm-rd-edit" style={{ alignSelf: 'flex-start' }} onClick={() => admOpenRoleModal('Vendor (Read-only)')}>
                                <i className="ti ti-edit"></i>Edit Role
                            </button>
                        </div>

                        <div className="adm-rd-grid">
                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-layout-dashboard"></i>Dashboards<span className="mc">3/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View dashboards</span><span className="adm-perm-pill full"><i className="ti ti-check"></i>Allowed</span></div>
                                <div className="adm-rd-prow"><span className="pn">Customise layout</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Export widgets</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-cpu"></i>Equipment<span className="mc">5/5</span></div>
                                <div className="adm-rd-prow"><span className="pn">View equipment &amp; status</span><span className="adm-perm-pill full"><i className="ti ti-check"></i>Allowed</span></div>
                                <div className="adm-rd-prow"><span className="pn">Start / stop control</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Change setpoints</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Acknowledge faults</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Set maintenance mode</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-clipboard-list"></i>Work Orders &amp; Tickets<span className="mc">5/5</span></div>
                                <div className="adm-rd-prow"><span className="pn">View tickets</span><span className="adm-perm-pill full"><i className="ti ti-check"></i>Allowed</span></div>
                                <div className="adm-rd-prow"><span className="pn">Create tickets</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Assign / reassign</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Resolve &amp; close</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Escalate</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-bolt"></i>Energy &amp; Utilities<span className="mc">0/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View energy &amp; meters</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Configure tariffs</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Export energy data</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-file-analytics"></i>Reports<span class="mc">3/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View reports</span><span className="adm-perm-pill full"><i className="ti ti-check"></i>Allowed</span></div>
                                <div className="adm-rd-prow"><span className="pn">Schedule reports</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Export PDF / Excel</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-sparkles"></i>AI Intelligence<span className="mc">0/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View AI insights</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Run simulations</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Apply recommendations</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-world-bolt"></i>Global Operations Center<span className="mc">0/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View GOC &amp; sites</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Manage site monitoring</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Network &amp; device actions</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-router"></i>Devices &amp; IoT<span className="mc">4/4</span></div>
                                <div className="adm-rd-prow"><span className="pn">View device fleet</span><span className="adm-perm-pill full"><i className="ti ti-check"></i>Allowed</span></div>
                                <div className="adm-rd-prow"><span className="pn">Provision / decommission</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Remote actions</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                                <div className="adm-rd-prow"><span className="pn">Firmware updates</span><span className="adm-perm-pill view"><i className="ti ti-eye"></i>View only</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-shield-heart"></i>Safety &amp; Permits<span className="mc">0/4</span></div>
                                <div className="adm-rd-prow"><span className="pn">View permits &amp; incidents</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Issue permits</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Close permits</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Record incidents</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-users-group"></i>Users &amp; Roles<span className="mc">0/4</span></div>
                                <div className="adm-rd-prow"><span className="pn">View users</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Create / edit users</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Manage roles &amp; permissions</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Device security</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-adjustments-cog"></i>Site Configuration<span className="mc">0/4</span></div>
                                <div className="adm-rd-prow"><span className="pn">View site config</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Edit site profile &amp; thresholds</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Manage site structure</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Gateways &amp; controllers</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-palette"></i>Application Settings<span className="mc">0/4</span></div>
                                <div className="adm-rd-prow"><span className="pn">View settings</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Manage preferences &amp; teams</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Branding &amp; white-label</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Multi-tenant &amp; enterprise</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-plug-connected"></i>Integrations<span className="mc">0/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View integrations</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Connect / configure</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Trigger sync</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-shield-lock"></i>Cybersecurity<span className="mc">0/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View security posture</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Manage controls &amp; policies</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Audit logs</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>

                            <div className="adm-rd-mod">
                                <div className="adm-rd-mh"><i className="ti ti-api"></i>API Management<span className="mc">0/3</span></div>
                                <div className="adm-rd-prow"><span className="pn">View API registry</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Manage keys &amp; webhooks</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                                <div className="adm-rd-prow"><span className="pn">Edit endpoints</span><span className="adm-perm-pill none"><i className="ti ti-minus"></i>Denied</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PERMISSION MATRIX TABLE */}
                <div className="card">
                    <div className="ch">
                        <div>
                            <div className="ct">Permission Matrix</div>
                            <div className="cs">Role-based access control (RBAC) · ✓ full · ◐ limited · — none</div>
                        </div>
                    </div>
                    <div className="cb" style={{ padding: 0, overflowX: 'auto' }}>
                        <div id="adm-perm-matrix">
                            <table className="adm-tbl adm-pm-tbl">
                                <thead>
                                    <tr>
                                        <th className="adm-pm-rolehd">Role</th>
                                        <th className="adm-pm-th" title="Dashboards"><i className="ti ti-layout-dashboard"></i><span>Dashboards</span></th>
                                        <th className="adm-pm-th" title="Equipment"><i className="ti ti-cpu"></i><span>Equipment</span></th>
                                        <th className="adm-pm-th" title="Work Orders &amp; Tickets"><i className="ti ti-clipboard-list"></i><span>Work Orders &amp; Tickets</span></th>
                                        <th className="adm-pm-th" title="Energy &amp; Utilities"><i className="ti ti-bolt"></i><span>Energy &amp; Utilities</span></th>
                                        <th className="adm-pm-th" title="Reports"><i className="ti ti-file-analytics"></i><span>Reports</span></th>
                                        <th className="adm-pm-th" title="AI Intelligence"><i className="ti ti-sparkles"></i><span>AI Intelligence</span></th>
                                        <th className="adm-pm-th" title="Global Operations Center"><i className="ti ti-world-bolt"></i><span>Global Operations Center</span></th>
                                        <th className="adm-pm-th" title="Devices &amp; IoT"><i className="ti ti-router"></i><span>Devices &amp; IoT</span></th>
                                        <th className="adm-pm-th" title="Safety &amp; Permits"><i className="ti ti-shield-heart"></i><span>Safety &amp; Permits</span></th>
                                        <th className="adm-pm-th adm-pm-sep" title="Users &amp; Roles"><i className="ti ti-users-group"></i><span>Users &amp; Roles</span></th>
                                        <th className="adm-pm-th" title="Site Configuration"><i className="ti ti-adjustments-cog"></i><span>Site Configuration</span></th>
                                        <th className="adm-pm-th" title="Application Settings"><i className="ti ti-palette"></i><span>Application Settings</span></th>
                                        <th className="adm-pm-th" title="Integrations"><i className="ti ti-plug-connected"></i><span>Integrations</span></th>
                                        <th className="adm-pm-th" title="Cybersecurity"><i className="ti ti-shield-lock"></i><span>Cybersecurity</span></th>
                                        <th className="adm-pm-th" title="API Management"><i className="ti ti-api"></i><span>API Management</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Administrator</b></td>
                                        {/* Matrix cells match existing styling */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {activeTab === 2 && (
                <div className="tab-panel" data-page="adminusers" data-tab="2">
                    {/* KPI Summary Cards */}
                    <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div className="kpi glow-info">
                            <div className="kpi-l">Events (24h)</div>
                            <div className="kpi-v" id="au-act-24">9</div>
                        </div>
                        <div className="kpi glow-ok">
                            <div className="kpi-l">Logins (24h)</div>
                            <div className="kpi-v ok" id="au-act-logins">3</div>
                        </div>
                        <div className="kpi glow-warn">
                            <div className="kpi-l">Password Resets</div>
                            <div className="kpi-v warn" id="au-act-resets">2</div>
                        </div>
                        <div className="kpi glow-info">
                            <div className="kpi-l">Role / Access Changes</div>
                            <div className="kpi-v" id="au-act-changes">2</div>
                        </div>
                    </div>

                    {/* Search Toolbar & Filter Chips */}
                    <div className="api-toolbar">
                        <div className="api-search">
                            <i className="ti ti-search"></i>
                            <input
                                id="au-act-search"
                                type="text"
                                placeholder="Search activity by user, action or IP…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="au-chips" id="au-act-chips">
                            <span
                                className={`au-chip ${actFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActFilter('all')}
                            >
                                <i className="ti ti-list" style={{ fontSize: '12px' }}></i>All
                            </span>
                            <span
                                className={`au-chip ${actFilter === 'logins' ? 'active' : ''}`}
                                onClick={() => setActFilter('logins')}
                            >
                                <i className="ti ti-login-2" style={{ fontSize: '12px' }}></i>Logins
                            </span>
                            <span
                                className={`au-chip ${actFilter === 'password' ? 'active' : ''}`}
                                onClick={() => setActFilter('password')}
                            >
                                <i className="ti ti-key" style={{ fontSize: '12px' }}></i>Password
                            </span>
                            <span
                                className={`au-chip ${actFilter === 'access' ? 'active' : ''}`}
                                onClick={() => setActFilter('access')}
                            >
                                <i className="ti ti-user-cog" style={{ fontSize: '12px' }}></i>Roles &amp; Access
                            </span>
                            <span
                                className={`au-chip ${actFilter === 'mfa' ? 'active' : ''}`}
                                onClick={() => setActFilter('mfa')}
                            >
                                <i className="ti ti-device-mobile-check" style={{ fontSize: '12px' }}></i>MFA
                            </span>
                            <span
                                className={`au-chip ${actFilter === 'devices' ? 'active' : ''}`}
                                onClick={() => setActFilter('devices')}
                            >
                                <i className="ti ti-devices" style={{ fontSize: '12px' }}></i>Devices
                            </span>
                            <span
                                className={`au-chip ${actFilter === 'account' ? 'active' : ''}`}
                                onClick={() => setActFilter('account')}
                            >
                                <i className="ti ti-user" style={{ fontSize: '12px' }}></i>Account
                            </span>
                        </div>
                    </div>

                    {/* Audit Logs Table Card */}
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">User Activity &amp; Audit Trail</div>
                                <div className="cs">Immutable log · logins, password resets, role &amp; access changes, MFA and device events · 90-day retention</div>
                            </div>
                            <span className="ca" onClick={() => showToast('Exporting activity log to CSV…')}>
                                Export CSV →
                            </span>
                        </div>
                        <div className="cb" style={{ padding: 0, overflowX: 'auto' }}>
                            <div id="au-act-table">
                                <table className="adm-tbl">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Event</th>
                                            <th>User</th>
                                            <th>Detail</th>
                                            <th>IP</th>
                                            <th>Device</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>just now</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-login-2" style={{ color: 'var(--ok)', fontSize: '14px' }}></i>Login
                                                </span>
                                            </td>
                                            <td>Sandeep Rao</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Signed in from trusted device (MacBook Pro 16")</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.12</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>MacBook Pro 16"</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>2 min ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-login-2" style={{ color: 'var(--ok)', fontSize: '14px' }}></i>Login
                                                </span>
                                            </td>
                                            <td>Rajan Mehta</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Signed in · MFA verified</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.31</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Dell Latitude 7440</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>9 min ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-device-mobile-check" style={{ color: 'var(--violet)', fontSize: '14px' }}></i>MFA event
                                                </span>
                                            </td>
                                            <td>Anil Desai</td>
                                            <td style={{ color: 'var(--ink-2)' }}>MFA challenge passed (TOTP)</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.22</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>ThinkPad X1 Carbon</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>14 min ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-devices" style={{ color: 'var(--cool)', fontSize: '14px' }}></i>Device event
                                                </span>
                                            </td>
                                            <td>Anil Desai</td>
                                            <td style={{ color: 'var(--ink-2)' }}>New device pending registration — Samsung Galaxy S24</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>49.36.x.x</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Samsung Galaxy S24</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>38 min ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-user-cog" style={{ color: 'var(--info)', fontSize: '14px' }}></i>Role changed
                                                </span>
                                            </td>
                                            <td>admin → Karthik Menon</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Role changed: Senior Engineer → FM Manager</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>1 hr ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-map-pin" style={{ color: 'var(--info)', fontSize: '14px' }}></i>Site access changed
                                                </span>
                                            </td>
                                            <td>admin → Pooja Nair</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Site access updated: +Powai Campus</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>2 hr ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-key" style={{ color: 'var(--warn)', fontSize: '14px' }}></i>Password reset
                                                </span>
                                            </td>
                                            <td>Meera Iyer</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Password reset link sent to meera.iyer@buildoptix.in</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>3 hr ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-login-2" style={{ color: 'var(--ok)', fontSize: '14px' }}></i>Login
                                                </span>
                                            </td>
                                            <td>Meera Iyer</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Signed in from trusted device</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.18</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>HP ProBook 450</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>5 hr ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-lock-x" style={{ color: 'var(--bad)', fontSize: '14px' }}></i>Failed login
                                                </span>
                                            </td>
                                            <td>Vikram Shah</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Blocked: login attempt from unrecognised device (account is device-locked)</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>45.13.x.x</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>Unknown device</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Yesterday</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-user-plus" style={{ color: 'var(--ink-2)', fontSize: '14px' }}></i>Account
                                                </span>
                                            </td>
                                            <td>admin → Neha Kulkarni</td>
                                            <td style={{ color: 'var(--ink-2)' }}>User created &amp; invite sent — role Operator</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Yesterday</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-devices" style={{ color: 'var(--cool)', fontSize: '14px' }}></i>Device event
                                                </span>
                                            </td>
                                            <td>Sandeep Rao</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Registered trusted device — iPhone 15 Pro</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.40</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>iPhone 15 Pro</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Yesterday</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-logout-2" style={{ color: 'var(--ink-3)', fontSize: '14px' }}></i>Logout
                                                </span>
                                            </td>
                                            <td>Anil Desai</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Signed out</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.22</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>ThinkPad X1 Carbon</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>2 days ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-user-plus" style={{ color: 'var(--ink-2)', fontSize: '14px' }}></i>Account
                                                </span>
                                            </td>
                                            <td>admin → Arjun Pillai</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Account deactivated</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>—</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>3 days ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-device-mobile-check" style={{ color: 'var(--violet)', fontSize: '14px' }}></i>MFA event
                                                </span>
                                            </td>
                                            <td>Meera Iyer</td>
                                            <td style={{ color: 'var(--ink-2)' }}>MFA enrolment skipped (pending)</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.18</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>HP ProBook 450</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>4 days ago</td>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ink-1)' }}>
                                                    <i className="ti ti-key" style={{ color: 'var(--warn)', fontSize: '14px' }}></i>Password reset
                                                </span>
                                            </td>
                                            <td>Arjun Pillai</td>
                                            <td style={{ color: 'var(--ink-2)' }}>Password reset completed</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>14.139.x.x</td>
                                            <td style={{ fontSize: '10.5px', color: 'var(--ink-3)' }}>MacBook Air M2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== TAB PANEL 3: DEVICE SECURITY MANAGEMENT ==================== */}
            {activeTab === 3 && (
                <div className="tab-panel" data-page="adminusers" data-tab="3">
                    {/* Banner */}
                    <div className="au-ds-banner">
                        <i className="ti ti-shield-lock"></i>
                        <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink-0)' }}>
                                Device security is managed centrally by administrators
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>
                                End users cannot change these settings. Policies apply on first login after Username, Password and MFA verification.
                            </div>
                        </div>
                    </div>

                    {/* KPI Strip */}
                    <div className="kpi-strip mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div className="kpi glow-ok">
                            <div className="kpi-l">Trusted Devices</div>
                            <div className="kpi-v ok" id="au-ds-trusted">9</div>
                        </div>
                        <div className="kpi glow-info">
                            <div className="kpi-l">Device-Locked Accounts</div>
                            <div className="kpi-v" id="au-ds-locked">6</div>
                        </div>
                        <div className="kpi glow-warn">
                            <div className="kpi-l">Pending Re-registration</div>
                            <div className="kpi-v warn" id="au-ds-pending">1</div>
                        </div>
                        <div className="kpi glow-bad">
                            <div className="kpi-l">Blocked Devices</div>
                            <div className="kpi-v bad" id="au-ds-blocked">1</div>
                        </div>
                    </div>

                    {/* Policy Settings & Flow Grid */}
                    <div className="au-ds-grid">
                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">Device Security Policy</div>
                                    <div className="cs">Backend-managed · applies platform-wide</div>
                                </div>
                            </div>
                            <div className="cb" id="au-policy">
                                <div className="au-pol-row">
                                    <div>
                                        <div className="l">Device Locking</div>
                                        <div className="d">Bind accounts to registered trusted devices. A user can only sign in from a registered device until an admin changes it.</div>
                                    </div>
                                    <div className="au-sw on" onClick={() => handleTogglePolicy('deviceLock')}></div>
                                </div>
                                <div className="au-pol-row">
                                    <div>
                                        <div className="l">Auto-register on first login</div>
                                        <div className="d">Register the device as trusted after the first successful Username + Password + MFA verification.</div>
                                    </div>
                                    <div className="au-sw on" onClick={() => handleTogglePolicy('autoRegister')}></div>
                                </div>
                                <div className="au-pol-row">
                                    <div>
                                        <div className="l">Require MFA</div>
                                        <div className="d">Enforce a second factor (TOTP / OTP) at every sign-in before a device can be trusted.</div>
                                    </div>
                                    <div className="au-sw on" onClick={() => handleTogglePolicy('mfaRequired')}></div>
                                </div>
                                <div className="au-pol-row">
                                    <div>
                                        <div className="l">Admin approval for re-registration</div>
                                        <div className="d">New or changed devices stay pending until an administrator approves them.</div>
                                    </div>
                                    <div className="au-sw on" onClick={() => handleTogglePolicy('reapproval')}></div>
                                </div>
                                <div className="au-pol-row">
                                    <div>
                                        <div className="l">Geo / IP fencing</div>
                                        <div className="d">Restrict sign-ins to approved IP ranges and regions.</div>
                                    </div>
                                    <div className="au-sw" onClick={() => handleTogglePolicy('geoFence')}></div>
                                </div>
                                <div className="au-pol-row">
                                    <div>
                                        <div className="l">Max trusted devices per user</div>
                                        <div className="d">Limit how many devices a single account can register.</div>
                                    </div>
                                    <select className="au-sel" defaultValue="2" onChange={(e) => console.log(`Max devices set to: ${e.target.value}`)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="ch">
                                <div>
                                    <div className="ct">First-Login Trust Flow</div>
                                    <div className="cs">How a device becomes trusted</div>
                                </div>
                            </div>
                            <div className="cb" id="au-flow">
                                <div className="au-step">
                                    <span className="n">1</span>
                                    <div>
                                        <div className="st">Username &amp; Password</div>
                                        <div className="sd">User signs in with their work credentials.</div>
                                    </div>
                                </div>
                                <div className="au-step">
                                    <span className="n">2</span>
                                    <div>
                                        <div className="st">MFA verification</div>
                                        <div className="sd">One-time code (authenticator app / OTP) is verified.</div>
                                    </div>
                                </div>
                                <div className="au-step">
                                    <span className="n">3</span>
                                    <div>
                                        <div className="st">Device registered as trusted</div>
                                        <div className="sd">On first successful login the device fingerprint is captured and stored against the account.</div>
                                    </div>
                                </div>
                                <div className="au-step">
                                    <span className="n">4</span>
                                    <div>
                                        <div className="st">Account locked to device</div>
                                        <div className="sd">If Device Locking is on, sign-in is restricted to registered devices until an admin removes or re-registers them.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trusted Devices Registry Table Card */}
                    <div className="card">
                        <div className="ch">
                            <div>
                                <div className="ct">Trusted Device Registry</div>
                                <div className="cs">View, remove or re-register devices bound to user accounts</div>
                            </div>
                        </div>
                        <div className="cb" style={{ padding: 0, overflowX: 'auto' }}>
                            <div id="au-dev-table">
                                <table className="adm-tbl">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Device</th>
                                            <th>OS / Browser</th>
                                            <th>IP</th>
                                            <th>Registered</th>
                                            <th>Last Seen</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#2A6FDB' }}>SR</span>
                                                <b>Sandeep Rao</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                MacBook Pro 16" <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>macOS 14 · Chrome</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.12</td>
                                            <td style={{ fontSize: '10.5px' }}>12 Jan 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>just now</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1001', 'D-9001')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#2A6FDB' }}>SR</span>
                                                <b>Sandeep Rao</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-mobile"></i>
                                                </span>
                                                iPhone 15 Pro
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>iOS 17 · Safari</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.40</td>
                                            <td style={{ fontSize: '10.5px' }}>18 Jan 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>2 hr ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1001', 'D-9002')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#1F8A5B' }}>RM</span>
                                                <b>Rajan Mehta</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                Dell Latitude 7440 <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>Windows 11 · Edge</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.31</td>
                                            <td style={{ fontSize: '10.5px' }}>04 Feb 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>2 min ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1002', 'D-9010')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#B8842A' }}>AD</span>
                                                <b>Anil Desai</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                ThinkPad X1 Carbon <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>Windows 11 · Chrome</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.22</td>
                                            <td style={{ fontSize: '10.5px' }}>19 Feb 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>14 min ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1003', 'D-9020')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#B8842A' }}>AD</span>
                                                <b>Anil Desai</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-mobile"></i>
                                                </span>
                                                Samsung Galaxy S24
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>Android 14 · Chrome</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>49.36.x.x</td>
                                            <td style={{ fontSize: '10.5px' }}>—</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>1 hr ago</td>
                                            <td><span className="badge badge-amber">Pending</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib good" title="Approve / re-register" onClick={() => handleReRegisterDevice('U-1003', 'D-9021')}>
                                                        <i className="ti ti-shield-check"></i>
                                                    </span>
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1003', 'D-9021')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#9B59B6' }}>PN</span>
                                                <b>Pooja Nair</b>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-mobile"></i>
                                                </span>
                                                iPad Air <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>iPadOS 17 · Safari</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.55</td>
                                            <td style={{ fontSize: '10.5px' }}>22 Feb 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>1 hr ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1004', 'D-9030')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#0B9EBB' }}>MI</span>
                                                <b>Meera Iyer</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                HP ProBook 450 <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>Windows 11 · Chrome</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>103.21.58.18</td>
                                            <td style={{ fontSize: '10.5px' }}>08 Mar 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>3 hr ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1005', 'D-9040')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#D1603A' }}>VS</span>
                                                <b>Vikram Shah</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                Surface Laptop 5 <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>Windows 11 · Edge</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>59.144.x.x</td>
                                            <td style={{ fontSize: '10.5px' }}>15 Mar 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>Yesterday</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1006', 'D-9050')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#D1603A' }}>VS</span>
                                                <b>Vikram Shah</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-desktop"></i>
                                                </span>
                                                Unknown device
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>Windows 10 · Firefox</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>45.13.x.x</td>
                                            <td style={{ fontSize: '10.5px' }}>—</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>2 days ago</td>
                                            <td><span className="badge badge-red">Blocked</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib good" title="Approve / re-register" onClick={() => handleReRegisterDevice('U-1006', 'D-9051')}>
                                                        <i className="ti ti-shield-check"></i>
                                                    </span>
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1006', 'D-9051')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#2FA39A' }}>AP</span>
                                                <b>Arjun Pillai</b> <i className="ti ti-lock" style={{ fontSize: '10px', color: 'var(--info)' }} title="Device-locked"></i>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                MacBook Air M2 <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>macOS 14 · Safari</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>14.139.x.x</td>
                                            <td style={{ fontSize: '10.5px' }}>02 Jan 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>12 days ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1008', 'D-9080')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span className="adm-avatar" style={{ background: '#2A6FDB' }}>KM</span>
                                                <b>Karthik Menon</b>
                                            </td>
                                            <td>
                                                <span className="au-dev-ico" style={{ width: '24px', height: '24px', fontSize: '13px' }}>
                                                    <i className="ti ti-device-laptop"></i>
                                                </span>
                                                MacBook Pro 14" <span style={{ fontSize: '9px', color: 'var(--info)' }}>· current</span>
                                            </td>
                                            <td style={{ fontSize: '10.5px' }}>macOS 14 · Chrome</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>roaming</td>
                                            <td style={{ fontSize: '10.5px' }}>10 Apr 2024</td>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}>30 min ago</td>
                                            <td><span className="badge badge-green">Trusted</span></td>
                                            <td>
                                                <div className="au-act-btns">
                                                    <span className="au-ib danger" title="Remove device" onClick={() => handleRemoveDevice('U-1009', 'D-9090')}>
                                                        <i className="ti ti-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default AdminUsersRoles;