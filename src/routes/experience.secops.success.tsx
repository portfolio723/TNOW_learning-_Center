import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, Calendar } from "lucide-react";

export const Route = createFileRoute("/experience/secops/success")({
  head: () => ({ meta: [{ title: "Workshop scheduled — Thank you" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-8" />
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold">
        Thank you — your workshop is scheduled.
      </h1>
      <p className="mt-3 text-[15px] text-muted-foreground">
        We've emailed the calendar invite and your personalized session summary to your consultant.
        They'll reach out within one business day.
      </p>

      <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6" style={{ borderRadius: 20 }}>
          <Calendar className="size-5 text-primary" />
          <p className="mt-3 font-display text-base font-semibold">Calendar invite sent</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Check your inbox for the Google Calendar and Outlook attachments.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6" style={{ borderRadius: 20 }}>
          <Mail className="size-5 text-primary" />
          <p className="mt-3 font-display text-base font-semibold">Prep pack en route</p>
          <p className="mt-1 text-sm text-muted-foreground">
            A short pre-read tailored to what you explored is on its way.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-3">
        <Link to="/experience" className="btn-secondary">
          Back to products
        </Link>
        <Link to="/experience/secops" className="btn-primary">
          Revisit SecOps
        </Link>
      </div>
    </div>
  );
}
