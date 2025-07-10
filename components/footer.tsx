import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 mt-16 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RC</span>
              </div>
              <span className="font-bold text-xl">ReserváTuCancha</span>
            </div>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              La plataforma más fácil para reservar canchas deportivas en tu ciudad.
            </p>
          </div>
          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Enlaces</h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="/contacto"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm dark:text-gray-400 dark:hover:text-gray-100"
              >
                Contacto
              </Link>
              <Link
                href="/terminos"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm dark:text-gray-400 dark:hover:text-gray-100"
              >
                Términos y condiciones
              </Link>
              <Link
                href="/privacidad"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm dark:text-gray-400 dark:hover:text-gray-100"
              >
                Política de privacidad
              </Link>
            </div>
          </div>
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Email: info@reservatucancha.com</p>
              <p>Teléfono: +54 11 1234-5678</p>
              <p>Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center dark:border-gray-800">
          <p className="text-gray-600 text-sm dark:text-gray-400">
            © {currentYear} ReserváTuCancha. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
