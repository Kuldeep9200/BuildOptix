import React, { useState, useMemo } from 'react';

const ChillerAlarmsPanel = () => {
  // Mock Data extracted from HTML
  const initialAlarms = [
    {
      severity: 'Critical',
      id: 'AL-2041',
      equipment: 'CH-01',
      description: 'High Discharge Pressure — 643 kPa (limit 620)',
      time: '27 May · 10:21',
      status: 'Active',
    },
    {
      severity: 'Warning',
      id: 'AL-2039',
      equipment: 'CT-01',
      description: 'Approach temp drift — 7.0°C (was 5.5°C)',
      time: '27 May · 09:42',
      status: 'Active',
    },
    {
      severity: 'Warning',
      id: 'AL-2037',
      equipment: 'PP-03',
      description: 'Vibration elevated — 2.1 mm/s (limit 4.5)',
      time: '27 May · 08:55',
      status: 'Acknowledged',
    },
    {
      severity: 'Warning',
      id: 'AL-2035',
      equipment: 'CP-02',
      description: 'Bearing temp — 58°C (warn at 55°C)',
      time: '27 May · 07:30',
      status: 'Acknowledged',
    },
    {
      severity: 'Info',
      id: 'AL-2033',
      equipment: 'CH-03',
      description: 'Load > 75% for 2+ hours',
      time: '27 May · 06:00',
      status: 'Cleared',
    },
    {
      severity: 'Info',
      id: 'AL-2031',
      equipment: 'SP-01',
      description: 'Flow slightly below setpoint — 215 vs 220 m³/h',
      time: '26 May · 23:15',
      status: 'Cleared',
    },
    {
      severity: 'Critical',
      id: 'AL-2028',
      equipment: 'CH-01',
      description: 'Condenser entering temp high — 33.4°C',
      time: '26 May · 18:42',
      status: 'Cleared',
    },
    {
      severity: 'Warning',
      id: 'AL-2025',
      equipment: 'CT-03',
      description: 'Fan speed variance detected',
      time: '26 May · 15:10',
      status: 'Cleared',
    },
    {
      severity: 'Info',
      id: 'AL-2022',
      equipment: 'PP-01',
      description: 'Scheduled maintenance reminder',
      time: '26 May · 08:00',
      status: 'Cleared',
    },
  ];

  const [filter, setFilter] = useState('all');

  // Handle AI Query function
  const handleAiQuery = (queryText) => {
    if (typeof window !== 'undefined' && window.aiQuery) {
      window.aiQuery(queryText);
    } else {
      console.log('AI Query:', queryText);
    }
  };

  // Calculate KPI Counts Dynamically based on current alarms
  const kpis = useMemo(() => {
    const active = initialAlarms.filter((a) => a.status === 'Active').length;
    const ack = initialAlarms.filter((a) => a.status === 'Acknowledged').length;
    const cleared = initialAlarms.filter((a) => a.status === 'Cleared').length;
    return {
      active,
      acknowledged: ack,
      cleared,
      total: initialAlarms.length,
    };
  }, [initialAlarms]);

  // Filter Alarms based on Selected Filter Chip
  const filteredAlarms = useMemo(() => {
    if (filter === 'all') return initialAlarms;
    return initialAlarms.filter(
      (alarm) => alarm.status.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, initialAlarms]);

  // Dynamic Badge Color Utility
  const getSeverityBadgeStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return {
          background: 'var(--bad)22',
          color: 'var(--bad)',
          dotColor: 'var(--bad)',
          isBlinking: true,
        };
      case 'Warning':
        return {
          background: 'var(--warn)22',
          color: 'var(--warn)',
          dotColor: 'var(--warn)',
          isBlinking: false,
        };
      default:
        return {
          background: 'var(--info)22',
          color: 'var(--info)',
          dotColor: 'var(--info)',
          isBlinking: false,
        };
    }
  };

  // Dynamic Status Badge Utility
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Active':
        return {
          background: 'var(--bad-soft)',
          color: 'var(--bad)',
        };
      case 'Acknowledged':
        return {
          background: 'var(--warn-soft)',
          color: 'var(--warn)',
        };
      case 'Cleared':
      default:
        return {
          background: 'rgba(255,255,255,0.06)',
          color: 'var(--ink-3)',
        };
    }
  };

  return (
    <div className="ch-tab-panel active" id="ch-panel-alarms">
      <div className="ch-pumps-body">
        {/* KPI Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          <div className="ch-sum-kpi bad">
            <div className="ch-sum-kpi-l">Active Alarms</div>
            <div className="ch-sum-kpi-v">{kpis.active}</div>
            <div className="ch-sum-kpi-sub">need attention</div>
          </div>
          <div className="ch-sum-kpi warn">
            <div className="ch-sum-kpi-l">Acknowledged</div>
            <div className="ch-sum-kpi-v">{kpis.acknowledged}</div>
            <div className="ch-sum-kpi-sub">being reviewed</div>
          </div>
          <div className="ch-sum-kpi ok">
            <div className="ch-sum-kpi-l">Cleared Today</div>
            <div className="ch-sum-kpi-v">{kpis.cleared}</div>
            <div className="ch-sum-kpi-sub">resolved</div>
          </div>
          <div className="ch-sum-kpi info">
            <div className="ch-sum-kpi-l">Total (24 h)</div>
            <div className="ch-sum-kpi-v">{kpis.total}</div>
            <div className="ch-sum-kpi-sub">all events</div>
          </div>
        </div>

        {/* Filter Chips & Action Bar */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div
            className={`ch-pump-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            style={{ cursor: 'pointer' }}
          >
            All
          </div>
          <div
            className={`ch-pump-chip ${filter === 'Active' ? 'active' : ''}`}
            style={{
              color: 'var(--bad)',
              borderColor: 'rgba(242,91,91,0.3)',
              cursor: 'pointer',
            }}
            onClick={() => setFilter('Active')}
          >
            Active
          </div>
          <div
            className={`ch-pump-chip ${
              filter === 'Acknowledged' ? 'active' : ''
            }`}
            style={{
              color: 'var(--warn)',
              borderColor: 'rgba(245,180,65,0.3)',
              cursor: 'pointer',
            }}
            onClick={() => setFilter('Acknowledged')}
          >
            Acknowledged
          </div>
          <div
            className={`ch-pump-chip ${filter === 'Cleared' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setFilter('Cleared')}
          >
            Cleared
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '7px' }}>
            <button
              className="btn primary"
              style={{ padding: '5px 11px', fontSize: '11px' }}
              onClick={() =>
                handleAiQuery(
                  'Summarise all active alarms in the chiller plant and recommend actions'
                )
              }
            >
              <i className="ti ti-brain" style={{ color: '#fff' }}></i>
              AI Alarm Report
            </button>
          </div>
        </div>

        {/* Alarm Table Wrap */}
        <div className="ch-sum-table-wrap">
          <table className="ch-sum-table" id="ch-alarm-table">
            <thead>
              <tr>
                <th className="ch-sum-th">Severity</th>
                <th className="ch-sum-th">ID</th>
                <th className="ch-sum-th">Equipment</th>
                <th className="ch-sum-th">Description</th>
                <th className="ch-sum-th">Time</th>
                <th className="ch-sum-th">Status</th>
                <th className="ch-sum-th"></th>
              </tr>
            </thead>
            <tbody id="ch-alarm-tbody">
              {filteredAlarms.map((alarm) => {
                const sevStyle = getSeverityBadgeStyle(alarm.severity);
                const statusStyle = getStatusBadgeStyle(alarm.status);

                return (
                  <tr
                    key={alarm.id}
                    style={{
                      borderBottom: '1px solid var(--line-1)',
                      transition: 'background 0.1s',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background =
                        'rgba(255,255,255,0.025)')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = '')
                    }
                  >
                    {/* Severity Badge */}
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '99px',
                          background: sevStyle.background,
                          color: sevStyle.color,
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: sevStyle.dotColor,
                            flexShrink: 0,
                            animation: sevStyle.isBlinking
                              ? 'blink 1.5s infinite'
                              : 'none',
                          }}
                        ></span>
                        {alarm.severity}
                      </span>
                    </td>

                    {/* ID */}
                    <td
                      style={{
                        padding: '10px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        color: 'var(--info)',
                      }}
                    >
                      {alarm.id}
                    </td>

                    {/* Equipment */}
                    <td
                      style={{
                        padding: '10px 8px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: 'var(--ink-1)',
                      }}
                    >
                      {alarm.equipment}
                    </td>

                    {/* Description */}
                    <td
                      style={{
                        padding: '10px 8px',
                        fontSize: '11.5px',
                        color: 'var(--ink-1)',
                        maxWidth: '240px',
                      }}
                    >
                      {alarm.description}
                    </td>

                    {/* Time */}
                    <td
                      style={{
                        padding: '10px 8px',
                        fontSize: '10px',
                        color: 'var(--ink-3)',
                        fontFamily: 'var(--font-mono)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {alarm.time}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '10px 14px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '99px',
                          fontWeight: 600,
                          background: statusStyle.background,
                          color: statusStyle.color,
                        }}
                      >
                        {alarm.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '10px 14px' }}>
                      <button
                        className="btn"
                        style={{ padding: '3px 9px', fontSize: '10px' }}
                        onClick={() =>
                          handleAiQuery(
                            `Analyse alarm ${alarm.id} for ${alarm.equipment}`
                          )
                        }
                      >
                        <i
                          className="ti ti-brain"
                          style={{
                            color: 'var(--ai)',
                            fontSize: '11px',
                          }}
                        ></i>
                        AI
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChillerAlarmsPanel;