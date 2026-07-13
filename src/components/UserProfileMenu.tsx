import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useExperience } from "@/lib/experience-store";
import { User, Mail, Users, CreditCard, HelpCircle, LogOut } from "lucide-react";

export function UserProfileMenu() {
  const user = useExperience((s) => s.user);
  const reset = useExperience((s) => s.reset);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex size-8 items-center justify-center rounded-full hover:bg-muted dark:hover:bg-surface border border-border transition-all active:scale-95 focus:outline-none cursor-pointer"
      >
        <div className="grid size-full place-items-center rounded-full bg-[#204CED]/10 text-[#204CED] font-display font-semibold text-xs border border-[#204CED]/20 hover:bg-[#204CED]/15 transition-colors">
          {initials || "U"}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-[24px] border border-border bg-card p-2 shadow-float animate-in fade-in slide-in-from-top-1 duration-150 z-50">
          {/* User Info / Profile Item (Highlighted styled block like in reference image) */}
          <div className="flex items-center gap-3 rounded-xl px-3.5 py-3 bg-muted/60 dark:bg-surface/60 border border-border/10 mb-1">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#204CED]/10 text-[#204CED] font-semibold text-sm border border-[#204CED]/20">
              <User className="size-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                <Mail className="size-3 text-muted-foreground/80 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="space-y-0.5">
            {/* Community */}
            <button className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 hover:bg-muted/50 dark:hover:bg-surface/50 transition duration-150 text-left cursor-pointer group">
              <div className="flex items-center gap-3">
                <Users className="size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[13px] font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                  Community
                </span>
              </div>
              <span className="text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-full">
                Active
              </span>
            </button>

            {/* Subscription */}
            <button className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 hover:bg-muted/50 dark:hover:bg-surface/50 transition duration-150 text-left cursor-pointer group">
              <div className="flex items-center gap-3">
                <CreditCard className="size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[13px] font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                  Subscription
                </span>
              </div>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-pink-100 dark:bg-pink-950/40 px-2 py-0.5 text-[10px] font-bold text-pink-700 dark:text-pink-400 border border-pink-200/50">
                ⚡ PRO
              </span>
            </button>

            {/* Separator Line */}
            <div className="border-t border-border/50 my-1.5" />

            {/* Help Center */}
            <button className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 hover:bg-muted/50 dark:hover:bg-surface/50 transition duration-150 text-left cursor-pointer group">
              <HelpCircle className="size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-[13px] font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                Help Center
              </span>
            </button>

            {/* Sign Out */}
            <button
              onClick={() => {
                reset();
                navigate({ to: "/login" });
              }}
              className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 hover:bg-red-500/5 transition duration-150 text-left text-red-500 cursor-pointer group"
            >
              <LogOut className="size-4.5 text-red-500 group-hover:scale-105 transition-transform" />
              <span className="text-[13px] font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
