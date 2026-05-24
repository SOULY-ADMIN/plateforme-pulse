import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/src/lib/auth-runtime";

const isProtectedRoute = createRouteMatcher([
  "/submit-design(.*)",
  "/admin(.*)",
  "/account(.*)",
  "/creator-dashboard(.*)",
  "/liked(.*)",
  "/saved(.*)",
  "/profile",
  "/api/designs(.*)",
  "/api/uploads(.*)"
]);

const protectedMiddleware = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export default isClerkConfigured()
  ? protectedMiddleware
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
