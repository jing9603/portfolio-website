"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio/all", label: "Projects" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current < 10 || current < lastScrollY.current);
      setScrolled(current > 10);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? "border-line bg-white/95 shadow-soft backdrop-blur-sm"
          : "border-transparent bg-transparent"
      )}
    >
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
          className="rounded border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-soft transition hover:border-accent"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
