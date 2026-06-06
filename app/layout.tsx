import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/src/components/navbar";
import { LanguageProvider } from "@/src/components/language-provider";
import { PulseIntro } from "@/src/components/pulse-intro";
import { pulseClerkAppearance } from "@/src/lib/clerk-appearance";
import { isClerkConfigured } from "@/src/lib/auth-runtime";
import "./globals.css";

export const metadata: Metadata = {
  title: "PULSE - Community Streetwear Futures",
  description: "A futuristic community-driven streetwear platform for submitted concepts, voting and drops."
};

const introSessionScript = `
try {
  if (window.sessionStorage.getItem("pulse_intro_seen") === "1") {
    document.documentElement.classList.add("pulse-intro-seen");
  }
} catch (error) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkEnabled = isClerkConfigured();
  const appChrome = (
    <>
      <PulseIntro />
      <div className="noise" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <Navbar authEnabled={clerkEnabled} />
      {children}
    </>
  );

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: introSessionScript }} />
        {clerkEnabled ? (
          <ClerkProvider appearance={pulseClerkAppearance}><LanguageProvider>{appChrome}</LanguageProvider></ClerkProvider>
        ) : <LanguageProvider>{appChrome}</LanguageProvider>}
      </body>
    </html>
  );
}
