import { AccountHero } from "@/src/components/account-hero";
import { DesignCollection } from "@/src/components/design-collection";
import { accountFromClerkUser } from "@/src/lib/auth-profile";
import { getOptionalCurrentUser } from "@/src/lib/auth-runtime";
import { getSavedDesigns } from "@/src/lib/db/designs";

export default async function SavedPage() {
  const user = await getOptionalCurrentUser();
  const account = accountFromClerkUser(user);
  const saved = await getSavedDesigns(user?.id);
  account.savedDesignSlugs = saved.map((design) => design.slug);

  return (
    <main>
      <AccountHero account={account} label="Saved designs" />
      <DesignCollection
        designs={saved}
        empty="No saved designs yet"
        kicker="Collections"
        title="Saved design archive"
      />
    </main>
  );
}
