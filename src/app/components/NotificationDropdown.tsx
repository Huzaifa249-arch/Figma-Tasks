import { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Cloud, 
  Shield, 
  Anchor,
  Clock,
  Ship,
  X,
  Check
} from 'lucide-react';

type NotificationType = 'critical' | 'warning' | 'info' | 'success';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  icon: typeof AlertTriangle;
  read: boolean;
  category: 'congestion' | 'weather' | 'security' | 'operational';
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Piracy Risk Alert',
    description: 'High-risk activity detected in zone 7. Vessels advised to increase security measures.',
    timestamp: '2 min ago',
    icon: Shield,
    read: false,
    category: 'security'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Storm Warning',
    description: 'Severe weather system approaching. Expected wind speeds 45-60 knots in 3 hours.',
    timestamp: '8 min ago',
    icon: Cloud,
    read: false,
    category: 'weather'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Congestion Alert',
    description: 'Berth 7 experiencing high congestion. Current wait time: 52 minutes.',
    timestamp: '15 min ago',
    icon: AlertTriangle,
    read: false,
    category: 'congestion'
  },
  {
    id: '4',
    type: 'info',
    title: 'Vessel Arrival Delayed',
    description: 'MV Pacific Star ETA updated to 18:45 UTC due to weather conditions.',
    timestamp: '32 min ago',
    icon: Ship,
    read: true,
    category: 'operational'
  },
  {
    id: '5',
    type: 'success',
    title: 'Berth 3 Available',
    description: 'Loading operations completed. Berth ready for next vessel.',
    timestamp: '1 hour ago',
    icon: Anchor,
    read: true,
    category: 'operational'
  },
  {
    id: '6',
    type: 'info',
    title: 'Maintenance Schedule',
    description: 'Crane 5 scheduled for preventive maintenance tonight 22:00-04:00 UTC.',
    timestamp: '2 hours ago',
    icon: Clock,
    read: true,
    category: 'operational'
  }
];

const getTypeConfig = (type: NotificationType) => {
  switch (type) {
    case 'critical':
      return {
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        dotColor: 'bg-red-500'
      };
    case 'warning':
      return {
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        dotColor: 'bg-amber-500'
      };
    case 'info':
      return {
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        dotColor: 'bg-blue-500'
      };
    case 'success':
      return {
        color: 'text-teal-400',
        bgColor: 'bg-teal-500/10',
        borderColor: 'border-teal-500/30',
        dotColor: 'bg-teal-500'
      };
  }
};

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-[#0a0f1e] border border-[#1e293b] rounded-lg shadow-2xl z-50 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Notifications</h3>
            <p className="text-slate-400 text-xs mt-1">
              {unreadCount} unread {unreadCount === 1 ? 'alert' : 'alerts'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto flex-1">
          {notificationList.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1e293b]">
              {notificationList.map((notification) => {
                const config = getTypeConfig(notification.type);
                const Icon = notification.icon;

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-[#0f1629] transition-colors relative ${
                      !notification.read ? 'bg-[#0f1629]/50' : ''
                    }`}
                  >
                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${config.dotColor}`} />
                    )}

                    <div className="flex gap-3 pl-4">
                      {/* Icon */}
                      <div className={`${config.bgColor} border ${config.borderColor} p-2 rounded-lg h-fit`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                          <button
                            onClick={() => clearNotification(notification.id)}
                            className="text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-slate-400 text-xs mb-2 line-clamp-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs">{notification.timestamp}</span>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-teal-400 hover:text-teal-300 text-xs font-medium"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#1e293b] bg-[#0f1629]">
          <button className="w-full text-center text-teal-400 hover:text-teal-300 text-sm font-medium py-2 rounded-lg hover:bg-[#0a0f1e] transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
}

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className = '' }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-[#0f1629] rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full px-1 border-2 border-[#0a0f1e]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}