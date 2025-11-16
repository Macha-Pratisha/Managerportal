import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';

interface User {
  managerId: string;
  email: string;
  branchName: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  branchName: string;
  documents: FileList | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/manager/login', { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));

      setUser(userData);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('branchName', data.branchName);

      if (data.documents) {
        Array.from(data.documents).forEach((file) => formData.append('documents', file));
      }

      const response = await axiosInstance.post('/manager/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { token, user: userData } = response.data;

      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));

      setUser(userData);

      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
