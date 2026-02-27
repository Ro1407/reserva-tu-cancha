import { BellMinus, X } from "lucide-react";
import { createPortal } from "react-dom";

interface ModalProps {
  style: {
    top: string,
    right: string,
    animation: string
  }
  text: string,
  onClose: () => void
}
export default function Modal({style, text, onClose}: ModalProps): React.ReactElement {
  return (
    createPortal(
      <div className="fixed top-4 right-4 mt-2 w-72 bg-opacity-100 bg-background "
           style={style}>
        <style>{`@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 dark:border-destructive/50 dark:bg-destructive/20 p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <BellMinus className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive dark:text-red-400 flex-1">{text}</p>
            <button
              onClick={onClose}
              className="text-destructive/60 hover:text-destructive shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      , document.body)
  )
}