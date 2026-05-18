import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .nv-root {
    background-color: #000000;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }

  .scanlines {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 50;
  }

  /* Header */
  .nv-header {
    background-color: #131313;
    border-bottom: 1px solid #434938;
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 40;
  }
  .nv-header-inner {
    display: flex; justify-content: space-between; align-items: center;
    width: 100%; padding: 0 24px; height: 80px;
    max-width: 1280px; margin: 0 auto;
  }
  .nv-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 64px; line-height: 1.1; letter-spacing: 4px; font-weight: 700;
    color: #b5e75d;
    font-size: clamp(20px, 3vw, 32px);
    letter-spacing: 2px;
  }
  .nv-nav { display: flex; gap: 48px; align-items: center; }
  .nv-nav a {
    color: #c3c9b3; text-decoration: none;
    font-size: 12px; line-height: 1.2; letter-spacing: 1px; font-weight: 600;
    font-family: 'Inter', sans-serif; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nv-nav a:hover { color: #b5e75d; }
  .nv-cmd-btn {
    background-color: #b5e75d; color: #466700;
    padding: 12px 24px;
    font-size: 12px; letter-spacing: 1px; font-weight: 700; font-family: 'Inter', sans-serif;
    text-transform: uppercase; letter-spacing: 0.15em;
    border: none; cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
  }
  .nv-cmd-btn:hover { opacity: 0.8; }
  .nv-cmd-btn:active { transform: scale(0.95); }

  /* Hero */
  .nv-hero {
    position: relative; width: 100%; height: 600px;
    display: flex; align-items: center; overflow: hidden;
    border-bottom: 1px solid #434938;
    margin-top: 80px;
  }
  .nv-hero-bg {
    position: absolute; inset: 0; z-index: 0;
  }
  .nv-hero-bg img {
    width: 100%; height: 100%; object-fit: cover; opacity: 0.4;
  }
  .nv-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, #000000, rgba(0,0,0,0.8), transparent);
  }
  .nv-hero-content {
    position: relative; z-index: 10;
    max-width: 1280px; margin: 0 auto; padding: 0 24px; width: 100%;
  }
  .nv-status-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 4px 12px;
    background: rgba(181,231,93,0.1); border: 1px solid #b5e75d;
    margin-bottom: 24px;
  }
  .nv-pulse {
    width: 8px; height: 8px; border-radius: 50%; background: #dc2626;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .nv-status-text {
    color: #b5e75d; font-size: 12px; letter-spacing: 0.2em; font-weight: 600;
    font-family: 'Inter', sans-serif; text-transform: uppercase;
  }
  .nv-hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(40px, 6vw, 64px); line-height: 1.1; letter-spacing: 4px; font-weight: 700;
    color: #b5e75d; margin-bottom: 24px; max-width: 750px;
  }
  .nv-hero-desc {
    font-size: 18px; line-height: 1.6; color: #c3c9b3;
    max-width: 672px; margin-bottom: 48px; font-family: 'Inter', sans-serif;
  }
  .nv-coords-row { display: flex; gap: 8px; align-items: center; }
  .nv-coords-line { width: 48px; height: 2px; background: #b5e75d; margin-top: 4px; }
  .nv-coords-text {
    font-size: 12px; letter-spacing: 0.3em; font-weight: 600;
    color: #b5e75d; text-transform: uppercase; font-family: 'Inter', sans-serif;
  }

  /* Crosshair brackets */
  .bracket-tl { position: absolute; top: 32px; left: 32px; width: 16px; height: 16px; border-top: 2px solid #b5e75d; border-left: 2px solid #b5e75d; }
  .bracket-tr { position: absolute; top: 32px; right: 32px; width: 16px; height: 16px; border-top: 2px solid #b5e75d; border-right: 2px solid #b5e75d; }
  .bracket-bl { position: absolute; bottom: 32px; left: 32px; width: 16px; height: 16px; border-bottom: 2px solid #b5e75d; border-left: 2px solid #b5e75d; }
  .bracket-br { position: absolute; bottom: 32px; right: 32px; width: 16px; height: 16px; border-bottom: 2px solid #b5e75d; border-right: 2px solid #b5e75d; }

  /* Benefits */
  .nv-benefits {
    padding: 80px 0; background: #0e0e0e;
  }
  .nv-section-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
  .nv-section-header {
    margin-bottom: 48px; border-left: 4px solid #b5e75d; padding-left: 24px;
  }
  .nv-section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 40px; line-height: 1.2; letter-spacing: 2px; font-weight: 700;
    color: #e5e2e1; margin-bottom: 4px; text-transform: uppercase;
  }
  .nv-section-sub {
    color: #c3c9b3; font-size: 12px; letter-spacing: 1px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.2em; font-family: 'Inter', sans-serif;
  }
  .nv-grid-3 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;
  }
  .nv-card {
    background: #1b1b1b; border: 1px solid #434938;
    padding: 24px; position: relative;
    transition: border-color 0.3s;
    cursor: default;
  }
  .nv-card:hover { border-color: #b5e75d; }
  .nv-card:hover .nv-card-dot { opacity: 1; }
  .nv-card-icon {
    margin-bottom: 24px;
    font-family: 'Material Symbols Outlined'; font-size: 36px; color: #b5e75d;
  }
  .nv-card-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; line-height: 1.3; letter-spacing: 1px; font-weight: 600;
    color: #b5e75d; margin-bottom: 12px; text-transform: uppercase;
  }
  .nv-card-body {
    color: #c3c9b3; font-size: 16px; line-height: 1.5; margin-bottom: 24px;
    font-family: 'Inter', sans-serif;
  }
  .nv-card-tag {
    color: #b5e75d; font-size: 12px; letter-spacing: 1px; font-weight: 600;
    display: flex; align-items: center; gap: 4px; text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }
  .nv-card-tag .material-symbols-outlined { font-size: 14px; }
  .nv-card-dot {
    position: absolute; bottom: 8px; right: 8px;
    width: 8px; height: 8px; background: #b5e75d;
    opacity: 0; transition: opacity 0.3s;
  }

  /* Console / Form */
  .nv-console-section { padding: 80px 0; background: #000000; position: relative; }
  .nv-console-box {
    border: 1px solid #434938; background: #0e0e0e;
    padding: 24px; position: relative; overflow: hidden;
  }
  @media (min-width: 768px) { .nv-console-box { padding: 80px; } }
  .nv-console-header {
    display: flex; flex-direction: column; gap: 24px;
    justify-content: space-between; align-items: flex-start;
    margin-bottom: 48px; padding-bottom: 24px; border-bottom: 1px solid #434938;
  }
  @media (min-width: 768px) { .nv-console-header { flex-direction: row; align-items: flex-end; } }
  .nv-console-label {
    font-size: 12px; letter-spacing: 0.4em; color: #b5e75d;
    margin-bottom: 4px; text-transform: uppercase; font-family: 'Inter', sans-serif; font-weight: 600;
  }
  .nv-console-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 40px; line-height: 1; letter-spacing: 2px; font-weight: 700;
    color: #e5e2e1; text-transform: uppercase;
  }
  .nv-transmission { text-align: right; }
  .nv-transmission-label {
    font-size: 12px; letter-spacing: 1px; color: #c3c9b3;
    margin-bottom: 4px; font-family: 'Inter', sans-serif; text-transform: uppercase;
  }
  .nv-bars { display: flex; gap: 4px; height: 8px; justify-content: flex-end; }
  .nv-bar { width: 16px; }
  .nv-bar-active { background: #b5e75d; }
  .nv-bar-inactive { background: rgba(222,255,164,0.2); }

  /* Progress */
  .nv-progress-wrap { margin-bottom: 80px; }
  .nv-progress-labels {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
  }
  .nv-progress-pct {
    font-size: 12px; letter-spacing: 0.2em; color: #b5e75d;
    font-family: 'Inter', sans-serif; font-weight: 600; text-transform: uppercase;
  }
  .nv-progress-step { font-size: 12px; letter-spacing: 1px; color: #c3c9b3; font-family: 'Inter', sans-serif; }
  .nv-progress-track {
    width: 100%; height: 4px; background: #2a2a2a; position: relative;
  }
  .nv-progress-fill {
    position: absolute; left: 0; top: 0; height: 100%;
    width: 33.33%; background: #b5e75d;
    box-shadow: 0 0 15px rgba(181,231,93,0.3);
  }

  /* Form Steps */
  .nv-step-grid {
    display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start;
  }
  @media (min-width: 768px) { .nv-step-grid { grid-template-columns: 4fr 8fr; } }
  .nv-step-num {
    display: flex; align-items: center; gap: 12px; margin-bottom: 4px;
  }
  .nv-step-num-label { color: #b5e75d; font-weight: 700; font-family: 'Inter', sans-serif; }
  .nv-step-locked .nv-step-num-label { color: #c3c9b3; }
  .nv-step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; letter-spacing: 1px; font-weight: 600;
    color: #e5e2e1; text-transform: uppercase;
  }
  .nv-step-desc {
    color: #c3c9b3; font-size: 12px; letter-spacing: 1px; line-height: 1.6;
    text-transform: uppercase; font-family: 'Inter', sans-serif;
  }
  .nv-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .nv-field-full { grid-column: 1 / -1; }
  .nv-field { display: flex; flex-direction: column; gap: 4px; }
  .nv-field label {
    font-size: 12px; letter-spacing: 1px; color: #c3c9b3;
    text-transform: uppercase; font-family: 'Inter', sans-serif; font-weight: 600;
  }
  .nv-input {
    background: #000000; border: 1px solid #8d937f;
    padding: 12px 24px; color: #e5e2e1; font-family: 'Inter', sans-serif; font-size: 16px;
    outline: none; transition: border-color 0.2s;
  }
  .nv-input::placeholder { color: #353535; }
  .nv-input:focus { border-color: #b5e75d; }
  .nv-input-locked {
    background: #1b1b1b; border: 1px solid #434938;
    padding: 12px 24px; color: #c3c9b3; font-family: 'Inter', sans-serif; font-size: 16px;
    cursor: not-allowed;
  }
  .nv-select {
    background: #000000; border: 1px solid #8d937f;
    padding: 12px 24px; color: #e5e2e1; font-family: 'Inter', sans-serif; font-size: 12px;
    letter-spacing: 1px; font-weight: 600; text-transform: uppercase;
    outline: none; cursor: pointer; width: 100%; transition: border-color 0.2s;
  }
  .nv-select:focus { border-color: #b5e75d; }
  .nv-divider { height: 1px; background: #434938; width: 100%; margin: 0; }
  .nv-step-locked { opacity: 0.6; }

  .nv-form-action {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 80px; border-top: 1px solid #434938;
  }
  .nv-uplink {
    display: flex; gap: 8px; align-items: center;
  }
  .nv-uplink-icon {
    font-family: 'Material Symbols Outlined'; color: #b5e75d;
    animation: pulse 2s infinite; font-size: 24px;
  }
  .nv-uplink-text {
    font-size: 12px; letter-spacing: 0.2em; color: #c3c9b3;
    text-transform: uppercase; font-family: 'Inter', sans-serif; font-weight: 600;
  }
  .nv-transmit-btn {
    background: #b5e75d; color: #466700;
    padding: 24px 80px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; line-height: 1.3; letter-spacing: 1px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
    border: none; cursor: pointer;
    box-shadow: 0 0 15px rgba(181,231,93,0.3);
    transition: background 0.2s;
  }
  .nv-transmit-btn:hover { background: #9fcf45; }

  .nv-console-bg-text {
    position: absolute; top: 16px; right: 16px;
    color: #b5e75d; opacity: 0.2; font-family: 'Inter', monospace; font-size: 10px;
    line-height: 1.5; text-align: right;
  }

  /* Map */
  .nv-map-section { height: 400px; position: relative; }
  .nv-map-bg {
    position: absolute; inset: 0; background: #0e0e0e;
  }
  .nv-map-bg img {
    width: 100%; height: 100%; object-fit: cover;
    filter: grayscale(1); opacity: 0.3; filter: grayscale(1) brightness(0.5);
  }
  .nv-map-gradient {
    position: absolute; inset: 0;
    background: linear-gradient(to top, #000000, transparent);
  }
  .nv-map-content {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .nv-map-card {
    text-align: center; padding: 24px;
    border: 1px solid #b5e75d; background: rgba(0,0,0,0.8);
    backdrop-filter: blur(12px); max-width: 512px;
  }
  .nv-map-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; letter-spacing: 1px; font-weight: 600;
    color: #b5e75d; margin-bottom: 12px; text-transform: uppercase;
  }
  .nv-map-sub {
    font-size: 12px; letter-spacing: 1px; color: #c3c9b3;
    margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.15em;
    font-family: 'Inter', sans-serif;
  }
  .nv-map-stats {
    color: #c3c9b3; font-size: 12px; letter-spacing: 1px;
    text-transform: uppercase; font-family: 'Inter', sans-serif;
  }

  /* Footer */
  .nv-footer {
    background: #0e0e0e; border-top: 1px solid #434938;
  }
  .nv-footer-inner {
    width: 100%; padding: 24px; max-width: 1280px; margin: 0 auto;
    display: flex; flex-direction: column; gap: 8px;
    align-items: center; justify-content: space-between;
  }
  @media (min-width: 768px) { .nv-footer-inner { flex-direction: row; } }
  .nv-footer-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; letter-spacing: 1px; font-weight: 600; color: #b5e75d;
  }
  .nv-footer-copy {
    font-size: 12px; letter-spacing: 1px; color: #c3c9b3;
    text-align: center; max-width: 448px; text-transform: uppercase;
    letter-spacing: 0.05em; font-family: 'Inter', sans-serif;
  }
  .nv-footer-links { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; }
  .nv-footer-links a {
    font-size: 12px; letter-spacing: 1px; color: #46483d; text-decoration: underline;
    font-family: 'Inter', sans-serif; transition: color 0.3s;
  }
  .nv-footer-links a:hover { color: #b5e75d; }

  .nv-space-xl { margin-bottom: 80px; }

  @media (max-width: 767px) {
    .nv-nav { display: none; }
    .nv-fields { grid-template-columns: 1fr; }
    .nv-field-full { grid-column: 1; }
    .nv-form-action { flex-direction: column; gap: 24px; }
    .nv-transmit-btn { padding: 16px 32px; font-size: 18px; width: 100%; }
  }
`;

export default function NightVisionDealer() {
  const [businessType, setBusinessType] = useState("System Integrator");

  return (
    <>
      <style>{styles}</style>
      <div className="nv-root">
        <div className="scanlines" />

        {/* Header */}
        <header className="nv-header">
          <div className="nv-header-inner">
            <div className="nv-logo">NV/// NIGHTVISION™</div>
            <nav className="nv-nav">
              <a href="#">Systems</a>
              <a href="#">Technology</a>
              <a href="#">Partners</a>
              <a href="#">Support</a>
            </nav>
            <button className="nv-cmd-btn">COMMAND CENTER</button>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="nv-hero">
            <div className="nv-hero-bg">
              <img
                alt="Tactical Command Center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUPRhS26umExjOfcRTOysIoKqWNX9KfDYwj9f54LmHckyNhJUg8W1M9l0yJ3bNiRXsqU_9pdl0r6nw63KNsDTceT1zS1HfpxvRh3lt5V_w1e5BpinOMKnanwEFDs9eyCAHsqTYOqGYwisnqxIdYAxXsIe5wtXjU0j4lK9t8FAuWWMNqvmo46DHcO_RtfXgAXvYbo9iYNQEK8_-z-NeEsPH0tDyEEc1U7XTt3unClajb9-ceykXyVy-N7UcY6HNUOFgBoaWCgC88f7G"
              />
            </div>
            <div className="nv-hero-overlay" />
            <div className="nv-hero-content">
              <div className="nv-status-badge">
                <span className="nv-pulse" />
                <span className="nv-status-text">STATUS: RECRUITMENT ACTIVE</span>
              </div>
              <h1 className="nv-hero-title">JOIN THE ELITE NETWORK</h1>
              <p className="nv-hero-desc">
                NV/// NIGHTVISION™ is scaling regional dominance. We are identifying strategic partners to
                deploy advanced surveillance infrastructure across Nepal and the greater tactical landscape.
                Secure your sector.
              </p>
              <div className="nv-coords-row">
                <div className="nv-coords-line" />
                <span className="nv-coords-text">Coordinates: 27.7172° N, 85.3240° E</span>
              </div>
            </div>
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />
          </section>

          {/* Benefits */}
          <section className="nv-benefits">
            <div className="nv-section-inner">
              <div className="nv-section-header">
                <h2 className="nv-section-title">Strategic Advantage</h2>
                <p className="nv-section-sub">Enlistment Incentives</p>
              </div>
              <div className="nv-grid-3">
                {[
                  {
                    icon: "campaign",
                    title: "Strategic Support",
                    body: "Gain access to high-fidelity marketing assets, classified brand guidelines, and co-branded tactical deployment materials.",
                    tag: "terminal",
                    tagText: "ASSETS_READY.EXE",
                  },
                  {
                    icon: "memory",
                    title: "Technical Dominance",
                    body: "Direct channel for advanced firmware overrides, hardware training, and 24/7 priority comms with HQ engineering.",
                    tag: "security",
                    tagText: "PROTOCOL_V2.04",
                  },
                  {
                    icon: "public",
                    title: "Regional Exclusivity",
                    body: "Authorized deployment zones. Protected territories ensure operational supremacy and market share control in your sector.",
                    tag: "location_searching",
                    tagText: "SECTOR_LOCKED",
                  },
                ].map((card, i) => (
                  <div className="nv-card" key={i}>
                    <div className="nv-card-icon">
                      <span className="material-symbols-outlined">{card.icon}</span>
                    </div>
                    <h3 className="nv-card-title">{card.title}</h3>
                    <p className="nv-card-body">{card.body}</p>
                    <div className="nv-card-tag">
                      <span className="material-symbols-outlined">{card.tag}</span>
                      {card.tagText}
                    </div>
                    <div className="nv-card-dot" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Console / Form */}
          <section className="nv-console-section">
            <div className="nv-section-inner">
              <div className="nv-console-box">
                {/* Header */}
                <div className="nv-console-header">
                  <div>
                    <div className="nv-console-label">Tactical Console v2.04</div>
                    <h2 className="nv-console-title">Dealer Enlistment</h2>
                  </div>
                  <div className="nv-transmission">
                    <div className="nv-transmission-label">TRANSMISSION_STRENGTH</div>
                    <div className="nv-bars">
                      {[true, true, true, false, false].map((active, i) => (
                        <div key={i} className={`nv-bar ${active ? "nv-bar-active" : "nv-bar-inactive"}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="nv-progress-wrap">
                  <div className="nv-progress-labels">
                    <span className="nv-progress-pct">Enlistment Progress: 33%</span>
                    <span className="nv-progress-step">Step 01 / 03</span>
                  </div>
                  <div className="nv-progress-track">
                    <div className="nv-progress-fill" />
                  </div>
                </div>

                {/* Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>

                  {/* Step 1 */}
                  <div className="nv-step-grid">
                    <div>
                      <div className="nv-step-num">
                        <span className="nv-step-num-label">01</span>
                        <h3 className="nv-step-title">ENTITY INTEL</h3>
                      </div>
                      <p className="nv-step-desc">Identify your legal operational entity for background verification.</p>
                    </div>
                    <div className="nv-fields">
                      <div className="nv-field">
                        <label>Company Name</label>
                        <input className="nv-input" type="text" placeholder="SEC_CORP_INTL" />
                      </div>
                      <div className="nv-field">
                        <label>Registration #</label>
                        <input className="nv-input" type="text" placeholder="VAT_REG_2024_00" />
                      </div>
                      <div className="nv-field nv-field-full">
                        <label>Business Type</label>
                        <select
                          className="nv-select"
                          value={businessType}
                          onChange={e => setBusinessType(e.target.value)}
                        >
                          <option>System Integrator</option>
                          <option>Value Added Reseller</option>
                          <option>Retail Specialist</option>
                          <option>Government Contractor</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="nv-divider" />

                  {/* Step 2 */}
                  <div className="nv-step-grid nv-step-locked">
                    <div>
                      <div className="nv-step-num">
                        <span className="nv-step-num-label" style={{ color: "#c3c9b3" }}>02</span>
                        <h3 className="nv-step-title">OPERATIONAL REACH</h3>
                      </div>
                      <p className="nv-step-desc">Submit historical data on your market influence and logistics capacity.</p>
                    </div>
                    <div className="nv-fields">
                      <div className="nv-field">
                        <label>Current Locations</label>
                        <input className="nv-input-locked" disabled placeholder="[LOCKED]" />
                      </div>
                      <div className="nv-field">
                        <label>Annual Turnover (USD)</label>
                        <input className="nv-input-locked" disabled placeholder="[LOCKED]" />
                      </div>
                      <div className="nv-field nv-field-full">
                        <label>Years in Industry</label>
                        <input className="nv-input-locked" disabled placeholder="[LOCKED]" />
                      </div>
                    </div>
                  </div>

                  <div className="nv-divider" />

                  {/* Step 3 */}
                  <div className="nv-step-grid nv-step-locked">
                    <div>
                      <div className="nv-step-num">
                        <span className="nv-step-num-label" style={{ color: "#c3c9b3" }}>03</span>
                        <h3 className="nv-step-title">TARGET DEPLOYMENT</h3>
                      </div>
                      <p className="nv-step-desc">Propose deployment zone and warehousing strategy.</p>
                    </div>
                    <div className="nv-fields">
                      <div className="nv-field">
                        <label>Proposed Region</label>
                        <input className="nv-input-locked" disabled placeholder="[LOCKED]" />
                      </div>
                      <div className="nv-field">
                        <label>Warehouse Capacity (m²)</label>
                        <input className="nv-input-locked" disabled placeholder="[LOCKED]" />
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="nv-form-action">
                    <div className="nv-uplink">
                      <span className="nv-uplink-icon material-symbols-outlined">sensors</span>
                      <span className="nv-uplink-text">Ready for uplink</span>
                    </div>
                    <button className="nv-transmit-btn" type="button">TRANSMIT APPLICATION</button>
                  </div>
                </div>

                {/* BG text accent */}
                <div className="nv-console-bg-text">
                  PROTOCOL: 44-X9<br />
                  ENC_TYPE: AES-256<br />
                  UPLINK: ACTIVE
                </div>
              </div>
            </div>
          </section>

          {/* Map */}
          <section className="nv-map-section">
            <div className="nv-map-bg">
              <img
                alt="Satellite view"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG1JJSnMnM41UXCjatjhnen3O8mVmgfijjDjNq-Z8_lEA5j7d5zEIgyCPhAjFuelpvmcziKD-hNMmcrmU3jXV9wfpUYuVOOivhZkl8H-KO23uO8j0BBX2vlHngSro5RMFw20teGnCerZNDISdyvEiWx-Av834j7Et1VfCTsqYOcXQ1jHjjgFn51pRdqRFUjmunyvpL7xqTp4Fqb0swEb2MV6i8AHi4Ztg4266ALk6DXiRGRIJWrlJ2zzhlb-8iODv65B01DOLsyOLX"
              />
            </div>
            <div className="nv-map-gradient" />
            <div className="nv-map-content">
              <div className="nv-map-card">
                <h4 className="nv-map-title">Global HQ - Kathmandu Sector</h4>
                <p className="nv-map-sub">PHASE 02 DEPLOYMENT: KATHMANDU, POKHARA, BUTWAL, BIRATNAGAR</p>
                <div className="nv-map-stats">Active Support Hubs: 12 | Regional Dealers: 04</div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        
      </div>
    </>
  );
}