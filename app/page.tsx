"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { CtaPanel } from "@/components/cta-panel";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutSections,
  featuredWork,
  heroContent,
  howIWork,
  proofStats,
  testimonials
} from "@/data/site-content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.42, ease: "easeOut" as const, delay }
});

export default function HomePage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative -mt-[60px] min-h-screen">
        <Image
          src="/images/cover.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-32 lg:px-10">
            <div className="overflow-hidden space-y-8 lg:max-w-[55%]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                {heroContent.eyebrow}
              </p>
              <h1 className="break-words font-display text-[2.65rem] font-semibold leading-[1.0] text-ink sm:text-5xl sm:leading-[0.96] lg:text-[4.85rem]">
                {heroContent.title}
              </h1>
              <p className="text-[0.97rem] leading-7 text-ink/72 sm:max-w-[34rem] sm:text-[1.04rem] sm:leading-8">
                {heroContent.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={heroContent.primaryCta.href}
                  className="rounded bg-accent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9a4d1c]"
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <div className="border-y border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10">
          <div className="grid grid-cols-3 divide-x divide-line">
            {proofStats.map((stat, i) => {
              const spaceIdx = stat.value.search(/\s/);
              const num  = spaceIdx > -1 ? stat.value.slice(0, spaceIdx) : stat.value;
              const unit = spaceIdx > -1 ? stat.value.slice(spaceIdx + 1) : "";
              return (
                <motion.div key={stat.value} className="px-3 first:pl-0 last:pr-0 sm:px-6 lg:px-8" {...fadeUp(i * 0.07)}>
                  <p className="font-display text-[1.9rem] font-semibold leading-none text-ink sm:text-[3rem] lg:text-[4rem]">
                    {num}
                  </p>
                  {unit && (
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40 sm:mt-1.5 sm:text-[11px] sm:tracking-[0.2em]">
                      {unit}
                    </p>
                  )}
                  <p className="mt-2 text-xs leading-5 text-ink/50 sm:mt-3 sm:text-sm sm:leading-6">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-10 lg:pb-32">

        {/* ── How I work ────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="How I work"
            title="Three principles that keep the work honest."
          />
          <div className="mt-8 divide-y divide-line lg:mt-10">
            {howIWork.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="grid gap-4 py-8 lg:grid-cols-[180px_1fr] lg:items-start lg:gap-16 lg:py-12"
                {...fadeUp(index * 0.08)}
              >
                <p className="pt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="font-display text-[1.75rem] leading-[1.1] text-ink lg:text-[2.6rem]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-ink/60">{principle.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────────── */}
        <section className="border-t border-line py-24">
          <motion.div {...fadeUp()}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              About
            </p>
            <p className="mt-6 max-w-2xl text-[1.15rem] leading-[1.85] text-ink/82 lg:text-[1.22rem]">
              {aboutSections.philosophy[0]}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
            >
              Read the full story
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
            </Link>
          </motion.div>
        </section>

        {/* ── Selected work ─────────────────────────────────────────── */}
        <section className="border-t border-line py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Selected work
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {featuredWork.map((project, i) => (
              <motion.div key={project.slug} {...fadeUp(i * 0.08)}>
                <ProjectCard
                  project={{
                    id: project.slug,
                    notionUrl: "",
                    slug: project.slug,
                    title: project.title,
                    coverImage: project.coverImage,
                    category: project.category,
                    type: "Project",
                    organization: "",
                    timespan: "",
                    teamSize: "",
                    description: project.description,
                    impact: "",
                    skills: [],
                    tools: [],
                    featured: true,
                    heroLabel: "",
                    sections: []
                  }}
                />
              </motion.div>
            ))}
          </div>
          <Link
            href="/portfolio/all"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
          >
            See all work
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
          </Link>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────── */}
        <section className="py-24">
          <SectionHeading eyebrow="Testimonials" title="What collaborators say" />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.blockquote key={item.name} {...fadeUp(i * 0.1)}>
                <p className="font-display text-[4.5rem] leading-none text-accent/22 select-none">
                  &ldquo;
                </p>
                <p className="mt-1 text-[1.04rem] italic leading-8 text-ink/75">
                  {item.quote}
                </p>
                <footer className="mt-5 text-sm font-semibold text-ink">
                  {item.name}{" "}
                  <span className="font-normal text-ink/50">— {item.role}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        <CtaPanel />
      </div>
    </div>
  );
}
