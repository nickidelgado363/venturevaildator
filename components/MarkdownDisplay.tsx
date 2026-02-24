import React from 'react';

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content, className = '' }) => {
  // Split by double newline to identify paragraphs
  const blocks = content.split('\n');

  return (
    <div className={`space-y-3 text-slate-300 ${className}`}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headers
        if (trimmed.startsWith('### ')) {
          return <h4 key={index} className="text-lg font-bold text-teal-400 mt-4 mb-2">{trimmed.replace('### ', '')}</h4>;
        }
        if (trimmed.startsWith('## ')) {
          return <h3 key={index} className="text-xl font-bold text-white mt-6 mb-3 border-b border-slate-700 pb-1">{trimmed.replace('## ', '')}</h3>;
        }
        if (trimmed.startsWith('# ')) {
          return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-4">{trimmed.replace('# ', '')}</h2>;
        }

        // List items
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.substring(2);
          return (
            <div key={index} className="flex items-start ml-2">
              <span className="text-teal-500 mr-2 mt-1.5">•</span>
              <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
            </div>
          );
        }

        // Numbered lists (simple detection)
        if (/^\d+\.\s/.test(trimmed)) {
           const itemText = trimmed.replace(/^\d+\.\s/, '');
           return (
             <div key={index} className="flex items-start ml-2">
               <span className="text-teal-500 mr-2 font-mono text-sm mt-1">{trimmed.match(/^\d+\./)?.[0]}</span>
               <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
             </div>
           );
        }

        // Regular Paragraph
        return <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />;
      })}
    </div>
  );
};

// Helper to handle bold (**text**) and italic (*text*)
const formatInline = (text: string): string => {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-slate-400">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-sm font-mono text-teal-300">$1</code>');
  return formatted;
};

export default MarkdownDisplay;
