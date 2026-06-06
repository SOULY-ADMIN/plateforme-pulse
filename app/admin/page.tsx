import { getPlatformStats, listPendingDesigns } from "@/src/lib/db/designs";
import { AdminDeleteDesignButton } from "@/src/components/admin-delete-design-button";
import { ModerationActions } from "@/src/components/moderation-actions";
import { getOptionalCurrentUser, isAdminUser } from "@/src/lib/auth-runtime";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getOptionalCurrentUser();
  if (!isAdminUser(user)) {
    console.warn("Admin page blocked: non-admin user", {
      email: user?.primaryEmailAddress?.emailAddress || "unknown",
      userId: user?.id || null
    });
    return (
      <main className="section-tight">
        <div className="container panel">
          <span className="section-kicker">Admin dashboard</span>
          <h1 className="section-title">Acces refuse</h1>
          <p className="section-copy">Ce dashboard est reserve a l'administrateur PULSE.</p>
        </div>
      </main>
    );
  }

  const [designs, stats] = await Promise.all([listPendingDesigns(), getPlatformStats()]);
  return (
    <main>
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Admin dashboard</span>
              <h1 className="section-title">Moderate, approve, launch</h1>
            </div>
          </div>
          <div className="admin-grid">
            <div className="admin-card"><span className="section-kicker">Pending designs</span><span className="stat-value">{designs.length}</span></div>
            <div className="admin-card"><span className="section-kicker">Live designs</span><span className="stat-value">{stats.designs}</span></div>
            <div className="admin-card"><span className="section-kicker">Total votes</span><span className="stat-value">{stats.votes}</span></div>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container panel">
          <h3>Moderation queue</h3>
          {designs.length ? (
            designs.map((design) => (
              <div className="admin-row" key={design.slug} style={{ padding: "12px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <div><strong>{design.title}</strong><p className="muted">@{design.creator} / {design.status}</p></div>
                <div className="moderation-toolbar">
                  <ModerationActions slug={design.slug} />
                  <AdminDeleteDesignButton slug={design.slug} title={design.title} />
                </div>
              </div>
            ))
          ) : (
            <div className="empty"><div><strong>No pending submissions</strong><p>New database submissions will appear here for moderation.</p></div></div>
          )}
        </div>
      </section>
    </main>
  );
}
