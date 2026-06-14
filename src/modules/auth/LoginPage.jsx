import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "./authSlice";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, role, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token && role) {
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    }
  }, [token, role]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px 11px 40px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    color: "#1e293b",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Inter', sans-serif"
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        input::placeholder { color: #9ca3af; }
      `}</style>

      {/* PANNEAU GAUCHE */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "2rem",
        background: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)"
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem" }}>
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
            <span style={{ fontWeight: "700", fontSize: "18px", color: "#4c1d95" }}>
              HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "28px", fontWeight: "700",
            color: "#1e293b", marginBottom: "0.5rem"
          }}>
            Bon retour 
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "0.75rem" }}>
            Connectez-vous pour accéder à votre espace
          </p>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.5rem", padding: "1rem", borderRadius: "12px", background: "#eef2ff", border: "1px solid #dbeafe" }}>
            <span style={{ fontSize: "18px" }}>💡</span>
            <p style={{ margin: 0, color: "#475569", fontSize: "13px", lineHeight: "1.6" }}>
              Si vous êtes déjà inscrit, utilisez votre adresse email et mot de passe. Sinon, créez un compte via le lien ci-dessous.
            </p>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: "8px",
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#dc2626", fontSize: "14px", marginBottom: "1.5rem"
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* EMAIL */}
            <div>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>
                Adresse email
              </label>
              <div style={{ position: "relative" }}>
                <FiMail size={16} style={{
                  position: "absolute", left: "14px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "#9ca3af", pointerEvents: "none"
                }} />
                <input
                  type="email"
                  required
                  placeholder="exemple@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#7c3aed"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            </div>

            {/* MOT DE PASSE */}
            <div>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <FiLock size={16} style={{
                  position: "absolute", left: "14px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "#9ca3af", pointerEvents: "none"
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ ...inputStyle, paddingRight: "44px" }}
                  onFocus={e => e.target.style.borderColor = "#7c3aed"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "14px",
                    top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "#9ca3af",
                    display: "flex", alignItems: "center"
                  }}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "13px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", border: "none",
                fontSize: "15px", fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "opacity 0.2s",
                marginTop: "0.5rem",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "14px", color: "#64748b" }}>
            Pas encore de compte ?{" "}
            <Link to="/register" style={{ color: "#7c3aed", fontWeight: "600", textDecoration: "none" }}>
              S'inscrire
            </Link>
          </p>

        </div>
      </div>

      {/* PANNEAU DROIT AVEC IMAGE DE FOND */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        position: "relative",
        padding: "3rem", color: "#fff"
      }}>
        {/* Image de fond */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/images/auth/login.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }} />
        
        {/* Overlay sombre pour la lisibilité */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(124,58,237,0.85), rgba(124,58,237,0.75))"
        }} />

        {/* Contenu */}
        <div style={{ 
          maxWidth: "380px", 
          textAlign: "center",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem", fontSize: "36px",
            backdropFilter: "blur(5px)"
          }}>📋</div>
          
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "24px", fontWeight: "700", marginBottom: "1rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
          }}>
            Gérez votre dossier de stage
          </h2>
          
          <p style={{ 
            opacity: 0.95, 
            lineHeight: "1.7", 
            fontSize: "15px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
          }}>
            Soumettez vos documents, effectuez votre paiement et suivez votre dossier en temps réel depuis votre espace personnel.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "2.5rem" }}>
            {[
              "✅ Upload de documents sécurisé",
              "💳 Paiement Mobile Money",
              "📊 Suivi en temps réel",
            ].map((item) => (
              <div key={item} style={{
                padding: "12px 20px", borderRadius: "10px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                fontSize: "14px", fontWeight: "500", textAlign: "left",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>{item}</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}