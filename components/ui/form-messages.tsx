import * as React from "react"
import { AlertCircle, CheckCircle, XCircleIcon } from "lucide-react"

export enum FormMessageType {
  "error",
  "success",
  "info"
}
interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: FormMessageType
  children: React.ReactNode
}

const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ className, type = FormMessageType.info, children, ...props }, ref) => {
    const Icon = type === FormMessageType.error ? XCircleIcon : (type === FormMessageType.info ? AlertCircle : CheckCircle)
    const typeClass = type === FormMessageType.error ? "text-destructive" : (type === FormMessageType.success ? "text-green-600" : "text-blue-600")

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