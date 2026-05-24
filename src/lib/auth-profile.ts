type ClerkProfileUser = {
  firstName?: string | null;
  fullName?: string | null;
  id?: string;
  imageUrl?: string;
  lastName?: string | null;
  primaryEmailAddress?: { emailAddress?: string | null } | null;
  username?: string | null;
};

export type PulseAccount = {
  avatarUrl: string;
  bio: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  likedDesignSlugs: string[];
  savedDesignSlugs: string[];
  totalLikes: number;
  username: string;
};

export function accountFromClerkUser(user: ClerkProfileUser | null | undefined): PulseAccount {
  const emailName = user?.primaryEmailAddress?.emailAddress?.split("@")[0];
  const username = user?.username || emailName || "creator";
  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    username;

  return {
    avatarUrl: user?.imageUrl || "",
    bio: "Your profile data appears here after you complete onboarding.",
    displayName,
    followerCount: 0,
    followingCount: 0,
    likedDesignSlugs: [],
    savedDesignSlugs: [],
    totalLikes: 0,
    username
  };
}
