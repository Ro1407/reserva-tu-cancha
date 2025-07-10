import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TerminosPage() {
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
            <CardTitle className="text-3xl">Términos y Condiciones</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Última actualización: 15 de enero de 2024</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none dark:prose-invert">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar ReserváTuCancha, usted acepta estar sujeto a estos términos y condiciones de uso. Si
              no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
            </p>
            <h2>2. Descripción del Servicio</h2>
            <p>
              ReserváTuCancha es una plataforma digital que permite a los usuarios buscar, reservar y pagar por el uso
              de canchas deportivas en diversos clubes y centros deportivos.
            </p>
            <h2>3. Registro de Usuario</h2>
            <p>Para utilizar nuestros servicios, debe:</p>
            <ul>
              <li>Proporcionar información precisa y completa durante el registro</li>
              <li>Mantener la confidencialidad de su cuenta y contraseña</li>
              <li>Ser mayor de 18 años o tener autorización de un tutor legal</li>
              <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
            </ul>
            <h2>4. Reservas y Pagos</h2>
            <p>
              Las reservas están sujetas a disponibilidad y confirmación. Los pagos se procesan de forma segura a través
              de MercadoPago. Una vez confirmada la reserva, recibirá un email de confirmación.
            </p>
            <h2>5. Política de Cancelación</h2>
            <ul>
              <li>Cancelación gratuita hasta 2 horas antes del horario reservado</li>
              <li>Cancelaciones tardías pueden estar sujetas a penalizaciones</li>
              <li>Los reembolsos se procesan en un plazo de 5-10 días hábiles</li>
            </ul>
            <h2>6. Responsabilidades del Usuario</h2>
            <p>El usuario se compromete a:</p>
            <ul>
              <li>Utilizar las instalaciones de manera responsable</li>
              <li>Respetar las reglas específicas de cada club</li>
              <li>Llegar puntualmente a su reserva</li>
              <li>Reportar cualquier daño o incidente</li>
            </ul>
            <h2>7. Limitación de Responsabilidad</h2>
            <p>
              ReserváTuCancha actúa como intermediario entre usuarios y clubes deportivos. No somos responsables por
              lesiones, daños o pérdidas que puedan ocurrir durante el uso de las instalaciones.
            </p>
            <h2>8. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados
              a través de nuestro sitio web y por email.
            </p>
            <h2>9. Contacto</h2>
            <p>
              Para consultas sobre estos términos, puede contactarnos en:{" "}
              <a href="mailto:legal@reservatucancha.com" className="text-green-600 hover:underline">
                legal@reservatucancha.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
