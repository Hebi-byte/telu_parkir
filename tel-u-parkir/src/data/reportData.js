const today = '2025-03-20';
const yesterday = '2025-03-19';

function createReport(id, details) {
  const submittedOn = details.submittedOn || today;
  return {
    id,
    plate: details.plate,
    violation: details.violation,
    location: details.location,
    reportDate: submittedOn === today ? '20 Mar 2025' : '19 Mar 2025',
    reportTime: details.reportTime,
    reportedBy: details.reportedBy || 'Mahasiswa A*** (dirahasiakan)',
    description: details.description || `Laporan ${details.violation.toLocaleLowerCase('id-ID')} di ${details.location}.`,
    owner: details.owner || 'Identitas pemilik tersedia',
    nim: details.nim || '1202220000',
    studyProgram: details.studyProgram || 'S1 Informatika',
    vehicle: details.vehicle || 'Honda Vario',
    currentPoints: details.currentPoints ?? 12,
    potentialPoints: details.potentialPoints,
    priority: details.priority || false,
    status: details.status || 'pending',
    pointsApplied: details.status === 'valid' ? details.potentialPoints : undefined,
    submittedOn,
    ...(details.rejectionReason ? { rejectionReason: details.rejectionReason } : {}),
  };
}

const pendingReports = [
  createReport('RPT-0821', {
    plate: 'D 5482 UBW',
    violation: 'Menghalangi akses kendaraan',
    location: 'Parkiran Motor GKU / Tokong Nanas',
    reportTime: '08:15 WIB',
    description: 'Motor menutup jalur keluar sehingga kendaraan lain tidak dapat lewat.',
    owner: 'Alifa Rahma',
    nim: '1301213045',
    studyProgram: 'S1 Informatika',
    vehicle: 'Honda Vario 160 CBS',
    potentialPoints: 4,
    priority: true,
  }),
  createReport('RPT-0820', {
    plate: 'D 3319 ZB',
    violation: 'Parkir tidak sesuai marka',
    location: 'Zona Parkir FIT',
    reportTime: '07:48 WIB',
    vehicle: 'Yamaha NMAX',
    potentialPoints: 1,
  }),
  createReport('RPT-0819', {
    plate: 'D 9021 ACF',
    violation: 'Parkir di area terlarang',
    location: 'Area Parkir Gedung FIT',
    reportTime: '07:35 WIB',
    vehicle: 'Honda Beat',
    potentialPoints: 3,
  }),
  createReport('RPT-0818', {
    plate: 'B 6120 KJT',
    violation: 'Menghalangi jalur darurat',
    location: 'Gedung Kuliah Umum, Blok B',
    reportTime: '07:22 WIB',
    vehicle: 'Honda Beat',
    potentialPoints: 5,
    priority: true,
  }),
  createReport('RPT-0817', {
    plate: 'F 1042 ABC',
    violation: 'Parkir di jalur pedestrian',
    location: 'Area Gedung TULT',
    reportTime: '07:10 WIB',
    vehicle: 'Honda Scoopy',
    potentialPoints: 3,
  }),
  createReport('RPT-0816', {
    plate: 'D 4521 TLU',
    violation: 'Melewati batas parkir',
    location: 'Parkiran Motor GKU',
    reportTime: '06:58 WIB',
    vehicle: 'Yamaha Aerox',
    potentialPoints: 2,
  }),
  createReport('RPT-0815', {
    plate: 'D 1923 FIT',
    violation: 'Parkir di area terlarang',
    location: 'Jalur Akses Fakultas Industri Kreatif',
    reportTime: '06:43 WIB',
    vehicle: 'Honda Vario',
    potentialPoints: 3,
  }),
];

const verifiedPlates = [
  'D 1102 ABC', 'D 7781 TLU', 'B 2401 TEL', 'D 3098 FIT',
  'F 6120 TLU', 'D 5567 ABC', 'B 7812 FIT', 'F 1234 TLU',
  'D 4488 FIT', 'B 6621 TEL', 'D 2510 ABC', 'D 1108 TLU',
];
const violations = [
  'Parkir tidak sesuai marka',
  'Parkir di area terlarang',
  'Menghalangi akses kendaraan',
  'Parkir di jalur pedestrian',
];
const locations = [
  'Zona Parkir FIT',
  'Area Gedung TULT',
  'Parkiran Motor GKU',
  'Gedung Kuliah Umum, Blok A',
];
const vehicles = ['Honda Vario', 'Yamaha NMAX', 'Honda Beat', 'Honda Scoopy'];

const verifiedReports = verifiedPlates.map((plate, index) => {
  const potentialPoints = (index % 5) + 1;
  return createReport(`RPT-${String(814 - index).padStart(4, '0')}`, {
    plate,
    violation: violations[index % violations.length],
    location: locations[index % locations.length],
    reportTime: `${String(6 + Math.floor(index / 4)).padStart(2, '0')}:${String(40 - ((index % 4) * 7)).padStart(2, '0')} WIB`,
    vehicle: vehicles[index % vehicles.length],
    potentialPoints,
    status: 'valid',
  });
});

const rejectedReports = [
  createReport('RPT-0802', {
    plate: 'D 6001 TLU',
    violation: 'Parkir di area terlarang',
    location: 'Area Gedung TULT',
    reportTime: '06:25 WIB',
    vehicle: 'Honda Beat',
    potentialPoints: 3,
    status: 'rejected',
    rejectionReason: 'Bukti foto tidak jelas.',
  }),
  createReport('RPT-0801', {
    plate: 'F 5501 FIT',
    violation: 'Parkir tidak sesuai marka',
    location: 'Zona Parkir FIT',
    reportTime: '06:12 WIB',
    vehicle: 'Yamaha Mio',
    potentialPoints: 1,
    status: 'rejected',
    rejectionReason: 'Plat kendaraan tidak sesuai.',
  }),
];

const pastReports = [
  createReport('RPT-0800', {
    plate: 'D 7810 ABC',
    violation: 'Melewati batas parkir',
    location: 'Parkiran Motor GKU',
    reportTime: '15:10 WIB',
    potentialPoints: 2,
    status: 'valid',
    submittedOn: yesterday,
  }),
  createReport('RPT-0799', {
    plate: 'B 4402 TEL',
    violation: 'Parkir di area terlarang',
    location: 'Area Gedung TULT',
    reportTime: '14:32 WIB',
    potentialPoints: 3,
    status: 'valid',
    submittedOn: yesterday,
  }),
  createReport('RPT-0798', {
    plate: 'D 2901 FIT',
    violation: 'Parkir tidak sesuai marka',
    location: 'Zona Parkir FIT',
    reportTime: '13:15 WIB',
    potentialPoints: 1,
    status: 'rejected',
    rejectionReason: 'Lokasi kejadian tidak sesuai.',
    submittedOn: yesterday,
  }),
];

export const initialReports = [
  ...pendingReports,
  ...verifiedReports,
  ...rejectedReports,
  ...pastReports,
];

export const defaultReportId = 'RPT-0821';
const storageKey = 'tel-u-parkir.reports';

export function loadReports() {
  const savedReports = window.localStorage.getItem(storageKey);
  if (!savedReports) return initialReports;

  const parsedReports = JSON.parse(savedReports);
  if (!Array.isArray(parsedReports)) {
    throw new Error('Data laporan tersimpan tidak valid.');
  }
  return parsedReports;
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
