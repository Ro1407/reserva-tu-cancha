"use server";

import webpush, { PushSubscription, SendResult } from "web-push";
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

export async function sendNotification(title: string, message: string): Promise<void> {
  const subscriptions: PushSubscription[] = await getAllPushSubscriptions();

  if (subscriptions.length === 0) return;

  const payload: string = JSON.stringify({
    title: title,
    body: message,
    icon: "/icons/icon-192x192.png",
  });

  await Promise.all(
    subscriptions.map(
      (subscription: PushSubscription): Promise<SendResult> => webpush.sendNotification(subscription, payload),
    ),
  );
}
