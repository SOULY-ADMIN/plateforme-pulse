import { UserProfile } from "@clerk/nextjs";
import { AuthExperience, AuthPlaceholder } from "@/src/components/auth-experience";
import { isClerkConfigured } from "@/src/lib/auth-runtime";

export default function AccountPage() {
  const clerkEnabled = isClerkConfigured();

  return (
    <AuthExperience eyebrow="Account settings" title="Tune your identity">
      {clerkEnabled ? (
        <UserProfile path="/account" routing="path" />
      ) : (
        <AuthPlaceholder label="Account settings are ready for Clerk keys" />
      )}
    </AuthExperience>
  );
}
