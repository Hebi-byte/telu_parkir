import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function LeaderboardCard({
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

        {/* Main Stat: Rank #14 dari 850 Mahasiswa */}
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
