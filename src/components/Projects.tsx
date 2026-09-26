import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onOpenProjectDetail: (project: ProjectItem) => void;
  onRequestSimilarProject: (projectTitle: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  onOpenProjectDetail,
  onRequestSimilarProject 
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const checkScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Calculate current slide index based on card width + gap
    const cardWidth = 360 + 24; // approx card + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlideIndex(Math.min(Math.max(0, index), PROJECTS.length - 1));
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollState, { passive: true });
      checkScrollState();
      return () => el.removeEventListener('scroll', checkScrollState);
    }
  }, []);

  const slideLeft = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const slideRight = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.querySelectorAll('.project-card-slide');
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white border-b border-[#EEF0F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left/Right Slide Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5F6F7] text-xs font-bold uppercase tracking-wider text-[#3A3F44] border border-[#D9DDE1] mb-4">
              Featured Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight mb-4">
              10+ Successful Deliveries Across Diverse Industries
            </h2>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              Explore our proven software products in production—slide through commercial dental clinic management, plumbing service ERPs, smart inventory tracking, gym platforms, and academic portals.
            </p>
          </div>

          {/* Controls & Metrics */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={slideLeft}
                disabled={!canScrollLeft}
                className="w-12 h-12 rounded-xl bg-white border border-[#D9DDE1] hover:border-[#3A3F44] text-[#3A3F44] hover:bg-[#F5F6F7] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                aria-label="Slide Left"
                title="Previous Projects"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={slideRight}
                disabled={!canScrollRight}
                className="w-12 h-12 rounded-xl bg-[#3A3F44] hover:bg-[#222222] text-white disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Slide Right"
                title="Next Projects"
              >
                <ChevronRight className="w-6 h-6 text-[#B8860B]" />
              </button>
            </div>

            {/* Total Count Badge */}
            <div className="hidden sm:flex items-center gap-3 p-3 px-4 rounded-xl bg-[#F5F6F7] border border-[#D9DDE1]">
              <div className="w-9 h-9 rounded-lg bg-[#3A3F44] text-[#B8860B] flex items-center justify-center font-extrabold text-sm shadow-xs">
                10+
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#222222]">Live Deliveries</div>
                <div className="text-[#8A8F94]">Slide to View All</div>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe Hint for Mobile */}
        <div className="flex items-center justify-between sm:hidden mb-3 text-xs text-[#8A8F94] font-medium">
          <span>Swipe left / right to browse</span>
          <span>{activeSlideIndex + 1} of {PROJECTS.length}</span>
        </div>

        {/* Horizontal Sliding Carousel Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory focus:outline-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="project-card-slide flex-none w-[88vw] sm:w-[380px] lg:w-[410px] snap-start bg-white rounded-2xl border border-[#D9DDE1] hover:border-[#3A3F44] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group select-none"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-[#3A3F44]">
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/95 backdrop-blur-xs text-[#222222] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Status Pill on Image */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/95 text-white shadow-sm backdrop-blur-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {project.status}
                    </span>
                  </div>

                  {/* Client title overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-200">
                      Client: <strong className="text-white">{project.client}</strong>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#B8860B] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#3A3F44] transition-colors mb-2.5 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed mb-5 line-clamp-3">
                    {project.shortDesc}
                  </p>

                  {/* Metrics Banner */}
                  <div className="px-3.5 py-2.5 rounded-xl bg-[#F5F6F7] border border-[#EEF0F2] text-xs font-semibold text-[#3A3F44] flex items-center gap-2 group-hover:border-[#D9DDE1] transition-colors">
                    <Sparkles className="w-4 h-4 text-[#B8860B] shrink-0" />
                    <span className="truncate">{project.metrics}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-[#F5F6F7] mt-auto">
                <div className="grid grid-cols-2 gap-2.5 pt-4">
                  <button
                    onClick={() => onOpenProjectDetail(project)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-[#3A3F44] bg-[#F5F6F7] hover:bg-[#EEF0F2] border border-[#D9DDE1] transition-all cursor-pointer hover:shadow-xs active:scale-98"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Case Study</span>
                  </button>

                  <button
                    onClick={() => onRequestSimilarProject(project.title)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#3A3F44] hover:bg-[#222222] transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-98"
                  >
                    <span>Build Similar</span>
                    <ArrowRight className="w-3 h-3 text-[#B8860B]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Pagination Bar & Dots */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EEF0F2]">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeSlideIndex
                    ? 'w-8 bg-[#3A3F44]'
                    : 'w-2.5 bg-gray-200 hover:bg-gray-400'
                }`}
                aria-label={`Go to project slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#8A8F94]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
              Slide left to right to discover all 10+ solutions
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
