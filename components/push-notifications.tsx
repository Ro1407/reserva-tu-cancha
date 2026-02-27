"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, BellMinus, X } from "lucide-react";
import { subscribeUser, unsubscribeUser } from "@/lib/notifications";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { useSession } from "next-auth/react";
import type { PushSubscription as PushSubscriptionInterface } from "@/types/subscription";

export function PushNotificationManager() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    const setupPush = async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setIsSupported(false);
        return;
      }

      setIsSupported(true);
      await registerServiceWorker();
    };

    setupPush();
  }, [session?.user?.email]); // Solo depende del email, el resto es manejado internamente

  useEffect(() => {
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, []);

  function displayToast(message: string): void {
    setPushError(message);
    setShowToast(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setShowToast(false), 8000);
  }

  function dismissToast(): void {
    setShowToast(false);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
  }

  async function registerServiceWorker(): Promise<void> {
    try {
      const registration: ServiceWorkerRegistration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub: PushSubscription | null = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      displayToast(getErrorMessage(error));
    }
  }

  async function subscribeToPush(): Promise<void> {
    setShowToast(false);
    setIsLoading(true);
    try {
      const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
      const sub: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser({ ...serializedSub, subscriber: userEmail, } satisfies PushSubscriptionInterface);
      setSubscription(sub);
    } catch (error) {
      displayToast(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function unsubscribeFromPush(): Promise<void> {
    if (!subscription) return;
    setIsLoading(true);
    try {
      await subscription.unsubscribe();
      const serializedSub = JSON.parse(JSON.stringify(subscription));
      await unsubscribeUser({ ...serializedSub, subscriber: userEmail, } satisfies PushSubscriptionInterface);
      setSubscription(null);
    } catch (error) {
      displayToast(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleErrorClick(): void {
    if (pushError) displayToast(pushError);
    else setPushError(null);
  }

  if (isSupported)
    return (
      <div className="relative">
        <Button
          onClick={pushError ? handleErrorClick : subscription ? unsubscribeFromPush : subscribeToPush}
          disabled={isLoading}
          variant={subscription ? "default" : "outline"}
          size="sm"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          ) : pushError ? (
            <BellMinus className="h-4 w-4 text-destructive" />
          ) : subscription ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </Button>

        {showToast && pushError && (
          <div className="absolute top-full right-0 mt-2 z-50 w-72 bg-opacity-100 bg-background"
            style={{ animation: "fadeSlideIn 0.2s ease-out" }}>
            <style>{`@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 shadow-lg backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <BellMinus className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive flex-1">{pushError}</p>
                <button
                  onClick={dismissToast}
                  className="text-destructive/60 hover:text-destructive shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Las notificaciones están bloqueadas. Permitilas desde la configuración del navegador e intentá nuevamente.";
    }
    if (error.name === "AbortError") {
      return "Las notificaciones push no están disponibles. Asegurate de haberlas permitido en la configuración de tu navegador.";
    }
  }
  return "No se pudieron activar las notificaciones push. Verificá la configuración de tu navegador e intentá de nuevo.";
}

