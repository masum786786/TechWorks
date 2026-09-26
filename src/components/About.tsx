import React from 'react';
import { 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Users, 
  MapPin, 
  Layers, 
  Clock, 
  Award 
} from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'Full-Cycle Development',
      description: 'From wireframes to production deployment and Google Play Store release, we handle the complete software engineering lifecycle.',
      icon: Layers,
    },
    {
      title: 'AI & LLM Specialization',
      description: 'We do not just build static apps; we integrate customized Gemini/GPT language models, autonomous agents, and predictive workflows.',
      icon: Zap,
    },
    {
      title: 'Enterprise Reliability',
      description: 'Rock-solid cloud infrastructure, automated failover, strict data validation, and 99.9% uptime SLA guarantee.',
      icon: ShieldCheck,
    },
    {
      title: 'Delhi-Based Direct Access',
      description: 'Direct communication with dedicated software engineers and architects. Zero communication bottlenecks or offshore delays.',
      icon: MapPin,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-[#EEF0F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5F6F7] text-xs font-bold uppercase tracking-wider text-[#3A3F44] border border-[#D9DDE1] mb-4">
            About TechWorks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight mb-4">
            Architecting world-class software solutions from Delhi to global clients.
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            TechWorks was founded on a simple principle: build software that solves hard business problems, scales without friction, and drives measurable revenue. Having delivered <strong>10+ complex platforms</strong>—from clinical dental solutions and plumbing service ERPs to warehouse inventory trackers—we bring battle-tested engineering prowess to every challenge.
          </p>
        </div>

        {/* 4 Pillars Grid with smooth card lift motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#F5F6F7] border border-[#EEF0F2] hover:border-[#D9DDE1] hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#3A3F44] text-[#3A3F44] group-hover:text-[#B8860B] flex items-center justify-center border border-[#D9DDE1] mb-5 transition-all duration-300 shadow-xs group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#222222] mb-2 group-hover:text-[#3A3F44] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality Banner with interactive hover */}
        <div className="rounded-2xl bg-[#3A3F44] text-white p-8 sm:p-10 border border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#B8860B] mb-3">
                <Award className="w-3.5 h-3.5" />
                Proven Track Record
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Over 10+ Commercial Systems Delivered With 99.4% Client Satisfaction
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Whether you need a dental clinic patient portal, a plumbing service dispatch system like Plumbing Solution, an inventory hub like INventix, or high-converting Meta advertising funnels—we execute with surgical precision.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="text-2xl font-extrabold text-[#B8860B]">100%</div>
                <div className="text-xs text-gray-300 mt-1">Codebase Ownership & Full Documentation Provided</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="text-2xl font-extrabold text-[#B8860B]">2 - 4 Weeks</div>
                <div className="text-xs text-gray-300 mt-1">Average MVP Delivery Timeline</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
