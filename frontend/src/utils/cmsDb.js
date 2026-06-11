// CMS database utility: cmsDb.js
// A client-side IndexedDB database layer for NightVision Blogs, News & Events, and Gallery Photos, with a LocalStorage fallback.

import { useState, useEffect } from "react";
import { articles as SEED_BLOGS } from "../data/blogData";
import { newsEventsData as SEED_EVENTS } from "../data/newsEvents";

const DB_NAME = "NightVisionCMSDB";
const DB_VERSION = 5;
const STORES = {
  BLOGS: "blogs",
  EVENTS: "events",
  GALLERY: "gallery",
  DEALERS: "dealers",
  CONTACTS: "contacts",
  SETTINGS: "settings",
  ACTIVITIES: "activities",
  ADMIN_USERS: "admin_users",
  TEAM_MEMBERS: "team_members"
};

const SEED_DEALERS = [
  {
    id: "nanotek",
    companyName: "Nano Tek",
    businessType: "Surveillance Specialist",
    contactName: "Pawan Shrestha",
    email: "pawan@nanotek.com.np",
    location: "KanchanBari, Biratnagar, Koshi Province, Nepal",
    phone: "+977 9762959446",
    status: "PLATINUM PARTNER",
    isPlatinum: true,
    mapUrl: "https://maps.google.com/?q=KanchanBari,Biratnagar,Nepal",
    brief: "Nano Tek Pvt. Ltd. has been the cornerstone of security infrastructure in Morang for over a decade. As an authorized NV// NIGHTVISION™ partner, they specialize in the deployment of high-tier surveillance systems for both commercial and residential sectors.",
    date: "Jun 08, 2026"
  },
  {
    id: "whitepearl",
    companyName: "White Pearl",
    businessType: "Distributor & Systems Integrator",
    contactName: "Sanjay Dhanusha",
    email: "sanjay@whitepearl.com.np",
    location: "Janakpurdham, Dhanusha, Madhesh Province, Nepal",
    phone: "+977 9845990344",
    status: "PLATINUM PARTNER",
    isPlatinum: true,
    mapUrl: "https://maps.google.com/?q=Janakpurdham,Dhanusha,Nepal",
    brief: "White Pearl is the premier security systems distributor and installation specialist in Dhanusha, Madhesh Province. Specializing in high-performance NV// perimeter networks.",
    date: "Jun 08, 2026"
  },
  {
    id: "night-vision",
    companyName: "Night Vision CCTV",
    businessType: "Certified Installer",
    contactName: "Deepak Bhaktapur",
    email: "deepak@nightvision.com.np",
    location: "Bhaktapur, Bagmati Province, Nepal",
    phone: "+977 9845990344",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.google.com/?q=Bhaktapur,Nepal",
    brief: "Serving the historic city of Bhaktapur with premium residential surveillance systems, local certified engineers, and 24/7 technical support.",
    date: "Jun 08, 2026"
  },
  {
    id: "srsuppliers",
    companyName: "SR Suppliers",
    businessType: "Technology Vendor",
    contactName: "Siddharth Lumbini",
    email: "sid@srsuppliers.com.np",
    location: "Bardaghat, Nawalparasi, Lumbini Province, Nepal",
    phone: "+977 9960457003",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.google.com/?q=Bardaghat,Nawalparasi,Nepal",
    brief: "Authorized dealer in Lumbini Province specializing in warehouse security grids, wireless camera links, and high-altitude weatherproofing setups.",
    date: "Jun 08, 2026"
  },
  {
    id: "axetech",
    companyName: "Axe Tech",
    businessType: "Systems Integrator",
    contactName: "Ashish Banke",
    email: "ashish@axetech.com.np",
    location: "Kohalpur, Banke, Lumbini Province, Nepal",
    phone: "+977 9802575215",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.google.com/?q=Kohalpur,Banke,Nepal",
    brief: "High-grade commercial surveillance and perimeter defense networks in Western Nepal. Deployed in industrial sites, logistics depots, and factories.",
    date: "Jun 08, 2026"
  },
  {
    id: "joshi-kyodai",
    companyName: "Joshi Kyodai",
    businessType: "Certified Dealer",
    contactName: "Joshi Kailali",
    email: "joshi@joshikyodai.com.np",
    location: "Dhangadi, Kailali, Sudurpashchim Province, Nepal",
    phone: "+977 9869049449",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.app.goo.gl/HYBJZupqQaqkanKR7",
    brief: "Sudurpashchim Province's leading systems integrator for smart IoT security, remote control rooms, and commercial video surveillance architectures.",
    date: "Jun 08, 2026"
  }
];


const SEED_CONTACTS = [
  {
    id: "msg-201",
    subject: "TECHNICAL_SUPPORT",
    name: "Sanjib Adhikari",
    email: "sanjib@mail.com",
    message: "The NV-DOME-900 starlight mode has noise in low light. Please send setup guidelines.",
    status: "Unread",
    date: "Jun 06, 2026"
  },
  {
    id: "msg-202",
    subject: "GENERAL_INQUIRY",
    name: "Rupa Thapa",
    email: "thaparupa@outlook.com",
    message: "Do you supply warranty covers for residential setups? Interested in 4 cameras.",
    status: "Read",
    date: "Jun 04, 2026"
  }
];

