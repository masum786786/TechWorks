import React from 'react';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ArrowUp,
  Lock
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/mockData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181A1C] text-white border-t border-[#2d3136] pt-10 sm:pt-14 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ordered Responsive Layout:
            1st Row: CONNECT & SOCIAL and HEADQUARTERS
            2nd Row: CORE CAPABILITIES and QUICK LINKS
        */}
        <div className="space-y-8 sm:space-y-12 pb-10 sm:pb-12 border-b border-gray-800">
          
          {/* Top Row: 1st CONNECT & SOCIAL and 2nd HEADQUARTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pb-6 sm:pb-8 border-b border-gray-800/60">
            
            {/* 1st: CONNECT & SOCIAL */}
            <div className="sm:col-span-1 lg:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 pb-2 border-b border-gray-800/80">
                Connect & Social
              </h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed max-w-md">
                Follow our engineering open-source releases, client case studies, and technological insights.
              </p>
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <a
                  href={COMPANY_INFO.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25282C] hover:bg-[#B8860B] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-gray-700/80 hover:border-[#B8860B] shadow-xs active:scale-95"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25282C] hover:bg-[#B8860B] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-gray-700/80 hover:border-[#B8860B] shadow-xs active:scale-95"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25282C] hover:bg-[#B8860B] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-gray-700/80 hover:border-[#B8860B] shadow-xs active:scale-95"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25282C] hover:bg-[#B8860B] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-gray-700/80 hover:border-[#B8860B] shadow-xs active:scale-95"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 2nd: HEADQUARTERS */}
            <div className="sm:col-span-1 lg:col-span-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 pb-2 border-b border-gray-800/80">
                Headquarters
              </h4>
              <div className="space-y-3.5 text-xs text-gray-300">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
                    Location
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 font-medium">
                    <MapPin className="w-4 h-4 text-[#B8860B] shrink-0" />
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
                    Official Email
                  </div>
                  <div className="flex items-center gap-2 font-medium min-w-0">
                    <Mail className="w-4 h-4 text-[#B8860B] shrink-0" />
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`} 
                      className="text-gray-300 hover:text-[#B8860B] transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: CORE CAPABILITIES & QUICK LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            
            {/* Core Capabilities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3.5 pb-2 border-b border-gray-800/80">
                Core Capabilities
              </h4>
              <ul className="grid grid-cols-1 gap-2.5 text-xs text-gray-400">
                {SERVICES.map((svc) => (
                  <li key={svc.id}>
                    <a 
                      href="#services" 
                      className="hover:text-[#B8860B] transition-colors flex items-center gap-2 py-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0"></span>
                      <span className="leading-snug">{svc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3.5 pb-2 border-b border-gray-800/80">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <a href="#about" className="hover:text-[#B8860B] transition-colors block py-0.5">About Us</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#B8860B] transition-colors block py-0.5">Services</a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[#B8860B] transition-colors block py-0.5">10+ Projects</a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-[#B8860B] transition-colors block py-0.5">Process & Reviews</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#B8860B] transition-colors block py-0.5">Consultation</a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25282C] hover:bg-[#3A3F44] text-[#B8860B] border border-gray-700/80 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar - Fully Responsive */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} TechWorks. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>English (EN)</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
