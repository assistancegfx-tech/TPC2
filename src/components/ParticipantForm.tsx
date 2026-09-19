import React, { useRef } from 'react';
import { ParticipantData } from '../types';
import { Upload, Camera, RefreshCw, AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';

interface ParticipantFormProps {
  roleTitle: string;
  roleSubtitle: string;
  data: ParticipantData;
  onChange: (data: ParticipantData) => void;
  errors: Record<string, string>;
}

export const ParticipantForm: React.FC<ParticipantFormProps> = ({
  roleTitle,
  roleSubtitle,
  data,
  onChange,
  errors
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ParticipantData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      alert('Photo file size exceeds 4MB. Please upload a smaller image.');
      return;
    }

    // Validate type
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please select a valid JPG or PNG photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onChange({
        ...data,
        photoFile: file,
        photoBase64: base64,
        photoName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Role Header Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            {roleTitle}
          </h2>
          <p className="text-xs text-slate-400">{roleSubtitle}</p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Required 3-Person Team
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Tanvir Ahmed"
            value={data.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.fullName ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Roll Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Roll Number / Student ID <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 211012"
            value={data.rollNumber}
            onChange={(e) => handleInputChange('rollNumber', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.rollNumber ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
            }`}
          />
          {errors.rollNumber && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.rollNumber}
            </p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Department / Batch <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Fabric Engineering (11th Batch)"
            value={data.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.department ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
            }`}
          />
          {errors.department && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.department}
            </p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            WhatsApp Number <span className="text-rose-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 017XXXXXXXX or +88017XXXXXXXX"
            value={data.whatsappNumber}
            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.whatsappNumber ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
            }`}
          />
          {errors.whatsappNumber && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.whatsappNumber}
            </p>
          )}
        </div>

        {/* Facebook ID / Link */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Facebook ID / Facebook Profile Link <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. https://facebook.com/username or facebook username"
            value={data.facebookUrl}
            onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-[#091120] border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.facebookUrl ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-400'
            }`}
          />
          {errors.facebookUrl && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.facebookUrl}
            </p>
          )}
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          Participant Photo <span className="text-rose-400">*</span>
        </label>
        <p className="text-xs text-slate-400">
          Upload a clear passport/portrait style photograph (JPG/JPEG/PNG, maximum 4MB).
        </p>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handlePhotoSelect}
          className="hidden"
        />

        {data.photoBase64 ? (
          <div className="p-4 rounded-xl bg-[#091120] border border-emerald-500/40 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-emerald-400/50 bg-black shrink-0 relative">
              <img
                src={data.photoBase64}
                alt="Participant Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left flex-1">
              <p className="text-xs font-semibold text-emerald-300 flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached Successfully
              </p>
              <p className="text-xs text-slate-400 truncate max-w-xs">{data.photoName || 'participant-photo.jpg'}</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-1"
              >
                <RefreshCw className="w-3 h-3" /> Replace Photo
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer p-6 sm:p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
              errors.photo ? 'border-rose-500/60 bg-rose-950/10' : 'border-slate-700 bg-[#091120] hover:border-emerald-500/50 hover:bg-slate-900/60'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
              <Camera className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-white">Click or tap to upload photo</p>
            <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP (Max 4MB)</p>
          </div>
        )}

        {errors.photo && (
          <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.photo}
          </p>
        )}
      </div>
    </div>
  );
};
