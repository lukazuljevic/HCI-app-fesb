"use server";

import { signIn, signOut } from "@/auth";

export async function authenticate(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    await signIn("credentials", { ...data, redirectTo: "/" });
  } catch (error) {
    if ((error as any).message === "NEXT_REDIRECT" || (error as any).digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
    }
    
    if ((error as Error).message.includes("CredentialsSignin") || (error as any).type === "CredentialsSignin") {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}
