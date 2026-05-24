import { SignIn } from "@clerk/nextjs";
import { AuthExperience, AuthPlaceholder } from "@/src/components/auth-experience";
import { isClerkConfigured } from "@/src/lib/auth-runtime";

export default function SignInPage() {
  const clerkEnabled = isClerkConfigured();

  return (
    <AuthExperience eyebrow="Member access" title="Enter the studio">
      {clerkEnabled ? (
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/creator-dashboard"
        />
      ) : (
        <AuthPlaceholder label="Login is ready for Clerk keys" />
      )}
    </AuthExperience>
  );
}
