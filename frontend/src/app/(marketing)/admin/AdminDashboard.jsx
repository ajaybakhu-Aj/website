import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, addProduct, deleteProduct, resetDatabase } from "../../../utils/productDb";
import {
  getAllBlogs,
  saveBlog,
  deleteBlog,
  getAllEvents,
  saveEvent,
  deleteEvent,
  getAllGalleryItems,
  saveGalleryItem,
  deleteGalleryItem,
  getAllDealers,
  saveDealer,
  deleteDealer,
  getAllContacts,
  saveContact,
  deleteContact,
  getSettings,
  saveSettings,
  resetCmsDatabase,
  getAllActivities,
  saveActivity,
  clearActivities,
  getAllAdmins,
  saveAdmin,
  deleteAdmin,
  verifyAdminCredentials,
  getSiteContents,
  saveSiteContents,
  getAllTeamMembers,
  saveTeamMember,
  deleteTeamMember
} from "../../../utils/cmsDb";
import Icon from "../../../utils/Icon";

const C = {
  bg: "#f8fafc", // Slate 50
  surface: "#ffffff", // Pure White
  surfCont: "#f1f5f9", // Slate 100
  surfHi: "#e2e8f0", // Slate 200
  onSurf: "#0f172a", // Slate 900
  onSurfVar: "#475569", // Slate 600
  primary: "#4f46e5", // Indigo 600
  onPrimary: "#ffffff",
  secondary: "#0284c7", // Sky 600
  outline: "#cbd5e1", // Slate 300
  outlineVar: "#e2e8f0", // Slate 200
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Data lists
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Expanded states
  const [orders, setOrders] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState(null);

  // Settings form controlled fields
  const [settHelpline1, setSettHelpline1] = useState("");
  const [settHelpline2, setSettHelpline2] = useState("");
  const [settAddress, setSettAddress] = useState("");
  const [settEmail, setSettEmail] = useState("");
  const [settBannerText, setSettBannerText] = useState("");
  const [settSystemAlert, setSettSystemAlert] = useState("");
  const [siteContents, setSiteContents] = useState(null);
  const [siteCustomSubTab, setSiteCustomSubTab] = useState("home");

  const [expandedOrder, setExpandedOrder] = useState(null);

  // Form states
  const [formType, setFormType] = useState(null); // 'product' | 'blog' | 'event' | 'gallery' | 'admin'
  const [editItem, setEditItem] = useState(null); // Item currently being edited (null for add)
  const [formData, setFormData] = useState({});
  const [sysLogs, setSysLogs] = useState([]);

  // Auth states
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Traffic Telemetry States
  const [trafficActiveSessions, setTrafficActiveSessions] = useState(128);
  const [trafficDailyHits, setTrafficDailyHits] = useState(14850);
  const [trafficBandwidth, setTrafficBandwidth] = useState(48.2);
  const [trafficThreats, setTrafficThreats] = useState(14);
  const [trafficLogs, setTrafficLogs] = useState([]);
  const [isTrafficPaused, setIsTrafficPaused] = useState(false);

  useEffect(() => {
    // Generate initial traffic logs
    const initialLogs = [];
    const ips = [
      "103.84.152.12", "202.70.88.45", "45.64.160.2", "27.34.48.99", "110.44.112.56",
      "192.168.1.100", "8.8.8.8", "1.1.1.1", "185.120.33.10", "64.233.160.101"
    ];
    const paths = [
      "/", "/products", "/checkout", "/api/cms", "/company/about", "/contact", "/cart", "/support", 
      "/company/founder", "/support/warranty", "/terms", "/privacy", "/products/nv-bullet-x1"
    ];
    const locations = [
      "Kathmandu, NP", "Pokhara, NP", "Lalitpur, NP", "Bhaktapur, NP", "Biratnagar, NP", "Butwal, NP",
      "Tokyo, JP", "London, UK", "New York, US", "Singapore, SG"
    ];
    const devices = ["Desktop", "Mobile", "Tablet"];
    const browsers = ["Chrome", "Safari", "Firefox", "Edge"];
    const statuses = [200, 200, 200, 200, 200, 201, 304, 304, 404, 500];
    const methods = ["GET", "GET", "GET", "GET", "GET", "POST", "GET", "GET", "OPTIONS", "POST"];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < 8; i++) {
      initialLogs.push({
        id: Math.random().toString(36).substring(2, 9),
        ip: random(ips),
        path: random(paths),
        location: random(locations),
        device: random(devices),
        browser: random(browsers),
        status: random(statuses),
        method: random(methods),
        time: new Date(Date.now() - i * 15000).toLocaleTimeString()
      });
    }
    setTrafficLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (isTrafficPaused) return;

    const interval = setInterval(() => {
      // Fluctuate active sessions
      setTrafficActiveSessions((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = prev + delta;
        return Math.max(80, Math.min(300, next));
      });

      // Increment daily hits
      setTrafficDailyHits((prev) => prev + Math.floor(Math.random() * 3) + 1);

      // Increment bandwidth slightly
      setTrafficBandwidth((prev) => prev + parseFloat((Math.random() * 0.05).toFixed(3)));

      // Occasional security threat trigger
      if (Math.random() < 0.1) {
        setTrafficThreats((prev) => prev + 1);
      }

      // Add a new log entry
      setTrafficLogs((prev) => {
        const ips = [
          "103.84.152.12", "202.70.88.45", "45.64.160.2", "27.34.48.99", "110.44.112.56",
          "192.168.1.100", "8.8.8.8", "1.1.1.1", "185.120.33.10", "64.233.160.101"
        ];
        const paths = [
          "/", "/products", "/checkout", "/api/cms", "/company/about", "/contact", "/cart", "/support", 
          "/company/founder", "/support/warranty", "/terms", "/privacy", "/products/nv-bullet-x1"
        ];
        const locations = [
          "Kathmandu, NP", "Pokhara, NP", "Lalitpur, NP", "Bhaktapur, NP", "Biratnagar, NP", "Butwal, NP",
          "Tokyo, JP", "London, UK", "New York, US", "Singapore, SG"
        ];
        const devices = ["Desktop", "Mobile", "Tablet"];
        const browsers = ["Chrome", "Safari", "Firefox", "Edge"];
        const statuses = [200, 200, 200, 200, 200, 201, 304, 304, 404, 500];
        const methods = ["GET", "GET", "GET", "GET", "GET", "POST", "GET", "GET", "OPTIONS", "POST"];

        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const newLog = {
          id: Math.random().toString(36).substring(2, 9),
          ip: random(ips),
          path: random(paths),
          location: random(locations),
          device: random(devices),
          browser: random(browsers),
          status: random(statuses),
          method: random(methods),
          time: new Date().toLocaleTimeString()
        };

        return [newLog, ...prev.slice(0, 14)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isTrafficPaused]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        console.error("Error loading profile session:", e);
      }
    }
    setAuthLoading(false);
    loadAllData();
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    verifyAdminCredentials(adminEmail.trim(), adminPassword)
      .then((matchedAdmin) => {
        if (!matchedAdmin) {
          setAuthError("Invalid email address or password. Access denied.");
          setAuthSubmitting(false);
          return;
        }

        const adminSession = {
          email: matchedAdmin.email,
          name: matchedAdmin.name,
          role: matchedAdmin.role || "Admin",
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(adminSession));
        setUser(adminSession);
        setAuthSubmitting(false);
        
        // Refresh Header & other states
        window.dispatchEvent(new Event("storage"));
        window.location.reload();
      })
      .catch(() => {
        setAuthError("Database authentication error. Please try again.");
        setAuthSubmitting(false);
      });
  };

  const loadAllData = () => {
    getAllProducts().then(setProducts);
    getAllBlogs().then(setBlogs);
    getAllEvents().then(setEvents);
    getAllGalleryItems().then(setGallery);
    getAllDealers().then(setDealers);
    getAllContacts().then(setContacts);
    getAllActivities().then(setSysLogs);
    getAllAdmins().then(setAdminUsers);
    getAllTeamMembers().then(setTeamMembers);
    getSiteContents().then(setSiteContents);
    getSettings().then((config) => {
      setSettings(config);
      if (config) {
        setSettHelpline1(config.helpline1 || "");
        setSettHelpline2(config.helpline2 || "");
        setSettAddress(config.address || "");
        setSettEmail(config.email || "");
        setSettBannerText(config.bannerText || "");
        setSettSystemAlert(config.systemAlert || "");
      }
    });

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  };

  const addLog = (msg, type = "admin") => {
    saveActivity(msg, type).then(() => {
      getAllActivities().then(setSysLogs);
    });
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to RESET ALL databases (Products, Blogs, Events, Gallery, Dealers, Contacts, Settings) to default seed data?")) {
      addLog("DB_WIPE: TRUNCATING ALL STORES...");
      Promise.all([resetDatabase(), resetCmsDatabase()]).then(() => {
        loadAllData();
        addLog("DB_SEED: DATA STORES ALIGNED TO FACTORY DEFAULT.");
        alert("System databases restored successfully.");
      });
    }
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      addLog(`COMMAND: DELETE // TYPE: ${type.toUpperCase()} // ID: ${id}`);
      if (type === "product") {
        deleteProduct(id).then(() => { loadAllData(); addLog("DELETE_OK."); });
      } else if (type === "blog") {
        deleteBlog(id).then(() => { loadAllData(); addLog("DELETE_OK."); });
      } else if (type === "event") {
        deleteEvent(id).then(() => { loadAllData(); addLog("DELETE_OK."); });
      } else if (type === "gallery") {
        deleteGalleryItem(id).then(() => { loadAllData(); addLog("DELETE_OK."); });
      } else if (type === "dealer") {
        deleteDealer(id).then(() => { loadAllData(); addLog("DELETE_OK."); });
      } else if (type === "contact") {
        deleteContact(id).then(() => { loadAllData(); addLog("DELETE_OK."); });
      } else if (type === "admin_user") {
        const adminToDelete = adminUsers.find(x => String(x.id) === String(id));
        if (adminToDelete && adminToDelete.email.toLowerCase() === "admin@nightvision.com") {
          alert("Primary administrator account cannot be deleted.");
          return;
        }
        deleteAdmin(id).then(() => { loadAllData(); addLog(`Deleted administrator account ID #${id}`); });
      } else if (type === "team_member") {
        deleteTeamMember(id).then(() => { loadAllData(); addLog(`Deleted team member ID #${id}`); });
      } else if (type === "order") {
        const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const filtered = savedOrders.filter(x => x.id !== id);
        localStorage.setItem("orders", JSON.stringify(filtered));
        loadAllData();
        addLog("DELETE_OK.");
      }
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const idx = savedOrders.findIndex(x => x.id === orderId);
    if (idx >= 0) {
      savedOrders[idx].status = newStatus;
      localStorage.setItem("orders", JSON.stringify(savedOrders));
      loadAllData();
      addLog(`ORDER_STATUS_UPDATE: ID #${orderId} // STATUS: ${newStatus}`);
    }
  };

  const handleUpdateDealerStatus = (dealerId, newStatus) => {
    const item = dealers.find(x => x.id === dealerId);
    if (item) {
      const updated = { ...item, status: newStatus };
      saveDealer(updated).then(() => {
        loadAllData();
        addLog(`DEALER_STATUS_UPDATE: ID #${dealerId} // STATUS: ${newStatus}`);
      });
    }
  };

  const handleUpdateContactStatus = (contactId, newStatus) => {
    const item = contacts.find(x => x.id === contactId);
    if (item) {
      const updated = { ...item, status: newStatus };
      saveContact(updated).then(() => {
        loadAllData();
        addLog(`CONTACT_STATUS_UPDATE: ID #${contactId} // STATUS: ${newStatus}`);
      });
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updatedSettings = {
      id: "global_config",
      helpline1: settHelpline1.trim(),
      helpline2: settHelpline2.trim(),
      address: settAddress.trim(),
      email: settEmail.trim(),
      bannerText: settBannerText.trim(),
      systemAlert: settSystemAlert.trim()
    };
    saveSettings(updatedSettings).then(() => {
      loadAllData();
      addLog("Global website settings updated successfully.");
      alert("Website settings updated successfully!");
    });
  };

  const openForm = (type, item = null) => {
    setFormType(type);
    setEditItem(item);
    if (item) {
      addLog(`Opened edit form for ${type} ID #${item.id}`);
      if (type === "blog" || type === "event") {
        // Convert array content to string split by newlines for easy editing
        setFormData({
          ...item,
          content: item.content ? item.content.join("\n") : ""
        });
      } else if (type === "product") {
        setFormData({
          ...item,
          customThumbs: item.thumbs ? item.thumbs.filter(t => t !== item.img) : []
        });
      } else {
        setFormData({ ...item });
      }
    } else {
      addLog(`Opened add form for new ${type}`);
      // Default initial states
      if (type === "product") {
        setFormData({
          id: "",
          name: "",
          category: "IP CCTV Cameras",
          productType: "Indoor CCTV Cameras",
          cameraMp: "4 MP",
          price: 5000,
          description: "",
          longDesc: "",
          bodySectionLabel: "TECHNICAL DOCUMENTATION",
          bodySectionTitle: "SYSTEM SPECIFICATIONS & FIELD ARCHITECTURE",
          guidePdf: "",
          img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&h=400&q=80",
          customThumbs: []
        });
      } else if (type === "blog") {
        setFormData({
          title: "",
          tag: "Tech Report",
          category: "Thermal Tech",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          author: "Madhyam Skaya",
          excerpt: "",
          img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          content: ""
        });
      } else if (type === "event") {
        setFormData({
          title: "",
          type: "news",
          tag: "SYSTEM LAUNCH",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          location: "",
          author: "Operations Team",
          image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80",
          excerpt: "",
          content: ""
        });
      } else if (type === "gallery") {
        setFormData({
          category: "premium-cameras",
          title: "",
          img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
        });
      } else if (type === "admin") {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "Admin"
        });
      } else if (type === "team_member") {
        setFormData({
          name: "",
          role: "",
          bio: "",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
          socials: { linkedin: "", twitter: "", facebook: "", instagram: "" }
        });
      } else if (type === "dealer") {
        setFormData({
          companyName: "",
          businessType: "Surveillance Specialist",
          contactName: "",
          email: "",
          location: "",
          phone: "",
          status: "Approved",
          isPlatinum: false,
          mapUrl: "",
          brief: "",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
        });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addLog(`Saving form details for ${formType}...`);

    const dataToSave = { ...formData };

    // Post processing for split content arrays
    if (formType === "blog" || formType === "event") {
      dataToSave.content = typeof dataToSave.content === "string" 
        ? dataToSave.content.split("\n").filter(p => p.trim() !== "")
        : [];
    }

    if (formType === "product") {
      // Force custom id if adding
      if (!editItem) {
        dataToSave.id = dataToSave.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      if (formData.customThumbs && formData.customThumbs.length > 0) {
        dataToSave.thumbs = [dataToSave.img, ...formData.customThumbs];
      } else {
        dataToSave.thumbs = [dataToSave.img];
      }
      delete dataToSave.customThumbs;
      addProduct(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog("Product saved successfully.");
      });
    } else if (formType === "blog") {
      if (!editItem) {
        dataToSave.slug = dataToSave.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      saveBlog(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog("Blog saved successfully.");
      });
    } else if (formType === "event") {
      if (!editItem) {
        dataToSave.slug = dataToSave.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      saveEvent(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog("News/Event updated successfully.");
      });
    } else if (formType === "gallery") {
      saveGalleryItem(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog("Gallery photo saved successfully.");
      });
    } else if (formType === "admin") {
      if (!editItem) {
        dataToSave.date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      }
      saveAdmin(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog(`Administrator account for ${dataToSave.name} (${dataToSave.email}) saved successfully.`);
      });
    } else if (formType === "team_member") {
      saveTeamMember(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog(`Team member ${dataToSave.name} saved successfully.`);
      });
    } else if (formType === "dealer") {
      if (!editItem && !dataToSave.date) {
        dataToSave.date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      }
      saveDealer(dataToSave).then(() => {
        loadAllData();
        setFormType(null);
        addLog(`Dealer application for ${dataToSave.companyName} saved successfully.`);
      });
    }
  };

  if (authLoading) {
    return (
      <div style={{ background: C.bg, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: C.secondary, fontFamily: C.sg }}>
        Verifying session status...
      </div>
    );
  }

  const isAuthorizedAdmin = user && user.role === "Admin";

  if (!isAuthorizedAdmin) {
    return (
      <div style={{ background: C.bg, color: C.onSurf, fontFamily: C.pp, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 20px" }}>
        <div className="admin-login-card" style={{ 
          background: C.surface, 
          border: `1px solid ${user ? "#ff6b6b" : C.outlineVar}`, 
          padding: 40, 
          width: "100%", 
          maxWidth: 460, 
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)" 
        }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ 
              display: "inline-flex", 
              padding: 12, 
              background: user ? "rgba(255, 107, 107, 0.08)" : "rgba(99, 102, 241, 0.08)", 
              border: `1px solid ${user ? "#ff6b6b" : C.primary}`, 
              color: user ? "#ff6b6b" : C.primary, 
              borderRadius: "50%", 
              marginBottom: 16 
            }}>
              <Icon name={user ? "gavel" : "admin_panel_settings"} size={32} />
            </div>
            <h2 style={{ fontFamily: C.sg, fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: user ? "#ff6b6b" : C.onSurf }}>
              {user ? "ACCESS DENIED" : "ADMIN ACCESS"}
            </h2>
            <div style={{ fontSize: 9, fontWeight: 800, color: user ? "#ff6b6b" : C.secondary, letterSpacing: "2px", marginTop: 4 }}>
              {user ? "INSUFFICIENT SESSION PERMISSIONS" : "ADMINISTRATOR PRIVILEGES REQUIRED"}
            </div>
          </div>

          {user && (
            <p style={{ fontSize: 13, color: C.onSurfVar, lineHeight: "20px", textAlign: "center", marginBottom: 24 }}>
              CURRENT SESSION: <strong style={{ color: C.primary }}>{user.name}</strong><br />
              ROLE: <strong style={{ color: C.primary }}>{user.role}</strong><br />
              Please sign in with administrator credentials.
            </p>
          )}

          {authError && (
            <div style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: 12, fontSize: 11, display: "flex", alignItems: "center", gap: 8, marginBottom: 20, borderRadius: "6px" }}>
              <Icon name="warning" size={16} />
              <span style={{ fontWeight: 700, fontFamily: C.sg }}>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.onSurfVar, letterSpacing: "1px", marginBottom: 6 }}>EMAIL ADDRESS</label>
              <input 
                required 
                type="email" 
                placeholder="e.g. admin@nightvision.com" 
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)} 
                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, fontSize: 13, outline: "none", borderRadius: "6px" }} 
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.onSurfVar, letterSpacing: "1px", marginBottom: 6 }}>PASSWORD</label>
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)} 
                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, fontSize: 13, outline: "none", borderRadius: "6px" }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={authSubmitting}
              style={{ 
                background: C.primary, 
                color: C.onPrimary, 
                border: "none", 
                padding: 14, 
                fontSize: 11, 
                fontWeight: 700, 
                letterSpacing: "1.5px", 
                cursor: "pointer", 
                fontFamily: C.sg,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
                borderRadius: "6px"
              }}
            >
              {authSubmitting ? (
                <>
                  <Icon name="sync" className="spin-slow" size={14} />
                  <span>LOGGING IN...</span>
                </>
              ) : (
                <>
                  <Icon name="lock" size={14} />
                  <span>SIGN IN</span>
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <Link to="/" style={{ color: C.onSurfVar, fontSize: 11, textDecoration: "none", letterSpacing: 0.5 }}>
              ← Back to Home
            </Link>
            {user && (
              <button 
                type="button"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                  window.dispatchEvent(new Event("storage"));
                  window.location.reload();
                }}
                style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: 11, fontWeight: "bold", fontFamily: C.sg, textTransform: "uppercase" }}
              >
                Log Out Current Account
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, color: C.onSurf, fontFamily: C.pp, minHeight: "100vh", paddingTop: 40, paddingBottom: 64 }}>

      
      <div className="admin-page-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        
        {/* HEADER BAR */}
        <header className="admin-header-bar" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${C.outlineVar}`,
          paddingBottom: 24,
          marginBottom: 40,
          flexWrap: "wrap",
          gap: 16
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: "2px", fontFamily: C.sg, textTransform: "uppercase" }}>
              NIGHTVISION™ ADMINISTRATION PORTAL
            </div>
            <h1 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, fontFamily: C.sg, letterSpacing: "-0.5px", marginTop: 4 }}>
              MANAGEMENT DASHBOARD
            </h1>
          </div>
 
          <div className="admin-header-actions" style={{ display: "flex", alignItems: "center", gap: 16 }}>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.dispatchEvent(new Event("storage"));
                window.location.href = "/";
              }}
              style={{
                background: "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${C.outlineVar}`,
                color: C.onSurf,
                padding: "8px 16px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: C.sg,
                borderRadius: "6px"
              }}
            >
              LOG OUT
            </button>

            <button
              onClick={handleResetAll}
              style={{
                background: "rgba(255, 107, 107, 0.1)",
                border: "1px solid #ff6b6b",
                color: "#ff6b6b",
                padding: "8px 16px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: C.sg,
                borderRadius: "6px"
              }}
            >
              RESET ALL DATABASES
            </button>
          </div>
        </header>

        {/* DIALS / WIDGETS STRIP */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 40
        }}>
          {[
            { label: "Products", val: products.length, icon: "inventory" },
            { label: "Blog Posts", val: blogs.length, icon: "rss_feed" },
            { label: "News & Events", val: events.length, icon: "event" },
            { label: "Gallery Images", val: gallery.length, icon: "collections" },
            { label: "Active Orders", val: orders.length, icon: "shopping_cart" },
            { label: "Dealers Directory", val: dealers.length, icon: "person_add" },
            { label: "Client Messages", val: contacts.length, icon: "mail" }
          ].map((w, i) => (
            <div key={i} style={{
              background: C.surface,
              border: `1px solid ${C.outlineVar}`,
              padding: "20px 24px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)"
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.onSurfVar, opacity: 0.65, letterSpacing: "1px", textTransform: "uppercase" }}>{w.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: C.sg, color: C.primary, marginTop: 4 }}>{w.val}</div>
              </div>
              <span style={{ color: C.primary }}><Icon name={w.icon} size={32} /></span>
            </div>
          ))}
        </section>

        {/* CONSOLE CONTROL BLOCK */}
        <div className="admin-grid-layout" style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 32,
          alignItems: "flex-start"
        }}>
          {/* TAB SIDEBAR */}
          <aside className="admin-sidebar" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { id: "overview", name: "System Overview", icon: "dashboard" },
              { id: "traffic", name: "Traffic Monitor", icon: "analytics" },
              { id: "products", name: "Products Manager", icon: "inventory" },
              { id: "blogs", name: "Blogs Manager", icon: "rss_feed" },
              { id: "events", name: "Events & News", icon: "event" },
              { id: "gallery", name: "Gallery Images", icon: "collections" },
              { id: "orders", name: "Orders Logs", icon: "shopping_cart" },
              { id: "dealers", name: "Add Dealers", icon: "person_add" },
              { id: "contacts", name: "Client Messages", icon: "mail" },
              { id: "customize", name: "Edit Site Contents", icon: "edit_note" },
              { id: "settings", name: "System Settings", icon: "settings" },
              { id: "admins", name: "User Accounts", icon: "manage_accounts" },
              { id: "team", name: "Team Members", icon: "groups" },
              { id: "activities", name: "Activity Logs", icon: "list_alt" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setFormType(null); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: activeTab === tab.id ? C.primary : C.surface,
                  color: activeTab === tab.id ? C.onPrimary : C.onSurf,
                  border: `1px solid ${activeTab === tab.id ? C.primary : C.outlineVar}`,
                  padding: "14px 20px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: C.sg,
                  transition: "all 0.2s",
                  borderRadius: "8px"
                }}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.name}</span>
              </button>
            ))}

            {/* Recent Activity Timeline Sidebar Widget */}
            <div style={{
              marginTop: 24,
              background: C.surface,
              border: `1px solid ${C.outlineVar}`,
              padding: 20,
              borderRadius: "10px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: "1px", fontFamily: C.sg }}>RECENT WEBSITE ACTIVITY</div>
                <Icon name="history" size={16} style={{ color: C.onSurfVar }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative", paddingLeft: 14 }}>
                {/* Timeline vertical bar */}
                <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 2, background: C.outlineVar }} />

                {sysLogs.slice(0, 5).map((log, index) => {
                  let dotColor = C.secondary; // admin / default
                  if (log.type === "order") dotColor = "#10b981";
                  else if (log.type === "contact" || log.type === "dealer") dotColor = "#f59e0b";
                  else if (log.type === "system") dotColor = C.outline;

                  return (
                    <div key={log.id || index} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 3 }}>
                      {/* Timeline dot */}
                      <span style={{
                        position: "absolute",
                        left: -14,
                        top: 4,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: dotColor,
                        boxShadow: `0 0 8px ${dotColor}`
                      }} />
                      <div style={{ fontSize: 11, color: C.onSurf, lineHeight: "15px", fontWeight: 500 }}>
                        {log.message}
                      </div>
                      <div style={{ fontSize: 9, color: C.onSurfVar, opacity: 0.7 }}>
                        {log.date}
                      </div>
                    </div>
                  );
                })}

                {sysLogs.length === 0 && (
                  <div style={{ fontSize: 11, color: C.onSurfVar, fontStyle: "italic", padding: "10px 0" }}>
                    No system activity recorded yet.
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => { setActiveTab("activities"); setFormType(null); }}
                style={{
                  width: "100%",
                  marginTop: 16,
                  background: "transparent",
                  border: `1px solid ${C.outlineVar}`,
                  color: C.onSurfVar,
                  padding: "8px 12px",
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: "6px",
                  cursor: "pointer",
                  textAlign: "center",
                  fontFamily: C.sg,
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = C.surfCont; e.currentTarget.style.color = C.primary; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.onSurfVar; }}
              >
                VIEW FULL REPORT →
              </button>
            </div>
          </aside>

          {/* MAIN WORKSPACE PANEL */}
          <main className="admin-main-workspace" style={{
            background: C.surface,
            border: `1px solid ${C.outlineVar}`,
            minHeight: 520,
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
            position: "relative"
          }}>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === "overview" && (
              <div>
                <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700, marginBottom: 16, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 12 }}>SYSTEM OVERVIEW</h2>
                <p style={{ fontSize: 14, color: C.onSurfVar, lineHeight: "24px", marginBottom: 32 }}>
                  NightVision local database operations are synchronized. Administrators can use the sidebar modules to perform dynamic content updates, add new products, publish blogs, post news and events, or adjust gallery media. All modifications are immediately updated site-wide.
                </p>

                <h3 style={{ fontSize: 13, fontWeight: 700, color: C.secondary, fontFamily: C.sg, marginBottom: 16 }}>SYSTEM PARAMETERS</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { key: "STORAGE LAYER", val: "IndexedDB / LocalStorage" },
                    { key: "SERVER ENVIRONMENT", val: "Production-Node" },
                    { key: "NETWORK STATUS", val: "Active / Online" },
                    { key: "SECURITY PROTOCOL", val: "SSL / TLS Encrypted" }
                  ].map((row, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 14,
                      background: C.surfCont,
                      border: `1px solid ${C.outlineVar}`,
                      borderRadius: "6px",
                      fontSize: 12
                    }}>
                      <span style={{ opacity: 0.65, fontWeight: 600 }}>{row.key}</span>
                      <span style={{ color: C.secondary, fontWeight: "bold" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRODUCTS MANAGER */}
            {activeTab === "products" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>PRODUCTS IN SYSTEM ({products.length})</h2>
                  <button onClick={() => openForm("product")} style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg }}>
                    ADD NEW PRODUCT
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                        <th style={{ padding: "12px 8px", color: C.primary }}>CODE</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>NAME</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>CATEGORY</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>PRICE</th>
                        <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} style={{ borderBottom: `1px solid ${C.outlineVar}` }}>
                          <td style={{ padding: "12px 8px", fontFamily: C.sg, fontWeight: 700 }}>{p.code}</td>
                          <td style={{ padding: "12px 8px", fontWeight: "bold" }}>{p.name}</td>
                          <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{p.category}</td>
                          <td style={{ padding: "12px 8px", color: C.secondary }}>Rs. {p.price}</td>
                          <td style={{ padding: "12px 8px", textAlign: "right" }}>
                            <button onClick={() => openForm("product", p)} style={{ background: C.surfHi, color: C.primary, border: `1px solid ${C.outlineVar}`, padding: "4px 10px", marginRight: 8, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>EDIT</button>
                            <button onClick={() => handleDelete("product", p.id)} style={{ background: "rgba(255,107,107,0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>DELETE</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BLOGS MANAGER */}
            {activeTab === "blogs" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>BLOG ARTICLES ({blogs.length})</h2>
                  <button onClick={() => openForm("blog")} style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg }}>
                    CREATE BLOG POST
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                        <th style={{ padding: "12px 8px", color: C.primary }}>TAG</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>TITLE</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>DATE</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>AUTHOR</th>
                        <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.id} style={{ borderBottom: `1px solid ${C.outlineVar}` }}>
                          <td style={{ padding: "12px 8px" }}><span style={{ background: C.surfHi, padding: "2px 6px", fontSize: 10, fontWeight: 600 }}>{b.tag}</span></td>
                          <td style={{ padding: "12px 8px", fontWeight: "bold" }}>{b.title}</td>
                          <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{b.date}</td>
                          <td style={{ padding: "12px 8px", color: C.secondary }}>{b.author}</td>
                          <td style={{ padding: "12px 8px", textAlign: "right" }}>
                            <button onClick={() => openForm("blog", b)} style={{ background: C.surfHi, color: C.primary, border: `1px solid ${C.outlineVar}`, padding: "4px 10px", marginRight: 8, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>EDIT</button>
                            <button onClick={() => handleDelete("blog", b.id)} style={{ background: "rgba(255,107,107,0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>DELETE</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: EVENTS MANAGER */}
            {activeTab === "events" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>NEWS & EVENTS ({events.length})</h2>
                  <button onClick={() => openForm("event")} style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg }}>
                    CREATE UPDATE
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                        <th style={{ padding: "12px 8px", color: C.primary }}>TYPE</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>TITLE</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>DATE</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>SOURCE/PLACE</th>
                        <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((e) => (
                        <tr key={e.id} style={{ borderBottom: `1px solid ${C.outlineVar}` }}>
                          <td style={{ padding: "12px 8px" }}>
                            <span style={{
                              background: e.type === "event" ? "rgba(148, 218, 50, 0.1)" : "rgba(222, 255, 164, 0.1)",
                              border: `1px solid ${e.type === "event" ? C.secondary : C.primary}`,
                              color: e.type === "event" ? C.secondary : C.primary,
                              padding: "2px 6px",
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: "uppercase"
                            }}>{e.type}</span>
                          </td>
                          <td style={{ padding: "12px 8px", fontWeight: "bold" }}>{e.title}</td>
                          <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{e.date}</td>
                          <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{e.type === "event" ? e.location : `Author: ${e.author}`}</td>
                          <td style={{ padding: "12px 8px", textAlign: "right" }}>
                            <button onClick={() => openForm("event", e)} style={{ background: C.surfHi, color: C.primary, border: `1px solid ${C.outlineVar}`, padding: "4px 10px", marginRight: 8, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>EDIT</button>
                            <button onClick={() => handleDelete("event", e.id)} style={{ background: "rgba(255,107,107,0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>DELETE</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: GALLERY MANAGER */}
            {activeTab === "gallery" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>GALLERY PHOTO REGISTRY ({gallery.length})</h2>
                  <button onClick={() => openForm("gallery")} style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg }}>
                    ADD NEW PHOTO
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
                  {gallery.map((g) => (
                    <div key={g.id} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 16, display: "flex", flexDirection: "column" }}>
                      <img src={g.img} alt="" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", border: `1px solid ${C.outlineVar}`, marginBottom: 12 }} />
                      <div style={{ fontSize: 10, fontWeight: 600, color: C.secondary, textTransform: "uppercase", letterSpacing: "1px", fontFamily: C.sg }}>{g.category}</div>
                      <div style={{ fontSize: 14, fontWeight: "bold", margin: "4px 0 16px 0", height: 36, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{g.title}</div>
                      <button onClick={() => handleDelete("gallery", g.id)} style={{ marginTop: "auto", background: "rgba(255,107,107,0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "8px", cursor: "pointer", fontSize: 11, fontWeight: 700, width: "100%" }}>REMOVE FROM DATABASE</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ORDERS LOGS */}
            {activeTab === "orders" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>CUSTOMER ORDERS LOG ({orders.length})</h2>
                </div>

                {orders.length === 0 ? (
                  <div style={{ padding: 40, textAlign: "center", background: C.surfCont, border: `1px solid ${C.outlineVar}`, color: C.onSurfVar, fontFamily: C.sg }}>
                    NO ACTIVE ORDERS REGISTERED IN THE SYSTEM.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                          <th style={{ padding: "12px 8px", color: C.primary }}>ORDER ID</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>DATE</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>CUSTOMER</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>PAYMENT</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>TOTAL</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>STATUS</th>
                          <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => {
                          const isExpanded = expandedOrder === o.id;
                          return (
                            <React.Fragment key={o.id}>
                              <tr style={{ borderBottom: isExpanded ? "none" : `1px solid ${C.outlineVar}` }}>
                                <td style={{ padding: "12px 8px", fontFamily: C.sg, fontWeight: 700, color: C.secondary }}>#{o.id}</td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{o.date}</td>
                                <td style={{ padding: "12px 8px" }}>
                                  <div style={{ fontWeight: "bold" }}>{o.customer?.firstName} {o.customer?.lastName}</div>
                                  <div style={{ fontSize: 11, opacity: 0.7 }}>{o.customer?.email}</div>
                                </td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{o.paymentMethod}</td>
                                <td style={{ padding: "12px 8px", fontWeight: "bold", color: C.primary }}>{o.total}</td>
                                <td style={{ padding: "12px 8px" }}>
                                  <select
                                    value={o.status}
                                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                    style={{
                                      background: C.surfCont,
                                      color: C.onSurf,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 10px",
                                      outline: "none",
                                      fontFamily: C.sg,
                                      fontSize: 12,
                                      fontWeight: 700
                                    }}
                                  >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                  <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : o.id)}
                                    style={{
                                      background: isExpanded ? C.primary : C.surfHi,
                                      color: isExpanded ? C.onPrimary : C.primary,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 12px",
                                      marginRight: 8,
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    {isExpanded ? "HIDE DETAILS" : "VIEW DETAILS"}
                                  </button>
                                  <button
                                    onClick={() => handleDelete("order", o.id)}
                                    style={{
                                      background: "rgba(255,107,107,0.1)",
                                      color: "#ff6b6b",
                                      border: "1px solid #ff6b6b",
                                      padding: "6px 12px",
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    DELETE
                                  </button>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr style={{ borderBottom: `1px solid ${C.outlineVar}`, background: "rgba(148, 218, 50, 0.02)" }}>
                                  <td colSpan={7} style={{ padding: "16px 24px" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, border: `1px dashed ${C.outlineVar}`, padding: 20, background: C.surfCont }}>
                                      <div>
                                        <h4 style={{ fontFamily: C.sg, color: C.secondary, fontSize: 12, marginBottom: 10, letterSpacing: "1px" }}>CUSTOMER INFORMATION</h4>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
                                          <div><span style={{ opacity: 0.6 }}>Full Name:</span> <strong>{o.customer?.firstName} {o.customer?.lastName}</strong></div>
                                          {o.customer?.company && <div><span style={{ opacity: 0.6 }}>Company:</span> <strong>{o.customer?.company}</strong></div>}
                                          <div><span style={{ opacity: 0.6 }}>Phone Number:</span> <strong style={{ color: C.primary }}>{o.customer?.phone}</strong></div>
                                          <div><span style={{ opacity: 0.6 }}>Email Address:</span> <strong>{o.customer?.email}</strong></div>
                                          <div><span style={{ opacity: 0.6 }}>Billing Address:</span> <strong>{o.customer?.address}, {o.customer?.city}, {o.customer?.district || ""}, {o.customer?.postcode}</strong></div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 style={{ fontFamily: C.sg, color: C.secondary, fontSize: 12, marginBottom: 10, letterSpacing: "1px" }}>ORDER LINE ITEMS</h4>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                          {o.items?.map((item, index) => (
                                            <div key={index} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 6 }}>
                                              <span>{item.name} <strong style={{ color: C.secondary }}>x{item.qty}</strong></span>
                                              <span style={{ fontFamily: C.sg, color: C.primary }}>{item.price}</span>
                                            </div>
                                          ))}
                                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: "bold", marginTop: 8, color: C.secondary }}>
                                            <span>TOTAL AMOUNT:</span>
                                            <span style={{ fontFamily: C.sg, color: C.primary }}>{o.total}</span>
                                          </div>
                                        </div>
                                        {o.customer?.notes && (
                                          <div style={{ marginTop: 16, padding: 10, borderLeft: `3px solid ${C.secondary}`, background: "rgba(148, 218, 50, 0.05)", fontSize: 11 }}>
                                            <div style={{ fontWeight: "bold", color: C.secondary, marginBottom: 4 }}>INSTALLATION / DELIVERY NOTES:</div>
                                            <div style={{ color: C.onSurfVar, fontStyle: "italic" }}>"{o.customer?.notes}"</div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: ADD DEALERS */}
            {activeTab === "dealers" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>ADD & REMOVE DEALERS ({dealers.length})</h2>
                  <button onClick={() => openForm("dealer")} style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg, borderRadius: "6px" }}>
                    ADD NEW DEALER
                  </button>
                </div>

                {dealers.length === 0 ? (
                  <div style={{ padding: 40, textAlign: "center", background: C.surfCont, border: `1px solid ${C.outlineVar}`, color: C.onSurfVar, fontFamily: C.sg }}>
                    NO DEALER APPLICATIONS REGISTERED.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                          <th style={{ padding: "12px 8px", color: C.primary }}>COMPANY</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>BUSINESS TYPE</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>CONTACT PERSON</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>LOCATION</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>DATE</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>STATUS</th>
                          <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dealers.map((d) => {
                          const isExpanded = expandedOrder === d.id;
                          return (
                            <React.Fragment key={d.id}>
                              <tr style={{ borderBottom: isExpanded ? "none" : `1px solid ${C.outlineVar}` }}>
                                <td style={{ padding: "12px 8px", fontWeight: "bold" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    {d.companyName}
                                    {d.isPlatinum && (
                                      <span style={{ fontSize: 9, background: "rgba(148, 218, 50, 0.15)", color: "#76B900", padding: "2px 6px", borderRadius: 4, fontWeight: "bold" }}>PLATINUM</span>
                                    )}
                                  </div>
                                </td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{d.businessType}</td>
                                <td style={{ padding: "12px 8px" }}>
                                  <div>{d.contactName}</div>
                                  <div style={{ fontSize: 11, opacity: 0.7 }}>{d.email}</div>
                                  {d.phone && <div style={{ fontSize: 11, color: C.primary, fontWeight: "500" }}>{d.phone}</div>}
                                </td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{d.location}</td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{d.date || "N/A"}</td>
                                <td style={{ padding: "12px 8px" }}>
                                  <select
                                    value={d.status}
                                    onChange={(e) => handleUpdateDealerStatus(d.id, e.target.value)}
                                    style={{
                                      background: C.surfCont,
                                      color: (d.status === "Approved" || d.status === "PLATINUM PARTNER" || d.status === "AUTHORIZED") ? C.secondary : d.status === "Rejected" ? "#ff6b6b" : C.primary,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 10px",
                                      outline: "none",
                                      fontFamily: C.sg,
                                      fontSize: 12,
                                      fontWeight: 700
                                    }}
                                  >
                                    <option value="Vetting">Vetting</option>
                                    <option value="Approved">Approved</option>
                                    <option value="PLATINUM PARTNER">Platinum Partner</option>
                                    <option value="AUTHORIZED">Authorized</option>
                                    <option value="Rejected">Rejected</option>
                                  </select>
                                </td>
                                <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                  <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : d.id)}
                                    style={{
                                      background: isExpanded ? C.primary : C.surfHi,
                                      color: isExpanded ? C.onPrimary : C.primary,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 12px",
                                      marginRight: 8,
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    {isExpanded ? "HIDE DETAILS" : "VIEW PROPOSAL"}
                                  </button>
                                  <button
                                    onClick={() => openForm("dealer", d)}
                                    style={{
                                      background: C.surfHi,
                                      color: C.primary,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 12px",
                                      marginRight: 8,
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    EDIT
                                  </button>
                                  <button
                                    onClick={() => handleDelete("dealer", d.id)}
                                    style={{
                                      background: "rgba(255,107,107,0.1)",
                                      color: "#ff6b6b",
                                      border: "1px solid #ff6b6b",
                                      padding: "6px 12px",
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    DELETE
                                  </button>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr style={{ borderBottom: `1px solid ${C.outlineVar}`, background: "rgba(148, 218, 50, 0.02)" }}>
                                  <td colSpan={7} style={{ padding: "16px 24px" }}>
                                    <div style={{ border: `1px dashed ${C.outlineVar}`, padding: 20, background: C.surfCont }}>
                                      <h4 style={{ fontFamily: C.sg, color: C.secondary, fontSize: 12, marginBottom: 10, letterSpacing: "1px" }}>PROPOSAL BRIEF & INFORMATION</h4>
                                      <p style={{ fontSize: 13, lineHeight: "22px", color: C.onSurf, margin: "0 0 12px 0" }}>
                                        {d.brief || "No description brief provided."}
                                      </p>
                                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 12, borderTop: `1px solid ${C.outlineVar}`, paddingTop: 12, marginTop: 12 }}>
                                        <div><span style={{ opacity: 0.6 }}>Company Name:</span> <strong>{d.companyName}</strong></div>
                                        <div><span style={{ opacity: 0.6 }}>Business Category:</span> <strong>{d.businessType}</strong></div>
                                        <div><span style={{ opacity: 0.6 }}>Primary Contact:</span> <strong>{d.contactName} ({d.email})</strong></div>
                                        <div><span style={{ opacity: 0.6 }}>Target Operations Area:</span> <strong>{d.location}</strong></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: CLIENT MESSAGES */}
            {activeTab === "contacts" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>CLIENT MESSAGES & FEEDBACK ({contacts.length})</h2>
                </div>

                {contacts.length === 0 ? (
                  <div style={{ padding: 40, textAlign: "center", background: C.surfCont, border: `1px solid ${C.outlineVar}`, color: C.onSurfVar, fontFamily: C.sg }}>
                    NO INCOMING CLIENT MESSAGES DETECTED.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                          <th style={{ padding: "12px 8px", color: C.primary }}>STATUS</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>SENDER</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>SUBJECT / PURPOSE</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>MESSAGE SNIPPET</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>DATE</th>
                          <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((msg) => {
                          const isExpanded = expandedOrder === msg.id;
                          return (
                            <React.Fragment key={msg.id}>
                              <tr style={{ borderBottom: isExpanded ? "none" : `1px solid ${C.outlineVar}`, opacity: msg.status === "Read" ? 0.7 : 1 }}>
                                <td style={{ padding: "12px 8px" }}>
                                  <span
                                    style={{
                                      background: msg.status === "Unread" ? "rgba(148, 218, 50, 0.1)" : C.surfCont,
                                      border: `1px solid ${msg.status === "Unread" ? C.secondary : C.outlineVar}`,
                                      color: msg.status === "Unread" ? C.secondary : C.onSurfVar,
                                      padding: "2px 6px",
                                      fontSize: 10,
                                      fontWeight: 700,
                                      textTransform: "uppercase"
                                    }}
                                  >
                                    {msg.status}
                                  </span>
                                </td>
                                <td style={{ padding: "12px 8px" }}>
                                  <div style={{ fontWeight: "bold" }}>{msg.name}</div>
                                  <div style={{ fontSize: 11, opacity: 0.7 }}>{msg.email}</div>
                                </td>
                                <td style={{ padding: "12px 8px", fontWeight: "bold", fontFamily: C.sg, letterSpacing: "0.5px" }}>
                                  {String(msg.subject).toUpperCase().replace("_", " ")}
                                </td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {msg.message}
                                </td>
                                <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{msg.date || "N/A"}</td>
                                <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                  <button
                                    onClick={() => handleUpdateContactStatus(msg.id, msg.status === "Read" ? "Unread" : "Read")}
                                    style={{
                                      background: C.surfHi,
                                      color: C.onSurf,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 12px",
                                      marginRight: 8,
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    {msg.status === "Read" ? "MARK UNREAD" : "MARK READ"}
                                  </button>
                                  <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : msg.id)}
                                    style={{
                                      background: isExpanded ? C.primary : C.surfHi,
                                      color: isExpanded ? C.onPrimary : C.primary,
                                      border: `1px solid ${C.outlineVar}`,
                                      padding: "6px 12px",
                                      marginRight: 8,
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    {isExpanded ? "HIDE TEXT" : "READ FULL"}
                                  </button>
                                  <button
                                    onClick={() => handleDelete("contact", msg.id)}
                                    style={{
                                      background: "rgba(255,107,107,0.1)",
                                      color: "#ff6b6b",
                                      border: "1px solid #ff6b6b",
                                      padding: "6px 12px",
                                      cursor: "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      fontFamily: C.sg
                                    }}
                                  >
                                    DELETE
                                  </button>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr style={{ borderBottom: `1px solid ${C.outlineVar}`, background: "rgba(148, 218, 50, 0.02)" }}>
                                  <td colSpan={6} style={{ padding: "16px 24px" }}>
                                    <div style={{ border: `1px dashed ${C.outlineVar}`, padding: 20, background: C.surfCont }}>
                                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginBottom: 12 }}>
                                        <h4 style={{ fontFamily: C.sg, color: C.secondary, fontSize: 12, margin: 0, letterSpacing: "1px" }}>
                                          SUBJECT: {String(msg.subject).toUpperCase().replace("_", " ")}
                                        </h4>
                                        <span style={{ fontSize: 11, color: C.onSurfVar }}>Received: {msg.date || "N/A"}</span>
                                      </div>
                                      <p style={{ fontSize: 13, lineHeight: "22px", color: C.onSurf, margin: "0 0 16px 0", whiteSpace: "pre-wrap" }}>
                                        {msg.message}
                                      </p>
                                      <div style={{ fontSize: 12, color: C.onSurfVar }}>
                                        Sender Connection: <strong>{msg.name}</strong> (<span style={{ color: C.primary }}>{msg.email}</span>)
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: EDIT SITE CONTENTS */}
            {activeTab === "customize" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>EDIT SITE CONTENTS</h2>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to save all site content changes?")) {
                        saveSiteContents(siteContents).then(() => {
                          loadAllData();
                          addLog("Website dynamic contents updated.", "admin");
                          alert("Site contents saved successfully!");
                        });
                      }
                    }} 
                    style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg, borderRadius: "6px" }}
                  >
                    SAVE ALL CHANGES
                  </button>
                </div>

                {/* Sub-tabs horizontal strip */}
                <div style={{ display: "flex", gap: 10, marginBottom: 30, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 12, overflowX: "auto" }}>
                  {[
                    { id: "home", name: "Home Page" },
                    { id: "about", name: "About Us" },
                    { id: "founder", name: "Founder Page" },
                    { id: "contact", name: "Contact Page" },
                    { id: "global", name: "Global & Socials" },
                    { id: "footer", name: "Footer Settings" },
                    { id: "support_policy", name: "Support & Policies" },
                    { id: "seo_meta", name: "Meta Tags & SEO" }
                  ].map((subTab) => (
                    <button
                      key={subTab.id}
                      type="button"
                      onClick={() => setSiteCustomSubTab(subTab.id)}
                      style={{
                        padding: "8px 16px",
                        background: siteCustomSubTab === subTab.id ? C.primary : "transparent",
                        color: siteCustomSubTab === subTab.id ? C.onPrimary : C.onSurfVar,
                        border: `1px solid ${siteCustomSubTab === subTab.id ? C.primary : "transparent"}`,
                        borderRadius: "4px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: C.sg,
                        transition: "all 0.2s"
                      }}
                    >
                      {subTab.name}
                    </button>
                  ))}
                </div>

                {siteContents ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* HOME PAGE SUBTAB */}
                    {siteCustomSubTab === "home" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>HERO SECTION</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.heroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, heroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO SUBTITLE</label>
                            <textarea 
                              rows={3} 
                              value={siteContents.heroSubtitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, heroSubtitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PRIMARY BUTTON TEXT</label>
                              <input 
                                type="text" 
                                value={siteContents.heroBtnText || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, heroBtnText: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECONDARY BUTTON TEXT</label>
                              <input 
                                type="text" 
                                value={siteContents.heroBtn2Text || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, heroBtn2Text: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>FEATURES STRIP (3 COLUMN CARD GRID)</h3>
                        </div>
                        <div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION HEADER TITLE</label>
                              <input 
                                type="text" 
                                value={siteContents.featuresTitle || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, featuresTitle: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION HEADER SUBTITLE</label>
                              <input 
                                type="text" 
                                value={siteContents.featuresSubtitle || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, featuresSubtitle: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            {siteContents.features?.map((feat, idx) => (
                              <div key={idx} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 16, borderRadius: 6 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 10 }}>FEATURE CARD #{idx + 1}</div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginBottom: 8 }}>
                                  <div>
                                    <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>ICON NAME</label>
                                    <input 
                                      type="text" 
                                      value={feat.icon || ""} 
                                      onChange={(e) => {
                                        const updated = [...siteContents.features];
                                        updated[idx].icon = e.target.value;
                                        setSiteContents({ ...siteContents, features: updated });
                                      }} 
                                      style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>TITLE</label>
                                    <input 
                                      type="text" 
                                      value={feat.title || ""} 
                                      onChange={(e) => {
                                        const updated = [...siteContents.features];
                                        updated[idx].title = e.target.value;
                                        setSiteContents({ ...siteContents, features: updated });
                                      }} 
                                      style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>DESCRIPTION</label>
                                  <textarea 
                                    rows={2} 
                                    value={feat.desc || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.features];
                                      updated[idx].desc = e.target.value;
                                      setSiteContents({ ...siteContents, features: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "none" }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>NIGHTVISION EDGE (WHY US SECTION)</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TAGLINE</label>
                            <input 
                              type="text" 
                              value={siteContents.whyTag || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, whyTag: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div style={{ gridColumn: "span 2" }}>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.whyTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, whyTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SUBTITLE</label>
                          <textarea 
                            rows={2} 
                            value={siteContents.whySubtitle || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, whySubtitle: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          {siteContents.whyFeatures?.map((wf, idx) => (
                            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 10, background: C.surfCont, padding: 12, borderRadius: 6, border: `1px solid ${C.outlineVar}` }}>
                              <div>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>STAT VALUE</label>
                                <input 
                                  type="text" 
                                  value={wf.val || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.whyFeatures];
                                    updated[idx].val = e.target.value;
                                    setSiteContents({ ...siteContents, whyFeatures: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>STAT LABEL</label>
                                <input 
                                  type="text" 
                                  value={wf.label || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.whyFeatures];
                                    updated[idx].label = e.target.value;
                                    setSiteContents({ ...siteContents, whyFeatures: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>FOUNDER BANNER (HOME)</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER NAME</label>
                            <input 
                              type="text" 
                              value={siteContents.homeFounderName || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, homeFounderName: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER TAGLINE</label>
                            <input 
                              type="text" 
                              value={siteContents.homeFounderTag || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, homeFounderTag: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER QUOTE</label>
                          <textarea 
                            rows={2} 
                            value={siteContents.homeFounderQuote || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, homeFounderQuote: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER BIOGRAPHY SHORT DESCRIPTION</label>
                          <textarea 
                            rows={2} 
                            value={siteContents.homeFounderDesc || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, homeFounderDesc: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER PHOTO URL</label>
                            <input 
                              type="text" 
                              value={siteContents.homeFounderImg || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, homeFounderImg: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>OR CHOOSE IMAGE FILE</label>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setSiteContents({ ...siteContents, homeFounderImg: reader.result });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>TESTIMONIALS FEED</h3>
                        </div>
                        <div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {siteContents.testimonials?.map((testi, idx) => (
                              <div key={idx} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 16, borderRadius: 6, position: "relative" }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = siteContents.testimonials.filter((_, i) => i !== idx);
                                    setSiteContents({ ...siteContents, testimonials: updated });
                                  }}
                                  style={{ position: "absolute", top: 12, right: 12, background: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                                >
                                  DELETE
                                </button>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 10 }}>TESTIMONIAL #{idx + 1}</div>
                                <div style={{ marginBottom: 8 }}>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>TESTIMONIAL QUOTE TEXT</label>
                                  <textarea 
                                    rows={2} 
                                    value={testi.text || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.testimonials];
                                      updated[idx].text = e.target.value;
                                      setSiteContents({ ...siteContents, testimonials: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "none" }} 
                                  />
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>AUTHOR DETAILS</label>
                                  <input 
                                    type="text" 
                                    value={testi.author || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.testimonials];
                                      updated[idx].author = e.target.value;
                                      setSiteContents({ ...siteContents, testimonials: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(siteContents.testimonials || [])];
                              updated.push({ text: "\"New Quote here...\"", author: "— AUTHOR NAME, DESIGNATION" });
                              setSiteContents({ ...siteContents, testimonials: updated });
                            }}
                            style={{ marginTop: 12, background: "transparent", border: `1px dashed ${C.primary}`, color: C.primary, padding: "10px", width: "100%", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg }}
                          >
                            + ADD NEW TESTIMONIAL
                          </button>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>EXPAND PARTNERS NETWORK (FOOTER CALL-OUT)</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.expandNetworkTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, expandNetworkTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BUTTON LABEL</label>
                            <input 
                              type="text" 
                              value={siteContents.expandNetworkBtn || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, expandNetworkBtn: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>

                        {/* HOME PAGE LATEST BLOGS BANNER */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>LATEST BLOGS BANNERS (HOMEPAGE)</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BLOG SECTION TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.homeBlogTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, homeBlogTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PROMOTIONAL/BLOG BANNER PICTURE URL</label>
                              <input 
                                type="text" 
                                value={siteContents.homeBlogBanner || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, homeBlogBanner: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>OR CHOOSE IMAGE FILE</label>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setSiteContents({ ...siteContents, homeBlogBanner: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BLOG SECTION SUBTITLE</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.homeBlogSubtitle || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, homeBlogSubtitle: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>READ MORE LINK TEXT</label>
                            <input
                              type="text"
                              value={siteContents.homeBlogReadMoreText || ""}
                              onChange={(e) => setSiteContents({ ...siteContents, homeBlogReadMoreText: e.target.value })}
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>VIEW ALL BLOGS BUTTON</label>
                            <input
                              type="text"
                              value={siteContents.homeBlogViewAllText || ""}
                              onChange={(e) => setSiteContents({ ...siteContents, homeBlogViewAllText: e.target.value })}
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>NEWS & EVENTS BUTTON</label>
                            <input
                              type="text"
                              value={siteContents.homeBlogEventsBtnText || ""}
                              onChange={(e) => setSiteContents({ ...siteContents, homeBlogEventsBtnText: e.target.value })}
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FEATURED BLOGS ON HOMEPAGE (SELECT UP TO 3)</label>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto", border: `1px solid ${C.outlineVar}`, padding: 12, background: C.surfCont }}>
                            {blogs.map((b) => {
                              const featured = siteContents.homeBlogFeaturedSlugs || [];
                              const isChecked = featured.includes(b.slug);
                              return (
                                <label key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.onSurf, cursor: "pointer" }}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      let updated = [...featured];
                                      if (e.target.checked) {
                                        if (updated.length < 3) updated.push(b.slug);
                                      } else {
                                        updated = updated.filter((s) => s !== b.slug);
                                      }
                                      setSiteContents({ ...siteContents, homeBlogFeaturedSlugs: updated });
                                    }}
                                    style={{ accentColor: C.secondary }}
                                  />
                                  {b.title}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ABOUT US SUBTAB */}
                    {siteCustomSubTab === "about" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>ABOUT HERO SECTION</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.aboutHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO DESCRIPTION</label>
                            <textarea 
                              rows={2} 
                              value={siteContents.aboutHeroDesc || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutHeroDesc: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>STORY SECTION</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>STORY HEADLINE</label>
                            <input 
                              type="text" 
                              value={siteContents.aboutStoryTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutStoryTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PARAGRAPH 1</label>
                            <textarea 
                              rows={3} 
                              value={siteContents.aboutStoryDesc1 || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutStoryDesc1: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PARAGRAPH 2</label>
                            <textarea 
                              rows={3} 
                              value={siteContents.aboutStoryDesc2 || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutStoryDesc2: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>VISION & MISSION</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>OUR VISION STATEMENT</label>
                            <textarea 
                              rows={4} 
                              value={siteContents.aboutVision || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutVision: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>OUR MISSION STATEMENT</label>
                            <textarea 
                              rows={4} 
                              value={siteContents.aboutMission || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutMission: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>CORE PILLARS</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PILLARS TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.aboutPillarsTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutPillarsTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PILLARS DESCRIPTION</label>
                            <input 
                              type="text" 
                              value={siteContents.aboutPillarsDesc || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutPillarsDesc: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                          {siteContents.aboutPillars?.map((p, idx) => (
                            <div key={idx} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 16, borderRadius: 6 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 10 }}>PILLAR CARD #{idx + 1}</div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginBottom: 8 }}>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>ICON NAME</label>
                                  <input 
                                    type="text" 
                                    value={p.icon || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.aboutPillars];
                                      updated[idx].icon = e.target.value;
                                      setSiteContents({ ...siteContents, aboutPillars: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                  />
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>TITLE</label>
                                  <input 
                                    type="text" 
                                    value={p.title || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.aboutPillars];
                                      updated[idx].title = e.target.value;
                                      setSiteContents({ ...siteContents, aboutPillars: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                  />
                                </div>
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>CONTENT TEXT</label>
                                <textarea 
                                  rows={3} 
                                  value={p.text || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.aboutPillars];
                                    updated[idx].text = e.target.value;
                                    setSiteContents({ ...siteContents, aboutPillars: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "none" }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>CTA FOOTER</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CTA HEADLINE</label>
                            <input 
                              type="text" 
                              value={siteContents.aboutCtaTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutCtaTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CTA DESCRIPTION</label>
                            <input 
                              type="text" 
                              value={siteContents.aboutCtaDesc || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, aboutCtaDesc: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FOUNDER PAGE SUBTAB */}
                    {siteCustomSubTab === "founder" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>FOUNDER PAGE HERO</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.founderHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO SUBTITLE</label>
                            <textarea 
                              rows={3} 
                              value={siteContents.founderHeroSubtitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderHeroSubtitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO BACKGROUND IMAGE URL</label>
                              <input 
                                type="text" 
                                value={siteContents.founderHeroBg || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, founderHeroBg: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CHOOSE IMAGE FILE</label>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setSiteContents({ ...siteContents, founderHeroBg: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>PERSONAL METRICS & ID CARD</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER NAME</label>
                            <input 
                              type="text" 
                              value={siteContents.founderName || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderName: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>ROLE / DESIGNATION</label>
                            <input 
                              type="text" 
                              value={siteContents.founderRole || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderRole: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>RANK / KEY STATUS</label>
                            <input 
                              type="text" 
                              value={siteContents.founderRank || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderRank: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>NATIONALITY</label>
                            <input 
                              type="text" 
                              value={siteContents.founderNationality || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderNationality: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div style={{ gridColumn: "span 2" }}>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>OPERATIONS BASE / HEADQUARTERS</label>
                            <input 
                              type="text" 
                              value={siteContents.founderHeadquarters || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderHeadquarters: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOUNDER IMAGE URL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderImage || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderImage: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CHOOSE IMAGE FILE</label>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setSiteContents({ ...siteContents, founderImage: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                              }} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>BIOGRAPHY NARRATIVE SECTIONS</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          {siteContents.founderBioSections?.map((section, idx) => (
                            <div key={idx} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 16, borderRadius: 6, position: "relative" }}>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = siteContents.founderBioSections.filter((_, i) => i !== idx);
                                  setSiteContents({ ...siteContents, founderBioSections: updated });
                                }}
                                style={{ position: "absolute", top: 12, right: 12, background: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                              >
                                DELETE
                              </button>
                              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 10 }}>BIOGRAPHY SECTION #{idx + 1}</div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 12, marginBottom: 8 }}>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>NUM/INDEX</label>
                                  <input 
                                    type="text" 
                                    value={section.num || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.founderBioSections];
                                      updated[idx].num = e.target.value;
                                      setSiteContents({ ...siteContents, founderBioSections: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                  />
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>TITLE</label>
                                  <input 
                                    type="text" 
                                    value={section.title || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.founderBioSections];
                                      updated[idx].title = e.target.value;
                                      setSiteContents({ ...siteContents, founderBioSections: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                  />
                                </div>
                              </div>
                              <div style={{ marginBottom: 8 }}>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>PRIMARY TEXT</label>
                                <textarea 
                                  rows={2} 
                                  value={section.text || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.founderBioSections];
                                    updated[idx].text = e.target.value;
                                    setSiteContents({ ...siteContents, founderBioSections: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "vertical" }} 
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>SECONDARY TEXT</label>
                                <textarea 
                                  rows={2} 
                                  value={section.textSec || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.founderBioSections];
                                    updated[idx].textSec = e.target.value;
                                    setSiteContents({ ...siteContents, founderBioSections: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "vertical" }} 
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(siteContents.founderBioSections || [])];
                              updated.push({ num: `0${updated.length + 1}`, title: "New Section", text: "Primary text...", textSec: "Secondary text..." });
                              setSiteContents({ ...siteContents, founderBioSections: updated });
                            }}
                            style={{ background: "transparent", border: `1px dashed ${C.primary}`, color: C.primary, padding: "10px", width: "100%", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg }}
                          >
                            + ADD NEW BIOGRAPHY SECTION
                          </button>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>STARTING THE BRAND SECTION</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>ESTABLISHED YEAR/LABEL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderEst || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderEst: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.founderStartTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderStartTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION DESCRIPTION TEXT</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.founderStartText || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderStartText: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          {siteContents.founderStartStats?.map((stat, idx) => (
                            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: 10, background: C.surfCont, padding: 12, borderRadius: 6, border: `1px solid ${C.outlineVar}` }}>
                              <div>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>STAT VALUE</label>
                                <input 
                                  type="text" 
                                  value={stat.val || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.founderStartStats];
                                    updated[idx].val = e.target.value;
                                    setSiteContents({ ...siteContents, founderStartStats: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>STAT LABEL</label>
                                <textarea 
                                  rows={2}
                                  value={stat.label || ""} 
                                  onChange={(e) => {
                                    const updated = [...siteContents.founderStartStats];
                                    updated[idx].label = e.target.value;
                                    setSiteContents({ ...siteContents, founderStartStats: updated });
                                  }} 
                                  style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "none" }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>MARKET DOMINANCE SECTION</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PHASE LABEL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderMarketPhase || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderMarketPhase: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.founderMarketTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderMarketTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION DESCRIPTION TEXT</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.founderMarketText || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderMarketText: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>NARRATIVE / QUOTE</label>
                          <textarea 
                            rows={2} 
                            value={siteContents.founderMarketQuote || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderMarketQuote: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>DOMINANCE GRAPHICS URL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderMarketImg || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderMarketImg: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CHOOSE IMAGE FILE</label>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setSiteContents({ ...siteContents, founderMarketImg: reader.result });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>KEY HIGHLIGHTS</h3>
                        </div>
                        <div>
                          <div style={{ marginBottom: 16 }}>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.founderHighlightsTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderHighlightsTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            {siteContents.founderHighlights?.map((fh, idx) => (
                              <div key={idx} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 16, borderRadius: 6, position: "relative" }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = siteContents.founderHighlights.filter((_, i) => i !== idx);
                                    setSiteContents({ ...siteContents, founderHighlights: updated });
                                  }}
                                  style={{ position: "absolute", top: 12, right: 12, background: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                                >
                                  DELETE
                                </button>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 10 }}>HIGHLIGHT CARD #{idx + 1}</div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 8 }}>
                                  <div>
                                    <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>ICON (EMOJI/TEXT)</label>
                                    <input 
                                      type="text" 
                                      value={fh.icon || ""} 
                                      onChange={(e) => {
                                        const updated = [...siteContents.founderHighlights];
                                        updated[idx].icon = e.target.value;
                                        setSiteContents({ ...siteContents, founderHighlights: updated });
                                      }} 
                                      style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>TITLE</label>
                                    <input 
                                      type="text" 
                                      value={fh.title || ""} 
                                      onChange={(e) => {
                                        const updated = [...siteContents.founderHighlights];
                                        updated[idx].title = e.target.value;
                                        setSiteContents({ ...siteContents, founderHighlights: updated });
                                      }} 
                                      style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12 }} 
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: 10, marginBottom: 4 }}>HIGHLIGHT DETAILS</label>
                                  <textarea 
                                    rows={2} 
                                    value={fh.desc || ""} 
                                    onChange={(e) => {
                                      const updated = [...siteContents.founderHighlights];
                                      updated[idx].desc = e.target.value;
                                      setSiteContents({ ...siteContents, founderHighlights: updated });
                                    }} 
                                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.outlineVar}`, padding: 8, color: C.onSurf, fontSize: 12, resize: "none" }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(siteContents.founderHighlights || [])];
                              updated.push({ icon: "🚀", title: "New Milestone", desc: "Description text..." });
                              setSiteContents({ ...siteContents, founderHighlights: updated });
                            }}
                            style={{ marginTop: 12, background: "transparent", border: `1px dashed ${C.primary}`, color: C.primary, padding: "10px", width: "100%", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg }}
                          >
                            + ADD NEW HIGHLIGHT
                          </button>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>BRAND VISION SECTION</h3>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SECTION TITLE</label>
                          <input 
                            type="text" 
                            value={siteContents.founderVisionTitle || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderVisionTitle: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BRAND VISION QUOTE</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.founderVisionQuote || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderVisionQuote: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>VISION STATEMENT / DESCRIPTION</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.founderVisionText || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderVisionText: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>VISION BACKGROUND IMAGE URL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderVisionBg || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderVisionBg: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CHOOSE IMAGE FILE</label>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setSiteContents({ ...siteContents, founderVisionBg: reader.result });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>CTA BANNER FOOTER</h3>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CTA TITLE / CALL TO ACTION</label>
                          <input 
                            type="text" 
                            value={siteContents.founderCtaTitle || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, founderCtaTitle: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BUTTON 1 LABEL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderCtaBtn1 || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderCtaBtn1: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BUTTON 2 LABEL</label>
                            <input 
                              type="text" 
                              value={siteContents.founderCtaBtn2 || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, founderCtaBtn2: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CONTACT PAGE SUBTAB */}
                    {siteCustomSubTab === "contact" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>CONTACT HERO SECTION</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.contactHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, contactHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO SUBTITLE</label>
                            <textarea 
                              rows={3} 
                              value={siteContents.contactHeroSubtitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, contactHeroSubtitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "end" }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HERO BACKGROUND IMAGE URL</label>
                              <input 
                                type="text" 
                                value={siteContents.contactHeroImg || ""} 
                                onChange={(e) => setSiteContents({ ...siteContents, contactHeroImg: e.target.value })} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CHOOSE IMAGE FILE</label>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setSiteContents({ ...siteContents, contactHeroImg: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }} 
                                style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, cursor: "pointer" }} 
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>MAP LOCATION DETAILS & COORDINATES</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>LOCATION / OFFICE TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.contactMapTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, contactMapTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CITY / PROVINCE NAME</label>
                            <input 
                              type="text" 
                              value={siteContents.contactMapLocationName || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, contactMapLocationName: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>LATITUDE COORDINATE</label>
                            <input 
                              type="text" 
                              value={siteContents.contactMapLat || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, contactMapLat: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>LONGITUDE COORDINATE</label>
                            <input 
                              type="text" 
                              value={siteContents.contactMapLng || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, contactMapLng: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>LOCATION BRIEF / DESCRIPTION</label>
                          <input 
                            type="text" 
                            value={siteContents.contactMapLocationDesc || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, contactMapLocationDesc: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>GOOGLE MAPS EMBED URL (IFRAME SRC)</label>
                          <textarea 
                            rows={2} 
                            value={siteContents.contactMapEmbedUrl || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, contactMapEmbedUrl: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>GOOGLE MAPS GET DIRECTIONS LINK (URL)</label>
                          <input 
                            type="text" 
                            value={siteContents.contactMapDirectionsUrl || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, contactMapDirectionsUrl: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* GLOBAL & SOCIALS SUBTAB */}
                    {siteCustomSubTab === "global" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>FOOTER DETAILS</h3>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOOTER BRAND DESCRIPTION</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.footerBrandDesc || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, footerBrandDesc: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>SOCIAL MEDIA HANDLES / CHANNELS</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FACEBOOK PAGE URL</label>
                            <input 
                              type="text" 
                              value={siteContents.socialFacebook || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, socialFacebook: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>INSTAGRAM PROFILE URL</label>
                            <input 
                              type="text" 
                              value={siteContents.socialInstagram || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, socialInstagram: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>LINKEDIN URL</label>
                            <input 
                              type="text" 
                              value={siteContents.socialLinkedin || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, socialLinkedin: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TIKTOK HANDLE URL</label>
                            <input 
                              type="text" 
                              value={siteContents.socialTiktok || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, socialTiktok: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>X (TWITTER) URL</label>
                            <input 
                              type="text" 
                              value={siteContents.socialX || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, socialX: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>YOUTUBE CHANNEL URL</label>
                            <input 
                              type="text" 
                              value={siteContents.socialYoutube || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, socialYoutube: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 20 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>TRAFFIC MONITORING PARAMETERS (BASE NUMBERS)</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>ACTIVE SESSIONS BASE</label>
                            <input 
                              type="number" 
                              value={siteContents.trafficActiveSessions || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, trafficActiveSessions: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>DAILY VIEW HITS BASE</label>
                            <input 
                              type="number" 
                              value={siteContents.trafficDailyHits || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, trafficDailyHits: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BANDWIDTH RATE BASE (MB/s)</label>
                            <input 
                              type="text" 
                              value={siteContents.trafficBandwidth || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, trafficBandwidth: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CYBER THREATS BLOCKED BASE</label>
                            <input 
                              type="number" 
                              value={siteContents.trafficThreatsBlocked || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, trafficThreatsBlocked: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>

                      </div>
                    )}

                    {/* SUPPORT & POLICIES SUBTAB */}
                    {siteCustomSubTab === "support_policy" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* SUPPORT PAGE SECTION */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>SUPPORT PAGE</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SUPPORT HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.supportHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, supportHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SUPPORT HELPLINE</label>
                            <input 
                              type="text" 
                              value={siteContents.supportHelpline || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, supportHelpline: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SUPPORT HERO DESCRIPTION</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.supportHeroDesc || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, supportHeroDesc: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        {/* WARRANTY PAGE SECTION */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>WARRANTY PAGE</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>WARRANTY HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.warrantyHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, warrantyHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>WARRANTY HERO BG IMAGE URL</label>
                            <input 
                              type="text" 
                              value={siteContents.warrantyHeroBg || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, warrantyHeroBg: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>WARRANTY HERO SUBTITLE</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.warrantyHeroSubtitle || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, warrantyHeroSubtitle: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        {/* PRIVACY POLICY SECTION */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>PRIVACY POLICY</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PRIVACY HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.privacyHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, privacyHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PRIVACY PROTOCOL LABEL</label>
                            <input 
                              type="text" 
                              value={siteContents.privacyProtocolLabel || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, privacyProtocolLabel: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PRIVACY INTRODUCTION CONTENT</label>
                          <textarea 
                            rows={4} 
                            value={siteContents.privacyIntroContent || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, privacyIntroContent: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        {/* TERMS OF SERVICE SECTION */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>TERMS OF SERVICE</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TERMS HERO TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.termsHeroTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, termsHeroTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TERMS INTRO REVISION DATE</label>
                            <input 
                              type="text" 
                              value={siteContents.termsIntroRevision || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, termsIntroRevision: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TERMS INTRODUCTION CONTENT</label>
                          <textarea 
                            rows={4} 
                            value={siteContents.termsIntroContent || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, termsIntroContent: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* FOOTER SETTINGS SUBTAB */}
                    {siteCustomSubTab === "footer" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>FOOTER BRAND DESCRIPTION & SOCIALS</h3>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FOOTER BRAND DESCRIPTION</label>
                          <textarea 
                            rows={3} 
                            value={siteContents.footerBrandDesc || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, footerBrandDesc: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                          />
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>FOOTER CONTACT INFORMATION ("REACH US")</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>COMPANY PHYSICAL ADDRESS</label>
                            <input 
                              type="text" 
                              value={siteContents.footerAddress || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, footerAddress: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>HELPLINE PHONE NUMBER</label>
                            <input 
                              type="text" 
                              value={siteContents.footerPhone || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, footerPhone: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>EMAIL ADDRESS</label>
                            <input 
                              type="text" 
                              value={siteContents.footerEmail || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, footerEmail: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>WORKING HOURS</label>
                            <input 
                              type="text" 
                              value={siteContents.footerHours || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, footerHours: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                        </div>

                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>NEWSLETTER SUBSCRIPTION SETTINGS</h3>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>NEWSLETTER TITLE</label>
                          <input 
                            type="text" 
                            value={siteContents.footerSubscribeTitle || ""} 
                            onChange={(e) => setSiteContents({ ...siteContents, footerSubscribeTitle: e.target.value })} 
                            style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* META TAGS & SEO SUBTAB */}
                    {siteCustomSubTab === "seo_meta" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* FOOTER PRODUCTS SEO TEXT */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>PRODUCTS DETAIL PAGE SETTINGS</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>RELATED PRODUCTS SECTION TITLE</label>
                            <input 
                              type="text" 
                              value={siteContents.relatedProductsTitle || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, relatedProductsTitle: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
                              PRODUCTS BODY TEXT (RENDERED ABOVE THE FOOTER GLOBAL AREA)
                            </label>
                            <textarea 
                              rows={4} 
                              value={siteContents.footerProductsText || ""} 
                              onChange={(e) => setSiteContents({ ...siteContents, footerProductsText: e.target.value })} 
                              style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} 
                            />
                          </div>
                        </div>

                        {/* PAGE METADATA CONFIG */}
                        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 10, marginTop: 10 }}>
                          <h3 style={{ fontFamily: C.sg, fontSize: 14, color: C.secondary, margin: 0 }}>PAGE METADATA CONFIGURATION (TITLE & DESCRIPTION)</h3>
                        </div>

                        {[
                          { key: "home", label: "Home Page" },
                          { key: "products", label: "Products Catalog" },
                          { key: "about", label: "About Us" },
                          { key: "contact", label: "Contact Page" },
                          { key: "cart", label: "Shopping Cart" },
                          { key: "founder", label: "Founder Page" },
                          { key: "dealership", label: "Dealers Network" },
                          { key: "support", label: "Technical Support" },
                          { key: "warranty", label: "Warranty Policy" },
                          { key: "terms", label: "Terms of Service" },
                          { key: "privacy", label: "Privacy Policy" },
                          { key: "blog", label: "Security Blog" },
                          { key: "gallery", label: "Gallery Page" },
                          { key: "events", label: "News & Events Page" },
                          { key: "checkout", label: "Checkout Page" },
                          { key: "login", label: "Login Page" },
                          { key: "signup", label: "Signup Page" },
                          { key: "forgot_password", label: "Forgot Password Page" },
                          { key: "my_profile", label: "User Profile Page" },
                          { key: "orders", label: "Customer Orders Page" },
                          { key: "settings", label: "Account Settings Page" },
                          { key: "cctv_setup", label: "CCTV Setup Calculator Page" }
                        ].map((page) => (
                          <div key={page.key} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.outlineVar}`, padding: 16, borderRadius: 6 }}>
                            <h4 style={{ fontFamily: C.sg, fontSize: 12, fontWeight: 700, margin: "0 0 12px 0", color: "#fff" }}>{page.label}</h4>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                              <div>
                                <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>META TITLE</label>
                                <input 
                                  type="text" 
                                  value={siteContents[`metaTitle_${page.key}`] || ""} 
                                  onChange={(e) => setSiteContents({ ...siteContents, [`metaTitle_${page.key}`]: e.target.value })} 
                                  style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 10, color: C.onSurf, outline: "none", fontSize: 12 }} 
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>META DESCRIPTION</label>
                                <textarea 
                                  rows={2} 
                                  value={siteContents[`metaDesc_${page.key}`] || ""} 
                                  onChange={(e) => setSiteContents({ ...siteContents, [`metaDesc_${page.key}`]: e.target.value })} 
                                  style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 10, color: C.onSurf, outline: "none", fontSize: 12, resize: "none" }} 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ padding: 40, textAlign: "center", color: C.onSurfVar }}>Loading site contents editor...</div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, borderTop: `1px solid ${C.outlineVar}`, paddingTop: 20, marginTop: 24 }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to save all site content changes?")) {
                        saveSiteContents(siteContents).then(() => {
                          loadAllData();
                          addLog("Website dynamic contents updated.", "admin");
                          alert("Site contents saved successfully!");
                        });
                      }
                    }}
                    style={{ background: C.primary, color: C.onPrimary, border: "none", padding: "12px 32px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg, letterSpacing: "1.5px", borderRadius: "6px" }}
                  >
                    SAVE ALL CHANGES
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SYSTEM SETTINGS */}
            {activeTab === "settings" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>GLOBAL SYSTEM CONFIGURATION</h2>
                </div>

                <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.secondary, letterSpacing: "1px" }}>PRIMARY HELPLINE PHONE</label>
                      <input
                        required
                        type="text"
                        value={settHelpline1}
                        onChange={(e) => setSettHelpline1(e.target.value)}
                        style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.secondary, letterSpacing: "1px" }}>SECONDARY HOTLINE / MOBILE</label>
                      <input
                        required
                        type="text"
                        value={settHelpline2}
                        onChange={(e) => setSettHelpline2(e.target.value)}
                        style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.secondary, letterSpacing: "1px" }}>HEADQUARTERS ADDRESS</label>
                      <input
                        required
                        type="text"
                        value={settAddress}
                        onChange={(e) => setSettAddress(e.target.value)}
                        style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.secondary, letterSpacing: "1px" }}>SUPPORT EMAIL PIPELINE</label>
                      <input
                        required
                        type="email"
                        value={settEmail}
                        onChange={(e) => setSettEmail(e.target.value)}
                        style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.secondary, letterSpacing: "1px" }}>TICKER STRIP MARQUEE ANNOUNCEMENT</label>
                    <textarea
                      required
                      rows={3}
                      value={settBannerText}
                      onChange={(e) => setSettBannerText(e.target.value)}
                      style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.secondary, letterSpacing: "1px" }}>SYSTEM ALERT BANNER MESSAGE</label>
                    <input
                      required
                      type="text"
                      value={settSystemAlert}
                      onChange={(e) => setSettSystemAlert(e.target.value)}
                      style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, borderTop: `1px solid ${C.outlineVar}`, paddingTop: 20, marginTop: 10 }}>
                    <button
                      type="submit"
                      style={{ background: C.primary, color: C.onPrimary, border: "none", padding: "12px 32px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg, letterSpacing: "1.5px", borderRadius: "6px" }}
                    >
                      SAVE WEBSITE SETTINGS
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT: ACTIVITY LOGS */}
            {activeTab === "activities" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>WEBSITE LOG & AUDIT REPORT ({sysLogs.length})</h2>
                  <button 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to CLEAR all activity logs? This cannot be undone.")) {
                        clearActivities().then(() => {
                          loadAllData();
                          addLog("Cleared system activity logs.", "system");
                        });
                      }
                    }} 
                    style={{ background: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", border: "1px solid #ff6b6b", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg, borderRadius: "6px" }}
                  >
                    CLEAR ALL LOGS
                  </button>
                </div>

                {/* LOGS OVERVIEW STATS */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
                  {[
                    { label: "TOTAL LOG ENTRIES", val: sysLogs.length, color: C.secondary },
                    { label: "ADMIN ACTIONS", val: sysLogs.filter(l => l.type === "admin").length, color: C.primary },
                    { label: "ORDER EVENTS", val: sysLogs.filter(l => l.type === "order").length, color: "#10b981" },
                    { label: "CLIENT INQUIRIES", val: sysLogs.filter(l => l.type === "contact" || l.type === "dealer").length, color: "#f59e0b" }
                  ].map((stat, idx) => (
                    <div key={idx} style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "16px 20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.onSurfVar, opacity: 0.65, letterSpacing: "0.5px" }}>{stat.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: C.sg, color: stat.color, marginTop: 4 }}>{stat.val}</div>
                    </div>
                  ))}
                </div>

                {sysLogs.length === 0 ? (
                  <div style={{ padding: 40, textAlign: "center", background: C.surfCont, border: `1px solid ${C.outlineVar}`, color: C.onSurfVar, fontFamily: C.sg, borderRadius: "8px" }}>
                    NO WEBSITE LOGS DETECTED.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                          <th style={{ padding: "12px 8px", color: C.primary, width: "220px" }}>TIMESTAMP</th>
                          <th style={{ padding: "12px 8px", color: C.primary, width: "120px" }}>CATEGORY</th>
                          <th style={{ padding: "12px 8px", color: C.primary }}>ACTIVITY LOG DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sysLogs.map((log) => {
                          let typeBadgeColor = C.secondary;
                          let typeBg = "rgba(56, 189, 248, 0.08)";
                          if (log.type === "order") {
                            typeBadgeColor = "#10b981";
                            typeBg = "rgba(16, 185, 129, 0.08)";
                          } else if (log.type === "contact" || log.type === "dealer") {
                            typeBadgeColor = "#f59e0b";
                            typeBg = "rgba(245, 158, 11, 0.08)";
                          } else if (log.type === "system") {
                            typeBadgeColor = C.outline;
                            typeBg = "rgba(100, 116, 139, 0.08)";
                          }

                          return (
                            <tr key={log.id} style={{ borderBottom: `1px solid ${C.outlineVar}` }}>
                              <td style={{ padding: "12px 8px", color: C.onSurfVar, fontFamily: C.sg, whiteSpace: "nowrap" }}>{log.date}</td>
                              <td style={{ padding: "12px 8px" }}>
                                <span style={{
                                  background: typeBg,
                                  border: `1px solid ${typeBadgeColor}`,
                                  color: typeBadgeColor,
                                  padding: "3px 8px",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  borderRadius: "4px",
                                  textTransform: "uppercase",
                                  fontFamily: C.sg
                                }}>
                                  {log.type}
                                </span>
                              </td>
                              <td style={{ padding: "12px 8px", fontWeight: 500, color: C.onSurf }}>
                                {log.message}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {/* TEAM MEMBERS TAB */}
            {activeTab === "team" && !formType && (
              <div className="admin-fade-in">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.outlineVar}` }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>TEAM MEMBERS ({teamMembers.length})</h2>
                  <button onClick={() => openForm("team_member")} style={{ display: "flex", alignItems: "center", gap: 8, background: C.primary, color: C.onPrimary, border: "none", padding: "10px 16px", borderRadius: "6px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    <Icon name="add" size={16} /> ADD TEAM MEMBER
                  </button>
                </div>
                {teamMembers.length === 0 ? (
                  <p style={{ color: C.onSurfVar, fontSize: 13, background: C.surfCont, padding: 24, borderRadius: "8px", border: `1px dashed ${C.outline}` }}>No team members found. Click "Add Team Member" to create one.</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {teamMembers.map((member) => (
                      <div key={member.id} style={{ background: C.surface, border: `1px solid ${C.outlineVar}`, borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                        <div style={{ height: 160, backgroundImage: `url(${member.image})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                        <div style={{ padding: 20 }}>
                          <h3 style={{ margin: "0 0 4px 0", fontSize: 16, fontFamily: C.sg }}>{member.name}</h3>
                          <p style={{ margin: "0 0 12px 0", fontSize: 12, color: C.primary, fontWeight: 700 }}>{member.role}</p>
                          <div style={{ display: "flex", gap: 8, borderTop: `1px solid ${C.outlineVar}`, paddingTop: 16, marginTop: 16 }}>
                            <button onClick={() => openForm("team_member", member)} style={{ flex: 1, padding: "8px", background: C.surfCont, border: `1px solid ${C.outlineVar}`, borderRadius: "4px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>EDIT</button>
                            <button onClick={() => handleDelete("team_member", member.id)} style={{ flex: 1, padding: "8px", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>DELETE</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {formType === "team_member" && (
              <div className="admin-fade-in admin-form-panel">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>{editItem ? "EDIT TEAM MEMBER" : "ADD NEW TEAM MEMBER"}</h2>
                  <button type="button" onClick={() => setFormType(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: C.onSurfVar }}>
                    <Icon name="close" size={16} /> CANCEL
                  </button>
                </div>
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>MEMBER NAME</label>
                      <input required type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: 12, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>ROLE / TITLE</label>
                      <input required type="text" value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: "100%", padding: 12, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>IMAGE URL</label>
                    <input required type="text" value={formData.image || ""} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ width: "100%", padding: 12, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>BIO</label>
                    <textarea required rows="4" value={formData.bio || ""} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} style={{ width: "100%", padding: 12, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }}></textarea>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>SOCIAL LINKS</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input type="text" placeholder="LinkedIn URL" value={formData.socials?.linkedin || ""} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })} style={{ width: "100%", padding: 10, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                      <input type="text" placeholder="Twitter URL" value={formData.socials?.twitter || ""} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, twitter: e.target.value } })} style={{ width: "100%", padding: 10, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                      <input type="text" placeholder="Facebook URL" value={formData.socials?.facebook || ""} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, facebook: e.target.value } })} style={{ width: "100%", padding: 10, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                      <input type="text" placeholder="Instagram URL" value={formData.socials?.instagram || ""} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })} style={{ width: "100%", padding: 10, border: `1px solid ${C.outlineVar}`, borderRadius: "6px" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 }}>
                    <button type="submit" style={{ background: C.primary, color: C.onPrimary, border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}>SAVE MEMBER</button>
                  </div>
                </form>
              </div>
            )}

            {/* ADMINS TAB */}
            {activeTab === "admins" && !formType && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>ADMINISTRATIVE USER ACCOUNTS ({adminUsers.length})</h2>
                  <button onClick={() => openForm("admin")} style={{ background: C.secondary, color: C.onPrimary, border: "none", padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "1px", cursor: "pointer", fontFamily: C.sg, borderRadius: "6px" }}>
                    REGISTER NEW ADMINISTRATOR
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${C.outlineVar}`, textAlign: "left" }}>
                        <th style={{ padding: "12px 8px", color: C.primary }}>NAME</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>EMAIL ADDRESS</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>ROLE / LEVEL</th>
                        <th style={{ padding: "12px 8px", color: C.primary }}>DATE CREATED</th>
                        <th style={{ padding: "12px 8px", color: C.primary, textAlign: "right" }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((admin) => {
                        const isPrimary = admin.email.toLowerCase() === "admin@nightvision.com";
                        return (
                          <tr key={admin.id} style={{ borderBottom: `1px solid ${C.outlineVar}`, opacity: isPrimary ? 0.95 : 1 }}>
                            <td style={{ padding: "12px 8px", fontWeight: "bold" }}>{admin.name}</td>
                            <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{admin.email}</td>
                            <td style={{ padding: "12px 8px" }}>
                              <span style={{
                                background: isPrimary ? "rgba(56, 189, 248, 0.1)" : "rgba(99, 102, 241, 0.1)",
                                border: `1px solid ${isPrimary ? C.secondary : C.primary}`,
                                color: isPrimary ? C.secondary : C.primary,
                                padding: "2px 6px",
                                fontSize: 10,
                                fontWeight: 700,
                                borderRadius: "4px",
                                textTransform: "uppercase"
                              }}>
                                {admin.role || "Admin"}
                              </span>
                            </td>
                            <td style={{ padding: "12px 8px", color: C.onSurfVar }}>{admin.date || "Jun 08, 2026"}</td>
                            <td style={{ padding: "12px 8px", textAlign: "right" }}>
                              <button
                                onClick={() => handleDelete("admin_user", admin.id)}
                                disabled={isPrimary}
                                style={{
                                  background: isPrimary ? C.surfCont : "rgba(255,107,107,0.1)",
                                  color: isPrimary ? C.outline : "#ff6b6b",
                                  border: `1px solid ${isPrimary ? C.outlineVar : "#ff6b6b"}`,
                                  padding: "6px 12px",
                                  cursor: isPrimary ? "not-allowed" : "pointer",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  borderRadius: "4px"
                                }}
                              >
                                {isPrimary ? "PROTECTED SYSTEM ACCT" : "DELETE ACCOUNT"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRAFFIC MONITOR */}
            {activeTab === "traffic" && !formType && (
              <div>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16 }}>
                  <div>
                    <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700, textTransform: "uppercase" }}>TRAFFIC & TELEMETRY MONITOR</h2>
                    <p style={{ fontSize: 13, color: C.onSurfVar, marginTop: 4 }}>Real-time HTTP ingress stream logs, device statistics, and security threats telemetry.</p>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setIsTrafficPaused(!isTrafficPaused)}
                      style={{
                        background: isTrafficPaused ? "#facc15" : C.secondary,
                        color: isTrafficPaused ? "#1e293b" : C.onPrimary,
                        border: "none",
                        padding: "8px 16px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        cursor: "pointer",
                        fontFamily: C.sg,
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      }}
                    >
                      <Icon name={isTrafficPaused ? "play_arrow" : "pause"} size={16} />
                      {isTrafficPaused ? "RESUME STREAM" : "PAUSE STREAM"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrafficLogs([])}
                      style={{
                        background: C.surfHi,
                        color: C.onSurf,
                        border: `1px solid ${C.outlineVar}`,
                        padding: "8px 16px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        cursor: "pointer",
                        fontFamily: C.sg,
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      }}
                    >
                      <Icon name="clear_all" size={16} />
                      CLEAR LOGS
                    </button>
                  </div>
                </div>

                {/* Telemetry Dials Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                  {/* Card 1: Active Sessions */}
                  <div style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 20, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "pulse 1.5s infinite" }} />
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.onSurfVar, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>ACTIVE SESSIONS</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#10b981", fontFamily: C.sg }}>{trafficActiveSessions}</div>
                    <div style={{ fontSize: 11, color: C.onSurfVar, marginTop: 4 }}>Live socket connections</div>
                  </div>

                  {/* Card 2: Daily Hits */}
                  <div style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 20, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.onSurfVar, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>DAILY IMPRESSIONS</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: C.primary, fontFamily: C.sg }}>{trafficDailyHits.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>+8.3% increase vs yesterday</div>
                  </div>

                  {/* Card 3: Bandwidth */}
                  <div style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 20, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.onSurfVar, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>BANDWIDTH USAGE</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: C.secondary, fontFamily: C.sg }}>{trafficBandwidth.toFixed(2)} GB</div>
                    <div style={{ fontSize: 11, color: C.onSurfVar, marginTop: 4 }}>Network data throughput</div>
                  </div>

                  {/* Card 4: Threat Blocked */}
                  <div style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 20, borderRadius: 8, position: "relative" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.onSurfVar, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>INTRUSIONS BLOCKED</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#ef4444", fontFamily: C.sg }}>{trafficThreats}</div>
                    <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "pulse 1s infinite" }} />
                      Firewall active & scanning
                    </div>
                  </div>
                </div>

                {/* Sub Grid: Logs & Breakdowns */}
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24 }}>
                  {/* Left Column: Live request logs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: C.sg, color: C.onSurf }}>LIVE GATEWAY INGRESS STREAM</h3>
                    <div style={{
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: 8,
                      padding: 16,
                      height: 380,
                      overflowY: "auto",
                      fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#94a3b8",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)"
                    }}>
                      {trafficLogs.length === 0 ? (
                        <div style={{ color: "#64748b", textAlign: "center", padding: "120px 0" }}>
                          [WAITING FOR GATEWAY LOGS...]
                        </div>
                      ) : (
                        trafficLogs.map((log) => {
                          let statusColor = "#10b981"; // green
                          if (log.status >= 400 && log.status < 500) statusColor = "#facc15"; // yellow
                          else if (log.status >= 500) statusColor = "#ef4444"; // red

                          const methodColor = log.method === "POST" ? "#a855f7" : log.method === "OPTIONS" ? "#64748b" : "#3b82f6";

                          return (
                            <div key={log.id} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #1e293b", alignItems: "flex-start" }}>
                              <span style={{ color: "#64748b", whiteSpace: "nowrap" }}>[{log.time}]</span>
                              <span style={{ color: methodColor, fontWeight: 700, width: 55, display: "inline-block" }}>{log.method}</span>
                              <span style={{ color: "#38bdf8", flex: 1, wordBreak: "break-all" }}>{log.path}</span>
                              <span style={{ color: statusColor, fontWeight: 700, width: 35, display: "inline-block" }}>{log.status}</span>
                              <span style={{ color: "#10b981", display: "inline-block", width: 100, textAlign: "right", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{log.location}</span>
                              <span style={{ color: "#64748b", fontSize: 10, width: 60, textAlign: "right" }}>{log.device}</span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Right Column: Analytics breakdowns */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Device distribution */}
                    <div style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 20, borderRadius: 8 }}>
                      <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.onSurf, fontFamily: C.sg, marginBottom: 16 }}>Device Share</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                          { name: "Desktop", share: 55, color: C.primary },
                          { name: "Mobile", share: 38, color: "#10b981" },
                          { name: "Tablet", share: 7, color: C.secondary }
                        ].map((dev) => (
                          <div key={dev.name}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                              <span style={{ color: C.onSurfVar }}>{dev.name}</span>
                              <span style={{ fontWeight: 700 }}>{dev.share}%</span>
                            </div>
                            <div style={{ width: "100%", height: 6, background: C.surfHi, borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${dev.share}%`, height: "100%", background: dev.color, borderRadius: 3 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Regional breakdown */}
                    <div style={{ background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 20, borderRadius: 8 }}>
                      <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.onSurf, fontFamily: C.sg, marginBottom: 12 }}>Geographic Origins</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          { city: "Kathmandu, NP", users: "1,245", pct: "42%" },
                          { city: "Pokhara, NP", users: "684", pct: "23%" },
                          { city: "Lalitpur, NP", users: "322", pct: "11%" },
                          { city: "Bhaktapur, NP", users: "201", pct: "7%" },
                          { city: "International", users: "488", pct: "17%" }
                        ].map((reg, idx) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, borderBottom: idx < 4 ? `1px solid ${C.outlineVar}` : "none", paddingBottom: idx < 4 ? 8 : 0 }}>
                            <span style={{ color: C.onSurfVar, display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: C.secondary }} />
                              {reg.city}
                            </span>
                            <span style={{ fontWeight: 700 }}>{reg.users} ({reg.pct})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FORM CONTAINER (ADD/EDIT PANELS) */}
            {formType && (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.outlineVar}`, paddingBottom: 16, marginBottom: 10 }}>
                  <h2 style={{ fontFamily: C.sg, fontSize: 20, fontWeight: 700 }}>
                    {editItem ? "Edit Item" : "Add New Item"} // {formType.toUpperCase()}
                  </h2>
                  <button type="button" onClick={() => setFormType(null)} style={{ background: C.surfHi, color: C.onSurf, border: `1px solid ${C.outlineVar}`, padding: "8px 16px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                    CANCEL
                  </button>
                </div>

                {/* PRODUCT FORM FIELDS */}
                {formType === "product" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PRODUCT NAME</label>
                        <input required type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>CATEGORY</label>
                        <select value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}>
                          <option value="IP CCTV Cameras">IP CCTV Cameras</option>
                          <option value="Wireless CCTV Cameras">Wireless CCTV Cameras</option>
                          <option value="Network Video Recoder (NVR)">Network Video Recoder (NVR)</option>
                          <option value="POE Switch">POE Switch</option>
                          <option value="Hard Disk">Hard Disk</option>
                          <option value="SD Card">SD Card</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PRODUCT TYPE (Indoor/Outdoor)</label>
                        <input type="text" placeholder="e.g. Indoor CCTV Cameras" value={formData.productType || ""} onChange={(e) => setFormData({ ...formData, productType: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>CAMERA MEGAPIXEL</label>
                        <input type="text" placeholder="e.g. 4 MP (Leave blank if not camera)" value={formData.cameraMp || ""} onChange={(e) => setFormData({ ...formData, cameraMp: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PRICE (Rs.)</label>
                        <input required type="number" value={formData.price || 0} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, alignItems: "end" }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>IMAGE URL</label>
                        <input required type="text" value={formData.img || ""} onChange={(e) => setFormData({ ...formData, img: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>OR CHOOSE IMAGE FILE</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, img: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, borderRadius: "6px", cursor: "pointer" }} />
                      </div>
                    </div>

                    <div style={{ border: `1px dashed ${C.outline}`, padding: 20, borderRadius: 6, background: C.surfCont }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.onSurf }}>ADDITIONAL PRODUCT PHOTOS (CAROUSEL THUMBNAILS)</label>
                      <input type="file" multiple accept="image/*" onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 0) {
                          const promises = files.map(file => {
                            return new Promise((resolve) => {
                              const reader = new FileReader();
                              reader.onloadend = () => resolve(reader.result);
                              reader.readAsDataURL(file);
                            });
                          });
                          Promise.all(promises).then((results) => {
                            setFormData({
                              ...formData,
                              customThumbs: [...(formData.customThumbs || []), ...results]
                            });
                          });
                        }
                      }} style={{ width: "100%", background: C.surface, border: `1px solid ${C.outline}`, padding: "8px 12px", color: C.onSurf, outline: "none", fontSize: 11, borderRadius: "6px", cursor: "pointer", marginBottom: 12 }} />
                      
                      {formData.customThumbs && formData.customThumbs.length > 0 && (
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                          {formData.customThumbs.map((t, idx) => (
                            <div key={idx} style={{ position: "relative", width: 64, height: 64, border: `1px solid ${C.outline}`, borderRadius: 4, overflow: "hidden" }}>
                              <img src={t} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              <button type="button" onClick={() => {
                                const updated = formData.customThumbs.filter((_, i) => i !== idx);
                                setFormData({ ...formData, customThumbs: updated });
                              }} style={{ position: "absolute", top: 2, right: 2, background: "#ff6b6b", color: "#fff", border: "none", borderRadius: "50%", width: 18, height: 18, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>SHORT DESCRIPTION</label>
                      <input required type="text" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>LONG DETAILED DESCRIPTION (BODY TEXT)</label>
                      <textarea required rows={4} value={formData.longDesc || ""} onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>BODY SECTION LABEL</label>
                        <input type="text" placeholder="e.g. TECHNICAL DOCUMENTATION" value={formData.bodySectionLabel || ""} onChange={(e) => setFormData({ ...formData, bodySectionLabel: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>BODY SECTION TITLE</label>
                        <input type="text" placeholder="e.g. SYSTEM SPECIFICATIONS & FIELD ARCHITECTURE" value={formData.bodySectionTitle || ""} onChange={(e) => setFormData({ ...formData, bodySectionTitle: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, alignItems: "end" }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PRODUCT GUIDE PDF URL</label>
                        <input type="text" placeholder="e.g. /assets/guides/manual.pdf" value={formData.guidePdf || ""} onChange={(e) => setFormData({ ...formData, guidePdf: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>OR CHOOSE PDF FILE</label>
                        <input type="file" accept="application/pdf" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, guidePdf: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, borderRadius: "6px", cursor: "pointer" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* BLOG FORM FIELDS */}
                {formType === "blog" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>ARTICLE TITLE</label>
                        <input required type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>ARTICLE TAG</label>
                        <input required type="text" placeholder="e.g. Tech Report" value={formData.tag || ""} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>CATEGORY</label>
                        <input required type="text" placeholder="e.g. Thermal Tech" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>AUTHOR NAME</label>
                        <select value={formData.author || ""} onChange={(e) => setFormData({ ...formData, author: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}>
                          <option value="Madhyam Skaya">Madhyam Skaya</option>
                          <option value="Tech Lead K.">Tech Lead K.</option>
                          <option value="Lakshman S.">Lakshman S.</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PUBLISH DATE</label>
                        <input required type="text" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>COVER IMAGE URL</label>
                      <input required type="text" value={formData.img || ""} onChange={(e) => setFormData({ ...formData, img: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>EXCERPT SUMMARY</label>
                      <input required type="text" value={formData.excerpt || ""} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                    </div>

                    <div style={{ border: `1px dashed ${C.outline}`, padding: 20, borderRadius: 6, background: C.surfCont }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.onSurf }}>ATTACH PDF DOCUMENT (OPTIONAL)</label>
                      <input type="file" accept="application/pdf" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, pdf: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }} style={{ width: "100%", background: C.surface, border: `1px solid ${C.outline}`, padding: "8px 12px", color: C.onSurf, outline: "none", fontSize: 11, borderRadius: "6px", cursor: "pointer", marginBottom: 12 }} />
                      
                      {formData.pdf && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.surface, border: `1px solid ${C.outline}`, padding: "8px 12px", borderRadius: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: "bold", color: C.secondary, display: "flex", alignItems: "center", gap: 8 }}>
                            <Icon name="description" size={16} />
                            PDF Document Attached
                          </span>
                          <button type="button" onClick={() => {
                            setFormData({ ...formData, pdf: null });
                          }} style={{ background: "#ff6b6b", color: "#fff", border: "none", padding: "4px 8px", fontSize: 11, cursor: "pointer", fontWeight: "bold", borderRadius: 4 }}>REMOVE</button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>BODY PARAGRAPHS (Press ENTER to start a new paragraph)</label>
                      <textarea required rows={6} placeholder="Type paragraphs here. Every double line break represents a new paragraph block in the layout." value={formData.content || ""} onChange={(e) => setFormData({ ...formData, content: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} />
                    </div>
                  </div>
                )}

                {/* EVENTS FORM FIELDS */}
                {formType === "event" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>TITLE</label>
                        <input required type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>TYPE</label>
                        <input required type="text" placeholder="e.g. news or event" value={formData.type || "news"} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>TAG/BADGE</label>
                        <input required type="text" value={formData.tag || ""} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>DATE</label>
                        <input required type="text" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>{formData.type === "event" ? "LOCATION" : "AUTHOR"}</label>
                        {formData.type === "event" ? (
                          <input required type="text" placeholder="e.g. Hyatt Regency, KTM" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                        ) : (
                          <input required type="text" placeholder="e.g. Partnership Team" value={formData.author || ""} onChange={(e) => setFormData({ ...formData, author: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                        )}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>IMAGE URL</label>
                      <input required type="text" value={formData.image || ""} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>EXCERPT SUMMARY</label>
                      <input required type="text" value={formData.excerpt || ""} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                    </div>

                    <div style={{ border: `1px dashed ${C.outline}`, padding: 20, borderRadius: 6, background: C.surfCont }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 8, color: C.onSurf }}>ATTACH PDF DOCUMENT (OPTIONAL)</label>
                      <input type="file" accept="application/pdf" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, pdf: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }} style={{ width: "100%", background: C.surface, border: `1px solid ${C.outline}`, padding: "8px 12px", color: C.onSurf, outline: "none", fontSize: 11, borderRadius: "6px", cursor: "pointer", marginBottom: 12 }} />
                      
                      {formData.pdf && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.surface, border: `1px solid ${C.outline}`, padding: "8px 12px", borderRadius: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: "bold", color: C.secondary, display: "flex", alignItems: "center", gap: 8 }}>
                            <Icon name="description" size={16} />
                            PDF Document Attached
                          </span>
                          <button type="button" onClick={() => {
                            setFormData({ ...formData, pdf: null });
                          }} style={{ background: "#ff6b6b", color: "#fff", border: "none", padding: "4px 8px", fontSize: 11, cursor: "pointer", fontWeight: "bold", borderRadius: 4 }}>REMOVE</button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>BODY PARAGRAPHS (Press ENTER to start a new paragraph)</label>
                      <textarea required rows={6} value={formData.content || ""} onChange={(e) => setFormData({ ...formData, content: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical" }} />
                    </div>
                  </div>
                )}

                {/* GALLERY FORM FIELDS */}
                {formType === "gallery" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>DEPLOYMENT TITLE</label>
                        <input required type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>CATEGORY</label>
                        <select value={formData.category || "premium-cameras"} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13 }}>
                          <option value="premium-cameras">Premium Cameras</option>
                          <option value="control-centers">Control Rooms</option>
                          <option value="thermal-ir">Thermal / IR</option>
                          <option value="enterprise-installations">Enterprise Installations</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, alignItems: "end" }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>IMAGE URL</label>
                        <input required type="text" value={formData.img || ""} onChange={(e) => setFormData({ ...formData, img: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>OR CHOOSE IMAGE FILE</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, img: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: "9px 12px", color: C.onSurf, outline: "none", fontSize: 11, borderRadius: "6px", cursor: "pointer" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ADMIN FORM FIELDS */}
                {formType === "admin" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>FULL NAME</label>
                        <input required type="text" placeholder="e.g. John Doe" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>EMAIL ADDRESS</label>
                        <input required type="email" placeholder="e.g. john@nightvision.com" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PASSWORD</label>
                        <input required type="password" placeholder="••••••••" value={formData.password || ""} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>ROLE / ACCESS LEVEL</label>
                        <select value={formData.role || "Admin"} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }}>
                          <option value="Admin">Admin (Full Control)</option>
                          <option value="SuperAdmin">Super Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* DEALER FORM FIELDS */}
                {formType === "dealer" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>COMPANY NAME</label>
                        <input required type="text" value={formData.companyName || ""} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>BUSINESS TYPE</label>
                        <input required type="text" value={formData.businessType || ""} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>CONTACT NAME</label>
                        <input required type="text" value={formData.contactName || ""} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>EMAIL ADDRESS</label>
                        <input required type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>LOCATION</label>
                        <input required type="text" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PHONE NUMBER</label>
                        <input required type="text" placeholder="e.g. +977 9845990344" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>GOOGLE MAPS URL</label>
                        <input type="text" placeholder="e.g. https://maps.google.com/?q=..." value={formData.mapUrl || ""} onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>APPLICATION STATUS</label>
                        <select value={formData.status || "Vetting"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, borderRadius: "6px" }}>
                          <option value="Vetting">Vetting</option>
                          <option value="Approved">Approved</option>
                          <option value="PLATINUM PARTNER">Platinum Partner</option>
                          <option value="AUTHORIZED">Authorized</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 10 }}>
                        <input type="checkbox" id="isPlatinum" checked={!!formData.isPlatinum} onChange={(e) => setFormData({ ...formData, isPlatinum: e.target.checked })} style={{ width: 18, height: 18, accentColor: C.primary, cursor: "pointer" }} />
                        <label htmlFor="isPlatinum" style={{ fontSize: 12, fontWeight: 700, color: C.onSurfVar, cursor: "pointer" }}>MARK AS PLATINUM PARTNER</label>
                      </div>
                      <div />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 6, color: C.onSurfVar }}>PROPOSAL BRIEF</label>
                      <textarea required rows={4} value={formData.brief || ""} onChange={(e) => setFormData({ ...formData, brief: e.target.value })} style={{ width: "100%", background: C.surfCont, border: `1px solid ${C.outlineVar}`, padding: 12, color: C.onSurf, outline: "none", fontSize: 13, resize: "vertical", borderRadius: "6px" }} />
                    </div>
                  </div>
                )}

                {/* FORM ACTIONS */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, borderTop: `1px solid ${C.outlineVar}`, paddingTop: 20 }}>
                  <button type="button" onClick={() => setFormType(null)} style={{ background: C.surfHi, color: C.onSurf, border: `1px solid ${C.outlineVar}`, padding: "12px 24px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg, borderRadius: "6px" }}>
                    CANCEL
                  </button>
                  <button type="submit" style={{ background: C.primary, color: C.onPrimary, border: "none", padding: "12px 32px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: C.sg, letterSpacing: "1px", borderRadius: "6px" }}>
                    {editItem ? "Save Changes" : "Save Item"}
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
