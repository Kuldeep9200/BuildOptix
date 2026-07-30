import React, { useState } from 'react';
import { showToast } from '../../utils/toast';

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


  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // States for Range Picker
  const [selectedRange, setSelectedRange] = useState("today"); // 'today', '7d', '30d', 'custom'
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Handler for Range Button Clicks
  const handleRangeChange = (range) => {
    setSelectedRange(range);
    if (range === "custom") {
      setShowCustomPicker((prev) => !prev);
    } else {
      setShowCustomPicker(false);
      // Yahan aap non-custom range change handle kar sakte ho
      showToast("Selected Range:", range);
    }
  };

  const handleApplyCustomRange = () => {
    if (!fromDate || !toDate) {
      alert("Kripya From aur To dates select karein.");
      return;
    }
    showToast("Custom Range Applied:", { fromDate, toDate });
    setShowCustomPicker(false);
  };



  return (
    <div id="pg-adminintegrations">


   <div className="page-header" id="dash-page-header" style={{ marginBottom: "10px" }}>
      {/* Left Section */}
      <div className="ph-left">
        <div className="live-dot"></div>
        <div>
          <div className="ph-title" id="dash-page-title">
            Integrations
          </div>
          <div
            className="ph-sub"
            id="dash-page-sub"
            style={{ fontSize: "10px", color: "var(--ink-3)" }}
          >
            Administration · Connected systems & third-party services
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ph-tabs" id="dash-tab-bar">
        {["Connected Services"].map((tabLabel, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`ph-tab ${activeTab === idx ? "active" : ""}`}
          >
            {tabLabel}
          </div>
        ))}
      </div>

      {/* Range Picker */}
      <div className="range-picker" id="boRangePicker" style={{ position: "relative" }}>
        <span className="rp-label">Range</span>

        <div className="rp-seg">
          <button
            data-range="today"
            className={selectedRange === "today" ? "active" : ""}
            onClick={() => handleRangeChange("today")}
          >
            Today
          </button>

          <button
            data-range="7d"
            className={selectedRange === "7d" ? "active" : ""}
            onClick={() => handleRangeChange("7d")}
          >
            7D
          </button>

          <button
            data-range="30d"
            className={selectedRange === "30d" ? "active" : ""}
            onClick={() => handleRangeChange("30d")}
          >
            30D
          </button>

          <button
            data-range="custom"
            className={selectedRange === "custom" ? "active" : ""}
            onClick={() => handleRangeChange("custom")}
          >
            <i className="ti ti-calendar" style={{ fontSize: "12px", marginRight: "4px" }}></i>
            Custom
          </button>
        </div>

        {/* Custom Date Range Popover */}
        {showCustomPicker && (
          <div
            className="rp-pop"
            id="rpPop"
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "6px",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px",
              background: "#0d1526",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            <label style={{ fontSize: "11px", color: "var(--ink-3)" }}>From</label>
            <input
              type="date"
              id="rpFrom"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />

            <label style={{ fontSize: "11px", color: "var(--ink-3)" }}>To</label>
            <input
              type="date"
              id="rpTo"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />

            <button
              className="rp-apply"
              id="rpApply"
              onClick={handleApplyCustomRange}
              style={{
                marginTop: "4px",
                padding: "6px",
                background: "var(--info, #3b82f6)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Apply range
            </button>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="dash-dl" id="dashDl" style={{ position: "relative" }}>
        <button
          className="dash-dl-btn"
          id="dashDlBtn"
          onClick={() => setShowDownloadMenu(!showDownloadMenu)}
        >
          <i className="ti ti-download"></i>
          Download Reports
          <i
            className="ti ti-chevron-down"
            style={{ fontSize: "12px", opacity: 0.8, marginLeft: "4px" }}
          ></i>
        </button>

        {showDownloadMenu && (
          <div className="dash-dl-menu" style={{ display: "block" }}>
            <div className="dash-dl-h">Quick report downloads</div>

            {/* Energy */}
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
                  if (navTo) navTo("reports");
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