import { isValidJwt } from '../utils/isValidJwt';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    
    if (!storedToken || !isValidJwt(storedToken)) {
      console.warn('Token inválido detectado. Limpando localStorage...');
      localStorage.removeItem('access_token');
      setToken(null);
      setUserRole(null);
    } else {
      
      try {
        setToken(storedToken);
        const payload = jwtDecode<{ access?: string }>(storedToken);
        setUserRole(payload.access ?? null);
      } catch (error) {
        console.log("error: ", error);
        setUserRole(null);
      }
    }
  }, []);
  
  const login = (newToken: string) => {
    try {
      if(!newToken || newToken.split('.').length !== 3){
        return
      }
        const payload = jwtDecode<{ access?: string}>(newToken)
        localStorage.setItem('access_token', newToken);
        setToken(newToken)
      setUserRole(payload.access ?? null);

    } catch (error) {
      console.log("error", error)
      localStorage.removeItem("access_token")
      setToken(null)
      setUserRole(null)
    }
  };
  
  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
