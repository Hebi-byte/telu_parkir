import React, { useState } from 'react';
import {
  Plus,
  ShieldCheck,
  FileEdit,
  ArrowRight,
  X,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Bike,
  MapPin,
  Camera,
  Send
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

/* ==========================================================================
   PAGE-SPECIFIC SUB-COMPONENTS (DASHBOARD MAHASISWA)
   Komponen-komponen berikut hanya digunakan khusus pada halaman Dashboard Mahasiswa.
   ========================================================================== */

/**
 * 1. WelcomeSection
 * Greeting mahasiswa, identitas (NIM & Prodi), status akun, dan tombol Lapor Parkir.
 */
function WelcomeSection({ mahasiswa, onOpenReportModal }) {
  const {
    nama = 'Alifia Rahma',
    nim = '1301213045',
    prodi = 'S1 Teknik Informatika',
    statusAkun = 'Akun Mahasiswa Aktif',
    statusAkses = 'Valid • Semester Genap'
  } = mahasiswa || {};

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
      {/* Left: Identity & Status */}
      <div>
        <span className="text-xs font-bold tracking-wider text-[#BE1E2D] uppercase block mb-1">
          DASHBOARD MAHASISWA
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] tracking-tight">
          Halo, {nama} 👋
        </h1>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <p className="text-xs sm:text-sm text-[#8A7774] font-medium">
            {nim} &bull; {prodi}
          </p>

          <StatusBadge type="success">
            {statusAkun}
          </StatusBadge>
        </div>
      </div>

      {/* Right: Action & Campus Parking Access Info */}
      <div className="flex flex-col items-start md:items-end gap-2">
        <button
          onClick={onOpenReportModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white text-xs sm:text-sm font-bold shadow-xs transition-all duration-150 cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Laporkan Parkir Liar</span>
        </button>

        <p className="text-xs font-semibold text-[#087A36]">
          Akses Parkir Kampus: {statusAkses}
        </p>
      </div>
    </div>
  );
}

/**
 * 2. SummaryCard
 * Ringkasan akumulasi poin pelanggaran, status, progress bar, & insentif kedisiplinan.
 */
