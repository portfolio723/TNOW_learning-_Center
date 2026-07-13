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

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { kpi: "50%", label: "Reduction in helpdesk tickets", watermark: "50%" },
          { kpi: "Days → Mins", label: "Provisioning turnaround time", watermark: "24h" },
          { kpi: "100%", label: "Continuously audit ready and compliant", watermark: "100" },
        ].map((k) => (
          <div
            key={k.label}
            className="relative overflow-hidden rounded-[20px] border border-border bg-card p-8 h-[220px] flex flex-col justify-end group hover:border-[#204CED]/15 hover:shadow-[0_12px_30px_rgba(32,76,237,0.04)] transition-all duration-300"
          >
            {/* Giant watermark in background */}
            <div className="absolute right-[-10px] top-[-20px] text-[110px] font-extrabold text-[#204CED]/[0.06] dark:text-[#204CED]/[0.04] select-none pointer-events-none leading-none tracking-tighter">
              {k.watermark}
            </div>

            {/* Main KPI and Description grouped closely at the bottom */}
            <div className="z-10 flex flex-col gap-1.5">
              <p className="font-display text-[32px] font-medium text-foreground tracking-tight leading-none">
                {k.kpi}
              </p>
              <p className="text-[13px] text-muted-foreground leading-normal font-normal md:max-w-[200px]">
                {k.label}
              </p>
            </div>
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
