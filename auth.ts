import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/ui/user/user";

export async function getUser(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const response = await fetch("http://18.203.185.97:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
          user(email: "${email}", password: "${password}") {
            isUser
            id
            name
          }
        }
        `,
      }),
    });
    const data = await response.json();
    console.log(data.data.user);
    if (data.data.user) {
      return {
        id: data.data.user.id,
        name: data.data.user.name,
        isUser: data.data.user.isUser,
      };
    }
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) return null;
          if (user.isUser) {
            return user;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
