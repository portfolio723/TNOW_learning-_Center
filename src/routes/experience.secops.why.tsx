import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { SectionHeader, StepNav, VideoBlock } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/why")({
  head: () => ({ meta: [{ title: "Why SecOps — SecOps Experience" }] }),
  component: WhyPage,
});

const COMPARE = [
  { topic: "Provisioning", manual: "3–6 days", secops: "12 minutes" },
  { topic: "Licenses", manual: "Annual guesswork", secops: "Continuous, usage-based" },
  { topic: "SoD", manual: "Post-audit findings", secops: "Real-time simulation" },
  { topic: "Self-Service", manual: "Ticket queue", secops: "Branded catalog" },
  { topic: "Audit", manual: "Fire drill", secops: "One-click evidence" },
];

const CHECKLIST = ["Provisioning", "Licenses", "SoD", "Self-Service", "Audit"];

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

      <div className="mt-8 grid gap-8 lg:grid-cols-2 items-start">
        {/* Left: Reduced Video Block */}
        <div className="w-full max-w-xl mx-auto lg:mx-0">
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

        {/* Right: Benefits, Problems, Solutions Stack */}
        <div className="flex flex-col">
          <div className="self-start inline-flex rounded-full border border-border bg-background p-1">
            {(["benefits", "problems", "solutions"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div
            className="mt-4 rounded-3xl border border-border bg-card p-6 min-h-[220px]"
            style={{ borderRadius: 20 }}
          >
            {tab === "benefits" && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "50% fewer helpdesk tickets",
                  "Days → minutes provisioning",
                  "Real-time SoD simulation",
                  "15–30% SAP license savings",
                  "Continuous audit readiness",
                  "Zero footprint inside SAP",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 text-primary shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            )}
            {tab === "problems" && (
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  "Manual provisioning across ECC, S/4, BW, HANA landscapes",
                  "SoD conflicts discovered only during audits",
                  "Overspend on SAP Professional licenses",
                  "Firefighter access approvals stuck in email",
                  "Access reviews driven by spreadsheets",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <X className="mt-0.5 size-4 text-destructive shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            )}
            {tab === "solutions" && (
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  "HR-driven joiner/mover/leaver automation",
                  "Simulate SoD on every access change, before commit",
                  "Reclassify licenses based on actual SAP usage",
                  "Policy-based firefighter with session recording",
                  "Campaign-driven access recertification",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 text-primary shrink-0" /> {s}
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
