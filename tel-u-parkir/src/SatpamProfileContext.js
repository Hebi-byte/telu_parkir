import { createContext, useContext } from 'react';

export const SatpamProfileContext = createContext(null);

export function useSatpamProfile() {
  const context = useContext(SatpamProfileContext);
  if (!context) throw new Error('useSatpamProfile must be used within SatpamProfileProvider.');
  return context;
}
