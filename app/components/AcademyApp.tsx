"use client";

import { useEffect, useMemo, useState } from "react";
import { chapters, courseSource } from "../data/course";
import { BrowserProgressStorage, createInitialProgress } from "../lib/progress-storage";
import type { CourseProgress } from "../types/course";
import { CourseRail } from "./CourseRail";
import { LessonPanel } from "./LessonPanel";
import { PracticeLab } from "./PracticeLab";
import { ProgressHeader } from "./ProgressHeader";
import { ProgressTools } from "./ProgressTools";
import { QuizPanel } from "./QuizPanel";
import { ServerDashboard } from "./ServerDashboard";

type LearningStage = "theory" | "quiz" | "practice";

const storage = new BrowserProgressStorage();
const initialProgress = createInitialProgress(chapters[0].id);

export function AcademyApp() {
  const [progress, setProgress] = useState<CourseProgress>(initialProgress);
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<LearningStage>("theory");
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setProgress(storage.load(initialProgress));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (hydrated) storage.save(progress);
  }, [progress, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const activeChapter = chapters.find((chapter) => chapter.id === progress.activeChapterId) ?? chapters[0];
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeChapter.id);
  const lessonIndex = progress.activeLessonByChapter[activeChapter.id] ?? 0;
  const theoryComplete = activeChapter.lessons.every((lesson) => progress.readLessonIds.includes(lesson.id));
  const quizPassed = progress.quizPassedChapters.includes(activeChapter.id);
  const practiceCompleted = progress.practiceCompletedChapters.includes(activeChapter.id);
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const correctAnswers = chapters.reduce((sum, chapter) => sum + chapter.quiz.filter((question) => progress.quizAnswers[question.id] === question.correctIndex).length, 0);
  const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.quiz.length, 0);
  const averageScore = Math.round((correctAnswers / totalQuestions) * 100);
  const totalProgress = Math.round(((progress.readLessonIds.length + progress.quizPassedChapters.length + progress.practiceCompletedChapters.length) / (totalLessons + chapters.length * 2)) * 100);
  const courseComplete = progress.completedChapters.length === chapters.length;

  const isChapterUnlocked = (index: number) => index === 0 || progress.completedChapters.includes(chapters[index - 1].id);

  const updateProgress = (updater: (current: CourseProgress) => CourseProgress) => {
    setProgress((current) => ({ ...updater(current), updatedAt: new Date().toISOString() }));
  };

  const stageStatus = useMemo(() => [
    { id: "theory" as const, label: "Lý thuyết", state: theoryComplete ? "complete" : "active" },
    { id: "quiz" as const, label: "Kiểm tra", state: quizPassed ? "complete" : theoryComplete ? "ready" : "locked" },
    { id: "practice" as const, label: "Thực hành", state: practiceCompleted ? "complete" : quizPassed ? "ready" : "locked" },
  ], [theoryComplete, quizPassed, practiceCompleted]);

  const selectChapter = (id: string) => {
    const index = chapters.findIndex((chapter) => chapter.id === id);
    if (!isChapterUnlocked(index)) return;
    updateProgress((current) => ({ ...current, activeChapterId: id }));
    setStage("theory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completePractice = () => {
    if (practiceCompleted) return;
    updateProgress((current) => {
      const practiceCompletedChapters = [...new Set([...current.practiceCompletedChapters, activeChapter.id])];
      const completedChapters = [...new Set([...current.completedChapters, activeChapter.id])];
      return { ...current, practiceCompletedChapters, completedChapters };
    });
    setToast(`Đã hoàn thành Chương ${activeChapter.number}.`);
  };

  const nextChapter = chapters[activeIndex + 1];

  return (
    <div className="academy-shell">
      <ProgressHeader
        chapterNumber={activeChapter.number}
        chapterTitle={activeChapter.shortTitle}
        completedChapters={progress.completedChapters.length}
        completedTasks={progress.practiceCompletedChapters.length}
        score={averageScore}
        totalProgress={totalProgress}
        onOpenTools={() => setToolsOpen(true)}
      />
      <CourseRail
        chapters={chapters}
        activeChapterId={activeChapter.id}
        completedChapterIds={progress.completedChapters}
        isChapterUnlocked={isChapterUnlocked}
        onSelect={selectChapter}
      />
      <main className="academy-main">
        <section className="academy-intro">
          <div className="academy-intro__copy">
            <span className="technical-label">ONE DASH ACADEMY / CHAPTER {String(activeChapter.number).padStart(2, "0")}</span>
            <h1>{activeChapter.title}</h1>
            <p>{activeChapter.description}</p>
          </div>
          <div className="chapter-progress-map" aria-label="Luồng học của chương">
            {stageStatus.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-state={item.state}
                data-active={stage === item.id || undefined}
                disabled={item.state === "locked"}
                onClick={() => setStage(item.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <small>{item.state === "complete" ? "Hoàn thành" : item.state === "locked" ? "Đang khóa" : item.state === "ready" ? "Đã mở" : "Đang học"}</small>
              </button>
            ))}
          </div>
        </section>

        {activeChapter.number === 1 && stage === "theory" && <ServerDashboard addedServers={progress.addedServers} />}

        <nav className="stage-tabs" aria-label="Phần học">
          {stageStatus.map((item) => (
            <button key={item.id} type="button" data-active={stage === item.id || undefined} disabled={item.state === "locked"} onClick={() => setStage(item.id)}>
              <span>{item.state === "complete" ? "✓" : item.state === "locked" ? "—" : "→"}</span>{item.label}
            </button>
          ))}
        </nav>

        {stage === "theory" && (
          <LessonPanel
            chapter={activeChapter}
            lessonIndex={lessonIndex}
            readLessonIds={progress.readLessonIds}
            onLessonIndexChange={(index) => updateProgress((current) => ({ ...current, activeLessonByChapter: { ...current.activeLessonByChapter, [activeChapter.id]: index } }))}
            onMarkRead={(lessonId) => {
              updateProgress((current) => ({ ...current, readLessonIds: [...new Set([...current.readLessonIds, lessonId])] }));
              const lastUnread = activeChapter.lessons.filter((lesson) => !progress.readLessonIds.includes(lesson.id)).length === 1;
              if (lastUnread) setToast("Đã mở khóa phần kiểm tra kiến thức.");
            }}
          />
        )}

        {stage === "quiz" && (
          <QuizPanel
            chapter={activeChapter}
            answers={progress.quizAnswers}
            unlocked={theoryComplete}
            passed={quizPassed}
            onAnswer={(questionId, answerIndex) => updateProgress((current) => ({ ...current, quizAnswers: { ...current.quizAnswers, [questionId]: answerIndex } }))}
            onRetry={(questionId) => updateProgress((current) => {
              const quizAnswers = { ...current.quizAnswers };
              delete quizAnswers[questionId];
              return { ...current, quizAnswers };
            })}
            onPass={() => {
              updateProgress((current) => ({ ...current, quizPassedChapters: [...new Set([...current.quizPassedChapters, activeChapter.id])] }));
              setToast("Đã mở khóa nhiệm vụ thực hành.");
              setStage("practice");
            }}
          />
        )}

        {stage === "practice" && (
          <PracticeLab
            chapter={activeChapter}
            unlocked={quizPassed}
            completed={practiceCompleted}
            addedServers={progress.addedServers}
            onAddServer={(name) => updateProgress((current) => ({ ...current, addedServers: [...new Set([...current.addedServers, name])] }))}
            onComplete={completePractice}
          />
        )}

        {practiceCompleted && (
          <section className="chapter-complete">
            <div><span>CHAPTER COMPLETE</span><h2>{activeChapter.shortTitle} đã hoàn thành.</h2></div>
            {nextChapter ? (
              <button className="button" type="button" onClick={() => selectChapter(nextChapter.id)}>Mở Chương {nextChapter.number}</button>
            ) : (
              <button className="button" type="button" onClick={() => setToolsOpen(true)}>Xem chứng nhận</button>
            )}
          </section>
        )}

        {courseComplete && (
          <section className="certificate" aria-label="Chứng nhận hoàn thành">
            <span>ONEDASH ACADEMY · CERTIFICATE</span>
            <h2>Đã hoàn thành lộ trình<br />quản trị server tập trung.</h2>
            <p>5 chương · 5 nhiệm vụ mô phỏng · {averageScore}% kiến thức đúng</p>
            <button className="button" type="button" onClick={() => window.print()}>In / lưu PDF</button>
          </section>
        )}

        <footer className="academy-footer">
          <p>OneDash Academy là môi trường đào tạo mô phỏng. Nội dung được biên soạn từ <a href={courseSource.href} target="_blank" rel="noreferrer">onedash.vn</a>, rà soát ngày {courseSource.reviewedAt}. Không có kết nối server thật.</p>
        </footer>
      </main>

      <aside className="learning-dock" aria-label="Điều hướng nhanh">
        <span className="learning-dock__score"><small>Nhiệm vụ</small><strong>{progress.practiceCompletedChapters.length}/5</strong></span>
        <div className="learning-dock__track" role="progressbar" aria-label={`Tổng tiến độ ${totalProgress}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={totalProgress}>
          <i style={{ transform: `scaleX(${totalProgress / 100})` }} />
          <span className="learning-dock__nodes" aria-hidden="true">
            {chapters.map((chapter) => (
              <b key={chapter.id} data-complete={progress.completedChapters.includes(chapter.id) || undefined} data-current={progress.activeChapterId === chapter.id || undefined} />
            ))}
          </span>
        </div>
        <button type="button" onClick={() => {
          if (!theoryComplete) setStage("theory");
          else if (!quizPassed) setStage("quiz");
          else setStage("practice");
        }}>Tiếp tục →</button>
      </aside>

      <ProgressTools
        open={toolsOpen}
        progress={progress}
        complete={courseComplete}
        onClose={() => setToolsOpen(false)}
        onImport={(imported) => { setProgress(imported); setToast("Đã khôi phục tiến độ từ file."); }}
        onReset={() => { storage.clear(); setProgress(createInitialProgress(chapters[0].id)); setStage("theory"); setToolsOpen(false); setToast("Đã đặt lại tiến độ trên trình duyệt này."); }}
      />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
