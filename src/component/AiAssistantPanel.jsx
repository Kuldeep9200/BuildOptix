import React, { useState, useRef, useEffect } from "react";

export default function AiAssistantPanel() {
  // Panel States
  const [aiOpen, setAiOpen] = useState(false);
  const [isMaxed, setIsMaxed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    model: "balanced", // 'balanced' | 'fast' | 'reasoning'
    tone: "balanced", // 'concise' | 'balanced' | 'detailed'
    ctx: {
      site: true,
      screen: true,
      today: false,
    },
    proactive: true,
    voice: false,
    history: true,
  });

  // Messages State
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: (
        <>
          Hi! I'm your <b>BuildOptix AI</b> — I have live context across all
          your equipment, energy, alarms, and SLA status at Vikhroli.
          <br />
          <br />
          Pick a quick action on the left, or ask me anything.
        </>
      ),
    },
    {
      sender: "ai",
      text: (
        <>
          <b style={{ color: "var(--bad)" }}>⚠ 3 items need attention now:</b>
          <div className="ai-kpi-inline">
            <div className="ai-kpi-chip">
              <div className="ck-l">Lift-04</div>
              <div className="ck-v bad">Door Fault</div>
            </div>
            <div className="ai-kpi-chip">
              <div className="ck-l">SLA</div>
              <div className="ck-v warn">2 at risk</div>
            </div>
            <div className="ai-kpi-chip">
              <div className="ck-l">PP-03</div>
              <div className="ck-v warn">Vibration</div>
            </div>
          </div>
        </>
      ),
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle Handlers
  const toggleAI = () => setAiOpen(!aiOpen);
  const aiToggleMax = () => setIsMaxed(!isMaxed);
  const toggleAISettings = () => setShowSettings(!showSettings);

  const aiNewChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "New session started. How can I assist with Vikhroli operations today?",
      },
    ]);
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // Add User Message
    const newMsgs = [...messages, { sender: "user", text: query }];
    setMessages(newMsgs);
    if (!textToSend) setInputVal("");

    // Simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Analyzing: "${query}". All parameters are within normal thresholds for Vikhroli Campus.`,
        },
      ]);
    }, 600);
  };

  const aiClearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "Conversation cleared. How can I help with Vikhroli operations?",
      },
    ]);
    setShowSettings(false);
  };

  const aiExportChat = () => {
    const txt = messages
      .map((m) => {
        const role = m.sender === "user" ? "You" : "AI";
        // Simple extraction for text if it's JSX/string
        const textContent =
          typeof m.text === "string"
            ? m.text
            : "Detailed status update / KPI alerts.";
        return `${role}: ${textContent}`;
      })
      .join("\n\n");

    const blob = new Blob([`BuildOptix AI — transcript\n\n${txt}`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "buildoptix-ai-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Model Hint Mapping
  const modelHints = {
    balanced:
      "Balanced · best mix of speed and depth for everyday ops questions.",
    fast: "Fast · quickest replies, lighter reasoning — great for lookups.",
    reasoning:
      "Reasoning · deep multi-step analysis for complex diagnostics.",
  };

  return (
    <>
      {/* Maximized Backdrop/Dimmer */}
      <div id="aiMaxDim" className={`ai-max-dim ${aiOpen && isMaxed ? "on" : ""}`} />

      {/* Main Container */}
      <div className={`ai-bar ${aiOpen ? "open" : ""}`} id="aiBar">
        {/* Collapsed Pill */}
        <div
          className="ai-pill"
          id="aiPill"
          onClick={toggleAI}
          title="Open AI Assistant"
        >
          <div className="ai-pill-icon">
            <svg
              className="bo-robot-svg ai-robot-sm"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
            >
              <line x1="32" y1="4" x2="32" y2="12" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="robot-antenna-dot" cx="32" cy="3.5" r="2.5" fill="#A78BFA" />
              <g className="robot-head-group">
                <rect x="18" y="12" width="28" height="22" rx="7" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1.5" />
                <rect x="21" y="15" width="22" height="13" rx="4" fill="#0C1828" stroke="#34D2E6" strokeWidth="1" opacity="0.9" />
                <circle className="robot-eye-l" cx="27" cy="21.5" r="3.2" fill="#34D2E6" />
                <circle cx="28" cy="20.6" r="0.9" fill="white" opacity="0.85" />
                <circle className="robot-eye-r" cx="37" cy="21.5" r="3.2" fill="#34D2E6" />
                <circle cx="38" cy="20.6" r="0.9" fill="white" opacity="0.85" />
                <path d="M27.5 26.5 Q32 28.8 36.5 26.5" stroke="#4EA1FF" strokeWidth="1.6" strokeLinecap="round" />
                <circle className="robot-ear-l" cx="17" cy="22" r="2.8" fill="#F5B441" opacity="0.9" />
                <circle className="robot-ear-r" cx="47" cy="22" r="2.8" fill="#22D67A" opacity="0.9" />
              </g>
              <rect x="29" y="34" width="6" height="4" rx="2" fill="#243757" />
              <rect x="16" y="38" width="32" height="20" rx="6" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1.2" />
              <rect x="24" y="42" width="16" height="10" rx="3" fill="#0C1828" stroke="#34D2E6" strokeWidth="0.8" />
              <circle className="robot-chest-glow" cx="32" cy="47" r="3.5" fill="#4EA1FF" opacity="0.85" />
              <rect className="robot-arm-l" x="9" y="39" width="6" height="14" rx="3" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1" />
              <rect className="robot-arm-r" x="49" y="39" width="6" height="14" rx="3" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1" />
              <rect x="20" y="57" width="8" height="5" rx="2.5" fill="#1C2E4A" stroke="#243757" strokeWidth="1" />
              <rect x="36" y="57" width="8" height="5" rx="2.5" fill="#1C2E4A" stroke="#243757" strokeWidth="1" />
            </svg>
          </div>
          <span className="ai-pill-name">
            AI<span style={{ fontSize: "9.5px", color: "rgba(167,139,250,0.6)", marginLeft: "2px" }}>·</span>
          </span>
          <div className="ai-pill-badge" id="aiAlertBadge">3</div>
          <div className="ai-pill-chevron" id="aiChevron"><i className="ti ti-chevron-up"></i></div>
        </div>
      </div>

      {/* AI Panel */}
      <div
        className={`ai-panel ${aiOpen ? "open" : ""} ${isMaxed ? "maximized" : ""}`}
        id="aiPanel"
        role="complementary"
        aria-label="AI Assistant"
      >
        {/* Header */}
        <div className="ai-header">
          <div className="ai-header-logo">
            <svg
              className="bo-robot-svg ai-robot-md"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
            >
              <line x1="32" y1="4" x2="32" y2="12" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="robot-antenna-dot" cx="32" cy="3.5" r="2.5" fill="#A78BFA" />
              <g className="robot-head-group">
                <rect x="18" y="12" width="28" height="22" rx="7" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1.5" />
                <rect x="21" y="15" width="22" height="13" rx="4" fill="#0C1828" stroke="#34D2E6" strokeWidth="1" opacity="0.9" />
                <circle className="robot-eye-l" cx="27" cy="21.5" r="3.2" fill="#34D2E6" />
                <circle cx="28" cy="20.6" r="0.9" fill="white" opacity="0.85" />
                <circle className="robot-eye-r" cx="37" cy="21.5" r="3.2" fill="#34D2E6" />
                <circle cx="38" cy="20.6" r="0.9" fill="white" opacity="0.85" />
                <path d="M27.5 26.5 Q32 28.8 36.5 26.5" stroke="#4EA1FF" strokeWidth="1.6" strokeLinecap="round" />
                <circle className="robot-ear-l" cx="17" cy="22" r="2.8" fill="#F5B441" opacity="0.9" />
                <circle className="robot-ear-r" cx="47" cy="22" r="2.8" fill="#22D67A" opacity="0.9" />
              </g>
              <rect x="29" y="34" width="6" height="4" rx="2" fill="#243757" />
              <rect x="16" y="38" width="32" height="20" rx="6" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1.2" />
              <rect x="24" y="42" width="16" height="10" rx="3" fill="#0C1828" stroke="#34D2E6" strokeWidth="0.8" />
              <circle className="robot-chest-glow" cx="32" cy="47" r="3.5" fill="#4EA1FF" opacity="0.85" />
              <rect className="robot-arm-l" x="9" y="39" width="6" height="14" rx="3" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1" />
              <rect className="robot-arm-r" x="49" y="39" width="6" height="14" rx="3" fill="#1C2E4A" stroke="#4EA1FF" strokeWidth="1" />
              <rect x="20" y="57" width="8" height="5" rx="2.5" fill="#1C2E4A" stroke="#243757" strokeWidth="1" />
              <rect x="36" y="57" width="8" height="5" rx="2.5" fill="#1C2E4A" stroke="#243757" strokeWidth="1" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="ai-header-title" style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              BuildOptix AI
              <span className="ai-live-badge" title="Connected to the live AI assistant">
                <span className="ai-live-badge-dot"></span>Live
              </span>
            </div>
            <div className="ai-header-sub">
              <span className="ai-live-dot" aria-hidden="true"></span>
              Live · Vikhroli Campus · All systems
            </div>
          </div>

          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div className={`ai-ctx-pill ${settings.ctx.site ? "active" : ""}`}>
              <i className="ti ti-building" style={{ fontSize: "9px" }} aria-hidden="true"></i>Vikhroli
            </div>
            <div className={`ai-ctx-pill ${settings.ctx.screen ? "active" : ""}`} id="ai-ctx-screen">
              <i className="ti ti-cpu" style={{ fontSize: "9px" }} aria-hidden="true"></i>Chiller Plant
            </div>
            <div className={`ai-ctx-pill ${settings.ctx.today ? "active" : ""}`}>
              <i className="ti ti-calendar" style={{ fontSize: "9px" }} aria-hidden="true"></i>Today
            </div>
          </div>

          <div
            className="ai-hbtn"
            id="aiNewChatBtn"
            onClick={aiNewChat}
            tabIndex={0}
            role="button"
            aria-label="New chat"
            title="New chat"
          >
            <i className="ti ti-edit" aria-hidden="true"></i>
          </div>
          <div
            className="ai-hbtn"
            id="aiMaxBtn"
            onClick={aiToggleMax}
            tabIndex={0}
            role="button"
            aria-label="Expand panel"
            title="Expand"
          >
            <i className={`ti ${isMaxed ? "ti-arrows-minimize" : "ti-arrows-maximize"}`} aria-hidden="true"></i>
          </div>
          <div
            className="ai-settings-gear"
            onClick={toggleAISettings}
            tabIndex={0}
            role="button"
            aria-label="AI settings"
            title="AI settings"
          >
            <i className="ti ti-adjustments-horizontal" aria-hidden="true"></i>
          </div>
          <div
            className="ai-close"
            onClick={toggleAI}
            tabIndex={0}
            role="button"
            aria-label="Close AI panel"
          >
            <i className="ti ti-x" aria-hidden="true"></i>
          </div>
        </div>

        {/* Body */}
        <div className="ai-body">
          {/* Quick actions sidebar */}
          <div className="ai-sidebar">
            <div className="ai-sidebar-l"><i className="ti ti-dashboard"></i>Dashboard</div>
            <div className="ai-qa" onClick={() => handleSend("What anomalies are active right now?")}>
              <i className="ti ti-scan" style={{ color: "var(--bad)" }}></i>Active anomalies
            </div>
            <div className="ai-qa" onClick={() => handleSend("Show me SLA breach risk today")}>
              <i className="ti ti-clipboard-check" style={{ color: "var(--warn)" }}></i>SLA risk today
            </div>
            <div className="ai-qa" onClick={() => handleSend("Give me a full health summary of all equipment")}>
              <i className="ti ti-heart-rate-monitor" style={{ color: "var(--ok)" }}></i>Equipment health
            </div>

            <div className="ai-sidebar-l" style={{ marginTop: "6px" }}><i className="ti ti-bolt"></i>Energy</div>
            <div className="ai-qa" onClick={() => handleSend("Summarise energy performance today")}>
              <i className="ti ti-chart-bar" style={{ color: "var(--solar)" }}></i>Energy summary
            </div>
            <div className="ai-qa" onClick={() => handleSend("What are the 3 biggest energy saving opportunities?")}>
              <i className="ti ti-leaf" style={{ color: "var(--ok)" }}></i>Savings opportunities
            </div>
            <div className="ai-qa" onClick={() => handleSend("What is today forecasted energy cost and how can we reduce it?")}>
              <i className="ti ti-currency-rupee" style={{ color: "var(--warn)" }}></i>Cost forecast
            </div>

            <div className="ai-sidebar-l" style={{ marginTop: "6px" }}><i className="ti ti-snowflake"></i>Chiller Plant</div>
            <div className="ai-qa" onClick={() => handleSend("Give me a full health summary of all chiller plant equipment")}>
              <i className="ti ti-heart-rate-monitor" style={{ color: "var(--cool)" }}></i>Plant health
            </div>
            <div className="ai-qa" onClick={() => handleSend("PMP-01 vibration anomaly — is this cavitation?")}>
              <i className="ti ti-droplet-half" style={{ color: "var(--info)" }}></i>PMP-01 vibration
            </div>

            <div className="ai-sidebar-l" style={{ marginTop: "6px" }}><i className="ti ti-tool"></i>Maintenance</div>
            <div className="ai-qa" onClick={() => handleSend("Which equipment needs maintenance this week?")}>
              <i className="ti ti-tool" style={{ color: "var(--violet)" }}></i>PM this week
            </div>
            <div className="ai-qa" onClick={() => handleSend("Generate daily operations summary")}>
              <i className="ti ti-file-analytics" style={{ color: "var(--info)" }}></i>Daily ops report
            </div>
            <div className="ai-qa" onClick={() => handleSend("Compliance status for Health and Safety")}>
              <i className="ti ti-shield-check" style={{ color: "var(--ok)" }}></i>H&amp;S compliance
            </div>
          </div>

          {/* Messages */}
          <div className="ai-messages" id="aiMessages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.sender}`}>
                <div className="ai-msg-avatar">
                  <i className={`ti ${m.sender === "user" ? "ti-user" : "ti-brain"}`} style={{ fontSize: "13px" }}></i>
                </div>
                <div className="ai-bubble">{m.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="ai-input-area">
          <div className="ai-input-wrap">
            <i className="ti ti-message-circle" style={{ fontSize: "15px", color: "var(--ai)", opacity: 0.6, flexShrink: 0, marginBottom: "1px" }}></i>
            <textarea
              id="aiInput"
              placeholder="Ask about any system, alarm, energy, or trend…"
              rows="1"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            ></textarea>
            <div className="ai-send" onClick={() => handleSend()}>
              <i className="ti ti-send" style={{ fontSize: "13px" }}></i>
            </div>
          </div>
          <div style={{ marginTop: "6px", fontSize: "9.5px", color: "var(--ink-4)", textAlign: "center", fontFamily: "var(--font-mono)" }}>
            Powered by BuildOptix AI · Context: Vikhroli · All pages
          </div>
        </div>

        {/* ══ AI SETTINGS OVERLAY ══ */}
        <div className={`ai-settings ${showSettings ? "open" : ""}`} id="aiSettings" aria-label="AI settings">
          <div className="ai-settings-head">
            <div className="ai-settings-title"><i className="ti ti-adjustments-horizontal"></i>AI Assistant Settings</div>
            <div className="ai-settings-back" onClick={toggleAISettings} tabindex="0" role="button" aria-label="Back to chat">
              <i className="ti ti-arrow-left"></i>Back to chat
            </div>
          </div>
          <div className="ai-settings-body">

            {/* Model Selection */}
            <div className="set-group">
              <div className="set-group-l">Model</div>
              <div className="set-seg" id="ai-model-seg">
                {["balanced", "fast", "reasoning"].map((m) => (
                  <button
                    key={m}
                    className={`set-seg-btn ${settings.model === m ? "active" : ""}`}
                    onClick={() => setSettings((s) => ({ ...s, model: m }))}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
              <div className="set-hint" id="ai-model-hint">{modelHints[settings.model]}</div>
            </div>

            {/* Response Style */}
            <div className="set-group">
              <div className="set-group-l">Response style</div>
              <div className="set-seg" id="ai-tone-seg">
                {["concise", "balanced", "detailed"].map((t) => (
                  <button
                    key={t}
                    className={`set-seg-btn ${settings.tone === t ? "active" : ""}`}
                    onClick={() => setSettings((s) => ({ ...s, tone: t }))}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Context Sources */}
            <div className="set-group">
              <div className="set-group-l">Live context sources</div>
              <div className="set-row">
                <div className="set-row-tx">
                  <i className="ti ti-building" style={{ color: "var(--info)" }}></i>Site &amp; campus data
                  <span>Vikhroli — equipment, energy, alarms</span>
                </div>
                <div
                  className={`toggle ${!settings.ctx.site ? "off" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, ctx: { ...s.ctx, site: !s.ctx.site } }))}
                  role="switch"
                  aria-checked={settings.ctx.site}
                ></div>
              </div>

              <div className="set-row">
                <div className="set-row-tx">
                  <i className="ti ti-cpu" style={{ color: "var(--cool)" }}></i>Current screen
                  <span>What you're viewing right now</span>
                </div>
                <div
                  className={`toggle ${!settings.ctx.screen ? "off" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, ctx: { ...s.ctx, screen: !s.ctx.screen } }))}
                  role="switch"
                  aria-checked={settings.ctx.screen}
                ></div>
              </div>

              <div className="set-row">
                <div className="set-row-tx">
                  <i className="ti ti-calendar" style={{ color: "var(--gold)" }}></i>Today's timeline
                  <span>Schedules, shifts, work orders</span>
                </div>
                <div
                  className={`toggle ${!settings.ctx.today ? "off" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, ctx: { ...s.ctx, today: !s.ctx.today } }))}
                  role="switch"
                  aria-checked={settings.ctx.today}
                ></div>
              </div>
            </div>

            {/* Behaviour Settings */}
            <div className="set-group">
              <div className="set-group-l">Behaviour</div>
              <div className="set-row">
                <div className="set-row-tx">
                  <i className="ti ti-bolt" style={{ color: "var(--ai)" }}></i>Proactive insights
                  <span>Surface anomalies &amp; risks automatically</span>
                </div>
                <div
                  className={`toggle ${!settings.proactive ? "off" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, proactive: !s.proactive }))}
                  role="switch"
                  aria-checked={settings.proactive}
                ></div>
              </div>

              <div className="set-row">
                <div className="set-row-tx">
                  <i className="ti ti-microphone" style={{ color: "var(--ok)" }}></i>Voice input
                  <span>Dictate questions with the mic</span>
                </div>
                <div
                  className={`toggle ${!settings.voice ? "off" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, voice: !s.voice }))}
                  role="switch"
                  aria-checked={settings.voice}
                ></div>
              </div>

              <div className="set-row">
                <div className="set-row-tx">
                  <i className="ti ti-history" style={{ color: "var(--violet)" }}></i>Save chat history
                  <span>Keep conversations on this device</span>
                </div>
                <div
                  className={`toggle ${!settings.history ? "off" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, history: !s.history }))}
                  role="switch"
                  aria-checked={settings.history}
                ></div>
              </div>
            </div>

            {/* Conversation Actions */}
            <div className="set-group">
              <div className="set-group-l">Conversation</div>
              <button className="set-btn" onClick={aiClearChat}>
                <i className="ti ti-eraser"></i>Clear conversation
              </button>
              <button className="set-btn" onClick={aiExportChat}>
                <i className="ti ti-download"></i>Export transcript
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}