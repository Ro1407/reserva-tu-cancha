import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ request: { nextUrl }, auth }): boolean {
      const isLogged: boolean = !!auth?.user;
      const isOnDashboard: boolean = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) return isLogged;
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
