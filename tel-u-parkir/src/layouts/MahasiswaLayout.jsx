import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function MahasiswaLayout({
  mahasiswa,
  notifikasi,
  activeMenu = 'Dashboard',
  onSelectMenu,
  footerInfo,
  onOpenProfileModal,
  children
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F7] text-[#242424] flex">
      {/* Permanent Sidebar on Desktop (w-[225px]), Drawer on Mobile */}
      <Sidebar
        activeMenu={activeMenu}
        onSelectMenu={onSelectMenu}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        portalTitle="PORTAL MAHASISWA"
      />

      {/* Main Content Area: Offset by sidebar width on desktop (ml-[225px]) */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[225px] transition-all duration-300">
        {/* Topbar sticky header */}
        <Topbar
          mahasiswa={mahasiswa}
          notifikasi={notifikasi}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          onOpenProfileModal={onOpenProfileModal}
        />

        {/* Dashboard Main Content with ~32px (p-6 sm:p-8) padding */}
        <main className="flex-1 p-6 sm:p-8 w-full">
          <div className="max-w-[1360px] mx-auto flex flex-col justify-between min-h-[calc(100vh-76px-4rem)]">
            <div>
              {children}
            </div>
            <Footer footerInfo={footerInfo} />
          </div>
        </main>
      </div>
    </div>
  );
}
