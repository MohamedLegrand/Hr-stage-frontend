import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiClock, FiCheckCircle, FiBookOpen, FiExternalLink,
  FiLayers, FiCode, FiSmartphone, FiPenTool, FiServer, FiGitBranch,
} from "react-icons/fi";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";
import { getProgrammeById } from "../data/programmesData";

const iconMap = {
  "analyse-uml": <FiLayers size={32} />,
  "developpement-web": <FiCode size={32} />,
  "developpement-mobile": <FiSmartphone size={32} />,
  "design-graphique": <FiPenTool size={32} />,
  "systemes-reseaux": <FiServer size={32} />,
  "devops": <FiGitBranch size={32} />,
};

export default function ProgrammeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const programme = getProgrammeById(id);

  if (!programme) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <div style={{ padding: "10rem 2rem", textAlign: "center", marginTop: "70px" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2rem", color: "#1e293b" }}>
            Programme introuvable
          </h1>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "2rem", padding: "12px 28px",
              background: "#7c3aed", color: "#fff",
              border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "15px", fontWeight: "600",
            }}
          >
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1e293b", minHeight: "100vh" }}>
      <Header />

      {/* HERO */}
      <div style={{
        position: "relative",
        paddingTop: "calc(70px + 6rem)", paddingBottom: "5rem",
        paddingLeft: "2rem", paddingRight: "2rem",
        color: "#fff", overflow: "hidden",
        boxShadow: "inset 0 -60px 80px rgba(0,0,0,0.35)",
      }}>
        {/* Image floutée — inset élargi pour éviter les bords blancs du blur */}
        <div style={{
          position: "absolute", inset: "-12px",
          backgroundImage: `url('${programme.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          filter: "blur(8px) brightness(0.9)",
        }} />
        {/* Vignette : ombres sur les bords, centre clair */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
          zIndex: 1,
        }} />
        {/* Voile couleur très léger (~16% → ~25%) */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${programme.color}28, ${programme.color}40)`,
          zIndex: 1,
        }} />
        {/* Dégradé sombre bas pour lisibilité du texte */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1,
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "40px",
              padding: "8px 20px", color: "#fff", cursor: "pointer",
              marginBottom: "2rem", fontSize: "14px", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          >
            <FiArrowLeft /> Retour aux programmes
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <div style={{
              width: "70px", height: "70px", borderRadius: "20px", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: programme.color, boxShadow: "0 10px 30px rgba(0,0,0,0.15)", flexShrink: 0,
            }}>
              {iconMap[programme.id]}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: "800", marginBottom: "0.5rem",
                textShadow: "0 2px 16px rgba(0,0,0,0.55)", margin: "0 0 0.5rem",
              }}>
                {programme.title}
              </h1>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.2)", padding: "4px 12px",
                borderRadius: "20px", fontSize: "13px",
              }}>
                <FiClock size={14} /> {programme.duree}
              </span>
            </div>
          </div>

          <p style={{
            fontSize: "18px", opacity: 0.95, maxWidth: "700px",
            lineHeight: "1.7", textShadow: "0 1px 10px rgba(0,0,0,0.5)", margin: 0,
          }}>
            {programme.desc}
          </p>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* GAUCHE : concept + réalisations */}
          <div style={{ flex: "1 1 480px" }}>

            <section style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: `${programme.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: programme.color, flexShrink: 0,
                }}>
                  <FiBookOpen size={18} />
                </div>
                <h2 style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem",
                  fontWeight: "700", color: "#1e293b", margin: 0,
                }}>
                  Le concept
                </h2>
              </div>
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.9", margin: 0 }}>
                {programme.concept}
              </p>
            </section>

            {programme.realisations && (
              <section>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: `${programme.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: programme.color, flexShrink: 0,
                  }}>
                    <FiCheckCircle size={18} />
                  </div>
                  <h2 style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem",
                    fontWeight: "700", color: "#1e293b", margin: 0,
                  }}>
                    Chez HR Skills SARL
                  </h2>
                </div>
                <div style={{
                  background: `${programme.color}08`,
                  border: `1px solid ${programme.color}25`,
                  borderLeft: `4px solid ${programme.color}`,
                  borderRadius: "0 12px 12px 0",
                  padding: "1.25rem 1.5rem",
                }}>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.9", margin: 0 }}>
                    {programme.realisations}
                  </p>
                  {programme.lien && (
                    <a
                      href={programme.lien.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        marginTop: "1rem", color: programme.color,
                        fontWeight: "600", fontSize: "14px",
                        textDecoration: "none",
                        borderBottom: `1px solid ${programme.color}55`,
                        paddingBottom: "2px",
                      }}
                    >
                      {programme.lien.label} <FiExternalLink size={13} />
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* DROITE : objectifs + prérequis + CTA */}
          <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Objectifs */}
            <div style={{
              background: "#fff", border: "1px solid #ede9fe",
              borderRadius: "16px", padding: "1.75rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif", fontSize: "15px",
                fontWeight: "700", color: "#1e293b", margin: "0 0 1rem",
              }}>
                Objectifs de la formation
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {programme.objectifs.map((obj, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>
                    <FiCheckCircle size={15} style={{ color: programme.color, marginTop: "2px", flexShrink: 0 }} />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prérequis */}
            <div style={{
              background: "#fff", border: "1px solid #ede9fe",
              borderRadius: "16px", padding: "1.75rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif", fontSize: "15px",
                fontWeight: "700", color: "#1e293b", margin: "0 0 1rem",
              }}>
                Prérequis
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {programme.prerequis.map((pr, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>
                    <span style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: programme.color, marginTop: "6px", flexShrink: 0,
                    }} />
                    {pr}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href="/register"
              style={{
                display: "block", textAlign: "center",
                padding: "14px 24px",
                background: `linear-gradient(135deg, ${programme.color}, ${programme.color}cc)`,
                color: "#fff", borderRadius: "12px",
                fontWeight: "600", fontSize: "15px",
                textDecoration: "none",
                boxShadow: `0 8px 24px ${programme.color}40`,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Postuler à ce programme
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
