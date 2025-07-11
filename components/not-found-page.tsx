import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage({msg, hrefVolver}: {msg: string, hrefVolver: string}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>{msg}</p>
      <Link href={hrefVolver}>
        <Button>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </Link>
    </main>
  );
}