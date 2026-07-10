import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Play, Clock } from "lucide-react";
import { SectionHeader, StepNav } from "@/components/StepNav";
import { CAPABILITIES } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/tour")({
  head: () => ({ meta: [{ title: "Product Tour — SecOps Experience" }] }),
  component: TourGrid,
});

function TourGrid() {
  const viewed = useExperience((s) => s.capabilitiesViewed);

  return (
    <div>
      <SectionHeader
        eyebrow="Step 3 · Product Tour"
        title="Explore SecOps capability by capability"
        description="Six focused tours, ~2 minutes each. Watch the ones most relevant to your role — we'll mark them complete automatically."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CAPABILITIES.map((c) => {
          const done = viewed.includes(c.id);
          return (
            <Link
              key={c.id}
              to="/experience/secops/tour/$capability"
              params={{ capability: c.id }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevate"
              style={{ borderRadius: 20 }}
            >
              <div className="relative aspect-video bg-foreground">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(32,76,237,0.35),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid size-12 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-float transition group-hover:scale-105">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </div>
                </div>
                {done && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">
                    <Check className="size-3" /> Complete
                  </span>
                )}
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[11px] text-foreground">
                  <Clock className="size-3" /> {c.duration}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-base font-semibold text-foreground">{c.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <StepNav current="tour" />
    </div>
  );
}
