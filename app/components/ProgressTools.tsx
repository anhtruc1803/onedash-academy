import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { CourseProgress } from "../types/course";
import { isCourseProgress } from "../lib/progress-storage";

type ProgressToolsProps = {
  open: boolean;
  progress: CourseProgress;
  complete: boolean;
  onClose: () => void;
  onImport: (progress: CourseProgress) => void;
  onReset: () => void;
};

export function ProgressTools({ open, progress, complete, onClose, onImport, onReset }: ProgressToolsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  if (!open) return null;

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "onedash-academy-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Đã xuất file tiến độ.");
  };

  const importProgress = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      if (!isCourseProgress(parsed)) throw new Error("invalid");
      onImport(parsed);
      setMessage("Đã nhập tiến độ hợp lệ.");
    } catch {
      setMessage("File không đúng định dạng tiến độ OneDash Academy.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="tools-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="tools-panel" role="dialog" aria-modal="true" aria-labelledby="tools-title">
        <button className="tools-panel__close" type="button" aria-label="Đóng bảng dữ liệu học" onClick={onClose}>×</button>
        <span>LOCAL PROGRESS / V1</span>
        <h2 id="tools-title">Dữ liệu học trên thiết bị</h2>
        <p>Tiến độ hiện chỉ lưu trong trình duyệt này. Hãy xuất JSON nếu bạn muốn sao lưu hoặc chuyển thiết bị.</p>
        <dl className="tools-summary">
          <div><dt>Bài đã đọc</dt><dd>{progress.readLessonIds.length}</dd></div>
          <div><dt>Quiz đã qua</dt><dd>{progress.quizPassedChapters.length}/5</dd></div>
          <div><dt>Nhiệm vụ</dt><dd>{progress.practiceCompletedChapters.length}/5</dd></div>
        </dl>
        <div className="tools-actions">
          <button className="button" type="button" onClick={exportProgress}>Xuất JSON</button>
          <button className="button button--quiet" type="button" onClick={() => inputRef.current?.click()}>Nhập JSON</button>
          <input ref={inputRef} className="visually-hidden" type="file" accept="application/json,.json" onChange={importProgress} />
          <button className="button button--quiet" type="button" disabled={!complete} onClick={() => window.print()}>In chứng nhận</button>
          <button className="button button--danger" type="button" onClick={() => { if (window.confirm("Đặt lại toàn bộ tiến độ trên trình duyệt này?")) onReset(); }}>Đặt lại tiến độ</button>
        </div>
        {message && <p className="tools-message" role="status">{message}</p>}
      </section>
    </div>
  );
}

