import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { SectionHeader, StepNav, VideoBlock } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/why")({
  head: () => ({ meta: [{ title: "Why SecOps — SecOps Experience" }] }),
  component: WhyPage,
});

function WhyPage() {
  const [tab, setTab] = useState<"benefits" | "problems" | "solutions">("benefits");
  const incVideos = useExperience((s) => s.incVideos);
  const addAchievement = useExperience((s) => s.addAchievement);
  const complete = useExperience((s) => s.complete);

  return (
    <div>
      <SectionHeader
        eyebrow="Step 2 · Why SecOps"
        title="Why enterprise SAP teams choose SecOps"
        description="A quick tour of the problems SecOps solves, why the manual approach breaks down, and what changes on day one."
      />

      <div className="mt-6 flex flex-col gap-6 max-w-4xl w-full">
        {/* Large Video Block Container */}
        <div className="w-full">
          <VideoBlock
            label="Why SecOps · 2:48"
            onPlay={() => {
              incVideos();
              addAchievement("firstVideo");
            }}
            onComplete={() => {
              complete("why");
            }}
          />
        </div>

        {/* Generously Sized Tab Switcher Box */}
        <div className="flex flex-col w-full">
          <div className="self-start inline-flex rounded-full border border-border bg-background p-1 shadow-sm">
            {(["benefits", "problems", "solutions"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all duration-200 ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div
            className="mt-4 rounded-2xl border border-border bg-card p-6 md:p-8 min-h-[280px] shadow-sm transition-all duration-300"
            style={{ borderRadius: 16 }}
          >
            {tab === "benefits" && (
              <ul className="space-y-4">
                {[
                  "50% fewer helpdesk tickets with automated self-service",
                  "Days to minutes provisioning for complex corporate assignments",
                  "Real-time Segregation of Duties (SoD) simulation before provisioning",
                  "15% to 30% SAP license cost savings via active usage analysis",
                  "Continuous audit readiness with single-click evidence generation",
                  "Zero footprint deployment with no agent inside your core SAP environment",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3.5 text-sm md:text-base text-foreground leading-relaxed"
                  >
                    <div className="mt-1 grid size-5 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
                      <Check className="size-3.5 stroke-[3px]" />
                    </div>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "problems" && (
              <ul className="space-y-4">
                {[
                  "Manual provisioning across ECC, S/4, BW, and HANA landscapes is slow and error-prone",
                  "Segregation of Duties (SoD) conflicts are discovered only during costly post-event audits",
                  "Massive overspend on SAP Professional licenses due to lack of visibility into actual user activity",
                  "Firefighter access approvals get stuck in email chains and slow down critical production fixes",
                  "Periodic access certification reviews are driven by insecure, manually compiled spreadsheets",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3.5 text-sm md:text-base text-foreground leading-relaxed"
                  >
                    <div className="mt-1 grid size-5 place-items-center rounded-full bg-destructive/10 text-destructive shrink-0">
                      <X className="size-3.5 stroke-[3px]" />
                    </div>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "solutions" && (
              <ul className="space-y-4">
                {[
                  "HR-driven joiner, mover, and leaver lifecycle automation synchronizes roles instantly",
                  "Simulate Segregation of Duties (SoD) on every single access change before it gets committed",
                  "Dynamically reclassify licensing tiers based on real SAP user interaction and usage data",
                  "Policy-based emergency firefighter access with full session video recording and reviews",
                  "Automated, campaign-driven access recertification to maintain tight security baseline compliance",
                ].map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3.5 text-sm md:text-base text-foreground leading-relaxed"
                  >
                    <div className="mt-1 grid size-5 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
                      <Check className="size-3.5 stroke-[3px]" />
                    </div>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <StepNav current="why" />
    </div>
  );
}
