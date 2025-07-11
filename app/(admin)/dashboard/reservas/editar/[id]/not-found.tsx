import NotFoundPage from "@/components/not-found-page";

export default function NotFound() {
  return <NotFoundPage msg={"No se encontró la reserva solicitada"} hrefVolver={"/dashboard/reservas"}></NotFoundPage>
}