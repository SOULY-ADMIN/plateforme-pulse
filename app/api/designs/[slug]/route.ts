import { NextResponse } from "next/server";
import { getOptionalCurrentUser, isAdminUser, isClerkConfigured } from "@/src/lib/auth-runtime";
import { sql } from "@/src/lib/db/client";

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ error: "Connect Clerk before deleting designs." }, { status: 503 });
  }

  const user = await getOptionalCurrentUser();
  const email = user?.primaryEmailAddress?.emailAddress || "unknown";

  if (!user?.id) {
    console.warn("Design delete blocked: missing authenticated user");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminUser(user)) {
    console.warn("Design delete blocked: non-admin user", { userId: user.id, email });
    return NextResponse.json({ error: "Forbidden: admin access required" }, { status: 403 });
  }

  if (!sql) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const { slug } = await params;
  const rows = await sql`
    update designs
    set status = 'REJECTED', updated_at = now()
    where slug = ${slug}
    returning slug, status
  `;

  if (!rows[0]) {
    console.warn("Design delete failed: design not found", { slug, email });
    return NextResponse.json({ error: "Design not found." }, { status: 404 });
  }

  console.log("Design deleted by admin", { slug, email, status: rows[0].status });
  return NextResponse.json({ design: rows[0] });
}
