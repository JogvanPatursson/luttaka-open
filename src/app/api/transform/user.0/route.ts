import { archiveUserEventAction } from "@/app/api/transform/user.0/archive-user-event-action"
import { createUserEventAction } from "@/app/api/transform/user.0/create-user-event-action"
import { updateUserEventAction } from "@/app/api/transform/user.0/update-user-event-action"
import { updateUserProfileEventAction } from "@/app/api/transform/user.0/update-user-profile-event-action"
import { userEvent } from "@/contracts/events/user"
import EventTransformer from "@/lib/event-transformer"

const eventTransformer = new EventTransformer(userEvent, {
  created: async (payload: unknown) => createUserEventAction(payload),
  updated: async (payload: unknown) => updateUserEventAction(payload),
  archived: async (payload: unknown) => archiveUserEventAction(payload),
  updatedProfile: async (payload: unknown) =>
    updateUserProfileEventAction(payload),
})

export const POST = eventTransformer.post.bind(eventTransformer)
