import { Link } from 'react-router-dom';

export default function AdminModulePage({ title }) {
  return (
    <section className="rounded-2xl border border-[#EDE4E2] bg-white p-6 shadow-[0_2px_8px_rgba(36,36,36,0.02)] sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-wider text-[#BE1E2D]">Portal Admin</p>
      <h1 className="mt-2 text-2xl font-extrabold">{title}</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8A7774]">
        Modul ini belum tersedia pada tahap dashboard. Data dan alur operasionalnya siap dihubungkan pada tahap integrasi berikutnya.
      </p>
      <Link
        to="/admin/dashboard"
        className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-[#BE1E2D] px-4 text-xs font-bold text-white hover:bg-[#A51020]"
      >
        Kembali ke Dashboard
      </Link>
    </section>
  );
}
