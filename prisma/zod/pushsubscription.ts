import * as z from "zod"

export const PushSubscriptionSchema = z.object({
  id: z.string(),
  endpoint: z.string(),
  expirationTime: z.number().nullish(),
  p256dh: z.string(),
  auth: z.string(),
})
