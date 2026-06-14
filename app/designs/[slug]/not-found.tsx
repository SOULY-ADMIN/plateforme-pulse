import Link from "next/link";

export default function DesignNotFound() {
  return (
    <main className="section-tight">
      <div className="container panel">
        <span className="section-kicker">Design unavailable</span>
        <h1 className="section-title">Project not found</h1>
        <p className="section-copy">This concept does not exist or is no longer visible in the PULSE community.</p>
        <Link className="primary-btn" href="/community">Back to community</Link>
      </div>
    </main>
  );
}
