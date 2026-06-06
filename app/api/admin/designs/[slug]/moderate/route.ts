import { NextResponse } from "next/server";
import { z } from "zod";
import { getOptionalAuth, getOptionalCurrentUser, isAdminUser, isClerkConfigured } from "@/src/lib/auth-runtime";
import { sql } from "@/src/lib/db/client";

const moderationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "FEATURED", "SELECTED_FOR_DROP"])
});

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ error: "Connect Clerk before moderating submissions." }, { status: 503 });
  }
  const { userId } = await getOptionalAuth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await getOptionalCurrentUser();
  if (!isAdminUser(user)) {
    console.warn("Moderation blocked: non-admin user", {
      email: user?.primaryEmailAddress?.emailAddress || "unknown",
      userId
    });
    return NextResponse.json({ error: "Forbidden: admin access required" }, { status: 403 });
  }
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const parsed = moderationSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid moderation status." }, { status: 400 });

  const { slug } = await params;
  const rows = await sql`
    update designs
    set status = ${parsed.data.status}, updated_at = now()
    where slug = ${slug}
    returning slug, status
  `;
  if (!rows[0]) return NextResponse.json({ error: "Design not found." }, { status: 404 });
  return NextResponse.json({ design: rows[0] });
}
