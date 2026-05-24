import type { PulseAccount } from "@/src/lib/auth-profile";

export function AccountHero({ account, label = "Creator profile" }: { account: PulseAccount; label?: string }) {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="panel profile-hero pulse-account-hero">
          {account.avatarUrl ? (
            <img className="avatar large account-photo" src={account.avatarUrl} alt="" />
          ) : (
            <span className="avatar large">{account.username.slice(0, 2).toUpperCase()}</span>
          )}
          <div>
            <span className="section-kicker">{label}</span>
            <h1 className="section-title">{account.displayName}</h1>
            <p className="muted">@{account.username} - {account.bio}</p>
            <div className="profile-stats">
              <span><strong>{account.followerCount.toLocaleString()}</strong>Followers</span>
              <span><strong>{account.followingCount.toLocaleString()}</strong>Following</span>
              <span><strong>{account.totalLikes.toLocaleString()}</strong>Total likes</span>
              <span><strong>{account.savedDesignSlugs.length}</strong>Saved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

