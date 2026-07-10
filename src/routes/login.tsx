import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lightning,
  Key,
  UserGear,
  Sparkle,
  LockSimple,
  Buildings,
  SealCheck,
  Quotes,
  Star,
} from "@phosphor-icons/react";
import { useExperience } from "@/lib/experience-store";
import { AnimatePresence, motion } from "motion/react";

const REVIEWS = [
  {
    quote:
      "SecOps completely transformed our S/4HANA migration. We went from days to minutes in user provisioning while keeping our audit completely clean.",
    author: "Sarah Jenkins",
    role: "VP of IT Infrastructure",
    company: "Global Foods Inc.",
    stat: "94% faster provisioning",
    rating: 5,
  },
  {
    quote:
      "The real-time Segregation of Duties (SoD) simulation caught three critical conflicts before they ever hit production. It's an indispensable tool for our compliance.",
    author: "Marcus Vance",
    role: "Chief Information Security Officer",
    company: "Centria Health",
    stat: "Zero audit findings",
    rating: 5,
  },
  {
    quote:
      "By automatically analyzing actual usage against our SAP licensing tier, SecOps saved us $1.8M in our annual SAP true-up. The ROI was virtually immediate.",
    author: "David Cho",
    role: "Director of SAP Basis",
    company: "Aether Automotive",
    stat: "$1.8M saved on true-up",
    rating: 5,
  },
  {
    quote:
      "Self-service access with automated role reviews solved our emergency access bottlenecks. Business users are happy, and audit trails are completely foolproof.",
    author: "Elena Rostova",
    role: "VP of Global Compliance & GRC",
    company: "FinTech Union",
    stat: "100% automated logging",
    rating: 5,
  },
];

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ToggleNow Experience Center" },
      {
        name: "description",
        content:
          "Sign in to your personalized ToggleNow Experience Center — a private, guided SAP Security & Governance briefing for you.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isNameModified, setIsNameModified] = useState(false);
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const setUser = useExperience((s) => s.setUser);
  const reset = useExperience((s) => s.reset);
  const navigate = useNavigate();

  function handleEmailChange(val: string) {
    setEmail(val);
    if (!isNameModified && val) {
      const candidate = val
        .split("@")[0]
        .replace(/[0-9]/g, "") // remove numeric digits (e.g. 723ms -> ms)
        .replace(/grc|basis|sap|it|admin|dev/gi, "") // strip common robotic/system labels
        .replace(/[._]/g, " ") // replace dots and underscores with spaces
        .trim();

      const cleanCandidate =
        candidate.length > 1 ? candidate : val.split("@")[0].replace(/[._]/g, " ");
      setName(capitalize(cleanCandidate));
    }
  }

  function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setTimeout(() => {
      setStage("otp");
      setLoading(false);
    }, 400);
  }

  function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      reset(); // Reset all cached state, achievements, and steps from previous sessions
      setUser({ email, name: name.trim() || "Guest User" });
      navigate({ to: "/experience" });
    }, 400);
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="grid min-h-dvh lg:grid-cols-5">
        {/* Left — Showcase */}
        <aside className="hidden bg-surface-alt lg:col-span-3 lg:block">
          <div className="flex h-full flex-col justify-between px-14 py-14">
            <ShowcaseIllustration />

            <div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: UserGear,
                    title: "Self-Service Access",
                    desc: "Branded catalog for business users.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Segregation of Duties",
                    desc: "Simulate conflicts before they happen.",
                  },
                  {
                    icon: Sparkle,
                    title: "License Optimization",
                    desc: "Right-size SAP licenses automatically.",
                  },
                  {
                    icon: Key,
                    title: "Emergency Access",
                    desc: "Firefighter with policy-safe approvals.",
                  },
                ].map((f) => (
                  <div key={f.title} className="rounded-2xl border border-border bg-background p-4">
                    <f.icon className="size-5 text-primary" weight="duotone" />
                    <p className="mt-3 text-sm font-medium text-foreground">{f.title}</p>
                    <p className="mt-1 text-xs text-caption">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Stat kpi="50%" label="Reduction in tickets" />
                <Stat kpi="Days → Minutes" label="Provisioning" />
                <Stat kpi="100%" label="Audit ready" />
              </div>
            </div>
          </div>
        </aside>

        {/* Right — Login */}
        <section className="flex flex-col justify-between px-6 py-10 lg:col-span-2 lg:px-14">
          <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-between gap-12">
            <div className="flex items-center">
              <img src="/logo.png" alt="ToggleNow" className="h-8 w-auto object-contain" />
            </div>

            <div className="w-full">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-caption">
                Experience Center
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight whitespace-nowrap">
                Welcome to ToggleNow
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Explore enterprise SAP products for you.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-soft">
                {stage === "email" ? (
                  <form onSubmit={sendOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Your Name</label>
                      <input
                        type="text"
                        required
                        autoFocus
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setIsNameModified(true);
                        }}
                        placeholder="e.g. Sarah"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
                        style={{ borderRadius: 16 }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">
                        Work email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
                        style={{ borderRadius: 16 }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !email || !name}
                      className="btn-primary w-full disabled:opacity-60"
                    >
                      {loading ? "Sending code…" : "Continue"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={verifyOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-foreground">
                          One-time code
                        </label>
                        <button
                          type="button"
                          onClick={() => setStage("email")}
                          className="text-xs text-caption hover:text-foreground"
                        >
                          Change email
                        </button>
                      </div>
                      <input
                        inputMode="numeric"
                        autoFocus
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="6-digit code"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                        style={{ borderRadius: 16 }}
                      />
                    </div>
                    <p className="text-xs text-caption">
                      Sent to <span className="text-foreground">{email}</span>. Use any 6 digits for
                      the demo.
                    </p>
                    <button
                      type="submit"
                      disabled={loading || otp.length < 4}
                      className="btn-primary w-full disabled:opacity-60"
                    >
                      {loading ? "Verifying…" : "Verify & enter"}
                    </button>
                  </form>
                )}

                <ul className="mt-6 grid grid-cols-2 gap-3 text-xs text-caption">
                  {[
                    { icon: SealCheck, label: "SAP Certified Partner" },
                    { icon: LockSimple, label: "Secure session" },
                    { icon: ShieldCheck, label: "Private experience" },
                    { icon: Buildings, label: "Prepared for your company" },
                  ].map((t) => (
                    <li key={t.label} className="flex items-center gap-2">
                      <t.icon className="size-3.5 text-primary" weight="bold" />
                      {t.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-xs text-caption">
              © {new Date().getFullYear()} ToggleNow · SAP Security & Governance
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="font-display text-xl font-semibold text-foreground">{kpi}</p>
      <p className="mt-1 text-xs text-caption">{label}</p>
    </div>
  );
}

function ShowcaseIllustration() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const current = REVIEWS[index];

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 h-full max-w-xl mx-auto py-12 px-2">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(32,76,237,0.08),transparent_70%)]" />

      {/* Outer elegant container with perfect balance and visual hierarchy */}
      <div className="w-full relative min-h-[340px] flex flex-col justify-between rounded-3xl border border-border/80 bg-background/60 p-8 shadow-float backdrop-blur-sm">
        <div className="absolute top-6 right-6">
          <Quotes className="size-10 text-primary/10" weight="fill" />
        </div>

        <div className="relative overflow-hidden flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              {/* Star Rating & Stat Badge */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="size-4 text-amber-500" weight="fill" />
                  ))}
                </div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {current.stat}
                </span>
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-[17px] font-display font-medium leading-relaxed text-foreground tracking-tight md:text-[19px]">
                "{current.quote}"
              </blockquote>

              {/* Author details with elegant visual hierarchy */}
              <div className="flex items-center gap-3 mt-2 border-t border-border/50 pt-4">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary font-display font-semibold text-sm">
                  {current.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <cite className="not-italic text-sm font-semibold text-foreground block">
                    {current.author}
                  </cite>
                  <span className="text-xs text-caption block">
                    {current.role} ·{" "}
                    <strong className="font-medium text-muted-foreground">{current.company}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicator dots with progress bars */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-border focus:outline-none"
                style={{ width: isActive ? "32px" : "8px" }}
                aria-label={`Go to slide ${i + 1}`}
              >
                {isActive && (
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "0%" }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-primary w-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
