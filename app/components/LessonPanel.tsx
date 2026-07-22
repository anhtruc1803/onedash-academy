import type { Chapter } from "../types/course";

type LessonPanelProps = {
  chapter: Chapter;
  lessonIndex: number;
  readLessonIds: string[];
  onLessonIndexChange: (index: number) => void;
  onMarkRead: (lessonId: string) => void;
  onStartQuiz: () => void;
};

export function LessonPanel({
  chapter,
  lessonIndex,
  readLessonIds,
  onLessonIndexChange,
  onMarkRead,
  onStartQuiz,
}: LessonPanelProps) {
  const lesson = chapter.lessons[lessonIndex];
  const isRead = readLessonIds.includes(lesson.id);
  const allRead = chapter.lessons.every((item) => readLessonIds.includes(item.id));
  const isLastLesson = lessonIndex === chapter.lessons.length - 1;

  return (
    <section className="learning-panel" aria-labelledby="lesson-title">
      <div className="lesson-index" aria-label="Danh sách bài lý thuyết">
        {chapter.lessons.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className="lesson-index__item"
            data-active={index === lessonIndex || undefined}
            onClick={() => onLessonIndexChange(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <b aria-label={readLessonIds.includes(item.id) ? "Đã đọc" : "Chưa đọc"}>{readLessonIds.includes(item.id) ? "✓" : "○"}</b>
          </button>
        ))}
      </div>
      <article className="lesson-sheet">
        <div className="lesson-sheet__meta">
          <span>Bài {lessonIndex + 1}/{chapter.lessons.length}</span>
          <span>{isRead ? "Đã đánh dấu đọc" : "Chưa đánh dấu"}</span>
        </div>
        <h2 id="lesson-title">{lesson.title}</h2>
        <p className="lesson-sheet__summary">{lesson.summary}</p>
        {lesson.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {lesson.example && (
          <aside className="example-block">
            <strong>Tình huống</strong>
            <p>{lesson.example}</p>
          </aside>
        )}
        {lesson.note && (
          <aside className="note-block">
            <strong>Ghi chú quan trọng</strong>
            <p>{lesson.note}</p>
          </aside>
        )}
        <div className="lesson-actions">
          <button className="button button--quiet" type="button" disabled={lessonIndex === 0} onClick={() => onLessonIndexChange(lessonIndex - 1)}>Bài trước</button>
          <button className="button" type="button" disabled={isRead} onClick={() => onMarkRead(lesson.id)}>{isRead ? "Đã đọc" : "Đánh dấu đã đọc"}</button>
          {isLastLesson && allRead ? (
            <button className="button" type="button" onClick={onStartQuiz}>Kiểm tra →</button>
          ) : (
            <button className="button button--quiet" type="button" disabled={isLastLesson} onClick={() => onLessonIndexChange(lessonIndex + 1)}>Bài sau</button>
          )}
        </div>
        {allRead && <p className="unlock-message" role="status">Lý thuyết đã hoàn thành. Phần kiểm tra đã mở khóa.</p>}
      </article>
      <aside className="chapter-reference">
        <div>
          <strong>Mục tiêu học tập</strong>
          <ul>{chapter.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
        </div>
        <div>
          <strong>Checklist cần nhớ</strong>
          <ul>{chapter.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="chapter-reference__scenario">
          <strong>Ca thực tế</strong>
          <p>{chapter.scenario}</p>
        </div>
        <p className="chapter-reference__note"><b>Lưu ý:</b> {chapter.importantNote}</p>
      </aside>
    </section>
  );
}
