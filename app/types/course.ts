export type Lesson = {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  example?: string;
  note?: string;
};

export type QuizOption = {
  label: string;
  rationale: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctIndex: number;
};

export type PracticeDefinition = {
  title: string;
  brief: string;
  success: string;
};

export type Chapter = {
  id: string;
  number: number;
  shortTitle: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
  scenario: string;
  importantNote: string;
  checklist: string[];
  quiz: QuizQuestion[];
  practice: PracticeDefinition;
};

export type CourseProgress = {
  version: 1;
  activeChapterId: string;
  activeLessonByChapter: Record<string, number>;
  readLessonIds: string[];
  quizAnswers: Record<string, number>;
  quizPassedChapters: string[];
  practiceCompletedChapters: string[];
  completedChapters: string[];
  addedServers: string[];
  updatedAt: string;
};

