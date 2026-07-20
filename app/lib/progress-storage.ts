import type { CourseProgress } from "../types/course";

export const PROGRESS_KEY = "onedash-academy.progress.v1";

export function createInitialProgress(firstChapterId: string): CourseProgress {
  return {
    version: 1,
    activeChapterId: firstChapterId,
    activeLessonByChapter: {},
    readLessonIds: [],
    quizAnswers: {},
    quizPassedChapters: [],
    practiceCompletedChapters: [],
    completedChapters: [],
    addedServers: [],
    updatedAt: new Date().toISOString(),
  };
}

export interface ProgressStorage {
  load(fallback: CourseProgress): CourseProgress;
  save(progress: CourseProgress): void;
  clear(): void;
}

export class BrowserProgressStorage implements ProgressStorage {
  load(fallback: CourseProgress): CourseProgress {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw) as Partial<CourseProgress>;
      if (parsed.version !== 1 || !Array.isArray(parsed.readLessonIds)) return fallback;
      return { ...fallback, ...parsed } as CourseProgress;
    } catch {
      return fallback;
    }
  }

  save(progress: CourseProgress): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ ...progress, updatedAt: new Date().toISOString() }),
    );
  }

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(PROGRESS_KEY);
  }
}

export function isCourseProgress(value: unknown): value is CourseProgress {
  if (!value || typeof value !== "object") return false;
  const progress = value as Partial<CourseProgress>;
  return (
    progress.version === 1 &&
    typeof progress.activeChapterId === "string" &&
    Array.isArray(progress.readLessonIds) &&
    Array.isArray(progress.quizPassedChapters) &&
    Array.isArray(progress.practiceCompletedChapters) &&
    Array.isArray(progress.completedChapters)
  );
}

