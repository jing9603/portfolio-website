import Image from "next/image";

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
            title="Strategic enough to frame the direction. Hands-on enough to help deliver it."
            description="Jessie Li is a Helsinki-based product leader working across healthcare, digital health, AI-enabled products, and complex data-rich systems. Her work combines strategy, user understanding, and delivery discipline."
          />
          <div className="space-y-4 text-base leading-8 text-ink/72">
            {aboutSections.philosophy.map((paragraph) => (
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
          title="A cross-disciplinary path through UX, product, and regulated digital health."
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
              Jessie has collaborated with teams in Toronto, Boston, California,
              Switzerland, India, China, Singapore, and Sweden.
            </p>
            <p>
              Customer and partner site visits have included Turku, Sollentuna,
              Turin, Austin, Richmond, and Atlanta, reinforcing a product practice
              that stays close to real operational context.
            </p>
            <p>
              Languages: English, Mandarin, Cantonese, and Swedish.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
