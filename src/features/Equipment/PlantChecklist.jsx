import React, { useState } from 'react';

const INITIAL_TASKS = {
  chillers: [
    { id: 'c1', task: 'Check oil level & pressure', frequency: 'Weekly', due: '28 May', assignedTo: 'HVAC Team A', completed: true },
    { id: 'c2', task: 'Inspect refrigerant charge', frequency: 'Monthly', due: '01 Jun', assignedTo: 'HVAC Team A', completed: true },
    { id: 'c3', task: 'Clean condenser tubes (CH-01)', frequency: 'Monthly', due: '28 May', assignedTo: 'HVAC Team B', completed: false },
    { id: 'c4', task: 'Check & calibrate capacity controls', frequency: 'Quarterly', due: '15 Jun', assignedTo: 'OEM Engineer', completed: false },
    { id: 'c5', task: 'Inspect compressor belt / coupling', frequency: 'Monthly', due: '28 May', assignedTo: 'HVAC Team A', completed: true },
    { id: 'c6', task: 'Log run hours & service due dates', frequency: 'Weekly', due: '28 May', assignedTo: 'FM Supervisor', completed: false },
  ],
  pumps: [
    { id: 'p1', task: 'Check gland/seal for leaks', frequency: 'Weekly', due: '28 May', assignedTo: 'Mech Team A', completed: true },
    { id: 'p2', task: 'Lubricate PP-03 & CP-02 bearings', frequency: 'Monthly', due: '28 May', assignedTo: 'Mech Team A', completed: false },
    { id: 'p3', task: 'Inspect coupling alignment (all)', frequency: 'Monthly', due: '01 Jun', assignedTo: 'Mech Team B', completed: true },
    { id: 'p4', task: 'Clean suction strainers', frequency: 'Weekly', due: '28 May', assignedTo: 'Mech Team A', completed: false },
    { id: 'p5', task: 'Record vibration readings', frequency: 'Monthly', due: '28 May', assignedTo: 'FM Supervisor', completed: false },
    { id: 'p6', task: 'Check motor insulation resistance', frequency: 'Quarterly', due: '15 Jun', assignedTo: 'Elec Team', completed: false },
  ],
  towers: [
    { id: 't1', task: 'Inspect fill pack for fouling', frequency: 'Monthly', due: '28 May', assignedTo: 'Mech Team B', completed: true },
    { id: 't2', task: 'Water quality & chemical dosing', frequency: 'Weekly', due: '28 May', assignedTo: 'Water Treatment', completed: true },
    { id: 't3', task: 'Lubricate CT-01 & CT-02 fan motors', frequency: 'Monthly', due: '01 Jun', assignedTo: 'Mech Team A', completed: false },
    { id: 't4', task: 'Clean basin & remove sediment (CT-03)', frequency: 'Monthly', due: '28 May', assignedTo: 'Mech Team B', completed: false },
    { id: 't5', task: 'Check drift eliminators', frequency: 'Quarterly', due: '15 Jun', assignedTo: 'Mech Team B', completed: false },
    { id: 't6', task: 'Inspect fan blade condition', frequency: 'Quarterly', due: '15 Jun', assignedTo: 'OEM Engineer', completed: false },
  ],
};

export default function PlantChecklist() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Toggle task completion
  const toggleTask = (category, id) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  // Dynamic calculations based on state
  const allTasks = [...tasks.chillers, ...tasks.pumps, ...tasks.towers];
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100) || 0;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '16px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #10b981', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Completed</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>{completedTasks}</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>tasks done</div>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Pending</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b' }}>{pendingTasks}</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>tasks remaining</div>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Total Tasks</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#3b82f6' }}>{totalTasks}</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>this cycle</div>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #f59e0b',  }}>
          <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Completion</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>{completionPercentage}%</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>overall progress</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontSize: '11.5px', color: '#a1a1aa', flexShrink: 0 }}>Overall Progress</div>
        <div style={{ flex: 1, height: '8px',  borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, #10b981, #06b6d4)', width: `${completionPercentage}%`, transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', color: '#10b981', flexShrink: 0 }}>
          {completionPercentage}%
        </div>
      </div>

      {/* Tables Section */}
      <TaskTable title="Chillers" color="#06b6d4" tasks={tasks.chillers} onToggle={(id) => toggleTask('chillers', id)} />
      <TaskTable title="Pumps" color="#3b82f6" tasks={tasks.pumps} onToggle={(id) => toggleTask('pumps', id)} />
      <TaskTable title="Cooling Towers" color="#f59e0b" tasks={tasks.towers} onToggle={(id) => toggleTask('towers', id)} />
    </div>
  );
}

// Sub-component for individual checklist tables
function TaskTable({ title, color, tasks, onToggle }) {
  return (
    <div style={{  border: '1px solid #27272a', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #27272a', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: color, display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span>{title}</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <th style={thStyle({ width: '32px' })} />
            <th style={thStyle({ textAlign: 'left' })}>Task</th>
            <th style={thStyle({ textAlign: 'left' })}>Frequency</th>
            <th style={thStyle({ textAlign: 'left' })}>Due</th>
            <th style={thStyle({ textAlign: 'left' })}>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <tr
              key={item.id}
              onClick={() => onToggle(item.id)}
              style={{ borderBottom: '1px solid #27272a', cursor: 'pointer', transition: 'background 0.1s' }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
              onMouseOut={(e) => (e.currentTarget.style.background = '')}
            >
              <td style={{ padding: '10px 14px', width: '32px' }}>
                <div style={{
                  width: '17px',
                  height: '17px',
                  borderRadius: '4px',
                  border: item.completed ? '1.5px solid #10b981' : '1.5px solid #3f3f46',
                  background: item.completed ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: '#fff',
                  transition: 'all 0.15s',
                }}>
                  {item.completed && '✓'}
                </div>
              </td>
              <td style={{ padding: '10px 8px', fontSize: '12px', color: item.completed ? '#71717a' : '#f4f4f5', textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.task}
              </td>
              <td style={{ padding: '10px 8px' }}>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600, background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                  {item.frequency}
                </span>
              </td>
              <td style={{ padding: '10px 8px', fontSize: '10.5px', color: '#a1a1aa', fontFamily: 'monospace' }}>
                {item.due}
              </td>
              <td style={{ padding: '10px 14px', fontSize: '10.5px', color: '#a1a1aa' }}>
                {item.assignedTo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = (custom = {}) => ({
  padding: '7px 8px',
  fontSize: '9px',
  fontWeight: 600,
  color: '#71717a',
  fontFamily: 'monospace',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  ...custom,
});