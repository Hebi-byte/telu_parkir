import { Link } from 'react-router-dom';
import { ArrowRight, KeyRound, MapPin } from 'lucide-react';

export default function KehilanganSatpam() {
  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#BE1E2D]">
          Bantuan Kunci <span className="mx-1">•</span> Portal Satpam
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Kehilangan Kunci</h1>
        <p className="mt-2 text-sm text-[#8A7774]">
          Laporkan kehilangan atau penemuan kunci kendaraan di lingkungan kampus.
        </p>
      </header>

      <section className="max-w-3xl rounded-xl border border-[#EDE4E2] bg-white p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FCE8E8] text-[#BE1E2D]">
            <KeyRound className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold">Butuh bantuan menemukan kunci?</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#8A7774]">
              Buat laporan dengan detail ciri kunci, lokasi, dan waktu kejadian agar petugas keamanan dapat menindaklanjuti.
            </p>
            <p className="mt-3 flex items-center gap-2 text-xs text-[#8A7774]">
              <MapPin className="h-4 w-4 shrink-0 text-[#BE1E2D]" />
              Laporan ditangani petugas keamanan Tel-U Parkir.
            </p>
            <Link
              to="/satpam/kehilangan/buat-laporan"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#BE1E2D] px-4 text-sm font-bold text-white transition-colors hover:bg-[#A51020]"
            >
              Buat Laporan Kunci <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
