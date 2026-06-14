import { AdminDeleteDesignButton } from "@/src/components/admin-delete-design-button";
import { MockupVisual } from "@/src/components/mockup-visual";
import { ShareButton } from "@/src/components/share-button";
import { getOptionalCurrentUser, isAdminUser } from "@/src/lib/auth-runtime";
import { findDesignBySlug, getDesignDetailSchemaDiagnostics } from "@/src/lib/db/designs";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const hiddenSpecValues = new Set([
  "",
  "none",
  "non défini",
  "null",
  "undefined",
  "production estimate pending",
  "production wash pending",
  "submitted by the creator",
  "submitted by the creator.",
  "creator-defined",
  "unspecified"
]);

function cleanSpecValue(value: unknown) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim();
  const normalized = text.toLowerCase();
  if (hiddenSpecValues.has(normalized)) return "";
  if (normalized.includes("pending")) return "";
  return text;
}

function firstSpecValue(...values: unknown[]) {
  for (const value of values) {
    const cleaned = cleanSpecValue(value);
    if (cleaned) return cleaned;
  }
  return "";
}

function DesignDetailLoadError({
  slug
}: {
  slug: string;
}) {
  return (
    <main className="section-tight">
      <div className="container panel">
        <span className="section-kicker">Design detail error</span>
        <h1 className="section-title">Project temporarily unavailable</h1>
        <p className="section-copy">We could not load this design right now. Please try again shortly.</p>
        <div className="empty">
          <div>
            <strong>Reference: {slug}</strong>
            <p>No technical database information is exposed on this page.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function DesignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isAdmin = isAdminUser(await getOptionalCurrentUser());
  let design;
  try {
    design = await findDesignBySlug(slug, isAdmin);
  } catch (error) {
    const diagnostics = await getDesignDetailSchemaDiagnostics();
    console.error("Design detail load failed:", { slug, error, diagnostics });
    return <DesignDetailLoadError slug={slug} />;
  }

  if (!design) {
    console.warn("Design detail not found or hidden:", { slug });
    notFound();
  }

  const description = firstSpecValue(design.description);
  const specs = [
    ["Title", design.title],
    ["Creator", design.creator ? `@${design.creator}` : ""],
    ["Inspiration", firstSpecValue(design.inspiration, design.description)],
    ["Streetwear style", design.style],
    ["Fit", design.fit],
    ["Cut", design.cut],
    ["Embroidery", design.embroidery],
    ["Print type", design.printType],
    ["Fabric", design.fabric],
    ["GSM", design.gsm],
    ["Colorway", design.colorway],
    ["Washing style", design.washing],
    ["Target aesthetic", design.aesthetic]
  ]
    .map(([label, value]) => [label, cleanSpecValue(value)] as const)
    .filter(([, value]) => value);

  return (
    <main>
      <section className="detail-hero">
        <div className="wide-container detail-layout">
          <div className="gallery"><MockupVisual design={design} /><div className="gallery-stack"><MockupVisual design={design} /><MockupVisual design={design} /><MockupVisual design={design} /></div></div>
          <aside className="panel">
            <span className="eyebrow">{design.category} concept</span>
            <h1 className="detail-title">{design.title}</h1>
            {description ? <p className="muted">{description}</p> : null}
            <div className="approval"><strong>{design.likes.toLocaleString()} community votes</strong><div className="progress" style={{ "--value": `${Math.min(100, design.likes)}%` } as CSSProperties}><span /></div></div>
            <div className="hero-actions">
              <a className="primary-btn" href={`/community`}>Back to community</a>
              <ShareButton title={design.title} />
              {isAdmin ? <AdminDeleteDesignButton redirectTo="/community" slug={design.slug} title={design.title} /> : null}
            </div>
          </aside>
        </div>
      </section>
      <section className="section-tight">
        <div className="container panel">
          <h2 className="section-title">Full product specifications</h2>
          <div className="spec-grid">{specs.map(([label, value]) => <div className="spec-card" key={label}><span className="spec-label">{label}</span><span className="spec-value">{value}</span></div>)}</div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container panel">
          <div className="comments-head">
            <h3>Community comments</h3>
            <span>{design.comments.toLocaleString()} comments</span>
          </div>
          <div className="empty"><div><strong>No comments loaded here yet</strong><p>Comment records are counted from the database and can be rendered once moderation rules are enabled.</p></div></div>
        </div>
      </section>
    </main>
  );
}
