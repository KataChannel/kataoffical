import { Bell, X, Check } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const { notifications, markAsRead, clearAllNotifications } = useNotification();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Notifications</h2>
        <button onClick={onClose}>
          <X size={20} className="text-gray-500 hover:text-gray-900" />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-sm text-gray-500">
          {notifications.filter(n => !n.read).length} unread notifications
        </span>
        <button 
          className="text-sm text-primary hover:text-primary-hover"
          onClick={clearAllNotifications}
        >
          Clear all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-100 p-3 rounded-full">
              <Bell size={24} className="text-gray-400" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              You're all caught up! We'll let you know when something new arrives.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`relative p-4 rounded-lg border transition-all ${
                  notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}
              >
                {!notification.read && (
                  <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
                )}
                <div className="flex">
                  <div className={`flex-shrink-0 rounded-full p-2 ${
                    notification.type === 'success' ? 'bg-green-100 text-success' :
                    notification.type === 'warning' ? 'bg-amber-100 text-warning' :
                    notification.type === 'error' ? 'bg-red-100 text-error' :
                    'bg-blue-100 text-primary'
                  }`}>
                    {notification.icon}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(notification.date, { addSuffix: true })}
                      </span>
                      {!notification.read && (
                        <button 
                          className="flex items-center text-xs text-primary hover:text-primary-hover"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check size={12} className="mr-1" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;