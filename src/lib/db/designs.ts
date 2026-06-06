import { unstable_noStore as noStore } from "next/cache";
import { sql } from "./client";
import type { Creator, Design, Drop } from "@/src/lib/pulse-data";

type DesignRow = {
  approval?: number | string | null;
  avatar_url?: string | null;
  bio?: string | null;
  branding?: string | null;
  clothing_type: string;
  collar?: string | null;
  color_base?: string | null;
  colorway?: string | null;
  comment_count?: number | string | null;
  cover_image_url?: string | null;
  created_at?: Date | string | null;
  cut?: string | null;
  description: string;
  display_name?: string | null;
  embroidery?: string | null;
  fabric: string;
  fit: string;
  gallery_image_urls?: string[] | null;
  gsm?: string | null;
  inspiration?: string | null;
  leg_opening?: string | null;
  like_count?: number | string | null;
  palette?: string[] | null;
  print_type?: string | null;
  product_type: string;
  save_count?: number | string | null;
  sleeve?: string | null;
  slug: string;
  status?: string | null;
  tags?: string[] | null;
  target_aesthetic?: string | null;
  title: string;
  username: string;
  washing_style?: string | null;
};

type CreatorRow = {
  avatar_url?: string | null;
  bio?: string | null;
  display_name: string;
  follower_count?: number | string | null;
  following_count?: number | string | null;
  liked_designs?: number | string | null;
  saved_designs?: number | string | null;
  total_likes?: number | string | null;
  uploaded_designs?: number | string | null;
  username: string;
};

const designDetailTables = ["users", "designs", "design_likes", "design_saves", "comments"] as const;
const designDetailColumns = [
  "slug",
  "status",
  "creator_id",
  "cover_image_url",
  "gallery_image_urls",
  "tags",
  "created_at",
  "updated_at"
] as const;

function numberFrom(value: number | string | null | undefined) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number.parseInt(value, 10) || 0;
  return 0;
}

function categoryFor(productType: string) {
  if (["Pants", "Joggers", "Cargo Pants", "Shorts"].includes(productType)) return "Bottoms";
  if (["Hoodie", "Sweatshirt"].includes(productType)) return productType === "Hoodie" ? "Hoodies" : "Sweatshirts";
  return "T-Shirts";
}

function shapeFor(productType: string): Design["shape"] {
  return ["Pants", "Joggers", "Cargo Pants", "Shorts"].includes(productType) ? "pants" : "hoodie";
}

function colorTokens(colorBase?: string | null) {
  switch (colorBase) {
    case "White":
      return {
        garment: "linear-gradient(145deg, #f5f5ef, #a7acaa)",
        palette: ["#f6f6f1", "#b7bbb8", "#111111"],
        visual: "linear-gradient(135deg, #111111, #e9e9e3 52%, #2d2f31)"
      };
    case "Grey":
      return {
        garment: "linear-gradient(145deg, #8d9090, #2d2f31)",
        palette: ["#111111", "#8d9090", "#d7d7d2"],
        visual: "linear-gradient(135deg, #090909, #777a78 48%, #191a1b)"
      };
    case "Navy":
      return {
        garment: "linear-gradient(145deg, #0c1420, #4a5668)",
        palette: ["#05070a", "#111d2c", "#8c98aa"],
        visual: "linear-gradient(135deg, #050506, #172132 55%, #08090b)"
      };
    case "Cream":
      return {
        garment: "linear-gradient(145deg, #dfd8c8, #827967)",
        palette: ["#f0eadc", "#a09888", "#111111"],
        visual: "linear-gradient(135deg, #0b0b0b, #d8d1c0 50%, #20201d)"
      };
    default:
      return {
        garment: "linear-gradient(145deg, #0c0d0e, #4b5154)",
        palette: ["#050505", "#2f3030", "#b8b8b1"],
        visual: "linear-gradient(135deg, #050505, #34383b 50%, #101112)"
      };
  }
}

