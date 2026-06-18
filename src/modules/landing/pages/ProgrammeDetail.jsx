import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft, FiClock, FiCheckCircle, FiBookOpen, FiExternalLink,
  FiLayers, FiCode, FiSmartphone, FiPenTool, FiServer, FiGitBranch,
  FiArrowRight, FiStar,
} from "react-icons/fi";
import Header from "../../../shared/components/Header";
import Footer from "@/shared/components/footer";
import { getProgrammeById } from "../data/programmesData";

const iconMap = {
  "analyse-uml":         <FiLayers size={28} />,
  "developpement-web":   <FiCode size={28} />,
  "developpement-mobile":<FiSmartphone size={28} />,
  "design-graphique":    <FiPenTool size={28} />,
  "systemes-reseaux":    <FiServer size={28} />,
  "devops":              <FiGitBranch size={28} />,
};

export default function ProgrammeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const programme = getProgrammeById(id);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  if (!programme) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <div style={{ padding: "10rem 2rem", textAlign: "center", marginTop: "70px" }}>
          <div style={{ fontSize: "48px", marginBottom: "1rem" }}>🔍</div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>
            Programme introuvable
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "2rem" }}>Ce programme n'existe pas ou a été déplacé.</p>
          <button
            onClick={() => navigate("/")}
            style={{ padding: "13px 28px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "600" }}
          >
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const color = programme.color;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1e293b", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
      <Header />

      {/* ── HERO ── */}
      <div
        style={{
          position: "relative",
          paddingTop: "calc(70px + 7rem)", paddingBottom: "6rem",
          paddingLeft: "2rem", paddingRight: "2rem",
          color: "#fff", overflow: "hidden",
        }}
      >
        {/* Image de fond floue */}
        <div
          style={{
            position: "absolute", inset: "-16px",
            backgroundImage: `url('${programme.image}')`,
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "blur(6px) brightness(0.85)", zIndex: 0,
          }}
        />
        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.5) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}30, transparent 70%)`, zIndex: 2 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, #fff, transparent)", zIndex: 3 }} />

        <div
          style={{
            maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 4,
            animation: "heroFadeUp 0.7s ease both",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: backHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: "99px",
              padding: "8px 18px", color: "#fff", cursor: "pointer",
              marginBottom: "2.5rem", fontSize: "13px", fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <FiArrowLeft size={14} /> Retour aux programmes
          </button>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div
              style={{
                width: "72px", height: "72px", borderRadius: "20px",
                background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                color, boxShadow: `0 12px 32px ${color}40, 0 4px 12px rgba(0,0,0,0.15)`,
                flexShrink: 0,
              }}
            >
              {iconMap[programme.id]}
            </div>
            <div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: `${color}22`, border: `1px solid ${color}50`,
                  backdropFilter: "blur(8px)",
                  padding: "4px 12px", borderRadius: "99px",
                  fontSize: "11px", fontWeight: "700", color: "#fff",
                  letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px",
                }}
              >
                <FiStar size={10} /> Programme de stage
              </div>
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: "800", lineHeight: "1.1",
                  margin: 0, letterSpacing: "-0.02em",
                  textShadow: "0 2px 16px rgba(0,0,0,0.4)",
                }}
              >
                {programme.title}
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "7px 16px", borderRadius: "99px", fontSize: "14px", fontWeight: "500",
              }}
            >
              <FiClock size={13} /> Durée : {programme.duree}
            </div>
            <p
              style={{
                fontSize: "17px", opacity: 0.9, maxWidth: "600px",
                lineHeight: "1.6", margin: 0,
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              }}
            >
              {programme.desc}
            </p>
          </div>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "flex-start" }}>

          {/* COLONNE GAUCHE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

            {/* Concept */}
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
                  <FiBookOpen size={18} />
                </div>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
                  Le concept
                </h2>
              </div>
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.9", margin: 0, borderLeft: `3px solid ${color}30`, paddingLeft: "1.25rem" }}>
                {programme.concept}
              </p>
            </section>

            {/* Réalisations */}
            {programme.realisations && (
              <section>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
                    <FiCheckCircle size={18} />
                  </div>
                  <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
                    Chez HR Skills SARL
                  </h2>
                </div>
                <div
                  style={{
                    background: `linear-gradient(135deg, ${color}08, ${color}04)`,
                    border: `1px solid ${color}20`,
                    borderLeft: `4px solid ${color}`,
                    borderRadius: "0 16px 16px 0",
                    padding: "1.5rem 1.75rem",
                  }}
                >
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.9", margin: 0 }}>
                    {programme.realisations}
                  </p>
                  {programme.lien && (
                    <a
                      href={programme.lien.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        marginTop: "1.1rem", color,
                        fontWeight: "700", fontSize: "14px",
                        textDecoration: "none", padding: "8px 16px",
                        background: `${color}12`, borderRadius: "8px",
                        border: `1px solid ${color}25`, transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = `${color}12`; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      {programme.lien.label} <FiExternalLink size={13} />
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* COLONNE DROITE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Durée card */}
            <div
              style={{
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                padding: "1.5rem",
                boxShadow: `0 12px 32px ${color}30`,
                color: "#fff",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>
                Durée du stage
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "36px", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1" }}>
                {programme.duree}
              </div>
              <div style={{ marginTop: "12px", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                Formation intensive encadrée par nos experts
              </div>
            </div>

            {/* Objectifs */}
            <div style={{ background: "#fff", border: "1px solid #ede9fe", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: "800", color: "#0f172a", margin: "0 0 1.1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Objectifs
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {programme.objectifs.map((obj, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", color: "#475569", lineHeight: "1.55" }}>
                    <div
                      style={{
                        width: "20px", height: "20px", borderRadius: "6px",
                        background: `${color}15`, display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0, marginTop: "0px",
                      }}
                    >
                      <FiCheckCircle size={11} style={{ color }} />
                    </div>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prérequis */}
            <div style={{ background: "#fff", border: "1px solid #ede9fe", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: "800", color: "#0f172a", margin: "0 0 1.1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Prérequis
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {programme.prerequis.map((pr, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", color: "#475569", lineHeight: "1.55" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, marginTop: "7px", flexShrink: 0 }} />
                    {pr}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              to="/register"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "15px 24px",
                background: ctaHovered
                  ? `linear-gradient(135deg, ${color}ee, ${color})`
                  : `linear-gradient(135deg, ${color}, ${color}cc)`,
                color: "#fff", borderRadius: "14px",
                fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "15px",
                textDecoration: "none",
                boxShadow: ctaHovered ? `0 16px 36px ${color}50` : `0 8px 24px ${color}35`,
                transform: ctaHovered ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              Postuler à ce programme
              <FiArrowRight size={16} style={{ transition: "transform 0.2s", transform: ctaHovered ? "translateX(3px)" : "translateX(0)" }} />
            </Link>

            {/* Lien retour */}
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                padding: "12px", background: "#f8f7ff", border: "1px solid #ede9fe",
                borderRadius: "12px", color: "#7c3aed", fontSize: "14px", fontWeight: "600",
                cursor: "pointer", transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#c4b5fd"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f8f7ff"; e.currentTarget.style.borderColor = "#ede9fe"; }}
            >
              <FiArrowLeft size={14} /> Voir tous les programmes
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
