import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import OnboardingTour from "../onboarding/OnboardingTour";
import { fetchDashboard, fetchDossiers } from "./adminSlice";
import adminService from "./adminService";
import preinscriptionService from "../preinscription/preinscriptionService";
import { fetchMessagesEnvoyes, envoyerMessage } from "../messages/messagesSlice";
import {
  FiUsers, FiFileText, FiCreditCard, FiCheckCircle, FiLogOut,
  FiBarChart2, FiEye, FiX, FiExternalLink, FiUserCheck, FiClock,
  FiMessageSquare, FiSend, FiGlobe, FiMenu, FiSearch, FiAlertCircle,
} from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const NAV_ITEMS = [
  { id: "dashboard",      icon: <FiBarChart2 size={17} />,    label: "Tableau de bord" },
  { id: "dossiers",       icon: <FiFileText size={17} />,     label: "Dossiers" },
  { id: "preinscriptions",icon: <FiUserCheck size={17} />,    label: "Préinscriptions" },
  { id: "paiements",      icon: <FiCreditCard size={17} />,   label: "Paiements" },
  { id: "messages",       icon: <FiMessageSquare size={17} />, label: "Messages" },
];

function Badge({ text, color, bg, border }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "99px", color, background: bg, border: `1px solid ${border || bg}` }}>
      {text}
    </span>
  );
}

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div
      style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ede9fe", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "all 0.2s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px ${color}14`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px", fontWeight: "500" }}>{label}</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.02em" }}>{value ?? "—"}</div>
      </div>
    </div>
  );
}

function StatusBadge({ statut }) {
  const map = {
    valide:    { text: "Validé",     color: "#065f46", bg: "#f0fdf4", border: "#bbf7d0" },
    rejete:    { text: "Rejeté",     color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
    echoue:    { text: "Échoué",     color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
    en_attente:{ text: "En attente", color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
  };
  const s = map[statut] || { text: statut || "Non initié", color: "#64748b", bg: "#f8fafc", border: "#e5e7eb" };
  return <Badge {...s} />;
}

function TableHeaderRow({ cols }) {
  return (
    <tr>
      {cols.map((h) => (
        <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", background: "#faf9ff", borderBottom: "1px solid #f0eefe", whiteSpace: "nowrap" }}>
          {h}
        </th>
      ))}
    </tr>
  );
}

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboard, dossiers } = useSelector((s) => s.admin);
  const { envoyes: messagesEnvoyes, loading: msgLoading } = useSelector((s) => s.messages);

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [commentaire, setCommentaire] = useState("");
  const [paiements, setPaiements] = useState([]);
  const [preinscriptions, setPreinscriptions] = useState([]);
  const [msgForm, setMsgForm] = useState({ destinataire: "all", sujet: "", contenu: "" });
  const [msgSucces, setMsgSucces] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectError, setRejectError] = useState("");

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

  const handleLogout = () => { dispatch(logout()); navigate("/login"); };

  const handleEnvoyerMessage = async (e) => {
    e.preventDefault();
    if (!msgForm.sujet.trim() || !msgForm.contenu.trim()) return;
    await dispatch(envoyerMessage(msgForm));
    setMsgSucces("Message envoyé avec succès !");
    setMsgForm({ destinataire: "all", sujet: "", contenu: "" });
    setTimeout(() => setMsgSucces(""), 4000);
  };

  const handleVoirDossier = async (userId) => {
    try {
      const data = await adminService.getDossierDetail(userId);
      setSelectedDossier(data); setSelectedUserId(userId);
      setCommentaire(""); setRejectError("");
    } catch { /* silently fail */ }
  };

  const handleValiderDoc = async (docId) => {
    await adminService.validerDocument(docId, commentaire);
    handleVoirDossier(selectedUserId); dispatch(fetchDashboard()); dispatch(fetchDossiers());
  };

  const handleRejeterDoc = async (docId) => {
    if (!commentaire.trim()) { setRejectError("Le commentaire est obligatoire pour rejeter un document."); return; }
    setRejectError("");
    await adminService.rejeterDocument(docId, commentaire);
    handleVoirDossier(selectedUserId); dispatch(fetchDashboard()); dispatch(fetchDossiers());
  };

  const handleValiderPaiement = async (paiementId) => {
    await adminService.validerPaiement(paiementId);
    adminService.getPaiements().then(setPaiements);
    dispatch(fetchDashboard()); dispatch(fetchDossiers());
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

  const filteredDossiers = dossiers.filter((d) => {
    const q = searchQuery.toLowerCase();
    return !q || d.prenom.toLowerCase().includes(q) || d.nom.toLowerCase().includes(q) || d.etablissement?.toLowerCase().includes(q);
  });

  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("hrskills_tour_admin")) setShowOnboarding(true);
  }, []);

  const onboardingSteps = useMemo(() => [
    {
      target: null,
      icon: "welcome",
      title: "Bienvenue, administrateur !",
      desc: "Voici votre tableau de bord de gestion. Nous allons vous présenter les principales fonctionnalités en quelques étapes.",
    },
    {
      target: "ob-admin-sidebar",
      position: "right",
      title: "Navigation admin",
      desc: "Ce menu vous donne accès à toutes les sections de gestion : dossiers stagiaires, préinscriptions, paiements et messagerie.",
    },
    {
      target: "ob-admin-stats",
      position: "bottom",
      title: "Statistiques globales",
      desc: "Vue d'ensemble en temps réel : nombre de stagiaires, dossiers en attente, validations de paiements et de préinscriptions.",
      action: () => setActiveMenu("dashboard"),
    },
    {
      target: "ob-admin-nav-dossiers",
      position: "right",
      title: "Gestion des dossiers",
      desc: "Consultez, validez ou rejetez les documents de chaque stagiaire. Un dossier complet comporte 4 documents validés.",
    },
    {
      target: "ob-admin-nav-preinscriptions",
      position: "right",
      title: "Préinscriptions",
      desc: "Validez ou rejetez les demandes de pré-inscription. Une validation débloque l'accès au paiement des frais de stage.",
    },
    {
      target: "ob-admin-nav-paiements",
      position: "right",
      title: "Validation des paiements",
      desc: "Confirmez les paiements Mobile Money reçus. Chaque paiement indique le montant, l'opérateur et le numéro de téléphone.",
    },
    {
      target: "ob-admin-nav-messages",
      position: "right",
      title: "Messagerie",
      desc: "Envoyez des annonces et communications à l'ensemble des stagiaires ou à des destinataires ciblés.",
    },
    {
      target: null,
      icon: "done",
      title: "Tableau de bord prêt !",
      desc: "Vous maîtrisez maintenant l'essentiel. Commencez par vérifier les dossiers en attente de validation.",
      action: () => setActiveMenu("dashboard"),
    },
  ], [setActiveMenu]);

  const pageTitle = {
    dashboard: "Tableau de bord",
    dossiers: "Gestion des dossiers",
    paiements: "Gestion des paiements",
    preinscriptions: "Gestion des préinscriptions",
    messages: "Messages",
  }[activeMenu];

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: "1.5px solid #e5e7eb", fontSize: "14px", outline: "none",
    background: "#fff", color: "#1e293b", boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        input::placeholder, textarea::placeholder { color: #9ca3af; }
        .adm-tr:hover td { background: #faf5ff !important; }
      `}</style>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside
        id="ob-admin-sidebar"
        className={`app-sidebar${sidebarOpen ? " sidebar-open" : ""}`}
        style={{
          position: "fixed", left: 0, top: 0, bottom: 0, width: "248px",
          background: "linear-gradient(180deg, #0f0b2a 0%, #1e1b4b 40%, #312e81 100%)",
          display: "flex", flexDirection: "column", zIndex: 100,
          transition: "transform 0.25s ease",
          boxShadow: "4px 0 24px rgba(15,11,42,0.25)",
        }}
      >
        <div style={{ padding: "1.75rem 1.5rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/images/logo.jpeg" alt="Logo" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.2)" }} />
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "14px", color: "#fff", lineHeight: "1.2" }}>HR Skills SARL</div>
                <div style={{ fontSize: "10px", color: "#a78bfa", fontWeight: "500", letterSpacing: "0.05em" }}>Administration</div>
              </div>
            </div>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: "#fff", padding: "5px", borderRadius: "8px", display: "flex" }}>
              <FiX size={18} />
            </button>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0.75rem", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <div
                key={item.id}
                id={`ob-admin-nav-${item.id}`}
                onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "10px", cursor: "pointer",
                  background: isActive ? "rgba(167,139,250,0.2)" : "transparent",
                  color: isActive ? "#c4b5fd" : "rgba(255,255,255,0.6)",
                  fontSize: "14px", fontWeight: isActive ? "600" : "400",
                  marginBottom: "3px", transition: "all 0.18s ease",
                  borderLeft: isActive ? "3px solid #a78bfa" : "3px solid transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; } }}
              >
                {item.icon} {item.label}
              </div>
            );
          })}
        </nav>

        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(167,139,250,0.12)", marginBottom: "8px" }}>
            <div style={{ fontSize: "11px", color: "#a78bfa", marginBottom: "2px" }}>Connecté en tant que</div>
            <div style={{ fontSize: "13px", color: "#fff", fontWeight: "600" }}>Administrateur</div>
          </div>
          <button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "14px", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          >
            <FiLogOut size={17} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ── CONTENU ── */}
      <main className="app-main" style={{ marginLeft: "248px", padding: "2rem", minHeight: "100vh" }}>

        {/* TOPBAR MOBILE */}
        <div className="dashboard-mobile-header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 97, background: "#fff", borderBottom: "1px solid #ede9fe", height: "60px", padding: "0 1rem", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 16px rgba(15,11,42,0.08)" }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#312e81", padding: "6px", borderRadius: "8px", display: "flex" }}>
            <FiMenu size={22} />
          </button>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "15px", color: "#312e81" }}>{pageTitle}</span>
          <div style={{ width: "34px" }} />
        </div>

        {/* PAGE HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>{pageTitle}</h1>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "3px 0 0" }}>
              {activeMenu === "dashboard" && "Vue globale des performances et des dossiers en cours"}
              {activeMenu === "dossiers" && `${dossiers.length} stagiaire(s) enregistré(s)`}
              {activeMenu === "paiements" && `${paiements.length} paiement(s) trouvé(s)`}
              {activeMenu === "preinscriptions" && `${preinscriptions.length} préinscription(s) trouvée(s)`}
              {activeMenu === "messages" && "Communication avec les stagiaires"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #312e81, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: "800" }}>A</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>Administrateur</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>HR Skills SARL</div>
            </div>
          </div>
        </div>

        {/* ══ DASHBOARD ══ */}
        {activeMenu === "dashboard" && (
          <>
            <div id="ob-admin-stats" className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {dashboard ? [
                { icon: <FiUsers size={21} />,       label: "Total stagiaires",            value: dashboard.total_stagiaires,                   color: "#7c3aed", bg: "#f5f3ff" },
                { icon: <FiClock size={21} />,        label: "Dossiers en attente",         value: dashboard.dossiers_en_attente,                 color: "#f59e0b", bg: "#fffbeb" },
                { icon: <FiCheckCircle size={21} />,  label: "Dossiers validés",            value: dashboard.dossiers_valides,                    color: "#10b981", bg: "#f0fdf4" },
                { icon: <FiCreditCard size={21} />,   label: "Paiements validés",           value: dashboard.total_paiements_valides,             color: "#0ea5e9", bg: "#f0f9ff" },
                { icon: <FiUserCheck size={21} />,    label: "Préinscriptions validées",    value: dashboard.total_preinscriptions_valides ?? 0,  color: "#10b981", bg: "#f0fdf4" },
                { icon: <FiClock size={21} />,        label: "Préinscriptions en attente",  value: dashboard.total_preinscriptions_en_attente ?? 0, color: "#f59e0b", bg: "#fffbeb" },
              ].map((s) => <StatCard key={s.label} {...s} />) : (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "2rem", color: "#94a3b8" }}>Chargement des statistiques…</div>
              )}
            </div>

            {/* Table résumé */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Derniers dossiers</h3>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>5 dossiers les plus récents</div>
                </div>
                <button onClick={() => setActiveMenu("dossiers")} style={{ fontSize: "13px", color: "#7c3aed", background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontWeight: "600" }}>
                  Voir tous →
                </button>
              </div>
              <div className="adm-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <TableHeaderRow cols={["Stagiaire", "Établissement", "Documents", "Pré-inscription", "Paiement", "Action"]} />
                  </thead>
                  <tbody>
                    {dossiers.slice(0, 5).map((d) => (
                      <tr key={d.user_id} className="adm-tr">
                        <td style={{ padding: "13px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #312e81, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "800", flexShrink: 0 }}>
                              {d.prenom?.[0]}
                            </div>
                            <div>
                              <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b" }}>{d.prenom} {d.nom}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "13px 14px", fontSize: "13px", color: "#64748b" }}>{d.etablissement}</td>
                        <td style={{ padding: "13px 14px" }}>
                          <span style={{ fontSize: "13px", fontWeight: "600", color: d.documents_valides === d.documents_total && d.documents_total > 0 ? "#10b981" : "#f59e0b" }}>
                            {d.documents_valides}/{d.documents_total}
                          </span>
                        </td>
                        <td style={{ padding: "13px 14px" }}><StatusBadge statut={d.preinscription_statut} /></td>
                        <td style={{ padding: "13px 14px" }}><StatusBadge statut={d.paiement_statut} /></td>
                        <td style={{ padding: "13px 14px" }}>
                          <button
                            onClick={() => { handleVoirDossier(d.user_id); setActiveMenu("dossiers"); }}
                            style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 12px", borderRadius: "7px", border: "1px solid #c4b5fd", background: "#fff", color: "#7c3aed", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f3ff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                          >
                            <FiEye size={12} /> Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══ DOSSIERS ══ */}
        {activeMenu === "dossiers" && (
          <div className="dossier-grid" style={{ display: "grid", gridTemplateColumns: selectedDossier ? "320px 1fr" : "1fr", gap: "1.5rem", alignItems: "flex-start" }}>

            {/* Liste */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f3f4f6" }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 12px" }}>
                  Stagiaires <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "400" }}>({filteredDossiers.length}{searchQuery ? `/${dossiers.length}` : ""})</span>
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "9px", padding: "9px 12px" }}>
                  <FiSearch size={14} style={{ color: "#9ca3af", flexShrink: 0 }} />
                  <input
                    placeholder="Rechercher un stagiaire…"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: "none", outline: "none", background: "transparent", fontSize: "13px", color: "#1e293b", width: "100%", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>
              <div style={{ maxHeight: "calc(100vh - 240px)", overflowY: "auto" }}>
                {filteredDossiers.length === 0 && searchQuery && (
                  <div style={{ padding: "2.5rem", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>Aucun résultat pour "{searchQuery}"</div>
                )}
                {filteredDossiers.map((d) => {
                  const isSelected = selectedUserId === d.user_id;
                  return (
                    <div
                      key={d.user_id}
                      onClick={() => handleVoirDossier(d.user_id)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 16px", cursor: "pointer",
                        borderBottom: "1px solid #f9fafb",
                        background: isSelected ? "#faf5ff" : "transparent",
                        borderLeft: `3px solid ${isSelected ? "#7c3aed" : "transparent"}`,
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#fafafa"; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: isSelected ? "linear-gradient(135deg, #312e81, #7c3aed)" : "linear-gradient(135deg, #c4b5fd, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "13px", flexShrink: 0 }}>
                          {d.prenom?.[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b" }}>{d.prenom} {d.nom}</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {d.etablissement} · <span style={{ color: d.documents_valides === d.documents_total && d.documents_total > 0 ? "#10b981" : "#f59e0b", fontWeight: "600" }}>{d.documents_valides}/{d.documents_total}</span>
                          </div>
                        </div>
                      </div>
                      <FiEye size={14} style={{ color: isSelected ? "#7c3aed" : "#d1d5db", flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Détail dossier */}
            {selectedDossier && (
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", animation: "fadeIn 0.2s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f3f4f6", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)" }}>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                      {selectedDossier.prenom} {selectedDossier.nom}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                      {selectedDossier.etablissement} · {selectedDossier.filiere}
                    </div>
                  </div>
                  <button onClick={() => { setSelectedDossier(null); setSelectedUserId(null); setRejectError(""); }} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #c4b5fd", cursor: "pointer", color: "#4c1d95", borderRadius: "8px", padding: "6px", display: "flex" }}>
                    <FiX size={16} />
                  </button>
                </div>

                <div style={{ padding: "1.5rem", maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>

                  {/* Commentaire */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Commentaire de validation / rejet
                    </label>
                    <input
                      placeholder="Ajoutez un commentaire (obligatoire pour rejeter)…"
                      value={commentaire} onChange={(e) => { setCommentaire(e.target.value); setRejectError(""); }}
                      style={{ ...inputStyle, background: "#faf9ff" }}
                      onFocus={(e) => e.target.style.borderColor = "#7c3aed"}
                      onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                    />
                    {rejectError && (
                      <div style={{ marginTop: "6px", fontSize: "12px", color: "#dc2626", display: "flex", gap: "5px", alignItems: "center" }}>
                        <FiAlertCircle size={12} /> {rejectError}
                      </div>
                    )}
                  </div>

                  {/* Documents */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#312e81", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                      Documents soumis
                    </div>
                    {selectedDossier.documents && selectedDossier.documents.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {selectedDossier.documents.map((doc) => {
                          const fileUrl = `${API_BASE_URL}/${doc.url_fichier}`;
                          return (
                            <div key={doc.id} style={{ borderRadius: "12px", border: "1px solid #f0eefe", background: "#faf9ff", overflow: "hidden" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <FiFileText size={14} style={{ color: "#7c3aed" }} />
                                  </div>
                                  <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                      {doc.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </div>
                                    {doc.nom_fichier && <div style={{ fontSize: "11px", color: "#94a3b8" }}>{doc.nom_fichier}</div>}
                                  </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                  <a href={fileUrl} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: "600", color: "#0ea5e9", textDecoration: "none", padding: "4px 10px", borderRadius: "7px", border: "1px solid #bae6fd", background: "#f0f9ff", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "#e0f2fe"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "#f0f9ff"}
                                  >
                                    <FiExternalLink size={11} /> Voir
                                  </a>
                                  <StatusBadge statut={doc.statut} />
                                </div>
                              </div>
                              {doc.statut === "en_attente" && (
                                <div style={{ display: "flex", gap: "8px", padding: "0 14px 12px" }}>
                                  <button onClick={() => handleValiderDoc(doc.id)} style={{ flex: 1, padding: "7px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "#dcfce7"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "#f0fdf4"}
                                  >
                                    <FiCheckCircle size={12} /> Valider
                                  </button>
                                  <button onClick={() => handleRejeterDoc(doc.id)} style={{ flex: 1, padding: "7px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "#fee2e2"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "#fef2f2"}
                                  >
                                    <FiX size={12} /> Rejeter
                                  </button>
                                </div>
                              )}
                              {doc.commentaire && (
                                <div style={{ padding: "8px 14px 12px", fontSize: "12px", color: "#64748b", borderTop: "1px solid #f3f4f6", lineHeight: "1.5" }}>
                                  💬 {doc.commentaire}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ padding: "2rem", textAlign: "center", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #e5e7eb", color: "#94a3b8", fontSize: "14px" }}>
                        Aucun document soumis par ce stagiaire
                      </div>
                    )}
                  </div>

                  {/* Paiement */}
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#312e81", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                      Paiement des frais
                    </div>
                    {selectedDossier.paiement ? (
                      <div style={{ borderRadius: "12px", border: "1px solid #f0eefe", background: "#faf9ff", padding: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <div>
                            <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", fontFamily: "'Poppins', sans-serif" }}>{selectedDossier.paiement.montant} XAF</div>
                            <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" }}>Réf : {selectedDossier.paiement.reference_interne}</div>
                          </div>
                          <StatusBadge statut={selectedDossier.paiement.statut} />
                        </div>
                        {selectedDossier.paiement.operateur && (
                          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
                            {selectedDossier.paiement.operateur} · {selectedDossier.paiement.telephone}
                          </div>
                        )}
                        {selectedDossier.paiement.statut === "en_attente" && (
                          <button
                            onClick={() => handleValiderPaiement(selectedDossier.paiement.id)}
                            style={{ width: "100%", padding: "10px", borderRadius: "9px", background: "linear-gradient(135deg, #065f46, #10b981)", border: "none", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}
                          >
                            <FiCheckCircle size={14} /> Valider le paiement
                          </button>
                        )}
                      </div>
                    ) : (
                      <div style={{ padding: "1.5rem", textAlign: "center", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #e5e7eb", color: "#94a3b8", fontSize: "14px" }}>
                        Aucun paiement initié
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ PRÉINSCRIPTIONS ══ */}
        {activeMenu === "preinscriptions" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                Toutes les préinscriptions <span style={{ fontSize: "13px", fontWeight: "400", color: "#94a3b8" }}>({preinscriptions.length})</span>
              </h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <Badge text={`✅ ${preinscriptions.filter((p) => p.statut === "valide").length} validées`} color="#065f46" bg="#f0fdf4" border="#bbf7d0" />
                <Badge text={`⏳ ${preinscriptions.filter((p) => p.statut === "en_attente").length} en attente`} color="#92400e" bg="#fffbeb" border="#fde68a" />
              </div>
            </div>
            <div className="adm-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <TableHeaderRow cols={["Référence", "Montant", "Opérateur", "Téléphone", "Statut", "Date", "Actions"]} />
                </thead>
                <tbody>
                  {preinscriptions.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                        Aucune préinscription enregistrée
                      </td>
                    </tr>
                  ) : preinscriptions.map((p) => (
                    <tr key={p.id} className="adm-tr">
                      <td style={{ padding: "13px 14px", fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>{p.reference_interne}</td>
                      <td style={{ padding: "13px 14px", fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{p.montant} XAF</td>
                      <td style={{ padding: "13px 14px", fontSize: "13px", color: "#64748b" }}>{p.operateur || "—"}</td>
                      <td style={{ padding: "13px 14px", fontSize: "13px", color: "#64748b" }}>{p.telephone || "—"}</td>
                      <td style={{ padding: "13px 14px" }}><StatusBadge statut={p.statut} /></td>
                      <td style={{ padding: "13px 14px", fontSize: "12px", color: "#94a3b8" }}>
                        {p.created_at ? new Date(p.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </td>
                      <td style={{ padding: "13px 14px" }}>
                        {p.statut === "en_attente" && (
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => handleValiderPreinscription(p.id)} style={{ padding: "5px 12px", borderRadius: "7px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "#dcfce7"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "#f0fdf4"}
                            >
                              ✓ Valider
                            </button>
                            <button onClick={() => handleRejeterPreinscription(p.id)} style={{ padding: "5px 12px", borderRadius: "7px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "#fee2e2"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "#fef2f2"}
                            >
                              ✗ Rejeter
                            </button>
                          </div>
                        )}
                        {p.statut === "valide" && <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "600" }}>Validée</span>}
                        {p.statut === "rejete" && <span style={{ fontSize: "12px", color: "#ef4444", fontWeight: "600" }}>Rejetée</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ PAIEMENTS ══ */}
        {activeMenu === "paiements" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                Tous les paiements <span style={{ fontSize: "13px", fontWeight: "400", color: "#94a3b8" }}>({paiements.length})</span>
              </h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <Badge text={`✅ ${paiements.filter((p) => p.statut === "valide").length} validés`} color="#065f46" bg="#f0fdf4" border="#bbf7d0" />
                <Badge text={`⏳ ${paiements.filter((p) => p.statut === "en_attente").length} en attente`} color="#92400e" bg="#fffbeb" border="#fde68a" />
              </div>
            </div>
            <div className="adm-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <TableHeaderRow cols={["Référence", "Montant", "Opérateur", "Téléphone", "Statut", "Action"]} />
                </thead>
                <tbody>
                  {paiements.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Aucun paiement enregistré</td>
                    </tr>
                  ) : paiements.map((p) => (
                    <tr key={p.id} className="adm-tr">
                      <td style={{ padding: "13px 14px", fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>{p.reference_interne}</td>
                      <td style={{ padding: "13px 14px", fontSize: "15px", fontWeight: "800", color: "#0f172a", fontFamily: "'Poppins', sans-serif" }}>{p.montant} XAF</td>
                      <td style={{ padding: "13px 14px", fontSize: "13px", color: "#64748b" }}>{p.operateur || "—"}</td>
                      <td style={{ padding: "13px 14px", fontSize: "13px", color: "#64748b" }}>{p.telephone || "—"}</td>
                      <td style={{ padding: "13px 14px" }}><StatusBadge statut={p.statut} /></td>
                      <td style={{ padding: "13px 14px" }}>
                        {p.statut === "en_attente" && (
                          <button
                            onClick={() => handleValiderPaiement(p.id)}
                            style={{ padding: "6px 14px", borderRadius: "8px", background: "linear-gradient(135deg, #065f46, #10b981)", border: "none", color: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s", boxShadow: "0 3px 8px rgba(16,185,129,0.25)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 12px rgba(16,185,129,0.3)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 3px 8px rgba(16,185,129,0.25)"; }}
                          >
                            <FiCheckCircle size={12} /> Valider
                          </button>
                        )}
                        {p.statut === "valide" && <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "600" }}>Validé</span>}
                        {(p.statut === "echoue" || p.statut === "rejete") && <span style={{ fontSize: "12px", color: "#ef4444", fontWeight: "600" }}>Échoué</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ MESSAGES ══ */}
        {activeMenu === "messages" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(320px, 1fr) 1.4fr", gap: "1.5rem", alignItems: "flex-start" }}>

            {/* Formulaire */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", padding: "1.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 1.5rem" }}>
                Envoyer un message
              </h3>
              <form onSubmit={handleEnvoyerMessage} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {/* Destinataire */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Destinataire</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {[
                      { value: "all", label: "Tous", icon: <FiGlobe size={13} /> },
                      { value: "",    label: "Spécifique", icon: <FiUsers size={13} /> },
                    ].map((opt) => {
                      const active = opt.value === "all" ? msgForm.destinataire === "all" : msgForm.destinataire !== "all";
                      return (
                        <button key={opt.value} type="button" onClick={() => setMsgForm({ ...msgForm, destinataire: opt.value })}
                          style={{ padding: "11px 8px", borderRadius: "10px", cursor: "pointer", textAlign: "center", border: `2px solid ${active ? "#7c3aed" : "#e5e7eb"}`, background: active ? "#f5f3ff" : "#fff", color: active ? "#7c3aed" : "#9ca3af", fontWeight: "700", fontSize: "13px", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "'Inter', sans-serif" }}
                        >
                          {opt.icon} {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {msgForm.destinataire !== "all" && (
                    <select
                      value={msgForm.destinataire} onChange={(e) => setMsgForm({ ...msgForm, destinataire: e.target.value })} required
                      style={{ ...inputStyle, marginTop: "10px", cursor: "pointer" }}
                    >
                      <option value="">— Choisir un stagiaire —</option>
                      {dossiers.map((d) => (
                        <option key={d.user_id} value={String(d.user_id)}>{d.prenom} {d.nom} — {d.etablissement}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Sujet */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Sujet</label>
                  <input required placeholder="Objet du message" value={msgForm.sujet} onChange={(e) => setMsgForm({ ...msgForm, sujet: e.target.value })} style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = "#7c3aed"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>

                {/* Contenu */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Message</label>
                  <textarea required rows={5} placeholder="Rédigez votre message ici…" value={msgForm.contenu} onChange={(e) => setMsgForm({ ...msgForm, contenu: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
                    onFocus={(e) => e.target.style.borderColor = "#7c3aed"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>

                {msgSucces && (
                  <div style={{ padding: "11px 14px", borderRadius: "9px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#065f46", fontSize: "13px", fontWeight: "500" }}>
                    ✅ {msgSucces}
                  </div>
                )}

                <button type="submit" disabled={msgLoading}
                  style={{ padding: "13px", borderRadius: "10px", background: "linear-gradient(135deg, #312e81, #7c3aed)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: msgLoading ? "not-allowed" : "pointer", opacity: msgLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 6px 18px rgba(124,58,237,0.3)", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { if (!msgLoading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(124,58,237,0.38)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(124,58,237,0.3)"; }}
                >
                  <FiSend size={15} />
                  {msgLoading ? "Envoi en cours…" : msgForm.destinataire === "all" ? "Envoyer à tous les stagiaires" : "Envoyer au stagiaire"}
                </button>
              </form>
            </div>

            {/* Messages envoyés */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f3f4f6" }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  Historique des messages <span style={{ fontSize: "13px", fontWeight: "400", color: "#94a3b8" }}>({messagesEnvoyes.length})</span>
                </h3>
              </div>
              {messagesEnvoyes.length === 0 ? (
                <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                  <FiMessageSquare size={36} style={{ color: "#c4b5fd", marginBottom: "1rem", display: "block", margin: "0 auto 1rem" }} />
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>Aucun message envoyé</div>
                  <div style={{ fontSize: "13px", color: "#94a3b8" }}>Les messages que vous enverrez apparaîtront ici.</div>
                </div>
              ) : (
                <div style={{ maxHeight: "520px", overflowY: "auto" }}>
                  {messagesEnvoyes.map((msg) => {
                    const destDossier = dossiers.find((d) => String(d.user_id) === String(msg.destinataire));
                    const destinataireLabel = msg.destinataire === "all"
                      ? "Tous les stagiaires"
                      : destDossier ? `${destDossier.prenom} ${destDossier.nom}` : `Stagiaire #${msg.destinataire}`;
                    const isAll = msg.destinataire === "all";
                    return (
                      <div key={msg.id} style={{ padding: "1.1rem 1.5rem", borderBottom: "1px solid #f9fafb" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "6px" }}>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "13px", color: "#0f172a", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {msg.sujet}
                          </span>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "99px", fontWeight: "600", background: isAll ? "#f5f3ff" : "#f0f9ff", color: isAll ? "#7c3aed" : "#0ea5e9", border: `1px solid ${isAll ? "#c4b5fd" : "#bae6fd"}` }}>
                              {isAll ? <FiGlobe size={9} style={{ marginRight: "3px" }} /> : null}
                              {destinataireLabel}
                            </span>
                            <span style={{ fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap" }}>
                              {new Date(msg.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                            </span>
                          </div>
                        </div>
                        <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
                          {msg.contenu.length > 140 ? `${msg.contenu.slice(0, 140)}…` : msg.contenu}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {showOnboarding && (
        <OnboardingTour
          steps={onboardingSteps}
          storageKey="hrskills_tour_admin"
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}
