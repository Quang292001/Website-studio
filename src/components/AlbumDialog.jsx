import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { conceptLabel } from "./AlbumCard.jsx";
import { PACKAGES, contactOf } from "../data/studio.js";

// Popup xem bộ ảnh: <dialog> gốc (Esc để đóng) · ← → hoặc vuốt để chuyển ảnh
export default function AlbumDialog({ album, onClose }) {
  const ref = useRef(null);
  const touchX = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (album && !d.open) d.showModal();
    if (!album && d.open) d.close();
    setActive(0);
  }, [album]);

  const total = album?.gallery.length ?? 0;
  const go = (step) => setActive((i) => (i + step + total) % total);

  useEffect(() => {
    if (!album) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [album, total]);

  const pkg = album && PACKAGES.find((p) => p.id === album.pkg);
  const bookHref = album ? `/dat-lich?concept=${album.concept}${pkg ? `&goi=${pkg.id}` : ""}` : "/dat-lich";
  const zalo = contactOf("zalo");

  return (
    <dialog ref={ref} className="album-dialog" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-labelledby="album-dialog-title">
      {album && (
        <div className="album-dialog__body">
          <div className="album-dialog__media">
            <div
              className="album-dialog__main"
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              }}
            >
              <img key={album.gallery[active]} className="album-dialog__photo" src={album.gallery[active]} alt={`${album.title} — ảnh ${active + 1}/${total}`} />
              {total > 1 && (
                <>
                  <button type="button" className="album-dialog__nav album-dialog__nav--prev" aria-label="Ảnh trước" onClick={() => go(-1)}>‹</button>
                  <button type="button" className="album-dialog__nav album-dialog__nav--next" aria-label="Ảnh sau" onClick={() => go(1)}>›</button>
                  <span className="album-dialog__counter">{active + 1} / {total}</span>
                </>
              )}
            </div>
            <div className="album-dialog__thumbs">
              {album.gallery.map((src, i) => (
                <button key={src + i} type="button" className={`album-dialog__thumb${i === active ? " is-active" : ""}`} aria-label={`Xem ảnh ${i + 1}`} aria-pressed={i === active} onClick={() => setActive(i)}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <div className="album-dialog__info">
            <button type="button" className="album-dialog__close" aria-label="Đóng" onClick={onClose}>×</button>
            <p className="eyebrow">{conceptLabel(album.concept).toUpperCase()}</p>
            <h2 id="album-dialog-title" className="album-dialog__title">{album.title}</h2>
            <p className="album-dialog__meta">{album.meta ? `${album.meta} · ` : ""}{album.count} ảnh</p>
            {album.story && <p className="album-dialog__story">{album.story}</p>}
            {pkg && (
              <p className="album-dialog__pkg">
                Bộ ảnh này chụp với <strong>gói {pkg.name}</strong> · {pkg.minutes} phút · {pkg.photos} ảnh chỉnh sửa
              </p>
            )}
            <div className="album-dialog__actions">
              <Button to={bookHref} icon="arrow-light">Chụp concept này</Button>
              <a className="link-underline" href={zalo.href} target="_blank" rel="noreferrer">Hỏi qua Zalo</a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
