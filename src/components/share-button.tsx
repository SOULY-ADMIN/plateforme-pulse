"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setStatus("Shared");
      } else {
        await navigator.clipboard.writeText(url);
        setStatus("Link copied");
      }
    } catch {
      setStatus("Share cancelled");
    }
  }

  return (
    <span className="share-action">
      <button className="ghost-btn" onClick={share} type="button">Share</button>
      {status ? <small className="muted">{status}</small> : null}
    </span>
  );
}
