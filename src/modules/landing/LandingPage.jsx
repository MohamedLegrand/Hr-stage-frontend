import Header from "../../shared/components/Header";
import Footer from "@/shared/components/footer";
import HeroSection from "./HeroSection";
import ProgrammeCard from "./components/ProgrammeCard";
import {
  FiFileText, FiCreditCard, FiCheckCircle, FiAward, FiUsers, FiTarget,
  FiLayers, FiCode, FiSmartphone, FiPenTool, FiServer, FiMapPin, FiGitBranch
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // Données des programmes
  const programmes = [
    { 
      id: "analyse-uml",
      image: "/images/landing/uml.jpg", 
      icon: <FiLayers size={24} />, 
      color: "#7c3aed", 
      title: "Analyse UML & MERISE", 
      desc: "Modélisation et conception de systèmes d'information." 
    },
    { 
      id: "developpement-web",
      image: "/images/landing/web.jpg", 
      icon: <FiCode size={24} />, 
      color: "#0ea5e9", 
      title: "Développement Web", 
      desc: "Conception et réalisation d'applications web modernes." 
    },
    { 
      id: "developpement-mobile",
      image: "/images/landing/mobile.jpg", 
      icon: <FiSmartphone size={24} />, 
      color: "#10b981", 
      title: "Développement Mobile", 
      desc: "Création d'applications mobiles Android et iOS." 
    },
    { 
      id: "design-graphique",
      image: "/images/landing/design.jpg", 
      icon: <FiPenTool size={24} />, 
      color: "#f59e0b", 
      title: "Design Graphique", 
      desc: "Création visuelle, identité de marque et supports graphiques." 
    },
    { 
      id: "systemes-reseaux",
      image: "/images/landing/reseau.jpg", 
      icon: <FiServer size={24} />, 
      color: "#ef4444", 
      title: "Systèmes & Réseaux", 
      desc: "Administration de systèmes, infrastructures et réseaux informatiques." 
    },
    { 
      id: "devops",
      image: "/images/landing/devop.jpg", 
      icon: <FiGitBranch size={24} />, 
      color: "#06b6d4", 
      title: "DevOps", 
      desc: "Intégration et déploiement continus, automatisation et gestion d'infrastructures." 
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1e293b", minHeight: "100vh" }}>

      <Header />
      <HeroSection />

      {/* A PROPOS */}
      <section id="apropos" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>À propos de HR Skills SARL</p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
            Un encadrement sérieux, par des experts
          </h2>
          <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.8", maxWidth: "700px", margin: "0 auto" }}>
            Chez HR Skills SARL, nos formateurs sont des professionnels sérieux, engagés et experts chacun dans son domaine. Ils accompagnent les stagiaires avec rigueur, du premier jour jusqu'à la fin du stage, pour garantir une expérience formatrice et professionnalisante.
          </p>
        </div>

        {/* VALEURS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          {[
            { icon: <FiAward size={24} />, color: "#7c3aed", bg: "#f5f3ff", title: "Formateurs experts", desc: "Chacun spécialisé et expérimenté dans son domaine d'enseignement." },
            { icon: <FiTarget size={24} />, color: "#0ea5e9", bg: "#f0f9ff", title: "Encadrement rigoureux", desc: "Un suivi sérieux et structuré tout au long du stage." },
            { icon: <FiUsers size={24} />, color: "#10b981", bg: "#f0fdf4", title: "Équipe engagée", desc: "Des formateurs disponibles et investis dans la réussite des stagiaires." },
          ].map((item) => (
            <div key={item.title} style={{
              background: "#fff", border: "1px solid #ede9fe", borderRadius: "14px",
              padding: "1.5rem", textAlign: "center"
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px", background: item.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: item.color, margin: "0 auto 1rem"
              }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* PROGRAMMES DE STAGE AVEC CARTES CLIQUABLES */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: "700", color: "#1e293b" }}>
              Nos programmes de stage
            </h3>
            <p style={{ color: "#64748b", marginTop: "0.5rem", fontSize: "14px" }}>
              Cliquez sur un programme pour plus de détails
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {programmes.map((programme) => (
              <ProgrammeCard key={programme.id} programme={programme} />
            ))}
          </div>
        </div>
      </section>

      {/* FONCTIONNALITES */}
      <section id="fonctionnalites" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto", background: "#faf5ff" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Fonctionnalités</p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "700", color: "#1e293b" }}>
            Tout ce dont vous avez besoin
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: <FiFileText size={28} />, color: "#7c3aed", bg: "#f5f3ff", title: "Dépôt de documents", desc: "Uploadez vos 4 documents requis (lettre de demande, CV, certificat de scolarité, CNI) en quelques clics." },
            { icon: <FiCreditCard size={28} />, color: "#0ea5e9", bg: "#f0f9ff", title: "Paiement sécurisé", desc: "Réglez votre pré-inscription et vos frais de stage via Mobile Money directement depuis la plateforme." },
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

      {/* TARIFS */}
      <section id="tarifs" style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Tarifs</p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "700", color: "#1e293b" }}>
            Des frais simples et transparents
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          <div style={{
            background: "#fff", border: "1px solid #ede9fe", borderRadius: "16px",
            padding: "2rem", textAlign: "center"
          }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
              Pré-inscription
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", fontWeight: "800", color: "#1e293b", marginBottom: "0.25rem" }}>
              5 000 <span style={{ fontSize: "16px", fontWeight: "500", color: "#64748b" }}>XAF</span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "1rem", lineHeight: "1.7" }}>
              Frais pour valider votre inscription et débuter la constitution de votre dossier de stage.
            </p>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
            border: "1px solid #c4b5fd", borderRadius: "16px",
            padding: "2rem", textAlign: "center"
          }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
              Frais de stage
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", fontWeight: "800", color: "#4c1d95", marginBottom: "0.25rem" }}>
              40 000 <span style={{ fontSize: "16px", fontWeight: "500", color: "#7c3aed" }}>XAF</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6d28d9", marginTop: "1rem", lineHeight: "1.7" }}>
              Frais couvrant l'encadrement, le suivi pédagogique et la délivrance de l'attestation de stage.
            </p>
          </div>
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
              { num: "02", color: "#0ea5e9", bg: "#f0f9ff", title: "Payez la pré-inscription", desc: "Réglez les frais de pré-inscription de 5 000 XAF via Mobile Money pour activer votre dossier." },
              { num: "03", color: "#10b981", bg: "#f0fdf4", title: "Déposez vos documents et payez les frais de stage", desc: "Uploadez vos 4 documents requis et réglez les frais de stage de 40 000 XAF depuis votre tableau de bord." },
              { num: "04", color: "#f59e0b", bg: "#fffbeb", title: "Suivez votre dossier", desc: "L'administration valide vos documents et vos paiements, et vous recevez une confirmation en temps réel." },
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

      {/* LOCALISATION */}
      <section id="localisation" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#7c3aed", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Où nous trouver</p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
            Notre localisation à Yaoundé
          </h2>
          <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.7" }}>
            HR Skills SARL est situé à Yaoundé, vers Tropicana, juste après Eneo.
          </p>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          justifyContent: "center", marginBottom: "1.5rem",
          color: "#7c3aed", fontWeight: "600", fontSize: "15px"
        }}>
          <FiMapPin size={20} />
          <span>HR Skills SARL — Tropicana, après Eneo, Yaoundé, Cameroun</span>
        </div>

        <div style={{
          borderRadius: "16px", overflow: "hidden",
          border: "1px solid #ede9fe", boxShadow: "0 8px 24px rgba(124,58,237,0.08)"
        }}>
          <iframe
            title="Localisation HR Skills SARL"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=3.8171,11.5260&z=16&output=embed"
          />
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
            Prêt à démarrer votre stage ?
          </h2>
          <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: "1.7" }}>
            Inscrivez-vous dès maintenant et rejoignez les stagiaires encadrés par HR Skills SARL.
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