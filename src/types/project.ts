export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  featured: boolean;
  highlights: string[];
}

export interface ProjectStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  plannedProjects: number;
}