import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "./Button.jsx";
import ContactIcon from "./ContactIcon.jsx";
import { STUDIO, contactOf } from "../data/studio.js";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${STUDIO.name} — trang chủ`}>
      <span className="logo__mark">Q.Archives</span>
      <span className="logo__tag">PHOTOGRAPHY · HCM</span>
    </Link>
  );
}

// variant="home": menu + nút đặt lịch · variant="booking": nút nhắn Zalo hỗ trợ
export default function Header({ variant = "booking" }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const zalo = contactOf("zalo");

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Logo />
      {variant === "home" ? (
        <nav className="nav" aria-label="Điều hướng chính">
          <NavLink to="/bo-suu-tap" className="nav__link">BỘ SƯU TẬP</NavLink>
          <Link to="/gioi-thieu#goi-chup" className="nav__link">GÓI CHỤP</Link>
          <NavLink to="/gioi-thieu" className="nav__link">GIỚI THIỆU</NavLink>
          <Link to={{ search: location.search, hash: "#lien-he" }} className="nav__link">LIÊN HỆ</Link>
          <Button to="/dat-lich" icon="arrow-light">ĐẶT LỊCH CHỤP</Button>
        </nav>
      ) : (
        <a className="support" href={zalo.href} target="_blank" rel="noreferrer">
          <ContactIcon name="zalo" size={18} />
          Cần tư vấn? Nhắn Zalo {zalo.handle}
        </a>
      )}
    </header>
  );
}
