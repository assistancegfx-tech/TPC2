import React from 'react';
import { PageRoute, SubmittedRecord } from '../types';
import { CheckCircle2, Download, Printer, Home, PlusCircle, Calendar, MapPin, ShieldCheck, FileText } from 'lucide-react';
import { CareerClubLogo, BtecEmblem } from '../components/Logos';

interface SuccessPageProps {
  submittedRecord: SubmittedRecord | null;
  onNavigate: (route: PageRoute) => void;
  onResetRegistration: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  submittedRecord,
  onNavigate,
  onResetRegistration
}) => {
  const regId = submittedRecord?.registrationId || 'TEX2026-001';
  const eventDate = '4 October 2026';
  const venue = 'Barishal Textile Engineering College Auditorium';
  const paymentStatus = 'Pending Verification';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDetails = () => {
    const content = `=====================================================
TEXTILE PRESENTATION COMPETITION 2026 - REGISTRATION SLIP
Organized by: Career Club BTEC
Institution: Barishal Textile Engineering College
=====================================================

REGISTRATION ID: ${regId}
SUBMISSION TIME: ${submittedRecord?.submissionDate || new Date().toLocaleString()}
PAYMENT STATUS: ${paymentStatus}

EVENT DETAILS:
- Event: Textile Presentation Competition 2026
- Date: ${eventDate}
- Venue: ${venue}

-----------------------------------------------------
TEAM COMPOSITION:
-----------------------------------------------------

1. GROUP LEADER:
   - Full Name: ${submittedRecord?.groupLeader.fullName || 'N/A'}
   - Roll Number: ${submittedRecord?.groupLeader.rollNumber || 'N/A'}
   - Department: ${submittedRecord?.groupLeader.department || 'N/A'}
   - WhatsApp: ${submittedRecord?.groupLeader.whatsappNumber || 'N/A'}
   - Facebook: ${submittedRecord?.groupLeader.facebookUrl || 'N/A'}

2. MEMBER 1:
   - Full Name: ${submittedRecord?.member1.fullName || 'N/A'}
   - Roll Number: ${submittedRecord?.member1.rollNumber || 'N/A'}
   - Department: ${submittedRecord?.member1.department || 'N/A'}
   - WhatsApp: ${submittedRecord?.member1.whatsappNumber || 'N/A'}

3. MEMBER 2:
   - Full Name: ${submittedRecord?.member2.fullName || 'N/A'}
   - Roll Number: ${submittedRecord?.member2.rollNumber || 'N/A'}
   - Department: ${submittedRecord?.member2.department || 'N/A'}
   - WhatsApp: ${submittedRecord?.member2.whatsappNumber || 'N/A'}

-----------------------------------------------------
PAYMENT DETAILS:
-----------------------------------------------------
- Sender bKash Number: ${submittedRecord?.payment.bkashNumber || 'N/A'}
- Transaction ID: ${submittedRecord?.payment.transactionId || 'N/A'}

=====================================================
Please present this Registration ID on event day at the reporting desk.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Registration_${regId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegisterAnother = () => {
    onResetRegistration();
    onNavigate('/registration');
  };

  return (
    <div className="w-full py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Printable Area Wrapper */}
      <div className="printable-card p-6 sm:p-10 rounded-3xl bg-[#0d1728] border border-emerald-500/40 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Subtle top banner accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-400" />

        {/* Success Icon & Heading */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20 animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Registration Confirmed
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
            REGISTRATION SUCCESSFUL
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your registration has been successfully submitted.
            <br />
            Please save your Registration ID for future reference.
          </p>
        </div>

        {/* Registration ID Badge */}
        <div className="p-6 rounded-2xl bg-[#080e1a] border border-emerald-500/30 text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Official Registration ID
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-300">
            {regId}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Payment Status: {paymentStatus}</span>
          </div>
        </div>

        {/* Event Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase">
              <Calendar className="w-4 h-4" />
              <span>Event Date</span>
            </div>
            <p className="font-bold text-white text-base">{eventDate}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase">
              <MapPin className="w-4 h-4" />
              <span>Venue</span>
            </div>
            <p className="font-bold text-white text-base">{venue}</p>
          </div>
        </div>

        {/* Team Breakdown (Printable & Viewable) */}
        {submittedRecord && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Registered Participants
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400">Leader:</span>
                <p className="text-white font-semibold truncate">{submittedRecord.groupLeader.fullName}</p>
                <p className="text-slate-400">Roll: {submittedRecord.groupLeader.rollNumber}</p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-300">Member 1:</span>
                <p className="text-white font-semibold truncate">{submittedRecord.member1.fullName}</p>
                <p className="text-slate-400">Roll: {submittedRecord.member1.rollNumber}</p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-300">Member 2:</span>
                <p className="text-white font-semibold truncate">{submittedRecord.member2.fullName}</p>
                <p className="text-slate-400">Roll: {submittedRecord.member2.rollNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="no-print pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            id="download-details-btn"
            onClick={handleDownloadDetails}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD REGISTRATION DETAILS</span>
          </button>

          <button
            id="print-details-btn"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT CONFIRMATION</span>
          </button>

          <button
            id="success-back-home-btn"
            onClick={() => onNavigate('/')}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <button
            id="register-another-team-btn"
            onClick={handleRegisterAnother}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-400 to-lime-300 text-slate-950 hover:brightness-105 transition-all shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>REGISTER ANOTHER TEAM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
