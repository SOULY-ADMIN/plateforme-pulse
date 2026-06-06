"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "pulse_intro_seen";

export function PulseIntro() {
  const [stage, setStage] = useState<"visible" | "exiting" | "done">("visible");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
        setStage("done");
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // If storage is unavailable, still keep the intro short and non-blocking.
    }

    setStage("visible");

    const exitDelay = prefersReducedMotion ? 420 : 1450;
    const doneDelay = prefersReducedMotion ? 720 : 2050;
    const exitTimer = window.setTimeout(() => setStage("exiting"), exitDelay);
    const doneTimer = window.setTimeout(() => setStage("done"), doneDelay);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div className={`pulse-loader pulse-intro ${stage === "exiting" ? "pulse-intro-exit" : ""}`} aria-hidden="true">
      <div className="pulse-intro-light" />
      <div className="pulse-intro-stack">
        <span className="loader-index">COMMUNITY ATELIER / 001</span>
        <div className="loader-word pulse-intro-logo" data-text="PULSE">PULSE</div>
        <div className="loader-line pulse-intro-line"><span /></div>
        <span className="loader-caption">FUTURE STREETWEAR SIGNAL</span>
      </div>
    </div>
  );
}
