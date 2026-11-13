// Icon từ Figma — kích thước khớp width/height gốc của SVG
export default function Icon({ name, size = 16, className = "" }) {
  return <img className={`icon ${className}`} src={`/assets/icons/${name}.svg`} width={size} height={size} alt="" />;
}
