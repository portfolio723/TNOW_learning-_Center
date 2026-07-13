import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, StepNav, VideoBlock } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/why")({
  head: () => ({ meta: [{ title: "Why SecOps — SecOps Experience" }] }),
  component: WhyPage,
});

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

      <div className="mt-6 max-w-2xl w-full">
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

      <StepNav current="why" />
    </div>
  );
}
