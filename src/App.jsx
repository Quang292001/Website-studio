import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import FloatingContact from "./components/FloatingContact.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      {/* key theo đường dẫn → mỗi lần đổi trang chạy lại hiệu ứng chuyển cảnh */}
      <div key={location.pathname} className="page">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/bo-suu-tap" element={<Collection />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/dat-lich" element={<Booking />} />
          <Route path="/xac-nhan" element={<Confirmation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <FloatingContact />
    </>
  );
}
