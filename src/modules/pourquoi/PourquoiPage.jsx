import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../shared/components/Header";
import Footer from "@/shared/components/footer";
import {
  FiWifi, FiUsers, FiMic, FiMonitor, FiVideo, FiShield,
  FiStar, FiArrowRight, FiCheckCircle, FiAward,
} from "react-icons/fi";

const AVANTAGES = [
  {
    icon: <FiWifi size={26} />,
    title: "Fibre optique haut débit",
    desc: "Connexion internet ultra-rapide en fibre optique pour des téléchargements et uploads sans latence. Travaillez sur vos projets, accédez à la documentation et aux ressources en ligne sans interruption.",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#bae6fd",
    tag: "Infrastructure",
  },
  {
    icon: <FiUsers size={26} />,
    title: "Équipe technique spécialisée",
    desc: "Bénéficiez de l'encadrement d'experts en développement web, mobile, DevOps, design et systèmes réseaux. Nos mentors vous guident avec des retours concrets issus de projets réels en production.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    tag: "Encadrement",
  },
  {
    icon: <FiMic size={26} />,
    title: "Séances d'art oratoire",
    desc: "Préparez vos soutenances avec des séances dédiées à la prise de parole en public. Apprenez à structurer votre présentation, gérer le stress et convaincre un jury académique ou professionnel.",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    tag: "Présoutenance",
  },
  {
    icon: <FiMonitor size={26} />,
    title: "Grand écran de présentation",
    desc: "Salle équipée d'un grand écran haute résolution pour vos présentations, démonstrations de projets et revues de code en équipe. Visualisez vos maquettes et interfaces à grande échelle.",
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    tag: "Équipement",
  },
  {
    icon: <FiVideo size={26} />,
    title: "Vidéoprojecteur",
    desc: "Vidéoprojecteur disponible pour vos présentations collectives, formations internes et séances de présoutenance. Idéal pour projeter vos diaporamas et démos devant un groupe.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    tag: "Équipement",
  },
  {
    icon: <FiShield size={26} />,
    title: "Sécurité 24h/24 — Caméras",
    desc: "Les locaux HR Skills SARL sont sécurisés avec un système de vidéosurveillance moderne. Travaillez sereinement, vos affaires et votre matériel sont protégés en permanence.",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    tag: "Sécurité",
  },
  {
    icon: <FiStar size={26} />,
    title: "Ambiance de travail exceptionnelle",
    desc: "Un cadre de travail convivial, moderne et stimulant. Une équipe soudée, des espaces propres et bien aménagés, et une culture d'entreprise axée sur la bienveillance, la rigueur et la progression.",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fed7aa",
    tag: "Environnement",
  },
];

const STATS = [
  { value: "200+", label: "Stagiaires formés" },
  { value: "6",    label: "Programmes disponibles" },
  { value: "100%", label: "Encadrement personnalisé" },
  { value: "5⭐",  label: "Note moyenne de satisfaction" },
];

