import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-medium">Cargando...</h3>
            <p className="text-sm text-muted-foreground">Por favor espera un momento</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
