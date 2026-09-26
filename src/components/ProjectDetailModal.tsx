import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestThisProject: (title: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestThisProject,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#D9DDE1] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-56 w-full bg-[#3A3F44] overflow-hidden shrink-0">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-[#222222]">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500 text-white">
                {project.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Key Metric Highlight */}
          <div className="p-4 rounded-2xl bg-[#F5F6F7] border border-[#EEF0F2] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#B8860B] shrink-0" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8A8F94]">
                Production Impact
              </div>
              <div className="text-sm font-extrabold text-[#222222]">
                {project.metrics}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-2">
              System Overview & Architecture
            </h4>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Deliverables Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A3F44] mb-3">
              Core Deliverables & System Modules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 text-xs font-semibold text-[#3A3F44] p-3 rounded-xl bg-[#F5F6F7] border border-[#EEF0F2]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Details */}
          <div className="pt-4 border-t border-[#EEF0F2] flex items-center justify-between text-xs text-[#8A8F94]">
            <span>Delivered For: <strong>{project.client}</strong></span>
            <span>Delivery Verification: Commercial Live Production</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#F5F6F7] border-t border-[#D9DDE1] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-[#555555] hover:text-[#222222] bg-white border border-[#D9DDE1] transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestThisProject(project.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3A3F44] hover:bg-[#222222] transition-colors cursor-pointer shadow-xs"
          >
            <span>Request Similar System For Your Business</span>
            <ArrowRight className="w-4 h-4 text-[#B8860B]" />
          </button>
        </div>

      </div>
    </div>
  );
};
