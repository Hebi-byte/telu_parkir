import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ImageOff, Info, X } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { loadReports, updateStoredReport } from '../data/reportData';

const rejectionReasons = [
  { value: 'insufficient_evidence', label: 'Bukti tidak memadai' },
  { value: 'duplicate', label: 'Laporan duplikat' },
  { value: 'data_mismatch', label: 'Data tidak sesuai' },
  { value: 'other', label: 'Lainnya' },
];

const officer = {
  name: 'Budi Santoso',
  id: 'SPM-0142',
  post: 'Pos Gerbang 1',
  shift: '07:00–15:00',
};

function InfoRow({ label, children }) {
  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 text-sm leading-5 sm:grid-cols-[100px_minmax(0,1fr)]">
      <dt className="text-[#8A7774]">{label}</dt>
      <dd className="min-w-0 font-medium text-[#242424]">{children}</dd>
    </div>
  );
}

export default function TolakLaporanSatpam() {
  const { reportId } = useParams();
  const location = useLocation();
  const [reports, setReports] = useState(() => loadReports());
  const report = reports.find((item) => item.id === reportId) || location.state?.report;
  const returnTo = typeof location.state?.from === 'string' && location.state.from.startsWith('/satpam/')
    ? location.state.from
    : '/satpam/verifikasi';
  const [selectedReason, setSelectedReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [explanationError, setExplanationError] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [toast, setToast] = useState('');
  const isPending = report?.status === 'pending';
  const selectedReasonLabel = rejectionReasons.find((reason) => reason.value === selectedReason)?.label || '';
  const canSubmit = Boolean(isPending && selectedReason && explanation.trim());

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function confirmRejection() {
    if (!report || !isPending || !selectedReason || !explanation.trim()) {
      setReasonError(selectedReason ? '' : 'Pilih satu alasan penolakan.');
      setExplanationError(explanation.trim() ? '' : 'Penjelasan penolakan wajib diisi.');
      setConfirmationOpen(false);
      return;
    }

    const decisionAt = new Date().toISOString();
    const updatedReports = updateStoredReport(report.id, {
      status: 'rejected',
      rejectionReason: selectedReasonLabel,
      rejectionExplanation: explanation.trim(),
      handledBy: officer.name,
      handledById: officer.id,
      decisionAt,
    });
    setReports(updatedReports);
    setConfirmationOpen(false);
    setToast(`Laporan ${report.id} berhasil ditolak tanpa penambahan poin.`);
  }

  if (!report) {
    return (
      <section className="rounded-2xl border border-[#EDE4E2] bg-white p-8">
        <h1 className="text-2xl font-bold">Laporan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[#8A7774]">ID laporan {reportId} tidak tersedia dalam data laporan.</p>
        <Link to={returnTo} className="mt-4 inline-flex text-sm font-semibold text-[#BE1E2D] hover:underline">
          Kembali ke Laporan
        </Link>
      </section>
    );
  }

  const evidencePhoto = report.evidencePhoto || report.photoUrl;
  const statusLabel = report.status === 'rejected'
    ? 'Ditolak'
    : report.status === 'valid'
      ? 'Terverifikasi'
      : 'Menunggu';
  const statusType = report.status === 'rejected'
    ? 'warning'
    : report.status === 'valid'
      ? 'success'
      : 'neutral';

  return (
    <div>
      <Link to={returnTo} className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-[#BE1E2D] hover:underline">
        <span aria-hidden="true">←</span> Kembali ke Laporan
      </Link>

      <header className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">
          Panel Satpam <span className="mx-1">•</span> Pos Gerbang 1
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Tolak Laporan</h1>
        <p className="mt-1 text-sm text-[#8A7774]">
          Catat alasan dan penjelasan hasil peninjauan sebelum mengirim keputusan.
        </p>
      </header>

      <div className={`mb-4 flex gap-2.5 rounded-lg px-3.5 py-3 text-xs leading-relaxed ${
        isPending ? 'bg-[#FCE8E8] text-[#8A7774]' : 'bg-[#FAF8F7] text-[#554a48]'
      }`}>
        {isPending
          ? <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
          : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />}
        <p>
          {isPending
            ? 'Laporan masih menunggu. Belum ada keputusan penolakan yang dikirim.'
            : report.status === 'rejected'
              ? 'Laporan ini sudah ditolak. Alasan dan penjelasan keputusan tercatat dalam riwayat.'
              : 'Laporan ini sudah terverifikasi dan tidak dapat ditolak.'}
        </p>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3.5">
          <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
            <h2 className="text-base font-bold">Ringkasan Laporan</h2>
            <div className="mt-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-extrabold">{report.plate}</h3>
              <StatusBadge type={statusType} className="px-2.5 py-1 text-xs">{statusLabel}</StatusBadge>
            </div>
            <dl className="mt-3 space-y-1.5">
              <InfoRow label="ID laporan">#{report.id}</InfoRow>
              <InfoRow label="Kategori">{report.violation}</InfoRow>
              <InfoRow label="Lokasi">{report.location}</InfoRow>
              <InfoRow label="Kejadian">{report.reportDate}, {report.reportTime}</InfoRow>
            </dl>
            {evidencePhoto ? (
              <img src={evidencePhoto} alt={`Bukti laporan ${report.id}`} className="mt-3 h-28 w-full rounded-lg object-cover" />
            ) : (
              <div role="img" aria-label="Foto bukti belum tersedia" className="mt-3 flex h-28 items-center justify-center rounded-lg bg-[#F1EFEE] text-[#8A7774]">
                <div className="text-center">
                  <ImageOff className="mx-auto h-5 w-5" />
                  <p className="mt-1.5 text-xs">Pratinjau foto belum tersedia</p>
                </div>
              </div>
            )}
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Pemilik: {report.owner} <span className="mx-1">•</span> {report.vehicle}
              <span className="mx-1">•</span> Poin saat ini {report.currentPoints}; potensi +{report.potentialPoints} belum diterapkan.
            </p>
          </section>

          <div className="flex gap-2.5 rounded-lg bg-[#FCE8E8] px-3.5 py-3 text-xs leading-relaxed text-[#8A7774]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
            <p>
              Laporan ditolak menambah 0 poin dan tidak memengaruhi leaderboard. Poin pemilik tetap {report.currentPoints}.
            </p>
          </div>

          <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
            <h2 className="text-base font-bold">Pencatatan Keputusan</h2>
            <dl className="mt-3 space-y-1.5 text-xs leading-relaxed text-[#8A7774]">
              <InfoRow label="Petugas">{officer.name} • {officer.id}</InfoRow>
              <InfoRow label="Pos & shift">{officer.post} • Shift {officer.shift}</InfoRow>
              {report.decisionAt && (
                <InfoRow label="Waktu keputusan">{new Date(report.decisionAt).toLocaleString('id-ID')}</InfoRow>
              )}
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Setelah konfirmasi dikirim, petugas, alasan, penjelasan, dan waktu keputusan dicatat dalam riwayat.
            </p>
          </section>
        </div>

        <div className="space-y-3.5">
          {isPending ? (
            <>
              <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
                <fieldset
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget) && !selectedReason) {
                      setReasonError('Pilih satu alasan penolakan.');
                    }
                  }}
                  aria-describedby={reasonError ? 'reason-error' : undefined}
                >
                  <legend className="text-base font-bold">Alasan Penolakan <span className="text-[#BE1E2D]">*</span></legend>
                  <p className="mt-2 text-xs text-[#8A7774]">Wajib pilih satu alasan yang sesuai hasil peninjauan.</p>
                  <div className="mt-3 space-y-2.5">
                    {rejectionReasons.map((reason) => (
                      <label key={reason.value} className="flex cursor-pointer items-center gap-2.5 text-sm">
                        <input
                          type="radio"
                          name="rejection-reason"
                          value={reason.value}
                          checked={selectedReason === reason.value}
                          onChange={() => {
                            setSelectedReason(reason.value);
                            setReasonError('');
                          }}
                          className="h-4 w-4 accent-[#BE1E2D]"
                        />
                        {reason.label}
                      </label>
                    ))}
                  </div>
                  {reasonError && <p id="reason-error" role="alert" className="mt-2 text-xs text-[#BE1E2D]">{reasonError}</p>}
                </fieldset>
              </section>

              <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
                <label htmlFor="rejection-explanation" className="text-base font-bold">
                  Penjelasan Penolakan
                </label>
                <label htmlFor="rejection-explanation" className="mt-2 block text-xs font-semibold">
                  Penjelasan <span className="text-[#BE1E2D]">*</span>
                </label>
                <textarea
                  id="rejection-explanation"
                  rows={4}
                  value={explanation}
                  onChange={(event) => {
                    setExplanation(event.target.value);
                    if (event.target.value.trim()) setExplanationError('');
                  }}
                  onBlur={() => {
                    if (!explanation.trim()) setExplanationError('Penjelasan penolakan wajib diisi.');
                  }}
                  placeholder="Jelaskan temuan dan alasan penolakan secara spesifik..."
                  aria-invalid={Boolean(explanationError)}
                  aria-describedby={explanationError ? 'explanation-error explanation-help' : 'explanation-help'}
                  className="mt-2 w-full resize-y rounded-lg border border-[#EDE4E2] px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-[#8A7774]/70 focus:border-[#BE1E2D]"
                />
                {explanationError && <p id="explanation-error" role="alert" className="mt-1 text-xs text-[#BE1E2D]">{explanationError}</p>}
                <p id="explanation-help" className="mt-2 text-xs leading-relaxed text-[#8A7774]">
                  Wajib diisi untuk semua pilihan alasan, termasuk Lainnya. Jangan cantumkan data pribadi yang tidak relevan.
                </p>
              </section>

              <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
                <h2 className="text-base font-bold">Konfirmasi Keputusan</h2>
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => setConfirmationOpen(true)}
                  className="mt-3 min-h-10 rounded-lg bg-[#BE1E2D] px-3.5 text-xs font-bold text-white transition-colors hover:bg-[#A51020] disabled:cursor-not-allowed disabled:bg-[#E5E0DF] disabled:text-[#8A7774]"
                >
                  Konfirmasi Penolakan
                </button>
                <p className="mt-2 text-xs leading-relaxed text-[#8A7774]">
                  Pilih alasan dan isi penjelasan terlebih dahulu untuk mengaktifkan konfirmasi.
                </p>
                <Link to={returnTo} className="mt-3 inline-flex min-h-9 items-center rounded-lg border border-[#EDE4E2] px-3 text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]">
                  Batal &amp; Kembali ke Laporan
                </Link>
              </section>
            </>
          ) : (
            <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
              <h2 className="text-base font-bold">Keterangan Keputusan</h2>
              {report.status === 'rejected' ? (
                <div className="mt-3 space-y-2 text-xs leading-relaxed">
                  <p><span className="font-semibold">Alasan:</span> {report.rejectionReason || 'Tidak tersedia.'}</p>
                  <p><span className="font-semibold">Penjelasan:</span> {report.rejectionExplanation || 'Tidak tersedia.'}</p>
                </div>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-[#8A7774]">
                  Laporan telah terverifikasi. Keputusan penolakan tidak dapat dikirim.
                </p>
              )}
              <Link to={returnTo} className="mt-4 inline-flex min-h-9 items-center rounded-lg border border-[#EDE4E2] px-3 text-xs font-semibold text-[#BE1E2D] hover:border-[#BE1E2D]">
                Kembali ke Laporan
              </Link>
            </section>
          )}
        </div>
      </div>

      {confirmationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setConfirmationOpen(false);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="rejection-confirm-title" className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Konfirmasi Keputusan</p>
                <h2 id="rejection-confirm-title" className="mt-1 text-xl font-extrabold">Konfirmasi Penolakan Laporan?</h2>
              </div>
              <button type="button" onClick={() => setConfirmationOpen(false)} aria-label="Tutup konfirmasi" className="rounded-lg p-1 text-[#8A7774] hover:bg-[#FAF8F7]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Apakah Anda yakin ingin menolak laporan ini? Keputusan beserta alasan dan penjelasan akan dicatat dalam riwayat laporan.
            </p>
            <dl className="mt-4 space-y-2 rounded-lg bg-[#FAF8F7] p-3 text-xs">
              <InfoRow label="ID laporan">#{report.id}</InfoRow>
              <InfoRow label="Plat nomor">{report.plate}</InfoRow>
              <InfoRow label="Alasan">{selectedReasonLabel}</InfoRow>
            </dl>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirmationOpen(false)} className="min-h-10 rounded-lg border border-[#EDE4E2] px-3.5 text-xs font-semibold">
                Batal
              </button>
              <button type="button" onClick={confirmRejection} className="min-h-10 rounded-lg bg-[#BE1E2D] px-3.5 text-xs font-bold text-white hover:bg-[#A51020]">
                Ya, Tolak Laporan
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-2 rounded-xl bg-[#242424] px-4 py-3 text-xs font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9FBE4]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
