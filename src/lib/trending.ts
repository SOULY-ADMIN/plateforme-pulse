import type { Design } from "./pulse-data";

export function trendingScore(design: Design) {
  return design.likes + design.saves * 1.7 + design.comments * 8 + design.approval * 140;
}

export function recommendedDesigns(designs: Design[]) {
  return [...designs].sort((a, b) => trendingScore(b) - trendingScore(a));
}

