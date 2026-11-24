import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock3,
  ImageOff,
  KeyRound,
  MapPin,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const statistics = [
  { label: 'Laporan masuk', value: '24', description: 'Seluruh area kampus' },
  { label: 'Menunggu verifikasi', value: '8', description: '2 perlu diprioritaskan', highlighted: true },
  { label: 'Disetujui', value: '14', description: 'Poin telah diterapkan' },
  { label: 'Ditolak', value: '2', description: 'Bukti tidak memadai' },
];

const pendingReports = [
  {
    id: 'RPT-8824',
    plate: 'D 5482 UBW',
    violation: 'Menghalangi akses jalan',
    location: 'GKU / Tokong Nanas',
    time: '09:42 WIB',
    points: 4,
  },
  {
    id: 'RPT-8823',
    plate: 'D 3319 ZB',
    violation: 'Parkir di area terlarang',
    location: 'Jalur Pedestrian',
    time: '08:15 WIB',
    points: 3,
  },
];

const activities = [
  {
    time: '09:30',
    title: 'RPT-8821 disetujui',
    detail: 'D 4521 TLU • +4 poin • Satpam Budi',
    icon: CheckCircle2,
    tone: 'text-[#087A36] bg-[#D9FBE4]',
  },
  {
    time: '08:30',
    title: 'Kunci Scoopy diamankan',
    detail: '#FND-204 • Pos Satpam Gerbang 1',
    icon: KeyRound,
    tone: 'text-[#BE1E2D] bg-[#FCE8E8]',
  },
  {
    time: '08:10',
    title: 'Kunci dikembalikan ke pemilik',
    detail: '#FND-198 • KTM & STNK terverifikasi',
    icon: KeyRound,
    tone: 'text-[#8A7774] bg-[#F5F2F0]',
  },
];

function StatisticCard({ label, value, description, highlighted }) {
  return (
    <article className={`rounded-xl border border-[#EDE4E2] p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] ${
      highlighted ? 'bg-[#FCE8E8]' : 'bg-white'
    }`}>
      <p className="text-xs text-[#8A7774] sm:text-sm">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${highlighted ? 'text-[#BE1E2D]' : 'text-[#242424]'}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-[#8A7774]">{description}</p>
    </article>
  );
}

function ActivityList({ compact = false }) {
  return (
    <ol className={compact ? 'space-y-4' : 'space-y-5'}>
      {activities.map(({ time, title, detail, icon: Icon, tone }) => (
        <li key={time} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3">
          <time className="pt-1 text-xs font-medium text-[#8A7774]">{time}</time>
          <div className="flex min-w-0 gap-2.5">
            <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone}`}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-relaxed text-[#242424]">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#8A7774]">{detail}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function AdminDashboard() {
  const [activityLogOpen, setActivityLogOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">
            Dashboard Admin <span className="mx-1">•</span> {currentDate}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Selamat pagi, Pak Rehan <span role="img" aria-label="menyapa">👋</span>
          </h1>
          <p className="mt-1.5 text-sm text-[#8A7774]">Admin Parkir • Unit Logistik &amp; Keamanan</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#8A7774]">
            <StatusBadge type="success" className="px-2 py-1 text-[10px]">Admin aktif</StatusBadge>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> Telkom University, Bandung
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#BE1E2D] sm:pb-1">
          <Clock3 className="h-4 w-4" />
          <span>07.00–15.00</span>
        </div>
      </section>

      <section aria-label="Statistik laporan" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => <StatisticCard key={statistic.label} {...statistic} />)}
      </section>

      <section className="mt-4 flex flex-col justify-between gap-4 rounded-xl bg-[#BE1E2D] px-5 py-5 text-white sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="text-base font-extrabold sm:text-lg">Tinjau 8 laporan parkir.</h2>
          <p className="mt-1 text-xs text-white/85">Periksa bukti sebelum menetapkan poin.</p>
        </div>
        <Link
          to="/admin/verifikasi"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 text-xs font-bold text-[#BE1E2D] transition-colors hover:bg-[#FDF3F3]"
        >
          Buka antrean verifikasi <span className="ml-1.5" aria-hidden="true">→</span>
        </Link>
      </section>

      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
        <section aria-labelledby="pending-reports-title" className="min-w-0 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="pending-reports-title" className="text-sm font-extrabold sm:text-base">Menunggu verifikasi</h2>
            <Link to="/admin/verifikasi" className="shrink-0 text-xs font-semibold text-[#BE1E2D] hover:underline">
              Lihat semua <span aria-hidden="true">›</span>
            </Link>
          </div>
          <div className="divide-y divide-[#EDE4E2]">
            {pendingReports.map((report) => (
              <article key={report.id} className="flex min-w-0 gap-3 py-3 first:pt-1 last:pb-0 sm:gap-3.5">
                <div
                  role="img"
                  aria-label={`Foto bukti ${report.plate} belum tersedia`}
                  className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-lg bg-[#F1EFEE] text-center text-[#8A7774]"
                >
                  <div>
                    <ImageOff className="mx-auto h-5 w-5" />
                    <span className="mt-1 block max-w-16 text-[10px] leading-3">Foto bukti</span>
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold">{report.plate}</p>
                    <p className="mt-0.5 text-xs font-medium text-[#242424]">{report.violation}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8A7774]">
                      {report.location} <span className="mx-1">•</span> {report.time}
                    </p>
                    <p className="mt-1 text-[10px] text-[#8A7774]">#{report.id}</p>
                  </div>
                  <StatusBadge type="warning" className="mt-2 w-fit px-2 py-1 text-[10px] sm:mt-0">
                    +{report.points} poin
                  </StatusBadge>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="recent-activity-title" className="min-w-0 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="recent-activity-title" className="text-sm font-extrabold sm:text-base">Aktivitas terbaru</h2>
            <button
              type="button"
              onClick={() => setActivityLogOpen(true)}
              className="shrink-0 text-xs font-semibold text-[#BE1E2D] hover:underline"
            >
              Log aktivitas
            </button>
          </div>
          <ActivityList />
        </section>
      </div>

      <p className="mt-4 text-[10px] text-[#8A7774]">Terakhir diperbarui 09:50 WIB <span className="mx-1">•</span> Data operasional hari ini</p>

      {activityLogOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActivityLogOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-log-title"
            className="max-h-[min(90vh,42rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Operasional</p>
                <h2 id="activity-log-title" className="mt-1 text-xl font-extrabold">Log aktivitas</h2>
              </div>
              <button
                type="button"
                onClick={() => setActivityLogOpen(false)}
                aria-label="Tutup log aktivitas"
                className="rounded-lg p-2 text-[#8A7774] hover:bg-[#FAF8F7]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 border-t border-[#EDE4E2] pt-5">
              <ActivityList compact />
            </div>
            <div className="mt-6 flex justify-end border-t border-[#EDE4E2] pt-4">
              <button
                type="button"
                onClick={() => setActivityLogOpen(false)}
                className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]"
              >
                Tutup
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
