import { createContext, useContext, ReactNode, useState } from 'react';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Jessica Lee',
  email: 'jessica@example.com',
  avatarUrl: null,
  role: 'affiliate',
  joinDate: new Date('2023-09-15'),
  earnings: {
    total: 12498.32,
    pending: 2340.15,
    lastMonth: 3150.67,
  },
};

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  joinDate: Date;
  earnings: {
    total: number;
    pending: number;
    lastMonth: number;
  };
}

interface UserContextType {
  user: User;
  updateUser: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(mockUser);

  const updateUser = (data: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...data,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};