import { CONCEPTS, SAMPLE_ALBUMS } from "./studio.js";

// Đọc ảnh tự động từ src/photos/<concept>/<bo-anh>/*.jpg
// Thêm (tuỳ chọn) src/photos/<concept>/<bo-anh>/info.json để đặt tên, mô tả… (xem HUONG-DAN.md)
// (dùng đường dẫn tương đối — đường dẫn tuyệt đối dễ lỗi hoa/thường ổ đĩa trên Windows)
const files = import.meta.glob("../photos/*/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}", { eager: true, import: "default" });
const infos = import.meta.glob("../photos/*/*/info.json", { eager: true, import: "default" });

const conceptIds = new Set(CONCEPTS.map((c) => c.id));
const prettify = (slug) => slug.replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true });

function loadAlbums() {
  const groups = {};
  for (const [path, url] of Object.entries(files)) {
    const [, , concept, folder, name] = path.split("/"); // "../photos/<concept>/<folder>/<file>"
    if (!conceptIds.has(concept)) {
      console.warn(`[photos] Bỏ qua "${path}": thư mục concept "${concept}" không khớp id nào trong CONCEPTS.`);
      continue;
    }
    const key = `${concept}/${folder}`;
    (groups[key] ??= { concept, folder, photos: [] }).photos.push({ name, url });
  }

  return Object.values(groups).map(({ concept, folder, photos }) => {
    photos.sort(byName);
    const info = infos[`../photos/${concept}/${folder}/info.json`] ?? {};
    const cover = photos.find((p) => p.name === info.cover) ?? photos[0];
    const gallery = [cover, ...photos.filter((p) => p !== cover)].map((p) => p.url);
    return {
      id: folder,
      concept,
      title: info.title ?? prettify(folder),
      meta: info.meta ?? "",
      story: info.story ?? "",
      pkg: info.pkg ?? null,
      date: info.date ?? "",
      count: gallery.length,
      img: cover.url,
      gallery,
    };
  });
}

const real = loadAlbums();
export const USING_SAMPLES = real.length === 0;
export const ALBUMS = USING_SAMPLES ? SAMPLE_ALBUMS : real;

// Ảnh bìa đẹp nhất của mỗi concept (bộ mới nhất) — dùng cho ô concept ở trang chủ
export const coverOf = (conceptId) =>
  [...ALBUMS].filter((a) => a.concept === conceptId).sort((a, b) => b.date.localeCompare(a.date))[0]?.img;

// Ảnh cho slideshow đầu trang: lấy ảnh bìa của các bộ, tối đa 5 ảnh khác nhau
export const HERO_SLIDES = [...new Set(ALBUMS.map((a) => a.img))].slice(0, 5);
