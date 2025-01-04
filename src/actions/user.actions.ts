'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { getUserInfoProps, signInProps, SignUpParams } from "@/types";

const {
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { databases } = await createAdminClient();

    const user = await databases.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )
    if (user.documents.length === 0) return null;
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error(error)
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    if (!user) throw new Error('User not found');

    return { user: parseStringify(user), flag: true };
  } catch (error: any) {
    console.error('SignIn Error:', error);

    let errorMessage = 'An error occurred during sign-in';
    if (error.code === 401) {
      errorMessage = 'Invalid credentials. Please check your email and password.';
    } else if (error.code === 404) {
      errorMessage = 'User not found.';
    } else if (error.code === 500) {
      errorMessage = 'Internal server error. Please try again later.';
    }

    return { error: errorMessage, flag: false };
  }
};


export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  
  let newUserAccount;

  try {
    const { account, databases } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );

    if(!newUserAccount) throw new Error('Error creating user')

    const newUser = await databases.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    )

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error: any) {
    if (error.code === 409) {
      console.error('User already exists with this email.');
      throw new Error('This email is already registered. Please use a different one.');
    }

    console.error('Error during sign-up process: ', error);
    throw new Error('An error occurred during sign-up. Please try again later.');
  }
}

export const  getLoggedInUser = async () => {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) {
      console.warn("User is not logged in");
      return null;
    }
    const { account } = sessionClient;
    const result = await account.get();

    if (!result) return null;

    const user = await getUserInfo({ userId: result.$id})

    return parseStringify(user);
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) {
      console.warn("User is not logged in");
      return null;
    }

    const { account } = sessionClient;

   (await cookies()).delete('appwrite-session');
    await account.deleteSession('current');
  } catch (error) {
    console.error("Error during logout:", error);
    return null;
  }
};