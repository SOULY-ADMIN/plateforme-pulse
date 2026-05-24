import { NextResponse } from "next/server";
import { cloudinary } from "@/src/lib/cloudinary";
import { getOptionalAuth, isClerkConfigured } from "@/src/lib/auth-runtime";

function hasCloudinaryConfig() {
  const values = [
    process.env.CLOUDINARY_CLOUD_NAME,
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET
  ];
  return values.every((value) => value && !value.toLowerCase().includes("placeholder"));
}

export async function POST() {
  if (!isClerkConfigured()) {
    return NextResponse.json({ error: "Connect Clerk before uploading images." }, { status: 503 });
  }
  const { userId } = await getOptionalAuth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasCloudinaryConfig()) {
    return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = `pulse/designs/${userId}`;
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET ?? ""
  );

  return NextResponse.json({
    timestamp,
    folder,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
  });
}
