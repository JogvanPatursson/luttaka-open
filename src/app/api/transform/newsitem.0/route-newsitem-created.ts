import { eq } from "drizzle-orm"

import {
  NewsitemEventCreatedPayload,
  newsitem,
} from "@/contracts/events/newsitem"
import { db } from "@/database"
import { newsitems } from "@/database/schemas"
import { EventMetadata } from "@/contracts/common"
import { addEventLog } from "../lib/log-event"

export default async function newsitemCreated(
  payload: unknown,
  metadata: EventMetadata,
) {
  console.log("Got created newsitem", payload)
  const parsedPayload = NewsitemEventCreatedPayload.parse(payload)
  const exists = await db.query.newsitems.findFirst({
    where: eq(newsitems.id, parsedPayload.id),
  })
  if (exists) {
    return
  }

  await db.insert(newsitems).values(parsedPayload)

  addEventLog(metadata.eventType, parsedPayload)
}
