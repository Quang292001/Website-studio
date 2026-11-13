import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Progress from "../components/Progress.jsx";
import Icon from "../components/Icon.jsx";
import { AVAILABILITY, CONCEPTS, PACKAGES, STUDIO, contactOf } from "../data/studio.js";
import { addMinutes, dmy, vnd, weekday, ymd } from "../data/format.js";

export const BOOKING_KEY = "qa-booking";
const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const RULES = {
  name: { noun: "họ tên", check: (v) => (v.trim() ? "" : "Vui lòng nhập họ và tên.") },
  phone: { noun: "số điện thoại", check: (v) => (/^0\d{9}$/.test(v.replace(/\s/g, "")) ? "" : "Vui lòng nhập số điện thoại đủ 10 chữ số.") },
  email: {
    noun: "email",
    check: (v) => (!v.trim() ? "Vui lòng nhập email để nhận xác nhận đặt lịch." : /^\S+@\S+\.\S+$/.test(v.trim()) ? "" : "Email chưa đúng định dạng."),
  },
};

const joinVi = (items) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} và ${items.at(-1)}`);

// Lưới 6 tuần, bắt đầu từ Thứ Hai
function monthCells(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
}

export default function Booking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [concept, setConcept] = useState(CONCEPTS.some((c) => c.id === params.get("concept")) ? params.get("concept") : CONCEPTS[0].id);
  const [pkgId, setPkgId] = useState(PACKAGES.some((p) => p.id === params.get("goi")) ? params.get("goi") : "ke");
  const [view, setView] = useState({ y: 2026, m: 10 });
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const pkg = PACKAGES.find((p) => p.id === pkgId);
  const conceptLabel = CONCEPTS.find((c) => c.id === concept).label;
  const { minDate, maxDate, fullDays, slots, bookedSlots } = AVAILABILITY;
  const freeSlots = slots.filter((s) => !bookedSlots.includes(s));
  const end = slot ? addMinutes(slot, pkg.minutes) : null;

  const errorOf = (k) => ((touched[k] || submitted) ? RULES[k].check(form[k]) : "");
  const isValid = (k) => (touched[k] || submitted) && !RULES[k].check(form[k]);
  const allFieldsOk = Object.keys(RULES).every((k) => !RULES[k].check(form[k]));
  const canSubmit = allFieldsOk && date && slot && consent;

  const issues = [
    ...Object.keys(RULES).filter((k) => errorOf(k)).map((k) => `${form[k].trim() ? "sửa" : "bổ sung"} ${RULES[k].noun}`),
    ...(submitted && !slot ? ["chọn ngày và giờ chụp"] : []),
    ...(submitted && !consent ? ["đồng ý chính sách đặt lịch"] : []),
  ];

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const pickDate = (d) => { setDate(d); setSlot(null); };
  const shiftMonth = (delta) => setView(({ y, m }) => { const d = new Date(y, m + delta, 1); return { y: d.getFullYear(), m: d.getMonth() }; });

  const price = pkg.price;
  const deposit = Math.round(price * STUDIO.depositRate);

  function submit() {
    if (!canSubmit) {
      setSubmitted(true);
      setTimeout(() => document.querySelector(".is-error, .step")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    const code = `MOC-${ymd(date).slice(8)}${ymd(date).slice(5, 7)}${ymd(date).slice(2, 4)}-${Math.floor(Math.random() * 90) + 10}`;
    const booking = { concept, pkgId, date: ymd(date), slot, code, ...form };
    sessionStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
    navigate("/xac-nhan", { state: booking });
  }

  const Step = ({ n, title, hint }) => (
    <div className="step">
      <span className="step__num">{n}</span>
      <div className="step__body">
        <h2 className="step__title">{title}</h2>
        <p className="step__hint">{hint}</p>
      </div>
    </div>
  );

  const field = ({ k, label, type = "text", placeholder, autoComplete, inputMode }) => (
    <div className="field" key={k}>
      <label className="field__label" htmlFor={`f-${k}`}>{label} *</label>
      <div className={`input${errorOf(k) ? " is-error" : isValid(k) ? " is-valid" : ""}`}>
        <input id={`f-${k}`} type={type} value={form[k]} onChange={set(k)} onBlur={blur(k)} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} aria-invalid={Boolean(errorOf(k))} aria-describedby={errorOf(k) ? `e-${k}` : undefined} />
        {errorOf(k) ? <Icon name="circle-alert" size={16} /> : isValid(k) ? <Icon name="circle-check" size={16} /> : null}
      </div>
      {errorOf(k) && <p className="field__error" id={`e-${k}`} role="alert">{errorOf(k)}</p>}
    </div>
  );

  return (
    <>
      <Header />
      <main className="booking">
        <div className="crumbs">
          <Link to="/" className="crumbs__back">← Quay lại trang chủ</Link>
          <Progress />
        </div>
        <div className="booking__intro">
          <p className="eyebrow">MỘT BUỔI HẸN VỚI CHÍNH MÌNH</p>
          <h1 className="booking__title">Hẹn bạn một buổi chụp.</h1>
          <p className="booking__sub">Chọn điều bạn thích, một ngày phù hợp. Phần còn lại, để mình lo.</p>
        </div>

        <div className="booking__layout">
          <div className="form">
            <Step n="1" title="Bạn muốn kể câu chuyện nào?" hint="Chọn concept và gói chụp. Bạn có thể trao đổi thêm với mình sau khi đặt lịch." />
            <div className="choices" role="radiogroup" aria-label="Concept">
              {CONCEPTS.map((c) => (
                <button key={c.id} type="button" role="radio" aria-checked={concept === c.id} className={`choice${concept === c.id ? " is-selected" : ""}`} onClick={() => setConcept(c.id)}>
                  {concept === c.id ? "✓  " : ""}{c.label}
                </button>
              ))}
            </div>
            <div className="pkg-opts" role="radiogroup" aria-label="Gói chụp">
              {PACKAGES.map((p) => (
                <button key={p.id} type="button" role="radio" aria-checked={pkgId === p.id} className={`pkg-opt${pkgId === p.id ? " is-selected" : ""}`} onClick={() => { setPkgId(p.id); setSlot(null); }}>
                  <span className="pkg-opt__top">
                    <span className="pkg-opt__name">{p.name}</span>
                    <Icon name={pkgId === p.id ? "circle-dot" : "circle"} size={16} />
                  </span>
                  <span className="pkg-opt__price">{vnd(p.price)}</span>
                  <span className="pkg-opt__meta">{p.minutes} phút · {p.photos} ảnh</span>
                </button>
              ))}
            </div>
            <p className="form__note">{pkg.note}</p>
            <hr className="rule" />

            <Step n="2" title="Chọn ngày & giờ của bạn" hint="Lịch trống được hiển thị bên dưới. Thời gian chụp theo giờ Việt Nam." />
            <div className="datetime">
              <div className="calendar">
                <div className="calendar__nav">
                  <button type="button" aria-label="Tháng trước" onClick={() => shiftMonth(-1)}><Icon name="chevron-left" size={16} /></button>
                  <span className="calendar__month">Tháng {view.m + 1}, {view.y}</span>
                  <button type="button" aria-label="Tháng sau" onClick={() => shiftMonth(1)}><Icon name="chevron-right" size={16} /></button>
                </div>
                <div className="calendar__grid">
                  {WEEKDAYS.map((d) => <span key={d} className="calendar__dow">{d}</span>)}
                  {monthCells(view.y, view.m).map((day) => {
                    const key = ymd(day);
                    const inRange = day.getMonth() === view.m && day >= minDate && day <= maxDate;
                    const full = inRange && fullDays.includes(key);
                    const open = inRange && !full;
                    const selected = date && key === ymd(date);
                    return (
                      <button key={key} type="button" disabled={!open} aria-pressed={Boolean(selected)} onClick={() => pickDate(day)}
                        className={`day${open ? " is-open" : ""}${selected ? " is-selected" : ""}${full ? " is-full" : ""}`}>
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className="legend">
                  <span className="legend__item"><i className="legend__dot legend__dot--open" />Còn lịch</span>
                  <span className="legend__item"><i className="legend__dot" />Đã chọn</span>
                  <span className="legend__full">— Hết lịch</span>
                </div>
              </div>

              <div className="times" aria-live="polite">
                {date ? (
                  <>
                    <p className="times__date">{weekday(date)}, {date.getDate()} tháng {date.getMonth() + 1}</p>
                    <p className="times__meta">{pkg.minutes} phút / buổi · {freeSlots.length} khung giờ còn trống</p>
                    <div className="slots">
                      {slots.map((s) => (
                        <button key={s} type="button" className={`slot${slot === s ? " is-selected" : ""}`} disabled={bookedSlots.includes(s)} aria-pressed={slot === s} onClick={() => setSlot(s)}>{s}</button>
                      ))}
                    </div>
                    {bookedSlots.length > 0 && <p className="times__taken">{bookedSlots.join(", ")} đã có khách đặt.</p>}
                    {slot && (
                      <p className="picked"><Icon name="check-slot" size={15} />{slot} – {end} · {dmy(date)}</p>
                    )}
                  </>
                ) : (
                  <p className="times__hint">Chọn một ngày còn lịch để xem các khung giờ trống.</p>
                )}
              </div>
            </div>
            <hr className="rule" />

            <Step n="3" title="Mình có thể liên hệ bạn qua đâu?" hint="Thông tin chỉ dùng để xác nhận lịch và chuẩn bị buổi chụp. * Bắt buộc" />
            <div className="fields-row">
              {field({ k: "name", label: "Họ và tên", autoComplete: "name" })}
              {field({ k: "phone", label: "Số điện thoại", type: "tel", inputMode: "tel", autoComplete: "tel" })}
            </div>
            {field({ k: "email", label: "Email", type: "email", placeholder: "Nhập email của bạn", autoComplete: "email" })}
            <div className="field">
              <label className="field__label field__label--plain" htmlFor="f-note">Lời nhắn cho mình (không bắt buộc)</label>
              <div className="textarea-wrap">
                <textarea id="f-note" className="textarea" value={form.note} onChange={set("note")} placeholder="Ví dụ: Mình thích tông ảnh tự nhiên, ánh sáng nhẹ nhàng." />
              </div>
            </div>
            <label className="consent">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span className={`consent__box${consent ? " is-checked" : ""}`}>{consent && <Icon name="check-light" size={15} />}</span>
              Tôi đồng ý với chính sách đặt lịch và bảo mật thông tin của Q.Archives.
            </label>
          </div>

          <aside className="summary" aria-label="Tóm tắt buổi chụp">
            <h2 className="summary__title">Buổi chụp của bạn</h2>
            <div className="summary__photo"><img src="/assets/concept-portrait.png" alt={`Concept ${conceptLabel}`} /></div>
            <div className="summary__pick">
              <strong>{conceptLabel} · Gói {pkg.name}</strong>
              <span>{pkg.minutes} phút · {pkg.photos} ảnh chỉnh sửa</span>
            </div>
            <hr className="rule" />
            <div className="summary__lines">
              <p className={`summary__line${date ? "" : " is-empty"}`}><Icon name="calendar-16" size={16} />{date ? `${dmy(date)} · ${weekday(date)}` : "Chưa chọn ngày"}</p>
              <p className={`summary__line${slot ? "" : " is-empty"}`}><Icon name="clock-16" size={16} />{slot ? `${slot} – ${end}` : "Chưa chọn giờ"}</p>
              <p className="summary__line"><Icon name="map-pin-16" size={16} />Q.Archives · {STUDIO.addressShort}</p>
            </div>
            <hr className="rule" />
            <div className="summary__money">
              <p className="summary__row"><span>Giá trọn gói</span><span>{vnd(price)}</span></p>
              <p className="summary__row"><span>Đặt cọc giữ lịch (30%)</span><span>{vnd(deposit)}</span></p>
              <p className="summary__row"><span>Thanh toán tại studio</span><span>{vnd(price - deposit)}</span></p>
            </div>
            <p className="summary__policy">Mình sẽ gửi hướng dẫn đặt cọc sau khi bạn hoàn tất. Lịch được giữ chính thức khi nhận cọc.</p>
            {issues.length > 0 && (
              <div className="summary__alert" role="alert">
                <strong>Còn {issues.length} thông tin cần kiểm tra</strong>
                <span>Vui lòng {joinVi(issues)}.</span>
              </div>
            )}
            <button type="button" className="submit" aria-disabled={!canSubmit} onClick={submit}>Hoàn tất đặt lịch →</button>
            <p className="summary__help">Cần thêm tư vấn? <a href={contactOf("zalo").href} target="_blank" rel="noreferrer">Nhắn mình qua Zalo ↗</a></p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
