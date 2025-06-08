import { Card, CardContent } from "@/components/ui/card";
import { Benefit } from "@/lib/definitions";
import { benefits } from "@/lib/data";

export function Benefits() {
  return (
    <section className="bg-gray-50/50 py-16 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir ReserváTuCancha?</h2>
          <p className="text-gray-600 text-lg dark:text-gray-400">
            La forma más fácil y segura de reservar canchas deportivas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit: Benefit, index: number) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 dark:bg-green-900/20">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
