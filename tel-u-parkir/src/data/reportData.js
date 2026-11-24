const today = '2025-03-20';
const yesterday = '2025-03-19';

function createReport(id, details) {
  const submittedOn = details.submittedOn || today;
  return {
    id,
    plate: details.plate,
    violation: details.violation,
    category: details.category || 'Parkir Liar',
    location: details.location,
    zone: details.zone || 'GKU (Tokong Nanas)',
    reportDate: details.reportDate || (submittedOn === today ? '28 Mar 2025' : '19 Mar 2025'),
    reportTime: details.reportTime || '09:42 WIB',
    relativeTime: details.relativeTime || 'Baru saja',
    reportedBy: details.reportedBy || 'Mahasiswa (Anonim)',
    reporterId: details.reporterId || '#MHS-3045',
    reporterNote: details.reporterNote || details.description || 'Motor parkir tepat di depan pintu keluar tangga darurat lantai 1 Tokong Nanas.',
    officerNote: details.officerNote || 'Bukti sesuai. Kendaraan menghalangi akses keluar. Lanjutkan penertiban di lokasi.',
    photoCount: details.photoCount || 1,
    evidencePhoto: details.evidencePhoto || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    reviewStatus: details.reviewStatus || 'Menunggu Review',
    description: details.description || `Laporan ${details.violation.toLocaleLowerCase('id-ID')} di ${details.location}.`,
    owner: details.owner || 'Identitas pemilik tersedia',
    nim: details.nim || '1301213045',
    studyProgram: details.studyProgram || 'S1 Informatika',
    vehicle: details.vehicle || 'Honda Vario 160 CBS',
    vehicleColor: details.vehicleColor || 'Hitam',
    vehicleType: details.vehicleType || 'Roda dua',
    vehicleStatus: details.vehicleStatus || 'Terdaftar',
    currentPoints: details.currentPoints ?? 4,
    potentialPoints: details.potentialPoints || 4,
    priority: details.priority || false,
    status: details.status || 'pending',
    pointsApplied: details.status === 'valid' ? (details.pointsApplied || details.potentialPoints) : undefined,
    submittedOn,
    ...(details.rejectionReason ? { rejectionReason: details.rejectionReason } : {}),
    ...(details.rejectionExplanation ? { rejectionExplanation: details.rejectionExplanation } : {}),
  };
}

