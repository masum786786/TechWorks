import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  metric: string;
  metricLabel: string;
  features: string[];
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 's1',
    badge: 'Enterprise Software & Cloud Platforms',
    title: 'Custom High-Performance',
    highlight: 'Software & Cloud Engineering',
    description: 'Bespoke ERPs, real-time dispatch systems, and microservices engineered for flawless scalability and 99.9% uptime.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    metric: '10+',
    metricLabel: 'Commercial Deliveries',
    features: ['Custom Enterprise ERP', 'Cloud Infrastructure', 'Microservices Architecture'],
  },
  {
    id: 's2',
    badge: 'Mobile & Web Apps',
    title: 'Native Android Apps &',
    highlight: 'Next-Gen Web Platforms',
    description: 'Intuitive Play Store mobile apps and lightning-fast web applications built for high conversion and user retention.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    metric: '99.4%',
    metricLabel: 'Client Satisfaction',
    features: ['Android Mobile Apps', 'React & Next.js SPAs', 'Sub-second Response Times'],
  },
  {
    id: 's3',
    badge: 'Artificial Intelligence & LLMs',
    title: 'Autonomous AI Agents &',
    highlight: 'Private LLM Integration',
    description: 'Empower your enterprise with retrieval-augmented generation (RAG), customized Gemini/GPT models, and smart automation.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    metric: '24/7',
    metricLabel: 'Intelligent AI Operations',
    features: ['Custom LLM Fine-Tuning', 'Enterprise RAG Systems', 'Process Automation'],
  },
  {
    id: 's4',
    badge: 'SEO & Growth Marketing',
    title: 'High-Converting Meta Ads &',
    highlight: 'Top Google SEO Funnels',
    description: 'Data-driven customer acquisition delivering consistent high-intent client leads for clinics, services, and brands.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    metric: '3.5x',
    metricLabel: 'Average Lead Growth',
    features: ['Technical SEO Audits', 'High-ROI Meta Ad Funnels', 'Real-Time Attribution'],
  },
  {
    id: 's5',
    badge: 'Managed IT & 24/7 Support',
    title: 'Mission-Critical Cloud DevOps &',
    highlight: 'Proactive System Defense',
    description: 'Continuous uptime monitoring, cybersecurity hardening, and automated disaster recovery for businesses that never stop.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    metric: '99.9%',
    metricLabel: 'SLA Uptime Guarantee',
    features: ['24/7 Server Health Audits', 'Automated Daily Backups', 'Zero-Downtime Releases'],
  },
];

interface ImageBannerSliderProps {
  onRequestQuote: () => void;
  onExplorePortfolio: () => void;
}

export const ImageBannerSlider: React.FC<ImageBannerSliderProps> = ({
  onRequestQuote,
  onExplorePortfolio,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide smoothly every 2.4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const currentSlide = BANNER_SLIDES[currentIndex];

  return (
    <section 
      className="relative w-full bg-[#181A1C] text-white overflow-hidden border-b border-[#2d3136]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="TechWorks Live Solutions Slider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Unified Framed Slide Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[460px] sm:h-[500px] lg:h-[520px]">
          
          {/* Background Slides */}
          {BANNER_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-3000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                
                {/* Modern cinematic dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              </div>
            );
          })}

          {/* Slide Content Layer */}
          <div className="relative z-20 h-full p-6 sm:p-12 flex flex-col justify-between">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#B8860B] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-ping"></span>
                <span>{currentSlide.badge}</span>
              </div>

              {/* Slide Counter */}
              <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                0{currentIndex + 1} / 0{BANNER_SLIDES.length}
              </div>
            </div>

            {/* Middle Main Text */}
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {currentSlide.title}{' '}
                <span className="text-[#B8860B]">
                  {currentSlide.highlight}
                </span>
              </h2>

              <p className="text-xs sm:text-base text-gray-300 leading-relaxed mb-6 font-normal max-w-xl">
                {currentSlide.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentSlide.features.map((feat, fidx) => (
                  <span 
                    key={fidx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md text-[11px] sm:text-xs font-medium text-gray-200 border border-white/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onRequestQuote}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-[#B8860B] hover:bg-[#d49b0d] shadow-md transition-all cursor-pointer group active:scale-98"
                >
                  <span>Request Custom Solution</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExplorePortfolio}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <span>Explore Deliveries</span>
                </button>
              </div>
            </div>

            {/* Bottom Row: Controls & Dots */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {BANNER_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? 'w-8 bg-[#B8860B]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-xl bg-black/40 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-xl bg-black/40 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
