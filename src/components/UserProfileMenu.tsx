import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SignOut } from "@phosphor-icons/react";
import { useExperience } from "@/lib/experience-store";

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
      <button
        onClick={() => setOpen(!open)}
        className="flex size-8 items-center justify-center rounded-full hover:bg-surface border border-border transition-all active:scale-95 focus:outline-none cursor-pointer"
      >
        <div className="grid size-full place-items-center rounded-full bg-primary/10 text-primary font-display font-semibold text-xs border border-primary/20">
          {initials || "U"}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-card p-2 shadow-float animate-in fade-in slide-in-from-top-1 duration-150 z-50">
          <div className="px-3 py-2 border-b border-border/50">
            <p className="text-[10px] text-caption font-bold uppercase tracking-wider">
              Signed in as
            </p>
            <p className="text-sm font-semibold text-foreground truncate mt-0.5">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              reset();
              navigate({ to: "/login" });
            }}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/5 transition text-left mt-1 cursor-pointer"
          >
            <SignOut className="size-4 font-bold" /> Sign out / Exit
          </button>
        </div>
      )}
    </div>
  );
}
