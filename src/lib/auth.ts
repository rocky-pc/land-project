export interface User {
  id: string;
  name: string;
  plotId: string;
  isLoggedIn: boolean;
}

// Mock valid plot IDs for demonstration
const VALID_PLOT_IDS = [
  'TN-CUD-001',
  'TN-CHE-002', 
  'TN-MDU-003',
  'LAND2026',
  'UK-INVEST-01',
  'CUDDALORE-PLOT'
];

export const validatePlotID = (id: string): boolean => {
  return VALID_PLOT_IDS.includes(id.toUpperCase().trim());
};

export const getDemoUser = (plotId: string): User | null => {
  if (!validatePlotID(plotId)) return null;
  
  return {
    id: 'user-' + Math.random().toString(36).substr(2, 9),
    name: 'Demo Investor',
    plotId: plotId.toUpperCase().trim(),
    isLoggedIn: true
  };
};

export const clearDemoUser = (): User => ({
  id: '',
  name: '',
  plotId: '',
  isLoggedIn: false
});