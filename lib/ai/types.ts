export type UploadRequest = {
  file?: File;
  linkedInUrl?: string;
};

export type GenerationJobStatus = "queued" | "processing" | "ready" | "error";

export type GenerationResult = {
  jobId: string;
  summary: string;
  structuredData: ParsedResume;
  html: string;
  shareSlug: string;
  downloadUrl: string;
};

export type ParsedResume = {
  experience: Array<{
    company: string;
    title: string;
    startDate?: string;
    endDate?: string;
    responsibilities: string[];
    location?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link?: string;
    technologies?: string[];
  }>;
  contact: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    social?: Array<{ label: string; url: string }>;
  };
};