export function mapDesignRow(row: DesignRow): Design {
  const tokens = colorTokens(row.color_base);
  const likeCount = numberFrom(row.like_count);
  const commentCount = numberFrom(row.comment_count);
  const saveCount = numberFrom(row.save_count);
  const productType = row.product_type || row.clothing_type;

  return {
    approval: numberFrom(row.approval),
    branding: row.branding,
    category: categoryFor(productType),
    clothingType: row.clothing_type || productType,
    collar: row.collar,
    colorBase: row.color_base,
    colorway: row.colorway || row.color_base || "Unspecified",
    comments: commentCount,
    coverImageUrl: row.cover_image_url,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
    creator: row.username,
    creatorAvatarUrl: row.avatar_url,
    creatorName: row.display_name || row.username,
    cut: row.cut || row.fit,
    description: row.description,
    embroidery: row.embroidery || (row.branding === "Embroidery" ? "Embroidery" : ""),
    fabric: row.fabric,
    fit: row.fit,
    galleryImageUrls: row.gallery_image_urls || [],
    garment: tokens.garment,
    gsm: row.gsm || "",
    height: shapeFor(productType) === "pants" ? "tall" : "short",
    inspiration: row.inspiration || row.description,
    legOpening: row.leg_opening,
    likes: likeCount,
    palette: row.palette?.length ? row.palette : tokens.palette,
    printType: row.print_type || (row.branding && row.branding !== "Embroidery" && row.branding !== "No Branding" ? row.branding : ""),
    saves: saveCount,
    shape: shapeFor(productType),
    sleeve: row.sleeve,
    slug: row.slug,
    status: row.status || "PENDING_REVIEW",
    style: row.target_aesthetic || productType,
    tags: row.tags || [],
    title: row.title,
    visual: tokens.visual,
    washing: row.washing_style || "",
    aesthetic: row.target_aesthetic || ""
  };
}

function mapDesignRows(rows: readonly unknown[]) {
  return rows.map((row) => mapDesignRow(row as DesignRow));
}

function mapCreatorRow(row: CreatorRow, rank?: number): Creator {
  return {
    avatarUrl: row.avatar_url,
    bio: row.bio,
    followerCount: numberFrom(row.follower_count),
    followingCount: numberFrom(row.following_count),
    likedDesigns: numberFrom(row.liked_designs),
    name: row.display_name,
    rank,
    savedDesigns: numberFrom(row.saved_designs),
    totalLikes: numberFrom(row.total_likes),
    uploadedDesigns: numberFrom(row.uploaded_designs),
    username: row.username
  };
}

function designSelect() {
  return sql!`
    d.slug,
    d.title,
    d.description,
    d.inspiration,
    d.product_type,
    d.clothing_type,
    d.fabric,
    d.gsm,
    d.fit,
    d.branding,
    d.color_base,
    d.collar,
    d.sleeve,
    d.leg_opening,
    d.cut,
    d.embroidery,
    d.print_type,
    d.colorway,
    d.washing_style,
    d.target_aesthetic,
    d.cover_image_url,
    d.gallery_image_urls,
    d.tags,
    d.palette,
    d.status,
    d.created_at,
    u.username,
    u.display_name,
    u.avatar_url,
    count(distinct dl.user_id) as like_count,
    count(distinct ds.user_id) as save_count,
    count(distinct c.id) as comment_count
  `;
}

export async function listCommunityDesigns(productType?: string | null) {
  noStore();
  if (!sql) return [];
  try {
    const rows = productType
      ? await sql`
          select ${designSelect()}
          from designs d
          join users u on u.id = d.creator_id
          left join design_likes dl on dl.design_id = d.id
          left join design_saves ds on ds.design_id = d.id
          left join comments c on c.design_id = d.id
          where d.status <> 'REJECTED' and d.product_type = ${productType}
          group by d.id, u.username, u.display_name, u.avatar_url
          order by d.created_at desc
          limit 80
        `
      : await sql`
          select ${designSelect()}
          from designs d
          join users u on u.id = d.creator_id
          left join design_likes dl on dl.design_id = d.id
          left join design_saves ds on ds.design_id = d.id
          left join comments c on c.design_id = d.id
          where d.status <> 'REJECTED'
          group by d.id, u.username, u.display_name, u.avatar_url
          order by d.created_at desc
          limit 80
        `;
    return mapDesignRows(rows);
  } catch {
    return [];
  }
}

