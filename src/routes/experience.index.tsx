import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MagnifyingGlass,
  ArrowRight,
  Clock,
  Lightning,
  SignOut,
  ShieldCheck,
  Fire,
  ListChecks,
  Gauge,
  Robot,
  X,
  EnvelopeSimple,
  Cpu,
  Coins,
  TrendUp,
  CheckCircle,
} from "@phosphor-icons/react";
import { PRODUCTS, INDUSTRIES } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";
import { UserProfileMenu } from "@/components/UserProfileMenu";

export const Route = createFileRoute("/experience/")({
  head: () => ({
    meta: [
      { title: "Choose your experience — ToggleNow" },
      {
        name: "description",
        content:
          "Choose the SAP Security & Governance product most relevant to your organization and launch a guided 10–15 minute experience.",
      },
    ],
  }),
  component: ProductSelection,
});

const PRODUCT_TEASERS: Record<
  string,
  {
    tagline: string;
    description: string;
    features: string[];
    metrics: { value: string; label: string }[];
    architecture: string[];
    timeline: string;
  }
> = {
  fftrust: {
    tagline: "Firefighter access with zero blind spots.",
    description:
      "FF Trust introduces AI-driven risk classification and session replay logs for privileged firefighters. Traditional logs are millions of lines of raw transactions; FF Trust aggregates, scores, and isolates high-risk actions instantly.",
    features: [
      "Continuous Session Video & Transaction Recording",
      "Dynamic Risk Scoring (Low / Medium / High)",
      "Automated Security Log Correlation (SM20, CDHDR, DBTABLOG)",
      "Instant Deviation Alerts for anomalous firefighter behavior",
    ],
    metrics: [
      { value: "0", label: "Undetected privileged mutations" },
      { value: "98%", label: "Faster audit reviews of firefighter logs" },
      { value: "< 2 min", label: "Mean time to detect privileged policy deviations" },
    ],
    architecture: [
      "SAP certified RFC integrations",
      "Low-footprint Basis agent with zero performance impact",
      "Military-grade log encryption and compression",
    ],
    timeline: "Launching Q4 2026",
  },
  reviewnow: {
    tagline: "Access recertification without the spreadsheets.",
    description:
      "ReviewNow automates the tedious, manual periodic user access reviews (UAR). Instead of sending thousands of spreadsheets to business managers, launch structured, self-service recertification campaigns with context-aware role recommendations.",
    features: [
      "Self-service Manager Attestation Portal",
      "Smart Role Recommendations based on actual transaction usage",
      "Automated standard GRC compliance trails",
      "One-click remediation & deprovisioning of revoked access",
    ],
    metrics: [
      { value: "90%", label: "Reduction in access review administrative hours" },
      { value: "100%", label: "Audit-ready GRC signing trails" },
      { value: "4.8x", label: "Increase in business owner completion rates" },
    ],
    architecture: [
      "SaaS / Private Cloud control plane",
      "OData and RFC connectivity to SAP landscapes",
      "AD / Microsoft Entra ID hybrid sync support",
    ],
    timeline: "Beta launching Q1 2027",
  },
  gams360: {
    tagline: "Governance, Access & Monitoring, unified.",
    description:
      "GAMS360 provides a single, unified executive pane of glass across your entire SAP ecosystem (including ECC, S/4HANA, SuccessFactors, and BTP). Monitor SoD risk density, licensing costs, and critical system configuration drift in one place.",
    features: [
      "Unified GRC Dashboard across heterogeneous SAP systems",
      "Continuous Configuration Drift & Patch level monitoring",
      "Executive Financial & Operational Licensing reports",
      "Cross-system Segregation of Duties (SoD) analysis",
    ],
    metrics: [
      { value: "Single Pane", label: "For ECC, S/4, SuccessFactors, and BTP" },
      { value: "$300k+", label: "Average annual license clawback identification" },
      { value: "Real-Time", label: "Security posture monitoring and alerts" },
    ],
    architecture: [
      "Multi-tenant or Single-tenant private instance",
      "Secure HTTPS Rest Gateway connections",
      "Integrates with SAP Solution Manager and Focus Run",
    ],
    timeline: "Launching Q2 2027",
  },
  digybots: {
    tagline: "Intelligent bots for SAP operations.",
    description:
      "Digybots are fully secure, audit-compliant digital assistants that automate repetitive Basis administration chores. From system health-checks and buffer monitoring to safe password resets, let Digybots handle the toil while maintaining full audit logs.",
    features: [
      "Automated Daily Basis Checklist execution",
      "Intelligent User Lockout Assistance and Verification",
      "Buffer, Database & Lock table anomaly detection",
      "Policy-safe automated database expansion approvals",
    ],
    metrics: [
      { value: "85%", label: "Fewer manual password reset tickets" },
      { value: "10 min", label: "SAP system daily health-check completion" },
      { value: "0", label: "Human administrative errors during emergency restarts" },
    ],
    architecture: [
      "Encrypted credential vault integration",
      "Standard SAP GUI and SAP GUI scripting compatibility",
      "Adheres strictly to SAP security note standards",
    ],
    timeline: "Developer Preview Q3 2026",
  },
};

