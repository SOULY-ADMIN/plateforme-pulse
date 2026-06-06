import Link from "next/link";
import type { CSSProperties } from "react";
import { DesignCard } from "@/src/components/design-card";
import { accountFromClerkUser } from "@/src/lib/auth-profile";
import { getOptionalCurrentUser, isAdminUser } from "@/src/lib/auth-runtime";
import { getLikedDesigns, getSavedDesigns, getUserDesigns } from "@/src/lib/db/designs";

export default async function CreatorDashboardPage() {
  const user = await getOptionalCurrentUser();
  const isAdmin = isAdminUser(user);
  const account = accountFromClerkUser(user);
  const [activeDesigns, saved, liked] = await Promise.all([
    getUserDesigns(user?.id),
    getSavedDesigns(user?.id),
    getLikedDesigns(user?.id)
  ]);
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
