// src/shared/types.ts
export interface ProjectType {
  id?: string;
  title: string;
  description: string;
  thumbnail?: string;
  dateCreated?: string;
  techStack: string[];
  buildBlogLink?: string;
  worksBlogLink?: string;
  liveProjectLink?: string;
  githubLink?: string;
}

export interface Projects {
  projects: ProjectType[];
}

