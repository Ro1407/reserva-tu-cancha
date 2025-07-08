import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Eye, PencilIcon } from "lucide-react";

export function Create({href, buttonText}: { href: string, buttonText: string }) {
  return (
    <Link href={href}>
    <Button>
        <Plus className="w-4 h-4 mr-2" />
        {buttonText}
    </Button>
    </Link>
  );
}

export function Volver({volverHref}: { volverHref:string }) {
  return (
    <Link href={volverHref}>
      <Button variant="outline" className="mt-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>
    </Link>
  );
}

export function See({onSeeClick}: { onSeeClick: () => void }) {
  return (
      <Button variant="outline" size="sm" onClick={onSeeClick}>
        <Eye className="w-4 h-4" />
      </Button>
  );
}

export function Edit({editHref}: { editHref: string }) {
  return (
    <Link
      href={editHref}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5"/>
    </Link>
  );
}

/*
export function Delete({id}: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      <form action={deleteInvoiceWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5"/>
        </button>
      </form>
    </>
  );
} */
