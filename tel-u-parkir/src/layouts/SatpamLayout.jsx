import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const pageTitles = {
  dashboard: 'Dashboard Satpam',
  verifikasi: 'Antrean Laporan',
  kehilangan: 'Kehilangan Kunci',
  profil: 'Profil Satpam',
  riwayat: 'Riwayat Laporan',
};

export default function SatpamLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const section = pathSegments[1];
  const isCreatingKeyReport = section === 'kehilangan' && pathSegments[2] === 'buat-laporan';
  const isRejectingReport = section === 'verifikasi' && pathSegments.length > 3;
  const isReviewingReport = section === 'verifikasi' && pathSegments.length > 2;
  const pageTitle = isCreatingKeyReport
    ? 'Buat Laporan Kunci'
    : isRejectingReport
      ? 'Tolak Laporan'
      : isReviewingReport
        ? 'Verifikasi Laporan'
        : pageTitles[section] || 'Dashboard Satpam';
  const breadcrumbItems = isCreatingKeyReport
    ? ['Satpam', 'Kehilangan', 'Buat Laporan']
    : isRejectingReport
      ? ['Satpam', 'Tolak Laporan']
      : isReviewingReport
        ? ['Satpam', 'Verifikasi Laporan', 'Bukti Belum Tersedia']
        : section === 'verifikasi'
          ? ['Satpam', 'Report — Antrean']
          : section === 'riwayat'
            ? ['Satpam', 'Riwayat Laporan']
            : section === 'kehilangan'
              ? ['Satpam', 'Kehilangan']
              : section === 'profil'
                ? ['Satpam', 'Profil Satpam']
                : ['Satpam', pageTitle];

  return (
    <div className="min-h-screen bg-[#FAF8F7] text-[#242424]">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="min-h-screen transition-all duration-300 lg:ml-[225px]">
        <Topbar
          pageTitle={pageTitle}
          breadcrumbItems={breadcrumbItems}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />
        <main className="min-h-[calc(100vh-3.5rem)] px-5 py-6 sm:px-8">
          <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1360px] flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
