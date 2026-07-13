import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Play, Clock } from "lucide-react";
import { SectionHeader, StepNav } from "@/components/StepNav";
import { CAPABILITIES } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/tour")({
  head: () => ({ meta: [{ title: "Product Tour — SecOps Experience" }] }),
  component: TourGrid,
});

const CARD_THEMES = [
  {
    gradient: "bg-gradient-to-br from-[#df5c5c] via-[#cc3c8c] to-[#7c2ebd] bg-[#cc3c8c]",
    shadow: "shadow-[#cc3c8c]/15",
  },
  {
    gradient: "bg-gradient-to-br from-[#1070e6] via-[#4d2dbd] to-[#120f3a] bg-[#4d2dbd]",
    shadow: "shadow-[#4d2dbd]/15",
  },
  {
    gradient: "bg-gradient-to-br from-[#38bdf8] via-[#0369a1] to-[#0c4a6e] bg-[#0369a1]",
    shadow: "shadow-[#0369a1]/15",
  },
  {
    gradient: "bg-gradient-to-br from-[#10b981] via-[#0f766e] to-[#115e59] bg-[#0f766e]",
    shadow: "shadow-[#0f766e]/15",
  },
  {
    gradient: "bg-gradient-to-br from-[#ec4899] via-[#8b5cf6] to-[#3b82f6] bg-[#8b5cf6]",
    shadow: "shadow-[#8b5cf6]/15",
  },
  {
    gradient: "bg-gradient-to-br from-[#f59e0b] via-[#ea580c] to-[#991b1b] bg-[#ea580c]",
    shadow: "shadow-[#ea580c]/15",
  },
];

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

      <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, idx) => {
          const done = viewed.includes(c.id);
          const theme = CARD_THEMES[idx % CARD_THEMES.length];
          return (
            <Link
              key={c.id}
              to="/experience/secops/tour/$capability"
              params={{ capability: c.id }}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(32,76,237,0.06)] hover:border-[#204CED]/15"
            >
              {/* Top Visual Thumbnail Area */}
              <div className={`relative w-full aspect-[1.9/1] overflow-hidden ${theme.gradient}`}>
                {/* Top Right: Watch/Complete status button */}
                <div className="absolute top-3 right-3 z-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      markCapability(c.id);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md border transition-all duration-300 ${
                      done
                        ? "bg-emerald-500/95 border-emerald-400 text-white shadow-sm"
                        : "bg-black/35 hover:bg-black/50 border-white/20 text-white"
                    }`}
                  >
                    {done ? (
                      <>
                        <Check className="size-3 stroke-[3px]" /> Completed
                      </>
                    ) : (
                      <>Mark Complete</>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Metadata Content Area */}
              <div className="flex p-5 gap-3 justify-between items-start flex-1 bg-white dark:bg-card">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#204CED]/90 block mb-1.5">
                    SAP Security
                  </span>
                  <h3 className="font-display text-[15px] sm:text-[16px] font-medium tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>

                  {/* Metadata Row */}
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground/90 font-normal">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3 text-muted-foreground" />
                      <span>{c.duration} mins</span>
                    </span>
                    <span className="size-1 rounded-full bg-border" />
                    <span>Video Tour</span>
                  </div>
                </div>

                {/* Right Arrow/Play Circular Button - aligned to bottom */}
                <div className="grid size-9 place-items-center rounded-full bg-[#204CED] text-white transition-all duration-300 group-hover:scale-105 shadow-sm shrink-0 self-end mb-0.5">
                  <Play className="ml-0.5 size-3.5 fill-white text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <StepNav current="tour" />
    </div>
  );
}
