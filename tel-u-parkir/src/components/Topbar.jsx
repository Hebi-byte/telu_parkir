import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  Menu,
  User,
  LogOut,
  Settings,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar
} from 'lucide-react';

export default function Topbar({
  mahasiswa,
  notifikasi = [],
  onOpenMobileSidebar,
  onOpenProfileModal
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifikasi);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifList.filter((n) => !n.dibaca).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, dibaca: true })));
  };

  return (
    <header className="h-[76px] bg-white border-b border-[#EDE4E2] sticky top-0 z-30 px-6 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          aria-label="Buka navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb & Badge */}
        <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
          <nav className="flex items-center text-xs sm:text-sm font-medium">
            <span className="text-[#8A7774]">Mahasiswa</span>
            <span className="mx-2 text-[#8A7774]/40">/</span>
            <span className="text-[#242424] font-bold">Dashboard</span>
          </nav>

          {/* Badge Semester */}
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FAF8F7] border border-[#EDE4E2] text-[#8A7774]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A7774]" />
            <span>{mahasiswa?.semester || 'Semester Genap'}</span>
          </span>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notification Button & Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-2 text-[#242424] hover:text-[#BE1E2D] transition-colors relative cursor-pointer"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5 text-[#242424]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#BE1E2D] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#EDE4E2] py-3 z-50">
              <div className="px-4 pb-2 border-b border-[#EDE4E2] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#242424]">Notifikasi</h4>
                  <p className="text-[11px] text-[#8A7774]">
                    {unreadCount} belum dibaca
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#BE1E2D] font-semibold hover:underline cursor-pointer"
                  >
                    Tandai dibaca
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#EDE4E2]/50">
                {notifList.length > 0 ? (
                  notifList.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-[#FAF8F7] transition-colors flex gap-3 ${
                        !notif.dibaca ? 'bg-[#FCE8E8]/20' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.tipe === 'pelanggaran' ? (
                          <div className="w-7 h-7 rounded-full bg-[#FCE8E8] text-[#BE1E2D] flex items-center justify-center">
                            <AlertCircle className="w-3.5 h-3.5" />
                          </div>
                        ) : notif.tipe === 'info' ? (
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                            <Info className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-[#D9FBE4] text-[#087A36] flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#242424] leading-tight">
                          {notif.judul}
                        </p>
                        <p className="text-[11px] text-[#8A7774] mt-0.5">
                          {notif.pesan}
                        </p>
                        <span className="text-[10px] text-[#8A7774]/70 mt-1 block">
                          {notif.waktu}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-[#8A7774]">
                    Tidak ada notifikasi baru
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#FAF8F7] transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
              <img
                src={mahasiswa?.avatar}
                alt={mahasiswa?.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=Alifia+Rahma&background=BE1E2D&color=fff';
                }}
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#242424] leading-none group-hover:text-[#BE1E2D] transition-colors">
              {mahasiswa?.nama || 'Alifia Rahma'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#8A7774] transition-transform duration-200 ${
              profileDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EDE4E2] py-2 z-50">
              <div className="px-4 py-2.5 border-b border-[#EDE4E2]">
                <p className="text-xs font-bold text-[#242424]">{mahasiswa?.nama}</p>
                <p className="text-[11px] text-[#8A7774] font-mono mt-0.5">{mahasiswa?.nim}</p>
                <p className="text-[11px] text-[#8A7774]">{mahasiswa?.prodi}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    if (onOpenProfileModal) onOpenProfileModal();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#242424] hover:bg-[#FAF8F7] hover:text-[#BE1E2D] transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#8A7774]" />
                  <span>Profil Saya</span>
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    alert('Pengaturan Akun & Kendaraan');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#242424] hover:bg-[#FAF8F7] hover:text-[#BE1E2D] transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#8A7774]" />
                  <span>Pengaturan</span>
                </button>
              </div>

              <div className="pt-1 border-t border-[#EDE4E2]">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    alert('Logout dari sesi Tel-U Parkir Mahasiswa');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#BE1E2D] hover:bg-[#FCE8E8] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#BE1E2D]" />
                  <span>Keluar / Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
