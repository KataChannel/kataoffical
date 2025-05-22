import { ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Link, 
  DollarSign, 
  Wallet, 
  Palette, 
  Settings, 
  Bell, 
  User, 
  Menu, 
  X,
  Search
} from 'lucide-react';
import NotificationPanel from '../components/NotificationPanel';
import { useNotification } from '../contexts/NotificationContext';
import { useUser } from '../contexts/UserContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const { notifications } = useNotification();
  const { user } = useUser();

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  const navItems = [
    { name: 'Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Affiliate Links', path: '/links', icon: <Link size={20} /> },
    { name: 'Commissions', path: '/commissions', icon: <DollarSign size={20} /> },
    { name: 'Payments', path: '/payments', icon: <Wallet size={20} /> },
    { name: 'Creatives', path: '/creatives', icon: <Palette size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 10L21 14M21 10L17 14M3 10L9 16L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-2 text-lg font-semibold text-gray-900">AffiliateHub</span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 px-4">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                  <DollarSign size={20} className="text-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Total Earnings</p>
                  <p className="text-xl font-semibold text-primary">$12,498.32</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Notifications panel */}
      {notificationsOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-gray-900/50"
            onClick={() => setNotificationsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-lg animate-slideInRight">
            <NotificationPanel onClose={() => setNotificationsOpen(false)} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-10 h-16 bg-white shadow-sm">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex lg:hidden">
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-end md:justify-between">
              <div className="relative hidden md:block w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 input"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  className="relative rounded-full p-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setNotificationsOpen(true)}
                >
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-medium text-white">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
                
                <div className="relative">
                  <button className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                      {user.name.charAt(0)}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;