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
    <div className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-tight text-ink lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-8 text-ink/72 lg:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
