import Link from "next/link";
import { AccountHero } from "@/src/components/account-hero";
import { DesignCollection } from "@/src/components/design-collection";
import { accountFromClerkUser } from "@/src/lib/auth-profile";
import { getOptionalCurrentUser } from "@/src/lib/auth-runtime";
import { getSavedDesigns, getUserDesigns } from "@/src/lib/db/designs";

export default async function ProfilePage() {
  const user = await getOptionalCurrentUser();
  const account = accountFromClerkUser(user);
  const [saved, submitted] = await Promise.all([
    getSavedDesigns(user?.id),
    getUserDesigns(user?.id)
  ]);
  account.savedDesignSlugs = saved.map((design) => design.slug);
  account.totalLikes = submitted.reduce((sum, design) => sum + design.likes, 0);

  return (
    <main>
      <AccountHero account={account} />
      <section className="section-tight">
        <div className="container profile-action-row">
          <Link className="primary-btn" href="/account">Edit profile picture and username</Link>
          <Link className="ghost-btn" href="/creator-dashboard">Open creator dashboard</Link>
        </div>
      </section>
      <DesignCollection
        designs={saved}
        empty="No saved designs yet"
        kicker="Saved references"
        title="Your private future-board"
      />
    </main>
  );
}
