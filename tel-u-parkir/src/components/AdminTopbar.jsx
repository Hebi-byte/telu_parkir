import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Menu, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const notifications = [
  { id: 1, title: 'Laporan prioritas baru', detail: 'RPT-8824 menunggu verifikasi.', time: '5 menit lalu' },
  { id: 2, title: 'Laporan berhasil disetujui', detail: 'RPT-8821 telah diverifikasi.', time: '30 menit lalu' },
  { id: 3, title: 'Kunci berhasil diamankan', detail: 'Kunci Scoopy tercatat di Gerbang 1.', time: '1 jam lalu' },
];

export default function AdminTopbar({ breadcrumbItems, onOpenMobileSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) setNotificationsOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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
          {breadcrumbItems.map((item, index) => (
            <span key={item}>
              {index > 0 && <span className="mx-2 text-[#8A7774]/50">/</span>}
              <span className={index === breadcrumbItems.length - 1 ? 'font-semibold text-[#242424]' : ''}>
                {item}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setProfileOpen(false);
            }}
            aria-label="Notifikasi admin"
            aria-expanded={notificationsOpen}
            className="rounded-lg p-2 text-[#554a48] hover:bg-[#FAF8F7]"
          >
            <Bell className="h-4 w-4" />
          </button>
          {notificationsOpen && (
            <section className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#EDE4E2] bg-white shadow-xl">
              <div className="border-b border-[#EDE4E2] px-4 py-3">
                <h2 className="text-sm font-bold">Notifikasi</h2>
                <p className="mt-0.5 text-xs text-[#8A7774]">Informasi operasional terbaru</p>
              </div>
              <div>
                {notifications.map((notification) => (
                  <article key={notification.id} className="border-b border-[#EDE4E2]/60 px-4 py-3 last:border-0">
                    <p className="text-xs font-semibold">{notification.title}</p>
                    <p className="mt-0.5 text-xs text-[#8A7774]">{notification.detail}</p>
                    <p className="mt-1 text-xs text-[#8A7774]/70">{notification.time}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((open) => !open);
              setNotificationsOpen(false);
            }}
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
                <p className="mt-0.5 text-xs text-[#8A7774]">Administrator</p>
              </div>
              <Link
                to="/admin/pengaturan"
                onClick={() => setProfileOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium hover:bg-[#FAF8F7]"
              >
                <Settings2 className="h-4 w-4 text-[#8A7774]" />
                Profil &amp; Pengaturan
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
