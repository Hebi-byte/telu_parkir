import { useEffect, useRef, useState } from 'react';
import {
  Bell,
  ChevronDown,
  Menu,
  UserRound,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';

const initialNotifications = [
  { id: 1, title: 'Laporan prioritas baru', message: 'D 5482 UBW menunggu verifikasi.', time: '5 menit lalu', type: 'warning' },
  { id: 2, title: 'Laporan berhasil diverifikasi', message: 'Laporan D 1120 ABC telah disetujui.', time: '1 jam lalu', type: 'success', read: true },
  { id: 3, title: 'Pengingat pergantian shift', message: 'Shift Pagi berakhir pukul 15:00.', time: '2 jam lalu', type: 'info', read: true },
];

export default function Topbar({ pageTitle, breadcrumbItems, onOpenMobileSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) setNotificationsOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function markAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#EDE4E2] bg-white px-5 sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="rounded-lg p-2 text-[#8A7774] hover:bg-[#FAF8F7] lg:hidden"
          aria-label="Buka navigasi"
        >
          <Menu className="h-5 w-5" />
        </button>
        <nav aria-label="Breadcrumb" className="truncate text-xs text-[#8A7774]">
          {(breadcrumbItems || ['Satpam', pageTitle]).map((item, index, items) => (
            <span key={item}>
              {index > 0 && <span className="mx-2 text-[#8A7774]/50">/</span>}
              <span className={index === items.length - 1 ? 'font-semibold text-[#242424]' : ''}>
                {item}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <span className="hidden rounded-full bg-[#F5F2F0] px-2.5 py-1 text-[11px] font-semibold text-[#554a48] sm:inline-flex">
          <span className="mr-1.5 mt-1 h-1.5 w-1.5 rounded-full bg-[#8A7774]" />
          Pos Gerbang 1
        </span>

        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label={`Notifikasi, ${unreadCount} belum dibaca`}
            className="relative rounded-lg p-2 text-[#554a48] hover:bg-[#FAF8F7]"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#BE1E2D] ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#EDE4E2] bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#EDE4E2] px-4 py-3">
                <div>
                  <h2 className="text-sm font-bold">Notifikasi</h2>
                  <p className="text-[11px] text-[#8A7774]">{unreadCount} belum dibaca</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-[11px] font-semibold text-[#BE1E2D] hover:underline"
                  >
                    Tandai dibaca
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.type === 'warning'
                    ? AlertCircle
                    : notification.type === 'success'
                      ? CheckCircle2
                      : Info;
                  return (
                    <div
                      key={notification.id}
                      className={`flex gap-3 border-b border-[#EDE4E2]/60 px-4 py-3 last:border-0 ${notification.read ? '' : 'bg-[#FCE8E8]/30'}`}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${notification.type === 'success' ? 'text-[#087A36]' : 'text-[#BE1E2D]'}`} />
                      <div>
                        <p className="text-xs font-semibold">{notification.title}</p>
                        <p className="mt-0.5 text-[11px] text-[#8A7774]">{notification.message}</p>
                        <p className="mt-1 text-[10px] text-[#8A7774]/70">{notification.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-[#FAF8F7]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FCE8E8] text-[10px] font-bold text-[#BE1E2D]">
              BS
            </span>
            <span className="hidden text-xs font-semibold sm:inline">Budi Santoso</span>
            <ChevronDown className={`h-3.5 w-3.5 text-[#8A7774] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#EDE4E2] bg-white p-2 shadow-xl">
              <div className="border-b border-[#EDE4E2] px-3 py-2">
                <p className="text-xs font-bold">Budi Santoso</p>
                <p className="mt-0.5 text-[11px] text-[#8A7774]">ID SPM-0142 · Satpam</p>
              </div>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium hover:bg-[#FAF8F7]"
              >
                <UserRound className="h-4 w-4 text-[#8A7774]" /> Profil petugas
              </button>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#BE1E2D] hover:bg-[#FCE8E8]"
              >
                <LogOut className="h-4 w-4" /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
