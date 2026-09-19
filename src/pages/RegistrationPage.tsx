import React, { useState } from 'react';
import { PageRoute, RegistrationFormData, ParticipantData } from '../types';
import { ParticipantForm } from '../components/ParticipantForm';
import { Check, ChevronRight, ChevronLeft, ArrowRight, Edit, AlertCircle } from 'lucide-react';

interface RegistrationPageProps {
  formData: RegistrationFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;
  onNavigate: (route: PageRoute) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  formData,
  setFormData,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, label: 'GROUP LEADER', short: '01' },
    { number: 2, label: 'MEMBER 1', short: '02' },
    { number: 3, label: 'MEMBER 2', short: '03' },
    { number: 4, label: 'REVIEW', short: '04' }
  ];

  // Helper validation for Bangladesh phone numbers
  const isValidBdPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^(?:\+8801|8801|01)[3-9]\d{8}$/.test(cleaned);
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    let participant: ParticipantData;

    if (stepNum === 1) participant = formData.groupLeader;
    else if (stepNum === 2) participant = formData.member1;
    else if (stepNum === 3) participant = formData.member2;
    else return true;

    if (!participant.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!participant.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll Number / Student ID is required.';
    }

    if (!participant.department.trim()) {
      newErrors.department = 'Department / Batch is required.';
    }

    if (!participant.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp Number is required.';
    } else if (!isValidBdPhone(participant.whatsappNumber)) {
      newErrors.whatsappNumber = 'Enter a valid Bangladeshi phone number (e.g. 017XXXXXXXX).';
    }

    if (!participant.facebookUrl.trim()) {
      newErrors.facebookUrl = 'Facebook Profile Link or ID is required.';
    }

    if (!participant.photoBase64) {
      newErrors.photo = 'Participant photo is required.';
    }

    // Check duplicate rolls across steps
    const glRoll = formData.groupLeader.rollNumber.trim().toLowerCase();
    const m1Roll = formData.member1.rollNumber.trim().toLowerCase();
    const m2Roll = formData.member2.rollNumber.trim().toLowerCase();

    if (stepNum === 2 && m1Roll && glRoll && m1Roll === glRoll) {
      newErrors.rollNumber = 'Member 1 cannot have the same Roll Number as Group Leader.';
    }

    if (stepNum === 3) {
      if (m2Roll && glRoll && m2Roll === glRoll) {
        newErrors.rollNumber = 'Member 2 cannot have the same Roll Number as Group Leader.';
      } else if (m2Roll && m1Roll && m2Roll === m1Roll) {
        newErrors.rollNumber = 'Member 2 cannot have the same Roll Number as Member 1.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateParticipant = (role: 'groupLeader' | 'member1' | 'member2', data: ParticipantData) => {
    setFormData((prev) => ({
      ...prev,
      [role]: data
    }));
  };

  const handleProceedToPayment = () => {
    // Check all steps validity before continuing
    const glValid = validateStep(1);
    const m1Valid = validateStep(2);
    const m2Valid = validateStep(3);

    if (!formData.groupLeader.photoBase64 || !formData.member1.photoBase64 || !formData.member2.photoBase64) {
      alert('Please ensure all three team members have provided their required details and photos.');
      return;
    }

    onNavigate('/payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Official Team Registration
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Team Registration Form
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Step-by-step registration for Textile Presentation Competition 2026.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800">
        <div className="grid grid-cols-4 gap-2 relative">
          {steps.map((step) => {
            const isDone = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center relative group"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 ring-4 ring-emerald-500/20 shadow-lg font-extrabold'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : step.short}
                </div>
                <span
                  className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:block ${
                    isCurrent ? 'text-emerald-400' : isDone ? 'text-slate-200' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1728] border border-slate-800 shadow-2xl">
        {currentStep === 1 && (
          <ParticipantForm
            roleTitle="Step 1 — Group Leader"
            roleSubtitle="The primary presenter and communications coordinator for the team."
            data={formData.groupLeader}
            onChange={(d) => updateParticipant('groupLeader', d)}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <ParticipantForm
            roleTitle="Step 2 — Member 1"
            roleSubtitle="Second team member, co-researcher, and active presenter."
            data={formData.member1}
            onChange={(d) => updateParticipant('member1', d)}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <ParticipantForm
            roleTitle="Step 3 — Member 2"
            roleSubtitle="Third team member, analyst, and active presenter."
            data={formData.member2}
            onChange={(d) => updateParticipant('member2', d)}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white font-display">
                Step 4 — Review Team Details
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Please double check all participant information before proceeding to payment.
              </p>
            </div>

            {/* Review Cards for 3 participants */}
            {[
              { label: 'Group Leader (01)', data: formData.groupLeader, step: 1 },
              { label: 'Member 1 (02)', data: formData.member1, step: 2 },
              { label: 'Member 2 (03)', data: formData.member2, step: 3 },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {p.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(p.step);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black border border-slate-700 shrink-0">
                    {p.data.photoBase64 ? (
                      <img
                        src={p.data.photoBase64}
                        alt={p.data.fullName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                        No photo
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm w-full">
                    <div>
                      <span className="text-slate-400">Name:</span>{' '}
                      <span className="font-semibold text-white">{p.data.fullName || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Roll Number:</span>{' '}
                      <span className="font-semibold text-white">{p.data.rollNumber || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Department:</span>{' '}
                      <span className="font-semibold text-white">{p.data.department || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">WhatsApp:</span>{' '}
                      <span className="font-semibold text-white">{p.data.whatsappNumber || '—'}</span>
                    </div>
                    <div className="sm:col-span-2 truncate">
                      <span className="text-slate-400">Facebook:</span>{' '}
                      <span className="font-medium text-emerald-300">{p.data.facebookUrl || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              id="registration-back-btn"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              id="registration-next-btn"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-105 active:scale-95 transition-all"
            >
              <span>Next Participant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="review-edit-btn"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800"
              >
                Edit Form
              </button>
              <button
                type="button"
                id="review-continue-to-payment-btn"
                onClick={handleProceedToPayment}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-105 active:scale-95 transition-all"
              >
                <span>CONTINUE TO PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
