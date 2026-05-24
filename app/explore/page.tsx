import { DesignCard } from "@/src/components/design-card";
import { listCommunityDesigns, listCreators } from "@/src/lib/db/designs";
import { recommendedDesigns } from "@/src/lib/trending";
import type { CSSProperties } from "react";

export default async function ExplorePage() {
  const [designs, creators] = await Promise.all([listCommunityDesigns(), listCreators()]);
  const ranked = recommendedDesigns(designs);
  return (
    <main>
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-kicker">AI discover</span>
              <h1 className="section-title">Taste graph recommendations</h1>
            </div>
            <p className="section-copy">Scores combine vote velocity, save depth, creator rank, comments and category momentum.</p>
          </div>
          <div className="reco-grid">
            <div className="panel"><h3>Trending algorithm</h3><p className="muted">Ranks real likes, saves and comments from the database.</p></div>
            <div className="panel"><h3>Creator ranking</h3>{creators.length ? creators.map((c) => <div className="admin-row" key={c.username}><span>@{c.username}</span><strong>#{c.rank}</strong></div>) : <p className="muted">No creator activity yet.</p>}</div>
            <div className="panel"><h3>Category heat</h3><div className="progress" style={{ "--value": `${ranked.length ? 100 : 0}%` } as CSSProperties}><span /></div></div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wide-container carousel">
          {ranked.length ? ranked.map((design) => <DesignCard key={design.slug} design={design} />) : <div className="empty"><div><strong>No recommendations yet</strong><p>Recommendations activate after real designs receive community activity.</p></div></div>}
        </div>
      </section>
    </main>
  );
}
