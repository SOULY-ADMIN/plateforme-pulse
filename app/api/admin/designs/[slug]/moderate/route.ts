import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminUser } from "@/src/lib/admin-guard";
import { setAdminDesignStatus } from "@/src/lib/db/admin";
import { sql } from "@/src/lib/db/client";

const moderationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "FEATURED", "SELECTED_FOR_DROP"])
});

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdminUser("Admin moderation");
  if (admin.response) return admin.response;
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  try {
    const parsed = moderationSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid moderation status." }, { status: 400 });

    const { slug } = await params;
    const design = await setAdminDesignStatus(slug, parsed.data.status);
    if (!design) return NextResponse.json({ error: "Design not found." }, { status: 404 });

    console.log("Admin moderation updated design", {
      email: admin.user?.primaryEmailAddress?.emailAddress || "unknown",
      slug,
      status: design.status
    });
    return NextResponse.json({ design });
  } catch (error) {
    console.error("Admin moderation failed:", error);
    return NextResponse.json(
      {
        error: "Moderation failed",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
