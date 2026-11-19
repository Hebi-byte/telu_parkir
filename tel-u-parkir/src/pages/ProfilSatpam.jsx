import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  BellRing,
  Check,
  ChevronRight,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Settings,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useSatpamProfile } from '../SatpamProfileContext';

const activityRows = [
  { activity: 'Verifikasi laporan #RPT-0818', details: 'D 4410 AXY • Parkir di area terlarang', time: '20 Mar • 07:30' },
  { activity: 'Serah terima kunci #FND-198', details: 'Penerima: Mahasiswa D***', time: 'Kemarin' },
  { activity: 'Tolak laporan #RPT-0804', details: 'D 1120 XYZ • Bukti foto tidak jelas', time: '18 Mar' },
  { activity: 'Verifikasi laporan #RPT-0798', details: 'D 5482 UBW • Menghalangi akses kendaraan', time: '17 Mar • 14:12' },
  { activity: 'Serah terima kunci #FND-193', details: 'Penerima: Mahasiswa R***', time: '16 Mar • 10:25' },
  { activity: 'Verifikasi laporan #RPT-0791', details: 'B 3319 ZB • Parkir tidak sesuai marka', time: '15 Mar • 08:04' },
];

const postOptions = ['Pos Satpam Gerbang 1', 'Pos GKU', 'Pos FIT', 'Pos TULT'];
const shiftOptions = ['Shift Pagi 07:00–15:00', 'Shift Sore 15:00–23:00', 'Shift Malam 23:00–07:00'];

function getInitials(name) {
  return name.trim().split(/\s+/).filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function Modal({ title, onClose, children, width = 'max-w-lg' }) {
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
        aria-labelledby="profile-modal-title"
        className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="profile-modal-title" className="text-lg font-extrabold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-lg p-1 text-[#8A7774] hover:bg-[#FAF8F7]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function ActivityTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-[#F5F2F0] text-[#554A48]">
            <th className="px-3 py-2.5 font-semibold">Aktivitas</th>
            <th className="px-3 py-2.5 font-semibold">Rincian</th>
            <th className="px-3 py-2.5 font-semibold">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.activity} className="border-b border-[#EDE4E2] last:border-0">
              <td className="px-3 py-3.5 font-semibold text-[#242424]">{row.activity}</td>
              <td className="px-3 py-3.5 text-[#554A48]">{row.details}</td>
              <td className="whitespace-nowrap px-3 py-3.5 text-[#554A48]">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccountSetting({ icon: Icon, title, description, onClick, trailing }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#EDE4E2] py-3 last:border-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F2F0] text-[#8A7774]">
        <Icon className="h-4 w-4" />
      </span>
      <button type="button" onClick={onClick} className="min-w-0 flex-1 text-left">
        <span className="block text-xs font-bold">{title}</span>
        <span className="mt-0.5 block text-xs text-[#8A7774]">{description}</span>
      </button>
      {trailing}
    </div>
  );
}

