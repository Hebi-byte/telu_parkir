import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import SatpamLayout from './layouts/SatpamLayout';
import AntreanLaporanSatpam from './pages/AntreanLaporanSatpam';
import DashboardSatpam from './pages/DashboardSatpam';
import RiwayatLaporanSatpam from './pages/RiwayatLaporanSatpam';
import TolakLaporanSatpam from './pages/TolakLaporanSatpam';
import VerifikasiLaporan from './pages/VerifikasiLaporan';

function ComingSoonPage() {
  const { section } = useParams();
  const title = {
    verifikasi: 'Verifikasi',
    kehilangan: 'Kehilangan',
    profil: 'Profil',
    riwayat: 'Riwayat Pelanggaran & Poin',
    koreksi: 'Ajukan Koreksi ke Admin',
  }[section] || 'Halaman';

  return (
    <section className="rounded-2xl border border-[#EDE4E2] bg-white p-8">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-[#8A7774]">
        Halaman ini belum tersedia dalam lingkup Portal Satpam saat ini.
      </p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/satpam/dashboard" replace />} />
        <Route path="/satpam" element={<SatpamLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardSatpam />} />
          <Route path="verifikasi" element={<AntreanLaporanSatpam />} />
          <Route path="verifikasi/:reportId" element={<VerifikasiLaporan />} />
          <Route path="verifikasi/:reportId/tolak" element={<TolakLaporanSatpam />} />
          <Route path="riwayat" element={<RiwayatLaporanSatpam />} />
          <Route path=":section" element={<ComingSoonPage />} />
          <Route path=":section/:itemId" element={<ComingSoonPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/satpam/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
