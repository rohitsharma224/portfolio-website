import React, { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "React.js", level: 90, color: "#61DAFB" },
  { name: "JavaScript", level: 85, color: "#F7DF1E" },
  { name: "Java", level: 80, color: "#f89820" },
  { name: "Node.js", level: 75, color: "#68A063" },
  { name: "Tailwind CSS", level: 88, color: "#38BDF8" },
  { name: "REST APIs", level: 80, color: "#FF6B6B" },
  { name: "Git & GitHub", level: 82, color: "#F05032" },
  { name: "SQL / MongoDB", level: 76, color: "#a78bfa" },
];

const PROJECTS = [
  {
    title: "Jewelry E-Commerce Platform",
    desc: "Full-stack e-commerce app with cart, payment gateway integration (UPI/Card), product management, and order tracking.",
    tags: ["React", "Node.js", "MongoDB", "Razorpay"],
    color: "#38bdf8",
    icon: "💎",
    liveUrl: "https://rohit-jewelry-demo.vercel.app",
    githubUrl: "https://github.com/rohitsharma/jewelry-ecommerce",
    previewUrl: "https://rohit-jewelry-demo.vercel.app",
    previewFallback: "jewelry",
  },
  {
    title: "Task Management Dashboard",
    desc: "Kanban-style project manager with drag-and-drop, real-time updates, team collaboration, and analytics overview.",
    tags: ["React", "Firebase", "Chart.js", "DnD"],
    color: "#a78bfa",
    icon: "📋",
    liveUrl: "https://rohit-taskboard.netlify.app",
    githubUrl: "https://github.com/rohitsharma/task-dashboard",
    previewUrl: "https://rohit-taskboard.netlify.app",
    previewFallback: "dashboard",
  },
  {
    title: "Weather & Maps App",
    desc: "Location-based weather forecasting with interactive maps, 7-day forecast, geolocation, and severe weather alerts.",
    tags: ["React", "OpenWeatherAPI", "Leaflet.js"],
    color: "#34d399",
    icon: "🌤️",
    liveUrl: "https://rohit-weather-app.vercel.app",
    githubUrl: "https://github.com/rohitsharma/weather-maps",
    previewUrl: "https://rohit-weather-app.vercel.app",
    previewFallback: "weather",
  },
  {
    title: "Portfolio CMS Builder",
    desc: "Drag-and-drop portfolio builder where users create, publish, and customize their developer portfolio with no code.",
    tags: ["React", "Express", "PostgreSQL", "AWS S3"],
    color: "#fb923c",
    icon: "🛠️",
    liveUrl: "https://rohit-cms-builder.vercel.app",
    githubUrl: "https://github.com/rohitsharma/portfolio-cms",
    previewUrl: "https://rohit-cms-builder.vercel.app",
    previewFallback: "cms",
  },
];

const NAV = ["Home", "About", "Skills", "Projects", "Contact"];

const TESTIMONIALS = [
  { name: "Priya Mehta", role: "Tech Lead, Infosys", text: "Rohit delivered a pixel-perfect UI ahead of schedule. His React and Java skills and attention to detail are exceptional." },
  { name: "Arjun Kapoor", role: "Co-founder, StartupX", text: "One of the most reliable developers I have worked with. Clean code, great communication, zero hand-holding needed." },
];

const products = [
  {
    id: 1,
    name: "Sterling Silver Ring",
    price: 1299,
    rating: 4.8,
    reviews: 124,
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop&auto=format&q=80",
    fallback: "💍",
    desc: "Handcrafted 925 sterling silver",
  },
  {
    id: 2,
    name: "Polki Gold Necklace",
    price: 4999,
    rating: 4.9,
    reviews: 87,
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&auto=format&q=80",
    fallback: "📿",
    desc: "Traditional Rajasthani uncut diamond",
  },
  {
    id: 3,
    name: "Diamond Drop Earrings",
    price: 2499,
    rating: 4.7,
    reviews: 203,
    img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&h=500&fit=crop&auto=format&q=80",
    fallback: "✨",
    desc: "18K gold with lab-grown diamonds",
  },
  {
    id: 4,
    name: "Kundan Bracelet",
    price: 1999,
    rating: 4.6,
    reviews: 156,
    img: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=500&h=500&fit=crop&auto=format&q=80",
    fallback: "🌸",
    desc: "Handset kundan with meenakari work",
  },
];

