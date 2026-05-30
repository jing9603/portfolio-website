import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { CtaPanel } from "@/components/cta-panel";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutSections,
  heroContent,
  howIWork,
  proofStats,
  shortAbout,
  testimonials
} from "@/data/site-content";

export default async function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative -mt-[60px] flex min-h-screen items-center">
        <Image
          src="/images/cover2.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/20 lg:from-white/92 lg:via-white/55 lg:to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 py-32 lg:px-10">
          <div className="max-w-full space-y-8 lg:max-w-[55%]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {heroContent.eyebrow}
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.96] text-ink sm:text-6xl lg:text-[4.85rem]">
              {heroContent.title}
            </h1>
            <p className="max-w-[34rem] text-[1.04rem] leading-8 text-ink/72">
              {heroContent.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={heroContent.primaryCta.href}
                className="rounded bg-accent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a75f31]"
              >
                {heroContent.primaryCta.label}
              </Link>
              <Link
                href={heroContent.secondaryCta.href}
                className="rounded border border-ink/20 bg-white/70 px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>
            <div className="border-t border-ink/12 pt-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                What I bring
              </p>
              <div className="grid gap-3 text-[0.95rem] leading-7 text-ink/70 sm:grid-cols-3">
                <p>Evidence-led product judgment, not opinion-led product theatre.</p>
                <p>Comfort in regulated and operationally messy environments.</p>
                <p>Clear calls early, before teams lose time on the wrong thing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <div className="border-y border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-10 lg:px-10">
          <div className="flex divide-x divide-line">
            {proofStats.map((stat) => (
              <div key={stat.value} className="flex-1 px-8 first:pl-0 last:pr-0">
                <p className="font-display text-[2rem] font-semibold text-ink">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-ink/56">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body content ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-10 lg:pb-32">

        {/* How I work */}
        <section className="py-24">
          <SectionHeading
            eyebrow="How I work"
            title="Three principles that keep the work honest."
            description="The through-line in my product work is simple: get to the real problem, reduce ambiguity with evidence, and make clear calls before drift gets expensive."
          />
          <div className="mt-10 divide-y divide-line">
            {howIWork.map((principle, index) => (
              <div key={principle} className="flex items-start gap-10 py-8">
                <span className="shrink-0 pt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  0{index + 1}
                </span>
                <p className="text-[1.05rem] leading-8 text-ink/78">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="space-y-10 border-t border-line py-24">
          <SectionHeading
            eyebrow="About"
            title="A product leader who makes difficult systems easier to move."
          />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-[1.02rem] leading-8 text-ink/74">
                {aboutSections.philosophy[0]}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
              >
                Read the full story
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-6">
              {shortAbout.highlights.map((item) => (
                <div key={item} className="border-l-2 border-accent pl-5">
                  <p className="text-[0.98rem] leading-7 text-ink/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="py-1">
            <iframe
              src="/about-image.html"
              title="Jessie Li global collaboration map"
              className="min-h-[720px] w-full border-0"
              loading="lazy"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-10 border-t border-line py-24">
          <SectionHeading eyebrow="Testimonials" title="What collaborators say" />
          <div className="divide-y divide-line">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="py-10 first:pt-0">
                <p className="max-w-3xl text-[1.1rem] italic leading-[1.85] text-ink/72">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-5 text-sm font-semibold text-ink">
                  {item.name}{" "}
                  <span className="font-normal text-ink/56">— {item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <CtaPanel
          title="Working on something complex?"
          description="If you're building in regulated healthcare, AI, or any domain where good judgment actually moves the needle — I'd like to hear about it."
          primaryLabel="Get in touch"
          primaryHref="/contact"
          secondaryLabel="See my work"
          secondaryHref="/portfolio/all"
        />
      </div>
    </div>
  );
}
