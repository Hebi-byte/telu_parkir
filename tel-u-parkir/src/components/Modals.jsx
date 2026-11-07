import React, { useState } from 'react';
import {
  X,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Bike,
  ShieldCheck,
  MapPin,
  Calendar,
  Send,
  Camera,
  Car
} from 'lucide-react';

/* 1. Modal Lapor Parkir Liar (FR-13) */
export function ReportParkingModal({ isOpen, onClose, onSubmitSuccess }) {
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

/* 2. Modal Tambah Kendaraan (FR-07) */
export function AddVehicleModal({ isOpen, onClose, onAddSuccess }) {
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

/* 3. Modal Kelola Kendaraan (FR-08) */
export function ManageVehicleModal({ isOpen, onClose, kendaraan }) {
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

/* 4. Modal Ajukan Keberatan (FR-10) */
export function ObjectionModal({ isOpen, onClose, violation, onSubmitSuccess }) {
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

/* 5. Modal Klaim Barang / Kunci Tertinggal (FR-11) */
export function ClaimItemModal({ isOpen, onClose, item }) {
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

/* 6. Modal Leaderboard Preview (FR-12) */
export function LeaderboardModal({ isOpen, onClose }) {
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

/* 7. Modal Image Viewer (Lightbox) */
export function ImageViewerModal({ isOpen, onClose, src, title }) {
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