export async function listApprovedDesigns() {
  noStore();
  if (!sql) return [];
  try {
    const rows = await sql`
      select ${designSelect()}
      from designs d
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where d.status in ('APPROVED', 'FEATURED', 'SELECTED_FOR_DROP')
      group by d.id, u.username, u.display_name, u.avatar_url
      order by d.updated_at desc
      limit 40
    `;
    return mapDesignRows(rows);
  } catch {
    return [];
  }
}

export async function listPendingDesigns() {
  noStore();
  if (!sql) return [];
  try {
    const rows = await sql`
      select ${designSelect()}
      from designs d
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where d.status = 'PENDING_REVIEW'
      group by d.id, u.username, u.display_name, u.avatar_url
      order by d.created_at asc
      limit 80
    `;
    return mapDesignRows(rows);
  } catch {
    return [];
  }
}

export async function findDesignBySlug(slug: string) {
  noStore();
  if (!sql) return null;
  try {
    console.log("findDesignBySlug start", slug);
    const rows = await sql`
      select ${designSelect()}
      from designs d
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where d.slug = ${slug}
      group by d.id, u.username, u.display_name, u.avatar_url
      limit 1
    `;
    console.log("findDesignBySlug rows", rows.length);
    return rows[0] ? mapDesignRow(rows[0] as DesignRow) : null;
  } catch (error) {
    console.error("findDesignBySlug failed:", error);
    throw error;
  }
}

export async function getDesignDetailSchemaDiagnostics() {
  noStore();
  if (!sql) {
    return {
      databaseConfigured: false,
      existingColumns: [],
      existingTables: [],
      missingColumns: [...designDetailColumns],
      missingTables: [...designDetailTables]
    };
  }

  try {
    const [tableRows, columnRows] = await Promise.all([
      sql`
        select table_name
        from information_schema.tables
        where table_schema = 'public'
      `,
      sql`
        select column_name
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'designs'
      `
    ]);
    const tableNames = tableRows.map((row) => String(row.table_name));
    const columnNames = columnRows.map((row) => String(row.column_name));
    const existingTables = designDetailTables.filter((table) => tableNames.includes(table));
    const existingColumns = designDetailColumns.filter((column) => columnNames.includes(column));
    return {
      databaseConfigured: true,
      existingColumns,
      existingTables,
      missingColumns: designDetailColumns.filter((column) => !existingColumns.includes(column)),
      missingTables: designDetailTables.filter((table) => !existingTables.includes(table))
    };
  } catch (error) {
    console.error("getDesignDetailSchemaDiagnostics failed:", error);
    return {
      databaseConfigured: true,
      error: error instanceof Error ? error.message : String(error),
      existingColumns: [],
      existingTables: [],
      missingColumns: [...designDetailColumns],
      missingTables: [...designDetailTables]
    };
  }
}

export async function listCreators() {
  noStore();
  if (!sql) return [];
  try {
    const rows = await sql`
      select
        username,
        display_name,
        avatar_url,
        bio,
        follower_count,
        following_count,
        uploaded_designs,
        liked_designs,
        saved_designs,
        coalesce((
          select count(*)
          from design_likes dl
          join designs d on d.id = dl.design_id
          where d.creator_id = user_profile_stats.id
        ), 0) as total_likes
      from user_profile_stats
      order by uploaded_designs desc, total_likes desc, username asc
      limit 40
    `;
    return rows.map((row, index) => mapCreatorRow(row as CreatorRow, index + 1));
  } catch {
    return [];
  }
}

