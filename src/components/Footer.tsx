import React from 'react';
import { PageRoute } from '../types';
import { CareerClubLogo, BtecEmblem } from './Logos';
import { Mail, Phone, MapPin, Calendar, Users, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050911] border-t border-emerald-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CareerClubLogo className="w-10 h-10" />
              <BtecEmblem className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-white font-bold font-display text-base tracking-tight">
                Textile Presentation Competition 2026
              </h3>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                Organized by Career Club BTEC
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier national academic textile presentation symposium fostering innovation, research, and technical eloquence at Barishal Textile Engineering College.
            </p>
          </div>

          {/* Col 2: Event Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-emerald-400">
              Key Event Details
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Date:</span> 4 October 2026
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Venue:</span> BTEC Auditorium, Barishal
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Structure:</span> Exactly 3 Members / Team
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-emerald-400">
              Portal Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                id="footer-nav-home" 
                onClick={() => onNavigate('/')} 
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1"
              >
                Home
              </button>
              <button 
                id="footer-nav-about" 
                onClick={() => onNavigate('/about')} 
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1"
              >
                About
              </button>
              <button 
                id="footer-nav-guidelines" 
                onClick={() => onNavigate('/guidelines')} 
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1"
              >
                Guidelines
              </button>
              <button 
                id="footer-nav-registration" 
                onClick={() => onNavigate('/registration')} 
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1"
              >
                Registration
              </button>
              <button 
                id="footer-nav-payment" 
                onClick={() => onNavigate('/payment')} 
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1"
              >
                Payment
              </button>
              <button 
                id="footer-nav-contact" 
                onClick={() => onNavigate('/contact')} 
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-emerald-400">
              Helpdesk & Inquiries
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>careerclub.btec@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                >
                  Official Facebook Page <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Career Club BTEC. Barishal Textile Engineering College. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Textile Innovation</span>
            <span>•</span>
            <span>Academic Excellence</span>
            <span>•</span>
            <span>Leadership</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
