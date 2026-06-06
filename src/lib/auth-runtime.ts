const placeholderMarkers = [
  "placeholder",
  "replace",
  "cHVsc2UtZGVtby",
];

const adminEmails = new Set(["so.bennani.ma@gmail.com"]);

type AdminCheckUser = {
  emailAddresses?: Array<{ emailAddress?: string | null }> | null;
  primaryEmailAddress?: { emailAddress?: string | null } | null;
};

function hasPlaceholderMarker(value: string) {
  return placeholderMarkers.some((marker) => value.toLowerCase().includes(marker.toLowerCase()));
}

export function isClerkConfigured() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const secretKey = process.env.CLERK_SECRET_KEY || "";

  return (
    publishableKey.startsWith("pk_") &&
    secretKey.startsWith("sk_") &&
    !hasPlaceholderMarker(publishableKey) &&
    !hasPlaceholderMarker(secretKey)
  );
}

export async function getOptionalCurrentUser() {
  if (!isClerkConfigured()) return null;
  const { currentUser } = await import("@clerk/nextjs/server");
  return currentUser();
}

export async function getOptionalAuth() {
  if (!isClerkConfigured()) return { userId: null };
  const { auth } = await import("@clerk/nextjs/server");
  return auth();
}

function normalizeEmail(value: string | null | undefined) {
  return value?.trim().toLowerCase() || "";
}

export function isAdminUser(user: AdminCheckUser | null | undefined) {
  const emails = [
    normalizeEmail(user?.primaryEmailAddress?.emailAddress),
    ...(user?.emailAddresses || []).map((email) => normalizeEmail(email.emailAddress))
  ].filter(Boolean);

  return emails.some((email) => adminEmails.has(email));
}

export async function getIsCurrentUserAdmin() {
  return isAdminUser(await getOptionalCurrentUser());
}
