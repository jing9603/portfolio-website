"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.42, ease: "easeOut" as const, delay }
});

const principles = [
  {
    title: "I speak business, tech, and UX natively.",
    body: "Most PMs pick one language and translate. I don't, which means less gets lost between where decisions are made and where things get built.",
  },
  {
    title: "I stay in the problem longer than is comfortable.",
    body: "I don't hand off to research or engineering and wait for output. I'm usually somewhere in between, useful when the boundaries are blurry.",
  },
  {
    title: "I prototype before I persuade.",
    body: "Abstract arguments about the right direction go nowhere. Something real on a screen moves people.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-10 lg:px-10 lg:pb-32 lg:pt-16">

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="grid gap-14 lg:grid-cols-[1fr_400px] lg:items-start">
        <div className="space-y-8 pt-2">
          <SectionHeading eyebrow="About Me" title="Hi, I'm Jessie." />
          <motion.div className="space-y-6 text-[1.05rem] leading-8 text-ink/82" {...fadeUp(0.1)}>
            <p>
              I came from computer science and UX research. Six years in, I&apos;ve shipped
              products in regulated healthcare, sports and health wearables, and AI-powered
              tools, with teams in Finland, China, the UK, and the US, and users in 20+
              countries. What ties it together isn&apos;t a title; it&apos;s the shape of the
              problems: complex domains, high stakes, evidence-light environments where someone
              has to make the call.
            </p>
            <p>Started from Helsinki, working globally.</p>
            <p>
              Spent years getting close to users, mapping workflows, understanding what people
              actually needed versus what they said they needed. I loved that work. But I kept
              running into the same wall: the insight was there, and then it wouldn&apos;t
              translate into what got built.
            </p>
            <p>
              So I did something about it. I built a centralised feedback system from scratch
              while I was still a researcher: designed the structure, drove adoption across
              product and engineering, and got 500 customer inputs shaping decisions within a
              year. That system made the case for my move into product management. Same company,
              different seat, a lot more ownership.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="relative min-h-[300px] overflow-hidden rounded-lg border border-line bg-white shadow-panel sm:min-h-[420px] lg:min-h-[520px]"
          {...fadeUp(0.15)}
        >
          <Image
            src="/images/indoor-square.JPG"
            alt="Jessie Li portrait indoors."
            fill
            className="object-cover object-center"
          />
        </motion.div>
      </section>

      {/* ── How I work ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            How I work
          </p>
          <p className="text-[1.02rem] leading-8 text-ink/55">
            A few things that are just true about how I operate.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="rounded-lg border border-line bg-white p-6 shadow-sm"
              {...fadeUp(i * 0.07)}
            >
              <p className="font-display text-[2.5rem] font-semibold leading-none text-accent/20 select-none">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-[1rem] font-semibold leading-snug text-ink">
                {p.title}
              </p>
              <p className="mt-2.5 text-[0.95rem] leading-7 text-ink/62">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The builder note ──────────────────────────────────────── */}
      <section className="border-t border-line py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          The builder note
        </p>
        <motion.div
          className="mt-6 border-l-[3px] border-accent pl-5 sm:pl-8"
          {...fadeUp(0.05)}
        >
          <div className="max-w-2xl space-y-5 text-[1.05rem] leading-8 text-ink/80">
            <p>
              I automate the repetitive parts of my own work so I can spend attention on the
              parts that need judgment. Outside of work I build things too. An AI pet care app I
              cofounded and shipped in
              six months. Automated tools I made for my own life because the manual version was
              wasting my time. A product and design community in Helsinki I run because I wanted
              one and it didn't exist yet.
            </p>
            <p>
              I build to learn. The{" "}
              <Link
                href="/portfolio/ai-data"
                className="font-semibold text-ink underline decoration-accent/40 underline-offset-2 transition hover:text-accent"
              >
                AI & data work
              </Link>
              {" "}is where that shows most clearly.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Experience ────────────────────────────────────────────── */}
      <section className="border-t border-line py-24">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="mt-12">
          <Timeline />
        </div>
      </section>

    </div>
  );
}
