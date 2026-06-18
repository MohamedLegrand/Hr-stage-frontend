import { useState } from "react";
import { FiZoomIn, FiMonitor, FiPrinter, FiVideo, FiCpu, FiTablet } from "react-icons/fi";

const EQUIPEMENT_DATA = [
  { id: 1, titre: "Écran 64 pouces",        description: "Écran géant pour les présentations et réunions",     image: "/images/phototheque/equipement/ecran.jpg",              icon: <FiMonitor />, color: "#0ea5e9", bg: "#f0f9ff" },
  { id: 2, titre: "Ordinateur de bureau",   description: "Station de travail puissante pour les développeurs", image: "/images/phototheque/equipement/ordinateur-bureau.jpg",  icon: <FiCpu />,     color: "#7c3aed", bg: "#f5f3ff" },
  { id: 3, titre: "Ordinateur portable",    description: "PC portable haute performance pour la mobilité",     image: "/images/phototheque/equipement/ordinateur-portable.jpg", icon: <FiTablet />,  color: "#10b981", bg: "#f0fdf4" },
  { id: 4, titre: "Mini imprimante",        description: "Impression rapide et compacte",                      image: "/images/phototheque/equipement/imprimante.jpg",         icon: <FiPrinter />, color: "#f59e0b", bg: "#fffbeb" },
  { id: 5, titre: "Vidéo projecteur 4K",   description: "Projecteur haute définition pour les formations",    image: "/images/phototheque/equipement/projecteur.jpg",         icon: <FiVideo />,   color: "#8b5cf6", bg: "#f5f3ff" },
];

function EquipCard({ item, onImageClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onImageClick(item)}
      style={{
        borderRadius: "16px", overflow: "hidden", cursor: "pointer",
        background: "#fff",
        border: `1px solid ${hov ? "#c4b5fd" : "#ede9fe"}`,
        boxShadow: hov ? "0 20px 48px rgba(124,58,237,0.13)" : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "210px", overflow: "hidden", background: item.bg }}>
        <img
          src={item.image} alt={item.titre}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
          onError={(e) => { e.target.src = "https://placehold.co/480x280?text=Photo+à+venir"; }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: hov
              ? "linear-gradient(to top, rgba(76,29,149,0.65) 0%, rgba(76,29,149,0.2) 45%, transparent 70%)"
              : "linear-gradient(to top, rgba(15,23,42,0.3) 0%, transparent 55%)",
            transition: "all 0.3s ease",
            display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
            padding: "12px",
          }}
        >
          <div
            style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.32)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
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
      <div style={{ padding: "1rem 1.1rem 1.1rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
          background: item.bg, color: item.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px",
        }}>
          {item.icon}
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "2px" }}>
            {item.titre}
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.5" }}>
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Equipement({ onImageClick }) {
  const handleClick = (item) => onImageClick && onImageClick(item, EQUIPEMENT_DATA);

  return (
    <section id="equipement" style={{ padding: "5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <style>{`
        .equip-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 768px)                        { .equip-grid { grid-template-columns: 1fr; } }
        @media (min-width: 769px) and (max-width: 1024px){ .equip-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      {/* En-tête */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "4px 14px", borderRadius: "99px",
          background: "#ede9fe", color: "#7c3aed",
          fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em",
          marginBottom: "0.875rem",
        }}>
          Matériel informatique
        </div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: "800",
          fontSize: "clamp(1.75rem, 3vw, 2.4rem)", color: "#0f172a",
          letterSpacing: "-0.025em", margin: "0 0 0.75rem", lineHeight: "1.15",
        }}>
          Nos équipements informatiques
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "460px", margin: "0 auto", lineHeight: "1.75" }}>
          Du matériel moderne et performant pour offrir des conditions de travail optimales à chaque stagiaire.
        </p>
      </div>

      {/* Grille */}
      <div className="equip-grid">
        {EQUIPEMENT_DATA.map((item) => (
          <EquipCard key={item.id} item={item} onImageClick={handleClick} />
        ))}
      </div>
    </section>
  );
}
