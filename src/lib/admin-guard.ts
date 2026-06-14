import { NextResponse } from "next/server";
import { getOptionalCurrentUser, isAdminUser, isClerkConfigured } from "@/src/lib/auth-runtime";

export async function requireAdminUser(context: string) {
  if (!isClerkConfigured()) {
    console.warn(`${context} blocked: Clerk is not configured`);
    return {
      response: NextResponse.json({ error: "Connect Clerk before using admin tools." }, { status: 503 }),
      user: null
    };
  }

  try {
    const user = await getOptionalCurrentUser();
    const email = user?.primaryEmailAddress?.emailAddress || "unknown";

    if (!user?.id) {
      console.warn(`${context} blocked: missing authenticated user`);
      return {
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        user: null
      };
    }

    if (!isAdminUser(user)) {
      console.warn(`${context} blocked: non-admin user`, { email, userId: user.id });
      return {
        response: NextResponse.json({ error: "Forbidden: admin access required" }, { status: 403 }),
        user: null
      };
    }

    return { response: null, user };
  } catch (error) {
    console.error(`${context} authentication failed:`, error);
    return {
      response: NextResponse.json({ error: "Unable to verify admin access." }, { status: 500 }),
      user: null
    };
  }
}
