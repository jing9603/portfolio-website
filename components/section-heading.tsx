type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </p>
      <h2 className="max-w-2xl font-display text-[2.4rem] leading-[1.03] text-ink lg:text-[3.35rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-[1.02rem] leading-8 text-ink/68 lg:text-[1.08rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
