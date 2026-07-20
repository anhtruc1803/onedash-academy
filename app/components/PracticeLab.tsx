import { useState } from "react";
import type { Chapter } from "../types/course";
import { ServerDashboard } from "./ServerDashboard";

type PracticeLabProps = {
  chapter: Chapter;
  unlocked: boolean;
  completed: boolean;
  addedServers: string[];
  onAddServer: (name: string) => void;
  onComplete: () => void;
};

const dashboardAreas = ["Máy chủ", "Sức khỏe", "Dịch vụ", "Tài nguyên"];
const securityChoices = [
  { id: "viewer", label: "Cấp vai trò quan sát cho người chỉ cần xem", correct: true },
  { id: "root", label: "Dùng chung một tài khoản root cho cả đội", correct: false },
  { id: "keys", label: "Quản lý SSH key tập trung và thu hồi key cũ", correct: true },
  { id: "audit", label: "Rà soát audit log cuối ca", correct: true },
];

export function PracticeLab({
  chapter,
  unlocked,
  completed,
  addedServers,
  onAddServer,
  onComplete,
}: PracticeLabProps) {
  const [visitedAreas, setVisitedAreas] = useState<string[]>([]);
  const [serverName, setServerName] = useState("api-service-01");
  const [serverOs, setServerOs] = useState("Linux");
  const [serverEnv, setServerEnv] = useState("Prod");
  const [incidentHandled, setIncidentHandled] = useState(false);
  const [securitySelected, setSecuritySelected] = useState<string[]>([]);
  const [automationStep, setAutomationStep] = useState<"idle" | "failed" | "success">("idle");

  if (!unlocked) {
    return (
      <section className="locked-panel" aria-labelledby="practice-locked-title">
        <span className="locked-panel__mark" aria-hidden="true">03</span>
        <div>
          <h2 id="practice-locked-title">Thực hành đang khóa</h2>
          <p>Hoàn thành lý thuyết và trả lời đúng toàn bộ câu hỏi để mở nhiệm vụ.</p>
        </div>
      </section>
    );
  }

  const completeWith = (ready: boolean) => {
    if (ready && !completed) onComplete();
  };

  const renderPractice = () => {
    if (chapter.id === "tong-quan") {
      const ready = dashboardAreas.every((area) => visitedAreas.includes(area));
      return (
        <div className="tour-practice">
          <div className="area-switcher" role="group" aria-label="Khu vực dashboard">
            {dashboardAreas.map((area) => (
              <button
                type="button"
                key={area}
                data-visited={visitedAreas.includes(area) || undefined}
                onClick={() => setVisitedAreas((current) => current.includes(area) ? current : [...current, area])}
              >
                <span aria-hidden="true">{visitedAreas.includes(area) ? "✓" : "○"}</span>
                {area}
              </button>
            ))}
          </div>
          <ServerDashboard addedServers={addedServers} />
          <button className="button" type="button" disabled={!ready || completed} onClick={() => completeWith(ready)}>{completed ? "Nhiệm vụ đã hoàn thành" : "Hoàn thành bản đồ"}</button>
        </div>
      );
    }

    if (chapter.id === "ket-noi") {
      const alreadyAdded = addedServers.includes(serverName);
      return (
        <div className="connect-practice">
          <form onSubmit={(event) => { event.preventDefault(); if (!alreadyAdded) { onAddServer(serverName); onComplete(); } }}>
            <div className="simulation-banner"><strong>Mô phỏng an toàn</strong><span>Không có trường IP, tài khoản, mật khẩu hoặc private key.</span></div>
            <label>Tên máy chủ<select value={serverName} onChange={(event) => setServerName(event.target.value)}><option>api-service-01</option><option>web-prod-02</option><option>worker-dev-01</option></select></label>
            <label>Hệ điều hành<select value={serverOs} onChange={(event) => setServerOs(event.target.value)}><option>Linux</option><option>Windows</option></select></label>
            <label>Môi trường<select value={serverEnv} onChange={(event) => setServerEnv(event.target.value)}><option>Prod</option><option>Staging</option><option>Dev</option></select></label>
            <dl className="connection-review">
              <div><dt>Định danh</dt><dd>{serverName}</dd></div>
              <div><dt>Nền tảng</dt><dd>{serverOs}</dd></div>
              <div><dt>Nhóm</dt><dd>{serverEnv}</dd></div>
              <div><dt>Kết nối</dt><dd>Mô phỏng cục bộ</dd></div>
            </dl>
            <button className="button" type="submit" disabled={alreadyAdded}>{alreadyAdded ? "Đã thêm vào dashboard" : "Thêm server giả lập"}</button>
          </form>
          <ServerDashboard addedServers={addedServers} />
        </div>
      );
    }

    if (chapter.id === "giam-sat") {
      return (
        <div className="incident-practice">
          <ServerDashboard addedServers={addedServers} />
          <div className="incident-stack" aria-label="Trung tâm cảnh báo giả lập">
            <article className="incident incident--critical">
              <span>Mức 1 · Đang diễn ra</span>
              <h3>Brute-force SSH · web-prod-01</h3>
              <p>118 lần thất bại từ 203.0.113.45 trong 2 phút · IP thuộc dải tài liệu TEST-NET.</p>
              <button className="button" type="button" disabled={incidentHandled} onClick={() => { setIncidentHandled(true); onComplete(); }}>{incidentHandled ? "Đã chặn trong mô phỏng" : "Ưu tiên 1 · Chặn IP mô phỏng"}</button>
            </article>
            <article className="incident"><span>Mức 2 · Cần kiểm tra</span><h3>RAM 92% · win-ad-02</h3><p>Máy vẫn Online. Cần xem xu hướng và tiến trình sử dụng bộ nhớ.</p></article>
            <article className="incident"><span>Thông tin</span><h3>Backup db-staging hoàn tất</h3><p>Trạng thái thành công, không cần hành động.</p></article>
          </div>
        </div>
      );
    }

    if (chapter.id === "bao-mat") {
      const correctIds = securityChoices.filter((choice) => choice.correct).map((choice) => choice.id);
      const ready = correctIds.every((id) => securitySelected.includes(id)) && !securitySelected.includes("root") && securitySelected.length === correctIds.length;
      return (
        <div className="security-practice">
          <fieldset>
            <legend>Chọn đúng 3 biện pháp cho baseline bảo mật</legend>
            {securityChoices.map((choice) => (
              <label key={choice.id} data-selected={securitySelected.includes(choice.id) || undefined}>
                <input type="checkbox" checked={securitySelected.includes(choice.id)} onChange={() => setSecuritySelected((current) => current.includes(choice.id) ? current.filter((id) => id !== choice.id) : [...current, choice.id])} />
                <span>{choice.label}</span>
              </label>
            ))}
          </fieldset>
          {securitySelected.includes("root") && <p className="form-feedback form-feedback--error" role="status">Tài khoản root dùng chung làm mất phân quyền và khả năng truy vết. Hãy bỏ lựa chọn này.</p>}
          <button className="button" type="button" disabled={!ready || completed} onClick={() => completeWith(ready)}>{completed ? "Baseline đã hoàn thành" : "Xác nhận checklist"}</button>
        </div>
      );
    }

    return (
      <div className="automation-practice">
        <div className="template-spec">
          <div><span>COMMAND TEMPLATE</span><h3>Restart Nginx</h3><code>systemctl restart nginx</code></div>
          <dl><div><dt>Đích</dt><dd>api-service-01</dd></div><div><dt>Phạm vi</dt><dd>1 host · mô phỏng</dd></div></dl>
          {automationStep === "idle" && <button className="button" type="button" onClick={() => setAutomationStep("failed")}>Chạy template mô phỏng</button>}
          {automationStep === "failed" && (
            <div className="run-result run-result--failed" role="status">
              <strong>Thất bại · api-service-01</strong>
              <code>service nginx did not answer health check · no real command executed</code>
              <button className="button" type="button" onClick={() => { setAutomationStep("success"); onComplete(); }}>Kiểm tra trạng thái, chạy lại host này</button>
            </div>
          )}
          {automationStep === "success" && (
            <div className="run-result run-result--success" role="status"><strong>Thành công · api-service-01</strong><code>health check passed · simulation complete</code></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="practice-panel" aria-labelledby="practice-title">
      <div className="practice-panel__head">
        <span>LAB / {String(chapter.number).padStart(2, "0")}</span>
        <h2 id="practice-title">{chapter.practice.title}</h2>
        <p>{chapter.practice.brief}</p>
      </div>
      {renderPractice()}
      {completed && <div className="completion-message" role="status"><strong>Đã hoàn thành nhiệm vụ.</strong><span>{chapter.practice.success}</span></div>}
    </section>
  );
}

