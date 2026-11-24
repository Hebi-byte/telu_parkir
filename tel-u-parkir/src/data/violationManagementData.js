const currentSemester = '2024-genap';
const previousSemester = '2024-ganjil';

const priorityStudents = [
  {
    name: 'Fajar Pratama',
    nim: '1301213091',
    plate: 'D 5482 UBW',
    approvedPoints: [4, 4, 4, 4, 3, 3, 3, 3],
    followUpRequired: true,
    followUpStatus: 'Perlu pembinaan',
    actionDescription: 'Jadwalkan pembinaan dan kirim pemberitahuan resmi kepada mahasiswa.',
  },
  {
    name: 'Bagas Saputra',
    nim: '1301213072',
    plate: 'D 2218 ADF',
    approvedPoints: [4, 4, 4, 4, 3],
    followUpRequired: true,
    followUpStatus: 'Peringatan dikirim',
    actionDescription: 'Pastikan mahasiswa menerima peringatan dan catat tindak lanjut berikutnya.',
  },
  {
    name: 'Rizky Ramadhan',
    nim: '1301213056',
    plate: 'D 6130 UCH',
    approvedPoints: [4, 4, 3, 3],
    followUpRequired: true,
    followUpStatus: 'Dalam pemantauan',
    actionDescription: 'Pantau laporan berikutnya dan dokumentasikan hasil pemantauan.',
  },
  {
    name: 'Dimas Arya',
    nim: '1301213064',
    plate: 'D 3901 ZBK',
    approvedPoints: [4, 4, 4],
    followUpRequired: false,
    followUpStatus: 'Dalam pemantauan',
    actionDescription: '',
  },
];

const otherStudentNames = [
  'Aulia Putri', 'Rendra Aditya', 'Siti Nabila', 'Farhan Maulana',
  'Nanda Pratama', 'Dewa Saputra', 'Putri Amelia', 'Naufal Akbar',
  'Muhammad Rifqi', 'Zaskia Putri', 'Arif Ramadhan', 'Dinda Lestari',
  'Rafi Kurniawan', 'Nisa Azzahra', 'Fikri Hidayat', 'Tasya Maharani',
  'Bima Prakoso', 'Nadia Safitri', 'Rizal Firmansyah', 'Citra Anggraini',
  'Ilham Maulana', 'Syifa Aprilia', 'Aditya Nugraha', 'Rara Puspita',
  'Galih Pratama', 'Salma Khairunnisa', 'Yoga Permana', 'Maya Anindita',
];

const studentSeeds = [
  ...priorityStudents,
  ...otherStudentNames.map((name, index) => ({
    name,
    nim: `120222${String(2001 + index).padStart(4, '0')}`,
    plate: `D ${String(4100 + index * 19).padStart(4, '0')} ${['TLU', 'FIT', 'ABC', 'TEL'][index % 4]}`,
    approvedPoints: index < 10 ? [3, 1, 1] : [3, 2],
    followUpRequired: false,
    followUpStatus: 'Dalam pemantauan',
    actionDescription: '',
  })),
];

const currentSemesterReports = studentSeeds.flatMap((student) => (
  student.approvedPoints.map((pointsApplied, index) => ({
    id: `RPT-G-${student.nim}-${index + 1}`,
    studentNim: student.nim,
    status: 'valid',
    pointsApplied,
    semester: currentSemester,
  }))
));

const previousSemesterReports = studentSeeds.slice(0, 12).map((student, index) => ({
  id: `RPT-L-${student.nim}`,
  studentNim: student.nim,
  status: 'valid',
  pointsApplied: (index % 3) + 1,
  semester: previousSemester,
}));

const nonApprovedReports = [
  {
    id: 'RPT-PENDING-001',
    studentNim: priorityStudents[0].nim,
    status: 'pending',
    potentialPoints: 8,
    semester: currentSemester,
  },
  {
    id: 'RPT-REJECTED-001',
    studentNim: priorityStudents[0].nim,
    status: 'rejected',
    potentialPoints: 7,
    semester: currentSemester,
  },
];

const mockReports = [
  ...currentSemesterReports,
  ...previousSemesterReports,
  ...nonApprovedReports,
];

export const violationSemesters = [
  { value: 'all', label: 'Semua semester' },
  { value: currentSemester, label: 'Semester Genap 2024/2025' },
  { value: previousSemester, label: 'Semester Ganjil 2024/2025' },
];

export function getViolationManagementData(semester = currentSemester) {
  const approvedReports = mockReports.filter((report) => (
    report.status === 'valid'
    && Number.isFinite(report.pointsApplied)
    && (semester === 'all' || report.semester === semester)
  ));

  const students = studentSeeds.flatMap((student) => {
    const reports = approvedReports.filter((report) => report.studentNim === student.nim);
    if (reports.length === 0) return [];

    return [{
      ...student,
      reports,
      validReportCount: reports.length,
      points: reports.reduce((total, report) => total + report.pointsApplied, 0),
    }];
  });

  return { students, approvedReportCount: approvedReports.length };
}
