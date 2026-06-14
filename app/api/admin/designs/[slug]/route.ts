import { NextResponse } from "next/server";
import { requireAdminUser } from "@/src/lib/admin-guard";
import { deleteAdminDesign } from "@/src/lib/db/admin";
import { sql } from "@/src/lib/db/client";

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdminUser("Admin design delete");
  if (admin.response) return admin.response;
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const { slug } = await params;

  try {
    const deletion = await deleteAdminDesign(slug);
    if (!deletion) {
      console.warn("Admin design delete failed: design not found", {
        email: admin.user?.primaryEmailAddress?.emailAddress || "unknown",
        slug
      });
      return NextResponse.json({ error: "Design not found." }, { status: 404 });
    }

    console.log("Admin design permanently deleted", {
      deletedRelations: deletion.deletedRelations,
      email: admin.user?.primaryEmailAddress?.emailAddress || "unknown",
      slug: deletion.design.slug,
      title: deletion.design.title
    });
    return NextResponse.json({ deletion });
  } catch (error) {
    console.error("Admin design delete failed:", { slug, error });
    return NextResponse.json(
      {
        error: "Unable to permanently delete design",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
