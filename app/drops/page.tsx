import { listDrops } from "@/src/lib/db/designs";

export default async function DropsPage() {
  const drops = await listDrops();
  return (
    <main className="section-tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Drops</span>
            <h1 className="section-title">Community winners become real product</h1>
          </div>
        </div>
        <div className="drop-grid">
          {drops.length ? (
            drops.map((drop) => (
              <article className="drop-card" key={drop.dropNumber}>
                <span className="status-pill">{drop.status}</span>
                <h2 className="section-title" style={{ fontSize: 30 }}>DROP #{drop.dropNumber.toString().padStart(3, "0")}<br />{drop.title}</h2>
                <p className="muted">{drop.description}</p>
                <span className="status-pill">{drop.selectedDesigns} selected designs</span>
              </article>
            ))
          ) : (
            <div className="empty"><div><strong>No drops scheduled yet</strong><p>Approved community concepts will appear here after a drop is created in the database.</p></div></div>
          )}
        </div>
      </div>
    </main>
  );
}
