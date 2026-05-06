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
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="About Jessie"
            title="I make complex products easier to move."
            description={aboutSections.philosophy[0]}
          />
          <div className="space-y-4 text-base leading-8 text-ink/72">
            {aboutSections.philosophy.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative min-h-[460px] overflow-hidden rounded-[30px] border border-line shadow-panel sm:col-span-2">
            <Image
              src="/images/headshot.png"
              alt="Jessie Li headshot."
              fill
              className="object-cover"
            />
          </div>
          <div className="rounded-[28px] border border-line bg-white p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Interests</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/68">
              {aboutSections.interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-line bg-[#f1e9dc] p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Qualifications</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/68">
              {aboutSections.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
        />
        <div className="mt-12 space-y-5">
          {experienceTimeline.map((item) => (
            <article
              key={`${item.period}-${item.title}`}
              className="grid gap-4 rounded-[28px] border border-line bg-white p-6 shadow-soft lg:grid-cols-[220px_1fr]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-accent">
                  {item.period}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-ink">
                  {item.title} <span className="text-ink/48">@ {item.company}</span>
                </h3>
                <p className="max-w-3xl text-base leading-7 text-ink/72">{item.summary}</p>
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
                <p className="text-base leading-7 text-ink/72">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[30px] border border-line bg-[#102120] p-8 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.22em] text-white/62">Global collaboration</p>
          <div className="mt-6 space-y-5 text-base leading-8 text-white/82">
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
