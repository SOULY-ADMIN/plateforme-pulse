import Link from "next/link";
import { Search, Upload } from "lucide-react";
import { DesignCard } from "@/src/components/design-card";
import { MockupVisual } from "@/src/components/mockup-visual";
import { Reveal } from "@/src/components/reveal";
import { getPlatformStats, listCommunityDesigns, listCreators, listDrops } from "@/src/lib/db/designs";
import { recommendedDesigns } from "@/src/lib/trending";

export default async function HomePage() {
  const [designs, creators, drops, stats] = await Promise.all([
    listCommunityDesigns(),
    listCreators(),
    listDrops(),
    getPlatformStats()
  ]);
  const top = recommendedDesigns(designs);
  return (
    <main>
      <section className="hero home-hero">
        <div className="hero-light-field" aria-hidden="true"><span /><span /><span /></div>
        <div className="runway-lines" aria-hidden="true" />
        <div className="container hero-layout">
          <Reveal>
            <div className="hero-copy-panel">
            <span className="eyebrow">Community powered drops</span>
            <h1>THE COMMUNITY CREATES <span>THE FUTURE OF STREETWEAR</span></h1>
            <p className="hero-copy">Submit designs. Get voted by the community. Become part of the next drop.</p>
            <div className="hero-actions">
              <Link className="primary-btn" href="/community"><Search size={18} />Explore Designs</Link>
              <Link className="ghost-btn" href="/submit-design"><Upload size={18} />Submit Yours</Link>
            </div>
            <div className="hero-proof">
              <span>Creator-owned concepts</span>
              <span>Community signal</span>
              <span>Selected for production</span>
            </div>
            <div className="hero-meta">
              <div className="stat-tile"><span className="stat-value">{stats.designs.toLocaleString()}</span><span className="stat-label">Designs submitted</span></div>
              <div className="stat-tile"><span className="stat-value">{stats.creators.toLocaleString()}</span><span className="stat-label">Active creators</span></div>
              <div className="stat-tile"><span className="stat-value">{stats.votes.toLocaleString()}</span><span className="stat-label">Community votes</span></div>
            </div>
            </div>
          </Reveal>
          {top[0] ? (
            <Reveal delay={0.08}>
              <div className="hero-stage">
                {top[1] ? <div className="hero-lookbook hero-lookbook-a"><MockupVisual design={top[1]} className="short" /></div> : null}
                {top[2] ? <div className="hero-lookbook hero-lookbook-b"><MockupVisual design={top[2]} className="short" /></div> : null}
                <div className="hero-frame">
                  <MockupVisual design={top[0]} className="tall" />
                  <div className="editorial-tag">
                    <strong>{top[0].title}</strong>
                    <small>@{top[0].creator} / {top[0].likes.toLocaleString()} votes</small>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.08}>
              <div className="hero-stage empty-hero-stage">
                <div className="empty">
                  <div>
                    <strong>No community designs yet</strong>
                    <p>Connect the database and publish real submissions to activate the live feed.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
        <div className="hero-ticker" aria-hidden="true">
          <span>COMMUNITY DESIGN INDEX</span>
          <span>FUTURE DROP LAB</span>
          <span>STREETWEAR SIGNAL</span>
          <span>CREATOR-FIRST PLATFORM</span>
        </div>
      </section>
      <section className="section">
        <div className="wide-container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Trending concepts</span>
              <h2 className="section-title">Live community heat</h2>
            </div>
            <Link className="text-btn" href="/community">Open community</Link>
          </div>
          {top.length ? (
            <div className="carousel">{top.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
          ) : (
            <div className="empty"><div><strong>No trending concepts yet</strong><p>Real community submissions will appear here after they are stored in PostgreSQL.</p></div></div>
          )}
        </div>
      </section>
      {creators.length ? (
        <section className="section-tight">
          <div className="container">
            <div className="creator-grid">
              {creators.map((creator) => (
                <article className="creator-card" key={creator.username}>
                  <div className="creator-card-head">
                    <Link className="creator-inline" href={`/profile/${creator.username}`}>
                      {creator.avatarUrl ? <img className="avatar large" src={creator.avatarUrl} alt="" /> : <span className="avatar large">{creator.username.slice(0, 2).toUpperCase()}</span>}
                      <span><h3 className="creator-name">{creator.name}</h3>@{creator.username}</span>
                    </Link>
                    {creator.rank ? <span className="rank">#{creator.rank}</span> : null}
                  </div>
                  <p className="creator-bio">{creator.bio || "Creator profile pending."}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {drops.length ? (
        <section className="section">
          <div className="container drop-grid">
            {drops.map((drop) => (
              <article className="drop-card" key={drop.dropNumber}>
                <span className="status-pill">{drop.status}</span>
                <h3 className="section-title" style={{ fontSize: 30 }}>DROP #{drop.dropNumber.toString().padStart(3, "0")}<br />{drop.title}</h3>
                <p className="muted">{drop.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
