import { auditLog } from "@/contracts/eventlogs/eventlogs"
import { db } from "@/database"
import { eventlogs } from "@/database/schemas"

export function addEventLog(eventName: string, payload: object) {
  const parsedPayload = auditLog.parse({ eventName, payload })

  db.insert(eventlogs).values(parsedPayload)
}
