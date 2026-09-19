import React, { useState } from 'react';
import { PageRoute, RegistrationFormData, SubmissionResult, SubmittedRecord } from '../types';
import { submitRegistrationToGoogleWorkspace } from '../services/sheetsService';
import { getAccessToken, googleSignIn } from '../services/auth';
import { CreditCard, AlertCircle, ArrowLeft, Loader2, ShieldCheck, CheckCircle2, User, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentPageProps {
  formData: RegistrationFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;
  onNavigate: (route: PageRoute) => void;
  onSuccessSubmitted: (record: SubmittedRecord) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  formData,
  setFormData,
  onNavigate,
  onSuccessSubmitted
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [authNeeded, setAuthNeeded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper validation for Bangladesh phone numbers
  const isValidBdPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^(?:\+8801|8801|01)[3-9]\d{8}$/.test(cleaned);
  };

  const validatePayment = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.bkashNumber.trim()) {
      errs.bkashNumber = 'bKash Number used for sending fee is required.';
    } else if (!isValidBdPhone(formData.bkashNumber)) {
      errs.bkashNumber = 'Enter a valid Bangladeshi bKash mobile number (e.g. 017XXXXXXXX).';
    }

    if (!formData.transactionId.trim()) {
      errs.transactionId = 'bKash Transaction ID (TrxID) is required.';
    } else if (formData.transactionId.trim().length < 6) {
      errs.transactionId = 'Please enter a valid Transaction ID (typically 8-10 alphanumeric characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validate Payment
    if (!validatePayment()) {
      return;
    }

    // 2. Validate participants completeness
    if (
      !formData.groupLeader.fullName ||
      !formData.groupLeader.rollNumber ||
      !formData.groupLeader.photoBase64 ||
      !formData.member1.fullName ||
      !formData.member1.rollNumber ||
      !formData.member1.photoBase64 ||
      !formData.member2.fullName ||
      !formData.member2.rollNumber ||
      !formData.member2.photoBase64
    ) {
      setErrorMessage('Registration information is incomplete. Please return to the registration steps.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get or acquire OAuth token
      let token = await getAccessToken();

      if (!token) {
        // Prompt Google Sign-In with popup
        const authRes = await googleSignIn();
        token = authRes?.accessToken || null;
      }

      if (!token) {
        setAuthNeeded(true);
        setIsSubmitting(false);
        setErrorMessage('Google authorization is required to save the team record to Google Sheets and upload photos to Google Drive.');
        return;
      }

      // Execute submission directly to Google Sheets & Drive
      const result: SubmissionResult = await submitRegistrationToGoogleWorkspace(token, formData);

      if (result.success && result.registrationId) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (_) {}

        const submittedRecord: SubmittedRecord = {
          registrationId: result.registrationId,
          submissionDate: result.timestamp || new Date().toLocaleString(),
          paymentStatus: 'Pending Verification',
          groupLeader: {
            fullName: formData.groupLeader.fullName,
            rollNumber: formData.groupLeader.rollNumber,
            department: formData.groupLeader.department,
            whatsappNumber: formData.groupLeader.whatsappNumber,
            facebookUrl: formData.groupLeader.facebookUrl,
          },
          member1: {
            fullName: formData.member1.fullName,
            rollNumber: formData.member1.rollNumber,
            department: formData.member1.department,
            whatsappNumber: formData.member1.whatsappNumber,
            facebookUrl: formData.member1.facebookUrl,
          },
          member2: {
            fullName: formData.member2.fullName,
            rollNumber: formData.member2.rollNumber,
            department: formData.member2.department,
            whatsappNumber: formData.member2.whatsappNumber,
            facebookUrl: formData.member2.facebookUrl,
          },
          payment: {
            bkashNumber: formData.bkashNumber,
            transactionId: formData.transactionId,
          }
        };

        onSuccessSubmitted(submittedRecord);
        onNavigate('/success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(result.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission catch error:', err);
      setErrorMessage(err.message || 'An unexpected connection error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Final Step
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Registration Payment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Complete bKash fee verification to submit your team registration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Payment instructions & Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0d1728] border border-slate-800 shadow-2xl space-y-6">
            {/* bKash Payment Instruction Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#120a1f] to-[#1e102e] border border-pink-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                  bKash Merchant / Personal Number
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-pink-500 text-white uppercase">
                  bKash Send Money / Payment
                </span>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-pink-500/20 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400">Official bKash Number:</p>
                  <p className="text-base sm:text-lg font-mono font-bold text-white tracking-wider">
                    01700-000000
                  </p>
                </div>
                <span className="text-[10px] text-pink-300 font-semibold bg-pink-950/60 px-2.5 py-1 rounded-md border border-pink-800">
                  Career Club BTEC
                </span>
              </div>

              <p className="text-xs text-pink-200/80 leading-relaxed">
                Send the designated registration fee to the provided bKash number and enter your sending bKash number along with the Transaction ID (TrxID) below.
              </p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="space-y-1">
                  <p className="font-semibold text-rose-200">Submission Error</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Payment Input Fields */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Your bKash Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="017XXXXXXXX"
                  value={formData.bkashNumber}
                  onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                    errors.bkashNumber ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
                  }`}
                />
                {errors.bkashNumber && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.bkashNumber}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  bKash Transaction ID (TrxID) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. BL947K12MZ"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value.toUpperCase() })}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white font-mono placeholder:text-slate-500 uppercase focus:outline-none transition-colors ${
                    errors.transactionId ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
                  }`}
                />
                {errors.transactionId && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.transactionId}
                  </p>
                )}
              </div>
            </div>

            {/* Google Authorization notice */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Data is saved directly to the official Google Spreadsheet and photos are uploaded to Google Drive.
              </span>
            </div>

            {/* Submit Button */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                id="submit-registration-btn"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Registration...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>SUBMIT REGISTRATION</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="payment-back-to-registration-btn"
                onClick={() => onNavigate('/registration')}
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-transparent hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Team Details</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Team Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0a1120] border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white font-display border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Team Summary</span>
              <span className="text-[11px] font-normal text-emerald-400">3 Participants</span>
            </h3>

            <div className="space-y-4">
              {/* Group Leader */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-black overflow-hidden border border-slate-700 shrink-0">
                  {formData.groupLeader.photoBase64 ? (
                    <img
                      src={formData.groupLeader.photoBase64}
                      alt="Leader"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-slate-600" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Group Leader</span>
                  <p className="text-xs font-bold text-white truncate">{formData.groupLeader.fullName || 'Not specified'}</p>
                  <p className="text-[11px] text-slate-400">Roll: {formData.groupLeader.rollNumber || '—'}</p>
                </div>
              </div>

              {/* Member 1 */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-black overflow-hidden border border-slate-700 shrink-0">
                  {formData.member1.photoBase64 ? (
                    <img
                      src={formData.member1.photoBase64}
                      alt="Member 1"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-slate-600" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Member 1</span>
                  <p className="text-xs font-bold text-white truncate">{formData.member1.fullName || 'Not specified'}</p>
                  <p className="text-[11px] text-slate-400">Roll: {formData.member1.rollNumber || '—'}</p>
                </div>
              </div>

              {/* Member 2 */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-black overflow-hidden border border-slate-700 shrink-0">
                  {formData.member2.photoBase64 ? (
                    <img
                      src={formData.member2.photoBase64}
                      alt="Member 2"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-slate-600" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Member 2</span>
                  <p className="text-xs font-bold text-white truncate">{formData.member2.fullName || 'Not specified'}</p>
                  <p className="text-[11px] text-slate-400">Roll: {formData.member2.rollNumber || '—'}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate('/registration')}
                className="text-xs text-emerald-400 hover:underline"
              >
                Need to edit team information?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
