import { Club } from "@/types/club";
import { getClubById } from "@/lib/actions";

import { notFound } from "next/navigation";
import UpdateClubForm from "@/components/forms/update-club-form";

export default async function Page(props: { params: Promise<{ id: string; }>; }) {
  const { id } = await props.params;
  const club: Club | null = await getClubById(id);

  if (!club) {
    return notFound();
  }

  return (
    <main>
      <UpdateClubForm actualClub={club} clubId={club.id}/>
    </main>
  );
}