export async function getCreatorProfile(username: string) {
  noStore();
  if (!sql) return null;
  try {
    const creators = await listCreators();
    const creator = creators.find((item) => item.username === username) ?? null;
    if (!creator) return null;
    const designs = await sql`
      select ${designSelect()}
      from designs d
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where u.username = ${username} and d.status <> 'REJECTED'
      group by d.id, u.username, u.display_name, u.avatar_url
      order by d.created_at desc
      limit 80
    `;
    return { creator, designs: mapDesignRows(designs) };
  } catch {
    return null;
  }
}

export async function getUserDesigns(clerkUserId: string | null | undefined) {
  noStore();
  if (!sql || !clerkUserId) return [];
  try {
    const rows = await sql`
      select ${designSelect()}
      from designs d
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where u.clerk_user_id = ${clerkUserId}
      group by d.id, u.username, u.display_name, u.avatar_url
      order by d.created_at desc
      limit 80
    `;
    return mapDesignRows(rows);
  } catch {
    return [];
  }
}

export async function getSavedDesigns(clerkUserId: string | null | undefined) {
  noStore();
  if (!sql || !clerkUserId) return [];
  try {
    const rows = await sql`
      select ${designSelect()}
      from design_saves saved
      join users viewer on viewer.id = saved.user_id
      join designs d on d.id = saved.design_id
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where viewer.clerk_user_id = ${clerkUserId}
      group by d.id, u.username, u.display_name, u.avatar_url, saved.created_at
      order by saved.created_at desc
      limit 80
    `;
    return mapDesignRows(rows);
  } catch {
    return [];
  }
}

export async function getLikedDesigns(clerkUserId: string | null | undefined) {
  noStore();
  if (!sql || !clerkUserId) return [];
  try {
    const rows = await sql`
      select ${designSelect()}
      from design_likes liked
      join users viewer on viewer.id = liked.user_id
      join designs d on d.id = liked.design_id
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      where viewer.clerk_user_id = ${clerkUserId}
      group by d.id, u.username, u.display_name, u.avatar_url, liked.created_at
      order by liked.created_at desc
      limit 80
    `;
    return mapDesignRows(rows);
  } catch {
    return [];
  }
}

export async function listDrops() {
  noStore();
  if (!sql) return [];
  try {
    const rows = await sql`
      select
        drops.drop_number,
        drops.title,
        drops.description,
        drops.launch_at,
        drops.status,
        count(drop_designs.design_id) as selected_designs
      from drops
      left join drop_designs on drop_designs.drop_id = drops.id
      group by drops.id
      order by drops.drop_number desc
    `;
    return rows.map((row): Drop => ({
      description: row.description,
      dropNumber: numberFrom(row.drop_number),
      launchAt: row.launch_at ? new Date(row.launch_at).toISOString() : null,
      selectedDesigns: numberFrom(row.selected_designs),
      status: row.status,
      title: row.title
    }));
  } catch {
    return [];
  }
}

export async function listNotifications(clerkUserId: string | null | undefined) {
  noStore();
  if (!sql || !clerkUserId) return [];
  try {
    return await sql`
      select notifications.title, notifications.body, notifications.type, notifications.created_at, notifications.read_at
      from notifications
      join users on users.id = notifications.user_id
      where users.clerk_user_id = ${clerkUserId}
      order by notifications.created_at desc
      limit 40
    `;
  } catch {
    return [];
  }
}

export async function getPlatformStats() {
  noStore();
  if (!sql) return { designs: 0, creators: 0, votes: 0 };
  try {
    const rows = await sql`
      select
        (select count(*) from designs where status <> 'REJECTED') as designs,
        (select count(*) from users) as creators,
        (select count(*) from design_likes) as votes
    `;
    return {
      creators: numberFrom(rows[0]?.creators),
      designs: numberFrom(rows[0]?.designs),
      votes: numberFrom(rows[0]?.votes)
    };
  } catch {
    return { designs: 0, creators: 0, votes: 0 };
  }
}