export default function PourquoiPage() {
  const [hovered, setHovered] = useState(null);
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: "calc(70px + 5rem)", paddingBottom: "5rem",
          background: "linear-gradient(160deg, #0f0b2a 0%, #3b0764 50%, #4c1d95 100%)",
          position: "relative", overflow: "hidden",
          animation: "fadeUp 0.7s ease both",
        }}
      >
        {/* Décos bg */}
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(124,58,237,0.15)", top: "-200px", right: "-100px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(167,139,250,0.08)", bottom: "-100px", left: "-80px", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(167,139,250,0.2)", border: "1px solid rgba(167,139,250,0.35)",
              borderRadius: "99px", padding: "6px 18px", marginBottom: "2rem",
              fontSize: "12px", fontWeight: "700", color: "#c4b5fd",
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}
          >
            <FiAward size={12} /> Pourquoi nous choisir
          </div>

          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: "800", color: "#fff",
              margin: "0 0 1.5rem", letterSpacing: "-0.03em", lineHeight: "1.1",
            }}
          >
            Pourquoi faire votre stage<br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              à HR Skills SARL ?
            </span>
          </h1>

          <p
            style={{
              color: "#c4b5fd", fontSize: "17px", maxWidth: "600px",
              margin: "0 auto 3rem", lineHeight: "1.8",
            }}
          >
            Bien plus qu'un simple stage — une expérience professionnelle complète dans un environnement
            taillé pour votre réussite académique et professionnelle.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "inline-grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 2rem",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "26px", fontWeight: "800", color: "#fff", lineHeight: "1" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "12px", color: "#a78bfa", marginTop: "4px", fontWeight: "500" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANTAGES GRID ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
            Nos atouts
          </p>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "800",
              color: "#0f172a", margin: 0, letterSpacing: "-0.02em",
            }}
          >
            Ce qui fait la différence
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {AVANTAGES.map((av, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: `1px solid ${hovered === i ? av.border : "#f0eefe"}`,
                borderRadius: "20px",
                padding: "2rem",
                transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
                transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hovered === i ? `0 20px 48px ${av.color}1a` : "0 1px 4px rgba(0,0,0,0.04)",
                cursor: "default",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-flex", alignItems: "center",
                  fontSize: "10px", fontWeight: "700",
                  padding: "3px 10px", borderRadius: "99px",
                  color: av.color, background: av.bg, border: `1px solid ${av.border}`,
                  textTransform: "uppercase", letterSpacing: "0.07em",
                  marginBottom: "1.25rem",
                }}
              >
                {av.tag}
              </div>

              {/* Icône */}
              <div
                style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: hovered === i ? av.bg : "#f8f7ff",
                  border: `1px solid ${hovered === i ? av.border : "#f0eefe"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: av.color, marginBottom: "1.25rem",
                  transition: "all 0.25s ease",
                  transform: hovered === i ? "scale(1.1)" : "scale(1)",
                }}
              >
                {av.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: "17px", fontWeight: "800",
                  color: "#0f172a", margin: "0 0 0.75rem", letterSpacing: "-0.01em",
                }}
              >
                {av.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.75", margin: 0 }}>
                {av.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEMOIGNAGES / LISTE CHECKLIST ── */}
      <section style={{ background: "linear-gradient(160deg, #faf5ff 0%, #ede9fe 100%)", padding: "5rem 2rem", borderTop: "1px solid #ede9fe" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: "800", color: "#0f172a", margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
            En résumé, chez HR Skills SARL vous avez…
          </h2>
          <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.7", marginBottom: "2.5rem" }}>
            Tout ce dont vous avez besoin pour réussir votre stage et préparer votre avenir professionnel.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", textAlign: "left" }}>
            {[
              "Fibre optique haut débit sans coupure",
              "Équipe d'experts toujours disponible",
              "Séances d'art oratoire pour votre soutenance",
              "Grand écran pour vos présentations",
              "Vidéoprojecteur en salle de réunion",
              "Système de vidéosurveillance 24h/24",
              "Cadre de travail agréable et moderne",
              "Attestation de stage officielle",
              "Projets réels avec impact concret",
              "Réseau professionnel élargi",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "12px 16px", borderRadius: "10px",
                  background: "#fff", border: "1px solid #ede9fe",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                  fontSize: "13px", color: "#374151", lineHeight: "1.5", fontWeight: "500",
                }}
              >
                <FiCheckCircle size={15} style={{ color: "#7c3aed", flexShrink: 0, marginTop: "1px" }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 2rem", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "640px", margin: "0 auto",
            background: "linear-gradient(145deg, #3b0764 0%, #7c3aed 100%)",
            borderRadius: "24px", padding: "4rem 3rem",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 64px rgba(124,58,237,0.32)",
          }}
        >
          <div style={{ position: "absolute", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-80px", right: "-60px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-40px", left: "-30px", pointerEvents: "none" }} />

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
              fontFamily: "'Poppins', sans-serif", fontSize: "26px",
              fontWeight: "800", color: "#fff", margin: "0 0 1rem",
              letterSpacing: "-0.02em", lineHeight: "1.2",
              position: "relative", zIndex: 1,
            }}
          >
            Prêt à rejoindre HR Skills SARL ?
          </h2>
          <p style={{ color: "#ddd6fe", fontSize: "15px", lineHeight: "1.8", marginBottom: "2.5rem", position: "relative", zIndex: 1 }}>
            Inscrivez-vous dès maintenant et bénéficiez d'un encadrement professionnel de qualité pour votre stage académique.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <Link
              to="/register"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "12px",
                background: ctaHov ? "rgba(255,255,255,0.98)" : "#fff",
                color: "#7c3aed", fontWeight: "700", fontSize: "15px",
                textDecoration: "none",
                boxShadow: ctaHov ? "0 12px 28px rgba(0,0,0,0.22)" : "0 6px 16px rgba(0,0,0,0.15)",
                transform: ctaHov ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.25s ease",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
            >
              Postuler maintenant <FiArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 24px", borderRadius: "12px",
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", fontWeight: "600", fontSize: "15px",
                textDecoration: "none", transition: "all 0.2s ease",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
