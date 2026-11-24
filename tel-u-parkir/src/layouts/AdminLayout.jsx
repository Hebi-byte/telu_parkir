import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import Footer from '../components/Footer';

const pageTitles = {
  dashboard: 'Dashboard Admin',
  pelanggaran: 'Manajemen Pelanggaran',
  verifikasi: 'Antrean Verifikasi Laporan Parkir',
  kehilangan: 'Pengelolaan Kehilangan & Penemuan Kunci',
  pengaturan: 'Profil Admin & Pengaturan',
};

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const section = segments[1] || 'dashboard';
  const isVerifikasiDetail = section === 'verifikasi' && segments[2] && segments[2] !== 'tolak';
  const pageTitle = isVerifikasiDetail
    ? `Detail & Verifikasi — ${segments[2]}`
    : pageTitles[section] || 'Dashboard Admin';

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Tel-U Parkir | ${pageTitle}`;
    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);

  return (
    <div className="min-h-screen bg-[#FAF8F7] text-[#242424]">
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="min-h-screen min-w-0 transition-all duration-300 lg:ml-[225px]">
        <AdminTopbar
          breadcrumbItems={['Admin', pageTitle]}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />
        <main className="min-h-[calc(100vh-3.5rem)] px-4 py-5 sm:px-8 sm:py-6">
          <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1360px] flex-col">
            <div className="min-w-0 flex-1">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
