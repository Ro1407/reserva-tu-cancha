import type { NextAuthConfig, Session } from "next-auth";
import { NextRequest } from "next/server";
import { Role } from "@prisma/client"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({session}) {
      return {
        ...session,
        role: Role.ADMIN
      }
    },
    authorized({ request: { nextUrl}, auth }: {request: NextRequest, auth: Session | null}): boolean {
      const isAdmin: boolean = !!auth?.user && auth.user.role === Role.ADMIN;
      const isOnDashboard: boolean = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) return isAdmin;
      else return true;
    },
  },
  providers: [],
  trustHost: true,
  logger: {
    error(err: Error): void {
      if (err.name !== "CredentialsSignin") console.log(err);
    },
  },
} satisfies NextAuthConfig;
