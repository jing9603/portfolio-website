"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio/pm", label: "Work" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex flex-col">
          <span className="font-display text-lg font-semibold tracking-[0.03em] text-ink">
            Jessie Li
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-ink/72 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`) || (item.href === "/portfolio/pm" && pathname.startsWith("/portfolio"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition hover:text-ink",
                  isActive ? "font-semibold text-ink" : "text-ink/72"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[#d5c9bc] bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:bg-[#f6f1ea]"
        >
          Get in Touch
          <FontAwesomeIcon icon={faComments} className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
