import { useNavigate } from "react-router-dom";

export default function ProgrammeCard({ programme }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/programme/${programme.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "#fff",
        border: "1px solid #ede9fe",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 28px ${programme.color}1f`;
        e.currentTarget.style.borderColor = programme.color;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#ede9fe";
      }}
    >
      {/* IMAGE */}
      <div style={{
        position: "relative",
        height: "130px",
        backgroundImage: `url('${programme.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 40%, ${programme.color}cc 100%)`
        }} />
        <div style={{
          position: "absolute",
          bottom: "-22px",
          left: "16px",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "#fff",
          border: `1px solid ${programme.color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: programme.color,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          {programme.icon}
        </div>
      </div>

      {/* CONTENU */}
      <div style={{ padding: "1.75rem 1.25rem 1.25rem" }}>
        <h4 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "15px",
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: "0.5rem"
        }}>
          {programme.title}
        </h4>
        <p style={{
          fontSize: "13px",
          color: "#64748b",
          lineHeight: "1.6"
        }}>
          {programme.desc}
        </p>
        
        {/* Indicateur cliquable */}
        <div style={{
          marginTop: "1rem",
          fontSize: "12px",
          color: programme.color,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontWeight: "500"
        }}>
          En savoir plus →
        </div>
      </div>
    </div>
  );
}