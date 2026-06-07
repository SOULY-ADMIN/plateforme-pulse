import { unstable_noStore as noStore } from "next/cache";
import { sql } from "./client";

export type AdminDesignRow = {
  commentCount: number;
  createdAt: string | null;
  creatorName: string;
  creatorUsername: string;
  likeCount: number;
  productType: string;
  saveCount: number;
  slug: string;
  status: string;
  title: string;
  updatedAt: string | null;
};

export type AdminUserRow = {
  avatarUrl: string | null;
  createdAt: string | null;
  displayName: string;
  likesReceived: number;
  savedDesigns: number;
  submittedDesigns: number;
  username: string;
};

export type AdminStats = {
  approvedDesigns: number;
  hiddenDesigns: number;
  likes: number;
  liveDesigns: number;
  pendingDesigns: number;
  saves: number;
  totalDesigns: number;
  users: number;
};

const emptyStats: AdminStats = {
  approvedDesigns: 0,
  hiddenDesigns: 0,
  likes: 0,
  liveDesigns: 0,
  pendingDesigns: 0,
  saves: 0,
  totalDesigns: 0,
  users: 0
};

function numberFrom(value: number | string | null | undefined) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number.parseInt(value, 10) || 0;
  return 0;
}

function dateFrom(value: Date | string | null | undefined) {
  return value ? new Date(value).toISOString() : null;
}

export async function getAdminStats(): Promise<AdminStats> {
  noStore();
  if (!sql) return emptyStats;

  try {
    const rows = await sql`
      select
        (select count(*) from designs) as total_designs,
        (select count(*) from designs where status <> 'REJECTED') as live_designs,
        (select count(*) from designs where status = 'REJECTED') as hidden_designs,
        (select count(*) from designs where status = 'PENDING_REVIEW') as pending_designs,
        (select count(*) from designs where status in ('APPROVED', 'FEATURED', 'SELECTED_FOR_DROP')) as approved_designs,
        (select count(*) from design_likes) as likes,
        (select count(*) from design_saves) as saves,
        (select count(*) from users) as users
    `;
    return {
      approvedDesigns: numberFrom(rows[0]?.approved_designs),
      hiddenDesigns: numberFrom(rows[0]?.hidden_designs),
      likes: numberFrom(rows[0]?.likes),
      liveDesigns: numberFrom(rows[0]?.live_designs),
      pendingDesigns: numberFrom(rows[0]?.pending_designs),
      saves: numberFrom(rows[0]?.saves),
      totalDesigns: numberFrom(rows[0]?.total_designs),
      users: numberFrom(rows[0]?.users)
    };
  } catch (error) {
    console.error("getAdminStats failed:", error);
    return emptyStats;
  }
}

export async function listAdminDesigns(): Promise<AdminDesignRow[]> {
  noStore();
  if (!sql) return [];

  try {
    const rows = await sql`
      select
        d.slug,
        d.title,
        d.product_type,
        d.status,
        d.created_at,
        d.updated_at,
        u.username,
        u.display_name,
        count(distinct dl.user_id) as like_count,
        count(distinct ds.user_id) as save_count,
        count(distinct c.id) as comment_count
      from designs d
      join users u on u.id = d.creator_id
      left join design_likes dl on dl.design_id = d.id
      left join design_saves ds on ds.design_id = d.id
      left join comments c on c.design_id = d.id
      group by d.id, u.username, u.display_name
      order by d.created_at desc
      limit 200
    `;
    return rows.map((row): AdminDesignRow => ({
      commentCount: numberFrom(row.comment_count),
      createdAt: dateFrom(row.created_at),
      creatorName: row.display_name || row.username,
      creatorUsername: row.username,
      likeCount: numberFrom(row.like_count),
      productType: row.product_type,
      saveCount: numberFrom(row.save_count),
      slug: row.slug,
      status: row.status,
      title: row.title,
      updatedAt: dateFrom(row.updated_at)
    }));
  } catch (error) {
    console.error("listAdminDesigns failed:", error);
    return [];
  }
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  noStore();
  if (!sql) return [];

  try {
    const rows = await sql`
      select
        u.username,
        u.display_name,
        u.avatar_url,
        u.created_at,
        count(distinct d.id) as submitted_designs,
        count(distinct saved.design_id) as saved_designs,
        count(distinct received_likes.user_id) as likes_received
      from users u
      left join designs d on d.creator_id = u.id
      left join design_saves saved on saved.user_id = u.id
      left join design_likes received_likes on received_likes.design_id = d.id
      group by u.id
      order by u.created_at desc
      limit 200
    `;
    return rows.map((row): AdminUserRow => ({
      avatarUrl: row.avatar_url,
      createdAt: dateFrom(row.created_at),
      displayName: row.display_name || row.username,
      likesReceived: numberFrom(row.likes_received),
      savedDesigns: numberFrom(row.saved_designs),
      submittedDesigns: numberFrom(row.submitted_designs),
      username: row.username
    }));
  } catch (error) {
    console.error("listAdminUsers failed:", error);
    return [];
  }
}

export async function setAdminDesignStatus(slug: string, status: "APPROVED" | "REJECTED" | "FEATURED" | "SELECTED_FOR_DROP") {
  noStore();
  if (!sql) return null;

  try {
    const rows = await sql`
      update designs
      set status = ${status}::design_status, updated_at = now()
      where slug = ${slug}
      returning slug, status
    `;
    return rows[0] || null;
  } catch (error) {
    console.error("setAdminDesignStatus failed:", { slug, status, error });
    throw error;
  }
}

export async function hideAdminDesign(slug: string) {
  return setAdminDesignStatus(slug, "REJECTED");
}
