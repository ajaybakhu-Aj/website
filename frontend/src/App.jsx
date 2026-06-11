import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSiteContents } from "./utils/cmsDb";

import Header from "./components/ui/Header";
import HeroSection from "./components/home/HeroSection";
import TickerStrip from "./components/home/TickerStrip";
import FeaturesStrip from "./components/home/FeaturesStrip";
import ProductsSection from "./components/home/ProductsSection";
import WhySection from "./components/home/WhySection";
import FounderSection from "./components/home/FounderSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import DealerSection from "./components/home/DealerSection";
import HomeBlogsSection from "./components/home/HomeBlogsSection";
import Footer from "./components/ui/Footer";

import AboutUs from "./app/(marketing)/company/about/page";
import ContactUs from "./app/(marketing)/contact/page";
import Product from "./app/(marketing)/products/page";
import Cart from "./app/(marketing)/cart/page";
import Founder from "./app/(marketing)/company/founder/page";
import Dealership from "./app/(marketing)/dealers/page";
import SupportPage from "./app/(marketing)/support/page";
import ApplyDealersPage from "./app/(marketing)/dealers/apply/page";
import Warranty from "./app/(marketing)/support/warranty/page";
import TermService from "./app/(marketing)/terms/page";
import PrivacyPolicy from "./app/(marketing)/privacy/page";
import Checkout from "./app/(marketing)/checkout/page";
import ProductSlug from "./app/(marketing)/products/[slug]/page";
import CctvSetupPage from "./app/(marketing)/products/CctvSetupPage";

import ProductsIndoorCamerasPage from "./app/(marketing)/products/indoor-cameras/page";
import ProductsOutdoorCamerasPage from "./app/(marketing)/products/outdoor-cameras/page";
import ProductsWirelessCamerasPage from "./app/(marketing)/products/wireless-cameras/page";
import ProductsAiCamerasPage from "./app/(marketing)/products/ai-cameras/page";
import ProductsIpCamerasPage from "./app/(marketing)/products/ip-cameras/page";
import ProductsNvrPage from "./app/(marketing)/products/nvr/page";
import ProductsPoeSwitchPage from "./app/(marketing)/products/poe-switch/page";
import ProductsIndoorOutdoorCamerasPage from "./app/(marketing)/products/indoor-outdoor-cameras/page";
import ProductsHardDiskPage from "./app/(marketing)/products/hard-disk/page";
import ProductsSdCardPage from "./app/(marketing)/products/sd-card/page";

import WhitePearl from "./app/(marketing)/dealers/OurDealers/Provience2/WhitePearl";
import NightVisionDealer from "./app/(marketing)/dealers/OurDealers/Provience3/NightVision";
import SRSuppliers from "./app/(marketing)/dealers/OurDealers/Provience4/SRSuppliers";
import AxeTech from "./app/(marketing)/dealers/OurDealers/Provience6/AxeTech";
import JoshiKyodai from "./app/(marketing)/dealers/OurDealers/Provience7/JoshiKyodai";
import BlogPage from "./app/(marketing)/blog/page";
import BlogDetail from "./app/(marketing)/blog/[slug]/page";
import AuthorPage from "./app/(marketing)/author/[slug]/page";
import AdminDashboard from "./app/(marketing)/admin/AdminDashboard";
import BlogTagsPage from "./app/(marketing)/admin/BlogTagsPage";
import BlogCategoriesPage from "./app/(marketing)/admin/BlogCategoriesPage";
import EventsPage from "./app/(marketing)/events/page";
import EventDetail from "./app/(marketing)/events/EventDetail";
import AppDownloadsPage from "./app/(marketing)/support/downloads/page";
import GalleryPage from "./app/(marketing)/gallery/page";
import TeamPage from "./app/(marketing)/company/team/page";

import PageNotFound from "./app/PageNotFound";
import Icon from "./utils/Icon";
import FloatingChatbot from "./components/ui/FloatingChatbot";
import Login from "./app/(marketing)/login/page";
import SignUp from "./app/(marketing)/signup/page";
import ForgotPasswordPage from "./app/(marketing)/login/ForgotPasswordPage";
import MyProfile from "./app/(marketing)/my-profile/page";
import Orders from "./app/(marketing)/orders/page";
import Settings from "./app/(marketing)/settings/page";

import "./styles/global.css";
import NanoTek from "./app/(marketing)/dealers/OurDealers/Provience1/NanoTek";
import DynamicDealerProfile from "./app/(marketing)/dealers/DynamicDealerProfile";

