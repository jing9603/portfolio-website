import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faLocationDot,
  faWaveSquare
} from "@fortawesome/free-solid-svg-icons";

import { CtaPanel } from "@/components/cta-panel";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutSections,
  heroContent,
  proofStats,
  shortAbout,
  testimonials
} from "@/data/site-content";
import { getFeaturedProjects } from "@/data/portfolio";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-8 lg:px-10 lg:pb-32 lg:pt-14">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-8 pb-6">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {heroContent.eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-[5.25rem]">
              {heroContent.title}
            </h1>
            <div className="max-w-2xl space-y-4 text-lg leading-8 text-ink/72">
              <p>{heroContent.intro}</p>
              <p>{heroContent.supporting}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b3634]"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {proofStats.map((stat) => (
              <div key={stat.value} className="rounded-[24px] border border-line bg-white px-5 py-5 shadow-soft">
                <p className="font-display text-3xl text-ink">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-ink/64">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-frame rounded-[36px] border border-line bg-[#e7dfd0] p-4 shadow-panel">
          <div className="relative aspect-[0.92] overflow-hidden rounded-[30px]">
            <Image
              src="/images/cosy-photo.JPG"
              alt="Jessie Li seated in a calm editorial portrait setting."
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102120] via-[#102120]/55 to-transparent p-6 text-white">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                    Based in Helsinki, working globally
                  </p>
                  <p className="max-w-md text-sm leading-6 text-white/86">
                    Hands-on product leadership across healthcare, digital health,
                    AI-enabled products, and multidisciplinary delivery.
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

      <section className="grid gap-12 py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="About"
          title="A product leader who makes difficult systems easier to move."
          description={shortAbout.summary}
        />
        <div className="space-y-5">
          {shortAbout.highlights.map((item) => (
            <div key={item} className="rounded-[24px] border border-line bg-white px-6 py-5 shadow-soft">
              <p className="text-base leading-7 text-ink/72">{item}</p>
            </div>
          ))}
          <div className="rounded-[24px] border border-dashed border-accent/35 bg-accentSoft px-6 py-5">
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
          eyebrow="Portfolio"
          title="Selected work across product, UX, leadership, and AI."
          description="A portfolio shaped to show both breadth and depth, with projects organized by discipline and written in a consistent long-form format."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-24 lg:grid-cols-[1fr_1fr]">
        <SectionHeading
          eyebrow="Testimonials"
          title="References and collaborator feedback can be added cleanly as the site evolves."
          description="For now, this section holds the space for social proof without inventing it. Formal testimonials can be swapped in later without changing the design."
        />
        <div className="grid gap-5">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[24px] border border-line bg-white p-6 shadow-soft">
              <p className="text-lg leading-8 text-ink/72">"{item.quote}"</p>
              <div className="mt-6">
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-ink/56">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaPanel
        title="Building something meaningful in healthcare, AI, or another complex domain?"
        description="If you are shaping products where clarity, judgment, and collaboration matter, Jessie would be happy to connect and exchange ideas."
        primaryLabel="Start a conversation"
        primaryHref="/contact"
        secondaryLabel="Browse portfolio"
        secondaryHref="/portfolio/pm"
      />
    </div>
  );
}
