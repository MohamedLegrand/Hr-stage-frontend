import { useState } from "react";
import Header from "../../shared/components/Header";
import Footer from "@/shared/components/footer";
import {
  FiMail, FiPhone, FiMapPin, FiMessageCircle, FiSend, FiUser,
  FiChevronDown, FiCheckCircle,
} from "react-icons/fi";

const SUJETS = [
  "Demande d'information sur les stages",
  "Inscription à un programme",
  "Documents et dossier",
  "Paiement et frais",
  "Partenariat",
  "Autre",
];

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [hovCard, setHovCard] = useState(null);
  const [hovWa, setHovWa] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulation envoi (à brancher sur un endpoint API)
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setForm({ nom: "", email: "", telephone: "", sujet: "", message: "" });
    }, 1400);
  };

  const inputBase = {
    width: "100%", padding: "12px 14px", borderRadius: "10px",
    fontSize: "14px", outline: "none", background: "#fff", color: "#1e293b",
    boxSizing: "border-box", fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const inp = (field) => ({
    ...inputBase,
    border: focused === field ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
    boxShadow: focused === field ? "0 0 0 3px rgba(124,58,237,0.08)" : "none",
    paddingLeft: "42px",
  });

  const infoCards = [
    {
      id: "email",
      icon: <FiMail size={20} />,
      label: "Email",
      value: "contact@hrskills.com",
      color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd",
      action: () => window.open("mailto:contact@hrskills.com"),
    },
    {
      id: "phone",
      icon: <FiPhone size={20} />,
      label: "WhatsApp / Téléphone",
      value: "+237 686 002 112",
      color: "#059669", bg: "#f0fdf4", border: "#bbf7d0",
      action: () => window.open("https://wa.me/237686002112", "_blank"),
    },
    {
      id: "address",
      icon: <FiMapPin size={20} />,
      label: "Adresse",
      value: "Tropicana, après Eneo — Yaoundé, Cameroun",
      color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd",
      action: null,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #9ca3af; }
        select { appearance: none; -webkit-appearance: none; }
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          margin-bottom: 5rem;
          align-items: flex-start;
        }
        @media (max-width: 900px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 768px) {
          .contact-info-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-info-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: "calc(70px + 5rem)", paddingBottom: "5rem",
          paddingLeft: "2rem", paddingRight: "2rem",
          position: "relative", overflow: "hidden",
          borderBottom: "1px solid #ede9fe",
          textAlign: "center",
          animation: "fadeUp 0.7s ease both",
        }}
      >
        {/* Image de fond */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/contact.jpx')",
            backgroundSize: "cover", backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        {/* Overlay dégradé clair */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, rgba(250,245,255,0.93) 0%, rgba(237,233,254,0.88) 55%, rgba(250,245,255,0.82) 100%)",
            zIndex: 1,
          }}
        />

        {/* Contenu */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(237,233,254,0.85)", borderRadius: "99px",
              padding: "5px 16px", marginBottom: "1.5rem",
              fontSize: "12px", fontWeight: "700", color: "#7c3aed",
              textTransform: "uppercase", letterSpacing: "0.08em",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(196,181,253,0.4)",
            }}
          >
            <FiMessageCircle size={13} /> Nous contacter
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800", color: "#0f172a",
              margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: "1.15",
            }}
          >
            On est là pour vous répondre
          </h1>
          <p style={{ color: "#475569", fontSize: "16px", maxWidth: "520px", margin: "0 auto", lineHeight: "1.8" }}>
            Vous avez une question, un projet de stage ou besoin d'informations ?
            Notre équipe à Yaoundé vous répond rapidement.
          </p>
        </div>
      </section>

      {/* ── CARDS INFO ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 2rem 0" }}>
        <div className="contact-info-grid">
          {infoCards.map((card) => (
            <div
              key={card.id}
              onClick={card.action || undefined}
              style={{
                padding: "1.5rem", borderRadius: "16px",
                border: `1px solid ${hovCard === card.id ? card.border : "#f0eefe"}`,
                background: hovCard === card.id ? card.bg : "#fff",
                cursor: card.action ? "pointer" : "default",
                display: "flex", alignItems: "flex-start", gap: "14px",
                transition: "all 0.22s ease",
                boxShadow: hovCard === card.id ? `0 8px 24px ${card.color}14` : "0 1px 4px rgba(0,0,0,0.04)",
                transform: hovCard === card.id && card.action ? "translateY(-3px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHovCard(card.id)}
              onMouseLeave={() => setHovCard(null)}
            >
              <div
                style={{
                  width: "46px", height: "46px", borderRadius: "12px",
                  background: card.bg, border: `1px solid ${card.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: card.color, flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                  {card.label}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", lineHeight: "1.5" }}>
                  {card.value}
                </div>
                {card.action && (
                  <div style={{ fontSize: "12px", color: card.color, fontWeight: "600", marginTop: "4px" }}>
                    Cliquer pour contacter →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── FORMULAIRE + MAP ── */}
        <div className="contact-form-grid">

          {/* FORMULAIRE */}
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif", fontSize: "22px", fontWeight: "800",
                color: "#0f172a", margin: "0 0 0.5rem", letterSpacing: "-0.01em",
              }}
            >
              Envoyez-nous un message
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "2rem", lineHeight: "1.7" }}>
              Remplissez ce formulaire et nous vous répondrons dans les 24 heures.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: "2.5rem", borderRadius: "16px",
                  background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                  border: "1px solid #bbf7d0", textAlign: "center",
                }}
              >
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 8px 20px rgba(16,185,129,0.3)" }}>
                  <FiCheckCircle size={26} style={{ color: "#fff" }} />
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "800", color: "#065f46", marginBottom: "8px" }}>
                  Message envoyé !
                </div>
                <p style={{ color: "#047857", fontSize: "14px", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{ padding: "10px 22px", borderRadius: "9px", background: "#10b981", color: "#fff", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

                {/* Nom */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Nom complet *</label>
                  <div style={{ position: "relative" }}>
                    <FiUser size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focused === "nom" ? "#7c3aed" : "#9ca3af", transition: "color 0.2s", pointerEvents: "none" }} />
                    <input
                      required placeholder="Mohamed Legrand"
                      value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      style={inp("nom")}
                      onFocus={() => setFocused("nom")} onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Email *</label>
                  <div style={{ position: "relative" }}>
                    <FiMail size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focused === "email" ? "#7c3aed" : "#9ca3af", transition: "color 0.2s", pointerEvents: "none" }} />
                    <input
                      required type="email" placeholder="mohamed@gmail.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inp("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Téléphone <span style={{ color: "#94a3b8", fontWeight: "400" }}>(optionnel)</span></label>
                  <div style={{ position: "relative" }}>
                    <FiPhone size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focused === "tel" ? "#7c3aed" : "#9ca3af", transition: "color 0.2s", pointerEvents: "none" }} />
                    <input
                      placeholder="+237 6XX XXX XXX"
                      value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      style={inp("tel")}
                      onFocus={() => setFocused("tel")} onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Sujet *</label>
                  <div style={{ position: "relative" }}>
                    <select
                      required value={form.sujet} onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                      style={{
                        ...inputBase,
                        border: focused === "sujet" ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
                        boxShadow: focused === "sujet" ? "0 0 0 3px rgba(124,58,237,0.08)" : "none",
                        paddingRight: "40px", cursor: "pointer",
                        color: form.sujet ? "#1e293b" : "#9ca3af",
                      }}
                      onFocus={() => setFocused("sujet")} onBlur={() => setFocused(null)}
                    >
                      <option value="">— Choisir un sujet —</option>
                      {SUJETS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <FiChevronDown size={15} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Message *</label>
                  <textarea
                    required rows={5} placeholder="Décrivez votre demande ici…"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{
                      ...inputBase, resize: "vertical", lineHeight: "1.7",
                      border: focused === "msg" ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
                      boxShadow: focused === "msg" ? "0 0 0 3px rgba(124,58,237,0.08)" : "none",
                    }}
                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Boutons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "0.25rem" }}>
                  <button
                    type="submit" disabled={sending}
                    style={{
                      padding: "14px", borderRadius: "11px",
                      background: sending ? "#a78bfa" : "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      color: "#fff", border: "none", fontSize: "15px", fontWeight: "700",
                      cursor: sending ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: sending ? "none" : "0 6px 20px rgba(124,58,237,0.3)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.38)"; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = sending ? "none" : "0 6px 20px rgba(124,58,237,0.3)"; }}
                  >
                    {sending ? (
                      <>
                        <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                        Envoi en cours…
                      </>
                    ) : (
                      <><FiSend size={15} /> Envoyer le message</>
                    )}
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ flex: 1, height: "1px", background: "#f0eefe" }} />
                    <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>ou</span>
                    <div style={{ flex: 1, height: "1px", background: "#f0eefe" }} />
                  </div>

                  <button
                    type="button"
                    onClick={() => window.open("https://wa.me/237686002112", "_blank")}
                    style={{
                      padding: "13px", borderRadius: "11px",
                      background: hovWa ? "linear-gradient(135deg, #16a34a, #15803d)" : "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#fff", border: "none", fontSize: "14px", fontWeight: "700",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: hovWa ? "0 8px 20px rgba(34,197,94,0.35)" : "0 4px 12px rgba(34,197,94,0.2)",
                      transform: hovWa ? "translateY(-2px)" : "translateY(0)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={() => setHovWa(true)}
                    onMouseLeave={() => setHovWa(false)}
                  >
                    <FiMessageCircle size={17} /> Discuter sur WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* MAP */}
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>
              Notre adresse à Yaoundé
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "1.5rem", lineHeight: "1.7" }}>
              Tropicana, après Eneo — Yaoundé, Cameroun
            </p>

            <div
              style={{
                borderRadius: "18px", overflow: "hidden",
                border: "1px solid #ede9fe",
                boxShadow: "0 8px 32px rgba(124,58,237,0.09)",
                marginBottom: "1.25rem",
              }}
            >
              <iframe
                title="Localisation HR Skills SARL"
                width="100%" height="380"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=3.8171,11.5260&z=16&output=embed"
              />
            </div>

            {/* Infos pratiques */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { emoji: "🕐", text: "Lundi – Vendredi : 8h00 – 17h00" },
                { emoji: "🕐", text: "Samedi : 9h00 – 13h00" },
                { emoji: "📍", text: "Tropicana, après Eneo, Yaoundé" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", background: "#faf9ff", border: "1px solid #f0eefe", fontSize: "13px", color: "#475569" }}>
                  <span style={{ fontSize: "16px" }}>{item.emoji}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
