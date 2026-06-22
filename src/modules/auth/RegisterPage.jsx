import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError, clearRegistered } from "./authSlice";
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone,
  FiBook, FiCalendar, FiCheckCircle, FiArrowRight, FiArrowLeft,
} from "react-icons/fi";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');`;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registered } = useSelector((s) => s.auth);

  const [showPwd, setShowPwd] = useState(false);
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [form, setForm] = useState({
    nom: "", prenom: "", email: "", password: "",
    etablissement: "", filiere: "", niveau: "",
    telephone: "", date_naissance: "", sexe: "M",
    date_debut: "", date_fin: "",
  });

  useEffect(() => {
    if (registered) {
      dispatch(clearRegistered());
      navigate("/login", { state: { fromRegister: true } });
    }
  }, [registered]);

  useEffect(() => { return () => dispatch(clearError()); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  const goToStep2 = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 14px 12px 42px",
    borderRadius: "10px",
    fontSize: "14px", outline: "none",
    background: "#fff", color: "#1e293b",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s, box-shadow 0.2s",
    border: focusedField === field ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(124,58,237,0.09)" : "none",
  });

  const selectStyle = {
    width: "100%", padding: "12px 14px",
    borderRadius: "10px", fontSize: "14px", outline: "none",
    background: "#fff", color: "#1e293b",
    boxSizing: "border-box", fontFamily: "'Inter', sans-serif",
    border: "1.5px solid #e5e7eb", cursor: "pointer",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: "13px", fontWeight: "600",
    color: "#374151", marginBottom: "6px",
  };

  const iconStyle = (field) => ({
    position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)",
    color: focusedField === field ? "#7c3aed" : "#9ca3af",
    pointerEvents: "none", transition: "color 0.2s",
  });

  const rightFeatures = [
    { icon: "📝", title: "Formulaire simplifié",   desc: "2 étapes courtes, guidées" },
    { icon: "📄", title: "Dépôt de documents",      desc: "CV, lettre, certificat, CNI" },
    { icon: "💳", title: "Paiement Mobile Money",   desc: "MTN Money & Orange Money" },
    { icon: "📊", title: "Suivi en temps réel",      desc: "Statut mis à jour à la seconde" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        input::placeholder, select::placeholder { color: #9ca3af; }
        select option { color: #1e293b; background: #fff; }
        .auth-right-panel { display: flex !important; }
        @media (max-width: 768px) { .auth-right-panel { display: none !important; } }
        @keyframes slideInStep {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .reg-btn-primary {
          flex: 2; padding: 13px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: #fff; border: none; font-size: 15px; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all 0.25s ease; display: flex; align-items: center;
          justify-content: center; gap: 8px;
        }
        .reg-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(124,58,237,0.36); }
        .reg-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
        .reg-btn-back {
          flex: 1; padding: 13px; border-radius: 10px;
          border: 1.5px solid #c4b5fd; background: #fff;
          color: #7c3aed; font-size: 14px; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all 0.25s ease; display: flex; align-items: center;
          justify-content: center; gap: 6px;
        }
        .reg-btn-back:hover { background: #f5f3ff; }
      `}</style>

      {/* ── PANNEAU GAUCHE — Formulaire ── */}
      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          padding: "2rem", overflowY: "auto",
          background: "#fff",
        }}
      >
        <div style={{ width: "100%", maxWidth: "480px", padding: "1rem 0" }}>

          {/* LOGO */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "2.5rem" }}>
            <img
              src="/images/logo.jpeg" alt="HR Skills Logo"
              style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "800", fontSize: "16px", color: "#4c1d95", lineHeight: "1.1" }}>
                HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
              </div>
              <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: "500" }}>
                Yaoundé · Cameroun
              </div>
            </div>
          </Link>

          {/* ENTÊTE */}
          <div style={{ marginBottom: "2rem" }}>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "24px", fontWeight: "800",
                color: "#0f172a", marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              Créer mon compte
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Remplissez le formulaire pour déposer votre dossier de stage en ligne
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "10px" }}>
              {[
                { idx: 1, label: "Informations personnelles" },
                { idx: 2, label: "Informations académiques" },
              ].map((s, i) => (
                <div key={s.idx} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div
                      style={{
                        width: "30px", height: "30px", borderRadius: "50%",
                        background: step > s.idx ? "#7c3aed" : step === s.idx ? "#7c3aed" : "#e5e7eb",
                        color: step >= s.idx ? "#fff" : "#94a3b8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: "700", transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      {step > s.idx ? <FiCheckCircle size={14} /> : s.idx}
                    </div>
                    <span
                      style={{
                        fontSize: "10px", fontWeight: "600", whiteSpace: "nowrap",
                        color: step >= s.idx ? "#7c3aed" : "#94a3b8",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 1 && (
                    <div
                      style={{
                        flex: 1, height: "2px", marginBottom: "20px",
                        background: step > 1 ? "#7c3aed" : "#e5e7eb",
                        transition: "background 0.3s ease",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ERREUR */}
          {error && (
            <div
              style={{
                padding: "12px 16px", borderRadius: "10px",
                background: "#fef2f2", border: "1px solid #fecaca",
                color: "#dc2626", fontSize: "13px",
                marginBottom: "1.5rem",
                display: "flex", alignItems: "flex-start", gap: "8px",
              }}
            >
              <span style={{ flexShrink: 0 }}>⚠️</span> {error}
            </div>
          )}

          {/* ── ÉTAPE 1 ── */}
          {step === 1 && (
            <form
              onSubmit={goToStep2}
              style={{ display: "flex", flexDirection: "column", gap: "1.1rem", animation: "slideInStep 0.35s ease" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { key: "nom", placeholder: "Liebert", label: "Nom *" },
                  { key: "prenom", placeholder: "Johann", label: "Prénom *" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <div style={{ position: "relative" }}>
                      <FiUser size={15} style={iconStyle(f.key)} />
                      <input
                        required placeholder={f.placeholder} value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        style={inputStyle(f.key)}
                        onFocus={() => setFocusedField(f.key)}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label style={labelStyle}>Adresse email *</label>
                <div style={{ position: "relative" }}>
                  <FiMail size={15} style={iconStyle("email")} />
                  <input
                    type="email" required placeholder="exemple@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Mot de passe *</label>
                <div style={{ position: "relative" }}>
                  <FiLock size={15} style={iconStyle("password")} />
                  <input
                    type={showPwd ? "text" : "password"}
                    required placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ ...inputStyle("password"), paddingRight: "44px" }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button" onClick={() => setShowPwd(!showPwd)}
                    style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center" }}
                  >
                    {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
                <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "5px" }}>Minimum 6 caractères</p>
              </div>

              <div>
                <label style={labelStyle}>Téléphone *</label>
                <div style={{ position: "relative" }}>
                  <FiPhone size={15} style={iconStyle("telephone")} />
                  <input
                    required placeholder="677 000 000"
                    value={form.telephone}
                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                    style={inputStyle("telephone")}
                    onFocus={() => setFocusedField("telephone")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Date de naissance *</label>
                  <div style={{ position: "relative" }}>
                    <FiCalendar size={15} style={{ ...iconStyle("date_naissance"), color: "#9ca3af" }} />
                    <input
                      type="date" required value={form.date_naissance}
                      onChange={(e) => setForm({ ...form, date_naissance: e.target.value })}
                      style={inputStyle("date_naissance")}
                      onFocus={() => setFocusedField("date_naissance")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Sexe *</label>
                  <select
                    value={form.sexe}
                    onChange={(e) => setForm({ ...form, sexe: e.target.value })}
                    style={selectStyle}
                  >
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="reg-btn-primary" style={{ marginTop: "0.5rem", flex: "none" }}>
                Continuer <FiArrowRight size={15} />
              </button>
            </form>
          )}

          {/* ── ÉTAPE 2 ── */}
          {step === 2 && (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.1rem", animation: "slideInStep 0.35s ease" }}
            >
              <div>
                <label style={labelStyle}>Établissement *</label>
                <div style={{ position: "relative" }}>
                  <FiBook size={15} style={iconStyle("etablissement")} />
                  <input
                    required placeholder="IAI Cameroun"
                    value={form.etablissement}
                    onChange={(e) => setForm({ ...form, etablissement: e.target.value })}
                    style={inputStyle("etablissement")}
                    onFocus={() => setFocusedField("etablissement")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Filière *</label>
                  <div style={{ position: "relative" }}>
                    <FiBook size={15} style={iconStyle("filiere")} />
                    <input
                      required placeholder="Génie Logiciel"
                      value={form.filiere}
                      onChange={(e) => setForm({ ...form, filiere: e.target.value })}
                      style={inputStyle("filiere")}
                      onFocus={() => setFocusedField("filiere")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Niveau *</label>
                  <select
                    required value={form.niveau}
                    onChange={(e) => setForm({ ...form, niveau: e.target.value })}
                    style={selectStyle}
                  >
                    <option value="">Choisir…</option>
                    <option value="BTS">BTS</option>
                    <option value="Licence 1">Licence 1</option>
                    <option value="Licence 2">Licence 2</option>
                    <option value="Licence 3">Licence 3</option>
                    <option value="Master 1">Master 1</option>
                    <option value="Master 2">Master 2</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Début du stage</label>
                  <input
                    type="date" value={form.date_debut}
                    onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
                    style={{ ...selectStyle }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fin du stage</label>
                  <input
                    type="date" value={form.date_fin}
                    onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
                    style={{ ...selectStyle }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "12px 14px", borderRadius: "10px",
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#065f46", fontSize: "12px", fontWeight: "500" }}>
                  <FiCheckCircle size={14} style={{ flexShrink: 0 }} />
                  En cliquant sur "Créer mon compte", vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setStep(1)} className="reg-btn-back">
                  <FiArrowLeft size={14} /> Retour
                </button>
                <button type="submit" disabled={loading} className="reg-btn-primary">
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: "15px", height: "15px", borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff",
                          animation: "spin 0.7s linear infinite", display: "inline-block",
                        }}
                      />
                      Inscription…
                    </>
                  ) : (
                    <>Créer mon compte <FiArrowRight size={15} /></>
                  )}
                </button>
              </div>
            </form>
          )}

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "14px", color: "#64748b" }}>
            Déjà inscrit ?{" "}
            <Link to="/login" style={{ color: "#7c3aed", fontWeight: "700", textDecoration: "none" }}>
              Se connecter
            </Link>
          </p>
          <p style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <Link to="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px" }}>
              ← Retour à l'accueil
            </Link>
          </p>
        </div>
      </div>

      {/* ── PANNEAU DROIT — Visuel ── */}
      <div
        className="auth-right-panel"
        style={{
          flex: 1, flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          position: "relative", overflow: "hidden", padding: "3rem",
        }}
      >
        {/* Image bg */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/auth/register.jpg')",
            backgroundSize: "cover", backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(145deg, rgba(30,27,75,0.92) 0%, rgba(79,70,229,0.85) 100%)",
          }}
        />
        <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(167,139,250,0.1)", top: "-80px", right: "-60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: "-40px", left: "-30px", pointerEvents: "none" }} />

        {/* Contenu */}
        <div style={{ maxWidth: "380px", textAlign: "left", position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.2)",
              padding: "5px 12px", borderRadius: "99px",
              fontSize: "12px", fontWeight: "600", color: "#c7d2fe",
              marginBottom: "2rem", letterSpacing: "0.05em", textTransform: "uppercase",
            }}
          >
            🚀 Inscription
          </div>

          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "28px", fontWeight: "800",
              color: "#fff", marginBottom: "1rem",
              letterSpacing: "-0.02em", lineHeight: "1.2",
            }}
          >
            Prêt à commencer votre stage ?
          </h2>
          <p style={{ color: "#c7d2fe", lineHeight: "1.8", fontSize: "15px", marginBottom: "2.5rem" }}>
            Créez votre compte en 2 étapes rapides. Tout le processus de dossier se gère depuis votre espace personnel sécurisé.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {rightFeatures.map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "13px 16px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontSize: "22px", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "#fff", marginBottom: "2px" }}>{f.title}</div>
                  <div style={{ fontSize: "12px", color: "#a5b4fc" }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1.75rem", padding: "12px 16px", borderRadius: "10px",
              background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "13px", color: "#c7d2fe",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            🔒 Vos données sont protégées et confidentielles
          </div>
        </div>
      </div>
    </div>
  );
}
