// src/lib/schemas/project.ts
import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional(),
  techStack: z.array(z.string()),
  buildBlogLink: z.string().optional(),
  worksBlogLink: z.string().optional(),
  liveProjectLink: z.string().optional(),
  githubLink: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;