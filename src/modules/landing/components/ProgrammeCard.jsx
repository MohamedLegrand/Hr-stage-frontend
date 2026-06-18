import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";

export default function ProgrammeCard({ programme }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/programme/${programme.id}`)}
      style={{
        background: "#fff",
        border: hovered ? `1px solid ${programme.color}` : "1px solid #ede9fe",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px ${programme.color}1a` : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          height: "148px",
          backgroundImage: `url('${programme.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Overlay dégradé bas */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, rgba(0,0,0,0) 30%, ${programme.color}dd 100%)`,
            transition: "opacity 0.28s ease",
            opacity: hovered ? 1 : 0.7,
          }}
        />

        {/* ICÔNE */}
        <div
          style={{
            position: "absolute", bottom: "-20px", left: "18px",
            width: "46px", height: "46px",
            borderRadius: "12px",
            background: "#fff",
            border: `1px solid ${programme.color}2a`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: programme.color,
            boxShadow: `0 6px 18px ${programme.color}22`,
            transition: "transform 0.28s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {programme.icon}
        </div>
      </div>

      {/* CONTENU */}
      <div style={{ padding: "1.75rem 1.25rem 1.5rem" }}>
        <h4
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "15px", fontWeight: "700",
            color: "#1e293b", marginBottom: "0.5rem",
          }}
        >
          {programme.title}
        </h4>
        <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.65", marginBottom: "1.25rem" }}>
          {programme.desc}
        </p>

        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            fontSize: "13px", fontWeight: "600", color: programme.color,
            transition: "gap 0.2s ease",
          }}
        >
          En savoir plus
          <FiArrowRight
            size={13}
            style={{
              transition: "transform 0.2s ease",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
