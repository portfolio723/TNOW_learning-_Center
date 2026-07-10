import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { VideoBlock } from "@/components/StepNav";
import { CAPABILITIES } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/tour/$capability")({
  loader: ({ params }) => {
    const cap = CAPABILITIES.find((c) => c.id === params.capability);
    if (!cap) throw notFound();
    return { cap };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.cap.title} — SecOps Tour` : "Capability — SecOps Tour",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-12 text-center">
      <p className="text-muted-foreground">Capability not found.</p>
      <Link to="/experience/secops/tour" className="mt-4 inline-block btn-primary">
        Back to tour
      </Link>
    </div>
  ),
  component: CapabilityPage,
});

function CapabilityPage() {
  const { cap } = Route.useLoaderData();
  const markCapability = useExperience((s) => s.markCapability);
  const viewed = useExperience((s) => s.capabilitiesViewed);
  const incVideos = useExperience((s) => s.incVideos);
  const addAchievement = useExperience((s) => s.addAchievement);
  const complete = useExperience((s) => s.complete);
  const isDone = viewed.includes(cap.id);

  const idx = CAPABILITIES.findIndex((c) => c.id === cap.id);
  const next = CAPABILITIES[idx + 1];

  return (
    <div>
      <Link
        to="/experience/secops/tour"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All capabilities
      </Link>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          Capability · {cap.duration}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold">{cap.title}</h1>
        <p className="mt-3 max-w-3xl text-[15px] text-muted-foreground">{cap.summary}</p>
      </div>

      <div className="mt-8">
        <VideoBlock
          label={`${cap.title} · ${cap.duration}`}
          onPlay={() => {
            incVideos();
            addAchievement("firstVideo");
            markCapability(cap.id);
          }}
          onComplete={() => {
            markCapability(cap.id);
          }}
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div
          className="rounded-3xl border border-border bg-card p-6 md:col-span-2"
          style={{ borderRadius: 20 }}
        >
          <h2 className="font-display text-lg font-semibold">Key features</h2>
          <ul className="mt-4 space-y-3">
            {cap.features.map((f: string) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 size-4 text-primary" /> {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-lg font-semibold">Technical architecture</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            SecOps deploys as a stateless application tier that communicates with SAP via certified
            RFC. No custom development inside SAP, no ABAP transports required. Runs on-premise, on
            your cloud, or fully managed.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["SAP ECC", "S/4HANA", "HANA", "RISE", "GROW", "Azure / AWS / GCP"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-3xl border border-border bg-card p-6"
            style={{ borderRadius: 20 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Business value
            </p>
            <p className="mt-3 text-sm text-foreground">{cap.value}</p>
          </div>

          <div
            className="rounded-3xl border border-border bg-card p-6"
            style={{ borderRadius: 20 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-caption">
              Related FAQs
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li>How does licensing work?</li>
              <li>Can we pilot on a single system?</li>
              <li>What does a typical rollout look like?</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
        <button
          onClick={() => {
            markCapability(cap.id);
          }}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            isDone
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Check className="size-4" /> {isDone ? "Marked complete" : "Mark complete"}
        </button>
        {next ? (
          <Link
            to="/experience/secops/tour/$capability"
            params={{ capability: next.id }}
            className="btn-primary"
          >
            Next: {next.title} <ChevronRight className="size-4" />
          </Link>
        ) : (
          <Link to="/experience/secops/stories" className="btn-primary">
            Continue to Customer Stories <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
