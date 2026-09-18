import { SectionHeading } from "./section-heading";

export function PageHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 md:px-8 md:pt-20">
      <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
    </div>
  );
}
