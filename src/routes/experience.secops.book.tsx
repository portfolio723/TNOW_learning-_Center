import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, ArrowLeft, Clock } from "lucide-react";
import { SectionHeader } from "@/components/StepNav";
import { useExperience } from "@/lib/experience-store";
import { CAPABILITIES, STORIES } from "@/lib/experience-data";

export const Route = createFileRoute("/experience/secops/book")({
  head: () => ({ meta: [{ title: "Book Workshop — SecOps Experience" }] }),
  component: BookPage,
});

function BookPage() {
  const {
    videosWatched,
    storiesRead,
    aiQuestionsAsked,
    capabilitiesViewed,
    complete,
    addAchievement,
  } = useExperience();
  const [notes, setNotes] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [customBooking, setCustomBooking] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [timezone, setTimezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "America/New_York";
    }
  });

  const navigate = useNavigate();

  const commonTimezones = [
    { value: "America/New_York", label: "US Eastern Time (EST/EDT)" },
    { value: "America/Chicago", label: "US Central Time (CST/CDT)" },
    { value: "America/Denver", label: "US Mountain Time (MST/MDT)" },
    { value: "America/Los_Angeles", label: "US Pacific Time (PST/PDT)" },
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  ];

  // Helper to generate next few business days
  const getUpcomingSlots = () => {
    const slotsList: string[] = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const current = new Date();
    let addedDays = 0;

    for (let i = 1; addedDays < 5 && i < 15; i++) {
      const nextDate = new Date(current);
      nextDate.setDate(current.getDate() + i);

      // Skip weekends for professional enterprise sales
      if (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
        continue;
      }

      addedDays++;
      const dayName = days[nextDate.getDay()];
      const monthName = months[nextDate.getMonth()];
      const dayNum = nextDate.getDate();
      const dateStr = `${dayName} · ${monthName} ${dayNum}`;

      // Standard professional times slots
      slotsList.push(`${dateStr} · 09:30`);
      slotsList.push(`${dateStr} · 11:00`);
      slotsList.push(`${dateStr} · 14:00`);
      slotsList.push(`${dateStr} · 15:30`);
    }
    return slotsList;
  };

  const allSlots = getUpcomingSlots();
  const visibleSlots = showMore ? allSlots.slice(0, 12) : allSlots.slice(0, 4);

  function schedule() {
    addAchievement("workshopReady");
    complete("book");
    navigate({ to: "/experience/secops/success" });
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDate && customTime) {
      // Format as "Mon · Jul 13 · 10:30"
      const d = new Date(customDate + "T" + customTime);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedSlot = `${days[d.getDay()]} · ${months[d.getMonth()]} ${d.getDate()} · ${customTime}`;
      setSlot(formattedSlot);
      setCustomBooking(false);
    }
  };

  return (
    <div className="lg:h-full lg:flex lg:flex-col lg:justify-between">
      <div>
        <SectionHeader
          eyebrow="Step 6 · Book Workshop"
          title="Let's tailor a workshop for your team"
          description="A 45-minute working session with a SecOps consultant, shaped by everything you've explored."
        />

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Pick a Time (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="border border-[#E3EBFF] bg-gradient-to-b from-[#FCFDFF] to-[#F7FAFF] p-6 lg:p-5.5 shadow-[0_12px_40px_rgba(32,76,237,0.05)]"
              style={{ borderRadius: 20 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-3">
                <div>
                  <p className="font-display text-base font-semibold">Pick a time</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Select from our available consultant times
                  </p>
                </div>

                {/* Timezone Selector */}
                <div className="flex flex-col gap-0.5">
                  <label
                    htmlFor="tz-select"
                    className="text-[9px] font-semibold text-caption uppercase tracking-wider"
                  >
                    Timezone
                  </label>
                  <select
                    id="tz-select"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="rounded-lg border border-border bg-background px-2 py-0.5 text-[11px] text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/25"
                  >
                    {commonTimezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {customBooking ? (
                <form
                  onSubmit={handleCustomSubmit}
                  className="mt-4 space-y-3 rounded-2xl bg-card p-4 border border-border"
                >
                  <p className="font-display text-xs font-semibold">Request a custom date & time</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-semibold text-caption uppercase tracking-wider block mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-semibold text-caption uppercase tracking-wider block mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setCustomBooking(false)}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold hover:bg-surface"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold hover:bg-primary-hover"
                    >
                      Confirm Custom Time
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {visibleSlots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className={`border px-4.5 py-3.5 text-left text-xs transition-all duration-[150ms] ease-out ${
                          slot === s
                            ? "border-primary/70 bg-gradient-to-b from-[#F3F7FF] to-[#EDF4FF] text-primary shadow-[0_4px_15px_rgba(32,76,237,0.04)] font-medium"
                            : "border-[#E3EBFF] bg-white text-foreground hover:border-primary/40 hover:bg-[#FDFEFF]"
                        }`}
                        style={{ borderRadius: 16 }}
                      >
                        <span className="font-semibold block text-[13px]">{s}</span>
                        <span className="block text-[10px] text-muted-foreground mt-0.5">
                          Consultant available
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/30">
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      {showMore ? "Show fewer times" : "Show more times..."}
                    </button>
                    <button
                      onClick={() => setCustomBooking(true)}
                      className="text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                    >
                      Request custom time
                    </button>
                  </div>
                </>
              )}

              {slot && (
                <div className="mt-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                      Selected slot
                    </p>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{slot}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Times in{" "}
                    {commonTimezones.find((t) => t.value === timezone)?.label.split(" (")[0] ||
                      timezone}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Focus Notes + Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              className="border border-[#E3EBFF] bg-gradient-to-b from-[#FCFDFF] to-[#F7FAFF] p-6 lg:p-5.5 shadow-[0_12px_40px_rgba(32,76,237,0.05)]"
              style={{ borderRadius: 20 }}
            >
              <label className="font-display text-sm font-semibold">
                What should our consultant focus on?
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="e.g. Migration from SAP GRC, S/4 rollout, license optimization..."
                className="mt-3.5 w-full rounded-xl border border-[#E3EBFF] bg-white px-3.5 py-2.5 text-xs outline-none placeholder:text-caption focus:border-[#204CED] focus:ring-2 focus:ring-[#204CED]/15 transition-all duration-200 resize-none"
                style={{ borderRadius: 12 }}
              />
            </div>

            <div className="flex items-center justify-between px-1 pr-16 md:pr-44">
              <button
                onClick={() => navigate({ to: "/experience/secops/ai" })}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium"
              >
                <ArrowLeft className="size-3.5" /> Back to AI
              </button>
              <button
                onClick={schedule}
                disabled={!slot}
                className="btn-primary disabled:opacity-60 text-xs py-2 px-4.5 h-10"
              >
                <CalendarCheck className="size-3.5" /> Schedule Workshop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-display text-base font-semibold text-foreground tabular-nums">
        {value}
      </span>
    </li>
  );
}
