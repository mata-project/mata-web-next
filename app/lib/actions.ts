"use server";

import { getUser, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { createSession, decrypt } from "./session";
import { redirect } from "next/navigation";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const user = await getUser("mock@mock.com", "passwword");
    await createSession(user.id);
    await signIn("credentials", formData);
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
export async function getSessionValue() {
  console.log("test session log");

  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie) return null;
  const result = await decrypt(sessionCookie.value);
  console.log(result?.userId);

  return result?.userId;
}
