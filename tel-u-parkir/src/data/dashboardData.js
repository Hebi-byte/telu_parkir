import heroImage from '../assets/hero.png';

export const dashboardData = {
  mahasiswa: {
    nama: "Alifia Rahma",
    nim: "1301213045",
    prodi: "S1 Teknik Informatika",
    semester: "Semester Genap",
    statusAkun: "Akun Mahasiswa Aktif",
    statusAkses: "Valid • Semester Genap",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "alifiarahma@student.telkomuniversity.ac.id",
  },
  
  akumulasiPoin: {
    poin: 4,
    status: "Hati-hati",
    selisihLeaderboard: "-24 Point To Top LeaderBoard",
    maxPoin: 28,
    persentase: 15,
    insentif: {
      judul: "Insentif Kedisiplinan",
      sisaHari: 18,
      tanggalTarget: "15 April",
      penguranganPoin: 10,
      deskripsi: "18 Hari tersisa. Tanpa pelanggaran hingga 15 April untuk pengurangan -10 poin otomatis."
    }
  },

  kendaraan: {
    nama: "Honda Vario 160",
    platNomor: "D 4521 TLU",
    status: "Terverifikasi",
    rfidStatus: "RFID Active",
    aksesParkir: "Valid • Roda dua",
    warna: "Matte Black",
    tahun: "2023",
    tipe: "Sepeda Motor"
  },

  riwayatPelanggaran: [
    {
      id: "PEL-2025-0324",
      jenis: "Menghalangi Akses Kendaraan",
      lokasi: "Gedung Tokong Nanas (GKU)",
      tanggal: "24 Mar 2025",
      waktu: "09:42 WIB",
      poin: "+4 Poin",
      poinValue: 4,
      status: "Terverifikasi Satpam",
      batasSanggah: "Batas sanggah: 1 hari lagi",
      sisaHariSanggah: 1,
      // Curated motorcycle parking violation photo
      fotoBukti: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
      keterangan: "Parkir di depan jalur evakuasi dan menghalangi akses masuk kendaraan logistik gedung GKU."
    }
  ],

  kunciTertinggal: {
    id: "KNC-2025-001",
    tag: "Terkini",
    foto: heroImage,
    judul: "Ditemukan Kunci Honda Vario dengan gantungan Telkom di Parkiran FEB.",
    lokasiPenyimpanan: "Diamankan di Pos Satpam Utama.",
    waktu: "32 menit lalu",
    petugas: "Pak Bambang (Satpam FEB)",
    status: "Menunggu Pemilik"
  },

  peringkatKetidakpatuhan: {
    peringkat: 14,
    totalMahasiswa: 850,
    kategori: "Risiko Rendah",
    deskripsi: "Peringkat dihitung berdasarkan akumulasi poin pelanggaran pada semester berjalan."
  },

  notifikasi: [
    {
      id: 1,
      tipe: "pelanggaran",
      judul: "Poin Pelanggaran Ditambahkan",
      pesan: "+4 Poin dicatat pada 24 Mar 2025 di Gedung Tokong Nanas.",
      waktu: "2 jam lalu",
      dibaca: false
    },
    {
      id: 2,
      tipe: "info",
      judul: "Barang Ditemukan",
      pesan: "Kunci Honda Vario ditemukan di Parkiran FEB.",
      waktu: "32 menit lalu",
      dibaca: false
    },
    {
      id: 3,
      tipe: "sistem",
      judul: "Verifikasi RFID Sukses",
      pesan: "Stiker RFID motor D 4521 TLU telah aktif untuk gate parkir.",
      waktu: "2 hari lalu",
      dibaca: true
    }
  ],

  sidebarInfo: {
    judul: "Tertib parkir, aman bersama.",
    unit: "Unit Logistik & Keamanan Telkom University",
    linkText: "Bantuan & SOP",
    copyright: "© 2025 Tel-U Parkir"
  },

  footerInfo: {
    kiri: "Tel-U Parkir • Unit Logistik & Keamanan Telkom University",
    kanan: "Kampus Purwokerto"
  }
};
