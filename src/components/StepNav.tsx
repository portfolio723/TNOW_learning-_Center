import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { STEPS, type StepId, useExperience } from "@/lib/experience-store";

export function StepNav({ current, nextLabel }: { current: StepId; nextLabel?: string }) {
  const complete = useExperience((s) => s.complete);
  const idx = STEPS.findIndex((s) => s.id === current);
  const prev = STEPS[idx - 1];
  const next = STEPS[idx + 1];

  return (
    <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
      {prev ? (
        <Link
          to={prev.path}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.path} onClick={() => complete(current)} className="btn-primary">
          {nextLabel ?? `Continue to ${next.label}`}
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function VideoBlock({ label = "Product demo" }: { label?: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(32,76,237,0.35),transparent_60%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary-foreground">
        <div className="grid size-16 place-items-center rounded-full bg-primary/90 shadow-float">
          <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-sm font-medium opacity-80">{label}</p>
      </div>
    </div>
  );
}
