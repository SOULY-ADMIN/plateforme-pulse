"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminDeleteDesignButton({
  label = "Supprimer",
  redirectTo,
  slug,
  title
}: {
  label?: string;
  redirectTo?: string;
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function deleteDesign() {
    const confirmed = window.confirm(`Masquer le design "${title}" ? Cette action le retire des pages publiques.`);
    if (!confirmed) return;

    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/designs/${slug}`, { method: "DELETE" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Action admin impossible");

      setMessage("Design masque");
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Action admin impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="admin-delete-control">
      <button className="admin-delete-btn" disabled={busy} onClick={deleteDesign} type="button">
        <Trash2 size={15} />
        <span>{busy ? "Masquage..." : label}</span>
      </button>
      {message ? <small>{message}</small> : null}
    </span>
  );
}
