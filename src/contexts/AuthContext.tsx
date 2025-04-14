import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  avatar?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 从localStorage检查登录状态
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // 模拟登录API调用
    try {
      // 实际项目中这里应该调用后端API
      const mockUser = { username, avatar: undefined };
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/promotion');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    // 模拟注册API调用
    try {
      // 实际项目中这里应该调用后端API
      const mockUser = { username, avatar: undefined };
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/promotion');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/promotion');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};