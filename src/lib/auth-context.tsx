import { createContext, useContext, useState, ReactNode } from 'react';
import { User, validatePlotID, getDemoUser, clearDemoUser } from './auth';

interface AuthContextProps {
  user: User;
  login: (plotId: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    plotId: '',
    isLoggedIn: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (plotId: string): boolean => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      if (validatePlotID(plotId)) {
        const demoUser = getDemoUser(plotId);
        if (demoUser) {
          setUser(demoUser);
          // Store in localStorage for persistence
          localStorage.setItem('land_user', JSON.stringify(demoUser));
        }
      } else {
        setUser({
          id: '',
          name: '',
          plotId: '',
          isLoggedIn: false
        });
      }
      setIsLoading(false);
    }, 500);
    return validatePlotID(plotId);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      clearDemoUser();
      setUser({
        id: '',
        name: '',
        plotId: '',
        isLoggedIn: false
      });
      localStorage.removeItem('land_user');
      setIsLoading(false);
    }, 300);
  };

  // Check for saved user on initial load
  // In a real app, you'd do this in a useEffect, but for simplicity:
  // const savedUser = localStorage.getItem('land_user');
  // if (savedUser) setUser(JSON.parse(savedUser));

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}