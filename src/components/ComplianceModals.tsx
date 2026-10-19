import React from 'react';
import { X, ShieldCheck, Scale, FileText, Lock, Mail } from 'lucide-react';

export type ComplianceType = 'dmca' | '2257' | 'terms' | 'privacy' | 'contact' | null;

interface ComplianceModalsProps {
  type: ComplianceType;
  onClose: () => void;
}

export const ComplianceModals: React.FC<ComplianceModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e0e17] border border-[#2b253d] rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200 max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#202030]">
          {type === '2257' && (
            <>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">18 U.S.C. § 2257 Record-Keeping Compliance</h3>
                <p className="text-xs text-slate-400">Statutory Notice Regarding Record Keeping Requirements</p>
              </div>
            </>
          )}

          {type === 'dmca' && (
            <>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Digital Millennium Copyright Act (DMCA) Policy</h3>
                <p className="text-xs text-slate-400">Notice and Procedure for Making Claims of Copyright Infringement</p>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Terms of Service & Adult User Agreement</h3>
                <p className="text-xs text-slate-400">Conditions Governing Access and Use</p>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Privacy Policy & Anonymity Protection</h3>
                <p className="text-xs text-slate-400">Commitment to Data Security & Zero-Leakage Browsing</p>
              </div>
            </>
          )}

          {type === 'contact' && (
            <>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Contact & Compliance Officer</h3>
                <p className="text-xs text-slate-400">Direct Inquiries, Legal Requests & Model Inquiries</p>
              </div>
            </>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pr-2">
          {type === '2257' && (
            <>
              <p>
                All visual depictions of actual or simulated sexually explicit conduct appearing on this website were produced with models and performers who were at least 18 years of age or older at the time of creation.
              </p>
              <h4 className="font-semibold text-white text-sm pt-2">Custodian of Records</h4>
              <p>
                The original records required pursuant to 18 U.S.C. § 2257 and 28 C.F.R. 75 for all content produced by or uploaded to this domain are maintained by our designated Records Custodian at:
              </p>
              <div className="p-3 bg-[#151522] rounded-xl border border-[#232338] font-mono text-xs text-slate-300">
                Custodian of Records Dept.<br />
                VelvetNoir Media Global LLC<br />
                9800 Wilshire Blvd, Suite 400<br />
                Beverly Hills, CA 90212 USA<br />
                Email: records-2257@velvetnoir.internal
              </div>
              <p>
                For content provided by third-party producers or syndicated studios, the records are maintained by the respective studio listed on the individual content credits in compliance with statutory provisions.
              </p>
            </>
          )}

          {type === 'dmca' && (
            <>
              <p>
                VelvetNoir respects the intellectual property rights of creators and content producers. If you are a copyright owner or an agent thereof and believe that any content hosted on this site infringes upon your copyright, you may submit a formal notification pursuant to the Digital Millennium Copyright Act (&quot;DMCA&quot;).
              </p>
              <h4 className="font-semibold text-white text-sm pt-2">Notice Requirements</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>A physical or electronic signature of an authorized representative.</li>
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The specific URL(s) on our service where the infringing material is located.</li>
                <li>Contact information including your physical address, phone number, and email.</li>
                <li>A statement made under penalty of perjury that the notification is accurate.</li>
              </ul>
              <p className="pt-2 text-slate-400">
                Submissions may be directed immediately via our in-app &quot;Report Content&quot; button or emailed to: <span className="text-purple-400 font-mono">dmca-notice@velvetnoir.internal</span>. Takedown requests for verified rights owners are handled within 24 hours.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>1. Acceptance of Terms:</strong> By entering this website, you certify under penalty of perjury that you are of legal age in your jurisdiction (at least 18 years old, or 21 where required by local statute) to view sexually explicit or mature adult materials.
              </p>
              <p>
                <strong>2. Prohibited Content:</strong> We strictly prohibit and automatically purge any depictions of non-consensual sexual content, revenge pornography, non-consensual recordings, or any material involving minors. Such violations are immediately reported to law enforcement authorities (NCMEC).
              </p>
              <p>
                <strong>3. Personal Use:</strong> All media, streams, and thumbnails are licensed for individual personal viewing only. Scraping, unauthorized reproduction, or redistributing content without express licensing is strictly prohibited.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                We value your privacy. We do not sell user data to advertising brokers. Your age verification status is stored solely as a client-side localStorage preference or encrypted session token on your device.
              </p>
              <p>
                Our video delivery infrastructure utilizes secure HTTPS TLS 1.3 encryption. We do not log IP addresses alongside viewing histories, providing you with confidential and discrete entertainment enjoyment.
              </p>
            </>
          )}

          {type === 'contact' && (
            <>
              <p>
                Our international support and compliance department is available 24/7 for model verifications, takedown requests, partnership inquiries, and technical support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#151522] rounded-xl border border-[#232338]">
                  <span className="text-xs text-slate-400">General Support</span>
                  <div className="font-semibold text-white mt-1">support@velvetnoir.internal</div>
                </div>
                <div className="p-3 bg-[#151522] rounded-xl border border-[#232338]">
                  <span className="text-xs text-slate-400">Legal &amp; 2257 Records</span>
                  <div className="font-semibold text-white mt-1">legal@velvetnoir.internal</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-4 border-t border-[#202030] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
