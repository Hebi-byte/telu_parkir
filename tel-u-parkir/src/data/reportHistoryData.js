import { loadReports } from './reportData';

export function getReportHistory() {
  return loadReports().map((report) => ({
    ...report,
    handledBy: report.status === 'pending'
      ? 'Belum ditangani'
      : report.handledBy || 'Budi Santoso',
  }));
}