const SEED_SITE_CONTENTS = {
  id: "site_contents",
  heroTitle: "ADVANCED SURVEILLANCE FOR PEACE OF MIND",
  heroSubtitle: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response.",
  heroBtnText: "VIEW OUR PRODUCTS",
  heroBtn2Text: "Features",
  featuresTitle: "NV NightVision",
  featuresSubtitle: "Advanced and Reliable Security Solutions to meet increasing demands of dynamic and ever-changing security landscape by innovating design, development and production of high-quality Closed-Circuit Television.",
  features: [
    { icon: "power", title: "Easy Installation", desc: "Does not require any wiring and function as Wi-Fi Based plug and play surveillance devices." },
    { icon: "near_me", title: "Advanced Features", desc: "Night Vision Cameras are designed and developed with advanced feature and keeping practical usage in consideration." },
    { icon: "thunderstorm", title: "Durable", desc: "Manufactured to be used for indoor and outdoor purpose to last long from temperature -20 degree to 50+ degree Celsius." },
    { icon: "shield", title: "Secured", desc: "Highly secured application and hardware for absolute privacy which also comes with private mode." }
  ],
  whyTag: "The NightVision Edge",
  whyTitle: "UNCOMPROMISING VIGILANCE TECHNOLOGY",
  whySubtitle: "We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure.",
  whyFeatures: [
    { val: "Weatherproof", label: "IP67 RATED" },
    { val: "24/7 Monitoring", label: "ZERO DOWNTIME" },
    { val: "Remote Access", label: "GLOBAL LINK" },
    { val: "Smart Alerts", label: "AI DETECTION" }
  ],
  testimonialsTitle: "TRUSTED BY LEADERS",
  testimonials: [
    { text: "\"NightVision transformed our facility's security protocol. The Ratri Dome clarity is unparalleled even in pitch black.\"", author: "— S. RAJBHANSARI, INDUSTRIALIST" },
    { text: "\"The mobile app integration is flawless. I can monitor my store from anywhere in the world with zero lag.\"", author: "— A. SHRESTHA, RETAIL GROUP" },
    { text: "\"Exceptional support and robust hardware. These cameras handle the monsoon season without a single glitch.\"", author: "— K. TAMANG, ESTATE MANAGER" }
  ],
  homeFounderName: "ROZIL THAPA",
  homeFounderTag: "Our Founder's Vision",
  homeFounderQuote: "The vision behind NV// was never just about hardware. It was about reclaiming safety in a world that never sleeps.",
  homeFounderDesc: "Founder Rozil Thapa started NightVision with a singular mission: to provide the people of Nepal with security technology that rivals the global elite, without compromise.",
  homeFounderImg: "/founder.jpg",
  
  expandNetworkTitle: "EXPAND THE NETWORK",
  expandNetworkDesc: "Join the elite force of NightVision security providers across Nepal. We provide the gear, the training, and the authority.",
  expandNetworkBtn: "BECOME A PARTNER",

  homeBlogTitle: "Our Blogs",
  homeBlogSubtitle: "Find out how Night Vision offers the best CCTV camera in Nepal and is transforming security in all sectors. From homes to organizations, see how trusted surveillance works in real life.",
  homeBlogBanner: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
  relatedProductsTitle: "Related Products",
  homeBlogFeaturedSlugs: [
    "cctv-camera-price-nepal-2026",
    "best-cctv-brand-nepal-nightvision-game-changer",
    "cctv-camera-maintenance-and-upgrades"
  ],
  homeBlogReadMoreText: "Read More",
  homeBlogViewAllText: "View All Blogs",
  homeBlogEventsBtnText: "News & Events",

  aboutHeroTitle: "ABOUT NIGHTVISION",
  aboutHeroDesc: "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and uncompromising operational reliability.",
  aboutStoryTitle: "UNCOMPROMISING VIGILANCE",
  aboutStoryDesc1: "NIGHTVISION™ was founded in Kathmandu with one objective: eliminate the blind spots where security threats survive. Our systems are engineered to deliver maximum visibility, predictive intelligence, and unmatched operational durability.",
  aboutStoryDesc2: "From AI-powered motion analysis to advanced thermal imaging, we develop surveillance ecosystems that protect thousands of perimeters, commercial facilities, and residential hubs across Nepal.",
  aboutVision: "To redefine global surveillance standards through intelligent, predictive security systems that actively prevent threats before they happen.",
  aboutMission: "To engineer industrial-grade surveillance ecosystems that combine powerful hardware with intelligent software for unmatched reliability and operational awareness.",
  aboutPillarsTitle: "THE PILLARS OF NIGHTVISION",
  aboutPillarsDesc: "We build corporate partnership relationships on accountability, precision engineering, and the absolute trust that our operator networks will always remain protected.",
  aboutPillars: [
    { icon: "psychology", title: "Continuous Innovation", text: "We invest deeply in next-generation optical engineering and neural AI algorithms to keep your perimeter steps ahead of modern security challenges." },
    { icon: "workspace_premium", title: "Industrial-Grade Quality", text: "Every component undergoes rigorous stress-testing to guarantee reliable performance in critical security and extreme weather conditions." },
    { icon: "support_agent", title: "Dedicated Assistance", text: "We provide reliable, direct-line operator support to ensure your security system remains fully online and vigilant at all times." },
    { icon: "verified_user", title: "Ethical Integration", text: "Transparent privacy principles, secure encryption, and robust data protections engineered to keep your security records completely confidential." },
    { icon: "hub", title: "Interoperable Systems", text: "Our products are engineered to seamlessly connect with existing corporate networks, home automation, and global safety infrastructures." },
    { icon: "auto_graph", title: "Adaptive Performance", text: "Continuous firmware upgrades and self-learning camera models that get smarter, faster, and more secure the longer they are deployed." }
  ],
  aboutCtaTitle: "READY FOR THE DARK?",
  aboutCtaDesc: "Join the growing network of organizations and professionals who trust NIGHTVISION™ for critical surveillance and security operations worldwide.",

  founderHeroTitle: "Rozil Thapa: The Vision Behind NightVision",
  founderHeroSubtitle: "Architect of Nepal's most resilient security infrastructure. An uncompromising pursuit of technical dominance.",
  founderHeroBg: "https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw",
  founderName: "ROZIL THAPA",
  founderRole: "FOUNDER / CEO",
  founderNationality: "NEPALESE // KTM",
  founderRank: "COMMAND HUB CHIEF",
  founderHeadquarters: "BHAKTAPUR OPERATIONS",
  founderImage: "/founder.jpg",
  founderBioSections: [
    {
      num: "01",
      title: "Early Life",
      text: "Rozil was then raised by his grandfather, Ram Bahadur Thapa, a respected General Manager at DDC Nepal (Dairy Development Corporation). As a disciplined government employee, Ram Bahadur Thapa provided him a lesson in honesty, discipline, and responsibility.",
      textSec: "Rozil was a visionary person from his childhood who believed in the creation of opportunity rather than staying on order and staying on the safe side of the job. He carried his father’s spirit and legacy of doing something bold. At a very early age, his life carried the mark of enthusiasm, vision, and determination."
    },
    {
      num: "02",
      title: "Education",
      text: "Rozil completed his Secondary Education Examination (SEE) from Modern Boarding Secondary School, Bhaktapur. After completing his SEE level, he then joined Kathmandu World School for the Higher Secondary level (+2) and completed with a 3.45 GPA. After the completion of higher school education, most of his friends and colleagues planned to go abroad, but he started learning and getting involved in surveillance technology.",
      textSec: "Later, he joined TIME International College for his bachelor’s studies. At the time, he was deeply involved and engaged in the surveillance technology sector. While most of Rozil’s friends were studying business, he was practically learning and living in the real business world."
    }
  ],
  founderEst: "EST.2018",
  founderStartTitle: "Starting the Brand",
  founderStartText: "After gaining 2 years of on-the-field experience, he started learning more about business models, import systems, global technological trends, and the psychology of customers. Over the next 4 years, he continued learning about the technical side of the industry and continued learning about the market from backend logistics to front-line sales. His knowledge and experience in the surveillance technology sector helped to shape his brand later.\n\nIn 2023, Rozil took a big step from being a technician to a brand owner by launching NightVision®, a fully registered and trademarked Nepali CCTV brand. He established the brand with the objective of delivering high-quality, affordable, and reliable surveillance technology. NightVision is a brand built to make Nepal proud in the world of innovation and technology.",
  founderStartQuote: "I never wanted to follow the government path. I wanted to finish what my father started — to be a builder, a creator, a businessman.",
  founderStartStats: [
    { val: "01", label: "Initial Prototype\nBuilt & Tested" },
    { val: "24/7", label: "Agile Development\nContinuous Cycle" }
  ],
  founderMarketPhase: "SUCCESS",
  founderMarketTitle: "Success",
  founderMarketText: "Since the launch of Night Vision, the company has seen strong and steady growth. The company adopted a bold marketing campaign with “Timi dekhdaina, tara Night Vision dekcha” as the brand slogan. Under the leadership of Rozil, the company has progressed and earned recognition all over Nepal for its quality and trust in a short period.\n\nNight Vision is preparing to take a leap and enter the global markets where the company will introduce its products to international markets like Australia, Vietnam, and others. From a local CCTV installation company, the brand today offers a variety of NVRs, WiFi cameras, and LAN-powered surveillance devices that are engineered to meet modern security requirements.",
  founderMarketQuote: "Timi dekhdaina, tara Night Vision dekcha",
  founderMarketImg: "https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg",
  founderHighlightsTitle: "Key Highlights",
  founderHighlights: [
    { icon: "rocket_launch", title: "Post-School Launch", desc: "Founded NightVision International Pvt. Ltd. immediately after high school graduation, turning a garage startup into a nationwide enterprise." },
    { icon: "verified", title: "6+ Years Experience", desc: "Over half a decade of hands-on deployment in some of Nepal's most challenging environmental conditions." },
    { icon: "settings", title: "Registered Trademark", desc: "NightVision® is a fully registered and trademarked Nepali brand, built to make Nepal proud in the world of technology." },
    { icon: "groups", title: "Business Strategy", desc: "Operational in both Business-to-Business (B2B) corporate channels and Direct-to-Consumer (D2C) retail retail channels." },
    { icon: "security", title: "Global Footprint", desc: "Preparing for international expansion in 2025–2026, targeting tech deployments in emerging global markets." },
    { icon: "public", title: "Core Philosophy", desc: "Guided by three fundamental pillars of operation: Uncompromising Innovation, Absolute Trust, and Visionary Legacy." }
  ],
  founderVisionTitle: "Brand Vision / Mission",
  founderVisionQuote: "I didn’t just want to sell cameras. I wanted to create a brand that makes people feel secure, proud, and connected. NightVision is that dream — and we’re just getting started.",
  founderVisionText: "Rozil envisions Night Vision as a brand that will globally stand for Nepali technological innovation, reliability, and trust. Also, his mission is to offer quality, innovative technology, and affordable surveillance solutions to customers.\n\nHe believes in building not just products, but trust. The commitment to quality, trust, and customer empowerment is the foundation for Night Vision's philosophy, products, and services.\n\nThe foundation for moving from founding Night Vision to making it a premier CCTV brand globally comes from a deep place of legacy and passion. Night Vision is not just about products and profit for Rozil, but is something that honors his father’s dream.",
  founderVisionBg: "https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFZBHVJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw",
  founderCtaTitle: "Ready to secure your perimeter?",
  founderCtaBtn1: "Consult with our team",
  founderCtaBtn2: "Explore our products",

  footerProductsText: "NIGHTVISION™ is Nepal’s premier security surveillance brand, innovating the design, development, and production of high-quality Closed-Circuit Television (CCTV) cameras. From smart AI-powered IP cameras and long-range outdoor bullets to versatile wireless home monitors, our security systems deliver uncompromising vigilance, continuous night vision, and encrypted live remote streaming. Secure your perimeter with NV NightVision.",

  metaTitle_home: "NightVision - Advanced surveillance for peace of mind",
  metaDesc_home: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response in Nepal.",
  metaTitle_products: "Explore Security Products - NightVision Nepal",
  metaDesc_products: "Browse high-quality CCTV cameras, NVR networks, PoE switches, and surveillance hard disks engineered for uncompromising vigilance.",
  metaTitle_about: "About Us - NightVision Surveillance",
  metaDesc_about: "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and operational reliability.",
  metaTitle_contact: "Contact Us - NightVision Specialists",
  metaDesc_contact: "Get in touch with NightVision surveillance experts in Nepal for custom security consultations, quotes, and product support.",
  metaTitle_cart: "Shopping Cart - NightVision Security",
  metaDesc_cart: "View items in your surveillance equipment shopping cart. Complete your order with secure checkout.",
  metaTitle_founder: "Founder Rozil Thapa - NightVision",
  metaDesc_founder: "The vision behind NightVision Nepal by founder Rozil Thapa. Architecting Nepal's most resilient security infrastructure.",
  metaTitle_dealership: "Dealers & Partners - NightVision Network",
  metaDesc_dealership: "Find authorized NightVision dealers across Nepal or apply to become an official security partner.",
  metaTitle_support: "Technical Support Center - NightVision",
  metaDesc_support: "Access manuals, software downloads, and contact our 24/7 technical surveillance support helpline.",
  metaTitle_warranty: "Ironclad Warranty Policy - NightVision",
  metaDesc_warranty: "Every NightVision unit is forged for endurance. Read about our 1-Year Ironclad Warranty and device support policy.",
  metaTitle_terms: "Terms of Service - NightVision",
  metaDesc_terms: "Terms and conditions governing the use of NightVision surveillance hardware, digital applications, and services.",
  metaTitle_privacy: "Privacy Protocol Policy - NightVision",
  metaDesc_privacy: "Learn how we protect data captured by NightVision surveillance systems. Secure encryption and privacy standards.",
  metaTitle_blog: "Security Intelligence Blog - NightVision",
  metaDesc_blog: "Read latest updates, security tutorials, threat reports, and CCTV guides from NightVision experts.",
  metaTitle_gallery: "Perimeter Installation Gallery - NightVision",
  metaDesc_gallery: "Browse active drone feeds, operations matrix centers, and night vision installation mockups across Nepal.",

  footerBrandDesc: "Dedicated to the highest standard of surveillance technology and national security for Nepal. Security is our duty.",
  footerAddress: "Radhe Radhe, Bhaktapur, Nepal",
  footerPhone: "+977-9745978217",
  footerEmail: "info@nightvision.com.np",
  footerHours: "Sun - Fri: 9:00 AM - 6:00 PM",
  footerSubscribeTitle: "SUBSCRIBE FOR UPDATES",
  socialFacebook: "https://www.facebook.com/nightvisioninterprises",
  socialInstagram: "https://www.instagram.com/nightvision_nepal/",
  socialLinkedin: "https://linkedin.com/",
  socialTiktok: "https://www.tiktok.com/@nvnightvisionnp?lang=en",
  socialX: "https://x.com/",
  socialYoutube: "https://www.youtube.com/@nvnightvisionnp",

  contactHeroTitle: "CONTACT US",
  contactHeroSubtitle: "OUR SURVEILLANCE SPECIALISTS ARE STANDING BY. CONNECT WITH OUR SURVEILLANCE EXPERTS FOR UNCOMPROMISING SECURITY SOLUTIONS.",
  contactHeroImg: "https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw",
  contactMapTitle: "Night Vision CCTV Nepal",
  contactMapLocationName: "Kathmandu, Nepal",
  contactMapLocationDesc: "Advanced Surveillance Headquarters",
  contactMapDirectionsUrl: "https://maps.app.goo.gl/QohWxPHLPzi1MPCu7",
  contactMapLat: "27.677293° N",
  contactMapLng: "85.397990° E",
  contactMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.379656973646!2d85.3979903064471!3d27.677293954618367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1902e459720b%3A0x446057850e6bebe5!2sNight%20Vision%20CCTV%20Nepal!5e1!3m2!1sen!2snp!4v1778740476919!5m2!1sen!2snp",

  supportHeroTitle: "24/7 EXPERT SUPPORT",
  supportHeroDesc: "Our surveillance specialists are ready to help you. Connect with an expert instantly.",
  supportHelpline: "+977-9745978217",
  supportEmail: "info@nightvision.com.np",

  warrantyHeroTitle: "UNCOMPROMISING PROTECTION: WARRANTY POLICY.",
  warrantyHeroSubtitle: "Every NV// unit is forged for endurance. Our 1-Year 'Ironclad' Warranty ensures your perimeter remains secure without failure. In the rare event of a technical issue, we deploy immediate hardware restoration.",
  warrantyHeroBg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAsWqi7mOfZinZloeVK7bABjdrvaSo8ReutefSSHNtFzmkBVb5gKv2eRnkK0Zg_xnXgqVasj2hKnB3nVQ8g5jx9UQ7KgNlt0YWQyIA4gsxww16R1o5U2GtC66U5ub0xCd5u8WD9sLs5MJQ1ik2IWb26FNVwMXR2810anpFienZfLUPqajNfBU6FMtOmXLOPoZC-oLRGL1UwequU_q5aN7aDrDOqC58rU9iY_qP1cS-6dnbeZ-MhjpKH3aEp1BmY-XOehPr8YHtXf8",

  privacyHeroTitle: "PRIVACY POLICY",
  privacyProtocolLabel: "PROTOCOL: PRIVACY_V2.0_NP",
  privacyIntroContent: "At NV// NIGHTVISION™, compromising on security is not an option. Our Privacy Policy outlines the rigid technical standards we employ to protect the data captured by our surveillance ecosystems across Nepal.\n\nWe operate with uncompromising vigilance, ensuring that your personal and environmental data is handled with the highest level of industrial-grade security protocols.",

  termsHeroTitle: "TERMS OF SERVICE",
  termsIntroRevision: "LAST REVISION: OCTOBER 24, 2023",
  termsIntroContent: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and NV// NIGHTVISION™ SECURITY SYSTEMS. By accessing our surveillance solutions, digital platforms, or hardware distribution networks, you acknowledge that you have read, understood, and agreed to be bound by all of these terms.",

  trafficActiveSessions: "1482",
  trafficDailyHits: "84290",
  trafficBandwidth: "28.4",
  trafficThreatsBlocked: "427"
};

