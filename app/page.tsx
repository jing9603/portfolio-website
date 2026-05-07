import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faArrowTrendUp,
  faMicrochip,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

import { CtaPanel } from "@/components/cta-panel";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutSections,
  heroContent,
  howIWork,
  proofStats,
  shortAbout,
  testimonials
} from "@/data/site-content";
import { getAllProjects } from "@/data/portfolio";

export default async function HomePage() {
  const allProjects = await getAllProjects();
  const pmProjects = allProjects
    .filter((project) => project.category === "pm")
    .slice(0, 3);
  const builderProjects = allProjects
    .filter((project) => project.category === "ai-data")
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-8 lg:px-10 lg:pb-32 lg:pt-14">
      <section className="grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
        <div className="space-y-9 pt-3">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {heroContent.eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] text-ink sm:text-6xl lg:text-[5.25rem]">
              {heroContent.title}
            </h1>
            <div className="max-w-[36rem] space-y-4 text-[1.08rem] leading-8 text-ink/72">
              <p>{heroContent.intro}</p>
              {heroContent.supporting ? <p>{heroContent.supporting}</p> : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a75f31]"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-[#d4c8ba] bg-white px-5 py-3.5 text-sm font-semibold text-ink shadow-soft transition hover:border-accent"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
          <div className="rounded-[26px] border border-line bg-[#f4eee6] px-6 py-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              What I bring
            </p>
            <p className="mt-3 max-w-xl text-[1rem] leading-8 text-ink/70">
              Product judgment grounded in evidence, comfort in regulated complexity, and the
              willingness to make hard calls before teams spend time on the wrong thing.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="hero-frame rounded-[36px] border border-[#d4c9bc] p-4 shadow-panel">
            <div className="relative aspect-[0.9] overflow-hidden rounded-[30px]">
              <Image
                src="/images/professional-brown-studio.png"
                alt="Jessie Li studio portrait."
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {proofStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-[24px] border border-[#d3c8bc] bg-white px-5 py-5 shadow-soft"
              >
                <p className="font-display text-3xl font-semibold text-ink">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-ink/64">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-24 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <SectionHeading
          eyebrow="How I work"
          title="Three principles that keep the work honest."
          description="The through-line in my product work is simple: get to the real problem, reduce ambiguity with evidence, and make clear calls before drift gets expensive."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {howIWork.map((principle, index) => (
            <article
              key={principle}
              className="rounded-[24px] border border-[#d4c8bb] bg-white px-6 py-6 shadow-soft"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                0{index + 1}
              </p>
              <p className="mt-4 text-[1.06rem] leading-8 text-ink/78">{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8 py-8">
        <SectionHeading
          eyebrow="About"
          title="A product leader who makes difficult systems easier to move."
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div className="rounded-[24px] border border-[#dccfbe] bg-[#f4eee4] px-6 py-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.22em] text-accent">Current focus</p>
            <p className="mt-3 max-w-xl text-[1rem] leading-8 text-ink/74">
              {aboutSections.philosophy[0]}
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              Read the full story
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
            </Link>
          </div>
          {shortAbout.highlights.map((item) => (
            <div key={item} className="rounded-[24px] border border-[#d4c8bb] bg-white px-6 py-5 shadow-soft">
              <p className="text-[1rem] leading-8 text-ink/72">{item}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/40 py-3">
          <iframe
            src="/about-image.html"
            title="Jessie Li global collaboration map"
            className="min-h-[780px] w-full border-0"
            loading="lazy"
          />
        </div>
      </section>

      <section className="space-y-10 py-10">
        <SectionHeading
          eyebrow="Work"
          title="Selected work"
          description="Two tracks — strategic product work and things I've built. Both matter."
        />
        <div className="grid gap-14">
          <div className="space-y-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d5c9bc] bg-white text-accent shadow-soft">
                <FontAwesomeIcon icon={faArrowTrendUp} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  As a PM
                </p>
                <p className="mt-1 text-[1rem] leading-7 text-ink/64">
                  Product strategy, prioritization, and shipping in regulated environments.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {pmProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>

          <div className="space-y-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d5c9bc] bg-white text-accent shadow-soft">
                <FontAwesomeIcon icon={faMicrochip} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  As a Builder
                </p>
                <p className="mt-1 text-[1rem] leading-7 text-ink/64">
                  AI and data projects where I moved from idea to working product.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {builderProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10 py-24">
        <SectionHeading eyebrow="Testimonials" title="What collaborators say" />
        <div className="grid gap-5 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[24px] border border-[#d4c8bb] bg-white p-6 shadow-soft">
              <div className="flex items-center gap-2 text-accent">
                <FontAwesomeIcon icon={faQuoteLeft} className="h-4 w-4" />
              </div>
              <p className="mt-4 text-[1.02rem] leading-8 text-ink/72">"{item.quote}"</p>
              <div className="mt-6">
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-ink/56">{item.role}</p>
              </div>
            </article>
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
  );
}
