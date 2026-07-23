import React, { useState } from 'react';

const DigitalTwinWorkflow = () => {
  // --- Initial Workflow Items Master Schema ---
  const initialItems = [
    {
      id: 'TW-101',
      title: 'CH-01 Chiller',
      location: 'Basement Plant Room',
      severity: 'Critical',
      stage: 'Detected',
      slaBreached: true,
      workOrder: null,
      assignee: null,
      resolvedTime: null
    },
    {
      id: 'TW-106',
      title: 'CAM-08',
      location: 'Loading Bay',
      severity: 'Warning',
      stage: 'Detected',
      slaBreached: true,
      workOrder: null,
      assignee: null,
      resolvedTime: null
    },
    {
      id: 'TW-102',
      title: 'AHU Zone C',
      location: 'Floor 7',
      severity: 'Critical',
      stage: 'Acknowledged',
      slaBreached: true,
      workOrder: 'WO-3391',
      assignee: 'R. Fernandes',
      resolvedTime: null
    },
    {
      id: 'TW-104',
      title: 'PMP-01',
      location: 'Chiller Plant',
      severity: 'Warning',
      stage: 'Acknowledged',
      slaBreached: true,
      workOrder: 'WO-3390',
      assignee: 'K. Patel',
      resolvedTime: null
    },
    {
      id: 'TW-103',
      title: 'Lift-04',
      location: 'Tower B Core',
      severity: 'Critical',
      stage: 'In Progress',
      slaBreached: true,
      workOrder: 'WO-3388',
      assignee: 'A. Sharma',
      resolvedTime: null
    },
    {
      id: 'TW-105',
      title: 'CT-01',
      location: 'Roof',
      severity: 'Warning',
      stage: 'Resolved',
      slaBreached: false,
      workOrder: 'WO-3379',
      assignee: 'M. Iyer',
      resolvedTime: '22h 1m ago'
    },
    {
      id: 'TW-107',
      title: 'VAV-14',
      location: 'Floor 4',
      severity: 'Warning',
      stage: 'Resolved',
      slaBreached: false,
      workOrder: 'WO-3352',
      assignee: 'S. Rao',
      resolvedTime: '242h 35m ago'
    },
    {
      id: 'TW-108',
      title: 'AHU-09',
      location: 'Floor 9',
      severity: 'Critical',
      stage: 'Resolved',
      slaBreached: false,
      workOrder: 'WO-3348',
      assignee: 'R. Fernandes',
      resolvedTime: '243h 25m ago'
    }
  ];

  // Stage Pipeline Definition
  const stages = [
    { key: 'Detected', name: 'Detected', nextBtn: 'Acknowledge →' },
    { key: 'Acknowledged', name: 'Acknowledged', nextBtn: 'Dispatch →' },
    { key: 'Dispatched', name: 'Dispatched', nextBtn: 'Start →' },
    { key: 'In Progress', name: 'In Progress', nextBtn: 'Resolve →' },
    { key: 'Resolved', name: 'Resolved', nextBtn: null }
  ];

  // Component States
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState('all');

  // Move Card Forward
  const advanceStage = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const currentIndex = stages.findIndex((s) => s.key === item.stage);
          if (currentIndex < stages.length - 1) {
            const nextStage = stages[currentIndex + 1].key;
            return {
              ...item,
              stage: nextStage,
              resolvedTime: nextStage === 'Resolved' ? 'Just now' : item.resolvedTime
            };
          }
        }
        return item;
      })
    );
  };

  // Move Card Backward
  const regressStage = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const currentIndex = stages.findIndex((s) => s.key === item.stage);
          if (currentIndex > 0) {
            return { ...item, stage: stages[currentIndex - 1].key };
          }
        }
        return item;
      })
    );
  };

  // Reset Demo Board State
  const resetDemo = () => {
    setItems(initialItems);
    setFilter('all');
  };

  // Dynamic KPI Aggregations
  const activeCount = items.filter((i) => i.stage !== 'Resolved').length;
  const slaRiskCount = items.filter((i) => i.slaBreached && i.stage !== 'Resolved').length;
  const awaitingCount = items.filter((i) => i.stage === 'Detected' || i.stage === 'Acknowledged').length;
  const inProgressCount = items.filter((i) => i.stage === 'In Progress').length;
  const resolvedTodayCount = items.filter((i) => i.stage === 'Resolved').length;

  // Filtered Items for Display
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.severity.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="page active" id="pg-dttwinworkflow">
      <div className="tab-panel active" data-page="dttwinworkflow" data-tab="0">
        
        {/* Top KPI Metric Strip */}
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }} id="twf-kpis">
          <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--info)' }}></div>
            <div className="kpi-l">Active</div>
            <div className="kpi-v" style={{ color: 'var(--info)' }}>{activeCount}</div>
          </div>
          <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--warn)' }}></div>
            <div className="kpi-l">SLA at risk</div>
            <div className="kpi-v" style={{ color: 'var(--warn)' }}>{slaRiskCount}</div>
          </div>
          <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--bad)' }}></div>
            <div className="kpi-l">Awaiting action</div>
            <div className="kpi-v" style={{ color: 'var(--bad)' }}>{awaitingCount}</div>
          </div>
          <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--cool)' }}></div>
            <div className="kpi-l">In progress</div>
            <div className="kpi-v" style={{ color: 'var(--cool)' }}>{inProgressCount}</div>
          </div>
          <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--ok)' }}></div>
            <div className="kpi-l">Resolved today</div>
            <div className="kpi-v" style={{ color: 'var(--ok)' }}>{resolvedTodayCount}</div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <div className="sd-seg" id="twf-filter">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
              All
            </button>
            <button className={filter === 'Critical' ? 'active' : ''} onClick={() => setFilter('Critical')}>
              Critical
            </button>
            <button className={filter === 'Warning' ? 'active' : ''} onClick={() => setFilter('Warning')}>
              Warning
            </button>
          </div>
          <div style={{ flex: 1 }}></div>
          <button className="btn" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={resetDemo}>
            <i className="ti ti-refresh"></i> Reset demo
          </button>
        </div>

        {/* Kanban Workflow Board Grid */}
        <div id="twf-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', alignItems: 'start' }}>
          {stages.map((stageObj, stageIdx) => {
            const columnItems = filteredItems.filter((item) => item.stage === stageObj.key);

            return (
              <div key={stageObj.key}>
                {/* Stage Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', padding: '0 2px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ink-2)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    {stageObj.name}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--ink-4)', background: 'var(--surface-2)', borderRadius: '99px', padding: '1px 7px' }}>
                    {columnItems.length}
                  </span>
                </div>

                {/* Column Content */}
                {columnItems.length === 0 ? (
                  <div style={{ fontSize: '10px', color: 'var(--ink-4)', textAlign: 'center', padding: '16px 6px', border: '1px dashed var(--line-2)', borderRadius: '8px' }}>
                    Empty
                  </div>
                ) : (
                  columnItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: 'var(--surface-1)',
                        border: '1px solid var(--line-2)',
                        borderRadius: '9px',
                        padding: '10px',
                        marginBottom: '8px'
                      }}
                    >
                      {/* Card Title & Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px', marginBottom: '6px' }}>
                        <div>
                          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink-0)' }}>{item.title}</div>
                          <div style={{ fontSize: '9.5px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                            {item.id} · {item.location}
                          </div>
                        </div>
                        <span className={`badge ${item.severity === 'Critical' ? 'badge-red' : 'badge-amber'}`}>
                          {item.severity}
                        </span>
                      </div>

                      {/* SLA Bar Indicator (for non-resolved cards) */}
                      {item.stage !== 'Resolved' && (
                        <div style={{ marginBottom: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginBottom: '2px' }}>
                            <span>SLA BREACHED</span>
                          </div>
                          <div style={{ height: '4px', borderRadius: '99px', background: 'var(--surface-3)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '100%', background: 'var(--bad)' }}></div>
                          </div>
                        </div>
                      )}

                      {/* Resolved Timestamp */}
                      {item.stage === 'Resolved' && item.resolvedTime && (
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-3)', marginBottom: '6px' }}>
                          Resolved {item.resolvedTime}
                        </div>
                      )}

                      {/* Work Order Info */}
                      {item.workOrder && (
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-2)', marginBottom: '2px' }}>
                          <i className="ti ti-clipboard-text"></i> {item.workOrder}
                        </div>
                      )}

                      {/* Assigned Tech */}
                      {item.assignee && (
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-2)', marginBottom: '8px' }}>
                          <i className="ti ti-user"></i> {item.assignee}
                        </div>
                      )}

                      {/* Card Controls / Advance & Regress Buttons */}
                      <div style={{ display: 'flex', marginTop: '4px' }}>
                        {stageIdx > 0 && (
                          <>
                            <button
                              className="btn"
                              style={{ padding: '5px 8px', fontSize: '9.5px' }}
                              onClick={() => regressStage(item.id)}
                              title="Back"
                            >
                              ←
                            </button>
                            <div style={{ width: '6px' }}></div>
                          </>
                        )}
                        {stageObj.nextBtn && (
                          <button
                            className="btn"
                            style={{ flex: 1, padding: '5px 6px', fontSize: '9.5px' }}
                            onClick={() => advanceStage(item.id)}
                          >
                            {stageObj.nextBtn}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinWorkflow;