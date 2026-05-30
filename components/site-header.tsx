"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio/all", label: "Work" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex flex-col">
          <span className="font-display text-[1.1rem] font-semibold tracking-[0.03em] text-ink">
            Jessie Li
          </span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-lg border border-line bg-white p-1.5 shadow-soft lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`) ||
                  (item.href === "/portfolio/all" && pathname.startsWith("/portfolio"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded px-4 py-2 text-sm transition",
                  isActive
                    ? "bg-mist font-semibold text-ink"
                    : "text-ink/60 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-soft transition hover:border-accent"
        >
          Get in Touch
          <FontAwesomeIcon icon={faComments} className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
