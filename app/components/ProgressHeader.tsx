type ProgressHeaderProps = {
  chapterNumber: number;
  chapterTitle: string;
  completedChapters: number;
  completedTasks: number;
  score: number;
  totalProgress: number;
  onOpenTools: () => void;
};

export function ProgressHeader({
  chapterNumber,
  chapterTitle,
  completedChapters,
  completedTasks,
  score,
  totalProgress,
  onOpenTools,
}: ProgressHeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar__identity">
        <span className="wordmark">OneDash<span aria-hidden="true">•</span>Academy</span>
        <span className="topbar__chapter">Chương {chapterNumber} · {chapterTitle}</span>
      </div>
      <dl className="topbar__stats" aria-label="Tiến độ khóa học">
        <div><dt>Chương</dt><dd>{completedChapters}/5</dd></div>
        <div><dt>Nhiệm vụ</dt><dd>{completedTasks}/5</dd></div>
        <div><dt>Điểm</dt><dd>{score}%</dd></div>
      </dl>
      <button className="button button--quiet topbar__tools" type="button" onClick={onOpenTools}>
        Dữ liệu học
      </button>
      <div className="topbar__progress" aria-label={`Tổng tiến độ ${totalProgress}%`}>
        <span style={{ transform: `scaleX(${totalProgress / 100})` }} />
      </div>
    </header>
  );
}

