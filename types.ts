export interface Company {
  id: string;
  name: string;
}

export interface UserInput {
  company: string;
  role: string;
  skills: string;
  level: string;
  notes: string;
  file: File | null;
}

export interface OptimizationResult {
  resume: string;
  strategy: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ResumeStyle {
  id: string;
  name: string;
  fontFamily: string;
  containerClass: string;
  proseClass: string;
}