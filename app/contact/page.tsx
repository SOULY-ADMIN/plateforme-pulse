"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Message captured locally. Connect a contact endpoint before launch.");
  }

  return (
    <main className="section-tight">
      <div className="container split">
        <div>
          <span className="eyebrow">Contact PULSE</span>
          <h1 className="detail-title">Build the future studio with us</h1>
          <p className="hero-copy">Creator partnerships, manufacturing, retail collaborations and investment conversations.</p>
        </div>
        <form className="form-card" onSubmit={submit}>
          <input className="field" placeholder="Name" required />
          <input className="field" placeholder="Email" required style={{ marginTop: 12 }} type="email" />
          <textarea className="textarea" placeholder="Message" required style={{ marginTop: 12 }} />
          <button className="primary-btn" style={{ marginTop: 12 }} type="submit">Send message</button>
          {status ? <p className="muted form-status">{status}</p> : null}
        </form>
      </div>
    </main>
  );
}
