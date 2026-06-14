import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "./authSlice";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiBook, FiCalendar } from "react-icons/fi";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, role } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nom: "", prenom: "", email: "", password: "",
    etablissement: "", filiere: "", niveau: "",
    telephone: "", date_naissance: "", sexe: "M",
    date_debut: "", date_fin: ""
  });

  useEffect(() => {
    if (token && role) navigate("/dashboard");
  }, [token, role]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
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

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "6px"
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)",
      fontFamily: "'Inter', sans-serif"
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        input::placeholder { color: #9ca3af; }
        select option { color: #1e293b; background: #fff; }
      `}</style>

      {/* PANNEAU GAUCHE */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "2rem", overflowY: "auto"
      }}>
        <div style={{ width: "100%", maxWidth: "480px", padding: "1rem 0" }}>

          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
            <span style={{ fontWeight: "700", fontSize: "18px", color: "#4c1d95" }}>
              HR Skills <span style={{ color: "#7c3aed" }}>Stage</span>
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "26px", fontWeight: "700",
            color: "#1e293b", marginBottom: "0.5rem"
          }}>
            Créer mon compte
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "1.5rem" }}>
            Remplissez le formulaire pour déposer votre dossier de stage
          </p>

          {/* PROGRESS BAR */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "0.75rem" }}>
            {[1, 2].map((s) => (
              <div key={s} style={{
                flex: 1, height: "4px", borderRadius: "99px",
                background: step >= s ? "#7c3aed" : "#e5e7eb",
                transition: "background 0.3s"
              }} />
            ))}
          </div>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "1.5rem" }}>
            Étape {step} sur 2 — {step === 1 ? "Informations personnelles" : "Informations académiques"}
          </p>

          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: "8px",
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#dc2626", fontSize: "14px", marginBottom: "1.5rem"
            }}>{error}</div>
          )}

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit}>

            {/* ETAPE 1 */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <div style={{ position: "relative" }}>
                      <FiUser size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                      <input
                        required
                        placeholder="Liebert"
                        value={form.nom}
                        onChange={e => setForm({ ...form, nom: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#7c3aed"}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Prénom</label>
                    <div style={{ position: "relative" }}>
                      <FiUser size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                      <input
                        required
                        placeholder="Johann"
                        value={form.prenom}
                        onChange={e => setForm({ ...form, prenom: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#7c3aed"}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Adresse email</label>
                  <div style={{ position: "relative" }}>
                    <FiMail size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
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

                <div>
                  <label style={labelStyle}>Mot de passe</label>
                  <div style={{ position: "relative" }}>
                    <FiLock size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
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
                        position: "absolute", right: "12px",
                        top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none",
                        cursor: "pointer", color: "#9ca3af",
                        display: "flex", alignItems: "center"
                      }}
                    >
                      {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <div style={{ position: "relative" }}>
                    <FiPhone size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                    <input
                      required
                      placeholder="677000000"
                      value={form.telephone}
                      onChange={e => setForm({ ...form, telephone: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#7c3aed"}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Date de naissance</label>
                    <div style={{ position: "relative" }}>
                      <FiCalendar size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                      <input
                        type="date"
                        required
                        value={form.date_naissance}
                        onChange={e => setForm({ ...form, date_naissance: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#7c3aed"}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Sexe</label>
                    <select
                      value={form.sexe}
                      onChange={e => setForm({ ...form, sexe: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                    >
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                    </select>
                  </div>
                </div>

                <button type="submit" style={{
                  padding: "13px", borderRadius: "8px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff", border: "none",
                  fontSize: "15px", fontWeight: "600",
                  cursor: "pointer", marginTop: "0.5rem",
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Continuer →
                </button>
              </div>
            )}

            {/* ETAPE 2 */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

                <div>
                  <label style={labelStyle}>Établissement</label>
                  <div style={{ position: "relative" }}>
                    <FiBook size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                    <input
                      required
                      placeholder="IAI Cameroun"
                      value={form.etablissement}
                      onChange={e => setForm({ ...form, etablissement: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#7c3aed"}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Filière</label>
                    <div style={{ position: "relative" }}>
                      <FiBook size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                      <input
                        required
                        placeholder="Génie Logiciel"
                        value={form.filiere}
                        onChange={e => setForm({ ...form, filiere: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#7c3aed"}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Niveau</label>
                    <select
                      value={form.niveau}
                      onChange={e => setForm({ ...form, niveau: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                    >
                      <option value="">Choisir</option>
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
                    <label style={labelStyle}>Date début stage</label>
                    <input
                      type="date"
                      value={form.date_debut}
                      onChange={e => setForm({ ...form, date_debut: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                      onFocus={e => e.target.style.borderColor = "#7c3aed"}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Date fin stage</label>
                    <input
                      type="date"
                      value={form.date_fin}
                      onChange={e => setForm({ ...form, date_fin: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                      onFocus={e => e.target.style.borderColor = "#7c3aed"}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1, padding: "13px", borderRadius: "8px",
                      border: "1px solid #c4b5fd", background: "#fff",
                      color: "#7c3aed", fontSize: "15px", fontWeight: "600",
                      cursor: "pointer", fontFamily: "'Inter', sans-serif"
                    }}
                  >← Retour</button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      flex: 2, padding: "13px", borderRadius: "8px",
                      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      color: "#fff", border: "none",
                      fontSize: "15px", fontWeight: "600",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {loading ? "Inscription en cours..." : "Créer mon compte"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "14px", color: "#64748b" }}>
            Déjà un compte ?{" "}
            <Link to="/login" style={{ color: "#7c3aed", fontWeight: "600", textDecoration: "none" }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* PANNEAU DROIT */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
        padding: "3rem", color: "#fff"
      }}>
        <div style={{ maxWidth: "380px", textAlign: "center" }}>
          <div style={{ fontSize: "60px", marginBottom: "1.5rem" }}>🎓</div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "24px", fontWeight: "700", marginBottom: "1rem"
          }}>
            Bienvenue sur HR Skills Stage
          </h2>
          <p style={{ opacity: 0.85, lineHeight: "1.7", fontSize: "15px", marginBottom: "2rem" }}>
            Créez votre compte en 2 étapes et déposez votre dossier de stage en ligne en quelques minutes.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { step: "01", label: "Informations personnelles" },
              { step: "02", label: "Informations académiques" },
            ].map((s) => (
              <div key={s.step} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 20px", borderRadius: "10px",
                background: step >= parseInt(s.step) ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                transition: "background 0.3s"
              }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: step >= parseInt(s.step) ? "#fff" : "rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "700",
                  color: step >= parseInt(s.step) ? "#7c3aed" : "#fff"
                }}>
                  {step > parseInt(s.step) ? "✓" : s.step}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}