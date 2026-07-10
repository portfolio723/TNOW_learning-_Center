import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, Sparkles, CalendarCheck } from "lucide-react";
import { useEffect } from "react";
import { SectionHeader, StepNav } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/")({
  head: () => ({
    meta: [{ title: "Welcome — SecOps Experience" }],
  }),
  component: Welcome,
});

function Welcome() {
  const user = useExperience((s) => s.user);
  const complete = useExperience((s) => s.complete);
  useEffect(() => {
    complete("welcome");
  }, [complete]);

  return (
    <div>
      <SectionHeader
        eyebrow="Step 1 · Welcome"
        title={`Welcome${user?.name ? `, ${user.name}` : ""}.`}
        description="Here's your personalized SecOps Experience — a 10–15 minute guided briefing for you."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { kpi: "50%", label: "Reduction in helpdesk tickets" },
          { kpi: "Days → Minutes", label: "Provisioning turnaround" },
          { kpi: "100%", label: "Continuously audit ready" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-3xl border border-border bg-card p-6"
            style={{ borderRadius: 20 }}
          >
            <p className="font-display text-3xl font-semibold text-foreground">{k.kpi}</p>
            <p className="mt-2 text-sm text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold">What you'll learn</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: PlayCircle,
              title: "Video library",
              desc: "Six focused capability tours, ~2 minutes each.",
            },
            {
              icon: Sparkles,
              title: "AI assistance",
              desc: "Ask the SecOps expert anything, anywhere in the flow.",
            },
            {
              icon: CalendarCheck,
              title: "Workshop tailored to you",
              desc: "End with a working session shaped by what you explored.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-border bg-background p-6"
              style={{ borderRadius: 20 }}
            >
              <f.icon className="size-5 text-primary" />
              <p className="mt-4 font-display text-base font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <StepNav current="welcome" nextLabel="Start Journey" />
    </div>
  );
}
