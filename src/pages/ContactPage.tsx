import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { CareerClubLogo, BtecEmblem } from '../components/Logos';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    roll: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="w-full py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
          Communications & Helpdesk
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Contact Career Club BTEC
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Have queries about rules, topics, registration, or bKash fee confirmation? Reach out directly to the student organizing team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1728] border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <CareerClubLogo className="w-12 h-12" />
              <BtecEmblem className="w-12 h-12" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display">Career Club BTEC</h3>
              <p className="text-xs text-emerald-400 font-medium">Barishal Textile Engineering College</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Campus Location:</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Barishal Textile Engineering College, C&B Road, Barishal, Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Official Email:</p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">
                    careerclub.btec@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Helpline / WhatsApp:</p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">
                    +880 1700-000000 / +880 1800-000000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Helpdesk Hours:</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Saturday – Thursday: 09:00 AM – 08:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1728] border border-slate-800 shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">Inquiry Received</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for getting in touch. A representative from Career Club BTEC will respond to your inquiry via email or WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactData({ name: '', email: '', roll: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
                  Send a Message to the Organizing Committee
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sazzad Hossain"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#091120] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sazzad@example.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#091120] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Student ID / Roll (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 211018"
                      value={contactData.roll}
                      onChange={(e) => setContactData({ ...contactData, roll: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#091120] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Question regarding topic selection"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#091120] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your question or request here..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#091120] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
