import { useState } from "react";
import Header from "../../shared/components/Header";
import Footer from "@/shared/components/footer";
import HeroSection from "./HeroSection";
import ProgrammeCard from "./components/ProgrammeCard";
import {
  FiFileText, FiCreditCard, FiCheckCircle, FiAward, FiUsers, FiTarget,
  FiLayers, FiCode, FiSmartphone, FiPenTool, FiServer, FiGitBranch,
  FiArrowRight, FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        color: "#7c3aed", fontSize: "13px", fontWeight: "600",
        letterSpacing: "0.08em", textTransform: "uppercase",
        marginBottom: "1rem",
      }}
    >
      <span
        style={{
          width: "18px", height: "2px",
          background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
          borderRadius: "1px", display: "inline-block",
        }}
      />
      {children}
    </p>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function LandingPage() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredFeat, setHoveredFeat] = useState(null);

  const programmes = [
    { id: "analyse-uml",        image: "/images/landing/uml.jpg",    icon: <FiLayers size={22} />,   color: "#7c3aed", title: "Analyse UML & MERISE",   desc: "Modélisation et conception de systèmes d'information." },
    { id: "developpement-web",  image: "/images/landing/web.jpg",    icon: <FiCode size={22} />,     color: "#0ea5e9", title: "Développement Web",       desc: "Conception et réalisation d'applications web modernes." },
    { id: "developpement-mobile", image: "/images/landing/mobile.jpg", icon: <FiSmartphone size={22} />, color: "#10b981", title: "Développement Mobile", desc: "Création d'applications mobiles Android et iOS." },
    { id: "design-graphique",   image: "/images/landing/design.jpg", icon: <FiPenTool size={22} />,  color: "#f59e0b", title: "Design Graphique",        desc: "Création visuelle, identité de marque et supports graphiques." },
    { id: "systemes-reseaux",   image: "/images/landing/reseau.jpg", icon: <FiServer size={22} />,   color: "#ef4444", title: "Systèmes & Réseaux",     desc: "Administration de systèmes, infrastructures et réseaux." },
    { id: "devops",             image: "/images/landing/devop.jpg",  icon: <FiGitBranch size={22} />, color: "#06b6d4", title: "DevOps",                desc: "CI/CD, automatisation et gestion d'infrastructures cloud." },
  ];

  const features = [
    {
      icon: <FiFileText size={26} />, color: "#7c3aed", bg: "#f5f3ff", border: "#ede9fe",
      title: "Dépôt de documents",
      desc: "Uploadez vos 4 documents requis (lettre de demande, CV, certificat de scolarité, CNI) en quelques secondes. Formats PDF, JPG et PNG acceptés.",
    },
    {
      icon: <FiCreditCard size={26} />, color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd",
      title: "Paiement Mobile Money",
      desc: "Réglez votre pré-inscription (5 000 XAF) et vos frais de stage (40 000 XAF) via MTN Money ou Orange Money directement depuis la plateforme.",
    },
    {
      icon: <FiCheckCircle size={26} />, color: "#10b981", bg: "#f0fdf4", border: "#bbf7d0",
      title: "Suivi en temps réel",
      desc: "Consultez à tout moment le statut de chaque document et de vos paiements depuis votre tableau de bord personnel. Zéro déplacement requis.",
    },
  ];

  const steps = [
    { num: "01", color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd", title: "Créez votre compte",       desc: "Inscrivez-vous en 2 minutes avec vos informations personnelles et académiques." },
    { num: "02", color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", title: "Payez la pré-inscription",  desc: "Réglez 5 000 XAF via Mobile Money pour activer votre espace et votre dossier." },
    { num: "03", color: "#10b981", bg: "#f0fdf4", border: "#bbf7d0", title: "Déposez vos documents",     desc: "Uploadez vos 4 pièces requises et réglez les 40 000 XAF de frais de stage." },
    { num: "04", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", title: "Recevez votre confirmation", desc: "L'équipe HR Skills valide votre dossier. Vous êtes notifié en temps réel." },
  ];

  const container = { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1e293b", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeInCard { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .prog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 1024px) {
          .prog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .prog-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 1.5rem !important; }
        }
      `}</style>

      <Header />
      <HeroSection />

      {/* ── BANDEAU CONFIANCE ── */}
      <div
        style={{
          background: "#faf5ff",
          borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe",
          padding: "1.25rem 2rem",
        }}
      >
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <FiZap size={16} style={{ color: "#7c3aed" }} />
          <span style={{ fontSize: "14px", color: "#64748b", textAlign: "center" }}>
            <strong style={{ color: "#1e293b" }}>HR Skills SARL</strong> — Spécialiste de l'encadrement des stages académiques à Yaoundé, Cameroun depuis plusieurs années
          </span>
        </div>
      </div>

      {/* ── À PROPOS ── */}
      <section id="apropos" style={{ padding: "7rem 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel>À propos de HR Skills SARL</SectionLabel>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: "800",
                color: "#0f172a", marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Un encadrement sérieux,<br />par des experts de terrain
            </h2>
            <p
              style={{
                color: "#64748b", fontSize: "16px", lineHeight: "1.9",
                maxWidth: "640px", margin: "0 auto",
              }}
            >
              Chez HR Skills SARL, nos formateurs sont des professionnels expérimentés qui accompagnent chaque stagiaire de A à Z — du dossier d'inscription jusqu'à l'attestation de fin de stage.
            </p>
          </div>

          {/* VALEURS */}
          <div
            className="values-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "5rem" }}
          >
            {[
              { icon: <FiAward size={22} />,  color: "#7c3aed", bg: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "#ede9fe", title: "Formateurs experts",     desc: "Chacun spécialisé et expérimenté dans son domaine d'enseignement professionnel." },
              { icon: <FiTarget size={22} />, color: "#0ea5e9", bg: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", border: "#bae6fd", title: "Encadrement rigoureux",  desc: "Un suivi sérieux, structuré et personnalisé tout au long de votre stage." },
              { icon: <FiUsers size={22} />,  color: "#10b981", bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "#bbf7d0", title: "Équipe engagée",         desc: "Des formateurs disponibles et investis dans la réussite concrète de chaque stagiaire." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#fff", border: `1px solid ${item.border}`,
                  borderRadius: "16px", padding: "1.75rem",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 12px 32px ${item.color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: item.bg, display: "flex", alignItems: "center",
                    justifyContent: "center", color: item.color, marginBottom: "1.25rem",
                    border: `1px solid ${item.border}`,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "700",
                    color: "#1e293b", marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* PROGRAMMES */}
          <div>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel>Programmes disponibles</SectionLabel>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "800",
                  color: "#0f172a", letterSpacing: "-0.02em",
                }}
              >
                6 spécialités pour votre stage
              </h3>
              <p style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "15px" }}>
                Cliquez sur un programme pour consulter les détails et les objectifs
              </p>
            </div>
            <div className="prog-grid">
              {programmes.map((programme) => (
                <ProgrammeCard key={programme.id} programme={programme} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section
        id="fonctionnalites"
        style={{
          padding: "7rem 0",
          background: "#faf5ff",
          borderTop: "1px solid #ede9fe",
          borderBottom: "1px solid #ede9fe",
        }}
      >
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel>Fonctionnalités</SectionLabel>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: "800",
                color: "#0f172a", marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Tout ce dont vous avez besoin,<br />en un seul endroit
            </h2>
            <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.8", maxWidth: "540px", margin: "0 auto" }}>
              Une plateforme conçue pour simplifier chaque étape de votre parcours de stage académique.
            </p>
          </div>

          <div className="feat-grid">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                style={{
                  background: "#fff",
                  border: hoveredFeat === i ? `1px solid ${feat.color}` : "1px solid #e8e4fc",
                  borderRadius: "18px", padding: "2.25rem",
                  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                  transform: hoveredFeat === i ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hoveredFeat === i ? `0 16px 40px ${feat.color}18` : "0 1px 4px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={() => setHoveredFeat(i)}
                onMouseLeave={() => setHoveredFeat(null)}
              >
                <div
                  style={{
                    width: "56px", height: "56px", borderRadius: "14px",
                    background: feat.bg, border: `1px solid ${feat.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: feat.color, marginBottom: "1.5rem",
                  }}
                >
                  {feat.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "700",
                    color: "#1e293b", marginBottom: "0.75rem",
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.8", margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" style={{ padding: "7rem 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>Tarifs</SectionLabel>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: "800",
                color: "#0f172a", marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Des frais simples et transparents
            </h2>
            <p style={{ color: "#64748b", fontSize: "15px" }}>
              Deux paiements clairs, sans frais cachés.
            </p>
          </div>

          <div className="price-grid" style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Pré-inscription */}
            <div
              style={{
                background: "#fff", border: "1px solid #e8e4fc",
                borderRadius: "20px", padding: "2.5rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)"; }}
            >
              <div
                style={{
                  display: "inline-block", fontSize: "11px", fontWeight: "700",
                  color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.08em",
                  background: "#f0f9ff", border: "1px solid #bae6fd",
                  padding: "3px 10px", borderRadius: "99px", marginBottom: "1.5rem",
                }}
              >
                Étape 1
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "44px", fontWeight: "800", color: "#0f172a",
                    letterSpacing: "-0.04em",
                  }}
                >
                  5 000
                </span>
                <span style={{ fontSize: "16px", fontWeight: "500", color: "#64748b", marginLeft: "6px" }}>XAF</span>
              </div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "19px", fontWeight: "700", color: "#1e293b", marginBottom: "0.75rem" }}>
                Pré-inscription
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.8", marginBottom: "1.75rem" }}>
                Validez votre inscription et débloquez l'accès à votre espace de dépôt de dossier.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Accès à votre espace stagiaire", "Dépôt des 4 documents", "Suivi en temps réel"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#475569" }}>
                    <FiCheckCircle size={14} style={{ color: "#10b981", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Frais de stage */}
            <div
              style={{
                background: "linear-gradient(145deg, #4c1d95 0%, #7c3aed 100%)",
                borderRadius: "20px", padding: "2.5rem",
                boxShadow: "0 16px 48px rgba(124,58,237,0.3)",
                position: "relative", overflow: "hidden",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 24px 56px rgba(124,58,237,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(124,58,237,0.3)"; }}
            >
              {/* Déco bg */}
              <div
                style={{
                  position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)", top: "-60px", right: "-40px",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute", width: "120px", height: "120px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)", bottom: "-30px", left: "20px",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "inline-block", fontSize: "11px", fontWeight: "700",
                  color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em",
                  background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)",
                  padding: "3px 10px", borderRadius: "99px", marginBottom: "1.5rem",
                }}
              >
                Étape 2
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "44px", fontWeight: "800", color: "#fff",
                    letterSpacing: "-0.04em",
                  }}
                >
                  40 000
                </span>
                <span style={{ fontSize: "16px", fontWeight: "500", color: "#c4b5fd", marginLeft: "6px" }}>XAF</span>
              </div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "19px", fontWeight: "700", color: "#fff", marginBottom: "0.75rem" }}>
                Frais de stage
              </h3>
              <p style={{ fontSize: "14px", color: "#ddd6fe", lineHeight: "1.8", marginBottom: "1.75rem" }}>
                Couvre l'encadrement, le suivi pédagogique complet et la délivrance de l'attestation de stage.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Encadrement par un expert", "Suivi pédagogique personnalisé", "Attestation officielle de stage"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#ddd6fe" }}>
                    <FiCheckCircle size={14} style={{ color: "#a78bfa", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section
        id="etapes"
        style={{
          padding: "7rem 0",
          background: "#faf5ff",
          borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe",
        }}
      >
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel>Comment ça marche</SectionLabel>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: "800",
                color: "#0f172a", letterSpacing: "-0.02em",
              }}
            >
              4 étapes, 100 % en ligne
            </h2>
          </div>

          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {steps.map((step, idx) => (
              <div
                key={step.num}
                style={{
                  display: "flex", gap: "1.5rem", alignItems: "flex-start",
                  padding: "1.75rem 2rem",
                  background: hoveredStep === idx ? "#fff" : "rgba(255,255,255,0.7)",
                  border: hoveredStep === idx ? `1px solid ${step.border}` : "1px solid #ede9fe",
                  borderRadius: "14px",
                  transition: "all 0.25s ease",
                  boxShadow: hoveredStep === idx ? `0 8px 28px ${step.color}14` : "none",
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: step.bg, border: `1px solid ${step.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Poppins', sans-serif", fontSize: "17px", fontWeight: "800",
                    color: step.color, flexShrink: 0,
                    transition: "transform 0.25s ease",
                    transform: hoveredStep === idx ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif", fontSize: "17px", fontWeight: "700",
                      color: "#1e293b", marginBottom: "0.4rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.75", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: "5rem 2rem", background: "#faf5ff", borderTop: "1px solid #ede9fe" }}>
        <div
          style={{
            maxWidth: "720px", margin: "0 auto",
            background: "linear-gradient(145deg, #4c1d95 0%, #7c3aed 100%)",
            borderRadius: "24px", padding: "4rem 3rem",
            textAlign: "center", position: "relative", overflow: "hidden",
            boxShadow: "0 24px 64px rgba(124,58,237,0.32)",
          }}
        >
          {/* Décos bg */}
          <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-80px", right: "-60px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-40px", left: "-30px", pointerEvents: "none" }} />

          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
              padding: "5px 14px", borderRadius: "99px",
              fontSize: "12px", fontWeight: "600", color: "#e9d5ff",
              marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em",
            }}
          >
            🚀 Commencer maintenant
          </div>

          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: "800",
              color: "#fff", marginBottom: "1rem",
              letterSpacing: "-0.02em", lineHeight: "1.15",
            }}
          >
            Prêt à démarrer votre stage ?
          </h2>
          <p style={{ color: "#ddd6fe", fontSize: "16px", lineHeight: "1.8", marginBottom: "2.5rem" }}>
            Rejoignez les étudiants encadrés par HR Skills SARL. Déposez votre dossier en ligne en quelques minutes.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 30px", borderRadius: "12px",
                background: "#fff", color: "#7c3aed",
                textDecoration: "none", fontSize: "15px", fontWeight: "700",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
            >
              Créer mon compte <FiArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 30px", borderRadius: "12px",
                border: "1.5px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: "500",
                transition: "all 0.25s ease", backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
