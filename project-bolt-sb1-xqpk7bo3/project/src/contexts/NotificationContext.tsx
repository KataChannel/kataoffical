import { createContext, useContext, ReactNode, useState } from 'react';
import { Code as LucideIcon, DollarSign, AlertCircle, Bell, Link as LinkIcon } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: LucideIcon;
  read: boolean;
  date: Date;
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Commission Earned',
    message: 'You earned a commission of $125.00 from a new sale.',
    type: 'success',
    icon: <DollarSign size={16} />,
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '2',
    title: 'New Promotional Campaign',
    message: 'New summer campaign is live. Check out the new creatives.',
    type: 'info',
    icon: <Bell size={16} />,
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '3',
    title: 'Payment Processing',
    message: 'Your payment of $945.20 is being processed.',
    type: 'info',
    icon: <DollarSign size={16} />,
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '4',
    title: 'Link Performance Alert',
    message: 'Your "Summer Promo" link has high traffic but low conversion.',
    type: 'warning',
    icon: <AlertCircle size={16} />,
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
  {
    id: '5',
    title: 'New Affiliate Link Created',
    message: 'Your new link for "Fall Collection" has been created successfully.',
    type: 'success',
    icon: <LinkIcon size={16} />,
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
  },
];

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'date'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      read: false,
      date: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, clearAllNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};