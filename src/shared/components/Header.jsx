import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #ede9fe",
      padding: "0 2rem",
      height: "70px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      boxShadow: "0 2px 20px rgba(109, 63, 212, 0.08)"
    }}>

      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/images/logo.jpeg"
          alt="HR Skills Logo"
          style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
        />
        <span style={{ fontWeight: "700", fontSize: "18px", color: "#4c1d95" }}>
          HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
        </span>
      </div>

      {/* NAV */}
      <nav className="site-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {[
          { label: "Accueil", href: "#hero" },
          { label: "Comment ça marche", href: "#etapes" },
          { label: "Tarifs", href: "#tarifs" },
          { label: "Contact", href: "#contact" },
        ].map((item) => (
          <a key={item.href} href={item.href} style={{
            color: "#6b7280", textDecoration: "none",
            fontSize: "14px", fontWeight: "500", transition: "color 0.2s"
          }}
            onMouseEnter={e => e.target.style.color = "#7c3aed"}
            onMouseLeave={e => e.target.style.color = "#6b7280"}
          >{item.label}</a>
        ))}
      </nav>

      {/* BOUTONS */}
      <div className="site-actions" style={{ display: "flex", gap: "12px" }}>
        <Link to="/login" style={{
          padding: "8px 20px", borderRadius: "8px",
          border: "1px solid #7c3aed", color: "#7c3aed",
          textDecoration: "none", fontSize: "14px", fontWeight: "500",
          transition: "all 0.2s", background: "transparent"
        }}
          onMouseEnter={e => { e.target.style.background = "#7c3aed"; e.target.style.color = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#7c3aed"; }}
        >Connexion</Link>
        <Link to="/register" style={{
          padding: "8px 20px", borderRadius: "8px",
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
          color: "#fff", textDecoration: "none",
          fontSize: "14px", fontWeight: "600",
          boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)"
        }}>S'inscrire</Link>
      </div>
    </header>
  );
}