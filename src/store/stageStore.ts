import { create } from 'zustand';
import { Filiere, Session, Stagiaire, StudentDocument, Payment, GlobalConfig, NewsletterSubscriber, LevelType, PaymentType, StudentStatus, DocumentType } from '../types';
import { INITIAL_FILIERES, INITIAL_SESSIONS, INITIAL_CONFIG, INITIAL_STUDENTS, INITIAL_DOCUMENTS, INITIAL_PAYMENTS, INITIAL_SUBSCRIBERS } from '../mock/data';

interface StageState {
  filieres: Filiere[];
  sessions: Session[];
  config: GlobalConfig;
  students: Stagiaire[];
  documents: StudentDocument[];
  payments: Payment[];
  subscribers: NewsletterSubscriber[];
  systemEmailsSent: Array<{ to: string; subject: string; body: string; date: string }>;

  // Actions
  addFiliere: (filiere: Omit<Filiere, 'id'>) => void;
  addSession: (session: Omit<Session, 'id' | 'endDate' | 'isActive'>) => void;
  updateConfig: (config: GlobalConfig) => void;
  registerStudent: (studentData: {
    firstName: string;
    lastName: string;
    email: string;
    school: string;
    level: LevelType;
    filiereId: string;
    installmentsCount: 1 | 2;
    newsletterSubscribed: boolean;
  }) => Stagiaire;
  verifyStudentEmail: (studentId: string) => void;
  uploadDocument: (studentId: string, type: DocumentType, name: string) => void;
  reviewDocument: (docId: string, status: 'APPROVED' | 'REJECTED') => void;
  makePayment: (studentId: string, paymentId: string, method: 'MTN' | 'ORANGE' | 'CARD') => void;
  subscribeNewsletter: (email: string, source?: 'LANDING' | 'STUDENT_OPT_IN') => boolean;
  unsubscribeNewsletter: (email: string) => void;
  triggerAutoNewsletter: (newSession: Session) => void;
}

