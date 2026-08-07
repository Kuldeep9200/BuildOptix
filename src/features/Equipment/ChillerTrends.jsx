import React, { useState } from 'react';

export default function ChillerTrends() {
  const [activeTimeframe, setActiveTimeframe] = useState('24H');
  const [hoveredCard, setHoveredCard] = useState(null);

  const timeframes = ['1H', '6H', '24H', '7D', '30D'];

  const trendCards = [
    {
      id: 'chws',
      label: 'CHWS',
      unit: '°C',
      color: '#34D2E6',
      gradientId: 'sghq19',
      pathD: 'M0,28 L20,30 L40,26 L60,28 L80,24 L100,26 L120,22 L140,25 L160,23 L180,26 L200,24',
      fillD: 'M0,28 L20,30 L40,26 L60,28 L80,24 L100,26 L120,22 L140,25 L160,23 L180,26 L200,24 L200,50 L0,50 Z',
    },
    {
      id: 'chwr',
      label: 'CHWR',
      unit: '°C',
      color: '#FF8A4C',
      gradientId: 'sgnqvx',
      pathD: 'M0,18 L20,16 L40,20 L60,18 L80,22 L100,20 L120,16 L140,18 L160,20 L180,22 L200,18',
      fillD: 'M0,18 L20,16 L40,20 L60,18 L80,22 L100,20 L120,16 L140,18 L160,20 L180,22 L200,18 L200,50 L0,50 Z',
    },
    {
      id: 'comp_power',
      label: 'Comp Power',
      unit: 'kW',
      color: '#9B6CFF',
      gradientId: 'sgauxk',
      pathD: 'M0,30 L20,28 L40,26 L60,22 L80,18 L100,20 L120,16 L140,18 L160,14 L180,16 L200,12',
      fillD: 'M0,30 L20,28 L40,26 L60,22 L80,18 L100,20 L120,16 L140,18 L160,14 L180,16 L200,12 L200,50 L0,50 Z',
    },
    {
      id: 'cw_flow',
      label: 'CW Flow',
      unit: 'm³/h',
      color: '#22D67A',
      gradientId: 'sgkchu',
      pathD: 'M0,22 L20,20 L40,24 L60,22 L80,18 L100,22 L120,20 L140,22 L160,18 L180,20 L200,22',
      fillD: 'M0,22 L20,20 L40,24 L60,22 L80,18 L100,22 L120,20 L140,22 L160,18 L180,20 L200,22 L200,50 L0,50 Z',
    },
    {
      id: 'cop',
      label: 'COP',
      unit: '·',
      color: '#4EA1FF',
      gradientId: 'sgbf0e',
      pathD: 'M0,28 L20,26 L40,24 L60,22 L80,20 L100,18 L120,16 L140,18 L160,16 L180,14 L200,16',
      fillD: 'M0,28 L20,26 L40,24 L60,22 L80,20 L100,18 L120,16 L140,18 L160,16 L180,14 L200,16 L200,50 L0,50 Z',
    },
  ];

  return (
    <div
      id="eq-tabpanel-chiller-trends"
      style={{ flex: '1 1 0%', overflowY: 'auto', display: 'block' }}
    >
      <div id="eq-trends-tb" style={{ padding: '16px' }}>
        
        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '14px' }}>
          {timeframes.map((tf) => {
            const isActive = activeTimeframe === tf;
            return (
              <span
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.15s ease',
                  background: isActive ? 'var(--info, #4EA1FF)' : 'var(--surface-1, #212130)',
                  color: isActive ? '#FFFFFF' : 'var(--ink-2, #A2A5B5)',
                  border: `1px solid ${isActive ? 'var(--info, #4EA1FF)' : 'var(--line-2, rgba(255,255,255,0.12))'}`,
                }}
              >
                {tf}
              </span>
            );
          })}
        </div>

        {/* Trend Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {trendCards.map((card) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'var(--surface-1, #212130)',
                  border: `1px solid ${isHovered ? 'var(--line-3, rgba(255,255,255,0.25))' : 'var(--line-2, rgba(255,255,255,0.12))'}`,
                  borderRadius: '9px',
                  padding: '12px 14px',
                  transform: isHovered ? 'translateY(-1px)' : 'none',
                  boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.2)' : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.12s',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-1, #E1E1E6)' }}>
                    {card.label}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono, monospace)', color: card.color }}>
                    {card.unit}
                  </span>
                </div>

                {/* SVG Graph */}
                <svg
                  width="100%"
                  viewBox="0 0 200 50"
                  preserveAspectRatio="none"
                  style={{ height: '48px', display: 'block' }}
                >
                  <defs>
                    <linearGradient id={card.gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={card.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={card.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area Fill */}
                  <path d={card.fillD} fill={`url(#${card.gradientId})`} stroke="none" />
                  
                  {/* Line Trend */}
                  <path d={card.pathD} fill="none" stroke={card.color} strokeWidth="1.8" />
                  
                  {/* End Point Dot */}
                  <circle cx="200" cy="28" r="3" fill={card.color} />
                </svg>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}