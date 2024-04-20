import { eq } from "drizzle-orm"

import { CompanyEventUpdatedPayload } from "@/contracts/events/company"
import { db } from "@/database"
import { companies } from "@/database/schemas"
import { EventMetadata } from "@/contracts/common"
import { addEventLog } from "../lib/log-event"

export default async function companyUpdated(
  payload: unknown,
  metadata: EventMetadata,
) {
  console.log("Got updated event", payload)
  const parsedPayload = CompanyEventUpdatedPayload.parse(payload)
  const exists = await db.query.companies.findFirst({
    where: eq(companies.id, parsedPayload.id),
  })
  if (!exists) {
    return
  }
  await db
    .update(companies)
    .set(parsedPayload)
    .where(eq(companies.id, parsedPayload.id))

  addEventLog(metadata.eventType, parsedPayload)
}
