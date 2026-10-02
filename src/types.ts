export type CategoryType = 'ALL' | 'AI_CV' | 'SMART_SYSTEMS' | 'GAMES_WEB';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: CategoryType;
  categoryName: string;
  problem: string;
  solution: string;
  builtDetails: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  architecture: {
    inputs: string[];
    coreEngine: string;
    outputs: string[];
  };
  highlights: string[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
}

export type ViewMode = 'DOSSIER' | 'MATRIX' | 'ARCHITECT';

export interface TelemetryState {
  timeIST: string;
  githubStars: number;
  reposCount: number;
  liveDeploysCount: number;
}