function SummaryCard({ data }) {
  const {
    poin = 4,
    status = 'Hati-hati',
    selisihLeaderboard = '-24 Point To Top LeaderBoard',
    persentase = 14,
    insentif = {
      judul: 'Insentif Kedisiplinan',
      deskripsi: '18 Hari tersisa. Tanpa pelanggaran hingga 15 April untuk pengurangan -10 poin otomatis.'
    }
  } = data || {};

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div>
        {/* Card Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774] mb-3">
          Total akumulasi
        </h3>

        {/* Main Poin & Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#BE1E2D] tracking-tight">
              {poin}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#242424] ml-2">
              Poin
            </span>
          </div>
          <StatusBadge type="warning">
            {status}
          </StatusBadge>
        </div>

        {/* Sub Info */}
        <p className="text-xs text-[#8A7774] mt-1.5 font-medium">
          {selisihLeaderboard}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 mb-5">
          <div className="w-full h-2 bg-[#EDE4E2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#BE1E2D] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(Math.max(persentase, 14), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Insentif Kedisiplinan Box */}
      <div className="bg-[#D9FBE4] border border-[#b8f0ca] rounded-xl p-3.5 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#087A36]/15 text-[#087A36] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-[#087A36] leading-tight">
            {insentif?.judul || 'Insentif Kedisiplinan'}
          </h4>
          <p className="text-[11px] text-[#087A36] mt-1 leading-relaxed">
            {insentif?.deskripsi}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. VehicleCard
 * Kartu status kendaraan terdaftar, plat nomor, status RFID, & aksi kelola kendaraan.
 */
function VehicleCard({
  kendaraan,
  onAddVehicle,
  onManageVehicle
}) {
  const {
    nama = 'Honda Vario 160',
    platNomor = 'D 4521 TLU',
    status = 'Terverifikasi',
    rfidStatus = 'RFID Active',
    aksesParkir = 'Valid • Roda dua',
  } = kendaraan || {};

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div>
        {/* Header with Title & Action */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Kendaraan Terdaftar
          </h3>
          <button
            onClick={onAddVehicle}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#BE1E2D] hover:text-[#A51020] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Tambah Kendaraan</span>
          </button>
        </div>

        {/* Vehicle Header & Verification Status */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xl font-extrabold text-[#242424] tracking-tight">
            {nama}
          </span>

          <StatusBadge type="success">
            {status}
          </StatusBadge>
        </div>

        {/* License Plate Container */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-[#F5F2F0] border border-[#EDE4E2] text-center font-bold text-base sm:text-lg text-[#242424] tracking-widest mb-4">
          {platNomor}
        </div>

        {/* Key-Value Specs */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#8A7774] font-medium">Status RFID</span>
            <span className="font-bold text-[#242424]">{rfidStatus}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8A7774] font-medium">Akses parkir</span>
            <span className="font-bold text-[#242424]">{aksesParkir}</span>
          </div>
        </div>
      </div>

      {/* Action Button: Kelola Kendaraan */}
      <div className="mt-4 pt-3">
        <button
          onClick={onManageVehicle}
          className="w-full py-2.5 px-4 rounded-xl border border-[#EDE4E2] bg-white hover:bg-[#FAF8F7] text-xs font-bold text-[#BE1E2D] transition-colors text-center cursor-pointer shadow-2xs"
        >
          Kelola Kendaraan
        </button>
      </div>
    </div>
  );
}

/**
 * 4. ViolationCard
 * Kartu riwayat pelanggaran parkir mahasiswa, foto bukti, & tombol pengajuan sanggah.
 */
function ViolationCard({
  violations = [],
  onOpenObjectionModal,
  onViewImageModal
}) {
  const currentViolation = violations[0] || {
    jenis: 'Menghalangi Akses Kendaraan',
    lokasi: 'Gedung Tokong Nanas (GKU)',
    tanggal: '24 Mar 2025',
    waktu: '09:42 WIB',
    poin: '+4 Poin',
    status: 'Terverifikasi Satpam',
    batasSanggah: 'Batas sanggah: 1 hari lagi',
    fotoBukti: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Riwayat Pelanggaran
          </h3>
          <span className="text-xs font-bold text-[#BE1E2D] cursor-pointer hover:underline">
            Bulan Ini
          </span>
        </div>

        {/* Violation Detail Item */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Photo Thumbnail */}
          <div
            onClick={() => onViewImageModal && onViewImageModal(currentViolation.fotoBukti, currentViolation.jenis)}
            className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-gray-100 border border-[#EDE4E2] shrink-0 cursor-pointer relative group"
            title="Klik untuk memperbesar foto bukti"
          >
            <img
              src={currentViolation.fotoBukti}
              alt="Bukti Pelanggaran"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FCE8E8] text-[#BE1E2D] border border-[#fbd0d0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2D]" />
                <span>1 Baru</span>
              </span>
              <span className="text-sm font-extrabold text-[#BE1E2D]">
                {currentViolation.poin}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-[#242424] leading-snug">
              {currentViolation.jenis}
            </h4>

            {/* Location */}
            <p className="text-xs text-[#8A7774] font-medium">
              {currentViolation.lokasi}
            </p>

            {/* Date & Time */}
            <p className="text-xs text-[#8A7774] font-medium">
              {currentViolation.tanggal} • {currentViolation.waktu}
            </p>

            {/* Verification Status */}
            <div className="pt-1">
              <StatusBadge type="success">
                {currentViolation.status}
              </StatusBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-5 pt-3.5 border-t border-[#EDE4E2]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#8A7774]">
          {currentViolation.batasSanggah}
        </p>

        <button
          onClick={() => onOpenObjectionModal && onOpenObjectionModal(currentViolation)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#BE1E2D] text-xs font-bold text-[#BE1E2D] bg-white hover:bg-[#FCE8E8]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <FileEdit className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Ajukan Keberatan</span>
        </button>
      </div>
    </div>
  );
}

/**
 * 5. LeaderboardCard
 * Widget peringkat ketidakpatuhan parkir mahasiswa dengan tombol preview leaderboard.
 */
function LeaderboardCard({
  data,
  onOpenLeaderboard
}) {
  const {
    peringkat = 14,
    totalMahasiswa = 850,
  } = data || {};

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Peringkat KeTidakpatuhan Parkir
          </h3>
          <button
            onClick={onOpenLeaderboard}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#BE1E2D] hover:text-[#A51020] transition-colors cursor-pointer group"
          >
            <span>Lihat Leaderboard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Main Stat */}
        <div className="pt-2 pb-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#242424] tracking-tight">
              #{peringkat}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#242424] tracking-tight">
              dari {totalMahasiswa.toLocaleString('id-ID')} Mahasiswa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. LostItemCard
 * Informasi kunci/barang tertinggal di area parkir dan panduan klaim.
 */
function LostItemCard({
  item,
  onClaimItem,
  onViewImageModal
}) {
  const {
    tag = 'Terkini',
    foto,
    judul = 'Ditemukan Kunci Honda Vario dengan gantungan Telkom di Parkiran FEB.',
    lokasiPenyimpanan = 'Diamankan di Pos Satpam Utama',
    waktu = '32 menit lalu'
  } = item || {};

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Info Kunci Tertinggal
          </h3>
          <span className="text-xs font-bold text-[#BE1E2D]">
            {tag}
          </span>
        </div>

        {/* Full-width Image */}
        <div
          onClick={() => onClaimItem ? onClaimItem() : onViewImageModal && onViewImageModal(foto, judul)}
          className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-gray-100 border border-[#EDE4E2] mb-4 cursor-pointer relative group"
          title="Klik untuk melihat detail atau klaim kunci"
        >
          <img
            src={foto}
            alt={judul}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-[#242424] leading-snug mb-2.5">
          {judul}
        </h4>

        {/* Storage Location in Red */}
        <p className="text-xs font-bold text-[#BE1E2D]">
          {lokasiPenyimpanan}
        </p>
      </div>

      {/* Time in Secondary Color at Bottom */}
      <div className="pt-8">
        <p className="text-xs text-[#8A7774] font-medium">
          {waktu}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE-SPECIFIC MODALS (DASHBOARD MAHASISWA)
   Modal dialog interaktif yang hanya digunakan oleh fitur Dashboard Mahasiswa.
   ========================================================================== */

/** Modal 1: Lapor Parkir Liar (FR-13) */
function ReportParkingModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    lokasi: 'Gedung Tokong Nanas (GKU)',
    platNomor: '',
    jenisKendaraan: 'Sepeda Motor',
    deskripsi: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (onSubmitSuccess) onSubmitSuccess(formData);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#EDE4E2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EDE4E2] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#BE1E2D]">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#242424]">Laporkan Parkir Liar</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-[#D9FBE4] text-[#087A36] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#242424]">Laporan Berhasil Terkirim!</h4>
            <p className="text-xs text-[#8A7774]">
              Satpam dan petugas patroli kampus akan segera memeriksa lokasi yang Anda laporkan. Terima kasih atas partisipasi Anda.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#242424] mb-1.5">
                Lokasi Pelanggaran *
              </label>
              <select
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
              >
                <option value="Gedung Tokong Nanas (GKU)">Gedung Tokong Nanas (GKU)</option>
                <option value="Parkiran Fakultas Ekonomi & Bisnis (FEB)">Parkiran Fakultas Ekonomi &amp; Bisnis (FEB)</option>
                <option value="Parkiran Fakultas Teknik Elektro (FTE)">Parkiran Fakultas Teknik Elektro (FTE)</option>
                <option value="Parkiran Open Library">Parkiran Open Library</option>
                <option value="Jalur Pedestrian Belakang Rektorat">Jalur Pedestrian Belakang Rektorat</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1.5">
                  Nomor Polisi (Jika Terlihat)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: D 1234 ABC"
                  value={formData.platNomor}
                  onChange={(e) => setFormData({ ...formData, platNomor: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1.5">
                  Jenis Kendaraan
                </label>
                <select
                  value={formData.jenisKendaraan}
                  onChange={(e) => setFormData({ ...formData, jenisKendaraan: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                >
                  <option value="Sepeda Motor">Sepeda Motor</option>
                  <option value="Mobil">Mobil</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242424] mb-1.5">
                Keterangan / Catatan Lokasi
              </label>
              <textarea
                rows="3"
                placeholder="Deskripsikan kondisi parkir liar (misal: menghalangi zebra cross atau pintu darurat)..."
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
              />
            </div>

            <div className="p-3 bg-[#FAF8F7] border border-dashed border-[#EDE4E2] rounded-xl text-center cursor-pointer hover:bg-gray-50">
              <Camera className="w-5 h-5 text-[#8A7774] mx-auto mb-1" />
              <p className="text-xs font-semibold text-[#242424]">Unggah Foto Bukti (Opsional)</p>
              <p className="text-[10px] text-[#8A7774]">Format JPG, PNG max 5MB</p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Laporan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/** Modal 2: Tambah Kendaraan Baru (FR-07) */
function AddVehicleModal({ isOpen, onClose, onAddSuccess }) {
  const [vehicleData, setVehicleData] = useState({
    nama: '',
    platNomor: '',
    tipe: 'Sepeda Motor',
    warna: ''
  });
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleData.nama || !vehicleData.platNomor) {
      alert('Mohon isi nama kendaraan dan nomor polisi.');
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onAddSuccess) onAddSuccess(vehicleData);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#EDE4E2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EDE4E2] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#BE1E2D]">
            <Bike className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#242424]">Tambah Kendaraan Baru</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-[#D9FBE4] text-[#087A36] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#242424]">Pendaftaran Diajukan!</h4>
            <p className="text-xs text-[#8A7774]">
              Data kendaraan akan diverifikasi oleh Unit Logistik untuk penerbitan stiker RFID kampus.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#242424] mb-1.5">
                Model Kendaraan *
              </label>
              <input
                type="text"
                placeholder="Contoh: Yamaha NMAX 155 / Honda Scoopy"
                value={vehicleData.nama}
                onChange={(e) => setVehicleData({ ...vehicleData, nama: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1.5">
                  Nomor Polisi (Plat) *
                </label>
                <input
                  type="text"
                  placeholder="D 1234 XYZ"
                  value={vehicleData.platNomor}
                  onChange={(e) => setVehicleData({ ...vehicleData, platNomor: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1.5">
                  Tipe Kendaraan
                </label>
                <select
                  value={vehicleData.tipe}
                  onChange={(e) => setVehicleData({ ...vehicleData, tipe: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                >
                  <option value="Sepeda Motor">Sepeda Motor (Roda Dua)</option>
                  <option value="Mobil">Mobil (Roda Empat)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242424] mb-1.5">
                Foto STNK / Bukti Kepemilikan
              </label>
              <div className="p-3 bg-[#FAF8F7] border border-dashed border-[#EDE4E2] rounded-xl text-center">
                <Upload className="w-5 h-5 text-[#8A7774] mx-auto mb-1" />
                <p className="text-xs font-semibold text-[#242424]">Pilih file STNK</p>
                <p className="text-[10px] text-[#8A7774]">Format PDF/JPG max 3MB</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Simpan Kendaraan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/** Modal 3: Kelola Kendaraan Terdaftar (FR-08) */
function ManageVehicleModal({ isOpen, onClose, kendaraan }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl border border-[#EDE4E2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EDE4E2] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#242424]">Kelola Kendaraan Terdaftar</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-[#FAF8F7] border border-[#EDE4E2] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A7774]">Model Kendaraan</span>
              <span className="text-xs font-bold text-[#242424]">{kendaraan?.nama}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A7774]">Nomor Polisi</span>
              <span className="text-xs font-mono font-bold text-[#242424] bg-white px-2 py-0.5 rounded border border-[#EDE4E2]">
                {kendaraan?.platNomor}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A7774]">Status Tag RFID</span>
              <span className="text-xs font-semibold text-[#087A36]">{kendaraan?.rfidStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A7774]">Akses Parkir Kampus</span>
              <span className="text-xs font-semibold text-[#242424]">{kendaraan?.aksesParkir}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <button
              onClick={() => {
                alert('Pengajuan perpanjangan akses RFID telah dikirimkan ke Unit Keamanan.');
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-[#EDE4E2] font-semibold text-[#242424] hover:bg-gray-50 text-center cursor-pointer"
            >
              Sinkronisasi Ulang Kartu RFID
            </button>
            <button
              onClick={() => {
                alert('Silakan kunjungi Pos Utama Telkom University untuk penggantian stiker fisik RFID.');
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-[#BE1E2D] font-semibold hover:bg-red-50 text-center cursor-pointer"
            >
              Lapor Kerusakan / Kehilangan Stiker RFID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Modal 4: Pengajuan Sanggah / Keberatan (FR-10) */
function ObjectionModal({ isOpen, onClose, violation, onSubmitSuccess }) {
  const [alasan, setAlasan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!alasan) {
      alert('Mohon cantumkan alasan sanggahan secara jelas.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (onSubmitSuccess) onSubmitSuccess(alasan);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#EDE4E2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EDE4E2] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#BE1E2D]">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#242424]">Pengajuan Sanggah / Keberatan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-[#D9FBE4] text-[#087A36] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#242424]">Keberatan Berhasil Diajukan!</h4>
            <p className="text-xs text-[#8A7774]">
              Tim Review Keamanan Kampus akan meninjau rekaman CCTV dan keterangan Anda dalam 1x24 jam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Violation preview banner */}
            <div className="p-3.5 bg-[#FCE8E8]/50 border border-[#f8c8c8] rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#242424]">{violation?.jenis || 'Pelanggaran Parkir'}</p>
                <p className="text-[11px] text-[#8A7774]">{violation?.lokasi} &bull; {violation?.tanggal}</p>
              </div>
              <span className="text-xs font-bold text-[#BE1E2D] bg-white px-2 py-0.5 rounded border border-[#EDE4E2]">
                {violation?.poin || '+4 Poin'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242424] mb-1.5">
                Alasan Pengajuan Keberatan *
              </label>
              <textarea
                rows="4"
                placeholder="Jelaskan alasan keberatan, situasi darurat, atau ketidaksesuaian bukti pelanggaran..."
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#BE1E2D]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242424] mb-1.5">
                Lampiran Bukti Pendukung (Opsional)
              </label>
              <div className="p-3 bg-[#FAF8F7] border border-dashed border-[#EDE4E2] rounded-xl text-center">
                <Upload className="w-5 h-5 text-[#8A7774] mx-auto mb-1" />
                <p className="text-xs font-semibold text-[#242424]">Unggah foto atau dokumen klarifikasi</p>
                <p className="text-[10px] text-[#8A7774]">Format JPG, PNG, PDF max 5MB</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#EDE4E2] text-xs font-bold text-[#8A7774] hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Sanggahan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/** Modal 5: Klaim Barang / Kunci Tertinggal (FR-11) */
function ClaimItemModal({ isOpen, onClose, item }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl border border-[#EDE4E2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EDE4E2] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#242424]">Klaim Barang Temuan</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="rounded-xl overflow-hidden border border-[#EDE4E2]">
            <img src={item?.foto} alt={item?.judul} className="w-full h-40 object-cover" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#242424]">{item?.judul}</h4>
            <div className="flex items-center gap-2 text-xs text-[#BE1E2D] font-semibold mt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{item?.lokasiPenyimpanan}</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF8F7] border border-[#EDE4E2] rounded-xl text-xs space-y-1 text-[#8A7774]">
            <p className="font-semibold text-[#242424]">Prosedur Pengambilan:</p>
            <p>1. Datangi Pos Satpam Utama membawa Kartu Tanda Mahasiswa (KTM).</p>
            <p>2. Tunjukkan STNK atau kunci serep untuk verifikasi kepemilikan.</p>
            <p>3. Hubungi Hotline Satpam: <strong>(022) 7564108</strong></p>
          </div>

          <button
            onClick={() => {
              alert('Permintaan konfirmasi klaim telah dicatat. Silakan menuju Pos Satpam Utama dengan membawa KTM & STNK.');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#BE1E2D] hover:bg-[#A51020] text-white text-xs font-bold text-center cursor-pointer shadow-sm"
          >
            Konfirmasi Sebagai Pemilik
          </button>
        </div>
      </div>
    </div>
  );
}

/** Modal 6: Leaderboard Preview (FR-12) */
function LeaderboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const mockLeaderboard = [
    { rank: 1, nim: '1301210088', nama: 'Dimas P.', poin: 28, status: 'Peringatan III' },
    { rank: 2, nim: '1301211029', nama: 'Fajar A.', poin: 24, status: 'Peringatan III' },
    { rank: 3, nim: '1301212004', nama: 'Rizky K.', poin: 20, status: 'Peringatan II' },
    { rank: 14, nim: '1301213045', nama: 'Alifia Rahma (Anda)', poin: 4, status: 'Hati-hati', isCurrent: true },
    { rank: 50, nim: '1301214012', nama: 'Budi S.', poin: 0, status: 'Tertib' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#EDE4E2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EDE4E2] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#242424]">Leaderboard Ketidakpatuhan Parkir</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-[#8A7774]">
            Menampilkan data transparansi kepatuhan parkir mahasiswa semester ini.
          </p>

          <div className="border border-[#EDE4E2] rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF8F7] border-b border-[#EDE4E2] text-[#8A7774] font-bold">
                <tr>
                  <th className="px-3 py-2.5">Rank</th>
                  <th className="px-3 py-2.5">Mahasiswa</th>
                  <th className="px-3 py-2.5">Poin</th>
                  <th className="px-3 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE4E2]">
                {mockLeaderboard.map((item) => (
                  <tr
                    key={item.rank}
                    className={item.isCurrent ? 'bg-[#FCE8E8]/40 font-bold text-[#BE1E2D]' : 'hover:bg-gray-50'}
                  >
                    <td className="px-3 py-2.5">#{item.rank}</td>
                    <td className="px-3 py-2.5">{item.nama}</td>
                    <td className="px-3 py-2.5">{item.poin} Poin</td>
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#EDE4E2]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Modal 7: Lightbox Image Viewer */
function ImageViewerModal({ isOpen, onClose, src, title }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-gray-700 shadow-2xl relative"
      >
        <div className="p-4 bg-white border-b border-[#EDE4E2] flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#242424] truncate">{title || 'Pratinjau Foto'}</h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8A7774] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2 bg-black flex items-center justify-center max-h-[70vh]">
          <img src={src} alt={title} className="max-h-[68vh] object-contain rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT: DashboardMahasiswa
   ========================================================================== */

export default function DashboardMahasiswa({
  data,
  onNavigateMenu
}) {
  const [dashboardState, setDashboardState] = useState(data);

  // Modals state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [manageVehicleModalOpen, setManageVehicleModalOpen] = useState(false);
  const [objectionModalOpen, setObjectionModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [imageViewer, setImageViewer] = useState({ isOpen: false, src: '', title: '' });

  // Handle open objection modal with specific violation
  const handleOpenObjection = (violation) => {
    setSelectedViolation(violation);
    setObjectionModalOpen(true);
  };

  // Handle image viewer
  const handleViewImage = (src, title) => {
    setImageViewer({ isOpen: true, src, title });
  };

  // Handle adding new vehicle
  const handleAddVehicleSuccess = (newVehicle) => {
    setDashboardState((prev) => ({
      ...prev,
      kendaraan: {
        ...prev.kendaraan,
        nama: newVehicle.nama,
        platNomor: newVehicle.platNomor,
        status: 'Menunggu Verifikasi',
        rfidStatus: 'Proses Registrasi',
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section */}
      <WelcomeSection
        mahasiswa={dashboardState.mahasiswa}
        onOpenReportModal={() => setReportModalOpen(true)}
      />

      {/* 2. Top Summary Cards (2 Columns with balanced proportion) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1 — Total Akumulasi */}
        <SummaryCard data={dashboardState.akumulasiPoin} />

        {/* CARD 2 — Kendaraan Terdaftar */}
        <VehicleCard
          kendaraan={dashboardState.kendaraan}
          onAddVehicle={() => setAddVehicleModalOpen(true)}
          onManageVehicle={() => setManageVehicleModalOpen(true)}
        />
      </div>

      {/* 3. Lower Section: Riwayat Pelanggaran & Peringkat (Left) + Info Kunci Tertinggal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Riwayat Pelanggaran + Peringkat Ketidakpatuhan */}
        <div className="flex flex-col gap-6">
          {/* CARD 3 — Riwayat Pelanggaran */}
          <ViolationCard
            violations={dashboardState.riwayatPelanggaran}
            onOpenObjectionModal={handleOpenObjection}
            onViewImageModal={handleViewImage}
          />

          {/* CARD 5 — Peringkat Ketidakpatuhan Parkir */}
          <LeaderboardCard
            data={dashboardState.peringkatKetidakpatuhan}
            onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
          />
        </div>

        {/* Right Column: CARD 4 — Info Kunci Tertinggal */}
        <div className="h-full">
          <LostItemCard
            item={dashboardState.kunciTertinggal}
            onClaimItem={() => setClaimModalOpen(true)}
            onViewImageModal={handleViewImage}
          />
        </div>
      </div>

      {/* Interactive Modals */}
      <ReportParkingModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <AddVehicleModal
        isOpen={addVehicleModalOpen}
        onClose={() => setAddVehicleModalOpen(false)}
        onAddSuccess={handleAddVehicleSuccess}
      />

      <ManageVehicleModal
        isOpen={manageVehicleModalOpen}
        onClose={() => setManageVehicleModalOpen(false)}
        kendaraan={dashboardState.kendaraan}
      />

      <ObjectionModal
        isOpen={objectionModalOpen}
        onClose={() => setObjectionModalOpen(false)}
        violation={selectedViolation}
      />

      <ClaimItemModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        item={dashboardState.kunciTertinggal}
      />

      <LeaderboardModal
        isOpen={leaderboardModalOpen}
        onClose={() => setLeaderboardModalOpen(false)}
      />

      <ImageViewerModal
        isOpen={imageViewer.isOpen}
        onClose={() => setImageViewer({ isOpen: false, src: '', title: '' })}
        src={imageViewer.src}
        title={imageViewer.title}
      />
    </div>
  );
}
