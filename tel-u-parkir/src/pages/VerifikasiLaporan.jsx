import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ImageOff,
  Info,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { defaultReportId, loadReports, updateStoredReport } from '../data/reportData';

const categories = [
  { id: 'restricted', label: 'Parkir di area terlarang', points: 7 },
  { id: 'access', label: 'Menghalangi akses kendaraan', points: 3 },
  { id: 'marking', label: 'Parkir tidak sesuai marka', points: 1 },
];

const checksToComplete = [
  { id: 'photo', label: 'Foto jelas dan memadai' },
  { id: 'plate', label: 'Plat kendaraan sesuai' },
  { id: 'location', label: 'Lokasi/deskripsi sesuai' },
  { id: 'duplicate', label: 'Bukan laporan duplikat' },
];

const rejectionReasons = [
  'Bukti foto tidak jelas.',
  'Plat kendaraan tidak sesuai.',
  'Lokasi kejadian tidak sesuai.',
  'Laporan duplikat.',
  'Bukti tidak cukup untuk menentukan pelanggaran.',
];

function InfoRow({ label, children }) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 text-[13px] leading-6 sm:grid-cols-[132px_minmax(0,1fr)]">
      <dt className="text-[#8A7774]">{label}</dt>
      <dd className="min-w-0 font-medium text-[#242424]">{children}</dd>
    </div>
  );
}

