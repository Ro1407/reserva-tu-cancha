
import { notFound } from "next/navigation";
import { Court } from "@/types/court";
import { getCourtById } from "@/lib/actions";
import UpdateCourtForm from "@/components/forms/update-court-form";

export default async function Page(props: { params: Promise<{ id: string; }>; }) {
  const { id } = await props.params;
  const court: Court | null = await getCourtById(id);

  if (!court) {
    return notFound();
  }

  return (
    <main>
      <UpdateCourtForm actualCourt={court} courtId={court.id}/>
    </main>
  );
}