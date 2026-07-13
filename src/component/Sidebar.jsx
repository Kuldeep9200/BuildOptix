import React from 'react';
import '../App.css'

export default function Sidebar({ isCollapsed, setIsCollapsed, activePage, onNavigate, openGroups, toggleGroup }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --bg-sidebar: #060b13;
          --bg-hover: #101926;
          --tx-main: #ffffff;
          --tx-muted: #94a3b8;
          --brand: #38bdf8;
          --brand-bright: #ffffff;
          --brand-soft: rgba(56, 189, 248, 0.15);
          --bad: #ef4444;
          --warn: #f59e0b;
        }

        .sidebar {
          width: 260px;
          height: 91vh;
          background-color: var(--bg-sidebar);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #111d32;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          user-select: none;
          flex-shrink: 0;
        }

        .sidebar.collapsed { width: 68px; }
        .sidebar-scroll { flex: 1; overflow-y: auto; padding: 12px 0; }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }

        .sb-group-h { display: flex; align-items: center; padding: 14px 20px; cursor: pointer; color: var(--tx-main); font-size: 14px; font-weight: 600; transition: background 0.2s; }
        .sb-group-h:hover { background-color: var(--bg-hover); }
        .sb-group-h > i:first-child { font-size: 18px; margin-right: 14px; color: #cbd5e1; min-width: 20px; display: inline-flex; justify-content: center; }

        .sb-group-h .chev { margin-left: auto; font-size: 11px; color: #64748b; transition: transform 0.2s ease; transform: rotate(-90deg); }
        .sb-group-h .chev.open { transform: rotate(0deg); }

        .sb-group-items { max-height: 0; overflow: hidden; transition: max-height 0.25s cubic-bezier(0, 0, 0.2, 1); background-color: #03070c; }
        .sb-group-items.show { max-height: 500px; }

        .nav-item { display: flex; align-items: center; padding: 10px 20px 10px 48px; font-size: 13.5px; color: var(--tx-muted); cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent; }
        .nav-item:hover { color: var(--tx-main); background-color: var(--bg-hover); }
        .nav-item.active { background: linear-gradient(90deg, var(--brand-soft), transparent 92%); color: var(--brand-bright); border-left: 2px solid var(--brand); }
        .nav-item.active i { color: var(--brand); }
        .nav-item i { margin-right: 12px; font-size: 16px; }

        .nav-badge { margin-left: auto; padding: 1px 6px; font-size: 11px; border-radius: 10px; font-weight: bold; }
        .nav-badge.bad { background-color: var(--bad); color: #fff; }
        .nav-badge.warn { background-color: var(--warn); color: #000; }

        .sidebar.collapsed .nav-tx,
        .sidebar.collapsed .chev,
        .sidebar.collapsed .nav-badge,
        .sidebar.collapsed .sb-group-items { display: none !important; }

        .sidebar.collapsed .sb-group-h { justify-content: center; padding: 14px 0; }
        .sidebar.collapsed .sb-group-h > i:first-child { margin-right: 0; }

        .sb-collapse { padding: 16px; border-top: 1px solid #111d32; display: flex; justify-content: flex-end; color: #475569; cursor: pointer; transition: color 0.2s; }
        .sb-collapse:hover { color: var(--tx-main); }
        .sidebar.collapsed .sb-collapse { justify-content: center; }
      `}} />

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-scroll">
          
          {/* Dashboard */}
          <div className="sb-group">
            <div className="sb-group-h" onClick={() => toggleGroup('dashboard')} role="button">
              <i className="ti ti-layout-dashboard"></i><span className="nav-tx">Dashboard</span>
              <i className={`ti ti-chevron-down chev ${openGroups.dashboard ? 'open' : ''}`}></i>
            </div>
            <div className={`sb-group-items ${openGroups.dashboard ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'central' ? 'active' : ''}`} onClick={() => onNavigate('central')}>
                <i className="ti ti-layout-grid"></i><span className="nav-tx">Central Dashboard</span>
              </div>
              <div className={`nav-item ${activePage === 'command' ? 'active' : ''}`} onClick={() => onNavigate('command')}>
                <i className="ti ti-terminal"></i><span className="nav-tx">Command Centre</span>
              </div>
            </div>
          </div>

          {/* Operations */}
          <div className="sb-group">
            <div className="sb-group-h" onClick={() => toggleGroup('operations')} role="button">
              <i className="ti ti-clipboard-list"></i><span className="nav-tx">Operations</span>
              <i className={`ti ti-chevron-down chev ${openGroups.operations ? 'open' : ''}`}></i>
            </div>
            <div className={`sb-group-items ${openGroups.operations ? 'show' : ''}`}>
              <div className={`nav-item ${activePage === 'energy' ? 'active' : ''}`} onClick={() => onNavigate('energy')}>
                <i className="ti ti-bolt"></i><span className="nav-tx">Energy &amp; Utilities</span>
              </div>
            </div>
          </div>

        </div>

        <div className="sb-collapse" onClick={() => setIsCollapsed(!isCollapsed)} role="button">
          <i className={`ti ${isCollapsed ? 'ti-chevrons-right' : 'ti-chevrons-left'}`}></i>
        </div>
      </aside>
    </>
  );
}