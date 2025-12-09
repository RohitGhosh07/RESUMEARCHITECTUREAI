import { GoogleGenAI } from "@google/genai";
import { UserInput, OptimizationResult } from "../types";

const SYSTEM_INSTRUCTION = `You are an expert Recruitment and Resume Tailoring AI with deep knowledge of the hiring practices of top global technology companies.
Your goal is to help candidates optimize their resumes to pass ATS (Applicant Tracking Systems) and impress hiring managers at specific target companies.

When analyzing a resume, you must:
1. Identify the gaps between the candidate's current profile and the target role/company culture.
2. Rewrite content to be action-oriented, quantifiable, and culturally aligned with the target company.
3. Prioritize achievements over responsibilities.
4. Use the specific keywords and terminology favored by the target company.

You must output your response in a structured way that separates the Tailored Resume from the Company Strategy.
`;

const fileToPart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateTailoredContent = async (input: UserInput): Promise<OptimizationResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare the prompt
  const promptText = `
    I am targeting a role at **${input.company}**.
    
    My details:
    - Target Role: ${input.role}
    - Level: ${input.level}
    - Key Skills: ${input.skills}
    - Additional Context: ${input.notes}

    Please perform the following tasks based on my attached resume PDF:

    1. **Tailored Resume Generation**: Rewrite my resume to be fully optimized for ${input.company}. 
       - Align with ${input.company}'s specific culture and values.
       - Use their preferred language style.
       - Focus on measurable impact.
       - Ensure it is ATS friendly.
       - Do NOT invent experiences, but reframe existing ones to match the target.
       - Structure it professionally (Summary, Skills, Experience, Education, etc.).

    2. **Company Strategy Guide**: Create a specific guide for landing this job at ${input.company}.
       - What specific culture fit keywords should I emphasize?
       - What technical stack is most critical?
       - How should I position myself in the interview?
       - What are their specific hiring values?

    **Output Format Requirement:**
    Please separate the two sections clearly with the following delimiters:
    
    ===== Tailored Resume for ${input.company} =====
    (The full markdown resume content goes here)

    ===== Company Target Strategy =====
    (The strategy guide content goes here)
  `;

  const parts: any[] = [{ text: promptText }];

  if (input.file) {
    const pdfPart = await fileToPart(input.file);
    parts.push(pdfPart);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: parts
      },
      config: {
        thinkingConfig: {
            thinkingBudget: 32768
        },
        temperature: 0.7, // Slightly creative but grounded
      }
    });

    const fullText = response.text || "";

    // Parse the output based on delimiters
    const resumeDelimiter = `===== Tailored Resume for ${input.company} =====`;
    const strategyDelimiter = `===== Company Target Strategy =====`;

    let resume = "";
    let strategy = "";

    const resumeIndex = fullText.indexOf(resumeDelimiter);
    const strategyIndex = fullText.indexOf(strategyDelimiter);

    if (resumeIndex !== -1 && strategyIndex !== -1) {
      resume = fullText.substring(resumeIndex + resumeDelimiter.length, strategyIndex).trim();
      strategy = fullText.substring(strategyIndex + strategyDelimiter.length).trim();
    } else {
        // Fallback if delimiters are messy
        resume = fullText;
        strategy = "Could not parse strategy section separately. Please check the full output.";
    }

    return { resume, strategy };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
