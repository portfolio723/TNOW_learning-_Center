import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarCheck, ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/book")({
  head: () => ({ meta: [{ title: "Book Workshop — SecOps Experience" }] }),
  component: BookPage,
});

function BookPage() {
  const {
    videosWatched,
    storiesRead,
    aiQuestionsAsked,
    capabilitiesViewed,
    complete,
    addAchievement,
  } = useExperience();
  const [notes, setNotes] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    addAchievement("workshopReady");
  }, [addAchievement]);

  const slots = [
    "Tue · Nov 25 · 10:00",
    "Wed · Nov 26 · 14:00",
    "Thu · Nov 27 · 09:30",
    "Fri · Nov 28 · 16:00",
  ];

  function schedule() {
    complete("book");
    navigate({ to: "/experience/secops/success" });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Step 6 · Book Workshop"
        title="Let's tailor a workshop for your team"
        description="A 45-minute working session with a SecOps consultant, shaped by everything you've explored."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div
            className="rounded-3xl border border-border bg-card p-6"
            style={{ borderRadius: 20 }}
          >
            <p className="font-display text-lg font-semibold">Pick a time</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    slot === s
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background text-foreground hover:border-primary/30"
                  }`}
                  style={{ borderRadius: 16 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl border border-border bg-card p-6"
            style={{ borderRadius: 20 }}
          >
            <label className="font-display text-lg font-semibold">
              What should our consultant focus on?
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="e.g. Migration from SAP GRC, S/4 rollout, license optimization for 8,000 users…"
              className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{ borderRadius: 16 }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: "/experience/secops/ai" })}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back to AI
            </button>
            <button onClick={schedule} disabled={!slot} className="btn-primary disabled:opacity-60">
              <CalendarCheck className="size-4" /> Schedule Workshop
            </button>
          </div>
        </div>

        <aside
          className="rounded-3xl border border-primary/20 bg-surface-alt p-6"
          style={{ borderRadius: 20 }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Your progress
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <Row label="Videos watched" value={videosWatched} />
            <Row label="Customer stories" value={storiesRead.length} />
            <Row label="Questions asked" value={aiQuestionsAsked} />
            <Row label="Capabilities explored" value={capabilitiesViewed.length} />
          </ul>
          <div className="mt-6 rounded-2xl bg-background p-4">
            <p className="text-xs text-caption">
              Your session summary will be shared with your consultant so the workshop is 100%
              relevant.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-display text-base font-semibold text-foreground tabular-nums">
        {value}
      </span>
    </li>
  );
}
