"use server";

import webpush, { PushSubscription, WebPushError } from "web-push";
import { PushSubscription as PushSubscriptionInterface } from "@/types/subscription"
import {
  createPushSubscription,
  deletePushSubscription,
  getAllPushSubscriptions,
  getPushSubscription,
} from "@/lib/actions-client";
import { DEFAULT_USER } from "@/lib/utils";

webpush.setVapidDetails(
  "mailto:example@domain.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function subscribeUser(subscription: PushSubscriptionInterface): Promise<void> {
  if (subscription) await createPushSubscription(subscription);
}

export async function unsubscribeUser(subscription: PushSubscriptionInterface): Promise<void> {
  await deletePushSubscription(subscription);
}

export interface SendNotificationResult {
  sent: boolean;
  noSubscriptions: boolean;
}

export async function sendBroadcastNotification(title: string, message: string): Promise<SendNotificationResult> {
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
          await deletePushSubscription({
            ...subscription,
            expirationTime: subscription.expirationTime? subscription.expirationTime : null,
            subscriber: ""
          });
        }
      }
    }),
  );

  return { sent: true, noSubscriptions: false };
}

export async function sendUnicastNotification(title: string, message: string, subscriber: string): Promise<SendNotificationResult> {
  let subscription = await getPushSubscription(subscriber);

  if(!subscription) subscription = await getPushSubscription(DEFAULT_USER)

  if(!subscription) {
    console.error(`Push Subscription for default user is missing`);
    return { sent: false, noSubscriptions: true };
  }

  const payload: string = JSON.stringify({
    title: title,
    body: message,
    icon: "/icons/icon-192x192.png",
  });

  try {
    await webpush.sendNotification(subscription, payload);
  } catch (error) {
    if (error instanceof WebPushError && (error.statusCode === 410 || error.statusCode === 404)) {
      await deletePushSubscription({ ...subscription });
    }
  }

  return { sent: true, noSubscriptions: false };
}

