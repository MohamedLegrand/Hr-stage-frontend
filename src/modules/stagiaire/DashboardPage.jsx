import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { fetchProfil } from "./stagiaireSlice";
import { fetchDocuments } from "../documents/documentsSlice";
import { fetchStatutPaiement, initierPaiement } from "../paiement/paiementSlice";
import { fetchStatutPreinscription, initierPreinscription } from "../preinscription/preinscriptionSlice";
import { FiFileText, FiCreditCard, FiCheckCircle, FiLogOut, FiUser, FiClock, FiUpload, FiX, FiUserCheck } from "react-icons/fi";
import documentsService from "../documents/documentsService";

const DOC_TYPES = [
  { value: "lettre_demande_stage", label: "Lettre de demande de stage" },
  { value: "cv", label: "Curriculum Vitae" },
  { value: "certificat_scolarite", label: "Certificat de scolarité" },
  { value: "cni_ou_recepice", label: "CNI ou récépissé" },
];

const OPERATEURS = ["MTN", "ORANGE", "YOOME", "BLUE"];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profil, loading: profilLoading } = useSelector((state) => state.stagiaire);
  const { liste: documents } = useSelector((state) => state.documents);
  const { paiement, loading: paiementLoading } = useSelector((state) => state.paiement);
  const { preinscription, loading: preinscriptionLoading, error: preinscriptionError } = useSelector((state) => state.preinscription);

  const [showUpload, setShowUpload] = useState(false);
  const [showPaiement, setShowPaiement] = useState(false);
  const [showPreinscription, setShowPreinscription] = useState(false);
  const [uploadFiles, setUploadFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [paiementForm, setPaiementForm] = useState({ telephone: "", operateur: "MTN" });
  const [preinscriptionForm, setPreinscriptionForm] = useState({ telephone: "", operateur: "MTN" });
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    dispatch(fetchProfil());
    dispatch(fetchDocuments());
    dispatch(fetchStatutPaiement());
    dispatch(fetchStatutPreinscription());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const filesToUpload = DOC_TYPES
      .filter((doc) => uploadFiles[doc.value])
      .map((doc) => ({ type: doc.value, file: uploadFiles[doc.value] }));

    if (filesToUpload.length === 0) {
      setUploadError("Sélectionnez au moins un document à uploader.");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      await documentsService.uploadDocuments(filesToUpload);
      dispatch(fetchDocuments());
      setShowUpload(false);
      setUploadFiles({});
    } catch (err) {
      setUploadError(err.response?.data?.detail || err.message || "Erreur upload");
    } finally {
      setUploading(false);
    }
  };

  const handlePaiement = async (e) => {
    e.preventDefault();
    const result = await dispatch(initierPaiement(paiementForm));
    if (result.payload?.payment_url) {
      window.open(result.payload.payment_url, "_blank");
      setShowPaiement(false);
    }
  };

  const handlePreinscription = async (e) => {
    e.preventDefault();
    const result = await dispatch(initierPreinscription(preinscriptionForm));
    if (result.payload?.reference_interne) {
      setShowPreinscription(false);
      dispatch(fetchStatutPreinscription());
    }
  };

  const getDocStatut = (type) => {
    const doc = documents.find(d => d.type === type);
    if (!doc) return { text: "Non soumis", color: "#94a3b8", bg: "#f8fafc" };
    if (doc.statut === "valide") return { text: "Validé", color: "#10b981", bg: "#f0fdf4" };
    if (doc.statut === "rejete") return { text: "Rejeté", color: "#ef4444", bg: "#fef2f2" };
    return { text: "En attente", color: "#f59e0b", bg: "#fffbeb" };
  };

  const docsValides = documents.filter(d => d.statut === "valide").length;

  const getPreinscriptionStatutLabel = () => {
    if (!preinscription) return "Non initiée";
    if (preinscription.statut === "valide") return "Validée";
    if (preinscription.statut === "rejete") return "Rejetée";
    return "En attente";
  };

  const pageHints = {
    dashboard: "Consultez le statut de vos documents, paiements et pré-inscription. Utilisez le menu pour accéder aux sections clés.",
    profil: "Vérifiez et mettez à jour vos informations personnelles pour que votre dossier reste complet.",
    documents: "Téléversez vos documents requis et suivez leur validation. Commencez par le bouton Uploader.",
    paiement: "Initiez la pré-inscription ou les frais de stage et suivez le statut de vos paiements en temps réel."
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1px solid #e5e7eb", fontSize: "14px", outline: "none",
    background: "#fff", color: "#1e293b", boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif"
  };

  const cardBtn = (onClick, children, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "11px", borderRadius: "8px",
      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
      color: "#fff", border: "none", fontSize: "14px", fontWeight: "600",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1
    }}>{children}</button>
  );

  const statutBadge = (statut) => {
    if (!statut) return { text: "Non initié", bg: "#fffbeb", border: "#fde68a", color: "#92400e", icon: "⏳" };
    if (statut === "valide") return { text: "Validé", bg: "#f0fdf4", border: "#bbf7d0", color: "#065f46", icon: "✅" };
    if (statut === "rejete" || statut === "echoue") return { text: statut === "rejete" ? "Rejeté" : "Échoué", bg: "#fef2f2", border: "#fecaca", color: "#dc2626", icon: "❌" };
    return { text: "En attente", bg: "#fffbeb", border: "#fde68a", color: "#92400e", icon: "⏳" };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#faf5ff", fontFamily: "'Inter', sans-serif" }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* SIDEBAR */}
      <div className="app-sidebar dashboard-sidebar" style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: "240px",
        background: "linear-gradient(180deg, #4c1d95 0%, #7c3aed 100%)",
        display: "flex", flexDirection: "column", padding: "1.5rem 0", zIndex: 10
      }}>
        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/images/logo.jpeg" alt="Logo" style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontWeight: "700", fontSize: "15px", color: "#fff" }}>HR Skills SARL</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 0.75rem" }}>
          {[
            { id: "dashboard", icon: <FiCheckCircle size={18} />, label: "Tableau de bord" },
            { id: "profil", icon: <FiUser size={18} />, label: "Mon profil" },
            { id: "documents", icon: <FiFileText size={18} />, label: "Mes documents" },
            { id: "paiement", icon: <FiCreditCard size={18} />, label: "Paiement" },
          ].map((item) => (
            <div key={item.id} onClick={() => setActiveMenu(item.id)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
              background: activeMenu === item.id ? "rgba(255,255,255,0.2)" : "transparent",
              color: "#fff", fontSize: "14px",
              fontWeight: activeMenu === item.id ? "600" : "400",
              marginBottom: "4px", transition: "background 0.2s"
            }}
              onMouseEnter={e => { if (activeMenu !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { if (activeMenu !== item.id) e.currentTarget.style.background = "transparent"; }}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>

        <div style={{ padding: "0 0.75rem" }}>
          {profil && (
            <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", marginBottom: "8px" }}>
              <div style={{ fontSize: "12px", color: "#c4b5f7" }}>Connecté en tant que</div>
              <div style={{ fontSize: "13px", color: "#fff", fontWeight: "600" }}>{profil.prenom} {profil.nom}</div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: "10px",
            width: "100%", padding: "10px 12px", borderRadius: "8px",
            background: "rgba(255,255,255,0.1)", border: "none",
            color: "#fff", fontSize: "14px", cursor: "pointer"
          }}>
            <FiLogOut size={18} /> Déconnexion
          </button>
        </div>
      </div>

      {/* CONTENU */}
      <div className="app-main dashboard-main" style={{ marginLeft: "240px", padding: "2rem" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
              {activeMenu === "dashboard" && "Tableau de bord"}
              {activeMenu === "profil" && "Mon profil"}
              {activeMenu === "documents" && "Mes documents"}
              {activeMenu === "paiement" && "Paiement"}
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              {profil ? `Bienvenue, ${profil.prenom} ${profil.nom}` : "Chargement..."}
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "8px 16px", borderRadius: "10px",
            background: "#fff", border: "1px solid #ede9fe"
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: "700", fontSize: "13px"
            }}>
              {profil ? profil.prenom[0] : "S"}
            </div>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>
              {profil ? `${profil.prenom} ${profil.nom}` : "Stagiaire"}
            </span>
          </div>
        </div>

        <div style={{ background: "#eef2ff", border: "1px solid #dbeafe", borderRadius: "16px", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", gap: "0.9rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "14px", display: "grid", placeItems: "center", background: "#eef2ff", color: "#7c3aed", fontSize: "18px" }}>💡</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b", marginBottom: "0.35rem" }}>
              {activeMenu === "dashboard" ? "Bienvenue dans votre tableau de bord" : "Guide de navigation"}
            </div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#475569" }}>{pageHints[activeMenu]}</p>
          </div>
        </div>

        {/* DASHBOARD */}
        {activeMenu === "dashboard" && (
          <>
            {/* STATS */}
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { icon: <FiFileText size={22} />, label: "Documents soumis", value: `${documents.length} / 4`, color: "#7c3aed", bg: "#f5f3ff" },
                { icon: <FiCheckCircle size={22} />, label: "Documents validés", value: `${docsValides} / 4`, color: "#10b981", bg: "#f0fdf4" },
                {
                  icon: <FiUserCheck size={22} />, label: "Pré-inscription",
                  value: getPreinscriptionStatutLabel(),
                  color: preinscription?.statut === "valide" ? "#10b981" : "#f59e0b",
                  bg: preinscription?.statut === "valide" ? "#f0fdf4" : "#fffbeb"
                },
                {
                  icon: <FiCreditCard size={22} />, label: "Frais de stage",
                  value: paiement ? (paiement.statut === "valide" ? "Validé" : paiement.statut === "echoue" ? "Échoué" : "En attente") : "Non initié",
                  color: paiement?.statut === "valide" ? "#10b981" : "#f59e0b",
                  bg: paiement?.statut === "valide" ? "#f0fdf4" : "#fffbeb"
                },
                {
                  icon: <FiClock size={22} />, label: "Statut dossier",
                  value: docsValides === 4 && paiement?.statut === "valide" && preinscription?.statut === "valide" ? "Complet" : "En cours",
                  color: "#0ea5e9", bg: "#f0f9ff"
                },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "#fff", borderRadius: "12px",
                  border: "1px solid #ede9fe", padding: "1.25rem",
                  display: "flex", alignItems: "center", gap: "1rem"
                }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "10px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color, flexShrink: 0 }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>{stat.label}</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1.5rem" }}>
              {/* DOCUMENTS */}
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "1.25rem" }}>État des documents</h3>
                {DOC_TYPES.map((doc) => {
                  const statut = getDocStatut(doc.value);
                  return (
                    <div key={doc.value} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", borderRadius: "8px", border: "1px solid #f3f4f6", marginBottom: "8px", background: "#fafafa" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FiFileText size={16} style={{ color: "#94a3b8" }} />
                        <span style={{ fontSize: "13px", color: "#374151" }}>{doc.label}</span>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", background: statut.bg, color: statut.color }}>{statut.text}</span>
                    </div>
                  );
                })}
                <button onClick={() => setShowUpload(true)} style={{
                  width: "100%", padding: "11px", borderRadius: "8px", marginTop: "0.75rem",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff", border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                }}>
                  <FiUpload size={16} /> Uploader un document
                </button>
              </div>

              {/* PRE-INSCRIPTION CARD */}
              <PreinscriptionCard
                preinscription={preinscription}
                onPayer={() => setShowPreinscription(true)}
              />

              {/* PAIEMENT CARD */}
              <PaiementCard
                paiement={paiement}
                onPayer={() => setShowPaiement(true)}
              />
            </div>
          </>
        )}

        {/* PROFIL */}
        {activeMenu === "profil" && profil && (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "2rem", maxWidth: "600px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "22px" }}>
                {profil.prenom[0]}
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>{profil.prenom} {profil.nom}</div>
                <div style={{ fontSize: "14px", color: "#64748b" }}>{profil.email}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Établissement", value: profil.etablissement },
                { label: "Filière", value: profil.filiere },
                { label: "Niveau", value: profil.niveau },
                { label: "Téléphone", value: profil.telephone },
                { label: "Date de naissance", value: profil.date_naissance },
                { label: "Sexe", value: profil.sexe === "M" ? "Masculin" : "Féminin" },
                { label: "Date début stage", value: profil.date_debut || "Non définie" },
                { label: "Date fin stage", value: profil.date_fin || "Non définie" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "12px", background: "#faf5ff", borderRadius: "8px", border: "1px solid #ede9fe" }}>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        {activeMenu === "documents" && (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>Mes documents</h3>
              <button onClick={() => setShowUpload(true)} style={{
                padding: "8px 16px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", border: "none", fontSize: "13px", fontWeight: "500", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "6px"
              }}>
                <FiUpload size={14} /> Uploader
              </button>
            </div>
            {DOC_TYPES.map((doc) => {
              const statut = getDocStatut(doc.value);
              const docObj = documents.find(d => d.type === doc.value);
              return (
                <div key={doc.value} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "8px", border: "1px solid #f3f4f6", marginBottom: "10px", background: "#fafafa" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: statut.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiFileText size={18} style={{ color: statut.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>{doc.label}</div>
                      {docObj && <div style={{ fontSize: "12px", color: "#94a3b8" }}>{docObj.nom_fichier}</div>}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", background: statut.bg, color: statut.color }}>{statut.text}</span>
                    {docObj && docObj.statut === "en_attente" && (
                      <button onClick={async () => {
                        await documentsService.deleteDocument(docObj.id);
                        dispatch(fetchDocuments());
                      }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}>
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAIEMENT PAGE — deux cartes côte à côte */}
        {activeMenu === "paiement" && (
          <div className="payment-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: "900px" }}>

            {/* CARTE PRE-INSCRIPTION */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                <FiUserCheck size={20} style={{ color: "#7c3aed" }} />
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>Pré-inscription</h3>
              </div>
              <div style={{ textAlign: "center", padding: "1.5rem", borderRadius: "12px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "13px", color: "#7c3aed", fontWeight: "500", marginBottom: "8px" }}>Frais de pré-inscription</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", fontWeight: "800", color: "#4c1d95" }}>5 000</div>
                <div style={{ fontSize: "16px", color: "#7c3aed", fontWeight: "500" }}>XAF</div>
              </div>
              {preinscription ? (
                <div style={{ padding: "16px", borderRadius: "10px", textAlign: "center", background: preinscription.statut === "valide" ? "#f0fdf4" : "#fffbeb", border: `1px solid ${preinscription.statut === "valide" ? "#bbf7d0" : "#fde68a"}`, color: preinscription.statut === "valide" ? "#065f46" : "#92400e", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                    {preinscription.statut === "valide" ? "✅ Pré-inscription validée" : preinscription.statut === "rejete" ? "❌ Rejetée" : "⏳ En attente de confirmation"}
                  </div>
                  <div style={{ fontSize: "12px" }}>Référence : {preinscription.reference_interne}</div>
                  {preinscription.paye_le && <div style={{ fontSize: "12px" }}>Payé le : {new Date(preinscription.paye_le).toLocaleDateString("fr-FR")}</div>}
                </div>
              ) : (
                <p style={{ color: "#64748b", fontSize: "14px", textAlign: "center", marginBottom: "1.5rem" }}>
                  Aucune pré-inscription initiée. Cliquez ci-dessous pour commencer.
                </p>
              )}
              {(!preinscription || preinscription.statut !== "valide") && (
                <button onClick={() => setShowPreinscription(true)} style={{
                  width: "100%", padding: "14px", borderRadius: "8px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff", border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer"
                }}>
                  Payer la pré-inscription
                </button>
              )}
            </div>

            {/* CARTE FRAIS DE STAGE */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                <FiCreditCard size={20} style={{ color: "#7c3aed" }} />
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>Frais de stage</h3>
              </div>
              <div style={{ textAlign: "center", padding: "1.5rem", borderRadius: "12px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "13px", color: "#7c3aed", fontWeight: "500", marginBottom: "8px" }}>Frais de dossier de stage</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", fontWeight: "800", color: "#4c1d95" }}>40 000</div>
                <div style={{ fontSize: "16px", color: "#7c3aed", fontWeight: "500" }}>XAF</div>
              </div>
              {paiement ? (
                <div style={{ padding: "16px", borderRadius: "10px", textAlign: "center", background: paiement.statut === "valide" ? "#f0fdf4" : "#fffbeb", border: `1px solid ${paiement.statut === "valide" ? "#bbf7d0" : "#fde68a"}`, color: paiement.statut === "valide" ? "#065f46" : "#92400e", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                    {paiement.statut === "valide" ? "✅ Paiement validé" : paiement.statut === "echoue" ? "❌ Paiement échoué" : "⏳ En attente de confirmation"}
                  </div>
                  <div style={{ fontSize: "12px" }}>Référence : {paiement.reference_interne}</div>
                  {paiement.paye_le && <div style={{ fontSize: "12px" }}>Payé le : {new Date(paiement.paye_le).toLocaleDateString("fr-FR")}</div>}
                </div>
              ) : (
                <p style={{ color: "#64748b", fontSize: "14px", textAlign: "center", marginBottom: "1.5rem" }}>
                  Aucun paiement initié. Cliquez ci-dessous pour payer.
                </p>
              )}
              {(!paiement || paiement.statut !== "valide") && (
                <button onClick={() => setShowPaiement(true)} style={{
                  width: "100%", padding: "14px", borderRadius: "8px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff", border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer"
                }}>
                  Payer maintenant
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL UPLOAD */}
      {showUpload && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "18px", padding: "1rem", width: "clamp(280px, 84vw, 420px)", maxHeight: "calc(100vh - 2rem)", overflowY: "auto", boxShadow: "0 18px 48px rgba(15, 23, 42, 0.16)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "0.15rem" }}>Uploader vos documents</h3>
                <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.4", margin: 0 }}>
                  Sélectionnez les documents requis. Formats acceptés : PDF, JPG, JPEG, PNG.
                </p>
              </div>
              <button onClick={() => setShowUpload(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleUpload} style={{ display: "grid", gap: "0.75rem" }}>
              {DOC_TYPES.map((doc) => (
                <label key={doc.value} style={{ display: "block", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "0.85rem", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.55rem", flexWrap: "wrap", gap: "0.4rem" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#111827" }}>{doc.label}</span>
                    <span style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "600" }}>Obligatoire</span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => setUploadFiles({ ...uploadFiles, [doc.value]: e.target.files[0] })}
                    style={{ ...inputStyle, padding: "8px 10px", width: "100%", cursor: "pointer", fontSize: "13px" }}
                  />
                  {uploadFiles[doc.value] && (
                    <div style={{ marginTop: "0.6rem", fontSize: "12px", color: "#374151" }}>
                      {uploadFiles[doc.value].name}
                    </div>
                  )}
                </label>
              ))}
              {uploadError && (
                <div style={{ color: "#dc2626", fontSize: "13px", fontWeight: "600", padding: "0.65rem 0.85rem", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca" }}>
                  {uploadError}
                </div>
              )}
              <div style={{ display: "grid", gap: "0.65rem" }}>
                <button type="submit" disabled={uploading} style={{
                  padding: "12px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff", border: "none", fontSize: "14px", fontWeight: "700",
                  cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.7 : 1,
                  boxShadow: "0 14px 24px rgba(124, 58, 237, 0.16)"
                }}>
                  {uploading ? "Envoi..." : "Téléverser"}
                </button>
                <button type="button" onClick={() => { setShowUpload(false); setUploadFiles({}); setUploadError(""); }} style={{
                  padding: "12px", borderRadius: "14px", background: "#f3f4f6",
                  color: "#374151", border: "1px solid #e5e7eb", fontSize: "14px", fontWeight: "700", cursor: "pointer"
                }}>
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PRE-INSCRIPTION */}
      {showPreinscription && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>Payer la pré-inscription</h3>
              <button onClick={() => setShowPreinscription(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}><FiX size={20} /></button>
            </div>
            <form onSubmit={handlePreinscription} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>Opérateur Mobile Money</label>
                <select value={preinscriptionForm.operateur} onChange={e => setPreinscriptionForm({ ...preinscriptionForm, operateur: e.target.value })} style={inputStyle}>
                  {OPERATEURS.map(op => <option key={op} value={op}>{op}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>Numéro de téléphone</label>
                <input required placeholder="677000000" value={preinscriptionForm.telephone} onChange={e => setPreinscriptionForm({ ...preinscriptionForm, telephone: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ padding: "12px", borderRadius: "8px", background: "#f5f3ff", border: "1px solid #c4b5fd", fontSize: "13px", color: "#4c1d95" }}>
                💡 Vous recevrez une notification sur votre téléphone pour confirmer le paiement de <strong>5 000 XAF</strong>.
              </div>
              {preinscriptionError && (
                <div style={{ padding: "10px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px" }}>
                  ❌ {preinscriptionError}
                </div>
              )}
              <button type="submit" disabled={preinscriptionLoading} style={{
                padding: "12px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", border: "none", fontSize: "14px", fontWeight: "600",
                cursor: preinscriptionLoading ? "not-allowed" : "pointer", opacity: preinscriptionLoading ? 0.7 : 1
              }}>
                {preinscriptionLoading ? "Traitement en cours..." : "Confirmer — 5 000 XAF"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PAIEMENT FRAIS DE STAGE */}
      {showPaiement && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>Payer les frais de stage</h3>
              <button onClick={() => setShowPaiement(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}><FiX size={20} /></button>
            </div>
            <form onSubmit={handlePaiement} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>Opérateur Mobile Money</label>
                <select value={paiementForm.operateur} onChange={e => setPaiementForm({ ...paiementForm, operateur: e.target.value })} style={inputStyle}>
                  {OPERATEURS.map(op => <option key={op} value={op}>{op}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>Numéro de téléphone</label>
                <input required placeholder="677000000" value={paiementForm.telephone} onChange={e => setPaiementForm({ ...paiementForm, telephone: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ padding: "12px", borderRadius: "8px", background: "#f5f3ff", border: "1px solid #c4b5fd", fontSize: "13px", color: "#4c1d95" }}>
                💡 Vous recevrez une notification sur votre téléphone pour confirmer le paiement de <strong>40 000 XAF</strong>.
              </div>
              <button type="submit" disabled={paiementLoading} style={{
                padding: "12px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", border: "none", fontSize: "14px", fontWeight: "600",
                cursor: paiementLoading ? "not-allowed" : "pointer", opacity: paiementLoading ? 0.7 : 1
              }}>
                {paiementLoading ? "Traitement en cours..." : "Confirmer — 40 000 XAF"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PreinscriptionCard({ preinscription, onPayer }) {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "600", color: "#1e293b", marginBottom: "1rem" }}>Pré-inscription</h3>
      <div style={{ padding: "1rem", borderRadius: "10px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "500", marginBottom: "4px" }}>Frais</div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: "800", color: "#4c1d95" }}>5 000</div>
        <div style={{ fontSize: "12px", color: "#7c3aed" }}>XAF</div>
      </div>
      {preinscription ? (
        <div style={{
          padding: "8px", borderRadius: "8px", marginBottom: "0.75rem", textAlign: "center",
          background: preinscription.statut === "valide" ? "#f0fdf4" : "#fffbeb",
          border: `1px solid ${preinscription.statut === "valide" ? "#bbf7d0" : "#fde68a"}`,
          color: preinscription.statut === "valide" ? "#065f46" : "#92400e",
          fontSize: "12px"
        }}>
          {preinscription.statut === "valide" ? "✅ Validée" : preinscription.statut === "rejete" ? "❌ Rejetée" : "⏳ En attente"}
        </div>
      ) : (
        <div style={{ padding: "8px", borderRadius: "8px", background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: "12px", marginBottom: "0.75rem", textAlign: "center" }}>
          ⏳ Non initiée
        </div>
      )}
      {(!preinscription || preinscription.statut !== "valide") && (
        <button onClick={onPayer} style={{
          width: "100%", padding: "10px", borderRadius: "8px",
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
          color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer"
        }}>
          Payer — 5 000 XAF
        </button>
      )}
    </div>
  );
}

function PaiementCard({ paiement, onPayer }) {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "600", color: "#1e293b", marginBottom: "1rem" }}>Frais de stage</h3>
      <div style={{ padding: "1rem", borderRadius: "10px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "500", marginBottom: "4px" }}>Frais</div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: "800", color: "#4c1d95" }}>40 000</div>
        <div style={{ fontSize: "12px", color: "#7c3aed" }}>XAF</div>
      </div>
      {paiement ? (
        <div style={{
          padding: "8px", borderRadius: "8px", marginBottom: "0.75rem", textAlign: "center",
          background: paiement.statut === "valide" ? "#f0fdf4" : "#fffbeb",
          border: `1px solid ${paiement.statut === "valide" ? "#bbf7d0" : "#fde68a"}`,
          color: paiement.statut === "valide" ? "#065f46" : "#92400e",
          fontSize: "12px"
        }}>
          {paiement.statut === "valide" ? "✅ Validé" : paiement.statut === "echoue" ? "❌ Échoué" : "⏳ En attente"}
        </div>
      ) : (
        <div style={{ padding: "8px", borderRadius: "8px", background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: "12px", marginBottom: "0.75rem", textAlign: "center" }}>
          ⏳ Non initié
        </div>
      )}
      {(!paiement || paiement.statut !== "valide") && (
        <button onClick={onPayer} style={{
          width: "100%", padding: "10px", borderRadius: "8px",
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
          color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer"
        }}>
          Payer — 40 000 XAF
        </button>
      )}
    </div>
  );
}
