import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // For demo purposes, we're using localStorage to simulate auth
  // In a real app, this would use JWT tokens, cookies, and a backend
  const login = async (email: string, password: string) => {
    // This is a mock login - in a real app, you'd make an API call
    // This simulates authenticating with a backend
    
    // Demo users
    const adminUser = { 
      id: '1', 
      name: 'Admin User', 
      email: 'admin@tourarty.com', 
      role: 'admin' as const 
    };
    
    const regularUser = { 
      id: '2', 
      name: 'John Doe', 
      email: 'user@tourarty.com', 
      role: 'user' as const 
    };
    
    // Simple validation for demo
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Mock authentication logic
    if (email === 'yadavshubham6695@gmail.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      return;
    } else if (email === 'shubhamtourandtravels9@gmail.com' && password === 'user123') {
      localStorage.setItem('user', JSON.stringify(regularUser));
      setUser(regularUser);
      return;
    }
    
    throw new Error('Invalid email or password');
  };

  const register = async (name: string, email: string, password: string) => {
    // This is a mock registration - in a real app, you'd make an API call
    
    // Simple validation
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    
    // In a real app, check if user already exists
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user' as const
    };
    
    // Store in localStorage for demo purposes
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
