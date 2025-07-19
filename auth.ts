import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/lib/actions";
import { User } from "@prisma/client";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user: User | null = await getUserByEmail(email);
          if (user && !!user.password && await bcrypt.compare(password, user.password)) return user;
        }
        return null;
      },
    }),
  ],
});
