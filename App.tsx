import React, { useState } from 'react';
import Header from './components/Header';
import IdeaInput from './components/IdeaInput';
import AnalysisView from './components/AnalysisView';
import { analyzeIdea } from './services/geminiService';
import { AnalysisResult, AppState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (idea: string) => {
    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const result = await analyzeIdea(idea);
      setAnalysisResult(result);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAppState(AppState.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full">
          {appState === AppState.IDLE && (
            <div className="h-full flex items-center justify-center min-h-[80vh]">
              <IdeaInput onAnalyze={handleAnalyze} isLoading={false} />
            </div>
          )}

          {appState === AppState.ANALYZING && (
            <div className="h-full flex items-center justify-center min-h-[80vh]">
              <IdeaInput onAnalyze={() => {}} isLoading={true} />
            </div>
          )}

          {appState === AppState.SUCCESS && analysisResult && (
            <AnalysisView result={analysisResult} onReset={handleReset} />
          )}

          {appState === AppState.ERROR && (
            <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900 border border-red-900/50 rounded-xl text-center">
              <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
              <p className="text-slate-400 mb-6">{error}</p>
              <button 
                onClick={() => setAppState(AppState.IDLE)}
                className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-200 font-medium"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-slate-600 text-sm border-t border-slate-900 relative z-10 bg-slate-950">
        &copy; {new Date().getFullYear()} VentureValidator. Built with React & Gemini.
      </footer>
    </div>
  );
};

export default App;
