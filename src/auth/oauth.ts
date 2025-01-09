"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGoogle() {
	const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");
  
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Google,
		`${origin}/api/oauth/success`,
		`${origin}/sign-up`,
	);

	return redirect(redirectUrl);
};
