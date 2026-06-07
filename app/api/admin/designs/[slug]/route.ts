import { NextResponse } from "next/server";
import { requireAdminUser } from "@/src/lib/admin-guard";
import { hideAdminDesign } from "@/src/lib/db/admin";
import { sql } from "@/src/lib/db/client";

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdminUser("Admin design delete");
  if (admin.response) return admin.response;
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const { slug } = await params;

  try {
    const design = await hideAdminDesign(slug);
    if (!design) {
      console.warn("Admin design delete failed: design not found", {
        email: admin.user?.primaryEmailAddress?.emailAddress || "unknown",
        slug
      });
      return NextResponse.json({ error: "Design not found." }, { status: 404 });
    }

    console.log("Admin design hidden", {
      email: admin.user?.primaryEmailAddress?.emailAddress || "unknown",
      slug,
      status: design.status
    });
    return NextResponse.json({ design });
  } catch (error) {
    console.error("Admin design delete failed:", { slug, error });
    return NextResponse.json(
      {
        error: "Unable to hide design",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
