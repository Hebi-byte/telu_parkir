import React from 'react';

export default function LostItemCard({
  item,
  onClaimItem,
  onViewImageModal
}) {
  const {
    tag = 'Terkini',
    foto,
    judul = 'Ditemukan Kunci Honda Vario dengan gantungan Telkom di Parkiran FEB.',
    lokasiPenyimpanan = 'Diamankan di Pos Satpam Utama',
    waktu = '32 menit lalu'
  } = item || {};

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Info Kunci Tertinggal
          </h3>
          <span className="text-xs font-bold text-[#BE1E2D]">
            {tag}
          </span>
        </div>

        {/* Full-width Image */}
        <div
          onClick={() => onClaimItem ? onClaimItem() : onViewImageModal && onViewImageModal(foto, judul)}
          className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-gray-100 border border-[#EDE4E2] mb-4 cursor-pointer relative group"
          title="Klik untuk melihat detail atau klaim kunci"
        >
          <img
            src={foto}
            alt={judul}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-[#242424] leading-snug mb-2.5">
          {judul}
        </h4>

        {/* Storage Location in Red */}
        <p className="text-xs font-bold text-[#BE1E2D]">
          {lokasiPenyimpanan}
        </p>
      </div>

      {/* Time in Secondary Color at Bottom */}
      <div className="pt-8">
        <p className="text-xs text-[#8A7774] font-medium">
          {waktu}
        </p>
      </div>
    </div>
  );
}
