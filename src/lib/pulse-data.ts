export type Creator = {
  avatarUrl?: string | null;
  bio?: string | null;
  followerCount: number;
  followingCount: number;
  likedDesigns?: number;
  name: string;
  rank?: number;
  savedDesigns?: number;
  totalLikes: number;
  uploadedDesigns: number;
  username: string;
  verified?: boolean;
};

export type Design = {
  approval: number;
  branding?: string | null;
  category: string;
  clothingType: string;
  collar?: string | null;
  colorBase?: string | null;
  colorway: string;
  comments: number;
  coverImageUrl?: string | null;
  createdAt?: string | null;
  creator: string;
  creatorAvatarUrl?: string | null;
  creatorName?: string | null;
  cut: string;
  description: string;
  embroidery: string;
  fabric: string;
  fit: string;
  galleryImageUrls?: string[];
  garment: string;
  gsm: string;
  height: "short" | "tall";
  inspiration: string;
  legOpening?: string | null;
  likes: number;
  palette: string[];
  printType: string;
  saves: number;
  shape: "hoodie" | "pants" | "vest";
  sleeve?: string | null;
  slug: string;
  status?: string;
  style: string;
  tags: string[];
  title: string;
  visual: string;
  washing: string;
  aesthetic: string;
};

export type Drop = {
  description?: string | null;
  dropNumber: number;
  launchAt?: string | null;
  selectedDesigns: number;
  status: string;
  title: string;
};

export const creators: Creator[] = [];
export const designs: Design[] = [];
export const drops: Drop[] = [];

export function findCreator(username: string) {
  return creators.find((creator) => creator.username === username);
}

export function findDesign(slug: string) {
  return designs.find((design) => design.slug === slug);
}
