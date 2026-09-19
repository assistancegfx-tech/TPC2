import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CareerClubLogo } from './Logos';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Guidelines', route: '/guidelines' },
    { label: 'Registration', route: '/registration' },
    { label: 'Payment', route: '/payment' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#080e1a]/90 border-b border-emerald-900/30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Left */}
          <div 
            id="brand-logo-button"
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <CareerClubLogo className="w-11 h-11 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">Career Club BTEC</span>
              <span className="text-sm sm:text-base font-extrabold text-slate-100 font-display leading-tight tracking-tight group-hover:text-emerald-300 transition-colors">
                TEXTILE PRESENTATION <span className="text-emerald-400">2026</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleNav(link.route)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-900/40 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="desktop-register-now-btn"
              onClick={() => handleNav('/registration')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all duration-200"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-register-header-btn"
              onClick={() => handleNav('/registration')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-400 text-slate-950 shadow-sm"
            >
              REGISTER
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-900/30 bg-[#080e1a]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1.5 pt-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  id={`mobile-nav-${link.label.toLowerCase()}`}
                  onClick={() => handleNav(link.route)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              id="mobile-nav-register-main"
              onClick={() => handleNav('/registration')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
