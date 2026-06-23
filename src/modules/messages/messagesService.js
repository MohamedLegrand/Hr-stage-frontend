import axiosInstance from "../../api/axiosInstance";

const luKey = (userId) => `hrskills_lu_${userId}`;

// Normalise un message backend → format attendu par les composants
// Backend :  { id, sujet, contenu, date_envoi, destinataire_id }
// Frontend : { id, sujet, contenu, date,       destinataire }
const normalize = (msg) => ({
  ...msg,
  date: msg.date_envoi || msg.date,
  destinataire: msg.destinataire_id === null || msg.destinataire_id === undefined
    ? (msg.destinataire ?? "all")
    : String(msg.destinataire_id),
});

const messagesService = {
  // Admin → envoyer un message
  // Body : { destinataire: "all" | "<userId>", sujet, contenu }
  envoyerMessage: async ({ destinataire, sujet, contenu }) => {
    const response = await axiosInstance.post("/messages/envoyer", {
      destinataire: destinataire === "all" ? "all" : destinataire,
      sujet,
      contenu,
    });
    return normalize(response.data);
  },

  // Admin → historique des messages envoyés
  getMessagesEnvoyes: async () => {
    const response = await axiosInstance.get("/messages/envoyes");
    return (response.data ?? []).map(normalize);
  },

  // Stagiaire → ses messages (JWT suffit, backend filtre par utilisateur)
  getMesMessages: async () => {
    const response = await axiosInstance.get("/messages/mes");
    return (response.data ?? []).map(normalize);
  },

  // Lu/non-lu reste en localStorage (local à la session, pas besoin de backend)
  marquerLu: (msgId, userId) => {
    const lus = JSON.parse(localStorage.getItem(luKey(userId)) || "[]");
    if (!lus.includes(String(msgId))) {
      localStorage.setItem(luKey(userId), JSON.stringify([...lus, String(msgId)]));
    }
  },

  getLus: (userId) => {
    return JSON.parse(localStorage.getItem(luKey(userId)) || "[]");
  },

  marquerTousLus: (messages, userId) => {
    const ids = messages.map((m) => String(m.id));
    localStorage.setItem(luKey(userId), JSON.stringify(ids));
  },
};

export default messagesService;
