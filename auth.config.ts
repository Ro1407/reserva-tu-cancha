import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }): boolean {
      const isLoggedIn: boolean = !!auth?.user;
      const isOnDashboard: boolean = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) return isLoggedIn;
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
