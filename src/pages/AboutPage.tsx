import React from 'react';
import { PageRoute } from '../types';
import { Users, Calendar, MapPin, Award, CheckCircle2, FileText, Layers, ArrowRight } from 'lucide-react';
import { CareerClubLogo, BtecEmblem } from '../components/Logos';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
          Symposium Overview
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          About the Competition
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          The official briefing for Textile Presentation Competition 2026 organized by Career Club BTEC.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Competition Overview */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1728] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <FileText className="w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Competition Overview</h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The <strong>Textile Presentation Competition 2026</strong> is designed to cultivate research acumen, stage confidence, critical problem-solving, and professional oratory skills among undergraduate textile engineering students. Participants will explore emerging technological frontiers, sustainable fiber chemistry, smart apparel innovations, circular supply chains, and technical textiles.
          </p>
        </div>

        {/* Section 2: Team Structure (Explicit 1 Leader + 2 Members = 3 Participants) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1728] border border-emerald-500/30 shadow-xl space-y-6">
          <div className="flex items-center gap-3 text-emerald-400">
            <Users className="w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Team Structure</h2>
          </div>
          <p className="text-sm text-slate-300">
            Each participating team must strictly maintain a 3-member composition without exception:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/40 space-y-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-400 text-slate-950 uppercase">Role 1</span>
              <h3 className="text-base font-bold text-white">1 Group Leader</h3>
              <p className="text-xs text-slate-400">Primary point of contact, team coordinator, and active presenter on stage.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 uppercase">Role 2</span>
              <h3 className="text-base font-bold text-white">1 Member (Member 1)</h3>
              <p className="text-xs text-slate-400">Co-researcher, slide co-creator, and active co-presenter.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 uppercase">Role 3</span>
              <h3 className="text-base font-bold text-white">1 Member (Member 2)</h3>
              <p className="text-xs text-slate-400">Co-researcher, data analyst, and active co-presenter.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Total: Exactly 3 participants per team. Individual or dual entries are not allowed.</span>
          </div>
        </div>

        {/* Section 3: Eligibility & Presentation Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1728] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Award className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white font-display">Eligibility</h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Enrolled undergraduate students of Textile Engineering disciplines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Students from all active academic batches and departments are eligible.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>A participant cannot be a member of more than one team simultaneously.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1728] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Layers className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white font-display">Presentation Format</h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Standard PowerPoint / PDF slide presentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Structured delivery including introduction, technical depth, methodology, and conclusion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Live Q&A defense session conducted by the esteemed judges panel.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4: Event Date, Venue, and Organizer */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1728] border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white font-display">Schedule, Venue & Organizer Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Event Date</span>
              </div>
              <p className="text-white font-extrabold text-lg">4 October 2026</p>
              <p className="text-xs text-slate-400">Reporting starts at 08:30 AM (BST)</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Venue</span>
              </div>
              <p className="text-white font-extrabold text-base sm:text-lg">BTEC Auditorium</p>
              <p className="text-xs text-slate-400">Barishal Textile Engineering College, Barishal</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Organizer</span>
              </div>
              <p className="text-white font-extrabold text-base sm:text-lg">Career Club BTEC</p>
              <p className="text-xs text-slate-400">Dedicated to fostering textile leadership</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            id="about-goto-registration-btn"
            onClick={() => onNavigate('/registration')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-slate-950 hover:brightness-105 shadow-xl shadow-emerald-500/20"
          >
            <span>PROCEED TO REGISTRATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
