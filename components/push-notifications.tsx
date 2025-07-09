"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { subscribeUser, unsubscribeUser } from "@/lib/notifications";
import { urlBase64ToUint8Array } from "@/lib/utils";

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect((): void => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker(): Promise<void> {
    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub: PushSubscription | null = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush(): Promise<void> {
    setIsLoading(true);
    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    const sub: PushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    });
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub)
      .then((): void => setSubscription(sub))
      .finally((): void => setIsLoading(false));
  }

  async function unsubscribeFromPush(): Promise<void> {
    if (!subscription) return;
    setIsLoading(true);
    await subscription.unsubscribe();
    const serializedSub = JSON.parse(JSON.stringify(subscription));
    await unsubscribeUser(serializedSub)
      .then((): void => setSubscription(null))
      .finally((): void => setIsLoading(false));
  }

  if (isSupported)
    return (
      <Button
        onClick={subscription ? unsubscribeFromPush : subscribeToPush}
        disabled={isLoading}
        variant={subscription ? "default" : "outline"}
        size="sm"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
        ) : subscription ? (
          <Bell className="h-4 w-4" />
        ) : (
          <BellOff className="h-4 w-4" />
        )}
      </Button>
    );
}
