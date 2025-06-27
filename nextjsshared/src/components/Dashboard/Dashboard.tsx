import React, { useState } from 'react';
import { DashboardConfig } from '../../types/common';

interface DashboardProps {
  config: DashboardConfig;
  children: React.ReactNode;
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  config,
  children,
  className = '',
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${className}`}>
      <div className="flex">
        {/* Sidebar */}
        {config.sidebar && (
          <div
            className={`
              ${sidebarCollapsed ? 'w-16' : 'w-64'}
              bg-white border-r border-slate-200 shadow-sm transition-all duration-300
              flex flex-col
            `}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    {config.logo && (
                      <img src={config.logo} alt="Logo" className="w-8 h-8" />
                    )}
                    <span className="text-lg font-semibold text-slate-900">
                      {config.title}
                    </span>
                  </div>
                )}
                {config.sidebar.collapsible && (
                  <button
                    onClick={toggleSidebar}
                    className="p-1 rounded hover:bg-slate-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {config.sidebar.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href || '#'}
                      className={`
                        flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                        ${item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }
                      `}
                      onClick={item.onClick}
                    >
                      {item.icon && (
                        <span className="mr-3 text-lg">{item.icon}</span>
                      )}
                      {!sidebarCollapsed && (
                        <span>{item.label}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          {config.header && (
            <header className="bg-white border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-semibold text-slate-900">
                    {config.title}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  {config.header.showSearch && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-64 px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                  
                  {config.header.showNotifications && (
                    <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                  )}
                  
                  {config.header.showProfile && (
                    <div className="relative">
                      <button className="flex items-center space-x-2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md">
                        <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                        <span className="text-sm font-medium">User</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
          )}

          {/* Content */}
          <main className="flex-1 p-6 bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};