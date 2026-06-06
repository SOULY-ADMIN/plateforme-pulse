import { CommunityBrowser } from "@/src/components/community-browser";
import { getOptionalCurrentUser, isAdminUser } from "@/src/lib/auth-runtime";
import { listCommunityDesigns, listCreators } from "@/src/lib/db/designs";
import { recommendedDesigns } from "@/src/lib/trending";

export default async function CommunityPage() {
  const [designs, creators, user] = await Promise.all([listCommunityDesigns(), listCreators(), getOptionalCurrentUser()]);
  const isAdmin = isAdminUser(user);
  const ranked = recommendedDesigns(designs);
  return (
    <main className="section-tight community-surface">
      <div className="wide-container">
        <div className="section-head community-head">
          <div>
            <span className="section-kicker">Community feed</span>
            <h1 className="section-title">Explore submitted concepts</h1>
          </div>
          <p className="section-copy">Browse real submitted clothing concepts with focused filters and clear community actions.</p>
        </div>
        <CommunityBrowser creators={creators} designs={ranked} isAdmin={isAdmin} />
      </div>
    </main>
  );
}