const SEED_SETTINGS = [
  {
    id: "global_config",
    helpline1: "01-5925995",
    helpline2: "+977-9745978217",
    address: "Radhe Radhe, Bhaktapur, Nepal",
    email: "info@nightvision.com.np",
    bannerText: "SPECIAL NOTICE: ALL STORES SYNCHRONIZED // HIGH-PERFORMANCE FIRMWARE UPDATE v4.12 AVAILABLE FOR DOWNLOAD.",
    systemAlert: "ALERT: SYSTEM NORMAL // PERIMETER SAFE"
  },
  SEED_SITE_CONTENTS
];

const SEED_GALLERY = [
  {
    id: 1,
    category: "premium-cameras",
    title: "NV-Dome Pro Zero Light Installation",
    model: "NV-DOME-900",
    location: "KTM Office Sector 1",
    resolution: "4K UHD (3840x2160)",
    status: "ACTIVE - SECURED",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    desc: "Premium dome camera deployed in corporate perimeter, featuring dual-lens IR cut filters and AI-based human recognition algorithms."
  },
  {
    id: 2,
    category: "control-centers",
    title: "Central Control Room Grid Array",
    model: "NV-WALL-CONSOLE-v4",
    location: "Bhaktapur Operations Center",
    resolution: "Multi-Feed Matrix",
    status: "ONLINE - SYNCED",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Video wall synchronizing 120+ active CCTV feeds across corporate office networks, utilizing real-time anomaly alerts."
  },
  {
    id: 3,
    category: "thermal-ir",
    title: "Thermal Target Acquisition Feed",
    model: "NV-THERM-x7",
    location: "Mustang High Altitude Outpost",
    resolution: "640x512 Radiometric",
    status: "OPERATIONAL",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    desc: "Long-range thermal sensor field feed capturing heat signatures at sub-zero temperatures. Active motion recognition zone enabled."
  },
  {
    id: 4,
    category: "enterprise-installations",
    title: "Wall Mount PTZ Exterior Deployment",
    model: "NV-PTZ-PREMIUM",
    location: "Industrial Sector West",
    resolution: "4K Zoom 30x",
    status: "ACTIVE - PANNING",
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy-duty outdoor PTZ camera, fully integrated into the customer's remote monitoring dashboard. High wind resistance chassis."
  },
  {
    id: 5,
    category: "control-centers",
    title: "Operations Desk Station 3",
    model: "NV-CLIENT-WORKSTATION-x9",
    location: "Lalitpur Server Hub",
    resolution: "Dual 1080p Monitor Set",
    status: "STANDBY - SECURE",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    desc: "Local administrator monitoring station with direct link to emergency fire alarms and automated security alerts."
  },
  {
    id: 6,
    category: "premium-cameras",
    title: "IR Night-Vision Sub-Assembly Setup",
    model: "NV-BULLET-750",
    location: "Biratnagar Depot Zone",
    resolution: "5MP Smart IR",
    status: "ACTIVE - ONLINE",
    img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    desc: "High-power infrared illuminators array on bullet chassis, designed to render pitch-black shipping containers with crisp clarity."
  },
  {
    id: 7,
    category: "enterprise-installations",
    title: "Encrypted Network Rack Integration",
    model: "NV-NET-SWITCH-24G",
    location: "Pokhara Data Hub",
    resolution: "10Gbps SFP+ Link",
    status: "SECURED - STREAMING",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    desc: "Centralized gigabit optical switches routing encrypted feeds from 40 outdoor units into the primary local storage network."
  },
  {
    id: 8,
    category: "thermal-ir",
    title: "Himalayan Ridge Patrol Sensor Calibration",
    model: "NV-THERM-x7",
    location: "Annapurna Base Perimeter",
    resolution: "1080p Upscaled IR",
    status: "ACTIVE - LIVE",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    desc: "High-altitude environmental housing test for NV-THERM line. Standardized operations maintained at temperatures below -25°C."
  },
  {
    id: 9,
    category: "premium-cameras",
    title: "Residential Gate PTZ Integration",
    model: "NV-PTZ-MINI",
    location: "Residential Zone 4",
    resolution: "4K UHD Smart Mount",
    status: "ACTIVE - SECURED",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Mini-PTZ installation offering residential perimeter coverage. Integrates smart facial alerts and remote two-way audio."
  }
];

