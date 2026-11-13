import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import AlbumCard from "../components/AlbumCard.jsx";
import AlbumDialog from "../components/AlbumDialog.jsx";
import Reveal from "../components/Reveal.jsx";
import SplitText from "../components/SplitText.jsx";
import { CONCEPTS, PACKAGES, contactOf } from "../data/studio.js";
import { ALBUMS } from "../data/photos.js";

const PAGE_SIZE = 6;
const SORTS = [
  { id: "moi-nhat", label: "Mới nhất", fn: (a, b) => b.date.localeCompare(a.date) },
  { id: "nhieu-anh", label: "Nhiều ảnh nhất", fn: (a, b) => b.count - a.count },
  { id: "a-z", label: "Tên A → Z", fn: (a, b) => a.title.localeCompare(b.title, "vi") },
];

// Bộ lọc lưu trên URL (?concept=&goi=&sap-xep=&album=) để chia sẻ link được
export default function Collection() {
  const [params, setParams] = useSearchParams();
  const concept = CONCEPTS.some((c) => c.id === params.get("concept")) ? params.get("concept") : "all";
  const pkg = PACKAGES.some((p) => p.id === params.get("goi")) ? params.get("goi") : "all";
  const sort = SORTS.find((s) => s.id === params.get("sap-xep")) ?? SORTS[0];
  const openAlbum = ALBUMS.find((a) => a.id === params.get("album")) ?? null;
  const [visible, setVisible] = useState(PAGE_SIZE);

  const setParam = (key, value, isDefault) => {
    const next = new URLSearchParams(params);
    if (isDefault) next.delete(key); else next.set(key, value);
    if (key !== "album") setVisible(PAGE_SIZE);
    // chỉ việc mở popup mới thêm vào lịch sử (bấm Back để đóng)
    setParams(next, { replace: !(key === "album" && !isDefault) });
  };

  const byPkg = ALBUMS.filter((a) => pkg === "all" || a.pkg === pkg);
  const countOf = (id) => byPkg.filter((a) => id === "all" || a.concept === id).length;
  const filtered = byPkg.filter((a) => concept === "all" || a.concept === concept).sort(sort.fn);
  const shown = filtered.slice(0, visible);
  const current = CONCEPTS.find((c) => c.id === concept);
  const hasFilter = concept !== "all" || pkg !== "all" || sort !== SORTS[0];

  return (
    <>
      <Header variant="home" />
      <main>
        <section className="page-hero">
          <p className="eyebrow anim-fade">BỘ SƯU TẬP · {ALBUMS.length} BỘ ẢNH</p>
          <SplitText className="page-hero__title" lines={["Mỗi concept,", "một phiên bản của bạn."]} startDelay={100} />
          <p className="page-hero__lead anim-fade" style={{ "--delay": "600ms" }}>Từ ngọt ngào ngày sinh nhật đến quyến rũ đầy tự tin. Xem những khung hình mình đã chụp và chọn điều bạn muốn kể tiếp.</p>
        </section>

        <section className="collection">
          <div className="toolbar">
            <div className="filters" role="group" aria-label="Lọc theo concept">
              {[{ id: "all", label: "Tất cả" }, ...CONCEPTS].map((c) => (
                <button key={c.id} type="button" className={`filter${concept === c.id ? " is-active" : ""}`} aria-pressed={concept === c.id} onClick={() => setParam("concept", c.id, c.id === "all")}>
                  {c.label} <span className="filter__count">{countOf(c.id)}</span>
                </button>
              ))}
            </div>
            <div className="toolbar__selects">
              <label className="select">
                <span className="select__label">Gói chụp</span>
                <select value={pkg} onChange={(e) => setParam("goi", e.target.value, e.target.value === "all")}>
                  <option value="all">Tất cả gói</option>
                  {PACKAGES.map((p) => <option key={p.id} value={p.id}>Gói {p.name}</option>)}
                </select>
              </label>
              <label className="select">
                <span className="select__label">Sắp xếp</span>
                <select value={sort.id} onChange={(e) => setParam("sap-xep", e.target.value, e.target.value === SORTS[0].id)}>
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="toolbar__status">
            <p>{filtered.length} bộ ảnh{current ? ` · ${current.label}` : ""}{pkg !== "all" ? ` · Gói ${PACKAGES.find((p) => p.id === pkg).name}` : ""}</p>
            {hasFilter && <button type="button" className="link-underline" onClick={() => { setParams(new URLSearchParams(), { replace: true }); setVisible(PAGE_SIZE); }}>Xoá bộ lọc</button>}
          </div>

          {current && (
            <div className="concept-intro" key={current.id}>
              <div>
                <h2 className="concept-intro__title">{current.label}</h2>
                <p className="concept-intro__text">{current.desc}</p>
              </div>
              <Button to={`/dat-lich?concept=${current.id}`} variant="outline" icon="arrow-dark">Đặt lịch chụp {current.label}</Button>
            </div>
          )}

          <div className="album-grid" key={`${concept}-${pkg}-${sort.id}`}>
            {shown.map((a, i) => <AlbumCard key={a.id} album={a} delay={(i % 3) * 100} onOpen={(id) => setParam("album", id, false)} />)}
            {shown.length === 0 && <p className="empty">Chưa có bộ ảnh phù hợp với bộ lọc này. Thử chọn gói khác nhé.</p>}
          </div>
          {visible < filtered.length && (
            <button type="button" className="load-more" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Xem thêm bộ ảnh ({filtered.length - visible})
            </button>
          )}
        </section>

        <section className="cta-band">
          <div>
            <h2 className="cta-band__title">Chưa chọn được concept?</h2>
            <p className="cta-band__text">Nhắn mình vài dòng về bạn, mình sẽ gợi ý concept và trang phục hợp nhất.</p>
          </div>
          <div className="cta-band__actions">
            <a className="btn btn--light" href={contactOf("zalo").href} target="_blank" rel="noreferrer">Nhắn Zalo</a>
            <a className="btn btn--ghost" href={contactOf("messenger").href} target="_blank" rel="noreferrer">Messenger</a>
          </div>
        </section>
      </main>
      <Footer />
      <AlbumDialog album={openAlbum} onClose={() => openAlbum && setParam("album", null, true)} />
    </>
  );
}
