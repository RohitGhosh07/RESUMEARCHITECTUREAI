import { Company, ResumeStyle } from './types';

export const TOP_TECH_COMPANIES: Company[] = [
  { id: 'google', name: 'Google' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'meta', name: 'Meta' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'apple', name: 'Apple' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'nvidia', name: 'Nvidia' },
  { id: 'adobe', name: 'Adobe' },
  { id: 'uber', name: 'Uber' },
  { id: 'airbnb', name: 'Airbnb' },
  { id: 'oracle', name: 'Oracle' },
  { id: 'salesforce', name: 'Salesforce' },
  { id: 'sap', name: 'SAP' },
  { id: 'ibm', name: 'IBM' },
  { id: 'intel', name: 'Intel' },
  { id: 'cisco', name: 'Cisco' },
  { id: 'qualcomm', name: 'Qualcomm' },
  { id: 'tcs', name: 'TCS' },
  { id: 'infosys', name: 'Infosys' },
  { id: 'wipro', name: 'Wipro' },
  { id: 'accenture', name: 'Accenture' },
  { id: 'deloitte', name: 'Deloitte' },
  { id: 'stripe', name: 'Stripe' },
  { id: 'spotify', name: 'Spotify' },
  { id: 'shopify', name: 'Shopify' },
  { id: 'palantir', name: 'Palantir' },
  { id: 'snowflake', name: 'Snowflake' },
  { id: 'databricks', name: 'Databricks' },
  { id: 'atlassian', name: 'Atlassian' },
];

export const LEVELS = [
  'Intern',
  'Junior / Associate',
  'Mid-Level',
  'Senior',
  'Staff / Principal',
  'Lead / Manager',
  'Executive (Director/VP/C-Level)'
];

export const RESUME_STYLES: ResumeStyle[] = [
  {
    id: 'harvard',
    name: 'Harvard Classic',
    fontFamily: 'font-serif',
    containerClass: 'bg-white text-slate-900',
    proseClass: 'prose-slate prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:font-serif prose-p:text-slate-800'
  },
  {
    id: 'silicon_valley',
    name: 'Silicon Valley',
    fontFamily: 'font-sans',
    containerClass: 'bg-white text-slate-800',
    proseClass: 'prose-slate prose-headings:font-sans prose-headings:text-brand-700 prose-headings:tracking-tight prose-hr:border-brand-200'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Mono',
    fontFamily: 'font-mono',
    containerClass: 'bg-white text-slate-700',
    proseClass: 'prose-zinc prose-headings:font-mono prose-headings:font-medium prose-headings:uppercase prose-headings:text-sm prose-headings:tracking-widest prose-p:text-xs prose-li:text-xs'
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    fontFamily: 'font-playfair',
    containerClass: 'bg-white text-slate-900',
    proseClass: 'prose-slate prose-headings:font-playfair prose-headings:text-center prose-headings:font-normal prose-headings:italic prose-hr:border-slate-300 prose-p:text-justify'
  },
  {
    id: 'modern_tech',
    name: 'Modern Tech',
    fontFamily: 'font-roboto',
    containerClass: 'bg-white text-slate-800',
    proseClass: 'prose-slate prose-headings:font-roboto prose-headings:text-teal-700 prose-headings:border-b-2 prose-headings:border-teal-100 prose-headings:pb-1'
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    fontFamily: 'font-oswald',
    containerClass: 'bg-white text-slate-900',
    proseClass: 'prose-neutral prose-headings:font-oswald prose-headings:uppercase prose-headings:text-4xl prose-headings:tracking-wide prose-headings:border-b-4 prose-headings:border-black'
  },
  {
    id: 'clean_lato',
    name: 'Clean Lato',
    fontFamily: 'font-lato',
    containerClass: 'bg-white text-slate-600',
    proseClass: 'prose-slate prose-headings:font-lato prose-headings:text-slate-800 prose-headings:font-black'
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    fontFamily: 'font-open',
    containerClass: 'bg-white text-slate-800',
    proseClass: 'prose-blue prose-headings:font-open prose-headings:text-blue-900 prose-headings:font-bold prose-a:text-blue-700'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    fontFamily: 'font-source',
    containerClass: 'bg-white text-slate-800',
    proseClass: 'prose-slate prose-headings:font-source prose-headings:text-green-700 prose-code:text-green-700 prose-code:bg-green-50 prose-code:px-1 prose-code:rounded'
  },
  {
    id: 'swiss',
    name: 'Swiss Grid',
    fontFamily: 'font-sans',
    containerClass: 'bg-white text-slate-900',
    proseClass: 'prose-neutral prose-headings:font-bold prose-headings:text-black prose-hr:border-black prose-hr:border-2 prose-p:font-medium'
  }
];