import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import PlanCard from "../components/PlanCard.jsx";
import FaqList from "../components/FaqList.jsx";
import Reveal from "../components/Reveal.jsx";
import SplitText from "../components/SplitText.jsx";
import { ADDONS, CONCEPTS, FAQ_GROUPS, PACKAGES, STEPS, STUDIO, contactOf } from "../data/studio.js";
import { ALBUMS, HERO_SLIDES } from "../data/photos.js";
import { vnd } from "../data/format.js";

const STATS = [
  { value: `${ALBUMS.length}`, label: "bộ ảnh trong bộ sưu tập" },
  { value: `${ALBUMS.reduce((n, a) => n + a.count, 0)}`, label: "khung hình đã chọn lọc" },
  { value: `${CONCEPTS.length}`, label: "concept chụp" },
  { value: "2–3 ngày", label: "nhận ảnh chỉnh sửa" },
];

const VALUES = [
  { title: "Tự nhiên", text: "Không dàn dựng gượng ép. Mình hướng dẫn nhẹ nhàng để bạn thả lỏng và là chính mình trước ống kính." },
  { title: "Riêng tư & tôn trọng", text: "Không gian kín cho các concept nhạy cảm. Ảnh của bạn chỉ được chia sẻ khi bạn đồng ý." },
  { title: "Rõ ràng", text: "Giá trọn gói niêm yết sẵn, không phụ phí ẩn. Bạn biết mình nhận được gì ngay từ đầu." },
];

export default function About() {
  const [group, setGroup] = useState(FAQ_GROUPS[0].id);
  const faq = FAQ_GROUPS.find((g) => g.id === group);

  return (
    <>
      <Header variant="home" />
      <main>
        <section className="about-hero">
          <div className="about-hero__text">
            <p className="eyebrow anim-fade">VỀ {STUDIO.name.toUpperCase()}</p>
            <SplitText className="page-hero__title" lines={["Hãy để mình chụp lại", "những hình ảnh đẹp nhất", "của bạn."]} startDelay={100} />
            {/* ✏️ Sửa 2 đoạn dưới thành câu chuyện thật của bạn */}
            <p className="page-hero__lead anim-fade" style={{ "--delay": "700ms" }}>
              {STUDIO.name} là nơi mình lưu giữ những khung hình đã chụp ở Sài Gòn — từ một buổi sinh nhật nhỏ,
              một chiều nàng thơ, đến những bộ ảnh cổ trang hay beauty cận cảnh.
            </p>
            <p className="page-hero__lead anim-fade" style={{ "--delay": "850ms" }}>
              Mình tin mỗi người là một câu chuyện. Việc của mình là lắng nghe, chọn ánh sáng phù hợp và giữ lại khoảnh khắc
              bạn tự nhiên nhất, dù bạn chưa từng đứng trước ống kính.
            </p>
          </div>
          <div className="about-hero__photo anim-reveal-img">
            <img src={HERO_SLIDES[1] ?? HERO_SLIDES[0]} alt={`Ảnh chụp bởi ${STUDIO.name}`} />
          </div>
        </section>

        <section className="stats" aria-label="Những con số">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 90}>
              <p className="stat__value">{s.value}</p>
              <p className="stat__label">{s.label}</p>
            </Reveal>
          ))}
        </section>

        <section className="values">
          <Reveal className="section-head__text">
            <p className="eyebrow">ĐIỀU MÌNH GIỮ GÌN</p>
            <h2 className="section-title">Ba điều không thay đổi.</h2>
          </Reveal>
          <div className="values__grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="value" delay={i * 120}>
                <p className="process__num">0{i + 1}</p>
                <h3 className="process__name">{v.title}</h3>
                <p className="process__text">{v.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="concept-strip">
            <p className="concept-strip__label">Concept mình nhận chụp</p>
            <div className="concept-strip__list">
              {CONCEPTS.map((c) => (
                <Link key={c.id} to={`/bo-suu-tap?concept=${c.id}`} className="filter">{c.label} ↗</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="plans" id="goi-chup">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">CÁC GÓI CHỤP</p>
              <h2 className="section-title">Chọn gói vừa với bạn.</h2>
            </div>
            <p className="plans__price-note">Áp dụng cho mọi concept. Không phụ phí ẩn. Ảnh chỉnh sửa được gửi trong 2–3 ngày làm việc.</p>
          </div>
          <div className="plan-grid">
            {PACKAGES.map((p, i) => <Reveal key={p.id} delay={i * 100} className="plan-wrap"><PlanCard plan={p} /></Reveal>)}
          </div>
          <div className="addons">
            <h3 className="addons__title">Dịch vụ thêm</h3>
            <dl className="addons__list">
              {ADDONS.map((a) => (
                <div key={a.name}>
                  <dt>{a.name}</dt>
                  <dd>+ {vnd(a.price)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="plans__terms">
            Đặt cọc 30% để giữ lịch · Đổi lịch miễn phí 1 lần trước 48 giờ · Cần gói riêng? <a href={contactOf("zalo").href} target="_blank" rel="noreferrer">Nhắn Zalo ↗</a>
          </p>
        </section>

        <section className="process">
          <p className="eyebrow">MỘT BUỔI CHỤP CÙNG MÌNH</p>
          <div className="process__steps">
            {STEPS.map((s) => (
              <div key={s.n} className="process__step">
                <p className="process__num">{s.n}</p>
                <h3 className="process__name">{s.title}</h3>
                <p className="process__text">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-page" id="hoi-dap">
          <div className="faq-page__side">
            <p className="eyebrow">HỎI ĐÁP</p>
            <h2 className="section-title">Có thể bạn đang thắc mắc</h2>
            <p className="process__text">Chưa thấy câu trả lời bạn cần? Nhắn mình qua <a className="link-underline" href={contactOf("zalo").href} target="_blank" rel="noreferrer">Zalo</a> hoặc <a className="link-underline" href={contactOf("messenger").href} target="_blank" rel="noreferrer">Messenger</a> nhé.</p>
          </div>
          <div className="faq">
            <div className="filters" role="tablist" aria-label="Chủ đề câu hỏi">
              {FAQ_GROUPS.map((g) => (
                <button key={g.id} type="button" role="tab" aria-selected={group === g.id} className={`filter${group === g.id ? " is-active" : ""}`} onClick={() => setGroup(g.id)}>
                  {g.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" aria-label={faq.label}>
              <FaqList key={faq.id} items={faq.items} />
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div>
            <h2 className="cta-band__title">Sẵn sàng kể câu chuyện của bạn?</h2>
            <p className="cta-band__text">Chọn concept, chọn ngày. Phần còn lại, để mình lo.</p>
          </div>
          <Button to="/dat-lich" variant="light" icon="arrow-dark">Đặt lịch chụp</Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
