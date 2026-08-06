import React, { useState, useMemo } from 'react';

// initial mock data structured by categories
const CATEGORIES_DATA = [
  {
    categoryName: 'HVAC · Air Side',
    cards: [
      { id: 'ahuv1', title: 'AHU-V1', icon: 'ti-air-conditioning', faults: 2, total: 24, on: 20, off: 4, pct: 83 },
      { id: 'ahuv2', title: 'AHU-V2', icon: 'ti-wind', faults: 2, total: 18, on: 14, off: 4, pct: 78 },
      { id: 'fcu', title: 'FCU', icon: 'ti-temperature', faults: 2, total: 120, on: 96, off: 24, pct: 80 },
      { id: 'splitac', title: 'Split AC', icon: 'ti-snowflake', faults: 2, total: 500, on: 300, off: 200, pct: 60 },
      { id: 'ef', title: 'Exhaust Fan', icon: 'ti-rotate-clockwise-2', faults: 2, total: 40, on: 31, off: 9, pct: 78 },
    ],
  },
  {
    categoryName: 'HVAC · Cooling Plant',
    cards: [
      { id: 'chiller', title: 'Chiller', icon: 'ti-building-factory', faults: 1, total: 6, on: 4, off: 2, pct: 67 },
      { id: 'pump', title: 'Pump', icon: 'ti-droplet', faults: 2, total: 32, on: 24, off: 8, pct: 75 },
    ],
  },
  {
    categoryName: 'Power · Amenities',
    cards: [
      { id: 'ups', title: 'UPS', icon: 'ti-battery-charging', faults: 1, total: 8, on: 7, off: 1, pct: 88 },
      { id: 'cwd', title: 'Cold Water Dispenser', icon: 'ti-glass-full', faults: 2, total: 12, on: 11, off: 1, pct: 92 },
    ],
  },
];

export default function EquipmentSummaryView({ onOpenCategory }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Card Click
  const handleCardClick = (id, mode = 'detail') => {
    if (onOpenCategory) {
      onOpenCategory(id, mode);
    } else {
      console.log(`Opening category: ${id}`);
    }
  };

  // Filter cards dynamically based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return CATEGORIES_DATA;

    const term = searchTerm.toLowerCase();
    return CATEGORIES_DATA.map((cat) => ({
      ...cat,
      cards: cat.cards.filter((card) => card.title.toLowerCase().includes(term)),
    })).filter((cat) => cat.cards.length > 0);
  }, [searchTerm]);

  return (
    <div className="eqs-wrap" id="eqSummaryView" style={{ display: 'flex' }}>
      {/* Header Bar */}
      <div className="eqs-head">
        <div className="eqs-bc" id="eqBreadcrumb">
          <span className="cur">
            <i className="ti ti-cpu" /> Equipment Summary
          </span>
        </div>
        <div className="eqs-grow" />
        <div id="eqViewToggle" />
      </div>

      {/* Main Content Area */}
      <div className="eqs-body" id="eqSumContent">
        {/* Rollup KPI Stats Bar */}
        <div className="eqs-rollup">
          <div className="rk">
            <i className="ti ti-cpu" style={{ color: 'var(--info)' }} />
            <div>
              <div className="v">760</div>
              <div className="l">Total Equipment</div>
            </div>
          </div>
          <div className="rsep" />

          <div className="rk">
            <i className="ti ti-player-play-filled" style={{ color: 'var(--ok)' }} />
            <div>
              <div className="v" style={{ color: 'var(--ok)' }}>
                507
              </div>
              <div className="l">Running</div>
            </div>
          </div>
          <div className="rsep" />

          <div className="rk">
            <i className="ti ti-player-stop-filled" style={{ color: 'var(--bad)' }} />
            <div>
              <div className="v" style={{ color: 'var(--bad)' }}>
                253
              </div>
              <div className="l">Stopped</div>
            </div>
          </div>
          <div className="rsep" />

          <div className="rk">
            <i className="ti ti-alert-triangle" style={{ color: 'var(--warn)' }} />
            <div>
              <div className="v" style={{ color: 'var(--warn)' }}>
                16
              </div>
              <div className="l">Active Faults</div>
            </div>
          </div>
          <div className="rsep" />

          <div className="rk">
            <i className="ti ti-category" style={{ color: 'var(--brand-bright)' }} />
            <div>
              <div className="v">9</div>
              <div className="l">Categories</div>
            </div>
          </div>

          {/* Search Box */}
          <div className="eqs-search" style={{ marginLeft: 'auto' }}>
            <i className="ti ti-search" />
            <input
              id="eqCardSearch"
              placeholder="Search equipment type…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Sections */}
        {filteredCategories.map((cat, idx) => (
          <React.Fragment key={idx}>
            <div className="eqs-sech">
              {cat.categoryName}
              <span className="ln" />
            </div>

            <div className="eqs-grid" style={{ marginBottom: '22px' }}>
              {cat.cards.map((card) => (
                <div
                  key={card.id}
                  className="eqs-card"
                  onClick={() => handleCardClick(card.id, 'detail')}
                >
                  <div className="eqs-ctop">
                    <span className="eqs-ic">
                      <i className={`ti ${card.icon}`} />
                    </span>
                    <div>
                      <div className="eqs-ctt">
                        {card.title}
                        {card.faults > 0 && (
                          <span className="eqs-fault">
                            <i className="ti ti-alert-triangle" style={{ fontSize: '11px' }} />
                            {card.faults}
                          </span>
                        )}
                      </div>
                      <div className="eqs-csub">
                        {card.total} units · {card.pct}% running
                      </div>
                    </div>
                  </div>

                  <div className="eqs-stat3">
                    <div className="eqs-stat">
                      <div className="v">{card.total}</div>
                      <div className="l">Total</div>
                    </div>
                    <div className="eqs-stat">
                      <div className="v ok">{card.on}</div>
                      <div className="l">ON</div>
                    </div>
                    <div className="eqs-stat">
                      <div className="v bad">{card.off}</div>
                      <div className="l">OFF</div>
                    </div>
                  </div>

                  <div className="eqs-bar">
                    <i style={{ width: `${card.pct}%` }} />
                  </div>

                  <div className="eqs-cfoot">
                    <span>
                      <i className="ti ti-circle-check" style={{ color: 'var(--ok)' }} /> {card.off} off / attention
                    </span>
                    <span className="go">
                      Open <i className="ti ti-arrow-right" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}