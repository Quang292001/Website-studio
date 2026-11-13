// Tiêu đề hiện từng chữ (trượt lên từ dưới). lines: mảng các dòng.
export default function SplitText({ as: Tag = "h1", lines, className = "", startDelay = 0, step = 70 }) {
  let i = 0;
  return (
    <Tag className={`split ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="split__line" aria-hidden="true">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="split__mask">
              <span className="split__word" style={{ "--delay": `${startDelay + step * i++}ms` }}>{word}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