const SEED_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Rozil Thapa',
    role: 'Founder & CEO',
    bio: 'Visionary leader dedicated to creating advanced surveillance solutions and pushing the boundaries of security tech in Nepal.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 2,
    name: 'Aisha Sharma',
    role: 'Chief Technology Officer',
    bio: 'Pioneering our AI-powered motion analysis and cloud integration to keep you safe.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 3,
    name: 'Rajeev Shrestha',
    role: 'Head of Operations',
    bio: 'Ensuring seamless deployment and operational durability across our nationwide network.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 4,
    name: 'Sneha Gurung',
    role: 'Lead Developer',
    bio: 'Architecting the software that drives our intelligent systems from the ground up.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 5,
    name: 'Bikash Tamang',
    role: 'Security Analyst',
    bio: 'Analyzing threat patterns to build predictive security models that stop crimes before they happen.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 6,
    name: 'Anjali Chaudhary',
    role: 'AI Research Engineer',
    bio: 'Developing computer vision algorithms and deep learning models for intelligent video analytics.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 7,
    name: 'Sunil Basnet',
    role: 'Hardware Engineering Lead',
    bio: 'Designing high-durability thermal sensors and low-light optical components for our device fleet.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 8,
    name: 'Priya Adhikari',
    role: 'UX/UI Designer',
    bio: 'Crafting intuitive dashboard experiences and seamless mobile interfaces for our security app.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 9,
    name: 'Niranjan Mahato',
    role: 'Cloud Infrastructure Specialist',
    bio: 'Architecting high-availability cloud storage systems and secure video streaming pipelines.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 10,
    name: 'Sabina Karki',
    role: 'Customer Success Director',
    bio: 'Leading our 24/7 technical support and client onboarding operations across major enterprise deployments.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 11,
    name: 'Ramesh Bhatta',
    role: 'Cybersecurity Consultant',
    bio: 'Conducting network penetration testing and securing firmware integrations against potential vulnerabilities.',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 12,
    name: 'Deepa Shrestha',
    role: 'Product Manager',
    bio: 'Bridging the gap between engineering teams and enterprise client requirements to define our product roadmap.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 13,
    name: 'Pradeep Khadka',
    role: 'QA Lead Engineer',
    bio: 'Implementing automated testing frameworks and verifying the stability of software updates.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 14,
    name: 'Kabita Rai',
    role: 'Marketing Manager',
    bio: 'Spreading our mission of uncompromising security and managing public relations and events.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 15,
    name: 'Manish Giri',
    role: 'Senior DevOps Engineer',
    bio: 'Building continuous integration systems and optimizing deployment speeds for our global cloud services.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  }
];

