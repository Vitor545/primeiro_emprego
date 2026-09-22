import { httpClient } from "./api/http-client"
import type {
  AiStatus,
  CoverLetter,
  InterviewFeedback,
  JobMatchAnalysis,
  ResumeSummarySuggestion,
} from "@/types/ai"

export const aiService = {
  status: () => httpClient<AiStatus>("/ai/status"),

  resumeSummary: (resumeId: string) =>
    httpClient<ResumeSummarySuggestion>("/ai/resume-summary", {
      method: "POST",
      body: { resumeId },
    }),

  jobMatch: (resumeId: string, jobDescription: string) =>
    httpClient<JobMatchAnalysis>("/ai/job-match", {
      method: "POST",
      body: { resumeId, jobDescription },
    }),

  coverLetter: (resumeId: string, jobDescription: string) =>
    httpClient<CoverLetter>("/ai/cover-letter", {
      method: "POST",
      body: { resumeId, jobDescription },
    }),

  interviewFeedback: (question: string, answer: string) =>
    httpClient<InterviewFeedback>("/ai/interview-feedback", {
      method: "POST",
      body: { question, answer },
    }),
}
