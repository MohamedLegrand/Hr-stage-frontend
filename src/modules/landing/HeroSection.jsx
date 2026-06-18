import { Link } from "react-router-dom";
import { FiArrowRight, FiUsers, FiAward, FiShield } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "70px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.35); }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-right-col { display: flex; justify-content: center; align-items: center; }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
          color: #fff; text-decoration: none; font-size: 15px; font-weight: 600;
          box-shadow: 0 8px 28px rgba(124,58,237,0.38);
          transition: all 0.25s ease; white-space: nowrap;
        }
        .hero-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(124,58,237,0.48); }
        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 12px;
          border: 1.5px solid #c4b5fd; background: rgba(255,255,255,0.92);
          color: #7c3aed; text-decoration: none; font-size: 15px; font-weight: 500;
          transition: all 0.25s ease; white-space: nowrap;
          backdrop-filter: blur(4px);
        }
        .hero-cta-secondary:hover { background: #f5f3ff; border-color: #7c3aed; transform: translateY(-2px); }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-right-col { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-cta-row { flex-direction: column !important; }
          .hero-cta-primary, .hero-cta-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* IMAGE DE FOND */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/heros/stage-heros.jpg')",
          backgroundSize: "cover", backgroundPosition: "center", zIndex: 0,
        }}
      />

      {/* OVERLAY GAUCHE OPAQUE → DROITE TRANSPARENTE */}
      <div
        style={{
          position: "absolute", inset: 0,
          background:
            "linear-gradient(110deg, rgba(250,245,255,0.98) 0%, rgba(237,233,254,0.95) 38%, rgba(245,243,255,0.72) 60%, rgba(245,243,255,0.18) 100%)",
          zIndex: 1,
        }}
      />

      {/* GLOW DÉCORATIF */}
      <div
        style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          top: "-120px", right: "-80px", zIndex: 2, pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.12)",
          bottom: "10%", left: "2%", zIndex: 2, pointerEvents: "none",
          animation: "heroFloat 7s ease-in-out infinite",
        }}
      />

      {/* CONTENU */}
      <div
        style={{
          maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem 4rem",
          width: "100%", position: "relative", zIndex: 3,
        }}
      >
        <div className="hero-grid">
          {/* ── COLONNE GAUCHE ── */}
          <div style={{ animation: "heroFadeUp 0.75s ease forwards" }}>

            {/* BADGE */}
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "5px 14px 5px 6px", borderRadius: "99px",
                background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "#7c3aed", color: "#fff", fontSize: "10px",
                  fontWeight: "700", padding: "2px 8px", borderRadius: "99px",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}
              >
                Yaoundé
              </span>
              <span style={{ color: "#6d28d9", fontSize: "13px", fontWeight: "500" }}>
                Dépôt de dossier 100 % en ligne
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: "800", lineHeight: "1.1",
                color: "#0f172a", marginBottom: "1.5rem",
                letterSpacing: "-0.025em",
              }}
            >
              Gérez votre stage{" "}
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 60%, #6d28d9 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                depuis votre téléphone
              </span>
            </h1>

            {/* SOUS-TITRE */}
            <p
              style={{
                fontSize: "17px", color: "#475569", lineHeight: "1.8",
                marginBottom: "2.5rem", maxWidth: "480px", fontWeight: "400",
              }}
            >
              Inscrivez-vous, déposez vos documents, payez vos frais via Mobile Money et suivez votre dossier en temps réel — tout depuis un seul espace sécurisé.
            </p>

            {/* CTA */}
            <div
              className="hero-cta-row"
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "3rem" }}
            >
              <Link to="/register" className="hero-cta-primary">
                Démarrer mon stage <FiArrowRight size={16} />
              </Link>
              <Link to="/login" className="hero-cta-secondary">
                Se connecter
              </Link>
            </div>

            {/* STATS */}
            <div
              style={{
                display: "flex", gap: "2.5rem", flexWrap: "wrap",
                paddingTop: "2rem", borderTop: "1px solid rgba(124,58,237,0.12)",
              }}
            >
              {[
                { value: "200+", label: "Stagiaires formés", icon: <FiUsers size={14} /> },
                { value: "6",    label: "Programmes actifs", icon: <FiAward size={14} /> },
                { value: "100%", label: "Suivi sécurisé", icon: <FiShield size={14} /> },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "28px", fontWeight: "800",
                      color: "#1e293b", lineHeight: "1",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      fontSize: "12px", color: "#94a3b8", marginTop: "5px", fontWeight: "500",
                    }}
                  >
                    <span style={{ color: "#a78bfa" }}>{stat.icon}</span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── COLONNE DROITE — Dashboard mockup ── */}
          <div className="hero-right-col" style={{ animation: "heroFadeRight 0.75s 0.2s ease both" }}>
            <div style={{ position: "relative", animation: "heroFloat 6s ease-in-out infinite" }}>

              {/* CARTE PRINCIPALE */}
              <div
                style={{
                  width: "340px",
                  background: "#fff", borderRadius: "20px",
                  padding: "1.75rem",
                  boxShadow: "0 24px 64px rgba(124,58,237,0.13), 0 4px 16px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(124,58,237,0.1)",
                }}
              >
                {/* En-tête carte */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "18px", flexShrink: 0,
                    }}
                  >
                    📋
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>
                      Mon dossier de stage
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>Développement Web · BTS</div>
                  </div>
                </div>

                {/* Barre de progression */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "500", color: "#64748b" }}>Progression du dossier</span>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#7c3aed" }}>75 %</span>
                  </div>
                  <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: "75%", height: "100%",
                        background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                        borderRadius: "99px",
                      }}
                    />
                  </div>
                </div>

                {/* Documents */}
                {[
                  { name: "Lettre de demande",      status: "Validé",     color: "#10b981", bg: "#f0fdf4" },
                  { name: "Curriculum Vitae",        status: "Validé",     color: "#10b981", bg: "#f0fdf4" },
                  { name: "Certificat de scolarité", status: "En attente", color: "#f59e0b", bg: "#fffbeb" },
                  { name: "CNI / Récépissé",         status: "En attente", color: "#f59e0b", bg: "#fffbeb" },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "9px 11px", borderRadius: "8px", marginBottom: "6px",
                      background: "#f8fafc",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#374151", fontWeight: "500" }}>{doc.name}</span>
                    <span
                      style={{
                        fontSize: "10px", fontWeight: "600",
                        padding: "2px 8px", borderRadius: "99px",
                        background: doc.bg, color: doc.color,
                      }}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* BADGE FLOTTANT — Paiement */}
              <div
                style={{
                  position: "absolute", bottom: "-18px", right: "-22px",
                  background: "#fff", borderRadius: "14px",
                  padding: "10px 14px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  border: "1px solid #e8e4fc",
                  display: "flex", alignItems: "center", gap: "8px",
                  animation: "heroFloat 4s ease-in-out infinite 1s",
                }}
              >
                <div
                  style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: "#f0fdf4", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "14px",
                  }}
                >
                  ✅
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#065f46" }}>Paiement validé</div>
                  <div style={{ fontSize: "10px", color: "#94a3b8" }}>5 000 XAF · MTN Money</div>
                </div>
              </div>

              {/* BADGE FLOTTANT — Confirmation */}
              <div
                style={{
                  position: "absolute", top: "-16px", left: "-18px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  borderRadius: "12px", padding: "9px 13px",
                  boxShadow: "0 8px 20px rgba(124,58,237,0.38)",
                  display: "flex", alignItems: "center", gap: "7px",
                  animation: "heroFloat 5s ease-in-out infinite 0.5s",
                }}
              >
                <span style={{ fontSize: "14px" }}>🎓</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#fff" }}>Stage confirmé !</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INDICATEUR SCROLL */}
      <div
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "11px", color: "#94a3b8", fontWeight: "500",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}
        >
          Découvrir
        </span>
        <div
          style={{
            width: "1px", height: "36px",
            background: "linear-gradient(to bottom, #94a3b8, transparent)",
          }}
        />
      </div>
    </section>
  );
}
