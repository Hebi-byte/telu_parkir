import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Info,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { loadReports } from '../data/reportData';

const today = '2025-03-20';
const pageSize = 3;
const defaultFilters = { status: 'pending', violation: '' };
const statusLabels = {
  pending: 'Menunggu',
  valid: 'Terverifikasi',
  rejected: 'Ditolak',
  all: 'Semua status',
};
const statusTypes = {
  pending: 'warning',
  valid: 'success',
  rejected: 'neutral',
};

function SummaryCard({ label, value, highlighted = false }) {
  return (
    <article className={`rounded-xl border border-[#EDE4E2] p-4 ${highlighted ? 'bg-[#FCE8E8]' : 'bg-white'}`}>
      <p className="text-sm text-[#8A7774]">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${highlighted ? 'text-[#BE1E2D]' : 'text-[#242424]'}`}>
        {value}
      </p>
    </article>
  );
}

export default function AntreanLaporanSatpam() {
  const [reports] = useState(() => loadReports());
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [filters, setFilters] = useState(defaultFilters);
  const [draftFilters, setDraftFilters] = useState({ ...defaultFilters, dateRange: 'today' });
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dateReports = useMemo(() => reports.filter((report) => {
    if (dateFilter === 'today') return report.submittedOn === today;
    if (dateFilter === 'yesterday') return report.submittedOn === '2025-03-19';
    return true;
  }), [dateFilter, reports]);

  const statusCounts = useMemo(() => ({
    pending: dateReports.filter((report) => report.status === 'pending').length,
    valid: dateReports.filter((report) => report.status === 'valid').length,
    rejected: dateReports.filter((report) => report.status === 'rejected').length,
  }), [dateReports]);

  const violationOptions = useMemo(
    () => [...new Set(reports.map((report) => report.violation))].sort((a, b) => a.localeCompare(b, 'id')),
    [reports],
  );

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('id-ID');
    return dateReports.filter((report) => {
      const matchesStatus = filters.status === 'all' || report.status === filters.status;
      const matchesViolation = !filters.violation || report.violation === filters.violation;
      const matchesSearch = !normalizedSearch
        || `${report.plate} ${report.id}`.toLocaleLowerCase('id-ID').includes(normalizedSearch);
      return matchesStatus && matchesViolation && matchesSearch;
    });
  }, [dateReports, filters, search]);

  const pageCount = Math.ceil(filteredReports.length / pageSize);
  const activePage = Math.min(currentPage, Math.max(pageCount, 1));
  const pageReports = filteredReports.slice((activePage - 1) * pageSize, activePage * pageSize);
  const todayCount = reports.filter((report) => report.submittedOn === today).length;
  const activeFilterCount = Number(filters.status !== 'pending')
    + Number(Boolean(filters.violation))
    + Number(dateFilter !== 'today');

  function openFilters() {
    setDraftFilters({ ...filters, dateRange: dateFilter });
    setFilterOpen(true);
  }

  function applyFilters(event) {
    event.preventDefault();
    setFilters({ status: draftFilters.status, violation: draftFilters.violation });
    setDateFilter(draftFilters.dateRange);
    setCurrentPage(1);
    setFilterOpen(false);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setDraftFilters({ ...defaultFilters, dateRange: 'today' });
    setDateFilter('today');
    setCurrentPage(1);
  }

  function changeDateFilter(value) {
    setDateFilter(value);
    setCurrentPage(1);
  }

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">
          Report <span className="mx-1">•</span> Panel Satpam <span className="mx-1">•</span> Pos Gerbang 1
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Antrean Laporan</h1>
        <p className="mt-2 text-sm text-[#8A7774]">
          Tinjau bukti sebelum mengambil keputusan. Poin belum berlaku untuk laporan menunggu.
        </p>
      </header>

      <section aria-label="Ringkasan laporan" className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label="Menunggu" value={statusCounts.pending} highlighted />
        <SummaryCard label="Terverifikasi" value={statusCounts.valid} />
        <SummaryCard label="Ditolak" value={statusCounts.rejected} />
      </section>

      <section aria-label="Pencarian dan filter laporan" className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3.5 py-2.5 focus-within:border-[#BE1E2D]">
          <Search className="h-4 w-4 shrink-0 text-[#8A7774]" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari plat nomor atau ID laporan"
            aria-label="Cari plat nomor atau ID laporan"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8A7774]/70"
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} aria-label="Hapus pencarian">
              <X className="h-4 w-4 text-[#8A7774]" />
            </button>
          )}
        </label>

        <div className="flex gap-2">
          <label className="relative flex flex-1 items-center sm:flex-none">
            <span className="sr-only">Tanggal laporan</span>
            <select
              value={dateFilter}
              onChange={(event) => changeDateFilter(event.target.value)}
              className="h-full min-h-11 w-full appearance-none rounded-lg border border-[#EDE4E2] bg-white py-2 pl-3.5 pr-9 text-sm outline-none hover:border-[#BE1E2D] focus:border-[#BE1E2D] sm:w-auto"
            >
              <option value="today">Hari ini</option>
              <option value="yesterday">Kemarin</option>
              <option value="all">Semua tanggal</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-[#8A7774]" />
          </label>
          <button
            type="button"
            onClick={openFilters}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-semibold transition-colors hover:border-[#BE1E2D]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>
      </section>

      <section aria-label="Antrean laporan">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <p className="font-bold text-[#242424]">{todayCount} masuk hari ini</p>
          <p className="text-[#8A7774]">20 Mar 2025 <span className="mx-1">•</span> Waktu kejadian laporan</p>
        </div>

        <div className="space-y-3">
          {pageReports.map((report) => (
            <article
              key={report.id}
              className="grid gap-3 rounded-xl border border-[#EDE4E2] bg-white p-3.5 shadow-[0_2px_8px_rgba(36,36,36,0.025)] sm:p-4 md:grid-cols-[104px_minmax(0,1fr)_146px] md:items-center md:gap-4"
            >
              <div className="flex h-24 items-center justify-center rounded-lg bg-[#F1EFEE] text-center text-[#8A7774] md:h-[104px]">
                <div>
                  <ImageOff className="mx-auto h-5 w-5" />
                  <span className="mt-1 block text-[10px] leading-4">Foto belum tersedia</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F5F2F0] px-2.5 py-1 text-[11px] font-bold text-[#554a48]">
                    # {report.id}
                  </span>
                  <StatusBadge type={statusTypes[report.status]} className="px-2.5 py-1 text-[11px]">
                    {statusLabels[report.status]}
                  </StatusBadge>
                </div>
                <h2 className="mt-2 text-lg font-extrabold tracking-tight">{report.plate}</h2>
                <p className="mt-0.5 text-sm font-semibold">{report.violation}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#8A7774]">
                  {report.location} <span className="mx-1">•</span> {report.reportDate} <span className="mx-1">•</span> {report.reportTime}
                </p>
                {report.owner && (
                  <p className="mt-1.5 text-xs leading-relaxed text-[#8A7774]">
                    Pemilik: {report.owner} <span className="mx-1">•</span> {report.vehicle}
                    <span className="mx-1">•</span> Poin saat ini {report.currentPoints} → {report.currentPoints + report.potentialPoints} jika terverifikasi
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 md:flex-col md:items-stretch">
                <StatusBadge type="warning" className="self-end px-2.5 py-1 text-[11px]">
                  +{report.potentialPoints} potensial
                </StatusBadge>
                {report.status === 'pending' ? (
                  <>
                    <Link
                      to={`/satpam/verifikasi/${report.id}`}
                      className="rounded-lg bg-[#BE1E2D] px-3 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-[#A51020]"
                    >
                      Tinjau Laporan
                    </Link>
                    <Link
                      to={`/satpam/verifikasi/${report.id}/tolak`}
                      state={{ report, from: '/satpam/verifikasi' }}
                      className="rounded-lg border border-[#EDE4E2] bg-white px-3 py-2 text-center text-xs font-semibold text-[#BE1E2D] transition-colors hover:border-[#BE1E2D]"
                    >
                      Tolak dengan alasan
                    </Link>
                  </>
                ) : (
                  <p className="text-right text-xs text-[#8A7774]">{statusLabels[report.status]}</p>
                )}
              </div>
            </article>
          ))}

          {pageReports.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#EDE4E2] bg-white px-6 py-12 text-center">
              <Search className="mx-auto h-7 w-7 text-[#8A7774]" />
              <h2 className="mt-3 text-base font-bold">Laporan tidak ditemukan</h2>
              <p className="mt-1 text-sm text-[#8A7774]">Coba ubah kata pencarian atau filter yang digunakan.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  resetFilters();
                }}
                className="mt-4 text-sm font-semibold text-[#BE1E2D] hover:underline"
              >
                Reset pencarian dan filter
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#EDE4E2] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8A7774]">
            Menampilkan {pageReports.length ? (activePage - 1) * pageSize + 1 : 0}–{(activePage - 1) * pageSize + pageReports.length} dari {filteredReports.length} {filters.status === 'pending' ? 'menunggu' : 'laporan'}
            <span className="mx-1">•</span> Halaman {activePage} / {Math.max(pageCount, 1)}
          </p>
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={activePage <= 1}
              className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#EDE4E2] bg-white px-3 text-xs font-semibold disabled:cursor-not-allowed disabled:bg-[#F1EFEE] disabled:text-[#8A7774]/70"
            >
              <ChevronLeft className="h-4 w-4" /> Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(page + 1, Math.max(pageCount, 1)))}
              disabled={activePage >= pageCount}
              className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#EDE4E2] bg-white px-3 text-xs font-semibold text-[#BE1E2D] disabled:cursor-not-allowed disabled:bg-[#F1EFEE] disabled:text-[#8A7774]/70"
            >
              Berikutnya <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <Link
          to="/satpam/riwayat"
          className="inline-flex min-h-10 items-center rounded-lg border border-[#EDE4E2] bg-white px-4 text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
        >
          Lihat Riwayat Laporan
        </Link>
        <div className="mt-4 flex gap-3 rounded-xl bg-[#FCE8E8] px-4 py-3.5 text-xs leading-relaxed text-[#8A7774]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
          <div>
            <p className="font-bold text-[#BE1E2D]">Informasi Riwayat Laporan</p>
            <p className="mt-0.5">Riwayat memuat laporan lintas tanggal, termasuk antrean sebelumnya dan keputusan petugas.</p>
          </div>
        </div>
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
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Pencarian laporan</p>
                <h2 id="filter-title" className="mt-1 text-xl font-extrabold">Filter Laporan</h2>
              </div>
              <button type="button" onClick={() => setFilterOpen(false)} aria-label="Tutup filter">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <div className="mt-5 grid gap-4">
              <label className="text-sm font-semibold">
                Status laporan
                <select
                  value={draftFilters.status}
                  onChange={(event) => setDraftFilters((current) => ({ ...current, status: event.target.value }))}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  <option value="all">Semua status</option>
                  <option value="pending">Menunggu</option>
                  <option value="valid">Terverifikasi</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Jenis pelanggaran
                <select
                  value={draftFilters.violation}
                  onChange={(event) => setDraftFilters((current) => ({ ...current, violation: event.target.value }))}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  <option value="">Semua jenis pelanggaran</option>
                  {violationOptions.map((violation) => <option key={violation} value={violation}>{violation}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Rentang tanggal
                <select
                  value={draftFilters.dateRange}
                  onChange={(event) => setDraftFilters((current) => ({ ...current, dateRange: event.target.value }))}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  <option value="today">Hari ini</option>
                  <option value="yesterday">Kemarin</option>
                  <option value="all">Semua tanggal</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <button type="button" onClick={resetFilters} className="min-h-11 rounded-lg border border-[#EDE4E2] px-4 text-sm font-semibold">
                Reset
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={() => setFilterOpen(false)} className="min-h-11 flex-1 rounded-lg border border-[#EDE4E2] px-4 text-sm font-semibold sm:flex-none">
                  Batal
                </button>
                <button type="submit" className="min-h-11 flex-1 rounded-lg bg-[#BE1E2D] px-4 text-sm font-bold text-white hover:bg-[#A51020] sm:flex-none">
                  Terapkan Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
