import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { VideoItem } from '../data/contentData';

interface ReportModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ video, onClose }) => {
  const [reason, setReason] = useState('copyright');
  const [details, setDetails] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!video) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `REP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0f0f18] border border-[#2b2038] rounded-2xl shadow-2xl p-6 text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Content Incident & Legal Report</h3>
                <p className="text-xs text-slate-400 truncate max-w-xs">
                  Target: {video.title}
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                We enforce a zero-tolerance policy for non-consensual content, underage depictions, or copyright violations. Reports are processed 24/7 by our compliance team.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Reason for Report
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#161624] border border-[#2c2c42] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option value="consent">Non-Consensual / Involuntary Content</option>
                <option value="age">Underage / Age Verification Concern</option>
                <option value="copyright">DMCA / Copyright Infringement</option>
                <option value="privacy">Defamation or Personal Privacy Leak</option>
                <option value="spam">Misleading Metadata / Malicious Links</option>
                <option value="technical">Technical Playback Defect</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Contact Email (Optional for tracking)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#161624] border border-[#2c2c42] rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Additional Details / Evidence
              </label>
              <textarea
                rows={3}
                required
                placeholder="Please describe the violation, timestamp, or copyright ownership details..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-[#161624] border border-[#2c2c42] rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-rose-950/40 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Priority Report</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Report Received</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Your inquiry has been registered with ticket reference <span className="font-mono text-purple-400 font-bold">{ticketId}</span>. The compliance and moderation team has initiated an immediate review.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#1d1d2e] hover:bg-[#26263d] text-white text-xs font-semibold transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
