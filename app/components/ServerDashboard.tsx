"use client";

import { useState } from "react";

type DashboardServer = {
  name: string;
  os: "Linux" | "Windows";
  environment: "Prod" | "Staging" | "Dev";
  status: "Online" | "Cảnh báo" | "Offline";
  cpu: number;
  ram: number;
  disk: number;
  uptime: string;
  agent: "Trực tuyến" | "Mất kết nối";
  monitoring: string;
};

const baseServers: DashboardServer[] = [
  { name: "web-prod-01", os: "Linux", environment: "Prod", status: "Online", cpu: 42, ram: 68, disk: 54, uptime: "18 ngày", agent: "Trực tuyến", monitoring: "SSH Watch · 0 thất bại/24h" },
  { name: "win-ad-02", os: "Windows", environment: "Prod", status: "Cảnh báo", cpu: 23, ram: 92, disk: 50, uptime: "31 ngày", agent: "Trực tuyến", monitoring: "1 cảnh báo cần đọc" },
  { name: "db-staging", os: "Linux", environment: "Staging", status: "Offline", cpu: 11, ram: 45, disk: 62, uptime: "—", agent: "Mất kết nối", monitoring: "SSH Watch tắt" },
];

function ResourceMeter({ value, label }: { value: number; label: string }) {
  return (
    <span className="meter" aria-label={`${label} ${value}%`}>
      <span className="meter__fill" style={{ transform: `scaleX(${value / 100})` }} />
      <span className="meter__value">{value}%</span>
    </span>
  );
}

export function ServerDashboard({ addedServers = [] }: { addedServers?: string[] }) {
  const [activeView, setActiveView] = useState<"Tổng quan" | "Hiệu năng" | "Bảo mật">("Tổng quan");
  const [query, setQuery] = useState("");
  const servers: DashboardServer[] = [
    ...baseServers,
    ...addedServers.map((name) => ({
      name,
      os: "Linux" as const,
      environment: "Prod" as const,
      status: "Online" as const,
      cpu: 16,
      ram: 37,
      disk: 28,
      uptime: "vừa thêm",
      agent: "Trực tuyến" as const,
      monitoring: "SSH Watch · 0 thất bại/24h",
    })),
  ];
  const visibleServers = servers.filter((server) => server.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="server-dashboard" aria-label="Dashboard máy chủ giả lập">
      <div className="server-dashboard__head">
        <div>
          <span>ONE DASH / LAB ENVIRONMENT</span>
          <h2>Bảng điều khiển máy chủ</h2>
        </div>
        <div className="sync-indicator"><span /> Tự động · 30s · dữ liệu giả lập</div>
      </div>
      <div className="dashboard-controls">
        <div className="dashboard-tabs" role="tablist" aria-label="Chế độ dashboard">
          {(["Tổng quan", "Hiệu năng", "Bảo mật"] as const).map((view) => <button type="button" role="tab" aria-selected={activeView === view} data-active={activeView === view || undefined} key={view} onClick={() => setActiveView(view)}>{view}</button>)}
        </div>
        <label className="dashboard-search"><span className="visually-hidden">Tìm máy chủ</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm máy chủ..." /></label>
      </div>
      <p className="dashboard-view-note" aria-live="polite">{activeView === "Tổng quan" ? "Ghép trạng thái Agent, tài nguyên và giám sát trong một lượt đọc." : activeView === "Hiệu năng" ? "Đối chiếu CPU, RAM và Disk; mở chương Giám sát để đọc xu hướng theo thời gian." : "Ưu tiên SSH Watch và cảnh báo trước khi mở công cụ có tác động."}</p>
      <dl className="dashboard-summary">
        <div><dt>Tổng server</dt><dd>{visibleServers.length}</dd></div>
        <div><dt>Online</dt><dd>{visibleServers.filter((server) => server.status === "Online").length}</dd></div>
        <div><dt>Cảnh báo</dt><dd>{visibleServers.filter((server) => server.status !== "Online").length}</dd></div>
        <div><dt>Hệ điều hành</dt><dd>2</dd></div>
      </dl>
      <div className="server-table" role="table" aria-label="Tài nguyên máy chủ">
        <div className="server-table__row server-table__header" role="row">
          <span role="columnheader">Máy chủ</span><span role="columnheader">Agent</span><span role="columnheader">CPU</span><span role="columnheader">RAM</span><span role="columnheader">Disk</span><span role="columnheader">Uptime</span><span role="columnheader">Giám sát</span>
        </div>
        {visibleServers.map((server) => (
          <div className="server-table__row" role="row" key={server.name} data-state={server.status.toLowerCase()}>
            <span className="server-name" role="cell" data-label="Máy chủ"><i aria-hidden="true" /> <strong>{server.name}</strong><small>{server.os} · {server.environment}</small></span>
            <span className="status-label" role="cell" data-label="Agent"><b aria-hidden="true">{server.status === "Online" ? "✓" : server.status === "Cảnh báo" ? "!" : "—"}</b><span>{server.agent}</span><small>{server.status}</small></span>
            <span role="cell" data-label="CPU"><ResourceMeter value={server.cpu} label="CPU" /></span>
            <span role="cell" data-label="RAM"><ResourceMeter value={server.ram} label="RAM" /></span>
            <span role="cell" data-label="Disk"><ResourceMeter value={server.disk} label="Disk" /></span>
            <span className="uptime" role="cell" data-label="Uptime">{server.uptime}</span>
            <span className="monitoring-label" role="cell" data-label="Giám sát">{server.monitoring}</span>
          </div>
        ))}
        {visibleServers.length === 0 && <p className="dashboard-empty" role="status">Không có máy chủ mô phỏng khớp từ khóa.</p>}
      </div>
    </section>
  );
}
