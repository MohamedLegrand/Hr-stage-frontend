import { Filiere, Session, Stagiaire, StudentDocument, Payment, GlobalConfig, NewsletterSubscriber } from '../types';

export const INITIAL_FILIERES: Filiere[] = [
  {
    id: 'f1',
    code: 'UML',
    nameFr: 'Analyse UML & MERISE',
    nameEn: 'UML & MERISE Analysis',
    descriptionFr: 'Conception de bases de données, modélisation des processus métiers et élaboration de cahiers des charges structurés.',
    descriptionEn: 'Database design, business process modeling, and drafting of structured technical specifications.'
  },
  {
    id: 'f2',
    code: 'WEB',
    nameFr: 'Développement Web',
    nameEn: 'Web Development',
    descriptionFr: 'Apprentissage des frameworks modernes (React, Node.js, Express) et intégration de maquettes responsives.',
    descriptionEn: 'Learning modern frameworks (React, Node.js, Express) and integration of responsive designs.'
  },
  {
    id: 'f3',
    code: 'MOBILE',
    nameFr: 'Développement Mobile',
    nameEn: 'Mobile Development',
    descriptionFr: 'Création d’applications cross-platform performantes avec Flutter ou natives avec Kotlin/Swift.',
    descriptionEn: 'Creation of performant cross-platform applications with Flutter or native with Kotlin/Swift.'
  },
  {
    id: 'f4',
    code: 'DESIGN',
    nameFr: 'Design Graphique',
    nameEn: 'Graphic Design & UI/UX',
    descriptionFr: 'Maîtrise des outils de création visuelle et élaboration d’interfaces utilisateurs ergonomiques sur Figma.',
    descriptionEn: 'Mastery of visual creation tools and development of ergonomic user interfaces on Figma.'
  },
  {
    id: 'f5',
    code: 'NET',
    nameFr: 'Systèmes & Réseaux',
    nameEn: 'Systems & Networks',
    descriptionFr: 'Administration de serveurs Linux/Windows, sécurité des infrastructures réseau et câblage.',
    descriptionEn: 'Administration of Linux/Windows servers, network infrastructure security, and cabling.'
  },
  {
    id: 'f6',
    code: 'DEVOPS',
    nameFr: 'DevOps & Cloud',
    nameEn: 'DevOps & Cloud Computing',
    descriptionFr: 'Automatisation des déploiements, conteneurisation Docker, CI/CD et gestion d’infrastructures cloud.',
    descriptionEn: 'Automation of deployments, Docker containerization, CI/CD, and cloud infrastructure management.'
  }
];

export const INITIAL_SESSIONS: Session[] = [
  {
    id: 's1',
    nameFr: 'Session de Juillet 2026',
    nameEn: 'July 2026 Session',
    startDate: '2026-07-01',
    endDate: '2026-10-01',
    isActive: true
  },
  {
    id: 's2',
    nameFr: 'Session d’Avril 2026',
    nameEn: 'April 2026 Session',
    startDate: '2026-04-01',
    endDate: '2026-07-01',
    isActive: false
  },
  {
    id: 's3',
    nameFr: 'Session de Janvier 2026',
    nameEn: 'January 2026 Session',
    startDate: '2026-01-01',
    endDate: '2026-04-01',
    isActive: false
  }
];

export const INITIAL_CONFIG: GlobalConfig = {
  registrationFee: 5000,
  tuitionFeeLevel1: 30000,
  tuitionFeeLevel2: 40000,
  currentSessionId: 's1'
};

export const INITIAL_STUDENTS: Stagiaire[] = [
  {
    id: 'student-1',
    firstName: 'Arnaud',
    lastName: 'Ngoa',
    email: 'arnaud.ngoa@gmail.com',
    school: 'IAI Cameroun',
    level: 'LEVEL_2',
    filiereId: 'f2', // Web Dev
    sessionId: 's1',
    status: 'ACTIF',
    registrationDate: '2026-06-15',
    installmentsCount: 2,
    emailVerified: true,
    newsletterSubscribed: true
  },
  {
    id: 'student-2',
    firstName: 'Brenda',
    lastName: 'Ekani',
    email: 'brenda.ekani@yahoo.fr',
    school: 'Université de Yaoundé I',
    level: 'LEVEL_1',
    filiereId: 'f3', // Mobile Dev
    sessionId: 's1',
    status: 'SUSPENDU',
    registrationDate: '2026-06-10',
    installmentsCount: 2,
    emailVerified: true,
    newsletterSubscribed: false
  },
  {
    id: 'student-3',
    firstName: 'Cedric',
    lastName: 'Talla',
    email: 'cedric.talla@live.com',
    school: 'Polytechnique Yaoundé',
    level: 'LEVEL_2',
    filiereId: 'f6', // DevOps
    sessionId: 's1',
    status: 'EN_ATTENTE_PAIEMENT',
    registrationDate: '2026-06-25',
    installmentsCount: 1,
    emailVerified: true,
    newsletterSubscribed: true
  },
  {
    id: 'student-4',
    firstName: 'Daniella',
    lastName: 'Mvondo',
    email: 'daniella.mv@outlook.com',
    school: 'PKFokam Institute',
    level: 'LEVEL_2',
    filiereId: 'f4', // Design UI/UX
    sessionId: 's3', // January session
    status: 'TERMINE',
    registrationDate: '2025-12-20',
    installmentsCount: 1,
    emailVerified: true,
    newsletterSubscribed: true
  }
];

