import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-[#f4f0e8]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 lg:grid-cols-[1.3fr_0.8fr] lg:px-10">
        <div className="space-y-4">
          <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
          <p className="max-w-xl text-sm leading-7 text-ink/72">
            Hands-on product leadership for digital health, AI-enabled products,
            and complex systems that need both strategy and execution.
          </p>
        </div>
        <div className="space-y-3 text-sm text-ink/72">
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
          <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
            {siteConfig.location}
          </p>
          <Link href="/portfolio/pm" className="inline-block pt-2 hover:text-ink">
            Explore selected work
          </Link>
        </div>
      </div>
    </footer>
  );
}
