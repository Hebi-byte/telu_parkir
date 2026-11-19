import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

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
  createReport('LPR-2025-001', 'D 5482 UBW', 'Menghalangi akses kendaraan', 'Parkiran Motor GKU / Tokong Nanas', '20 Mar 2025, 08:15 WIB', 'Alifia Rahma', 'Honda Vario 160 CBS', 4, true, 'pending', today, '1202220041'),
  createReport('LPR-2025-002', 'D 3319 ZB', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 07:48 WIB', 'Mahasiswa R***', 'Yamaha NMAX', 1, false, 'pending', today, '1202220184'),
  createReport('LPR-2025-003', 'B 6120 KJT', 'Menghalangi jalur darurat', 'Gedung Kuliah Umum, Blok B', '19 Mar 2025, 16:30 WIB', 'Mahasiswa T***', 'Honda Beat', 5, true, 'pending', today, '1202220310'),
  createReport('LPR-2025-004', 'F 1042 ABC', 'Parkir di jalur pedestrian', 'Area Gedung TULT', '20 Mar 2025, 09:02 WIB', 'Mahasiswa A***', 'Honda Scoopy', 3, false, 'pending', today, '1202220203'),
  createReport('LPR-2025-005', 'D 4521 TLU', 'Melewati batas parkir', 'Parkiran Motor GKU', '20 Mar 2025, 09:18 WIB', 'Mahasiswa N***', 'Yamaha Aerox', 2, false, 'pending', today, '1202220139'),
  createReport('LPR-2025-006', 'D 1923 FIT', 'Parkir di area terlarang', 'Jalur Akses Fakultas Industri Kreatif', '20 Mar 2025, 09:41 WIB', 'Mahasiswa S***', 'Honda Vario', 3, false, 'pending', today, '1202220295'),
  createReport('LPR-2025-007', 'B 9021 TEL', 'Menghalangi akses kendaraan', 'Parkiran Gedung Kuliah Umum', '20 Mar 2025, 10:06 WIB', 'Mahasiswa M***', 'Suzuki Satria F', 4, true, 'pending', today, '1202220108'),

  createReport('LPR-2025-008', 'D 1102 ABC', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 06:55 WIB', 'Mahasiswa D***', 'Honda Vario', 1, false, 'valid', today, '1202220101'),
  createReport('LPR-2025-009', 'D 7781 TLU', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 06:40 WIB', 'Mahasiswa F***', 'Yamaha NMAX', 3, false, 'valid', today, '1202220102'),
  createReport('LPR-2025-010', 'B 2401 TEL', 'Menghalangi jalur darurat', 'Gedung Kuliah Umum, Blok A', '20 Mar 2025, 06:20 WIB', 'Mahasiswa H***', 'Honda Beat', 5, true, 'valid', today, '1202220103'),
  createReport('LPR-2025-011', 'D 3098 FIT', 'Melewati batas parkir', 'Parkiran Motor GKU', '20 Mar 2025, 06:15 WIB', 'Mahasiswa I***', 'Honda Scoopy', 2, false, 'valid', today, '1202220104'),
  createReport('LPR-2025-012', 'F 6120 TLU', 'Parkir di jalur pedestrian', 'Jalur Pejalan Kaki TULT', '20 Mar 2025, 06:03 WIB', 'Mahasiswa J***', 'Yamaha Fazzio', 3, false, 'valid', today, '1202220105'),
  createReport('LPR-2025-013', 'D 5567 ABC', 'Menghalangi akses kendaraan', 'Parkiran Gedung Kuliah Umum', '20 Mar 2025, 05:52 WIB', 'Mahasiswa K***', 'Honda Vario', 4, true, 'valid', today, '1202220106'),
  createReport('LPR-2025-014', 'B 7812 FIT', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 05:44 WIB', 'Mahasiswa L***', 'Yamaha Aerox', 1, false, 'valid', today, '1202220107'),
  createReport('LPR-2025-015', 'D 9023 TEL', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 05:30 WIB', 'Mahasiswa P***', 'Honda Beat', 3, false, 'valid', today, '1202220109'),
  createReport('LPR-2025-016', 'F 1234 TLU', 'Menghalangi jalur darurat', 'Gedung Kuliah Umum, Blok B', '20 Mar 2025, 05:21 WIB', 'Mahasiswa Q***', 'Honda Vario', 5, true, 'valid', today, '1202220110'),
  createReport('LPR-2025-017', 'D 4488 FIT', 'Melewati batas parkir', 'Parkiran Motor GKU', '20 Mar 2025, 05:11 WIB', 'Mahasiswa U***', 'Yamaha NMAX', 2, false, 'valid', today, '1202220111'),
  createReport('LPR-2025-018', 'B 6621 TEL', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 04:58 WIB', 'Mahasiswa V***', 'Honda Scoopy', 1, false, 'valid', today, '1202220112'),
  createReport('LPR-2025-019', 'D 2510 ABC', 'Parkir di jalur pedestrian', 'Jalur Pejalan Kaki TULT', '20 Mar 2025, 04:47 WIB', 'Mahasiswa W***', 'Suzuki Nex', 3, false, 'valid', today, '1202220113'),

  createReport('LPR-2025-020', 'D 6001 TLU', 'Parkir di area terlarang', 'Area Gedung TULT', '20 Mar 2025, 04:35 WIB', 'Mahasiswa Y***', 'Honda Beat', 3, false, 'rejected', today, '1202220114'),
  createReport('LPR-2025-021', 'F 5501 FIT', 'Parkir tidak sesuai marka', 'Zona Parkir FIT', '20 Mar 2025, 04:20 WIB', 'Mahasiswa Z***', 'Yamaha Mio', 1, false, 'rejected', today, '1202220115'),

  createReport('LPR-2025-022', 'D 7810 ABC', 'Melewati batas parkir', 'Parkiran Motor GKU', '19 Mar 2025, 15:10 WIB', 'Mahasiswa B***', 'Honda Vario', 2, false, 'pending', yesterday, '1202220201'),
  createReport('LPR-2025-023', 'B 4402 TEL', 'Parkir di area terlarang', 'Area Gedung TULT', '19 Mar 2025, 14:32 WIB', 'Mahasiswa C***', 'Yamaha NMAX', 3, false, 'valid', yesterday, '1202220202'),
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
      <p className="text-xs text-[#8A7774]">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold ${highlighted ? 'text-[#BE1E2D]' : 'text-[#242424]'}`}>
        {value}
      </p>
    </article>
  );
}

function formatNim(value) {
  return value || '—';
}

export default function DashboardSatpam() {
  const [reports, setReports] = useState(initialReports);
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const [draftFilters, setDraftFilters] = useState(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [rejectionReport, setRejectionReport] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState('');
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

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function openFilters() {
    setDraftFilters(filters);
    setFilterOpen(true);
  }

  function openRejection(report) {
    setRejectionReport(report);
    setRejectionReason('');
    setRejectionError('');
    setSelectedReport(null);
  }

  function updateReportStatus(reportId, status, extra = {}) {
    setReports((currentReports) => currentReports.map((report) => (
      report.id === reportId ? { ...report, status, ...extra } : report
    )));
  }

  function approveReport() {
    if (!selectedReport) return;
    updateReportStatus(selectedReport.id, 'valid', { pointsApplied: selectedReport.potentialPoints });
    setToast(`Laporan ${selectedReport.id} berhasil diverifikasi.`);
    setSelectedReport(null);
  }

  function confirmRejection(event) {
    event.preventDefault();
    if (!rejectionReport) return;
    const reason = rejectionReason.trim();
    if (!reason) {
      setRejectionError('Alasan penolakan wajib diisi.');
      return;
    }
    updateReportStatus(rejectionReport.id, 'rejected', { rejectionReason: reason });
    setToast(`Laporan ${rejectionReport.id} ditolak.`);
    setRejectionReport(null);
    setRejectionReason('');
    setRejectionError('');
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
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
          Ringkasan Operasional • 20 Mar 2025 • Data Contoh
        </p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
          Selamat bertugas, Budi Santoso
        </h1>
        <p className="mt-1 text-xs text-[#8A7774]">
          ID SPM-0142 <span className="mx-1">•</span> Unit Logistik &amp; Keamanan Telkom University
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#8A7774]">
          <StatusBadge type="warning" className="px-2 py-0.5 text-[10px]">Shift Pagi</StatusBadge>
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
            className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors ${
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
            <StatusBadge type="warning" className="px-2 py-0.5 text-[10px]">
              {statusCounts.pending} Menunggu
            </StatusBadge>
          </div>
          <Link
            to="/satpam/verifikasi"
            className="rounded-lg border border-[#EDE4E2] bg-white px-3 py-2 text-[11px] font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="space-y-2.5">
          {pageReports.map((report) => (
            <article
              key={report.id}
              className="grid gap-3 rounded-2xl border border-[#EDE4E2] bg-white p-3 sm:grid-cols-[76px_minmax(0,1fr)_138px] sm:items-center sm:gap-4 sm:p-3.5"
            >
              <div className="flex h-[76px] items-center justify-center rounded-xl bg-[#F1EFEE] text-center text-[#8A7774]">
                <div>
                  <ImageOff className="mx-auto h-5 w-5" />
                  <span className="mt-1 block max-w-16 text-[9px] leading-3">Foto bukti belum tersedia</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-extrabold tracking-tight">{report.plate}</h3>
                  <StatusBadge type={statusTypes[report.status]} className="px-2 py-0.5 text-[9px]">
                    {report.priority && report.status === 'pending' ? 'Prioritas' : statusLabels[report.status]}
                  </StatusBadge>
                </div>
                <p className="mt-0.5 text-xs font-semibold">{report.violation}</p>
                <p className="mt-1 truncate text-[10px] text-[#8A7774]">
                  {report.location} <span className="mx-1">•</span> {report.reportTime}
                </p>
                <p className="mt-1 truncate text-[10px] text-[#8A7774]">
                  {report.reporter} <span className="mx-1">•</span> {report.vehicle}
                  <span className="mx-1">•</span> Poin {report.currentPoints}
                  {report.status === 'valid' && report.pointsApplied
                    ? ` → ${report.currentPoints + report.pointsApplied} terverifikasi`
                    : ` → ${report.currentPoints + report.potentialPoints} jika diverifikasi`}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-stretch">
                <StatusBadge type="warning" className="self-end px-2 py-0.5 text-[9px]">
                  +{report.potentialPoints} Potensial
                </StatusBadge>
                {report.status === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedReport(report)}
                      className="rounded-lg bg-[#BE1E2D] px-3 py-2 text-[10px] font-bold text-white transition-colors hover:bg-[#A51020]"
                    >
                      Tinjau &amp; Verifikasi
                    </button>
                    <button
                      type="button"
                      onClick={() => openRejection(report)}
                      className="rounded-lg border border-[#EDE4E2] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
                    >
                      Alasan Tolak
                    </button>
                  </>
                ) : (
                  <p className="text-right text-[10px] text-[#8A7774]">
                    {report.status === 'rejected' && report.rejectionReason
                      ? `Alasan: ${report.rejectionReason}`
                      : statusLabels[report.status]}
                  </p>
                )}
              </div>
            </article>
          ))}

          {pageReports.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#EDE4E2] bg-white px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-[#8A7774]" />
              <h3 className="mt-3 text-sm font-bold">Laporan tidak ditemukan</h3>
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
          <div className="mt-3 flex flex-col items-center justify-between gap-2 text-[10px] text-[#8A7774] sm:flex-row">
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
                <h2 id="filter-title" className="text-base font-extrabold">Filter Laporan</h2>
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedReport(null);
          }}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="review-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#BE1E2D]">Pemeriksaan Laporan</p>
                <h2 id="review-title" className="mt-1 text-lg font-extrabold">Tinjau &amp; Verifikasi</h2>
              </div>
              <button type="button" onClick={() => setSelectedReport(null)} aria-label="Tutup detail laporan">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div className="flex h-36 items-center justify-center rounded-xl bg-[#F1EFEE] text-center text-xs text-[#8A7774]">
                <div><ImageOff className="mx-auto mb-2 h-6 w-6" />Foto bukti belum tersedia</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-[#8A7774]">Plat nomor</p><p className="mt-1 font-bold">{selectedReport.plate}</p></div>
                <div><p className="text-[#8A7774]">ID laporan</p><p className="mt-1 font-semibold">{selectedReport.id}</p></div>
                <div><p className="text-[#8A7774]">Jenis pelanggaran</p><p className="mt-1 font-semibold">{selectedReport.violation}</p></div>
                <div><p className="text-[#8A7774]">Waktu kejadian</p><p className="mt-1 font-semibold">{selectedReport.reportTime}</p></div>
                <div><p className="text-[#8A7774]">Lokasi</p><p className="mt-1 font-semibold">{selectedReport.location}</p></div>
                <div><p className="text-[#8A7774]">Pelapor / NIM</p><p className="mt-1 font-semibold">{selectedReport.reporter} / {formatNim(selectedReport.nim)}</p></div>
                <div><p className="text-[#8A7774]">Kendaraan</p><p className="mt-1 font-semibold">{selectedReport.vehicle}</p></div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#FCE8E8]/60 p-3 text-xs">
                <div>
                  <p className="font-semibold">Poin jika diverifikasi</p>
                  <p className="mt-1 text-[#8A7774]">Poin saat ini {selectedReport.currentPoints} → {selectedReport.currentPoints + selectedReport.potentialPoints}</p>
                </div>
                <StatusBadge type="warning">+{selectedReport.potentialPoints} poin</StatusBadge>
              </div>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => openRejection(selectedReport)}
                className="rounded-lg border border-[#EDE4E2] px-4 py-2.5 text-xs font-bold text-[#BE1E2D] hover:border-[#BE1E2D]"
              >
                Tolak Laporan
              </button>
              <button
                type="button"
                onClick={approveReport}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#A51020]"
              >
                <Check className="h-4 w-4" /> Setujui &amp; Terapkan Poin
              </button>
            </div>
          </section>
        </div>
      )}

      {rejectionReport && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRejectionReport(null);
          }}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="rejection-title"
            onSubmit={confirmRejection}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#BE1E2D]">Penolakan Laporan</p>
                <h2 id="rejection-title" className="mt-1 text-lg font-extrabold">Alasan Tolak</h2>
              </div>
              <button type="button" onClick={() => setRejectionReport(null)} aria-label="Tutup penolakan">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-[#EDE4E2] bg-[#FAF8F7] p-3 text-xs">
              <p className="font-bold">{rejectionReport.plate} <span className="font-normal text-[#8A7774]">· {rejectionReport.id}</span></p>
              <p className="mt-1 text-[#8A7774]">{rejectionReport.violation}</p>
            </div>
            <label htmlFor="rejection-reason" className="mt-4 block text-xs font-semibold">
              Alasan penolakan <span className="text-[#BE1E2D]">*</span>
            </label>
            <textarea
              id="rejection-reason"
              required
              rows={4}
              value={rejectionReason}
              onChange={(event) => {
                setRejectionReason(event.target.value);
                setRejectionError('');
              }}
              placeholder="Contoh: Foto bukti tidak menunjukkan pelanggaran yang dilaporkan."
              className="mt-2 w-full resize-y rounded-lg border border-[#EDE4E2] px-3 py-2.5 text-xs outline-none focus:border-[#BE1E2D]"
            />
            {rejectionError && <p role="alert" className="mt-1 text-xs text-[#BE1E2D]">{rejectionError}</p>}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setRejectionReport(null)} className="rounded-lg border border-[#EDE4E2] px-4 py-2.5 text-xs font-semibold hover:bg-[#FAF8F7]">
                Batalkan
              </button>
              <button type="submit" className="rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#A51020]">
                Konfirmasi Penolakan
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-2 rounded-xl bg-[#242424] px-4 py-3 text-xs font-medium text-white shadow-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#D9FBE4]" />
          <span>{toast}</span>
          <button type="button" onClick={() => setToast('')} aria-label="Tutup pesan" className="ml-2">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
