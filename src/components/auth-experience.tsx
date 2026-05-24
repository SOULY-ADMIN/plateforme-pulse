import type { ReactNode } from "react";

export function AuthExperience({
  children,
  eyebrow,
  title
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <main className="auth-stage">
      <div className="auth-light-field" aria-hidden="true">
        <span />
        <span />
      </div>
      <section className="auth-layout">
        <div className="auth-editorial">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="auth-title">{title}</h1>
          <p className="hero-copy">
            Your identity is your studio pass. Save references, vote on concepts, follow creators and build a public design signal.
          </p>
          <div className="auth-proof-grid">
            <div><strong>01</strong><span>Creator profile</span></div>
            <div><strong>02</strong><span>Saved design archive</span></div>
            <div><strong>03</strong><span>Voting and drops</span></div>
          </div>
        </div>
        <div className="auth-panel">{children}</div>
      </section>
    </main>
  );
}

export function AuthPlaceholder({ label }: { label: string }) {
  return (
    <div className="form-card">
      <span className="section-kicker">Configuration required</span>
      <h2 className="creator-name">{label}</h2>
      <p className="muted">
        Add real Clerk keys in <code>.env.local</code>, then restart the dev server to enable authentication.
      </p>
    </div>
  );
}
