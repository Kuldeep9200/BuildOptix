import React, { useState } from "react";

// --- MAIN COMPONENT ---
export default function EquipmentView() {
  const [activeTopTab, setActiveTopTab] = useState("summary"); // 'summary' | 'detail'
  const [activeScreen, setActiveScreen] = useState("ahu");
  const [railSearch, setRailSearch] = useState("");

  return (
    <div
      id="view-equipment"
      style={{
        display: "flex",
        flex: "1 1 0%",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      {/* Top Level Tab Strip */}
      <div className="eqtabs" id="eqTopTabs">
        <button
          className={`eqtab ${activeTopTab === "summary" ? "sel" : ""}`}
          onClick={() => setActiveTopTab("summary")}
        >
          <i className="ti ti-layout-grid" /> Equipment Summary
        </button>
        <button
          className={`eqtab ${activeTopTab === "detail" ? "sel" : ""}`}
          onClick={() => setActiveTopTab("detail")}
        >
          <i className="ti ti-list-details" /> Equipment Detail
        </button>
      </div>

      {/* View 1: Equipment Summary */}
      {activeTopTab === "summary" && (
        <EquipmentSummary
          onOpenCategory={(category) => {
            setActiveScreen(category);
            setActiveTopTab("detail");
          }}
        />
      )}

      {/* View 2: Equipment Rail + Detail View */}
      {activeTopTab === "detail" && (
        <>
          {/* Header */}
          <div className="page-header" id="eqDetailHeader">
            <div className="ph-left">
              <div className="live-dot" />
              <div>
                <div className="ph-title">Equipment Detail</div>
                <div style={{ fontSize: "10px", color: "var(--ink-3)" }}>
                  Live IoT · 16 systems · Vikhroli Campus
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                className="btn"
                style={{ padding: "5px 12px", fontSize: "11px" }}
                onClick={() => setActiveTopTab("summary")}
              >
                <i className="ti ti-arrow-left" /> Equipment Summary
              </button>
              <button
                className="btn"
                style={{ padding: "5px 12px", fontSize: "11px" }}
              >
                <i className="ti ti-layout-dashboard" /> Dashboard
              </button>
            </div>
          </div>

          {/* Rail Navigation + Master Detail */}
          <div className="equipment-view" id="eqRailView">
            <EquipmentRail
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              railSearch={railSearch}
              setRailSearch={setRailSearch}
            />
            <div className="eq-detail" id="eq-detail">
              <AhuMasterDetail />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: SUMMARY VIEW ---
function EquipmentSummary({ onOpenCategory }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="eqs-wrap" id="eqSummaryView" style={{ display: "flex" }}>
      <div className="eqs-head">
        <div className="eqs-bc" id="eqBreadcrumb">
          <span className="cur">
            <i className="ti ti-cpu" /> Equipment Summary
          </span>
        </div>
        <div className="eqs-grow" />
        <div id="eqViewToggle" />
      </div>

      <div className="eqs-body" id="eqSumContent">
        {/* Rollup Strip */}
        <div className="eqs-rollup">
          <div className="rk">
            <i className="ti ti-cpu" style={{ color: "var(--info)" }} />
            <div>
              <div className="v">760</div>
              <div className="l">Total Equipment</div>
            </div>
          </div>
          <div className="rsep" />
          <div className="rk">
            <i className="ti ti-player-play-filled" style={{ color: "var(--ok)" }} />
            <div>
              <div className="v" style={{ color: "var(--ok)" }}>507</div>
              <div className="l">Running</div>
            </div>
          </div>
          <div className="rsep" />
          <div className="rk">
            <i className="ti ti-player-stop-filled" style={{ color: "var(--bad)" }} />
            <div>
              <div className="v" style={{ color: "var(--bad)" }}>253</div>
              <div className="l">Stopped</div>
            </div>
          </div>
          <div className="rsep" />
          <div className="rk">
            <i className="ti ti-alert-triangle" style={{ color: "var(--warn)" }} />
            <div>
              <div className="v" style={{ color: "var(--warn)" }}>16</div>
              <div className="l">Active Faults</div>
            </div>
          </div>
          <div className="rsep" />
          <div className="rk">
            <i className="ti ti-category" style={{ color: "var(--brand-bright)" }} />
            <div>
              <div className="v">9</div>
              <div className="l">Categories</div>
            </div>
          </div>
          <div className="eqs-search" style={{ marginLeft: "auto" }}>
            <i className="ti ti-search" />
            <input
              id="eqCardSearch"
              placeholder="Search equipment type…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Section 1: HVAC Air Side */}
        <div className="eqs-sech">HVAC · Air Side<span className="ln" /></div>
        <div className="eqs-grid" style={{ marginBottom: "22px" }}>
          <CategoryCard
            title="AHU-V1"
            icon="ti-air-conditioning"
            sub="24 units · 83% running"
            total={24}
            on={20}
            off={4}
            faults={2}
            pct="83%"
            onClick={() => onOpenCategory("ahuv1")}
          />
          <CategoryCard
            title="AHU-V2"
            icon="ti-wind"
            sub="18 units · 78% running"
            total={18}
            on={14}
            off={4}
            faults={2}
            pct="78%"
            onClick={() => onOpenCategory("ahuv2")}
          />
          <CategoryCard
            title="FCU"
            icon="ti-temperature"
            sub="120 units · 80% running"
            total={120}
            on={96}
            off={24}
            faults={2}
            pct="80%"
            onClick={() => onOpenCategory("fcu")}
          />
          <CategoryCard
            title="Split AC"
            icon="ti-snowflake"
            sub="500 units · 60% running"
            total={500}
            on={300}
            off={200}
            faults={2}
            pct="60%"
            onClick={() => onOpenCategory("splitac")}
          />
          <CategoryCard
            title="Exhaust Fan"
            icon="ti-rotate-clockwise-2"
            sub="40 units · 78% running"
            total={40}
            on={31}
            off={9}
            faults={2}
            pct="78%"
            onClick={() => onOpenCategory("ef")}
          />
        </div>

        {/* Section 2: Cooling Plant */}
        <div className="eqs-sech">HVAC · Cooling Plant<span className="ln" /></div>
        <div className="eqs-grid" style={{ marginBottom: "22px" }}>
          <CategoryCard
            title="Chiller"
            icon="ti-building-factory"
            sub="6 units · 67% running"
            total={6}
            on={4}
            off={2}
            faults={1}
            pct="67%"
            onClick={() => onOpenCategory("chiller")}
          />
          <CategoryCard
            title="Pump"
            icon="ti-droplet"
            sub="32 units · 75% running"
            total={32}
            on={24}
            off={8}
            faults={2}
            pct="75%"
            onClick={() => onOpenCategory("pump")}
          />
        </div>
      </div>
    </div>
  );
}

// Category Card Helper
function CategoryCard({ title, icon, sub, total, on, off, faults, pct, onClick }) {
  return (
    <div className="eqs-card" onClick={onClick}>
      <div className="eqs-ctop">
        <span className="eqs-ic"><i className={`ti ${icon}`} /></span>
        <div>
          <div className="eqs-ctt">
            {title}
            {faults > 0 && (
              <span className="eqs-fault">
                <i className="ti ti-alert-triangle" style={{ fontSize: "11px" }} />
                {faults}
              </span>
            )}
          </div>
          <div className="eqs-csub">{sub}</div>
        </div>
      </div>
      <div className="eqs-stat3">
        <div className="eqs-stat"><div className="v">{total}</div><div className="l">Total</div></div>
        <div className="eqs-stat"><div className="v ok">{on}</div><div className="l">ON</div></div>
        <div className="eqs-stat"><div className="v bad">{off}</div><div className="l">OFF</div></div>
      </div>
      <div className="eqs-bar"><i style={{ width: pct }} /></div>
      <div className="eqs-cfoot">
        <span><i className="ti ti-circle-check" style={{ color: "var(--ok)" }} /> {off} off / attention</span>
        <span className="go">Open <i className="ti ti-arrow-right" /></span>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: LEFT SIDEBAR RAIL ---
function EquipmentRail({ activeScreen, setActiveScreen, railSearch, setRailSearch }) {
  const railItems = [
    { group: "HVAC · Cooling" },
    { id: "chillermgmt", name: "Chiller Management", icon: "ti-snowflake", tag: "WCCH", tagType: "cool" },
    { id: "chiller", name: "CH-01 Centrifugal Chiller", icon: "ti-snowflake", tag: "Running", tagType: "ok" },
    { id: "ct", name: "CT-01 Cooling Tower", icon: "ti-building-factory-2", tag: "Observe", tagType: "warn" },
    { id: "ahu", name: "AHU / TFA", icon: "ti-wind", tag: "Running", tagType: "" },
    { id: "ahuv1", name: "AHU V1 — Detail List", icon: "ti-table", tag: "New", tagType: "cool" },
    { id: "splitacv1", name: "Split AC — Detail List", icon: "ti-air-conditioning", tag: "New", tagType: "cool" },
    { id: "pump", name: "PMP-01 Pump", icon: "ti-droplet", tag: "Running", tagType: "" },
    { group: "Power · Energy" },
    { id: "ups", name: "UPS-01 Server Room", icon: "ti-battery-charging", tag: "Online", tagType: "ok" },
  ];

  return (
    <div className="equipment-rail">
      <div className="rail-search">
        <div className="rail-search-inner">
          <i className="ti ti-search" />
          <input
            placeholder="Search equipment..."
            value={railSearch}
            onChange={(e) => setRailSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="rail-scroll">
        {railItems.map((item, idx) => {
          if (item.group) {
            return (
              <div key={idx} className="rail-group-l" style={{ marginTop: idx > 0 ? "8px" : "0" }}>
                {item.group}
              </div>
            );
          }
          return (
            <div
              key={item.id}
              className={`rail-item ${activeScreen === item.id ? "active" : ""}`}
              onClick={() => setActiveScreen(item.id)}
            >
              <i className={`ti ${item.icon}`} />
              <span className="ri-name">{item.name}</span>
              <span className={`ri-state ${item.tagType}`}>{item.tag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: AHU MASTER DETAIL ---
function AhuMasterDetail() {
  const [selectedUnit, setSelectedUnit] = useState("TF-A4");
  const [activeTab, setActiveTab] = useState("overview");
  const [filterSearch, setFilterSearch] = useState("");
  const [filterRun, setFilterRun] = useState("all");

  const ahuUnits = [
    { id: "TF-A4", name: "TF-A4 - POST OP", sp: "30°C", run: "On", temp: "25.83°C" },
    { id: "TF-A3", name: "TF-A3 - GYNIC Pre & Post OP", sp: "30°C", run: "Off", temp: "28.51°C" },
    { id: "TF-A2", name: "TF-A2 - STERILE Pharmacy", sp: "18.5°C", run: "Off", temp: "29.63°C" },
    { id: "GF-A8", name: "GF-A8 - ICU", sp: "18°C", run: "On", temp: "22.1°C" },
  ];

  const filteredUnits = ahuUnits.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(filterSearch.toLowerCase());
    const matchesRun = filterRun === "all" || u.run === filterRun;
    return matchesSearch && matchesRun;
  });

  return (
    <div className="ahu-master-wrap">
      {/* Left List */}
      <div className="ahu-left-panel">
        <div className="ahu-left-header">
          <span className="ahu-stat-pill total"><i className="ti ti-list" />13 Units</span>
          <span className="ahu-stat-pill on"><i className="ti ti-player-play" />6 On</span>
          <span className="ahu-stat-pill off"><i className="ti ti-player-stop" />7 Off</span>
        </div>
        <div className="ahu-left-search">
          <input
            type="text"
            placeholder="Search AHUs…"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
          <select
            className="ahu-filter-sel"
            style={{ flexShrink: 0 }}
            value={filterRun}
            onChange={(e) => setFilterRun(e.target.value)}
          >
            <option value="all">All</option>
            <option value="On">Running</option>
            <option value="Off">Stopped</option>
          </select>
        </div>
        <div className="ahu-unit-list">
          {filteredUnits.map((u) => (
            <div
              key={u.id}
              className={`ahu-unit-row ${selectedUnit === u.id ? "active" : ""}`}
              onClick={() => setSelectedUnit(u.id)}
            >
              <div className={`ahu-unit-dot ${u.run.toLowerCase()}`} />
              <div className="ahu-unit-info">
                <div className="ahu-unit-name">{u.name}</div>
                <div className="ahu-unit-sub">{u.id} · SP {u.sp} · Auto</div>
              </div>
              <div className="ahu-unit-badges">
                <span className={`ahu-unit-run ${u.run.toLowerCase()}`}>{u.run}</span>
                <span className="ahu-unit-temp">RA {u.temp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail Panel */}
      <div className="ahu-right-panel" id="ahu-right-panel">
        <div className="ahu-detail-header">
          <div>
            <div className="ahu-detail-title">
              <span className="dot ok" style={{ display: "inline-block", marginRight: "7px", width: "8px", height: "8px" }} />
              TF-A4 - POST OP
            </div>
            <div className="ahu-detail-sub">TF-A4 · A/M: Auto · Trip: Normal · 24-05-26 01:45</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700", color: "var(--ok)" }}>On</span>
            <button className="btn" style={{ padding: "5px 11px", fontSize: "11px" }}>
              <i className="ti ti-brain" style={{ color: "var(--ai)" }} /> AI
            </button>
          </div>
        </div>

        {/* AHU Detail Tabs */}
        <div className="ahu-tab-bar">
          <div className={`ahu-tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
            <i className="ti ti-chart-bar" style={{ fontSize: "13px" }} /> Overview
          </div>
          <div className={`ahu-tab ${activeTab === "controls" ? "active" : ""}`} onClick={() => setActiveTab("controls")}>
            <i className="ti ti-settings-2" style={{ fontSize: "13px" }} /> Controls
          </div>
          <div className={`ahu-tab ${activeTab === "schedule" ? "active" : ""}`} onClick={() => setActiveTab("schedule")}>
            <i className="ti ti-calendar" style={{ fontSize: "13px" }} /> Schedule
          </div>
        </div>

        {/* Tab Panel Body */}
        {activeTab === "overview" && (
          <div className="ahu-detail-scroll ahu-tab-panel active">
            {/* KPI Strip */}
            <div className="ahu-kpi-strip">
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">RA Temp</div><div className="ahu-kpi-val" style={{ color: "var(--ink-0)" }}>25.83°C</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">SA Temp</div><div className="ahu-kpi-val" style={{ color: "var(--cool)" }}>20.47°C</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">Set Point</div><div className="ahu-kpi-val" style={{ color: "var(--ink-0)" }}>30°C</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">RA Humidity</div><div className="ahu-kpi-val" style={{ color: "var(--ink-0)" }}>57.94%</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">SA Pressure</div><div className="ahu-kpi-val" style={{ color: "var(--ok)" }}>52 Pa</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">CHW Fdbk</div><div className="ahu-kpi-val" style={{ color: "var(--info)" }}>0.23%</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">VFD Speed</div><div className="ahu-kpi-val" style={{ color: "var(--violet)" }}>100%</div></div>
              <div className="ahu-kpi-card"><div className="ahu-kpi-lbl">Bag Filter</div><div className="ahu-kpi-val" style={{ color: "var(--ok)" }}>52 Pa</div></div>
            </div>

            {/* Parameters & Photo Section */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "start" }}>
              <div>
                <div className="ahu-img-container">
                  <div className="ahu-upload-zone">
                    <input type="file" accept="image/*" />
                    <div className="ahu-upload-icon"><i className="ti ti-photo-up" /></div>
                    <div className="ahu-upload-title">Upload AHU Photo</div>
                    <div className="ahu-upload-hint">Drag &amp; drop or click to browse<br />PNG · JPG · GIF accepted</div>
                    <div className="ahu-upload-badge">Running · upload photo</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="ahu-param-card">
                  <div className="ahu-param-header">Air Parameters</div>
                  <div className="ahu-param-row"><span className="ahu-param-key">Return Air Temp</span><span className="ahu-param-val" style={{ color: "var(--hot)" }}>25.83 °C</span></div>
                  <div className="ahu-param-row"><span className="ahu-param-key">Supply Air Temp</span><span className="ahu-param-val" style={{ color: "var(--cool)" }}>20.47 °C</span></div>
                  <div className="ahu-param-row"><span className="ahu-param-key">SA Pressure</span><span className="ahu-param-val" style={{ color: "var(--ok)" }}>52 Pa</span></div>
                </div>
                <div className="ahu-param-card">
                  <div className="ahu-param-header ok">Controls &amp; Actuators</div>
                  <div className="ahu-param-row"><span className="ahu-param-key">CHW Feedback</span><span className="ahu-param-val" style={{ color: "var(--info)" }}>0.23 %</span></div>
                  <div className="ahu-param-row"><span className="ahu-param-key">VFD Speed</span><span className="ahu-param-val" style={{ color: "var(--violet)" }}>100 %</span></div>
                </div>
              </div>
            </div>

            {/* Trend Graphs */}
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--ink-1)" }}>Live Trends — Last 24 h</div>
              </div>
              <div className="ahu-trends-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                <TrendCard label="RA Temp (°C)" color="#FF8A4C" gradId="agtRATempC" pathD="M0,30 L20,28 L40,32 L60,27 L80,30 L100,28 L120,31 L140,29 L160,30 L180,28 L200,30" />
                <TrendCard label="SA Temp (°C)" color="#34D2E6" gradId="agtSATempC" pathD="M0,38 L20,36 L40,38 L60,35 L80,37 L100,35 L120,37 L140,35 L160,37 L180,35 L200,36" />
                <TrendCard label="CHW Fdbk (%)" color="#4EA1FF" gradId="agtCHWFdbk" pathD="M0,45 L20,40 L40,35 L60,30 L80,25 L100,22 L120,24 L140,28 L160,32 L180,30 L200,28" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper SVG Trend Card
function TrendCard({ label, color, gradId, pathD }) {
  return (
    <div className="ahu-trend-card">
      <div className="ahu-trend-label">{label}</div>
      <svg width="100%" viewBox="0 0 200 50" preserveAspectRatio="none" style={{ height: "44px" }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pathD} L200,50 L0,50 Z`} fill={`url(#${gradId})`} stroke="none" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="200" cy="30" r="2.5" fill={color} />
      </svg>
    </div>
  );
}