export const useStageStore = create<StageState>((set, get) => ({
  filieres: INITIAL_FILIERES,
  sessions: INITIAL_SESSIONS,
  config: INITIAL_CONFIG,
  students: INITIAL_STUDENTS,
  documents: INITIAL_DOCUMENTS,
  payments: INITIAL_PAYMENTS,
  subscribers: INITIAL_SUBSCRIBERS,
  systemEmailsSent: [],

  addFiliere: (filiere) => {
    set((state) => {
      const newFiliere: Filiere = {
        ...filiere,
        id: `filiere-${Date.now()}`
      };
      return { filieres: [...state.filieres, newFiliere] };
    });
  },

  addSession: (session) => {
    set((state) => {
      // Deactivate other sessions if this is active, or make it active
      const startDateObj = new Date(session.startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setMonth(startDateObj.getMonth() + 3); // Auto-calculated 3 months duration

      const formattedEndDate = endDateObj.toISOString().split('T')[0];

      const newSession: Session = {
        id: `session-${Date.now()}`,
        nameFr: session.nameFr,
        nameEn: session.nameEn,
        startDate: session.startDate,
        endDate: formattedEndDate,
        isActive: true
      };

      // Set all other sessions to inactive
      const updatedSessions = state.sessions.map(s => ({
        ...s,
        isActive: false
      }));

      const finalSessions = [newSession, ...updatedSessions];

      // Auto-trigger newsletter logic!
      setTimeout(() => {
        get().triggerAutoNewsletter(newSession);
      }, 100);

      return {
        sessions: finalSessions,
        config: { ...state.config, currentSessionId: newSession.id }
      };
    });
  },

  updateConfig: (newConfig) => {
    set({ config: newConfig });
  },

  registerStudent: (studentData) => {
    const { students, config, payments, documents } = get();
    
    // Check email duplicates
    const emailExists = students.some(s => s.email.toLowerCase() === studentData.email.toLowerCase());
    if (emailExists) {
      throw new Error('EMAIL_DUPLICATE');
    }

    const studentId = `student-${Date.now()}`;
    const newStudent: Stagiaire = {
      id: studentId,
      ...studentData,
      sessionId: config.currentSessionId,
      status: 'EN_ATTENTE_PAIEMENT',
      registrationDate: new Date().toISOString().split('T')[0],
      emailVerified: false,
      newsletterSubscribed: studentData.newsletterSubscribed
    };

    // Create Registration payment
    const regPayment: Payment = {
      id: `pay-reg-${Date.now()}`,
      studentId,
      type: 'REGISTRATION',
      amount: config.registrationFee,
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      dueDate: new Date().toISOString().split('T')[0]
    };

    // Create Tuition Payments
    const totalTuition = studentData.level === 'LEVEL_1' ? config.tuitionFeeLevel1 : config.tuitionFeeLevel2;
    const tPayments: Payment[] = [];

    if (studentData.installmentsCount === 1) {
      tPayments.push({
        id: `pay-tuit-all-${Date.now()}`,
        studentId,
        type: 'TUITION_1',
        amount: totalTuition,
        date: new Date().toISOString().split('T')[0],
        status: 'PENDING',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +30 days
      });
    } else {
      // 2 installments 50/50
      const half = totalTuition / 2;
      tPayments.push(
        {
          id: `pay-tuit-1-${Date.now()}`,
          studentId,
          type: 'TUITION_1',
          amount: half,
          date: new Date().toISOString().split('T')[0],
          status: 'PENDING',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +15 days
        },
        {
          id: `pay-tuit-2-${Date.now()}`,
          studentId,
          type: 'TUITION_2',
          amount: half,
          date: new Date().toISOString().split('T')[0],
          status: 'PENDING',
          dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +45 days
        }
      );
    }

    // Add to subscribers list if subscribed
    if (studentData.newsletterSubscribed) {
      get().subscribeNewsletter(studentData.email, 'STUDENT_OPT_IN');
    }

    // Create empty document states
    const defaultDocs: StudentDocument[] = [
      { id: `doc-mot-${Date.now()}`, studentId, type: 'MOTIVATION_LETTER', name: '', status: 'PENDING', uploadDate: '' },
      { id: `doc-cv-${Date.now()}`, studentId, type: 'CV', name: '', status: 'PENDING', uploadDate: '' },
      { id: `doc-cni-${Date.now()}`, studentId, type: 'CNI', name: '', status: 'PENDING', uploadDate: '' },
      { id: `doc-cert-${Date.now()}`, studentId, type: 'STUDENT_CERTIFICATE', name: '', status: 'PENDING', uploadDate: '' }
    ];

    set((state) => ({
      students: [...state.students, newStudent],
      payments: [...state.payments, regPayment, ...tPayments],
      documents: [...state.documents, ...defaultDocs]
    }));

    return newStudent;
  },

  verifyStudentEmail: (studentId) => {
    set((state) => ({
      students: state.students.map((s) =>
        s.id === studentId ? { ...s, emailVerified: true } : s
      )
    }));
  },

  uploadDocument: (studentId, type, name) => {
    set((state) => {
      // Find if document exists, else add it
      const docExistsIndex = state.documents.findIndex(d => d.studentId === studentId && d.type === type);
      const uploadDate = new Date().toISOString().split('T')[0];

      let updatedDocs = [...state.documents];
      if (docExistsIndex > -1) {
        updatedDocs[docExistsIndex] = {
          ...updatedDocs[docExistsIndex],
          name,
          status: 'PENDING',
          uploadDate
        };
      } else {
        updatedDocs.push({
          id: `doc-${Date.now()}`,
          studentId,
          type,
          name,
          status: 'PENDING',
          uploadDate
        });
      }

      return { documents: updatedDocs };
    });
  },

  reviewDocument: (docId, status) => {
    set((state) => ({
      documents: state.documents.map(d =>
        d.id === docId ? { ...d, status } : d
      )
    }));
  },

  makePayment: (studentId, paymentId, method) => {
    set((state) => {
      const transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      const currentDate = new Date().toISOString().split('T')[0];

      // Update payment
      const updatedPayments = state.payments.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            status: 'PAID' as const,
            date: currentDate,
            paymentMethod: method,
            transactionId
          };
        }
        return p;
      });

      // Recalculate student status after this payment
      const updatedStudents = state.students.map((student) => {
        if (student.id !== studentId) return student;

        const studentPayments = updatedPayments.filter(p => p.studentId === studentId);
        const registrationPaid = studentPayments.some(p => p.type === 'REGISTRATION' && p.status === 'PAID');
        
        if (!registrationPaid) {
          return { ...student, status: 'EN_ATTENTE_PAIEMENT' as const };
        }

        // Check if there are overdue tuition payments
        const tuitionOverdue = studentPayments.some(p => 
          p.type !== 'REGISTRATION' && 
          p.status === 'PENDING' && 
          p.dueDate && 
          new Date(p.dueDate) < new Date()
        );

        if (tuitionOverdue) {
          return { ...student, status: 'SUSPENDU' as const };
        }

        return { ...student, status: 'ACTIF' as const };
      });

      return {
        payments: updatedPayments,
        students: updatedStudents
      };
    });
  },

  subscribeNewsletter: (email, source = 'LANDING') => {
    const { subscribers } = get();
    const cleanEmail = email.trim().toLowerCase();
    
    const exists = subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (exists) {
      // Re-activate if disabled
      set((state) => ({
        subscribers: state.subscribers.map((s) =>
          s.email.toLowerCase() === cleanEmail ? { ...s, active: true } : s
        )
      }));
      return true;
    }

    const newSub: NewsletterSubscriber = {
      email: cleanEmail,
      date: new Date().toISOString().split('T')[0],
      source,
      active: true
    };

    set((state) => ({
      subscribers: [...state.subscribers, newSub]
    }));
    return true;
  },

  unsubscribeNewsletter: (email) => {
    set((state) => ({
      subscribers: state.subscribers.map((s) =>
        s.email.toLowerCase() === email.trim().toLowerCase() ? { ...s, active: false } : s
      )
    }));
  },

  triggerAutoNewsletter: (newSession) => {
    const { subscribers, students, config } = get();

    // Recipients must combine:
    // 1. Visitors having left their email (subscribers with source 'LANDING' and active)
    // 2. Old students (status TERMINE) and active in newsletter
    // 3. Suspended students (status SUSPENDU) and active in newsletter

    const recipients = new Set<string>();

    // 1. Landing subscribers
    subscribers
      .filter(sub => sub.active && sub.source === 'LANDING')
      .forEach(sub => recipients.add(sub.email.toLowerCase()));

    // 2. Terminated and suspended students
    students
      .filter(s => (s.status === 'TERMINE' || s.status === 'SUSPENDU') && s.newsletterSubscribed)
      .forEach(s => recipients.add(s.email.toLowerCase()));

    const emailsToSend: Array<{ to: string; subject: string; body: string; date: string }> = [];

    recipients.forEach((email) => {
      const subjectFR = `[HR Skills] Nouvelle Session de Stage en Informatique - Débute le ${newSession.startDate}`;
      const subjectEN = `[HR Skills] New IT Internship Session - Starts on ${newSession.startDate}`;
      
      const bodyFR = `
Bonjour,

Une nouvelle session de stage académique encadré en Informatique a été ouverte chez HR Skills SARL à Yaoundé !

Détails de la session :
- Date de début : ${newSession.startDate}
- Durée de l'encadrement : 3 mois (jusqu'au ${newSession.endDate})
- Frais d'inscription : ${config.registrationFee} XAF (obligatoires et bloquants)
- Frais de stage : Niveau 1 (30 000 XAF) / Niveau 2+ (40 000 XAF)
- Paiement flexible en 1 ou 2 tranches.

Inscrivez-vous dès maintenant et déposez vos dossiers directement sur la plateforme en ligne pour sécuriser votre place !
Lien direct : https://hrskills.com/register

Cordialement,
L'équipe RH Skills SARL
Yaoundé, Cameroun
      `;

      emailsToSend.push({
        to: email,
        subject: `${subjectFR} / ${subjectEN}`,
        body: bodyFR,
        date: new Date().toISOString()
      });
    });

    set((state) => ({
      systemEmailsSent: [...state.systemEmailsSent, ...emailsToSend]
    }));

    console.log(`[Auto-Newsletter] Sent ${emailsToSend.length} emails to subscribers about new session: ${newSession.nameFr}`);
  }
}));
