import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

declare global {
  interface ImportMeta {
    env: {
      VITE_API_KEY: string;
    };
  }
}

const SYSTEM_INSTRUCTION = `
You are a world-class Venture Capitalist, Product Manager, and Market Analyst acting as a co-founder advisor. 
Your goal is to take a raw business idea and rigorously analyze it. 
You must provide a "Lean PRD" (Product Requirements Document), in-depth Market Research, Branding/Positioning advice, a Go-To-Market (GTM) strategy, a SWOT analysis, and a brutally honest Viability Score (0-100).

Style Guide:
- Be concise but high-signal. Use bullet points where effective.
- Use professional, business-forward language.
- Format text using Markdown (headers, bolding, lists).
- For the 'viabilityScore', be realistic. 50 is average, 80+ is unicorn potential. Do not be overly optimistic.
`;

export const analyzeIdea = async (idea: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || "" });

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      tagline: {
        type: Type.STRING,
        description: "A catchy, short, modern tagline for the startup.",
      },
      leanPrd: {
        type: Type.STRING,
        description: "A Markdown formatted string containing: Problem Statement, Solution Overview, Key Features (MVP), and Target User Personas.",
      },
      marketResearch: {
        type: Type.STRING,
        description: "A Markdown formatted string containing: Market Size (TAM/SAM/SOM estimates), Competitor Analysis, and Trends.",
      },
      branding: {
        type: Type.STRING,
        description: "A Markdown formatted string containing: Brand Archetype, Suggested Name Ideas, Brand Voice, and Visual Identity suggestions.",
      },
      gtmStrategy: {
        type: Type.STRING,
        description: "A Markdown formatted string containing: Launch Strategy, Acquisition Channels, Pricing Model, and Sales Strategy.",
      },
      swot: {
        type: Type.STRING,
        description: "A Markdown formatted string containing the Strengths, Weaknesses, Opportunities, and Threats.",
      },
      viabilityScore: {
        type: Type.INTEGER,
        description: "An integer from 0 to 100 representing the viability of the business idea.",
      },
      viabilityReasoning: {
        type: Type.STRING,
        description: "A short paragraph explaining the reasoning behind the score.",
      },
    },
    required: ["tagline", "leanPrd", "marketResearch", "branding", "gtmStrategy", "swot", "viabilityScore", "viabilityReasoning"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following business idea:\n\n"${idea}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Balance creativity with analysis
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error("Failed to analyze the idea. Please try again.");
  }
};