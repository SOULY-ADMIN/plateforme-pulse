import { NextResponse } from "next/server";
import { getOptionalAuth, getOptionalCurrentUser, isClerkConfigured } from "@/src/lib/auth-runtime";
import { sql } from "@/src/lib/db/client";
import { toggleSave } from "@/src/lib/db/social";

export async function POST(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ error: "Connect Clerk to save designs." }, { status: 503 });
  }
  const { userId } = await getOptionalAuth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sql) return NextResponse.json({ error: "Connect PostgreSQL to persist saves." }, { status: 503 });
  const { slug } = await params;
  const result = await toggleSave(await getOptionalCurrentUser(), slug);

  return NextResponse.json({
    designSlug: slug,
    ...result,
    userId
  });
}
