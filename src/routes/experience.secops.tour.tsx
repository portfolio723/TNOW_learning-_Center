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
  const markCapability = useExperience((s) => s.markCapability);

  return (
    <div>
      <SectionHeader
        eyebrow="Step 3 · Product Tour"
        title="Explore SecOps capability by capability"
        description="Six focused tours, ~2 minutes each. Watch the ones most relevant to your role — we'll mark them complete automatically."
      />

      {/* Product Tour Progress Section */}
      <div className="mt-8 rounded-3xl border border-border bg-card p-6 max-w-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Tour progress</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Watch or mark all 6 capability demos to complete the Product Tour step
            </p>
          </div>
          <span className="text-sm font-semibold text-primary shrink-0 ml-4">
            {viewed.length} / 6 completed
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted relative">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(viewed.length / 6) * 100}%` }}
          />
        </div>
        {viewed.length === 6 && (
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <div className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
              <Check className="size-3.5 stroke-[3px]" />
            </div>
            Congratulations! You have completed the Product Tour step!
          </div>
        )}
      </div>

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

                {/* Check/Tick Icon Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    markCapability(c.id);
                  }}
                  className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-300 ${
                    done
                      ? "bg-emerald-500 text-white shadow-sm scale-100"
                      : "bg-black/40 hover:bg-black/60 border border-white/20 text-white/90 hover:scale-105 active:scale-95"
                  }`}
                >
                  {done ? (
                    <>
                      <Check className="size-3.5 stroke-[3px]" /> Complete
                    </>
                  ) : (
                    <>
                      <span className="size-1.5 rounded-full bg-white/60 animate-pulse" /> Mark
                      watched
                    </>
                  )}
                </button>

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
