import NextAuth, { User } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export async function getUser(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
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
            email
          }
        }
        `,
      }),
    });
    const data = await response.json();
    if (data.data.user && data.data.user.isUser) {
      return {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
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
          if (user?.email === email) {
            return user;
          }
          return null;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
