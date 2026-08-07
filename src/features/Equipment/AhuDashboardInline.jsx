import React, { useState, useMemo } from 'react';
import {
  List,
  Play,
  Square,
  AlertTriangle,
  RefreshCw,
  Download,
  Send,
  ChevronDown,
  ArrowRight,
  Plus
} from 'lucide-react';

const INITIAL_DATA = [
  {
    id: 'TF-A4',
    name: 'TF-A4 - POST OP',
    run: 'On',
    cmd: 'ON',
    trip: 'Normal',
    am: 'Auto',
    raTemp: 25.83,
    saTemp: 20.47,
    sp: 30,
    raRH: 57.94,
    saPress: 52,
    chwCtrl: '-',
    chwFb: 0.23,
    vfdCtrl: 100,
    preFil: 100,
    bagFil: 52,
    raDmpr: 'Close',
    saDmpr: 'Open',
    updated: '24-05-26 01:45',
  },
  {
    id: 'LG-A3',
    name: 'LG-A3 - ER CAUSALITY',
    run: 'On',
    cmd: 'ON',
    trip: 'Normal',
    am: 'Auto',
    raTemp: 21.85,
    saTemp: 15.35,
    sp: 10,
    raRH: 57.75,
    saPress: 60.77,
    chwCtrl: 100,
    chwFb: 84.49,
    vfdCtrl: 100,
    preFil: 100,
    bagFil: 60.77,
    raDmpr: 'Close',
    saDmpr: 'Close',
    updated: '24-05-26 01:45',
  },
  {
    id: 'GF-A8',
    name: 'GF-A8 - ICU',
    run: 'On',
    cmd: 'ON',
    trip: 'Normal',
    am: 'Auto',
    raTemp: 22.1,
    saTemp: 14.8,
    sp: 18,
    raRH: 52.4,
    saPress: 58.4,
    chwCtrl: 100,
    chwFb: 91.2,
    vfdCtrl: 100,
    preFil: 100,
    bagFil: 58.4,
    raDmpr: 'Close',
    saDmpr: 'Close',
    updated: '24-05-26 01:45',
  },
  {
    id: 'GF-A7',
    name: 'GF-A7 - OT COMPLEX',
    run: 'On',
    cmd: 'ON',
    trip: 'Normal',
    am: 'Auto',
    raTemp: 21.5,
    saTemp: 14.2,
    sp: 18,
    raRH: 54.2,
    saPress: 55.3,
    chwCtrl: 100,
    chwFb: 88.6,
    vfdCtrl: 100,
    preFil: 100,
    bagFil: 55.3,
    raDmpr: 'Close',
    saDmpr: 'Close',
    updated: '24-05-26 01:45',
  },
  {
    id: 'GF-A6',
    name: 'GF-A6 - CASUALTY',
    run: 'On',
    cmd: 'ON',
    trip: 'Normal',
    am: 'Auto',
    raTemp: 23.8,
    saTemp: 18.4,
    sp: 22,
    raRH: 58.7,
    saPress: 48.2,
    chwCtrl: 80,
    chwFb: 72.3,
    vfdCtrl: 90,
    preFil: 100,
    bagFil: 48.2,
    raDmpr: 'Open',
    saDmpr: 'Open',
    updated: '24-05-26 01:45',
  },
  {
    id: 'FF-A4',
    name: 'FF-A4 - MATERNITY WARD',
    run: 'On',
    cmd: 'ON',
    trip: 'Normal',
    am: 'Auto',
    raTemp: 24.2,
    saTemp: 16.9,
    sp: 20,
    raRH: 56.8,
    saPress: 52.6,
    chwCtrl: 90,
    chwFb: 82.1,
    vfdCtrl: 95,
    preFil: 100,
    bagFil: 52.6,
    raDmpr: 'Close',
    saDmpr: 'Close',
    updated: '24-05-26 01:45',
  },
];

