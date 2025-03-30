import  NextAuth,{  NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }: {
      user: { name: string; email: string; image: string };
      profile: { id: string; login: string; bio: string };
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: { provider: string; type: string };
      profile?: { id: string };
    }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: { id?: string };
      token: JWT;
    }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
} as NextAuthOptions);
