import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/register"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al registro
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Política de Privacidad</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Última actualización: 15 de enero de 2024</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none dark:prose-invert">
            <h2>1. Información que Recopilamos</h2>
            <p>Recopilamos la siguiente información:</p>
            <ul>
              <li>
                <strong>Información personal:</strong> nombre, apellido, email, teléfono
              </li>
              <li>
                <strong>Información de pago:</strong> datos de tarjetas de crédito (procesados por MercadoPago)
              </li>
              <li>
                <strong>Información de uso:</strong> historial de reservas, preferencias deportivas
              </li>
              <li>
                <strong>Información técnica:</strong> dirección IP, tipo de navegador, cookies
              </li>
            </ul>
            <h2>2. Cómo Utilizamos su Información</h2>
            <p>Utilizamos su información para:</p>
            <ul>
              <li>Procesar y gestionar sus reservas</li>
              <li>Enviar confirmaciones y recordatorios</li>
              <li>Mejorar nuestros servicios</li>
              <li>Comunicar ofertas especiales (solo si acepta marketing)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
            <h2>3. Compartir Información</h2>
            <p>Compartimos su información únicamente con:</p>
            <ul>
              <li>Clubes deportivos para confirmar reservas</li>
              <li>Procesadores de pago (MercadoPago)</li>
              <li>Proveedores de servicios técnicos</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>
            <h2>4. Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra
              acceso no autorizado, alteración, divulgación o destrucción.
            </p>
            <h2>5. Sus Derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
              <li>Acceder a su información personal</li>
              <li>Rectificar datos incorrectos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de marketing</li>
              <li>Portabilidad de datos</li>
            </ul>
            <h2>6. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia de navegación, recordar preferencias y analizar el uso del
              sitio. Puede configurar su navegador para rechazar cookies.
            </p>
            <h2>7. Retención de Datos</h2>
            <p>
              Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos en
              esta política, salvo que la ley requiera un período de retención más largo.
            </p>
            <h2>8. Menores de Edad</h2>
            <p>
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente
              información de menores de edad.
            </p>
            <h2>9. Cambios en la Política</h2>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios
              significativos por email o a través de nuestro sitio web.
            </p>
            <h2>10. Contacto</h2>
            <p>
              Para consultas sobre privacidad, puede contactarnos en:{" "}
              <a href="mailto:privacidad@reservatucancha.com" className="text-green-600 hover:underline">
                privacidad@reservatucancha.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
