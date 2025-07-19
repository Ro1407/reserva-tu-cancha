import { Role } from "@prisma/client"

export interface Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Role;
    };
  }
}
