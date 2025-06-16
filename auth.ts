import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

interface User {
  id: string;
  email: string;
  password: string;
}

async function getUser(email: string): Promise<User | null> {
  return new Promise((resolve: (user: User) => void): void => {
    setTimeout(async (): Promise<void> => {
      resolve({
        id: "1",
        email: "admin@cs.uns.edu.ar",
        password: await bcrypt.hash("1234567", 10),
      });
    });
  });
}

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
          const user: User | null = await getUser(email);
          if (user && (await bcrypt.compare(password, user.password))) return user;
        }
        return null;
      },
    }),
  ],
});
