"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState: string | undefined, formData: FormData): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Usuario o contraseña incorrectos. Intente nuevamente.";
        default:
          return "Lo sentimos, algo salió mal. Intente de nuevo más tarde.";
      }
    } else throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: false });
}
