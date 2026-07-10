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
  useEffect(() => {
    incVideos();
    addAchievement("firstVideo");
  }, [incVideos, addAchievement]);

  return (
    <div>
      <SectionHeader
        eyebrow="Step 2 · Why SecOps"
        title="Why enterprise SAP teams choose SecOps"
        description="A quick tour of the problems SecOps solves, why the manual approach breaks down, and what changes on day one."
      />

      <div className="mt-10">
        <VideoBlock label="Why SecOps · 2:48" />
      </div>

      <div className="mt-10">
        <div className="inline-flex rounded-full border border-border bg-background p-1">
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
          className="mt-6 rounded-3xl border border-border bg-card p-6"
          style={{ borderRadius: 20 }}
        >
          {tab === "benefits" && (
            <ul className="grid gap-3 md:grid-cols-2">
              {[
                "50% fewer helpdesk tickets",
                "Days → minutes provisioning",
                "Real-time SoD simulation",
                "15–30% SAP license savings",
                "Continuous audit readiness",
                "Zero footprint inside SAP",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 text-primary" /> {b}
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
                  <X className="mt-0.5 size-4 text-destructive" /> {p}
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
                  <Check className="mt-0.5 size-4 text-primary" /> {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold">Manual vs SecOps</h2>
        <div
          className="mt-4 overflow-hidden rounded-3xl border border-border"
          style={{ borderRadius: 20 }}
        >
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-caption">Area</th>
                <th className="px-6 py-3 text-left font-medium text-caption">Manual</th>
                <th className="px-6 py-3 text-left font-medium text-primary">SecOps</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.topic} className={i % 2 ? "bg-surface/40" : ""}>
                  <td className="px-6 py-4 font-medium text-foreground">{row.topic}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.manual}</td>
                  <td className="px-6 py-4 text-foreground">{row.secops}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold">What's covered</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CHECKLIST.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs font-medium text-foreground"
            >
              <Check className="size-3 text-primary" /> {c}
            </span>
          ))}
        </div>
      </div>

      <StepNav current="why" />
    </div>
  );
}
