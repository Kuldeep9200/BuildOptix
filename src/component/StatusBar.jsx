import React, { useState, useEffect } from 'react';

export default function StatusBar({
  systemStatus = 'Online',
  sitesTotal = 6,
  sitesActive = 5,
  assetsCount = '2,148',
  alarmsCount = 7,
  powerConsumption = '12.84 MW',
}) {
  const [latency, setLatency] = useState(40);
  const [lastSync, setLastSync] = useState(2);

  // Live simulation for Latency & Sync updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight latency fluctuation (35ms - 50ms)
      setLatency(Math.floor(Math.random() * (50 - 35 + 1)) + 35);
      
      // Reset last sync counter periodically
      setLastSync((prev) => (prev >= 10 ? 1 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .sb-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .sb-item b {
            color: #f8fafc;
            font-weight: 600;
          }
          .sb-item.ok {
            color: #38bdf8;
          }
          .sb-item.ok b {
            color: #38bdf8;
          }
          .sb-item.bad {
            color: #f87171;
          }
          .sb-item.bad b {
            color: #ef4444;
          }
          .dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            display: inline-block;
          }
          .dot.ok {
            background-color: #22c55e;
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
          }
          .sb-div {
            width: 1px;
            height: 12px;
            background-color: #334155;
            margin: 0 12px;
          }
          .sb-right {
            margin-left: auto;
            display: flex;
            align-items: center;
          }
        `,
        }}
      />

      <div className="statusbar">
        <span className="sb-item ok">
          <span className="dot ok"></span>
          System <b>{systemStatus}</b>
        </span>

        <div className="sb-div"></div>
        
        <span className="sb-item">
          Sites <b>{sitesActive} / {sitesTotal}</b>
        </span>

        <div className="sb-div"></div>

        <span className="sb-item">
          Assets <b>{assetsCount}</b>
        </span>

        <div className="sb-div"></div>

        <span className="sb-item bad">
          Alarms <b>{alarmsCount}</b>
        </span>

        <div className="sb-right">
          <span className="sb-item">
            Power <b>{powerConsumption}</b>
          </span>

          <div className="sb-div"></div>

          <span className="sb-item ok">
            Latency <b id="sb-latency">{latency}ms</b>
          </span>

          <div className="sb-div"></div>

          <span className="sb-item">
            Last sync <b id="sb-sync">{lastSync}s ago</b>
          </span>
        </div>
      </div>
    </>
  );
}