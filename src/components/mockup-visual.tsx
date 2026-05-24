import type { Design } from "@/src/lib/pulse-data";
import type { CSSProperties } from "react";

export function MockupVisual({ design, className = "" }: { design: Design; className?: string }) {
  return (
    <div
      className={`card-visual ${design.height} ${className}`}
      style={{
        "--visual-bg": design.visual,
        "--garment": design.garment
      } as CSSProperties}
    >
      {design.coverImageUrl ? (
        <img className="mockup-image" src={design.coverImageUrl} alt="" loading="lazy" />
      ) : (
        <div className="mockup">
          <div className={`garment ${design.shape}`}>
            <i className="piece-a" />
            <i className="piece-b" />
            <i className="piece-c" />
            <i className="print-lines" />
          </div>
        </div>
      )}
    </div>
  );
}
