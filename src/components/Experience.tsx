import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Code2, 
  Cpu, 
  Award, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  MapPin 
} from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Experience: React.FC = () => {
  const processSteps = [
    {
      step: '01',
      title: 'Discovery & System Blueprint',
      desc: 'We map out your business logic, database schema, and UI/UX flows within 48 hours to ensure zero scope creep.',
    },
    {
      step: '02',
      title: 'Sprint Development & Live Previews',
      desc: 'Clean TypeScript/Kotlin code written in weekly sprints. You review interactive staging builds at each milestone.',
    },
    {
      step: '03',
      title: 'Security, AI & QA Hardening',
      desc: 'Strict end-to-end testing, load simulation, vulnerability patching, and AI prompt refinement.',
    },
    {
      step: '04',
      title: 'Launch & 24/7 Managed Support',
      desc: 'Production deployment to Cloud / Google Play Store with active monitoring and continuous optimization.',
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#F5F6F7] border-b border-[#EEF0F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white text-xs font-bold uppercase tracking-wider text-[#3A3F44] border border-[#D9DDE1] mb-4">
            Our Experience & Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight mb-4">
            Why High-Growth Companies Choose TechWorks
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            We operate like your dedicated in-house engineering squad. No outsourced layers, no technical debt—just clean code, modern architecture, and rapid execution.
          </p>
        </div>

        {/* 4 Steps Process Cards with interactive lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {processSteps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#D9DDE1] hover:border-[#3A3F44] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 relative group cursor-default"
            >
              <div className="text-4xl font-extrabold font-mono text-[#D9DDE1] group-hover:text-[#B8860B] transition-colors duration-300 mb-4 group-hover:translate-x-1 transition-transform">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-[#222222] mb-2 group-hover:text-[#3A3F44] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials from Real Deliveries */}
        <div className="mb-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-extrabold text-[#222222]">
              Client Testimonials & Feedback
            </h3>
            <p className="text-sm text-[#8A8F94] mt-1">
              What founders and operational heads say about our software solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-7 border border-[#D9DDE1] hover:border-[#3A3F44] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#B8860B] mb-4 opacity-75 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm text-[#444444] leading-relaxed italic mb-6">
                    "{test.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEF0F2]">
                  <div className="font-bold text-sm text-[#222222] group-hover:text-[#3A3F44] transition-colors">
                    {test.name}
                  </div>
                  <div className="text-xs text-[#8A8F94]">
                    {test.role}, <span className="text-[#3A3F44] font-medium">{test.organization}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D9DDE1] hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#3A3F44] text-[#B8860B] flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#222222]">
                Guaranteed On-Time Delivery & SLA
              </h4>
              <p className="text-xs sm:text-sm text-[#666666]">
                Every project includes 30 days of complimentary post-launch support and automated backups.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-[#3A3F44] bg-[#F5F6F7] px-4 py-2 rounded-xl border border-[#EEF0F2]">
            <MapPin className="w-4 h-4 text-[#B8860B]" />
            <span>Engineering Hub: Delhi, India</span>
          </div>
        </div>

      </div>
    </section>
  );
};
