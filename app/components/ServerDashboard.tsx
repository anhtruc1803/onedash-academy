type DashboardServer = {
  name: string;
  os: "Linux" | "Windows";
  environment: "Prod" | "Staging" | "Dev";
  status: "Online" | "Cảnh báo" | "Offline";
  cpu: number;
  ram: number;
  disk: number;
  uptime: string;
};

const baseServers: DashboardServer[] = [
  { name: "web-prod-01", os: "Linux", environment: "Prod", status: "Online", cpu: 42, ram: 68, disk: 54, uptime: "18 ngày" },
  { name: "win-ad-02", os: "Windows", environment: "Prod", status: "Cảnh báo", cpu: 23, ram: 92, disk: 50, uptime: "31 ngày" },
  { name: "db-staging", os: "Linux", environment: "Staging", status: "Offline", cpu: 11, ram: 45, disk: 62, uptime: "—" },
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
    })),
  ];

  return (
    <section className="server-dashboard" aria-label="Dashboard máy chủ giả lập">
      <div className="server-dashboard__head">
        <div>
          <span>ONE DASH / LAB ENVIRONMENT</span>
          <h2>Bảng điều khiển máy chủ</h2>
        </div>
        <div className="sync-indicator"><span /> Dữ liệu giả lập · không kết nối thật</div>
      </div>
      <dl className="dashboard-summary">
        <div><dt>Tổng server</dt><dd>{servers.length}</dd></div>
        <div><dt>Online</dt><dd>{servers.filter((server) => server.status === "Online").length}</dd></div>
        <div><dt>Cảnh báo</dt><dd>{servers.filter((server) => server.status !== "Online").length}</dd></div>
        <div><dt>Hệ điều hành</dt><dd>2</dd></div>
      </dl>
      <div className="server-table" role="table" aria-label="Tài nguyên máy chủ">
        <div className="server-table__row server-table__header" role="row">
          <span role="columnheader">Máy chủ</span><span role="columnheader">Trạng thái</span><span role="columnheader">CPU</span><span role="columnheader">RAM</span><span role="columnheader">Disk</span><span role="columnheader">Uptime</span>
        </div>
        {servers.map((server) => (
          <div className="server-table__row" role="row" key={server.name} data-state={server.status.toLowerCase()}>
            <span className="server-name" role="cell" data-label="Máy chủ"><i aria-hidden="true" /> <strong>{server.name}</strong><small>{server.os} · {server.environment}</small></span>
            <span className="status-label" role="cell" data-label="Trạng thái"><b aria-hidden="true">{server.status === "Online" ? "✓" : server.status === "Cảnh báo" ? "!" : "—"}</b>{server.status}</span>
            <span role="cell" data-label="CPU"><ResourceMeter value={server.cpu} label="CPU" /></span>
            <span role="cell" data-label="RAM"><ResourceMeter value={server.ram} label="RAM" /></span>
            <span role="cell" data-label="Disk"><ResourceMeter value={server.disk} label="Disk" /></span>
            <span className="uptime" role="cell" data-label="Uptime">{server.uptime}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

