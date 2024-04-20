import { eq } from "drizzle-orm"

import { NewsitemEventUpdatedPayload } from "@/contracts/events/newsitem"
import { db } from "@/database"
import { newsitems } from "@/database/schemas"
import { EventMetadata } from "@/contracts/common"
import { addEventLog } from "../lib/log-event"

export default async function newsitemUpdated(
  payload: unknown,
  metadata: EventMetadata,
) {
  console.log("Got updated newsitem", payload)
  const parsedPayload = NewsitemEventUpdatedPayload.parse(payload)
  const exists = await db.query.newsitems.findFirst({
    where: eq(newsitems.id, parsedPayload.id),
  })
  if (!exists) {
    return
  }

  await db
    .update(newsitems)
    .set(parsedPayload)
    .where(eq(newsitems.id, parsedPayload.id))

  addEventLog(metadata.eventType, parsedPayload)
}
