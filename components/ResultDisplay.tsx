import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { OptimizationResult, ResumeStyle } from '../types';
import { RESUME_STYLES } from '../constants';
import { FileDown, Copy, Check, Sparkles, Lightbulb, Printer, ChevronDown, Type } from 'lucide-react';
import { Button } from './Button';

interface ResultDisplayProps {
  result: OptimizationResult;
  companyName: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, companyName }) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'strategy'>('resume');
  const [activeStyle, setActiveStyle] = useState<ResumeStyle>(RESUME_STYLES[0]);
  const [hoveredStyle, setHoveredStyle] = useState<ResumeStyle | null>(null);
  const [copied, setCopied] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  const handleCopy = () => {
    const content = activeTab === 'resume' ? result.resume : result.strategy;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (activeTab !== 'resume') {
        setActiveTab('resume');
        // Allow render cycle to complete before printing
        setTimeout(() => {
            window.print();
        }, 300);
    } else {
        window.print();
    }
  };

  const currentStyle = hoveredStyle || activeStyle;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      
      {/* Header Tabs & Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50 gap-3">
        {/* Tabs */}
        <div className="flex space-x-2 bg-slate-200/50 p-1 rounded-lg w-full md:w-auto">
            <button
                onClick={() => setActiveTab('resume')}
                className={`
                    flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center
                    ${activeTab === 'resume' 
                        ? 'bg-white text-brand-700 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }
                `}
            >
                <Sparkles className="w-4 h-4 mr-2" />
                Resume
            </button>
            <button
                onClick={() => setActiveTab('strategy')}
                className={`
                    flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center
                    ${activeTab === 'strategy' 
                        ? 'bg-white text-indigo-700 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }
                `}
            >
                <Lightbulb className="w-4 h-4 mr-2" />
                Strategy
            </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            {activeTab === 'resume' && (
                <div className="relative">
                    <button 
                        onClick={() => setShowStyleMenu(!showStyleMenu)}
                        className="flex items-center px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-brand-500 transition-colors text-slate-700"
                    >
                        <Type className="w-4 h-4 mr-2 text-slate-500" />
                        {activeStyle.name}
                        <ChevronDown className="w-3 h-3 ml-2 text-slate-400" />
                    </button>
                    
                    {showStyleMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowStyleMenu(false)}></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 max-h-80 overflow-y-auto">
                                {RESUME_STYLES.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => {
                                            setActiveStyle(style);
                                            setShowStyleMenu(false);
                                            setHoveredStyle(null);
                                        }}
                                        onMouseEnter={() => setHoveredStyle(style)}
                                        onMouseLeave={() => setHoveredStyle(null)}
                                        className={`
                                            w-full text-left px-4 py-2 text-xs flex items-center transition-colors duration-150
                                            ${activeStyle.id === style.id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                                        `}
                                    >
                                        {style.name}
                                        {activeStyle.id === style.id && <Check className="w-3 h-3 ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            <Button 
                variant="outline" 
                onClick={handleCopy} 
                className="!px-3 !py-2 h-9 text-xs"
                title="Copy to clipboard"
            >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            
            <Button 
                variant="primary" 
                onClick={handleDownloadPDF} 
                className="!px-3 !py-2 h-9 text-xs"
                title={activeTab === 'resume' ? "Save as PDF" : "Print Strategy"}
            >
                {activeTab === 'resume' ? (
                    <>
                        <FileDown className="w-4 h-4 mr-2" />
                        Save PDF
                    </>
                ) : (
                    <Printer className="w-4 h-4" />
                )}
            </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 custom-scrollbar relative">
        <div className="max-w-[210mm] mx-auto min-h-[297mm]"> 
            {activeTab === 'resume' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className={`mb-6 p-4 border rounded-lg text-sm flex items-start no-print transition-colors duration-300 ${
                        hoveredStyle 
                            ? 'bg-indigo-50 border-indigo-100 text-indigo-800' 
                            : 'bg-brand-50 border-brand-100 text-brand-800'
                     }`}>
                        <Sparkles className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${hoveredStyle ? 'text-indigo-600' : 'text-brand-600'}`} />
                        <div>
                            {hoveredStyle ? (
                                <>
                                    <strong>Previewing {hoveredStyle.name}:</strong> Click to apply this style. Move mouse away to revert.
                                </>
                            ) : (
                                <>
                                    <strong>Optimized for {companyName}:</strong> This resume has been tailored to match {companyName}'s culture. 
                                    Select a style from the menu above, then click <b>Save PDF</b>. In the print dialog, select "Save as PDF".
                                </>
                            )}
                        </div>
                     </div>
                     
                     {/* Resume Content Wrapper for Print */}
                     <div 
                        id="printable-content" 
                        className={`
                            ${currentStyle.containerClass} ${currentStyle.fontFamily}
                            p-8 md:p-12 shadow-sm border border-slate-200 rounded-sm
                            transition-all duration-300 ease-in-out
                        `}
                     >
                        <article className={`markdown-body prose max-w-none ${currentStyle.proseClass} transition-all duration-300 ease-in-out`}>
                            <ReactMarkdown>{result.resume}</ReactMarkdown>
                        </article>
                     </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-800 flex items-start no-print">
                        <Lightbulb className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-indigo-600" />
                        <div>
                            <strong>Targeting Strategy:</strong> Use these insights to prepare for your interviews and customize your cover letter.
                        </div>
                     </div>
                     
                     <div id="printable-strategy" className="bg-white p-8 md:p-12 shadow-sm border border-slate-200 rounded-sm">
                        <article className="markdown-body prose prose-slate prose-indigo max-w-none prose-headings:text-indigo-900">
                            <ReactMarkdown>{result.strategy}</ReactMarkdown>
                        </article>
                     </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};