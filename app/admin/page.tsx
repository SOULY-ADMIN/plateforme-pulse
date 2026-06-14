import Link from "next/link";
import { AdminDeleteDesignButton } from "@/src/components/admin-delete-design-button";
import { ModerationActions } from "@/src/components/moderation-actions";
import { getOptionalCurrentUser, isAdminUser } from "@/src/lib/auth-runtime";
import { getAdminStats, listAdminDesigns, listAdminUsers } from "@/src/lib/db/admin";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function AdminBlocked() {
  return (
    <main className="section-tight">
      <div className="container panel admin-access-panel">
        <span className="section-kicker">Admin dashboard</span>
        <h1 className="section-title">Acces refuse</h1>
        <p className="section-copy">Ce dashboard est reserve a l'administrateur PULSE.</p>
      </div>
    </main>
  );
}

export default async function AdminPage() {
  const user = await getOptionalCurrentUser();
  if (!isAdminUser(user)) {
    console.warn("Admin page blocked: non-admin user", {
      email: user?.primaryEmailAddress?.emailAddress || "unknown",
      userId: user?.id || null
    });
    return <AdminBlocked />;
  }

  let stats;
  let designs;
  let users;

  try {
    [stats, designs, users] = await Promise.all([
      getAdminStats(),
      listAdminDesigns(),
      listAdminUsers()
    ]);
  } catch (error) {
    console.error("Admin dashboard failed:", error);
    return (
      <main className="section-tight">
        <div className="container panel admin-access-panel">
          <span className="section-kicker">Admin dashboard</span>
          <h1 className="section-title">Unable to load admin data</h1>
          <p className="section-copy">{error instanceof Error ? error.message : String(error)}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="section-tight admin-hero">
        <div className="container panel admin-command-center">
          <div>
            <span className="section-kicker">Admin dashboard</span>
            <h1 className="section-title">Pulse control room</h1>
            <p className="section-copy">Moderate submissions, hide unsafe concepts, monitor community signal and review creator activity.</p>
          </div>
          <div className="admin-owner-card">
            <span>Signed in as</span>
            <strong>{user?.primaryEmailAddress?.emailAddress || "admin"}</strong>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container admin-grid admin-stats-grid">
          <div className="admin-card"><span className="section-kicker">Total designs</span><span className="stat-value">{stats.totalDesigns}</span><small>{stats.liveDesigns} visible</small></div>
          <div className="admin-card"><span className="section-kicker">Community likes</span><span className="stat-value">{stats.likes}</span><small>{stats.saves} saves</small></div>
          <div className="admin-card"><span className="section-kicker">Users</span><span className="stat-value">{stats.users}</span><small>Registered creators</small></div>
          <div className="admin-card"><span className="section-kicker">Moderation</span><span className="stat-value">{stats.pendingDesigns}</span><small>{stats.hiddenDesigns} hidden</small></div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container panel admin-dashboard-panel">
          <div className="section-head">
            <div>
              <span className="section-kicker">Submissions</span>
              <h2 className="section-title">All submitted designs</h2>
            </div>
            <span className="status-pill">{designs.length} records</span>
          </div>
          {designs.length ? (
            <div className="admin-table-list">
              {designs.map((design) => (
                <article className="admin-row admin-design-row" key={design.slug}>
                  <div className="admin-row-main">
                    <span className={`admin-status admin-status-${design.status.toLowerCase().replace(/_/g, "-")}`}>{design.status}</span>
                    <strong>{design.title}</strong>
                    <p className="muted">@{design.creatorUsername} / {design.productType} / {formatDate(design.createdAt)}</p>
                    <div className="admin-row-metrics">
                      <span>{design.likeCount} likes</span>
                      <span>{design.saveCount} saves</span>
                      <span>{design.commentCount} comments</span>
                    </div>
                  </div>
                  <div className="moderation-toolbar">
                    <Link className="mini-btn" href={`/designs/${design.slug}`}>Open</Link>
                    <ModerationActions slug={design.slug} />
                    <AdminDeleteDesignButton label="Delete" slug={design.slug} title={design.title} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty"><div><strong>No submissions yet</strong><p>Real submitted concepts will appear here once creators publish designs.</p></div></div>
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container panel admin-dashboard-panel">
          <div className="section-head">
            <div>
              <span className="section-kicker">Users</span>
              <h2 className="section-title">Creator accounts</h2>
            </div>
            <span className="status-pill">{users.length} users</span>
          </div>
          {users.length ? (
            <div className="admin-user-list">
              {users.map((account) => (
                <article className="admin-user-row" key={account.username}>
                  {account.avatarUrl ? <img className="avatar" src={account.avatarUrl} alt="" /> : <span className="avatar">{account.username.slice(0, 2).toUpperCase()}</span>}
                  <div>
                    <strong>{account.displayName}</strong>
                    <p className="muted">@{account.username} / joined {formatDate(account.createdAt)}</p>
                  </div>
                  <div className="admin-row-metrics">
                    <span>{account.submittedDesigns} designs</span>
                    <span>{account.likesReceived} likes received</span>
                    <span>{account.savedDesigns} saved</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty"><div><strong>No users yet</strong><p>Users appear after Clerk accounts create or interact with PULSE profiles.</p></div></div>
          )}
        </div>
      </section>
    </main>
  );
}
