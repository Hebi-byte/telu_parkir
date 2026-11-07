import React from 'react';
import { FileEdit } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ViolationCard({
  violations = [],
  onOpenObjectionModal,
  onViewImageModal
}) {
  const currentViolation = violations[0] || {
    jenis: 'Menghalangi Akses Kendaraan',
    lokasi: 'Gedung Tokong Nanas (GKU)',
    tanggal: '24 Mar 2025',
    waktu: '09:42 WIB',
    poin: '+4 Poin',
    status: 'Terverifikasi Satpam',
    batasSanggah: 'Batas sanggah: 1 hari lagi',
    fotoBukti: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Riwayat Pelanggaran
          </h3>
          <span className="text-xs font-bold text-[#BE1E2D] cursor-pointer hover:underline">
            Bulan Ini
          </span>
        </div>

        {/* Violation Detail Item */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Photo Thumbnail */}
          <div
            onClick={() => onViewImageModal && onViewImageModal(currentViolation.fotoBukti, currentViolation.jenis)}
            className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-gray-100 border border-[#EDE4E2] shrink-0 cursor-pointer relative group"
            title="Klik untuk memperbesar foto bukti"
          >
            <img
              src={currentViolation.fotoBukti}
              alt="Bukti Pelanggaran"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FCE8E8] text-[#BE1E2D] border border-[#fbd0d0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2D]" />
                <span>1 Baru</span>
              </span>
              <span className="text-sm font-extrabold text-[#BE1E2D]">
                {currentViolation.poin}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-[#242424] leading-snug">
              {currentViolation.jenis}
            </h4>

            {/* Location */}
            <p className="text-xs text-[#8A7774] font-medium">
              {currentViolation.lokasi}
            </p>

            {/* Date & Time */}
            <p className="text-xs text-[#8A7774] font-medium">
              {currentViolation.tanggal} • {currentViolation.waktu}
            </p>

            {/* Verification Status */}
            <div className="pt-1">
              <StatusBadge type="success">
                {currentViolation.status}
              </StatusBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-5 pt-3.5 border-t border-[#EDE4E2]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#8A7774]">
          {currentViolation.batasSanggah}
        </p>

        <button
          onClick={() => onOpenObjectionModal && onOpenObjectionModal(currentViolation)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#BE1E2D] text-xs font-bold text-[#BE1E2D] bg-white hover:bg-[#FCE8E8]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <FileEdit className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Ajukan Keberatan</span>
        </button>
      </div>
    </div>
  );
}