// 8 Pending Reports as specified in PRD & Figma Screenshot
// Breakdown: Darurat: 2, Parkir Liar: 4, Luar Marka: 2. Total = 8
export const pendingReports = [
  createReport('RPT-8824', {
    plate: 'D 5482 UBW',
    violation: 'Menghalangi akses jalan',
    category: 'Darurat',
    location: 'Parkiran Motor GKU / Tokong Nanas',
    zone: 'GKU (Tokong Nanas)',
    reportDate: '28 Mar 2025',
    reportTime: '09:42 WIB',
    relativeTime: '12 menit lalu',
    reportedBy: 'Mahasiswa (Anonim)',
    reporterId: '#MHS-3045',
    reporterNote: 'Motor parkir tepat di depan pintu keluar tangga darurat lantai 1 Tokong Nanas.',
    officerNote: 'Bukti sesuai. Kendaraan menghalangi akses keluar. Lanjutkan penertiban di lokasi.',
    photoCount: 1,
    reviewStatus: 'Menunggu Review',
    potentialPoints: 4,
    priority: true,
    owner: 'Fajar Pratama',
    nim: '1301213091',
    studyProgram: 'S1 Informatika',
    vehicle: 'Honda Vario 160',
    vehicleColor: 'Hitam',
    vehicleType: 'Roda dua',
    vehicleStatus: 'Terdaftar',
    currentPoints: 4,
    evidencePhoto: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8820', {
    plate: 'B 6124 KZX',
    violation: 'Parkir di Luar Garis Marka',
    category: 'Luar Marka',
    location: 'Area Parkir Fakultas Ilmu Terapan (FIT)',
    zone: 'FIT',
    reportTime: '08:55 WIB',
    relativeTime: '45 menit lalu',
    reportedBy: 'Mhs. D3 RPLA',
    photoCount: 1,
    reviewStatus: 'Parkir Miring',
    potentialPoints: 1,
    priority: false,
    owner: 'Bagus Setiawan',
    nim: '1102213088',
    studyProgram: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    vehicle: 'Yamaha Aerox 155',
    currentPoints: 1,
    evidencePhoto: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8819', {
    plate: 'D 1822 AB',
    violation: 'Menghalangi Kendaraan Lain',
    category: 'Parkir Liar',
    location: 'Parkiran Samping Open Library',
    zone: 'Open Library',
    reportTime: '08:40 WIB',
    relativeTime: '1 jam lalu',
    reportedBy: 'Mahasiswa FKB',
    photoCount: 1,
    reviewStatus: 'Terkunci Stang',
    potentialPoints: 4,
    priority: false,
    owner: 'Dimas Surya',
    nim: '1501214012',
    studyProgram: 'S1 Ilmu Komunikasi',
    vehicle: 'Honda Beat Street',
    currentPoints: 4,
    evidencePhoto: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8818', {
    plate: 'D 9021 ACF',
    violation: 'Menghalangi Jalur Evakuasi Kebakaran',
    category: 'Darurat',
    location: 'Gedung Kuliah Umum (GKU) • Jalur Evakuasi Timur',
    zone: 'GKU (Tokong Nanas)',
    reportTime: '08:15 WIB',
    relativeTime: '1.5 jam lalu',
    reportedBy: 'Mahasiswa (Anonim)',
    photoCount: 2,
    reviewStatus: 'Menunggu Review',
    potentialPoints: 4,
    priority: true,
    owner: 'Rizky Ramadhan',
    nim: '1301213056',
    studyProgram: 'S1 Teknik Elektro',
    vehicle: 'Honda Scoopy Prestige',
    currentPoints: 8,
    evidencePhoto: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8817', {
    plate: 'F 1042 ABC',
    violation: 'Parkir di Jalur Pedestrian',
    category: 'Parkir Liar',
    location: 'Area Parkir Fakultas Ekonomi & Bisnis (FEB)',
    zone: 'FEB',
    reportTime: '07:45 WIB',
    relativeTime: '2 jam lalu',
    reportedBy: 'Mahasiswa FEB',
    photoCount: 1,
    reviewStatus: 'Menunggu Review',
    potentialPoints: 3,
    priority: false,
    owner: 'Nanda Pratama',
    nim: '1401213020',
    studyProgram: 'S1 Manajemen Bisnis',
    vehicle: 'Honda Vario 125',
    currentPoints: 3,
    evidencePhoto: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8816', {
    plate: 'D 4521 TLU',
    violation: 'Parkir Menyilang Garis Marka',
    category: 'Luar Marka',
    location: 'Parkiran Fakultas Ekonomi & Bisnis (FEB)',
    zone: 'FEB',
    reportTime: '07:15 WIB',
    relativeTime: '2.5 jam lalu',
    reportedBy: 'Mhs. S1 Akuntansi',
    photoCount: 1,
    reviewStatus: 'Parkir Miring',
    potentialPoints: 2,
    priority: false,
    owner: 'Alifia Rahma',
    nim: '1301213045',
    studyProgram: 'S1 Informatika',
    vehicle: 'Honda Vario 160',
    currentPoints: 4,
    evidencePhoto: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8815', {
    plate: 'D 1923 FIT',
    violation: 'Parkir Sembarangan di Depan Lobi',
    category: 'Parkir Liar',
    location: 'Gedung Fakultas Ilmu Terapan (FIT) Lt. 1',
    zone: 'FIT',
    reportTime: '06:50 WIB',
    relativeTime: '3 jam lalu',
    reportedBy: 'Mahasiswa (Anonim)',
    photoCount: 1,
    reviewStatus: 'Menunggu Review',
    potentialPoints: 3,
    priority: false,
    owner: 'Budi Santoso (Mhs)',
    nim: '1202213011',
    studyProgram: 'D3 Sistem Informasi',
    vehicle: 'Yamaha NMAX 155',
    currentPoints: 5,
    evidencePhoto: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80',
  }),
  createReport('RPT-8814', {
    plate: 'B 3319 ZB',
    violation: 'Parkir Liar di Bahu Jalan Kampus',
    category: 'Parkir Liar',
    location: 'Jalan Lingkar Open Library',
    zone: 'Open Library',
    reportTime: '06:30 WIB',
    relativeTime: '3.5 jam lalu',
    reportedBy: 'Staff Perpustakaan',
    photoCount: 1,
    reviewStatus: 'Menunggu Review',
    potentialPoints: 3,
    priority: false,
    owner: 'Aditya Nugraha',
    nim: '1301213099',
    studyProgram: 'S1 Teknik Komputer',
    vehicle: 'Honda Beat Deluxe',
    currentPoints: 2,
    evidencePhoto: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
  }),
];

