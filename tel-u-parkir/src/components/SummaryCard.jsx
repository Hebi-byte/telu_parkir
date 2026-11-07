import React from 'react';
import { ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function SummaryCard({ data }) {
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
