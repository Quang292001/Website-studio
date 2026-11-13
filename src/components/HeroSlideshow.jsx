import { useEffect, useState } from "react";

// Slideshow đầu trang: chuyển ảnh mờ dần + zoom chậm (Ken Burns)
export default function HeroSlideshow({ images, interval = 5000, alt = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="slideshow">
      {images.map((src, i) => (
        <img key={src} src={src} alt={i === index ? alt : ""} aria-hidden={i !== index} className={`slideshow__img${i === index ? " is-active" : ""}`} />
      ))}
      {images.length > 1 && (
        <div className="slideshow__dots" role="group" aria-label="Chọn ảnh">
          {images.map((src, i) => (
            <button key={src} type="button" className={`slideshow__dot${i === index ? " is-active" : ""}`} aria-label={`Ảnh ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)} />
          ))}
        </div>
      )}
    </div>
  );
}
