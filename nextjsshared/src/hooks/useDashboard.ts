import { useState, useCallback } from 'react';
import { DashboardConfig, SidebarItem } from '../types/common';

export const useDashboard = (initialConfig: DashboardConfig) => {
  const [config, setConfig] = useState<DashboardConfig>(initialConfig);
  const [loading, setLoading] = useState(false);

  const updateConfig = useCallback((newConfig: Partial<DashboardConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const updateSidebarItems = useCallback((items: SidebarItem[]) => {
    setConfig(prev => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        items
      }
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        items: prev.sidebar?.items || [],
        collapsible: !prev.sidebar?.collapsible
      }
    }));
  }, []);

  return {
    config,
    updateConfig,
    updateSidebarItems,
    toggleSidebar,
    loading,
    setLoading
  };
};