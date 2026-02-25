"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendNotification } from "@/lib/notifications";
import { FormMessage, FormMessageType } from "@/components/ui/form-messages";

export function PushNotificationForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sendPushNotification: () => Promise<void> = async (): Promise<void> => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    await sendNotification(title, message).then((result) => {
      if (!result.sent && result.noSubscriptions) setError("No hay suscripciones push activas. Los usuarios deben activar las notificaciones.");
      else setSuccess("Notificación enviada correctamente.");
      setTitle("");
      setMessage("");
    })
      .catch(() => { setError("Ocurrió un error al enviar la notificación. Intentá de nuevo."); })
      .finally(() => { setIsLoading(false); })
  };

  return (
    <Card className="w-full max-w-md h-fit justify-self-center">
      <CardContent className="space-y-4">
        <strong>Enviar Notificación</strong>
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            name="title"
            placeholder="Título de la notificación"
            value={title}
            onChange={(e): void => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Contenido del mensaje"
            value={message}
            onChange={(e): void => setMessage(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        <Button onClick={sendPushNotification} disabled={!title || !message || isLoading} className="w-full">
          {isLoading ? "Enviando..." : "Enviar Notificación"}
        </Button>
        {error && <FormMessage type={FormMessageType.error}>{error}</FormMessage>}
        {success && <FormMessage type={FormMessageType.success}>{success}</FormMessage>}
      </CardContent>
    </Card>
  );
}
