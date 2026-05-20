import { useState } from 'react';
import { X, Check, Copy, Network, Terminal, ShieldAlert, MonitorPlay, Code } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reseau': return <Network className="w-5 h-5 text-indigo-400" />;
      case 'systeme': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'cybersecurite': return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'web': return <Code className="w-5 h-5 text-cyan-400" />;
      default: return <MonitorPlay className="w-5 h-5 text-purple-400" />;
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="border-b border-slate-800/80 p-5 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              {getCategoryIcon(project.category)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold block">
                Projet {project.category.replace('systeme', 'système').replace('reseau', 'réseau')}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Overview */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-2 font-mono flex items-center gap-1.5">
              <span>//</span> Description du Projet
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Section 2: Architecture / Technical details */}
          {project.architecture && project.architecture.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-2.5 font-mono flex items-center gap-1.5">
                <span>//</span> Spécifications & Architecture
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.architecture.map((arch, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-950/50 border border-slate-850 p-2.5 rounded-lg text-xs font-mono text-slate-300">
                    <span className="text-indigo-400 mt-0.5">●</span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Key Config Commands */}
          {project.commands && project.commands.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-2.5 font-mono flex items-center gap-1.5">
                <span>//</span> Commandes Clés & Scripts
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Quelques exemples de commandes et scripts exécutés pour ce projet (cliquez pour copier) :
              </p>
              
              <div className="space-y-3">
                {project.commands.map((cmd, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-black border border-slate-850 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto pr-12 scrollbar-thin">
                      <code className="whitespace-pre">{cmd}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd, index)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Copier la commande"
                    >
                      {copiedIndex === index ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Key Results / Deliverables */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-2.5 font-mono flex items-center gap-1.5">
              <span>//</span> Résultats & Validation
            </h4>
            <div className="space-y-2">
              {project.results.map((res, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 rounded-full bg-emerald-950 border border-emerald-800 p-0.5 text-emerald-400">
                    <Check size={12} />
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Technologies used */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-2 font-mono flex items-center gap-1.5">
              <span>//</span> Technologies Employées
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.technologies.map(tech => (
                <span key={tech} className="text-xs font-mono bg-indigo-950/40 border border-indigo-900/60 text-indigo-300 px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800/80 p-5 bg-slate-900/50 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer"
          >
            Fermer le Projet
          </button>
        </div>

      </div>
    </div>
  );
}
