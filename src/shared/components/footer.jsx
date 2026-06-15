import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const href = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/237686002112", "_blank");
  };

  const handleAnchorClick = (e, anchor) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* CONTACT */}
      <section id="contact" className="footer-contact" style={{
        padding: "5rem 2rem",
        borderTop: "1px solid #ede9fe",
        background: "#faf5ff"
      }}>
        <div style={{
          maxWidth: "1000px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <img
                src="/images/logo.jpeg"
                alt="HR Skills Logo"
                style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ fontWeight: "700", fontSize: "18px", color: "#4c1d95" }}>
                HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
              </span>
            </div>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.7" }}>
              Plateforme de gestion des dossiers de stage pour les étudiants.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "1rem", color: "#4c1d95", fontSize: "15px" }}>Liens rapides</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Accueil", anchor: "hero" },
                { label: "Fonctionnalités", anchor: "fonctionnalites" },
                { label: "Comment ça marche", anchor: "etapes" },
                { label: "Contact", anchor: "contact" },
              ].map((item) => (
                <a key={item.anchor} href={href(item.anchor)}
                  style={{ color: "#6b7280", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                  onClick={(e) => handleAnchorClick(e, item.anchor)}
                  onMouseEnter={e => e.target.style.color = "#7c3aed"}
                  onMouseLeave={e => e.target.style.color = "#6b7280"}
                >{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "1rem", color: "#4c1d95", fontSize: "15px" }}>Contact</h4>
            <p style={{ color: "#475569", fontSize: "13px", marginBottom: "1rem" }}>
              Contactez-nous directement sur WhatsApp
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Email */}
              <div style={{
                display: "flex", alignItems: "center",
                gap: "10px", color: "#6b7280", fontSize: "14px"
              }}>
                <span style={{ color: "#7c3aed" }}><FiMail size={16} /></span>
                contact@hrskills.com
              </div>
              
              {/* Téléphone - lien WhatsApp */}
              <div 
                onClick={handleWhatsAppClick}
                style={{
                  display: "flex", alignItems: "center",
                  gap: "10px", color: "#6b7280", fontSize: "14px",
                  cursor: "pointer", transition: "color 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#25D366"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
              >
                <span style={{ color: "#25D366" }}><FiPhone size={16} /></span>
                <span>+237 686 002 112</span>
                <span style={{ fontSize: "11px", background: "#25D366", color: "#fff", padding: "2px 6px", borderRadius: "20px" }}>WhatsApp</span>
              </div>
              
              {/* Adresse */}
              <div style={{
                display: "flex", alignItems: "center",
                gap: "10px", color: "#6b7280", fontSize: "14px"
              }}>
                <span style={{ color: "#7c3aed" }}><FiMapPin size={16} /></span>
                Cameroun & Zone CEMAC
              </div>
            </div>

            {/* Bouton WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              style={{
                marginTop: "1.5rem",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                color: "#fff",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <FiMessageCircle size={18} />
              Nous écrire sur WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER BAS */}
      <footer className="site-footer" style={{
        padding: "1.5rem 2rem",
        borderTop: "1px solid #ede9fe",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
        background: "#fff"
      }}>
        <p style={{ color: "#9ca3af", fontSize: "13px" }}>
          © 2026 HR Skills SARL. Tous droits réservés.
        </p>
        <p style={{ color: "#9ca3af", fontSize: "13px" }}>
          Propulsé par <span style={{ color: "#7c3aed", fontWeight: "500" }}>HR Skills SARL</span>
        </p>
      </footer>
    </>
  );
}