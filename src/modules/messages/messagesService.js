// Messaging service — localStorage-based (remplaçable par des appels API)
const MESSAGES_KEY = "hrskills_messages";
const luKey = (userId) => `hrskills_lu_${userId}`;

const messagesService = {
  // Admin → envoyer un message (destinataire: "all" ou userId string)
  envoyerMessage: async ({ destinataire, sujet, contenu }) => {
    const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
    const msg = {
      id: Date.now(),
      destinataire,
      sujet,
      contenu,
      date: new Date().toISOString(),
    };
    messages.unshift(msg);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    return msg;
  },

  // Admin → liste de tous les messages envoyés
  getMessagesEnvoyes: async () => {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
  },

  // Stagiaire → ses messages (destinataire "all" ou son userId)
  getMesMessages: async (userId) => {
    const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
    return messages.filter(
      (m) => m.destinataire === "all" || m.destinataire === String(userId)
    );
  },

  // Stagiaire → marquer un message comme lu
  marquerLu: (msgId, userId) => {
    const lus = JSON.parse(localStorage.getItem(luKey(userId)) || "[]");
    if (!lus.includes(msgId)) {
      localStorage.setItem(luKey(userId), JSON.stringify([...lus, msgId]));
    }
  },

  // Stagiaire → IDs des messages lus
  getLus: (userId) => {
    return JSON.parse(localStorage.getItem(luKey(userId)) || "[]");
  },

  // Stagiaire → marquer tous les messages comme lus
  marquerTousLus: (messages, userId) => {
    const ids = messages.map((m) => m.id);
    localStorage.setItem(luKey(userId), JSON.stringify(ids));
  },
};

export default messagesService;
