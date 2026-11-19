import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ImageOff,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getReportHistory } from '../data/reportHistoryData';

const pageSize = 10;
const today = '2025-03-20';
const defaultFilters = { status: 'all', dateRange: 'all', violation: '' };
const statusLabels = {
  pending: 'Menunggu Verifikasi',
  valid: 'Terverifikasi',
  rejected: 'Ditolak',
};
const statusTypes = {
  pending: 'neutral',
  valid: 'success',
  rejected: 'warning',
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

function EmptyState({ hasReports }) {
  return (
    <div className="rounded-xl border border-dashed border-[#EDE4E2] bg-white px-6 py-12 text-center">
      <Search className="mx-auto h-7 w-7 text-[#8A7774]" />
      <h2 className="mt-3 text-base font-bold">
        {hasReports ? 'Laporan Tidak Ditemukan' : 'Belum Ada Riwayat Laporan'}
      </h2>
      <p className="mt-1 text-sm text-[#8A7774]">
        {hasReports ? 'Coba gunakan kata kunci lain atau sesuaikan filter.' : 'Belum ada laporan yang tercatat dalam sistem.'}
      </p>
    </div>
  );
}

export default function RiwayatLaporanSatpam() {
  const [reports] = useState(() => getReportHistory());
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const violationOptions = useMemo(
    () => [...new Set(reports.map((report) => report.violation))].sort((a, b) => a.localeCompare(b, 'id')),
    [reports],
  );

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('id-ID');
    return reports.filter((report) => {
      const matchesStatus = filters.status === 'all' || report.status === filters.status;
      const matchesDate = filters.dateRange === 'all'
        || (filters.dateRange === 'today' && report.submittedOn === today)
        || (filters.dateRange === 'yesterday' && report.submittedOn === '2025-03-19');
      const matchesViolation = !filters.violation || report.violation === filters.violation;
      const searchableText = `${report.id} ${report.plate} ${report.violation}`.toLocaleLowerCase('id-ID');
      return matchesStatus && matchesDate && matchesViolation && searchableText.includes(normalizedSearch);
    });
  }, [filters, reports, search]);

  const summary = useMemo(() => ({
    total: reports.length,
    verified: reports.filter((report) => report.status === 'valid').length,
    rejected: reports.filter((report) => report.status === 'rejected').length,
  }), [reports]);

  const pageCount = Math.ceil(filteredReports.length / pageSize);
  const activePage = Math.min(currentPage, Math.max(pageCount, 1));
  const pageReports = filteredReports.slice((activePage - 1) * pageSize, activePage * pageSize);
  const activeFilterCount = Number(filters.status !== 'all')
    + Number(filters.dateRange !== 'all')
    + Number(Boolean(filters.violation));

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
    setFilters(defaultFilters);
    setDraftFilters(defaultFilters);
    setCurrentPage(1);
  }

  const firstItem = pageReports.length ? (activePage - 1) * pageSize + 1 : 0;
  const lastItem = (activePage - 1) * pageSize + pageReports.length;

  return (
    <div>
      <Link
        to="/satpam/verifikasi"
        className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#BE1E2D] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Antrean Laporan
      </Link>
      <header className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">
          Riwayat Operasional
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Riwayat Laporan</h1>
        <p className="mt-2 text-sm text-[#8A7774]">
          Seluruh dokumentasi laporan pelanggaran parkir beserta status dan keputusan verifikasi petugas.
        </p>
      </header>

      <section aria-label="Ringkasan riwayat laporan" className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label="Total Laporan" value={summary.total} highlighted />
        <SummaryCard label="Terverifikasi" value={summary.verified} />
        <SummaryCard label="Ditolak" value={summary.rejected} />
      </section>

      <section aria-label="Pencarian dan filter riwayat laporan" className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3.5 py-2.5 focus-within:border-[#BE1E2D]">
          <Search className="h-4 w-4 shrink-0 text-[#8A7774]" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari plat nomor atau ID laporan..."
            aria-label="Cari plat nomor, ID laporan, atau jenis pelanggaran"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8A7774]/70"
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} aria-label="Hapus pencarian">
              <X className="h-4 w-4 text-[#8A7774]" />
            </button>
          )}
        </label>

        <button
          type="button"
          onClick={openFilters}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border bg-white px-3.5 text-sm font-semibold transition-colors ${
            activeFilterCount ? 'border-[#BE1E2D] text-[#BE1E2D]' : 'border-[#EDE4E2] hover:border-[#BE1E2D]'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </button>
      </section>

      <section aria-label="Daftar seluruh laporan">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-extrabold tracking-tight">Semua Laporan</h2>
          <span className="text-xs text-[#8A7774]">{filteredReports.length} laporan</span>
        </div>

        {pageReports.length > 0 ? (
          <>
            <div className="mb-2 hidden rounded-lg px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#8A7774] lg:grid lg:grid-cols-[140px_minmax(0,1.3fr)_minmax(0,1fr)_120px_72px] lg:gap-4">
              <span>ID Laporan</span>
              <span>Kendaraan &amp; Pelanggaran</span>
              <span>Lokasi &amp; Waktu</span>
              <span>Petugas</span>
              <span className="text-right">Aksi</span>
            </div>
            <div className="space-y-2.5">
              {pageReports.map((report) => (
                <article
                  key={report.id}
                  className="grid gap-3 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.025)] sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-[140px_minmax(0,1.3fr)_minmax(0,1fr)_120px_72px] lg:items-center lg:gap-4"
                >
                  <div className="flex items-center justify-between gap-3 sm:col-span-2 lg:col-span-1">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#554a48]">#{report.id}</p>
                      <StatusBadge type={statusTypes[report.status]} className="mt-2 px-2.5 py-1 text-[10px]">
                        {statusLabels[report.status]}
                      </StatusBadge>
                    </div>
                    <p className="text-sm font-extrabold lg:hidden">{report.plate}</p>
                  </div>

                  <div className="min-w-0">
                    <p className="hidden text-sm font-extrabold lg:block">{report.plate}</p>
                    <p className="text-xs font-semibold leading-relaxed text-[#242424]">{report.violation}</p>
                  </div>

                  <div className="min-w-0 text-xs leading-relaxed">
                    <p className="font-medium text-[#242424]">{report.location}</p>
                    <p className="mt-1 text-[#8A7774]">{report.reportDate} <span className="mx-1">•</span> {report.reportTime}</p>
                  </div>

                  <div className="text-xs">
                    <p className="text-[10px] text-[#8A7774] lg:hidden">Petugas</p>
                    <p className="mt-0.5 font-medium">{report.handledBy}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedReport(report)}
                    className="min-h-10 rounded-lg border border-[#EDE4E2] px-3 text-xs font-semibold text-[#BE1E2D] transition-colors hover:border-[#BE1E2D] hover:bg-[#FDF3F3]"
                  >
                    Detail
                  </button>
                </article>
              ))}
            </div>
          </>
        ) : (
          <EmptyState hasReports={reports.length > 0} />
        )}

        <div className="mt-4 flex flex-col gap-3 border-t border-[#EDE4E2] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8A7774]">
            Menampilkan {firstItem}–{lastItem} dari {filteredReports.length} laporan
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
            aria-labelledby="history-filter-title"
            onSubmit={applyFilters}
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Pencarian laporan</p>
                <h2 id="history-filter-title" className="mt-1 text-xl font-extrabold">Filter Riwayat</h2>
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
                  <option value="pending">Menunggu Verifikasi</option>
                  <option value="valid">Terverifikasi</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Rentang tanggal laporan
                <select
                  value={draftFilters.dateRange}
                  onChange={(event) => setDraftFilters((current) => ({ ...current, dateRange: event.target.value }))}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  <option value="all">Semua tanggal</option>
                  <option value="today">Hari ini</option>
                  <option value="yesterday">Kemarin</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Kategori pelanggaran
                <select
                  value={draftFilters.violation}
                  onChange={(event) => setDraftFilters((current) => ({ ...current, violation: event.target.value }))}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  <option value="">Semua kategori pelanggaran</option>
                  {violationOptions.map((violation) => <option key={violation} value={violation}>{violation}</option>)}
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
            aria-labelledby="report-detail-title"
            className="max-h-[min(90vh,52rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Detail Riwayat Laporan</p>
                <h2 id="report-detail-title" className="mt-1.5 text-xl font-extrabold sm:text-2xl">#{selectedReport.id}</h2>
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

            <div className="mt-5 grid gap-5 md:grid-cols-[190px_minmax(0,1fr)]">
              <div
                role="img"
                aria-label="Foto bukti belum tersedia"
                className="flex h-40 items-center justify-center rounded-xl bg-[#F1EFEE] text-center text-[#8A7774]"
              >
                <div>
                  <ImageOff className="mx-auto h-7 w-7" />
                  <p className="mt-2 text-xs">Foto bukti belum tersedia</p>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-extrabold">{selectedReport.plate}</h3>
                  <StatusBadge type={statusTypes[selectedReport.status]} className="px-2.5 py-1 text-[11px]">
                    {statusLabels[selectedReport.status]}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm font-semibold">{selectedReport.violation}</p>
                <dl className="mt-4 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-[#8A7774]">Lokasi kejadian</dt>
                  <dd className="font-medium">{selectedReport.location}</dd>
                  <dt className="text-[#8A7774]">Waktu laporan</dt>
                  <dd className="font-medium">{selectedReport.reportDate} <span className="mx-1">•</span> {selectedReport.reportTime}</dd>
                  <dt className="text-[#8A7774]">Kendaraan</dt>
                  <dd className="font-medium">{selectedReport.vehicle}</dd>
                  <dt className="text-[#8A7774]">Informasi pelapor</dt>
                  <dd className="font-medium">{selectedReport.reportedBy}</dd>
                  <dt className="text-[#8A7774]">Petugas</dt>
                  <dd className="font-medium">{selectedReport.handledBy}</dd>
                </dl>
              </div>
            </div>

            <div className="mt-5 grid gap-4 border-t border-[#EDE4E2] pt-5 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold">Deskripsi Laporan</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8A7774]">{selectedReport.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Keterangan Keputusan</h3>
                {selectedReport.status === 'rejected' ? (
                  <div className="mt-2 flex gap-2 rounded-lg bg-[#FCE8E8] p-3 text-sm leading-relaxed text-[#8A7774]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
                    <div className="min-w-0">
                      <p className="font-semibold text-[#242424]">
                        {selectedReport.rejectionReason || 'Alasan penolakan tidak tersedia.'}
                      </p>
                      <p className="mt-1">
                        {selectedReport.rejectionExplanation || 'Penjelasan penolakan tidak tersedia.'}
                      </p>
                      {selectedReport.decisionAt && (
                        <p className="mt-2 text-xs">
                          Diputuskan {new Date(selectedReport.decisionAt).toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                  </div>
                ) : selectedReport.status === 'valid' ? (
                  <div className="mt-2 flex gap-2 rounded-lg bg-[#D9FBE4] p-3 text-sm leading-relaxed text-[#087A36]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      Kategori {selectedReport.violation} telah disetujui. {selectedReport.pointsApplied || selectedReport.potentialPoints} poin ditambahkan
                      {' '}({selectedReport.currentPoints} → {selectedReport.currentPoints + (selectedReport.pointsApplied || selectedReport.potentialPoints)} poin).
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2 rounded-lg bg-[#FFF1CC] p-3 text-sm leading-relaxed text-[#8A7774]">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#8A6100]" />
                    <p>Laporan masih menunggu verifikasi dan belum memiliki keputusan atau perubahan poin.</p>
                  </div>
                )}
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
