import ClubForm from "@/components/forms/club-form";
import { ClubData } from "@/types/club";
import { SportKey } from "@/types/enumerates";

export default async function Page() {
  const emptyClub: ClubData = {
    name: "",
    description: "",
    phone: "",
    location: "",
    address: "",
    sports: [] as SportKey[],
  }

  return (
    <main>
      <ClubForm
        submitButtonMessage="Crear Club"
        loadingMessage="Creando Club..."
        submitSuccessfulMessage="El club fue creado existosamente"
        initialState={emptyClub}
        onSubmitAction={(emptyClub) => {console.log("Creado")}}/>
    </main>
  );
}