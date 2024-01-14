import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const token = req.nextauth.token;

    if (req.nextUrl.pathname === "/") {
      if (token.role === "ADMIN")
        return NextResponse.redirect(new URL("/dashboard", req.url));

      return NextResponse.next();
    }

    // access dashboard just role ADMIN and SUPER ADMIN
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (token.role === "USER")
        return NextResponse.redirect(new URL("/", req.url));

      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/((?!general).*)"],
};
