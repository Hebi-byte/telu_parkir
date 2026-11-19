import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Clock3,
  KeyRound,
  MapPin,
  Send,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';

const initialForm = {
  reportType: '',
  keyName: '',
  description: '',
  location: '',
  date: '',
  time: '',
  reporterName: 'Budi Santoso',
  whatsapp: '',
};

const contactPattern = '\\+?[0-9]{8,15}';
const maxPhotoSize = 5 * 1024 * 1024;
const allowedPhotoTypes = ['image/jpeg', 'image/png'];

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold text-[#242424]">
      {children} <span className="text-[#BE1E2D]">*</span>
    </label>
  );
}

function TextInput({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm text-[#242424] outline-none placeholder:text-[#8A7774]/70 focus:border-[#BE1E2D] ${className}`}
    />
  );
}

export default function BuatLaporanKunciSatpam() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [lastSubmittedReport, setLastSubmittedReport] = useState(null);
  const photoInputRef = useRef(null);
  const previewUrlRef = useRef(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError('');
  }

  function handlePhotoChange(event) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!allowedPhotoTypes.includes(selectedFile.type)) {
      setPhotoError('Foto harus berformat JPG atau PNG.');
      event.target.value = '';
      return;
    }

    if (selectedFile.size > maxPhotoSize) {
      setPhotoError('Ukuran foto maksimal 5 MB.');
      event.target.value = '';
      return;
    }

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const previewUrl = URL.createObjectURL(selectedFile);
    previewUrlRef.current = previewUrl;
    setPhoto(selectedFile);
    setPhotoPreview(previewUrl);
    setPhotoError('');
  }

  function removePhoto() {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setPhoto(null);
    setPhotoPreview('');
    setPhotoError('');
    if (photoInputRef.current) photoInputRef.current.value = '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPhoneError('');
    setFormError('');

    const normalizedPhone = form.whatsapp.replace(/[\s()-]/g, '');
    if (!/^\+?\d{8,15}$/.test(normalizedPhone)) {
      setPhoneError('Masukkan nomor WhatsApp yang valid, termasuk kode negara bila diperlukan.');
      return;
    }

    if (!form.keyName.trim() || !form.description.trim() || !form.location.trim() || !form.reporterName.trim()) {
      setFormError('Lengkapi semua kolom wajib sebelum mengirim laporan.');
      return;
    }

    setConfirmationOpen(true);
  }

  function confirmSubmission() {
    const submittedReport = {
      ...form,
      keyName: form.keyName.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      reporterName: form.reporterName.trim(),
      whatsapp: form.whatsapp.trim(),
      photoName: photo?.name || '',
      submittedAt: new Date().toISOString(),
    };

    setLastSubmittedReport(submittedReport);
    setConfirmationOpen(false);
    setToast('Laporan berhasil dikirim dalam simulasi.');
  }

  return (
    <div>
      <Link
        to="/satpam/kehilangan"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8A7774] hover:text-[#BE1E2D]"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Kehilangan Kunci
      </Link>

      <header className="mb-5 border-b border-[#EDE4E2] pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-8 w-1 rounded-full bg-[#BE1E2D]" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Buat Laporan Kunci</h1>
              <p className="mt-1.5 text-sm text-[#8A7774]">
                Kehilangan atau menemukan kunci di kampus? Isi detailnya agar kami dapat membantu.
              </p>
            </div>
          </div>
          <p className="rounded-lg bg-[#FCE8E8] px-3 py-2 text-xs font-semibold text-[#BE1E2D]">
            <span className="mr-1">*</span> Tanda bintang wajib diisi
          </p>
        </div>
      </header>

      {lastSubmittedReport && (
        <div role="status" className="mb-4 flex gap-2.5 rounded-lg border border-[#c4f2d1] bg-[#D9FBE4] px-4 py-3 text-sm text-[#087A36]">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p>
            Laporan {lastSubmittedReport.reportType === 'lost' ? 'kehilangan' : 'penemuan'} untuk {lastSubmittedReport.keyName} telah dicatat dalam simulasi.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(290px,0.95fr)]">
        <section className="rounded-xl border border-[#EDE4E2] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3 border-b border-[#EDE4E2]/70 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCE8E8] text-[#BE1E2D]">
              <KeyRound className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold">Detail Laporan</h2>
          </div>

          <fieldset className="mt-5">
            <legend className="mb-2 text-xs font-bold uppercase tracking-wide">
              Jenis Laporan <span className="text-[#BE1E2D]">*</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { value: 'lost', label: 'Kehilangan', hint: 'Kunci Saya Hilang' },
                { value: 'found', label: 'Penemuan', hint: 'Saya Menemukan' },
              ].map((option) => {
                const selected = form.reportType === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors ${
                      selected ? 'border-[#BE1E2D] bg-[#FDF3F3]' : 'border-[#EDE4E2] hover:border-[#D9A5A8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportType"
                      value={option.value}
                      checked={selected}
                      required
                      onChange={() => updateField('reportType', option.value)}
                      className="h-4 w-4 accent-[#BE1E2D]"
                    />
                    <span className="text-sm font-semibold">{option.label}</span>
                    <span className={`ml-auto rounded px-2 py-1 text-xs ${selected ? 'bg-[#FCE8E8] text-[#BE1E2D]' : 'bg-[#F5F2F0] text-[#8A7774]'}`}>
                      {option.hint}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mt-1.5 text-xs text-[#8A7774]">Pilih sesuai kejadian yang ingin dilaporkan.</p>
          </fieldset>

          <div className="mt-5">
            <FieldLabel htmlFor="key-name">Merek / Nama Kunci Kendaraan</FieldLabel>
            <TextInput
              id="key-name"
              name="keyName"
              value={form.keyName}
              onChange={(event) => updateField('keyName', event.target.value)}
              placeholder="Contoh: Kunci Honda Scoopy"
              autoComplete="off"
              required
            />
          </div>

          <div className="mt-4">
            <FieldLabel htmlFor="key-description">Ciri-ciri / Deskripsi Kunci</FieldLabel>
            <textarea
              id="key-description"
              name="description"
              rows={4}
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Jelaskan warna, bentuk, gantungan, atau tanda khusus pada kunci..."
              required
              className="w-full resize-y rounded-lg border border-[#EDE4E2] px-3.5 py-3 text-sm leading-relaxed outline-none placeholder:text-[#8A7774]/70 focus:border-[#BE1E2D]"
            />
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[#8A7774]">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Hindari mencantumkan data pribadi di deskripsi.
            </p>
          </div>

          <div className="mt-4">
            <FieldLabel htmlFor="incident-location">Lokasi Kejadian</FieldLabel>
            <div className="relative">
              <TextInput
                id="incident-location"
                name="location"
                value={form.location}
                onChange={(event) => updateField('location', event.target.value)}
                placeholder="Contoh: Parkiran GKU, blok B"
                className="pr-10"
                required
              />
              <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7774]" />
            </div>
            <p className="mt-1 text-xs text-[#8A7774]">Lokasi terakhir terlihat atau tempat ditemukan.</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="incident-date">Tanggal Kejadian</FieldLabel>
              <TextInput
                id="incident-date"
                name="date"
                type="date"
                value={form.date}
                onChange={(event) => updateField('date', event.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="incident-time">Waktu (WIB)</FieldLabel>
              <TextInput
                id="incident-time"
                name="time"
                type="time"
                value={form.time}
                onChange={(event) => updateField('time', event.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center gap-1 text-xs font-bold">
              <label htmlFor="key-photo">Foto Kunci</label>
              <span className="font-normal text-[#8A7774]">(opsional)</span>
            </div>
            <input
              ref={photoInputRef}
              id="key-photo"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={handlePhotoChange}
              className="sr-only"
            />
            {photoPreview ? (
              <div className="overflow-hidden rounded-lg border border-[#EDE4E2]">
                <img src={photoPreview} alt="Pratinjau foto kunci" className="h-48 w-full object-contain bg-[#FAF8F7]" />
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EDE4E2] px-3 py-2">
                  <p className="min-w-0 truncate text-xs text-[#8A7774]">{photo?.name}</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => photoInputRef.current?.click()} className="text-xs font-semibold text-[#BE1E2D] hover:underline">
                      Ganti Foto
                    </button>
                    <button type="button" onClick={removePhoto} className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A7774] hover:text-[#BE1E2D]">
                      <Trash2 className="h-3.5 w-3.5" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label htmlFor="key-photo" className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#F4B4B8] bg-[#FFFCFC] px-4 py-5 text-center transition-colors hover:bg-[#FDF3F3]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FCE8E8] text-[#BE1E2D]">
                  <Camera className="h-4 w-4" />
                </span>
                <span className="mt-2 text-sm font-semibold text-[#BE1E2D]">Pilih foto kunci</span>
                <span className="mt-1 text-xs text-[#8A7774]">JPG atau PNG • Maks. 5 MB</span>
              </label>
            )}
            {photoError && <p role="alert" className="mt-1.5 text-xs text-[#BE1E2D]">{photoError}</p>}
            <p className="mt-1.5 text-xs text-[#8A7774]">Tambahkan foto agar kunci lebih mudah dikenali.</p>
          </div>

          {formError && <p role="alert" className="mt-4 text-sm text-[#BE1E2D]">{formError}</p>}
        </section>

        <aside className="space-y-4">
          <section className="rounded-xl border border-[#EDE4E2] bg-white p-5">
            <div className="flex items-center gap-3 border-b border-[#EDE4E2]/70 pb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCE8E8] text-[#BE1E2D]">
                <UserRound className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold">Kontak Pelapor</h2>
            </div>
            <div className="mt-4">
              <FieldLabel htmlFor="reporter-name">Nama Pelapor</FieldLabel>
              <TextInput
                id="reporter-name"
                name="reporterName"
                value={form.reporterName}
                onChange={(event) => updateField('reporterName', event.target.value)}
                autoComplete="name"
                required
              />
            </div>
            <div className="mt-4">
              <FieldLabel htmlFor="reporter-whatsapp">Nomor WhatsApp</FieldLabel>
              <TextInput
                id="reporter-whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.whatsapp}
                onChange={(event) => {
                  updateField('whatsapp', event.target.value);
                  setPhoneError('');
                }}
                placeholder="Contoh: 08xxxxxxxxxx"
                pattern={contactPattern}
                title="Masukkan nomor dengan 8–15 digit, opsional diawali dengan + kode negara."
                aria-invalid={Boolean(phoneError)}
                required
              />
              {phoneError && <p role="alert" className="mt-1 text-xs text-[#BE1E2D]">{phoneError}</p>}
              <p className="mt-1 text-xs leading-relaxed text-[#8A7774]">
                Gunakan nomor aktif agar petugas dapat menghubungi Anda.
              </p>
            </div>

            <div className="mt-4 flex gap-2.5 rounded-lg border border-[#FBD0D0] bg-[#FFFCFC] p-3 text-xs leading-relaxed text-[#8A7774]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
              <p>Kontak Anda digunakan untuk verifikasi dan tindak lanjut laporan oleh petugas keamanan.</p>
            </div>

            <button type="submit" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#BE1E2D] px-4 text-sm font-bold text-white transition-colors hover:bg-[#A51020]">
              <Send className="h-4 w-4" /> Kirim Laporan
            </button>
            <Link to="/satpam/kehilangan" className="mt-2 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-[#EDE4E2] px-4 text-sm font-semibold text-[#242424] hover:bg-[#FAF8F7]">
              Kembali
            </Link>
          </section>

          <section className="rounded-xl border border-[#EDE4E2] bg-[#F3F5F8] p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <Clock3 className="h-4 w-4 text-[#BE1E2D]" /> Pos Keamanan Terdekat
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#667085]">
              Anda juga dapat langsung menyerahkan atau mengambil kunci di Pos Keamanan Gerbang Utama atau Pos GKU Telkom University dengan membawa KTM dan STNK asli.
            </p>
          </section>
        </aside>
      </form>

      {confirmationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setConfirmationOpen(false);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="key-report-confirm-title" className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Konfirmasi Laporan</p>
                <h2 id="key-report-confirm-title" className="mt-1 text-xl font-extrabold">Kirim Laporan?</h2>
              </div>
              <button type="button" onClick={() => setConfirmationOpen(false)} aria-label="Tutup konfirmasi" className="rounded-lg p-1 text-[#8A7774] hover:bg-[#FAF8F7]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#8A7774]">
              Periksa kembali detail laporan sebelum mengirim. Laporan akan dicatat dalam simulasi Portal Satpam.
            </p>
            <dl className="mt-4 space-y-2 rounded-lg bg-[#FAF8F7] p-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Jenis</dt>
                <dd className="font-semibold">{form.reportType === 'lost' ? 'Kehilangan' : 'Penemuan'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Kunci</dt>
                <dd className="text-right font-semibold">{form.keyName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Lokasi</dt>
                <dd className="text-right font-semibold">{form.location}</dd>
              </div>
            </dl>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirmationOpen(false)} className="min-h-10 rounded-lg border border-[#EDE4E2] px-3.5 text-sm font-semibold">
                Periksa Lagi
              </button>
              <button type="button" onClick={confirmSubmission} className="min-h-10 rounded-lg bg-[#BE1E2D] px-3.5 text-sm font-bold text-white hover:bg-[#A51020]">
                Ya, Kirim Laporan
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-2 rounded-xl bg-[#242424] px-4 py-3 text-sm font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9FBE4]" />
          <span>{toast}</span>
          <button type="button" onClick={() => setToast('')} aria-label="Tutup notifikasi" className="ml-1">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
