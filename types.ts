import React from 'react';

export interface AnalysisResult {
  leanPrd: string;
  marketResearch: string;
  branding: string;
  gtmStrategy: string;
  swot: string;
  viabilityScore: number;
  viabilityReasoning: string;
  tagline: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AnalysisSectionProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  delay?: number;
}