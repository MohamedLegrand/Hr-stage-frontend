import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
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
                { label: "Accueil", href: "#hero" },
                { label: "Fonctionnalités", href: "#fonctionnalites" },
                { label: "Comment ça marche", href: "#etapes" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a key={item.href} href={item.href} style={{
                  color: "#6b7280", textDecoration: "none", fontSize: "14px",
                  transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.target.style.color = "#7c3aed"}
                  onMouseLeave={e => e.target.style.color = "#6b7280"}
                >{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "1rem", color: "#4c1d95", fontSize: "15px" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: <FiMail size={16} />, text: "contact@hrskills.com" },
                { icon: <FiPhone size={16} />, text: "+237 6XX XXX XXX" },
                { icon: <FiMapPin size={16} />, text: "Cameroun & Zone CEMAC" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex", alignItems: "center",
                  gap: "10px", color: "#6b7280", fontSize: "14px"
                }}>
                  <span style={{ color: "#7c3aed" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
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