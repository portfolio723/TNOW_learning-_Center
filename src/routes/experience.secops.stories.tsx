import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, Download } from "lucide-react";
import { SectionHeader, StepNav } from "@/components/StepNav";
import { STORIES, INDUSTRIES } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/stories")({
  head: () => ({ meta: [{ title: "Customer Stories — SecOps Experience" }] }),
  component: StoriesPage,
});

function StoriesPage() {
  const [industry, setIndustry] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const markStory = useExperience((s) => s.markStory);
  const addAchievement = useExperience((s) => s.addAchievement);
  const complete = useExperience((s) => s.complete);
  const read = useExperience((s) => s.storiesRead);

  const filtered = industry ? STORIES.filter((s) => s.industry === industry) : STORIES;
  const open = STORIES.find((s) => s.id === openId);

  function openStory(id: string) {
    setOpenId(id);
    markStory(id);
    addAchievement("firstStory");
    complete("stories");
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Step 4 · Customer Stories"
        title="Enterprise SAP teams already running on SecOps"
        description="Real outcomes from Global 2000 organizations across manufacturing, pharma, banking, and utilities."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip active={industry === null} onClick={() => setIndustry(null)} label="All" />
        {INDUSTRIES.map((i) => (
          <FilterChip key={i} active={industry === i} onClick={() => setIndustry(i)} label={i} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => openStory(s.id)}
            className={`text-left rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevate ${
              read.includes(s.id) ? "ring-1 ring-primary/20" : ""
            }`}
            style={{ borderRadius: 20 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-caption">
                {s.industry}
              </span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                {s.metric}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{s.company}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.challenge}</p>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-transparent" onClick={() => setOpenId(null)} />
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background shadow-float"
            style={{ borderRadius: 24 }}
          >
            <div className="flex items-start justify-between border-b border-border px-6 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-caption">
                  {open.industry}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">{open.company}</h3>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="text-caption hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-5 px-6 py-6">
              <Row label="Before" value={open.challenge} />
              <Row label="After" value={open.solution} />
              <Row label="Business outcomes" value={open.results} />
              <div className="rounded-2xl bg-surface-alt p-4">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">ROI</p>
                <p className="mt-2 font-display text-2xl font-semibold">{open.metric}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <Download className="size-4" /> Download PDF
              </button>
              <button onClick={() => setOpenId(null)} className="btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <StepNav current="stories" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-caption">{label}</p>
      <p className="mt-1.5 text-sm text-foreground">{value}</p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
