import ClubForm from "@/components/forms/club-form";
import { Club, ClubData } from "@/types/club";
import { SportKey } from "@/types/enumerates";
import { getClubById } from "@/lib/actions";

import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string; }>; }) {
  const { id } = await props.params;
  const club: Club | null = await getClubById(id);

  if (!club) {
    return notFound();
  }

  const actualClub: ClubData = {
    name: club.name,
    description: club.description,
    phone: club.phone,
    location: club.location,
    address: club.address,
    sports: club.sports,
  }

  return (
    <main>
      <ClubForm
        submitButtonMessage="Editar Club"
        loadingMessage="Editando Club..."
        submitSuccessfulMessage="El club fue editado existosamente"
        initialState={actualClub}
        onSubmitAction={(actualClub) => {console.log("Editado")}}/>
    </main>
  );
}