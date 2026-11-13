import { useState } from "react";
import ContactIcon from "./ContactIcon.jsx";
import { CONTACTS } from "../data/studio.js";

// Nút liên hệ nổi ở góc phải dưới — mở nhanh Zalo / Messenger
export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const quick = CONTACTS.filter((c) => c.primary);

  return (
    <div className={`fab${open ? " is-open" : ""}`}>
      <div className="fab__menu" id="fab-menu" hidden={!open}>
        {quick.map((c, i) => (
          <a key={c.id} className="fab__item" style={{ "--delay": `${i * 60}ms` }} href={c.href} target="_blank" rel="noreferrer">
            <ContactIcon name={c.id} size={18} />
            {c.cta}
          </a>
        ))}
      </div>
      <button type="button" className="fab__toggle" aria-expanded={open} aria-controls="fab-menu" onClick={() => setOpen((o) => !o)}>
        <ContactIcon name={open ? "close" : "chat"} size={20} />
        <span className="fab__label">{open ? "Đóng" : "Đặt lịch / Tư vấn"}</span>
      </button>
    </div>
  );
}
