import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.CCSIT_RIES;
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, _req) {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          const errorMsg = data.message;
          throw new Error(errorMsg);
        }

        return data;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    maxAge: MAX_AGE,
  },

  jwt: {
    maxAge: MAX_AGE,
  },

  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
