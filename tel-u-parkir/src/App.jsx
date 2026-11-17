import { useState } from 'react';
import MahasiswaLayout from './layouts/MahasiswaLayout';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
import LeaderboardMahasiswa from './pages/LeaderboardMahasiswa';
import KehilanganMahasiswa from './pages/KehilanganMahasiswa';
import LaporParkirMahasiswa from './pages/LaporParkirMahasiswa';
import { dashboardData } from './data/dashboardData';

const initialParkingReports = [
  {
    id: 'LPR-001',
    plate: 'D 3319 ZB',
    location: 'Jalur Pedestrian',
    time: 'Hari ini, 08:15 WIB',
    createdAt: '2026-11-17T08:15:00+07:00',
    status: 'Menunggu',
  },
  {
    id: 'LPR-002',
    plate: 'D 4521 TLU',
    location: 'Parkiran FIT',
    time: 'Kemarin, 14:32 WIB',
    createdAt: '2026-11-16T14:32:00+07:00',
    status: 'Dalam Peninjauan',
  },
  {
    id: 'LPR-003',
    plate: 'F 1042 ABC',
    location: 'Parkiran Motor GKU / Tokong Nanas',
    time: '12 Nov 2026, 10:20 WIB',
    createdAt: '2026-11-12T10:20:00+07:00',
    status: 'Terverifikasi',
  },
];

function App() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [data] = useState(dashboardData);
  const [parkingReports, setParkingReports] = useState(initialParkingReports);

  const handleSelectMenu = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleSubmitParkingReport = (report) => {
    setParkingReports((currentReports) => [report, ...currentReports]);
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
      ) : activeMenu === 'Leaderboard' ? (
        <LeaderboardMahasiswa mahasiswa={data.mahasiswa} poin={data.akumulasiPoin.poin} />
      ) : activeMenu === 'Kehilangan' ? (
        <KehilanganMahasiswa />
      ) : activeMenu === 'Lapor Parkir' ? (
        <LaporParkirMahasiswa
          reports={parkingReports}
          onSubmitReport={handleSubmitParkingReport}
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