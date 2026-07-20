# OneDash Academy

Nền tảng học tương tác bằng tiếng Việt dành cho nhân sự mới làm quen với OneDash. Khóa học gồm 5 chương theo luồng bắt buộc: lý thuyết → quiz → thực hành mô phỏng → hoàn thành chương.

## Chạy cục bộ

Yêu cầu Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Mở địa chỉ được in ra bởi vinext. Dữ liệu học chỉ được lưu trong `localStorage` của trình duyệt; không có server thật hoặc thông tin xác thực thật.

## Kiểm tra

```bash
npm run lint
npx tsc --noEmit
npm run build
node --test tests/rendered-html.test.mjs
```

## Cấu trúc chính

- `app/data/course.ts`: nội dung chương, bài, câu hỏi và đáp án.
- `app/components/ProductMap.tsx`: bản đồ các khu vực giao diện thực tế gắn với từng chương.
- `app/components/`: giao diện khóa học, quiz, dashboard và phòng lab.
- `app/lib/progress-storage.ts`: lớp lưu trữ tiến độ có thể thay thế bằng adapter database sau này.
- `tokens.css` và `app/globals.css`: design tokens cùng hệ thống giao diện Hallmark.
- `public/og.png`: ảnh chia sẻ của OneDash Academy.

Nội dung tính năng được biên soạn từ nguồn công khai tại [onedash.vn](https://onedash.vn/), đồng thời đối chiếu với sáu ảnh giao diện sản phẩm thực tế do đội ngũ cung cấp. Mọi tên máy và dữ liệu trong Academy vẫn là dữ liệu giả lập an toàn.
