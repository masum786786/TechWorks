import React from 'react';
import { 
  Code2, 
  Globe, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Cloud, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { SERVICES } from '../data/mockData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Globe,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Cloud,
  Cpu,
  Sparkles,
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F5F6F7] border-b border-[#EEF0F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white text-xs font-bold uppercase tracking-wider text-[#3A3F44] border border-[#D9DDE1] mb-4">
              Our Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight mb-4">
              Comprehensive Software, Cloud & AI Engineering Services
            </h2>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              We provide turnkey technological solutions designed to scale your operations, automate complex workflows, and capture high-intent customers.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D9DDE1] text-xs font-bold text-[#3A3F44] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
              8 Core Specializations
            </span>
          </div>
        </div>

        {/* Services Grid (8 cards with hover motion) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconName] || Code2;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#D9DDE1] hover:border-[#3A3F44] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group cursor-default"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F6F7] group-hover:bg-[#3A3F44] text-[#3A3F44] group-hover:text-[#B8860B] flex items-center justify-center border border-[#EEF0F2] transition-colors duration-300 shadow-xs group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#3A3F44]/5 text-[#3A3F44] border border-[#3A3F44]/10">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#3A3F44] transition-colors mb-1">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#8A8F94] mb-3">
                    {service.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#555555] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-[#F5F6F7]">
                    {service.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 text-xs font-medium text-[#444444]">
                        <Check className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#3A3F44] group-hover:text-white bg-[#F5F6F7] group-hover:bg-[#3A3F44] border border-[#D9DDE1] group-hover:border-transparent transition-all duration-300 cursor-pointer shadow-xs active:scale-98"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B8860B] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
