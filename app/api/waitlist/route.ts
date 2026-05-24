import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/src/lib/db/client";

const waitlistSchema = z.object({
  email: z.string().email(),
  inviteCode: z.string().optional(),
  reason: z.string().optional()
});

export async function POST(request: Request) {
  const parsed = waitlistSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid waitlist request" }, { status: 400 });
  }
  const payload = parsed.data;
  const inviteCode = payload.inviteCode?.trim().toUpperCase() || null;

  if (!sql) {
    return NextResponse.json(
      { error: "Database is not configured. Add a real DATABASE_URL to enable the waitlist." },
      { status: 503 }
    );
  }

  try {
    const existing = await sql`
      select queue_position, status
      from waitlist_entries
      where email = ${payload.email}
      limit 1
    `;
    if (existing[0]) {
      return NextResponse.json({
        queued: true,
        persisted: true,
        queuePosition: existing[0].queue_position,
        status: existing[0].status
      });
    }

    const countRows = await sql`select count(*) as count from waitlist_entries`;
    const queuePosition = Number(countRows[0]?.count || 0) + 1;
    await sql`
        insert into waitlist_entries (email, invite_code, reason, queue_position, status)
        values (${payload.email}, ${inviteCode}, ${payload.reason || null}, ${queuePosition}, ${inviteCode ? "PRIORITY" : "PENDING"})
      `;
    return NextResponse.json({
      queued: true,
      persisted: true,
      queuePosition,
      status: inviteCode ? "PRIORITY" : "PENDING"
    });
  } catch {
    return NextResponse.json({ error: "Unable to join the waitlist right now." }, { status: 500 });
  }
}
