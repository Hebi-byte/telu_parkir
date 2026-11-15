import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import { leaderboardPodium, leaderboardRows } from '../data/leaderboardData';

const columns = [
  { key: 'peringkat', label: 'Peringkat', numeric: true },
  { key: 'mahasiswa', label: 'Mahasiswa' },
  { key: 'laporanValid', label: 'Laporan valid', numeric: true },
  { key: 'pelanggaran', label: 'Pelanggaran' },
  { key: 'poin', label: 'Poin', numeric: true },
];

function SortableHeading({ column, active, direction, onSort }) {
  const sortIcon = active
    ? direction === 'asc'
      ? <ArrowUp className="w-3 h-3" />
      : <ArrowDown className="w-3 h-3" />
    : null;

  return (
    <th
      scope="col"
      aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
      className="px-4 py-3 text-left font-semibold"
    >
      <button
        type="button"
        onClick={() => onSort(column.key)}
        className="inline-flex items-center gap-1.5 text-left hover:text-[#BE1E2D] transition-colors"
      >
        {column.label}
        {sortIcon}
      </button>
    </th>
  );
}

function PodiumCard() {
  return (
    <section className="rounded-xl border border-[#EDE4E2] bg-white p-5 sm:p-6">
      <h2 className="text-sm font-bold text-[#242424]">Akumulasi poin tertinggi</h2>
      <div className="mt-5 grid grid-cols-3 items-end gap-2 sm:gap-4">
        {leaderboardPodium.map((student) => {
          const isFirst = student.rank === 1;
          const podiumHeight = isFirst ? 'h-[108px]' : student.rank === 2 ? 'h-[82px]' : 'h-[70px]';

          return (
            <div key={student.rank} className="min-w-0 text-center">
              <p className="truncate text-[11px] font-bold text-[#242424] sm:text-xs">{student.nama}</p>
              <p className="mt-1 text-[10px] text-[#8A7774]">{student.laporanValid} Valid</p>
              <div className={`mt-2 flex ${podiumHeight} flex-col items-center justify-center rounded-t-lg ${
                isFirst ? 'bg-[#FCE8E8]' : 'bg-[#F2EFEE]'
              }`}>
                <span className={`text-[10px] font-bold ${isFirst ? 'text-[#BE1E2D]' : 'text-[#BE1E2D]'}`}>
                  {isFirst ? 'TOP #1' : `#${student.rank}`}
                </span>
                <span className={`mt-1 text-2xl font-extrabold leading-none ${isFirst ? 'text-[#A51020]' : 'text-[#242424]'}`}>
                  {student.poin}
                </span>
                <span className="mt-1 text-[10px] text-[#242424]">Poin</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MyPositionCard({ mahasiswa, poin }) {
  const namaSingkat = mahasiswa?.nama?.split(' ')[0] || 'Mahasiswa';
  const inisial = mahasiswa?.nama?.split(' ').at(-1)?.charAt(0) || '';

  return (
    <section className="rounded-xl border border-[#EDE4E2] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-[#242424]">Posisi Anda: #14</h2>
        <span className="rounded-full bg-[#D9FBE4] px-2.5 py-1 text-[10px] font-bold text-[#087A36]">● Aktif</span>
      </div>
      <p className="mt-4 text-xs text-[#8A7774]">Tren: Tetap</p>
      <p className="mt-3 text-lg font-extrabold text-[#242424]">{namaSingkat} {inisial}.</p>
      <p className="mt-2 text-[10px] leading-relaxed text-[#8A7774]">
        {mahasiswa?.nim} &bull; {mahasiswa?.prodi}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold leading-none text-[#A51020]">{poin}</span>
        <span className="text-[10px] font-semibold text-[#242424]">Poin &bull; 1 Laporan</span>
      </div>
      <p className="mt-4 text-[10px] text-[#8A7774]">Waktu reduksi poin otomatis (-10)</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F0ECEB]">
        <div className="h-full w-[40%] rounded-full bg-[#BE1E2D]" />
      </div>
      <p className="mt-3 text-[10px] font-semibold text-[#BE1E2D]">18 Hari Lagi</p>
    </section>
  );
}

export default function LeaderboardMahasiswa({ mahasiswa, poin }) {
  const [sort, setSort] = useState({ key: 'poin', direction: 'desc' });

  const sortedRows = useMemo(() => {
    return [...leaderboardRows].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      const comparison = typeof left === 'number'
        ? left - right
        : String(left).localeCompare(String(right), 'id');

      return comparison * (sort.direction === 'asc' ? 1 : -1);
    });
  }, [sort]);

  const handleSort = (key) => {
    setSort((current) => ({
      key,
      direction: current.key === key
        ? current.direction === 'asc' ? 'desc' : 'asc'
        : key === 'peringkat' ? 'asc' : 'desc',
    }));
  };

  const sortDescription = {
    peringkat: `peringkat ${sort.direction === 'asc' ? 'terkecil' : 'terbesar'}`,
    mahasiswa: `nama ${sort.direction === 'asc' ? 'A-Z' : 'Z-A'}`,
    laporanValid: `laporan valid ${sort.direction === 'desc' ? 'terbanyak' : 'tersedikit'}`,
    pelanggaran: `jenis pelanggaran ${sort.direction === 'asc' ? 'A-Z' : 'Z-A'}`,
    poin: `poin ${sort.direction === 'desc' ? 'terbanyak' : 'tersedikit'}`,
  }[sort.key];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#BE1E2D]">
          Disiplin Kampus &bull; Update Harian
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#242424] sm:text-3xl">
          Leaderboard Pelanggaran
        </h1>
        <p className="mt-1 text-xs text-[#8A7774]">
          Peringkat akumulasi poin pelanggaran terverifikasi satpam.
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-xl bg-[#FCE8E8] px-4 py-3.5 text-[#BE1E2D]">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="text-xs font-bold">Aturan kampus</p>
          <p className="mt-1 text-[10px] leading-relaxed text-[#8A7774]">
            Poin berkurang -10 tiap bulan tanpa pelanggaran. Identitas NIM disamarkan sesuai PRD 7.4.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[2fr_1fr]">
        <PodiumCard />
        <MyPositionCard mahasiswa={mahasiswa} poin={poin} />
      </div>

      <section className="overflow-hidden rounded-xl border border-[#EDE4E2] bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#242424]">Peringkat 4 &ndash; 10</h2>
          <p className="text-[10px] font-bold text-[#BE1E2D]" aria-live="polite">
            Urut {sortDescription}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-[10px] text-[#242424]">
            <thead className="bg-[#F5F2F1] text-[#8A7774]">
              <tr>
                {columns.map((column) => (
                  <SortableHeading
                    key={column.key}
                    column={column}
                    active={sort.key === column.key}
                    direction={sort.direction}
                    onSort={handleSort}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.peringkat} className="border-b border-[#EDE4E2] last:border-b-0">
                  <td className="px-4 py-3.5 font-semibold">{row.peringkat}</td>
                  <td className="px-4 py-3.5 font-medium">{row.mahasiswa}</td>
                  <td className="px-4 py-3.5">{row.laporanValid} Lap.</td>
                  <td className="px-4 py-3.5">{row.pelanggaran}</td>
                  <td className="px-4 py-3.5 font-bold text-[#BE1E2D]">{row.poin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-lg bg-[#FCE8E8] px-4 py-3 text-[#BE1E2D]">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p className="text-[10px] leading-relaxed text-[#8A7774]">
          Poin pelanggaran mempengaruhi eligibility rekomendasi beasiswa &amp; akses stiker parkir prioritas gedung kuliah bersama.
        </p>
      </div>
    </div>
  );
}
