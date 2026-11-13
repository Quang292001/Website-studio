import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";
import { CONCEPTS } from "../data/studio.js";

export const conceptLabel = (id) => CONCEPTS.find((c) => c.id === id)?.label ?? id;

// Thẻ bộ ảnh — có onOpen thì là nút mở popup, không thì là link sang bộ sưu tập
export default function AlbumCard({ album: a, onOpen, delay = 0 }) {
  const body = (
    <>
      <div className="album__img"><img src={a.img} alt={a.title} loading="lazy" /></div>
      <div className="album__info">
        <div className="album__text">
          <span className="album__genre">{conceptLabel(a.concept).toUpperCase()}</span>
          <span className="album__title">{a.title}</span>
          <span className="album__meta">{a.meta ? `${a.meta} · ` : ""}{a.count} ảnh</span>
        </div>
        <Icon name="arrow-album" size={22} />
      </div>
    </>
  );
  return (
    <Reveal delay={delay}>
      {onOpen ? (
        <button type="button" className="album" onClick={() => onOpen(a.id)}>{body}</button>
      ) : (
        <Link to={`/bo-suu-tap?album=${a.id}`} className="album">{body}</Link>
      )}
    </Reveal>
  );
}
