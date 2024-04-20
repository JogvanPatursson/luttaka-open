import { z } from "zod"

export const auditLog = z.object({
  id: z.string(),
  eventName: z.string(),
  payload: z.string(),
})

export type AuditLog = z.infer<typeof auditLog>