const PREVIEW_MOCK = {
  jewelry: {
    bg: "#0a0f1e",
    accent: "#38bdf8",
    title: "Rohit Jewelry Store",
    items: ["💎 Silver Ring — ₹1,299", "📿 Polki Necklace — ₹4,999", "✨ Gold Earrings — ₹2,499"],
    cta: "Add to Cart",
  },
  dashboard: {
    bg: "#0f0a1e",
    accent: "#a78bfa",
    title: "TaskBoard Pro",
    items: ["📌 Design Review — In Progress", "✅ API Integration — Done", "🔄 Testing Phase — Todo"],
    cta: "View Board",
  },
  weather: {
    bg: "#0a1810",
    accent: "#34d399",
    title: "WeatherMap App",
    items: ["📍 Jaipur, Rajasthan", "🌡️ 34°C · Clear Sky", "💨 Wind: 12 km/h · Humidity: 42%"],
    cta: "Get Forecast",
  },
  cms: {
    bg: "#1a0f08",
    accent: "#fb923c",
    title: "Portfolio CMS Builder",
    items: ["🖱️ Drag & Drop Components", "🎨 Theme Customizer", "🚀 One-Click Publish"],
    cta: "Start Building",
  },
};

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [payStep, setPayStep] = useState(null);
  const [payDone, setPayDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [demoModal, setDemoModal] = useState(null);
  const [demoTab, setDemoTab] = useState("preview");
  const [imgErrors, setImgErrors] = useState({});
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.2 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (p) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      return ex
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...p, qty: 1 }];
    });
    showToast(`${p.name} added to cart`);
  };

  const handleBuyNow = (p) => {
    setBuyNowProduct(p);
  };

  const handleBuyNowPay = () => {
    setPayDone(true);
    setTimeout(() => {
      setPayDone(false);
      setBuyNowProduct(null);
      showToast("Order confirmed! Thank you 🎉");
    }, 2200);
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const handlePay = () => {
    setPayDone(true);
    setTimeout(() => {
      setPayStep(null); setPayDone(false); setCartItems([]);
      setCartOpen(false); showToast("Order confirmed! Thank you 🎉");
    }, 2200);
  };

  const handleContact = () => {
    if (!formData.name || !formData.email || !formData.message)
      return showToast("Please fill all fields");
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: "", email: "", message: "" });
      showToast("Message sent successfully!");
    }, 1500);
  };

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openDemoModal = (p) => {
    setDemoTab("preview");
    setDemoModal(p);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#070d1a", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" }}>

      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, background: "#1e293b", color: "#38bdf8", padding: "12px 22px", borderRadius: 12, zIndex: 9999, border: "1px solid #334155", fontSize: 14, fontWeight: 500, boxShadow: "0 8px 30px rgba(0,0,0,0.4)", animation: "fadeIn 0.3s ease" }}>
          {toast}
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, backdropFilter: "blur(18px)", background: "rgba(7,13,26,0.88)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#38bdf8,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15 }}>RS</div>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#f1f5f9" }}>Rohit Sharma</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)} style={{ background: activeNav === n ? "rgba(56,189,248,0.12)" : "transparent", color: activeNav === n ? "#38bdf8" : "#94a3b8", border: "none", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}>
                {n}
              </button>
            ))}
            <button onClick={() => setCartOpen(true)} style={{ marginLeft: 8, background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, position: "relative" }}>
              🛒{cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#ef4444", color: "white", borderRadius: "50%", width: 18, height: 18, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="Home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 60% 40%,rgba(99,102,241,0.15) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(56,189,248,0.1) 0%,transparent 50%)", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", maxWidth: 750, padding: "0 24px", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", color: "#38bdf8", padding: "6px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Available for Opportunities ✦
          </div>
          <h1 style={{ fontSize: "clamp(36px,6vw,68px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-2px", background: "linear-gradient(135deg,#f1f5f9 0%,#94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Rohit Sharma
          </h1>
          <p style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 600, color: "#38bdf8", margin: "0 0 20px" }}>
            Full-Stack React & Java Developer · MCA Graduate
          </p>
          <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 36px" }}>
            I build fast, scalable, and beautiful web applications that solve real problems. Passionate about clean code, great UI, and seamless user experiences.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{ background: "linear-gradient(135deg,#38bdf8,#6366f1)", color: "white", border: "none", padding: "14px 30px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              View My Work →
            </button>
            <button onClick={() => scrollTo("Contact")} style={{ background: "transparent", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.15)", padding: "14px 30px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Get in Touch
            </button>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {[["3+", "Years Experience"], ["20+", "Projects Delivered"], ["15+", "Happy Clients"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#38bdf8" }}>{n}</div>
                <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="About" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>About Me</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, margin: "0 0 20px", color: "#f1f5f9", letterSpacing: "-1px" }}>
              Crafting digital products that make an impact
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              I'm a Full-Stack Developer from Jaipur, Rajasthan. I have completed my <strong style={{ color: "#e2e8f0" }}>MCA (Master of Computer Applications)</strong> in 2026 and specialize in React.js, Java, and modern web technologies.
            </p>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              I thrive on turning complex problems into elegant, performant solutions. I believe great software is a blend of technical excellence and thoughtful design.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["MCA Graduate 2026", "Jaipur, Rajasthan", "Open to Remote", "Full-Stack Dev"].map((tag) => (
                <span key={tag} style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["⚡", "Fast Learner", "Adapt quickly to new tech and frameworks"], ["🎯", "Detail Oriented", "Every pixel and line of code matters"], ["🤝", "Team Player", "Strong communicator and collaborator"], ["🚀", "Delivery Focused", "On-time, on-spec, every time"]].map(([icon, title, desc]) => (
              <div key={title} style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 18px" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>Education</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { degree: "MCA — Master of Computer Applications", school: "University, Jaipur", year: "2023 – 2026", current: false, status: "Completed" },
              { degree: "BCA — Bachelor of Computer Applications", school: "University, Jaipur", year: "2020 – 2023", current: false, status: "Completed" },
            ].map((e) => (
              <div key={e.degree} style={{ display: "flex", gap: 18, alignItems: "flex-start", background: "#0a1122", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{e.degree}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>{e.school}</div>
                  <div style={{ fontSize: 12, color: "#22c55e", marginTop: 5, fontWeight: 600 }}>{e.year} · {e.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" ref={skillsRef} style={{ background: "#080e1c", padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <SectionLabel>Technical Skills</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 48px", letterSpacing: "-1px" }}>My Tech Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{s.name}</span>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{s.level}%</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 50, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: skillsVisible ? `${s.level}%` : "0%", background: s.color, borderRadius: 50, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 40 }}>
            {["HTML5", "CSS3", "TypeScript", "Redux", "Spring Boot", "Hibernate", "OOP", "Docker", "Figma", "Jest"].map((t) => (
              <span key={t} style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projects" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>Projects</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 48px", letterSpacing: "-1px" }}>Selected Work</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
          {PROJECTS.map((p) => (
            <div key={p.title}
              style={{ background: "#0a1122", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px 24px", transition: "border-color 0.2s,transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "55"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", margin: "0 0 10px" }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: "0 0 18px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ background: p.color + "18", color: p.color, border: `1px solid ${p.color}30`, padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => openDemoModal(p)} style={{ flex: 1, background: p.color, color: "#070d1a", border: "none", padding: "9px 0", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Live Demo ↗
                </button>
                <button onClick={() => window.open(p.githubUrl, "_blank", "noopener,noreferrer")} style={{ flex: 1, background: "transparent", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.12)", padding: "9px 0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  GitHub →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JEWELRY STORE DEMO */}
      <section style={{ background: "#080e1c", padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <SectionLabel>Live Feature Demo</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 10px", letterSpacing: "-1px" }}>Jewelry E-Commerce Store</h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 40 }}>Fully working demo — add to cart, buy now, checkout, pay. Built as part of my MCA project using React & Node.js.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {products.map((p) => (
              <div key={p.id}
                style={{ background: "#0a1122", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden", transition: "transform 0.2s,border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                <div style={{ height: 220, overflow: "hidden", background: "#111827", position: "relative" }}>
                  {imgErrors[p.id] ? (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>{p.fallback}</div>
                  ) : (
                    <img
                      src={p.img}
                      alt={p.name}
                      onError={() => setImgErrors(prev => ({ ...prev, [p.id]: true }))}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                  )}
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(7,13,26,0.75)", backdropFilter: "blur(6px)", color: "#f59e0b", fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(245,158,11,0.3)" }}>
                    ★ {p.rating}
                  </div>
                </div>
                <div style={{ padding: "16px 16px 20px" }}>
                  <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>{p.name}</h4>
                  <p style={{ margin: "0 0 8px", fontSize: 12, color: "#64748b" }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
                    <span style={{ color: "#f59e0b", fontSize: 12 }}>{"★".repeat(Math.floor(p.rating))}</span>
                    <span style={{ color: "#475569", fontSize: 12 }}>({p.reviews} reviews)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>₹{p.price.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleBuyNow(p)} style={{ flex: 1, background: "linear-gradient(135deg,#38bdf8,#6366f1)", color: "white", border: "none", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      Buy Now
                    </button>
                    <button onClick={() => addToCart(p)} style={{ flex: 1, background: "rgba(56,189,248,0.08)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.25)", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <SectionLabel>Testimonials</SectionLabel>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 40px", letterSpacing: "-1px" }}>What People Say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ background: "#0a1122", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ fontSize: 36, color: "#38bdf8", marginBottom: 14, lineHeight: 1 }}>"</div>
              <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, margin: "0 0 20px" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#38bdf8,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "white" }}>
                  {t.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" style={{ background: "#080e1c", padding: "100px 0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
          <SectionLabel>Contact</SectionLabel>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 10px", letterSpacing: "-1px" }}>Let's Work Together</h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 36 }}>Have a project or opportunity? Send me a message and I'll get back within 24 hours.</p>
          {!formSent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" style={inputStyle} />
              <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Your Email" style={inputStyle} />
              <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Your Message" rows={5} style={{ ...inputStyle, resize: "vertical" }} />
              <button onClick={handleContact} style={{ background: "linear-gradient(135deg,#38bdf8,#6366f1)", color: "white", border: "none", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Send Message →
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 24px", background: "#0a1122", borderRadius: 16, border: "1px solid rgba(56,189,248,0.2)" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
              <h3 style={{ color: "#38bdf8", fontWeight: 700, margin: "0 0 8px" }}>Message Sent!</h3>
              <p style={{ color: "#64748b", fontSize: 14 }}>I'll reply within 24 hours.</p>
            </div>
          )}
          <div style={{ marginTop: 40, padding: 24, background: "#0a1122", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 12 }}>
            {[["📧", "Email", "rohitsharmajpr2020@gmail.com"], ["📱", "Phone", "+91 9982429410"], ["📍", "Location", "Jaipur, Rajasthan, India"]].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ color: "#64748b", fontSize: 13, minWidth: 64 }}>{label}</span>
                <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#334155", fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 14, flexWrap: "wrap" }}>
          {[["GitHub", "https://github.com"], ["LinkedIn", "https://linkedin.com"], ["Twitter", "https://twitter.com"], ["Resume", "#"]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        © 2026 Rohit Sharma · MCA Graduate · Built with React.js
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex" }}>
          <div onClick={() => setCartOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.55)" }} />
          <div style={{ width: 380, background: "#0d1830", borderLeft: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontWeight: 700, color: "#f1f5f9", fontSize: 17 }}>Cart ({cartCount})</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: 60, color: "#475569" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
                  <p style={{ fontSize: 14 }}>Your cart is empty</p>
                </div>
              ) : cartItems.map((i) => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", background: "#111827", flexShrink: 0 }}>
                      {imgErrors[i.id]
                        ? <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{i.fallback}</div>
                        : <img src={i.img} alt={i.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{i.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>₹{i.price.toLocaleString()} × {i.qty}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 700, color: "#38bdf8", fontSize: 14 }}>₹{(i.price * i.qty).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(i.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div style={{ padding: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#64748b", fontSize: 14 }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: "#38bdf8" }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                <button onClick={() => setPayStep("method")} style={{ width: "100%", background: "linear-gradient(135deg,#38bdf8,#6366f1)", color: "white", border: "none", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAYMENT MODAL (cart) */}
      {payStep && (
        <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#0d1830", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 380, textAlign: "center" }}>
            {!payDone ? (
              <>
                <div style={{ fontSize: 36, marginBottom: 12 }}>💳</div>
                <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 20, margin: "0 0 6px" }}>Choose Payment</h3>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Total: ₹{cartTotal.toLocaleString()}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                  {[["📱 UPI", "Google Pay / PhonePe / Paytm"], ["💳 Credit / Debit Card", "Visa, Mastercard, RuPay"], ["🏦 Net Banking", "All major banks supported"]].map(([label, sub]) => (
                    <button key={label} onClick={handlePay} style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.2)", color: "#f1f5f9", padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left" }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{sub}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setPayStep(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13 }}>Cancel</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                <h3 style={{ color: "#22c55e", fontWeight: 800, fontSize: 22, margin: "0 0 8px" }}>Payment Successful!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Your order is confirmed. Thank you!</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* BUY NOW MODAL */}
      {buyNowProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#0d1830", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 20, padding: "32px 28px", width: "100%", maxWidth: 420 }}>
            {!payDone ? (
              <>
                <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden", background: "#111827", flexShrink: 0 }}>
                    {imgErrors[buyNowProduct.id]
                      ? <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{buyNowProduct.fallback}</div>
                      : <img src={buyNowProduct.img} alt={buyNowProduct.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#f1f5f9" }}>{buyNowProduct.name}</h3>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: "#64748b" }}>{buyNowProduct.desc}</p>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>₹{buyNowProduct.price.toLocaleString()}</span>
                  </div>
                </div>
                <h4 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, margin: "0 0 16px" }}>Select Payment Method</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                  {[["📱 UPI", "Google Pay / PhonePe / Paytm"], ["💳 Credit / Debit Card", "Visa, Mastercard, RuPay"], ["🏦 Net Banking", "All major banks supported"]].map(([label, sub]) => (
                    <button key={label} onClick={handleBuyNowPay} style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.2)", color: "#f1f5f9", padding: "13px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left" }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{sub}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setBuyNowProduct(null)} style={{ width: "100%", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13 }}>Cancel</button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                <h3 style={{ color: "#22c55e", fontWeight: 800, fontSize: 22, margin: "0 0 8px" }}>Order Placed!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Your {buyNowProduct.name} is on its way!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LIVE DEMO MODAL — with embedded project preview */}
      {demoModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#0d1830", border: `1px solid ${demoModal.color}33`, borderRadius: 20, width: "100%", maxWidth: 700, overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            {/* Modal Header */}
            <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>{demoModal.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{demoModal.title}</h3>
                  <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
                    {demoModal.tags.map(t => (
                      <span key={t} style={{ background: demoModal.color + "18", color: demoModal.color, border: `1px solid ${demoModal.color}30`, padding: "2px 8px", borderRadius: 5, fontSize: 11, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setDemoModal(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
              {["preview", "details"].map(tab => (
                <button key={tab} onClick={() => setDemoTab(tab)} style={{ flex: 1, background: demoTab === tab ? "rgba(56,189,248,0.08)" : "transparent", color: demoTab === tab ? "#38bdf8" : "#64748b", border: "none", borderBottom: demoTab === tab ? `2px solid ${demoModal.color}` : "2px solid transparent", padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                  {tab === "preview" ? "🖥 Live Preview" : "📄 Project Details"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ flex: 1, overflow: "auto" }}>
              {demoTab === "preview" ? (
                <ProjectPreview project={demoModal} />
              ) : (
                <div style={{ padding: 28 }}>
                  <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{demoModal.desc}</p>
                  <h4 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14, margin: "0 0 14px" }}>Tech Stack Used</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {demoModal.tags.map(t => (
                      <span key={t} style={{ background: demoModal.color + "18", color: demoModal.color, border: `1px solid ${demoModal.color}30`, padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() => { const w = window.open(demoModal.liveUrl, "_blank", "noopener,noreferrer"); if (!w) showToast("Please allow popups"); }}
                      style={{ flex: 1, background: demoModal.color, color: "#070d1a", border: "none", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                      Open Full Site ↗
                    </button>
                    <button
                      onClick={() => { const w = window.open(demoModal.githubUrl, "_blank", "noopener,noreferrer"); if (!w) showToast("Please allow popups"); }}
                      style={{ flex: 1, background: "transparent", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.12)", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                      View on GitHub →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #070d1a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
}

function ProjectPreview({ project }) {
  const mock = PREVIEW_MOCK[project.previewFallback];
  const [activeItem, setActiveItem] = useState(null);
  const [cartAdded, setCartAdded] = useState(false);

  const handleAction = (item) => {
    setActiveItem(item);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1500);
  };

  if (project.previewFallback === "jewelry") {
    return (
      <div style={{ background: "#070d1a", minHeight: 420 }}>
        <div style={{ background: "#0a1122", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#38bdf8" }}>💎 Rohit Jewelry Store</span>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.25)", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>🛒 {cartAdded ? "1" : "0"}</span>
            <span style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e33", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>● Live</span>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: "#f1f5f9" }}>Fine Jewelry Collection</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>Handcrafted in Jaipur · Free shipping above ₹2,999</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { name: "Silver Ring", price: "₹1,299", emoji: "💍", rating: "4.8" },
              { name: "Polki Necklace", price: "₹4,999", emoji: "📿", rating: "4.9" },
              { name: "Gold Earrings", price: "₹2,499", emoji: "✨", rating: "4.7" },
              { name: "Kundan Bracelet", price: "₹1,999", emoji: "🌸", rating: "4.6" },
            ].map((item) => (
              <div key={item.name} style={{ background: "#0f1829", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 80, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{item.emoji}</div>
                <div style={{ padding: "10px 10px 12px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 2 }}>{item.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#38bdf8" }}>{item.price}</span>
                    <span style={{ fontSize: 11, color: "#f59e0b" }}>★ {item.rating}</span>
                  </div>
                  <button
                    onClick={() => handleAction(item.name)}
                    style={{ width: "100%", background: activeItem === item.name && cartAdded ? "#22c55e" : "linear-gradient(135deg,#38bdf8,#6366f1)", color: "white", border: "none", padding: "7px 0", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}>
                    {activeItem === item.name && cartAdded ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>Powered by React + Node.js + Razorpay</span>
            <span style={{ fontSize: 12, color: "#38bdf8", fontWeight: 600 }}>Full Source →</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.previewFallback === "dashboard") {
    const cols = ["Todo", "In Progress", "Done"];
    const cards = [
      { col: "Todo", title: "Design Review", priority: "High", color: "#ef4444" },
      { col: "In Progress", title: "API Integration", priority: "Medium", color: "#f59e0b" },
      { col: "In Progress", title: "Testing Phase", priority: "High", color: "#ef4444" },
      { col: "Done", title: "UI Components", priority: "Low", color: "#22c55e" },
      { col: "Done", title: "DB Schema", priority: "Medium", color: "#f59e0b" },
    ];
    return (
      <div style={{ background: "#070d1a", minHeight: 420 }}>
        <div style={{ background: "#0a1122", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#a78bfa" }}>📋 TaskBoard Pro</span>
          <span style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e33", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>● Live</span>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {cols.map(col => (
              <div key={col} style={{ background: "#0f1829", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>{col} <span style={{ color: "#475569", fontWeight: 500 }}>({cards.filter(c => c.col === col).length})</span></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {cards.filter(c => c.col === col).map(card => (
                    <div key={card.title} style={{ background: "#070d1a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, padding: "10px 10px 8px", borderLeft: `3px solid ${card.color}` }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9", marginBottom: 6 }}>{card.title}</div>
                      <span style={{ background: card.color + "22", color: card.color, padding: "2px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{card.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 8, fontSize: 12, color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
            <span>React + Firebase + Chart.js + Drag & Drop</span>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Full Source →</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.previewFallback === "weather") {
    return (
      <div style={{ background: "#070d1a", minHeight: 420 }}>
        <div style={{ background: "#0a1122", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#34d399" }}>🌤 WeatherMap App</span>
          <span style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e33", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>● Live</span>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ background: "linear-gradient(135deg,#0f2a1e,#0a1e30)", borderRadius: 14, padding: 20, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>📍 Jaipur, Rajasthan</div>
                <div style={{ fontSize: 48, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>34°C</div>
                <div style={{ fontSize: 14, color: "#34d399", marginTop: 6 }}>Clear Sky · Feels like 37°C</div>
              </div>
              <div style={{ fontSize: 64 }}>☀️</div>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[["💧", "42%", "Humidity"], ["💨", "12 km/h", "Wind"], ["👁", "10 km", "Visibility"]].map(([icon, val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16 }}>{icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {[["Mon", "☀️", "34"], ["Tue", "⛅", "31"], ["Wed", "🌦", "28"], ["Thu", "☀️", "35"], ["Fri", "☀️", "36"]].map(([day, icon, temp]) => (
              <div key={day} style={{ background: "#0f1829", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{day}</div>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{temp}°</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 8, fontSize: 12, color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
            <span>React + OpenWeatherAPI + Leaflet.js + Geolocation</span>
            <span style={{ color: "#34d399", fontWeight: 600 }}>Full Source →</span>
          </div>
        </div>
      </div>
    );
  }

  // CMS Builder
  return (
    <div style={{ background: "#070d1a", minHeight: 420 }}>
      <div style={{ background: "#0a1122", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#fb923c" }}>🛠 Portfolio CMS Builder</span>
        <span style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e33", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>● Live</span>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 12 }}>
          <div style={{ background: "#0f1829", borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Components</div>
            {[["📌", "Hero Section"], ["🖼", "Projects Grid"], ["📊", "Skills Chart"], ["✉️", "Contact Form"], ["⭐", "Testimonials"]].map(([icon, name]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 7, marginBottom: 4, background: "rgba(255,255,255,0.03)", cursor: "pointer", border: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{name}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: "#0f1829", borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Preview Canvas</div>
              <div style={{ background: "#070d1a", borderRadius: 8, padding: 12, border: "1px dashed rgba(251,146,60,0.25)", minHeight: 160, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#fb923c" }}>📌 Hero — Drag to reorder</div>
                <div style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#38bdf8" }}>🖼 Projects Grid</div>
                <div style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#a78bfa" }}>📊 Skills Chart</div>
              </div>
            </div>
            <button style={{ width: "100%", background: "linear-gradient(135deg,#fb923c,#ef4444)", color: "white", border: "none", padding: "11px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              🚀 Publish Portfolio
            </button>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)", borderRadius: 8, fontSize: 12, color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
          <span>React + Express + PostgreSQL + AWS S3</span>
          <span style={{ color: "#fb923c", fontWeight: 600 }}>Full Source →</span>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <div style={{ width: 20, height: 2, background: "#38bdf8", borderRadius: 2 }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "#38bdf8", letterSpacing: "1.5px", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

const inputStyle = {
  background: "#0a1122",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "13px 16px",
  color: "#e2e8f0",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  width: "100%",
};
