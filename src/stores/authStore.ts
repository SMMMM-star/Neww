import create from 'zustand';
import { users } from '../data/users';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'admin' | 'user' | null;
  userData: {
    id: string;
    username: string;
  } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  userData: null,
  login: async (username, password) => {
    const user = users.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      set({
        isAuthenticated: true,
        userRole: user.role as 'admin' | 'user',
        userData: { id: user.id, username: user.username }
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({
      isAuthenticated: false,
      userRole: null,
      userData: null
    });
  }
}));