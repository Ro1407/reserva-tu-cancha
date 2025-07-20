import NotFoundPage from "@/components/not-found-page";

export default function NotFound() {
  return <NotFoundPage msg={"Lo sentimos, la página que buscas no existe o ha sido movida"} hrefVolver={"/"} />;
}
