import {Button} from "@/components/ui/button"
import {ChevronLeft, ChevronRight} from "lucide-react"

export function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled>
        <ChevronLeft className="w-4 h-4 mr-1"/>
        Anterior
      </Button>
      <div className="flex space-x-1">
        <Button variant="default" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <span className="px-2 py-1 text-gray-600 dark:text-gray-400">...</span>
        <Button variant="outline" size="sm">
          10
        </Button>
      </div>
      <Button variant="outline" size="sm">
        Siguiente
        <ChevronRight className="w-4 h-4 ml-1"/>
      </Button>
    </div>
  )
}
