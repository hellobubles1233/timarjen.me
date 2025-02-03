export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  startDate: string;
  endDate?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  imageUrl?: string;
}

export interface ExperienceStats {
  totalYears: number;
  totalCompanies: number;
  totalRoles: number;
  technologiesUsed: number;
}