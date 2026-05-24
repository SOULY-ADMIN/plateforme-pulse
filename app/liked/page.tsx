import { AccountHero } from "@/src/components/account-hero";
import { DesignCollection } from "@/src/components/design-collection";
import { accountFromClerkUser } from "@/src/lib/auth-profile";
import { getOptionalCurrentUser } from "@/src/lib/auth-runtime";
import { getLikedDesigns } from "@/src/lib/db/designs";

export default async function LikedPage() {
  const user = await getOptionalCurrentUser();
  const account = accountFromClerkUser(user);
  const liked = await getLikedDesigns(user?.id);
  account.likedDesignSlugs = liked.map((design) => design.slug);

  return (
    <main>
      <AccountHero account={account} label="Liked posts" />
      <DesignCollection
        designs={liked}
        empty="No liked posts yet"
        kicker="Community signal"
        title="Liked posts"
      />
    </main>
  );
}
