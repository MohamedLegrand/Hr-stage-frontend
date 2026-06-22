import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import OnboardingTour from "../onboarding/OnboardingTour";
import { fetchProfil } from "./stagiaireSlice";
import { fetchDocuments } from "../documents/documentsSlice";
import { fetchStatutPaiement, initierPaiement } from "../paiement/paiementSlice";
import { fetchStatutPreinscription, initierPreinscription } from "../preinscription/preinscriptionSlice";
import { fetchMesMessages } from "../messages/messagesSlice";
import messagesService from "../messages/messagesService";
import documentsService from "../documents/documentsService";
import paiementService from "../paiement/paiementService";
import preinscriptionService from "../preinscription/preinscriptionService";
import {
  FiFileText, FiCreditCard, FiCheckCircle, FiLogOut, FiUser, FiClock,
  FiUpload, FiX, FiUserCheck, FiBell, FiMessageSquare, FiChevronRight,
  FiMenu, FiHome, FiAlertCircle,
} from "react-icons/fi";

const DOC_TYPES = [
  { value: "lettre_demande_stage",  label: "Lettre de demande de stage" },
  { value: "cv",                    label: "Curriculum Vitae" },
  { value: "certificat_scolarite",  label: "Certificat de scolarité" },
  { value: "cni_ou_recepice",       label: "CNI ou récépissé" },
];

