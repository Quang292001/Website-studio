import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import AlbumCard from "../components/AlbumCard.jsx";
import PlanCard from "../components/PlanCard.jsx";
import FaqList from "../components/FaqList.jsx";
import Reveal from "../components/Reveal.jsx";
import SplitText from "../components/SplitText.jsx";
import HeroSlideshow from "../components/HeroSlideshow.jsx";
import { CONCEPTS, FAQ, PACKAGES, STEPS, STUDIO, contactOf } from "../data/studio.js";
import { ALBUMS, HERO_SLIDES, coverOf } from "../data/photos.js";

const PAGE_SIZE = 6;
const FILTERS = [{ id: "all", label: "Tất cả" }, ...CONCEPTS];
const newestFirst = [...ALBUMS].sort((a, b) => b.date.localeCompare(a.date));
const totalPhotos = ALBUMS.reduce((n, a) => n + a.count, 0);

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const filtered = newestFirst.filter((a) => filter === "all" || a.concept === filter);
  const albums = filtered.slice(0, visible);
  const zalo = contactOf("zalo");

  return (
    <>
      <Header variant="home" />
      <main>
        <section className="hero">
          <div className="hero__story">
            <div className="hero__intro">
              <p className="eyebrow anim-fade" style={{ "--delay": "0ms" }}>{STUDIO.name.toUpperCase()} · PHOTOGRAPHY · SÀI GÒN</p>
              <SplitText className="hero__title" lines={["Lưu giữ những", "khung hình đẹp nhất", "của bạn."]} startDelay={150} />
              <p className="hero__lead anim-fade" style={{ "--delay": "750ms" }}>
                Sinh nhật, nàng thơ, beauty, cổ trang hay một chút quyến rũ — mỗi concept là một phiên bản của bạn.
                Không cần biết tạo dáng, mình sẽ hướng dẫn từng chút một.
              </p>
              <div className="hero__actions anim-fade" style={{ "--delay": "900ms" }}>
                <Button to="/bo-suu-tap" icon="arrow-light">Xem bộ sưu tập</Button>
                <a href={zalo.href} target="_blank" rel="noreferrer" className="link-underline">Nhắn Zalo đặt lịch</a>
              </div>
            </div>
            <div className="hero__photo anim-reveal-img">
              <HeroSlideshow images={HERO_SLIDES} alt={`Ảnh chụp bởi ${STUDIO.name}`} />
            </div>
          </div>
          <Reveal className="hero__proof" variant="fade">
            <p className="serif">“{STUDIO.tagline}”</p>
            <p className="hero__proof-meta">
              <span>{ALBUMS.length} bộ ảnh · {totalPhotos} khung hình</span>
              <span>{CONCEPTS.length} concept</span>
            </p>
          </Reveal>
        </section>

        <section className="concepts">
          <Reveal className="section-head__text">
            <p className="eyebrow">CONCEPT</p>
            <h2 className="section-title section-title--tight">Bạn muốn là phiên bản nào?</h2>
          </Reveal>
          <div className="concept-grid">
            {CONCEPTS.map((c, i) => {
              const count = ALBUMS.filter((a) => a.concept === c.id).length;
              const cover = coverOf(c.id);
              return (
                <Reveal key={c.id} variant="zoom" delay={i * 90} className="concept-tile-wrap">
                  <Link to={`/bo-suu-tap?concept=${c.id}`} className="concept-tile">
                    {cover ? <img src={cover} alt="" loading="lazy" /> : <span className="concept-tile__empty" />}
                    <span className="concept-tile__shade" />
                    <span className="concept-tile__text">
                      <span className="concept-tile__count">{String(i + 1).padStart(2, "0")} · {count} bộ ảnh</span>
                      <span className="concept-tile__name">{c.label}</span>
                      <span className="concept-tile__desc">{c.desc}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="albums" id="bo-anh">
          <Reveal className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">TÁC PHẨM GẦN ĐÂY</p>
              <h2 className="section-title section-title--tight">Một concept, một sắc riêng.</h2>
            </div>
            <Link className="section-head__link" to={filter === "all" ? "/bo-suu-tap" : `/bo-suu-tap?concept=${filter}`}>Xem tất cả bộ ảnh ↗</Link>
          </Reveal>
          <div className="filters" role="group" aria-label="Lọc theo concept">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" className={`filter${filter === f.id ? " is-active" : ""}`} aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); setVisible(PAGE_SIZE); }}>
                {f.label}
              </button>
            ))}
            <p className="filters__count">{filtered.length} bộ ảnh</p>
          </div>
          <div className="album-grid" key={filter}>
            {albums.map((a, i) => <AlbumCard key={a.id} album={a} delay={(i % 3) * 100} />)}
            {albums.length === 0 && <p className="empty">Bộ ảnh concept này sắp ra mắt.</p>}
          </div>
          {visible < filtered.length && (
            <button type="button" className="load-more" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Xem thêm bộ ảnh ({filtered.length - visible})
            </button>
          )}
        </section>

        <section className="plans" id="goi-chup">
          <Reveal className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">GÓI CHỤP</p>
              <h2 className="section-title">Chọn gói vừa với bạn.</h2>
            </div>
            <p className="plans__price-note">Áp dụng cho mọi concept. Không phụ phí ẩn. Ảnh chỉnh sửa được gửi trong 2–3 ngày làm việc.</p>
          </Reveal>
          <div className="plan-grid">
            {PACKAGES.map((p, i) => <Reveal key={p.id} delay={i * 100} className="plan-wrap"><PlanCard plan={p} /></Reveal>)}
          </div>
          <p className="plans__terms">
            Đặt cọc 30% để giữ lịch · Đổi lịch miễn phí 1 lần trước 48 giờ · Cần gói riêng? <a href={zalo.href} target="_blank" rel="noreferrer">Nhắn Zalo ↗</a>
          </p>
        </section>

        <section className="process">
          <Reveal as="p" className="eyebrow">ÍT BƯỚC HƠN, NHIỀU CẢM XÚC HƠN</Reveal>
          <div className="process__steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} className="process__step" delay={i * 120}>
                <p className="process__num">{s.n}</p>
                <h3 className="process__name">{s.title}</h3>
                <p className="process__text">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="voices">
          <Reveal as="figure" className="testimonial" variant="left">
            <blockquote className="testimonial__quote">“Không cần biết tạo dáng. Chỉ cần là bạn — phần còn lại để mình lo.”</blockquote>
            <figcaption className="testimonial__by">{STUDIO.name}</figcaption>
          </Reveal>
          <Reveal className="faq" variant="right">
            <h2 className="faq__title">Có thể bạn đang thắc mắc</h2>
            <hr className="rule" />
            <FaqList items={FAQ} />
            <Link className="section-head__link" to="/gioi-thieu#hoi-dap">Xem tất cả câu hỏi ↗</Link>
          </Reveal>
        </section>

        <section className="cta-band">
          <Reveal>
            <h2 className="cta-band__title">Một ngày bình thường. Một bộ ảnh đáng nhớ.</h2>
            <p className="cta-band__text">Chọn ngày trên web, hoặc nhắn mình trực tiếp để được tư vấn concept.</p>
          </Reveal>
          <div className="cta-band__actions">
            <Button to="/dat-lich" variant="light" icon="arrow-dark">Đặt lịch trên web</Button>
            <a className="btn btn--ghost" href={zalo.href} target="_blank" rel="noreferrer">Nhắn Zalo</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
