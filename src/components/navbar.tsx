"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, Bookmark, Heart, Search, Upload } from "lucide-react";
import clsx from "clsx";
import { pulseUserButtonAppearance } from "@/src/lib/clerk-appearance";
import { LanguageSwitcher } from "./language-switcher";

const links = [
  ["/", "Home"],
  ["/community", "Community"],
  ["/submit-design", "Submit Design"],
  ["/drops", "Drops"],
  ["/shop", "Shop"]
] as const;

export function Navbar({ authEnabled = true }: { authEnabled?: boolean }) {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" />
          <span>PULSE</span>
        </Link>
        <LanguageSwitcher />
        <nav className="nav-links" aria-label="Primary">
          {links.map(([href, label]) => (
            <Link
              key={href}
              className={clsx("nav-link", pathname === href && "active")}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          {authEnabled ? (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="ghost-btn" type="button">
                    <span>Login</span>
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="primary-btn" type="button">
                    <span>Join PULSE</span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link className="icon-btn nav-icon-only notification-dot" href="/notifications" title="Notifications">
                  <Bell size={18} />
                </Link>
                <Link className="icon-btn nav-icon-only" href="/liked" title="Liked posts">
                  <Heart size={18} />
                </Link>
                <Link className="icon-btn nav-icon-only" href="/saved" title="Saved designs">
                  <Bookmark size={18} />
                </Link>
                <Link className="ghost-btn" href="/creator-dashboard">
                  <BarChart3 size={18} />
                  <span>Studio</span>
                </Link>
                <Link className="primary-btn" href="/submit-design">
                  <Upload size={18} />
                  <span>Submit</span>
                </Link>
                <UserButton
                  appearance={pulseUserButtonAppearance}
                  showName={false}
                  userProfileUrl="/account"
                />
              </SignedIn>
            </>
          ) : (
            <>
              <Link className="ghost-btn" href="/sign-in">
                <span>Login</span>
              </Link>
              <Link className="primary-btn" href="/sign-up">
                <span>Join PULSE</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="mobile-nav" aria-label="Mobile">
        <Link className={clsx(pathname === "/" && "active")} href="/">P</Link>
        <Link className={clsx(pathname === "/community" && "active")} href="/community"><Search size={18} /></Link>
        <Link className={clsx(pathname === "/explore" && "active")} href="/explore">AI</Link>
        <Link className={clsx(pathname === "/saved" && "active")} href="/saved"><Bookmark size={18} /></Link>
        <Link className={clsx(pathname === "/submit-design" && "active")} href="/submit-design"><Upload size={18} /></Link>
      </nav>
    </header>
  );
}
