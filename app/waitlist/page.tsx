import { WaitlistForm } from "@/src/components/waitlist-form";

export default function WaitlistPage() {
  return (
    <main className="auth-stage">
      <div className="auth-light-field" aria-hidden="true"><span /><span /></div>
      <div className="auth-layout">
        <div className="auth-editorial">
          <span className="eyebrow">Invite-only alpha</span>
          <h1 className="auth-title">Join the PULSE queue</h1>
          <p className="hero-copy">Controlled access for creators, voters, moderators and early collectors.</p>
          <div className="auth-proof-grid">
            <div><strong>01</strong><span>Request access</span></div>
            <div><strong>02</strong><span>Review profile</span></div>
            <div><strong>03</strong><span>Activate studio</span></div>
          </div>
        </div>
        <div className="auth-panel"><WaitlistForm /></div>
      </div>
    </main>
  );
}
