import React, { useState } from 'react';
import { DashboardConfig } from '../../types/common';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';

export interface DashboardProps {
  config: DashboardConfig;
  children: React.ReactNode;
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  config,
  children,
  className = ''
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`flex h-screen bg-dashboard-background ${className}`}>
      {config.sidebar && (
        <Sidebar
          config={config.sidebar}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {config.header && (
          <Header
            config={config.header}
            title={config.title}
            logo={config.logo}
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};