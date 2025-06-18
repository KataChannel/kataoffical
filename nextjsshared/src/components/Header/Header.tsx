import React from 'react';
import { HeaderConfig } from '../../types/common';

export interface HeaderProps {
  config: HeaderConfig;
  title: string;
  logo?: string;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  title,
  logo,
  onMenuClick
}) => {
  return (
    <header className="bg-dashboard-surface border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {logo && (
            <img src={logo} alt="Logo" className="h-8 w-8 mr-3" />
          )}
          
          <h1 className="text-xl font-semibold text-dashboard-text">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {config.showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dashboard-primary focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}

          {config.showNotifications && (
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
          )}

          {config.showProfile && (
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-dashboard-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  U
                </div>
                <span className="text-sm font-medium text-dashboard-text">User</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};