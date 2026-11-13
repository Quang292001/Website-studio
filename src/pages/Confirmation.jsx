import { Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Progress from "../components/Progress.jsx";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon.jsx";
import { CONCEPTS, PACKAGES, STUDIO, contactOf } from "../data/studio.js";
import { addMinutes, dmy, downloadIcs, stripAccents, vnd, weekday } from "../data/format.js";
import { BOOKING_KEY } from "./Booking.jsx";

const BANK = { name: "Vietcombank", account: "1026 888 032", owner: "NGUYEN HOANG MOC" };
const DEPOSIT_DAYS_BEFORE = 8;

function readBooking(state) {
  if (state?.code) return state;
  try { return JSON.parse(sessionStorage.getItem(BOOKING_KEY)); } catch { return null; }
}

export default function Confirmation() {
  const { state } = useLocation();
  const b = readBooking(state);
  if (!b) return <Navigate to="/dat-lich" replace />;

  const pkg = PACKAGES.find((p) => p.id === b.pkgId);
  const concept = CONCEPTS.find((c) => c.id === b.concept)?.label ?? b.concept;
  const [y, m, d] = b.date.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const end = addMinutes(b.slot, pkg.minutes);
  const deposit = Math.round(pkg.price * STUDIO.depositRate);
  const deadline = new Date(y, m - 1, d - DEPOSIT_DAYS_BEFORE);
  const nameTail = stripAccents(b.name.trim()).toUpperCase().split(/\s+/).slice(-2).join(" ");
  const firstName = b.name.trim().split(/\s+/).slice(-2).join(" ");
  const phone = b.phone.replace(/\s/g, "").replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");

  return (
    <>
      <Header />
      <main className="confirm">
        <Progress done />
        <section className="confirm__hero">
          <span className="confirm__check"><Icon name="check-success" size={30} /></span>
          <p className="eyebrow">MÌNH ĐÃ NHẬN ĐƯỢC LỜI HẸN CỦA BẠN</p>
          <h1 className="confirm__title">Hẹn gặp {firstName} nhé!</h1>
          <p className="confirm__lead">
            Thông tin đặt lịch đã được gửi đến {b.email}.<br />
            Chỉ còn một bước đặt cọc nhỏ để giữ buổi chụp dành riêng cho bạn.
          </p>
        </section>

        <section className="ticket">
          <div className="ticket__top">
            <span>MÃ ĐẶT LỊCH · {b.code}</span>
            <span className="pill">Đã nhận yêu cầu · Chờ đặt cọc</span>
          </div>
          <hr className="rule" />
          <div className="ticket__body">
            <div className="ticket__what">
              <h2 className="ticket__name">{concept} · Gói {pkg.name}</h2>
              <p className="ticket__detail"><Icon name="calendar-17" size={17} />{weekday(date)}, {dmy(date)}</p>
              <p className="ticket__detail"><Icon name="clock-17" size={17} />{b.slot} – {end} · {pkg.minutes} phút</p>
              <p className="ticket__detail"><Icon name="map-pin-17" size={17} />{STUDIO.addressShort}</p>
              <a className="ticket__directions" href={STUDIO.mapsHref} target="_blank" rel="noreferrer">Xem bản đồ ↗</a>
            </div>
            <div className="ticket__who">
              <p className="ticket__who-label">THÔNG TIN CỦA BẠN</p>
              <p className="ticket__who-name">{b.name}</p>
              <p>{phone}</p>
              <p>{b.email}</p>
              <p className="ticket__who-perks">{pkg.summary[0]}<br />{pkg.summary[1]}</p>
            </div>
          </div>
          <hr className="rule" />
          <p className="ticket__total"><span>Tổng giá trọn gói</span><strong>{vnd(pkg.price)}</strong></p>
        </section>

        <section className="next">
          <div className="deposit">
            <h2 className="deposit__title"><Icon name="landmark" size={20} />Giữ lịch với {vnd(deposit)}</h2>
            <p className="deposit__text">Vui lòng chuyển cọc 30% trước 18:00 ngày {dmy(deadline)}. Mình sẽ xác nhận qua Zalo sau khi nhận cọc.</p>
            <dl className="bank">
              <div><dt>Ngân hàng</dt><dd>{BANK.name}</dd></div>
              <div><dt>Số tài khoản</dt><dd>{BANK.account}</dd></div>
              <div><dt>Chủ tài khoản</dt><dd>{BANK.owner}</dd></div>
              <div><dt>Nội dung</dt><dd>{b.code.replace(/-/g, "")} {nameTail}</dd></div>
            </dl>
            <p className="deposit__rest">{vnd(pkg.price - deposit)} còn lại thanh toán tại studio sau buổi chụp.</p>
          </div>
          <div className="prep">
            <h2 className="prep__title">Trước ngày gặp nhau</h2>
            {["Mình sẽ liên hệ qua Zalo để tư vấn concept, trang phục và địa điểm chụp.", "Đến sớm 15 phút để thư giãn và chuẩn bị trang điểm.", "Đổi lịch miễn phí 1 lần khi báo trước ít nhất 48 giờ."].map((t) => (
              <p key={t} className="prep__item"><Icon name="check-note" size={15} />{t}</p>
            ))}
          </div>
        </section>

        <div className="confirm__actions">
          <Button icon="arrow-light" onClick={() => downloadIcs({ title: `Buổi chụp ${concept} · Gói ${pkg.name} cùng Q.Archives`, date, start: b.slot, end, location: STUDIO.address, description: `Mã đặt lịch ${b.code}` })}>
            Thêm vào lịch của tôi
          </Button>
          <Button to="/" variant="outline">Về trang chủ</Button>
        </div>
        <p className="confirm__help">
          Cần điều chỉnh thông tin? Gọi <a href={STUDIO.phoneHref}>{STUDIO.phone}</a> · <a href={contactOf("zalo").href} target="_blank" rel="noreferrer">Nhắn Zalo ↗</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
