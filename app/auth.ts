import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/db"
import GithubProvider from "next-auth/providers/github"
import { getServerSession, type NextAuthOptions } from "next-auth";
 
export const config: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    })
  ],
}

export const getServerAuthSession = () => getServerSession(config) 