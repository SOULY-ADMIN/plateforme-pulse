import { NextResponse } from "next/server";
import { listCommunityDesigns } from "@/src/lib/db/designs";
import { recommendedDesigns } from "@/src/lib/trending";

export async function GET() {
  const designs = await listCommunityDesigns();
  return NextResponse.json({
    model: "pulse-signal-ranker-v0",
    factors: ["likes", "saves", "comments", "approval", "creatorVelocity"],
    designs: recommendedDesigns(designs)
  });
}
