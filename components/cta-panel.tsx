import Link from "next/link";

export function CtaPanel() {
  return (
    <section className="rounded-lg border border-[#1a1a1a] bg-ink px-8 py-10 text-white shadow-panel lg:px-12 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/48">
            Let's talk
          </p>
          <h2 className="max-w-2xl font-display text-[2.45rem] leading-[1.04] lg:text-[3.35rem]">
            Working on something complex?
          </h2>
          <p className="max-w-2xl text-[1.02rem] leading-8 text-white/70">
            Good judgment, real problem, difficult environment — I'd like to hear about it.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end lg:self-center">
          <Link
            href="/contact"
            className="rounded bg-accent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a75f31]"
          >
            Get in touch
          </Link>
          <Link
            href="/portfolio/all"
            className="rounded border border-white/20 bg-white/6 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:text-white"
          >
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
