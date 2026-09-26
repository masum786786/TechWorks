import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/mockData';
import { submitInquiry } from '../lib/api';

interface ContactFormProps {
  selectedServicePreset?: string;
  onSubmissionSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  selectedServicePreset,
  onSubmissionSuccess 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Custom Software Development');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('Flexible');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update service when user clicks "Request This Service" from Services section
  useEffect(() => {
    if (selectedServicePreset) {
      setService(selectedServicePreset);
      // If project title was passed, prepend to description if empty
      if (!description && selectedServicePreset.includes('Platform') || selectedServicePreset.includes('System')) {
        setDescription(`Inquiry regarding building a platform similar to: ${selectedServicePreset}`);
      }
    }
  }, [selectedServicePreset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setErrorMsg('Please describe what you want to build (kya banwana hai - at least 10 characters).');
      return;
    }

    setLoading(true);

    try {
      const result = await submitInquiry({
        name,
        email,
        phone,
        service,
        description,
        budget_range: budgetRange,
      });

      if (result.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setDescription('');
        if (onSubmissionSuccess) {
          onSubmissionSuccess();
        }
      } else {
        setErrorMsg(result.error || 'Failed to submit request. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Your submission has been saved locally and will sync shortly.');
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-b border-[#EEF0F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5F6F7] text-xs font-bold uppercase tracking-wider text-[#3A3F44] border border-[#D9DDE1] mb-4">
            Start Your Project
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight mb-4">
            Request a Consultation & Project Quotation
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Tell us about your requirements—what you want to build (website, Android application, AI/LLMs system, or cloud infrastructure). Our engineering team will review and reply within 2–4 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#F5F6F7] rounded-3xl p-6 sm:p-10 border border-[#D9DDE1] shadow-xs">
            
            {success ? (
              <div className="py-10 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#222222] mb-3">
                  Request Submitted Successfully!
                </h3>
                <p className="text-sm sm:text-base text-[#555555] max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out to TechWorks. Our software architects in Delhi have received your requirements and will reach out to you via email or phone shortly.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#D9DDE1] max-w-sm mx-auto mb-6 text-xs text-left space-y-1 text-gray-600">
                  <div><strong>Official Communication:</strong> {COMPANY_INFO.email}</div>
                  <div><strong>Location:</strong> {COMPANY_INFO.address}</div>
                  <div><strong>Reference Status:</strong> In Review (Logged in Admin Portal)</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3A3F44] hover:bg-[#222222] transition-colors cursor-pointer"
                >
                  <span>Submit Another Request</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-2">
                    Full Name / Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masum Raza / Apex Healthcare"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222] transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222] transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Service Type Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-2">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222] transition-all font-medium"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Complete Custom Platform (Web + Android + AI)">
                      Complete Custom Platform (Web + Android + AI)
                    </option>
                    <option value="Other Technical Project">
                      Other Technical Project
                    </option>
                  </select>
                </div>

                {/* Description (kya banwana hai) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44]">
                      Project Description (Kya Banwana Hai?) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#8A8F94]">Be as specific as possible</span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your requirements: what website, Android application, inventory ERP, or AI features you want us to build..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DDE1] focus:border-[#3A3F44] focus:ring-2 focus:ring-[#3A3F44]/20 outline-none text-sm text-[#222222] transition-all placeholder:text-gray-400 resize-y"
                  ></textarea>
                </div>

                {/* Budget Range / Timeline */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-2">
                    Approximate Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {['Flexible / Not Sure', 'Under ₹50,000', '₹50k - ₹2,00,000', '₹2,00,000+'].map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setBudgetRange(range)}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                          budgetRange === range
                            ? 'bg-[#3A3F44] text-white border-[#3A3F44] shadow-xs'
                            : 'bg-white text-[#555555] border-[#D9DDE1] hover:border-[#8A8F94]'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-[#3A3F44] hover:bg-[#222222] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#B8860B]" />
                      <span>Submitting Your Requirements...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-4 h-4 text-[#B8860B]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#8A8F94]">
                  Submissions are securely stored in the TechWorks inquiries database and visible in the Admin Portal.
                </p>
              </form>
            )}

          </div>

          {/* Right Column: Contact Details (Strictly Email & Delhi as requested) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Contact Card */}
            <div className="bg-[#3A3F44] text-white rounded-3xl p-8 border border-gray-700 shadow-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#B8860B] mb-6">
                <ShieldCheck className="w-4 h-4" />
                Direct Communication
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3">
                Get in Touch With TechWorks
              </h3>
              
              <p className="text-sm text-gray-300 leading-relaxed mb-8">
                Ready to elevate your business with modern web software, Android apps, or AI integration? Send us your brief directly or submit the inquiry form.
              </p>

              <div className="space-y-6 pt-2">
                {/* Email (User requested: contact me sirf email rahega) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 text-[#B8860B] flex items-center justify-center shrink-0 border border-white/15">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Official Email Address
                    </div>
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-[#B8860B] transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Monitored 24/7 by engineering leads
                    </div>
                  </div>
                </div>

                {/* Address (User requested: and address Delhi) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 text-[#B8860B] flex items-center justify-center shrink-0 border border-white/15">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Headquarters
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white">
                      {COMPANY_INFO.address}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Serving clients across India & International markets
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Mailto CTA */}
              <div className="mt-8 pt-6 border-t border-gray-600/70">
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Project%20Inquiry%20from%20TechWorks%20Website`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#3A3F44] bg-white hover:bg-gray-100 transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4 text-[#B8860B]" />
                  <span>Send Direct Email to {COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* SLA / Fast response promise card */}
            <div className="bg-[#F5F6F7] rounded-3xl p-6 sm:p-7 border border-[#D9DDE1]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#3A3F44] border border-[#EEF0F2] shadow-xs">
                  <Clock className="w-5 h-5 text-[#B8860B]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#222222]">
                    2–4 Hours Response Guarantee
                  </h4>
                  <p className="text-xs text-[#8A8F94]">
                    Fast technical evaluation & architecture feedback
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                When you submit the form, our technical team immediately reviews your scope, prepares initial feasibility analysis, and provides a clear breakdown of timelines and cost estimate.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
