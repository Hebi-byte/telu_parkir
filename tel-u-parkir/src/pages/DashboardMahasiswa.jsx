import React, { useState } from 'react';
import WelcomeSection from '../components/WelcomeSection';
import SummaryCard from '../components/SummaryCard';
import VehicleCard from '../components/VehicleCard';
import ViolationCard from '../components/ViolationCard';
import LostItemCard from '../components/LostItemCard';
import LeaderboardCard from '../components/LeaderboardCard';
import {
  ReportParkingModal,
  AddVehicleModal,
  ManageVehicleModal,
  ObjectionModal,
  ClaimItemModal,
  LeaderboardModal,
  ImageViewerModal
} from '../components/Modals';

export default function DashboardMahasiswa({
  data,
  onNavigateMenu
}) {
  const [dashboardState, setDashboardState] = useState(data);

  // Modals state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [manageVehicleModalOpen, setManageVehicleModalOpen] = useState(false);
  const [objectionModalOpen, setObjectionModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [imageViewer, setImageViewer] = useState({ isOpen: false, src: '', title: '' });

  // Handle open objection modal with specific violation
  const handleOpenObjection = (violation) => {
    setSelectedViolation(violation);
    setObjectionModalOpen(true);
  };

  // Handle image viewer
  const handleViewImage = (src, title) => {
    setImageViewer({ isOpen: true, src, title });
  };

  // Handle adding new vehicle
  const handleAddVehicleSuccess = (newVehicle) => {
    setDashboardState((prev) => ({
      ...prev,
      kendaraan: {
        ...prev.kendaraan,
        nama: newVehicle.nama,
        platNomor: newVehicle.platNomor,
        status: 'Menunggu Verifikasi',
        rfidStatus: 'Proses Registrasi',
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section */}
      <WelcomeSection
        mahasiswa={dashboardState.mahasiswa}
        onOpenReportModal={() => setReportModalOpen(true)}
      />

      {/* 2. Top Summary Cards (2 Columns with balanced proportion) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1 — Total Akumulasi */}
        <SummaryCard data={dashboardState.akumulasiPoin} />

        {/* CARD 2 — Kendaraan Terdaftar */}
        <VehicleCard
          kendaraan={dashboardState.kendaraan}
          onAddVehicle={() => setAddVehicleModalOpen(true)}
          onManageVehicle={() => setManageVehicleModalOpen(true)}
        />
      </div>

      {/* 3. Lower Section: Riwayat Pelanggaran & Peringkat (Left) + Info Kunci Tertinggal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Riwayat Pelanggaran + Peringkat Ketidakpatuhan */}
        <div className="flex flex-col gap-6">
          {/* CARD 3 — Riwayat Pelanggaran */}
          <ViolationCard
            violations={dashboardState.riwayatPelanggaran}
            onOpenObjectionModal={handleOpenObjection}
            onViewImageModal={handleViewImage}
          />

          {/* CARD 5 — Peringkat Ketidakpatuhan Parkir */}
          <LeaderboardCard
            data={dashboardState.peringkatKetidakpatuhan}
            onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
          />
        </div>

        {/* Right Column: CARD 4 — Info Kunci Tertinggal */}
        <div className="h-full">
          <LostItemCard
            item={dashboardState.kunciTertinggal}
            onClaimItem={() => setClaimModalOpen(true)}
            onViewImageModal={handleViewImage}
          />
        </div>
      </div>

      {/* Interactive Modals */}
      <ReportParkingModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <AddVehicleModal
        isOpen={addVehicleModalOpen}
        onClose={() => setAddVehicleModalOpen(false)}
        onAddSuccess={handleAddVehicleSuccess}
      />

      <ManageVehicleModal
        isOpen={manageVehicleModalOpen}
        onClose={() => setManageVehicleModalOpen(false)}
        kendaraan={dashboardState.kendaraan}
      />

      <ObjectionModal
        isOpen={objectionModalOpen}
        onClose={() => setObjectionModalOpen(false)}
        violation={selectedViolation}
      />

      <ClaimItemModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        item={dashboardState.kunciTertinggal}
      />

      <LeaderboardModal
        isOpen={leaderboardModalOpen}
        onClose={() => setLeaderboardModalOpen(false)}
      />

      <ImageViewerModal
        isOpen={imageViewer.isOpen}
        onClose={() => setImageViewer({ isOpen: false, src: '', title: '' })}
        src={imageViewer.src}
        title={imageViewer.title}
      />
    </div>
  );
}
