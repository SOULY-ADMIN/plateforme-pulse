import { DesignCard } from "@/src/components/design-card";
import { listApprovedDesigns } from "@/src/lib/db/designs";

export default async function ShopPage() {
  const designs = await listApprovedDesigns();
  return (
    <main className="section-tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Shop</span>
            <h1 className="section-title">Approved concepts only</h1>
          </div>
          <p className="section-copy">This commerce section should stay selective so the platform never feels like a generic storefront.</p>
        </div>
        {designs.length ? (
          <div className="product-grid">{designs.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
        ) : (
          <div className="empty"><div><strong>No approved products yet</strong><p>Only approved community designs become shop products.</p></div></div>
        )}
      </div>
    </main>
  );
}
