"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminDeleteDesignButton({
  redirectTo,
  slug,
  title
}: {
  redirectTo?: string;
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function deleteDesign() {
    const confirmed = window.confirm(`Supprimer le design "${title}" ? Cette action le retire des pages publiques.`);
    if (!confirmed) return;

    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/designs/${slug}`, { method: "DELETE" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Suppression impossible");

      setMessage("Design supprime");
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Suppression impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="admin-delete-control">
      <button className="admin-delete-btn" disabled={busy} onClick={deleteDesign} type="button">
        <Trash2 size={15} />
        <span>{busy ? "Suppression..." : "Supprimer"}</span>
      </button>
      {message ? <small>{message}</small> : null}
    </span>
  );
}
