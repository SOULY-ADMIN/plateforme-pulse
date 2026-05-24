import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Design } from "@/src/lib/pulse-data";
import { DesignActions } from "./design-actions";
import { MockupVisual } from "./mockup-visual";

function initials(value: string) {
  return value
    .split(/[.\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function DesignCard({ design }: { design: Design }) {
  const creatorName = design.creatorName || design.creator;

  return (
    <article className={`design-card pin-${design.height}`}>
      <DesignActions comments={design.comments} initialLikes={design.likes} initialSaves={design.saves} slug={design.slug} />
      <Link className="card-media" href={`/designs/${design.slug}`} aria-label={`Open ${design.title}`}>
        <MockupVisual design={design} />
        <div className="card-social-overlay">
          <span className="creator-badge">
            {design.creatorAvatarUrl ? (
              <img className="avatar" src={design.creatorAvatarUrl} alt="" />
            ) : (
              <span className="avatar">{initials(design.creator)}</span>
            )}
            @{design.creator}
          </span>
          <span className="approval-chip">{design.status || "Submitted"}</span>
        </div>
      </Link>
      <div className="card-body">
        <div className="card-top">
          <div>
            <h3 className="card-title">{design.title}</h3>
            <Link className="creator-inline" href={`/profile/${design.creator}`}>
              {design.creatorAvatarUrl ? (
                <img className="avatar" src={design.creatorAvatarUrl} alt="" />
              ) : (
                <span className="avatar">{initials(design.creator)}</span>
              )}
              <span>{creatorName}</span>
            </Link>
          </div>
          <span className="palette-row">
            {design.palette.map((color) => (
              <i key={color} className="swatch" style={{ "--c": color } as CSSProperties} />
            ))}
          </span>
        </div>
        <p className="card-caption">{design.description}</p>
        <div className="tag-row" style={{ gap: 7, flexWrap: "wrap" }}>
          <span className="tag product-type-badge">{design.clothingType}</span>
          <span className="tag">{design.category}</span>
          <span className="tag">{design.fabric}</span>
        </div>
        <div className="card-footer-action">
          <span>{design.style}</span>
          <Link href={`/designs/${design.slug}`}>Open project <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </article>
  );
}
