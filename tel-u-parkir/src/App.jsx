import React, { useState } from 'react';
import MahasiswaLayout from './layouts/MahasiswaLayout';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
import { dashboardData } from './data/dashboardData';

function App() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [data, setData] = useState(dashboardData);

  const handleSelectMenu = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <MahasiswaLayout
      mahasiswa={data.mahasiswa}
      notifikasi={data.notifikasi}
      activeMenu={activeMenu}
      onSelectMenu={handleSelectMenu}
      footerInfo={data.footerInfo}
    >
      {activeMenu === 'Dashboard' ? (
        <DashboardMahasiswa
          data={data}
          onNavigateMenu={handleSelectMenu}
        />
      ) : (
        <div className="bg-white rounded-2xl p-10 border border-[#EDE4E2] text-center space-y-4">
          <div className="w-16 h-16 bg-[#FCE8E8] text-[#BE1E2D] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            {activeMenu.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-[#242424]">{activeMenu}</h2>
          <p className="text-xs text-[#8A7774] max-w-md mx-auto">
            Halaman {activeMenu} saat ini berada dalam lingkup modul Mahasiswa Tel-U Parkir.
          </p>
          <button
            onClick={() => setActiveMenu('Dashboard')}
            className="px-5 py-2.5 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Kembali ke Dashboard
          </button>
        </div>
      )}
    </MahasiswaLayout>
  );
}

export default App;