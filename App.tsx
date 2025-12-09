import React, { useState } from 'react';
import { UserInput, OptimizationResult, AppStatus } from './types';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { generateTailoredContent } from './services/geminiService';
import { Rocket, BrainCircuit, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<UserInput>({
    company: '',
    role: '',
    skills: '',
    level: '',
    notes: '',
    file: null
  });
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const handleSubmit = async () => {
    setStatus(AppStatus.GENERATING);
    setError(null);
    try {
      const data = await generateTailoredContent(input);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during generation. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 z-10 relative shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200">
                    <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">ResumeArchitect AI</h1>
                    <p className="text-xs text-slate-500 font-medium flex items-center">
                        Powered by Gemini 3.0 Pro 
                        <span className="mx-1.5 w-1 h-1 rounded-full bg-slate-300"></span>
                        <BrainCircuit className="w-3 h-3 mr-1 text-purple-500" />
                        Reasoning Engine
                    </p>
                </div>
            </div>
            
            {status === AppStatus.SUCCESS && (
                <button 
                    onClick={handleReset}
                    className="flex items-center text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start New Optimization
                </button>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8 p-4 md:p-6 lg:p-8">
            
            {/* Left Panel: Inputs */}
            <div className={`
                flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out
                ${status === AppStatus.SUCCESS ? 'hidden md:flex md:w-1/3 lg:w-1/4 opacity-50 pointer-events-none' : 'w-full max-w-2xl mx-auto md:max-w-none'}
            `}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 overflow-y-auto custom-scrollbar h-full">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Build Your Sandbox</h2>
                        <p className="text-slate-500 text-sm">
                            Configure your target details. The AI will reason deeply to bridge the gap between your resume and the company's expectations.
                        </p>
                    </div>
                    
                    <InputForm 
                        input={input}
                        setInput={setInput}
                        onSubmit={handleSubmit}
                        isLoading={status === AppStatus.GENERATING}
                    />

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 flex items-start animate-pulse">
                            <div className="mr-3 mt-0.5">⚠️</div>
                            <div>{error}</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Output / Hero */}
            <div className={`
                flex-1 flex flex-col min-w-0 transition-all duration-500
                ${status === AppStatus.IDLE || status === AppStatus.GENERATING ? 'hidden md:flex items-center justify-center' : 'w-full'}
            `}>
                {status === AppStatus.SUCCESS && result ? (
                    <ResultDisplay result={result} companyName={input.company} />
                ) : (
                    <div className="hidden md:flex flex-col items-center justify-center text-center p-12 bg-white/50 border-2 border-dashed border-slate-200 rounded-2xl h-full w-full">
                        {status === AppStatus.GENERATING ? (
                             <div className="max-w-md w-full">
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-brand-100 rounded-full animate-ping absolute inset-0"></div>
                                        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center relative z-10 border border-brand-100">
                                            <BrainCircuit className="w-10 h-10 text-brand-500 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Resume Structure...</h3>
                                <p className="text-slate-500 mb-8">
                                    Gemini 3 Pro is thinking. It is cross-referencing {input.company}'s cultural values with your experience in {input.role}.
                                </p>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 animate-[loading_2s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                                </div>
                                <style>{`
                                    @keyframes loading {
                                        0% { transform: translateX(-100%); }
                                        100% { transform: translateX(250%); }
                                    }
                                `}</style>
                             </div>
                        ) : (
                            <div className="max-w-md">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                                    <ArrowRight className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Optimize</h3>
                                <p className="text-slate-500">
                                    Select a company and upload your resume on the left to generate a tailored profile and interview strategy.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

             {/* Mobile View Toggle Logic: Simplified for clarity, we just hide/show based on status above */}
             {status === AppStatus.SUCCESS && (
                <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                     <button 
                        onClick={handleReset}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium shadow-lg flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Edit Inputs
                    </button>
                </div>
             )}
        </div>
      </main>
    </div>
  );
};

export default App;
