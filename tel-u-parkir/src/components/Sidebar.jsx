import React from 'react';
import {
  GraduationCap,
  LayoutGrid,
  Trophy,
  Camera,
  Key,
  User,
  ShieldCheck,
  ArrowUpRight,
  X
} from 'lucide-react';

export default function Sidebar({
  activeMenu = 'Dashboard',
  onSelectMenu,
  mobileOpen = false,
  onCloseMobile,
  portalTitle = 'PORTAL MAHASISWA',
  portalIcon: PortalIcon = GraduationCap
}) {
  const menuItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'Leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
    },
    {
      id: 'Lapor Parkir',
      label: 'Lapor Parkir',
      icon: Camera,
    },
    {
      id: 'Kehilangan',
      label: 'Kehilangan',
      icon: Key,
    },
    {
      id: 'Profil & Kendaraan',
      label: 'Profil & Kendaraan',
      icon: User,
    },
  ];

  const handleMenuClick = (id) => {
    if (onSelectMenu) onSelectMenu(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[225px] bg-white border-r border-[#EDE4E2] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Identity */}
          <div className="px-5 py-5 flex items-center justify-between border-b border-[#EDE4E2]/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#BE1E2D] flex items-center justify-center text-white font-extrabold text-base shadow-xs select-none">
                P.
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-[#242424] leading-tight">
                  Tel-U Parkir
                </span>
                <span className="text-[11px] text-[#8A7774] font-medium leading-none">
                  Telkom University
                </span>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-md text-[#8A7774] hover:bg-gray-100"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Portal Identifier Badge (Penanda Portal) */}
          <div className="px-3.5 pt-4 pb-1">
            <div className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[#F4B4B8] bg-[#FDF3F3] text-[#BE1E2D] select-none">
              <PortalIcon className="w-4 h-4 shrink-0 text-[#BE1E2D] stroke-[2.2]" />
              <span className="text-xs font-bold tracking-wide text-[#BE1E2D] truncate">
                {portalTitle}
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="px-3.5 py-3 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#FCE8E8] text-[#BE1E2D] font-bold'
                      : 'text-[#8A7774] hover:bg-[#FAF8F7] hover:text-[#242424]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#BE1E2D] stroke-[2.4]' : 'text-[#8A7774] stroke-[1.8]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-3.5 border-t border-[#EDE4E2]/60 space-y-3">
          {/* Sidebar Information Card */}
          <div className="bg-[#FAF8F7] border border-[#EDE4E2] rounded-xl p-3.5">
            <div className="flex items-start gap-2.5 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-[#FCE8E8] text-[#BE1E2D] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#242424] leading-tight">
                  Tertib parkir, aman bersama.
                </p>
                <p className="text-[11px] text-[#8A7774] mt-1 leading-snug">
                  Unit Logistik &amp; Keamanan Telkom University
                </p>
              </div>
            </div>
            <a
              href="#sop-bantuan"
              onClick={(e) => {
                e.preventDefault();
                alert('Membuka Panduan Bantuan & SOP Parkir Kampus Telkom University');
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#BE1E2D] hover:underline mt-1"
            >
              <span>Bantuan &amp; SOP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="px-1 text-left">
            <p className="text-[11px] text-[#8A7774] font-medium">
              &copy; 2025 Tel-U Parkir
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
