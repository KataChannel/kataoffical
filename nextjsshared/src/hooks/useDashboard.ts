import { useState, useCallback } from 'react';
import { DashboardConfig } from '../types/common';

export const useDashboard = (initialConfig: DashboardConfig) => {
  const [config, setConfig] = useState<DashboardConfig>(initialConfig);
  const [loading, setLoading] = useState(false);

  const updateConfig = useCallback((newConfig: Partial<DashboardConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const updateSidebarItems = useCallback((items: any[]) => {
    setConfig(prev => ({
      ...prev,
      sidebar: {
        ...prev.sidebar!,
        items
      }
    }));
  }, []);

  return {
    config,
    loading,
    updateConfig,
    updateSidebarItems,
    setLoading
  };
};