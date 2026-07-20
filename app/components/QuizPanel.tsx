import type { Chapter } from "../types/course";

type QuizPanelProps = {
  chapter: Chapter;
  answers: Record<string, number>;
  unlocked: boolean;
  passed: boolean;
  onAnswer: (questionId: string, answerIndex: number) => void;
  onRetry: (questionId: string) => void;
  onPass: () => void;
};

export function QuizPanel({
  chapter,
  answers,
  unlocked,
  passed,
  onAnswer,
  onRetry,
  onPass,
}: QuizPanelProps) {
  if (!unlocked) {
    return (
      <section className="locked-panel" aria-labelledby="quiz-locked-title">
        <span className="locked-panel__mark" aria-hidden="true">02</span>
        <div>
          <h2 id="quiz-locked-title">Kiểm tra đang khóa</h2>
          <p>Đánh dấu đã đọc tất cả bài lý thuyết của chương để mở phần kiểm tra.</p>
        </div>
      </section>
    );
  }

  const correctCount = chapter.quiz.filter((question) => answers[question.id] === question.correctIndex).length;
  const answeredCount = chapter.quiz.filter((question) => answers[question.id] !== undefined).length;
  const allCorrect = correctCount === chapter.quiz.length;

  return (
    <section className="quiz-panel" aria-labelledby="quiz-title">
      <div className="quiz-panel__head">
        <div>
          <span>Kiểm tra kiến thức</span>
          <h2 id="quiz-title">Chọn, nhận phản hồi, sửa câu sai.</h2>
        </div>
        <div className="quiz-score" aria-live="polite">
          <strong>{correctCount}/{chapter.quiz.length}</strong>
          <span>Câu đúng</span>
        </div>
      </div>
      <ol className="question-list">
        {chapter.quiz.map((question, questionIndex) => {
          const selected = answers[question.id];
          const answered = selected !== undefined;
          const correct = selected === question.correctIndex;
          return (
            <li className="question" key={question.id} data-state={answered ? (correct ? "correct" : "incorrect") : undefined}>
              <fieldset disabled={answered && correct}>
                <legend><span>{String(questionIndex + 1).padStart(2, "0")}</span>{question.prompt}</legend>
                <div className="question__options">
                  {question.options.map((option, optionIndex) => {
                    const optionSelected = selected === optionIndex;
                    return (
                      <label key={option.label} data-selected={optionSelected || undefined}>
                        <input
                          type="radio"
                          name={question.id}
                          value={optionIndex}
                          checked={optionSelected}
                          disabled={answered}
                          onChange={() => onAnswer(question.id, optionIndex)}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {answered && (
                <div className="question__feedback" role="status">
                  <strong>{correct ? "Đúng" : "Chưa đúng"}</strong>
                  <p>{question.options[selected].rationale}</p>
                  {!correct && (
                    <button className="text-action" type="button" onClick={() => onRetry(question.id)}>Làm lại câu này →</button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="quiz-submit">
        <div>
          <strong>{answeredCount === chapter.quiz.length ? `${correctCount} câu đúng` : `Đã trả lời ${answeredCount}/${chapter.quiz.length}`}</strong>
          <p>Cần trả lời đúng toàn bộ để mở nhiệm vụ thực hành.</p>
        </div>
        <button className="button" type="button" disabled={!allCorrect || passed} onClick={onPass}>
          {passed ? "Đã mở thực hành" : "Xác nhận hoàn thành"}
        </button>
      </div>
    </section>
  );
}

