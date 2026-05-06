import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio/pm", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex flex-col">
          <span className="font-display text-lg font-semibold tracking-[0.03em] text-ink">
            Jessie Li
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-ink/72 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[#d5c9bc] bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:bg-[#f6f1ea]"
        >
          Get in Touch
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
