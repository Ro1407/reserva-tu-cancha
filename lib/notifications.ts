"use server";

import webpush, { PushSubscription, SendResult } from "web-push";

webpush.setVapidDetails(
  "mailto:example@domain.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

let subscriptions: webpush.PushSubscription[] = [];

export async function subscribeUser(sub: PushSubscription): Promise<void> {
  if (sub) subscriptions.push(sub);
}

export async function unsubscribeUser(subscription: PushSubscription): Promise<void> {
  subscriptions = subscriptions.filter((sub: PushSubscription): boolean => sub.endpoint !== subscription.endpoint);
}

export async function sendNotification(title: string, message: string): Promise<void> {
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