export default function ProfilSatpam() {
  const {
    profile,
    setProfile,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useSatpamProfile();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState('');
  const [editDraft, setEditDraft] = useState(profile);
  const [editError, setEditError] = useState('');
  const [positionDraft, setPositionDraft] = useState({ post: profile.post, shift: profile.shift });
  const [positionConfirmation, setPositionConfirmation] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function openEditDialog() {
    setEditDraft(profile);
    setEditError('');
    setDialog('edit');
  }

  function saveProfile(event) {
    event.preventDefault();
    const name = editDraft.name.trim();
    if (!name) {
      setEditError('Nama lengkap wajib diisi.');
      return;
    }

    setProfile((current) => ({
      ...current,
      name,
      email: editDraft.email.trim(),
      phone: editDraft.phone.trim(),
    }));
    setDialog('');
    setToast('Perubahan profil disimpan sementara di sesi ini.');
  }

  function openPositionDialog() {
    setPositionDraft({ post: profile.post, shift: profile.shift });
    setPositionConfirmation(false);
    setDialog('position');
  }

  function savePosition() {
    setProfile((current) => ({ ...current, ...positionDraft }));
    setDialog('');
    setPositionConfirmation(false);
    setToast('Perubahan pos dan shift disimpan sementara di sesi ini.');
  }

  const stats = [
    { label: 'Laporan Diverifikasi', value: '48', highlighted: true },
    { label: 'Serah Terima Kunci', value: '15' },
    { label: 'Laporan Ditolak', value: '6' },
  ];

  return (
    <div>
      <header className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">Akun Petugas</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Profil Satpam</h1>
        <p className="mt-1.5 text-sm text-[#8A7774]">
          Identitas, penugasan, dan riwayat aktivitas petugas keamanan.
        </p>
      </header>

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(245px,0.82fr)_minmax(0,1.8fr)]">
        <div>
          <section className="rounded-xl border border-[#EDE4E2] bg-white p-5 sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE8E8] text-base font-extrabold text-[#BE1E2D]">
              {getInitials(profile.name)}
            </div>
            <h2 className="mt-3 text-lg font-extrabold">{profile.name}</h2>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#D9FBE4] px-2 py-1 text-xs font-bold text-[#087A36]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#087A36]" /> Satpam Aktif
            </span>

            <p className="mt-4 text-xs text-[#8A7774]">ID SPM-0142</p>
            <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
              Unit Logistik &amp; Keamanan Telkom University
            </p>

            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Pos Jaga Hari Ini</dt>
                <dd className="text-right font-semibold">{profile.post}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Shift</dt>
                <dd className="text-right font-semibold">{profile.shift}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Email</dt>
                <dd className="text-right font-semibold">{profile.email || 'Belum diisi'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#8A7774]">Nomor Telepon</dt>
                <dd className="text-right font-semibold">{profile.phone || 'Belum diisi'}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={openEditDialog}
              className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#EDE4E2] px-3 text-xs font-bold text-[#BE1E2D] hover:bg-[#FDF3F3]"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit Profil
            </button>
          </section>

          <button
            type="button"
            onClick={() => setDialog('logout')}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3 text-xs font-bold text-[#BE1E2D] hover:bg-[#FDF3F3]"
          >
            <LogOut className="h-4 w-4" /> Keluar dari Akun Satpam
          </button>
        </div>

        <div className="min-w-0 space-y-5">
          <section aria-label="Statistik aktivitas">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className={`rounded-xl border border-[#EDE4E2] p-4 ${stat.highlighted ? 'bg-[#FCE8E8]' : 'bg-white'}`}
                >
                  <p className="text-xs text-[#8A7774]">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-extrabold ${stat.highlighted ? 'text-[#A51020]' : 'text-[#242424]'}`}>
                    {stat.value}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#8A7774]">Statistik bulan ini • Maret 2025</p>
          </section>

          <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-sm font-extrabold">Riwayat Aktivitas</h2>
              <button
                type="button"
                onClick={() => setDialog('logs')}
                className="text-xs font-bold text-[#BE1E2D] hover:underline"
              >
                Semua Log
              </button>
            </div>
            <ActivityTable rows={activityRows.slice(0, 3)} />
          </section>

          <section className="rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
            <h2 className="mb-1 text-sm font-extrabold">Pengaturan Akun</h2>
            <AccountSetting
              icon={BellRing}
              title="Notifikasi Laporan Baru"
              description="Push notif antrean verifikasi."
              onClick={() => setNotificationsEnabled((enabled) => !enabled)}
              trailing={(
                <button
                  type="button"
                  role="switch"
                  aria-label="Notifikasi Laporan Baru"
                  aria-checked={notificationsEnabled}
                  onClick={() => setNotificationsEnabled((enabled) => !enabled)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${notificationsEnabled ? 'bg-[#A51020]' : 'bg-[#D6CECC]'}`}
                >
                  <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              )}
            />
            <AccountSetting
              icon={Settings}
              title="Ganti Pos Jaga"
              description="Pindah pos atau ubah shift."
              onClick={openPositionDialog}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#8A7774]" />}
            />
            <AccountSetting
              icon={ShieldCheck}
              title="SOP & Panduan Satpam"
              description="Aturan poin, zonasi, serah terima."
              onClick={() => setDialog('sop')}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#8A7774]" />}
            />
            <AccountSetting
              icon={Mail}
              title="Hubungi Administrator"
              description="Bantuan akun dan kendala sistem."
              onClick={() => setDialog('contact')}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#8A7774]" />}
            />
          </section>

          <p className="text-xs text-[#8A7774]">Tel-U Parkir • Panel Satpam • Data contoh</p>
        </div>
      </div>

      {dialog === 'edit' && (
        <Modal title="Edit Profil" onClose={() => setDialog('')}>
          <form onSubmit={saveProfile} className="space-y-4">
            <label className="block text-xs font-bold">
              Nama Lengkap
              <input
                autoComplete="name"
                required
                value={editDraft.name}
                onChange={(event) => setEditDraft((current) => ({ ...current, name: event.target.value }))}
                className="mt-1.5 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
              />
            </label>
            {editError && <p role="alert" className="text-xs text-[#BE1E2D]">{editError}</p>}
            <label className="block text-xs font-bold">
              Email
              <input
                type="email"
                autoComplete="email"
                value={editDraft.email}
                onChange={(event) => setEditDraft((current) => ({ ...current, email: event.target.value }))}
                placeholder="nama@email.com"
                className="mt-1.5 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
              />
            </label>
            <label className="block text-xs font-bold">
              Nomor Telepon
              <input
                type="tel"
                autoComplete="tel"
                value={editDraft.phone}
                onChange={(event) => setEditDraft((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Contoh: 081234567890"
                className="mt-1.5 min-h-11 w-full rounded-lg border border-[#EDE4E2] px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
              />
            </label>
            <p className="text-xs text-[#8A7774]">Perubahan hanya disimpan sementara di sesi ini.</p>
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setDialog('')} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                Batal
              </button>
              <button type="submit" className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </Modal>
      )}

      {dialog === 'position' && (
        <Modal title="Ganti Pos Jaga" onClose={() => setDialog('')}>
          {positionConfirmation ? (
            <div>
              <div className="flex items-start gap-3 rounded-lg border border-[#EDE4E2] bg-[#FAF8F7] p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087A36]" />
                <p className="text-sm leading-relaxed">
                  Simpan penugasan <strong>{positionDraft.post}</strong> dengan <strong>{positionDraft.shift}</strong>?
                </p>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => setPositionConfirmation(false)} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                  Ubah Pilihan
                </button>
                <button type="button" onClick={savePosition} className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]">
                  Ya, Simpan
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setPositionConfirmation(true); }} className="space-y-4">
              <label className="block text-xs font-bold">
                Pos Jaga
                <select
                  value={positionDraft.post}
                  onChange={(event) => setPositionDraft((current) => ({ ...current, post: event.target.value }))}
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  {postOptions.map((post) => <option key={post}>{post}</option>)}
                </select>
              </label>
              <label className="block text-xs font-bold">
                Shift
                <select
                  value={positionDraft.shift}
                  onChange={(event) => setPositionDraft((current) => ({ ...current, shift: event.target.value }))}
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  {shiftOptions.map((shift) => <option key={shift}>{shift}</option>)}
                </select>
              </label>
              <p className="text-xs text-[#8A7774]">Perubahan penugasan hanya disimulasikan pada sesi ini.</p>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setDialog('')} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                  Batal
                </button>
                <button type="submit" className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]">
                  Tinjau Perubahan
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {dialog === 'sop' && (
        <Modal title="SOP & Panduan Satpam" onClose={() => setDialog('')}>
          <div className="space-y-4 text-sm leading-relaxed text-[#554A48]">
            <p>Gunakan panduan berikut saat menangani laporan dan serah terima kunci.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Periksa bukti, lokasi, dan kategori pelanggaran sebelum memverifikasi laporan.</li>
              <li>Gunakan kategori dan poin sesuai aturan operasional yang berlaku.</li>
              <li>Catat waktu, identitas penerima, dan kondisi kunci saat serah terima.</li>
              <li>Jaga kerahasiaan informasi pelapor dan pemilik kendaraan.</li>
            </ul>
            <p className="rounded-lg bg-[#FAF8F7] p-3 text-xs text-[#8A7774]">
              Untuk SOP resmi terbaru, hubungi koordinator Unit Logistik &amp; Keamanan.
            </p>
          </div>
        </Modal>
      )}

      {dialog === 'contact' && (
        <Modal title="Hubungi Administrator" onClose={() => setDialog('')}>
          <div className="space-y-3 text-sm text-[#554A48]">
            <p>Untuk bantuan akun atau kendala sistem, hubungi koordinator Unit Logistik &amp; Keamanan melalui Pos Satpam Gerbang 1.</p>
            <p className="flex items-center gap-2 rounded-lg bg-[#FAF8F7] p-3 text-xs text-[#8A7774]">
              <MapPin className="h-4 w-4 shrink-0 text-[#BE1E2D]" />
              Sampaikan ID Petugas SPM-0142 dan rincian kendala saat meminta bantuan.
            </p>
            <p className="text-xs text-[#8A7774]">Informasi kontak digital administrator belum tersedia pada simulasi ini.</p>
          </div>
        </Modal>
      )}

      {dialog === 'logs' && (
        <Modal title="Semua Log Aktivitas" onClose={() => setDialog('')} width="max-w-3xl">
          <p className="mb-4 text-xs text-[#8A7774]">Aktivitas terbaru petugas (data contoh).</p>
          <ActivityTable rows={activityRows} />
        </Modal>
      )}

      {dialog === 'logout' && (
        <Modal title="Keluar dari Akun Satpam?" onClose={() => setDialog('')}>
          <p className="text-sm leading-relaxed text-[#8A7774]">
            Anda akan diarahkan ke halaman keluar. Karena autentikasi belum terhubung, tindakan ini hanya simulasi.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setDialog('')} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
              Batal
            </button>
            <button
              type="button"
              onClick={() => navigate('/satpam/login')}
              className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]"
            >
              Ya, Keluar
            </button>
          </div>
        </Modal>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-2 rounded-xl bg-[#242424] px-4 py-3 text-sm font-medium text-white shadow-xl">
          <Activity className="h-4 w-4 shrink-0 text-[#D9FBE4]" /> {toast}
        </div>
      )}
    </div>
  );
}
