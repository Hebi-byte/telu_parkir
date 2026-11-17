import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  Send,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react';

const violations = [
  { id: 'marka', label: 'Parkir tidak sesuai marka', points: 1 },
  { id: 'akses', label: 'Menghalangi akses jalan', points: 4 },
  { id: 'terlarang', label: 'Parkir di area terlarang', points: 7 },
];

const platePattern = /^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{1,3}$/;

function formatReportTime(date) {
  return `Hari ini, ${new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  }).format(date)} WIB`;
}

function ReportStatus({ status }) {
  const styles = {
    Menunggu: 'bg-[#FFF0CC] text-[#8A5A00]',
    'Dalam Peninjauan': 'bg-[#EBF3FF] text-[#1D4ED8]',
    Terverifikasi: 'bg-[#D9FBE4] text-[#087A36]',
    Ditolak: 'bg-[#FCE8E8] text-[#BE1E2D]',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[status] || styles.Menunggu}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function LaporParkirMahasiswa({
  reports,
  onSubmitReport,
}) {
  const [plate, setPlate] = useState('');
  const [violation, setViolation] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [showAllReports, setShowAllReports] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files?.[0];
    event.target.value = '';
    if (!selectedFile) return;

    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setPhoto(null);
      setPreviewUrl('');
      setErrors((current) => ({ ...current, photo: 'Pilih foto berformat JPG, JPEG, atau PNG.' }));
      return;
    }

    setPhoto(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setErrors((current) => ({ ...current, photo: '' }));
    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedPlate = plate.trim().replace(/\s+/g, ' ').toUpperCase();
    const normalizedLocation = location.trim().replace(/\s+/g, ' ');
    const nextErrors = {};

    if (!normalizedPlate) {
      nextErrors.plate = 'Plat nomor wajib diisi.';
    } else if (!platePattern.test(normalizedPlate)) {
      nextErrors.plate = 'Masukkan format plat yang valid, misalnya D 5482 UBW.';
    }
    if (!violation) nextErrors.violation = 'Pilih jenis pelanggaran.';
    if (!normalizedLocation) nextErrors.location = 'Lokasi kejadian wajib diisi.';
    if (!photo) nextErrors.photo = 'Foto bukti wajib dilampirkan.';

    setPlate(normalizedPlate);
    setLocation(normalizedLocation);
    setErrors(nextErrors);
    setNotice('');

    if (Object.keys(nextErrors).length > 0) return;

    const now = new Date();
    const selectedViolation = violations.find((item) => item.id === violation);
    onSubmitReport({
      id: `LPR-${now.getTime()}`,
      plate: normalizedPlate,
      violation: selectedViolation.label,
      points: selectedViolation.points,
      location: normalizedLocation,
      notes,
      photo,
      time: formatReportTime(now),
      createdAt: now.toISOString(),
      status: 'Menunggu',
    });

    setPlate('');
    setViolation('');
    setLocation('');
    setPhoto(null);
    setPreviewUrl('');
    setNotes('');
    setErrors({});
    setNotice('Laporan berhasil dikirim dan masuk ke riwayat laporan.');
  };

  const visibleReports = showAllReports ? reports : reports.slice(0, 1);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-[11px] font-extrabold tracking-[0.14em] text-[#BE1E2D]">
          PELAPORAN MAHASISWA
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#242424] sm:text-3xl">
          Lapor Parkir
        </h1>
        <p className="text-xs leading-relaxed text-[#8A7774] sm:text-sm">
          Bantu jaga ketertiban parkir Tel-U. Laporan tervalidasi akan segera ditindaklanjuti.
        </p>
      </header>

      {notice && (
        <div role="status" className="flex items-start gap-2 rounded-xl border border-[#b8f0ca] bg-[#D9FBE4] px-4 py-3 text-xs font-semibold text-[#087A36]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          {notice}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="space-y-5">
            <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-xs sm:p-6">
              <h2 className="mb-4 text-sm font-bold text-[#242424]">
                Data kendaraan &amp; pelanggaran
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="plate" className="mb-1.5 block text-xs font-semibold text-[#242424]">
                    Plat Nomor Kendaraan <span className="text-[#BE1E2D]">• Wajib</span>
                  </label>
                  <input
                    id="plate"
                    name="plate"
                    type="text"
                    autoComplete="off"
                    placeholder="Masukkan plat nomor kendaraan"
                    value={plate}
                    onChange={(event) => {
                      setPlate(event.target.value.toUpperCase().replace(/\s+/g, ' '));
                      setErrors((current) => ({ ...current, plate: '' }));
                    }}
                    aria-invalid={Boolean(errors.plate)}
                    aria-describedby={errors.plate ? 'plate-error' : 'plate-help'}
                    className={`w-full rounded-lg border px-3 py-2.5 text-xs text-[#242424] outline-none transition focus:border-[#BE1E2D] focus:ring-2 focus:ring-[#BE1E2D]/10 ${
                      errors.plate ? 'border-[#BE1E2D]' : 'border-[#EDE4E2]'
                    }`}
                  />
                  {errors.plate ? (
                    <p id="plate-error" className="mt-1.5 text-[11px] text-[#BE1E2D]">{errors.plate}</p>
                  ) : (
                    <p id="plate-help" className="mt-1.5 text-[11px] text-[#8A7774]">
                      RI / BDG • Format plat otomatis terverifikasi.
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="mb-2 block text-xs font-semibold text-[#242424]">
                    Jenis Pelanggaran <span className="text-[#BE1E2D]">• +Karma</span>
                  </legend>
                  <div className="space-y-1.5">
                    {violations.map((item) => (
                      <label
                        key={item.id}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-xs transition ${
                          violation === item.id
                            ? 'border-[#BE1E2D] bg-[#FCE8E8] text-[#242424]'
                            : 'border-[#EDE4E2] bg-white text-[#242424] hover:bg-[#FAF8F7]'
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <input
                            type="radio"
                            name="violation"
                            value={item.id}
                            checked={violation === item.id}
                            onChange={() => {
                              setViolation(item.id);
                              setErrors((current) => ({ ...current, violation: '' }));
                            }}
                            className="h-3.5 w-3.5 accent-[#BE1E2D]"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="shrink-0 font-semibold text-[#8A7774]">+{item.points} Poin</span>
                      </label>
                    ))}
                  </div>
                  {errors.violation && <p className="mt-1.5 text-[11px] text-[#BE1E2D]">{errors.violation}</p>}
                </fieldset>

                <div>
                  <label htmlFor="location" className="mb-1.5 block text-xs font-semibold text-[#242424]">
                    Lokasi Kejadian
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={location}
                    placeholder="Contoh: Depan Lobby Rektorat"
                    onChange={(event) => {
                      setLocation(event.target.value);
                      setErrors((current) => ({ ...current, location: '' }));
                    }}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? 'location-error' : 'location-help'}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-xs text-[#242424] outline-none placeholder:text-[#8A7774]/70 focus:border-[#BE1E2D] focus:ring-2 focus:ring-[#BE1E2D]/10 ${
                      errors.location ? 'border-[#BE1E2D]' : 'border-[#EDE4E2]'
                    }`}
                  />
                  {errors.location ? (
                    <p id="location-error" className="mt-1.5 text-[11px] text-[#BE1E2D]">{errors.location}</p>
                  ) : (
                    <p id="location-help" className="mt-1.5 text-[11px] text-[#8A7774]">
                      Tuliskan gedung, area, atau patokan lokasi.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <aside className="flex items-start gap-3 rounded-xl border border-[#b8f0ca] bg-[#D9FBE4] p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#087A36]" />
              <div>
                <h2 className="text-xs font-bold text-[#087A36]">Privasi pelapor</h2>
                <p className="mt-1 text-[11px] leading-relaxed text-[#087A36]">
                  Identitas pelapor terenkripsi dan dirahasiakan.
                </p>
              </div>
            </aside>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-xs sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-[#242424]">Bukti Foto</h2>
                <span className="text-[11px] font-semibold text-[#BE1E2D]">
                  {photo ? '✓ 1 Terlampir' : '0 Terlampir'}
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                onChange={handlePhotoChange}
                className="hidden"
                aria-label="Pilih foto bukti"
              />

              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Pratinjau foto bukti parkir"
                    className="h-48 w-full rounded-lg border border-[#EDE4E2] object-cover sm:h-56"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-[#EDE4E2] bg-white px-3 py-2 text-xs font-bold text-[#BE1E2D] shadow-sm hover:bg-[#FAF8F7]"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    Ganti
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#d8cecb] bg-[#FAF8F7] text-center hover:border-[#BE1E2D] hover:bg-[#FDF3F3] sm:h-56"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#BE1E2D]">
                    <ImagePlus className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-[#242424]">Unggah foto bukti</span>
                  <span className="text-[11px] text-[#8A7774]">Format JPG, JPEG, atau PNG</span>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#BE1E2D] px-3 py-1.5 text-[11px] font-bold text-white">
                    <Upload className="h-3 w-3" />
                    Pilih Foto
                  </span>
                </button>
              )}

              {previewUrl && (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-[11px] text-[#8A7774]">
                    Foto dipilih • {location || 'Lokasi belum dipilih'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPreviewUrl('');
                      setErrors((current) => ({ ...current, photo: '' }));
                    }}
                    className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#BE1E2D] hover:underline"
                  >
                    <Trash2 className="h-3 w-3" />
                    Hapus
                  </button>
                </div>
              )}
              {errors.photo && <p className="mt-2 text-[11px] text-[#BE1E2D]">{errors.photo}</p>}
              <p className="mt-3 text-[11px] text-[#8A7774]">
                {photo ? `${photo.name} • Informasi waktu mengikuti waktu laporan.` : 'Waktu dan lokasi akan dicatat saat laporan dikirim.'}
              </p>
            </section>

            <section className="rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-xs sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#242424]">Catatan Tambahan</h2>
                <span className="text-[11px] font-semibold text-[#BE1E2D]">Opsional</span>
              </div>
              <label htmlFor="notes" className="mb-1.5 block text-xs font-semibold text-[#242424]">
                Catatan kejadian
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                maxLength={500}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Ceritakan detail kejadian (opsional)"
                className="w-full resize-y rounded-lg border border-[#EDE4E2] px-3 py-2.5 text-xs leading-relaxed text-[#242424] outline-none placeholder:text-[#8A7774]/70 focus:border-[#BE1E2D] focus:ring-2 focus:ring-[#BE1E2D]/10"
              />
              <p className="mt-1 text-right text-[10px] text-[#8A7774]">{notes.length}/500</p>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#A51020] focus:outline-none focus:ring-2 focus:ring-[#BE1E2D]/30"
              >
                <Send className="h-3.5 w-3.5" />
                Kirim Laporan
              </button>
            </section>
          </div>
        </div>
      </form>

      <section className="overflow-hidden rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-[#242424]">Riwayat Laporan</h2>
          {reports.length > 1 && (
            <button
              type="button"
              onClick={() => setShowAllReports((current) => !current)}
              className="text-[11px] font-bold text-[#BE1E2D] hover:underline"
            >
              {showAllReports ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua ›'}
            </button>
          )}
        </div>

        {visibleReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="bg-[#FAF8F7] text-[10px] font-bold text-[#554a48]">
                <tr>
                  <th className="px-3 py-3">Plat kendaraan</th>
                  <th className="px-3 py-3">Lokasi</th>
                  <th className="px-3 py-3">Waktu laporan</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE4E2]">
                {visibleReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-3 py-3.5 font-semibold text-[#242424]">{report.plate}</td>
                    <td className="px-3 py-3.5 text-[#554a48]">{report.location}</td>
                    <td className="px-3 py-3.5 text-[#554a48]">{report.time}</td>
                    <td className="px-3 py-3.5"><ReportStatus status={report.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl bg-[#FAF8F7] px-4 py-8 text-center">
            <Camera className="mx-auto h-6 w-6 text-[#8A7774]" />
            <p className="mt-2 text-xs font-semibold text-[#242424]">Belum ada laporan parkir</p>
            <p className="mt-1 text-[11px] text-[#8A7774]">Laporan yang Anda kirim akan tampil di sini.</p>
          </div>
        )}
      </section>
    </div>
  );
}
