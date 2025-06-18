import React from 'react';
import { SidebarConfig, SidebarItem } from '../../types/common';

export interface SidebarProps {
  config: SidebarConfig;
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  config,
  collapsed
}) => {
  const renderSidebarItem = (item: SidebarItem, level = 0) => (
    <li key={item.id} className="mb-1">
      <a
        href={item.href}
        onClick={item.onClick}
        className={`
          flex items-center px-4 py-2 text-sm rounded-lg transition-colors
          ${item.active 
            ? 'bg-dashboard-primary text-white' 
            : 'text-dashboard-text hover:bg-gray-100'
          }
          ${collapsed ? 'justify-center' : ''}
        `}
        style={{ paddingLeft: collapsed ? '1rem' : `${1 + level * 0.5}rem` }}
      >
        {item.icon && (
          <span className={`${collapsed ? '' : 'mr-3'}`}>
            {item.icon}
          </span>
        )}
        {!collapsed && <span>{item.label}</span>}
      </a>
      
      {item.children && !collapsed && (
        <ul className="ml-4 mt-1">
          {item.children.map(child => renderSidebarItem(child, level + 1))}
        </ul>
      )}
    </li>
  );

  return (
    <aside 
      className={`
        bg-dashboard-surface border-r border-gray-200 transition-all duration-300
        ${collapsed ? 'w-16' : `w-${config.width || 64}`}
      `}
    >
      <div className="p-4">
        <nav>
          <ul>
            {config.items.map(item => renderSidebarItem(item))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};