export default function AhuDashboard() {
  const [data, setData] = useState(INITIAL_DATA);
  const [filter, setFilter] = useState('On');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'cmd', direction: 'desc' });

  const handleCmdChange = (id, newCmd) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cmd: newCmd, run: newCmd === 'ON' ? 'On' : 'Off' } : item
      )
    );
  };

  const handleSetpointChange = (id, newSp) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, sp: parseFloat(newSp) || item.sp } : item))
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalUnits = 13;
  const runningUnits = data.filter((item) => item.run === 'On').length;
  const faultUnits = data.filter((item) => item.trip === 'Fault').length;
  const avgTemp = (
    data.reduce((acc, item) => acc + item.raTemp, 0) / (data.length || 1)
  ).toFixed(1);

  const processedData = useMemo(() => {
    return data
      .filter((item) => {
        const matchesFilter =
          filter === 'all'
            ? true
            : filter === 'Fault'
            ? item.trip === 'Fault'
            : item.run === filter;
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, filter, searchTerm, sortConfig]);

  return (
    <div
      style={{
        padding: '16px',
        color: '#f8fafc',
        minHeight: '100vh',
        fontSize: '12px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      {/* KPI Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div style={kpiBoxStyle}>
          <div style={{ color: '#94a3b8', fontWeight: 500 }}>Total Units</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: '2px 0' }}>
            {totalUnits}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>Across all floors</div>
        </div>

        <div style={kpiBoxStyle}>
          <div style={{ color: '#94a3b8', fontWeight: 500 }}>Running</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#34d399', margin: '2px 0' }}>
            {runningUnits}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>Active right now</div>
        </div>

        <div style={kpiBoxStyle}>
          <div style={{ color: '#94a3b8', fontWeight: 500 }}>Faults</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#94a3b8', margin: '2px 0' }}>
            {faultUnits}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>Needs attention</div>
        </div>

        <div style={kpiBoxStyle}>
          <div style={{ color: '#94a3b8', fontWeight: 500 }}>Avg. Temp</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', margin: '2px 0' }}>
            {avgTemp}°C
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>Return air avg</div>
        </div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid rgba(51, 65, 85, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setFilter('all')}
            style={getChipStyle(filter === 'all', '#38bdf8', 'rgba(56, 189, 248, 0.2)')}
          >
            <List size={12} /> All <b>{totalUnits}</b>
          </button>

          <button
            onClick={() => setFilter('On')}
            style={getChipStyle(filter === 'On', '#34d399', 'rgba(52, 211, 153, 0.2)')}
          >
            <Play size={12} /> Running <b>{runningUnits}</b>
          </button>

          <button
            onClick={() => setFilter('Off')}
            style={getChipStyle(filter === 'Off', '#fb7185', 'rgba(251, 113, 133, 0.2)')}
          >
            <Square size={12} /> Stopped <b>7</b>
          </button>

          <button
            onClick={() => setFilter('Fault')}
            style={getChipStyle(filter === 'Fault', '#fbbf24', 'rgba(251, 191, 36, 0.2)')}
          >
            <AlertTriangle size={12} /> Fault <b>0</b>
          </button>
        </div>

        <input
          type="text"
          placeholder="Search AHU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '4px 10px',
            color: '#e2e8f0',
            outline: 'none',
            width: '180px',
            fontSize: '11px',
          }}
        />

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button style={btnStyle}>
            <RefreshCw size={12} /> Refresh
          </button>
          <button style={{ ...btnStyle, backgroundColor: '#0284c7', color: '#ffffff' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div
        style={{
          overflowX: 'auto',
          border: '1px solid rgba(51, 65, 85, 0.6)',
          borderRadius: '8px',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            minWidth: '1200px',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                color: '#94a3b8',
                borderBottom: '1px solid #334155',
              }}
            >
              <th style={thStyle}></th>
              <th style={thStyle} onClick={() => handleSort('name')}>Name</th>
              <th style={thStyle} onClick={() => handleSort('id')}>ID</th>
              <th style={thStyle} onClick={() => handleSort('run')}>Run</th>
              <th style={thStyle} onClick={() => handleSort('cmd')}>
                Cmd {sortConfig.key === 'cmd' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th style={thStyle} onClick={() => handleSort('trip')}>Trip</th>
              <th style={thStyle} onClick={() => handleSort('am')}>A/M</th>
              <th style={thStyle} onClick={() => handleSort('raTemp')}>RA°C</th>
              <th style={thStyle} onClick={() => handleSort('saTemp')}>SA°C</th>
              <th style={thStyle} onClick={() => handleSort('sp')}>SP°C</th>
              <th style={thStyle} onClick={() => handleSort('raRH')}>RH%</th>
              <th style={thStyle} onClick={() => handleSort('saPress')}>SA Pa</th>
              <th style={thStyle} onClick={() => handleSort('chwCtrl')}>CHW△</th>
              <th style={thStyle} onClick={() => handleSort('chwFb')}>CHW Fb</th>
              <th style={thStyle} onClick={() => handleSort('vfdCtrl')}>VFD%</th>
              <th style={thStyle} onClick={() => handleSort('preFil')}>Pre Fil</th>
              <th style={thStyle} onClick={() => handleSort('bagFil')}>Bag Fil</th>
              <th style={thStyle} onClick={() => handleSort('raDmpr')}>RA Dmpr</th>
              <th style={thStyle} onClick={() => handleSort('saDmpr')}>SA Dmpr</th>
              <th style={{ ...thStyle, cursor: 'default' }}>Schedules</th>
              <th style={thStyle} onClick={() => handleSort('updated')}>Updated</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
            {processedData.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                onCmdChange={handleCmdChange}
                onSetpointChange={handleSetpointChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ row, onCmdChange, onSetpointChange }) {
  const [localSp, setLocalSp] = useState(row.sp);

  const handleSpSend = () => {
    onSetpointChange(row.id, localSp);
  };

  return (
    <tr
      style={{
        borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        fontSize: '11px',
        color: '#cbd5e1',
      }}
    >
      <td style={{ padding: '8px', textAlign: 'center', color: '#38bdf8' }}>
        <ArrowRight size={13} />
      </td>

      <td style={{ padding: '8px', fontWeight: 600, color: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#34d399',
              display: 'inline-block',
            }}
          ></span>
          {row.name}
        </div>
      </td>

      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8' }}>{row.id}</td>

      <td style={{ padding: '8px' }}>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            backgroundColor: 'rgba(52, 211, 153, 0.2)',
            color: '#34d399',
            fontWeight: 500,
          }}
        >
          {row.run}
        </span>
      </td>

      <td style={{ padding: '8px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <select
            value={row.cmd}
            onChange={(e) => onCmdChange(row.id, e.target.value)}
            style={{
              appearance: 'none',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '4px',
              padding: '2px 18px 2px 8px',
              color: '#34d399',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
          <ChevronDown
            size={12}
            style={{
              color: '#94a3b8',
              position: 'absolute',
              right: '4px',
              top: '5px',
              pointerEvents: 'none',
            }}
          />
        </div>
      </td>

      <td style={{ padding: '8px' }}>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            backgroundColor: '#1e293b',
            color: '#cbd5e1',
          }}
        >
          {row.trip}
        </span>
      </td>

      <td style={{ padding: '8px' }}>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.2)',
          }}
        >
          {row.am}
        </span>
      </td>

      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#fbbf24' }}>{row.raTemp}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#22d3ee' }}>{row.saTemp}</td>

      <td style={{ padding: '8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '2px 4px',
            width: 'fit-content',
          }}
        >
          <input
            type="number"
            min="10"
            max="40"
            step="0.5"
            value={localSp}
            onChange={(e) => setLocalSp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSpSend()}
            style={{
              width: '32px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#f8fafc',
              fontFamily: 'monospace',
              textAlign: 'center',
              outline: 'none',
              fontSize: '11px',
            }}
          />
          <span style={{ color: '#64748b', fontSize: '10px' }}>°C</span>
          <button
            onClick={handleSpSend}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Send size={12} />
          </button>
        </div>
      </td>

      <td style={{ padding: '8px', fontFamily: 'monospace' }}>{row.raRH}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace' }}>{row.saPress}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace' }}>{row.chwCtrl}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8' }}>{row.chwFb}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#a78bfa' }}>{row.vfdCtrl}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#fbbf24' }}>{row.preFil}</td>
      <td style={{ padding: '8px', fontFamily: 'monospace', color: '#34d399' }}>{row.bagFil}</td>

      <td style={{ padding: '8px' }}>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            ...(row.raDmpr === 'Open'
              ? { color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)' }
              : { color: '#94a3b8', backgroundColor: '#1e293b' }),
          }}
        >
          {row.raDmpr}
        </span>
      </td>

      <td style={{ padding: '8px' }}>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            ...(row.saDmpr === 'Open'
              ? { color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)' }
              : { color: '#94a3b8', backgroundColor: '#1e293b' }),
          }}
        >
          {row.saDmpr}
        </span>
      </td>

      <td style={{ padding: '8px' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '10px',
          }}
        >
          <Plus size={10} /> Add
        </button>
      </td>

      <td style={{ padding: '8px', color: '#64748b', fontSize: '10px' }}>{row.updated}</td>
    </tr>
  );
}

// Inline Styles Helpers
const kpiBoxStyle = {
  border: '1px solid rgba(51, 65, 85, 0.6)',
  padding: '12px',
  borderRadius: '8px',
};

const thStyle = {
  padding: '8px',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 600,
};

const btnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 10px',
  border: 'none',
  borderRadius: '4px',
  color: '#cbd5e1',
  fontSize: '11px',
  cursor: 'pointer',
};

const getChipStyle = (isActive, color, activeBg) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 10px',
  borderRadius: '4px',
  border: `1px solid ${isActive ? color : '#334155'}`,
  backgroundColor: isActive ? activeBg : 'transparent',
  color: isActive ? color : '#94a3b8',
  cursor: 'pointer',
  fontSize: '11px',
});