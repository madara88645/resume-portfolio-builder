import { z } from "zod";

export const ResumeSchema = z.object({
  experience: z
    .array(
      z.object({
        company: z.string().min(1),
        title: z.string().min(1),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        responsibilities: z.array(z.string()).default([]),
        location: z.string().optional(),
      })
    )
    .default([]),
  education: z
    .array(
      z.object({
        institution: z.string().min(1),
        degree: z.string().min(1),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .default([]),
  skills: z.array(z.string()).default([]),
  projects: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        link: z.string().url().optional(),
        technologies: z.array(z.string()).default([]),
      })
    )
    .default([]),
  contact: z
    .object({
      fullName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      location: z.string().optional(),
      website: z.string().url().optional(),
      social: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    })
    .default({}),
});

export type ResumePayload = z.infer<typeof ResumeSchema>;
