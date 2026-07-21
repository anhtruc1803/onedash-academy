import type { Chapter } from "../types/course";

type CourseRailProps = {
  chapters: Chapter[];
  activeChapterId: string;
  completedChapterIds: string[];
  isChapterUnlocked: (index: number) => boolean;
  onSelect: (id: string) => void;
};

export function CourseRail({
  chapters,
  activeChapterId,
  completedChapterIds,
  isChapterUnlocked,
  onSelect,
}: CourseRailProps) {
  return (
    <aside className="course-rail" aria-label="Mục lục khóa học">
      <div className="course-rail__intro">
        <span className="course-rail__label">Lộ trình / 05 chương</span>
        <strong className="course-rail__wordmark"><span>OneDash</span><span>Academy</span></strong>
        <p>Học OneDash qua năm nhiệm vụ.</p>
      </div>
      <ol className="course-rail__list">
        {chapters.map((chapter, index) => {
          const unlocked = isChapterUnlocked(index);
          const complete = completedChapterIds.includes(chapter.id);
          const active = chapter.id === activeChapterId;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                className="chapter-link"
                data-active={active || undefined}
                data-complete={complete || undefined}
                disabled={!unlocked}
                aria-current={active ? "step" : undefined}
                onClick={() => onSelect(chapter.id)}
              >
                <span className="chapter-link__number">{String(chapter.number).padStart(2, "0")}</span>
                <span className="chapter-link__copy">
                  <strong>{chapter.shortTitle}</strong>
                  <small>{complete ? "Hoàn thành" : unlocked ? "Sẵn sàng" : "Đang khóa"}</small>
                </span>
                <span className="chapter-link__state" aria-hidden="true">{complete ? "✓" : unlocked ? "→" : "—"}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="local-note">
        <strong>Chỉ lưu trên trình duyệt này</strong>
        <p>Xóa dữ liệu trình duyệt hoặc đổi thiết bị có thể làm mất tiến độ.</p>
      </div>
    </aside>
  );
}