function ProductSelection() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [selectedTeaserId, setSelectedTeaserId] = useState<string | null>(null);
  const [teaserTab, setTeaserTab] = useState<"overview" | "features" | "architecture">("overview");
  const [teaserRequested, setTeaserRequested] = useState<Record<string, boolean>>({});
  const [requestLoading, setRequestLoading] = useState(false);

  const user = useExperience((s) => s.user);
  const reset = useExperience((s) => s.reset);

  const handleCardClick = (productId: string, available: boolean) => {
    if (!available) {
      setSelectedTeaserId(productId);
      setTeaserTab("overview");
    }
  };

  const handleRequestPriority = () => {
    if (!selectedTeaserId) return;
    setRequestLoading(true);
    setTimeout(() => {
      setTeaserRequested((prev) => ({ ...prev, [selectedTeaserId]: true }));
      setRequestLoading(false);
    }, 600);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedTeaserId);
  const teaserData = selectedTeaserId ? PRODUCT_TEASERS[selectedTeaserId] : null;

  const filtered = PRODUCTS.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());

    // Optional industry filter - SecOps is suitable for all, but let's make it look responsive
    if (industry) {
      return matchesQuery;
    }
    return matchesQuery;
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/experience" className="flex items-center">
            <img src="/logo.png" alt="ToggleNow" className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <UserProfileMenu />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-xs font-medium uppercase tracking-widest text-caption">
          Step 1 of 2 · Choose your product
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
          Choose your experience
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-muted-foreground">
          Explore the SAP solution most relevant to your organization. Every experience takes 10–15
          minutes and ends with a workshop tailored to you.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <MagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-caption" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full rounded-2xl border border-border bg-background py-3 pl-11 pr-4 text-[15px] outline-none placeholder:text-caption focus:border-primary focus:ring-2 focus:ring-primary/15"
              style={{ borderRadius: 16 }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <button
                key={i}
                onClick={() => setIndustry(industry === i ? null : i)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  industry === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => handleCardClick(p.id, p.status === "available")}
            />
          ))}
        </div>
      </section>

      {/* Teaser Detail Modal */}
      {selectedTeaserId && selectedProduct && teaserData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-float overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            style={{ borderRadius: 24 }}
          >
            {/* Top Close */}
            <button
              onClick={() => setSelectedTeaserId(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-surface border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close Preview"
            >
              <X className="size-4" weight="bold" />
            </button>

            {/* Product Header */}
            <div className="flex items-start gap-4 pr-10 border-b border-border/60 pb-5">
              <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                {getProductIcon(selectedProduct.id)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-bold">{selectedProduct.name}</h2>
                  <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-[10px] font-bold text-caption uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm font-semibold text-primary mt-1">{teaserData.tagline}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Target timeline: {teaserData.timeline}
                </p>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="mt-5 inline-flex w-full border-b border-border/40 gap-6">
              {[
                { id: "overview", label: "Product Overview" },
                { id: "features", label: "Features & ROI Metrics" },
                { id: "architecture", label: "Integration & Tech" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTeaserTab(tab.id as "overview" | "features" | "architecture")}
                  className={`pb-3 text-sm font-semibold transition-all relative ${
                    teaserTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="mt-5 min-h-[190px] py-1 text-sm text-foreground">
              {teaserTab === "overview" && (
                <div className="space-y-4">
                  <p className="leading-relaxed text-muted-foreground">{teaserData.description}</p>
                  <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Interactive Roadmap Note
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We are currently engineering this module with several early-adopter Global
                      2000 partners. Register your priority interest below to coordinate a custom
                      briefing session.
                    </p>
                  </div>
                </div>
              )}

              {teaserTab === "features" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    {teaserData.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border bg-background p-3.5 text-center"
                      >
                        <p className="font-display text-lg font-bold text-foreground">{m.value}</p>
                        <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-caption mb-2">
                      Key Core Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {teaserData.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-muted-foreground bg-surface-alt p-2 rounded-xl border border-border/30"
                        >
                          <span className="text-primary font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {teaserTab === "architecture" && (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground">
                    ToggleNow modules are designed to run alongside standard SAP Basis structures
                    with absolute safety and compliance integrity:
                  </p>
                  <div className="space-y-2">
                    {teaserData.architecture.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3"
                      >
                        <div className="p-1 rounded bg-primary/10 text-primary mt-0.5">
                          <Cpu className="size-4" weight="fill" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Form Action */}
            <div className="mt-6 border-t border-border/60 pt-5 flex items-center justify-between">
              <div>
                {user && (
                  <p className="text-xs text-muted-foreground">
                    Briefing notifications will be sent to:{" "}
                    <strong className="text-foreground">{user.email}</strong>
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTeaserId(null)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-surface transition-colors"
                >
                  Close Preview
                </button>
                {teaserRequested[selectedTeaserId] ? (
                  <button
                    disabled
                    className="rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <CheckCircle className="size-4" weight="fill" /> On Priority List
                  </button>
                ) : (
                  <button
                    onClick={handleRequestPriority}
                    disabled={requestLoading}
                    className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold hover:bg-primary-hover transition-all flex items-center gap-1.5"
                  >
                    <EnvelopeSimple className="size-4" weight="fill" />{" "}
                    {requestLoading ? "Registering..." : "Request Priority Access"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function getProductIcon(id: string) {
  switch (id) {
    case "secops":
      return <ShieldCheck className="size-5" weight="duotone" />;
    case "fftrust":
      return <Fire className="size-5" weight="duotone" />;
    case "reviewnow":
      return <ListChecks className="size-5" weight="duotone" />;
    case "gams360":
      return <Gauge className="size-5" weight="duotone" />;
    case "digybots":
      return <Robot className="size-5" weight="duotone" />;
    default:
      return <Lightning className="size-5" weight="duotone" />;
  }
}

function ProductCard({
  product,
  onClick,
}: {
  product: (typeof PRODUCTS)[number];
  onClick: () => void;
}) {
  const available = product.status === "available";
  const body = (
    <article
      className={`group relative flex h-full flex-col rounded-3xl border bg-card p-6 transition-all duration-200 ${
        available
          ? "border-border hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevate cursor-pointer"
          : "border-border hover:border-primary/25 bg-card/90 cursor-pointer"
      }`}
      style={{ borderRadius: 20 }}
    >
      <div className="flex items-start justify-between">
        <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          {getProductIcon(product.id)}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
            available ? "bg-primary/10 text-primary" : "bg-foreground/5 text-caption"
          }`}
        >
          {available ? "Available" : "Coming soon"}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{product.name}</h3>
      <p className="mt-1 text-sm font-medium text-foreground/80">{product.tagline}</p>
      <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {product.capabilities.map((c) => (
          <li
            key={c}
            className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
          >
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="inline-flex items-center gap-1.5 text-xs text-caption">
          <Clock className="size-3.5" /> {product.time}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${
            available ? "text-primary" : "text-caption group-hover:text-primary transition-colors"
          }`}
        >
          {product.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );

  if (!available) {
    return (
      <div onClick={onClick} className="block h-full">
        {body}
      </div>
    );
  }
  return (
    <Link to="/experience/secops" className="block h-full">
      {body}
    </Link>
  );
}
