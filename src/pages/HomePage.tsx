import React from 'react';
import { PageRoute } from '../types';
import { CareerClubLogo, BtecEmblem, TextilePatternOrnament } from '../components/Logos';
import { Calendar, MapPin, Users, Award, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Organizer badges */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-950/30 mb-8 animate-in fade-in duration-500">
          <CareerClubLogo className="w-6 h-6" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-300">
            Career Club BTEC
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs sm:text-sm text-slate-300 font-medium">
            Barishal Textile Engineering College
          </span>
        </div>

        {/* Main Hero Typography */}
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-emerald-400 uppercase">
            National Academic Presentation Event
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
            TEXTILE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-200">
              PRESENTATION COMPETITION
            </span>
          </h1>

          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-6 py-1.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-black text-2xl sm:text-3xl font-display tracking-widest shadow-inner">
              2026
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Showcase your technical insights, innovative research, and communication mastery at the premier academic textile stage of Southern Bangladesh.
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="hero-register-now-btn"
            onClick={() => onNavigate('/registration')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all duration-200"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="hero-view-guidelines-btn"
            onClick={() => onNavigate('/guidelines')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/40 transition-all duration-200 shadow-md"
          >
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>VIEW GUIDELINES</span>
          </button>
        </div>

        {/* Visual Graphic Representation (Textile Loom / Presentation Motif) */}
        <div className="mt-14 relative max-w-3xl mx-auto rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080f1d] border border-emerald-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-sm overflow-hidden">
          <TextilePatternOrnament className="absolute -right-8 -bottom-8 w-48 h-48" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left relative z-10">
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-white font-bold text-sm">Theme & Innovation</h4>
              <p className="text-xs text-slate-400">Sustainable fibers, smart textiles, modern processing, and green tech.</p>
            </div>

            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-white font-bold text-sm">Rigid Team Format</h4>
              <p className="text-xs text-slate-400">Exactly 3 participants (1 Group Leader + 2 Active Members).</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-white font-bold text-sm">Prestige & Honors</h4>
              <p className="text-xs text-slate-400">Certificates, trophies, and career development opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Compact Information Cards */}
      <section className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="relative group p-6 rounded-2xl bg-[#0d1728]/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">EVENT DATE</p>
            <h3 className="text-xl font-extrabold text-white font-display">4 OCTOBER 2026</h3>
            <p className="text-xs text-slate-400 mt-2">Mark your calendar for the final symposium</p>
          </div>

          {/* Card 2 */}
          <div className="relative group p-6 rounded-2xl bg-[#0d1728]/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">VENUE</p>
            <h3 className="text-xl font-extrabold text-white font-display">BTEC AUDITORIUM</h3>
            <p className="text-xs text-slate-400 mt-2">Barishal Textile Engineering College</p>
          </div>

          {/* Card 3 */}
          <div className="relative group p-6 rounded-2xl bg-[#0d1728]/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">TEAM STRUCTURE</p>
            <h3 className="text-xl font-extrabold text-white font-display">3 MEMBERS</h3>
            <p className="text-xs text-slate-400 mt-2">Strictly 1 Leader + 2 Co-presenters</p>
          </div>

          {/* Card 4 */}
          <div className="relative group p-6 rounded-2xl bg-[#0d1728]/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">ORGANIZER</p>
            <h3 className="text-xl font-extrabold text-white font-display">CAREER CLUB BTEC</h3>
            <p className="text-xs text-slate-400 mt-2">Student Career & Professional Excellence Body</p>
          </div>
        </div>
      </section>

      {/* Quick Action Banner */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1b2f] to-slate-900 border border-emerald-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Registration is Open</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Ready to present your ideas on stage?</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Complete your team details in 4 straightforward steps and secure your presentation slot.
            </p>
          </div>
          <div className="z-10 shrink-0">
            <button
              id="home-banner-register-btn"
              onClick={() => onNavigate('/registration')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-slate-950 hover:brightness-105 shadow-xl shadow-emerald-500/20 transition-all"
            >
              <span>START TEAM REGISTRATION</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
