import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[980px] px-6 pb-24 pt-14 lg:px-10 lg:pb-32">
      <div className="rounded-[36px] border border-line bg-white p-8 shadow-panel lg:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">Contact</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-ink lg:text-6xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
          I&apos;m currently open to Product Manager and Product Lead roles in
          regulated, AI-enabled, or complex B2B environments. I&apos;m also happy
          to connect if you&apos;re working on something interesting in healthcare
          or AI.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-[24px] border border-line bg-[#f4efe4] p-6 transition hover:border-ink"
          >
            <div className="flex items-center gap-3 text-ink">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                Email
              </span>
            </div>
            <p className="mt-4 text-lg text-ink/74">{siteConfig.email}</p>
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-[24px] border border-line bg-[#f4efe4] p-6 transition hover:border-ink"
          >
            <div className="flex items-center gap-3 text-ink">
              <FontAwesomeIcon icon={faLinkedinIn} className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                LinkedIn
              </span>
            </div>
            <p className="mt-4 text-lg text-ink/74">linkedin.com/in/jessie-jing-li</p>
          </a>
        </div>
      </div>
    </div>
  );
}
