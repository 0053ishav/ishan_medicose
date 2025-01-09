// import { createAdminClient } from "@/lib/appwrite";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const userId = request.nextUrl.searchParams.get("userId") ?? "";
//   const secret = request.nextUrl.searchParams.get("secret") ?? "";

//   const { account } = await createAdminClient();
//   const session = await account.createSession(userId, secret);

//   (await cookies()).set("appwrite-session", session.secret, {
//     path: "/",
//     httpOnly: true,
//     sameSite: "strict",
//     secure: true,
//   });

//   return NextResponse.redirect(`${request.nextUrl.origin}/`);
// }


// import { createAdminClient } from "@/lib/appwrite";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { getUserInfo } from "@/actions/user.actions";
// import { ID } from "node-appwrite";

// export async function GET(request: NextRequest) {
//   const userId = request.nextUrl.searchParams.get("userId") ?? "";
//   const secret = request.nextUrl.searchParams.get("secret") ?? "";

//   if (!userId || !secret) {
//     return NextResponse.redirect(`${request.nextUrl.origin}/sign-up?error=missing_parameters`);
//   }

//   const { account, databases } = await createAdminClient();

//   try {
//     // Check if the user exists in the database
//     const existingUser = await getUserInfo({ userId });

//     if (!existingUser) {
//       // Fetch Google OAuth user details
//       const userDetails = await account.get(); // This fetches the user's profile info

//       // Create a new user in the database
//       await databases.createDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
//         ID.unique(),
//         {
//           userId,
//           email: userDetails.email,
//           name: userDetails.name,
//           googleAuth: true,
//         }
//       );
//     }

//     // Create a session for the user
//     const session = await account.createSession(userId, secret);

//     // Set the session cookie
//     (await cookies()).set("appwrite-session", session.secret, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//     });

//     return NextResponse.redirect(`${request.nextUrl.origin}/`);
//   } catch (error) {
//     console.error("Error in OAuth success callback:", error);
//     return NextResponse.redirect(`${request.nextUrl.origin}/sign-up?error=auth_failed`);
//   }
// }


import { signUpWithGoogleDB } from "@/actions/user.actions"; // Adjust the path to your function
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  if (!userId || !secret) {
    return NextResponse.redirect(`${request.nextUrl.origin}/sign-up?error=missing_parameters`);
  }

  try {
    const { account } = await createAdminClient();

    // Fetch user details from Appwrite
    const userDetails = await account.get(); // Get authenticated user's profile (email and name)

    if (!userDetails.email || !userDetails.name) {
      throw new Error("User details are incomplete.");
    }

    // Use `signUpWithGoogleDB` to handle user creation or fetching
    const user = await signUpWithGoogleDB(userId, userDetails.email, userDetails.name);

    // Create a session for the user
    const session = await account.createSession(userId, secret);

    // Set the session cookie
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  } catch (error) {
    console.error("Error in OAuth success callback:", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/sign-up?error=auth_failed`);
  }
}
