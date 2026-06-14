import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import HeroSection from "./HeroSection";
import { FiFileText, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1e293b", minHeight: "100vh" }}>

      <Header />
      <HeroSection />

      {/* FONCTIONNALITES */}
      <section id="fonctionnalites" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Fonctionnalités</p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "700", color: "#1e293b" }}>
            Tout ce dont vous avez besoin
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: <FiFileText size={28} />, color: "#7c3aed", bg: "#f5f3ff", title: "Dépôt de documents", desc: "Uploadez vos 4 documents requis (lettre de demande, CV, certificat de scolarité, CNI) en quelques clics." },
            { icon: <FiCreditCard size={28} />, color: "#0ea5e9", bg: "#f0f9ff", title: "Paiement sécurisé", desc: "Payez vos frais de dossier via Mobile Money (MTN, Orange) directement depuis la plateforme." },
            { icon: <FiCheckCircle size={28} />, color: "#10b981", bg: "#f0fdf4", title: "Suivi en temps réel", desc: "Consultez le statut de chaque document et de votre paiement à tout moment depuis votre tableau de bord." },
          ].map((feat) => (
            <div key={feat.title} style={{
              background: "#fff", border: "1px solid #ede9fe",
              borderRadius: "16px", padding: "2rem",
              transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = feat.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${feat.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ede9fe"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: feat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: feat.color, marginBottom: "1.25rem" }}>{feat.icon}</div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "0.75rem" }}>{feat.title}</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7" }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPES */}
      <section id="etapes" style={{ padding: "6rem 2rem", background: "#faf5ff", borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Comment ça marche</p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "700", color: "#1e293b" }}>4 étapes simples</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { num: "01", color: "#7c3aed", bg: "#f5f3ff", title: "Créez votre compte", desc: "Inscrivez-vous avec vos informations personnelles et académiques en une seule fois." },
              { num: "02", color: "#0ea5e9", bg: "#f0f9ff", title: "Uploadez vos documents", desc: "Déposez vos 4 documents requis au format PDF ou image depuis votre tableau de bord." },
              { num: "03", color: "#10b981", bg: "#f0fdf4", title: "Effectuez votre paiement", desc: "Payez les frais de dossier via Mobile Money directement depuis la plateforme." },
              { num: "04", color: "#f59e0b", bg: "#fffbeb", title: "Suivez votre dossier", desc: "L'administration valide vos documents et vous recevez une confirmation en temps réel." },
            ].map((step) => (
              <div key={step.num} style={{
                display: "flex", gap: "1.5rem", alignItems: "flex-start",
                padding: "1.5rem 2rem", background: "#fff",
                border: "1px solid #ede9fe", borderRadius: "12px", transition: "box-shadow 0.3s"
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${step.color}15`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "800", color: step.color, flexShrink: 0 }}>{step.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "17px", fontWeight: "600", color: "#1e293b", marginBottom: "0.4rem" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{
          maxWidth: "600px", margin: "0 auto", padding: "4rem 2rem", borderRadius: "20px",
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
          border: "1px solid #c4b5fd"
        }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "700", color: "#4c1d95", marginBottom: "1rem" }}>
            Prêt à déposer votre dossier ?
          </h2>
          <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: "1.7" }}>
            Rejoignez les stagiaires qui gèrent leur dossier en ligne avec HR Skills Stage.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" style={{ padding: "14px 32px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", textDecoration: "none", fontSize: "16px", fontWeight: "600", boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)" }}>Créer mon compte</Link>
            <Link to="/login" style={{ padding: "14px 32px", borderRadius: "10px", border: "1px solid #c4b5fd", background: "#fff", color: "#7c3aed", textDecoration: "none", fontSize: "16px", fontWeight: "500" }}>Se connecter</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}