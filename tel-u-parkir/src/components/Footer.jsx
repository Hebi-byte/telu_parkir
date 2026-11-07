import React from 'react';

export default function Footer({ footerInfo }) {
  const leftText = footerInfo?.kiri || 'Tel-U Parkir • Unit Logistik & Keamanan Telkom University';
  const rightText = footerInfo?.kanan || 'Kampus Purwokerto';

  return (
    <footer className="mt-8 pt-6 pb-8 border-t border-[#EDE4E2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A7774]">
      <div className="flex items-center gap-2 text-center sm:text-left">
        <span>{leftText}</span>
      </div>
      <div className="font-medium text-center sm:text-right">
        <span>{rightText}</span>
      </div>
    </footer>
  );
}
