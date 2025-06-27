// Export all components
export { Dashboard } from './components/Dashboard/Dashboard';
export { Button } from './components/Button/Button';
export { Sidebar } from './components/Sidebar/Sidebar';
export { Header } from './components/Header/Header';

// Export all types
export type { 
  DashboardConfig, 
  SidebarConfig, 
  HeaderConfig, 
  SidebarItem,
  UserMenuItem 
} from './types/common';

// Export hooks
export { useDashboard } from './hooks/useDashboard';

// Export styles
import './styles/index.css';