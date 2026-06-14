import Link from "next/link";
import type { CSSProperties } from "react";
import { AdminDeleteDesignButton } from "@/src/components/admin-delete-design-button";
import { DesignCard } from "@/src/components/design-card";
import { ModerationActions } from "@/src/components/moderation-actions";
import { accountFromClerkUser } from "@/src/lib/auth-profile";
import { getOptionalCurrentUser, isAdminUser, PULSE_ADMIN_EMAIL } from "@/src/lib/auth-runtime";
import { listAdminDesigns, type AdminDesignRow } from "@/src/lib/db/admin";
import { getLikedDesigns, getSavedDesigns, getUserDesigns } from "@/src/lib/db/designs";

export const dynamic = "force-dynamic";

const adminFilters = ["all", "pending", "approved", "rejected"] as const;
type AdminFilter = (typeof adminFilters)[number];

function normalizeFilter(value: string | undefined): AdminFilter {
  return adminFilters.includes(value as AdminFilter) ? value as AdminFilter : "all";
}

function formatDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function matchesAdminFilter(design: AdminDesignRow, filter: AdminFilter) {
  if (filter === "pending") return design.status === "PENDING_REVIEW";
  if (filter === "approved") return ["APPROVED", "FEATURED", "SELECTED_FOR_DROP"].includes(design.status);
  if (filter === "rejected") return design.status === "REJECTED";
  return true;
}

function adminFilterHref(filter: AdminFilter, query: string) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("moderationStatus", filter);
  if (query) params.set("moderationQuery", query);
  const search = params.toString();
  return search ? `/creator-dashboard?${search}` : "/creator-dashboard";
}

