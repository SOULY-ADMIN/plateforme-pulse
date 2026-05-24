import { SignUp } from "@clerk/nextjs";
import { AuthExperience, AuthPlaceholder } from "@/src/components/auth-experience";
import { isClerkConfigured } from "@/src/lib/auth-runtime";

export default function SignUpPage() {
  const clerkEnabled = isClerkConfigured();

  return (
    <AuthExperience eyebrow="Creator onboarding" title="Claim your signal">
      {clerkEnabled ? (
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/creator-dashboard"
        />
      ) : (
        <AuthPlaceholder label="Signup is ready for Clerk keys" />
      )}
    </AuthExperience>
  );
}
