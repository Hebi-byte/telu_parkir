import React from 'react';

export default function StatusBadge({ type = 'success', children, showDot = true, icon: Icon, className = '' }) {
  const styles = {
    success: 'bg-[#D9FBE4] text-[#087A36] border border-[#c4f2d1]',
    warning: 'bg-[#FCE8E8] text-[#BE1E2D] border border-[#fbd0d0]',
    info: 'bg-[#EBF3FF] text-[#1D4ED8] border border-[#bfdbfe]',
    neutral: 'bg-[#F5F2F0] text-[#554a48] border border-[#EDE4E2]',
  };

  const dotColors = {
    success: 'bg-[#087A36]',
    warning: 'bg-[#BE1E2D]',
    info: 'bg-[#1D4ED8]',
    neutral: 'bg-[#8A7774]',
  };

  const currentStyle = styles[type] || styles.neutral;
  const currentDot = dotColors[type] || dotColors.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold tracking-normal ${currentStyle} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${currentDot}`} />}
      {Icon && <Icon className="w-3 h-3 stroke-[2.5]" />}
      <span>{children}</span>
    </span>
  );
}
