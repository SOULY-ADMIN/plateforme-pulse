import { NextResponse } from "next/server";
import { requireAdminUser } from "@/src/lib/admin-guard";
import { getAdminStats, listAdminDesigns, listAdminUsers } from "@/src/lib/db/admin";
import { sql } from "@/src/lib/db/client";

export async function GET() {
  const admin = await requireAdminUser("Admin overview");
  if (admin.response) return admin.response;
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  try {
    const [stats, designs, users] = await Promise.all([
      getAdminStats(),
      listAdminDesigns(),
      listAdminUsers()
    ]);
    return NextResponse.json({ designs, stats, users });
  } catch (error) {
    console.error("Admin overview failed:", error);
    return NextResponse.json(
      {
        error: "Unable to load admin overview",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
