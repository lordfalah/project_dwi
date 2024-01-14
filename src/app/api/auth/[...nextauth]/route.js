import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // httpOptions: {
      //   timeout: 40000,
      // },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (token) {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });

        token.role = user?.role;
        token.id = user?.id;
        return token;
      }
    },

    async session({ session, token, user }) {
      return { ...session, token };
    },
  },

  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);

export const getAuthSession = () => getServerSession(authOptions);
export { handler as GET, handler as POST };
