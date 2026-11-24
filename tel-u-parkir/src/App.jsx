import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import SatpamLayout from './layouts/SatpamLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminModulePage from './pages/AdminModulePage';
import AdminPelanggaran from './pages/AdminPelanggaran';
import AntreanLaporanSatpam from './pages/AntreanLaporanSatpam';
import BuatLaporanKunciSatpam from './pages/BuatLaporanKunciSatpam';
import DashboardSatpam from './pages/DashboardSatpam';
import KehilanganSatpam from './pages/KehilanganSatpam';
import ProfilSatpam from './pages/ProfilSatpam';
import RiwayatLaporanSatpam from './pages/RiwayatLaporanSatpam';
import TolakLaporanSatpam from './pages/TolakLaporanSatpam';
import VerifikasiLaporan from './pages/VerifikasiLaporan';
import SatpamProfileProvider from './SatpamProfileProvider';

function SatpamLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F7] p-5 text-[#242424]">
      <section className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white p-7 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8E8] text-lg font-extrabold text-[#BE1E2D]">
          P.
        </div>
        <h1 className="mt-4 text-xl font-extrabold">Anda telah keluar</h1>
        <p className="mt-2 text-sm text-[#8A7774]">
          Sesi keluar ini disimulasikan karena autentikasi belum terhubung.
        </p>
        <Link
          to="/satpam/dashboard"
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#BE1E2D] px-4 text-sm font-bold text-white hover:bg-[#A51020]"
        >
          Kembali ke Portal Satpam
        </Link>
      </section>
    </main>
  );
}

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
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-[#8A7774]">
        Halaman ini belum tersedia dalam lingkup Portal Satpam saat ini.
      </p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SatpamProfileProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/satpam/dashboard" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pelanggaran" element={<AdminPelanggaran />} />
            <Route path="verifikasi" element={<Navigate to="/satpam/verifikasi" replace />} />
            <Route path="kehilangan" element={<AdminModulePage title="Kehilangan" />} />
            <Route path="pengaturan" element={<AdminModulePage title="Profil & Pengaturan" />} />
            <Route path="*" element={<AdminModulePage title="Halaman tidak ditemukan" />} />
          </Route>
          <Route path="/satpam/login" element={<SatpamLoginPage />} />
          <Route path="/satpam" element={<SatpamLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardSatpam />} />
            <Route path="verifikasi" element={<AntreanLaporanSatpam />} />
            <Route path="verifikasi/:reportId" element={<VerifikasiLaporan />} />
            <Route path="verifikasi/:reportId/tolak" element={<TolakLaporanSatpam />} />
            <Route path="kehilangan" element={<KehilanganSatpam />} />
            <Route path="kehilangan/buat-laporan" element={<BuatLaporanKunciSatpam />} />
            <Route path="profil" element={<ProfilSatpam />} />
            <Route path="riwayat" element={<RiwayatLaporanSatpam />} />
            <Route path=":section" element={<ComingSoonPage />} />
            <Route path=":section/:itemId" element={<ComingSoonPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/satpam/dashboard" replace />} />
        </Routes>
      </SatpamProfileProvider>
    </BrowserRouter>
  );
}

export default App;
