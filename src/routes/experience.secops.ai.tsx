import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, BookOpen, PlayCircle } from "lucide-react";
import { SectionHeader, StepNav } from "@/components/StepNav";
import { AI_ANSWERS, AI_SUGGESTIONS } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";

export const Route = createFileRoute("/experience/secops/ai")({
  head: () => ({ meta: [{ title: "AI Expert — SecOps Experience" }] }),
  component: AiPage,
});

type Msg = { role: "user" | "ai"; text: string };

function AiPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "I'm the SecOps expert. Ask me about compatibility, architecture, licensing, or implementation. Pick a suggested question or type your own.",
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
      "Great question — our SecOps consultant will cover this in your workshop, and I've flagged it for the agenda.";
    setMessages((m) => [...m, { role: "user", text: q }, { role: "ai", text: answer }]);
    setInput("");
    incAi();
    addAchievement("firstAi");
    complete("ai");
  }

  const topics = Array.from(new Set(AI_SUGGESTIONS.map((s) => s.topic)));

  return (
    <div>
      <SectionHeader
        eyebrow="Step 5 · AI Expert"
        title="Ask the SecOps expert anything"
        description="Get instant, accurate answers about SAP compatibility, architecture, licensing, and rollout — with references you can hand to your team."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left column */}
        <aside className="space-y-4">
          <div
            className="rounded-3xl border border-border bg-card p-5"
            style={{ borderRadius: 20 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-caption">
              Suggested questions
            </p>
            <ul className="mt-3 space-y-1.5">
              {AI_SUGGESTIONS.map((s) => (
                <li key={s.q}>
                  <button
                    onClick={() => send(s.q)}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface-alt hover:text-primary"
                  >
                    {s.q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-3xl border border-border bg-card p-5"
            style={{ borderRadius: 20 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Popular topics
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat */}
        <section
          className="flex min-h-[520px] flex-col overflow-hidden rounded-3xl border border-border bg-background"
          style={{ borderRadius: 20 }}
        >
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <Sparkles className="size-4 text-primary" />
            <p className="font-display text-sm font-semibold">SecOps Expert</p>
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              online
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-surface text-foreground"
                }`}
              >
                {m.text}
                {m.role === "ai" && i > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground hover:text-primary">
                      <PlayCircle className="size-3" /> Related video
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground hover:text-primary">
                      <BookOpen className="size-3" /> Documentation
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border px-5 py-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about compatibility, architecture, licensing…"
              className="flex-1 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{ borderRadius: 16 }}
            />
            <button
              type="submit"
              className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      </div>

      <StepNav current="ai" />
    </div>
  );
}
