import { NextResponse } from "next/server";
import { z } from "zod";
import { getOptionalAuth, getOptionalCurrentUser, isClerkConfigured } from "@/src/lib/auth-runtime";
import { listCommunityDesigns } from "@/src/lib/db/designs";
import { sql } from "@/src/lib/db/client";
import { ensurePulseUser } from "@/src/lib/db/social";

const productTypes = ["T-shirt", "Long Sleeve", "Sweatshirt", "Hoodie", "Pants", "Joggers", "Cargo Pants", "Shorts"] as const;
const topFits = ["Regular Fit", "Slim Fit", "Oversized Fit", "Boxy Fit"] as const;
const fleeceFits = ["Regular", "Oversized", "Boxy"] as const;
const pantsFits = ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"] as const;
const shortsFits = ["Regular", "Relaxed", "Oversized"] as const;
const fits = ["Regular Fit", "Slim Fit", "Oversized Fit", "Boxy Fit", "Regular", "Oversized", "Boxy", "Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"] as const;
const brandingOptions = ["No Branding", "Embroidery", "Printed Logo", "Woven Label", "Screen Print", "Puff Print"] as const;
const fabricOptions = ["Lightweight", "Medium Weight", "Heavyweight", "Standard Fleece", "Heavy Fleece", "Premium Heavyweight", "Cotton Twill", "Heavy Cotton", "Nylon Cotton", "Cotton Fleece", "Ripstop Cotton", "Fleece Cotton"] as const;
const colorBases = ["Black", "White", "Grey", "Navy", "Cream"] as const;
const collarOptions = ["Crew Neck", "Heavy Crew Neck", "Mock Neck"] as const;
const sleeveOptions = ["Short Sleeve", "Long Sleeve"] as const;
const legOpenings = ["Tapered", "Straight", "Wide"] as const;

const createDesignSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  productType: z.enum(productTypes),
  fit: z.enum(fits),
  fabric: z.enum(fabricOptions),
  branding: z.enum(brandingOptions),
  color: z.enum(colorBases).default("Black"),
  collar: z.enum(collarOptions).optional(),
  sleeve: z.enum(sleeveOptions).optional(),
  legOpening: z.enum(legOpenings).optional(),
  tags: z.array(z.string()).default([]),
  coverImageUrl: z.string().url(),
  galleryImageUrls: z.array(z.string().url()).default([])
}).superRefine((payload, ctx) => {
  const allowedFits: readonly string[] =
    payload.productType === "Pants" || payload.productType === "Joggers" || payload.productType === "Cargo Pants"
      ? pantsFits
      : payload.productType === "Shorts"
        ? shortsFits
        : payload.productType === "Sweatshirt" || payload.productType === "Hoodie"
          ? fleeceFits
          : topFits;
  if (!allowedFits.includes(payload.fit)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${payload.fit} is not available for ${payload.productType}`,
      path: ["fit"]
    });
  }
});

export async function GET() {
  const designs = await listCommunityDesigns();
  return NextResponse.json({ designs });
}

export async function POST(request: Request) {
  try {
    if (!isClerkConfigured()) {
      return NextResponse.json({ error: "Clerk is not configured" }, { status: 503 });
    }
    const { userId } = await getOptionalAuth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!sql) return NextResponse.json({ error: "Database is not configured" }, { status: 503 });

    const parsed = createDesignSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid design submission" }, { status: 400 });
    }
    const payload = parsed.data;
    const dbUserId = (await ensurePulseUser(await getOptionalCurrentUser())) ?? null;
    console.log("dbUserId =", dbUserId);
    const slugBase = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 72) || "design";
    const slug = `${slugBase}-${crypto.randomUUID().slice(0, 8)}`;
    const embroidery = payload.branding === "Embroidery" ? "Embroidery" : "None";
    const printType = ["Printed Logo", "Screen Print", "Puff Print"].includes(payload.branding) ? payload.branding : "None";
    const rows = await sql`
      insert into designs (
        creator_id,
        slug,
        title,
        description,
        product_type,
        clothing_type,
        fabric,
        fit,
        branding,
        color_base,
        collar,
        sleeve,
        leg_opening,
        embroidery,
        print_type,
        colorway,
        cover_image_url,
        gallery_image_urls,
        tags,
        status
      )
      values (
        ${dbUserId}::uuid,
        ${slug},
        ${payload.title},
        ${payload.description},
        ${payload.productType},
        ${payload.productType},
        ${payload.fabric},
        ${payload.fit},
        ${payload.branding},
        ${payload.color},
        ${payload.collar || null},
        ${payload.sleeve || null},
        ${payload.legOpening || null},
        ${embroidery},
        ${printType},
        ${payload.color},
        ${payload.coverImageUrl},
        ${payload.galleryImageUrls},
        ${payload.tags},
        'PENDING_REVIEW'
      )
      returning slug, status
    `;

    return NextResponse.json(
      {
        design: {
          creatorId: userId,
          slug: rows[0]?.slug,
          status: rows[0]?.status,
          ...payload
        }
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    );
  }
}
