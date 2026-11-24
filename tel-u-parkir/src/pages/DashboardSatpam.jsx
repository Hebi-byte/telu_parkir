import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { ensureStoredReport, loadReports } from '../data/reportData';

const today = '2025-03-20';
const yesterday = '2025-03-19';

function createReport(
  id,
  plate,
  violation,
  location,
  reportTime,
  reporter,
  vehicle,
  potentialPoints,
  priority,
  status = 'pending',
  submittedOn = today,
  nim = '1202220000',
) {
  return {
    id,
    plate,
    violation,
    location,
    reportTime,
    reporter,
    vehicle,
    currentPoints: 12,
    potentialPoints,
    priority,
    status,
    pointsApplied: status === 'valid' ? potentialPoints : undefined,
    submittedOn,
    nim,
  };
}

const initialReports = [
  createReport('LPR-2025-001', 'D 5482 UBW', 'Menghalangi akses kendaraan', 'Parkiran Motor GKU / Tokong Nanas', '20 Mar 2025, 08:15 WIB', 'Alifia Rahma', 'Honda Vario 160 CBS', 3, true, 'pending', today, '1202220041'),
  createReport('LPR-2025-002', 'D 3319 ZB', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 07:48 WIB', 'Mahasiswa R***', 'Yamaha NMAX', 1, false, 'pending', today, '1202220184'),
  createReport('LPR-2025-003', 'B 6120 KJT', 'Menghalangi akses kendaraan', 'Gedung Kuliah Umum, Blok B', '19 Mar 2025, 16:30 WIB', 'Mahasiswa T***', 'Honda Beat', 3, true, 'pending', today, '1202220310'),
  createReport('LPR-2025-004', 'F 1042 ABC', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 09:02 WIB', 'Mahasiswa A***', 'Honda Scoopy', 7, false, 'pending', today, '1202220203'),
  createReport('LPR-2025-005', 'D 4521 TLU', 'Parkir tidak sesuai marka', 'Parkiran Motor GKU', '20 Mar 2025, 09:18 WIB', 'Mahasiswa N***', 'Yamaha Aerox', 1, false, 'pending', today, '1202220139'),
  createReport('LPR-2025-006', 'D 1923 FIT', 'Parkir di area terlarang', 'Jalur Akses Fakultas Industri Kreatif', '20 Mar 2025, 09:41 WIB', 'Mahasiswa S***', 'Honda Vario', 7, false, 'pending', today, '1202220295'),
  createReport('LPR-2025-007', 'B 9021 TEL', 'Menghalangi akses kendaraan', 'Parkiran Gedung Kuliah Umum', '20 Mar 2025, 10:06 WIB', 'Mahasiswa M***', 'Suzuki Satria F', 3, true, 'pending', today, '1202220108'),

  createReport('LPR-2025-008', 'D 1102 ABC', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 06:55 WIB', 'Mahasiswa D***', 'Honda Vario', 1, false, 'valid', today, '1202220101'),
  createReport('LPR-2025-009', 'D 7781 TLU', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 06:40 WIB', 'Mahasiswa F***', 'Yamaha NMAX', 7, false, 'valid', today, '1202220102'),
  createReport('LPR-2025-010', 'B 2401 TEL', 'Menghalangi akses kendaraan', 'Gedung Kuliah Umum, Blok A', '20 Mar 2025, 06:20 WIB', 'Mahasiswa H***', 'Honda Beat', 3, true, 'valid', today, '1202220103'),
  createReport('LPR-2025-011', 'D 3098 FIT', 'Parkir tidak sesuai marka', 'Parkiran Motor GKU', '20 Mar 2025, 06:15 WIB', 'Mahasiswa I***', 'Honda Scoopy', 1, false, 'valid', today, '1202220104'),
  createReport('LPR-2025-012', 'F 6120 TLU', 'Parkir di area terlarang', 'Jalur Pejalan Kaki TULT', '20 Mar 2025, 06:03 WIB', 'Mahasiswa J***', 'Yamaha Fazzio', 7, false, 'valid', today, '1202220105'),
  createReport('LPR-2025-013', 'D 5567 ABC', 'Menghalangi akses kendaraan', 'Parkiran Gedung Kuliah Umum', '20 Mar 2025, 05:52 WIB', 'Mahasiswa K***', 'Honda Vario', 3, true, 'valid', today, '1202220106'),
  createReport('LPR-2025-014', 'B 7812 FIT', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 05:44 WIB', 'Mahasiswa L***', 'Yamaha Aerox', 1, false, 'valid', today, '1202220107'),
  createReport('LPR-2025-015', 'D 9023 TEL', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 05:30 WIB', 'Mahasiswa P***', 'Honda Beat', 7, false, 'valid', today, '1202220109'),
  createReport('LPR-2025-016', 'F 1234 TLU', 'Menghalangi akses kendaraan', 'Gedung Kuliah Umum, Blok B', '20 Mar 2025, 05:21 WIB', 'Mahasiswa Q***', 'Honda Vario', 3, true, 'valid', today, '1202220110'),
  createReport('LPR-2025-017', 'D 4488 FIT', 'Parkir tidak sesuai marka', 'Parkiran Motor GKU', '20 Mar 2025, 05:11 WIB', 'Mahasiswa U***', 'Yamaha NMAX', 1, false, 'valid', today, '1202220111'),
  createReport('LPR-2025-018', 'B 6621 TEL', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 04:58 WIB', 'Mahasiswa V***', 'Honda Scoopy', 1, false, 'valid', today, '1202220112'),
  createReport('LPR-2025-019', 'D 2510 ABC', 'Parkir di area terlarang', 'Jalur Pejalan Kaki TULT', '20 Mar 2025, 04:47 WIB', 'Mahasiswa W***', 'Suzuki Nex', 7, false, 'valid', today, '1202220113'),

  createReport('LPR-2025-020', 'D 6001 TLU', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 04:35 WIB', 'Mahasiswa Y***', 'Honda Beat', 7, false, 'rejected', today, '1202220114'),
  createReport('LPR-2025-021', 'F 5501 FIT', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 04:20 WIB', 'Mahasiswa Z***', 'Yamaha Mio', 1, false, 'rejected', today, '1202220115'),

  createReport('LPR-2025-022', 'D 7810 ABC', 'Parkir tidak sesuai marka', 'Parkiran Motor GKU', '19 Mar 2025, 15:10 WIB', 'Mahasiswa B***', 'Honda Vario', 1, false, 'pending', yesterday, '1202220201'),
  createReport('LPR-2025-023', 'B 4402 TEL', 'Parkir di area terlarang', 'Area Gedung TULT', '19 Mar 2025, 14:32 WIB', 'Mahasiswa C***', 'Yamaha NMAX', 7, false, 'valid', yesterday, '1202220202'),
  createReport('LPR-2025-024', 'D 2901 FIT', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '19 Mar 2025, 13:15 WIB', 'Mahasiswa E***', 'Honda Beat', 1, false, 'rejected', yesterday, '1202220204'),
];

const statusLabels = {
  pending: 'Menunggu',
  valid: 'Valid',
  rejected: 'Ditolak',
};

const statusTypes = {
  pending: 'neutral',
  valid: 'success',
  rejected: 'warning',
};

const tabs = [
  { id: 'pending', label: 'Menunggu' },
  { id: 'all', label: 'Semua' },
  { id: 'valid', label: 'Valid' },
  { id: 'rejected', label: 'Ditolak' },
];

const emptyFilters = { violation: '', priorityOnly: false };

function SummaryCard({ label, value, highlighted = false }) {
  return (
    <article className={`rounded-2xl border border-[#EDE4E2] p-4 ${highlighted ? 'bg-[#FCE8E8]' : 'bg-white'}`}>
      <p className="text-sm text-[#8A7774]">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${highlighted ? 'text-[#BE1E2D]' : 'text-[#242424]'}`}>
        {value}
      </p>
    </article>
  );
}

function getVerificationReport(report, verificationReports) {
  const existingReport = verificationReports.find((item) => item.plate === report.plate);
  if (existingReport) return existingReport;

  const [reportDate, ...timeParts] = report.reportTime.split(', ');
  return {
    ...report,
    reportDate,
    reportTime: timeParts.join(', '),
    reportedBy: report.reporter,
    description: `Laporan ${report.violation.toLocaleLowerCase('id-ID')} di ${report.location}.`,
    owner: report.reporter,
    studyProgram: '—',
  };
}

export default function DashboardSatpam() {
  const [verificationReports] = useState(() => loadReports());
  const [reports] = useState(() => initialReports.map((report) => {
    const storedReport = verificationReports.find((item) => item.plate === report.plate);
    return storedReport
      ? {
        ...report,
        status: storedReport.status,
        rejectionReason: storedReport.rejectionReason,
        pointsApplied: storedReport.pointsApplied ?? report.pointsApplied,
      }
      : report;
  }));
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const [draftFilters, setDraftFilters] = useState(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const dateReports = useMemo(() => reports.filter((report) => {
    if (dateFilter === 'today') return report.submittedOn === today;
    if (dateFilter === 'yesterday') return report.submittedOn === yesterday;
    return true;
  }), [dateFilter, reports]);

  const statusCounts = useMemo(() => ({
    pending: dateReports.filter((report) => report.status === 'pending').length,
    valid: dateReports.filter((report) => report.status === 'valid').length,
    rejected: dateReports.filter((report) => report.status === 'rejected').length,
    all: dateReports.length,
  }), [dateReports]);

  const visibleReports = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('id-ID');
    return dateReports.filter((report) => {
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      const searchableText = `${report.plate} ${report.nim} ${report.id} ${report.reporter}`.toLocaleLowerCase('id-ID');
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesViolation = !filters.violation || report.violation === filters.violation;
      const matchesPriority = !filters.priorityOnly || report.priority;
      return matchesStatus && matchesSearch && matchesViolation && matchesPriority;
    });
  }, [dateReports, filters, search, statusFilter]);

  const violationOptions = useMemo(
    () => [...new Set(reports.map((report) => report.violation))].sort((a, b) => a.localeCompare(b, 'id')),
    [reports],
  );

  const todayReports = reports.filter((report) => report.submittedOn === today);
  const verifiedToday = todayReports.filter((report) => report.status === 'valid').length;
  const pageCount = Math.ceil(visibleReports.length / pageSize);
  const activePage = Math.min(currentPage, Math.max(pageCount, 1));
  const pageReports = visibleReports.slice((activePage - 1) * pageSize, activePage * pageSize);
  const activeFilterCount = Number(Boolean(filters.violation)) + Number(filters.priorityOnly);

  function openFilters() {
    setDraftFilters(filters);
    setFilterOpen(true);
  }

  function applyFilters(event) {
    event.preventDefault();
    setFilters(draftFilters);
    setCurrentPage(1);
    setFilterOpen(false);
  }

  function resetFilters() {
    setDraftFilters(emptyFilters);
    setFilters(emptyFilters);
    setCurrentPage(1);
    setFilterOpen(false);
  }

  return (
    <div>
      <section className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
          Ringkasan Operasional • 20 Mar 2025 • Data Contoh
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Selamat bertugas, Budi Santoso
        </h1>
        <p className="mt-1 text-sm text-[#8A7774]">
          ID SPM-0142 <span className="mx-1">•</span> Unit Logistik &amp; Keamanan Telkom University
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8A7774]">
          <StatusBadge type="warning" className="px-2 py-0.5 text-xs">Shift Pagi</StatusBadge>
          <span>Pos Gerbang 1</span>
          <span className="text-[#8A7774]/50">•</span>
          <span>07:00 – 15:00</span>
        </div>
      </section>

      <section aria-label="Ringkasan laporan" className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label="Masuk hari ini" value={todayReports.length} />
        <SummaryCard label="Terverifikasi" value={verifiedToday} />
        <SummaryCard label="Kunci aktif" value={3} highlighted />
      </section>

      <section aria-label="Pencarian dan filter laporan" className="mb-3 flex flex-col gap-2 sm:flex-row">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3 py-2 focus-within:border-[#BE1E2D]">
          <Search className="h-4 w-4 shrink-0 text-[#8A7774]" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari plat nomor, NIM, atau ID laporan..."
            aria-label="Cari plat nomor, NIM, atau ID laporan"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#8A7774]/70"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCurrentPage(1);
              }}
              aria-label="Hapus pencarian"
            >
              <X className="h-4 w-4 text-[#8A7774]" />
            </button>
          )}
        </label>

        <div className="flex gap-2">
          <label className="relative flex items-center">
            <span className="sr-only">Rentang tanggal laporan</span>
            <select
              value={dateFilter}
              onChange={(event) => {
                setDateFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="h-full min-h-10 appearance-none rounded-lg border border-[#EDE4E2] bg-white py-2 pl-3 pr-8 text-xs font-semibold outline-none hover:border-[#BE1E2D] focus:border-[#BE1E2D]"
            >
              <option value="today">Hari ini</option>
              <option value="yesterday">Kemarin</option>
              <option value="all">Semua waktu</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[#8A7774]" />
          </label>
          <button
            type="button"
            onClick={openFilters}
            className={`inline-flex min-h-10 items-center gap-2 rounded-lg border bg-white px-3 text-xs font-semibold transition-colors ${
              activeFilterCount ? 'border-[#BE1E2D] text-[#BE1E2D]' : 'border-[#EDE4E2] hover:border-[#BE1E2D]'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>
      </section>

      <div className="mb-3 flex gap-1 overflow-x-auto border-b border-[#EDE4E2] pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setStatusFilter(tab.id);
              setCurrentPage(1);
            }}
            aria-pressed={statusFilter === tab.id}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
              statusFilter === tab.id
                ? 'bg-[#BE1E2D] text-white'
                : 'bg-white text-[#554a48] hover:bg-[#F5F2F0]'
            }`}
          >
            {tab.label}{tab.id !== 'all' ? ` (${statusCounts[tab.id]})` : ''}
          </button>
        ))}
      </div>

      <section aria-label="Antrean Pelanggaran">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold tracking-tight">Antrean Pelanggaran</h2>
            <StatusBadge type="warning" className="px-2 py-0.5 text-xs">
              {statusCounts.pending} Menunggu
            </StatusBadge>
          </div>
          <Link
            to="/satpam/verifikasi"
            className="rounded-lg border border-[#EDE4E2] bg-white px-3 py-2 text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="space-y-2.5">
          {pageReports.map((report) => {
            const verificationReport = getVerificationReport(report, verificationReports);
            return (
            <article
              key={report.id}
              className="grid gap-3 rounded-2xl border border-[#EDE4E2] bg-white p-3 sm:grid-cols-[76px_minmax(0,1fr)_138px] sm:items-center sm:gap-4 sm:p-3.5"
            >
              <div className="flex h-[76px] items-center justify-center rounded-xl bg-[#F1EFEE] text-center text-[#8A7774]">
                <div>
                  <ImageOff className="mx-auto h-5 w-5" />
                  <span className="mt-1 block max-w-16 text-xs leading-4">Foto bukti belum tersedia</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-extrabold tracking-tight">{report.plate}</h3>
                  <StatusBadge type={statusTypes[report.status]} className="px-2 py-0.5 text-xs">
                    {report.priority && report.status === 'pending' ? 'Prioritas' : statusLabels[report.status]}
                  </StatusBadge>
                </div>
                <p className="mt-0.5 text-sm font-semibold">{report.violation}</p>
                <p className="mt-1 truncate text-xs text-[#8A7774]">
                  {report.location} <span className="mx-1">•</span> {report.reportTime}
                </p>
                <p className="mt-1 truncate text-xs text-[#8A7774]">
                  {report.reporter} <span className="mx-1">•</span> {report.vehicle}
                  <span className="mx-1">•</span> Poin {report.currentPoints}
                  {report.status === 'valid' && report.pointsApplied
                    ? ` → ${report.currentPoints + report.pointsApplied} terverifikasi`
                    : ` → ${report.currentPoints + report.potentialPoints} jika diverifikasi`}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-stretch">
                <div className="flex flex-col items-end gap-2 sm:items-stretch">
                  <StatusBadge type="warning" className="self-end px-2 py-0.5 text-xs">
                    +{report.potentialPoints} Potensial
                  </StatusBadge>
                  {report.status !== 'pending' && (
                    <button
                      type="button"
                      onClick={() => setSelectedReport(verificationReport)}
                      className="min-h-9 rounded-lg border border-[#EDE4E2] px-3 py-1.5 text-center text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D] hover:bg-[#FDF3F3]"
                    >
                      Detail
                    </button>
                  )}
                </div>
                {report.status === 'pending' ? (
                  <div className="flex gap-2 sm:flex-col">
                    <Link
                      to={`/satpam/verifikasi/${verificationReport.id}`}
                      state={{ report: verificationReport }}
                      onClick={() => ensureStoredReport(verificationReport)}
                      className="rounded-lg bg-[#BE1E2D] px-3 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-[#A51020]"
                    >
                      Tinjau &amp; Verifikasi
                    </Link>
                    <Link
                      to={`/satpam/verifikasi/${verificationReport.id}/tolak`}
                      state={{ report: verificationReport, from: '/satpam/dashboard' }}
                      onClick={() => ensureStoredReport(verificationReport)}
                      className="inline-flex min-h-9 flex-1 items-center justify-center rounded-lg border border-[#EDE4E2] bg-white px-3 py-1.5 text-center text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D] sm:w-full sm:flex-none"
                    >
                      Tolak
                    </Link>
                  </div>
                ) : (
                  <p className="text-right text-xs text-[#8A7774]">
                    {report.status === 'rejected' && report.rejectionReason
                      ? `Alasan: ${report.rejectionReason}`
                      : statusLabels[report.status]}
                  </p>
                )}
              </div>
            </article>
            );
          })}

          {pageReports.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#EDE4E2] bg-white px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-[#8A7774]" />
              <h3 className="mt-3 text-base font-bold">Laporan tidak ditemukan</h3>
              <p className="mt-1 text-xs text-[#8A7774]">
                Coba ubah kata pencarian atau filter yang digunakan.
              </p>
              {(search || activeFilterCount > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setFilters(emptyFilters);
                    setDraftFilters(emptyFilters);
                    setCurrentPage(1);
                  }}
                  className="mt-3 text-xs font-bold text-[#BE1E2D] hover:underline"
                >
                  Hapus pencarian dan filter
                </button>
              )}
            </div>
          )}
        </div>

        {visibleReports.length > 0 && (
          <div className="mt-3 flex flex-col items-center justify-between gap-2 text-xs text-[#8A7774] sm:flex-row">
            <p>
              Menampilkan {Math.min(pageSize, visibleReports.length - (activePage - 1) * pageSize)} dari {visibleReports.length} laporan
              {statusFilter === 'pending' ? ' menunggu' : ''}
            </p>
            {pageCount > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activePage === 1}
                  onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
                  aria-label="Halaman sebelumnya"
                  className="rounded-md border border-[#EDE4E2] bg-white p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-20 text-center text-[#BE1E2D]">
                  Halaman {activePage} / {pageCount}
                </span>
                <button
                  type="button"
                  disabled={activePage === pageCount}
                  onClick={() => setCurrentPage(Math.min(pageCount, activePage + 1))}
                  aria-label="Halaman berikutnya"
                  className="rounded-md border border-[#EDE4E2] bg-white p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {filterOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFilterOpen(false);
          }}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            onSubmit={applyFilters}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 id="filter-title" className="text-xl font-extrabold">Filter Laporan</h2>
                <p className="mt-1 text-xs text-[#8A7774]">Persempit antrean berdasarkan jenis dan prioritas.</p>
              </div>
              <button type="button" onClick={() => setFilterOpen(false)} aria-label="Tutup filter">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <label className="block text-xs font-semibold">
              Jenis pelanggaran
              <select
                value={draftFilters.violation}
                onChange={(event) => setDraftFilters((current) => ({ ...current, violation: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 py-2.5 text-xs font-normal outline-none focus:border-[#BE1E2D]"
              >
                <option value="">Semua jenis pelanggaran</option>
                {violationOptions.map((violation) => <option key={violation} value={violation}>{violation}</option>)}
              </select>
            </label>
            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-xs">
              <input
                type="checkbox"
                checked={draftFilters.priorityOnly}
                onChange={(event) => setDraftFilters((current) => ({ ...current, priorityOnly: event.target.checked }))}
                className="h-4 w-4 accent-[#BE1E2D]"
              />
              Hanya tampilkan laporan prioritas
            </label>
            <div className="mt-6 flex items-center justify-between gap-3">
              <button type="button" onClick={resetFilters} className="text-xs font-semibold text-[#BE1E2D] hover:underline">
                Reset filter
              </button>
              <button type="submit" className="rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#A51020]">
                Terapkan Filter
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedReport && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedReport(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-report-detail-title"
            className="max-h-[min(90vh,44rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Detail Laporan</p>
                <h2 id="dashboard-report-detail-title" className="mt-1.5 text-xl font-extrabold sm:text-2xl">
                  #{selectedReport.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                aria-label="Tutup detail laporan"
                className="rounded-lg p-2 text-[#8A7774] hover:bg-[#FAF8F7]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-extrabold">{selectedReport.plate}</h3>
              <StatusBadge type={statusTypes[selectedReport.status]} className="px-2.5 py-1 text-xs">
                {statusLabels[selectedReport.status]}
              </StatusBadge>
            </div>
            <p className="mt-2 text-sm font-semibold">{selectedReport.violation}</p>

            <dl className="mt-5 grid gap-x-4 gap-y-3 border-t border-[#EDE4E2] pt-5 text-sm sm:grid-cols-[140px_minmax(0,1fr)]">
              <dt className="text-[#8A7774]">Lokasi kejadian</dt>
              <dd className="font-medium">{selectedReport.location}</dd>
              <dt className="text-[#8A7774]">Waktu laporan</dt>
              <dd className="font-medium">{selectedReport.reportTime}</dd>
              <dt className="text-[#8A7774]">Kendaraan</dt>
              <dd className="font-medium">{selectedReport.vehicle}</dd>
              <dt className="text-[#8A7774]">Pelapor</dt>
              <dd className="font-medium">{selectedReport.reportedBy || selectedReport.reporter}</dd>
              <dt className="text-[#8A7774]">NIM</dt>
              <dd className="font-medium">{selectedReport.nim || '—'}</dd>
              <dt className="text-[#8A7774]">Poin potensial</dt>
              <dd className="font-medium">+{selectedReport.potentialPoints} poin</dd>
              <dt className="text-[#8A7774]">Proyeksi poin</dt>
              <dd className="font-medium">
                {selectedReport.currentPoints} → {selectedReport.currentPoints + selectedReport.potentialPoints} poin
              </dd>
            </dl>

            <div className="mt-5 grid gap-4 border-t border-[#EDE4E2] pt-5 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold">Deskripsi Laporan</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8A7774]">
                  {selectedReport.description || `Laporan ${selectedReport.violation.toLocaleLowerCase('id-ID')} di ${selectedReport.location}.`}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Keterangan Status</h3>
                <p className={`mt-2 rounded-lg p-3 text-sm leading-relaxed ${
                  selectedReport.status === 'rejected'
                    ? 'bg-[#FCE8E8] text-[#BE1E2D]'
                    : selectedReport.status === 'valid'
                      ? 'bg-[#D9FBE4] text-[#087A36]'
                      : 'bg-[#FFF1CC] text-[#8A6100]'
                }`}>
                  {selectedReport.status === 'rejected'
                    ? selectedReport.rejectionReason || 'Laporan ditolak.'
                    : selectedReport.status === 'valid'
                      ? `Laporan telah diverifikasi. ${selectedReport.pointsApplied || selectedReport.potentialPoints} poin diterapkan.`
                      : 'Laporan masih menunggu verifikasi.'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-[#EDE4E2] pt-4">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="min-h-11 rounded-lg bg-[#BE1E2D] px-5 text-sm font-bold text-white hover:bg-[#A51020]"
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
