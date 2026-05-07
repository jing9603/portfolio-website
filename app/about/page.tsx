import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import {
  aboutSections,
  experienceTimeline,
  leadershipActivities
} from "@/data/site-content";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-10 lg:px-10 lg:pb-32 lg:pt-16">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-8 pt-2">
          <SectionHeading
            eyebrow="About Me"
            title="I make complex products easier to move."
            description={aboutSections.philosophy[0]}
          />
          <div className="max-w-[38rem] space-y-4 text-[1.02rem] leading-8 text-ink/72">
            {aboutSections.philosophy.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden rounded-[30px] border border-line bg-white shadow-panel sm:col-span-2">
            <Image
              src="/images/indoor-square.JPG"
              alt="Jessie Li portrait indoors."
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="rounded-[28px] border border-line bg-white p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Interests</p>
            <ul className="mt-4 space-y-3 text-[0.98rem] leading-7 text-ink/68">
              {aboutSections.interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-line bg-[#f4eee4] p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Qualifications</p>
            <ul className="mt-4 space-y-3 text-[0.98rem] leading-7 text-ink/68">
              {aboutSections.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="mt-12 space-y-5">
          {experienceTimeline.map((item) => (
            <article
              key={`${item.period}-${item.title}`}
              className="grid gap-5 rounded-[28px] border border-line bg-white p-6 shadow-soft lg:grid-cols-[210px_1fr]"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
                  {item.period}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl text-ink">
                  {item.title} <span className="text-ink/48">@ {item.company}</span>
                </h3>
                <p className="max-w-3xl text-[1rem] leading-8 text-ink/72">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[30px] border border-line bg-white p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Leadership & activity</p>
          <div className="mt-6 space-y-6">
            {leadershipActivities.map((item) => (
              <div key={item.title} className="space-y-2">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/48">
                  {item.subtitle}
                </p>
                <p className="text-[1rem] leading-8 text-ink/72">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[30px] border border-line bg-[#1c1815] p-8 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.22em] text-white/62">Global collaboration</p>
          <div className="mt-6 space-y-5 text-[1rem] leading-8 text-white/82">
            <p>
              I've collaborated with teams across North America, Europe, and Asia
              — and visited customer sites from Turku to Atlanta to Turin.
              Getting close to real operational context isn't optional for me.
            </p>
            <p>
              Languages: English, Mandarin, Cantonese, and Swedish.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-14">
        <p className="text-sm leading-7 text-ink/64">
          Background in UX research — selected case studies available in the{" "}
          <Link href="/portfolio/ux" className="font-semibold text-ink transition hover:text-accent">
            Work section
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
