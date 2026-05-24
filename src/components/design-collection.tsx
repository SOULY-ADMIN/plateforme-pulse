import { DesignCard } from "./design-card";
import type { Design } from "@/src/lib/pulse-data";

export function DesignCollection({
  designs,
  empty,
  kicker,
  title
}: {
  designs: Design[];
  empty: string;
  kicker: string;
  title: string;
}) {
  return (
    <section className="section">
      <div className="wide-container">
        <div className="section-head">
          <div>
            <span className="section-kicker">{kicker}</span>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        {designs.length ? (
          <div className="masonry">{designs.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
        ) : (
          <div className="empty"><div><strong>{empty}</strong><p>Start exploring the community feed to build this archive.</p></div></div>
        )}
      </div>
    </section>
  );
}

