import ContactSection from "./ContactSection.jsx";
import ContactIcon from "./ContactIcon.jsx";
import { CONTACTS, STUDIO } from "../data/studio.js";

export default function Footer({ contact = true }) {
  return (
    <>
      {contact && <ContactSection />}
      <footer className="site-footer">
        <div className="site-footer__info">
          <div className="site-footer__brand">
            <p className="site-footer__logo">Q.Archives</p>
            <p className="muted-13">{STUDIO.tagline}</p>
          </div>
          <div className="site-footer__col">
            <p className="site-footer__label">KHU VỰC</p>
            <p className="ink-14">{STUDIO.address}</p>
            <p className="muted-13">Nhận lịch mỗi ngày · Ib để được tư vấn</p>
          </div>
          <div className="site-footer__col">
            <p className="site-footer__label">KẾT NỐI</p>
            <div className="site-footer__social">
              {CONTACTS.map((c) => (
                <a key={c.id} href={c.href} target="_blank" rel="noreferrer" aria-label={c.label} title={c.label}>
                  <ContactIcon name={c.id} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="rule" />
        <div className="site-footer__legal">
          <p>© {new Date().getFullYear()} {STUDIO.name}. Mọi hình ảnh thuộc bản quyền của {STUDIO.name}.</p>
          <a href={STUDIO.phoneHref}>{STUDIO.phone}</a>
        </div>
      </footer>
    </>
  );
}