const verifiedPlates = [
  'D 1102 ABC', 'D 7781 TLU', 'B 2401 TEL', 'D 3098 FIT',
  'F 6120 TLU', 'D 5567 ABC', 'B 7812 FIT', 'F 1234 TLU',
  'D 4488 FIT', 'B 6621 TEL', 'D 2510 ABC', 'D 1108 TLU',
  'D 5192 TEL', 'B 8831 FIT',
];

const verifiedViolations = [
  'Parkir di Luar Garis Marka',
  'Parkir di Area Terlarang',
  'Menghalangi Akses Kendaraan',
  'Parkir di Jalur Pedestrian',
];

const verifiedLocations = [
  'Zona Parkir FIT',
  'Area Gedung TULT',
  'Parkiran Motor GKU',
  'Gedung Kuliah Umum, Blok A',
  'Parkiran Fakultas Ekonomi & Bisnis (FEB)',
  'Parkiran Samping Open Library',
];

const verifiedVehicles = ['Honda Vario', 'Yamaha NMAX', 'Honda Beat', 'Honda Scoopy'];

// Exactly 14 verified reports for today
const verifiedReports = verifiedPlates.map((plate, index) => {
  const potentialPoints = (index % 4) + 1;
  return createReport(`RPT-${String(8813 - index).padStart(4, '0')}`, {
    plate,
    violation: verifiedViolations[index % verifiedViolations.length],
    location: verifiedLocations[index % verifiedLocations.length],
    reportTime: `${String(6 + Math.floor(index / 4)).padStart(2, '0')}:${String(40 - ((index % 4) * 7)).padStart(2, '0')} WIB`,
    vehicle: verifiedVehicles[index % verifiedVehicles.length],
    potentialPoints,
    status: 'valid',
    pointsApplied: potentialPoints,
    handledBy: 'Budi Santoso',
  });
});

// Exactly 2 rejected reports for today
const rejectedReports = [
  createReport('RPT-8799', {
    plate: 'D 6001 TLU',
    violation: 'Parkir di area terlarang',
    location: 'Area Gedung TULT',
    reportTime: '06:25 WIB',
    vehicle: 'Honda Beat',
    potentialPoints: 3,
    status: 'rejected',
    rejectionReason: 'Bukti foto tidak memadai',
    rejectionExplanation: 'Foto terlalu gelap dan plat nomor tidak terbaca jelas.',
    handledBy: 'Budi Santoso',
  }),
  createReport('RPT-8798', {
    plate: 'F 5501 FIT',
    violation: 'Parkir tidak sesuai marka',
    location: 'Zona Parkir FIT',
    reportTime: '06:12 WIB',
    vehicle: 'Yamaha Mio',
    potentialPoints: 1,
    status: 'rejected',
    rejectionReason: 'Data kendaraan tidak sesuai',
    rejectionExplanation: 'Plat nomor pada gambar tidak sesuai dengan data pelaporan.',
    handledBy: 'Budi Santoso',
  }),
];

export const initialReports = [
  ...pendingReports,
  ...verifiedReports,
  ...rejectedReports,
];

export const defaultReportId = 'RPT-8824';
const storageKey = 'tel-u-parkir.reports';

export function loadReports() {
  const savedReports = window.localStorage.getItem(storageKey);
  if (!savedReports) {
    window.localStorage.setItem(storageKey, JSON.stringify(initialReports));
    return initialReports;
  }

  try {
    const parsedReports = JSON.parse(savedReports);
    if (!Array.isArray(parsedReports)) {
      window.localStorage.setItem(storageKey, JSON.stringify(initialReports));
      return initialReports;
    }
    // Check if new schema (RPT-8824) is present; if not, re-initialize
    const hasRpt8824 = parsedReports.some((r) => r.id === 'RPT-8824');
    if (!hasRpt8824) {
      window.localStorage.setItem(storageKey, JSON.stringify(initialReports));
      return initialReports;
    }
    return parsedReports;
  } catch {
    window.localStorage.setItem(storageKey, JSON.stringify(initialReports));
    return initialReports;
  }
}

export function ensureStoredReport(report) {
  const reports = loadReports();
  if (reports.some((storedReport) => storedReport.id === report.id)) return reports;

  const updatedReports = [...reports, report];
  window.localStorage.setItem(storageKey, JSON.stringify(updatedReports));
  return updatedReports;
}

export function updateStoredReport(reportId, updates) {
  const reports = loadReports();
  let reportFound = false;
  const updatedReports = reports.map((report) => {
    if (report.id !== reportId) return report;
    reportFound = true;
    return { ...report, ...updates };
  });

  if (!reportFound) {
    throw new Error(`Laporan ${reportId} tidak ditemukan.`);
  }

  window.localStorage.setItem(storageKey, JSON.stringify(updatedReports));
  return updatedReports;
}
