import React, { useState } from 'react';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleAction = (message) => {
    if (typeof window !== 'undefined' && typeof window.toast === 'function') {
      window.toast(message, 'info');
    } else {
      console.log(message);
    }
  };

  return (
    <div className="page active" id="pg-vendor">
      
      {/* ================= TAB 0: DIRECTORY ================= */}
      <div className={`tab-panel ${activeTab === 0 ? 'active' : ''}`} data-page="vendor" data-tab="0" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-info clickable" title="View vendor directory" onClick={() => setActiveTab(0)}>
            <div className="kpi-l">Active Vendors</div>
            <div className="kpi-v">38</div>
            <div className="kpi-s">across all categories</div>
          </div>
          <div className="kpi glow-warn clickable" title="View expiring contracts" onClick={() => setActiveTab(1)}>
            <div className="kpi-l">Expiring Contracts (30d)</div>
            <div className="kpi-v warn">4</div>
            <div className="kpi-s">renewal action required</div>
          </div>
          <div className="kpi glow-ok clickable" title="View vendor scorecards" onClick={() => setActiveTab(3)}>
            <div className="kpi-l">Avg Scorecard</div>
            <div className="kpi-v ok">84<span className="kpi-u">%</span></div>
            <div className="kpi-s">target ≥80%</div>
          </div>
          <div className="kpi glow-bad clickable" title="View pending invoices" onClick={() => setActiveTab(2)}>
            <div className="kpi-l">Pending Invoices</div>
            <div className="kpi-v bad">11</div>
            <div className="kpi-s">₹24.6L outstanding</div>
          </div>
        </div>

        <div className="card mb-12">
          <div className="ch">
            <div>
              <div className="ct">Vendor Directory</div>
              <div className="cs">All active vendors · sorted by category</div>
            </div>
            <span className="ca" onClick={() => handleAction('Adding new vendor...')}>+ Add Vendor</span>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Contact</th>
                  <th>Contract Value</th>
                  <th>Contract Expires</th>
                  <th>Scorecard</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>CoolTech HVAC Pvt Ltd</b></td><td>HVAC Maintenance</td><td>Ravi Kumar</td><td>₹18L/yr</td><td>31 Jul 2026</td><td style={{ color: 'var(--ok)', fontWeight: 600 }}>91%</td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>SparkElec Services</b></td><td>Electrical Maintenance</td><td>Anjali S.</td><td>₹12L/yr</td><td>31 May 2026</td><td style={{ color: 'var(--warn)', fontWeight: 600 }}>78%</td><td><span className="badge badge-amber">Expiring</span></td></tr>
                <tr><td><b>LiftPro India</b></td><td>Elevator AMC</td><td>Suresh P.</td><td>₹9.6L/yr</td><td>30 Sep 2026</td><td style={{ color: 'var(--ok)', fontWeight: 600 }}>88%</td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>AquaPure Water Mgmt</b></td><td>Water Treatment</td><td>Priya M.</td><td>₹6L/yr</td><td>15 Jun 2026</td><td style={{ color: 'var(--warn)', fontWeight: 600 }}>75%</td><td><span className="badge badge-amber">Expiring</span></td></tr>
                <tr><td><b>SecureEye CCTV</b></td><td>Security &amp; Surveillance</td><td>Deepak V.</td><td>₹8L/yr</td><td>31 Dec 2026</td><td style={{ color: 'var(--ok)', fontWeight: 600 }}>95%</td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>FireGuard Systems</b></td><td>Fire Safety AMC</td><td>Arun K.</td><td>₹7.2L/yr</td><td>28 Feb 2027</td><td style={{ color: 'var(--ok)', fontWeight: 600 }}>92%</td><td><span className="badge badge-green">Active</span></td></tr>
                <tr><td><b>CleanBuild FM</b></td><td>Housekeeping &amp; FM</td><td>Meena R.</td><td>₹36L/yr</td><td>31 Mar 2027</td><td style={{ color: 'var(--bad)', fontWeight: 600 }}>67%</td><td><span className="badge badge-red">Under Review</span></td></tr>
                <tr><td><b>SolarMax Energy</b></td><td>Solar O&amp;M</td><td>Kiran T.</td><td>₹4.8L/yr</td><td>31 Oct 2026</td><td style={{ color: 'var(--ok)', fontWeight: 600 }}>97%</td><td><span className="badge badge-green">Active</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: CONTRACTS ================= */}
      <div className={`tab-panel ${activeTab === 1 ? 'active' : ''}`} data-page="vendor" data-tab="1" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi"><div className="kpi-l">Total Contract Value</div><div className="kpi-v">₹1.86Cr<span className="kpi-u">/yr</span></div></div>
          <div className="kpi glow-warn"><div className="kpi-l">Expiring in 30 Days</div><div className="kpi-v warn">4</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Renewals Initiated</div><div className="kpi-v ok">2</div></div>
          <div className="kpi glow-bad"><div className="kpi-l">Lapsed / Expired</div><div className="kpi-v bad">0</div></div>
        </div>
        <div className="card">
          <div className="ch"><div className="ct">Contract Renewal Pipeline</div></div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Expiry</th>
                  <th>Renewal Value</th>
                  <th>Stage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>SparkElec Services</b></td>
                  <td>Electrical</td>
                  <td style={{ color: 'var(--bad)' }}>31 May 2026</td>
                  <td>₹13.2L/yr (+10%)</td>
                  <td><span className="badge badge-amber">Negotiation</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAction('Opening contract editor...')}>Review</button></td>
                </tr>
                <tr>
                  <td><b>AquaPure Water</b></td>
                  <td>Water Treatment</td>
                  <td style={{ color: 'var(--warn)' }}>15 Jun 2026</td>
                  <td>₹6.6L/yr (+10%)</td>
                  <td><span className="badge badge-cyan">Draft Sent</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAction('Opening contract editor...')}>Review</button></td>
                </tr>
                <tr>
                  <td><b>LiftPro India</b></td>
                  <td>Elevator AMC</td>
                  <td>30 Sep 2026</td>
                  <td>₹10.2L/yr (+6%)</td>
                  <td><span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}>Not Started</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAction('Initiating renewal...')}>Initiate</button></td>
                </tr>
                <tr>
                  <td><b>SolarMax Energy</b></td>
                  <td>Solar O&amp;M</td>
                  <td>31 Oct 2026</td>
                  <td>₹5.0L/yr (+4%)</td>
                  <td><span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}>Not Started</span></td>
                  <td><button className="btn" style={{ padding: '3px 10px', fontSize: '10px' }} onClick={() => handleAction('Initiating renewal...')}>Initiate</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 2: INVOICES ================= */}
      <div className={`tab-panel ${activeTab === 2 ? 'active' : ''}`} data-page="vendor" data-tab="2" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-bad"><div className="kpi-l">Pending Invoices</div><div className="kpi-v bad">9</div><div className="kpi-s">₹21.6L outstanding</div></div>
          <div className="kpi glow-warn"><div className="kpi-l">Overdue (&gt;30d)</div><div className="kpi-v warn">2</div><div className="kpi-s">₹1.3L</div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Paid This Month</div><div className="kpi-v ok">19</div><div className="kpi-s">₹45.3L cleared</div></div>
          <div className="kpi glow-info"><div className="kpi-l">Avg Payment Cycle</div><div className="kpi-v">24<span className="kpi-u">days</span></div></div>
        </div>
        <div className="card">
          <div className="ch">
            <div><div className="ct">Pending Invoices</div></div>
            <span className="ca" onClick={() => handleAction('Exporting invoice list...')}>Export XLSX →</span>
          </div>
          <div className="cb" style={{ padding: 0 }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Days Outstanding</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>INV-2026-0442</td><td>CoolTech HVAC</td><td>₹1,50,000</td><td>01 May</td><td>31 May</td><td>8</td><td><span class="badge badge-amber">Approved</span></td></tr>
                <tr><td>INV-2026-0438</td><td>CleanBuild FM</td><td>₹3,00,000</td><td>25 Apr</td><td>25 May</td><td>14</td><td><span class="badge badge-green">Paid</span></td></tr>
                <tr><td>INV-2026-0421</td><td>SparkElec</td><td>₹98,000</td><td>15 Apr</td><td>15 May</td><td style={{ color: 'var(--warn)' }}>24</td><td><span class="badge badge-amber">Approved</span></td></tr>
                <tr><td>INV-2026-0408</td><td>LiftPro India</td><td>₹80,000</td><td>08 Apr</td><td>08 May</td><td style={{ color: 'var(--bad)' }}>31</td><td><span class="badge badge-red">Overdue</span></td></tr>
                <tr><td>INV-2026-0401</td><td>AquaPure</td><td>₹50,000</td><td>01 Apr</td><td>01 May</td><td style={{ color: 'var(--bad)' }}>38</td><td><span class="badge badge-red">Overdue</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= TAB 3: SCORECARDS ================= */}
      <div className={`tab-panel ${activeTab === 3 ? 'active' : ''}`} data-page="vendor" data-tab="3" style={{ display: activeTab === 3 ? 'block' : 'none' }}>
        <div className="kpi-strip mb-14" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="kpi glow-ok"><div className="kpi-l">Portfolio Avg Score</div><div className="kpi-v ok">84<span className="kpi-u">%</span></div></div>
          <div className="kpi glow-ok"><div className="kpi-l">Top Performer</div><div className="kpi-v ok" style={{ fontSize: '14px' }}>SolarMax</div><div className="kpi-s">97% score</div></div>
          <div className="kpi glow-bad"><div className="kpi-l">Under Review</div><div className="kpi-v bad">1</div><div className="kpi-s">CleanBuild FM</div></div>
          <div className="kpi glow-info"><div className="kpi-l">Next Review</div><div className="kpi-v">Q3 2026</div></div>
        </div>
        <div className="card">
          <div className="ch"><div><div className="ct">Vendor Scorecards — Q1 2026</div></div></div>
          <div className="cb">
            <div className="i-bar"><div className="i-bar-lbl">SolarMax Energy</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '97%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>97%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">SecureEye CCTV</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '95%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>95%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">FireGuard Systems</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '92%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>92%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">CoolTech HVAC</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '91%', background: 'var(--ok)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--ok)' }}>91%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">LiftPro India</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '88%', background: 'var(--info)' }}></div></div><div className="i-bar-val">88%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">SparkElec Services</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '78%', background: 'var(--warn)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--warn)' }}>78%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">AquaPure Water</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '75%', background: 'var(--warn)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--warn)' }}>75%</div></div>
            <div className="i-bar"><div className="i-bar-lbl">CleanBuild FM</div><div className="i-bar-track"><div className="i-bar-fill" style={{ width: '67%', background: 'var(--bad)' }}></div></div><div className="i-bar-val" style={{ color: 'var(--bad)' }}>67%</div></div>
          </div>
        </div>
      </div>

    </div>
  );
}