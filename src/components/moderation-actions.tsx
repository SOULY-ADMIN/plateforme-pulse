"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ModerationActions({ slug }: { slug: string }) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function moderate(action: "APPROVED" | "REJECTED") {
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch(`/api/admin/designs/${slug}/moderate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Moderation failed");
      setStatus(action === "APPROVED" ? "Approved" : "Rejected");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Moderation failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="moderation-actions">
      <button className="mini-btn" disabled={busy} onClick={() => moderate("APPROVED")} type="button">Approve</button>
      <button className="mini-btn" disabled={busy} onClick={() => moderate("REJECTED")} type="button">Reject</button>
      {status ? <small className="muted">{status}</small> : null}
    </span>
  );
}
