/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, RegistrationFormData, SubmittedRecord } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GuidelinesPage } from './pages/GuidelinesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PaymentPage } from './pages/PaymentPage';
import { SuccessPage } from './pages/SuccessPage';
import { ContactPage } from './pages/ContactPage';
import { initAuth } from './services/auth';

const initialFormData: RegistrationFormData = {
  groupLeader: {
    fullName: '',
    rollNumber: '',
    department: '',
    whatsappNumber: '',
    facebookUrl: '',
    photoFile: null,
    photoBase64: '',
    photoName: ''
  },
  member1: {
    fullName: '',
    rollNumber: '',
    department: '',
    whatsappNumber: '',
    facebookUrl: '',
    photoFile: null,
    photoBase64: '',
    photoName: ''
  },
  member2: {
    fullName: '',
    rollNumber: '',
    department: '',
    whatsappNumber: '',
    facebookUrl: '',
    photoFile: null,
    photoBase64: '',
    photoName: ''
  },
  bkashNumber: '',
  transactionId: ''
};

export default function App() {
  // Sync router with browser path for full multi-page experience
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    const path = window.location.pathname as PageRoute;
    const validRoutes: PageRoute[] = ['/', '/about', '/guidelines', '/registration', '/payment', '/success', '/contact'];
    return validRoutes.includes(path) ? path : '/';
  });

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [submittedRecord, setSubmittedRecord] = useState<SubmittedRecord | null>(null);

  // Sync state on popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      const validRoutes: PageRoute[] = ['/', '/about', '/guidelines', '/registration', '/payment', '/success', '/contact'];
      setCurrentRoute(validRoutes.includes(path) ? path : '/');
    };

    window.addEventListener('popstate', handlePopState);
    initAuth();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
  };

  const handleResetRegistration = () => {
    setFormData(initialFormData);
    setSubmittedRecord(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080e1a] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Multi-Page Route Content */}
      <main className="flex-1 w-full">
        {currentRoute === '/' && <HomePage onNavigate={navigateTo} />}
        {currentRoute === '/about' && <AboutPage onNavigate={navigateTo} />}
        {currentRoute === '/guidelines' && <GuidelinesPage onNavigate={navigateTo} />}
        {currentRoute === '/registration' && (
          <RegistrationPage
            formData={formData}
            setFormData={setFormData}
            onNavigate={navigateTo}
          />
        )}
        {currentRoute === '/payment' && (
          <PaymentPage
            formData={formData}
            setFormData={setFormData}
            onNavigate={navigateTo}
            onSuccessSubmitted={(record) => setSubmittedRecord(record)}
          />
        )}
        {currentRoute === '/success' && (
          <SuccessPage
            submittedRecord={submittedRecord}
            onNavigate={navigateTo}
            onResetRegistration={handleResetRegistration}
          />
        )}
        {currentRoute === '/contact' && <ContactPage onNavigate={navigateTo} />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
