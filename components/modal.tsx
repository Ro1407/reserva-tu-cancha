import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode
  onModalClose: () => void
  modalTitle?: string
}

export function Modal({ children, modalTitle, onModalClose }: ModalProps) {
  return (
    <div className="fixed inset-x-0 -inset-y-1/2 z-50 flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur">
      {modalTitle != null && <p className="text-gray-600 dark:text-gray-400">modalTitle</p> }
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl m-4 bg-gray-100 dark:bg-gray-800">
        <div className="sticky top-0 flex justify-end p-4 bg-destructive dark:bg-gray-800 border-b">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={onModalClose}>
              <X className="h-4 w-4" />
            </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}