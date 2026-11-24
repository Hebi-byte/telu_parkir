import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ChevronDown,
  Info,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getViolationManagementData, violationSemesters } from '../data/violationManagementData';

const followUpStatuses = ['Perlu pembinaan', 'Peringatan dikirim', 'Dalam pemantauan'];
const followUpFilterOptions = [
  { value: 'all', label: 'Semua status tindak lanjut' },
  { value: 'required', label: 'Perlu tindak lanjut' },
  ...followUpStatuses.map((status) => ({ value: status, label: status })),
];
const sortOptions = [
  { value: 'points-desc', label: 'Poin terbanyak' },
  { value: 'points-asc', label: 'Poin paling sedikit' },
  { value: 'reports-desc', label: 'Laporan terbanyak' },
  { value: 'name-asc', label: 'Nama A–Z' },
];

function getStatusType(status) {
  if (status === 'Perlu pembinaan') return 'warning';
  if (status === 'Peringatan dikirim') return 'info';
  return 'neutral';
}

function getSemesterLabel(semester) {
  return violationSemesters.find((item) => item.value === semester)?.label || semester;
}

function SummaryCard({ label, value, description, highlighted = false }) {
  return (
    <article className={`rounded-xl border border-[#EDE4E2] p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] ${
      highlighted ? 'bg-[#FCE8E8]' : 'bg-white'
    }`}>
      <p className="text-xs text-[#8A7774] sm:text-sm">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${highlighted ? 'text-[#BE1E2D]' : 'text-[#242424]'}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-[#8A7774]">{description}</p>
    </article>
  );
}

function StudentModal({ student, onClose, followUpStatus, onFollowUpStatusChange, onSubmit }) {
  if (!student) return null;

  const isFollowUp = Boolean(onFollowUpStatusChange);

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
        aria-labelledby="student-detail-title"
        className="max-h-[min(90vh,44rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">
              {isFollowUp ? 'Tindak Lanjut Prioritas' : 'Detail Mahasiswa'}
            </p>
            <h2 id="student-detail-title" className="mt-1 text-xl font-extrabold">{student.name}</h2>
            <p className="mt-1 text-xs text-[#8A7774]">{student.nim}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail mahasiswa"
            className="rounded-lg p-2 text-[#8A7774] hover:bg-[#FAF8F7]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <dl className="mt-5 grid gap-x-4 gap-y-3 border-t border-[#EDE4E2] pt-5 text-sm sm:grid-cols-[145px_minmax(0,1fr)]">
          <dt className="text-[#8A7774]">Plat kendaraan</dt>
          <dd className="font-semibold">{student.plate}</dd>
          <dt className="text-[#8A7774]">Akumulasi poin</dt>
          <dd className="font-semibold">{student.points} poin</dd>
          <dt className="text-[#8A7774]">Laporan valid</dt>
          <dd className="font-semibold">{student.validReportCount} laporan</dd>
          <dt className="text-[#8A7774]">Status tindak lanjut</dt>
          <dd>
            <StatusBadge type={getStatusType(followUpStatus)} className="px-2 py-1 text-[10px]">
              {followUpStatus}
            </StatusBadge>
          </dd>
        </dl>

        <div className="mt-5 border-t border-[#EDE4E2] pt-5">
          <h3 className="text-sm font-bold">Laporan yang disetujui</h3>
          <p className="mt-1 text-xs text-[#8A7774]">Hanya laporan valid yang dihitung ke dalam poin.</p>
          <ul className="mt-3 space-y-2">
            {student.reports.map((report) => (
              <li key={report.id} className="flex items-center justify-between gap-3 rounded-lg bg-[#FAF8F7] px-3 py-2 text-xs">
                <span className="min-w-0 truncate font-medium">{report.id} <span className="font-normal text-[#8A7774]">• {getSemesterLabel(report.semester)}</span></span>
                <span className="shrink-0 font-bold text-[#BE1E2D]">+{report.pointsApplied} poin</span>
              </li>
            ))}
          </ul>
        </div>

        {isFollowUp && (
          <form onSubmit={onSubmit} className="mt-5 border-t border-[#EDE4E2] pt-5">
            <p className="text-sm font-bold">Tindakan yang disarankan</p>
            <p className="mt-1 text-xs leading-relaxed text-[#8A7774]">{student.actionDescription}</p>
            <label className="mt-4 block text-xs font-semibold">
              Status tindak lanjut
              <span className="relative mt-2 block">
                <select
                  value={followUpStatus}
                  onChange={(event) => onFollowUpStatusChange(event.target.value)}
                  className="min-h-11 w-full appearance-none rounded-lg border border-[#EDE4E2] bg-white px-3.5 pr-9 text-sm font-normal outline-none focus:border-[#BE1E2D]"
                >
                  {followUpStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7774]" />
              </span>
            </label>
            <p className="mt-2 text-[10px] text-[#8A7774]">Perubahan disimpan sementara selama sesi demo.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]"
              >
                Simpan tindak lanjut
              </button>
            </div>
          </form>
        )}

        {!isFollowUp && (
          <div className="mt-6 flex justify-end border-t border-[#EDE4E2] pt-4">
            <button type="button" onClick={onClose} className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]">
              Tutup
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function AdminPelanggaran() {
  const [semester, setSemester] = useState('2024-genap');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ranking');
  const [sortOrder, setSortOrder] = useState('points-desc');
  const [showAll, setShowAll] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [followUpFilter, setFollowUpFilter] = useState('all');
  const [draftFollowUpFilter, setDraftFollowUpFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentModalType, setStudentModalType] = useState('details');
  const [followUpStatusesByNim, setFollowUpStatusesByNim] = useState({});
  const [draftFollowUpStatus, setDraftFollowUpStatus] = useState('');
  const [feedback, setFeedback] = useState('');

  const { students, approvedReportCount } = useMemo(
    () => getViolationManagementData(semester),
    [semester],
  );
  const followUpCount = students.filter((student) => student.followUpRequired).length;
  const priorityStudent = students
    .filter((student) => student.followUpRequired)
    .sort((a, b) => b.points - a.points)[0];

  const rankedStudents = useMemo(() => [...students].sort((a, b) => {
    if (sortOrder === 'points-asc') return a.points - b.points;
    if (sortOrder === 'reports-desc') return b.validReportCount - a.validReportCount || b.points - a.points;
    if (sortOrder === 'name-asc') return a.name.localeCompare(b.name, 'id');
    return b.points - a.points || b.validReportCount - a.validReportCount;
  }), [sortOrder, students]);

  const visibleStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('id-ID');
    return rankedStudents.filter((student) => {
      const currentStatus = followUpStatusesByNim[student.nim] || student.followUpStatus;
      const matchesSearch = !normalizedSearch
        || `${student.name} ${student.nim} ${student.plate}`.toLocaleLowerCase('id-ID').includes(normalizedSearch);
      const matchesFollowUp = followUpFilter === 'all'
        || (followUpFilter === 'required' && student.followUpRequired)
        || currentStatus === followUpFilter;
      const matchesTab = activeTab !== 'follow-up' || student.followUpRequired;
      return matchesSearch && matchesFollowUp && matchesTab;
    });
  }, [activeTab, followUpFilter, followUpStatusesByNim, rankedStudents, search]);

  const displayedStudents = showAll ? visibleStudents : visibleStudents.slice(0, 4);
  const hasActiveFilters = followUpFilter !== 'all';
  const selectedFollowUpStatus = selectedStudent
    ? followUpStatusesByNim[selectedStudent.nim] || selectedStudent.followUpStatus
    : '';

  function openFilters() {
    setDraftFollowUpFilter(followUpFilter);
    setFilterOpen(true);
  }

  function applyFilters(event) {
    event.preventDefault();
    setFollowUpFilter(draftFollowUpFilter);
    setShowAll(false);
    setFilterOpen(false);
  }

  function resetFilters() {
    setDraftFollowUpFilter('all');
    setFollowUpFilter('all');
    setShowAll(false);
  }

  function closeStudentModal() {
    setSelectedStudent(null);
  }

  function openStudentDetails(student) {
    setSelectedStudent(student);
    setStudentModalType('details');
  }

  function openFollowUp(student) {
    setSelectedStudent(student);
    setStudentModalType('follow-up');
    setDraftFollowUpStatus(followUpStatusesByNim[student.nim] || student.followUpStatus);
  }

  function saveFollowUp(event) {
    event.preventDefault();
    if (!selectedStudent || !draftFollowUpStatus) return;

    setFollowUpStatusesByNim((current) => ({
      ...current,
      [selectedStudent.nim]: draftFollowUpStatus,
    }));
    setFeedback(`Status tindak lanjut ${selectedStudent.name} diperbarui.`);
    closeStudentModal();
  }

  return (
    <div>
      <header className="mb-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">Disiplin Kampus</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Manajemen Pelanggaran</h1>
        <p className="mt-1.5 text-sm text-[#8A7774]">
          Pantau akumulasi poin dan tindak lanjut pelanggaran mahasiswa.
        </p>
      </header>

      <section aria-label="Statistik manajemen pelanggaran" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Mahasiswa tercatat"
          value={students.length}
          description="Memiliki laporan valid pada periode ini"
        />
        <SummaryCard
          label="Perlu pembinaan"
          value={followUpCount}
          description="Memerlukan tindak lanjut admin"
          highlighted
        />
        <SummaryCard
          label="Laporan valid"
          value={approvedReportCount}
          description="Laporan disetujui pada periode ini"
        />
      </section>

      <section aria-label="Pencarian dan filter mahasiswa" className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#EDE4E2] bg-white px-3.5 py-2.5 focus-within:border-[#BE1E2D]">
          <Search className="h-4 w-4 shrink-0 text-[#8A7774]" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowAll(false);
            }}
            placeholder="Cari nama, NIM, atau plat kendaraan"
            aria-label="Cari nama, NIM, atau plat kendaraan"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#8A7774]/70"
          />
        </label>
        <div className="flex min-w-0 gap-2">
          <label className="relative min-w-0 flex-1 sm:flex-none">
            <span className="sr-only">Pilih semester</span>
            <select
              value={semester}
              onChange={(event) => {
                setSemester(event.target.value);
                setShowAll(false);
              }}
              className="h-full min-h-11 w-full appearance-none rounded-lg border border-[#EDE4E2] bg-white py-2 pl-3 pr-9 text-xs font-semibold outline-none hover:border-[#BE1E2D] focus:border-[#BE1E2D] sm:w-auto"
            >
              {violationSemesters.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7774]" />
          </label>
          <button
            type="button"
            onClick={openFilters}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border bg-white px-3 text-xs font-semibold transition-colors ${
              hasActiveFilters ? 'border-[#BE1E2D] text-[#BE1E2D]' : 'border-[#EDE4E2] hover:border-[#BE1E2D]'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter{hasActiveFilters ? ' (1)' : ''}
          </button>
        </div>
      </section>

      {feedback && (
        <div role="status" className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-[#D9FBE4] px-3.5 py-2.5 text-xs text-[#087A36]">
          <span>{feedback}</span>
          <button type="button" onClick={() => setFeedback('')} aria-label="Tutup pemberitahuan">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.8fr)]">
        <section aria-labelledby="violation-ranking-title" className="min-w-0 rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 id="violation-ranking-title" className="text-sm font-extrabold sm:text-base">Peringkat pelanggaran</h2>
            <label className="relative self-start sm:self-auto">
              <span className="sr-only">Urutkan mahasiswa</span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="min-h-9 appearance-none rounded-lg border border-transparent bg-white py-1.5 pl-2 pr-7 text-[10px] font-semibold text-[#BE1E2D] outline-none hover:border-[#EDE4E2] focus:border-[#BE1E2D]"
              >
                {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#BE1E2D]" />
            </label>
          </div>

          <div className="mt-2 flex gap-1 border-b border-[#EDE4E2]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('ranking');
                setShowAll(false);
              }}
              aria-pressed={activeTab === 'ranking'}
              className={`rounded-t-lg px-3 py-2 text-[10px] font-bold transition-colors ${
                activeTab === 'ranking' ? 'bg-[#BE1E2D] text-white' : 'text-[#554a48] hover:bg-[#F5F2F0]'
              }`}
            >
              Peringkat poin
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('follow-up');
                setShowAll(false);
              }}
              aria-pressed={activeTab === 'follow-up'}
              className={`rounded-t-lg px-3 py-2 text-[10px] font-bold transition-colors ${
                activeTab === 'follow-up' ? 'bg-[#BE1E2D] text-white' : 'text-[#554a48] hover:bg-[#F5F2F0]'
              }`}
            >
              Tindak lanjut ({followUpCount})
            </button>
          </div>

          {displayedStudents.length > 0 ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[610px] border-collapse text-left text-xs">
                <thead className="bg-[#F5F2F0] text-[10px] font-semibold text-[#554a48]">
                  <tr>
                    <th scope="col" className="px-2.5 py-3">Mahasiswa / NIM</th>
                    <th scope="col" className="px-2.5 py-3">Plat kendaraan</th>
                    <th scope="col" className="px-2.5 py-3">Poin / Laporan</th>
                    <th scope="col" className="px-2.5 py-3">Tindak lanjut</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.map((student, index) => {
                    const status = followUpStatusesByNim[student.nim] || student.followUpStatus;
                    const rank = rankedStudents.findIndex((rankedStudent) => rankedStudent.nim === student.nim) + 1;
                    return (
                      <tr key={student.nim} className="border-b border-[#EDE4E2] last:border-0">
                        <td className="px-2.5 py-3.5">
                          <button
                            type="button"
                            onClick={() => openStudentDetails(student)}
                            className="text-left font-semibold hover:text-[#BE1E2D] hover:underline"
                          >
                            #{rank || index + 1} {student.name}
                          </button>
                          <p className="mt-0.5 text-[10px] text-[#8A7774]">{student.nim}</p>
                        </td>
                        <td className="px-2.5 py-3.5 text-[10px]">{student.plate}</td>
                        <td className="px-2.5 py-3.5 text-[10px]">
                          {student.points} <span className="mx-1">•</span> {student.validReportCount} valid
                        </td>
                        <td className="px-2.5 py-3.5">
                          <StatusBadge type={getStatusType(status)} className="whitespace-nowrap px-2 py-1 text-[9px]">
                            {status}
                          </StatusBadge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-3 rounded-lg border border-dashed border-[#EDE4E2] px-4 py-10 text-center">
              <Search className="mx-auto h-5 w-5 text-[#8A7774]" />
              <p className="mt-2 text-sm font-semibold">Mahasiswa tidak ditemukan</p>
              <p className="mt-1 text-xs text-[#8A7774]">Coba ubah pencarian, semester, atau filter tindak lanjut.</p>
              {(search || hasActiveFilters) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    resetFilters();
                  }}
                  className="mt-3 text-xs font-semibold text-[#BE1E2D] hover:underline"
                >
                  Hapus pencarian dan filter
                </button>
              )}
            </div>
          )}

          {visibleStudents.length > 4 && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#EDE4E2] pt-3">
              <p className="text-[10px] text-[#8A7774]">
                Menampilkan {displayedStudents.length} dari {visibleStudents.length} mahasiswa
              </p>
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="text-[10px] font-semibold text-[#BE1E2D] hover:underline"
              >
                {showAll ? 'Tampilkan lebih sedikit' : 'Lihat semua'} <span aria-hidden="true">›</span>
              </button>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <section aria-labelledby="priority-follow-up-title" className="rounded-xl border border-[#EDE4E2] bg-white p-4 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-5">
            <h2 id="priority-follow-up-title" className="text-sm font-extrabold">Tindak lanjut prioritas</h2>
            {priorityStudent ? (
              <>
                <StatusBadge type="warning" className="mt-3 px-2 py-1 text-[9px]">
                  {priorityStudent.points} poin
                </StatusBadge>
                <h3 className="mt-3 text-base font-extrabold">{priorityStudent.name}</h3>
                <p className="mt-1 text-xs">{priorityStudent.plate}</p>
                <p className="mt-3 text-xs text-[#8A7774]">
                  {priorityStudent.validReportCount} pelanggaran terverifikasi. {priorityStudent.actionDescription}
                </p>
                <button
                  type="button"
                  onClick={() => openFollowUp(priorityStudent)}
                  className="mt-4 min-h-10 rounded-lg bg-[#BE1E2D] px-3.5 text-xs font-bold text-white hover:bg-[#A51020]"
                >
                  <span className="mr-1.5" aria-hidden="true">→</span> Tinjau &amp; tindak lanjuti
                </button>
              </>
            ) : (
              <p className="mt-3 text-xs leading-relaxed text-[#8A7774]">
                Belum ada mahasiswa yang memerlukan tindak lanjut pada semester ini.
              </p>
            )}
          </section>

          <section className="flex gap-2.5 rounded-xl border border-[#F4B4B8] bg-[#FCE8E8] p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#BE1E2D]" />
            <div>
              <h2 className="text-xs font-extrabold text-[#BE1E2D]">Reduksi poin otomatis</h2>
              <p className="mt-1 text-[10px] leading-relaxed text-[#8A7774]">
                Poin berkurang 10 setiap bulan tanpa pelanggaran. Hanya laporan yang disetujui masuk ke peringkat.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[10px] text-[#8A7774]">
        <AlertCircle className="h-3 w-3 shrink-0" />
        Identitas lengkap hanya terlihat oleh petugas berwenang.
      </p>

      {filterOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFilterOpen(false);
          }}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="violation-filter-title"
            onSubmit={applyFilters}
            className="w-full max-w-md rounded-2xl border border-[#EDE4E2] bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Penyaringan</p>
                <h2 id="violation-filter-title" className="mt-1 text-xl font-extrabold">Filter pelanggaran</h2>
              </div>
              <button type="button" onClick={() => setFilterOpen(false)} aria-label="Tutup filter">
                <X className="h-5 w-5 text-[#8A7774]" />
              </button>
            </div>
            <label className="mt-5 block text-xs font-semibold">
              Status tindak lanjut
              <select
                value={draftFollowUpFilter}
                onChange={(event) => setDraftFollowUpFilter(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border border-[#EDE4E2] bg-white px-3.5 text-sm font-normal outline-none focus:border-[#BE1E2D]"
              >
                {followUpFilterOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={resetFilters} className="min-h-10 rounded-lg border border-[#EDE4E2] px-4 text-xs font-semibold">
                Reset
              </button>
              <button type="submit" className="min-h-10 rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]">
                Terapkan filter
              </button>
            </div>
          </form>
        </div>
      )}

      <StudentModal
        student={selectedStudent}
        onClose={closeStudentModal}
        followUpStatus={studentModalType === 'follow-up' ? draftFollowUpStatus : selectedFollowUpStatus}
        onFollowUpStatusChange={studentModalType === 'follow-up' ? setDraftFollowUpStatus : undefined}
        onSubmit={studentModalType === 'follow-up' ? saveFollowUp : undefined}
      />
    </div>
  );
}
