import ContactIcon from "./ContactIcon.jsx";
import Reveal from "./Reveal.jsx";
import { CONTACTS, STUDIO } from "../data/studio.js";

// Khối "Liên hệ" — đặt lịch hoặc tư vấn trực tiếp qua Zalo / Facebook
export default function ContactSection() {
  return (
    <section className="contact" id="lien-he">
      <Reveal className="contact__head">
        <p className="eyebrow">LIÊN HỆ ĐẶT LỊCH & TƯ VẤN</p>
        <h2 className="section-title">Muốn chụp một bộ ảnh?<br />Nhắn mình nhé.</h2>
        <p className="contact__lead">
          Gửi mình concept bạn thích (hoặc ảnh tham khảo), ngày dự định và số người. Mình sẽ phản hồi
          nhanh nhất có thể và tư vấn trang phục, địa điểm phù hợp. Hoạt động tại {STUDIO.city}.
        </p>
      </Reveal>
      <div className="contact__grid">
        {CONTACTS.map((c, i) => (
          <Reveal key={c.id} delay={i * 80}>
            <a className={`contact-card${c.primary ? " contact-card--primary" : ""}`} href={c.href} target="_blank" rel="noreferrer">
              <span className="contact-card__icon"><ContactIcon name={c.id} size={22} /></span>
              <span className="contact-card__text">
                <span className="contact-card__label">{c.label}</span>
                <span className="contact-card__handle">{c.handle}</span>
              </span>
              <span className="contact-card__cta">{c.cta} ↗</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
