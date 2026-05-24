import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="auth-stage">
      <div className="auth-light-field" aria-hidden="true"><span /><span /></div>
      <div className="auth-layout">
        <div className="auth-editorial">
          <span className="eyebrow">Alpha onboarding</span>
          <h1 className="auth-title">Build your creator signal</h1>
          <p className="hero-copy">Claim your identity, select taste lanes, save references and submit your first concept.</p>
        </div>
        <div className="auth-panel">
          <div className="form-card">
            <div className="submit-steps">
              <span className="active">01 Identity</span>
              <span>02 Categories</span>
              <span>03 Notifications</span>
              <span>04 Submit</span>
            </div>
            <input className="field" placeholder="Creator username" />
            <select className="select" style={{ marginTop: 12 }}><option>Technical fleece</option><option>Future sport</option></select>
            <Link className="primary-btn" href="/submit-design" style={{ marginTop: 12 }}>Complete onboarding</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
