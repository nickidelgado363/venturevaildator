import React, { useState } from 'react';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface IdeaInputProps {
  onAnalyze: (idea: string) => void;
  isLoading: boolean;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onAnalyze, isLoading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAnalyze(idea);
    }
  };

  const suggestions = [
    "Uber for dog walking in dense cities",
    "AI-powered meal planning for diabetics",
    "Marketplace for renting construction equipment",
    "Subscription box for hydroponic gardening"
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Validate your startup idea <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            in seconds.
          </span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          Get a comprehensive analysis including a Lean PRD, Market Research, Branding Strategy, and a VC Viability Score.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-slate-900 rounded-xl border border-slate-800 p-2 flex flex-col md:flex-row shadow-2xl">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your business idea in detail..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 p-4 outline-none resize-none h-32 md:h-auto text-lg"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit(e);
              }
            }}
          />
          <div className="flex flex-col justify-end p-2">
            <button
              type="submit"
              disabled={isLoading || !idea.trim()}
              className={`
                h-12 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300
                ${isLoading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-white text-slate-900 hover:bg-teal-50 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      {!isLoading && (
        <div className="mt-8">
          <p className="text-sm text-slate-500 text-center mb-4">Or try an example:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setIdea(s)}
                className="text-xs md:text-sm bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-teal-400 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-12 flex items-start space-x-3 text-xs text-slate-600 bg-slate-900/50 p-4 rounded-lg border border-slate-800/50">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          This tool uses advanced AI to generate insights. While helpful for brainstorming, 
          always conduct your own due diligence before making financial decisions.
        </p>
      </div>
    </div>
  );
};

export default IdeaInput;
