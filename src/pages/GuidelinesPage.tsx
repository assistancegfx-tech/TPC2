import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ChevronDown, ChevronUp, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

interface GuidelinesPageProps {
  onNavigate: (route: PageRoute) => void;
}

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const GuidelinesPage: React.FC<GuidelinesPageProps> = ({ onNavigate }) => {
  const [openSection, setOpenSection] = useState<string | null>('eligibility');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections: AccordionItem[] = [
    {
      id: 'eligibility',
      title: 'Eligibility',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Open to all enrolled undergraduate students of Barishal Textile Engineering College and affiliated textile institutions.</p>
          <p>• All participants must have a valid institutional Student ID and Roll Number.</p>
          <p>• Cross-batch team compositions are allowed as long as all 3 members meet the student eligibility criteria.</p>
        </div>
      )
    },
    {
      id: 'team-requirements',
      title: 'Team Requirements',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Each team MUST consist of exactly three (3) members: 1 Group Leader and 2 Members.</p>
          <p>• No individual participant can be registered in more than one team.</p>
          <p>• The Group Leader will act as the primary contact person for all official communications, schedule notices, and certificate dispatch.</p>
          <p>• All three members must be present on stage during the official presentation.</p>
        </div>
      )
    },
    {
      id: 'presentation-rules',
      title: 'Presentation Rules',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Slides must be created in Microsoft PowerPoint (.pptx) or Adobe PDF format (16:9 widescreen ratio recommended).</p>
          <p>• Final presentation slide files must be submitted to the organizing committee prior to the announced deadline on event day.</p>
          <p>• Presenters must wear formal or semi-formal academic attire.</p>
          <p>• English or clear standard Bangla delivery is accepted (technical terminologies must be appropriately articulated).</p>
        </div>
      )
    },
    {
      id: 'topic-requirements',
      title: 'Topic Requirements',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Topics must directly correlate with modern textile engineering, technology, sustainability, or industry advancements.</p>
          <p>• Recommended themes include (but are not limited to):</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
            <li>Sustainable wet processing and waterless dyeing innovations</li>
            <li>Smart textiles, wearable electronic fabrics, and medical applications</li>
            <li>Circular textile economy and mechanical/chemical recycling</li>
            <li>Automation, Industry 4.0, and AI in yarn/fabric manufacturing</li>
            <li>Nanotechnology and surface modification of technical fibers</li>
          </ul>
        </div>
      )
    },
    {
      id: 'presentation-duration',
      title: 'Presentation Duration',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Total stage time allocated per team: <strong>8 to 10 Minutes</strong>.</p>
          <p>• Main Presentation: 7 Minutes maximum (a warning bell will sound at 6 minutes).</p>
          <p>• Live Judges Q&A / Defense: 2 to 3 Minutes.</p>
          <p>• Exceeding the strict time limit will incur a deduction in scoring.</p>
        </div>
      )
    },
    {
      id: 'judging-criteria',
      title: 'Judging Criteria',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>Presentations will be evaluated on a standard 100-point scale by a distinguished panel of professors and industry professionals:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-400">Technical Depth & Innovation</span>: 30%
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-400">Presentation Delivery & Eloquence</span>: 25%
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-400">Slide Quality, Visuals & Design</span>: 20%
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-400">Q&A Defense & Team Coordination</span>: 25%
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'registration-deadline',
      title: 'Registration Deadline',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Registration slots are strictly limited and allocated on a first-come, first-verified basis.</p>
          <p>• Online registration closes prior to 4 October 2026 as announced by Career Club BTEC.</p>
          <p>• Teams must complete payment verification to finalize slot reservation.</p>
        </div>
      )
    },
    {
      id: 'general-rules',
      title: 'General Rules',
      content: (
        <div className="space-y-2 text-slate-300 text-sm">
          <p>• Plagiarism or uncredited borrowing of existing research slides is strictly prohibited.</p>
          <p>• The decision of the judging panel and the Career Club BTEC organizing committee is final and binding.</p>
          <p>• Organizers reserve the right to modify the sequence of team presentations if required by scheduling demands.</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
          Official Directives
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Competition Guidelines
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Please review the regulations, duration, team rules, and evaluation criteria carefully before submitting your registration.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSection === sec.id;
          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#0d1728] border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                  : 'bg-[#0a1120] border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`text-base sm:text-lg font-bold font-display ${isOpen ? 'text-emerald-300' : 'text-slate-200'}`}>
                  {sec.title}
                </span>
                <div className={`p-1.5 rounded-lg border transition-colors ${
                  isOpen ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Block */}
      <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#0b172a] via-[#0d1c33] to-[#0b172a] border border-emerald-500/30 text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">
          READY TO REGISTER?
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Gather your 3 team members' information, photos, and proceed to the multi-step registration portal.
        </p>
        <div className="pt-2">
          <button
            id="guidelines-register-now-btn"
            onClick={() => onNavigate('/registration')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-slate-950 hover:brightness-105 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
