import { eq } from "drizzle-orm"

import { CompanyEventArchivedPayload } from "@/contracts/events/company"
import { db } from "@/database"
import { companies } from "@/database/schemas"
import { EventMetadata } from "@/contracts/common"
import { addEventLog } from "../lib/log-event"

export default async function companyArchived(
  payload: unknown,
  metadata: EventMetadata,
) {
  console.log("Got archived event", payload)
  const parsedPayload = CompanyEventArchivedPayload.parse(payload)
  const exists = await db.query.companies.findFirst({
    where: eq(companies.id, parsedPayload.id),
  })
  if (!exists) {
    return
  }
  await db
    .update(companies)
    .set({
      archived: parsedPayload.state ?? true,
    })
    .where(eq(companies.id, parsedPayload.id))

  addEventLog(metadata.eventType, parsedPayload)
}
