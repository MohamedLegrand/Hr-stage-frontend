export type LevelType = 'LEVEL_1' | 'LEVEL_2';

export type StudentStatus = 'EN_ATTENTE_PAIEMENT' | 'ACTIF' | 'SUSPENDU' | 'TERMINE';

export interface Filiere {
  id: string;
  nameFr: string;
  nameEn: string;
  code: string;
  descriptionFr: string;
  descriptionEn: string;
}

export interface Session {
  id: string;
  nameFr: string;
  nameEn: string;
  startDate: string;
  endDate: string; // Auto-calculated (startDate + 3 months)
  isActive: boolean;
}

export type DocumentType = 'MOTIVATION_LETTER' | 'CV' | 'CNI' | 'STUDENT_CERTIFICATE';

export interface DocumentTypeInfo {
  type: DocumentType;
  labelFr: string;
  labelEn: string;
  required: boolean;
}

export interface StudentDocument {
  id: string;
  studentId: string;
  type: DocumentType;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  uploadDate: string;
  fileSize?: string;
}

export type PaymentType = 'REGISTRATION' | 'TUITION_1' | 'TUITION_2';

export interface Payment {
  id: string;
  studentId: string;
  type: PaymentType;
  amount: number;
  date: string;
  status: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod?: 'MTN' | 'ORANGE' | 'CARD';
  transactionId?: string;
  dueDate?: string;
}

export interface Stagiaire {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  level: LevelType;
  filiereId: string;
  sessionId: string;
  status: StudentStatus;
  registrationDate: string;
  installmentsCount: 1 | 2; // 1 or 2 installments
  emailVerified: boolean;
  newsletterSubscribed: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  date: string;
  source: 'LANDING' | 'STUDENT_OPT_IN';
  active: boolean;
}

export interface GlobalConfig {
  registrationFee: number; // 5000 XAF
  tuitionFeeLevel1: number; // 30000 XAF
  tuitionFeeLevel2: number; // 40000 XAF
  currentSessionId: string;
}