/* HOME PAGE */
function HomePage() {
  return (
    <main>
      <HeroSection />
      <TickerStrip />
      <FeaturesStrip />
      <ProductsSection />
      <WhySection />
      <FounderSection />
      <TestimonialsSection />
      <DealerSection />
      <HomeBlogsSection />
    </main>
  );
}

function GlobalSocialSidebar() {
  const siteContents = useSiteContents();
  const facebook = siteContents.socialFacebook || "https://www.facebook.com/nightvisioninterprises";
  const instagram = siteContents.socialInstagram || "https://www.instagram.com/nightvision_nepal/";
  const linkedin = siteContents.socialLinkedin || "https://linkedin.com/";
  const tiktok = siteContents.socialTiktok || "https://www.tiktok.com/@nvnightvisionnp?lang=en";
  const x = siteContents.socialX || "https://x.com/";
  const youtube = siteContents.socialYoutube || "https://www.youtube.com/@nvnightvisionnp";

  const [footerVisible, setFooterVisible] = React.useState(false);

  React.useEffect(() => {
    const footer = document.querySelector(".app-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="global-social-sidebar"
      style={{
        opacity: footerVisible ? 0 : 1,
        pointerEvents: footerVisible ? "none" : "all",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-facebook"
        title="Facebook"
      >
        <Icon name="facebook" size={18} />
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-instagram"
        title="Instagram"
      >
        <Icon name="instagram" size={18} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-linkedin"
        title="LinkedIn"
      >
        <Icon name="linkedin" size={18} />
      </a>
      <a
        href={tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-tiktok"
        title="TikTok"
      >
        <Icon name="tiktok" size={18} />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-x"
        title="X"
      >
        <Icon name="x" size={18} />
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-youtube"
        title="YouTube"
      >
        <Icon name="youtube" size={18} />
      </a>
    </div>
  );
}


function GlobalTrafficSidebar() {
  const siteContents = useSiteContents();

  const [activeSessions, setActiveSessions] = useState(1482);
  const [dailyHits, setDailyHits] = useState(84290);
  const [bandwidth, setBandwidth] = useState(28.4);
  const [latency, setLatency] = useState(18);
  const [threats, setThreats] = useState(427);

  useEffect(() => {
    if (siteContents) {
      const s = parseInt(siteContents.trafficActiveSessions) || 1482;
      const h = parseInt(siteContents.trafficDailyHits) || 84290;
      const b = parseFloat(siteContents.trafficBandwidth) || 28.4;
      const t = parseInt(siteContents.trafficThreatsBlocked) || 427;

      setActiveSessions(s);
      setDailyHits(h);
      setBandwidth(b);
      setThreats(t);
    }
  }, [siteContents]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSessions(prev => Math.max(10, prev + Math.floor(Math.random() * 9) - 4));
      setDailyHits(prev => prev + Math.floor(Math.random() * 3));
      setBandwidth(prev => {
        const base = parseFloat(siteContents.trafficBandwidth) || 28.4;
        const change = (Math.random() * 4 - 2);
        return Math.max(0.1, parseFloat((base + change).toFixed(1)));
      });
      setLatency(Math.floor(12 + Math.random() * 14));
    }, 3000);

    return () => clearInterval(interval);
  }, [siteContents]);

  return (
    <div className="global-traffic-sidebar">
      <div className="sidebar-vertical-label">
        <span className="live-dot-glowing"></span>
        <span className="label-text">📡 TELEMETRY FEED</span>
      </div>

      <div className="sidebar-expanded-panel">
        <div className="panel-header">
          <span className="header-status-badge">SECURE LINK: ACTIVE</span>
          <h4 className="panel-title">SYS MONITORING</h4>
        </div>

        <div className="panel-grid">
          <div className="metric-row">
            <span className="metric-label">ACTIVE SESSIONS</span>
            <span className="metric-value text-green">{activeSessions.toLocaleString()}</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">PAGE VIEW HITS</span>
            <span className="metric-value text-blue">{dailyHits.toLocaleString()}</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">BANDWIDTH FLOW</span>
            <span className="metric-value text-yellow">{bandwidth} MB/s</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">SYS LATENCY</span>
            <span className="metric-value text-cyan">{latency} ms</span>
          </div>

          <div className="metric-row">
            <span className="metric-label">THREATS BLOCKED</span>
            <span className="metric-value text-red">{threats}</span>
          </div>
        </div>

        <div className="panel-footer">
          <span className="footer-status">FEED SYNC: ONLINE</span>
        </div>
      </div>
    </div>
  );
}



function App() {
  const location = useLocation();
  const siteContents = useSiteContents();
  const hideHeaderFooter =
    location.pathname === "/checkout" ||
    location.pathname === "/admin" ||
    location.pathname === "/cms";

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setIsAdmin(parsed.role === "Admin" || parsed.role === "Super Admin");
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        setIsAdmin(false);
      }
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (!siteContents) return;

    let path = location.pathname;
    let pageKey = "home";

    if (path === "/" || path === "") {
      pageKey = "home";
    } else if (path.startsWith("/products") || path.startsWith("/product")) {
      pageKey = "products";
    } else if (path.startsWith("/about")) {
      pageKey = "about";
    } else if (path.startsWith("/contact")) {
      pageKey = "contact";
    } else if (path.startsWith("/cart")) {
      pageKey = "cart";
    } else if (path.startsWith("/founder")) {
      pageKey = "founder";
    } else if (path.startsWith("/dealership") || path.startsWith("/apply-dealers") || path.startsWith("/dealer/")) {
      pageKey = "dealership";
    } else if (path.startsWith("/support")) {
      pageKey = "support";
    } else if (path.startsWith("/warranty")) {
      pageKey = "warranty";
    } else if (path.startsWith("/terms")) {
      pageKey = "terms";
    } else if (path.startsWith("/privacy")) {
      pageKey = "privacy";
    } else if (path.startsWith("/blog") || path.startsWith("/author/")) {
      pageKey = "blog";
    } else if (path.startsWith("/gallery")) {
      pageKey = "gallery";
    } else if (path.startsWith("/team")) {
      pageKey = "team";
    } else if (path.startsWith("/events")) {
      pageKey = "events";
    } else if (path.startsWith("/checkout")) {
      pageKey = "checkout";
    } else if (path.startsWith("/login")) {
      pageKey = "login";
    } else if (path.startsWith("/signup")) {
      pageKey = "signup";
    } else if (path.startsWith("/forgot-password")) {
      pageKey = "forgot_password";
    } else if (path.startsWith("/my-profile")) {
      pageKey = "my_profile";
    } else if (path.startsWith("/orders")) {
      pageKey = "orders";
    } else if (path.startsWith("/settings")) {
      pageKey = "settings";
    } else if (path.startsWith("/cctv-setup")) {
      pageKey = "cctv_setup";
    } else {
      pageKey = "home";
    }

    const defaultTitles = {
      home: "NightVision - Advanced surveillance for peace of mind",
      products: "Explore Security Products - NightVision Nepal",
      about: "About Us - NightVision Surveillance",
      contact: "Contact Us - NightVision Specialists",
      cart: "Shopping Cart - NightVision Security",
      founder: "Founder Rozil Thapa - NightVision",
      dealership: "Dealers & Partners - NightVision Network",
      support: "Technical Support Center - NightVision",
      warranty: "Ironclad Warranty Policy - NightVision",
      terms: "Terms of Service - NightVision",
      privacy: "Privacy Protocol Policy - NightVision",
      blog: "Security Intelligence Blog - NightVision",
      gallery: "Perimeter Installation Gallery - NightVision",
      team: "Meet Our Team - NightVision"
    };

    const defaultDescs = {
      home: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response in Nepal.",
      products: "Browse high-quality CCTV cameras, NVR networks, PoE switches, and surveillance hard disks engineered for uncompromising vigilance.",
      about: "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and operational reliability.",
      contact: "Get in touch with NightVision surveillance experts in Nepal for custom security consultations, quotes, and product support.",
      cart: "View items in your surveillance equipment shopping cart. Complete your order with secure checkout.",
      founder: "The vision behind NightVision Nepal by founder Rozil Thapa. Architecting Nepal's most resilient security infrastructure.",
      dealership: "Find authorized NightVision dealers across Nepal or apply to become an official security partner.",
      support: "Access manuals, software downloads, and contact our 24/7 technical surveillance support helpline.",
      warranty: "Every NightVision unit is forged for endurance. Read about our 1-Year Ironclad Warranty and device support policy.",
      terms: "Terms and conditions governing the use of NightVision surveillance hardware, digital applications, and services.",
      privacy: "Learn how we protect data captured by NightVision surveillance systems. Secure encryption and privacy standards.",
      blog: "Read latest updates, security tutorials, threat reports, and CCTV guides from NightVision experts.",
      gallery: "Browse active drone feeds, operations matrix centers, and night vision installation mockups across Nepal.",
      team: "The visionaries and engineers behind NightVision's uncompromising security ecosystem.",
      events: "Explore the latest news coverage, event details, and product announcements from NightVision.",
      checkout: "Finalize your order of enterprise-grade security cameras, NVR networks, and storage packages.",
      login: "Access your operator terminal dashboard to manage security devices and order history.",
      signup: "Create a NightVision security operator profile to track warranties, orders, and configurations.",
      forgot_password: "Request a secure password reset token to recover access to your security terminal.",
      my_profile: "Manage your registered profile details, delivery addresses, and security settings.",
      orders: "Review active and past security device dispatch records, order statuses, and invoices.",
      settings: "Configure terminal preferences, alert methods, and security profile parameters.",
      cctv_setup: "Estimate surveillance infrastructure costs by specifying camera quantities, NVR channels, switches, and storage size."
    };

    const metaTitle = siteContents[`metaTitle_${pageKey}`] || defaultTitles[pageKey];
    document.title = metaTitle;

    const metaDesc = siteContents[`metaDesc_${pageKey}`] || defaultDescs[pageKey];
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', metaDesc);
  }, [location.pathname, siteContents]);

  return (
    <div
      style={{
        background: "#131313",
        minHeight: "100vh",
      }}
    >
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <GlobalSocialSidebar />}
      {!hideHeaderFooter && isAdmin && <GlobalTrafficSidebar />}
      {!hideHeaderFooter && <FloatingChatbot />}

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* ABOUT PAGE */}
        <Route path="/about" element={<AboutUs />} />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<ContactUs />} />

        {/* PRODUCT PAGE */}
        <Route path="/product" element={<Product />} />

        {/* CART PAGE */}
        <Route path="/cart" element={<Cart />} />

        {/* TEAM PAGE */}
        <Route path="/team" element={<TeamPage />} />

        {/* FOUNDER PAGE */}
        <Route path="/founder" element={<Founder />} />

        {/* DEALERSHIP PAGE */}
        <Route path="/dealership" element={<Dealership />} />

        <Route
          path="/products"
          element={<Product />}
        />
        <Route path="/products/indoor-cameras" element={<ProductsIndoorCamerasPage />} />
        <Route path="/products/outdoor-cameras" element={<ProductsOutdoorCamerasPage />} />
        <Route path="/products/wireless-cameras" element={<ProductsWirelessCamerasPage />} />
        <Route path="/products/ai-cameras" element={<ProductsAiCamerasPage />} />
        <Route path="/products/ip-cameras" element={<ProductsIpCamerasPage />} />
        <Route path="/products/nvr" element={<ProductsNvrPage />} />
        <Route path="/products/poe-switch" element={<ProductsPoeSwitchPage />} />
        <Route path="/products/indoor-outdoor-cameras" element={<ProductsIndoorOutdoorCamerasPage />} />
        <Route path="/products/hard-disk" element={<ProductsHardDiskPage />} />
        <Route path="/products/sd-card" element={<ProductsSdCardPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/app-download" element={<AppDownloadsPage />} />
        <Route path="/support/downloads" element={<AppDownloadsPage />} />
        <Route path="/apply-dealers" element={<ApplyDealersPage />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/terms" element={<TermService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:slug" element={<ProductSlug />} />
        <Route path="/cctv-setup" element={<CctvSetupPage />} />
        <Route path="/dealer/nanotek" element={<NanoTek />} />
        <Route path="/dealer/whitepearl" element={<WhitePearl />} />
        <Route path="/dealer/night-vision" element={<NightVisionDealer />} />
        <Route path="/dealer/srsuppliers" element={<SRSuppliers />} />
        <Route path="/dealer/axetech" element={<AxeTech />} />
        <Route path="/dealer/joshi-kyodai" element={<JoshiKyodai />} />
        <Route path="/dealer/:slug" element={<DynamicDealerProfile />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/author/:slug" element={<AuthorPage />} />
        <Route path="/admin/blog-tags" element={<BlogTagsPage />} />
        <Route path="/admin/blog-categories" element={<BlogCategoriesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cms" element={<AdminDashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />

        {/* FALLBACK 404 PAGE */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;