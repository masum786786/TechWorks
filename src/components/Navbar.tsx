import React, { useState } from 'react';
import { 
  Code2, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenAdmin: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EEF0F2] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-[#3A3F44] text-white flex items-center justify-center shadow-md group-hover:bg-[#222222] transition-colors border border-gray-700">
                <Code2 className="w-6 h-6 text-[#B8860B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-[#222222] group-hover:text-[#3A3F44] transition-colors">
                  Tech<span className="text-[#B8860B]">Works</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A8F94] -mt-1">
                  Software • Cloud • AI
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold text-[#3A3F44] hover:text-[#B8860B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B8860B] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Admin Portal Button */}
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#3A3F44] hover:text-[#222222] bg-[#F5F6F7] hover:bg-[#EEF0F2] rounded-lg border border-[#D9DDE1] transition-all cursor-pointer shadow-xs"
                title="Admin Inquiries Management"
              >
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>Admin</span>
              </button>

              {/* Consultation / Quote CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#3A3F44] hover:bg-[#222222] border border-transparent hover:border-[#3A3F44] shadow-sm hover:shadow-md transition-all group"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#B8860B] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenAdmin}
                className="sm:hidden p-2 text-[#3A3F44] hover:text-[#B8860B] bg-[#F5F6F7] rounded-lg border border-[#EEF0F2]"
                title="Admin"
              >
                <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-[#3A3F44] hover:text-[#222222] hover:bg-[#F5F6F7] rounded-lg border border-[#EEF0F2] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EEF0F2] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 text-base font-semibold text-[#3A3F44] hover:bg-[#F5F6F7] hover:text-[#B8860B] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-3 mt-2 border-t border-[#EEF0F2] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#3A3F44] bg-[#F5F6F7] rounded-lg border border-[#D9DDE1]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                  <span>Admin Panel (Inquiries & Leads)</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#3A3F44] hover:bg-[#222222] rounded-lg shadow-sm"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#B8860B]" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
