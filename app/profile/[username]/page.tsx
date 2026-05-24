import { DesignCard } from "@/src/components/design-card";
import { getCreatorProfile } from "@/src/lib/db/designs";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getCreatorProfile(username);
  if (!profile) notFound();
  const { creator, designs: uploaded } = profile;
  return (
    <main>
      <section className="section-tight">
        <div className="container panel profile-hero">
          {creator.avatarUrl ? <img className="avatar large account-photo" src={creator.avatarUrl} alt="" /> : <span className="avatar large">{creator.username.slice(0, 2).toUpperCase()}</span>}
          <div>
            <span className="section-kicker">Creator profile</span>
            <h1 className="section-title">{creator.name}</h1>
            <p className="muted">@{creator.username} - {creator.bio}</p>
            <div className="profile-stats"><span><strong>{creator.followerCount}</strong>Followers</span><span><strong>{creator.totalLikes}</strong>Total likes</span><span><strong>{uploaded.length}</strong>Uploaded designs</span></div>
          </div>
          <button className="primary-btn" disabled title="Follow is available after authentication is connected" type="button">Follow</button>
        </div>
      </section>
      <section className="section">
        <div className="wide-container masonry">
          {uploaded.length ? uploaded.map((design) => <DesignCard key={design.slug} design={design} />) : <div className="empty"><div><strong>No submitted designs yet</strong><p>This creator has not published a design.</p></div></div>}
        </div>
      </section>
    </main>
  );
}
