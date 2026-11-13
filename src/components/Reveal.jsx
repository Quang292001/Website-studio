import { useEffect, useRef, useState } from "react";

// Hiện dần phần tử khi cuộn tới. variant: up | fade | zoom | left | right · delay (ms) để tạo hiệu ứng lần lượt
export default function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal reveal--${variant}${shown ? " is-in" : ""} ${className}`.trim()} style={{ ...style, "--delay": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
