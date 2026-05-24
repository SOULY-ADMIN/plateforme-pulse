"use client";

import { Bookmark, Heart } from "lucide-react";
import { useState } from "react";

function compact(value: number) {
  return Intl.NumberFormat("en", { notation: value > 9999 ? "compact" : "standard" }).format(value);
}

async function postAction(slug: string, action: "like" | "save") {
  const response = await fetch(`/api/designs/${slug}/${action}`, { method: "POST" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Action unavailable");
  }
  return payload;
}

export function DesignActions({
  comments,
  initialLikes,
  initialSaves,
  slug
}: {
  comments: number;
  initialLikes: number;
  initialSaves: number;
  slug: string;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [saves, setSaves] = useState(initialSaves);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState<"like" | "save" | null>(null);
  const [message, setMessage] = useState("");

  async function toggle(action: "like" | "save") {
    setBusy(action);
    setMessage("");
    try {
      const result = await postAction(slug, action);
      if (action === "like") {
        setLiked(Boolean(result.liked));
        if (typeof result.count === "number") setLikes(result.count);
      } else {
        setSaved(Boolean(result.saved));
        if (typeof result.count === "number") setSaves(result.count);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Action unavailable");
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <div className="quick-actions">
        <button
          aria-pressed={liked}
          className={`icon-btn ${liked ? "liked" : ""}`}
          disabled={busy === "like"}
          onClick={() => toggle("like")}
          title="Like design"
          type="button"
        >
          <Heart size={18} />
        </button>
        <button
          aria-pressed={saved}
          className={`icon-btn ${saved ? "saved" : ""}`}
          disabled={busy === "save"}
          onClick={() => toggle("save")}
          title="Save design"
          type="button"
        >
          <Bookmark size={18} />
        </button>
      </div>
      <div className="card-signal-row">
        <button
          aria-pressed={liked}
          className={`like-cta ${liked ? "liked" : ""}`}
          disabled={busy === "like"}
          onClick={() => toggle("like")}
          title="Like design"
          type="button"
        >
          <Heart size={16} />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
        <span className="vote-count">{compact(likes)} votes</span>
        <button
          aria-pressed={saved}
          className={`save-cta ${saved ? "saved" : ""}`}
          disabled={busy === "save"}
          onClick={() => toggle("save")}
          title="Save design"
          type="button"
        >
          <Bookmark size={14} />
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
      </div>
      <div className="card-meta">
        <span className="metric-pill">{compact(comments)} comments</span>
        <span className="metric-pill">{compact(saves)} saves</span>
        {message ? <span className="metric-pill action-message">{message}</span> : null}
      </div>
    </>
  );
}
