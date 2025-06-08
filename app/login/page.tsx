import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 dark:bg-gray-900/50">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
