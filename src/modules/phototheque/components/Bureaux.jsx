import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";

const BUREAUX_DATA = [
  { id: 1, titre: "Salle de formation", description: "Espace moderne équipé pour les formations", image: "/images/phototheque/bureaux/bureau1.jpg" },
  { id: 2, titre: "Salle de formation", description: "Open space moderne pour travailler en équipe", image: "/images/phototheque/bureaux/bureau2.jpg" },
  { id: 3, titre: "Salle de formation", description: "Pause café et convivialité", image: "/images/phototheque/bureaux/bureau3.jpg" },
  { id: 4, titre: "Cuisine équipée", description: "Espace repas et convivialité", image: "/images/phototheque/bureaux/cuisine.jpg" },
  { id: 5, titre: "Fontaine à eau", description: "Hydratation à volonté pour toute l'équipe", image: "/images/phototheque/bureaux/eau.jpg" },
  { id: 6, titre: "Écran 64 pouces", description: "Écran géant pour les présentations et réunions", image: "/images/phototheque/bureaux/ecran.jpg" },
];

function PhotoCard({ item, onImageClick, height = "230px" }) {
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
      <div style={{ position: "relative", height, overflow: "hidden", background: "#ede9fe" }}>
        <img
          src={item.image} alt={item.titre}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
          onError={(e) => { e.target.src = "https://placehold.co/480x300?text=Photo+à+venir"; }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: hov
              ? "linear-gradient(to top, rgba(76,29,149,0.68) 0%, rgba(76,29,149,0.22) 45%, transparent 70%)"
              : "linear-gradient(to top, rgba(15,23,42,0.35) 0%, transparent 55%)",
            transition: "all 0.3s ease",
            display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
            padding: "12px",
          }}
        >
          <div
            style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.32)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
              opacity: hov ? 1 : 0,
              transform: hov ? "scale(1)" : "scale(0.7)",
              transition: "all 0.25s ease",
            }}
          >
            <FiZoomIn size={15} />
          </div>
        </div>
      </div>
      <div style={{ padding: "1rem 1.1rem 1.1rem" }}>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "2px" }}>
          {item.titre}
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.5" }}>
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default function Bureaux({ onImageClick }) {
  const handleClick = (item) => onImageClick && onImageClick(item, BUREAUX_DATA);

  return (
    <section id="bureaux" style={{ padding: "5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <style>{`
        .bureaux-main-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .bureaux-sub-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 768px) {
          .bureaux-main-grid, .bureaux-sub-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .bureaux-main-grid, .bureaux-sub-grid { grid-template-columns: repeat(2, 1fr); }
        }
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
          Espaces de travail
        </div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: "800",
          fontSize: "clamp(1.75rem, 3vw, 2.4rem)", color: "#0f172a",
          letterSpacing: "-0.025em", margin: "0 0 0.75rem", lineHeight: "1.15",
        }}>
          Nos bureaux
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "460px", margin: "0 auto", lineHeight: "1.75" }}>
          Découvrez nos espaces de travail modernes et conviviaux, conçus pour stimuler la créativité et la concentration.
        </p>
      </div>

      {/* Salles de formation */}
      <div className="bureaux-main-grid">
        {BUREAUX_DATA.slice(0, 3).map((item) => (
          <PhotoCard key={item.id} item={item} onImageClick={handleClick} height="230px" />
        ))}
      </div>

      {/* Équipements & commodités */}
      <div style={{ marginTop: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
          <div style={{ width: "3px", height: "22px", borderRadius: "99px", background: "linear-gradient(180deg, #7c3aed, #a78bfa)", flexShrink: 0 }} />
          <h3 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: "17px", fontWeight: "700",
            color: "#4c1d95", margin: 0,
          }}>
            Équipements &amp; commodités
          </h3>
        </div>
        <div className="bureaux-sub-grid">
          {BUREAUX_DATA.slice(3).map((item) => (
            <PhotoCard key={item.id} item={item} onImageClick={handleClick} height="200px" />
          ))}
        </div>
      </div>
    </section>
  );
}
