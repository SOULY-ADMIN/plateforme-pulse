import { sql } from "./client";

type ClerkDbUser = {
  firstName?: string | null;
  fullName?: string | null;
  id?: string;
  imageUrl?: string;
  lastName?: string | null;
  primaryEmailAddress?: { emailAddress?: string | null } | null;
  username?: string | null;
};

function usernameFor(user: ClerkDbUser) {
  return user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `pulse-${user.id?.slice(-8)}`;
}

function displayNameFor(user: ClerkDbUser) {
  return user.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ") || usernameFor(user);
}

function logEnsurePulseUserNull(user: ClerkDbUser | null | undefined) {
  console.log("sql present ?", Boolean(sql));
  console.log("user object", user);
  console.log("user.id", user?.id);
}

export async function ensurePulseUser(user: ClerkDbUser | null | undefined) {
  console.log("ensurePulseUser start");
  console.log("user", user?.id);
  console.log("DATABASE_URL configured", !!process.env.DATABASE_URL);
  console.log("sql client available", Boolean(sql));

  if (!sql) {
    console.error("ensurePulseUser returning null: sql client is not configured");
    logEnsurePulseUserNull(user);
    return null;
  }

  if (!user?.id) {
    console.error("ensurePulseUser returning null: missing Clerk user id");
    logEnsurePulseUserNull(user);
    return null;
  }

  const username = usernameFor(user);
  const displayName = displayNameFor(user);
  try {
    const rows = await sql`
      insert into users (clerk_user_id, username, display_name, avatar_url)
      values (${user.id}, ${username}, ${displayName}, ${user.imageUrl || null})
      on conflict (clerk_user_id)
      do update set
        username = excluded.username,
        display_name = excluded.display_name,
        avatar_url = excluded.avatar_url
      returning id
    `;
    return rows[0]?.id as string | undefined;
  } catch (error) {
    const sqlError = error as { code?: unknown; message?: unknown };
    console.error("ensurePulseUser SQL error:", error);
    console.error("ensurePulseUser SQL error message:", sqlError.message);
    console.error("ensurePulseUser SQL error code:", sqlError.code);
    logEnsurePulseUserNull(user);
    throw error;
  }
}

export async function recordLike(user: ClerkDbUser | null | undefined, slug: string) {
  if (!sql) return false;
  const userId = await ensurePulseUser(user);
  if (!userId) return false;
  try {
    await sql`
      insert into design_likes (design_id, user_id)
      select designs.id, ${userId}::uuid
      from designs
      where designs.slug = ${slug}
      on conflict do nothing
    `;
    return true;
  } catch {
    return false;
  }
}

export async function toggleLike(user: ClerkDbUser | null | undefined, slug: string) {
  if (!sql) return { count: 0, liked: false, persisted: false };
  const userId = await ensurePulseUser(user);
  if (!userId) return { count: 0, liked: false, persisted: false };
  try {
    const rows = await sql`
      with target as (
        select id from designs where slug = ${slug}
      ),
      removed as (
        delete from design_likes
        where design_id = (select id from target)
          and user_id = ${userId}::uuid
        returning design_id
      ),
      inserted as (
        insert into design_likes (design_id, user_id)
        select id, ${userId}::uuid
        from target
        where not exists (select 1 from removed)
        on conflict do nothing
        returning design_id
      )
      select
        exists(select 1 from inserted) as liked,
        (select count(*) from design_likes where design_id = (select id from target)) as count
    `;
    return {
      count: Number(rows[0]?.count || 0),
      liked: Boolean(rows[0]?.liked),
      persisted: true
    };
  } catch {
    return { count: 0, liked: false, persisted: false };
  }
}

export async function recordSave(user: ClerkDbUser | null | undefined, slug: string) {
  if (!sql) return false;
  const userId = await ensurePulseUser(user);
  if (!userId) return false;
  try {
    await sql`
      insert into design_saves (design_id, user_id)
      select designs.id, ${userId}::uuid
      from designs
      where designs.slug = ${slug}
      on conflict do nothing
    `;
    return true;
  } catch {
    return false;
  }
}

export async function toggleSave(user: ClerkDbUser | null | undefined, slug: string) {
  if (!sql) return { count: 0, saved: false, persisted: false };
  const userId = await ensurePulseUser(user);
  if (!userId) return { count: 0, saved: false, persisted: false };
  try {
    const rows = await sql`
      with target as (
        select id from designs where slug = ${slug}
      ),
      removed as (
        delete from design_saves
        where design_id = (select id from target)
          and user_id = ${userId}::uuid
          and collection_name = 'Saved'
        returning design_id
      ),
      inserted as (
        insert into design_saves (design_id, user_id, collection_name)
        select id, ${userId}::uuid, 'Saved'
        from target
        where not exists (select 1 from removed)
        on conflict do nothing
        returning design_id
      )
      select
        exists(select 1 from inserted) as saved,
        (select count(*) from design_saves where design_id = (select id from target)) as count
    `;
    return {
      count: Number(rows[0]?.count || 0),
      saved: Boolean(rows[0]?.saved),
      persisted: true
    };
  } catch {
    return { count: 0, saved: false, persisted: false };
  }
}

export async function savedDesignSlugs(user: ClerkDbUser | null | undefined) {
  if (!sql || !user?.id) return [];
  try {
    const rows = await sql`
      select designs.slug
      from design_saves
      join users on users.id = design_saves.user_id
      join designs on designs.id = design_saves.design_id
      where users.clerk_user_id = ${user.id}
      order by design_saves.created_at desc
    `;
    return rows.map((row) => row.slug as string);
  } catch {
    return [];
  }
}

export async function likedDesignSlugs(user: ClerkDbUser | null | undefined) {
  if (!sql || !user?.id) return [];
  try {
    const rows = await sql`
      select designs.slug
      from design_likes
      join users on users.id = design_likes.user_id
      join designs on designs.id = design_likes.design_id
      where users.clerk_user_id = ${user.id}
      order by design_likes.created_at desc
    `;
    return rows.map((row) => row.slug as string);
  } catch {
    return [];
  }
}
