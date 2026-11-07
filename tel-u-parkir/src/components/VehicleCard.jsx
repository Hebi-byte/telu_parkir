import React from 'react';
import { Plus } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function VehicleCard({
  kendaraan,
  onAddVehicle,
  onManageVehicle
}) {
  const {
    nama = 'Honda Vario 160',
    platNomor = 'D 4521 TLU',
    status = 'Terverifikasi',
    rfidStatus = 'RFID Active',
    aksesParkir = 'Valid • Roda dua',
  } = kendaraan || {};

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDE4E2] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div>
        {/* Header with Title & Action */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs sm:text-sm font-semibold text-[#8A7774]">
            Kendaraan Terdaftar
          </h3>
          <button
            onClick={onAddVehicle}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#BE1E2D] hover:text-[#A51020] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Tambah Kendaraan</span>
          </button>
        </div>

        {/* Vehicle Header & Verification Status */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xl font-extrabold text-[#242424] tracking-tight">
            {nama}
          </span>

          <StatusBadge type="success">
            {status}
          </StatusBadge>
        </div>

        {/* License Plate Container */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-[#F5F2F0] border border-[#EDE4E2] text-center font-bold text-base sm:text-lg text-[#242424] tracking-widest mb-4">
          {platNomor}
        </div>

        {/* Key-Value Specs */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#8A7774] font-medium">Status RFID</span>
            <span className="font-bold text-[#242424]">{rfidStatus}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8A7774] font-medium">Akses parkir</span>
            <span className="font-bold text-[#242424]">{aksesParkir}</span>
          </div>
        </div>
      </div>

      {/* Action Button: Kelola Kendaraan */}
      <div className="mt-4 pt-3">
        <button
          onClick={onManageVehicle}
          className="w-full py-2.5 px-4 rounded-xl border border-[#EDE4E2] bg-white hover:bg-[#FAF8F7] text-xs font-bold text-[#BE1E2D] transition-colors text-center cursor-pointer shadow-2xs"
        >
          Kelola Kendaraan
        </button>
      </div>
    </div>
  );
}
