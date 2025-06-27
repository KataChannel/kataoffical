import { useEffect } from 'react';
import { LogEntry } from '../types/game';

interface NotificationSystemProps {
  notifications: LogEntry[];
  setNotifications: React.Dispatch<React.SetStateAction<LogEntry[]>>;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, setNotifications }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg shadow-md text-sm ${
            notif.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          } text-white animate-fade-in-up`}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;