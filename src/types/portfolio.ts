export interface ProjectFeature {
  title: string;
  description: string;
  isSimulated?: boolean;
}

export interface ProjectArchitecture {
  summary: string;
  layers?: { name: string; description: string }[];
  diagramAvailable?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'Production App' | 'Portfolio Demo';
  statusDescription?: string;
  shortDescription: string;
  overview: string;
  problemSolution: string;
  technologies: string[];
  features: ProjectFeature[];
  contributions: string[];
  architecture?: ProjectArchitecture;
  limitations?: string[];
  sourceNote?: string;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  skills: string[];
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  sources?: { title: string; url?: string; snippet?: string }[];
  isError?: boolean;
}
