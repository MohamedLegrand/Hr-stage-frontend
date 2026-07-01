import { create } from 'zustand';
import { Stagiaire } from '../types';

interface AuthState {
  user: Stagiaire | { isAdmin: true; email: string; firstName: string; lastName: string } | null;
  registrationDraft: Partial<Stagiaire> & { password?: string } | null;
  login: (email: string, role: 'admin' | 'student', allStudents?: Stagiaire[]) => boolean;
  logout: () => void;
  setRegistrationDraft: (draft: Partial<Stagiaire> & { password?: string } | null) => void;
  updateUserInSession: (updatedUser: Stagiaire) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  registrationDraft: null,

  login: (email, role, allStudents) => {
    if (role === 'admin') {
      if (email.toLowerCase() === 'admin@hrskills.com') {
        set({
          user: {
            isAdmin: true,
            email: 'admin@hrskills.com',
            firstName: 'Directeur',
            lastName: 'Général'
          }
        });
        return true;
      }
      return false;
    } else {
      // Find the student in the registered students list
      const student = allStudents?.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (student) {
        set({ user: student });
        return true;
      }
      return false;
    }
  },

  logout: () => {
    set({ user: null, registrationDraft: null });
  },

  setRegistrationDraft: (draft) => {
    set({ registrationDraft: draft });
  },

  updateUserInSession: (updatedUser) => {
    set((state) => {
      if (state.user && !('isAdmin' in state.user) && state.user.id === updatedUser.id) {
        return { user: updatedUser };
      }
      return {};
    });
  }
}));
