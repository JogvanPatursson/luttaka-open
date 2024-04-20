import { eq } from "drizzle-orm"

import { CompanyEventCreatedPayload } from "@/contracts/events/company"
import { db } from "@/database"
import { companies } from "@/database/schemas"
import { EventMetadata } from "@/contracts/common"
import { addEventLog } from "../lib/log-event"

export default async function companyCreated(
  payload: unknown,
  metadata: EventMetadata,
) {
  console.log("Got created event", payload)
  const parsedPayload = CompanyEventCreatedPayload.parse(payload)
  const exists = await db.query.companies.findFirst({
    where: eq(companies.id, parsedPayload.id),
  })
  if (exists) {
    return
  }
  await db.insert(companies).values(parsedPayload)

  addEventLog(metadata.eventType, parsedPayload)
}
