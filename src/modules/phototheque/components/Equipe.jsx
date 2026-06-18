import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";

const EQUIPE_DATA = [
  { id: 1, nom: "Paul Stéphane ZOA ONDOBO",     poste: "CEO / Responsable Juridique & DRH",          image: "/images/phototheque/equipe/ceo.jpg",               color: "#7c3aed", bg: "#f5f3ff" },
  { id: 2, nom: "Adelphe DOUA SODEA",            poste: "CTO — Chief Technology Officer",              image: "/images/phototheque/equipe/cto.jpg",               color: "#0ea5e9", bg: "#f0f9ff" },
  { id: 3, nom: "Oviane Arelle AZOUTSA ZONSOP",  poste: "COO — Chief Operating Officer",               image: "/images/phototheque/equipe/coo.jpg",               color: "#10b981", bg: "#f0fdf4" },
  { id: 4, nom: "Franck Dimitri",                poste: "CMO — Chief Marketing Officer",               image: "/images/phototheque/equipe/cmo.jpg",               color: "#f59e0b", bg: "#fffbeb" },
  { id: 5, nom: "Mohamed TAKADJIO",              poste: "Développeur Full Stack / Lead UAT",           image: "/images/phototheque/equipe/chef-uat.jpg",          color: "#8b5cf6", bg: "#f5f3ff" },
  { id: 6, nom: "Alex TAGNE Djimefo",            poste: "Développeur Frontend / Admin BDD & Système",  image: "/images/phototheque/equipe/dev-frontend.jpg",      color: "#6366f1", bg: "#eef2ff" },
  { id: 7, nom: "Sarah Ophenya KIMAYE SANG",     poste: "Community Manager / Responsable Coworking",  image: "/images/phototheque/equipe/community-manager.jpg", color: "#ec4899", bg: "#fdf2f8" },
];

function MemberCard({ membre, onImageClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onImageClick(membre)}
      style={{
        borderRadius: "18px", overflow: "hidden", cursor: "pointer",
        background: "#fff",
        border: `1px solid ${hov ? "#c4b5fd" : "#ede9fe"}`,
        boxShadow: hov ? "0 20px 52px rgba(124,58,237,0.13)" : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Photo */}
      <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#ede9fe" }}>
        <img
          src={membre.image} alt={membre.nom}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
          onError={(e) => { e.target.src = "https://placehold.co/400x400?text=Photo+à+venir"; }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: hov
              ? `linear-gradient(to top, ${membre.color}cc 0%, ${membre.color}33 50%, transparent 70%)`
              : "linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 55%)",
            transition: "all 0.3s ease",
            display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
            padding: "12px",
          }}
        >
          <div
            style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
              opacity: hov ? 1 : 0,
              transform: hov ? "scale(1)" : "scale(0.7)",
              transition: "all 0.25s ease",
            }}
          >
            <FiZoomIn size={14} />
          </div>
        </div>
      </div>

      {/* Infos */}
      <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "5px", lineHeight: "1.35" }}>
          {membre.nom}
        </div>
        <div style={{
          display: "inline-block",
          fontSize: "11px", fontWeight: "600", color: membre.color,
          background: membre.bg, borderRadius: "6px",
          padding: "3px 8px", lineHeight: "1.5",
        }}>
          {membre.poste}
        </div>
      </div>
    </div>
  );
}

export default function Equipe({ onImageClick }) {
  const handleClick = (item) => onImageClick && onImageClick(item, EQUIPE_DATA);

  return (
    <section style={{
      padding: "5rem 2rem",
      background: "linear-gradient(160deg, #faf5ff 0%, #f5f3ff 100%)",
      borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe",
    }}>
      <style>{`
        .equipe-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 768px)                        { .equipe-grid { grid-template-columns: 1fr; } }
        @media (min-width: 769px) and (max-width: 1024px){ .equipe-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* En-tête */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 14px", borderRadius: "99px",
            background: "#ede9fe", color: "#7c3aed",
            fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: "0.875rem",
          }}>
            L'équipe HR Skills
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: "800",
            fontSize: "clamp(1.75rem, 3vw, 2.4rem)", color: "#0f172a",
            letterSpacing: "-0.025em", margin: "0 0 0.75rem", lineHeight: "1.15",
          }}>
            Notre équipe
          </h2>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "460px", margin: "0 auto", lineHeight: "1.75" }}>
            Une équipe pluridisciplinaire, passionnée et entièrement dédiée à la réussite des stagiaires.
          </p>
        </div>

        {/* Grille */}
        <div className="equipe-grid">
          {EQUIPE_DATA.map((membre) => (
            <MemberCard key={membre.id} membre={membre} onImageClick={handleClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
