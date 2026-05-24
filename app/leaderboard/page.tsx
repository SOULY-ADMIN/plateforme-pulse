import { listCreators } from "@/src/lib/db/designs";

export default async function LeaderboardPage() {
  const creators = await listCreators();
  return (
    <main className="section-tight">
      <div className="container">
        <span className="eyebrow">Community rank</span>
        <h1 className="detail-title">Leaderboard</h1>
        <div className="panel leaderboard-panel">
          {creators.length ? (
            creators.map((creator, index) => (
              <a className="leaderboard-row" href={`/profile/${creator.username}`} key={creator.username}>
                <span className="rank">#{index + 1}</span>
                {creator.avatarUrl ? <img className="avatar" src={creator.avatarUrl} alt="" /> : <span className="avatar">{creator.username.slice(0, 2).toUpperCase()}</span>}
                <span><strong>{creator.name}</strong><small>@{creator.username}</small></span>
                <b>{creator.totalLikes.toLocaleString()}</b>
              </a>
            ))
          ) : (
            <div className="empty"><div><strong>No creator rankings yet</strong><p>Rankings appear after real submissions receive community activity.</p></div></div>
          )}
        </div>
      </div>
    </main>
  );
}
