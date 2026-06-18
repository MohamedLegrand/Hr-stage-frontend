import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function NavLink({ href, to, children, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      {to ? (
        <Link
          to={to} onClick={onClick}
          style={{
            color: active ? "#7c3aed" : hovered ? "#7c3aed" : "#64748b",
            fontWeight: active ? "600" : "500",
            textDecoration: "none", fontSize: "14px",
            transition: "color 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {children}
        </Link>
      ) : (
        <a
          href={href} onClick={onClick}
          style={{
            color: active ? "#7c3aed" : hovered ? "#7c3aed" : "#64748b",
            fontWeight: active ? "600" : "500",
            textDecoration: "none", fontSize: "14px",
            transition: "color 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {children}
        </a>
      )}
      <span
        style={{
          position: "absolute", bottom: "-22px", left: "50%", transform: "translateX(-50%)",
          height: "2px", borderRadius: "99px", background: "#7c3aed",
          width: active ? "100%" : hovered ? "60%" : "0%",
          transition: "width 0.25s ease",
        }}
      />
    </span>
  );
}

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPhototheque = location.pathname === "/phototheque";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const anchorHref = (id) => isHome ? `#${id}` : `/#${id}`;

  const handleAnchorClick = (e, id) => {
    setOpen(false);
    if (isHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isPourquoi = location.pathname === "/pourquoi";
  const isContact  = location.pathname === "/contact";

  const navItems = (
    <>
      <NavLink href={anchorHref("hero")} active={isHome && !isPhototheque && !isPourquoi && !isContact} onClick={(e) => handleAnchorClick(e, "hero")}>
        Accueil
      </NavLink>
      <NavLink to="/pourquoi" active={isPourquoi} onClick={() => setOpen(false)}>
        Pourquoi HR Skills SARL ?
      </NavLink>
      <NavLink href={anchorHref("tarifs")} onClick={(e) => handleAnchorClick(e, "tarifs")}>
        Tarifs
      </NavLink>
      <NavLink to="/phototheque" active={isPhototheque} onClick={() => setOpen(false)}>
        Photothèque
      </NavLink>
      <NavLink to="/contact" active={isContact} onClick={() => setOpen(false)}>
        Contact
      </NavLink>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid #ede9fe" : "1px solid transparent",
          height: "70px", padding: "0 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: scrolled ? "0 2px 24px rgba(109,63,212,0.07)" : "none",
          transition: "all 0.3s ease",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <img
            src="/images/logo.jpeg" alt="HR Skills Logo"
            style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 8px rgba(124,58,237,0.2)" }}
          />
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "800", fontSize: "15px", color: "#4c1d95", lineHeight: "1.1" }}>
              HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
            </div>
            <div style={{ fontSize: "9px", color: "#a78bfa", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Yaoundé · Cameroun
            </div>
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hdr-nav" style={{ display: "flex", gap: "2rem", alignItems: "center", position: "relative" }}>
          {navItems}
        </nav>

        {/* AUTH DESKTOP */}
        <div className="hdr-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <AuthButtons />
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="hdr-burger"
          style={{
            display: "none", background: open ? "#f5f3ff" : "none",
            border: open ? "1px solid #c4b5fd" : "1px solid transparent",
            cursor: "pointer", color: "#4c1d95", padding: "7px",
            borderRadius: "9px", transition: "all 0.2s",
          }}
          aria-label="Menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div
          style={{
            position: "fixed", top: "70px", left: 0, right: 0, zIndex: 99,
            background: "#fff", borderBottom: "1px solid #ede9fe",
            padding: "1.5rem 1.5rem",
            display: "flex", flexDirection: "column", gap: "1.1rem",
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {[
            { label: "Accueil",  href: anchorHref("hero"), onClick: (e) => handleAnchorClick(e, "hero"), isLink: false },
            { label: "Tarifs",   href: anchorHref("tarifs"), onClick: (e) => handleAnchorClick(e, "tarifs"), isLink: false },
          ].map((item) => (
            <a
              key={item.label} href={item.href} onClick={item.onClick}
              style={{ color: "#374151", textDecoration: "none", fontSize: "15px", fontWeight: "500", padding: "6px 0" }}
            >
              {item.label}
            </a>
          ))}
          <Link to="/pourquoi" onClick={() => setOpen(false)} style={{ color: "#374151", textDecoration: "none", fontSize: "15px", fontWeight: "500", padding: "6px 0" }}>
            Pourquoi HR Skills SARL ?
          </Link>
          <Link to="/phototheque" onClick={() => setOpen(false)} style={{ color: "#374151", textDecoration: "none", fontSize: "15px", fontWeight: "500", padding: "6px 0" }}>
            Photothèque
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)} style={{ color: "#374151", textDecoration: "none", fontSize: "15px", fontWeight: "500", padding: "6px 0" }}>
            Contact
          </Link>
          <div style={{ display: "flex", gap: "10px", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
            <AuthButtons mobile onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function AuthButtons({ mobile = false, onClick }) {
  const [loginHov, setLoginHov] = useState(false);
  const [regHov, setRegHov] = useState(false);

  const base = {
    textDecoration: "none", fontSize: "14px", fontWeight: "600",
    borderRadius: "9px", transition: "all 0.2s",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    ...(mobile ? { flex: 1, padding: "11px 0" } : { padding: "8px 18px" }),
  };

  return (
    <>
      <Link
        to="/login" onClick={onClick}
        style={{
          ...base,
          border: `1px solid ${loginHov ? "#7c3aed" : "#c4b5fd"}`,
          color: "#7c3aed",
          background: loginHov ? "#f5f3ff" : "transparent",
        }}
        onMouseEnter={() => setLoginHov(true)}
        onMouseLeave={() => setLoginHov(false)}
      >
        Connexion
      </Link>
      <Link
        to="/register" onClick={onClick}
        style={{
          ...base,
          background: regHov
            ? "linear-gradient(135deg, #6d28d9, #7c3aed)"
            : "linear-gradient(135deg, #7c3aed, #a78bfa)",
          color: "#fff", border: "none",
          boxShadow: regHov ? "0 6px 18px rgba(124,58,237,0.4)" : "0 3px 10px rgba(124,58,237,0.25)",
          transform: regHov ? "translateY(-1px)" : "translateY(0)",
        }}
        onMouseEnter={() => setRegHov(true)}
        onMouseLeave={() => setRegHov(false)}
      >
        S'inscrire
      </Link>
    </>
  );
}
