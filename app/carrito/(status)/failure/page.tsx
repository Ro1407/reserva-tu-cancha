export default function Failure() {
  return (
    <div className="mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Algo salió mal :(</h1>
      <p className="text-gray-600 mb-8 dark:text-gray-400">
        El pago no se pudo completar. Por favor, intenta nuevamente o contacta al soporte si el problema persiste.
      </p>
    </div>
  );
}
