import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { fetchDashboard, fetchDossiers } from "./adminSlice";
import adminService from "./adminService";
import preinscriptionService from "../preinscription/preinscriptionService";
import { fetchMessagesEnvoyes, envoyerMessage } from "../messages/messagesSlice";
import {
  FiUsers, FiFileText, FiCreditCard, FiCheckCircle, FiLogOut,
  FiBarChart2, FiEye, FiX, FiExternalLink, FiUserCheck, FiClock,
  FiMessageSquare, FiSend, FiGlobe
} from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboard, dossiers } = useSelector((state) => state.admin);
  const { envoyes: messagesEnvoyes, loading: msgLoading } = useSelector((state) => state.messages);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [commentaire, setCommentaire] = useState("");
  const [paiements, setPaiements] = useState([]);
  const [preinscriptions, setPreinscriptions] = useState([]);
  const [msgForm, setMsgForm] = useState({ destinataire: "all", sujet: "", contenu: "" });
  const [msgSucces, setMsgSucces] = useState("");

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchDossiers());
    dispatch(fetchMessagesEnvoyes());
  }, []);

  useEffect(() => {
    if (activeMenu === "paiements") adminService.getPaiements().then(setPaiements);
    if (activeMenu === "preinscriptions") preinscriptionService.getListe().then(setPreinscriptions);
    if (activeMenu === "messages") dispatch(fetchMessagesEnvoyes());
  }, [activeMenu]);

  const handleEnvoyerMessage = async (e) => {
    e.preventDefault();
    if (!msgForm.sujet.trim() || !msgForm.contenu.trim()) return;
    await dispatch(envoyerMessage(msgForm));
    setMsgSucces("Message envoyé avec succès !");
    setMsgForm({ destinataire: "all", sujet: "", contenu: "" });
    setTimeout(() => setMsgSucces(""), 3000);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleVoirDossier = async (userId) => {
    try {
      const data = await adminService.getDossierDetail(userId);
      setSelectedDossier(data);
      setSelectedUserId(userId);
    } catch (e) {
      alert("Erreur chargement dossier");
    }
  };

  const handleValiderDoc = async (docId) => {
    await adminService.validerDocument(docId, commentaire);
    handleVoirDossier(selectedUserId);
    dispatch(fetchDashboard());
    dispatch(fetchDossiers());
  };

  const handleRejeterDoc = async (docId) => {
    if (!commentaire) {
      alert("Commentaire obligatoire pour rejeter");
      return;
    }
    await adminService.rejeterDocument(docId, commentaire);
    handleVoirDossier(selectedUserId);
    dispatch(fetchDashboard());
    dispatch(fetchDossiers());
  };

  const handleValiderPaiement = async (paiementId) => {
    await adminService.validerPaiement(paiementId);
    adminService.getPaiements().then(setPaiements);
    dispatch(fetchDashboard());
    dispatch(fetchDossiers());
    if (selectedUserId) handleVoirDossier(selectedUserId);
  };

  const handleValiderPreinscription = async (id) => {
    await preinscriptionService.validerPreinscription(id);
    preinscriptionService.getListe().then(setPreinscriptions);
    dispatch(fetchDashboard());
  };

  const handleRejeterPreinscription = async (id) => {
    await preinscriptionService.rejeterPreinscription(id);
    preinscriptionService.getListe().then(setPreinscriptions);
    dispatch(fetchDashboard());
  };

  const getStatutColor = (statut) => {
    if (statut === "valide") return { color: "#10b981", bg: "#f0fdf4" };
    if (statut === "rejete" || statut === "echoue") return { color: "#ef4444", bg: "#fef2f2" };
    return { color: "#f59e0b", bg: "#fffbeb" };
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    color: "#1e293b",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif"
  };

  const linkVoirStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#7c3aed",
    textDecoration: "none",
    padding: "3px 10px",
    borderRadius: "99px",
    border: "1px solid #c4b5fd",
    background: "#fff"
  };

  const pageTitle = {
    dashboard: "Tableau de bord",
    dossiers: "Gestion des dossiers",
    paiements: "Gestion des paiements",
    preinscriptions: "Gestion des préinscriptions",
    messages: "Messages aux stagiaires",
  }[activeMenu];

  const pageHints = {
    dashboard: "Vue globale des performances stagiaires, des paiements et des préinscriptions.",
    dossiers: "Validez, consultez et gérez facilement les dossiers des stagiaires.",
    paiements: "Suivez et validez les paiements des stagiaires en un clic.",
    preinscriptions: "Gérez les demandes de pré-inscription et suivez leur progression.",
    messages: "Envoyez des informations à un stagiaire en particulier ou à tous les stagiaires.",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#faf5ff", fontFamily: "'Inter', sans-serif" }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* SIDEBAR */}
      <div className="app-sidebar admin-sidebar" style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: "240px",
        background: "linear-gradient(180deg, #1e1b4b 0%, #4c1d95 100%)",
        display: "flex", flexDirection: "column", padding: "1.5rem 0", zIndex: 10
      }}>
        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/images/logo.jpeg" alt="Logo" style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div style={{ fontWeight: "700", fontSize: "14px", color: "#fff" }}>HR Skills SARL</div>
              <div style={{ fontSize: "11px", color: "#c4b5f7" }}>Administration</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 0.75rem" }}>
          {[
            { id: "dashboard", icon: <FiBarChart2 size={18} />, label: "Tableau de bord" },
            { id: "dossiers", icon: <FiFileText size={18} />, label: "Dossiers" },
            { id: "preinscriptions", icon: <FiUserCheck size={18} />, label: "Préinscriptions" },
            { id: "paiements", icon: <FiCreditCard size={18} />, label: "Paiements" },
            { id: "messages", icon: <FiMessageSquare size={18} />, label: "Messages" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
                background: activeMenu === item.id ? "rgba(255,255,255,0.2)" : "transparent",
                color: "#fff", fontSize: "14px",
                fontWeight: activeMenu === item.id ? "600" : "400",
                marginBottom: "4px", transition: "background 0.2s"
              }}
              onMouseEnter={(e) => { if (activeMenu !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { if (activeMenu !== item.id) e.currentTarget.style.background = "transparent"; }}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>

        <div style={{ padding: "0 0.75rem" }}>
          <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", marginBottom: "8px" }}>
            <div style={{ fontSize: "12px", color: "#c4b5f7" }}>Connecté en tant que</div>
            <div style={{ fontSize: "13px", color: "#fff", fontWeight: "600" }}>Johann Liebert</div>
            <div style={{ fontSize: "11px", color: "#a78bfa" }}>Administrateur</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              width: "100%", padding: "10px 12px", borderRadius: "8px",
              background: "rgba(255,255,255,0.1)", border: "none",
              color: "#fff", fontSize: "14px", cursor: "pointer"
            }}
          >
            <FiLogOut size={18} /> Déconnexion
          </button>
        </div>
      </div>

      {/* CONTENU */}
      <div className="app-main admin-main" style={{ marginLeft: "240px", padding: "2rem" }}>

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
            {pageTitle}
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Vue d'ensemble des dossiers de stage</p>
        </div>

        {/* DASHBOARD */}
        {activeMenu === "dashboard" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {dashboard ? [
                { icon: <FiUsers size={22} />, label: "Total stagiaires", value: dashboard.total_stagiaires, color: "#7c3aed", bg: "#f5f3ff" },
                { icon: <FiFileText size={22} />, label: "En attente", value: dashboard.dossiers_en_attente, color: "#f59e0b", bg: "#fffbeb" },
                { icon: <FiCheckCircle size={22} />, label: "Dossiers validés", value: dashboard.dossiers_valides, color: "#10b981", bg: "#f0fdf4" },
                { icon: <FiCreditCard size={22} />, label: "Paiements validés", value: dashboard.total_paiements_valides, color: "#0ea5e9", bg: "#f0f9ff" },
                { icon: <FiUserCheck size={22} />, label: "Préinscriptions validées", value: dashboard.total_preinscriptions_valides ?? 0, color: "#10b981", bg: "#f0fdf4" },
                { icon: <FiClock size={22} />, label: "Préinscriptions en attente", value: dashboard.total_preinscriptions_en_attente ?? 0, color: "#f59e0b", bg: "#fffbeb" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "10px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color, flexShrink: 0 }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>{stat.label}</div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>{stat.value}</div>
                  </div>
                </div>
              )) : <div style={{ color: "#94a3b8" }}>Chargement...</div>}
            </div>

            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "1.25rem" }}>Derniers dossiers</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {["Stagiaire", "Établissement", "Documents", "Paiement", "Action"].map((h) => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dossiers.slice(0, 5).map((d) => (
                    <tr
                      key={d.user_id}
                      style={{ borderBottom: "1px solid #f9fafb" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#faf5ff"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px", fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "700" }}>
                            {d.prenom[0]}
                          </div>
                          {d.prenom} {d.nom}
                        </div>
                      </td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{d.etablissement}</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{d.documents_valides}/{d.documents_total}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", ...getStatutColor(d.paiement_statut) }}>
                          {d.paiement_statut || "Non initié"}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <button
                          onClick={() => { handleVoirDossier(d.user_id); setActiveMenu("dossiers"); }}
                          style={{ padding: "5px 14px", borderRadius: "6px", border: "1px solid #c4b5fd", background: "#fff", color: "#7c3aed", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                        >
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* DOSSIERS */}
        {activeMenu === "dossiers" && (
          <div className="dossier-grid" style={{ display: "grid", gridTemplateColumns: selectedDossier ? "1fr 1.5fr" : "1fr", gap: "1.5rem" }}>
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "1.25rem" }}>
                Liste des stagiaires ({dossiers.length})
              </h3>
              {dossiers.map((d) => (
                <div
                  key={d.user_id}
                  onClick={() => handleVoirDossier(d.user_id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px", borderRadius: "8px", border: "1px solid #f3f4f6",
                    marginBottom: "8px", background: selectedUserId === d.user_id ? "#f5f3ff" : "#fafafa",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "13px" }}>
                      {d.prenom[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>{d.prenom} {d.nom}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{d.etablissement} · {d.documents_valides}/{d.documents_total} docs</div>
                    </div>
                  </div>
                  <FiEye size={16} style={{ color: "#7c3aed" }} />
                </div>
              ))}
            </div>

            {selectedDossier && (
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
                    Dossier de {selectedDossier.prenom} {selectedDossier.nom}
                  </h3>
                  <button onClick={() => { setSelectedDossier(null); setSelectedUserId(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                    <FiX size={18} />
                  </button>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#4c1d95", marginBottom: "10px" }}>Documents</div>

                  <input
                    placeholder="Commentaire (obligatoire pour rejeter)"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    style={{ ...inputStyle, marginBottom: "10px" }}
                  />

                  {selectedDossier.documents && selectedDossier.documents.length > 0 ? (
                    selectedDossier.documents.map((doc) => {
                      const s = getStatutColor(doc.statut);
                      const fileUrl = API_BASE_URL + "/" + doc.url_fichier;
                      return (
                        <div key={doc.id} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #f3f4f6", marginBottom: "8px", background: "#fafafa" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <span style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b" }}>
                              {doc.type.replace(/_/g, " ")}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={linkVoirStyle}>
                                <FiExternalLink size={12} />
                                <span>Voir</span>
                              </a>
                              <span style={{ fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", background: s.bg, color: s.color }}>
                                {doc.statut}
                              </span>
                            </div>
                          </div>
                          {doc.statut === "en_attente" && (
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button onClick={() => handleValiderDoc(doc.id)} style={{ flex: 1, padding: "6px", borderRadius: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
                                ✓ Valider
                              </button>
                              <button onClick={() => handleRejeterDoc(doc.id)} style={{ flex: 1, padding: "6px", borderRadius: "6px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
                                ✗ Rejeter
                              </button>
                            </div>
                          )}
                          {doc.commentaire && (
                            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                              💬 {doc.commentaire}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ color: "#94a3b8", fontSize: "14px" }}>Aucun document soumis</div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#4c1d95", marginBottom: "10px" }}>Paiement</div>
                  {selectedDossier.paiement ? (
                    <div style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ede9fe", background: "#fafafa" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{selectedDossier.paiement.montant} XAF</span>
                        <span style={{ fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", ...getStatutColor(selectedDossier.paiement.statut) }}>
                          {selectedDossier.paiement.statut}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>Réf : {selectedDossier.paiement.reference_interne}</div>
                      {selectedDossier.paiement.statut === "en_attente" && (
                        <button
                          onClick={() => handleValiderPaiement(selectedDossier.paiement.id)}
                          style={{ width: "100%", padding: "8px", borderRadius: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "13px", fontWeight: "500", cursor: "pointer", marginTop: "10px" }}
                        >
                          ✓ Valider le paiement
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{ color: "#94a3b8", fontSize: "14px" }}>Aucun paiement initié</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PREINSCRIPTIONS */}
        {activeMenu === "preinscriptions" && (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
                Toutes les préinscriptions ({preinscriptions.length})
              </h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "99px", background: "#f0fdf4", color: "#065f46", border: "1px solid #bbf7d0" }}>
                  ✅ {preinscriptions.filter(p => p.statut === "valide").length} validées
                </span>
                <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "99px", background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a" }}>
                  ⏳ {preinscriptions.filter(p => p.statut === "en_attente").length} en attente
                </span>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["Référence", "Montant", "Opérateur", "Téléphone", "Statut", "Date", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preinscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                      Aucune préinscription pour le moment
                    </td>
                  </tr>
                ) : preinscriptions.map((p) => {
                  const s = getStatutColor(p.statut);
                  return (
                    <tr
                      key={p.id}
                      style={{ borderBottom: "1px solid #f9fafb" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#faf5ff"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b", fontFamily: "monospace" }}>{p.reference_interne}</td>
                      <td style={{ padding: "12px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{p.montant} XAF</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{p.operateur || "—"}</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{p.telephone || "—"}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", background: s.bg, color: s.color }}>
                          {p.statut}
                        </span>
                      </td>
                      <td style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>
                        {p.created_at ? new Date(p.created_at).toLocaleDateString("fr-FR") : "—"}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {p.statut === "en_attente" && (
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button
                              onClick={() => handleValiderPreinscription(p.id)}
                              style={{ padding: "4px 12px", borderRadius: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                            >
                              ✓ Valider
                            </button>
                            <button
                              onClick={() => handleRejeterPreinscription(p.id)}
                              style={{ padding: "4px 12px", borderRadius: "6px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                            >
                              ✗ Rejeter
                            </button>
                          </div>
                        )}
                        {p.statut === "valide" && (
                          <span style={{ fontSize: "12px", color: "#10b981" }}>✅ Validée</span>
                        )}
                        {p.statut === "rejete" && (
                          <span style={{ fontSize: "12px", color: "#ef4444" }}>❌ Rejetée</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* MESSAGES */}
        {activeMenu === "messages" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "1.5rem", alignItems: "flex-start" }}>

            {/* FORMULAIRE D'ENVOI */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.75rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "0 0 1.25rem" }}>
                Envoyer un message
              </h3>

              <form onSubmit={handleEnvoyerMessage} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Destinataire */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Destinataire</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                    <button type="button"
                      onClick={() => setMsgForm({ ...msgForm, destinataire: "all" })}
                      style={{
                        padding: "12px 8px", borderRadius: "10px", cursor: "pointer", textAlign: "center",
                        border: `2px solid ${msgForm.destinataire === "all" ? "#7c3aed" : "#e5e7eb"}`,
                        background: msgForm.destinataire === "all" ? "#f5f3ff" : "#fff",
                        color: msgForm.destinataire === "all" ? "#7c3aed" : "#9ca3af",
                        fontWeight: "700", fontSize: "13px", transition: "all 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      }}
                    >
                      <FiGlobe size={14} /> Tous les stagiaires
                    </button>
                    <button type="button"
                      onClick={() => setMsgForm({ ...msgForm, destinataire: "" })}
                      style={{
                        padding: "12px 8px", borderRadius: "10px", cursor: "pointer", textAlign: "center",
                        border: `2px solid ${msgForm.destinataire !== "all" ? "#7c3aed" : "#e5e7eb"}`,
                        background: msgForm.destinataire !== "all" ? "#f5f3ff" : "#fff",
                        color: msgForm.destinataire !== "all" ? "#7c3aed" : "#9ca3af",
                        fontWeight: "700", fontSize: "13px", transition: "all 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      }}
                    >
                      <FiUsers size={14} /> Stagiaire spécifique
                    </button>
                  </div>

                  {/* Sélection stagiaire spécifique */}
                  {msgForm.destinataire !== "all" && (
                    <select
                      value={msgForm.destinataire}
                      onChange={e => setMsgForm({ ...msgForm, destinataire: e.target.value })}
                      required
                      style={{ ...inputStyle, marginTop: "4px" }}
                    >
                      <option value="">— Choisir un stagiaire —</option>
                      {dossiers.map(d => (
                        <option key={d.user_id} value={String(d.user_id)}>
                          {d.prenom} {d.nom} — {d.etablissement}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Sujet */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Sujet</label>
                  <input
                    required placeholder="Objet du message"
                    value={msgForm.sujet}
                    onChange={e => setMsgForm({ ...msgForm, sujet: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                {/* Contenu */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Message</label>
                  <textarea
                    required rows={5} placeholder="Rédigez votre message ici..."
                    value={msgForm.contenu}
                    onChange={e => setMsgForm({ ...msgForm, contenu: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                  />
                </div>

                {msgSucces && (
                  <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "13px", fontWeight: "500" }}>
                    ✅ {msgSucces}
                  </div>
                )}

                <button type="submit" disabled={msgLoading} style={{
                  padding: "12px", borderRadius: "8px",
                  background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
                  color: "#fff", border: "none", fontSize: "14px", fontWeight: "700",
                  cursor: msgLoading ? "not-allowed" : "pointer", opacity: msgLoading ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 6px 18px rgba(124,58,237,0.25)",
                }}>
                  <FiSend size={16} /> {msgLoading ? "Envoi..." : msgForm.destinataire === "all" ? "Envoyer à tous" : "Envoyer au stagiaire"}
                </button>
              </form>
            </div>

            {/* MESSAGES ENVOYÉS */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.75rem" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "0 0 1.25rem" }}>
                Messages envoyés ({messagesEnvoyes.length})
              </h3>

              {messagesEnvoyes.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#94a3b8" }}>
                  <FiMessageSquare size={36} style={{ marginBottom: "1rem", color: "#c4b5fd" }} />
                  <div style={{ fontSize: "14px" }}>Aucun message envoyé pour l'instant.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "480px", overflowY: "auto" }}>
                  {messagesEnvoyes.map((msg) => (
                    <div key={msg.id} style={{
                      padding: "1rem 1.25rem", borderRadius: "10px",
                      border: "1px solid #f3f4f6", background: "#fafafa",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "6px" }}>
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600", fontSize: "13px", color: "#1e293b" }}>
                          {msg.sujet}
                        </span>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                          <span style={{
                            fontSize: "11px", padding: "2px 8px", borderRadius: "99px", fontWeight: "600",
                            background: msg.destinataire === "all" ? "#f5f3ff" : "#f0f9ff",
                            color: msg.destinataire === "all" ? "#7c3aed" : "#0ea5e9",
                            border: `1px solid ${msg.destinataire === "all" ? "#c4b5fd" : "#bae6fd"}`,
                          }}>
                            {msg.destinataire === "all" ? "Tous" : `Stagiaire #${msg.destinataire}`}
                          </span>
                          <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {new Date(msg.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                        {msg.contenu.length > 120 ? `${msg.contenu.slice(0, 120)}…` : msg.contenu}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAIEMENTS */}
        {activeMenu === "paiements" && (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ede9fe", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "1.25rem" }}>
              Tous les paiements ({paiements.length})
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["Référence", "Montant", "Opérateur", "Téléphone", "Statut", "Action"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paiements.map((p) => {
                  const s = getStatutColor(p.statut);
                  return (
                    <tr
                      key={p.id}
                      style={{ borderBottom: "1px solid #f9fafb" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#faf5ff"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b", fontFamily: "monospace" }}>{p.reference_interne}</td>
                      <td style={{ padding: "12px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{p.montant} XAF</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{p.operateur || "—"}</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{p.telephone || "—"}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "500", padding: "3px 10px", borderRadius: "99px", background: s.bg, color: s.color }}>
                          {p.statut}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        {p.statut === "en_attente" && (
                          <button
                            onClick={() => handleValiderPaiement(p.id)}
                            style={{ padding: "5px 14px", borderRadius: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                          >
                            Valider
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
