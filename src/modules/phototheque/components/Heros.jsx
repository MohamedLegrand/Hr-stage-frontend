import { Link } from "react-router-dom";
import { FiArrowRight, FiCamera } from "react-icons/fi";

export default function Heros() {
  return (
    <section id="heros" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "70px"
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .hero-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .hero-btn-secondary:hover { background: #f5f3ff !important; border-color: #7c3aed !important; }
      `}</style>

      {/* IMAGE DE FOND */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/phototheque/heros/photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0
      }} />

      {/* OVERLAY DEGRADE POUR LISIBILITE */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(120deg, rgba(250,245,255,0.97) 0%, rgba(237,233,254,0.9) 50%, rgba(245,243,255,0.6) 75%, rgba(245,243,255,0.3) 100%)",
        zIndex: 1
      }} />

      {/* BACKGROUND DECORATIONS */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        background: "radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.08) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(167,139,250,0.1) 0%, transparent 50%)"
      }} />
      <div style={{
        position: "absolute", width: "350px", height: "350px", borderRadius: "50%",
        background: "rgba(124, 58, 237, 0.06)",
        border: "1px solid rgba(124, 58, 237, 0.12)",
        top: "10%", right: "5%", zIndex: 2,
        animation: "float 7s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
        background: "rgba(167, 139, 250, 0.08)",
        border: "1px solid rgba(167, 139, 250, 0.15)",
        bottom: "15%", right: "20%", zIndex: 2,
        animation: "float 5s ease-in-out infinite 1s"
      }} />
      <div style={{
        position: "absolute", width: "120px", height: "120px", borderRadius: "50%",
        background: "rgba(124, 58, 237, 0.05)",
        top: "60%", left: "5%", zIndex: 2,
        animation: "float 6s ease-in-out infinite 0.5s"
      }} />

      {/* CONTENU PRINCIPAL */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 2rem",
        width: "100%", position: "relative", zIndex: 3
      }}>

        <div style={{ maxWidth: "640px", animation: "fadeUp 0.8s ease forwards" }}>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "99px",
            background: "rgba(124, 58, 237, 0.1)",
            border: "1px solid rgba(124, 58, 237, 0.25)",
            color: "#7c3aed", fontSize: "13px", fontWeight: "500",
            marginBottom: "1.5rem"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", animation: "pulse 2s infinite" }} />
            <FiCamera size={14} /> HR Skills SARL
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: "800",
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: "1.15",
            color: "#1e293b", marginBottom: "1.5rem"
          }}>
            Notre{" "}
            <span style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              Photothèque
            </span>
          </h1>

          <p style={{
            fontSize: "17px", color: "#64748b", lineHeight: "1.8",
            marginBottom: "2.5rem", maxWidth: "480px"
          }}>
            Découvrez nos espaces de travail, notre équipe dynamique 
            et nos stagiaires en pleine formation. Une image vaut mille mots.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href="#bureaux" className="hero-btn-primary" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 30px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: "600",
              boxShadow: "0 8px 24px rgba(124, 58, 237, 0.35)",
              transition: "all 0.2s"
            }}>
              Découvrir nos espaces <FiArrowRight />
            </a>
            <Link to="/" className="hero-btn-secondary" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 30px", borderRadius: "10px",
              border: "1px solid #c4b5fd", background: "#fff",
              color: "#7c3aed", textDecoration: "none", fontSize: "15px", fontWeight: "500",
              transition: "all 0.2s"
            }}>
              Retour à l'accueil
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}