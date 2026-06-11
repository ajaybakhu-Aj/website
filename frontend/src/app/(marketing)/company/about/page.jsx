import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../utils/Icon";
import { useSiteContents } from "../../../../utils/cmsDb";
import PageHeroBanner from "../../../../components/ui/PageHeroBanner";
import TeamSection from "../../../../components/company/TeamSection";

export default function NightVisionAboutPage() {
  const contents = useSiteContents();
  return (
    <>

      <div className="night-vision-container">

        <main className="main-content">

          {/* HERO */}
          <PageHeroBanner
            title={contents.aboutHeroTitle || "ABOUT NIGHTVISION"}
            subtitle={contents.aboutHeroDesc || "Nepal's next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and uncompromising operational reliability."}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
              <Link to="/products" className="hero-btn-primary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.15)", color: "#000000", border: "2px solid #000000", padding: "10px 24px", fontWeight: 700, fontSize: 12, letterSpacing: 1, fontFamily: "'Poppins', sans-serif" }}>
                Explore Systems
              </Link>
              <Link to="/dealership" className="hero-btn-secondary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center", background: "#000000", color: "#94da32", padding: "10px 24px", fontWeight: 700, fontSize: 12, letterSpacing: 1, fontFamily: "'Poppins', sans-serif" }}>
                Contact Sales
              </Link>
            </div>
          </PageHeroBanner>


          {/* STORY */}

          <section className="story-section">

            <div className="story-grid">

              <div className="story-text">

                <h2>
                  {(() => {
                    const title = contents.aboutStoryTitle || "UNCOMPROMISING VIGILANCE";
                    const parts = title.split(/(UNCOMPROMISING)/i);
                    return parts.map((part, i) => {
                      if (part.toLowerCase() === "uncompromising") {
                        return <React.Fragment key={i}>{part}<br /></React.Fragment>;
                      }
                      return part;
                    });
                  })()}
                </h2>

                <p>
                  {contents.aboutStoryDesc1 || "NIGHTVISION™ was founded in Kathmandu with one objective: eliminate the blind spots where security threats survive. Our systems are engineered to deliver maximum visibility, predictive intelligence, and unmatched operational durability."}
                </p>

                <p>
                  {contents.aboutStoryDesc2 || "From AI-powered motion analysis to advanced thermal imaging, we develop surveillance ecosystems that protect thousands of perimeters, commercial facilities, and residential hubs across Nepal."}
                </p>

                <Link to="/products" className="explore-btn" style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}>
                  Explore Our Technology
                </Link>

              </div>

              <div className="story-image-container">

                <div className="story-image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop"
                    alt="Night Vision"
                  />
                </div>

                

              </div>

            </div>

          </section>

          {/* VISION */}

          <section className="vision-mission">

            <div className="vision-grid">

              <div className="vision-card">

                <div className="card-header">
                  <div className="card-icon-realistic">
                    <Icon name="visibility" size={48} />
                  </div>
                  
                </div>

                <h3 className="card-title">
                  OUR VISION
                </h3>

                <p className="card-text">
                  {contents.aboutVision || "To redefine global surveillance standards through intelligent, predictive security systems that actively prevent threats before they happen."}
                </p>

              </div>

              <div className="mission-card">

                <div className="card-header">
                  <div className="card-icon-realistic">
                    <Icon name="security" size={48} />
                  </div>
                </div>

                <h3 className="card-title">
                  OUR MISSION
                </h3>

                <p className="card-text">
                  {contents.aboutMission || "To engineer industrial-grade surveillance ecosystems that combine powerful hardware with intelligent software for unmatched reliability and operational awareness."}
                </p>

              </div>

            </div>

          </section>

          {/* IMAGE BREAK */}

          <section className="image-break">

            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
              alt="Control Room"
            />

            <div className="image-break-text">
              <div className="image-break-title">
                PRECISION. CONTROL.
              </div>

              <div className="image-break-line"></div>
            </div>

          </section>

          {/* VALUES */}

          <section className="values-section">

            <div className="values-container">

              <div className="values-header" style={{ alignItems: "center" }}>

                <div className="values-title-group" style={{ flex: "1", minWidth: "280px" }}>
                  <h2 className="values-title">
                    {contents.aboutPillarsTitle || "THE PILLARS OF NIGHTVISION"}
                  </h2>
                </div>

                <p className="values-side" style={{ maxWidth: "420px", textTransform: "none", fontSize: "14px", color: "#c3c9b3", opacity: "0.85", textAlign: "left", lineHeight: "1.6" }}>
                  {contents.aboutPillarsDesc || "We build corporate partnership relationships on accountability, precision engineering, and the absolute trust that our operator networks will always remain protected."}
                </p>

              </div>

              <div className="values-grid">

                {(contents.aboutPillars || []).map((item, idx) => (
                  <div className="value-card" key={idx}>

                    <div className="value-header">
                      <span className="value-number" style={{ color: "#94da32", fontWeight: "600", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
                      </span>

                      <span className="value-icon" style={{ display: "inline-flex", padding: "8px", borderRadius: "8px", background: "rgba(148, 218, 50, 0.1)", border: "1px solid rgba(148, 218, 50, 0.2)" }}>
                        <Icon name={item.icon} size={20} />
                      </span>
                    </div>

                    <h3 className="value-title" style={{ fontSize: "18px", color: "#ffffff", fontWeight: "700", marginTop: "12px", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h3>

                    <p className="value-text" style={{ fontSize: "13px", color: "#c3c9b3", lineHeight: "1.6", marginTop: "8px", flex: "1" }}>
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* NATIONWIDE DEALERS NETWORK */}

          <section className="about-dealers-section">

            <div className="about-dealers-container">

              <div className="about-dealers-header">
                <span className="about-dealers-tag">Nepal Certified Network</span>
                <h2 className="about-dealers-title">
                  OUR REPRESENTATIVE STATIONS
                </h2>
                <p className="about-dealers-desc">
                  Providing full integration and hardware services across key regions. Click on any certified partner to view their profile, inventory, and location metrics.
                </p>
              </div>

              <div className="about-dealers-grid">

                {/* Koshi (Province 1) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Koshi Province [01]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/nanotek" className="about-dealer-link">
                        NanoTek Solutions <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Biratnagar Command Station</span>
                    </div>
                  </div>
                </div>

                {/* Madhesh (Province 2) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Madhesh Province [02]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/whitepearl" className="about-dealer-link">
                        White Pearl Pvt. Ltd. <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Morang Base Hub</span>
                    </div>
                  </div>
                </div>

                {/* Bagmati (Province 3) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Bagmati Province [03]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/night-vision" className="about-dealer-link">
                        Night Vision CCTV <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Bhaktapur Secure Depot</span>
                    </div>
                  </div>
                </div>

                {/* Gandaki (Province 4) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Gandaki Province [04]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/srsuppliers" className="about-dealer-link">
                        SR Suppliers <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Pokhara Logistics Node</span>
                    </div>
                  </div>
                </div>

                {/* Karnali (Province 6) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Karnali Province [06]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/axetech" className="about-dealer-link">
                        AxeTech Automation <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Surkhet Support Node</span>
                    </div>
                  </div>
                </div>

                {/* Sudurpashchim (Province 7) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Sudurpashchim Province [07]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/joshi-kyodai" className="about-dealer-link">
                        Joshi Kyodai Tech <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Dhangadhi Command Node</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </section>

          {/* TEAM SECTION */}
          <TeamSection />

          {/* CTA */}

          <section className="cta-section">

            <h2 className="cta-title">
              {contents.aboutCtaTitle || "READY FOR THE DARK?"}
            </h2>

            <p className="cta-text">
              {contents.aboutCtaDesc || "Join the growing network of organizations and professionals who trust NIGHTVISION™ for critical surveillance and security operations worldwide."}
            </p>

            <div className="cta-buttons">

              <Link to="/apply-dealers" className="cta-btn-primary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                Become A Dealer
              </Link>

              <Link to="/dealership" className="cta-btn-secondary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                Contact Sales
              </Link>

            </div>

          </section>

        </main>

        {/* FOOTER */}

      </div>
    </>
  );
}