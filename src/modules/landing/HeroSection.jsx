import { Link } from "react-router-dom";
import { FiArrowRight, FiUsers, FiClock, FiFileText } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "70px",
      background: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 50%, #f5f3ff 100%)"
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .hero-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .hero-btn-secondary:hover { background: #f5f3ff !important; border-color: #7c3aed !important; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(124,58,237,0.12) !important; }
      `}</style>

      {/* BACKGROUND DECORATIONS */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.08) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(167,139,250,0.1) 0%, transparent 50%)"
      }} />
      <div style={{
        position: "absolute", width: "350px", height: "350px", borderRadius: "50%",
        background: "rgba(124, 58, 237, 0.06)",
        border: "1px solid rgba(124, 58, 237, 0.12)",
        top: "10%", right: "5%",
        animation: "float 7s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
        background: "rgba(167, 139, 250, 0.08)",
        border: "1px solid rgba(167, 139, 250, 0.15)",
        bottom: "15%", right: "20%",
        animation: "float 5s ease-in-out infinite 1s"
      }} />
      <div style={{
        position: "absolute", width: "120px", height: "120px", borderRadius: "50%",
        background: "rgba(124, 58, 237, 0.05)",
        top: "60%", left: "5%",
        animation: "float 6s ease-in-out infinite 0.5s"
      }} />

      {/* CONTENU PRINCIPAL */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 2rem",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "4rem", alignItems: "center",
        width: "100%", position: "relative", zIndex: 1
      }}>

        {/* COLONNE GAUCHE — TEXTE */}
        <div style={{ animation: "fadeUp 0.8s ease forwards" }}>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "99px",
            background: "rgba(124, 58, 237, 0.1)",
            border: "1px solid rgba(124, 58, 237, 0.25)",
            color: "#7c3aed", fontSize: "13px", fontWeight: "500",
            marginBottom: "1.5rem"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", animation: "pulse 2s infinite" }} />
            Plateforme de gestion des stages
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: "800",
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: "1.15",
            color: "#1e293b", marginBottom: "1.5rem"
          }}>
            Déposez votre dossier de stage{" "}
            <span style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              display: "block"
            }}>sans vous déplacer</span>
          </h1>

          <p style={{
            fontSize: "17px", color: "#64748b", lineHeight: "1.8",
            marginBottom: "2.5rem", maxWidth: "480px"
          }}>
            Inscrivez-vous, uploadez vos documents, payez vos frais et suivez l'état de votre dossier en temps réel — tout depuis votre téléphone ou ordinateur.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link to="/register" className="hero-btn-primary" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 30px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: "600",
              boxShadow: "0 8px 24px rgba(124, 58, 237, 0.35)",
              transition: "all 0.2s"
            }}>
              Déposer mon dossier <FiArrowRight />
            </Link>
            <Link to="/login" className="hero-btn-secondary" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 30px", borderRadius: "10px",
              border: "1px solid #c4b5fd", background: "#fff",
              color: "#7c3aed", textDecoration: "none", fontSize: "15px", fontWeight: "500",
              transition: "all 0.2s"
            }}>
              Se connecter
            </Link>
          </div>

          {/* STATS */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { icon: <FiUsers size={18} />, value: "100%", label: "En ligne" },
              { icon: <FiClock size={18} />, value: "24h", label: "Délai de traitement" },
              { icon: <FiFileText size={18} />, value: "4", label: "Documents requis" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card" style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "12px 18px", borderRadius: "10px",
                background: "#fff", border: "1px solid #ede9fe",
                transition: "all 0.2s", cursor: "default"
              }}>
                <span style={{ color: "#7c3aed" }}>{stat.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "700", color: "#7c3aed", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE — ILLUSTRATION */}
        <div style={{ animation: "fadeRight 0.8s ease 0.2s forwards", opacity: 0 }}>
          <div style={{
            background: "#fff", borderRadius: "20px",
            border: "1px solid #ede9fe",
            padding: "2rem",
            boxShadow: "0 20px 60px rgba(124, 58, 237, 0.12)"
          }}>

            {/* HEADER CARD */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: "700", fontSize: "14px"
              }}>M</div>
              <div>
                <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "14px" }}>Madara Uchiwa</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Stagiaire · IAI Cameroun</div>
              </div>
              <div style={{
                marginLeft: "auto", padding: "4px 12px", borderRadius: "99px",
                background: "#f0fdf4", color: "#10b981", fontSize: "12px", fontWeight: "500"
              }}>Actif</div>
            </div>

            {/* DOCUMENTS */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#4c1d95", marginBottom: "10px" }}>Documents requis</div>
              {[
                { label: "Lettre de demande de stage", statut: "valide", color: "#10b981", bg: "#f0fdf4" },
                { label: "Curriculum Vitae", statut: "valide", color: "#10b981", bg: "#f0fdf4" },
                { label: "Certificat de scolarité", statut: "en attente", color: "#f59e0b", bg: "#fffbeb" },
                { label: "CNI ou récépissé", statut: "manquant", color: "#ef4444", bg: "#fef2f2" },
              ].map((doc) => (
                <div key={doc.label} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px", borderRadius: "8px",
                  background: "#fafafa", border: "1px solid #f3f4f6",
                  marginBottom: "8px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiFileText size={14} style={{ color: "#94a3b8" }} />
                    <span style={{ fontSize: "13px", color: "#374151" }}>{doc.label}</span>
                  </div>
                  <span style={{
                    fontSize: "11px", fontWeight: "500", padding: "2px 10px",
                    borderRadius: "99px", background: doc.bg, color: doc.color
                  }}>{doc.statut}</span>
                </div>
              ))}
            </div>

            {/* PAIEMENT */}
            <div style={{
              padding: "14px 16px", borderRadius: "10px",
              background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
              border: "1px solid #c4b5fd",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "500", marginBottom: "4px" }}>Frais de dossier</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "700", color: "#4c1d95" }}>15 000 XAF</div>
              </div>
              <div style={{
                padding: "8px 16px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", fontSize: "13px", fontWeight: "600"
              }}>Payer</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}