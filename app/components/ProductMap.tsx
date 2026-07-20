import type { ProductScreenGuide } from "../types/course";

export function ProductMap({ guide }: { guide: ProductScreenGuide }) {
  return (
    <aside className="product-map" aria-labelledby="product-map-title">
      <div className="product-map__head">
        <span>GIAO DIỆN THỰC TẾ / ĐÃ ĐỐI CHIẾU</span>
        <h3 id="product-map-title">{guide.screen}</h3>
        <code>{guide.entryPath}</code>
      </div>
      <ol className="product-map__landmarks">
        {guide.landmarks.map((landmark, index) => (
          <li key={landmark}><b>{String(index + 1).padStart(2, "0")}</b><span>{landmark}</span></li>
        ))}
      </ol>
      <p><strong>Thao tác nên làm:</strong> {guide.operatorMove}</p>
    </aside>
  );
}
