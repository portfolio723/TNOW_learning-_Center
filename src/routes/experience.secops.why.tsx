import { createFileRoute } from "@tanstack/react-router";
import { TimerReset, ShieldCheck, IdCard, Workflow } from "lucide-react";
import { SectionHeader, StepNav, VideoBlock } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/why")({
  head: () => ({ meta: [{ title: "Why SecOps — SecOps Experience" }] }),
  component: WhyPage,
});

const FEATURES = [
  {
    icon: TimerReset,
    title: "Faster Provisioning",
    desc: "Automate user access from request to approval.",
  },
  {
    icon: ShieldCheck,
    title: "Real-Time SoD Analysis",
    desc: "Prevent segregation-of-duties conflicts instantly.",
  },
  {
    icon: IdCard,
    title: "Smart License Management",
    desc: "Optimize SAP licenses before audits and renewals.",
  },
  {
    icon: Workflow,
    title: "Unified Access Governance",
    desc: "One platform for users, approvals, SoD, and compliance.",
  },
];

function WhyPage() {
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

      <div className="mt-6 flex flex-col gap-8 w-full max-w-5xl">
        {/* Extended Video Block */}
        <div className="w-full aspect-video min-h-[300px] max-h-[520px] rounded-3xl overflow-hidden shadow-md">
          <VideoBlock
            label="Why SecOps · 2:48"
            className="w-full h-full"
            onPlay={() => {
              incVideos();
              addAchievement("firstVideo");
            }}
            onComplete={() => {
              complete("why");
            }}
          />
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group flex flex-col p-6 bg-[#F6F5F2] hover:bg-[#F6F5F2]/90 border border-transparent hover:border-[#204CED]/15 hover:shadow-[0_10px_30px_rgba(32,76,237,0.06)] rounded-[20px] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon Container: 44x44px circle in #204CED */}
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#204CED] text-white shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5 stroke-[2.25]" />
                </div>

                <h3 className="mt-4 font-display text-[18px] font-semibold text-foreground tracking-tight leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] text-[#667085] leading-relaxed font-normal">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <StepNav current="why" />
    </div>
  );
}
