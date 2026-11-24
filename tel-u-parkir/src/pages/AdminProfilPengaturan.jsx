import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Key,
  Layers,
  Lock,
  LogOut,
  MapPin,
  Plus,
  Shield,
  ShieldCheck,
  Sliders,
  TriangleAlert,
  X,
} from 'lucide-react';

export default function AdminProfilPengaturan() {
  const navigate = useNavigate();

  // Admin Profile Data
  const [profile] = useState({
    name: 'Budi Santoso',
    id: 'ADM-014',
    role: 'Admin Parkir',
    status: 'Aktif',
    unit: 'Unit Logistik & Keamanan • Telkom University',
    email: 'budi.santoso@telkomuniversity.ac.id',
  });

  // Operational Settings State
  const [operational, setOperational] = useState({
    startHour: '06:00',
    endHour: '22:00',
    days: 'Senin–Minggu',
  });
  const [draftOperational, setDraftOperational] = useState({ ...operational });

  // Parking Zones State
  const [zones, setZones] = useState([
    { id: 1, name: 'GKU (Tokong Nanas)', post: 'Pos Gerbang 1', active: true },
    { id: 2, name: 'Fakultas Ilmu Terapan (FIT)', post: 'Pos FIT', active: true },
    { id: 3, name: 'Fakultas Ekonomi & Bisnis (FEB)', post: 'Pos Gerbang 2', active: true },
    { id: 4, name: 'Open Library & Rektorat', post: 'Pos Rektorat', active: true },
    { id: 5, name: 'Telkom University Landmark Tower (TULT)', post: 'Pos Barat', active: true },
  ]);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZonePost, setNewZonePost] = useState('');

  // Notification Toggles State
  const [reportNotif, setReportNotif] = useState(true);
  const [keyNotif, setKeyNotif] = useState(true);

  // Security & Password State
  const [lastPasswordChange, setLastPasswordChange] = useState('10 Mar 2025');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Activity Logs
  const [activityLogs] = useState([
    {
      id: 1,
      action: 'Verifikasi Laporan #RPT-8824',
      detail: 'D 5482 UBW • +4 Poin diterapkan',
      time: 'Hari ini • 09:45 WIB',
      type: 'approval',
    },
    {
      id: 2,
      action: 'Tolak Laporan #RPT-8799',
      detail: 'D 6001 TLU • Bukti foto tidak memadai',
      time: 'Hari ini • 08:30 WIB',
      type: 'reject',
    },
    {
      id: 3,
      action: 'Verifikasi Laporan #RPT-8820',
      detail: 'B 6124 KZX • +1 Poin diterapkan',
      time: '20 Mar • 10:12 WIB',
      type: 'approval',
    },
    {
      id: 4,
      action: 'Penyesuaian Jam Operasional',
      detail: 'Pembaruan jadwal parkir 06.00–22.00 WIB',
      time: '18 Mar • 15:40 WIB',
      type: 'config',
    },
    {
      id: 5,
      action: 'Pencatatan Temuan Kunci #FND-204',
      detail: 'Kunci Honda Scoopy diamankan di Pos Gerbang 1',
      time: '17 Mar • 11:20 WIB',
      type: 'key',
    },
    {
      id: 6,
      action: 'Ubah Kata Sandi Akun',
      detail: 'Pembaruan keamanan kata sandi berkala',
      time: '10 Mar • 14:10 WIB',
      type: 'security',
    },
  ]);

  // Modal Open States
  const [hakAksesModalOpen, setHakAksesModalOpen] = useState(false);
  const [jamOperasionalModalOpen, setJamOperasionalModalOpen] = useState(false);
  const [zonaModalOpen, setZonaModalOpen] = useState(false);
  const [aturanPoinModalOpen, setAturanPoinModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [activityLogModalOpen, setActivityLogModalOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(profile.email);
    }
    showToast(`Email ${profile.email} berhasil disalin ke clipboard!`);
  };

  // Save Operational Hours
  const handleSaveOperational = (e) => {
    e.preventDefault();
    setOperational({ ...draftOperational });
    setJamOperasionalModalOpen(false);
    showToast('Jam operasional parkir berhasil diperbarui.');
  };

  // Toggle Zone Status
  const handleToggleZone = (id) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z))
    );
  };

  // Add New Zone
  const handleAddZone = (e) => {
    e.preventDefault();
    if (!newZoneName.trim() || !newZonePost.trim()) return;
    const newZone = {
      id: Date.now(),
      name: newZoneName.trim(),
      post: newZonePost.trim(),
      active: true,
    };
    setZones((prev) => [...prev, newZone]);
    setNewZoneName('');
    setNewZonePost('');
    showToast(`Zona ${newZone.name} berhasil ditambahkan.`);
  };

  // Change Password Submit
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!oldPassword) {
      setPasswordError('Masukkan kata sandi lama.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Kata sandi baru minimal harus 8 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    const todayDate = 'Hari ini';
    setLastPasswordChange(todayDate);
    setPasswordError('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordModalOpen(false);
    showToast('Kata sandi akun Anda berhasil diperbarui!');
  };

  // Logout Action
  const handleConfirmLogout = () => {
    setLogoutConfirmOpen(false);
    navigate('/satpam/login');
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
          AKUN PETUGAS
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#242424] sm:text-3xl">
          Profil Admin &amp; Pengaturan
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#8A7774]">
          Kelola identitas, hak akses, dan preferensi operasional parkir kampus.
        </p>
      </header>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Informasi Profil Admin + Peran & Hak Akses  */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* B. Informasi Profil Admin Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-start gap-4">
              {/* Avatar Inisial */}
              <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#FCE8E8] text-[#BE1E2D] font-extrabold text-xl sm:text-2xl flex items-center justify-center shrink-0 select-none shadow-2xs">
                BS
              </div>

              {/* Identity & Status */}
              <div className="space-y-1 min-w-0 flex-1">
                <h2 className="text-xl font-extrabold text-[#242424] tracking-tight leading-snug">
                  {profile.name}
                </h2>
                <p className="text-xs text-[#8A7774] font-medium">
                  ID Petugas: {profile.id}
                </p>

                {/* Badge Status Akun */}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9FBE4] border border-[#c4f2d1] px-2.5 py-0.5 text-xs font-semibold text-[#087A36]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#087A36]" />
                    <span>{profile.role} • {profile.status}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Workplace Unit & Email */}
            <div className="space-y-1.5 pt-1 border-t border-[#EDE4E2]/70 text-xs">
              <p className="text-[#8A7774] font-medium leading-relaxed">
                {profile.unit}
              </p>
              <p className="font-semibold text-[#242424] truncate">
                {profile.email}
              </p>
            </div>

            {/* Tombol Salin Email */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-[#EDE4E2] bg-white px-4 py-2 text-xs font-bold text-[#242424] hover:bg-[#FAF8F7] transition-colors cursor-pointer shadow-2xs"
              >
                <Copy className="h-3.5 w-3.5 text-[#8A7774]" />
                <span>Salin Email</span>
              </button>
            </div>
          </section>

          {/* C. Peran & Hak Akses Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#242424]">Peran &amp; hak akses</h2>
              <button
                type="button"
                onClick={() => setHakAksesModalOpen(true)}
                className="text-xs font-bold text-[#BE1E2D] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>Lihat detail</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-xs text-[#8A7774] font-medium">
              Admin Parkir • Seluruh area kampus Bandung
            </p>

            {/* Hak Akses List */}
            <ul className="space-y-3 pt-1 text-xs">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-[#BE1E2D] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span className="font-semibold text-[#242424]">
                  Verifikasi laporan &amp; tetapkan poin
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-[#BE1E2D] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span className="font-semibold text-[#242424]">
                  Kelola kunci &amp; verifikasi pengambilan
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-[#BE1E2D] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span className="font-semibold text-[#242424]">
                  Atur operasional &amp; tindak lanjut
                </span>
              </li>
            </ul>

            <p className="text-[11px] text-[#8A7774] pt-2 border-t border-[#EDE4E2]/70 leading-relaxed">
              Perubahan hak akses dikelola oleh administrator sistem.
            </p>
          </section>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Pengaturan Operasional + Notifikasi & Keamanan */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* D. Pengaturan Operasional Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#242424] mb-3">Pengaturan operasional</h2>

            <div className="divide-y divide-[#EDE4E2]/70">
              {/* 1. Jam Operasional Parkir */}
              <button
                type="button"
                onClick={() => {
                  setDraftOperational({ ...operational });
                  setJamOperasionalModalOpen(true);
                }}
                className="w-full flex items-center justify-between py-3.5 text-left hover:bg-[#FAF8F7] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] group-hover:bg-white border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Jam operasional parkir
                    </p>
                    <p className="text-xs text-[#8A7774] truncate">
                      {operational.startHour.replace(':', '.')}&ndash;{operational.endHour.replace(':', '.')} WIB • {operational.days}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A7774] shrink-0 ml-2" />
              </button>

              {/* 2. Zona Parkir & Pos Keamanan */}
              <button
                type="button"
                onClick={() => setZonaModalOpen(true)}
                className="w-full flex items-center justify-between py-3.5 text-left hover:bg-[#FAF8F7] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] group-hover:bg-white border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Zona parkir &amp; pos keamanan
                    </p>
                    <p className="text-xs text-[#8A7774] truncate">
                      GKU, FIT, FEB, Open Library, dan area lain
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A7774] shrink-0 ml-2" />
              </button>

              {/* 3. Aturan Poin & SOP Verifikasi */}
              <button
                type="button"
                onClick={() => setAturanPoinModalOpen(true)}
                className="w-full flex items-center justify-between py-3.5 text-left hover:bg-[#FAF8F7] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] group-hover:bg-white border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Aturan poin &amp; SOP verifikasi
                    </p>
                    <p className="text-xs text-[#8A7774] truncate">
                      Kategori +1 s.d. +5 • Reduksi bulanan -10
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A7774] shrink-0 ml-2" />
              </button>
            </div>
          </section>

          {/* E. Notifikasi & Keamanan Card */}
          <section className="rounded-2xl border border-[#EDE4E2] bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#242424] mb-3">Notifikasi &amp; keamanan</h2>

            <div className="divide-y divide-[#EDE4E2]/70">
              {/* 1. Laporan Parkir Baru (Toggle) */}
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Laporan parkir baru
                    </p>
                    <p className="text-xs text-[#8A7774]">
                      Notifikasi masuk &amp; antrean verifikasi
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={reportNotif}
                  onClick={() => {
                    const next = !reportNotif;
                    setReportNotif(next);
                    showToast(next ? 'Notifikasi laporan baru diaktifkan.' : 'Notifikasi laporan baru dinonaktifkan.');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    reportNotif ? 'bg-[#BE1E2D]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 left-1 ${
                      reportNotif ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2. Klaim & Laporan Kunci (Toggle) */}
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Klaim &amp; laporan kunci
                    </p>
                    <p className="text-xs text-[#8A7774]">
                      Pembaruan status dan pengambilan
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={keyNotif}
                  onClick={() => {
                    const next = !keyNotif;
                    setKeyNotif(next);
                    showToast(next ? 'Notifikasi klaim kunci diaktifkan.' : 'Notifikasi klaim kunci dinonaktifkan.');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    keyNotif ? 'bg-[#BE1E2D]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 left-1 ${
                      keyNotif ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Kata Sandi & Keamanan */}
              <button
                type="button"
                onClick={() => {
                  setPasswordError('');
                  setOldPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setPasswordModalOpen(true);
                }}
                className="w-full flex items-center justify-between py-3.5 text-left hover:bg-[#FAF8F7] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] group-hover:bg-white border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Kata sandi &amp; keamanan
                    </p>
                    <p className="text-xs text-[#8A7774] truncate">
                      Terakhir diubah {lastPasswordChange}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A7774] shrink-0 ml-2" />
              </button>

              {/* 4. Log Aktivitas Petugas */}
              <button
                type="button"
                onClick={() => setActivityLogModalOpen(true)}
                className="w-full flex items-center justify-between py-3.5 text-left hover:bg-[#FAF8F7] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F7] group-hover:bg-white border border-[#EDE4E2] flex items-center justify-center text-[#8A7774] shrink-0">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#242424]">
                      Log aktivitas petugas
                    </p>
                    <p className="text-xs text-[#8A7774] truncate">
                      Riwayat keputusan dan perubahan data
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A7774] shrink-0 ml-2" />
              </button>
            </div>
          </section>

          {/* F. Keluar dari Akun & Footer Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            {/* Tombol Logout */}
            <button
              type="button"
              onClick={() => setLogoutConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#BE1E2D] hover:underline cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar dari Akun Tel-U</span>
            </button>

            {/* Versi & Role System Info */}
            <p className="text-[11px] text-[#8A7774] sm:text-right">
              Tel-U Parkir Mobile v2.4.1 • Admin • Unit Logistik &amp; Keamanan Telkom University
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL DIALOGS */}
      {/* ========================================================= */}

      {/* 1. Modal Detail Peran & Hak Akses */}
      {hakAksesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setHakAksesModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Detail Peran &amp; Hak Akses
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setHakAksesModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="rounded-xl border border-[#EDE4E2] bg-[#FAF8F7] p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8A7774]">Peran / Role:</span>
                  <span className="font-bold text-[#242424]">Admin Parkir Utama</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7774]">Tingkat Otoritas:</span>
                  <span className="font-bold text-[#087A36]">Level 2 (Verifikator &amp; Pengawas)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7774]">Cakupan Kampus:</span>
                  <span className="font-bold text-[#242424]">Seluruh Area Kampus Bandung</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#242424] mb-2">Daftar Kewenangan Penuh:</h4>
                <ul className="space-y-2 list-disc list-inside text-[#554a48]">
                  <li>Memeriksa, menyetujui, dan menolak laporan pelanggaran parkir mahasiswa.</li>
                  <li>Menerapkan dan mengkoreksi akumulasi poin sanksi kedisiplinan parkir.</li>
                  <li>Mengelola data temuan kunci / barang tertinggal dan verifikasi klaim kepemilikan.</li>
                  <li>Mengatur jadwal jam operasional parkir dan zonasi pos keamanan kampus.</li>
                  <li>Mengakses log aktivitas audit dan transparansi riwayat keputusan.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#FCE8E8]/50 border border-[#f8c8c8] p-3 text-[11px] text-[#8A7774] leading-relaxed">
                <span className="font-bold text-[#BE1E2D]">Catatan Kebijakan: </span>
                Perubahan peran dan wewenang pengguna hanya dapat dimodifikasi secara langsung oleh Administrator Sistem Pusat Telkom University.
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setHakAksesModalOpen(false)}
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Jam Operasional Parkir */}
      {jamOperasionalModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setJamOperasionalModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Pengaturan Jam Operasional
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setJamOperasionalModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOperational} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1.5">
                    Jam Buka Parkir
                  </label>
                  <input
                    type="time"
                    value={draftOperational.startHour}
                    onChange={(e) =>
                      setDraftOperational({ ...draftOperational, startHour: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#EDE4E2] p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1.5">
                    Jam Tutup Parkir
                  </label>
                  <input
                    type="time"
                    value={draftOperational.endHour}
                    onChange={(e) =>
                      setDraftOperational({ ...draftOperational, endHour: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#EDE4E2] p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1.5">
                  Hari Operasional
                </label>
                <select
                  value={draftOperational.days}
                  onChange={(e) =>
                    setDraftOperational({ ...draftOperational, days: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#EDE4E2] p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                >
                  <option value="Senin–Minggu">Senin–Minggu (Setiap Hari)</option>
                  <option value="Senin–Jumat">Senin–Jumat (Hari Kerja)</option>
                  <option value="Senin–Sabtu">Senin–Sabtu</option>
                </select>
              </div>

              <p className="text-[11px] text-[#8A7774] leading-relaxed">
                Perubahan jadwal operasional berlaku untuk seluruh gerbang dan pos pantau parkir Telkom University.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#EDE4E2]">
                <button
                  type="button"
                  onClick={() => setJamOperasionalModalOpen(false)}
                  className="rounded-xl border border-[#EDE4E2] px-4 py-2.5 text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Zona Parkir & Pos Keamanan */}
      {zonaModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setZonaModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <MapPin className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Zona Parkir &amp; Pos Keamanan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZonaModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <p className="text-[#8A7774]">
                Kelola status aktif zona parkir dan pos satpam penanggung jawab di lingkungan kampus.
              </p>

              {/* List of Zones */}
              <div className="space-y-2">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#EDE4E2] bg-[#FAF8F7]"
                  >
                    <div>
                      <p className="font-bold text-[#242424]">{zone.name}</p>
                      <p className="text-[11px] text-[#8A7774]">{zone.post}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleZone(zone.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                        zone.active
                          ? 'bg-[#D9FBE4] text-[#087A36] border border-[#c4f2d1]'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {zone.active ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Form Tambah Zona */}
              <form onSubmit={handleAddZone} className="pt-3 border-t border-[#EDE4E2] space-y-3">
                <h4 className="font-bold text-[#242424]">Tambah Zona Parkir Baru</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nama Zona (misal: Asrama Putra)"
                    value={newZoneName}
                    onChange={(e) => setNewZoneName(e.target.value)}
                    className="rounded-xl border border-[#EDE4E2] p-2 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pos Satpam (misal: Pos Asrama)"
                    value={newZonePost}
                    onChange={(e) => setNewZonePost(e.target.value)}
                    className="rounded-xl border border-[#EDE4E2] p-2 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#BE1E2D] text-[#BE1E2D] hover:bg-[#FCE8E8]/40 py-2 font-bold cursor-pointer transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Tambah Zona</span>
                </button>
              </form>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setZonaModalOpen(false)}
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Aturan Poin & SOP Verifikasi */}
      {aturanPoinModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setAturanPoinModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <FileText className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Aturan Poin &amp; SOP Verifikasi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAturanPoinModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-[#242424] mb-2">
                  Tabel Sanksi Poin Pelanggaran Parkir
                </h4>
                <div className="border border-[#EDE4E2] rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF8F7] border-b border-[#EDE4E2] text-[#8A7774]">
                      <tr>
                        <th className="p-2.5 font-bold">Kategori Pelanggaran</th>
                        <th className="p-2.5 font-bold text-right">Poin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE4E2]">
                      <tr>
                        <td className="p-2.5 text-[#242424]">Parkir di luar garis marka</td>
                        <td className="p-2.5 text-right font-extrabold text-[#BE1E2D]">+1</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#242424]">Parkir menyilang garis marka</td>
                        <td className="p-2.5 text-right font-extrabold text-[#BE1E2D]">+2</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#242424]">Parkir di jalur pedestrian / lobi</td>
                        <td className="p-2.5 text-right font-extrabold text-[#BE1E2D]">+3</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#242424]">Menghalangi akses tangga darurat / jalan</td>
                        <td className="p-2.5 text-right font-extrabold text-[#BE1E2D]">+4</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#242424]">Menghalangi jalur evakuasi kebakaran</td>
                        <td className="p-2.5 text-right font-extrabold text-[#BE1E2D]">+5</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#242424]">Parkir di area steril / dilarang keras</td>
                        <td className="p-2.5 text-right font-extrabold text-[#BE1E2D]">+7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-[#b8f0ca] bg-[#D9FBE4] p-3.5 space-y-1">
                <p className="font-bold text-[#087A36]">Aturan Reduksi Poin Otomatis</p>
                <p className="text-[#087A36] leading-relaxed text-[11px]">
                  Mahasiswa yang tidak melakukan pelanggaran parkir selama 30 hari berturut-turut akan mendapatkan pengurangan <strong>-10 Poin</strong> otomatis dari sistem.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-[#242424]">SOP Verifikasi 4 Langkah:</h4>
                <ol className="list-decimal list-inside space-y-1 text-[#554a48]">
                  <li>Cocokkan bukti foto dengan kondisi fisik lokasi dan plat nomor.</li>
                  <li>Periksa status registrasi RFID kendaraan mahasiswa.</li>
                  <li>Tentukan klasifikasi pelanggaran sesuai bukti yang sah.</li>
                  <li>Beri keputusan (Setujui / Tolak dengan alasan tertulis).</li>
                </ol>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setAturanPoinModalOpen(false)}
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Ubah Kata Sandi */}
      {passwordModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPasswordModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <Lock className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Ubah Kata Sandi &amp; Keamanan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="p-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Kata Sandi Lama *
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan kata sandi saat ini"
                  className="w-full rounded-xl border border-[#EDE4E2] p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Kata Sandi Baru *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full rounded-xl border border-[#EDE4E2] p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Konfirmasi Kata Sandi Baru *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full rounded-xl border border-[#EDE4E2] p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                  required
                />
              </div>

              {passwordError && (
                <div className="rounded-lg bg-[#FCE8E8] p-2.5 text-xs font-semibold text-[#BE1E2D]">
                  {passwordError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#EDE4E2]">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="rounded-xl border border-[#EDE4E2] px-4 py-2.5 text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Kata Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal Log Aktivitas Petugas */}
      {activityLogModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActivityLogModalOpen(false);
          }}
        >
          <div className="w-full max-w-2xl rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDE4E2] px-6 py-4">
              <div className="flex items-center gap-2 text-[#BE1E2D]">
                <Sliders className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#242424]">
                  Log Aktivitas Petugas Admin
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivityLogModalOpen(false)}
                className="rounded-lg p-1 text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <p className="text-xs text-[#8A7774]">
                Rekaman riwayat keputusan verifikasi, perubahan data operasional, dan tindakan keamanan yang dilakukan akun Budi Santoso (ADM-014).
              </p>

              <div className="border border-[#EDE4E2] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F7] border-b border-[#EDE4E2] text-[#8A7774]">
                    <tr>
                      <th className="p-3 font-bold">Waktu</th>
                      <th className="p-3 font-bold">Aksi / Tindakan</th>
                      <th className="p-3 font-bold">Rincian Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE4E2]">
                    {activityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap text-[#8A7774] font-medium">
                          {log.time}
                        </td>
                        <td className="p-3 font-bold text-[#242424]">
                          {log.action}
                        </td>
                        <td className="p-3 text-[#554a48]">
                          {log.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActivityLogModalOpen(false)}
                  className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal Konfirmasi Logout */}
      {logoutConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLogoutConfirmOpen(false);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-[#EDE4E2] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#FCE8E8] text-[#BE1E2D] rounded-full flex items-center justify-center mx-auto">
              <LogOut className="h-6 w-6" />
            </div>

            <h3 className="text-base font-bold text-[#242424]">
              Keluar dari Akun Tel-U?
            </h3>

            <p className="text-xs text-[#8A7774] leading-relaxed">
              Sesi kerja admin Anda akan diakhiri. Anda perlu masuk kembali untuk mengakses portal verifikasi parkir.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="rounded-xl border border-[#EDE4E2] py-2.5 text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