const OPERATEURS = [
  { value: "MTN",    label: "MTN Money",    color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { value: "ORANGE", label: "Orange Money", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
];

const NAV_ITEMS = [
  { id: "dashboard", icon: <FiHome size={17} />,         label: "Tableau de bord" },
  { id: "profil",    icon: <FiUser size={17} />,         label: "Mon profil" },
  { id: "documents", icon: <FiFileText size={17} />,     label: "Mes documents" },
  { id: "paiement",  icon: <FiCreditCard size={17} />,   label: "Paiement" },
  { id: "messages",  icon: <FiMessageSquare size={17} />, label: "Messages" },
];

// ── Utilitaires ──────────────────────────────────────────────────────────────

function Badge({ text, color, bg, border }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center",
        fontSize: "11px", fontWeight: "600",
        padding: "3px 10px", borderRadius: "99px",
        color, background: bg,
        border: `1px solid ${border || bg}`,
      }}
    >
      {text}
    </span>
  );
}

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div
      style={{
        background: "#fff", borderRadius: "14px",
        border: "1px solid #f0eefe",
        padding: "1.25rem 1.5rem",
        display: "flex", alignItems: "center", gap: "1rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px ${color}14`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div
        style={{
          width: "48px", height: "48px", borderRadius: "12px",
          background: bg, display: "flex", alignItems: "center",
          justifyContent: "center", color, flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px", fontWeight: "500" }}>{label}</div>
        <div style={{ fontSize: "17px", fontWeight: "700", color: "#1e293b" }}>{value}</div>
      </div>
    </div>
  );
}

function MobileModal({ title, subtitle, onClose, children }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", zIndex: 200, backdropFilter: "blur(4px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "#fff", borderRadius: "20px",
          width: "100%", maxWidth: "440px",
          maxHeight: "calc(100vh - 2rem)", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(15,23,42,0.18)",
        }}
      >
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "1.5rem 1.5rem 0",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "17px", fontWeight: "700", color: "#0f172a" }}>{title}</div>
            {subtitle && <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f8fafc", border: "none", cursor: "pointer",
              color: "#64748b", borderRadius: "8px", padding: "6px", display: "flex",
            }}
          >
            <FiX size={18} />
          </button>
        </div>
        <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>{children}</div>
      </div>
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profil } = useSelector((s) => s.stagiaire);
  const { liste: documents } = useSelector((s) => s.documents);
  const { paiement, loading: paiementLoading } = useSelector((s) => s.paiement);
  const { preinscription, loading: preinscriptionLoading, error: preinscriptionError } = useSelector((s) => s.preinscription);
  const { liste: messages } = useSelector((s) => s.messages);

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showPaiement, setShowPaiement] = useState(false);
  const [showPreinscription, setShowPreinscription] = useState(false);
  const [showPaiementTotal, setShowPaiementTotal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [uploadFiles, setUploadFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [paiementForm, setPaiementForm] = useState({ telephone: "", operateur: "MTN" });
  const [preinscriptionForm, setPreinscriptionForm] = useState({ telephone: "", operateur: "MTN" });
  const [paiementTotalForm, setPaiementTotalForm] = useState({ telephone: "", operateur: "MTN" });
  const [totalLoading, setTotalLoading] = useState(false);
  const [totalError, setTotalError] = useState("");
  const [lus, setLus] = useState([]);
  const [pollingPreinscription, setPollingPreinscription] = useState(false);
  const [pollingPaiement, setPollingPaiement] = useState(false);
  const preinscriptionPollRef = useRef(null);
  const paiementPollRef = useRef(null);
  const [refPreinscription, setRefPreinscription] = useState(null);
  const [refPaiement, setRefPaiement] = useState(null);
  const [simLoadingPreinscription, setSimLoadingPreinscription] = useState(false);
  const [simLoadingPaiement, setSimLoadingPaiement] = useState(false);

  const startPollingPreinscription = useCallback(() => {
    if (preinscriptionPollRef.current) return;
    setPollingPreinscription(true);
    preinscriptionPollRef.current = setInterval(async () => {
      try {
        const result = await dispatch(fetchStatutPreinscription());
        const data = result.payload;
        if (!data) return;
        if (data.statut === "valide" || data.statut === "echoue" || data.statut === "rembourse") {
          clearInterval(preinscriptionPollRef.current);
          preinscriptionPollRef.current = null;
          setPollingPreinscription(false);
        }
      } catch { /* réseau → continuer silencieusement */ }
    }, 3000);
    setTimeout(() => {
      if (preinscriptionPollRef.current) {
        clearInterval(preinscriptionPollRef.current);
        preinscriptionPollRef.current = null;
        setPollingPreinscription(false);
      }
    }, 10 * 60 * 1000);
  }, [dispatch]);

  const startPollingPaiement = useCallback(() => {
    if (paiementPollRef.current) return;
    setPollingPaiement(true);
    paiementPollRef.current = setInterval(async () => {
      try {
        const result = await dispatch(fetchStatutPaiement());
        const data = result.payload;
        if (!data) return;
        if (data.statut === "valide" || data.statut === "echoue") {
          clearInterval(paiementPollRef.current);
          paiementPollRef.current = null;
          setPollingPaiement(false);
        }
      } catch { /* réseau → continuer silencieusement */ }
    }, 3000);
    setTimeout(() => {
      if (paiementPollRef.current) {
        clearInterval(paiementPollRef.current);
        paiementPollRef.current = null;
        setPollingPaiement(false);
      }
    }, 10 * 60 * 1000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfil());
    dispatch(fetchDocuments());
    dispatch(fetchStatutPaiement());
    dispatch(fetchStatutPreinscription());
  }, []);

  useEffect(() => {
    if (profil?.id) {
      dispatch(fetchMesMessages(profil.id));
      setLus(messagesService.getLus(profil.id));
    }
  }, [profil?.id]);

  // Auto-polling si un paiement en attente est détecté au chargement
  useEffect(() => {
    if (preinscription?.statut === "en_attente" && !preinscriptionPollRef.current) {
      startPollingPreinscription();
    }
  }, [preinscription?.statut, startPollingPreinscription]);

  useEffect(() => {
    if (paiement?.statut === "en_attente" && !paiementPollRef.current) {
      startPollingPaiement();
    }
  }, [paiement?.statut, startPollingPaiement]);

  // Cleanup des intervals au démontage du composant
  useEffect(() => {
    return () => {
      if (preinscriptionPollRef.current) clearInterval(preinscriptionPollRef.current);
      if (paiementPollRef.current) clearInterval(paiementPollRef.current);
    };
  }, []);

  const notifications = useMemo(() => {
    const notifs = [];
    if (paiement) {
      const label = paiement.statut === "valide" ? "Frais de stage validés" : paiement.statut === "echoue" ? "Paiement de stage échoué" : "Paiement de stage en attente";
      notifs.push({ id: `pay-${paiement.statut}`, type: "paiement", texte: label, date: paiement.paye_le || paiement.created_at });
    }
    if (preinscription) {
      const label = preinscription.statut === "valide" ? "Pré-inscription validée" : preinscription.statut === "rejete" ? "Pré-inscription rejetée" : "Pré-inscription en attente";
      notifs.push({ id: `preinsc-${preinscription.statut}`, type: "preinscription", texte: label, date: preinscription.paye_le || preinscription.created_at });
    }
    documents.forEach((doc) => {
      if (doc.statut === "valide") notifs.push({ id: `doc-v-${doc.id}`, type: "document", texte: `Document validé : ${doc.type?.replace(/_/g, " ")}`, date: doc.updated_at });
      if (doc.statut === "rejete") notifs.push({ id: `doc-r-${doc.id}`, type: "document", texte: `Document rejeté : ${doc.type?.replace(/_/g, " ")}`, date: doc.updated_at });
    });
    messages.forEach((m) => notifs.push({ id: `msg-${m.id}`, type: "message", texte: m.sujet, date: m.date }));
    return notifs;
  }, [paiement, preinscription, documents, messages]);

  const notifsNonLues = notifications.filter((n) => !lus.includes(n.id)).length;
  const docsValides = documents.filter((d) => d.statut === "valide").length;

  const getDocStatut = (type) => {
    const doc = documents.find((d) => d.type === type);
    if (!doc) return { text: "Non soumis", color: "#94a3b8", bg: "#f8fafc", border: "#e5e7eb" };
    if (doc.statut === "valide") return { text: "Validé", color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" };
    if (doc.statut === "rejete") return { text: "Rejeté", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
    return { text: "En attente", color: "#d97706", bg: "#fffbeb", border: "#fde68a" };
  };

  const statutBadge = (statut) => {
    if (!statut) return { text: "Non initié", color: "#92400e", bg: "#fffbeb", border: "#fde68a" };
    if (statut === "valide") return { text: "Validé", color: "#065f46", bg: "#f0fdf4", border: "#bbf7d0" };
    if (statut === "rejete" || statut === "echoue") return { text: statut === "rejete" ? "Rejeté" : "Échoué", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
    return { text: "En attente", color: "#92400e", bg: "#fffbeb", border: "#fde68a" };
  };

  const handleLogout = () => { dispatch(logout()); navigate("/login"); };

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = DOC_TYPES.filter((d) => uploadFiles[d.value]).map((d) => ({ type: d.value, file: uploadFiles[d.value] }));
    if (files.length === 0) { setUploadError("Sélectionnez au moins un document."); return; }
    setUploading(true); setUploadError("");
    try {
      await documentsService.uploadDocuments(files);
      dispatch(fetchDocuments());
      setShowUpload(false); setUploadFiles({});
    } catch (err) {
      setUploadError(err.response?.data?.detail || err.message || "Erreur lors de l'upload");
    } finally { setUploading(false); }
  };

  const handlePaiement = async (e) => {
    e.preventDefault();
    const result = await dispatch(initierPaiement(paiementForm));
    if (result.payload?.reference_interne) {
      setRefPaiement(result.payload.reference_interne);
      setShowPaiement(false);
      startPollingPaiement();
    }
  };

  const handlePreinscription = async (e) => {
    e.preventDefault();
    const result = await dispatch(initierPreinscription(preinscriptionForm));
    if (result.payload?.reference_interne) {
      setRefPreinscription(result.payload.reference_interne);
      setShowPreinscription(false);
      startPollingPreinscription();
    }
  };

  const handlePaiementTotal = async (e) => {
    e.preventDefault();
    setTotalLoading(true); setTotalError("");
    let preinscriptionOk = false;
    try {
      const r1 = await dispatch(initierPreinscription(paiementTotalForm)).unwrap();
      preinscriptionOk = true;
      if (r1?.reference_interne) setRefPreinscription(r1.reference_interne);
      startPollingPreinscription();
      const r2 = await dispatch(initierPaiement(paiementTotalForm)).unwrap();
      if (r2?.reference_interne) setRefPaiement(r2.reference_interne);
      startPollingPaiement();
      setShowPaiementTotal(false);
    } catch {
      setTotalError(preinscriptionOk
        ? "La pré-inscription a été initiée. Le paiement des frais a échoué — payez-le séparément."
        : "Impossible d'initier la pré-inscription. Veuillez réessayer."
      );
      if (!preinscriptionOk) dispatch(fetchStatutPreinscription());
      dispatch(fetchStatutPaiement());
    } finally { setTotalLoading(false); }
  };

  const handleSimulerPreinscription = async () => {
    const ref = refPreinscription || preinscription?.reference_interne;
    if (!ref || simLoadingPreinscription) return;
    setSimLoadingPreinscription(true);
    try {
      await preinscriptionService.simulerSucces(ref);
    } catch { /* le polling verra le changement de statut */ } finally {
      setSimLoadingPreinscription(false);
    }
  };

  const handleSimulerPaiement = async () => {
    const ref = refPaiement || paiement?.reference_interne;
    if (!ref || simLoadingPaiement) return;
    setSimLoadingPaiement(true);
    try {
      await paiementService.simulerSucces(ref);
    } catch { /* le polling verra le changement de statut */ } finally {
      setSimLoadingPaiement(false);
    }
  };

  const marquerToutesLues = () => {
    const ids = notifications.map((n) => n.id);
    setLus(ids);
    if (profil?.id) localStorage.setItem(`hrskills_lu_${profil.id}`, JSON.stringify(ids));
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: "1.5px solid #e5e7eb", fontSize: "14px", outline: "none",
    background: "#fff", color: "#1e293b", boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s",
  };

  const pageTitle = {
    dashboard: "Tableau de bord",
    profil: "Mon profil",
    documents: "Mes documents",
    paiement: "Paiement",
    messages: "Messages",
  }[activeMenu];

  const msgNonLus = messages.filter((m) => !lus.includes(`msg-${m.id}`)).length;

  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("hrskills_tour_stagiaire")) setShowOnboarding(true);
  }, []);

  const onboardingSteps = useMemo(() => [
    {
      target: null,
      icon: "welcome",
      title: "Bienvenue dans votre espace stagiaire !",
      desc: "Tout est prêt pour vous. En quelques étapes, nous allons vous guider à travers votre espace personnel HR Skills SARL.",
    },
    {
      target: "ob-sidebar",
      position: "right",
      title: "Navigation principale",
      desc: "Ce menu latéral vous donne accès à toutes les sections : tableau de bord, documents, paiements, messages et profil.",
    },
    {
      target: "ob-stats",
      position: "bottom",
      title: "Votre tableau de bord",
      desc: "Suivez en temps réel l'avancement de votre dossier : documents déposés, paiements et statut global de votre stage.",
      action: () => setActiveMenu("dashboard"),
    },
    {
      target: "ob-nav-documents",
      position: "right",
      title: "Déposez vos documents",
      desc: "4 documents obligatoires : lettre de demande de stage, CV, certificat de scolarité et CNI/récépissé. Déposez-les ici pour valider votre dossier.",
    },
    {
      target: "ob-nav-paiement",
      position: "right",
      title: "Gérez vos paiements",
      desc: "Payez votre pré-inscription (5 000 XAF) puis vos frais de stage (40 000 XAF) directement via MTN Money ou Orange Money.",
    },
    {
      target: "ob-nav-messages",
      position: "right",
      title: "Vos messages",
      desc: "Recevez ici les communications et annonces de l'équipe HR Skills SARL. Les notifications non lues apparaissent en rouge.",
    },
    {
      target: "ob-nav-profil",
      position: "right",
      title: "Votre profil",
      desc: "Consultez et mettez à jour vos informations personnelles depuis cette section.",
    },
    {
      target: null,
      icon: "done",
      title: "Vous êtes prêt ! 🎉",
      desc: "Votre espace est configuré. Commencez par déposer vos 4 documents pour valider votre dossier. Bonne chance dans votre stage !",
      action: () => setActiveMenu("dashboard"),
    },
  ], [setActiveMenu]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7ff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside
        id="ob-sidebar"
        className={`app-sidebar${sidebarOpen ? " sidebar-open" : ""}`}
        style={{
          position: "fixed", left: 0, top: 0, bottom: 0, width: "248px",
          background: "linear-gradient(180deg, #3b0764 0%, #6d28d9 60%, #7c3aed 100%)",
          display: "flex", flexDirection: "column",
          padding: "0", zIndex: 100,
          transition: "transform 0.25s ease",
          boxShadow: "4px 0 24px rgba(76,29,149,0.15)",
        }}
      >
        {/* Header sidebar */}
        <div
          style={{
            padding: "1.75rem 1.5rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="/images/logo.jpeg" alt="Logo"
                style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }}
              />
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "14px", color: "#fff", lineHeight: "1.2" }}>
                  HR Skills SARL
                </div>
                <div style={{ fontSize: "10px", color: "#c4b5fd", fontWeight: "500", letterSpacing: "0.04em" }}>
                  Espace stagiaire
                </div>
              </div>
            </div>
            <button
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              style={{ background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", color: "#fff", padding: "5px", borderRadius: "8px", display: "flex" }}
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeMenu === item.id;
            const badge = item.id === "messages" ? msgNonLus : 0;
            return (
              <div
                key={item.id}
                id={`ob-nav-${item.id}`}
                onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px", borderRadius: "10px", cursor: "pointer",
                  background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  fontSize: "14px", fontWeight: isActive ? "600" : "400",
                  marginBottom: "3px",
                  transition: "all 0.18s ease",
                  borderLeft: isActive ? "3px solid rgba(255,255,255,0.6)" : "3px solid transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {item.icon} {item.label}
                </span>
                {badge > 0 && (
                  <span
                    style={{
                      background: "#ef4444", color: "#fff", borderRadius: "99px",
                      fontSize: "10px", fontWeight: "700", padding: "1px 6px",
                      minWidth: "17px", textAlign: "center",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {profil && (
            <div
              style={{
                padding: "10px 12px", borderRadius: "10px",
                background: "rgba(255,255,255,0.1)", marginBottom: "8px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#c4b5fd", marginBottom: "2px" }}>Connecté en tant que</div>
              <div style={{ fontSize: "13px", color: "#fff", fontWeight: "600" }}>
                {profil.prenom} {profil.nom}
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              width: "100%", padding: "10px 12px", borderRadius: "10px",
              background: "rgba(255,255,255,0.08)", border: "none",
              color: "rgba(255,255,255,0.8)", fontSize: "14px", cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <FiLogOut size={17} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ── CONTENU PRINCIPAL ── */}
      <main className="app-main dashboard-main" style={{ marginLeft: "248px", padding: "2rem", minHeight: "100vh" }}>

        {/* TOPBAR MOBILE */}
        <div
          className="dashboard-mobile-header"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 97,
            background: "#fff", borderBottom: "1px solid #ede9fe", height: "60px",
            padding: "0 1rem", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 2px 16px rgba(124,58,237,0.07)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#4c1d95", padding: "6px", borderRadius: "8px", display: "flex" }}
          >
            <FiMenu size={22} />
          </button>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "15px", color: "#4c1d95" }}>
            {pageTitle}
          </span>
          <button
            onClick={() => setShowNotifs((v) => !v)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#4c1d95", padding: "6px", borderRadius: "8px", display: "flex" }}
          >
            <FiBell size={20} />
            {notifsNonLues > 0 && (
              <span style={{ position: "absolute", top: "1px", right: "1px", background: "#ef4444", color: "#fff", borderRadius: "99px", fontSize: "9px", fontWeight: "700", padding: "1px 4px" }}>
                {notifsNonLues}
              </span>
            )}
          </button>
        </div>

        {/* ── HEADER PAGE ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
              {pageTitle}
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "3px 0 0" }}>
              {profil ? `Bienvenue, ${profil.prenom} ${profil.nom}` : "Chargement de votre profil…"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Cloche notifications */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotifs((v) => !v)}
                style={{
                  background: "#fff", border: "1px solid #ede9fe",
                  borderRadius: "10px", padding: "8px 12px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                  color: "#4c1d95", position: "relative",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(124,58,237,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ede9fe"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
              >
                <FiBell size={17} />
                {notifsNonLues > 0 && (
                  <span
                    style={{
                      position: "absolute", top: "-5px", right: "-5px",
                      background: "#ef4444", color: "#fff", borderRadius: "99px",
                      fontSize: "9px", fontWeight: "700", padding: "1px 5px",
                    }}
                  >
                    {notifsNonLues}
                  </span>
                )}
              </button>

              {/* PANNEAU NOTIFS */}
              {showNotifs && (
                <div
                  style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 50,
                    background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe",
                    boxShadow: "0 16px 48px rgba(15,23,42,0.12)", width: "340px",
                    animation: "fadeIn 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>
                      Notifications
                      {notifsNonLues > 0 && (
                        <span style={{ marginLeft: "6px", background: "#ef4444", color: "#fff", borderRadius: "99px", fontSize: "10px", fontWeight: "700", padding: "1px 6px" }}>
                          {notifsNonLues}
                        </span>
                      )}
                    </span>
                    {notifsNonLues > 0 && (
                      <button onClick={marquerToutesLues} style={{ fontSize: "12px", color: "#7c3aed", background: "none", border: "none", cursor: "pointer", fontWeight: "600" }}>
                        Tout lire
                      </button>
                    )}
                  </div>
                  <div style={{ maxHeight: "340px", overflowY: "auto" }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: "2.5rem", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                        Aucune notification
                      </div>
                    ) : notifications.map((n) => {
                      const nonLue = !lus.includes(n.id);
                      const dotColor = n.type === "message" ? "#7c3aed" : n.type === "paiement" ? "#0ea5e9" : n.type === "preinscription" ? "#10b981" : "#f59e0b";
                      return (
                        <div
                          key={n.id}
                          style={{
                            padding: "0.85rem 1.25rem", borderBottom: "1px solid #f9fafb",
                            background: nonLue ? "#faf5ff" : "#fff",
                            display: "flex", gap: "10px", alignItems: "flex-start",
                          }}
                        >
                          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: nonLue ? dotColor : "#e5e7eb", marginTop: "6px", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", color: "#1e293b", lineHeight: "1.5", fontWeight: nonLue ? "500" : "400" }}>{n.texte}</div>
                            {n.date && <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{new Date(n.date).toLocaleDateString("fr-FR")}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid #f3f4f6" }}>
                    <button onClick={() => { setActiveMenu("messages"); setShowNotifs(false); }} style={{ fontSize: "13px", color: "#7c3aed", background: "none", border: "none", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                      Voir mes messages <FiChevronRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "7px 14px", borderRadius: "10px",
                background: "#fff", border: "1px solid #ede9fe",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: "800", fontSize: "12px",
                }}
              >
                {profil ? profil.prenom[0].toUpperCase() : "S"}
              </div>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b" }}>
                {profil ? `${profil.prenom} ${profil.nom}` : "Stagiaire"}
              </span>
            </div>
          </div>
        </div>

        {/* ══ VUE DASHBOARD ══ */}
        {activeMenu === "dashboard" && (
          <>
            {/* STATS */}
            <div id="ob-stats" className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
              <StatCard icon={<FiFileText size={21} />} label="Documents soumis" value={`${documents.length} / 4`} color="#7c3aed" bg="#f5f3ff" />
              <StatCard icon={<FiCheckCircle size={21} />} label="Documents validés" value={`${docsValides} / 4`} color="#10b981" bg="#f0fdf4" />
              <StatCard
                icon={<FiUserCheck size={21} />} label="Pré-inscription"
                value={!preinscription ? "Non initiée" : preinscription.statut === "valide" ? "Validée" : preinscription.statut === "rejete" ? "Rejetée" : "En attente"}
                color={preinscription?.statut === "valide" ? "#10b981" : "#f59e0b"}
                bg={preinscription?.statut === "valide" ? "#f0fdf4" : "#fffbeb"}
              />
              <StatCard
                icon={<FiCreditCard size={21} />} label="Frais de stage"
                value={!paiement ? "Non initié" : paiement.statut === "valide" ? "Validé" : paiement.statut === "echoue" ? "Échoué" : "En attente"}
                color={paiement?.statut === "valide" ? "#10b981" : "#f59e0b"}
                bg={paiement?.statut === "valide" ? "#f0fdf4" : "#fffbeb"}
              />
              <StatCard
                icon={<FiClock size={21} />} label="Statut global"
                value={docsValides === 4 && paiement?.statut === "valide" && preinscription?.statut === "valide" ? "Complet ✓" : "En cours"}
                color="#0ea5e9" bg="#f0f9ff"
              />
            </div>

            {/* BANDEAU PAIEMENT GROUPÉ */}
            {(!preinscription || preinscription.statut !== "valide") && (!paiement || paiement.statut !== "valide") && (
              <div
                style={{
                  background: "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)",
                  borderRadius: "16px", padding: "1.5rem 2rem",
                  marginBottom: "1.75rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: "1rem",
                  boxShadow: "0 12px 36px rgba(124,58,237,0.28)",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-60px", right: "10%", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "11px", color: "#c4b5fd", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>
                    Offre groupée · Économisez du temps
                  </div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "800", color: "#fff", lineHeight: "1.2" }}>
                    Pré-inscription + Frais de stage en une fois
                  </div>
                  <div style={{ fontSize: "13px", color: "#ddd6fe", marginTop: "4px" }}>
                    5 000 XAF + 40 000 XAF · Paiement Mobile Money
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0, position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "30px", fontWeight: "800", color: "#fff", letterSpacing: "-0.03em" }}>
                    45 000 <span style={{ fontSize: "14px", fontWeight: "500", color: "#c4b5fd" }}>XAF</span>
                  </span>
                  <button
                    onClick={() => setShowPaiementTotal(true)}
                    style={{
                      padding: "11px 22px", borderRadius: "11px",
                      background: "#fff", color: "#7c3aed",
                      border: "none", fontWeight: "700", fontSize: "14px",
                      cursor: "pointer", whiteSpace: "nowrap",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.22)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)"; }}
                  >
                    Payer 45 000 XAF →
                  </button>
                </div>
              </div>
            )}

            {/* GRILLE RÉSUMÉ */}
            <div className="summary-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1.5rem" }}>

              {/* Documents */}
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0eefe", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>État des documents</h3>
                  <Badge text={`${docsValides}/4`} color="#059669" bg="#f0fdf4" border="#bbf7d0" />
                </div>
                {DOC_TYPES.map((doc) => {
                  const s = getDocStatut(doc.value);
                  return (
                    <div
                      key={doc.value}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "11px 13px", borderRadius: "10px",
                        border: `1px solid ${s.border}20`,
                        background: `${s.bg}80`,
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FiFileText size={14} style={{ color: s.color, flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{doc.label}</span>
                      </div>
                      <Badge text={s.text} color={s.color} bg={s.bg} border={s.border} />
                    </div>
                  );
                })}
                <button
                  onClick={() => setShowUpload(true)}
                  style={{
                    width: "100%", padding: "11px", borderRadius: "10px", marginTop: "0.75rem",
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    color: "#fff", border: "none", fontSize: "14px", fontWeight: "600",
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(124,58,237,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <FiUpload size={15} /> Uploader des documents
                </button>
              </div>

              {/* Pré-inscription */}
              <PreinscriptionCard preinscription={preinscription} onPayer={() => setShowPreinscription(true)} polling={pollingPreinscription} onSimuler={handleSimulerPreinscription} simLoading={simLoadingPreinscription} />

              {/* Paiement */}
              <PaiementCard paiement={paiement} onPayer={() => setShowPaiement(true)} polling={pollingPaiement} onSimuler={handleSimulerPaiement} simLoading={simLoadingPaiement} />
            </div>
          </>
        )}

        {/* ══ VUE MESSAGES ══ */}
        {activeMenu === "messages" && (
          <div style={{ maxWidth: "720px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                Messages de l'administration HR Skills SARL
              </p>
              {messages.some((m) => !lus.includes(`msg-${m.id}`)) && (
                <button
                  onClick={() => { messagesService.marquerTousLus(messages, profil?.id); setLus(messages.map((m) => `msg-${m.id}`)); }}
                  style={{ fontSize: "13px", color: "#7c3aed", background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontWeight: "600" }}
                >
                  Tout marquer lu
                </button>
              )}
            </div>
            {messages.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ede9fe", padding: "4rem 2rem", textAlign: "center" }}>
                <FiMessageSquare size={36} style={{ color: "#c4b5fd", marginBottom: "1rem" }} />
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "700", color: "#1e293b", marginBottom: "6px" }}>Aucun message</div>
                <div style={{ fontSize: "14px", color: "#94a3b8" }}>L'administration n'a pas encore envoyé de messages.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {messages.map((msg) => {
                  const nonLu = !lus.includes(`msg-${msg.id}`);
                  return (
                    <div
                      key={msg.id}
                      onClick={() => {
                        messagesService.marquerLu(msg.id, profil?.id);
                        setLus((prev) => prev.includes(`msg-${msg.id}`) ? prev : [...prev, `msg-${msg.id}`]);
                      }}
                      style={{
                        background: "#fff", borderRadius: "12px", cursor: "pointer",
                        border: `1px solid ${nonLu ? "#c4b5fd" : "#f0eefe"}`,
                        padding: "1.25rem 1.5rem",
                        boxShadow: nonLu ? "0 4px 16px rgba(124,58,237,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flex: 1 }}>
                          <div
                            style={{
                              width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                              background: nonLu ? "linear-gradient(135deg, #7c3aed, #a78bfa)" : "#f5f3ff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: nonLu ? "#fff" : "#7c3aed",
                            }}
                          >
                            <FiMessageSquare size={15} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>{msg.sujet}</span>
                              {nonLu && <span style={{ background: "#7c3aed", color: "#fff", borderRadius: "99px", fontSize: "10px", fontWeight: "700", padding: "1px 7px" }}>Nouveau</span>}
                            </div>
                            <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>{msg.contenu}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: "11px", color: "#94a3b8", flexShrink: 0 }}>
                          {new Date(msg.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ VUE PROFIL ══ */}
        {activeMenu === "profil" && profil && (
          <div style={{ maxWidth: "640px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0eefe", padding: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f3f4f6" }}>
                <div
                  style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: "800", fontSize: "24px",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.25)",
                  }}
                >
                  {profil.prenom[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>{profil.prenom} {profil.nom}</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>{profil.email}</div>
                  <Badge text="Stagiaire" color="#7c3aed" bg="#f5f3ff" border="#c4b5fd" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Établissement",     value: profil.etablissement },
                  { label: "Filière",            value: profil.filiere },
                  { label: "Niveau",             value: profil.niveau },
                  { label: "Téléphone",          value: profil.telephone },
                  { label: "Date de naissance",  value: profil.date_naissance },
                  { label: "Sexe",               value: profil.sexe === "M" ? "Masculin" : "Féminin" },
                  { label: "Début du stage",     value: profil.date_debut || "Non définie" },
                  { label: "Fin du stage",       value: profil.date_fin || "Non définie" },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "13px 14px", background: "#faf9ff", borderRadius: "10px", border: "1px solid #f0eefe" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{item.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ VUE DOCUMENTS ══ */}
        {activeMenu === "documents" && (
          <div style={{ maxWidth: "680px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0eefe", padding: "1.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Mes documents</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: "3px 0 0" }}>{docsValides} validé(s) sur 4 requis</p>
                </div>
                <button
                  onClick={() => setShowUpload(true)}
                  style={{
                    padding: "9px 18px", borderRadius: "10px",
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    color: "#fff", border: "none", fontSize: "13px", fontWeight: "600",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(124,58,237,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <FiUpload size={14} /> Uploader
                </button>
              </div>
              {DOC_TYPES.map((doc) => {
                const s = getDocStatut(doc.value);
                const docObj = documents.find((d) => d.type === doc.value);
                return (
                  <div
                    key={doc.value}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 16px", borderRadius: "11px",
                      border: `1px solid ${s.border}`,
                      background: `${s.bg}60`,
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "38px", height: "38px", borderRadius: "10px",
                          background: s.bg, border: `1px solid ${s.border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <FiFileText size={16} style={{ color: s.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{doc.label}</div>
                        {docObj && <div style={{ fontSize: "12px", color: "#94a3b8" }}>{docObj.nom_fichier}</div>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Badge text={s.text} color={s.color} bg={s.bg} border={s.border} />
                      {docObj && docObj.statut === "en_attente" && (
                        <button onClick={() => setConfirmDeleteId(docObj.id)} style={{ background: "#fef2f2", border: "1px solid #fecaca", cursor: "pointer", color: "#dc2626", borderRadius: "7px", padding: "5px", display: "flex" }}>
                          <FiX size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ VUE PAIEMENT ══ */}
        {activeMenu === "paiement" && (
          <div style={{ maxWidth: "820px" }}>
            {(!preinscription || preinscription.statut !== "valide") && (!paiement || paiement.statut !== "valide") && (
              <div
                style={{
                  background: "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)",
                  borderRadius: "18px", padding: "1.75rem 2rem",
                  marginBottom: "1.75rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: "1rem",
                  boxShadow: "0 16px 40px rgba(124,58,237,0.3)",
                }}
              >
                <div>
                  <div style={{ fontSize: "11px", color: "#c4b5fd", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                    Offre groupée
                  </div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "800", color: "#fff" }}>
                    Tout payer en une seule fois
                  </div>
                  <div style={{ fontSize: "13px", color: "#ddd6fe", marginTop: "4px" }}>
                    Pré-inscription (5 000 XAF) + Frais de stage (40 000 XAF)
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "34px", fontWeight: "800", color: "#fff", letterSpacing: "-0.03em" }}>
                    45 000 <span style={{ fontSize: "15px", fontWeight: "500", color: "#c4b5fd" }}>XAF</span>
                  </div>
                  <button
                    onClick={() => setShowPaiementTotal(true)}
                    style={{
                      marginTop: "10px", padding: "10px 22px", borderRadius: "10px",
                      background: "#fff", color: "#7c3aed",
                      border: "none", fontWeight: "700", fontSize: "14px",
                      cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Payer 45 000 XAF →
                  </button>
                </div>
              </div>
            )}

            <div className="payment-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {/* Pré-inscription détaillée */}
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0eefe", padding: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
                  <FiUserCheck size={18} style={{ color: "#7c3aed" }} />
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Pré-inscription</h3>
                </div>
                <div style={{ textAlign: "center", padding: "1.5rem", borderRadius: "12px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Frais de pré-inscription</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "42px", fontWeight: "800", color: "#4c1d95", letterSpacing: "-0.04em" }}>5 000</div>
                  <div style={{ fontSize: "14px", color: "#7c3aed", fontWeight: "600" }}>XAF</div>
                </div>
                {pollingPreinscription ? (
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ padding: "14px", borderRadius: "10px", textAlign: "center", background: "#f5f3ff", border: "1px solid #c4b5fd", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#7c3aed", marginBottom: import.meta.env.DEV ? "10px" : 0 }}>
                      <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(124,58,237,0.3)", borderTopColor: "#7c3aed", animation: "spin 0.7s linear infinite", display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>En attente de confirmation sur votre téléphone…</span>
                    </div>
                    {import.meta.env.DEV && (
                      <button
                        type="button"
                        onClick={handleSimulerPreinscription}
                        disabled={simLoadingPreinscription}
                        style={{ width: "100%", padding: "10px", borderRadius: "9px", background: "#fef3c7", border: "1px dashed #f59e0b", color: "#92400e", fontSize: "12px", fontWeight: "600", cursor: simLoadingPreinscription ? "not-allowed" : "pointer", opacity: simLoadingPreinscription ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        {simLoadingPreinscription ? "Simulation…" : "⚡ Simuler confirmation MoMo (dev)"}
                      </button>
                    )}
                  </div>
                ) : preinscription ? (
                  <div style={{ padding: "14px", borderRadius: "10px", textAlign: "center", ...statutBadge(preinscription.statut), marginBottom: "1rem" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>
                      {preinscription.statut === "valide" ? "✅ Pré-inscription validée" : preinscription.statut === "rejete" ? "❌ Rejetée" : "⏳ En attente de confirmation"}
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.8 }}>Réf : {preinscription.reference_interne}</div>
                  </div>
                ) : (
                  <p style={{ color: "#94a3b8", fontSize: "13px", textAlign: "center", marginBottom: "1.25rem", lineHeight: "1.6" }}>
                    Aucune pré-inscription initiée. Cliquez ci-dessous pour commencer.
                  </p>
                )}
                {(!preinscription || preinscription.statut !== "valide") && !pollingPreinscription && (
                  <button onClick={() => setShowPreinscription(true)} style={{ width: "100%", padding: "13px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(124,58,237,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Payer la pré-inscription
                  </button>
                )}
              </div>

              {/* Frais de stage détaillés */}
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0eefe", padding: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
                  <FiCreditCard size={18} style={{ color: "#7c3aed" }} />
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Frais de stage</h3>
                </div>
                <div style={{ textAlign: "center", padding: "1.5rem", borderRadius: "12px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Frais de dossier</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "42px", fontWeight: "800", color: "#4c1d95", letterSpacing: "-0.04em" }}>40 000</div>
                  <div style={{ fontSize: "14px", color: "#7c3aed", fontWeight: "600" }}>XAF</div>
                </div>
                {pollingPaiement ? (
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ padding: "14px", borderRadius: "10px", textAlign: "center", background: "#f5f3ff", border: "1px solid #c4b5fd", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#7c3aed", marginBottom: import.meta.env.DEV ? "10px" : 0 }}>
                      <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(124,58,237,0.3)", borderTopColor: "#7c3aed", animation: "spin 0.7s linear infinite", display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>En attente de confirmation sur votre téléphone…</span>
                    </div>
                    {import.meta.env.DEV && (
                      <button
                        type="button"
                        onClick={handleSimulerPaiement}
                        disabled={simLoadingPaiement}
                        style={{ width: "100%", padding: "10px", borderRadius: "9px", background: "#fef3c7", border: "1px dashed #f59e0b", color: "#92400e", fontSize: "12px", fontWeight: "600", cursor: simLoadingPaiement ? "not-allowed" : "pointer", opacity: simLoadingPaiement ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        {simLoadingPaiement ? "Simulation…" : "⚡ Simuler confirmation MoMo (dev)"}
                      </button>
                    )}
                  </div>
                ) : paiement ? (
                  <div style={{ padding: "14px", borderRadius: "10px", textAlign: "center", ...statutBadge(paiement.statut), marginBottom: "1rem" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>
                      {paiement.statut === "valide" ? "✅ Paiement validé" : paiement.statut === "echoue" ? "❌ Paiement échoué" : "⏳ En attente de confirmation"}
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.8 }}>Réf : {paiement.reference_interne}</div>
                  </div>
                ) : (
                  <p style={{ color: "#94a3b8", fontSize: "13px", textAlign: "center", marginBottom: "1.25rem", lineHeight: "1.6" }}>
                    Aucun paiement initié. Cliquez ci-dessous pour payer.
                  </p>
                )}
                {(!paiement || paiement.statut !== "valide") && !pollingPaiement && (
                  <button onClick={() => setShowPaiement(true)} style={{ width: "100%", padding: "13px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(124,58,237,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Payer maintenant
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══ MODALS ══ */}

      {/* MODAL UPLOAD */}
      {showUpload && (
        <MobileModal title="Téléverser vos documents" subtitle="Formats acceptés : PDF, JPG, JPEG, PNG" onClose={() => { setShowUpload(false); setUploadFiles({}); setUploadError(""); }}>
          <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {DOC_TYPES.map((doc) => (
              <div key={doc.value} style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b" }}>{doc.label}</span>
                  <span style={{ fontSize: "10px", color: "#7c3aed", fontWeight: "700", background: "#f5f3ff", padding: "2px 7px", borderRadius: "99px", border: "1px solid #c4b5fd" }}>Requis</span>
                </div>
                <input
                  type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setUploadFiles({ ...uploadFiles, [doc.value]: e.target.files[0] })}
                  style={{ width: "100%", fontSize: "13px", color: "#64748b", cursor: "pointer" }}
                />
                {uploadFiles[doc.value] && (
                  <div style={{ marginTop: "6px", fontSize: "12px", color: "#7c3aed", fontWeight: "500" }}>
                    ✓ {uploadFiles[doc.value].name}
                  </div>
                )}
              </div>
            ))}
            {uploadError && (
              <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", display: "flex", gap: "8px" }}>
                <FiAlertCircle size={14} style={{ flexShrink: 0, marginTop: "1px" }} /> {uploadError}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "0.25rem" }}>
              <button type="submit" disabled={uploading} style={{ padding: "13px", borderRadius: "11px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {uploading ? (
                  <><span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Envoi en cours…</>
                ) : (
                  <><FiUpload size={14} /> Téléverser les documents</>
                )}
              </button>
              <button type="button" onClick={() => { setShowUpload(false); setUploadFiles({}); setUploadError(""); }} style={{ padding: "12px", borderRadius: "11px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                Annuler
              </button>
            </div>
          </form>
        </MobileModal>
      )}

      {/* MODAL PRÉ-INSCRIPTION */}
      {showPreinscription && (
        <MobileModal title="Payer la pré-inscription" subtitle="5 000 XAF via Mobile Money" onClose={() => setShowPreinscription(false)}>
          <form onSubmit={handlePreinscription} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <OperateurSelector value={preinscriptionForm.operateur} onChange={(v) => setPreinscriptionForm({ ...preinscriptionForm, operateur: v })} />
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Numéro de téléphone *</label>
              <input required placeholder="677 000 000" value={preinscriptionForm.telephone} onChange={(e) => setPreinscriptionForm({ ...preinscriptionForm, telephone: e.target.value })} style={inputStyle} onFocus={(e) => e.target.style.borderColor = "#7c3aed"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
            </div>
            <InfoBox>Vous recevrez une notification sur votre téléphone pour confirmer le paiement de <strong>5 000 XAF</strong>.</InfoBox>
            {preinscriptionError && <ErrorBox>{preinscriptionError}</ErrorBox>}
            <button type="submit" disabled={preinscriptionLoading} style={{ padding: "13px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: preinscriptionLoading ? "not-allowed" : "pointer", opacity: preinscriptionLoading ? 0.7 : 1 }}>
              {preinscriptionLoading ? "Traitement en cours…" : "Confirmer — 5 000 XAF"}
            </button>
          </form>
        </MobileModal>
      )}

      {/* MODAL PAIEMENT GROUPÉ */}
      {showPaiementTotal && (
        <MobileModal title="Paiement groupé" subtitle="Pré-inscription + Frais de stage" onClose={() => { setShowPaiementTotal(false); setTotalError(""); }}>
          <div style={{ borderRadius: "12px", background: "linear-gradient(135deg, #3b0764, #7c3aed)", padding: "1.25rem", marginBottom: "1.25rem" }}>
            {[["Pré-inscription", "5 000 XAF"], ["Frais de stage", "40 000 XAF"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#ddd6fe", marginBottom: "8px" }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", color: "#fff", fontSize: "14px" }}>Total</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "800", color: "#fff", fontSize: "22px" }}>45 000 XAF</span>
            </div>
          </div>
          <form onSubmit={handlePaiementTotal} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <OperateurSelector value={paiementTotalForm.operateur} onChange={(v) => setPaiementTotalForm({ ...paiementTotalForm, operateur: v })} />
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Numéro de téléphone *</label>
              <input required placeholder="677 000 000" value={paiementTotalForm.telephone} onChange={(e) => setPaiementTotalForm({ ...paiementTotalForm, telephone: e.target.value })} style={inputStyle} onFocus={(e) => e.target.style.borderColor = "#7c3aed"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
            </div>
            <InfoBox>Vous recevrez <strong>deux notifications</strong> sur votre téléphone pour valider les deux paiements.</InfoBox>
            {totalError && <ErrorBox>{totalError}</ErrorBox>}
            <button type="submit" disabled={totalLoading} style={{ padding: "13px", borderRadius: "10px", background: "linear-gradient(135deg, #3b0764, #7c3aed)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: totalLoading ? "not-allowed" : "pointer", opacity: totalLoading ? 0.7 : 1, boxShadow: "0 8px 20px rgba(124,58,237,0.3)" }}>
              {totalLoading ? "Traitement en cours…" : "Confirmer — 45 000 XAF"}
            </button>
          </form>
        </MobileModal>
      )}

      {/* MODAL PAIEMENT STAGE */}
      {showPaiement && (
        <MobileModal title="Payer les frais de stage" subtitle="40 000 XAF via Mobile Money" onClose={() => setShowPaiement(false)}>
          <form onSubmit={handlePaiement} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <OperateurSelector value={paiementForm.operateur} onChange={(v) => setPaiementForm({ ...paiementForm, operateur: v })} />
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Numéro de téléphone *</label>
              <input required placeholder="677 000 000" value={paiementForm.telephone} onChange={(e) => setPaiementForm({ ...paiementForm, telephone: e.target.value })} style={inputStyle} onFocus={(e) => e.target.style.borderColor = "#7c3aed"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
            </div>
            <InfoBox>Vous recevrez une notification pour confirmer le paiement de <strong>40 000 XAF</strong>.</InfoBox>
            <button type="submit" disabled={paiementLoading} style={{ padding: "13px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "14px", fontWeight: "700", cursor: paiementLoading ? "not-allowed" : "pointer", opacity: paiementLoading ? 0.7 : 1 }}>
              {paiementLoading ? "Traitement en cours…" : "Confirmer — 40 000 XAF"}
            </button>
          </form>
        </MobileModal>
      )}

      {/* MODAL SUPPRESSION */}
      {confirmDeleteId && (
        <MobileModal title="Supprimer ce document ?" onClose={() => setConfirmDeleteId(null)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", color: "#dc2626" }}>
              <FiAlertCircle size={22} />
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", marginBottom: "1.75rem" }}>
              Cette action est irréversible. Le document sera définitivement supprimé de votre dossier.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setConfirmDeleteId(null)} style={{ flex: 1, padding: "12px", borderRadius: "9px", background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Annuler</button>
              <button
                onClick={async () => { await documentsService.deleteDocument(confirmDeleteId); dispatch(fetchDocuments()); setConfirmDeleteId(null); }}
                style={{ flex: 1, padding: "12px", borderRadius: "9px", background: "#ef4444", border: "none", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </MobileModal>
      )}
      {showOnboarding && (
        <OnboardingTour
          steps={onboardingSteps}
          storageKey="hrskills_tour_stagiaire"
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}

// ── Sous-composants ───────────────────────────────────────────────────────────

function OperateurSelector({ value, onChange }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Opérateur Mobile Money</label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {OPERATEURS.map((op) => (
          <button
            key={op.value} type="button" onClick={() => onChange(op.value)}
            style={{
              padding: "13px 8px", borderRadius: "10px", cursor: "pointer",
              border: `2px solid ${value === op.value ? op.color : "#e5e7eb"}`,
              background: value === op.value ? op.bg : "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "700", fontSize: "13px",
              color: value === op.value ? op.color : "#9ca3af",
              transition: "all 0.2s ease",
            }}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f5f3ff", border: "1px solid #c4b5fd", fontSize: "13px", color: "#4c1d95", lineHeight: "1.6" }}>
      💡 {children}
    </div>
  );
}

function ErrorBox({ children }) {
  return (
    <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "13px", display: "flex", gap: "8px" }}>
      <FiAlertCircle size={14} style={{ flexShrink: 0, marginTop: "1px" }} /> {children}
    </div>
  );
}

function PreinscriptionCard({ preinscription, onPayer, polling, onSimuler, simLoading }) {
  const s = !preinscription ? { text: "Non initiée", color: "#92400e", bg: "#fffbeb", border: "#fde68a" }
    : preinscription.statut === "valide" ? { text: "Validée", color: "#065f46", bg: "#f0fdf4", border: "#bbf7d0" }
    : preinscription.statut === "rejete" ? { text: "Rejetée", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" }
    : { text: "En attente", color: "#92400e", bg: "#fffbeb", border: "#fde68a" };

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: `1px solid ${polling ? "#c4b5fd" : "#f0eefe"}`, padding: "1.5rem", boxShadow: polling ? "0 4px 16px rgba(124,58,237,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>Pré-inscription</h3>
      <div style={{ textAlign: "center", padding: "1rem", borderRadius: "10px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1rem" }}>
        <div style={{ fontSize: "10px", color: "#7c3aed", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Frais</div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "26px", fontWeight: "800", color: "#4c1d95" }}>5 000</div>
        <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600" }}>XAF</div>
      </div>
      {polling ? (
        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ padding: "8px 10px", borderRadius: "8px", background: "#f5f3ff", border: "1px solid #c4b5fd", color: "#7c3aed", fontSize: "12px", fontWeight: "600", textAlign: "center", marginBottom: import.meta.env.DEV ? "6px" : 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(124,58,237,0.3)", borderTopColor: "#7c3aed", animation: "spin 0.7s linear infinite", display: "inline-block", flexShrink: 0 }} />
            Confirmation en attente…
          </div>
          {import.meta.env.DEV && (
            <button type="button" onClick={onSimuler} disabled={simLoading} style={{ width: "100%", padding: "7px", borderRadius: "7px", background: "#fef3c7", border: "1px dashed #f59e0b", color: "#92400e", fontSize: "11px", fontWeight: "600", cursor: simLoading ? "not-allowed" : "pointer", opacity: simLoading ? 0.7 : 1 }}>
              {simLoading ? "Simulation…" : "⚡ Simuler MoMo (dev)"}
            </button>
          )}
        </div>
      ) : (
        <div style={{ padding: "8px 10px", borderRadius: "8px", background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: "12px", fontWeight: "600", textAlign: "center", marginBottom: "0.75rem" }}>
          {s.text}
        </div>
      )}
      {(!preinscription || preinscription.statut !== "valide") && !polling && (
        <button onClick={onPayer} style={{ width: "100%", padding: "10px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
          Payer — 5 000 XAF
        </button>
      )}
    </div>
  );
}

function PaiementCard({ paiement, onPayer, polling, onSimuler, simLoading }) {
  const s = !paiement ? { text: "Non initié", color: "#92400e", bg: "#fffbeb", border: "#fde68a" }
    : paiement.statut === "valide" ? { text: "Validé", color: "#065f46", bg: "#f0fdf4", border: "#bbf7d0" }
    : paiement.statut === "echoue" ? { text: "Échoué", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" }
    : { text: "En attente", color: "#92400e", bg: "#fffbeb", border: "#fde68a" };

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: `1px solid ${polling ? "#c4b5fd" : "#f0eefe"}`, padding: "1.5rem", boxShadow: polling ? "0 4px 16px rgba(124,58,237,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>Frais de stage</h3>
      <div style={{ textAlign: "center", padding: "1rem", borderRadius: "10px", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd", marginBottom: "1rem" }}>
        <div style={{ fontSize: "10px", color: "#7c3aed", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Frais</div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "26px", fontWeight: "800", color: "#4c1d95" }}>40 000</div>
        <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600" }}>XAF</div>
      </div>
      {polling ? (
        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ padding: "8px 10px", borderRadius: "8px", background: "#f5f3ff", border: "1px solid #c4b5fd", color: "#7c3aed", fontSize: "12px", fontWeight: "600", textAlign: "center", marginBottom: import.meta.env.DEV ? "6px" : 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(124,58,237,0.3)", borderTopColor: "#7c3aed", animation: "spin 0.7s linear infinite", display: "inline-block", flexShrink: 0 }} />
            Confirmation en attente…
          </div>
          {import.meta.env.DEV && (
            <button type="button" onClick={onSimuler} disabled={simLoading} style={{ width: "100%", padding: "7px", borderRadius: "7px", background: "#fef3c7", border: "1px dashed #f59e0b", color: "#92400e", fontSize: "11px", fontWeight: "600", cursor: simLoading ? "not-allowed" : "pointer", opacity: simLoading ? 0.7 : 1 }}>
              {simLoading ? "Simulation…" : "⚡ Simuler MoMo (dev)"}
            </button>
          )}
        </div>
      ) : (
        <div style={{ padding: "8px 10px", borderRadius: "8px", background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: "12px", fontWeight: "600", textAlign: "center", marginBottom: "0.75rem" }}>
          {s.text}
        </div>
      )}
      {(!paiement || paiement.statut !== "valide") && !polling && (
        <button onClick={onPayer} style={{ width: "100%", padding: "10px", borderRadius: "9px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
          Payer — 40 000 XAF
        </button>
      )}
    </div>
  );
}
