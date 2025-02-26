"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { createSession, decrypt } from "./session";
import { redirect } from "next/navigation";
import { getUser } from "./data";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // First, try to sign in with credentials
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      throw new AuthError(signInResult.error);
    }

    // Get user after successful sign-in
    const user = await getUser(email, password);

    if (!user?.id) {
      throw new Error("User not found");
    }

    // Create session after successful authentication
    await createSession(user.id);

    // Redirect after successful authentication
    redirect("/home");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function getSessionValue(): Promise<string | undefined> {
  let sessionCookie;
  let retries = 3;

  while (retries > 0) {
    sessionCookie = (await cookies()).get("session");
    if (sessionCookie) break;
    retries--;
  }

  if (!sessionCookie) return undefined;
  const result = (await decrypt(sessionCookie.value)) as { userId?: string };
  return result?.userId;
}
