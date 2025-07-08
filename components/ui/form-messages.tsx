import * as React from "react"
import { AlertCircle, CheckCircle, XCircleIcon } from "lucide-react"

interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "error" | "success" | "info"
  children: React.ReactNode
}

const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ className, type = "error", children, ...props }, ref) => {
    const Icon = type === "error" ? XCircleIcon : (type === "info"? AlertCircle : CheckCircle)
    const typeClass = type === "error" ? "text-destructive" : (type === "success" ? "text-green-600" : "text-blue-600")

    return (
      <div
        ref={ref}
        className={`flex items-center gap-2 text-sm ${typeClass} ${className || ""} `}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </div>
    )
  },
)
FormMessage.displayName = "FormMessage"

export { FormMessage }