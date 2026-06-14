import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "./authSlice";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiBook, FiCalendar, FiCheckCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";

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
    padding: "12px 14px 12px 40px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    color: "#1e293b",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', sans-serif"
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px"
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Inter', sans-serif"
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
        input::placeholder { color: #9ca3af; }
        select option { color: #1e293b; background: #fff; }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .fade-in {
          animation: fadeInUp 0.5s ease-out;
        }
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      {/* PANNEAU GAUCHE - FORMULAIRE */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "2rem", overflowY: "auto",
        background: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)"
      }}>
        <div style={{ width: "100%", maxWidth: "520px", padding: "1rem 0" }}>

          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 4px 10px rgba(124,58,237,0.2)" }}
            />
            <span style={{ fontWeight: "800", fontSize: "20px", color: "#4c1d95" }}>
              HR Skills <span style={{ color: "#7c3aed" }}>SARL</span>
            </span>
          </div>

          <div className="fade-in">
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "28px", fontWeight: "800",
              color: "#1e293b", marginBottom: "0.5rem"
            }}>
              Créer mon compte
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "1rem" }}>
              Remplissez le formulaire pour déposer votre dossier de stage en ligne
            </p>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", padding: "1rem", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e5e7eb", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "18px" }}>💡</span>
              <p style={{ margin: 0, color: "#475569", fontSize: "13px", lineHeight: "1.6" }}>
                Suivez les étapes du formulaire pour compléter votre profil et vos informations académiques sans vous perdre.
              </p>
            </div>
          </div>

          {/* PROGRESS BAR AVEC DESIGN AMÉLIORÉ */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              {["Informations personnelles", "Informations académiques"].map((label, idx) => (
                <div key={idx} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: step >= idx + 1 ? "#7c3aed" : "#e5e7eb",
                    color: step >= idx + 1 ? "#fff" : "#94a3b8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 6px", fontSize: "14px", fontWeight: "700",
                    transition: "all 0.3s ease"
                  }}>
                    {step > idx + 1 ? <FiCheckCircle size={16} /> : idx + 1}
                  </div>
                  <span style={{
                    fontSize: "11px", color: step >= idx + 1 ? "#7c3aed" : "#94a3b8",
                    fontWeight: step >= idx + 1 ? "600" : "400",
                    display: "block"
                  }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
              <div style={{
                flex: 1, height: "4px", borderRadius: "99px",
                background: step >= 1 ? "#7c3aed" : "#e5e7eb",
                transition: "background 0.3s"
              }} />
              <div style={{
                flex: 1, height: "4px", borderRadius: "99px",
                background: step >= 2 ? "#7c3aed" : "#e5e7eb",
                transition: "background 0.3s"
              }} />
            </div>
          </div>

          {error && (
            <div style={{
              padding: "14px 16px", borderRadius: "10px",
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#dc2626", fontSize: "14px", marginBottom: "1.5rem",
              display: "flex", alignItems: "center", gap: "8px"
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); window.scrollTo(0, 0); } : handleSubmit}>

            {/* ETAPE 1 */}
            {step === 1 && (
              <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Nom *</label>
                    <div style={{ position: "relative" }}>
                      <FiUser size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                    <label style={labelStyle}>Prénom *</label>
                    <div style={{ position: "relative" }}>
                      <FiUser size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                  <label style={labelStyle}>Adresse email *</label>
                  <div style={{ position: "relative" }}>
                    <FiMail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                  <label style={labelStyle}>Mot de passe *</label>
                  <div style={{ position: "relative" }}>
                    <FiLock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                        cursor: "pointer", color: "#9ca3af"
                      }}
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                    Minimum 6 caractères
                  </p>
                </div>

                <div>
                  <label style={labelStyle}>Téléphone *</label>
                  <div style={{ position: "relative" }}>
                    <FiPhone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                    <label style={labelStyle}>Date de naissance *</label>
                    <div style={{ position: "relative" }}>
                      <FiCalendar size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                      <input
                        type="date"
                        required
                        value={form.date_naissance}
                        onChange={e => setForm({ ...form, date_naissance: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Sexe *</label>
                    <select
                      value={form.sexe}
                      onChange={e => setForm({ ...form, sexe: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                    >
                      <option value="M">👨 Masculin</option>
                      <option value="F">👩 Féminin</option>
                    </select>
                  </div>
                </div>

                <button type="submit" style={{
                  padding: "14px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff", border: "none",
                  fontSize: "15px", fontWeight: "600",
                  cursor: "pointer", marginTop: "0.5rem",
                  fontFamily: "'Inter', sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", transition: "transform 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Continuer <FiArrowRight size={16} />
                </button>
              </div>
            )}

            {/* ETAPE 2 */}
            {step === 2 && (
              <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                <div>
                  <label style={labelStyle}>Établissement *</label>
                  <div style={{ position: "relative" }}>
                    <FiBook size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                    <label style={labelStyle}>Filière *</label>
                    <div style={{ position: "relative" }}>
                      <FiBook size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
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
                    <label style={labelStyle}>Niveau *</label>
                    <select
                      value={form.niveau}
                      onChange={e => setForm({ ...form, niveau: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                    >
                      <option value="">Choisir votre niveau</option>
                      <option value="BTS">📘 BTS</option>
                      <option value="Licence 1">📗 Licence 1</option>
                      <option value="Licence 2">📗 Licence 2</option>
                      <option value="Licence 3">📗 Licence 3</option>
                      <option value="Master 1">📕 Master 1</option>
                      <option value="Master 2">📕 Master 2</option>
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
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Date fin stage</label>
                    <input
                      type="date"
                      value={form.date_fin}
                      onChange={e => setForm({ ...form, date_fin: e.target.value })}
                      style={{ ...inputStyle, paddingLeft: "14px" }}
                    />
                  </div>
                </div>

                <div style={{ 
                  background: "#f0fdf4", 
                  padding: "12px", 
                  borderRadius: "10px",
                  border: "1px solid #bbf7d0",
                  marginBottom: "8px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#166534", fontSize: "12px" }}>
                    <FiCheckCircle size={14} />
                    <span>En cliquant sur "Créer mon compte", vous acceptez nos conditions d'utilisation</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1, padding: "14px", borderRadius: "10px",
                      border: "2px solid #c4b5fd", background: "#fff",
                      color: "#7c3aed", fontSize: "15px", fontWeight: "600",
                      cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: "6px", transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >
                    <FiArrowLeft size={16} /> Retour
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      flex: 2, padding: "14px", borderRadius: "10px",
                      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      color: "#fff", border: "none",
                      fontSize: "15px", fontWeight: "700",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      fontFamily: "'Inter', sans-serif",
                      transition: "transform 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: "8px"
                    }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={e => !loading && (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    {loading ? "Inscription en cours..." : "Créer mon compte"}
                    {!loading && <FiArrowRight size={16} />}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "14px", color: "#64748b" }}>
            Déjà un compte ?{" "}
            <Link to="/login" style={{ color: "#7c3aed", fontWeight: "700", textDecoration: "none" }}>
              Se connecter
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
          backgroundImage: "url('/images/auth/register.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }} />
        
        {/* Overlay violet avec dégradé */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(79,70,229,0.85), rgba(124,58,237,0.8))"
        }} />

        {/* Contenu avec animations */}
        <div style={{ 
          maxWidth: "400px", 
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          animation: "fadeInUp 0.6s ease-out"
        }}>
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem", fontSize: "48px",
            border: "2px solid rgba(255,255,255,0.3)",
            animation: "slideIn 0.5s ease-out"
          }}>🎓</div>
          
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "28px", fontWeight: "800", marginBottom: "1rem",
            textShadow: "2px 2px 8px rgba(0,0,0,0.2)"
          }}>
            Prêt à commencer ?
          </h2>
          
          <p style={{ 
            opacity: 0.95, 
            lineHeight: "1.7", 
            fontSize: "15px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            marginBottom: "2rem"
          }}>
            Créez votre compte en 2 étapes rapides et déposez votre dossier de stage en ligne.
            Gérez tout votre processus d'inscription depuis un seul endroit.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "2rem" }}>
            {[
              { icon: "📝", title: "Formulaire simplifié", desc: "Remplissez vos informations en quelques minutes" },
              { icon: "📄", title: "Dépôt de documents", desc: "Upload de CV, lettre de motivation et pièces" },
              { icon: "💳", title: "Paiement sécurisé", desc: "Mobile Money et Orange Money" },
              { icon: "📊", title: "Suivi en temps réel", desc: "Suivez l'état de votre dossier" },
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: "15px",
                padding: "14px 20px", borderRadius: "12px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                textAlign: "left",
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateX(5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
              >
                <div style={{ fontSize: "28px" }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: "16px", borderRadius: "12px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <div style={{ fontSize: "13px", opacity: 0.9 }}>
              🔒 Vos données sont sécurisées et confidentielles
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}