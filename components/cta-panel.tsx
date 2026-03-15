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
    <section className="rounded-[32px] border border-line bg-[#12322f] px-8 py-10 text-white shadow-panel lg:px-12 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/68">
            Let's talk
          </p>
          <h2 className="font-display text-4xl leading-tight lg:text-5xl">{title}</h2>
          <p className="max-w-2xl text-base leading-8 text-white/78">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link
            href={primaryHref}
            className="rounded-full bg-[#efe4cd] px-5 py-3 text-sm font-semibold text-[#12322f] transition hover:bg-white"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/24 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/8"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
