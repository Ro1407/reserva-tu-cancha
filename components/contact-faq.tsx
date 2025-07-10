"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQItem, faqData } from "@/lib/definitions";

export function ContactFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem: (index: number) => void = (index: number): void => {
    setOpenItems((prev: number[]): number[] =>
      prev.includes(index) ? prev.filter((item: number): boolean => item !== index) : [...prev, index],
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="w-5 h-5 mr-2" />
          Preguntas Frecuentes
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Encuentra respuestas rápidas a las consultas más comunes</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqData.map((item: FAQItem, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg dark:border-gray-800">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto text-left"
                onClick={(): void => toggleItem(index)}
              >
                <span className="font-medium">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                )}
              </Button>
              {openItems.includes(index) && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-green-50 rounded-lg dark:bg-green-950/20">
          <h4 className="font-semibold text-green-800 mb-2 dark:text-green-200">¿No encontraste tu respuesta?</h4>
          <p className="text-sm text-green-700 mb-3 dark:text-green-300">
            Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta específica.
          </p>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={(): String => toast.error("El equipo de soporte no está disponible en este momento.")}
          >
            Contactar soporte
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
