import { z } from "zod"

export const submitAttemptSchema = z.object({
  answers: z.record(z.string(), z.string()),
})

export type SubmitAttemptInput = z.infer<typeof submitAttemptSchema>
