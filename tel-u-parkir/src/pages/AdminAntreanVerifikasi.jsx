import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Info,
  Search,
  TriangleAlert,
  X,
  CheckCircle2,
} from 'lucide-react';
import { loadReports, updateStoredReport } from '../data/reportData';

const REJECTION_REASONS = [
  'Bukti tidak memadai',
  'Laporan duplikat',
  'Data tidak sesuai',
  'Lokasi kejadian tidak valid',
  'Lainnya',
];

export default function AdminAntreanVerifikasi() {
  const [reports, setReports] = useState(() => loadReports());
  const [search, setSearch] = useState('');

  // Quick Rejection modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [reportToReject, setReportToReject] = useState(null);
  const [rejectReason, setRejectReason] = useState('Bukti tidak memadai');
  const [rejectExplanation, setRejectExplanation] = useState('');
  const [rejectError, setRejectError] = useState('');

  // Image lightbox state
  const [lightbox, setLightbox] = useState({ open: false, src: '', title: '' });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Real-time calculation of statistics from backend / stored data
  const stats = useMemo(() => {
    const pending = reports.filter((r) => r.status === 'pending').length;
    const approved = reports.filter((r) => r.status === 'valid').length;
    const rejected = reports.filter((r) => r.status === 'rejected').length;
    return { pending, approved, rejected };
  }, [reports]);

  // Pending reports are the only reports shown in the verification queue.
  const pendingReportsList = useMemo(() => {
    return reports.filter((r) => r.status === 'pending');
  }, [reports]);

  // Filtered reports
  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pendingReportsList.filter((report) => {
      return (
        !q ||
        report.plate.toLowerCase().includes(q) ||
        report.id.toLowerCase().includes(q) ||
        report.location.toLowerCase().includes(q)
      );
    });
  }, [pendingReportsList, search]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredReports.length / pageSize) || 1;
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Open quick reject modal
  const handleOpenQuickReject = (report) => {
    setReportToReject(report);
    setRejectReason('Bukti tidak memadai');
    setRejectExplanation('');
    setRejectError('');
    setRejectModalOpen(true);
  };

  // Submit quick reject
  const handleConfirmQuickReject = (e) => {
    e.preventDefault();
    if (!rejectReason) {
      setRejectError('Pilih alasan penolakan.');
      return;
    }
    if (rejectReason === 'Lainnya' && !rejectExplanation.trim()) {
      setRejectError('Penjelasan penolakan wajib diisi untuk alasan "Lainnya".');
      return;
    }

    try {
      const decisionAt = new Date().toISOString();
      const updated = updateStoredReport(reportToReject.id, {
        status: 'rejected',
        rejectionReason: rejectReason,
        rejectionExplanation: rejectExplanation.trim() || undefined,
        handledBy: 'Budi Santoso',
        decisionAt,
      });

      setReports(updated);
      setRejectModalOpen(false);
      setReportToReject(null);
      showToast(`Laporan #${reportToReject.id} berhasil ditolak.`);
    } catch (err) {
      setRejectError(err.message || 'Gagal memproses penolakan.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-[#242424] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#087A36]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* A. Header Halaman */}
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
          ANTREAN VERIFIKASI
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#242424] sm:text-3xl">
          Laporan Perlu Verifikasi
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#8A7774]">
          Tinjau bukti foto dan tentukan sanksi poin pelanggaran parkir kampus Telkom University.
        </p>
      </header>

      {/* B. Statistik Laporan (3 Kartu Sesuai PRD) */}
      <section aria-label="Statistik Laporan" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* 1. Menunggu */}
        <article className="rounded-2xl border border-[#F4B4B8] bg-[#FDF3F3] p-5 shadow-xs transition-shadow">
          <p className="text-xs sm:text-sm font-medium text-[#8A7774]">Menunggu</p>
          <p className="my-1.5 text-3xl sm:text-4xl font-extrabold text-[#BE1E2D] tracking-tight">
            {stats.pending}
          </p>
          <p className="text-xs text-[#8A7774]">Perlu ditinjau</p>
        </article>

        {/* 2. Disetujui */}
        <article className="rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-xs transition-shadow">
          <p className="text-xs sm:text-sm font-medium text-[#8A7774]">Disetujui</p>
          <p className="my-1.5 text-3xl sm:text-4xl font-extrabold text-[#242424] tracking-tight">
            {stats.approved}
          </p>
          <p className="text-xs text-[#8A7774]">Hari ini</p>
        </article>

        {/* 3. Ditolak */}
        <article className="rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-xs transition-shadow">
          <p className="text-xs sm:text-sm font-medium text-[#8A7774]">Ditolak</p>
          <p className="my-1.5 text-3xl sm:text-4xl font-extrabold text-[#242424] tracking-tight">
            {stats.rejected}
          </p>
          <p className="text-xs text-[#8A7774]">Tidak valid</p>
        </article>
      </section>

      {/* C. Informasi Target SLA */}
      <section
        aria-label="Target SLA"
        className="flex items-center gap-3.5 rounded-2xl border border-[#F8C8C8] bg-[#FCE8E8] px-4 py-3 sm:px-5 sm:py-3.5"
      >
        <Info className="h-5 w-5 shrink-0 text-[#BE1E2D]" />
        <div>
          <p className="text-xs sm:text-sm font-bold text-[#BE1E2D]">
            Target SLA Respons: &le; 30 Menit
          </p>
          <p className="mt-0.5 text-xs text-[#8A7774] leading-relaxed">
            Mohon prioritaskan laporan jalur evakuasi untuk menghindari kemacetan dan bahaya keselamatan.
          </p>
        </div>
      </section>

      {/* D. Pencarian Laporan */}
      <section aria-label="Pencarian Laporan" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7774] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari plat nomor, ID (#RPT), atau lokasi..."
            className="w-full rounded-xl border border-[#EDE4E2] bg-white pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#242424] placeholder:text-[#8A7774] focus:border-[#BE1E2D] focus:outline-none focus:ring-1 focus:ring-[#BE1E2D] transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#8A7774] hover:text-[#242424]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

      </section>

      {/* E. Tab daftar laporan */}
      <section aria-label="Daftar Laporan" className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          aria-pressed="true"
          className="rounded-lg bg-[#BE1E2D] px-4 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer sm:text-sm"
        >
          Semua ({pendingReportsList.length})
        </button>
      </section>

      {/* 4. Daftar Antrean Laporan (Kartu Horizontal Figma) */}
      <section aria-label="Daftar Antrean" className="space-y-4">
        {paginatedReports.length === 0 ? (
          <div className="rounded-2xl border border-[#EDE4E2] bg-white p-12 text-center">
            <Info className="mx-auto h-8 w-8 text-[#8A7774]" />
            <h3 className="mt-3 text-base font-bold text-[#242424]">Tidak ada laporan dalam antrean</h3>
            <p className="mt-1 text-xs text-[#8A7774]">
              {search
                ? 'Tidak ada laporan yang cocok dengan pencarian.'
                : 'Semua laporan pelanggaran parkir telah selesai diverifikasi.'}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCurrentPage(1);
                }}
                className="mt-4 inline-flex items-center rounded-xl bg-[#BE1E2D] px-4 py-2 text-xs font-bold text-white hover:bg-[#A51020]"
              >
                Hapus Pencarian
              </button>
            )}
          </div>
        ) : (
          paginatedReports.map((report) => (
            <article
              key={report.id}
              className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-2xl border border-[#EDE4E2] bg-white p-4 sm:p-5 shadow-xs hover:border-[#BE1E2D]/40 transition-all duration-200"
            >
              {/* Left Column: Photo & Details */}
              <div className="flex flex-col sm:flex-row items-start gap-4 flex-1 min-w-0">
                {/* Photo Thumbnail */}
                <div
                  onClick={() =>
                    setLightbox({
                      open: true,
                      src: report.evidencePhoto,
                      title: `Bukti ${report.id} • ${report.plate}`,
                    })
                  }
                  className="relative h-32 w-full sm:w-32 sm:h-28 md:w-36 md:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-[#EDE4E2] cursor-pointer group"
                  title="Klik untuk memperbesar foto bukti"
                >
                  <img
                    src={report.evidencePhoto}
                    alt={`Bukti #${report.id}`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    style={{ display: 'none' }}
                    className="h-full w-full items-center justify-center bg-[#F1EFEE] text-center text-[#8A7774]"
                  >
                    <div>
                      <ImageOff className="mx-auto h-5 w-5" />
                      <p className="mt-1 text-[10px]">Foto bukti</p>
                    </div>
                  </div>
                </div>

                {/* Report Info Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  {/* Row 1: ID Chip & Relative Time */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF8F7] border border-[#EDE4E2] px-2.5 py-0.5 text-[11px] font-bold text-[#554a48]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8A7774]" />
                      <span>#{report.id}</span>
                    </span>
                    <span className="text-xs text-[#8A7774] font-medium">
                      {report.relativeTime || report.reportTime}
                    </span>
                  </div>

                  {/* Row 2: Plate Number & Potential Points */}
                  <div className="pt-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-[#242424] tracking-tight">
                      {report.plate}
                    </span>
                    <span className="mx-2 text-[#8A7774] font-bold">•</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#242424]">
                      +{report.potentialPoints} Poin
                    </span>
                  </div>

                  {/* Row 3: Violation Title */}
                  <h3 className="text-sm sm:text-base font-bold text-[#242424] leading-snug">
                    {report.violation}
                  </h3>

                  {/* Row 4: Location */}
                  <p className="text-xs text-[#8A7774] leading-relaxed">
                    {report.location}
                  </p>

                  {/* Row 5: Reporter Info & Photos count */}
                  <p className="text-xs text-[#8A7774] pt-0.5">
                    Pelapor: {report.reportedBy} • {report.photoCount || 1} Foto
                  </p>
                </div>
              </div>

              {/* Right Column: Status Chip & Action Buttons */}
              <div className="flex flex-col items-start md:items-end justify-between shrink-0 gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#EDE4E2]/60">
                {/* Status Pemeriksaan Chip */}
                <div className="self-start md:self-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F7] border border-[#EDE4E2] px-3 py-1 text-xs font-semibold text-[#554a48]">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        report.reviewStatus === 'Menunggu Review'
                          ? 'bg-[#BE1E2D]'
                          : 'bg-[#8A7774]'
                      }`}
                    />
                    <span>{report.reviewStatus || 'Menunggu Review'}</span>
                  </span>
                </div>

                {/* Actions: Verifikasi & Tinjau / Tolak */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full md:w-auto">
                  <Link
                    to={`/admin/verifikasi/${report.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#A51020] flex-1 text-center cursor-pointer sm:text-sm md:flex-initial"
                  >
                    Verifikasi &amp; Tinjau
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleOpenQuickReject(report)}
                    className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold text-[#8A7774] transition-colors hover:bg-[#FCE8E8]/40 hover:text-[#BE1E2D] cursor-pointer sm:text-sm"
                  >
                    Tolak
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* List Footer Info & Pagination */}
      <section className="pt-2 border-t border-[#EDE4E2]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A7774]">
        <div>
          Menampilkan {paginatedReports.length} dari {pendingReportsList.length} laporan yang belum selesai
        </div>

        {/* Pagination buttons if page count > 1 */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-[#EDE4E2] bg-white text-[#242424] hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-semibold text-[#242424]">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-[#EDE4E2] bg-white text-[#242424] hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="hidden sm:block text-right">
          Sistem Otomatisasi Tel-U Parkir • Unit Keamanan Kampus
        </div>
      </section>

      {/* Quick Rejection Modal */}
      {rejectModalOpen && reportToReject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setRejectModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <TriangleAlert className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Tolak Laporan #{reportToReject.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleConfirmQuickReject} className="p-6 space-y-4">
              {/* Laporan Preview Box */}
              <div className="rounded-xl border border-[#EDE4E2] bg-[#FAF8F7] p-3 text-xs space-y-1">
                <p className="font-bold text-[#242424]">{reportToReject.plate} • {reportToReject.violation}</p>
                <p className="text-[#8A7774]">{reportToReject.location}</p>
              </div>

              {/* Pilihan Alasan Penolakan */}
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-2">
                  Alasan Penolakan Laporan *
                </label>
                <div className="space-y-2">
                  {REJECTION_REASONS.map((reason) => (
                    <label
                      key={reason}
                      className={`flex items-center gap-3 rounded-xl border p-2.5 text-xs font-medium cursor-pointer transition-colors ${
                        rejectReason === reason
                          ? 'border-[#BE1E2D] bg-[#FCE8E8]/30 text-[#BE1E2D] font-bold'
                          : 'border-[#EDE4E2] text-[#242424] hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rejectReason"
                        value={reason}
                        checked={rejectReason === reason}
                        onChange={() => setRejectReason(reason)}
                        className="text-[#BE1E2D] focus:ring-[#BE1E2D]"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Penjelasan Penolakan */}
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1.5">
                  Keterangan Tambahan {rejectReason === 'Lainnya' ? '*' : '(Opsional)'}
                </label>
                <textarea
                  rows="3"
                  value={rejectExplanation}
                  onChange={(e) => setRejectExplanation(e.target.value)}
                  placeholder="Berikan catatan detail mengapa laporan ini dinyatakan tidak valid..."
                  className="w-full rounded-xl border border-[#EDE4E2] p-3 text-xs text-[#242424] placeholder:text-[#8A7774] focus:border-[#BE1E2D] focus:outline-none focus:ring-1 focus:ring-[#BE1E2D]"
                />
              </div>

              {/* Error Message */}
              {rejectError && (
                <div className="rounded-lg bg-[#FCE8E8] p-2.5 text-xs font-semibold text-[#BE1E2D]">
                  {rejectError}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="rounded-xl border border-[#EDE4E2] px-4 py-2.5 text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Konfirmasi Tolak Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div
          onClick={() => setLightbox({ open: false, src: '', title: '' })}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-gray-700 bg-white overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-[#EDE4E2] p-4">
              <h4 className="text-sm font-bold text-[#242424] truncate">{lightbox.title}</h4>
              <button
                type="button"
                onClick={() => setLightbox({ open: false, src: '', title: '' })}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-black p-2 max-h-[70vh]">
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[68vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
