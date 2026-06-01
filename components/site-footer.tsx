import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 lg:grid-cols-[1.3fr_0.8fr] lg:px-10">
        <div className="space-y-5">
          <Link href="/" className="font-display text-2xl font-semibold tracking-[0.02em] text-ink transition hover:text-accent">
            {siteConfig.name}
          </Link>
          <p className="text-sm text-ink/48">© 2026 Jessie Li · All rights reserved</p>
        </div>
        <div className="space-y-4 text-sm text-ink/72">
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-ink">
            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-ink"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-ink"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            GitHub
          </a>
          <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
            {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
