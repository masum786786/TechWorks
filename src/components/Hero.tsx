import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Database, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  onStartProject: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreProjects }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1C1F22] via-[#22252A] to-white pt-16 sm:pt-24 pb-20 sm:pb-28">
      {/* Subtle architectural grid lines for international high-tech feel */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]"></div>
      
      {/* Decorative ambient gradient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gray-200 text-xs font-semibold shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8860B]"></span>
            </span>
            <span className="text-[#B8860B] font-bold tracking-wide uppercase text-[11px]">Engineering Excellence</span>
            <span className="text-gray-400">|</span>
            <span>10+ Commercial Projects Delivered</span>
          </div>
        </div>

        {/* Global Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            We architect and build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#B8860B]">
              next-generation
            </span>{' '}
            software, apps & AI systems.
          </h1>

          <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
            TechWorks delivers custom enterprise web platforms, native Android applications, scalable cloud infrastructure, and autonomous AI agents for high-growth businesses.
          </p>
        </div>

        {/* Main Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-black bg-[#B8860B] hover:bg-[#d49b0d] shadow-lg hover:shadow-2xl transition-all cursor-pointer group active:scale-98"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all cursor-pointer hover:border-white/40 active:scale-98"
          >
            <span>Explore 10+ Delivered Projects</span>
          </button>
        </div>

        {/* Floating High-Impact Showcase Card with cohesive glass morphism */}
        <div className="relative mx-auto max-w-5xl">
          <div className="relative bg-white rounded-3xl border border-[#D9DDE1] shadow-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left summary */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5F6F7] text-xs font-bold uppercase tracking-wider text-[#3A3F44] border border-[#EEF0F2]">
                  Core Specializations
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
                  Turnkey Digital Systems Built for Scale
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  From commercial healthcare booking platforms and field service dispatch software to multi-warehouse inventory systems and private LLM copilots.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold text-[#3A3F44]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                    <span>Web & Android Apps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                    <span>AI & LLM Fine-Tuning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                    <span>SEO & Meta Ad Funnels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                    <span>24/7 Managed IT Support</span>
                  </div>
                </div>
              </div>

              {/* Right interactive telemetry metrics */}
              <div className="lg:col-span-6 bg-[#F5F6F7] p-5 sm:p-6 rounded-2xl border border-[#EEF0F2] space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#D9DDE1]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-[#222222]">TechWorks Systems Engine</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-semibold">
                    100% Operational
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center py-2">
                  <div className="p-3 bg-white rounded-xl border border-[#EEF0F2]">
                    <div className="text-2xl font-extrabold text-[#222222]">10+</div>
                    <div className="text-[10px] uppercase font-bold text-[#8A8F94] mt-0.5">Commercial Deliveries</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EEF0F2]">
                    <div className="text-2xl font-extrabold text-[#222222]">99.9%</div>
                    <div className="text-[10px] uppercase font-bold text-[#8A8F94] mt-0.5">Uptime SLA</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EEF0F2]">
                    <div className="text-2xl font-extrabold text-[#222222]">2-4h</div>
                    <div className="text-[10px] uppercase font-bold text-[#8A8F94] mt-0.5">Fast Response</div>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#EEF0F2] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#3A3F44] text-[#B8860B] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#222222]">Live Showcase Platform</div>
                      <div className="text-[11px] text-[#8A8F94]">Dental Clinic, Plumbing Solution & INventix</div>
                    </div>
                  </div>
                  <button
                    onClick={onExploreProjects}
                    className="p-1.5 text-[#3A3F44] hover:text-[#B8860B] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