const SEED_ACTIVITIES = [
  {
    id: 1,
    message: "System database initialized with default parameters.",
    type: "system",
    date: "Jun 08, 2026, 09:30 AM"
  },
  {
    id: 2,
    message: "New product 'NV-Dome Pro camera' created in registry.",
    type: "admin",
    date: "Jun 08, 2026, 10:15 AM"
  },
  {
    id: 3,
    message: "Contact message from Rupa Thapa received.",
    type: "contact",
    date: "Jun 08, 2026, 11:22 AM"
  }
];

const SEED_ADMIN_USERS = [
  {
    id: "admin-1",
    name: "Administrator",
    email: "admin@nightvision.com",
    password: "admin123",
    role: "Admin",
    date: "Jun 08, 2026"
  }
];

// Memory fallbacks
const fallbackStores = {
  blogs: [...SEED_BLOGS],
  events: [...SEED_EVENTS],
  gallery: [...SEED_GALLERY],
  dealers: [...SEED_DEALERS],
  contacts: [...SEED_CONTACTS],
  settings: [...SEED_SETTINGS],
  site_contents: [SEED_SITE_CONTENTS],
  activities: [],
  admin_users: [...SEED_ADMIN_USERS],
  team_members: [...SEED_TEAM_MEMBERS]
};

