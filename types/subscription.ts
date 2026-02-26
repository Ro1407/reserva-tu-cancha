
// Type based on Prisma's Schema  PushSubscription and the web-push library PushSubscription
// Includes subscriber as a way to perform unicast notification
export interface PushSubscription{
    endpoint: string;
    expirationTime: number | null;
    keys: {
      p256dh: string,
      auth: string,
    }
    subscriber: string
}


