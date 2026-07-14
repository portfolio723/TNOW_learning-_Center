import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Bot, BookOpen, PlayCircle } from "lucide-react";
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

  return (
    <div>
      <SectionHeader
        eyebrow="Step 5 · AI Expert"
        title="Ask the SecOps expert anything"
        description="Get instant, accurate answers about SAP compatibility, architecture, licensing, and rollout — with references you can hand to your team."
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-[240px_1fr] items-start">
        {/* Left column */}
        <aside className="order-2 lg:order-1 w-full h-[520px]">
          <div
            className="rounded-2xl border border-border bg-card p-4 h-full flex flex-col"
            style={{ borderRadius: 16 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
              Suggested questions
            </p>
            <ul className="mt-2 space-y-1 overflow-y-auto flex-1 pr-1">
              {AI_SUGGESTIONS.map((s) => (
                <li key={s.q}>
                  <button
                    onClick={() => send(s.q)}
                    className="w-full rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition hover:bg-surface-alt hover:text-primary leading-tight"
                  >
                    {s.q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Chat */}
        <section
          className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-background order-1 lg:order-2"
          style={{ borderRadius: 16 }}
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-card/40">
            <Bot className="size-4 text-primary" />
            <p className="font-display text-sm font-semibold">SecOps Expert</p>
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              online
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "user" ? (
                  <div className="max-w-[80%] rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed shadow-sm rounded-tr-none">
                    {m.text}
                  </div>
                ) : (
                  <div className="flex gap-3 max-w-[85%] items-start">
                    <div className="grid size-8 place-items-center rounded-full border border-primary/20 bg-primary/10 text-primary shrink-0 shadow-sm mt-0.5">
                      <Bot className="size-4" />
                    </div>
                    <div className="rounded-2xl bg-surface border border-border/50 text-foreground px-4 py-2.5 text-sm leading-relaxed shadow-sm rounded-tl-none">
                      <p className="whitespace-pre-line">{m.text}</p>
                      {m.role === "ai" && i > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-primary transition">
                            <PlayCircle className="size-3" /> Related video
                          </button>
                          <button className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-primary transition">
                            <BookOpen className="size-3" /> Documentation
                          </button>
                        </div>
                      )}
                    </div>
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
            className="flex items-center gap-2 border-t border-border px-4 py-3 bg-card/20"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about compatibility, architecture, licensing…"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{ borderRadius: 12 }}
            />
            <button
              type="submit"
              className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover shrink-0 transition shadow-sm"
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
