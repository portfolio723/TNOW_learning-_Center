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
} from "@phosphor-icons/react";
import { PRODUCTS, INDUSTRIES } from "@/lib/experience-data";
import { useExperience } from "@/lib/experience-store";

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

function ProductSelection() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const user = useExperience((s) => s.user);
  const reset = useExperience((s) => s.reset);

  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/experience" className="flex items-center">
            <img src="/logo.png" alt="ToggleNow" className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            {user && (
              <span className="text-caption">
                Signed in as <span className="text-foreground">{user.name}</span>
              </span>
            )}
            <Link
              to="/login"
              onClick={() => reset()}
              className="inline-flex items-center gap-1.5 text-caption hover:text-foreground"
            >
              <SignOut className="size-3.5" weight="bold" /> Exit
            </Link>
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
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
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

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const available = product.status === "available";
  const body = (
    <article
      className={`group relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-200 ${
        available
          ? "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevate"
          : "opacity-90"
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
            available ? "text-primary" : "text-caption"
          }`}
        >
          {product.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );

  if (!available) return body;
  return (
    <Link to="/experience/secops" className="block">
      {body}
    </Link>
  );
}
