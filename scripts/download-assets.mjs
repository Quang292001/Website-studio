// Tải ảnh + icon từ Figma về public/assets (cần Node 18+). Chạy: npm run assets
// Link Figma MCP hết hạn sau 7 ngày: nếu lỗi 4xx, hãy lấy lại link bằng get_design_context.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://www.figma.com/api/mcp/asset/";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets");

const FILES = {
  // Ảnh
  "hero-portrait.png": "73b79378-09ee-45c6-ae39-c7e5eecf8fe0.png",
  "album-1.png": "5077e1cf-ae43-41b6-a862-825732715f3c.png",
  "album-2.png": "8d295761-5d39-46a3-b843-bfbf0a5e342d.png",
  "album-3.png": "13b76fe3-ceeb-4001-abb4-f7ae08981a40.png",
  "concept-portrait.png": "61bf759f-a68c-458a-b16d-386107b1bda4.png",
  // Icon — Trang chủ
  "icons/arrow-light.svg": "794313c3-2e4f-4284-afea-91ddef2ffd7f.svg",
  "icons/arrow-album.svg": "d184293e-e99c-457a-a41c-b3d1751ecca2.svg",
  "icons/arrow-dark.svg": "cc1b0cfa-1f2d-47ad-8cb1-8528a3599924.svg",
  "icons/check-plan.svg": "2ae1fe95-8f03-49c8-ad62-165f918964a7.svg",
  // Icon — Đặt lịch
  "icons/phone.svg": "30299572-4d66-451e-a100-b62863d23a8b.svg",
  "icons/circle.svg": "ee16d549-475c-4130-8e6d-a07a6dd5b19c.svg",
  "icons/circle-dot.svg": "56a3dbbd-869f-4554-a410-552c9e6711c8.svg",
  "icons/chevron-left.svg": "d7834d41-3616-4120-a987-8842cb193654.svg",
  "icons/chevron-right.svg": "1291385c-bfe4-4336-b7ad-eeae4bc36bea.svg",
  "icons/check-slot.svg": "4b97a451-9330-4178-99a6-dc2315fc1afe.svg",
  "icons/circle-check.svg": "2cf7b5d0-87a5-423f-aecd-788ec27421aa.svg",
  "icons/circle-alert.svg": "6ec59033-b9c4-43ea-bebe-b5778450c193.svg",
  "icons/check-light.svg": "7d591c3e-1762-4a70-a196-e7ce2dd170b6.svg",
  "icons/calendar-16.svg": "b0c37c45-1b9b-4d74-b3c3-97e535a462ce.svg",
  "icons/clock-16.svg": "195cff3a-31b3-4701-b345-bbb7a3eaac76.svg",
  "icons/map-pin-16.svg": "21f7e67a-3ce3-4539-84ec-04c969a1324a.svg",
  // Icon — Xác nhận
  "icons/check-success.svg": "83b73f76-10c5-4104-9c9b-2aef76e46eb5.svg",
  "icons/calendar-17.svg": "ed946ad0-891d-49ab-b3cd-751af2d41df6.svg",
  "icons/clock-17.svg": "f45e7734-fcee-4723-9cb4-ee0d5bd7cc29.svg",
  "icons/map-pin-17.svg": "47e05c82-00ff-49ae-b91c-71bb32adc75b.svg",
  "icons/landmark.svg": "9a087831-a42d-4024-b0c0-4936f9c48a04.svg",
  "icons/check-note.svg": "39cb652c-e77e-496a-933c-7dfb1e9ee08d.svg",
};

let failed = 0;
for (const [name, id] of Object.entries(FILES)) {
  try {
    const res = await fetch(BASE + id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const file = join(OUT, name);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log("ok  ", name);
  } catch (e) {
    failed++;
    console.log("ERR ", name, "-", e.message);
  }
}
console.log(failed ? `\n${failed} file lỗi.` : "\nXong, đã tải đủ asset.");
process.exit(failed ? 1 : 0);
