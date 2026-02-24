import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import MarkdownDisplay from './MarkdownDisplay';
import ScoreGauge from './ScoreGauge';
import { 
  FileText, 
  Globe, 
  Palette, 
  Rocket, 
  ShieldAlert, 
  Download, 
  Share2,
  ChevronRight
} from 'lucide-react';

interface AnalysisViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<'prd' | 'market' | 'brand' | 'gtm' | 'swot'>('prd');

  const tabs = [
    { id: 'prd', label: 'Lean PRD', icon: FileText },
    { id: 'market', label: 'Market Research', icon: Globe },
    { id: 'brand', label: 'Branding', icon: Palette },
    { id: 'gtm', label: 'GTM Strategy', icon: Rocket },
    { id: 'swot', label: 'SWOT', icon: ShieldAlert },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Top Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Rocket className="w-32 h-32 text-teal-500" />
           </div>
           <div className="relative z-10">
             <div className="inline-flex items-center space-x-2 bg-teal-500/10 text-teal-400 text-xs font-bold px-2 py-1 rounded mb-4">
               <span>ANALYSIS COMPLETE</span>
             </div>
             <h2 className="text-3xl font-bold text-white mb-2">{result.tagline}</h2>
             <p className="text-slate-400 mb-6 max-w-lg">{result.viabilityReasoning}</p>
             
             <div className="flex space-x-3">
               <button 
                onClick={onReset}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
               >
                 Analyze Another Idea
               </button>
             </div>
           </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative">
          <div className="w-full">
            <ScoreGauge score={result.viabilityScore} />
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-slate-500">
              {result.viabilityScore >= 80 ? "Highly Investable" : 
               result.viabilityScore >= 60 ? "Promising with Risks" : 
               "Significant Pivots Needed"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <div className="sticky top-24">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Report Sections</h3>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/10 text-white border border-teal-500/30' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-teal-500" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Display */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl min-h-[600px] p-8 relative">
            
            {/* Tab Header */}
            <div className="flex items-center space-x-3 mb-8 pb-8 border-b border-slate-800">
              <div className="p-3 bg-slate-800 rounded-lg">
                {activeTab === 'prd' && <FileText className="w-6 h-6 text-teal-400" />}
                {activeTab === 'market' && <Globe className="w-6 h-6 text-blue-400" />}
                {activeTab === 'brand' && <Palette className="w-6 h-6 text-purple-400" />}
                {activeTab === 'gtm' && <Rocket className="w-6 h-6 text-orange-400" />}
                {activeTab === 'swot' && <ShieldAlert className="w-6 h-6 text-red-400" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-slate-500">
                  {activeTab === 'prd' && "Product Requirements & Specs"}
                  {activeTab === 'market' && "Landscape & Competitors"}
                  {activeTab === 'brand' && "Identity & Positioning"}
                  {activeTab === 'gtm' && "Launch & Sales Strategy"}
                  {activeTab === 'swot' && "Strengths, Weaknesses, Opps, Threats"}
                </p>
              </div>
            </div>

            {/* Content Render */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {activeTab === 'prd' && <MarkdownDisplay content={result.leanPrd} />}
              {activeTab === 'market' && <MarkdownDisplay content={result.marketResearch} />}
              {activeTab === 'brand' && <MarkdownDisplay content={result.branding} />}
              {activeTab === 'gtm' && <MarkdownDisplay content={result.gtmStrategy} />}
              {activeTab === 'swot' && <MarkdownDisplay content={result.swot} />}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
