import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            VentureValidator
          </h1>
          <p className="text-xs text-slate-500 tracking-wider">AI VENTURE CAPITALIST</p>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400 border border-slate-800 px-3 py-1.5 rounded-full">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Powered by Gemini 2.5</span>
      </div>
    </header>
  );
};

export default Header;
