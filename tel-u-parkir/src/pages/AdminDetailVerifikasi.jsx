import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ImageOff,
  Info,
  Maximize2,
  TriangleAlert,
  X,
} from 'lucide-react';
import { defaultReportId, loadReports, updateStoredReport } from '../data/reportData';

const CLASSIFICATION_OPTIONS = [
  { label: 'Menghalangi akses jalan', points: 4 },
  { label: 'Menghalangi Akses Tangga Darurat', points: 4 },
  { label: 'Menghalangi Jalur Evakuasi Kebakaran', points: 4 },
  { label: 'Parkir di Luar Garis Marka', points: 1 },
  { label: 'Parkir Menyilang Garis Marka', points: 2 },
  { label: 'Parkir di Jalur Pedestrian', points: 3 },
  { label: 'Parkir Sembarangan di Depan Lobi', points: 3 },
  { label: 'Parkir di Area Terlarang', points: 7 },
];

const REJECTION_REASONS = [
  'Bukti tidak memadai',
  'Laporan duplikat',
  'Data kendaraan tidak sesuai',
  'Lokasi kejadian tidak valid',
  'Lainnya',
];

export default function AdminDetailVerifikasi() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const currentReportId = reportId || defaultReportId;

  const [reports, setReports] = useState(() => loadReports());
  const report = useMemo(() => {
    return reports.find((item) => item.id === currentReportId);
  }, [reports, currentReportId]);

  // Current pending count for back link
  const pendingCount = useMemo(() => {
    return reports.filter((r) => r.status === 'pending').length;
  }, [reports]);

  // State for violation classification
  const [selectedViolation, setSelectedViolation] = useState(() => {
    return report?.violation || 'Menghalangi akses jalan';
  });
  const [selectedPoints, setSelectedPoints] = useState(() => {
    return report?.potentialPoints || 4;
  });
  const [classificationDropdown, setClassificationDropdown] = useState(false);

  // State for officer notes
  const [officerNoteInput, setOfficerNoteInput] = useState(() => {
    return (
      report?.officerNote ||
      'Bukti sesuai. Kendaraan menghalangi akses keluar. Lanjutkan penertiban di lokasi.'
    );
  });

  // Modal states
  const [approveConfirmOpen, setApproveConfirmOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Bukti tidak memadai');
  const [rejectExplanation, setRejectExplanation] = useState('');
  const [rejectError, setRejectError] = useState('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');

  // Update selected violation when report changes
  useEffect(() => {
    if (report) {
      setSelectedViolation(report.violation || 'Menghalangi akses jalan');
      setSelectedPoints(report.pointsApplied || report.potentialPoints || 4);
      if (report.officerNote) {
        setOfficerNoteInput(report.officerNote);
      }
    }
  }, [report]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // If report not found
  if (!report) {
    return (
      <section className="rounded-2xl border border-[#EDE4E2] bg-white p-8">
        <h1 className="text-2xl font-bold text-[#242424]">Laporan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[#8A7774]">
          ID laporan #{currentReportId} tidak tersedia dalam database laporan.
        </p>
        <Link
          to="/admin/verifikasi"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#BE1E2D] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Antrean Verifikasi
        </Link>
      </section>
    );
  }

  const isPending = report.status === 'pending';

  // Handle Approve Confirmation
  const handleConfirmApproval = () => {
    try {
      const decisionAt = new Date().toISOString();
      const updated = updateStoredReport(report.id, {
        status: 'valid',
        violation: selectedViolation,
        pointsApplied: selectedPoints,
        officerNote: officerNoteInput.trim(),
        handledBy: 'Budi Santoso',
        decisionAt,
      });

      setReports(updated);
      setApproveConfirmOpen(false);
      showToast(`Laporan #${report.id} berhasil disetujui. +${selectedPoints} poin telah diterapkan.`);
    } catch (err) {
      alert(err.message || 'Gagal memproses persetujuan.');
    }
  };

  // Handle Reject Confirmation
  const handleConfirmRejection = (e) => {
    e.preventDefault();
    if (!rejectReason) {
      setRejectError('Pilih satu alasan penolakan.');
      return;
    }
    if (rejectReason === 'Lainnya' && !rejectExplanation.trim()) {
      setRejectError('Penjelasan penolakan wajib diisi untuk alasan "Lainnya".');
      return;
    }

    try {
      const decisionAt = new Date().toISOString();
      const updated = updateStoredReport(report.id, {
        status: 'rejected',
        rejectionReason: rejectReason,
        rejectionExplanation: rejectExplanation.trim() || undefined,
        officerNote: officerNoteInput.trim(),
        handledBy: 'Budi Santoso',
        decisionAt,
      });

      setReports(updated);
      setRejectModalOpen(false);
      showToast(`Laporan #${report.id} berhasil ditolak tanpa penambahan poin.`);
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
      <div>
        {/* Tombol kembali ke antrean verifikasi */}
        <Link
          to="/admin/verifikasi"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#242424] hover:text-[#BE1E2D] transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Antrean verifikasi ({pendingCount})</span>
        </Link>

        {/* Label Kategori */}
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
          LAPORAN PARKIR • #{report.id}
        </p>

        {/* Judul & Deskripsi */}
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#242424]">
          Detail &amp; Verifikasi Laporan
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#8A7774]">
          Tinjau bukti dan data kendaraan sebelum memberikan keputusan.
        </p>

        {/* Status Badge & Tanggal */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#EDE4E2]/50">
          {/* Badge status laporan */}
          <div>
            {report.status === 'pending' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF9C3] border border-[#fef08a] px-3 py-1 text-xs font-semibold text-[#854D0E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B45309]" />
                <span>Menunggu verifikasi</span>
              </span>
            ) : report.status === 'valid' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9FBE4] border border-[#c4f2d1] px-3 py-1 text-xs font-semibold text-[#087A36]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#087A36]" />
                <span>Disetujui (+{report.pointsApplied || report.potentialPoints} poin)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE8E8] border border-[#fbd0d0] px-3 py-1 text-xs font-semibold text-[#BE1E2D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#BE1E2D]" />
                <span>Ditolak ({report.rejectionReason || 'Tidak valid'})</span>
              </span>
            )}
          </div>

          {/* Tanggal dan waktu laporan masuk */}
          <div className="text-xs sm:text-sm font-medium text-[#8A7774]">
            {report.reportDate}, {report.reportTime}
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Bukti Foto + Data Kendaraan & Kejadian */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* B. Bagian Bukti Foto Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 sm:p-6 shadow-xs">
            {/* Header Bukti Foto */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#242424]">Bukti foto</h2>
              <span className="text-xs text-[#8A7774]">
                {report.photoCount || 1} terlampir
              </span>
            </div>

            {/* Preview Foto Laporan */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-[#EDE4E2]">
              {report.evidencePhoto ? (
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="group relative cursor-pointer block overflow-hidden"
                >
                  <img
                    src={report.evidencePhoto}
                    alt={`Bukti #${report.id}`}
                    className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    style={{ display: 'none' }}
                    className="w-full h-72 sm:h-80 md:h-96 items-center justify-center bg-[#F1EFEE] text-center text-[#8A7774]"
                  >
                    <div>
                      <ImageOff className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-xs">Foto tidak dapat dimuat</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-72 sm:h-80 md:h-96 items-center justify-center bg-[#F1EFEE] text-center text-[#8A7774]">
                  <div>
                    <ImageOff className="mx-auto h-8 w-8" />
                    <p className="mt-2 text-xs">Foto bukti tidak tersedia</p>
                  </div>
                </div>
              )}
            </div>

            {/* Foto Meta & Tombol Perbesar */}
            <div className="mt-3.5 flex items-center justify-between gap-3">
              <span className="text-xs text-[#8A7774] font-medium">
                {report.reportDate?.split(' ').slice(0, 2).join(' ')}, {report.reportTime} • {report.location?.split('•')[0]?.trim() || 'GKU Gate 1'}
              </span>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#EDE4E2] bg-white px-3.5 py-1.5 text-xs font-bold text-[#242424] hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
              >
                <Maximize2 className="h-3.5 w-3.5 text-[#8A7774]" />
                <span>Perbesar</span>
              </button>
            </div>

            <p className="mt-2 text-[11px] text-[#8A7774]">
              Foto asli dari pelapor • Klik untuk melihat lebih jelas
            </p>
          </section>

          {/* C. Data Kendaraan & Kejadian Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#242424]">Data kendaraan &amp; kejadian</h2>

            {/* Plate Number & Verification Badge */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#EDE4E2]/70">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#242424] tracking-tight">
                {report.plate}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9FBE4] border border-[#c4f2d1] px-3 py-0.5 text-xs font-semibold text-[#087A36]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#087A36]" />
                <span>{report.vehicleStatus || 'Terdaftar'}</span>
              </span>
            </div>

            {/* Data Details List */}
            <dl className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-baseline">
                <dt className="text-[#8A7774] font-medium">Pemilik / NIM</dt>
                <dd className="font-semibold text-[#242424]">
                  {report.owner} • {report.nim}
                </dd>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-baseline">
                <dt className="text-[#8A7774] font-medium">Kendaraan</dt>
                <dd className="font-semibold text-[#242424]">
                  {report.vehicle} • {report.vehicleColor || 'Hitam'} • {report.vehicleType || 'Roda dua'}
                </dd>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-baseline">
                <dt className="text-[#8A7774] font-medium">Pelanggaran</dt>
                <dd className="font-semibold text-[#242424]">
                  {selectedViolation} • +{selectedPoints} poin
                </dd>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-baseline">
                <dt className="text-[#8A7774] font-medium">Lokasi kejadian</dt>
                <dd className="font-semibold text-[#242424]">
                  {report.location}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Keputusan Verifikasi + Catatan Pelapor */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* D. Keputusan Verifikasi Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#242424]">Keputusan verifikasi</h2>

            {/* Checkmark indicator */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#087A36]">
              <Check className="h-4 w-4 stroke-[2.5]" />
              <span>Plat, lokasi, dan bukti telah dicocokkan</span>
            </div>

            {/* Violation Classification Banner Box */}
            <div className="mt-3.5 rounded-xl border border-[#f8c8c8] bg-[#FCE8E8] p-3.5">
              <div className="flex items-start gap-2.5">
                <Info className="h-4 w-4 shrink-0 text-[#BE1E2D] mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-[#BE1E2D] leading-snug">
                    {selectedViolation}
                  </p>
                  <div className="mt-0.5 flex items-center justify-between flex-wrap gap-1 text-xs text-[#8A7774]">
                    <span>Jenis &amp; poin pelanggaran: +{selectedPoints}</span>
                    {isPending && (
                      <button
                        type="button"
                        onClick={() => setClassificationDropdown(!classificationDropdown)}
                        className="font-bold text-[#BE1E2D] hover:underline cursor-pointer inline-flex items-center gap-0.5"
                      >
                        <span>Ubah klasifikasi</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Classification dropdown selector */}
              {classificationDropdown && isPending && (
                <div className="mt-3 pt-3 border-t border-[#f4b4b8] space-y-1.5 animate-in fade-in duration-100">
                  <p className="text-[11px] font-bold text-[#242424] mb-1">
                    Pilih Klasifikasi Pelanggaran Baru:
                  </p>
                  {CLASSIFICATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setSelectedViolation(opt.label);
                        setSelectedPoints(opt.points);
                        setClassificationDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        selectedViolation === opt.label
                          ? 'bg-[#BE1E2D] text-white font-bold'
                          : 'bg-white hover:bg-gray-50 text-[#242424]'
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      <span className="shrink-0 ml-2">+{opt.points} poin</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Catatan Petugas */}
            <div className="mt-4">
              <label
                htmlFor="officer-notes"
                className="block text-xs font-bold text-[#242424] mb-1.5"
              >
                Catatan petugas
              </label>
              <textarea
                id="officer-notes"
                rows="3"
                disabled={!isPending}
                value={officerNoteInput}
                onChange={(e) => setOfficerNoteInput(e.target.value)}
                placeholder="Tuliskan catatan observasi petugas atau instruksi penertiban..."
                className="w-full rounded-xl border border-[#EDE4E2] bg-white p-3 text-xs text-[#242424] placeholder:text-[#8A7774] focus:border-[#BE1E2D] focus:outline-none focus:ring-1 focus:ring-[#BE1E2D] disabled:bg-[#FAF8F7] disabled:text-[#8A7774]"
              />
              <p className="mt-1 text-[11px] text-[#8A7774]">
                Jika ditolak, wajib tulis alasan penolakan.
              </p>
            </div>

            {/* Action Buttons: Setujui / Tolak */}
            {isPending ? (
              <div className="mt-4 space-y-2">
                {/* 1. Tombol Setujui */}
                <button
                  type="button"
                  onClick={() => setApproveConfirmOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>Setujui • +{selectedPoints} poin</span>
                </button>

                {/* 2. Tombol Tolak */}
                <button
                  type="button"
                  onClick={() => {
                    setRejectReason('Bukti tidak memadai');
                    setRejectExplanation('');
                    setRejectError('');
                    setRejectModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#EDE4E2] bg-white hover:bg-gray-50 hover:text-[#BE1E2D] text-[#242424] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  <span>Tolak</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border p-3.5 text-xs">
                {report.status === 'valid' ? (
                  <div className="space-y-1 text-[#087A36] bg-[#D9FBE4] border-[#c4f2d1] -m-3.5 p-3.5 rounded-xl">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Laporan Telah Disetujui</span>
                    </p>
                    <p className="text-[11px] text-[#087A36]/90">
                      Disetujui oleh {report.handledBy || 'Budi Santoso'} dengan penambahan +{report.pointsApplied || report.potentialPoints} poin.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-[#BE1E2D] bg-[#FCE8E8] border-[#f8c8c8] -m-3.5 p-3.5 rounded-xl">
                    <p className="font-bold flex items-center gap-1.5">
                      <X className="h-4 w-4" />
                      <span>Laporan Telah Ditolak</span>
                    </p>
                    <p className="text-[11px]">
                      Alasan: {report.rejectionReason}
                      {report.rejectionExplanation && ` (${report.rejectionExplanation})`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Note */}
            <p className="mt-3.5 text-[11px] text-[#8A7774] text-center leading-relaxed">
              Poin hanya ditambahkan setelah disetujui. Keputusan tercatat atas nama Budi Santoso.
            </p>
          </section>

          {/* E. Catatan Pelapor Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#242424]">Catatan pelapor</h2>
            <p className="mt-2 text-xs sm:text-sm text-[#242424] leading-relaxed">
              {report.reporterNote || 'Pelapor tidak memberikan catatan tambahan.'}
            </p>
            <p className="mt-3 text-[11px] text-[#8A7774]">
              Pelapor {report.reporterId || '#MHS-3045'} • Identitas dilindungi
            </p>
          </section>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DIALOGS & MODALS */}
      {/* ========================================================= */}

      {/* 1. Modal Konfirmasi Persetujuan */}
      {approveConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setApproveConfirmOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <CheckCircle2 className="h-5 w-5 text-[#087A36]" />
                <h3 className="text-base font-bold text-[#242424]">
                  Konfirmasi Persetujuan Laporan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setApproveConfirmOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-[#8A7774]">
                Pastikan data berikut sudah benar sebelum menetapkan poin sanksi kepada mahasiswa:
              </p>

              <div className="rounded-xl border border-[#EDE4E2] bg-[#FAF8F7] p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8A7774]">Kendaraan:</span>
                  <span className="font-bold text-[#242424]">{report.plate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7774]">Pemilik:</span>
                  <span className="font-bold text-[#242424]">{report.owner} ({report.nim})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7774]">Pelanggaran:</span>
                  <span className="font-bold text-[#242424]">{selectedViolation}</span>
                </div>
                <div className="flex justify-between border-t border-[#EDE4E2] pt-2">
                  <span className="text-[#8A7774]">Poin Sanksi:</span>
                  <span className="font-extrabold text-[#BE1E2D]">+{selectedPoints} Poin</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApproveConfirmOpen(false)}
                  className="rounded-xl border border-[#EDE4E2] px-4 py-2.5 text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmApproval}
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Konfirmasi &amp; Terapkan Poin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Penolakan (Tolak Laporan) */}
      {rejectModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setRejectModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <TriangleAlert className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Tolak Laporan #{report.id}
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

            <form onSubmit={handleConfirmRejection} className="p-6 space-y-4">
              <div className="rounded-xl border border-[#EDE4E2] bg-[#FAF8F7] p-3 text-xs space-y-1">
                <p className="font-bold text-[#242424]">{report.plate} • {report.violation}</p>
                <p className="text-[#8A7774]">{report.location}</p>
              </div>

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

              {rejectError && (
                <div className="rounded-lg bg-[#FCE8E8] p-2.5 text-xs font-semibold text-[#BE1E2D]">
                  {rejectError}
                </div>
              )}

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

      {/* 3. Modal Perbesar Foto (Lightbox) */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-gray-700 bg-white overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-[#EDE4E2] p-4">
              <h4 className="text-sm font-bold text-[#242424] truncate">
                Bukti Foto #{report.id} • {report.plate}
              </h4>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-black p-2 max-h-[75vh]">
              <img
                src={report.evidencePhoto}
                alt={`Bukti #${report.id}`}
                className="max-h-[72vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
