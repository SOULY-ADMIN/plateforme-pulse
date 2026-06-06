import { DesignCard } from "@/src/components/design-card";
import { getCreatorProfile } from "@/src/lib/db/designs";
import Link from "next/link";

export async function generateStaticParams() {
  return [];
}

function initials(value: string) {
  return value
    .split(/[.\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";
}

function MissingProfile({ username }: { username: string }) {
  return (
    <main>
      <section className="section-tight">
        <div className="container panel profile-hero">
          <span className="avatar large">?</span>
          <div>
            <span className="section-kicker">Creator profile</span>
            <h1 className="section-title">Profil introuvable</h1>
            <p className="muted">Le profil @{username || "creator"} n'existe pas encore ou ne contient aucune donnee publique.</p>
            <Link className="ghost-btn" href="/community">Back to community</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profileUsername = safeDecode(username || "");
  let profile = null;

  try {
    profile = await getCreatorProfile(profileUsername);
  } catch (error) {
    console.error("ProfilePage failed:", {
      username: profileUsername,
      message: error instanceof Error ? error.message : String(error),
      error
    });
  }

  if (!profile) return <MissingProfile username={profileUsername} />;

  const { creator, designs: uploaded } = profile;
  const handle = creator.username || profileUsername || "creator";
  const displayName = creator.name || handle;
  const bio = creator.bio?.trim();

  return (
    <main>
      <section className="section-tight">
        <div className="container panel profile-hero">
          {creator.avatarUrl ? <img className="avatar large account-photo" src={creator.avatarUrl} alt="" /> : <span className="avatar large">{initials(handle)}</span>}
          <div>
            <span className="section-kicker">Creator profile</span>
            <h1 className="section-title">{displayName}</h1>
            <p className="muted">@{handle}{bio ? ` - ${bio}` : ""}</p>
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