export default function VerifikasiLaporan() {
  const { reportId } = useParams();
  const currentReportId = reportId || defaultReportId;
  const report = loadReports().find((item) => item.id === currentReportId);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    () => categories.find((category) => category.label === report?.violation)?.id || 'access',
  );
  const [checks, setChecks] = useState({
    photo: false,
    plate: false,
    location: false,
    duplicate: false,
  });
  const [officerNotes, setOfficerNotes] = useState('');
  const [decision, setDecision] = useState(() => {
    if (report?.status === 'valid') {
      return {
        status: 'valid',
        category: report.violation,
        pointsAdded: report.pointsApplied || report.potentialPoints,
      };
    }
    if (report?.status === 'rejected') {
      return { status: 'rejected', reason: report.rejectionReason || 'Laporan ini telah ditolak.' };
    }
    return null;
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [rejectionOpen, setRejectionOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const [toast, setToast] = useState('');

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) || categories[0];
  const allChecksComplete = checksToComplete.every((item) => checks[item.id]);
  const canVerify = allChecksComplete && !decision;
  const pointsAfterVerification = report ? report.currentPoints + selectedCategory.points : 0;

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function toggleCheck(checkId) {
    setChecks((current) => ({ ...current, [checkId]: !current[checkId] }));
  }

  function confirmVerification() {
    updateStoredReport(currentReportId, {
      status: 'valid',
      violation: selectedCategory.label,
      pointsApplied: selectedCategory.points,
    });
    setDecision({
      status: 'valid',
      category: selectedCategory.label,
      pointsAdded: selectedCategory.points,
      notes: officerNotes.trim(),
    });
    setConfirmationOpen(false);
    setToast(`Laporan ${currentReportId} berhasil diverifikasi.`);
  }

  function confirmRejection(event) {
    event.preventDefault();
    const additionalReason = rejectionNotes.trim();
    const reason = rejectionReason === 'other'
      ? additionalReason
      : [rejectionReason, additionalReason].filter(Boolean).join(' ');
    if (!reason) {
      setRejectionError('Pilih atau tuliskan alasan penolakan.');
      return;
    }

    setDecision({
      status: 'rejected',
      reason,
      notes: officerNotes.trim(),
    });
    updateStoredReport(currentReportId, { status: 'rejected', rejectionReason: reason });
    setRejectionOpen(false);
    setRejectionError('');
    setToast(`Laporan ${currentReportId} berhasil ditolak tanpa penambahan poin.`);
  }

  const statusLabel = decision?.status === 'valid'
    ? 'Valid'
    : decision?.status === 'rejected'
      ? 'Ditolak'
      : 'Menunggu';
  const statusType = decision?.status === 'valid'
    ? 'success'
    : decision?.status === 'rejected'
      ? 'warning'
      : 'neutral';

  if (!report) {
    return (
      <section className="rounded-2xl border border-[#EDE4E2] bg-white p-8">
        <h1 className="text-xl font-bold">Laporan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[#8A7774]">ID laporan {currentReportId} tidak tersedia dalam data laporan.</p>
        <Link to="/satpam/verifikasi" className="mt-4 inline-flex text-sm font-semibold text-[#BE1E2D] hover:underline">
          Kembali ke Antrean Laporan
        </Link>
      </section>
    );
  }

  return (
    <div>
      <Link
        to="/satpam/verifikasi"
        className="mb-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#BE1E2D] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Antrean Laporan
      </Link>

      <header className="mb-6">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">
          Panel Satpam <span className="mx-1">•</span> Pos Gerbang 1
          <span className="mx-1">•</span> #{currentReportId}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Verifikasi Laporan</h1>
        <p className="mt-2 text-sm text-[#8A7774]">
          Tinjau bukti, cocokkan data kendaraan, dan lengkapi pemeriksaan sebelum verifikasi.
        </p>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[1.3fr_0.82fr]">
        <section className="space-y-5 rounded-xl border border-[#EDE4E2] bg-white p-5">
          <div>
            <h2 className="text-base font-bold">Bukti Foto</h2>
            <div
              role="img"
              aria-label="Foto contoh belum tersedia"
              className="mt-3 flex h-48 items-center justify-center rounded-lg bg-[#F1EFEE] text-center text-[#8A7774] sm:h-52"
            >
              <div>
                <ImageOff className="mx-auto h-7 w-7" />
                <p className="mt-2 text-xs">Foto contoh belum tersedia</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#8A7774]">
              {report.reportDate} <span className="mx-1">•</span> {report.reportTime}
              <span className="mx-1">•</span> Parkiran Motor GKU
            </p>
          </div>

          <div className="border-t border-[#EDE4E2] pt-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold">Ringkasan Laporan</h2>
              <StatusBadge type={statusType} className="px-2.5 py-1 text-[11px]">{statusLabel}</StatusBadge>
            </div>
            <h3 className="mt-3 text-lg font-extrabold">{report.plate}</h3>
            <dl className="mt-3 space-y-1">
              <InfoRow label="ID Laporan">#{currentReportId}</InfoRow>
              <InfoRow label="Jenis">{decision?.status === 'valid' ? decision.category : report.violation}</InfoRow>
              <InfoRow label="Lokasi">{report.location}</InfoRow>
              <InfoRow label="Dilaporkan">{report.reportDate}, {report.reportTime}</InfoRow>
              <InfoRow label="Pelapor">{report.reportedBy}</InfoRow>
            </dl>
            <div className="mt-4 flex gap-3 rounded-lg bg-[#FCE8E8] p-3.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
              <div>
                <p className="text-xs font-bold text-[#BE1E2D]">Deskripsi kejadian pelapor</p>
                <p className="mt-1 text-xs leading-relaxed text-[#8A7774]">{report.description}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EDE4E2] pt-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold">Data Pemilik Kendaraan</h2>
              <StatusBadge type="success" className="px-2.5 py-1 text-[11px]">Terdaftar</StatusBadge>
            </div>
            <h3 className="mt-3 text-base font-bold">{report.owner}</h3>
            <p className="mt-1.5 text-xs text-[#8A7774]">{report.nim} <span className="mx-1">•</span> {report.studyProgram}</p>
            <dl className="mt-3 space-y-1">
              <InfoRow label="Kendaraan">{report.vehicle}</InfoRow>
              <InfoRow label="Poin saat ini">{report.currentPoints} Poin</InfoRow>
            </dl>
          </div>

          <div className="flex gap-3 rounded-lg bg-[#FCE8E8] px-4 py-3 text-xs leading-relaxed text-[#8A7774]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
            <p>Keputusan, alasan, petugas, dan perubahan poin tercatat dalam riwayat. Keberatan ditinjau admin.</p>
          </div>
        </section>

        <section className="rounded-xl border border-[#EDE4E2] bg-white p-5">
          <div>
            <h2 className="text-base font-bold">Tetapkan Kategori Verifikasi</h2>
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Pilih kategori yang sesuai berdasarkan bukti. Poin hanya berlaku setelah verifikasi berhasil. Bobot kategori ditentukan admin.
            </p>
            <fieldset className="mt-4 space-y-2" disabled={Boolean(decision)}>
              <legend className="sr-only">Kategori pelanggaran</legend>
              {categories.map((category) => {
                const isSelected = selectedCategoryId === category.id;
                return (
                  <label
                    key={category.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-3 text-[13px] transition-colors ${
                      isSelected
                        ? 'border-[#BE1E2D] bg-[#FCE8E8] text-[#242424]'
                        : 'border-[#EDE4E2] hover:border-[#D9A5A8]'
                    } ${decision ? 'cursor-not-allowed opacity-75' : ''}`}
                  >
                    <input
                      type="radio"
                      name="violation-category"
                      value={category.id}
                      checked={isSelected}
                      onChange={() => setSelectedCategoryId(category.id)}
                      className="h-5 w-5 shrink-0 accent-[#BE1E2D]"
                    />
                    <span className="min-w-0 flex-1">{category.label}</span>
                    <span className="shrink-0 text-xs font-semibold">+{category.points} Poin</span>
                  </label>
                );
              })}
            </fieldset>
          </div>

          <div className="mt-5 border-t border-[#EDE4E2] pt-5">
            <h2 className="text-base font-bold">Pemeriksaan Sebelum Verifikasi</h2>
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Checklist wajib sebelum verifikasi. Semua poin harus dicentang jika bukti lengkap.
            </p>
            <div className="mt-4 space-y-3">
              {checksToComplete.map((item) => (
                <label key={item.id} className={`flex items-center gap-3 text-[13px] ${decision ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={checks[item.id]}
                    onChange={() => toggleCheck(item.id)}
                    disabled={Boolean(decision)}
                    className="h-5 w-5 rounded accent-[#BE1E2D]"
                  />
                  {item.label}
                </label>
              ))}
            </div>
            <label htmlFor="officer-notes" className="mt-5 block text-xs font-semibold">
              Catatan petugas (opsional)
            </label>
            <textarea
              id="officer-notes"
              rows={4}
              value={officerNotes}
              onChange={(event) => setOfficerNotes(event.target.value)}
              disabled={Boolean(decision)}
              placeholder="Tambahkan hasil pemeriksaan..."
              className="mt-2 w-full resize-y rounded-lg border border-[#EDE4E2] px-3.5 py-3 text-xs leading-relaxed outline-none placeholder:text-[#8A7774]/70 focus:border-[#BE1E2D] disabled:bg-[#FAF8F7]"
            />
          </div>

          <div className="mt-5 border-t border-[#EDE4E2] pt-5">
            <h2 className="text-base font-bold">Proyeksi Poin</h2>
            <dl className="mt-4 space-y-3 rounded-lg bg-[#FAF8F7] p-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <dt className="text-[#8A7774]">Poin saat ini</dt>
                <dd className="font-semibold">{report.currentPoints} Poin</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#EDE4E2] pt-3 text-sm">
                <dt className="text-[#8A7774]">Setelah verifikasi</dt>
                <dd className={`font-bold ${decision?.status === 'rejected' ? 'text-[#242424]' : 'text-[#BE1E2D]'}`}>
                  {decision?.status === 'valid'
                    ? report.currentPoints + decision.pointsAdded
                    : decision?.status === 'rejected'
                      ? report.currentPoints
                      : pointsAfterVerification} Poin
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Poin hanya berlaku jika verifikasi berhasil dan bukti dinyatakan cukup.
            </p>

            {decision?.status === 'valid' ? (
              <div className="mt-4 rounded-lg bg-[#D9FBE4] p-3.5 text-xs leading-relaxed text-[#087A36]">
                <p className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-4 w-4" /> Laporan berhasil diverifikasi.</p>
                <p className="mt-1.5">Kategori: {decision.category} (+{decision.pointsAdded} poin).</p>
              </div>
            ) : decision?.status === 'rejected' ? (
              <div className="mt-4 rounded-lg bg-[#FCE8E8] p-3.5 text-xs leading-relaxed text-[#BE1E2D]">
                <p className="flex items-center gap-2 font-bold"><AlertCircle className="h-4 w-4" /> Laporan ditolak tanpa penambahan poin.</p>
                <p className="mt-1.5">{decision.reason}</p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  disabled={!canVerify}
                  onClick={() => setConfirmationOpen(true)}
                  className="mt-4 min-h-12 w-full rounded-lg bg-[#BE1E2D] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A51020] disabled:cursor-not-allowed disabled:bg-[#E5E0DF] disabled:text-[#8A7774]"
                >
                  Verifikasi &amp; Beri +{selectedCategory.points} Poin
                </button>
                <div className={`mt-3 flex gap-3 rounded-lg p-3.5 text-xs leading-relaxed ${
                  allChecksComplete ? 'bg-[#D9FBE4] text-[#087A36]' : 'bg-[#FCE8E8] text-[#BE1E2D]'
                }`}>
                  {allChecksComplete
                    ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                  <div>
                    <p className="font-bold">{allChecksComplete ? 'Pemeriksaan lengkap.' : 'Verifikasi belum aktif.'}</p>
                    <p className="mt-1">
                      {allChecksComplete
                        ? 'Pastikan bukti foto dan data sudah diperiksa sebelum keputusan.'
                        : !checks.photo
                          ? 'Lengkapi bukti foto terlebih dahulu agar verifikasi dapat diproses.'
                          : 'Lengkapi semua checklist pemeriksaan agar verifikasi dapat diproses.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRejectionReason('');
                    setRejectionNotes('');
                    setRejectionError('');
                    setRejectionOpen(true);
                  }}
                  className="mt-3 min-h-12 w-full rounded-lg border border-[#EDE4E2] bg-white px-4 py-3 text-sm font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
                >
                  Tolak dengan Alasan
                </button>
              </>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#EDE4E2] pt-5 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              to="/satpam/riwayat"
              className="rounded-lg border border-[#EDE4E2] bg-white px-4 py-3 text-center text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
            >
              Riwayat Laporan
            </Link>
            <Link
              to="/satpam/koreksi"
              className="rounded-lg border border-[#EDE4E2] bg-white px-4 py-3 text-center text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]"
            >
              Ajukan Koreksi ke Admin
            </Link>
          </div>
        </section>
      </div>

      {confirmationOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmationOpen(false);
          }}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Konfirmasi Keputusan</p>
                <h2 id="confirm-title" className="mt-1.5 text-xl font-extrabold">Verifikasi Laporan?</h2>
              </div>
              <button type="button" onClick={() => setConfirmationOpen(false)} aria-label="Tutup konfirmasi">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#8A7774]">
              Laporan {report.plate} akan dinyatakan valid. {selectedCategory.points} poin akan ditambahkan ke poin pelanggaran pemilik.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setConfirmationOpen(false)} className="min-h-11 rounded-lg border border-[#EDE4E2] px-4 py-2.5 text-sm font-semibold">
                Periksa Lagi
              </button>
              <button type="button" onClick={confirmVerification} className="min-h-11 rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#A51020]">
                Ya, Verifikasi
              </button>
            </div>
          </section>
        </div>
      )}

      {rejectionOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRejectionOpen(false);
          }}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-title"
            onSubmit={confirmRejection}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Penolakan Laporan</p>
                <h2 id="reject-title" className="mt-1.5 text-xl font-extrabold">Tolak Laporan</h2>
              </div>
              <button type="button" onClick={() => setRejectionOpen(false)} aria-label="Tutup penolakan">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <p className="mt-4 text-sm text-[#8A7774]">{report.plate} <span className="mx-1">•</span> #{currentReportId}</p>
            <label htmlFor="rejection-reason" className="mt-5 block text-sm font-semibold">
              Pilihan alasan penolakan
            </label>
            <select
              id="rejection-reason"
              value={rejectionReason}
              onChange={(event) => {
                setRejectionReason(event.target.value);
                setRejectionError('');
              }}
              className="mt-2 w-full min-h-11 rounded-lg border border-[#EDE4E2] bg-white px-3.5 py-3 text-sm outline-none focus:border-[#BE1E2D]"
            >
              <option value="">Pilih alasan...</option>
              {rejectionReasons.map((reason) => <option key={reason} value={reason}>{reason}</option>)}
              <option value="other">Alasan lainnya</option>
            </select>
            <label htmlFor="rejection-notes" className="mt-4 block text-sm font-semibold">
              Alasan tambahan (opsional)
            </label>
            <textarea
              id="rejection-notes"
              rows={4}
              value={rejectionNotes}
              onChange={(event) => {
                setRejectionNotes(event.target.value);
                setRejectionError('');
              }}
              placeholder="Tambahkan keterangan jika diperlukan..."
              className="mt-2 w-full resize-y rounded-lg border border-[#EDE4E2] px-3.5 py-3 text-sm leading-relaxed outline-none focus:border-[#BE1E2D]"
            />
            {rejectionError && <p role="alert" className="mt-2 text-sm text-[#BE1E2D]">{rejectionError}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setRejectionOpen(false)} className="min-h-11 rounded-lg border border-[#EDE4E2] px-4 py-2.5 text-sm font-semibold">
                Batalkan
              </button>
              <button type="submit" className="min-h-11 rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#A51020]">
                Konfirmasi Penolakan
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-2 rounded-xl bg-[#242424] px-4 py-3 text-xs font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9FBE4]" />
          <span>{toast}</span>
          <button type="button" onClick={() => setToast('')} aria-label="Tutup pesan" className="ml-2">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
