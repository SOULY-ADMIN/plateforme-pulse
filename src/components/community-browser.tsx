"use client";

import { useMemo, useState } from "react";
import type { Creator, Design } from "@/src/lib/pulse-data";
import { DesignCard } from "./design-card";

const filters = ["All", "T-Shirts", "Hoodies", "Sweatshirts", "Pants", "Shorts"] as const;

function matchesFilter(design: Design, filter: string) {
  if (filter === "All") return true;
  if (filter === "T-Shirts") return ["T-shirt", "Long Sleeve", "T-Shirts"].includes(design.clothingType) || design.category === "T-Shirts";
  if (filter === "Pants") return ["Pants", "Joggers", "Cargo Pants"].includes(design.clothingType);
  return design.clothingType === filter.slice(0, -1) || design.category === filter;
}

function initials(value: string) {
  return value
    .split(/[.\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function CommunityBrowser({
  creators,
  designs,
  isAdmin = false
}: {
  creators: Creator[];
  designs: Design[];
  isAdmin?: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const filtered = useMemo(
    () => designs.filter((design) => matchesFilter(design, activeFilter)),
    [activeFilter, designs]
  );

  return (
    <>
      {creators.length ? (
        <div className="creator-stories" aria-label="Featured creators">
          {creators.map((creator) => (
            <a className="story" href={`/profile/${creator.username}`} key={creator.username}>
              <span className="story-ring">
                {creator.avatarUrl ? (
                  <img className="avatar" src={creator.avatarUrl} alt="" />
                ) : (
                  <span className="avatar">{initials(creator.username)}</span>
                )}
              </span>
              <span>@{creator.username}</span>
              <small>{creator.uploadedDesigns} designs</small>
            </a>
          ))}
        </div>
      ) : null}
      <div className="filters clothing-filters">
        {filters.map((filter) => (
          <button
            className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="masonry">{filtered.map((design) => <DesignCard key={design.slug} design={design} showAdminControls={isAdmin} />)}</div>
      ) : (
        <div className="empty">
          <div>
            <strong>No submitted designs yet</strong>
            <p>Connect PostgreSQL and publish the first approved clothing concepts to populate this feed.</p>
          </div>
        </div>
      )}
    </>
  );
}
