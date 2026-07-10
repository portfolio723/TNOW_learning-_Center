import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StepId = "welcome" | "why" | "tour" | "stories" | "ai" | "book";

export const STEPS: { id: StepId; label: string; path: string }[] = [
  { id: "welcome", label: "Welcome", path: "/experience/secops" },
  { id: "why", label: "Why SecOps", path: "/experience/secops/why" },
  { id: "tour", label: "Product Tour", path: "/experience/secops/tour" },
  { id: "stories", label: "Customer Stories", path: "/experience/secops/stories" },
  { id: "ai", label: "AI Expert", path: "/experience/secops/ai" },
  { id: "book", label: "Book Workshop", path: "/experience/secops/book" },
];

type State = {
  user: { name: string; email: string } | null;
  completed: Record<StepId, boolean>;
  capabilitiesViewed: string[];
  storiesRead: string[];
  aiQuestionsAsked: number;
  videosWatched: number;
  achievements: string[];
  setUser: (u: { name: string; email: string }) => void;
  complete: (id: StepId) => void;
  markCapability: (id: string) => void;
  markStory: (id: string) => void;
  incAi: () => void;
  incVideos: () => void;
  addAchievement: (a: string) => void;
  reset: () => void;
};

export const useExperience = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      completed: {
        welcome: false,
        why: false,
        tour: false,
        stories: false,
        ai: false,
        book: false,
      },
      capabilitiesViewed: [],
      storiesRead: [],
      aiQuestionsAsked: 0,
      videosWatched: 0,
      achievements: [],
      setUser: (user) => set({ user }),
      complete: (id) =>
        set((s) => {
          if (id === "tour") {
            const allDone = s.capabilitiesViewed.length === 6;
            return {
              completed: {
                ...s.completed,
                tour: allDone,
              },
            };
          }
          return { completed: { ...s.completed, [id]: true } };
        }),
      markCapability: (id) =>
        set((s) => {
          const nextViewed = s.capabilitiesViewed.includes(id)
            ? s.capabilitiesViewed
            : [...s.capabilitiesViewed, id];
          const isTourDone = nextViewed.length === 6;
          return {
            capabilitiesViewed: nextViewed,
            completed: {
              ...s.completed,
              tour: isTourDone,
            },
          };
        }),
      markStory: (id) =>
        set((s) => ({
          storiesRead: s.storiesRead.includes(id) ? s.storiesRead : [...s.storiesRead, id],
        })),
      incAi: () => set((s) => ({ aiQuestionsAsked: s.aiQuestionsAsked + 1 })),
      incVideos: () => set((s) => ({ videosWatched: s.videosWatched + 1 })),
      addAchievement: (a) =>
        set((s) => ({
          achievements: s.achievements.includes(a) ? s.achievements : [...s.achievements, a],
        })),
      reset: () =>
        set({
          user: null,
          completed: {
            welcome: false,
            why: false,
            tour: false,
            stories: false,
            ai: false,
            book: false,
          },
          capabilitiesViewed: [],
          storiesRead: [],
          aiQuestionsAsked: 0,
          videosWatched: 0,
          achievements: [],
        }),
    }),
    { name: "togglenow-experience" },
  ),
);

export function useProgress(pathname?: string) {
  const completed = useExperience((s) => s.completed);
  const total = STEPS.length;

  const done = STEPS.filter((s) => completed[s.id]).length;
  return { done, total, pct: Math.round((done / total) * 100) };
}
