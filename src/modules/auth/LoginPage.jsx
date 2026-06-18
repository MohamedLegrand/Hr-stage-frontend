import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "./authSlice";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, role, token } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (token && role) navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  }, [token, role]);

  useEffect(() => { return () => dispatch(clearError()); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const inputBase = {
    width: "100%",
    padding: "12px 14px 12px 44px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    color: "#1e293b",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const inputStyle = (field) => ({
    ...inputBase,
    border: focusedField === field
      ? "1.5px solid #7c3aed"
      : "1.5px solid #e5e7eb",
    boxShadow: focusedField === field
      ? "0 0 0 3px rgba(124,58,237,0.09)"
      : "none",
  });

  const benefits = [
    "Dépôt de documents PDF sécurisé",
    "Paiement Mobile Money instantané",
    "Suivi de dossier en temps réel",
    "Attestation officielle de stage",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        input::placeholder { color: #9ca3af; }
        .auth-right-panel { display: flex !important; }
        @media (max-width: 768px) { .auth-right-panel { display: none !important; } }
        @keyframes authFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .login-btn {
          width: 100%; padding: 13px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: #fff; border: none; font-size: 15px; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all 0.25s ease; display: flex; align-items: center;
          justify-content: center; gap: 8px;
        }
        .login-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(124,58,237,0.36); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }
      `}</style>

      {/* ── PANNEAU GAUCHE — Formulaire ── */}
      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          padding: "2.5rem 2rem",
          background: "#fff",
          animation: "authFadeUp 0.6s ease forwards",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* LOGO */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "3rem" }}>
            <img
              src="/images/logo.jpeg"
              alt="HR Skills Logo"
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
                fontSize: "26px", fontWeight: "800",
                color: "#0f172a", marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              Bon retour 
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Connectez-vous pour accéder à votre espace stagiaire
            </p>
          </div>

          {/* MESSAGE D'ERREUR */}
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
              <span style={{ flexShrink: 0, marginTop: "1px" }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* FORMULAIRE */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>
                Adresse email
              </label>
              <div style={{ position: "relative" }}>
                <FiMail
                  size={16}
                  style={{
                    position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                    color: focusedField === "email" ? "#7c3aed" : "#9ca3af",
                    pointerEvents: "none", transition: "color 0.2s",
                  }}
                />
                <input
                  type="email"
                  required
                  placeholder="exemple@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <FiLock
                  size={16}
                  style={{
                    position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                    color: focusedField === "password" ? "#7c3aed" : "#9ca3af",
                    pointerEvents: "none", transition: "color 0.2s",
                  }}
                />
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={{ ...inputStyle("password"), paddingRight: "44px" }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#9ca3af", display: "flex", alignItems: "center", padding: "2px",
                  }}
                >
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Bouton */}
            <button type="submit" disabled={loading} className="login-btn" style={{ marginTop: "0.25rem" }}>
              {loading ? (
                <>
                  <span
                    style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff",
                      animation: "spin 0.7s linear infinite", display: "inline-block",
                    }}
                  />
                  Connexion en cours…
                </>
              ) : (
                <>Se connecter <FiArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* LIEN INSCRIPTION */}
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "14px", color: "#64748b" }}>
            Pas encore de compte ?{" "}
            <Link to="/register" style={{ color: "#7c3aed", fontWeight: "700", textDecoration: "none" }}>
              S'inscrire gratuitement
            </Link>
          </p>

          {/* RETOUR ACCUEIL */}
          <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "13px" }}>
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
          position: "relative", overflow: "hidden",
          padding: "3rem",
        }}
      >
        {/* Image de fond */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/auth/login.jpg')",
            backgroundSize: "cover", backgroundPosition: "center",
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(145deg, rgba(76,29,149,0.9) 0%, rgba(124,58,237,0.82) 100%)",
          }}
        />
        {/* Décos */}
        <div
          style={{
            position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
            background: "rgba(167,139,250,0.12)", top: "-100px", right: "-80px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", width: "240px", height: "240px", borderRadius: "50%",
            background: "rgba(255,255,255,0.06)", bottom: "-60px", left: "-40px",
            pointerEvents: "none",
          }}
        />

        {/* Contenu */}
        <div style={{ maxWidth: "380px", textAlign: "left", position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
              padding: "5px 12px", borderRadius: "99px",
              fontSize: "12px", fontWeight: "600", color: "#e9d5ff",
              marginBottom: "2rem", letterSpacing: "0.05em", textTransform: "uppercase",
            }}
          >
            🎓 Espace stagiaire
          </div>

          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "28px", fontWeight: "800",
              color: "#fff", marginBottom: "1rem",
              letterSpacing: "-0.02em", lineHeight: "1.2",
            }}
          >
            Gérez votre dossier en toute simplicité
          </h2>
          <p style={{ color: "#ddd6fe", lineHeight: "1.8", fontSize: "15px", marginBottom: "2.5rem" }}>
            Soumettez vos documents, effectuez vos paiements et suivez la validation de votre dossier depuis votre espace personnel.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {benefits.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "13px 16px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <FiCheckCircle size={16} style={{ color: "#a78bfa", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "#f3e8ff", fontWeight: "500" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
