import { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  Clock3,
  Info,
  KeyRound,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';

const initialReports = [
  {
    id: 'FND-204',
    type: 'found',
    title: 'Kunci Honda Scoopy (Gantungan Merah Tel-U)',
    vehicle: 'Honda Scoopy',
    location: 'Parkir Barat Open Library',
    description: 'Ditemukan di dekat portal masuk motor, gantungan boneka kecil dan pita merah Telkom University.',
    time: 'Hari ini, 08:30 WIB',
    createdAt: '2026-11-16T08:30:00',
    status: 'Diamankan di Pos Satpam Gerbang 1',
    image: 'https://images.pexels.com/photos/842528/pexels-photo-842528.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-202',
    type: 'found',
    title: 'Smart Key / Remote Yamaha Aerox',
    vehicle: 'Yamaha Aerox',
    location: 'Parkiran Gedung Kuliah Umum (GKU)',
    description: 'Remote keyless dengan silikon hitam, kondisi mulus aktif, terjatuh di deretan motor matic blok B.',
    time: 'Kemarin, 16:15 WIB',
    createdAt: '2026-11-15T16:15:00',
    status: 'Dalam Penanganan Satpam',
    image: 'https://images.pexels.com/photos/13101559/pexels-photo-13101559.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-201',
    type: 'found',
    title: 'Kunci Honda Vario dengan gantungan biru',
    vehicle: 'Honda Vario',
    location: 'Parkiran FIT',
    description: 'Satu kunci motor ditemukan di dekat area parkir dosen FIT.',
    time: '15 Nov 2026, 13:20 WIB',
    createdAt: '2026-11-15T13:20:00',
    status: 'Diamankan di Pos Satpam FIT',
    image: 'https://images.pexels.com/photos/842528/pexels-photo-842528.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-200',
    type: 'found',
    title: 'Remote Yamaha NMAX warna hitam',
    vehicle: 'Yamaha NMAX',
    location: 'Masjid Syamsul Ulum',
    description: 'Ditemukan setelah waktu salat di area parkir masjid.',
    time: '14 Nov 2026, 12:05 WIB',
    createdAt: '2026-11-14T12:05:00',
    status: 'Dalam Penanganan Satpam',
    image: 'https://images.pexels.com/photos/13101559/pexels-photo-13101559.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-199',
    type: 'found',
    title: 'Kunci Honda Beat dengan gantungan karakter',
    vehicle: 'Honda Beat',
    location: 'Parkiran GKU',
    description: 'Kunci motor ditemukan di antara deretan parkir mahasiswa.',
    time: '13 Nov 2026, 10:40 WIB',
    createdAt: '2026-11-13T10:40:00',
    status: 'Diamankan di Pos Satpam Gerbang 1',
    image: 'https://images.pexels.com/photos/842528/pexels-photo-842528.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-198',
    type: 'found',
    title: 'Kunci Suzuki dengan gantungan kulit',
    vehicle: 'Suzuki Address',
    location: 'Parkiran FIT',
    description: 'Ditemukan di jalur pedestrian dekat parkiran.',
    time: '12 Nov 2026, 09:10 WIB',
    createdAt: '2026-11-12T09:10:00',
    status: 'Dalam Penanganan Satpam',
    image: 'https://images.pexels.com/photos/13101559/pexels-photo-13101559.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-197',
    type: 'found',
    title: 'Remote keyless Honda PCX',
    vehicle: 'Honda PCX',
    location: 'Masjid Syamsul Ulum',
    description: 'Remote ditemukan di area parkir sisi timur masjid.',
    time: '11 Nov 2026, 15:45 WIB',
    createdAt: '2026-11-11T15:45:00',
    status: 'Diamankan di Pos Satpam Masjid',
    image: 'https://images.pexels.com/photos/842528/pexels-photo-842528.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'FND-196',
    type: 'found',
    title: 'Kunci Yamaha Fazzio dengan gantungan merah',
    vehicle: 'Yamaha Fazzio',
    location: 'Parkir Barat Open Library',
    description: 'Kunci motor ditemukan di dekat pintu masuk perpustakaan.',
    time: '10 Nov 2026, 11:25 WIB',
    createdAt: '2026-11-10T11:25:00',
    status: 'Dalam Penanganan Satpam',
    image: 'https://images.pexels.com/photos/13101559/pexels-photo-13101559.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'LST-203',
    type: 'lost',
    title: 'Kunci Vespa Primavera dengan gantungan kulit',
    vehicle: 'Vespa Primavera',
    location: 'Parkiran FIT',
    description: 'Kunci terakhir terlihat di area parkir FIT pada jam kuliah siang.',
    time: 'Hari ini, 09:10 WIB',
    createdAt: '2026-11-16T09:10:00',
    status: 'Menunggu informasi',
    image: '',
  },
  {
    id: 'LST-201',
    type: 'lost',
    title: 'Remote keyless Honda Vario 160',
    vehicle: 'Honda Vario 160',
    location: 'Masjid Syamsul Ulum',
    description: 'Remote hitam dengan gantungan karet, hilang setelah kegiatan salat.',
    time: 'Kemarin, 13:45 WIB',
    createdAt: '2026-11-15T13:45:00',
    status: 'Menunggu informasi',
    image: '',
  },
  {
    id: 'LST-199',
    type: 'lost',
    title: 'Kunci Yamaha Gear dengan gantungan biru',
    vehicle: 'Yamaha Gear',
    location: 'Parkiran GKU',
    description: 'Kunci motor hilang di sekitar barisan parkir mahasiswa.',
    time: '14 Nov 2026, 10:00 WIB',
    createdAt: '2026-11-14T10:00:00',
    status: 'Menunggu informasi',
    image: '',
  },
];

const quickLocations = ['Semua Lokasi', 'Parkiran GKU', 'Parkiran FIT', 'Masjid Syamsul Ulum'];

function ReportImage({ report }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative h-36 overflow-hidden rounded-lg bg-[#F2EFEE] sm:h-[136px]">
      {report.image && !imageFailed ? (
        <img
          src={report.image}
          alt={`Foto ${report.title}`}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#F9E6E6] to-[#EEE9E7] text-[#BE1E2D]">
          <KeyRound className="h-10 w-10" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

function ReportDialog({ dialog, onClose, onSubmit }) {
  const isForm = dialog.type === 'create';
  const report = dialog.report;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#242424]/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-dialog-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
              {isForm ? 'Layanan Keamanan' : report.id}
            </p>
            <h2 id="report-dialog-title" className="mt-1 text-lg font-extrabold text-[#242424]">
              {isForm ? 'Buat Laporan Kunci' : report.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#8A7774] transition hover:bg-[#FAF8F7] hover:text-[#242424]"
            aria-label="Tutup dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isForm ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-xs font-semibold text-[#242424]">
              Jenis laporan
              <select
                name="type"
                defaultValue="lost"
                className="mt-1.5 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 py-2.5 text-xs font-medium outline-none focus:border-[#BE1E2D]"
              >
                <option value="lost">Saya kehilangan kunci</option>
                <option value="found">Saya menemukan kunci</option>
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-[#242424]">
                Merek / kendaraan
                <input
                  required
                  name="vehicle"
                  placeholder="Contoh: Honda Scoopy"
                  className="mt-1.5 w-full rounded-lg border border-[#EDE4E2] px-3 py-2.5 text-xs font-medium outline-none placeholder:text-[#AA9A97] focus:border-[#BE1E2D]"
                />
              </label>
              <label className="block text-xs font-semibold text-[#242424]">
                Lokasi
                <select
                  required
                  name="location"
                  defaultValue=""
                  className="mt-1.5 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 py-2.5 text-xs font-medium outline-none focus:border-[#BE1E2D]"
                >
                  <option value="" disabled>Pilih lokasi</option>
                  {quickLocations.slice(1).map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                  <option value="Parkir Barat Open Library">Parkir Barat Open Library</option>
                </select>
              </label>
            </div>
            <label className="block text-xs font-semibold text-[#242424]">
              Deskripsi kunci
              <input
                required
                name="title"
                placeholder="Ciri-ciri kunci atau gantungan"
                className="mt-1.5 w-full rounded-lg border border-[#EDE4E2] px-3 py-2.5 text-xs font-medium outline-none placeholder:text-[#AA9A97] focus:border-[#BE1E2D]"
              />
            </label>
            <label className="block text-xs font-semibold text-[#242424]">
              Detail tambahan
              <textarea
                required
                name="description"
                rows="3"
                placeholder="Ceritakan waktu, lokasi, dan ciri-ciri kunci"
                className="mt-1.5 w-full resize-y rounded-lg border border-[#EDE4E2] px-3 py-2.5 text-xs font-medium outline-none placeholder:text-[#AA9A97] focus:border-[#BE1E2D]"
              />
            </label>
            <div className="flex items-start gap-2 rounded-lg bg-[#FCE8E8] p-3 text-[10px] leading-relaxed text-[#8A7774]">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#BE1E2D]" />
              Jangan cantumkan NIM atau informasi sensitif. Petugas akan membantu proses verifikasi.
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#EDE4E2] px-4 py-2.5 text-xs font-bold text-[#8A7774] transition hover:bg-[#FAF8F7]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#A51020]"
              >
                <Plus className="h-3.5 w-3.5" />
                Kirim Laporan
              </button>
            </div>
          </form>
        ) : (
          <div>
            <ReportImage report={report} />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#D9FBE4] px-2.5 py-1 text-[10px] font-bold text-[#087A36]">
                #{report.id}
              </span>
              <span className="text-[10px] text-[#8A7774]">{report.time}</span>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <p className="flex items-start gap-2 text-[#8A7774]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#BE1E2D]" />
                {report.location}
              </p>
              <p className="leading-relaxed text-[#8A7774]">{report.description}</p>
              <p className="rounded-lg bg-[#F5F2F1] px-3 py-2 text-[10px] font-semibold text-[#6F5C59]">
                {report.type === 'found'
                  ? `Status: ${report.status}`
                  : 'Status: Laporan kehilangan diteruskan ke petugas'}
              </p>
              {dialog.type === 'claim' && (
                <p className="rounded-lg bg-[#FCE8E8] px-3 py-2 text-[10px] leading-relaxed text-[#8A7774]">
                  Untuk mengambil kunci, hubungi petugas di pos yang tertera dan siapkan STNK asli serta KTM untuk verifikasi.
                </p>
              )}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#A51020]"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function KehilanganMahasiswa() {
  const [reports, setReports] = useState(initialReports);
  const [activeType, setActiveType] = useState('found');
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('Semua Lokasi');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const counts = useMemo(() => ({
    found: reports.filter((report) => report.type === 'found').length,
    lost: reports.filter((report) => report.type === 'lost').length,
  }), [reports]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('id');

    return reports
      .filter((report) => report.type === activeType)
      .filter((report) => locationFilter === 'Semua Lokasi' || report.location === locationFilter)
      .filter((report) => !query || [
        report.title,
        report.vehicle,
        report.location,
        report.description,
        report.id,
      ].some((value) => value.toLocaleLowerCase('id').includes(query)))
      .sort((a, b) => sortOrder === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt));
  }, [activeType, locationFilter, reports, search, sortOrder]);

  const handleCreateReport = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const type = String(formData.get('type'));
    const vehicle = String(formData.get('vehicle')).trim();
    const location = String(formData.get('location'));
    const title = String(formData.get('title')).trim();
    const description = String(formData.get('description')).trim();
    const id = `${type === 'found' ? 'FND' : 'LST'}-${Date.now().toString().slice(-3)}`;

    setReports((current) => [{
      id,
      type,
      vehicle,
      title: `${title} (${vehicle})`,
      location,
      description,
      time: 'Baru saja',
      createdAt: new Date().toISOString(),
      status: type === 'found' ? 'Menunggu verifikasi petugas' : 'Menunggu informasi',
      image: '',
    }, ...current]);
    setActiveType(type);
    setLocationFilter('Semua Lokasi');
    setSearch('');
    setSubmissionMessage('Laporan berhasil dibuat dan siap ditinjau petugas.');
    setDialog(null);
  };

  const locationOptions = [...new Set(reports.map((report) => report.location))];

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
            Layanan Keamanan
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#242424] sm:text-3xl">
            Kehilangan &amp; Penemuan Kunci
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-[#8A7774]">
            Pusat informasi kehilangan dan penemuan kunci kendaraan di area Telkom University.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDialog({ type: 'create' })}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#BE1E2D] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#A51020] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE1E2D]"
        >
          <Plus className="h-3.5 w-3.5" />
          Buat Laporan
        </button>
      </header>

      <section aria-label="Daftar laporan kunci">
        <div className="flex gap-1 border-b border-[#EDE4E2]">
          {[
            { id: 'found', label: 'Kunci Ditemukan', count: counts.found },
            { id: 'lost', label: 'Kunci Kehilangan', count: counts.lost },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveType(tab.id)}
              aria-pressed={activeType === tab.id}
              className={`rounded-t-lg px-3 py-2 text-[10px] font-bold transition sm:px-4 ${
                activeType === tab.id
                  ? 'bg-[#BE1E2D] text-white'
                  : 'bg-white text-[#6F5C59] hover:bg-[#F5F2F1]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label className="relative flex min-w-0 flex-1 items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#8A7774]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari merek kendaraan, gantungan kunci, lokasi..."
              aria-label="Cari laporan kunci"
              className="h-10 w-full rounded-lg border border-[#EDE4E2] bg-white pl-9 pr-3 text-xs text-[#242424] outline-none placeholder:text-[#AA9A97] focus:border-[#BE1E2D]"
            />
          </label>
          <label className="relative flex items-center">
            <span className="sr-only">Pilih lokasi</span>
            <select
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-[#EDE4E2] bg-white py-2 pl-3 pr-9 text-[10px] font-bold text-[#BE1E2D] outline-none focus:border-[#BE1E2D] sm:w-36"
            >
              {['Semua Lokasi', ...locationOptions].map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-[#BE1E2D]" />
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((open) => !open)}
              aria-expanded={filterOpen}
              className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border px-3 text-[10px] font-bold transition sm:w-auto ${
                filterOpen
                  ? 'border-[#BE1E2D] bg-[#FCE8E8] text-[#BE1E2D]'
                  : 'border-[#EDE4E2] bg-white text-[#BE1E2D] hover:bg-[#FAF8F7]'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </button>
            {filterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-40 rounded-xl border border-[#EDE4E2] bg-white p-2 shadow-lg">
                <p className="px-2 py-1 text-[10px] font-bold text-[#8A7774]">Urutkan laporan</p>
                {[
                  { id: 'newest', label: 'Terbaru' },
                  { id: 'oldest', label: 'Terlama' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSortOrder(option.id);
                      setFilterOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-xs text-[#242424] hover:bg-[#FAF8F7]"
                  >
                    {option.label}
                    {sortOrder === option.id && <Check className="h-3.5 w-3.5 text-[#BE1E2D]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {quickLocations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => setLocationFilter(location)}
              className={`rounded-full px-2.5 py-1 text-[9px] font-bold transition ${
                locationFilter === location
                  ? 'bg-[#FCE8E8] text-[#BE1E2D]'
                  : 'bg-[#F0ECEB] text-[#6F5C59] hover:bg-[#E9E2E0]'
              }`}
            >
              <span className="mr-1">•</span>
              {location}
            </button>
          ))}
        </div>
      </section>

      {submissionMessage && (
        <div role="status" className="flex items-center justify-between gap-3 rounded-lg border border-[#BFECCB] bg-[#E9FBEE] px-3.5 py-3 text-xs font-semibold text-[#087A36]">
          <span>{submissionMessage}</span>
          <button
            type="button"
            onClick={() => setSubmissionMessage('')}
            aria-label="Tutup pesan"
            className="rounded p-1 hover:bg-[#D9FBE4]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          {filteredReports.map((report) => (
            <article key={report.id} className="flex flex-col rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(54,34,32,0.03)]">
              <ReportImage report={report} />
              <div className="mt-3 flex items-center gap-1.5">
                <span className="rounded-full bg-[#D9FBE4] px-2 py-0.5 text-[9px] font-bold text-[#087A36]">
                  • #{report.id}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-[#8A7774]">
                  <Clock3 className="h-3 w-3" />
                  {report.time}
                </span>
              </div>
              <h2 className="mt-2.5 text-sm font-bold tracking-tight text-[#242424]">
                {report.title}
              </h2>
              <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#BE1E2D]">
                <MapPin className="h-3 w-3 shrink-0" />
                {report.location}
              </p>
              <p className="mt-3 text-[10px] leading-relaxed text-[#8A7774]">
                {report.description}
              </p>
              <div className="mt-2.5">
                <span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${
                  report.type === 'found' ? 'bg-[#D9FBE4] text-[#087A36]' : 'bg-[#FCE8E8] text-[#BE1E2D]'
                }`}>
                  • {report.status}
                </span>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setDialog({ type: report.type === 'found' ? 'claim' : 'detail', report })}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                    report.type === 'found'
                      ? 'bg-[#BE1E2D] text-white hover:bg-[#A51020]'
                      : 'border border-[#EDE4E2] bg-white text-[#BE1E2D] hover:bg-[#FAF8F7]'
                  }`}
                >
                  {report.type === 'found' ? <ShieldCheck className="h-3.5 w-3.5" /> : <Info className="h-3.5 w-3.5" />}
                  {report.type === 'found' ? 'Klaim / Hubungi Petugas' : 'Detail Laporan'}
                </button>
                <button
                  type="button"
                  onClick={() => setDialog({ type: 'detail', report })}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#EDE4E2] bg-white px-3 py-2 text-[10px] font-bold text-[#6F5C59] transition hover:bg-[#FAF8F7]"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Detail &amp; Verifikasi
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#E3D8D6] bg-white px-5 py-12 text-center">
          <KeyRound className="mx-auto h-8 w-8 text-[#BE1E2D]" strokeWidth={1.5} />
          <h2 className="mt-3 text-sm font-bold text-[#242424]">Laporan tidak ditemukan</h2>
          <p className="mt-1 text-xs text-[#8A7774]">Coba kata kunci atau lokasi lain.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setLocationFilter('Semua Lokasi');
            }}
            className="mt-4 text-xs font-bold text-[#BE1E2D] hover:underline"
          >
            Hapus filter
          </button>
        </div>
      )}

      <div className="flex items-start gap-2.5 rounded-lg bg-[#FCE8E8] px-3.5 py-3 text-[#BE1E2D]">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="text-[10px] font-bold">Prosedur Pengambilan Kunci</p>
          <p className="mt-1 text-[9px] leading-relaxed text-[#8A7774]">
            Pengambilan kunci wajib menunjukkan STNK asli &amp; kartu mahasiswa (KTM) di Pos Satpam terkait untuk verifikasi identitas pemilik.
          </p>
        </div>
      </div>

      {dialog && (
        <ReportDialog dialog={dialog} onClose={() => setDialog(null)} onSubmit={handleCreateReport} />
      )}
    </div>
  );
}
