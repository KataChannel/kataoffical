// Components
export { Dashboard } from './components/Dashboard/Dashboard';
export { Sidebar } from './components/Sidebar/Sidebar';
export { Header } from './components/Header/Header';

// Hooks
export { useDashboard } from './hooks/useDashboard';

// Types
export type {
  DashboardConfig,
  SidebarConfig,
  SidebarItem,
  HeaderConfig,
  UserMenuItem,
  DashboardStats
} from './types/common';

// Component Props Types
export type { DashboardProps } from './components/Dashboard/Dashboard';
export type { SidebarProps } from './components/Sidebar/Sidebar';
export type { HeaderProps } from './components/Header/Header';