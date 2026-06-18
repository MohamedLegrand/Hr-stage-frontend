import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiMessageCircle, FiArrowRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const href = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;
  const [waHov, setWaHov] = useState(false);

  const handleWhatsAppClick = () => window.open("https://wa.me/237686002112", "_blank");

  const handleAnchorClick = (e, anchor) => {
    if (isHome) { e.preventDefault(); document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }); }
  };

  const links = [
    { label: "Accueil",            anchor: "hero" },
    { label: "Fonctionnalités",    anchor: "fonctionnalites" },
    { label: "Comment ça marche",  anchor: "etapes" },
    { label: "Tarifs",             anchor: "tarifs" },
    { label: "Contact",            anchor: "contact" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap');`}</style>

      {/* ── SECTION CONTACT ── */}
      <section
        id="contact"
        style={{ padding: "5rem 2rem", borderTop: "1px solid #ede9fe", background: "#faf5ff" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* En-tête section */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#ede9fe", borderRadius: "99px",
                padding: "5px 16px", marginBottom: "1rem",
                fontSize: "12px", fontWeight: "700", color: "#7c3aed",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}
            >
              Nous contacter
            </div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: "800", color: "#0f172a", margin: "0 0 0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              On est là pour vous accompagner
            </h2>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
              Vous avez des questions ? Notre équipe à Yaoundé est disponible pour vous répondre rapidement.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>

            {/* À propos */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                <img src="/images/logo.jpeg" alt="HR Skills Logo" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 8px rgba(124,58,237,0.2)" }} />
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "800", fontSize: "15px", color: "#4c1d95", lineHeight: "1.1" }}>
                    HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#a78bfa", fontWeight: "600", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    Yaoundé · Cameroun
                  </div>
                </div>
              </div>
              <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.8", margin: "0 0 1.25rem" }}>
                Plateforme officielle de gestion des stages académiques pour HR Skills SARL. Simplifiez votre démarche, déposez vos documents et suivez votre dossier en ligne.
              </p>
              <Link
                to="/register"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: "700", color: "#7c3aed",
                  textDecoration: "none", padding: "8px 16px",
                  background: "#ede9fe", borderRadius: "8px", border: "1px solid #c4b5fd",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#ddd6fe"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ede9fe"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Commencer mon stage <FiArrowRight size={12} />
              </Link>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", marginBottom: "1.1rem", color: "#0f172a", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Navigation
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {links.map((item) => (
                  <a
                    key={item.anchor} href={href(item.anchor)}
                    onClick={(e) => handleAnchorClick(e, item.anchor)}
                    style={{ color: "#64748b", textDecoration: "none", fontSize: "14px", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px", padding: "3px 0" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#7c3aed"; e.currentTarget.style.transform = "translateX(3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#c4b5fd", flexShrink: 0 }} />
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/phototheque"
                  style={{ color: "#64748b", textDecoration: "none", fontSize: "14px", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px", padding: "3px 0" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#7c3aed"; e.currentTarget.style.transform = "translateX(3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#c4b5fd", flexShrink: 0 }} />
                  Photothèque
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", marginBottom: "1.1rem", color: "#0f172a", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Nous joindre
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FiMail size={15} style={{ color: "#7c3aed" }} />
                  </div>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>contact@hrskills.com</span>
                </div>
                <div
                  onClick={handleWhatsAppClick}
                  style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FiPhone size={15} style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#64748b" }}>+237 686 002 112</div>
                    <div style={{ fontSize: "11px", background: "#22c55e", color: "#fff", padding: "1px 6px", borderRadius: "99px", display: "inline-block", marginTop: "2px", fontWeight: "600" }}>
                      WhatsApp
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FiMapPin size={15} style={{ color: "#7c3aed" }} />
                  </div>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>Yaoundé, Cameroun · Zone CEMAC</span>
                </div>
              </div>
              <button
                onClick={handleWhatsAppClick}
                style={{
                  width: "100%", padding: "12px 16px",
                  borderRadius: "11px",
                  background: waHov
                    ? "linear-gradient(135deg, #16a34a, #15803d)"
                    : "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#fff", border: "none",
                  fontSize: "14px", fontWeight: "700",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: waHov ? "0 8px 20px rgba(34,197,94,0.35)" : "0 4px 12px rgba(34,197,94,0.25)",
                  transform: waHov ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.2s ease",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={() => setWaHov(true)}
                onMouseLeave={() => setWaHov(false)}
              >
                <FiMessageCircle size={17} /> Écrire sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <footer
        style={{
          padding: "1.25rem 2rem",
          borderTop: "1px solid #ede9fe",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "0.75rem",
          background: "#0f172a",
        }}
      >
        <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
          © {new Date().getFullYear()} HR Skills SARL — Tous droits réservés
        </p>
        <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>
          Propulsé par <span style={{ color: "#a78bfa", fontWeight: "600" }}>HR Skills SARL</span> · Yaoundé, Cameroun
        </p>
      </footer>
    </>
  );
}
