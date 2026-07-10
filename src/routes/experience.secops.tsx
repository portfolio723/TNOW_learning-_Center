import { createFileRoute, Link, Outlet, useMatches, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Sparkle,
  X,
  CaretRight,
  ChatCircle,
  Lightning,
  Clock,
  House,
  PaperPlaneTilt,
  ArrowRight,
} from "@phosphor-icons/react";
import { STEPS, useExperience, useProgress } from "@/lib/experience-store";
import { AI_ANSWERS, AI_SUGGESTIONS } from "@/lib/experience-data";
import { UserProfileMenu } from "@/components/UserProfileMenu";

export const Route = createFileRoute("/experience/secops")({
  component: SecOpsLayout,
});

function SecOpsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { pct, done, total } = useProgress(pathname);
  const user = useExperience((s) => s.user);
  const completed = useExperience((s) => s.completed);
  const matches = useMatches();
  const [aiOpen, setAiOpen] = useState(false);

  const currentStep =
    STEPS.find((s) =>
      s.path === "/experience/secops"
        ? pathname === "/experience/secops"
        : pathname.startsWith(s.path),
    ) ?? STEPS[0];

  const capabilityParam = matches[matches.length - 1]?.params as
    { capability?: string } | undefined;
  const capabilityLabel = capabilityParam?.capability?.replace(/-/g, " ");

  const currentIdx = STEPS.findIndex((s) => s.id === currentStep.id);
  const nextStep = STEPS[currentIdx + 1];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6 py-3">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <Link to="/experience" className="flex items-center shrink-0">
              <img src="/logo.png" alt="ToggleNow" className="h-6 sm:h-7 w-auto object-contain" />
            </Link>
            <CaretRight className="size-3 text-caption shrink-0" />
            <Link
              to="/experience/secops"
              className="text-xs sm:text-sm font-medium text-foreground shrink-0"
            >
              SecOps
            </Link>
            {currentStep.id !== "welcome" && (
              <>
                <CaretRight className="size-3 text-caption shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-[80px] sm:max-w-none">
                  {currentStep.label}
                </span>
              </>
            )}
            {capabilityLabel && (
              <>
                <CaretRight className="size-3 text-caption shrink-0" />
                <span className="text-xs sm:text-sm capitalize text-muted-foreground truncate max-w-[80px] sm:max-w-none">
                  {capabilityLabel}
                </span>
              </>
            )}
          </div>

          <div className="hidden items-center gap-2 md:flex shrink-0">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {pct}% Complete
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <UserProfileMenu />
          </div>
        </div>
      </header>

      {/* Mobile Sticky Step Header */}
      <div className="sticky top-[49px] sm:top-[53px] lg:hidden z-20 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          {/* Step Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-primary uppercase tracking-wider">
              <span>
                Step {currentIdx + 1} of {STEPS.length}
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span>{pct}% Done</span>
            </div>
            <h2 className="font-display text-sm font-bold text-foreground truncate mt-0.5">
              {currentStep.label}
            </h2>
          </div>

          {/* Next / Forward CTA Button right at the top on mobile */}
          {nextStep ? (
            <Link
              to={nextStep.path}
              className="inline-flex items-center gap-1 bg-primary text-white text-[11px] font-semibold rounded-full px-3.5 py-1.5 shadow-sm hover:bg-primary-hover active:scale-95 transition shrink-0"
            >
              Continue <ArrowRight className="size-3" weight="bold" />
            </Link>
          ) : (
            currentStep.id !== "book" && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Step Complete
              </span>
            )
          )}
        </div>

        {/* Horizontal Scrollable Steps List */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STEPS.map((s, i) => {
            const isActive = currentStep.id === s.id;
            const isDone = pathname.includes("/success") || completed[s.id];
            return (
              <Link
                key={s.id}
                to={s.path}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-all shrink-0 border ${
                  isActive
                    ? "bg-primary/10 text-primary border-primary/25 font-semibold"
                    : "bg-surface text-muted-foreground border-border/70"
                }`}
              >
                <span
                  className={`grid size-4 place-items-center rounded-full text-[9px] font-bold ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted text-caption border border-border"
                  }`}
                >
                  {isDone ? <Check className="size-2.5" weight="bold" /> : i + 1}
                </span>
                <span>{s.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 sm:px-6 py-6 md:py-8">
        {/* Sidebar */}
        <aside className="sticky top-[73px] hidden h-[calc(100dvh-100px)] w-64 shrink-0 flex-col lg:flex">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-widest text-caption">
                Your journey
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-caption">
                <Clock className="size-3" /> ~12 min
              </span>
            </div>
            <p className="mt-2 font-display text-lg font-semibold">{pct}% Complete</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>

            <nav className="mt-6 space-y-1">
              {STEPS.map((s, i) => {
                const isActive = currentStep.id === s.id;
                const isDone = pathname.includes("/success") || completed[s.id];
                return (
                  <Link
                    key={s.id}
                    to={s.path}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`grid size-6 place-items-center rounded-full text-[11px] font-semibold ${
                        isDone
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "border border-primary/40 bg-background text-primary"
                            : "border border-border bg-background text-caption"
                      }`}
                    >
                      {isDone ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <span className="font-medium">{s.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Achievements />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 pb-24 md:pb-16">
          <div className="fade-up">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Persistent AI drawer */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex size-12 md:size-auto md:h-auto items-center justify-center md:justify-start gap-2 rounded-full bg-primary p-3 md:px-5 md:py-3 text-sm font-medium text-primary-foreground shadow-float transition hover:bg-primary-hover hover:scale-105 active:scale-95"
        aria-label="Open AI Expert"
      >
        <Sparkle className="size-5 md:size-4" weight="fill" />
        <span className="hidden md:inline">Ask AI Expert</span>
      </button>
      {aiOpen && <AiDrawer onClose={() => setAiOpen(false)} />}
    </div>
  );
}

function Achievements() {
  const { achievements } = useExperience();
  const all = [
    { id: "firstVideo", label: "First video watched" },
    { id: "firstStory", label: "First story explored" },
    { id: "firstAi", label: "First question asked" },
    { id: "workshopReady", label: "Workshop ready" },
  ];
  return (
    <div className="mt-4 rounded-2xl border border-border bg-surface-alt p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-caption">Milestones</p>
      <ul className="mt-3 space-y-2">
        {all.map((a) => {
          const got = achievements.includes(a.id);
          return (
            <li
              key={a.id}
              className={`flex items-center gap-2 text-sm ${
                got ? "text-foreground" : "text-caption"
              }`}
            >
              <span
                className={`grid size-4 place-items-center rounded-full ${
                  got ? "bg-primary text-primary-foreground" : "border border-border"
                }`}
              >
                {got && <Check className="size-2.5" />}
              </span>
              {a.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AiDrawer({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "Hi — I'm the SecOps expert. Ask me anything about SAP Security & Governance, or pick a suggested question below.",
    },
  ]);
  const [input, setInput] = useState("");
  const incAi = useExperience((s) => s.incAi);
  const addAchievement = useExperience((s) => s.addAchievement);
  const complete = useExperience((s) => s.complete);

  function send(q: string) {
    if (!q.trim()) return;
    const answer =
      AI_ANSWERS[q] ??
      "Great question. Our SecOps consultant will cover this in your workshop — I've noted it for the agenda.";
    setMessages((m) => [...m, { role: "user", text: q }, { role: "ai", text: answer }]);
    setInput("");
    incAi();
    addAchievement("firstAi");
    complete("ai");
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-foreground/20" onClick={onClose} />
      <aside className="flex w-full max-w-md flex-col bg-background shadow-float">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkle className="size-4 text-primary" />
            <p className="font-display text-sm font-semibold">AI Expert</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-caption hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-surface text-foreground"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="border-t border-border px-5 py-3">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {AI_SUGGESTIONS.slice(0, 4).map((s) => (
              <button
                key={s.q}
                onClick={() => send(s.q)}
                className="rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground hover:border-primary hover:text-primary"
              >
                {s.q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SecOps…"
              className="flex-1 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{ borderRadius: 16 }}
            />
            <button
              type="submit"
              className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover"
              aria-label="Send"
            >
              <PaperPlaneTilt className="size-4" />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}

// Re-export shared helpers for step pages
export { House as Home, ChatCircle as MessageCircle };
