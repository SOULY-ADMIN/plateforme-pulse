import { MockupVisual } from "@/src/components/mockup-visual";
import { ShareButton } from "@/src/components/share-button";
import { findDesignBySlug } from "@/src/lib/db/designs";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

export async function generateStaticParams() {
  return [];
}

export default async function DesignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const design = await findDesignBySlug(slug);
  if (!design) notFound();
  const specs = [
    ["Title", design.title],
    ["Creator", `@${design.creator}`],
    ["Inspiration", design.inspiration],
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
  ];
  return (
    <main>
      <section className="detail-hero">
        <div className="wide-container detail-layout">
          <div className="gallery"><MockupVisual design={design} /><div className="gallery-stack"><MockupVisual design={design} /><MockupVisual design={design} /><MockupVisual design={design} /></div></div>
          <aside className="panel">
            <span className="eyebrow">{design.category} concept</span>
            <h1 className="detail-title">{design.title}</h1>
            <p className="muted">{design.description}</p>
            <div className="approval"><strong>{design.likes.toLocaleString()} community votes</strong><div className="progress" style={{ "--value": `${Math.min(100, design.likes)}%` } as CSSProperties}><span /></div></div>
            <div className="hero-actions"><a className="primary-btn" href={`/community`}>Back to community</a><ShareButton title={design.title} /></div>
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
