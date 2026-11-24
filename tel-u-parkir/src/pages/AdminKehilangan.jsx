import { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ImageOff,
  Info,
  KeyRound,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { loadKeyItems, saveKeyItems } from '../data/keyManagementData';

const locations = ['Semua lokasi', 'Parkiran GKU', 'Parkiran FIT'];
const storagePosts = ['Pos Satpam Gerbang 1', 'Pos Satpam FIT', 'Pos Satpam Utama'];
const statusLabels = { found: 'Ditemukan', lost: 'Hilang', returned: 'Dikembalikan' };
const statusTypes = { found: 'success', lost: 'warning', returned: 'neutral' };
const emptyChecks = {
  identityChecked: false,
  studentIdChecked: false,
  keyMatched: false,
  evidenceChecked: false,
};

function getLocalDateValue() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function getLocalTimeValue() {
  const date = new Date();
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function formatDateLabel(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getCurrentTimeLabel() {
  const now = new Date();
  return `${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
}

function KeyStatus({ status }) {
  if (status === 'verification') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1CC] px-2.5 py-1 text-[10px] font-semibold text-[#8A6100]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D99A00]" />
        Perlu verifikasi
      </span>
    );
  }

  return (
    <StatusBadge type={statusTypes[status]} className="px-2.5 py-1 text-[10px]">
      {statusLabels[status]}
    </StatusBadge>
  );
}

function KeyPhoto({ item, className = '' }) {
  if (item.photoDataUrl) {
    return <img src={item.photoDataUrl} alt={`Foto ${item.keyName}`} className={`object-cover ${className}`} />;
  }

  return (
    <div
      role="img"
      aria-label={`Foto ${item.keyName} belum tersedia`}
      className={`flex items-center justify-center rounded-lg bg-[#F1EFEE] text-[#8A7774] ${className}`}
    >
      <div className="text-center">
        <ImageOff className="mx-auto h-5 w-5" />
        <span className="mt-1 block text-[10px]">Foto belum tersedia</span>
      </div>
    </div>
  );
}

function Modal({ titleId, onClose, children, className = 'max-w-xl' }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`max-h-[min(90vh,48rem)] w-full ${className} overflow-y-auto rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-6`}
      >
        {children}
      </section>
    </div>
  );
}

function FoundKeyCard({ item, featured, onVerifyPickup }) {
  return (
    <article className={`min-w-0 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5 ${featured ? 'lg:row-span-2' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-extrabold">{item.keyName}</h2>
        <span className="shrink-0 text-[10px] font-bold text-[#BE1E2D]">#{item.id}</span>
      </div>
      <div className="mt-2"><KeyStatus status="found" /></div>

      <div className="mt-3 flex min-w-0 gap-3">
        <KeyPhoto item={item} className="h-[88px] w-[102px] shrink-0 rounded-lg" />
        <div className="min-w-0">
          <p className="text-xs font-semibold">{item.description}</p>
          <p className="mt-2 flex items-center gap-1 text-[10px] text-[#8A7774]">
            <MapPin className="h-3 w-3 shrink-0" /> {item.location}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-[#8A7774]">
            <Clock3 className="h-3 w-3 shrink-0" /> {item.dateLabel}, {item.timeLabel}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#D9FBE4] px-3 py-2.5 text-[10px] font-medium text-[#087A36]">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
        Diamankan di {item.storagePost}
      </div>

      {item.applicant ? (
        <div className="mt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-bold">1 pengajuan pengambilan</p>
            <KeyStatus status="verification" />
          </div>
          <p className="mt-2 text-[10px] text-[#554A48]">
            {item.applicant.name} <span className="mx-1">•</span> NIM {item.applicant.nim}
          </p>
          <button
            type="button"
            onClick={() => onVerifyPickup(item)}
            className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[#BE1E2D] px-3 text-[10px] font-bold text-white hover:bg-[#A51020]"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Verifikasi pengambilan
          </button>
        </div>
      ) : (
        <p className="mt-3 text-[10px] text-[#8A7774]">
          Kunci tersimpan di {item.storagePost}. Belum ada pengajuan pengambilan.
        </p>
      )}
    </article>
  );
}

function LostKeyCard({ item, onMatch }) {
  const matchedKey = item.matchFoundId;

  return (
    <article className="min-w-0 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-extrabold">{item.keyName}</h2>
        <span className="shrink-0 text-[10px] font-bold text-[#BE1E2D]">#{item.id}</span>
      </div>
      <div className="mt-2"><KeyStatus status="lost" /></div>
      <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">{item.description}</p>
      <dl className="mt-3 grid grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-2 text-[10px]">
        <dt className="text-[#8A7774]">Lokasi dan waktu</dt>
        <dd className="font-medium">{item.location} <span className="mx-1">•</span> {item.dateLabel}, {item.timeLabel}</dd>
        <dt className="text-[#8A7774]">Pemilik</dt>
        <dd className="font-medium">{item.owner} <span className="mx-1">•</span> {item.plate}</dd>
        <dt className="text-[#8A7774]">Kendaraan</dt>
        <dd className="font-medium">{item.vehicle}</dd>
      </dl>
      {matchedKey && (
        <p role="status" className="mt-3 rounded-lg bg-[#FFF1CC] px-3 py-2 text-[10px] leading-relaxed text-[#8A6100]">
          Cocokkan dengan #{matchedKey}. Pemilik diarahkan ke pos untuk verifikasi langsung.
        </p>
      )}
      <button
        type="button"
        onClick={() => onMatch(item)}
        className="mt-3 min-h-9 rounded-lg border border-[#EDE4E2] px-3 text-[10px] font-semibold text-[#BE1E2D] hover:border-[#BE1E2D] hover:bg-[#FDF3F3]"
      >
        Tinjau &amp; Cocokkan Penemuan
      </button>
    </article>
  );
}

function ReturnedKeyCard({ item }) {
  return (
    <article className="min-w-0 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-extrabold">{item.keyName}</h2>
        <span className="shrink-0 text-[10px] font-bold text-[#BE1E2D]">#{item.id}</span>
      </div>
      <div className="mt-2"><KeyStatus status="returned" /></div>
      <div className="mt-3 flex min-w-0 gap-3">
        <KeyPhoto item={item} className="h-[72px] w-[88px] shrink-0 rounded-lg" />
        <div className="min-w-0">
          <p className="text-xs font-semibold">{item.recipientName || item.owner}</p>
          <p className="mt-1 text-[10px] text-[#8A7774]">{item.returnLocation || item.location} <span className="mx-1">•</span> {item.handledBy}</p>
          <p className="mt-1 text-[10px] text-[#8A7774]">{item.returnedDate}, {item.returnedTime}</p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-[#087A36]">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        KTM dan STNK cocok • Bukti serah terima tersimpan
      </p>
    </article>
  );
}

function KeyItemCard({ item, featured, onVerifyPickup, onMatch }) {
  if (item.status === 'found') {
    return <FoundKeyCard item={item} featured={featured} onVerifyPickup={onVerifyPickup} />;
  }
  if (item.status === 'lost') {
    return <LostKeyCard item={item} onMatch={onMatch} />;
  }
  return <ReturnedKeyCard item={item} />;
}

export default function AdminKehilangan() {
  const [items, setItems] = useState(() => loadKeyItems());
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [locationFilter, setLocationFilter] = useState('Semua lokasi');
  const [filterOpen, setFilterOpen] = useState(false);
  const [hasApplicantOnly, setHasApplicantOnly] = useState(false);
  const [draftHasApplicantOnly, setDraftHasApplicantOnly] = useState(false);
  const [foundFormOpen, setFoundFormOpen] = useState(false);
  const [foundForm, setFoundForm] = useState(null);
  const [foundFormError, setFoundFormError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [pickupItem, setPickupItem] = useState(null);
  const [pickupChecks, setPickupChecks] = useState(emptyChecks);
  const [handoverForm, setHandoverForm] = useState({ recipientName: '', identityType: 'KTM', identityNumber: '', notes: '' });
  const [pickupError, setPickupError] = useState('');
  const [matchItem, setMatchItem] = useState(null);
  const [matchCandidateId, setMatchCandidateId] = useState('');
  const [matchError, setMatchError] = useState('');
  const [feedback, setFeedback] = useState('');

  const counts = useMemo(() => ({
    found: items.filter((item) => item.status === 'found').length,
    lost: items.filter((item) => item.status === 'lost').length,
    returned: items.filter((item) => item.status === 'returned').length,
    all: items.length,
  }), [items]);

  const visibleItems = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('id-ID');
    return items.filter((item) => {
      const matchesStatus = statusTab === 'all' || item.status === statusTab;
      const matchesLocation = locationFilter === 'Semua lokasi'
        || item.location.toLocaleLowerCase('id-ID').includes(locationFilter.toLocaleLowerCase('id-ID'));
      const searchableText = [
        item.id,
        item.keyName,
        item.description,
        item.location,
        item.owner,
        item.plate,
        item.applicant?.name,
        item.applicant?.nim,
      ].filter(Boolean).join(' ').toLocaleLowerCase('id-ID');
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesApplicant = !hasApplicantOnly || Boolean(item.status === 'found' && item.applicant);
      return matchesStatus && matchesLocation && matchesSearch && matchesApplicant;
    });
  }, [hasApplicantOnly, items, locationFilter, search, statusTab]);

  const foundCandidates = items.filter((item) => item.status === 'found');
  const checksComplete = Object.values(pickupChecks).every(Boolean);
  const pickupReady = checksComplete
    && Boolean(handoverForm.recipientName.trim())
    && Boolean(handoverForm.identityNumber.trim());

  function persistItems(nextItems, setError) {
    try {
      saveKeyItems(nextItems);
    } catch (error) {
      if (error instanceof DOMException) {
        setError(error.name === 'QuotaExceededError'
          ? 'Penyimpanan lokal penuh. Hapus foto atau data demo sebelum menyimpan.'
          : `Penyimpanan gagal: ${error.message}`);
        return false;
      }
      throw error;
    }

    setItems(nextItems);
    return true;
  }

  function openFoundForm() {
    setFoundForm({
      keyName: '',
      description: '',
      location: 'Parkiran GKU',
      foundDate: getLocalDateValue(),
      foundTime: getLocalTimeValue(),
      storagePost: storagePosts[0],
      photoName: '',
      photoDataUrl: '',
    });
    setFoundFormError('');
    setPhotoError('');
    setFoundFormOpen(true);
  }

  function updateFoundForm(field, value) {
    setFoundForm((current) => ({ ...current, [field]: value }));
    setFoundFormError('');
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setPhotoError('Foto harus berformat JPG atau PNG.');
      event.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Ukuran foto maksimal 5 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setPhotoError('Foto tidak dapat dibaca. Coba pilih file lain.');
        return;
      }
      setFoundForm((current) => ({ ...current, photoName: file.name, photoDataUrl: reader.result }));
      setPhotoError('');
      setFoundFormError('');
    };
    reader.onerror = () => setPhotoError('Foto gagal dibaca. Coba pilih file lain.');
    reader.readAsDataURL(file);
  }

  function saveFoundKey(event) {
    event.preventDefault();
    setFoundFormError('');
    if (!foundForm?.keyName.trim() || !foundForm.description.trim() || !foundForm.location || !foundForm.foundDate || !foundForm.foundTime || !foundForm.storagePost) {
      setFoundFormError('Lengkapi semua informasi wajib sebelum menyimpan penemuan.');
      return;
    }

    const nextNumber = items
      .filter((item) => item.id.startsWith('FND-'))
      .reduce((maximum, item) => Math.max(maximum, Number(item.id.slice(4)) || 0), 0) + 1;
    const id = `FND-${String(nextNumber).padStart(3, '0')}`;
    const newItem = {
      ...foundForm,
      id,
      status: 'found',
      keyName: foundForm.keyName.trim(),
      description: foundForm.description.trim(),
      dateLabel: formatDateLabel(foundForm.foundDate),
      timeLabel: `${foundForm.foundTime} WIB`,
      handlingHistory: [{
        action: 'Penemuan dicatat dan kunci diamankan',
        by: 'Budi Santoso',
        time: `${formatDateLabel(foundForm.foundDate)}, ${foundForm.foundTime} WIB`,
      }],
    };
    const nextItems = [newItem, ...items];
    if (!persistItems(nextItems, setFoundFormError)) return;

    setFoundFormOpen(false);
    setFoundForm(null);
    setFeedback(`Penemuan kunci ${id} berhasil dicatat.`);
    setStatusTab('all');
    setLocationFilter('Semua lokasi');
    setHasApplicantOnly(false);
  }

  function openPickup(item) {
    setPickupItem(item);
    setPickupChecks(emptyChecks);
    setHandoverForm({
      recipientName: '',
      identityType: 'KTM',
      identityNumber: '',
      notes: '',
    });
    setPickupError('');
  }

  function updatePickupCheck(checkName, checked) {
    setPickupChecks((current) => ({ ...current, [checkName]: checked }));
  }

  function updateHandoverForm(field, value) {
    setHandoverForm((current) => ({ ...current, [field]: value }));
    setPickupError('');
  }

  function completeHandover(event) {
    event.preventDefault();
    if (!pickupItem) return;
    if (!pickupReady) {
      setPickupError('Periksa seluruh checklist dan lengkapi data penerima sebelum menyerahkan kunci.');
      return;
    }

    const timeLabel = getCurrentTimeLabel();
    const dateLabel = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const returnedItem = {
      ...pickupItem,
      status: 'returned',
      recipientName: handoverForm.recipientName.trim(),
      identityType: handoverForm.identityType,
      identityNumber: handoverForm.identityNumber.trim(),
      handoverNotes: handoverForm.notes.trim(),
      returnLocation: pickupItem.storagePost,
      returnedDate: dateLabel,
      returnedTime: timeLabel,
      handledBy: 'Budi Santoso',
      identityVerified: true,
      receiptSaved: true,
      handlingHistory: [
        ...(pickupItem.handlingHistory || []),
        { action: 'Kunci diserahkan kepada pemilik', by: 'Budi Santoso', time: `${dateLabel}, ${timeLabel}` },
      ],
    };
    const nextItems = items.map((item) => (item.id === pickupItem.id ? returnedItem : item));
    if (!persistItems(nextItems, setPickupError)) return;

    setFeedback(`Kunci ${pickupItem.id} telah diserahkan kepada ${handoverForm.recipientName.trim()}.`);
    setPickupItem(null);
  }

  function openMatch(item) {
    setMatchItem(item);
    setMatchCandidateId(foundCandidates[0]?.id || '');
    setMatchError('');
  }

  function directOwnerToPost(event) {
    event.preventDefault();
    if (!matchItem) return;
    const candidate = foundCandidates.find((item) => item.id === matchCandidateId);
    if (!candidate) {
      setMatchError('Pilih kunci ditemukan yang akan dibandingkan.');
      return;
    }

    const lostItem = {
      ...matchItem,
      matchFoundId: candidate.id,
      matchStoragePost: candidate.storagePost,
      handlingHistory: [
        ...(matchItem.handlingHistory || []),
        {
          action: `Pemilik diarahkan ke ${candidate.storagePost} untuk verifikasi kunci ${candidate.id}`,
          by: 'Budi Santoso',
          time: `Hari ini, ${getCurrentTimeLabel()}`,
        },
      ],
    };
    const nextItems = items.map((item) => (item.id === matchItem.id ? lostItem : item));
    if (!persistItems(nextItems, setMatchError)) return;

    setFeedback(`${matchItem.owner} diarahkan ke ${candidate.storagePost} untuk verifikasi langsung.`);
    setMatchItem(null);
  }

  return (
    <div>
      <header className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">Layanan Keamanan</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Kehilangan &amp; Penemuan Kunci</h1>
          <p className="mt-1.5 text-sm text-[#8A7774]">Kelola laporan kunci dan verifikasi pengambilan oleh pemilik kendaraan.</p>
        </div>
        <button
          type="button"
          onClick={openFoundForm}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#BE1E2D] px-3.5 text-xs font-bold text-white hover:bg-[#A51020]"
        >
          <KeyRound className="h-3.5 w-3.5" /> Catat Penemuan
        </button>
      </header>

      {feedback && (
        <div role="status" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#c4f2d1] bg-[#D9FBE4] px-3.5 py-2.5 text-xs text-[#087A36]">
          <span>{feedback}</span>
          <button type="button" onClick={() => setFeedback('')} aria-label="Tutup pemberitahuan">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <section aria-label="Statistik kunci" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label="Ditemukan" value={counts.found} />
        <SummaryCard label="Hilang" value={counts.lost} highlighted />
        <SummaryCard label="Dikembalikan" value={counts.returned} />
      </section>

      <section aria-label="Pencarian dan filter kunci" className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3.5 py-2.5 focus-within:border-[#BE1E2D]">
          <Search className="h-4 w-4 shrink-0 text-[#8A7774]" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari ID laporan, merek, atau lokasi"
            aria-label="Cari ID laporan, merek, atau lokasi"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#8A7774]/70"
          />
        </label>
        <div className="flex min-w-0 gap-2">
          <label className="relative min-w-0 flex-1 sm:flex-none">
            <span className="sr-only">Filter lokasi</span>
            <select
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
              className="h-full min-h-11 w-full appearance-none rounded-lg border border-[#EDE4E2] bg-white py-2 pl-3 pr-9 text-xs font-semibold outline-none hover:border-[#BE1E2D] focus:border-[#BE1E2D] sm:w-auto"
            >
              {locations.map((location) => <option key={location} value={location}>{location}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7774]" />
          </label>
          <button
            type="button"
            onClick={() => {
              setDraftHasApplicantOnly(hasApplicantOnly);
              setFilterOpen(true);
            }}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border bg-white px-3 text-xs font-semibold transition-colors ${
              hasApplicantOnly ? 'border-[#BE1E2D] text-[#BE1E2D]' : 'border-[#EDE4E2] hover:border-[#BE1E2D]'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter{hasApplicantOnly ? ' (1)' : ''}
          </button>
        </div>
      </section>

      <div className="mt-3 flex gap-1 overflow-x-auto border-b border-[#EDE4E2] pb-2">
        {[
          { id: 'all', label: 'Semua', count: counts.all },
          { id: 'found', label: 'Ditemukan', count: counts.found },
          { id: 'lost', label: 'Hilang', count: counts.lost },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusTab(tab.id)}
            aria-pressed={statusTab === tab.id}
            className={`shrink-0 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors ${
              statusTab === tab.id ? 'bg-[#BE1E2D] text-white' : 'bg-white text-[#554A48] hover:bg-[#F5F2F0]'
            }`}
          >
            {tab.label}{tab.id === 'all' ? ` (${tab.count})` : ''}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Filter lokasi aktif">
        {locations.map((location) => {
          const isActive = locationFilter === location;
          return (
            <button
              key={location}
              type="button"
              onClick={() => setLocationFilter(location)}
              aria-pressed={isActive}
              className={`inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-semibold ${
                isActive ? 'bg-[#FCE8E8] text-[#BE1E2D]' : 'bg-[#F5F2F0] text-[#554A48] hover:bg-[#EDE4E2]'
              }`}
            >
              {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#BE1E2D]" />}
              {location}
            </button>
          );
        })}
      </div>

      <section aria-label="Daftar pengelolaan kunci" className="mt-4">
        {visibleItems.length ? (
          <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-2">
            {visibleItems.map((item) => (
              <KeyItemCard
                key={item.id}
                item={item}
                featured={statusTab === 'all' && !search && locationFilter === 'Semua lokasi' && item.id === 'FND-204'}
                onVerifyPickup={openPickup}
                onMatch={openMatch}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#EDE4E2] bg-white px-5 py-12 text-center">
            <Search className="mx-auto h-6 w-6 text-[#8A7774]" />
            <h2 className="mt-3 text-sm font-bold">Data kunci tidak ditemukan</h2>
            <p className="mt-1 text-xs text-[#8A7774]">Coba ubah pencarian, status, atau lokasi yang dipilih.</p>
            {(search || locationFilter !== 'Semua lokasi' || hasApplicantOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setLocationFilter('Semua lokasi');
                  setHasApplicantOnly(false);
                }}
                className="mt-3 text-xs font-semibold text-[#BE1E2D] hover:underline"
              >
                Reset pencarian dan filter
              </button>
            )}
          </div>
        )}
      </section>

      <section className="mt-4 flex gap-2.5 rounded-xl border border-[#F4B4B8] bg-[#FCE8E8] px-4 py-3.5 text-xs leading-relaxed text-[#8A7774]">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
        <div>
          <p className="font-bold text-[#BE1E2D]">Prosedur pengambilan kunci</p>
          <p className="mt-0.5">Serahkan kunci hanya setelah identitas dan ciri kunci sesuai. Catat penerima, petugas, waktu, dan serah terima.</p>
        </div>
      </section>

      {filterOpen && (
        <Modal titleId="key-filter-title" onClose={() => setFilterOpen(false)} className="max-w-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Penyaringan</p>
              <h2 id="key-filter-title" className="mt-1 text-xl font-extrabold">Filter kunci</h2>
            </div>
            <button type="button" onClick={() => setFilterOpen(false)} aria-label="Tutup filter">
              <X className="h-5 w-5 text-[#8A7774]" />
            </button>
          </div>
          <label className="mt-5 flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#EDE4E2] p-3 text-xs leading-relaxed">
            <input
              type="checkbox"
              checked={draftHasApplicantOnly}
              onChange={(event) => setDraftHasApplicantOnly(event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#BE1E2D]"
            />
            <span>Hanya tampilkan kunci ditemukan dengan pengajuan pengambilan</span>
          </label>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDraftHasApplicantOnly(false)}
              className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setHasApplicantOnly(draftHasApplicantOnly);
                setFilterOpen(false);
              }}
              className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]"
            >
              Terapkan filter
            </button>
          </div>
        </Modal>
      )}

      {foundFormOpen && foundForm && (
        <Modal titleId="found-key-title" onClose={() => setFoundFormOpen(false)} className="max-w-2xl">
          <form onSubmit={saveFoundKey}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Catatan petugas</p>
                <h2 id="found-key-title" className="mt-1 text-xl font-extrabold">Catat Penemuan Kunci</h2>
                <p className="mt-1 text-xs text-[#8A7774]">Masukkan ciri kunci dan lokasi penyimpanannya.</p>
              </div>
              <button type="button" onClick={() => setFoundFormOpen(false)} aria-label="Tutup form penemuan">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold sm:col-span-2">
                Nama atau jenis kunci
                <input
                  autoFocus
                  required
                  value={foundForm.keyName}
                  onChange={(event) => updateFoundForm('keyName', event.target.value)}
                  placeholder="Contoh: Kunci Honda Scoopy"
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
              <label className="text-xs font-semibold sm:col-span-2">
                Deskripsi ciri-ciri kunci
                <textarea
                  required
                  rows={3}
                  value={foundForm.description}
                  onChange={(event) => updateFoundForm('description', event.target.value)}
                  placeholder="Warna, bentuk, gantungan, atau tanda khusus"
                  className="mt-2 w-full resize-y rounded-lg border border-[#EDE4E2] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
              <label className="text-xs font-semibold">
                Lokasi ditemukan
                <select
                  required
                  value={foundForm.location}
                  onChange={(event) => updateFoundForm('location', event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  {locations.slice(1).map((location) => <option key={location} value={location}>{location}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold">
                Pos satpam penyimpanan
                <select
                  required
                  value={foundForm.storagePost}
                  onChange={(event) => updateFoundForm('storagePost', event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  {storagePosts.map((post) => <option key={post} value={post}>{post}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold">
                Tanggal ditemukan
                <input
                  type="date"
                  required
                  value={foundForm.foundDate}
                  onChange={(event) => updateFoundForm('foundDate', event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
              <label className="text-xs font-semibold">
                Waktu ditemukan
                <input
                  type="time"
                  required
                  value={foundForm.foundTime}
                  onChange={(event) => updateFoundForm('foundTime', event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
              <label className="text-xs font-semibold sm:col-span-2">
                Foto kunci <span className="font-normal text-[#8A7774]">(opsional, JPG/PNG maks. 5 MB)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoChange}
                  className="mt-2 block w-full rounded-lg border border-dashed border-[#F4B4B8] bg-[#FFFCFC] p-3 text-xs"
                />
                {foundForm.photoName && <span className="mt-1 block text-[10px] text-[#087A36]">{foundForm.photoName}</span>}
                {photoError && <span role="alert" className="mt-1 block text-[10px] text-[#BE1E2D]">{photoError}</span>}
              </label>
            </div>

            {foundFormError && <p role="alert" className="mt-4 rounded-lg bg-[#FCE8E8] px-3 py-2.5 text-xs text-[#BE1E2D]">{foundFormError}</p>}
            <div className="mt-5 flex flex-col-reverse justify-end gap-2 border-t border-[#EDE4E2] pt-4 sm:flex-row">
              <button type="button" onClick={() => setFoundFormOpen(false)} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                Batal
              </button>
              <button type="submit" className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]">
                Simpan Penemuan
              </button>
            </div>
          </form>
        </Modal>
      )}

      {pickupItem && (
        <Modal titleId="pickup-verification-title" onClose={() => setPickupItem(null)} className="max-w-2xl">
          <form onSubmit={completeHandover}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Verifikasi pengambilan</p>
                <h2 id="pickup-verification-title" className="mt-1 text-xl font-extrabold">Periksa pemilik dan kunci</h2>
              </div>
              <button type="button" onClick={() => setPickupItem(null)} aria-label="Tutup verifikasi pengambilan">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[112px_minmax(0,1fr)]">
              <KeyPhoto item={pickupItem} className="h-24 w-28 rounded-lg" />
              <div>
                <p className="text-sm font-extrabold">{pickupItem.keyName} <span className="text-[10px] text-[#BE1E2D]">#{pickupItem.id}</span></p>
                <p className="mt-1 text-xs text-[#8A7774]">{pickupItem.description}</p>
                <p className="mt-2 text-xs"><span className="font-semibold">{pickupItem.location}</span> • Diamankan di {pickupItem.storagePost}</p>
                <p className="mt-1 text-xs text-[#8A7774]">
                  Pemohon: {pickupItem.applicant?.name} • NIM {pickupItem.applicant?.nim}
                </p>
                <p className="mt-1 text-xs text-[#8A7774]">
                  Kendaraan: {pickupItem.applicant?.vehicle || 'Belum tersedia'} • {pickupItem.applicant?.plate || 'Plat belum tersedia'}
                </p>
              </div>
            </div>

            <fieldset className="mt-5 border-t border-[#EDE4E2] pt-4">
              <legend className="text-sm font-bold">Checklist verifikasi wajib</legend>
              <div className="mt-3 grid gap-2">
                {[
                  ['identityChecked', 'Identitas mahasiswa telah diperiksa'],
                  ['studentIdChecked', 'KTM atau identitas mahasiswa sesuai'],
                  ['keyMatched', 'Ciri-ciri kunci cocok dengan keterangan pemilik'],
                  ['evidenceChecked', 'Bukti kepemilikan dinyatakan memadai'],
                ].map(([checkName, label]) => (
                  <label key={checkName} className="flex cursor-pointer items-start gap-2.5 rounded-lg bg-[#FAF8F7] p-3 text-xs">
                    <input
                      type="checkbox"
                      checked={pickupChecks[checkName]}
                      onChange={(event) => updatePickupCheck(checkName, event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#BE1E2D]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 grid gap-3 border-t border-[#EDE4E2] pt-4 sm:grid-cols-2">
              <label className="text-xs font-semibold">
                Nama penerima
                <input
                  required
                  value={handoverForm.recipientName}
                  onChange={(event) => updateHandoverForm('recipientName', event.target.value)}
                  placeholder="Nama sesuai identitas"
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
              <label className="text-xs font-semibold">
                Jenis identitas
                <select
                  value={handoverForm.identityType}
                  onChange={(event) => updateHandoverForm('identityType', event.target.value)}
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  <option>KTM</option>
                  <option>KTP</option>
                  <option>SIM</option>
                </select>
              </label>
              <label className="text-xs font-semibold">
                Nomor identitas
                <input
                  required
                  value={handoverForm.identityNumber}
                  onChange={(event) => updateHandoverForm('identityNumber', event.target.value)}
                  placeholder="Masukkan nomor identitas"
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
              <label className="text-xs font-semibold">
                Catatan serah terima <span className="font-normal text-[#8A7774]">(opsional)</span>
                <input
                  value={handoverForm.notes}
                  onChange={(event) => updateHandoverForm('notes', event.target.value)}
                  placeholder="Catatan kondisi kunci"
                  className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                />
              </label>
            </div>
            {pickupError && <p role="alert" className="mt-3 rounded-lg bg-[#FCE8E8] px-3 py-2.5 text-xs text-[#BE1E2D]">{pickupError}</p>}
            <div className="mt-5 flex flex-col-reverse justify-end gap-2 border-t border-[#EDE4E2] pt-4 sm:flex-row sm:items-center">
              <p className="mr-auto text-[10px] text-[#8A7774]">
                {checksComplete ? 'Checklist lengkap.' : 'Centang seluruh persyaratan untuk melanjutkan.'}
              </p>
              <button type="button" onClick={() => setPickupItem(null)} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                Batal
              </button>
              <button
                type="submit"
                disabled={!pickupReady}
                className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020] disabled:cursor-not-allowed disabled:bg-[#E5E0DF] disabled:text-[#8A7774]"
              >
                Selesaikan &amp; Serahkan Kunci
              </button>
            </div>
          </form>
        </Modal>
      )}

      {matchItem && (
        <Modal titleId="match-key-title" onClose={() => setMatchItem(null)} className="max-w-2xl">
          <form onSubmit={directOwnerToPost}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Pencocokan laporan</p>
                <h2 id="match-key-title" className="mt-1 text-xl font-extrabold">Tinjau kehilangan dan penemuan</h2>
              </div>
              <button type="button" onClick={() => setMatchItem(null)} aria-label="Tutup pencocokan kunci">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <section className="rounded-lg border border-[#EDE4E2] p-3.5">
                <KeyStatus status="lost" />
                <h3 className="mt-2 text-sm font-bold">{matchItem.keyName} <span className="text-[10px] text-[#BE1E2D]">#{matchItem.id}</span></h3>
                <p className="mt-2 text-xs leading-relaxed text-[#8A7774]">{matchItem.description}</p>
                <p className="mt-2 text-[10px] text-[#8A7774]">{matchItem.location} • {matchItem.dateLabel}, {matchItem.timeLabel}</p>
                <p className="mt-1 text-[10px] font-medium">{matchItem.owner} • {matchItem.plate}</p>
              </section>
              <section className="rounded-lg border border-[#EDE4E2] p-3.5">
                <label className="text-xs font-semibold">
                  Pilih kunci ditemukan untuk dibandingkan
                  <select
                    value={matchCandidateId}
                    onChange={(event) => setMatchCandidateId(event.target.value)}
                    required
                    disabled={foundCandidates.length === 0}
                    className="mt-2 min-h-10 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 text-xs font-normal outline-none focus:border-[#BE1E2D] disabled:bg-[#FAF8F7]"
                  >
                    {foundCandidates.length === 0 && <option value="">Belum ada kunci ditemukan</option>}
                    {foundCandidates.map((candidate) => (
                      <option key={candidate.id} value={candidate.id}>
                        #{candidate.id} • {candidate.keyName}
                      </option>
                    ))}
                  </select>
                </label>
                {foundCandidates.length > 0 && (() => {
                  const candidate = foundCandidates.find((item) => item.id === matchCandidateId);
                  if (!candidate) return null;
                  return (
                    <div className="mt-3 rounded-lg bg-[#FAF8F7] p-3">
                      <p className="text-xs font-semibold">{candidate.description}</p>
                      <p className="mt-1 text-[10px] text-[#8A7774]">{candidate.location} • {candidate.dateLabel}, {candidate.timeLabel}</p>
                      <p className="mt-1 text-[10px] text-[#8A7774]">Disimpan di {candidate.storagePost}</p>
                    </div>
                  );
                })()}
              </section>
            </div>

            <div className="mt-4 flex gap-2 rounded-lg bg-[#FFF1CC] p-3 text-xs leading-relaxed text-[#8A6100]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Pencocokan awal bukan bukti kepemilikan. Arahkan pemilik ke pos untuk verifikasi identitas dan ciri kunci secara langsung.</p>
            </div>
            {matchError && <p role="alert" className="mt-3 rounded-lg bg-[#FCE8E8] px-3 py-2.5 text-xs text-[#BE1E2D]">{matchError}</p>}
            <div className="mt-5 flex flex-col-reverse justify-end gap-2 border-t border-[#EDE4E2] pt-4 sm:flex-row">
              <button type="button" onClick={() => setMatchItem(null)} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                Batal
              </button>
              <button
                type="submit"
                disabled={!matchCandidateId}
                className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020] disabled:cursor-not-allowed disabled:bg-[#E5E0DF] disabled:text-[#8A7774]"
              >
                Arahkan ke pos untuk verifikasi
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function SummaryCard({ label, value, highlighted = false }) {
  return (
    <article className={`rounded-xl border border-[#EDE4E2] p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] ${
      highlighted ? 'bg-[#FCE8E8]' : 'bg-white'
    }`}>
      <p className="text-xs text-[#8A7774] sm:text-sm">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${highlighted ? 'text-[#BE1E2D]' : 'text-[#242424]'}`}>{value}</p>
    </article>
  );
}
