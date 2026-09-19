export interface ParticipantData {
  fullName: string;
  rollNumber: string;
  department: string;
  whatsappNumber: string;
  facebookUrl: string;
  photoFile: File | null;
  photoBase64: string;
  photoName: string;
}

export interface RegistrationFormData {
  groupLeader: ParticipantData;
  member1: ParticipantData;
  member2: ParticipantData;
  bkashNumber: string;
  transactionId: string;
}

export interface SubmissionResult {
  success: boolean;
  registrationId?: string;
  error?: string;
  timestamp?: string;
  spreadsheetUrl?: string;
  driveFolderUrl?: string;
}

export interface SubmittedRecord {
  registrationId: string;
  submissionDate: string;
  paymentStatus: string;
  groupLeader: {
    fullName: string;
    rollNumber: string;
    department: string;
    whatsappNumber: string;
    facebookUrl: string;
    photoUrl?: string;
  };
  member1: {
    fullName: string;
    rollNumber: string;
    department: string;
    whatsappNumber: string;
    facebookUrl: string;
    photoUrl?: string;
  };
  member2: {
    fullName: string;
    rollNumber: string;
    department: string;
    whatsappNumber: string;
    facebookUrl: string;
    photoUrl?: string;
  };
  payment: {
    bkashNumber: string;
    transactionId: string;
  };
}

export type PageRoute = '/' | '/about' | '/guidelines' | '/registration' | '/payment' | '/success' | '/contact';
