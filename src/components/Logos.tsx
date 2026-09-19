import React from 'react';

export const CareerClubLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 p-0.5 shadow-md shadow-emerald-950/40 ${className}`}>
      <div className="w-full h-full bg-[#0b1424] rounded-[10px] flex items-center justify-center overflow-hidden relative">
        {/* Textile thread pattern in logo */}
        <svg viewBox="0 0 40 40" className="w-4/5 h-4/5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          {/* Stylized Weaver Shuttle & Career Pathway */}
          <path d="M8 20 Q 20 6, 32 20 Q 20 34, 8 20 Z" className="text-emerald-500" fill="rgba(16,185,129,0.15)" />
          <line x1="20" y1="8" x2="20" y2="32" stroke="#4ade80" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="4" fill="#10b981" />
          <path d="M12 16 L28 24 M12 24 L28 16" stroke="#a7f3d0" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

export const BtecEmblem: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 p-0.5 shadow-md shadow-blue-950/40 ${className}`}>
      <div className="w-full h-full bg-[#091222] rounded-[10px] flex flex-col items-center justify-center text-center p-1">
        <span className="text-[9px] font-black tracking-widest text-cyan-400 font-display leading-none">BTEC</span>
        <span className="text-[6px] tracking-tighter text-slate-300 font-medium">BARISHAL</span>
      </div>
    </div>
  );
};

export const TextilePatternOrnament: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="textileGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400" />
            <circle cx="10" cy="10" r="1.5" fill="#34d399" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#textileGrid)" />
      </svg>
    </div>
  );
};
