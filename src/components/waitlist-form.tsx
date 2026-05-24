"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function WaitlistForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          inviteCode: data.get("inviteCode"),
          reason: data.get("reason")
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Waitlist is unavailable.");
      setStatus(`Queue position #${result.queuePosition}. Status: ${result.status}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Waitlist is unavailable.");
    }
  }

  return (
    <form className="form-card waitlist-form" onSubmit={submit}>
      <h3>Request alpha access</h3>
      <input className="field" name="email" type="email" placeholder="email@studio.com" required />
      <input className="field" name="inviteCode" placeholder="Invite code" style={{ marginTop: 12 }} />
      <textarea className="textarea" name="reason" placeholder="Why should PULSE invite you?" style={{ marginTop: 12 }} />
      <button className="primary-btn" type="submit" style={{ marginTop: 12 }}>Join waitlist</button>
      {status ? <p className="muted">{status}</p> : <p className="muted">Invite codes unlock priority review.</p>}
    </form>
  );
}
