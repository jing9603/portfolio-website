import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { leadershipActivities } from "@/data/site-content";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-10 lg:px-10 lg:pb-32 lg:pt-16">
      {/* Intro */}
      <section className="grid gap-14 lg:grid-cols-[1fr_400px] lg:items-start">
        <div className="space-y-8 pt-2">
          <SectionHeading
            eyebrow="About Me"
            title="Hi, I'm Jessie."
          />
          <div className="space-y-6 text-[1.02rem] leading-8 text-ink/72">
            <p>
              I came from computer science and UX research. Spent years getting close to users,
              mapping workflows, understanding what people actually needed versus what they said
              they needed. I loved that work. But I kept running into the same wall: the insight
              was there, and then it wouldn't translate into what got built.
            </p>
            <p>
              So I did something about it. I built a centralised feedback system from scratch
              while I was still a researcher — designed the structure, drove adoption across
              product and engineering, and got 500 customer inputs shaping decisions within a
              year. That system made the case for my move into product management. Same company,
              different seat, a lot more ownership.
            </p>
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-line bg-white shadow-panel">
          <Image
            src="/images/indoor-square.JPG"
            alt="Jessie Li portrait indoors."
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* How I work */}
      <section className="border-t border-line py-20">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            How I work
          </p>
          <p className="text-[1.02rem] leading-8 text-ink/60">
            A few things that are just true about how I operate.
          </p>
        </div>
        <div className="mt-10 max-w-3xl space-y-8 text-[1.02rem] leading-8 text-ink/72">
          <p>
            <span className="font-semibold text-ink">
              I automate the repetitive parts so I can focus on the parts that need judgment.
            </span>{" "}
            I use AI constantly in my own workflow, not as a feature I ship but as a way I think.
          </p>
          <p>
            <span className="font-semibold text-ink">
              I stay in problems longer than is comfortable.
            </span>{" "}
            I don't hand off to research or to engineering and wait. I'm usually somewhere in
            between, which makes me useful in environments where the boundaries are blurry.
          </p>
          <p>
            <span className="font-semibold text-ink">I prototype before I persuade.</span>{" "}
            Abstract arguments about the right direction go nowhere. Something real on a screen
            moves people.
          </p>
          <p>
            <span className="font-semibold text-ink">
              I sit across business, tech, and UX and I speak all three.
            </span>{" "}
            Most of the time, the gap between good work and shipped work is a translation problem.
          </p>
        </div>
      </section>

      {/* The builder note */}
      <section className="border-t border-line py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          The builder note
        </p>
        <div className="mt-6 max-w-3xl space-y-6 text-[1.02rem] leading-8 text-ink/72">
          <p>
            Outside of work I build things too. An AI pet care app I cofounded and shipped in
            six months. Automated tools I made for my own life because the manual version was
            wasting my time. A product and design community in Helsinki I run because I wanted
            one and it didn't exist yet.
          </p>
          <p>
            I build to learn. That's probably the most honest thing I can say about how I'm wired.{" "}
            <Link
              href="/portfolio/ai-data"
              className="font-semibold text-ink transition hover:text-accent"
            >
              See the AI & data work →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-24">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="mt-12">
          <Timeline />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Leadership & activity</p>
          <div className="mt-6 space-y-6">
            {leadershipActivities.map((item) => (
              <div key={item.title} className="space-y-2">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/40">
                  {item.subtitle}
                </p>
                <p className="text-[1rem] leading-8 text-ink/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-ink p-8 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">Global collaboration</p>
          <div className="mt-6 space-y-5 text-[1rem] leading-8 text-white/78">
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

    </div>
  );
}
