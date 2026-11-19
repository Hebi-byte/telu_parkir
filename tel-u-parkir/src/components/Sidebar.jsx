import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  KeyRound,
  UserRound,
  ShieldCheck,
  ArrowUpRight,
  X,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', to: '/satpam/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Verifikasi', to: '/satpam/verifikasi', icon: ClipboardCheck },
  { label: 'Kehilangan', to: '/satpam/kehilangan/buat-laporan', icon: KeyRound },
  { label: 'Profil', to: '/satpam/profil', icon: UserRound },
];

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[225px] flex-col border-r border-[#EDE4E2] bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#EDE4E2]/70 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BE1E2D] text-base font-extrabold text-white">
              P.
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight">Tel-U Parkir</p>
              <p className="text-xs text-[#8A7774]">Telkom University</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-md p-1 text-[#8A7774] hover:bg-[#FAF8F7] lg:hidden"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3.5 pt-4 pb-1">
          <div className="flex items-center gap-2.5 rounded-xl border border-[#F4B4B8] bg-[#FDF3F3] px-3 py-2.5 text-[#BE1E2D]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="truncate text-xs font-bold tracking-wide">PORTAL SATPAM</span>
          </div>
        </div>

        <nav aria-label="Navigasi Portal Satpam" className="space-y-1.5 px-3.5 py-3">
          {menuItems.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#FCE8E8] text-[#BE1E2D]'
                    : 'text-[#8A7774] hover:bg-[#FAF8F7] hover:text-[#242424]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'stroke-[2.4]' : ''}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3 border-t border-[#EDE4E2]/70 p-3.5">
          <div className="rounded-xl border border-[#EDE4E2] bg-[#FAF8F7] p-3.5">
            <div className="mb-1.5 flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
              <div>
                <p className="text-xs font-bold leading-tight">Tertib parkir, aman bersama.</p>
                <p className="mt-1 text-xs leading-snug text-[#8A7774]">
                  Unit Logistik &amp; Keamanan Telkom University
                </p>
              </div>
            </div>
            <details className="mt-1">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-bold text-[#BE1E2D] hover:underline">
                Bantuan &amp; SOP <ArrowUpRight className="h-3.5 w-3.5" />
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-[#8A7774]">
                Untuk bantuan operasional, hubungi petugas Unit Logistik &amp; Keamanan kampus.
              </p>
            </details>
          </div>
          <p className="px-1 text-xs font-medium text-[#8A7774]">
            &copy; 2025 Tel-U Parkir
          </p>
        </div>
      </aside>
    </>
  );
}
