import React from 'react';
import { Plus } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function WelcomeSection({
  mahasiswa,
  onOpenReportModal
}) {
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