export const INITIAL_DOCUMENTS: StudentDocument[] = [
  // student-1 (Arnaud) has submitted all and approved
  {
    id: 'doc-1',
    studentId: 'student-1',
    type: 'MOTIVATION_LETTER',
    name: 'Lettre_Motivation_Arnaud.pdf',
    status: 'APPROVED',
    uploadDate: '2026-06-15'
  },
  {
    id: 'doc-2',
    studentId: 'student-1',
    type: 'CV',
    name: 'CV_Arnaud_Ngoa.pdf',
    status: 'APPROVED',
    uploadDate: '2026-06-15'
  },
  {
    id: 'doc-3',
    studentId: 'student-1',
    type: 'CNI',
    name: 'CNI_Ngoa_Arnaud.jpg',
    status: 'APPROVED',
    uploadDate: '2026-06-16'
  },
  {
    id: 'doc-4',
    studentId: 'student-1',
    type: 'STUDENT_CERTIFICATE',
    name: 'Scolarite_IAI_2026.pdf',
    status: 'APPROVED',
    uploadDate: '2026-06-16'
  },

  // student-2 (Brenda) has submitted some, some approved, some pending
  {
    id: 'doc-5',
    studentId: 'student-2',
    type: 'MOTIVATION_LETTER',
    name: 'Lettre_Motivation_Brenda.pdf',
    status: 'APPROVED',
    uploadDate: '2026-06-10'
  },
  {
    id: 'doc-6',
    studentId: 'student-2',
    type: 'CV',
    name: 'CV_Brenda_Ekani.pdf',
    status: 'PENDING',
    uploadDate: '2026-06-10'
  },
  {
    id: 'doc-7',
    studentId: 'student-2',
    type: 'CNI',
    name: 'CNI_Brenda.jpg',
    status: 'APPROVED',
    uploadDate: '2026-06-11'
  },
  // Certificat missing for student-2

  // student-3 (Cedric) has submitted all but they are pending review
  {
    id: 'doc-8',
    studentId: 'student-3',
    type: 'MOTIVATION_LETTER',
    name: 'Motivation_Talla.pdf',
    status: 'PENDING',
    uploadDate: '2026-06-25'
  },
  {
    id: 'doc-9',
    studentId: 'student-3',
    type: 'CV',
    name: 'CV_Cedric_Talla.pdf',
    status: 'PENDING',
    uploadDate: '2026-06-25'
  },
  {
    id: 'doc-10',
    studentId: 'student-3',
    type: 'CNI',
    name: 'CNI_Talla.pdf',
    status: 'PENDING',
    uploadDate: '2026-06-25'
  },
  {
    id: 'doc-11',
    studentId: 'student-3',
    type: 'STUDENT_CERTIFICATE',
    name: 'Certificat_Polytech.pdf',
    status: 'PENDING',
    uploadDate: '2026-06-25'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  // student-1 (Arnaud) Paid registration and 1st tuition installment. 2nd is paid too.
  {
    id: 'pay-1',
    studentId: 'student-1',
    type: 'REGISTRATION',
    amount: 5000,
    date: '2026-06-15',
    status: 'PAID',
    paymentMethod: 'MTN',
    transactionId: 'TXN-908231'
  },
  {
    id: 'pay-2',
    studentId: 'student-1',
    type: 'TUITION_1',
    amount: 20000, // level 2 is 40000, installment 1 is 20000
    date: '2026-06-16',
    status: 'PAID',
    paymentMethod: 'ORANGE',
    transactionId: 'TXN-112390'
  },
  {
    id: 'pay-3',
    studentId: 'student-1',
    type: 'TUITION_2',
    amount: 20000,
    date: '2026-06-29',
    status: 'PAID',
    paymentMethod: 'CARD',
    transactionId: 'TXN-445890'
  },

  // student-2 (Brenda) Paid registration, 1st installment, but 2nd installment is OVERDUE (suspended)
  {
    id: 'pay-4',
    studentId: 'student-2',
    type: 'REGISTRATION',
    amount: 5000,
    date: '2026-06-10',
    status: 'PAID',
    paymentMethod: 'ORANGE',
    transactionId: 'TXN-554129'
  },
  {
    id: 'pay-5',
    studentId: 'student-2',
    type: 'TUITION_1',
    amount: 15000, // level 1 is 30000, 1st installment is 15000
    date: '2026-06-10',
    status: 'PAID',
    paymentMethod: 'MTN',
    transactionId: 'TXN-887410'
  },
  {
    id: 'pay-6',
    studentId: 'student-2',
    type: 'TUITION_2',
    amount: 15000,
    date: '2026-06-25', // Overdue date
    status: 'PENDING',
    dueDate: '2026-06-25'
  },

  // student-3 (Cedric) Has NOT paid registration (En attente paiement)
  {
    id: 'pay-7',
    studentId: 'student-3',
    type: 'REGISTRATION',
    amount: 5000,
    date: '2026-06-25',
    status: 'PENDING',
    dueDate: '2026-07-01'
  }
];

export const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    email: 'visitor.jean@gmail.com',
    date: '2026-06-01',
    source: 'LANDING',
    active: true
  },
  {
    email: 'student.old@outlook.com',
    date: '2026-05-15',
    source: 'LANDING',
    active: true
  }
];
