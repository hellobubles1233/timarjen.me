export interface Project {
  uuid: string;
  created_at: string;
  title: string;
  status: string;
  ended_at: string | null;
  lead: string;
  tags: string[];
  content: any;
}

export interface Experience {
  uuid: string;
  created_at: string;
  ended_at: string | null;
  company: string;
  jobtitle: string;
  content: any;
  tags: string[];
  type: string;
}

export interface Media {
  uuid: string;
  created_at: string;
  title: string;
  type: string;
  madeby: string;
  release: number;
  comment: string;
  reconsumed: number;
  rating: number;
}

export interface Product {
  uuid: string;
  created_at: string;
  title: string;
  description: string;
  rating: number;
  img_url: string;
  type: string;
}