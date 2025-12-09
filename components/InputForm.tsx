import React, { useRef } from 'react';
import { UserInput } from '../types';
import { TOP_TECH_COMPANIES, LEVELS } from '../constants';
import { Upload, FileText, CheckCircle, Search, Briefcase, Code, User, AlertCircle } from 'lucide-react';

interface InputFormProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ input, setInput, onSubmit, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInput(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setInput(prev => ({ ...prev, file }));
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Target Company */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center">
          <Briefcase className="w-4 h-4 mr-2 text-brand-600" />
          Target Company
        </label>
        <div className="relative">
          <select
            value={input.company}
            onChange={(e) => setInput(prev => ({ ...prev, company: e.target.value }))}
            className="w-full pl-3 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all appearance-none text-slate-700 font-medium"
          >
            <option value="">Select a Top 100 Tech Company...</option>
            {TOP_TECH_COMPANIES.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 2. Resume Upload */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center">
          <FileText className="w-4 h-4 mr-2 text-brand-600" />
          Upload Resume (PDF)
        </label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all group
            ${input.file 
              ? 'border-brand-300 bg-brand-50' 
              : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50'
            }
          `}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
          
          {input.file ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <CheckCircle className="w-10 h-10 text-brand-500 mb-2" />
              <p className="text-sm font-medium text-brand-800">{input.file.name}</p>
              <p className="text-xs text-brand-600 mt-1">{(input.file.size / 1024 / 1024).toFixed(2)} MB</p>
              <span className="text-xs text-brand-500 mt-2 hover:underline">Click to change</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-500" />
              </div>
              <p className="text-sm font-medium text-slate-600">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-400 mt-1">PDF only (Max 5MB recommended)</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Role Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
                <User className="w-4 h-4 mr-2 text-brand-600" />
                Target Role
            </label>
            <input
                type="text"
                value={input.role}
                onChange={(e) => setInput(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-brand-600" />
                Level / Seniority
            </label>
            <select
                value={input.level}
                onChange={(e) => setInput(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            >
                <option value="">Select Level...</option>
                {LEVELS.map(l => (
                    <option key={l} value={l}>{l}</option>
                ))}
            </select>
        </div>
      </div>

      {/* 4. Tech Stack & Skills */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center">
            <Code className="w-4 h-4 mr-2 text-brand-600" />
            Key Tech Stack & Skills
        </label>
        <textarea
            value={input.skills}
            onChange={(e) => setInput(prev => ({ ...prev, skills: e.target.value }))}
            placeholder="e.g. React, TypeScript, Node.js, AWS, System Design, GraphQL..."
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all h-24 resize-none"
        />
      </div>

       {/* 5. Custom Notes */}
       <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Additional Context (Optional)</label>
        <textarea
            value={input.notes}
            onChange={(e) => setInput(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any specific achievements to highlight? Visa requirements? Relocation preference?"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all h-20 resize-none text-sm text-slate-600"
        />
      </div>

      <div className="pt-2">
        <button
            onClick={onSubmit}
            disabled={!input.file || !input.company || !input.role || isLoading}
            className={`
                w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center
                ${!input.file || !input.company || !input.role || isLoading
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-700 hover:to-teal-600 text-white hover:scale-[1.02] hover:shadow-brand-500/30'
                }
            `}
        >
            {isLoading ? (
                <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking Deeply... (this may take a minute)
                </>
            ) : (
                "Tailor My Resume"
            )}
        </button>
      </div>

    </div>
  );
};
