import Link from "next/link";

type CtaPanelProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaPanel({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: CtaPanelProps) {
  return (
    <section className="rounded-[34px] border border-[#1f1a17] bg-[#1b1714] px-8 py-10 text-white shadow-panel lg:px-12 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#d3b39f]">
            Let's talk
          </p>
          <h2 className="max-w-2xl font-display text-[2.45rem] leading-[1.04] lg:text-[3.35rem]">
            {title}
          </h2>
          <p className="max-w-2xl text-[1.02rem] leading-8 text-white/76">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end lg:self-center">
          <Link
            href={primaryHref}
            className="rounded-full bg-[#ba6a36] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a75f31]"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/18 bg-white/4 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-[#d3b39f] hover:text-[#f1d6c6]"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
