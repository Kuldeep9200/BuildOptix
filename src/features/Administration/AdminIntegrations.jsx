import React, { useState } from 'react';

const KPI_DATA = [
  { label: 'Connected', value: '6', color: 'var(--ok)' },
  { label: 'Needs Attention', value: '1', color: 'var(--warn)' },
  { label: 'Available', value: '2', color: 'var(--ink-1)' },
  { label: 'Data Synced (24h)', value: '1.2', unit: 'M', sub: 'records', color: 'var(--ok)' }
];

const INTEGRATIONS_DATA = [
  {
    id: 'bms',
    name: 'BMS Gateway',
    category: 'Building Mgmt · BACnet/Modbus',
    status: 'Connected',
    statusType: 'ok',
    statusIcon: 'ti-circle-check',
    lastSync: 'Last sync: 12s ago',
    icon: 'ti-building-cog',
    brandColor: '#2A6FDB'
  },
  {
    id: 'weather',
    name: 'OpenWeather',
    category: 'Weather data',
    status: 'Connected',
    statusType: 'ok',
    statusIcon: 'ti-circle-check',
    lastSync: 'Last sync: 5 min ago',
    icon: 'ti-cloud',
    brandColor: '#0B9EBB'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'Payments',
    status: 'Connected',
    statusType: 'ok',
    statusIcon: 'ti-circle-check',
    lastSync: 'Last sync: 1 hr ago',
    icon: 'ti-credit-card',
    brandColor: '#1F8A5B'
  },
  {
    id: 'twilio',
    name: 'Twilio SMS',
    category: 'Notifications',
    status: 'Connected',
    statusType: 'ok',
    statusIcon: 'ti-circle-check',
    lastSync: 'Last sync: 8 min ago',
    icon: 'ti-message',
    brandColor: '#D1603A'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Notifications',
    status: 'Attention',
    statusType: 'warn',
    statusIcon: 'ti-alert-triangle',
    lastSync: 'Last sync: rate-limited',
    icon: 'ti-brand-whatsapp',
    brandColor: '#1F8A5B'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'Email',
    status: 'Connected',
    statusType: 'ok',
    statusIcon: 'ti-circle-check',
    lastSync: 'Last sync: 3 min ago',
    icon: 'ti-mail',
    brandColor: '#2A6FDB'
  },
  {
    id: 'tally_sap',
    name: 'Tally / SAP ERP',
    category: 'Accounting · ERP',
    status: 'Available',
    statusType: 'available',
    statusIcon: 'ti-plus',
    lastSync: 'Last sync: not connected',
    icon: 'ti-file-invoice',
    brandColor: '#9B59B6'
  },
  {
    id: 'azure_ad',
    name: 'Azure AD (SSO)',
    category: 'Identity · SAML/OIDC',
    status: 'Available',
    statusType: 'available',
    statusIcon: 'ti-plus',
    lastSync: 'Last sync: not connected',
    icon: 'ti-key',
    brandColor: '#0B9EBB'
  }
];

export const AdminIntegrations = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 = main tab

  const handleAction = (message) => {
    // Apne notification/toast logic se Replace karein
    console.log('Action triggered:', message);
  };

  return (
    <div id="pg-adminintegrations">
      {activeTab === 0 && (
        <div data-page="adminintegrations" data-tab="0">
          {/* KPI Summary Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '14px' }}>
            {KPI_DATA.map((kpi, index) => (
              <div key={index} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line-1, #ccc)', background: 'var(--surface-1, #fff)' }}>
                <div style={{ fontSize: '11px', color: 'var(--ink-2, #666)', fontWeight: 600 }}>{kpi.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: kpi.color, marginTop: '4px' }}>
                  {kpi.value}
                  {kpi.unit && <span style={{ fontSize: '12px', marginLeft: '2px' }}>{kpi.unit}</span>}
                </div>
                {kpi.sub && <div style={{ fontSize: '10px', color: 'var(--ink-3, #999)' }}>{kpi.sub}</div>}
              </div>
            ))}
          </div>

          {/* Integrations Grid */}
          <div id="adm-int-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {INTEGRATIONS_DATA.map((item) => (
              <IntegrationCard key={item.id} item={item} onAction={handleAction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Card Component
const IntegrationCard = ({ item, onAction }) => {
  const getStatusStyles = () => {
    if (item.statusType === 'ok') {
      return { background: 'var(--ok-soft, rgba(31,138,91,0.15))', color: 'var(--ok, #1F8A5B)' };
    }
    if (item.statusType === 'warn') {
      return { background: 'var(--warn-soft, rgba(209,96,58,0.15))', color: 'var(--warn, #D1603A)' };
    }
    return { background: 'var(--surface-3, #eee)', color: 'var(--ink-3, #777)' };
  };

  return (
    <div style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--line-1, #e0e0e0)', background: 'var(--surface-1, #fff)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: `color-mix(in srgb, ${item.brandColor} 16%, transparent)`,
              color: item.brandColor,
              fontSize: '18px'
            }}
          >
            <i className={`ti ${item.icon}`}></i>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-0, #111)' }}>{item.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--ink-2, #666)' }}>{item.category}</div>
          </div>
        </div>

        <span 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '4px', 
            padding: '3px 8px', 
            borderRadius: '99px', 
            fontSize: '10px', 
            fontWeight: 600, 
            ...getStatusStyles() 
          }}
        >
          <i className={`ti ${item.statusIcon}`}></i>
          {item.status}
        </span>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--ink-3, #888)', marginBottom: '12px' }}>
        {item.lastSync}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {item.statusType !== 'available' ? (
          <>
            <button 
              style={{ flex: 1, padding: '6px 12px', fontSize: '11px', cursor: 'pointer' }}
              onClick={() => onAction(`${item.name} settings`)}
            >
              <i className="ti ti-settings" style={{ marginRight: '4px' }}></i>
              Configure
            </button>
            <button 
              style={{ flex: 1, padding: '6px 12px', fontSize: '11px', cursor: 'pointer' }}
              onClick={() => onAction(`Synced ${item.name}`)}
            >
              <i className="ti ti-refresh" style={{ marginRight: '4px' }}></i>
              Sync
            </button>
          </>
        ) : (
          <button 
            style={{ width: '100%', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => onAction(`Connect ${item.name} — opens setup`)}
          >
            <i className="ti ti-plug" style={{ marginRight: '4px' }}></i>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};