import { useState } from 'react';
import { SatpamProfileContext } from './SatpamProfileContext';

const initialProfile = {
  name: 'Budi Santoso',
  email: '',
  phone: '',
  post: 'Pos Satpam Gerbang 1',
  shift: 'Shift Pagi 07:00–15:00',
};

export default function SatpamProfileProvider({ children }) {
  const [profile, setProfile] = useState(initialProfile);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SatpamProfileContext.Provider value={{
      profile,
      setProfile,
      notificationsEnabled,
      setNotificationsEnabled,
    }}>
      {children}
    </SatpamProfileContext.Provider>
  );
}