// LocalStorage helpers
function getLocalStorageData(key) {
  try {
    const data = localStorage.getItem(`nv_cms_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function setLocalStorageData(key, data) {
  try {
    localStorage.setItem(`nv_cms_${key}`, JSON.stringify(data));
  } catch (e) {
    // Ignore
  }
}

// Initial seeding from localStorage or code models
Object.keys(STORES).forEach((key) => {
  const storeName = STORES[key];
  const cached = getLocalStorageData(storeName);
  
  let defaultSeeds = [];
  if (storeName === STORES.BLOGS) defaultSeeds = SEED_BLOGS;
  else if (storeName === STORES.EVENTS) defaultSeeds = SEED_EVENTS;
  else if (storeName === STORES.GALLERY) defaultSeeds = SEED_GALLERY;
  else if (storeName === STORES.DEALERS) defaultSeeds = SEED_DEALERS;
  else if (storeName === STORES.CONTACTS) defaultSeeds = SEED_CONTACTS;
  else if (storeName === STORES.SETTINGS) defaultSeeds = SEED_SETTINGS;
  else if (storeName === STORES.ACTIVITIES) defaultSeeds = SEED_ACTIVITIES;
  else if (storeName === STORES.ADMIN_USERS) defaultSeeds = SEED_ADMIN_USERS;
  else if (storeName === STORES.TEAM_MEMBERS) defaultSeeds = SEED_TEAM_MEMBERS;

  if (cached && cached.length > 0) {
    let merged = [...cached];
    let addedAny = false;
    defaultSeeds.forEach((seedItem) => {
      const matchKey = seedItem.id || seedItem.slug;
      if (matchKey && !merged.some((m) => (m.id === matchKey || m.slug === matchKey))) {
        merged.push(seedItem);
        addedAny = true;
      }
    });
    fallbackStores[storeName] = merged;
    if (addedAny) {
      setLocalStorageData(storeName, merged);
    }
  } else {
    fallbackStores[storeName] = [...defaultSeeds];
    setLocalStorageData(storeName, fallbackStores[storeName]);
  }
});

let dbInstance = null;
let dbInitPromise = null;

export function initCmsDb() {
  if (dbInitPromise) {
    return dbInitPromise;
  }

  dbInitPromise = new Promise((resolve) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      Object.values(STORES).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      dbInstance = db;

      // Seed/put standard values on startup to make sure DB is initially aligned
      const transaction = db.transaction(Object.values(STORES), "readwrite");
      
      // Seed blogs
      const blogStore = transaction.objectStore(STORES.BLOGS);
      fallbackStores.blogs.forEach((item) => blogStore.put(item));

      // Seed events
      const eventStore = transaction.objectStore(STORES.EVENTS);
      fallbackStores.events.forEach((item) => eventStore.put(item));

      // Seed gallery
      const galleryStore = transaction.objectStore(STORES.GALLERY);
      fallbackStores.gallery.forEach((item) => galleryStore.put(item));

      // Seed dealers
      const dealerStore = transaction.objectStore(STORES.DEALERS);
      fallbackStores.dealers.forEach((item) => dealerStore.put(item));

      // Seed contacts
      const contactStore = transaction.objectStore(STORES.CONTACTS);
      fallbackStores.contacts.forEach((item) => contactStore.put(item));

      // Seed team members
      const teamStore = transaction.objectStore(STORES.TEAM_MEMBERS);
      fallbackStores.team_members.forEach((item) => teamStore.put(item));

      // Seed settings
      const settingsStore = transaction.objectStore(STORES.SETTINGS);
      fallbackStores.settings.forEach((item) => settingsStore.put(item));

      // Seed activities
      const activitiesStore = transaction.objectStore(STORES.ACTIVITIES);
      fallbackStores.activities.forEach((item) => activitiesStore.put(item));

      // Seed admin users
      const adminUsersStore = transaction.objectStore(STORES.ADMIN_USERS);
      fallbackStores.admin_users.forEach((item) => adminUsersStore.put(item));

      transaction.oncomplete = () => {
        resolve(db);
      };
      
      transaction.onerror = () => {
        resolve(db);
      };
    };

    request.onerror = () => {
      resolve(null);
    };
  });

  return dbInitPromise;
}

// Universal fetch list
function getStoreList(storeName) {
  return new Promise((resolve) => {
    initCmsDb()
      .then((db) => {
        if (!db) {
          resolve(fallbackStores[storeName]);
          return;
        }

        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };
        request.onerror = () => {
          resolve(fallbackStores[storeName]);
        };
      })
      .catch(() => {
        resolve(fallbackStores[storeName]);
      });
  });
}

// Universal save item
function saveStoreItem(storeName, item) {
  return new Promise((resolve, reject) => {
    if (!item.id) {
      item.id = Date.now() + Math.floor(Math.random() * 1000);
    }

    // Convert string IDs if numeric
    const id = typeof item.id === "number" ? item.id : String(item.id);

    // Sync memory
    const idx = fallbackStores[storeName].findIndex((x) => String(x.id) === String(id));
    if (idx >= 0) {
      fallbackStores[storeName][idx] = item;
    } else {
      fallbackStores[storeName].push(item);
    }
    setLocalStorageData(storeName, fallbackStores[storeName]);

    initCmsDb()
      .then((db) => {
        if (!db) {
          resolve(item);
          return;
        }

        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.put(item);

        request.onsuccess = () => {
          resolve(item);
        };
        request.onerror = (e) => {
          reject(e.target.error);
        };
      })
      .catch(() => {
        resolve(item);
      });
  });
}

// Universal delete item
function deleteStoreItem(storeName, id) {
  return new Promise((resolve, reject) => {
    fallbackStores[storeName] = fallbackStores[storeName].filter((x) => String(x.id) !== String(id));
    setLocalStorageData(storeName, fallbackStores[storeName]);

    initCmsDb()
      .then((db) => {
        if (!db) {
          resolve(true);
          return;
        }

        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => {
          resolve(true);
        };
        request.onerror = (e) => {
          reject(e.target.error);
        };
      })
      .catch(() => {
        resolve(true);
      });
  });
}

// --- BLOGS EXPORTS ---
export function getAllBlogs() {
  return getStoreList(STORES.BLOGS);
}

export function getBlogBySlug(slug) {
  return getAllBlogs().then((list) => {
    const item = list.find((x) => x.slug === slug);
    return item || null;
  });
}

export function saveBlog(blog) {
  if (!blog.slug) {
    blog.slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  return saveStoreItem(STORES.BLOGS, blog);
}

export function deleteBlog(id) {
  return deleteStoreItem(STORES.BLOGS, id);
}

// --- EVENTS EXPORTS ---
export function getAllEvents() {
  return getStoreList(STORES.EVENTS);
}

export function getEventBySlug(slug) {
  return getAllEvents().then((list) => {
    const item = list.find((x) => x.slug === slug);
    return item || null;
  });
}

export function saveEvent(event) {
  if (!event.slug) {
    event.slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  return saveStoreItem(STORES.EVENTS, event);
}

export function deleteEvent(id) {
  return deleteStoreItem(STORES.EVENTS, id);
}

// --- GALLERY EXPORTS ---
export function getAllGalleryItems() {
  return getStoreList(STORES.GALLERY);
}

export function saveGalleryItem(item) {
  return saveStoreItem(STORES.GALLERY, item);
}

export function deleteGalleryItem(id) {
  return deleteStoreItem(STORES.GALLERY, id);
}

// --- DEALERS EXPORTS ---
export function getAllDealers() {
  return getStoreList(STORES.DEALERS).then((list) => {
    const targetName = "Western Optics Nepal";
    const toDelete = list.filter(
      (d) =>
        (d.companyName && d.companyName.toLowerCase() === targetName.toLowerCase()) ||
        (d.name && d.name.toLowerCase() === targetName.toLowerCase())
    );
    if (toDelete.length > 0) {
      toDelete.forEach((found) => {
        deleteDealer(found.id);
      });
      const idsToDelete = toDelete.map((d) => d.id);
      return list.filter((d) => !idsToDelete.includes(d.id));
    }
    return list;
  });
}

export function saveDealer(dealer) {
  return saveStoreItem(STORES.DEALERS, dealer);
}

export function deleteDealer(id) {
  return deleteStoreItem(STORES.DEALERS, id);
}

// --- CONTACTS EXPORTS ---
export function getAllContacts() {
  return getStoreList(STORES.CONTACTS);
}

export function saveContact(contact) {
  return saveStoreItem(STORES.CONTACTS, contact);
}

export function deleteContact(id) {
  return deleteStoreItem(STORES.CONTACTS, id);
}

// --- SETTINGS EXPORTS ---
export function getSettings() {
  return getStoreList(STORES.SETTINGS).then((list) => {
    const config = list.find((x) => x.id === "global_config");
    if (config) return config;
    return SEED_SETTINGS[0];
  });
}

export function saveSettings(settings) {
  const settingsWithId = { ...settings, id: "global_config" };
  return saveStoreItem(STORES.SETTINGS, settingsWithId);
}

export function getSiteContents() {
  return getStoreList(STORES.SETTINGS).then((list) => {
    const item = list.find((x) => x.id === "site_contents");
    return item || SEED_SITE_CONTENTS;
  });
}

// --- TEAM MEMBERS EXPORTS ---
export function getAllTeamMembers() {
  return getStoreList(STORES.TEAM_MEMBERS);
}

export function saveTeamMember(member) {
  return saveStoreItem(STORES.TEAM_MEMBERS, member);
}

export function deleteTeamMember(id) {
  return deleteStoreItem(STORES.TEAM_MEMBERS, id);
}

export function saveSiteContents(contents) {
  const contentsWithId = { ...contents, id: "site_contents" };
  return saveStoreItem(STORES.SETTINGS, contentsWithId).then((res) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("siteContentsUpdated"));
      localStorage.setItem("nv_cms_site_contents_ts", Date.now().toString());
    }
    return res;
  });
}

export function useSiteContents() {
  const [contents, setContents] = useState(SEED_SITE_CONTENTS);

  useEffect(() => {
    let active = true;

    function load() {
      getSiteContents().then((dbContents) => {
        if (active && dbContents) {
          setContents(dbContents);
        }
      });
    }

    load();

    if (typeof window !== "undefined") {
      window.addEventListener("siteContentsUpdated", load);
      window.addEventListener("storage", load);
    }

    return () => {
      active = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("siteContentsUpdated", load);
        window.removeEventListener("storage", load);
      }
    };
  }, []);

  return contents;
}

// --- ACTIVITIES EXPORTS ---
export function getAllActivities() {
  return getStoreList(STORES.ACTIVITIES).then((list) => {
    return [...list].sort((a, b) => b.id - a.id);
  });
}

export function saveActivity(message, type = "system") {
  const activity = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    message: message,
    type: type,
    date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
  };
  return saveStoreItem(STORES.ACTIVITIES, activity);
}

export function clearActivities() {
  return new Promise((resolve) => {
    fallbackStores.activities = [];
    setLocalStorageData(STORES.ACTIVITIES, []);
    initCmsDb().then((db) => {
      if (!db) {
        resolve(true);
        return;
      }
      const transaction = db.transaction(STORES.ACTIVITIES, "readwrite");
      const store = transaction.objectStore(STORES.ACTIVITIES);
      store.clear();
      transaction.oncomplete = () => {
        resolve(true);
      };
    });
  });
}

// --- ADMIN USERS EXPORTS ---
export function getAllAdmins() {
  return getStoreList(STORES.ADMIN_USERS);
}

export function saveAdmin(admin) {
  return saveStoreItem(STORES.ADMIN_USERS, admin);
}

export function deleteAdmin(id) {
  return deleteStoreItem(STORES.ADMIN_USERS, id);
}

export function verifyAdminCredentials(email, password) {
  return getAllAdmins().then((list) => {
    const admin = list.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (admin && admin.password === password) {
      return admin;
    }
    return null;
  });
}

// Reset entire CMS database back to defaults
export function resetCmsDatabase() {
  return new Promise((resolve) => {
    fallbackStores.blogs = [...SEED_BLOGS];
    fallbackStores.events = [...SEED_EVENTS];
    fallbackStores.gallery = [...SEED_GALLERY];
    fallbackStores.dealers = [...SEED_DEALERS];
    fallbackStores.contacts = [...SEED_CONTACTS];
    fallbackStores.settings = [...SEED_SETTINGS];
    fallbackStores.activities = [...SEED_ACTIVITIES];
    fallbackStores.admin_users = [...SEED_ADMIN_USERS];
    fallbackStores.team_members = [...SEED_TEAM_MEMBERS];
    
    setLocalStorageData(STORES.BLOGS, fallbackStores.blogs);
    setLocalStorageData(STORES.EVENTS, fallbackStores.events);
    setLocalStorageData(STORES.GALLERY, fallbackStores.gallery);
    setLocalStorageData(STORES.DEALERS, fallbackStores.dealers);
    setLocalStorageData(STORES.CONTACTS, fallbackStores.contacts);
    setLocalStorageData(STORES.SETTINGS, fallbackStores.settings);
    setLocalStorageData(STORES.ACTIVITIES, fallbackStores.activities);
    setLocalStorageData(STORES.ADMIN_USERS, fallbackStores.admin_users);
    setLocalStorageData(STORES.TEAM_MEMBERS, fallbackStores.team_members);

    initCmsDb()
      .then((db) => {
        if (!db) {
          resolve(true);
          return;
        }

        const transaction = db.transaction(Object.values(STORES), "readwrite");
        
        const bStore = transaction.objectStore(STORES.BLOGS);
        bStore.clear();
        fallbackStores.blogs.forEach((x) => bStore.put(x));

        const eStore = transaction.objectStore(STORES.EVENTS);
        eStore.clear();
        fallbackStores.events.forEach((x) => eStore.put(x));

        const gStore = transaction.objectStore(STORES.GALLERY);
        gStore.clear();
        fallbackStores.gallery.forEach((x) => gStore.put(x));

        const dStore = transaction.objectStore(STORES.DEALERS);
        dStore.clear();
        fallbackStores.dealers.forEach((x) => dStore.put(x));

        const cStore = transaction.objectStore(STORES.CONTACTS);
        cStore.clear();
        fallbackStores.contacts.forEach((x) => cStore.put(x));

        const sStore = transaction.objectStore(STORES.SETTINGS);
        sStore.clear();
        fallbackStores.settings.forEach((x) => sStore.put(x));

        const aStore = transaction.objectStore(STORES.ACTIVITIES);
        aStore.clear();
        fallbackStores.activities.forEach((x) => aStore.put(x));

        const adminStore = transaction.objectStore(STORES.ADMIN_USERS);
        adminStore.clear();
        fallbackStores.admin_users.forEach((x) => adminStore.put(x));

        transaction.oncomplete = () => {
          resolve(true);
        };
      })
      .catch(() => {
        resolve(true);
      });
  });
}
