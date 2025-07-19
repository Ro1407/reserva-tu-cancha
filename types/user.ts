import { z } from "zod";
import { UserSchema } from "@/prisma/zod";

export const NewUser = UserSchema.omit({ id: true, role: true });
export type UserData = z.infer<typeof NewUser>

export const UserFormSchema = UserSchema.omit({ name: true, id: true, role: true }).extend(
  {
    firstName: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
    acceptTerms: z.boolean(),
    acceptMarketing: z.boolean()
  }
);

export type UserForm = z.infer<typeof UserFormSchema>