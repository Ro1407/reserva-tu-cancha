"use server";

import webpush, { PushSubscription, WebPushError } from "web-push";
import { createPushSubscription, deletePushSubscription, getAllPushSubscriptions } from "@/lib/actions-client";

webpush.setVapidDetails(
  "mailto:example@domain.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function subscribeUser(sub: PushSubscription): Promise<void> {
  if (sub) await createPushSubscription(sub);
}

export async function unsubscribeUser(subscription: PushSubscription): Promise<void> {
  await deletePushSubscription(subscription);
}

export interface SendNotificationResult {
  sent: boolean;
  noSubscriptions: boolean;
}

export async function sendNotification(title: string, message: string): Promise<SendNotificationResult> {
  const subscriptions: PushSubscription[] = await getAllPushSubscriptions();

  if (subscriptions.length === 0) return { sent: false, noSubscriptions: true };

  const payload: string = JSON.stringify({
    title: title,
    body: message,
    icon: "/icons/icon-192x192.png",
  });

  await Promise.all(
    subscriptions.map(async (subscription: PushSubscription): Promise<void> => {
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        if (error instanceof WebPushError && (error.statusCode === 410 || error.statusCode === 404)) {
          await deletePushSubscription(subscription);
        }
      }
    }),
  );

  return { sent: true, noSubscriptions: false };
}