export default async function CreatorDashboardPage({
  searchParams
}: {
  searchParams: Promise<{ moderationQuery?: string; moderationStatus?: string }>;
}) {
  const user = await getOptionalCurrentUser();
  const isAdmin = isAdminUser(user);
  const account = accountFromClerkUser(user);
  const [activeDesigns, saved, liked] = await Promise.all([
    getUserDesigns(user?.id),
    getSavedDesigns(user?.id),
    getLikedDesigns(user?.id)
  ]);
  let adminDesigns: AdminDesignRow[] = [];
  let adminLoadError = "";
  if (isAdmin) {
    try {
      adminDesigns = await listAdminDesigns();
    } catch (error) {
      adminLoadError = error instanceof Error ? error.message : String(error);
      console.error("Studio admin moderation failed:", error);
    }
  }
  const params = await searchParams;
  const moderationFilter = normalizeFilter(params.moderationStatus);
  const moderationQuery = params.moderationQuery?.trim() || "";
  const normalizedQuery = moderationQuery.toLowerCase();
  const filteredAdminDesigns = isAdmin
    ? adminDesigns.filter((design) => {
        const matchesQuery = !normalizedQuery || [
          design.title,
          design.slug,
          design.creatorName,
          design.creatorUsername
        ].some((value) => value.toLowerCase().includes(normalizedQuery));
        return matchesQuery && matchesAdminFilter(design, moderationFilter);
      })
    : [];
  if (isAdmin) {
    console.log("Studio admin moderation loaded:", {
      email: user?.primaryEmailAddress?.emailAddress || "unknown",
      filter: moderationFilter,
      hasQuery: Boolean(moderationQuery),
      matchingDesigns: filteredAdminDesigns.length,
      totalDesigns: adminDesigns.length
    });
  }
  account.savedDesignSlugs = saved.map((design) => design.slug);
  account.likedDesignSlugs = liked.map((design) => design.slug);
  account.totalLikes = activeDesigns.reduce((sum, design) => sum + design.likes, 0);
  const signal = activeDesigns.length ? Math.min(100, activeDesigns.reduce((sum, design) => sum + design.likes + design.saves, 0)) : 0;

  return (
    <main>
      <section className="section-tight creator-dashboard-hero">
        <div className="container">
          <div className="panel creator-dashboard-panel">
            <div>
              <span className="eyebrow">Creator dashboard</span>
              <h1 className="detail-title">{account.displayName}'s studio</h1>
              <p className="hero-copy">
                Track your design signal, manage uploads, see community response and push concepts toward drop review.
              </p>
              <div className="hero-actions">
                <Link className="primary-btn" href="/submit-design">Submit new design</Link>
                <Link className="ghost-btn" href="/account">Edit identity</Link>
              </div>
            </div>
            <div className="dashboard-score">
              <span>Signal score</span>
              <strong>{signal}</strong>
              <div className="progress" style={{ "--value": `${signal}%` } as CSSProperties}><span /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container admin-grid">
          <div className="admin-card"><span className="section-kicker">Followers</span><span className="stat-value">{account.followerCount.toLocaleString()}</span></div>
          <div className="admin-card"><span className="section-kicker">Saved concepts</span><span className="stat-value">{account.savedDesignSlugs.length}</span></div>
          <div className="admin-card"><span className="section-kicker">Liked posts</span><span className="stat-value">{account.likedDesignSlugs.length}</span></div>
        </div>
      </section>

      {isAdmin ? (
        <section className="section-tight studio-admin-section">
          <div className="container panel admin-dashboard-panel">
            <div className="section-head studio-admin-head">
              <div>
                <span className="section-kicker">Admin moderation</span>
                <h2 className="section-title">All community designs</h2>
                <p className="section-copy">Visible only to {PULSE_ADMIN_EMAIL}.</p>
              </div>
              <span className="status-pill">{filteredAdminDesigns.length} / {adminDesigns.length}</span>
            </div>

            <form action="/creator-dashboard" className="studio-admin-search" method="get">
              {moderationFilter !== "all" ? <input name="moderationStatus" type="hidden" value={moderationFilter} /> : null}
              <label className="studio-admin-search-field">
                <span className="sr-only">Search designs</span>
                <input
                  className="field"
                  defaultValue={moderationQuery}
                  name="moderationQuery"
                  placeholder="Search title, slug or creator"
                  type="search"
                />
              </label>
              <button className="primary-btn" type="submit">Search</button>
              {moderationQuery ? <Link className="ghost-btn" href={adminFilterHref(moderationFilter, "")}>Clear</Link> : null}
            </form>

            <nav className="filters studio-admin-filters" aria-label="Moderation status">
              {adminFilters.map((filter) => (
                <Link
                  className={`filter-chip ${moderationFilter === filter ? "active" : ""}`}
                  href={adminFilterHref(filter, moderationQuery)}
                  key={filter}
                >
                  {filter === "all" ? "All" : filter === "pending" ? "Pending Review" : formatStatus(filter)}
                </Link>
              ))}
            </nav>

            {adminLoadError ? (
              <div className="empty">
                <div>
                  <strong>Moderation data unavailable</strong>
                  <p>{adminLoadError}</p>
                </div>
              </div>
            ) : filteredAdminDesigns.length ? (
              <div className="admin-table-list studio-admin-list">
                {filteredAdminDesigns.map((design) => (
                  <article className="admin-row admin-design-row" key={design.slug}>
                    <div className="admin-row-main">
                      <span className={`admin-status admin-status-${design.status.toLowerCase().replace(/_/g, "-")}`}>
                        {formatStatus(design.status)}
                      </span>
                      <strong>{design.title}</strong>
                      <p className="muted">
                        @{design.creatorUsername} / {design.creatorName} / {formatDate(design.createdAt)}
                      </p>
                      <p className="muted">{design.slug}</p>
                      <div className="admin-row-metrics">
                        <span>{design.likeCount} likes</span>
                        <span>{design.saveCount} saves</span>
                        <span>{design.commentCount} comments</span>
                      </div>
                    </div>
                    <div className="moderation-toolbar">
                      <Link className="mini-btn" href={`/designs/${design.slug}`}>View design</Link>
                      <ModerationActions slug={design.slug} />
                      <AdminDeleteDesignButton label="Delete" slug={design.slug} title={design.title} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty">
                <div>
                  <strong>No matching designs</strong>
                  <p>Change the status filter or search query.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wide-container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Active submissions</span>
              <h2 className="section-title">Concepts in review</h2>
            </div>
          </div>
          {activeDesigns.length ? (
            <div className="carousel">
              {activeDesigns.map((design) => <DesignCard key={design.slug} design={design} showAdminControls={isAdmin} />)}
            </div>
          ) : (
            <div className="empty"><div><strong>No submissions yet</strong><p>Use the submit flow to create your first real database-backed concept.</p></div></div>
          )}
        </div>
      </section>
    </main>
  );
}
