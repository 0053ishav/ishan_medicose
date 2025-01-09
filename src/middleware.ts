import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/actions/user.actions";

export async function middleware(request: Request) {
  const user = await getLoggedInUser();
  
  if (!user) {
    console.warn("Redirecting unauthenticated user to sign-in page");
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wishlist", "/orders", "/accounts", "/checkout"],
};
