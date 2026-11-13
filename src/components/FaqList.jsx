import { useState } from "react";

// Accordion câu hỏi — mỗi lần mở một câu
export default function FaqList({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return items.map((item, i) => {
    const isOpen = open === i;
    return (
      <div key={item.q} className="faq__item">
        <button type="button" className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
          <span>{item.q}</span>
          <span className="faq__sign" aria-hidden="true">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && <p className="faq__a">{item.a}</p>}
      </div>
    );
  });
}
