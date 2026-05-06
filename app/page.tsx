import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faArrowTrendUp,
  faMicrochip,
  faLocationDot,
  faQuoteLeft,
  faWaveSquare
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
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-8 pb-6">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {heroContent.eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-[5.15rem]">
              {heroContent.title}
            </h1>
            <div className="max-w-2xl space-y-4 text-lg leading-8 text-ink/72">
              <p>{heroContent.intro}</p>
              {heroContent.supporting ? <p>{heroContent.supporting}</p> : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a75f31]"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-[#d4c8ba] bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {proofStats.map((stat) => (
              <div key={stat.value} className="rounded-[24px] border border-[#d3c8bc] bg-white px-5 py-5 shadow-soft">
                <p className="font-display text-3xl font-semibold text-ink">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-ink/64">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-frame rounded-[36px] border border-[#d4c9bc] p-4 shadow-panel">
          <div className="relative aspect-[0.92] overflow-hidden rounded-[30px]">
            <Image
              src="/images/cosy-photo.JPG"
              alt="Jessie Li seated in a calm editorial portrait setting."
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(23,20,18,0.08)_35%,rgba(23,20,18,0.84)_100%)] p-6 text-white">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                    Based in Helsinki, working globally
                  </p>
                  <p className="max-w-md text-sm leading-6 text-white/86">
                    Product management across regulated healthcare SaaS, AI-powered
                    products, and evidence-led delivery.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/86">
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5" />
                    Helsinki, Finland
                  </p>
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faWaveSquare} className="h-3.5 w-3.5" />
                    Healthcare systems, AI, and complex workflows
                  </p>
                </div>
              </div>
            </div>
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                0{index + 1}
              </p>
              <p className="mt-4 text-lg leading-8 text-ink/78">{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 py-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="About"
          title="A product leader who makes difficult systems easier to move."
          description={shortAbout.summary}
        />
        <div className="space-y-5">
          {shortAbout.highlights.map((item) => (
            <div key={item} className="rounded-[24px] border border-[#d4c8bb] bg-white px-6 py-5 shadow-soft">
              <p className="text-base leading-7 text-ink/72">{item}</p>
            </div>
          ))}
          <div className="rounded-[24px] border border-[#dccfbe] bg-[#f4eee4] px-6 py-5">
            <p className="text-sm uppercase tracking-[0.22em] text-accent">Current focus</p>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink/74">
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
        </div>
      </section>

      <section className="space-y-10 py-6">
        <SectionHeading
          eyebrow="Work"
          title="Selected work"
          description="Two tracks — strategic product work and things I've built. Both matter."
        />
        <div className="grid gap-14">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d5c9bc] bg-white text-accent">
                <FontAwesomeIcon icon={faArrowTrendUp} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  As a PM
                </p>
                <p className="text-sm text-ink/64">
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

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d5c9bc] bg-white text-accent">
                <FontAwesomeIcon icon={faMicrochip} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  As a Builder
                </p>
                <p className="text-sm text-ink/64">
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

      <section className="grid gap-8 py-24 lg:grid-cols-[1fr_1fr]">
        <SectionHeading
          eyebrow="Testimonials"
          title="What collaborators say"
        />
        <div className="grid gap-5">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[24px] border border-[#d4c8bb] bg-white p-6 shadow-soft">
              <div className="flex items-center gap-2 text-accent">
                <FontAwesomeIcon icon={faQuoteLeft} className="h-4 w-4" />
              </div>
              <p className="mt-4 text-lg leading-8 text-ink/72">"{item.quote}"</p>
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
        secondaryHref="/portfolio/pm"
      />
    </div>
  );
}
