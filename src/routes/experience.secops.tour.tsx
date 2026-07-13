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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/80 pb-3 mb-4">
        <div className="max-w-xl">
          <p className="text-[10px] font-medium uppercase tracking-widest text-primary">
            Step 3 · Product Tour
          </p>
          <h1 className="mt-1.5 font-display text-xl font-semibold leading-tight text-foreground">
            Explore SecOps capability by capability
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Six focused tours, ~2 minutes each. Watch the ones most relevant to your role — we'll
            mark them complete automatically.
          </p>
        </div>

        {/* Product Tour Progress Section */}
        <div className="rounded-xl border border-border bg-card p-3 w-full lg:max-w-xs shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xs font-semibold text-foreground">Tour progress</h3>
            </div>
            <span className="text-[10px] font-semibold text-primary shrink-0 ml-4 bg-primary/10 px-2 py-0.5 rounded-full">
              {viewed.length} / 6 completed
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted relative">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(viewed.length / 6) * 100}%` }}
            />
          </div>
          {viewed.length === 6 && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <div className="grid size-4 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                <Check className="size-2.5 stroke-[3px]" />
              </div>
              All demos completed!
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c) => {
          const done = viewed.includes(c.id);
          return (
            <Link
              key={c.id}
              to="/experience/secops/tour/$capability"
              params={{ capability: c.id }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevate flex flex-col"
              style={{ borderRadius: 14 }}
            >
              <div className="relative aspect-[2.1/1] bg-foreground w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(32,76,237,0.35),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid size-9 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-float transition group-hover:scale-105">
                    <Play className="ml-0.5 size-3.5 fill-current" />
                  </div>
                </div>

                {/* Check/Tick Icon Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    markCapability(c.id);
                  }}
                  className={`absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-300 ${
                    done
                      ? "bg-emerald-500 text-white shadow-sm scale-100"
                      : "bg-black/40 hover:bg-black/60 border border-white/20 text-white/90 hover:scale-105 active:scale-95"
                  }`}
                >
                  {done ? (
                    <>
                      <Check className="size-3 stroke-[3px]" /> Complete
                    </>
                  ) : (
                    <>
                      <span className="size-1 rounded-full bg-white/60 animate-pulse" /> Watch
                    </>
                  )}
                </button>

                <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-1.5 py-0.5 text-[10px] text-foreground">
                  <Clock className="size-3" /> {c.duration}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center">
                <p className="font-display text-sm font-semibold text-foreground leading-tight">
                  {c.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <StepNav current="tour" />
    </div>
  );
}
