"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendNotification } from "@/lib/notifications";

export function PushNotificationForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPushNotification: () => Promise<void> = async (): Promise<void> => {
    setIsLoading(true);
    sendNotification(title, message).finally((): void => setIsLoading(false));
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="space-y-4">
        <strong>Enviar Notificación</strong>
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Título de la notificación"
            value={title}
            onChange={(e): void => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="Contenido del mensaje"
            value={message}
            onChange={(e): void => setMessage(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        <Button onClick={sendPushNotification} disabled={!title || !message || isLoading} className="w-full">
          {isLoading ? "Enviando..." : "Enviar Notificación"}
        </Button>
      </CardContent>
    </Card>
  );
}
