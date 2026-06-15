import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function NavLink({ href, to, children, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = hovered || active ? "#7c3aed" : "#6b7280";
  const weight = active ? "600" : "500";
  const style = {
    color, fontWeight: weight, textDecoration: "none",
    fontSize: "14px", transition: "color 0.2s", whiteSpace: "nowrap",
  };

  if (to) {
    return (
      <Link to={to} style={style} onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </Link>
    );
  }
  return (
    <a href={href} style={style} onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPhototheque = location.pathname === "/phototheque";
  const [open, setOpen] = useState(false);

  const anchorHref = (id) => isHome ? `#${id}` : `/#${id}`;

  const handleAnchorClick = (e, id) => {
    setOpen(false);
    if (isHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = (
    <>
      <NavLink
        href={anchorHref("hero")}
        active={isHome && !isPhototheque}
        onClick={(e) => handleAnchorClick(e, "hero")}
      >
        Accueil
      </NavLink>
      <NavLink
        href={anchorHref("etapes")}
        onClick={(e) => handleAnchorClick(e, "etapes")}
      >
        Comment ça marche
      </NavLink>
      <NavLink
        href={anchorHref("tarifs")}
        onClick={(e) => handleAnchorClick(e, "tarifs")}
      >
        Tarifs
      </NavLink>
      <NavLink
        to="/phototheque"
        active={isPhototheque}
        onClick={() => setOpen(false)}
      >
        Photothèque
      </NavLink>
      <NavLink
        href={anchorHref("contact")}
        onClick={(e) => handleAnchorClick(e, "contact")}
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #ede9fe", height: "70px",
        padding: "0 2rem", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 20px rgba(109,63,212,0.08)",
      }}>

        {/* LOGO */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <img src="/images/logo.jpeg" alt="HR Skills Logo"
            style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontWeight: "700", fontSize: "18px", color: "#4c1d95" }}>
            HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hdr-nav" style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {navItems}
        </nav>

        {/* ACTIONS DESKTOP */}
        <div className="hdr-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <AuthButtons />
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="hdr-burger"
          style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", color: "#4c1d95", padding: "6px",
            borderRadius: "8px",
          }}
          aria-label="Menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0, zIndex: 99,
          background: "#fff", borderBottom: "1px solid #ede9fe",
          padding: "1.25rem 1.5rem",
          display: "flex", flexDirection: "column", gap: "1.1rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {navItems}
          <div style={{ display: "flex", gap: "10px", paddingTop: "0.75rem", borderTop: "1px solid #ede9fe" }}>
            <AuthButtons mobile onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function AuthButtons({ mobile = false, onClick }) {
  const btnBase = {
    textDecoration: "none", fontSize: "14px", fontWeight: "500",
    borderRadius: "8px", transition: "all 0.2s",
    ...(mobile ? { flex: 1, textAlign: "center", padding: "10px 0" } : { padding: "8px 18px" }),
  };
  return (
    <>
      <Link to="/login" onClick={onClick}
        style={{ ...btnBase, border: "1px solid #7c3aed", color: "#7c3aed", background: "transparent" }}
      >
        Connexion
      </Link>
      <Link to="/register" onClick={onClick}
        style={{
          ...btnBase, fontWeight: "600",
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
          color: "#fff", border: "none",
          boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
        }}
      >
        S'inscrire
      </Link>
    </>
  );
}
