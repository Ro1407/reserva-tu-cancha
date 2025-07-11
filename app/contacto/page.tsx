import { ContactForm } from "@/components/forms/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { ContactMap } from "@/components/contact-map";
import { ContactFAQ } from "@/components/contact-faq";

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para asistirte. Contáctanos y te responderemos lo
            antes posible.
          </p>
        </div>
        {/* contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <ContactForm />
          </div>
          <div className="space-y-8">
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
        {/* FAQ section */}
        <ContactFAQ />
      </div>
    </div>
  );
}
